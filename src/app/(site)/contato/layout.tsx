import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Central de Qualificação | Elcio",
  description:
    "Abra o contato pelo hub B2B do Elcio com intenção, empresa e contexto comercial mais claros.",
  openGraph: {
    title: "Central de Qualificação | Elcio",
    description:
      "Abra o contato pelo hub B2B do Elcio com intenção, empresa e contexto comercial mais claros.",
    type: "website",
  },
};

export default function ContatoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
