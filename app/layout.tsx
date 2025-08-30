import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { WalletProvider } from "@/contexts/wallet-context"
import { LanguageProvider } from "@/contexts/language-context"
import { SmartContractProvider } from "@/contexts/smart-contract-context"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Health ROSCA - Community Savings for Medical Emergencies",
  description: "Join a trusted community savings platform powered by stablecoins",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <LanguageProvider>
            <WalletProvider>
              <SmartContractProvider>{children}</SmartContractProvider>
            </WalletProvider>
          </LanguageProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
