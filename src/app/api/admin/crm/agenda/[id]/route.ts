import { AgendaEventType, Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

function parseEventType(value: string | undefined): AgendaEventType | undefined {
  if (!value) return undefined;
  return Object.values(AgendaEventType).includes(value as AgendaEventType)
    ? (value as AgendaEventType)
    : undefined;
}

function parseDate(value: string | null | undefined): Date | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function cleanString(value: string | null | undefined): string | null {
  const normalized = (value || "").trim();
  return normalized.length > 0 ? normalized : null;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    const { id } = await params;
    const event = await prisma.agendaEvent.findUnique({
      where: { id },
      include: {
        client: { select: { id: true, name: true, stage: true, status: true } },
        contact: { select: { id: true, fullName: true, email: true, phone: true, whatsapp: true } },
        ownerUser: { select: { id: true, name: true, email: true } },
        createdByUser: { select: { id: true, name: true, email: true } },
      },
    });

    if (!event) {
      return NextResponse.json({ error: "Evento não encontrado" }, { status: 404 });
    }

    return NextResponse.json({ event });
  } catch (error) {
    console.error("Error fetching agenda event:", error);
    return NextResponse.json({ error: "Erro ao buscar evento" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    const { id } = await params;
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
      completedAt?: string | null;
    };

    const existing = await prisma.agendaEvent.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Evento não encontrado" }, { status: 404 });
    }

    const nextStatus = body.status !== undefined ? cleanString(body.status) || "OPEN" : existing.status;
    const completedAt =
      body.completedAt !== undefined
        ? parseDate(body.completedAt)
        : nextStatus === "DONE" && !existing.completedAt
          ? new Date()
          : existing.completedAt;

    const data: Prisma.AgendaEventUncheckedUpdateInput = {
      clientId: body.clientId !== undefined ? cleanString(body.clientId) : existing.clientId,
      contactId: body.contactId !== undefined ? cleanString(body.contactId) : existing.contactId,
      ownerUserId: body.ownerUserId !== undefined ? cleanString(body.ownerUserId) : existing.ownerUserId,
      createdByUserId:
        body.createdByUserId !== undefined ? cleanString(body.createdByUserId) : existing.createdByUserId,
      type: parseEventType(body.type) || existing.type,
      title: body.title ? body.title.trim() : existing.title,
      description: body.description !== undefined ? cleanString(body.description) : existing.description,
      location: body.location !== undefined ? cleanString(body.location) : existing.location,
      startsAt: body.startsAt !== undefined ? parseDate(body.startsAt) || existing.startsAt : existing.startsAt,
      endsAt: body.endsAt !== undefined ? parseDate(body.endsAt) : existing.endsAt,
      allDay: body.allDay !== undefined ? body.allDay : existing.allDay,
      status: nextStatus,
      reminderAt: body.reminderAt !== undefined ? parseDate(body.reminderAt) : existing.reminderAt,
      completedAt,
    };

    const event = await prisma.agendaEvent.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error("Error updating agenda event:", error);
    return NextResponse.json({ error: "Erro ao atualizar evento" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    const { id } = await params;
    await prisma.agendaEvent.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting agenda event:", error);
    return NextResponse.json({ error: "Erro ao remover evento" }, { status: 500 });
  }
}
