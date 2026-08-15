import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";

import "./globals.css";

import Navbar from "@/components/layout/Navbar";


const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});


export const metadata: Metadata = {
  title: {
    default: "Sahay Bihar | Government Schemes Made Simple",
    template: "%s | Sahay Bihar",
  },

  description:
    "Discover Bihar government schemes, check eligibility, understand benefits, and find the right scheme for you — all in one place.",

  applicationName: "Sahay Bihar",

  keywords: [
    "Bihar government schemes",
    "Bihar schemes",
    "government schemes Bihar",
    "Bihar Yojana",
    "Bihar Sarkari Yojana",
    "government schemes",
    "Bihar welfare schemes",
    "scheme eligibility",
    "Bihar government services",
    "Sahay Bihar",
  ],

  authors: [
    {
      name: "Sahay Bihar",
    },
  ],

  creator: "Sahay Bihar",

  publisher: "Sahay Bihar",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [
      {
        url: "/logo.png",
        type: "image/png",
      },
    ],

    shortcut: "/logo.png",

    apple: [
      {
        url: "/logo.png",
        type: "image/png",
      },
    ],
  },



  openGraph: {
    title: "Sahay Bihar | Government Schemes Made Simple",

    description:
      "Find Bihar government schemes, check eligibility, and discover the right benefits for you.",

    siteName: "Sahay Bihar",

    type: "website",

    locale: "en_IN",

    images: [
      {
        url: "/Logo.png",
        width: 1200,
        height: 630,
        alt: "Sahay Bihar - Government Schemes Made Simple",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Sahay Bihar | Government Schemes Made Simple",

    description:
      "Discover Bihar government schemes, eligibility, benefits and application information.",

    images: ["/og-image.png"],
  },

  category: "Government",
};


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#08783f",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white font-sans text-[#172033]">

        <Navbar />

        <main className="min-h-0 flex-1">
          {children}
        </main>

      </body>
    </html>
  );
}