import { MetadataRoute } from "next";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { COMPANY_OPTIONS } from "@/lib/lead-context";

function resolveBaseUrl(host: string | null): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl) return envUrl.replace(/\/$/, "");
  if (!host) return "http://localhost:3003";
  return host.includes("localhost") ? `http://${host}` : `https://${host}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const host = headersList.get("host");
  const baseUrl = resolveBaseUrl(host);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/marcas`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  const companyPages: MetadataRoute.Sitemap = COMPANY_OPTIONS.map((company) => ({
    url: `${baseUrl}/p/${company.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });
    blogPages = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    blogPages = [];
  }

  let dynamicPages: MetadataRoute.Sitemap = [];
  try {
    const reservedSlugs = ["home", "blog", "marcas", "contato", ...COMPANY_OPTIONS.map((company) => company.slug)];
    const pages = await prisma.page.findMany({
      where: {
        published: true,
        slug: { notIn: reservedSlugs },
      },
      select: { slug: true, updatedAt: true },
    });

    dynamicPages = pages.map((page) => ({
      url: `${baseUrl}/p/${page.slug}`,
      lastModified: page.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    }));
  } catch {
    dynamicPages = [];
  }

  return [...staticPages, ...companyPages, ...blogPages, ...dynamicPages];
}
