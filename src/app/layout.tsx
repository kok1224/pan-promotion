import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { Navbar } from "@/components/navbar"
import { Providers } from "@/components/providers"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  description: "聚合夸克网盘、百度网盘、UC网盘等资源，支持影视、小说、游戏下载",
  keywords: ["网盘资源", "影视下载", "小说下载", "游戏下载", "夸克网盘", "百度网盘"],
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="border-t py-6">
            <div className="container text-center text-sm text-muted-foreground">
              <p>
                &copy; {new Date().getFullYear()} 云盘资源站. 仅供学习交流使用。
                <span className="mx-2">·</span>
                <a href="/terms" className="hover:text-primary underline underline-offset-4">使用条款</a>
                <span className="mx-2">·</span>
                <a href="/privacy" className="hover:text-primary underline underline-offset-4">隐私政策</a>
                <span className="mx-2">·</span>
                <span>侵权投诉：kokfam168@gmail.com</span>
              </p>
            </div>
          </footer>
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}