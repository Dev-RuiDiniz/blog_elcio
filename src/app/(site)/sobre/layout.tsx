import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Elcio | Representação Comercial",
  description:
    "Conheça a trajetória do Elcio, sua forma de atendimento consultivo e como ele conecta demandas B2B às empresas representadas.",
  openGraph: {
    title: "Sobre Elcio | Representação Comercial",
    description:
      "Conheça a trajetória do Elcio, sua forma de atendimento consultivo e como ele conecta demandas B2B às empresas representadas.",
    type: "website",
  },
};

export default function SobreLayout({ children }: { children: React.ReactNode }) {
  return children;
}
