import type { Metadata } from "next";
import { COMPANY_COUNT } from "@/lib/lead-context";

export const metadata: Metadata = {
  title: "Empresas e Soluções | Elcio Hub B2B",
  description:
    `Explore o hub B2B com ${COMPANY_COUNT} empresas industriais, filtros por solução, comparação orientada e entrada comercial com contexto.`,
  openGraph: {
    title: "Empresas e Soluções | Elcio Hub B2B",
    description:
      `Explore o hub B2B com ${COMPANY_COUNT} empresas industriais, filtros por solução, comparação orientada e entrada comercial com contexto.`,
    type: "website",
  },
};

export default function MarcasLayout({ children }: { children: React.ReactNode }) {
  return children;
}
