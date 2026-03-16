import {
  AgendaEventType,
  CallDirection,
  CallOutcome,
  ClientStage,
  ClientStatus,
  ContactSource,
} from "@prisma/client";

export const CONTACT_SOURCES = Object.values(ContactSource);
export const CLIENT_STAGES = Object.values(ClientStage);
export const CLIENT_STATUS = Object.values(ClientStatus);
export const CALL_DIRECTIONS = Object.values(CallDirection);
export const CALL_OUTCOMES = Object.values(CallOutcome);
export const AGENDA_EVENT_TYPES = Object.values(AgendaEventType);

export const CRM_DEFAULT_PAGE_SIZE = 20;
