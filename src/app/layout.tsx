/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Task App",
  description: "Let's Get things done!",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`antialiased`}>{children}</body>
    </html>
  )
}
