import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

import { Toaster as HotToaster } from "react-hot-toast";
import { Toaster } from "sonner";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { AuthProvider } from "@/context/AuthProvider";
import WhatsAppFloat from "@/components/shared/WhatsAppFloat";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: {
    default: "Virtavio | Premium SaaS Solutions",
    template: "%s | Virtavio",
  },

  description:
    "Virtavio helps businesses scale with AI automation, web development, SEO, custom software development, and digital transformation solutions.",

  metadataBase: new URL("https://virtavio.in"),

  verification: {
    google: "d0hB6lgcRFdZuWWyat0KAkR7sSS8fBR4S4hQPydIdoQ",
  },

  openGraph: {
    title: "Virtavio | Premium SaaS Solutions",
    description:
      "Virtavio helps businesses scale with AI automation, web development, SEO, custom software development, and digital transformation solutions.",
    url: "https://virtavio.in",
    siteName: "Virtavio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "./images/logo.png",
        width: 1200,
        height: 630,
        alt: "Virtavio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Virtavio | Premium SaaS Solutions | Digital Marketing",
    description:
      "Virtavio helps businesses scale with AI automation, web development, SEO, custom software development, and digital transformation solutions.",
    images: ["/images/logo.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: [
      { url: "/images/logo.png", type: "image/png" },
    ],
    shortcut: ["/images/logo.png"],
    apple: [
      { url: "/images/logo.png", type: "image/png" },
    ],
  },

  keywords: [
    "AI Automation",
    "Web Development",
    "Next.js Development",
    "SEO Services",
    "Custom Software Development",
    "Digital Transformation",
    "Cloud Solutions",
    "Performance Marketing",
    "Virtavio",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://anwkxpaptjabestpfplg.supabase.co" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://anwkxpaptjabestpfplg.supabase.co" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <WhatsAppFloat />
          <Footer />

          {/* Notifications */}
          <Toaster position="top-right" richColors closeButton />
          <HotToaster position="bottom-right" />
        </AuthProvider>
      </body>
    </html>
  );
}