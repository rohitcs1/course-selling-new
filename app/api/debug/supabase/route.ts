import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || null
    const hasServiceRole = !!process.env.SUPABASE_SERVICE_ROLE_KEY
    const nodeEnv = process.env.NODE_ENV || 'unknown'
    return NextResponse.json({ url, hasServiceRole, nodeEnv })
  } catch (err) {
    return NextResponse.json({ error: 'Unable to read environment' }, { status: 500 })
  }
}
