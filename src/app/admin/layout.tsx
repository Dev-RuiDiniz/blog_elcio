import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | SHR",
  description: "Painel administrativo SHR",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
