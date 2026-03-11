import type { Metadata } from "next";
import { DynamicFavicon } from "@/components/DynamicFavicon";
import { buildMetadata, getFaviconUrl } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("tricologia");
}

export default async function TricologiaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const faviconUrl = await getFaviconUrl("tricologia");
  return (
    <>
      <DynamicFavicon forceFavicon="maletti" faviconUrl={faviconUrl} />
      {children}
    </>
  );
}
