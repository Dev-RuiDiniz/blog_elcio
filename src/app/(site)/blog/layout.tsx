import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Comercial | Elcio",
  description:
    "Conteudo de autoridade para apoiar decisoes comerciais e tecnicas com consultoria + catalogo.",
  openGraph: {
    title: "Blog Comercial | Elcio",
    description:
      "Conteudo de autoridade para apoiar decisoes comerciais e tecnicas com consultoria + catalogo.",
    type: "website",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
