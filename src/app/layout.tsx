import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import { TrackingScripts, TrackingNoscript } from "@/components/TrackingScripts";
import { DynamicFavicon } from "@/components/DynamicFavicon";
import { DynamicScripts } from "@/components/DynamicScripts";
import { buildMetadata } from "@/lib/seo";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("shr");
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Google Site Verification - Maletti */}
        <meta name="google-site-verification" content="SkrI3t5Q5vQ_OvnnTNksc-gx1nKisw0Gq0oANsuLvM0" />
        {/* Google Site Verification - SHR */}
        <meta name="google-site-verification" content="11zRyTUhJGRP8qhuDDOpqF3oBZZ67udUZofNOu3qQP4" />
        {/* Preconnect para recursos externos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <DynamicFavicon />
        <TrackingScripts />
      </head>
      <body className={`${poppins.variable} ${playfair.variable} font-sans antialiased`}>
        <TrackingNoscript />
        <DynamicScripts />
        {children}
      </body>
    </html>
  );
}
