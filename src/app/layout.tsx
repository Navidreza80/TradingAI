"use client"
// imports


import { Inter } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/providers/i18n-provider";
import { ClerkProvider } from '@clerk/nextjs'
import HeaderServer from "@/components/Header/HeaderServer";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

// fonts

const inter = Inter({ subsets: ["latin"] });

// Viewport configuration
export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" }
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

// root layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <ClerkProvider>
          <I18nProvider>
            <Provider store={store}>
              <HeaderServer />
              {children}
            </Provider>
          </I18nProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
