import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Central de Qualificação | Elcio",
  description:
    "Abra o contato pelo hub B2B do Elcio para comparar empresas, qualificar a demanda e acionar o próximo passo com contexto.",
  openGraph: {
    title: "Central de Qualificação | Elcio",
    description:
      "Abra o contato pelo hub B2B do Elcio para comparar empresas, qualificar a demanda e acionar o próximo passo com contexto.",
    type: "website",
  },
};

export default function ContatoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
