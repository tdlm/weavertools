import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import BaseLayout from '@/components/BaseLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  icons: {
    icon: {
      url: "/favicon.png",
      type: "image/png",
    },
    shortcut: { url: "/favicon.png", type: "image/png" },
  },
  title: 'Weaver Tools',
  description: 'Dev/QA tools',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BaseLayout>
          {children}
        </BaseLayout>
      </body>
    </html>
  )
}
