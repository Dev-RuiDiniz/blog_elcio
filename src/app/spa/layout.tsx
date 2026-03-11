import type { Metadata } from "next";
import { DynamicFavicon } from "@/components/DynamicFavicon";
import { buildMetadata, getFaviconUrl } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("spa");
}

export default async function SpaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const faviconUrl = await getFaviconUrl("spa");
  return (
    <>
      <DynamicFavicon forceFavicon="maletti" faviconUrl={faviconUrl} />
      {children}
    </>
  );
}
