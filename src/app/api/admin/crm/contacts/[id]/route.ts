import { ContactSource, Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/admin-auth";

function parseContactSource(value: string | undefined): ContactSource | undefined {
  if (!value) return undefined;
  return Object.values(ContactSource).includes(value as ContactSource)
    ? (value as ContactSource)
    : undefined;
}

function cleanString(value: string | undefined | null): string | null {
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

    const contact = await prisma.contact.findUnique({
      where: { id },
      include: {
        ownerUser: { select: { id: true, name: true, email: true } },
        clientLinks: {
          include: {
            client: {
              select: { id: true, name: true, stage: true, status: true },
            },
          },
        },
        calls: {
          orderBy: { startedAt: "desc" },
          take: 30,
        },
        agendaEvents: {
          orderBy: { startsAt: "asc" },
          take: 30,
        },
      },
    });

    if (!contact) {
      return NextResponse.json({ error: "Contato não encontrado" }, { status: 404 });
    }

    return NextResponse.json({ contact });
  } catch (error) {
    console.error("Error fetching contact:", error);
    return NextResponse.json({ error: "Erro ao buscar contato" }, { status: 500 });
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
      fullName?: string;
      companyName?: string | null;
      email?: string | null;
      phone?: string | null;
      whatsapp?: string | null;
      position?: string | null;
      source?: ContactSource;
      origin?: string | null;
      notes?: string | null;
      ownerUserId?: string | null;
      clientIds?: string[];
      isActive?: boolean;
    };

    const existing = await prisma.contact.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Contato não encontrado" }, { status: 404 });
    }

    const source = parseContactSource(body.source);
    const data: Prisma.ContactUncheckedUpdateInput = {
      fullName: body.fullName ? body.fullName.trim() : existing.fullName,
      companyName: body.companyName !== undefined ? cleanString(body.companyName) : existing.companyName,
      email: body.email !== undefined ? cleanString(body.email) : existing.email,
      phone: body.phone !== undefined ? cleanString(body.phone) : existing.phone,
      whatsapp: body.whatsapp !== undefined ? cleanString(body.whatsapp) : existing.whatsapp,
      position: body.position !== undefined ? cleanString(body.position) : existing.position,
      source: source || existing.source,
      origin: body.origin !== undefined ? cleanString(body.origin) : existing.origin,
      notes: body.notes !== undefined ? cleanString(body.notes) : existing.notes,
      ownerUserId: body.ownerUserId !== undefined ? cleanString(body.ownerUserId) : existing.ownerUserId,
      isActive: body.isActive ?? existing.isActive,
    };

    const contact = await prisma.$transaction(async (tx) => {
      const updated = await tx.contact.update({
        where: { id },
        data,
      });

      if (body.clientIds) {
        await tx.clientContact.deleteMany({ where: { contactId: id } });
        if (body.clientIds.length > 0) {
          await tx.clientContact.createMany({
            data: body.clientIds.map((clientId, index) => ({
              clientId,
              contactId: id,
              isPrimary: index === 0,
            })),
          });
        }
      }

      return updated;
    });

    return NextResponse.json({ success: true, contact });
  } catch (error) {
    console.error("Error updating contact:", error);
    return NextResponse.json({ error: "Erro ao atualizar contato" }, { status: 500 });
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

    const contact = await prisma.contact.findUnique({ where: { id } });
    if (!contact) {
      return NextResponse.json({ error: "Contato não encontrado" }, { status: 404 });
    }

    await prisma.contact.update({
      where: { id },
      data: { isActive: false },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting contact:", error);
    return NextResponse.json({ error: "Erro ao remover contato" }, { status: 500 });
  }
}
