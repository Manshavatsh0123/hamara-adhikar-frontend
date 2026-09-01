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
    metadataBase: new URL(
        "https://YOUR-DOMAIN.com"
    ),

    title: {
        default:
            "Sahay Bihar | Bihar Government Schemes & Eligibility",
        template:
            "%s | Sahay Bihar",
    },

    description:
        "Find Bihar government schemes, check eligibility, understand benefits, required documents and application information — all in one place.",

    applicationName: "Sahay Bihar",

    keywords: [
        "Bihar government schemes",
        "Bihar Sarkari Yojana",
        "Bihar government schemes eligibility",
        "Bihar schemes",
        "Bihar Yojana",
        "Bihar welfare schemes",
        "Bihar government services",
        "scheme eligibility",
        "Bihar scheme benefits",
        "Sahay Bihar",
    ],

    authors: [
        {
            name: "Sahay Bihar",
        },
    ],

    creator: "Sahay Bihar",
    publisher: "Sahay Bihar",

    alternates: {
        canonical: "/",
    },

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
        icon: "/Logo.png",
        shortcut: "/Logo.png",
        apple: "/Logo.png",
    },

    openGraph: {
        title:
            "Sahay Bihar | Bihar Government Schemes & Eligibility",

        description:
            "Find Bihar government schemes, check eligibility, benefits, documents and application information.",

        siteName: "Sahay Bihar",

        type: "website",

        locale: "en_IN",

        url: "/",

        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt:
                    "Sahay Bihar - Bihar Government Schemes",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",

        title:
            "Sahay Bihar | Bihar Government Schemes & Eligibility",

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