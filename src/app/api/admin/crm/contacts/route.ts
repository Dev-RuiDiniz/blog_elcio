import { ContactSource, Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/admin-auth";
import { buildPagination, createContactWithLinks, parseLimit, parsePage } from "@/lib/crm/domain";

function parseContactSource(value: string | null): ContactSource | null {
  if (!value) return null;
  return Object.values(ContactSource).includes(value as ContactSource)
    ? (value as ContactSource)
    : null;
}

export async function GET(request: NextRequest) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const page = parsePage(searchParams.get("page"));
    const limit = parseLimit(searchParams.get("limit"));
    const search = (searchParams.get("search") || "").trim();
    const source = parseContactSource(searchParams.get("source"));
    const ownerUserId = (searchParams.get("ownerUserId") || "").trim();
    const onlyActive = searchParams.get("onlyActive") !== "false";

    const where: Prisma.ContactWhereInput = {};

    if (onlyActive) where.isActive = true;
    if (source) where.source = source;
    if (ownerUserId) where.ownerUserId = ownerUserId;
    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: "insensitive" } },
        { companyName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
        { whatsapp: { contains: search, mode: "insensitive" } },
      ];
    }

    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          ownerUser: {
            select: { id: true, name: true, email: true },
          },
          clientLinks: {
            include: {
              client: {
                select: { id: true, name: true, stage: true, status: true },
              },
            },
          },
        },
      }),
      prisma.contact.count({ where }),
    ]);

    return NextResponse.json({
      contacts,
      pagination: buildPagination(total, page, limit),
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json({ error: "Erro ao buscar contatos" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    const body = (await request.json()) as {
      fullName?: string;
      companyName?: string;
      email?: string;
      phone?: string;
      whatsapp?: string;
      position?: string;
      source?: ContactSource;
      origin?: string;
      notes?: string;
      ownerUserId?: string;
      clientIds?: string[];
    };

    if (!body.fullName || body.fullName.trim().length < 2) {
      return NextResponse.json({ error: "Nome do contato é obrigatório" }, { status: 400 });
    }

    const source = body.source && parseContactSource(body.source) ? body.source : ContactSource.MANUAL;
    const contact = await createContactWithLinks({
      fullName: body.fullName.trim(),
      companyName: body.companyName,
      email: body.email,
      phone: body.phone,
      whatsapp: body.whatsapp,
      position: body.position,
      source,
      origin: body.origin,
      notes: body.notes,
      ownerUserId: body.ownerUserId,
      clientIds: Array.isArray(body.clientIds) ? body.clientIds : [],
    });

    return NextResponse.json({ success: true, contact });
  } catch (error) {
    console.error("Error creating contact:", error);
    return NextResponse.json({ error: "Erro ao criar contato" }, { status: 500 });
  }
}
