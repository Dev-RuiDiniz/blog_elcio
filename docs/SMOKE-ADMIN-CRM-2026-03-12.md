# Smoke Admin CRM - 2026-03-12

## Ambiente

- Node/PNPM local
- Build Next.js em modo produção
- Prisma Client gerado a partir de `prisma/schema.prisma`

## Execuções

1. `pnpm exec tsc --noEmit`
- Resultado: **OK** (sem erros de tipagem)

2. `pnpm build`
- Resultado: **OK** (build concluído)
- Rotas administrativas CRM presentes no output:
  - `/admin/crm/contatos`
  - `/admin/crm/clientes`
  - `/admin/crm/chamadas`
  - `/admin/crm/agenda`
  - `/admin/acesso`
- Endpoints CRM/admin presentes no output:
  - `/api/admin/crm/contacts`
  - `/api/admin/crm/clients`
  - `/api/admin/crm/calls`
  - `/api/admin/crm/agenda`
  - `/api/admin/crm/sync`
  - `/api/admin/users`

## Checklist funcional (escopo técnico)

- [x] CRUD base de contatos disponível
- [x] CRUD base de clientes disponível
- [x] Histórico de status de cliente via serviço transacional
- [x] Registro de chamadas com geração de follow-up em agenda
- [x] Agenda interna com status e filtros
- [x] Gestão de usuários admin + provisionamento dedicado do Elcio
- [x] Sincronização Local + Kommo (incremental/full)
- [x] Relatórios com métricas operacionais de funil

## Pendências/observações

- Aviso de dependência desatualizada `baseline-browser-mapping` (não bloqueante).
- Warning de depreciação global do Next 16 para `middleware` (convenção futura `proxy`), não bloqueante nesta entrega.
- Não houve teste de integração real com Kommo nesta validação (depende de credenciais ativas).
