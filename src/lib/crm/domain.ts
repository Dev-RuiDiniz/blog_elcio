import {
  AgendaEventType,
  CallDirection,
  CallOutcome,
  ClientStage,
  ClientStatus,
  ContactSource,
  Prisma,
} from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { CRM_DEFAULT_PAGE_SIZE } from "@/lib/crm/constants";

type OptionalString = string | null | undefined;

function cleanString(value: OptionalString): string | null {
  const normalized = (value || "").trim();
  return normalized.length > 0 ? normalized : null;
}

export function parsePage(value: string | null): number {
  const parsed = Number(value || "1");
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 1;
}

export function parseLimit(value: string | null): number {
  const parsed = Number(value || CRM_DEFAULT_PAGE_SIZE);
  if (!Number.isFinite(parsed) || parsed <= 0) return CRM_DEFAULT_PAGE_SIZE;
  return Math.min(Math.floor(parsed), 100);
}

export function buildPagination(total: number, page: number, limit: number) {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  return { page, limit, total, totalPages };
}

export interface ClientCreateInput {
  name: string;
  segment?: OptionalString;
  stage?: ClientStage;
  status?: ClientStatus;
  notes?: OptionalString;
  ownerUserId?: OptionalString;
  contactIds?: string[];
  valueEstimate?: number | string | null;
}

export interface ClientUpdateInput {
  clientId: string;
  name?: OptionalString;
  segment?: OptionalString;
  stage?: ClientStage;
  status?: ClientStatus;
  notes?: OptionalString;
  ownerUserId?: OptionalString;
  contactIds?: string[];
  valueEstimate?: number | string | null;
  changedByUserId?: OptionalString;
  historyNote?: OptionalString;
}

function parseDecimal(value: number | string | null | undefined): Prisma.Decimal | null {
  if (value === null || value === undefined || value === "") return null;
  return new Prisma.Decimal(value);
}

export async function createClientWithHistory(input: ClientCreateInput, changedByUserId?: OptionalString) {
  const stage = input.stage || ClientStage.LEAD;
  const status = input.status || ClientStatus.ACTIVE;

  return prisma.$transaction(async (tx) => {
    const client = await tx.client.create({
      data: {
        name: input.name.trim(),
        segment: cleanString(input.segment),
        stage,
        status,
        notes: cleanString(input.notes),
        ownerUserId: cleanString(input.ownerUserId),
        valueEstimate: parseDecimal(input.valueEstimate),
        contactLinks:
          input.contactIds && input.contactIds.length > 0
            ? {
                create: input.contactIds.map((contactId, index) => ({
                  contactId,
                  isPrimary: index === 0,
                })),
              }
            : undefined,
      },
      include: {
        contactLinks: { include: { contact: true } },
      },
    });

    await tx.clientStatusHistory.create({
      data: {
        clientId: client.id,
        newStage: stage,
        newStatus: status,
        changedByUserId: cleanString(changedByUserId),
        notes: "Cliente criado no CRM",
      },
    });

    return client;
  });
}

