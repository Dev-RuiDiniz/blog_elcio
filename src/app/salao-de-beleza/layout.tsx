import type { Metadata } from "next";
import { DynamicFavicon } from "@/components/DynamicFavicon";
import { buildMetadata, getFaviconUrl } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("salao");
}

export default async function SalaoDeBelezaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const faviconUrl = await getFaviconUrl("salao");
  return (
    <>
      <DynamicFavicon forceFavicon="maletti" faviconUrl={faviconUrl} />
      {children}
    </>
  );
}
