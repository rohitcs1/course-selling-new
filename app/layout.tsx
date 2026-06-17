import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadataBase = new URL('https://course.elneb.in')

export const metadata: Metadata = {
  title: 'Elneb EdTech - Professional Video Editing Course',
  description: 'Master video editing with Elneb EdTech — professional online courses by Elneb Company (elneb.in).',
  generator: 'v0.app',
  keywords: [
    'Elneb EdTech',
    'video editing course',
    'online video editing',
    'Elneb Company',
    'video editing training',
    'course.elneb.in'
  ],
  authors: [
    { name: 'Elneb Company', url: 'https://elneb.in' }
  ],
  openGraph: {
    title: 'Elneb EdTech - Professional Video Editing Course',
    description: 'Master video editing with Elneb EdTech — professional online courses by Elneb Company (elneb.in).',
    url: 'https://course.elneb.in',
    siteName: 'Elneb EdTech',
    images: [{ url: '/og-image.png', alt: 'Elneb EdTech' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elneb EdTech - Professional Video Editing Course',
    description: 'Master video editing with Elneb EdTech — professional online courses by Elneb Company (elneb.in).',
    images: ['/og-image.png']
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-white">
      <body className="font-sans antialiased bg-white">
        {children}
      </body>
    </html>
  )
}
