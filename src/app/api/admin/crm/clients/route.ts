import { ClientStage, ClientStatus, Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { requireAdminAuth } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { buildPagination, createClientWithHistory, parseLimit, parsePage } from "@/lib/crm/domain";

function parseClientStage(value: string | null): ClientStage | null {
  if (!value) return null;
  return Object.values(ClientStage).includes(value as ClientStage) ? (value as ClientStage) : null;
}

function parseClientStatus(value: string | null): ClientStatus | null {
  if (!value) return null;
  return Object.values(ClientStatus).includes(value as ClientStatus)
    ? (value as ClientStatus)
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
    const stage = parseClientStage(searchParams.get("stage"));
    const status = parseClientStatus(searchParams.get("status"));
    const ownerUserId = (searchParams.get("ownerUserId") || "").trim();
    const onlyActive = searchParams.get("onlyActive") !== "false";

    const andConditions: Prisma.ClientWhereInput[] = [];
    if (stage) andConditions.push({ stage });
    if (status) andConditions.push({ status });
    if (ownerUserId) andConditions.push({ ownerUserId });

    if (onlyActive) {
      andConditions.push({
        status: ClientStatus.ACTIVE,
        stage: { notIn: [ClientStage.INACTIVE, ClientStage.LOST] },
      });
    }

    if (search) {
      andConditions.push({
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { segment: { contains: search, mode: "insensitive" } },
          { notes: { contains: search, mode: "insensitive" } },
          {
            contactLinks: {
              some: {
                contact: {
                  OR: [
                    { fullName: { contains: search, mode: "insensitive" } },
                    { email: { contains: search, mode: "insensitive" } },
                    { phone: { contains: search, mode: "insensitive" } },
                  ],
                },
              },
            },
          },
        ],
      });
    }

    const where: Prisma.ClientWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

    const [clients, total] = await Promise.all([
      prisma.client.findMany({
        where,
        orderBy: { updatedAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          ownerUser: { select: { id: true, name: true, email: true } },
          contactLinks: {
            include: {
              contact: {
                select: { id: true, fullName: true, email: true, phone: true, whatsapp: true },
              },
            },
          },
          _count: { select: { calls: true, agendaEvents: true } },
        },
      }),
      prisma.client.count({ where }),
    ]);

    return NextResponse.json({
      clients,
      pagination: buildPagination(total, page, limit),
    });
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json({ error: "Erro ao buscar clientes" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    const session = await getSession();
    const body = (await request.json()) as {
      name?: string;
      segment?: string;
      stage?: ClientStage;
      status?: ClientStatus;
      notes?: string;
      ownerUserId?: string;
      contactIds?: string[];
      valueEstimate?: number | string | null;
      kommoContactId?: number | null;
      kommoLeadId?: number | null;
    };

    if (!body.name || body.name.trim().length < 2) {
      return NextResponse.json({ error: "Nome do cliente é obrigatório" }, { status: 400 });
    }

    const stage = parseClientStage(body.stage || null) || ClientStage.LEAD;
    const status = parseClientStatus(body.status || null) || ClientStatus.ACTIVE;

    const client = await createClientWithHistory(
      {
        name: body.name.trim(),
        segment: body.segment,
        stage,
        status,
        notes: body.notes,
        ownerUserId: body.ownerUserId,
        contactIds: Array.isArray(body.contactIds) ? body.contactIds : [],
        valueEstimate: body.valueEstimate,
        kommoContactId: body.kommoContactId,
        kommoLeadId: body.kommoLeadId,
      },
      session.userId
    );

    return NextResponse.json({ success: true, client });
  } catch (error) {
    console.error("Error creating client:", error);
    return NextResponse.json({ error: "Erro ao criar cliente" }, { status: 500 });
  }
}
