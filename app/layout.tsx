import type React from "react"
import type { Metadata } from "next/types"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { MainNav } from "@/components/main-nav"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

const sfRounded = {
  variable: "--font-sf-rounded",
}

export const metadata: Metadata = {
  title: "Grant Management",
  description: "A grant management application built with Next.js and shadcn/ui.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${poppins.variable} ${sfRounded.variable} font-sans antialiased`}
        style={{
          fontFamily:
            'var(--font-sf-rounded), SFRounded, ui-rounded, "SF Pro Rounded", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <MainNav />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
