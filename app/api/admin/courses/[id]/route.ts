import { NextResponse } from 'next/server'
import { supabaseRequest } from '@/lib/supabaseAdmin'
import { getBearerToken, verifyAdminToken } from '@/lib/adminAuth'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const { status, data } = await supabaseRequest('GET', `courses?id=eq.${id}&select=*`)
    return NextResponse.json(Array.isArray(data) ? data[0] : data, { status })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const token = getBearerToken(req as any)
    const verified = verifyAdminToken(token as any)
    if (!verified) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = params
    const payload = await req.json()
    const { status, data } = await supabaseRequest('PATCH', `courses?id=eq.${id}`, payload, 'return=representation')
    return NextResponse.json(data, { status })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const token = getBearerToken(req as any)
    const verified = verifyAdminToken(token as any)
    if (!verified) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = params
    const { status, data } = await supabaseRequest('DELETE', `courses?id=eq.${id}`)
    return NextResponse.json({ success: true, data }, { status })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
