const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

function ensureSupabaseConfigured() {
  const missing = []
  if (!SUPABASE_URL || SUPABASE_URL.includes('your-project-ref')) missing.push('NEXT_PUBLIC_SUPABASE_URL')
  if (!SERVICE_ROLE_KEY || SERVICE_ROLE_KEY.includes('your-service-role-key')) missing.push('SUPABASE_SERVICE_ROLE_KEY')
  if (missing.length) {
    throw new Error(
      `Supabase not configured: set ${missing.join(", ")} in .env.local and restart the dev server. See Project > Settings > API in Supabase.`,
    )
  }
}

export async function supabaseRequest(method: string, path: string, body?: any, prefer?: string) {
  ensureSupabaseConfigured()
  const url = path.startsWith('/') ? `${SUPABASE_URL}${path}` : `${SUPABASE_URL}/rest/v1/${path}`
  const headers: Record<string,string> = {
    'Content-Type': 'application/json',
    apikey: SERVICE_ROLE_KEY!,
    Authorization: `Bearer ${SERVICE_ROLE_KEY!}`,
  }
  if (prefer) headers['Prefer'] = prefer

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  const text = await res.text()
  try { return { status: res.status, data: JSON.parse(text) } }
  catch { return { status: res.status, data: text } }
}

export async function rpc(functionName: string, params: any = {}) {
  ensureSupabaseConfigured()
  const url = `${SUPABASE_URL}/rest/v1/rpc/${functionName}`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SERVICE_ROLE_KEY!,
      Authorization: `Bearer ${SERVICE_ROLE_KEY!}`,
    },
    body: JSON.stringify(params),
  })
  const json = await res.json()
  return { status: res.status, data: json }
}
