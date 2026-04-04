import type { Metadata } from 'next'
import { Hanken_Grotesk, Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'

// Шрифт для заголовков — editorial grotesque характер
const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-hanken',
  display: 'swap',
})

// Шрифт для body — чистый, нейтральный
const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'AutomatikaLab — Автоматизация будущего',
  description:
    'Telegram-боты, AI-ассистенты и автоматизация бизнеса. Пока конкуренты думают — вы уже впереди.',
  metadataBase: new URL('https://automaticalab.app'),
  openGraph: {
    title: 'AutomatikaLab — Автоматизация будущего',
    description:
      'Telegram-боты, AI-ассистенты и автоматизация бизнеса. Пока конкуренты думают — вы уже впереди.',
    url: 'https://automaticalab.app',
    siteName: 'AutomatikaLab',
    locale: 'ru_RU',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ru"
      className={`${hanken.variable} ${inter.variable}`}
    >
      <body>
        {/* Кастомный курсор — рендерится поверх всего */}
        <CustomCursor />
        {/* Навигация — fixed, z-50 */}
        <Nav />
        {/* Контент страницы */}
        <main>{children}</main>
        {/* Футер */}
        <Footer />
      </body>
    </html>
  )
}
