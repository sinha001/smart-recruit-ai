import "./globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import ClientProviders from "@/components/client-providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Smart Recruit AI",
  description: "AI-powered recruitment tool",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}
