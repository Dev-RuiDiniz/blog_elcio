# Blog Elcio - Site Público Comercial (Next.js + CMS)

Site de apresentação comercial do cliente Elcio, com foco em funil de `Consultoria + Catálogo` para 6 empresas representadas.

## Contatos oficiais

- E-mail: `vendas@raemtools.com.br`
- WhatsApp: `+55 12 99158-8460`
- Localidade: `Taubaté - SP`

## Escopo atual

Núcleo público ativo:
- `/`
- `/marcas`
- `/p/[slug]` (6 empresas)
- `/blog`
- `/contato`

Rotas legadas públicas redirecionadas para `/` (308):
- `/maletti`, `/spa`, `/tricologia`, `/salao-de-beleza`
- `/sobre`, `/produtos`, `/faq`, `/garantia`, `/manutencao`, `/categorias`
- `/blog/categorias`

O painel admin/CMS continua no repositório, mas o foco desta fase foi a camada pública.

## Stack

- `next@16`, `react@19`, `typescript`
- `tailwindcss@4`
- `prisma` + `@prisma/client`
- `iron-session`
- `framer-motion`
- `react-hook-form` + `zod`

## Funil comercial

- CTA principal: formulário em `/contato`
- Parâmetros padronizados: `assunto`, `empresa`, `origem`
- Assunto padrão: `consultoria-catalogo`
- WhatsApp: canal secundário/fallback
- Integração de leads: Kommo (`/api/kommo/leads`)

## Empresas representadas

Fonte única em [src/lib/lead-context.ts](src/lib/lead-context.ts):
- `dest-dormer-pramet`
- `fecial`
- `solufil`
- `deltajet`
- `f1300`
- `apresenta` (provisório)

Cada empresa contém:
- metadados comerciais
- PDF público em `/public/catalogos`
- imagem de capa e logo oficiais em `/public/images/empresas`

## Conteúdo e dossiês

Dossiês gerados a partir dos PDFs da raiz:
- `docs/empresas/*.md`
- índice: [docs/empresas/README.md](docs/empresas/README.md)
- fontes de imagens oficiais: [docs/empresas/IMAGENS-OFICIAIS.md](docs/empresas/IMAGENS-OFICIAIS.md)

## Estrutura relevante

```text
src/
  app/
    (site)/                 # Camada pública ativa
    admin/                  # Painel CMS (legado/operacional)
    api/                    # Endpoints públicos e admin
    login/                  # Autenticação admin
  components/
    blocks/                 # Render dos blocos dinâmicos
    layout/                 # Header, footer, whatsapp
  lib/
    lead-context.ts         # Metadados das 6 empresas + contrato de CTA
    seo.ts                  # SEO base do site público
    prisma.ts               # Prisma/fallback local
public/
  catalogos/                # PDFs públicos das empresas
  images/empresas/          # Logos e capas oficiais
```

## Setup local

1. Instalar dependências:
```bash
pnpm install
```

2. Configurar ambiente:
- copie `.env.example` para `.env`
- preencha variáveis necessárias (Kommo/e-mail/etc.)

3. Subir para testes locais:
```bash
pnpm exec next dev -p 3003 --webpack
```

URL local: `http://localhost:3003`

## Validações rápidas

Smoke principal:
- [docs/SMOKE-ELCIO-CORE-2026-03-12.md](docs/SMOKE-ELCIO-CORE-2026-03-12.md)

Checklist QA:
- [docs/QA-ELCIO-2026-03-12.md](docs/QA-ELCIO-2026-03-12.md)

Status local:
- [docs/STATUS-LOCAL-2026-03-12.md](docs/STATUS-LOCAL-2026-03-12.md)

## Limitações conhecidas

- O repositório não contém `prisma/schema.prisma`.
- Sem o schema, `pnpm build` pode falhar em `prisma generate`.
- Algumas rotinas de seed que dependem de banco real podem falhar no fallback local de Prisma.
- Em ambiente local sem Prisma gerado, `src/lib/prisma.ts` usa fallback mock para manter o front funcional.

## Scripts

- `pnpm dev` -> `next dev -p 3003`
- `pnpm build` -> `prisma generate && next build`
- `pnpm start` -> produção
- `pnpm lint` -> ESLint
