export function normalizePublicUrl(rawUrl: string | null | undefined) {
  if (!rawUrl) return ''

  if (rawUrl.startsWith('/') && !rawUrl.startsWith('//')) {
    return rawUrl
  }

  try {
    const resolvedUrl = new URL(rawUrl)
    if (resolvedUrl.protocol !== 'http:' && resolvedUrl.protocol !== 'https:') {
      return ''
    }

    if (resolvedUrl.hostname === 'drive.google.com') {
      const fileIdFromPath = resolvedUrl.pathname.match(/\/file\/d\/([^/]+)/)?.[1]
      const fileIdFromQuery = resolvedUrl.searchParams.get('id')
      const fileId = fileIdFromPath || fileIdFromQuery

      if (fileId) {
        return `https://drive.google.com/uc?export=view&id=${encodeURIComponent(fileId)}`
      }
    }

    const hostname = resolvedUrl.hostname.toLowerCase()
    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '0.0.0.0' ||
      hostname.endsWith('.local')
    ) {
      return ''
    }

    if (typeof window !== 'undefined' && window.location.protocol === 'https:' && resolvedUrl.protocol === 'http:') {
      resolvedUrl.protocol = 'https:'
    }

    return resolvedUrl.toString()
  } catch {
    return ''
  }
}