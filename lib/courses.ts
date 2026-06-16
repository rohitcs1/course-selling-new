import { supabaseRequest } from '@/lib/supabaseAdmin'

export type CourseRow = {
  id: string
  title: string
  description: string | null
  drive_link: string | null
  poster_url: string | null
  price: number
  hidden: boolean
}

export async function getPublicCourses() {
  // Request only non-hidden courses from Supabase to avoid client-side
  // type/coercion issues and ensure production matches the intended dataset.
  const { status, data } = await supabaseRequest('GET', `courses?select=*&hidden=eq.false&order=title.asc`)
  if (status >= 400) return [] as CourseRow[]
  return Array.isArray(data) ? (data as CourseRow[]) : []
}

export async function getCourseById(courseId: string) {
  const { status, data } = await supabaseRequest('GET', `courses?id=eq.${encodeURIComponent(courseId)}&select=*`)
  if (status >= 400) return null
  const course = Array.isArray(data) ? data[0] : null
  return course || null
}
