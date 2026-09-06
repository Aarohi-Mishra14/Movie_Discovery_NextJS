import { Sora, Inter } from 'next/font/google'
import { isMoodMatcherAvailable } from '@/lib/gemini'
import Navbar from '@/components/Navbar'
import ToastProvider from '@/components/ToastProvider'
import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-sora',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: {
    default: 'CineReel — Discover your next watch',
    template: '%s | CineReel',
  },
  description:
    'CineReel — discover popular movies, search the full catalog, and build your own watchlist.',
  openGraph: {
    title: 'CineReel',
    description: 'Discover your next favorite movie.',
    siteName: 'CineReel',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  const moodMatcherAvailable = isMoodMatcherAvailable()

  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body>
        <ToastProvider>
          <div className="app-shell">
            <Navbar moodMatcherAvailable={moodMatcherAvailable} />
            <main>{children}</main>
          </div>
        </ToastProvider>
      </body>
    </html>
  )
}
