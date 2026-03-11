import type { Metadata } from "next";
import { DynamicFavicon } from "@/components/DynamicFavicon";
import { buildMetadata, getFaviconUrl } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("maletti");
}

export default async function MalettiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const faviconUrl = await getFaviconUrl("maletti");
  return (
    <>
      <DynamicFavicon forceFavicon="maletti" faviconUrl={faviconUrl} />
      {children}
    </>
  );
}
