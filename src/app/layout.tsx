// global styles
import "./globals.css";
// Providers
import { I18nProvider } from "@/providers/i18n-provider";
// Configs
import { siteConfig } from "@/config/metadata";
// Clerk for authentication
import { ClerkProvider } from "@clerk/nextjs";
// Third party components
import HeaderServer from "@/components/Header/HeaderServer";
import ChatAssistant from "@/components/dashboard/ai-assistant";
// React hot toast provider
import { Toaster } from "react-hot-toast";

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
      <body className="bg-[#F0F0F0] dark:bg-[#0A0A0A]">
        <ChatAssistant />
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
