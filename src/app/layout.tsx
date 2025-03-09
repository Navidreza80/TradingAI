// imports
import "./globals.css";
import { I18nProvider } from "@/providers/i18n-provider";
import { siteConfig } from "@/config/metadata";
import { ClerkProvider } from "@clerk/nextjs";
import HeaderServer from "@/components/Header/HeaderServer";
import { Toaster } from "react-hot-toast";
import VoiceNavigation from "@/components/dashboard/mic";
import ChatAssistant from "@/components/dashboard/ai-assistant";

// fonts

// Viewport configuration
export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// metadata

export const metadata = {
  metadataBase: new URL("https://tradingai.com"),
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  openGraph: siteConfig.openGraph,
  twitter: siteConfig.twitter,
  robots: siteConfig.robots,
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "fa-IR": "/fa",
      "ar-SA": "/ar",
    },
  },
  // manifest: '/manifest.json',
  // icons: {
  //   icon: [
  //     { url: './image/Logo.svg', type: 'image/svg+xml' },
  //     { url: './image/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
  //     { url: './image/favicon-16x16.png', sizes: '16x16', type: 'image/png' }
  //   ],
  //   apple: [
  //     { url: './image/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
  //   ],
  //   other: [
  //     { rel: 'mask-icon', url: './image/safari-pinned-tab.svg', color: '#1890ff' }
  //   ]
  // }
};

// root layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <ChatAssistant />
        <VoiceNavigation />
        <Toaster />
        <ClerkProvider>
          <I18nProvider>
            <HeaderServer />
            {children}
          </I18nProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
