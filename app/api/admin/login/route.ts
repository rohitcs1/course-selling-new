import { NextResponse } from 'next/server'
import { supabaseRequest } from '@/lib/supabaseAdmin'
import { verifyPassword, signAdminToken } from '@/lib/adminAuth'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) return NextResponse.json({ error: 'Missing' }, { status: 400 })

    const { status, data } = await supabaseRequest('GET', `admins?select=*&email=eq.${encodeURIComponent(email)}`)
    if (status !== 200) return NextResponse.json({ error: 'Admin lookup failed' }, { status: 500 })
    const admin = Array.isArray(data) && data[0]
    if (!admin) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })

    const ok = verifyPassword(password, admin.password_hash)
    if (!ok) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })

    const token = signAdminToken({ sub: admin.id, email: admin.email })
    return NextResponse.json({ token, admin: { id: admin.id, email: admin.email, name: admin.name } })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
