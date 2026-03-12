import { AgendaEventType, Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { buildPagination, parseLimit, parsePage } from "@/lib/crm/domain";

function parseEventType(value: string | null): AgendaEventType | null {
  if (!value) return null;
  return Object.values(AgendaEventType).includes(value as AgendaEventType)
    ? (value as AgendaEventType)
    : null;
}

function parseDate(value: string | null): Date | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function cleanString(value: string | undefined | null): string | null {
  const normalized = (value || "").trim();
  return normalized.length > 0 ? normalized : null;
}

export async function GET(request: NextRequest) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const page = parsePage(searchParams.get("page"));
    const limit = parseLimit(searchParams.get("limit"));
    const ownerUserId = cleanString(searchParams.get("ownerUserId"));
    const clientId = cleanString(searchParams.get("clientId"));
    const contactId = cleanString(searchParams.get("contactId"));
    const status = cleanString(searchParams.get("status"));
    const type = parseEventType(searchParams.get("type"));
    const from = parseDate(searchParams.get("from"));
    const to = parseDate(searchParams.get("to"));

    const where: Prisma.AgendaEventWhereInput = {};
    if (ownerUserId) where.ownerUserId = ownerUserId;
    if (clientId) where.clientId = clientId;
    if (contactId) where.contactId = contactId;
    if (status) where.status = status;
    if (type) where.type = type;
    if (from || to) {
      where.startsAt = {
        ...(from ? { gte: from } : {}),
        ...(to ? { lte: to } : {}),
      };
    }

    const [events, total] = await Promise.all([
      prisma.agendaEvent.findMany({
        where,
        orderBy: { startsAt: "asc" },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          client: { select: { id: true, name: true, stage: true, status: true } },
          contact: { select: { id: true, fullName: true, email: true, phone: true, whatsapp: true } },
          ownerUser: { select: { id: true, name: true, email: true } },
          createdByUser: { select: { id: true, name: true, email: true } },
        },
      }),
      prisma.agendaEvent.count({ where }),
    ]);

    return NextResponse.json({
      events,
      pagination: buildPagination(total, page, limit),
    });
  } catch (error) {
    console.error("Error fetching agenda:", error);
    return NextResponse.json({ error: "Erro ao buscar agenda" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    const body = (await request.json()) as {
      clientId?: string | null;
      contactId?: string | null;
      ownerUserId?: string | null;
      createdByUserId?: string | null;
      type?: AgendaEventType;
      title?: string;
      description?: string | null;
      location?: string | null;
      startsAt?: string;
      endsAt?: string | null;
      allDay?: boolean;
      status?: string | null;
      reminderAt?: string | null;
    };

    if (!body.title || body.title.trim().length < 2) {
      return NextResponse.json({ error: "Título é obrigatório" }, { status: 400 });
    }

    const startsAt = parseDate(body.startsAt || null);
    if (!startsAt) {
      return NextResponse.json({ error: "Data/hora de início é obrigatória" }, { status: 400 });
    }

    const type = parseEventType(body.type || null) || AgendaEventType.TASK;
    const event = await prisma.agendaEvent.create({
      data: {
        clientId: cleanString(body.clientId),
        contactId: cleanString(body.contactId),
        ownerUserId: cleanString(body.ownerUserId),
        createdByUserId: cleanString(body.createdByUserId),
        type,
        title: body.title.trim(),
        description: cleanString(body.description),
        location: cleanString(body.location),
        startsAt,
        endsAt: parseDate(body.endsAt || null),
        allDay: body.allDay ?? false,
        status: cleanString(body.status) || "OPEN",
        reminderAt: parseDate(body.reminderAt || null),
      },
    });

    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error("Error creating agenda event:", error);
    return NextResponse.json({ error: "Erro ao criar evento da agenda" }, { status: 500 });
  }
}
