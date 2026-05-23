import { createBrowserClient } from '@supabase/ssr'
import { normalizePublicUrl } from '@/lib/public-url'

export function createClient() {
  const supabaseUrl = normalizePublicUrl(process.env.NEXT_PUBLIC_SUPABASE_URL)

  return createBrowserClient(
    supabaseUrl || process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}
