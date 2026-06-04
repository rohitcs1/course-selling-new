import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { sendCourseLink } from '@/lib/email'
import { supabaseRequest } from '@/lib/supabaseAdmin'

const COURSE_LINK = process.env.NEXT_PUBLIC_COURSE_LINK || 'https://drive.google.com/drive/folders/your-folder-id'

async function persistOrderFromPayment(payment: any, status: 'completed' | 'failed') {
  const orderId = payment?.order_id

  if (!orderId) {
    return { ok: false, error: 'Missing order id' }
  }

  const basePayload = {
    email: payment?.email || payment?.notes?.email || null,
    phone: payment?.contact || payment?.notes?.phone || null,
    amount: Number(payment?.amount ?? 0) / 100,
    currency: payment?.currency || 'INR',
    course_id: payment?.notes?.courseId || null,
    razorpay_payment_id: payment?.id || null,
    status,
    updated_at: new Date().toISOString(),
  }

  const updateResult = await supabaseRequest(
    'PATCH',
    `orders?razorpay_order_id=eq.${encodeURIComponent(orderId)}`,
    basePayload,
    'return=representation',
  )

  if (updateResult.status < 400 && Array.isArray(updateResult.data) && updateResult.data.length > 0) {
    return { ok: true, row: updateResult.data[0] }
  }

  const insertResult = await supabaseRequest(
    'POST',
    'orders',
    {
      ...basePayload,
      razorpay_order_id: orderId,
    },
    'return=representation',
  )

  if (insertResult.status >= 400) {
    return { ok: false, error: insertResult.data }
  }

  return { ok: true, row: Array.isArray(insertResult.data) ? insertResult.data[0] : insertResult.data }
}

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

    const message = JSON.stringify(body)
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(message)
      .digest('hex')

    if (generatedSignature !== signature) {
      console.error('[v0] Invalid webhook signature')
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    await supabaseRequest('POST', 'webhooks_log', {
      event_id: body.id,
      event_type: body.event,
      payload: body,
      status: 'received',
    })

    if (body.event === 'payment.authorized' || body.event === 'payment.captured') {
      const payment = body.payload?.payment?.entity
      const result = await persistOrderFromPayment(payment, 'completed')

      if (!result.ok) {
        console.error('[v0] Failed to persist completed order from webhook:', result.error)
      }

      const email = payment?.email || payment?.notes?.email
      if (email) {
        await sendCourseLink(email, COURSE_LINK)
      }

      await supabaseRequest('PATCH', `webhooks_log?event_id=eq.${encodeURIComponent(body.id)}`, {
        status: result.ok ? 'processed' : 'failed',
      })
    } else if (body.event === 'payment.failed') {
      const payment = body.payload?.payment?.entity
      await persistOrderFromPayment(payment, 'failed')

      await supabaseRequest('PATCH', `webhooks_log?event_id=eq.${encodeURIComponent(body.id)}`, {
        status: 'processed',
      })
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