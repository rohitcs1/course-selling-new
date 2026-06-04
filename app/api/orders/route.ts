import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { supabaseRequest } from '@/lib/supabaseAdmin'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, amount, currency = 'INR', courseId } = await request.json()

    if (!email || !phone || !amount || !courseId) {
      return NextResponse.json(
        { error: 'Email, phone, amount, and course are required' },
        { status: 400 }
      )
    }

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Convert to paise
      currency,
      receipt: `receipt_${Date.now()}`,
      notes: {
        name: name || '',
        email,
        phone,
        courseId: courseId || '',
      },
    })

    // Save order to Supabase using the service role key so RLS does not block server writes
    const { status, data } = await supabaseRequest(
      'POST',
      'orders',
      {
        email,
        phone: phone?.trim() || null,
        amount,
        currency,
        course_id: courseId || null,
        razorpay_order_id: razorpayOrder.id,
        status: 'pending',
      },
      'return=representation',
    )

    if (status >= 400) {
      console.error('[v0] Database error:', data)
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      orderID: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    })
  } catch (error) {
    console.error('[v0] Order creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
