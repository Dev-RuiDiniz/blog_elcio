import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre o Hub B2B | Elcio",
  description:
    "Entenda como o Elcio opera o hub B2B, organiza as 7 empresas do portfólio e qualifica o encaminhamento comercial.",
  openGraph: {
    title: "Sobre o Hub B2B | Elcio",
    description:
      "Entenda como o Elcio opera o hub B2B, organiza as 7 empresas do portfólio e qualifica o encaminhamento comercial.",
    type: "website",
  },
};

export default function SobreLayout({ children }: { children: React.ReactNode }) {
  return children;
}
