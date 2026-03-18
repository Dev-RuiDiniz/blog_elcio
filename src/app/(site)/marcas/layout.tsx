import type { Metadata } from "next";
import { COMPANY_COUNT } from "@/lib/lead-context";

export const metadata: Metadata = {
  title: "Empresas Representadas | Elcio",
  description:
    `Conheça as ${COMPANY_COUNT} empresas representadas pelo Elcio e inicie seu atendimento comercial com consultoria + catálogo.`,
  openGraph: {
    title: "Empresas Representadas | Elcio",
    description:
      `Conheça as ${COMPANY_COUNT} empresas representadas pelo Elcio e inicie seu atendimento comercial com consultoria + catálogo.`,
    type: "website",
  },
};

export default function MarcasLayout({ children }: { children: React.ReactNode }) {
  return children;
}
