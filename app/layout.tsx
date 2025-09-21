import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { SOSProvider } from "@/components/sos-provider"
import { LanguageProvider } from "@/components/language-provider"
import { RealtimeProvider } from "@/components/realtime-provider"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Soukhyam - Your Confidential Wellness Companion",
  description: "Designed for students in Jammu and Kashmir, India",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>
          <LanguageProvider>
            <SOSProvider>
              <RealtimeProvider>
                {children}
                <Toaster />
              </RealtimeProvider>
            </SOSProvider>
          </LanguageProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
