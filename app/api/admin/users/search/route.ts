import { NextResponse } from 'next/server'
import { supabaseRequest } from '@/lib/supabaseAdmin'
import { getBearerToken, verifyAdminToken } from '@/lib/adminAuth'

export async function GET(req: Request) {
  try {
    const token = getBearerToken(req as any)
    const verified = verifyAdminToken(token as any)
    if (!verified) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const url = new URL(req.url)
    const email = url.searchParams.get('email')
    if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 })

    const { status, data } = await supabaseRequest('GET', `orders?select=*&email=eq.${encodeURIComponent(email)}`)
    return NextResponse.json({ orders: data }, { status })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
