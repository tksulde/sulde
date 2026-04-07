import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Header } from './header'
import { Footer } from './footer'
import { ThemeProvider } from 'next-themes'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://sulde.space'),
  title: 'Sulde - Software Engineer',
  description:
    'Personal portfolio of Munkhsuld Bayaraa — front-end engineer building clean, responsive, and user-friendly experiences.',
  authors: [{ name: 'Munkhsuld Bayaraa' }],
  openGraph: {
    title: 'Sulde - Software Engineer',
    description:
      'Personal portfolio of Munkhsuld Bayaraa — front-end engineer building clean, responsive, and user-friendly experiences.',
    url: 'https://sulde.space',
    siteName: 'Sulde Portfolio',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@tksulde',
    title: 'Sulde - Software Engineer',
    description:
      'Personal portfolio of Munkhsuld Bayaraa — front-end engineer.',
  },
  alternates: {
    canonical: 'https://sulde.space',
  },
}

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} bg-white font-sans tracking-tight antialiased dark:bg-zinc-950`}
      >
        <ThemeProvider
          enableSystem={true}
          attribute="class"
          storageKey="theme"
          defaultTheme="system"
        >
          <div className="flex min-h-screen w-full flex-col">
            <div className="relative mx-auto w-full max-w-3xl flex-1 px-4 pt-20">
              <Header />
              {children}
              <Footer />
            </div>
          </div>
          <SpeedInsights />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
