import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Comercial | Elcio",
  description:
    "Conteúdo de autoridade para apoiar decisões comerciais e técnicas com consultoria + catálogo.",
  openGraph: {
    title: "Blog Comercial | Elcio",
    description:
      "Conteúdo de autoridade para apoiar decisões comerciais e técnicas com consultoria + catálogo.",
    type: "website",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
