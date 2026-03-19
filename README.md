# Elcio Hub Industrial

Aplicacao Next.js que concentra o site comercial do Elcio, o hub de empresas industriais, o catalogo tecnico, o blog e um painel administrativo com CMS, CRM e configuracoes operacionais.

O projeto atende dois contextos no mesmo codigo:

- Site publico com paginas institucionais, paginas de empresas, busca de produtos, blog e captacao de leads.
- Backoffice autenticado para gestao de conteudo, catalogo, blog, layout, scripts, usuarios e operacao comercial.

## Escopo atual

### Site publico

Principais areas publicas:

- `/` home do hub B2B
- `/marcas` vitrine das empresas e solucoes
- `/p/[slug]` paginas individuais das empresas do portfolio
- `/produtos` e `/produtos/[slug]` catalogo de produtos
- `/blog`, `/blog/[slug]` e `/blog/categorias`
- `/categorias`
- `/solucoes/[slug]`
- `/sobre`
- `/contato`
- `/faq`
- `/garantia`
- `/manutencao`

O hub hoje trabalha com 7 empresas mapeadas em [`src/lib/lead-context.ts`](/C:/Users/RUI%20FRANCISCO/Documents/GitHub/blog_elcio/src/lib/lead-context.ts):

- Ardiri
- Autoplast
- Solofil
- Delta Jet
- NORD DRIVESYSTEMS
- Mercosul Motores
- WMG Assistencia Tecnica

Fluxos publicos relevantes:

- CTA para contato comercial, consultoria e download de catalogo
- Captacao de leads pelo site
- Integracao com Kommo para criacao de leads
- Fallback por e-mail quando a integracao do CRM nao estiver disponivel
- Redirecionamentos de slugs legados via [`src/proxy.ts`](/C:/Users/RUI%20FRANCISCO/Documents/GitHub/blog_elcio/src/proxy.ts)

### Backoffice

Rotas administrativas principais:

- `/login` e `/login/setup`
- `/admin`
- `/admin/home`
- `/admin/banners`
- `/admin/blog`
- `/admin/cabecalho`
- `/admin/catalogo`
- `/admin/configuracoes`
- `/admin/acesso`
- `/admin/crm/contatos`
- `/admin/crm/clientes`
- `/admin/crm/chamadas`
- `/admin/crm/agenda`
- `/admin/editor/[pageId]`
- `/admin/kommo`
- `/admin/marcas`
- `/admin/paginas`
- `/admin/parceiros`
- `/admin/produtos`
- `/admin/relatorios`
- `/admin/rodape`
- `/admin/scripts`

Capacidades atuais do painel:

- Gestao de produtos, categorias, marcas, parceiros e catalogos
- Gestao de banners, secoes da home, layout, cabecalho e rodape
- Gestao de blog, categorias e tags
- Editor visual/paginas dinamicas
- CRM interno com contatos, clientes, chamadas e agenda
- Relatorios com views e cliques
- Gestao de usuarios administrativos
- Configuracao da integracao com Kommo
- Cadastro de scripts de terceiros por posicao no site
- Upload de arquivos e imagens

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Prisma + PostgreSQL
- iron-session para sessao admin
- React Hook Form + Zod
- TipTap para edicao rica
- Vercel Blob para uploads
- Nodemailer para fallback de leads por e-mail

## Estrutura principal

```text
prisma/
  schema.prisma
src/
  app/
    (site)/                  # rotas publicas
    admin/                   # dashboard administrativo
    api/                     # APIs publicas, auth e admin
    login/                   # autenticacao do backoffice
  components/                # UI publica e admin
  contexts/                  # providers e temas
  data/                      # conteudo estruturado e detalhes das empresas
  lib/
    crm/                     # dominio do CRM interno
    admin-auth.ts            # guardas do admin
    lead-context.ts          # portfolio, CTAs e contexto comercial
    prisma.ts                # cliente Prisma
public/
  catalogos/                 # PDFs tecnicos do portfolio
  images/                    # imagens fixas do site e das empresas
  uploads/                   # uploads consumidos pelo CMS
docs/                        # runbooks, arquitetura e materiais de apoio
scripts/                     # scripts auxiliares de build
```

## Banco e modelos principais

O schema Prisma cobre tanto o site quanto o backoffice. Entidades centrais:

- `User`
- `Product`
- `Brand`
- `Category`
- `Partner`
- `Catalog`
- `Banner`
- `BlogPost`, `BlogCategory`, `BlogTag`, `BlogComment`
- `Page` e estruturas de layout/conteudo
- `Contact`, `Client`, `CallLog`, `AgendaEvent`
- `KommoSettings`
- `PageView` e `Click`
- `Script`

