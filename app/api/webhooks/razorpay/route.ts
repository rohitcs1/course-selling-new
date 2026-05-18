import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { createClient } from '@/lib/supabase/server'
import { sendCourseLink } from '@/lib/email'

const COURSE_LINK = process.env.NEXT_PUBLIC_COURSE_LINK || 'https://drive.google.com/drive/folders/your-folder-id'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const signature = request.headers.get('x-razorpay-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      )
    }

    // Verify webhook signature
    const message = JSON.stringify(body)
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(message)
      .digest('hex')

    if (generated_signature !== signature) {
      console.error('[v0] Invalid webhook signature')
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Log webhook event
    await supabase.from('webhooks_log').insert({
      event_id: body.id,
      event_type: body.event,
      payload: body,
      status: 'received',
    })

    // Handle different event types
    if (body.event === 'payment.authorized') {
      const { order_id, payment_id } = body.payload.payment.entity
      const email = body.payload.payment.entity.email

      // Update order status
      await supabase
        .from('orders')
        .update({
          razorpay_payment_id: payment_id,
          status: 'completed',
          updated_at: new Date().toISOString(),
        })
        .eq('razorpay_order_id', order_id)

      // Send course link
      await sendCourseLink(email, COURSE_LINK)

      // Update webhook log
      await supabase
        .from('webhooks_log')
        .update({ status: 'processed' })
        .eq('event_id', body.id)
    } else if (body.event === 'payment.failed') {
      const { order_id } = body.payload.payment.entity

      // Update order status to failed
      await supabase
        .from('orders')
        .update({
          status: 'failed',
          updated_at: new Date().toISOString(),
        })
        .eq('razorpay_order_id', order_id)

      // Update webhook log
      await supabase
        .from('webhooks_log')
        .update({ status: 'processed' })
        .eq('event_id', body.id)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[v0] Webhook error:', error)

    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}
