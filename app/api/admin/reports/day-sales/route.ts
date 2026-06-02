import { NextResponse } from 'next/server'
import { supabaseRequest } from '@/lib/supabaseAdmin'
import { getBearerToken, verifyAdminToken } from '@/lib/adminAuth'

type OrderRow = {
  amount: number | string
  created_at: string
}

async function fetchAllOrders(queryBase: string) {
  const pageSize = 1000
  let offset = 0
  const rows: OrderRow[] = []

  while (true) {
    const qs = `${queryBase}&limit=${pageSize}&offset=${offset}`
    const { status, data } = await supabaseRequest('GET', qs)
    if (!Array.isArray(data)) return { status, data: rows }

    rows.push(...(data as OrderRow[]))
    if (data.length < pageSize) return { status, data: rows }

    offset += pageSize
  }
}

export async function GET(req: Request) {
  try {
    const token = getBearerToken(req as any)
    const verified = verifyAdminToken(token as any)
    if (!verified) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const url = new URL(req.url)
    const from = url.searchParams.get('from') || new Date(0).toISOString()
    const to = url.searchParams.get('to') || new Date().toISOString()

    const queryBase = `orders?select=amount,created_at&status=eq.completed&created_at=gte.${encodeURIComponent(
      from,
    )}&created_at=lte.${encodeURIComponent(to)}&order=created_at.asc`

    const { status, data } = await fetchAllOrders(queryBase)
    if (!Array.isArray(data)) return NextResponse.json(data, { status })

    const byDay = new Map<string, { day: string; total_amount: number; orders_count: number }>()

    for (const order of data as OrderRow[]) {
      const day = new Date(order.created_at).toISOString().slice(0, 10)
      const current = byDay.get(day) || { day, total_amount: 0, orders_count: 0 }
      current.total_amount += Number(order.amount) || 0
      current.orders_count += 1
      byDay.set(day, current)
    }

    const rows = Array.from(byDay.values()).sort((a, b) => b.day.localeCompare(a.day))
    return NextResponse.json(rows, { status })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
