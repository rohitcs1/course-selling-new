import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { verifyRazorpaySignature } from '@/lib/razorpay'
import { supabaseRequest } from '@/lib/supabaseAdmin'
import { sendCourseLink } from '@/lib/email'
import { getCourseById } from '@/lib/courses'

const COURSE_LINK = process.env.NEXT_PUBLIC_COURSE_LINK || 'https://drive.google.com/drive/folders/your-folder-id'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

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

    let orderRow: any = null
    let orderUpdateWarning: string | null = null

    const updateResult = await supabaseRequest(
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

    if (updateResult.status >= 400) {
      console.error('[v0] Database error:', updateResult.data)
      orderUpdateWarning = 'Order verification succeeded, but order persistence failed.'
    } else {
      orderRow = Array.isArray(updateResult.data) ? updateResult.data[0] : null
    }

    if (!orderRow) {
      try {
        const razorpayOrder = await razorpay.orders.fetch(razorpay_order_id)
        const backfillResult = await supabaseRequest(
          'POST',
          'orders',
          {
            email: email || razorpayOrder?.notes?.email || null,
            phone: phone?.trim() || razorpayOrder?.notes?.phone || null,
            amount: Number(razorpayOrder?.amount ?? 0) / 100,
            currency: razorpayOrder?.currency || 'INR',
            course_id: razorpayOrder?.notes?.courseId || null,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            status: 'completed',
            updated_at: new Date().toISOString(),
          },
          'return=representation',
        )

        if (backfillResult.status >= 400) {
          console.error('[v0] Failed to backfill missing order:', backfillResult.data)
          orderUpdateWarning = 'Payment was verified, but the order row could not be created.'
        } else {
          orderRow = Array.isArray(backfillResult.data) ? backfillResult.data[0] : null
        }
      } catch (fallbackError) {
        console.error('[v0] Failed to backfill missing order:', fallbackError)
        orderUpdateWarning = 'Payment was verified, but the order row could not be created.'
      }
    }

    const course = orderRow?.course_id ? await getCourseById(orderRow.course_id) : null
    const courseLink = course?.drive_link || COURSE_LINK

    if (email) {
      void sendCourseLink(email, courseLink).catch((sendError) => {
        console.error('[v0] Email sending failed:', sendError)
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      data: orderRow,
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