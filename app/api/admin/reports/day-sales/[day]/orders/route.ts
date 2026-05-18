import { NextResponse } from 'next/server'
import { supabaseRequest } from '@/lib/supabaseAdmin'
import { getBearerToken, verifyAdminToken } from '@/lib/adminAuth'

export async function GET(req: Request, { params }: { params: Promise<{ day: string }> }) {
  try {
    const token = getBearerToken(req as any)
    const verified = verifyAdminToken(token as any)
    if (!verified) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { day } = await params
    // Expect day in YYYY-MM-DD format
    const start = `${day}T00:00:00Z`
    const end = `${day}T23:59:59Z`

    const qs = `orders?select=id,email,amount,status,created_at,course_id&created_at=gte.${encodeURIComponent(
      start,
    )}&created_at=lte.${encodeURIComponent(end)}&order=created_at.desc`

    const { status, data } = await supabaseRequest('GET', qs)
    return NextResponse.json(data, { status })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
