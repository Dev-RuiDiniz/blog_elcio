# Runbook Admin CRM (Elcio)

## Acesso

- Login admin: `/login`
- Perfis aceitos:
  - `SUPER_ADMIN`
  - `ADMIN`
- Gestão de usuários: `/admin/acesso`

## Rotina diária recomendada

1. Abrir `/admin/crm/contatos` e validar novos contatos.
2. Evoluir contatos para clientes em `/admin/crm/clientes` com etapa/status.
3. Registrar interações em `/admin/crm/chamadas`.
4. Confirmar follow-ups e pendências em `/admin/crm/agenda`.
5. Revisar indicadores em `/admin/relatorios`.

## Integração Kommo

- Configuração e token: `/admin/kommo`
- Sync CRM:
  - incremental: `POST /api/admin/crm/sync?mode=incremental`
  - full: `POST /api/admin/crm/sync?mode=full`

## Endpoints principais

- Contatos: `/api/admin/crm/contacts`
- Clientes: `/api/admin/crm/clients`
- Chamadas: `/api/admin/crm/calls`
- Agenda: `/api/admin/crm/agenda`
- Usuários admin: `/api/admin/users`

## Recuperação de senha

- Solicitar reset: `POST /api/auth/forgot-password`
- Aplicar reset: `POST /api/auth/reset-password`

## Observações operacionais

- Cliente ativo é determinado por `status=ACTIVE` e etapa diferente de `INACTIVE/LOST`.
- Atualização de etapa/status gera histórico em `ClientStatusHistory`.
- Chamada com `nextActionAt` gera evento automático de follow-up na agenda.
