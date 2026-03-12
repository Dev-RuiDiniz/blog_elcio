import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Empresas Representadas | Elcio",
  description:
    "Conheca as 6 empresas representadas pelo Elcio e inicie seu atendimento comercial com consultoria + catalogo.",
  openGraph: {
    title: "Empresas Representadas | Elcio",
    description:
      "Conheca as 6 empresas representadas pelo Elcio e inicie seu atendimento comercial com consultoria + catalogo.",
    type: "website",
  },
};

export default function MarcasLayout({ children }: { children: React.ReactNode }) {
  return children;
}
