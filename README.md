# Base de Desenvolvimento de Sites (Next.js + CMS)

Repositorio base para criar sites institucionais, landing pages e catalogos com painel administrativo, blocos visuais editaveis, blog, modulos de SEO e suporte a multi-dominio.

## Objetivo da base

Esta base ja vem com:
- Frontend pronto com App Router (Next.js 16) e Tailwind CSS v4.
- CMS proprio no painel (`/admin`) para conteudo, layout, paginas e scripts.
- Construtor visual de paginas por blocos.
- Estrutura de blog, catalogo de produtos, marcas, parceiros e banners.
- Integracao de upload com Vercel Blob.
- Integracao com Kommo CRM para captura de leads.
- Estrutura para operar dois contextos de marca (SHR e Maletti) no mesmo codigo.

## Stack

- `next@16`, `react@19`, `typescript`
- `tailwindcss@4`
- `prisma` + `@prisma/client`
- `iron-session` (autenticacao admin)
- `framer-motion`
- `@vercel/blob`
- `react-hook-form` + `zod`
- componentes UI baseados em Radix + utilitarios locais

## Estrutura principal

```text
src/
  app/
    (site)/                 # Site principal (rotas publicas)
    admin/                  # Painel administrativo
    api/                    # APIs publicas e admin
    maletti/                # LP/experiencia da marca Maletti
    spa/ tricologia/ salao-de-beleza/  # LPs dedicadas
    login/                  # Login e setup inicial
  components/
    admin/                  # UI do painel + editores
    blocks/                 # Renderizacao de blocos dinamicos
    layout/                 # Header, footer, busca, whatsapp
    sections/               # Fallbacks estaticos da home
    maletti/                # Blocos especificos da pagina maletti
  lib/
    prisma.ts               # Cliente Prisma
    auth.ts session.ts      # Sessao admin
    seo.ts                  # SEO por site/LP
    getPageData.ts          # leitura de blocos por slug
```

## Rotas publicas incluidas

- `/`
- `/produtos`, `/produtos/[slug]`
- `/marcas`
- `/blog`, `/blog/categorias`, `/blog/[slug]`
- `/contato`, `/sobre`, `/manutencao`, `/faq`, `/garantia`, `/categorias`
- `/p/[slug]` (paginas dinamicas do CMS)
- `/maletti`, `/spa`, `/tricologia`, `/salao-de-beleza`
- `/login`, `/login/setup`, `/admin/*`

## Dominios e roteamento

O `src/middleware.ts` faz roteamento por dominio:
- Dominios SHR servem o site principal.
- Dominios Maletti reescrevem rotas para `/maletti` (com excecoes para LPs dedicadas).
- Rotas `/admin` exigem cookie de sessao (`shr-admin-session`).

## CMS e templates

### Modulos admin prontos

- Paginas (CRUD + editor visual)
- Banners
- Produtos
- Marcas
- Catalogo
- Parceiros
- Blog
- Cabecalho
- Rodape
- Relatorios
- Kommo CRM
- Scripts
- Configuracoes gerais e SEO por site/LP

### Blocos/template de pagina

O editor visual ja inclui blocos para:
- Home, conteudo geral, midia e CTAs
- Contato
- Manutencao
- Produtos
- Marcas
- Sobre
- Maletti
- FAQ
- Garantia
- Configuracao do blog
- Conteudo da pagina 404

Documentacao detalhada dos blocos: [docs/TEMPLATES-E-BLOCOS.md](docs/TEMPLATES-E-BLOCOS.md)

## API

A base inclui APIs publicas e admin para conteudo, autenticacao, upload, scripts e integracoes.

Mapa completo de rotas e metodos: [docs/ROTAS-E-APIS.md](docs/ROTAS-E-APIS.md)

## Setup local

## 1) Instalar dependencias

```bash
pnpm install
```

## 2) Configurar ambiente

Copie `.env.example` para `.env` e ajuste os valores.

## 3) Rodar projeto

```bash
pnpm dev
```

Servidor padrao desta base: `http://localhost:3003`

## 4) Primeiro admin

- Acesse `http://localhost:3003/login/setup` para criar o primeiro usuario `SUPER_ADMIN`.
- Depois, login em `/login` e acesse `/admin`.

## Seed de paginas/blocos

Endpoint util para popular blocos base:
- `/api/seed-home?page=home`
- `/api/seed-home?page=contato`
- `/api/seed-home?page=manutencao`
- `/api/seed-home?page=produtos`
- `/api/seed-home?page=marcas`
- `/api/seed-home?page=sobre`
- `/api/seed-home?page=maletti`
- `/api/seed-company-pages` (cria/atualiza 6 paginas dinâmicas em `/p/[slug]`)

Exemplo:

```bash
curl "http://localhost:3003/api/seed-home?page=home"
curl "http://localhost:3003/api/seed-company-pages"
```

## Scripts NPM

- `pnpm dev` -> roda em `:3003`
- `pnpm build` -> `prisma generate && next build`
- `pnpm start` -> start de producao
- `pnpm lint` -> ESLint

## Estado atual importante

- O repositorio **nao contem** `prisma/schema.prisma`.
- Sem este arquivo, `pnpm build` falha no `prisma generate`.
- `pnpm lint` atualmente retorna erros e warnings existentes no codigo legado.

## Recomendacoes para usar como base em novo projeto

Checklist de adaptacao: [docs/CHECKLIST-NOVO-SITE.md](docs/CHECKLIST-NOVO-SITE.md)

Resumo rapido:
- Definir identidade visual e conteudo base (logos, cores, textos).
- Ajustar header/footer nas telas admin dedicadas.
- Configurar SEO por site/LP em `Configuracoes`.
- Configurar scripts de tracking em `Scripts`.
- Configurar Kommo se usar captura de leads.
- Validar sitemap/robots e comportamento de dominio.

## Documentacao adicional

- [docs/ARQUITETURA.md](docs/ARQUITETURA.md)
- [docs/TEMPLATES-E-BLOCOS.md](docs/TEMPLATES-E-BLOCOS.md)
- [docs/ROTAS-E-APIS.md](docs/ROTAS-E-APIS.md)
- [docs/CHECKLIST-NOVO-SITE.md](docs/CHECKLIST-NOVO-SITE.md)
