import { NextResponse } from 'next/server'
import { supabaseRequest } from '@/lib/supabaseAdmin'
import { getBearerToken, verifyAdminToken } from '@/lib/adminAuth'

export async function GET(req: Request) {
  // list courses (admin can see all, including hidden)
  try {
    const { status, data } = await supabaseRequest('GET', `courses?select=*`)
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
    if (!payload?.title || payload?.price === undefined) {
      return NextResponse.json({ error: 'title and price are required' }, { status: 400 })
    }
    // If creating a course that is unhidden, ensure all other courses are hidden
    if (payload?.hidden === false) {
      try {
        await supabaseRequest('PATCH', `courses?id=neq.0`, { hidden: true })
      } catch (err) {
        console.error('[v0] Failed to hide other courses on create:', err)
      }
    }
    const { status, data } = await supabaseRequest('POST', 'courses', payload, 'return=representation')
    return NextResponse.json(data, { status })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
