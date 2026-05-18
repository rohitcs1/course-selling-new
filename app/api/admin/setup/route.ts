import { NextResponse } from 'next/server'
import { hashPassword } from '@/lib/adminAuth'
import { supabaseRequest } from '@/lib/supabaseAdmin'

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json()
    if (!email || !password) return NextResponse.json({ error: 'Missing' }, { status: 400 })

    // Check existing
    const { status: s1, data: existing } = await supabaseRequest('GET', `admins?email=eq.${encodeURIComponent(email)}&select=*`)
    if (s1 === 200 && Array.isArray(existing) && existing.length) {
      return NextResponse.json({ message: 'Admin already exists' }, { status: 200 })
    }

    const password_hash = hashPassword(password)

    const { status, data } = await supabaseRequest('POST', 'admins', { email, password_hash, name }, 'return=representation')
    if (status >= 400) {
      return NextResponse.json({ error: 'Failed to create admin', detail: data }, { status: 500 })
    }

    return NextResponse.json({ success: true, admin: Array.isArray(data) ? data[0] : data })
  } catch (err) {
    console.error('[admin setup] error', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
