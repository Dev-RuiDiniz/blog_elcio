# Baseline Admin CRM - 2026-03-12

## Contexto
Este baseline define o ponto de partida para a evolução da camada administrativa para mini-CRM do Elcio.

## Estado atual do Admin
- Rotas de dashboard ativas em `src/app/admin/(dashboard)`:
  - `page.tsx` (visão geral)
  - módulos de conteúdo: `paginas`, `banners`, `produtos`, `marcas`, `catalogo`, `parceiros`, `blog`, `cabecalho`, `rodape`
  - módulos auxiliares: `kommo`, `relatorios`, `scripts`, `configuracoes`
- Layout administrativo exige sessão com role `ADMIN` ou `SUPER_ADMIN`.
- Sidebar ainda não possui módulos de CRM (contatos, clientes, chamadas, agenda, acesso).

## Estado atual de autenticação
- Sessão via `iron-session` em cookie `shr-admin-session`.
- Login valida role `ADMIN`/`SUPER_ADMIN`.
- Setup inicial cria `SUPER_ADMIN`.
- Recuperação de senha atual ainda usa senha temporária retornada na resposta (inseguro para produção).

## APIs administrativas existentes
- Total de namespaces em `src/app/api/admin`: conteúdo, layout, kommo, relatórios, scripts, settings.
- Parte das rotas já possui guarda de sessão/role (`pages`, `layout`, `kommo`).
- Parte relevante ainda sem guarda consistente (principalmente conteúdo e relatórios).

## Lacunas para migração CRM
- Não existem entidades dedicadas para:
  - contatos
  - clientes ativos por funil/status
  - histórico de status
  - chamadas
  - agenda interna
- Não existe namespace API CRM (`/api/admin/crm/*`).
- Não existem telas de CRM no dashboard.
- Não existe gestão de usuários admin dedicada (conta Elcio + políticas de senha).

## Checklist de migração (escopo fechado)
1. Gerar `prisma/schema.prisma` a partir do banco existente.
2. Proteger endpoints admin write/sensíveis com sessão + role.
3. Modelar entidades CRM no schema e gerar client.
4. Implementar serviços de domínio CRM (transações + histórico).
5. Expor APIs de contatos, clientes, chamadas e agenda.
6. Criar módulo de acesso admin (Elcio + SuperAdmin).
7. Adicionar telas CRM no dashboard e atualizar sidebar.
8. Integrar sincronização local + Kommo (idempotente).
9. Adicionar relatórios operacionais de funil/chamadas/agenda.
10. Documentar operação e checklist de smoke final.
