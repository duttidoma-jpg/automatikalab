import type { Metadata } from 'next'
import { Hanken_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

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

// Моноширинный — для метрик, цифр, технических данных (v3 design system)
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
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
    images: [
      {
        url: 'https://automaticalab.app/images/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'AutomatikaLab — Автоматизация будущего',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AutomatikaLab — Автоматизация будущего',
    description: 'Telegram-боты, AI-ассистенты и автоматизация бизнеса.',
    images: ['https://automaticalab.app/images/og-image.svg'],
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
      className={`${hanken.variable} ${inter.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body>
        {children}
      </body>
    </html>
  )
}
