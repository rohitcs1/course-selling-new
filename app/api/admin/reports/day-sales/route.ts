import { NextResponse } from 'next/server'
import { rpc } from '@/lib/supabaseAdmin'
import { getBearerToken, verifyAdminToken } from '@/lib/adminAuth'

export async function GET(req: Request) {
  try {
    const token = getBearerToken(req as any)
    const verified = verifyAdminToken(token as any)
    if (!verified) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const url = new URL(req.url)
    const from = url.searchParams.get('from') || new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString()
    const to = url.searchParams.get('to') || new Date().toISOString()

    const { status, data } = await rpc('get_daily_sales', { from_date: from, to_date: to })
    return NextResponse.json(data, { status })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
