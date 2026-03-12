# Blog Elcio - Site Comercial + Admin CRM (Next.js + Prisma)

Site de apresentação comercial do Elcio com funil `Consultoria + Catálogo` e camada administrativa evoluída para mini-CRM operacional.

## Contatos oficiais

- E-mail: `vendas@raemtools.com.br`
- WhatsApp: `+55 12 99158-8460`
- Localidade: `Taubaté - SP`

## Núcleo público

Rotas ativas:
- `/`
- `/marcas`
- `/p/[slug]` (6 empresas)
- `/blog`
- `/contato`

Rotas legadas públicas são redirecionadas para `/`.

## Camada administrativa (CRM)

Módulos principais no dashboard:
- `/admin/crm/contatos`
- `/admin/crm/clientes`
- `/admin/crm/chamadas`
- `/admin/crm/agenda`
- `/admin/acesso`
- `/admin/kommo`
- `/admin/relatorios`

Funcionalidades administrativas entregues:
- Cadastro e gestão de contatos
- Gestão de clientes ativos por funil/status
- Log completo de chamadas com follow-up automático
- Agenda interna comercial
- Gestão de acessos (ADMIN/SUPER_ADMIN)
- Provisionamento dedicado do usuário do Elcio
- Sincronização manual CRM local + Kommo (incremental/full)

## Stack

- `next@16`, `react@19`, `typescript`
- `tailwindcss@4`
- `prisma` + `@prisma/client`
- `iron-session`
- `react-hook-form` + `zod`

## Estrutura relevante

```text
prisma/
  schema.prisma             # Schema completo (público + admin + CRM)
src/
  app/
    (site)/                 # Camada pública
    admin/                  # Dashboard administrativo
    api/                    # Endpoints públicos e admin
  lib/
    crm/                    # Camada de domínio CRM
    lead-context.ts         # Metadados das empresas + contrato CTA
    admin-auth.ts           # Guard de sessão/role para APIs admin
public/
  catalogos/
  images/empresas/
```

## Setup local

1. Instalar dependências:
```bash
pnpm install
```

2. Configurar ambiente:
- copiar `.env.example` para `.env`
- preencher `DATABASE_URL`, `SESSION_SECRET` e variáveis de integração necessárias

3. Gerar Prisma Client:
```bash
pnpm prisma generate
```

4. Subir para testes:
```bash
pnpm dev
```

URL local: `http://localhost:3003`

## Contratos do funil

- CTA interno padronizado com: `assunto`, `empresa`, `origem`
- Assunto padrão: `consultoria-catalogo`
- Leads públicos: `/api/kommo/leads`
- CRM admin:
  - `/api/admin/crm/contacts`
  - `/api/admin/crm/clients`
  - `/api/admin/crm/calls`
  - `/api/admin/crm/agenda`
  - `/api/admin/crm/sync`

## Segurança admin

- Sessão obrigatória para `/admin` e `/api/admin/*`
- Roles válidas: `ADMIN` e `SUPER_ADMIN`
- Hardening de login com:
  - bloqueio por tentativas falhas
  - validação de usuário ativo
  - reset seguro por token (`/api/auth/forgot-password` + `/api/auth/reset-password`)

## Dossiês de empresas

- Arquivos em `docs/empresas/*.md`
- Índice consolidado: `docs/empresas/README.md`
- Empresas atuais do portfólio:
  - `dormer-pramet`
  - `fecial`
  - `solofil`
  - `deltajet`
  - `nord-drivesystems`
  - `mercosul-motores`

## Scripts

- `pnpm dev` -> `next dev -p 3003`
- `pnpm build` -> `prisma generate && next build`
- `pnpm start` -> produção
- `pnpm lint` -> ESLint
