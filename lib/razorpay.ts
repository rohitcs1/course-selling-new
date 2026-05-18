import crypto from 'crypto'

export function verifyRazorpaySignature(
  orderID: string,
  paymentID: string,
  signature: string,
  secret: string
): boolean {
  const message = orderID + '|' + paymentID
  const generated_signature = crypto
    .createHmac('sha256', secret)
    .update(message)
    .digest('hex')

  return generated_signature === signature
}

export function generateRazorpayOrder(
  razorpayClient: any,
  amount: number,
  currency: string,
  receipt: string
) {
  return razorpayClient.orders.create({
    amount: amount * 100, // Razorpay expects amount in paise
    currency,
    receipt,
  })
}
