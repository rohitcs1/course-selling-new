import { NextRequest, NextResponse } from 'next/server'
import { verifyRazorpaySignature } from '@/lib/razorpay'
import { supabaseRequest } from '@/lib/supabaseAdmin'
import { sendCourseLink } from '@/lib/email'
import { getCourseById } from '@/lib/courses'

const COURSE_LINK = process.env.NEXT_PUBLIC_COURSE_LINK || 'https://drive.google.com/drive/folders/your-folder-id'

export async function POST(request: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      email,
      phone,
    } = await request.json()

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: 'Missing payment details' },
        { status: 400 }
      )
    }

    // Verify signature
    const isValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      process.env.RAZORPAY_KEY_SECRET!
    )

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      )
    }

    let orderUpdateWarning: string | null = null

    // Update order in database using the service role key so RLS does not block server writes
    const { status, data } = await supabaseRequest(
      'PATCH',
      `orders?razorpay_order_id=eq.${encodeURIComponent(razorpay_order_id)}`,
      {
        razorpay_payment_id,
        razorpay_signature,
        phone: phone?.trim() || null,
        status: 'completed',
        updated_at: new Date().toISOString(),
      },
      'return=representation',
    )

    if (status >= 400) {
      console.error('[v0] Database error:', data)
      orderUpdateWarning = 'Order verification succeeded, but order persistence failed.'
    }

    const orderRow = Array.isArray(data) ? data[0] : null
    const course = orderRow?.course_id ? await getCourseById(orderRow.course_id) : null
    const courseLink = course?.drive_link || COURSE_LINK

    // Send course link via email without blocking the redirect path.
    if (email) {
      void sendCourseLink(email, courseLink).catch((sendError) => {
        console.error('[v0] Email sending failed:', sendError)
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      data,
      courseLink,
      ...(orderUpdateWarning ? { warning: orderUpdateWarning } : {}),
    })
  } catch (error) {
    console.error('[v0] Payment verification error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
