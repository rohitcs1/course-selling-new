import { NextResponse } from 'next/server'
import { supabaseRequest } from '@/lib/supabaseAdmin'
import { getBearerToken, verifyAdminToken } from '@/lib/adminAuth'

export async function GET(req: Request) {
  // list courses (supports ?hidden=true/false)
  try {
    const url = new URL(req.url)
    const hidden = url.searchParams.get('hidden')
    const filter = hidden !== null ? `?hidden=eq.${hidden}` : ''
    const { status, data } = await supabaseRequest('GET', `courses${filter}&select=*`)
    return NextResponse.json(data, { status })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  // create course (admin only)
  try {
    const token = getBearerToken(req as any)
    const verified = verifyAdminToken(token as any)
    if (!verified) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const payload = await req.json()
    const { status, data } = await supabaseRequest('POST', 'courses', payload, 'return=representation')
    return NextResponse.json(data, { status })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
