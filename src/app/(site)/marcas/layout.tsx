import type { Metadata } from "next";
import { COMPANY_COUNT } from "@/lib/lead-context";

export const metadata: Metadata = {
  title: "Hub de Empresas | Elcio",
  description:
    `Explore o hub B2B com ${COMPANY_COUNT} empresas industriais, filtros por solução e entrada comercial orientada por contexto.`,
  openGraph: {
    title: "Hub de Empresas | Elcio",
    description:
      `Explore o hub B2B com ${COMPANY_COUNT} empresas industriais, filtros por solução e entrada comercial orientada por contexto.`,
    type: "website",
  },
};

export default function MarcasLayout({ children }: { children: React.ReactNode }) {
  return children;
}
