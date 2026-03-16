import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Elcio",
  description: "Painel administrativo Elcio Representação",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
