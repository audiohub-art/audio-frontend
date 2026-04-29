import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/providers/session";
import { auth } from "@/services/auth"
import { Toaster } from "sonner";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://audiohub.art",
  ),
  title: {
    default: "AudioHub.art | Sound Social Network",
    template: "%s | AudioHub.art",
  },
  description: "A Sound Social Network",
  applicationName: "AudioHub.art",
  keywords: ["sound", "social", "network", "audio", "audiohub", "audiohub.art", "hub"],
  creator: "Antoine Fabre",
  openGraph: {
    type: "website",
    locale: "en",
    url: "/",
    title: "AudioHub.art",
    description: "A Sound Social Network",
    siteName: "AudioHub.art",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico"
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased overscroll-none`}
    >
      <body className="h-full overflow-hidden flex flex-col">
        <SessionProvider session={session}>
          {children}
          <Script defer src="https://umami.audiohub.art/script.js" data-website-id="7979cfa6-221b-442a-818a-eb651d2a4816"></Script>
          <Toaster/>
        </SessionProvider>
      </body>
    </html>
  );
}
