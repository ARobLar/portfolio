import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Robin Larsson — Senior AI & Software Consultant',
  description:
    'Portfolio of Robin Larsson, Senior Consultant specializing in AI integration, solution architecture, and full-stack engineering. 8+ years experience across Sweden, Netherlands, and Japan.',
  openGraph: {
    title: 'Robin Larsson — Senior AI & Software Consultant',
    description: 'AI integration, solution architecture & full-stack engineering.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