export async function updateClientWithHistory(input: ClientUpdateInput) {
  return prisma.$transaction(async (tx) => {
    const current = await tx.client.findUnique({
      where: { id: input.clientId },
      include: { contactLinks: true },
    });

    if (!current) {
      throw new Error("Cliente não encontrado");
    }

    const nextStage = input.stage ?? current.stage;
    const nextStatus = input.status ?? current.status;
    const stageChanged = nextStage !== current.stage;
    const statusChanged = nextStatus !== current.status;

    const client = await tx.client.update({
      where: { id: input.clientId },
      data: {
        name: input.name ? input.name.trim() : current.name,
        segment: input.segment !== undefined ? cleanString(input.segment) : current.segment,
        stage: nextStage,
        status: nextStatus,
        notes: input.notes !== undefined ? cleanString(input.notes) : current.notes,
        ownerUserId: input.ownerUserId !== undefined ? cleanString(input.ownerUserId) : current.ownerUserId,
        valueEstimate:
          input.valueEstimate !== undefined ? parseDecimal(input.valueEstimate) : current.valueEstimate,
      },
    });

    if (input.contactIds) {
      await tx.clientContact.deleteMany({ where: { clientId: current.id } });
      if (input.contactIds.length > 0) {
        await tx.clientContact.createMany({
          data: input.contactIds.map((contactId, index) => ({
            clientId: current.id,
            contactId,
            isPrimary: index === 0,
          })),
        });
      }
    }

    if (stageChanged || statusChanged) {
      await tx.clientStatusHistory.create({
        data: {
          clientId: current.id,
          oldStage: current.stage,
          newStage: nextStage,
          oldStatus: current.status,
          newStatus: nextStatus,
          changedByUserId: cleanString(input.changedByUserId),
          notes: cleanString(input.historyNote),
        },
      });
    }

    return client;
  });
}

export interface CreateCallInput {
  clientId?: OptionalString;
  contactId?: OptionalString;
  ownerUserId?: OptionalString;
  direction: CallDirection;
  outcome?: CallOutcome;
  subject?: OptionalString;
  summary?: OptionalString;
  durationSeconds?: number | null;
  startedAt?: Date;
  nextActionAt?: Date | null;
}

export async function createCallWithFollowUp(input: CreateCallInput) {
  return prisma.$transaction(async (tx) => {
    const call = await tx.callLog.create({
      data: {
        clientId: cleanString(input.clientId),
        contactId: cleanString(input.contactId),
        ownerUserId: cleanString(input.ownerUserId),
        direction: input.direction || CallDirection.OUTBOUND,
        outcome: input.outcome || CallOutcome.OTHER,
        subject: cleanString(input.subject),
        summary: cleanString(input.summary),
        durationSeconds: input.durationSeconds ?? null,
        startedAt: input.startedAt || new Date(),
        nextActionAt: input.nextActionAt ?? null,
      },
    });

    let followUpEventId: string | null = null;
    if (input.nextActionAt) {
      const event = await tx.agendaEvent.create({
        data: {
          type: AgendaEventType.FOLLOW_UP,
          title: cleanString(input.subject) || "Follow-up de chamada",
          description: cleanString(input.summary),
          startsAt: input.nextActionAt,
          ownerUserId: cleanString(input.ownerUserId),
          createdByUserId: cleanString(input.ownerUserId),
          clientId: cleanString(input.clientId),
          contactId: cleanString(input.contactId),
          status: "OPEN",
        },
      });
      followUpEventId = event.id;
    }

    return { call, followUpEventId };
  });
}

export interface ContactCreateInput {
  fullName: string;
  companyName?: OptionalString;
  email?: OptionalString;
  phone?: OptionalString;
  whatsapp?: OptionalString;
  position?: OptionalString;
  source?: ContactSource;
  origin?: OptionalString;
  notes?: OptionalString;
  ownerUserId?: OptionalString;
  clientIds?: string[];
}

export async function createContactWithLinks(input: ContactCreateInput) {
  return prisma.$transaction(async (tx) => {
    const contact = await tx.contact.create({
      data: {
        fullName: input.fullName.trim(),
        companyName: cleanString(input.companyName),
        email: cleanString(input.email),
        phone: cleanString(input.phone),
        whatsapp: cleanString(input.whatsapp),
        position: cleanString(input.position),
        source: input.source || ContactSource.MANUAL,
        origin: cleanString(input.origin),
        notes: cleanString(input.notes),
        ownerUserId: cleanString(input.ownerUserId),
      },
    });

    if (input.clientIds && input.clientIds.length > 0) {
      await tx.clientContact.createMany({
        data: input.clientIds.map((clientId, index) => ({
          clientId,
          contactId: contact.id,
          isPrimary: index === 0,
        })),
      });
    }

    return contact;
  });
}
