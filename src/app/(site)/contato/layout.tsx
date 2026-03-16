import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato Comercial | Elcio",
  description:
    "Solicite consultoria + catálogo com o Elcio e receba atendimento comercial orientado para a sua demanda.",
  openGraph: {
    title: "Contato Comercial | Elcio",
    description:
      "Solicite consultoria + catálogo com o Elcio e receba atendimento comercial orientado para a sua demanda.",
    type: "website",
  },
};

export default function ContatoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
