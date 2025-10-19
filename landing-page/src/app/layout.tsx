import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "やることボード - 毎日のやることをこれひとつで",
  description: "子どもたちが毎日の準備や「やること」を楽しく、わかりやすく管理できるアプリです。朝の身支度や夜の準備など、日常のルーティン管理をサポートします。",
  keywords: ["やることボード", "タスク管理", "子ども", "アプリ", "iPad", "朝の準備", "夜の準備", "ルーティン管理"],
  authors: [{ name: "Code Crane" }],
  creator: "Code Crane",
  publisher: "Code Crane",
  metadataBase: new URL('https://yarukoto-board.code-crane.com/'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "やることボード - 毎日のやることをこれひとつで",
    description: "子どもたちが毎日の準備や「やること」を楽しく、わかりやすく管理できるアプリです。朝の身支度や夜の準備など、日常のルーティン管理をサポートします。",
    url: 'https://yarukoto-board.code-crane.com/',
    siteName: 'やることボード',
    images: [
      {
        url: '/ogp.png',
        width: 1200,
        height: 630,
        alt: 'やることボード アプリスクリーンショット',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "やることボード - 毎日のやることをこれひとつで",
    description: "子どもたちが毎日の準備や「やること」を楽しく、わかりやすく管理できるアプリです。朝の身支度や夜の準備など、日常のルーティン管理をサポートします。",
    images: ['/ogp.png'],
    creator: '@tsuru_engineer',
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
