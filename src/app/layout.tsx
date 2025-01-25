// imports

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import { I18nProvider } from "@/providers/i18n-provider";
import { siteConfig } from "@/config/metadata";
import type { SiteConfig } from "@/types/metadata";

// fonts

const inter = Inter({ subsets: ["latin"] });

// metadata

export const metadata: Metadata = {
  metadataBase: new URL('https://tradingai.com'),
  ...siteConfig,
  alternates: {
    canonical: '/',

    // languages
    languages: {
      'en-US': '/en',
      'fa-IR': '/fa',
      'ar-SA': '/ar'
    }
  },
  manifest: '/manifest.json',

  // icons
  icons: {
    icon: [
      { url: './image/Logo.svg', type: 'image/svg+xml' },
      { url: './image/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: './image/favicon-16x16.png', sizes: '16x16', type: 'image/png' }
    ],

    // apple
    apple: [
      { url: './image/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],

    // other
    other: [
      { rel: 'mask-icon', url: './image/safari-pinned-tab.svg', color: '#1890ff' }
    ]
  }
} satisfies Metadata;

// root layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    // html
    <html lang="en" dir="ltr" className="dark">

      {/* head */}
      <head>

        {/* fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>

      {/* body */}
      <body className={inter.className}>

        {/* i18n provider */}
        <I18nProvider>

          {/* Header */}
          <Header />

          {/* children */}
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
