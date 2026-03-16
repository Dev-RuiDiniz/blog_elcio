# Arquitetura da Base

## Visao geral

A base segue o App Router do Next.js com separacao clara entre:
- Site publico.
- Painel administrativo.
- APIs para leitura, escrita e integracoes.
- Biblioteca de blocos reutilizaveis para renderizacao dinamica de paginas.

## Camadas

## 1) App (`src/app`)

- `(site)`
  - Rotas publicas do site principal.
  - Usa `Header`, `Footer` e `WhatsAppButton` no layout.
- `admin`
  - Painel de gestao com autenticao por sessao.
  - Dashboard, CRUDs, editor visual, scripts, configuracoes e mini-CRM (contatos, clientes, chamadas, agenda).
- `api`
  - Endpoints para dados publicos e operacoes admin.
- `login`
  - Setup inicial e login admin.

## 2) Componentes (`src/components`)

- `blocks/BlockRenderer.tsx`
  - Renderiza blocos dinamicos vindos do banco para paginas CMS.
- `admin/visual-editor`
  - Editor visual de conteudo por tipo de bloco.
- `layout`
  - Header, footer, busca e botao de WhatsApp.
- `sections`
  - Fallback estatico da home quando nao ha blocos no banco.

## 3) Libs (`src/lib`)

- `prisma.ts`
  - Singleton do Prisma Client.
- `session.ts` e `auth.ts`
  - Sessao via `iron-session`.
- `crm/*`
  - Servicos de dominio para funil comercial, historico de status e follow-up de agenda.
- `seo.ts`
  - SEO por chave de site (`elcio`).
- `getPageData.ts`
  - Busca blocos ativos por slug.

## Fluxo de conteudo dinamico

1. Admin cria/edita paginas e blocos em `/admin/paginas` + `/admin/editor/[pageId]`.
2. Dados sao persistidos em `page`, `pageBlock` e tabelas relacionadas.
3. No front, paginas usam API/public query + `BlockRenderer` para montar a tela.
4. Se nao houver blocos (ex.: home), existem componentes fallback estaticos.

## Protecao de admin

O `middleware.ts` faz:
- Protecao de `/admin` por cookie de sessao (`elcio-admin-session`).
- Redirects de slugs legados de empresas.

## Conteudo de layout editavel

Header e footer sao configurados por `layoutConfig` via:
- `/admin/cabecalho`
- `/admin/rodape`

## Upload de arquivos

- `ImageUpload` e editores visuais usam upload direto para Vercel Blob via `/api/upload/client`.
- Endpoint tradicional `/api/upload` permanece para casos server-side.

## Captacao de leads

- Formularios publicos enviam dados para `/api/leads`.
- Leads sao salvos no CRM interno (model `Contact`).

## Scripts dinamicos

- Cadastrados no admin (`/admin/scripts`).
- Injetados no client por `DynamicScripts` com filtro por site/posicao.
