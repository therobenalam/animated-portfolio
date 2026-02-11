import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Robin | AI Engineer Portfolio',
  description: 'An interactive 3D neural workspace showcasing AI/ML projects and software engineering work. Built with Three.js, React, and Next.js.',
  keywords: ['AI', 'Machine Learning', 'Portfolio', 'Three.js', 'React', 'Next.js', 'Software Engineer'],
  authors: [{ name: 'Robin' }],
  openGraph: {
    title: 'Robin | AI Engineer Portfolio',
    description: 'An interactive 3D neural workspace showcasing AI/ML projects and software engineering work.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Robin Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Robin | AI Engineer Portfolio',
    description: 'An interactive 3D neural workspace showcasing AI/ML projects and software engineering work.',
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'theme-color': '#000a14',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
