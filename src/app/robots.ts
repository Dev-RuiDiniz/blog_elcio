import { MetadataRoute } from "next";
import { headers } from "next/headers";

function resolveBaseUrl(host: string | null): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl) return envUrl.replace(/\/$/, "");
  if (!host) return "http://localhost:3003";
  return host.includes("localhost") ? `http://${host}` : `https://${host}`;
}

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const host = headersList.get("host");
  const baseUrl = resolveBaseUrl(host);

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/admin/", "/api/auth/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