Referencia: [`prisma/schema.prisma`](/C:/Users/RUI%20FRANCISCO/Documents/GitHub/blog_elcio/prisma/schema.prisma)

## Variaveis de ambiente

Base minima para rodar o projeto:

```env
SESSION_SECRET=
DATABASE_URL=
BLOB_READ_WRITE_TOKEN=
NEXT_PUBLIC_SITE_URL=http://localhost:3003
FRONTEND_ONLY_DEPLOY=0
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
LEAD_FALLBACK_TO=
```

Arquivo de exemplo: [`.env.example`](/C:/Users/RUI%20FRANCISCO/Documents/GitHub/blog_elcio/.env.example)

Observacoes:

- `SESSION_SECRET` e obrigatorio para autenticacao admin.
- `DATABASE_URL` precisa apontar para PostgreSQL.
- `BLOB_READ_WRITE_TOKEN` e usado nos uploads.
- As variaveis SMTP sao usadas como fallback quando o envio para Kommo falha ou nao esta configurado.
- `FRONTEND_ONLY_DEPLOY=1` desabilita acesso ao admin/auth/upload no proxy e permite build de vitrine.

## Como rodar localmente

1. Instale as dependencias:

```bash
pnpm install
```

2. Configure o ambiente:

- copie [`.env.example`](/C:/Users/RUI%20FRANCISCO/Documents/GitHub/blog_elcio/.env.example) para `.env`
- preencha pelo menos `DATABASE_URL` e `SESSION_SECRET`

3. Gere o client do Prisma:

```bash
pnpm prisma generate
```

4. Rode em desenvolvimento:

```bash
pnpm dev
```

Aplicacao local: `http://localhost:3003`

## Scripts disponiveis

- `pnpm dev` inicia o Next em `3003`
- `pnpm build` executa `prisma generate` e `next build`
- `pnpm build:vercel` executa `prisma generate`, `prisma migrate deploy` e `next build`
- `pnpm build:frontend` faz build com defaults para deploy somente da vitrine
- `pnpm start` sobe a aplicacao em modo de producao
- `pnpm lint` executa o ESLint do projeto

Script de build frontend-only: [`scripts/build-frontend.mjs`](/C:/Users/RUI%20FRANCISCO/Documents/GitHub/blog_elcio/scripts/build-frontend.mjs)

## APIs em alto nivel

Grupos principais expostos em [`src/app/api`](/C:/Users/RUI%20FRANCISCO/Documents/GitHub/blog_elcio/src/app/api):

- Publicas: banners, blog, brands, categories, home-sections, layout, pages, products, scripts
- Leads: `/api/leads` e `/api/kommo/leads`
- Auth: `/api/auth/*`
- Admin: `/api/admin/*`
- Upload: `/api/upload` e `/api/upload/client`
- Seeds operacionais: `/api/seed-home` e `/api/seed-company-pages`

Mapa consolidado de rotas e endpoints: [`docs/ROTAS-E-APIS.md`](/C:/Users/RUI%20FRANCISCO/Documents/GitHub/blog_elcio/docs/ROTAS-E-APIS.md)

## Conteudo e ativos

- Catalogos tecnicos em [`public/catalogos`](/C:/Users/RUI%20FRANCISCO/Documents/GitHub/blog_elcio/public/catalogos)
- Covers e logos das empresas em [`public/images/empresas`](/C:/Users/RUI%20FRANCISCO/Documents/GitHub/blog_elcio/public/images/empresas)
- Uploads dinamicos do CMS em [`public/uploads`](/C:/Users/RUI%20FRANCISCO/Documents/GitHub/blog_elcio/public/uploads)
- Dossies e referencias das empresas em [`docs/empresas`](/C:/Users/RUI%20FRANCISCO/Documents/GitHub/blog_elcio/docs/empresas)

## Seguranca e comportamento

- O acesso a `/admin` exige cookie de sessao.
- APIs de administracao ficam sob `/api/admin/*`.
- O proxy protege admin/login em cenarios frontend-only e aplica redirects de slugs legados.
- O login possui fluxos de sessao, setup inicial e reset de senha.

## Estado atual do repositório

Este README descreve a realidade atual da aplicacao, mas o repositório ainda possui debitos tecnicos fora deste documento, especialmente avisos e erros de lint em areas administrativas antigas. Isso nao impede a manutencao de conteudo e ativos, mas precisa ser considerado antes de tratar o projeto como totalmente saneado.
