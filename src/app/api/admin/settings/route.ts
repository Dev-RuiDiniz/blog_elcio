import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const settings = await prisma.siteSettings.findFirst();
    return NextResponse.json({ settings });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json({ error: "Erro ao buscar configurações" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const existing = await prisma.siteSettings.findFirst();
    
    let settings;
    if (existing) {
      settings = await prisma.siteSettings.update({
        where: { id: existing.id },
        data: {
          siteName: data.siteName,
          siteDescription: data.siteDescription,
          logo: data.logo,
          logoDark: data.logoDark,
          favicon: data.favicon,
          phone: data.phone,
          whatsapp: data.whatsapp,
          email: data.email,
          address: data.address,
          cnpj: data.cnpj,
          openingHours: data.workingHours,
          instagram: data.instagram,
          facebook: data.facebook,
          linkedin: data.linkedin,
          youtube: data.youtube,
          seoConfig: data.seoConfig || undefined,
        } as Record<string, unknown>,
      });
    } else {
      settings = await prisma.siteSettings.create({
        data: {
          siteName: data.siteName,
          siteDescription: data.siteDescription,
          logo: data.logo,
          logoDark: data.logoDark,
          favicon: data.favicon,
          phone: data.phone,
          whatsapp: data.whatsapp,
          email: data.email,
          address: data.address,
          cnpj: data.cnpj,
          openingHours: data.workingHours,
          instagram: data.instagram,
          facebook: data.facebook,
          linkedin: data.linkedin,
          youtube: data.youtube,
          seoConfig: data.seoConfig || undefined,
        } as Record<string, unknown>,
      });
    }

    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error("Error saving settings:", error);
    return NextResponse.json({ error: "Erro ao salvar configurações" }, { status: 500 });
  }
}
