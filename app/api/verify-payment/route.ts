import { NextRequest, NextResponse } from 'next/server'
import { verifyRazorpaySignature } from '@/lib/razorpay'
import { supabaseRequest } from '@/lib/supabaseAdmin'
import { sendCourseLink } from '@/lib/email'

const COURSE_LINK = process.env.NEXT_PUBLIC_COURSE_LINK || 'https://drive.google.com/drive/folders/your-folder-id'

export async function POST(request: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      email,
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

    // Update order in database using the service role key so RLS does not block server writes
    const { status, data } = await supabaseRequest(
      'PATCH',
      `orders?razorpay_order_id=eq.${encodeURIComponent(razorpay_order_id)}`,
      {
        razorpay_payment_id,
        razorpay_signature,
        status: 'completed',
        updated_at: new Date().toISOString(),
      },
      'return=representation',
    )

    if (status >= 400) {
      console.error('[v0] Database error:', data)
      return NextResponse.json(
        { error: 'Failed to update order' },
        { status: 500 }
      )
    }

    // Send course link via email
    const emailResult = await sendCourseLink(email, COURSE_LINK)

    if (!emailResult.success) {
      console.error('[v0] Email sending failed:', emailResult.error)
      // Still return success for payment, but log the email failure
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      data,
    })
  } catch (error) {
    console.error('[v0] Payment verification error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
