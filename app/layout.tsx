import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sofia Mi Amor',
  description: "Una pagina a mi compañera de vida Sofia Albornoz",
  
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
