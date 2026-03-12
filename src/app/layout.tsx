import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
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
      <body className={`${poppins.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
