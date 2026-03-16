# Checklist para Novo Site

Use esta lista para transformar esta base em um novo projeto rapidamente.

## 1) Setup tecnico

- Clonar repositorio.
- Rodar `pnpm install`.
- Criar `.env` a partir de `.env.example`.
- Garantir banco e schema Prisma disponiveis.
- Rodar `pnpm dev`.

## 2) Acesso admin

- Criar primeiro admin em `/login/setup`.
- Validar login em `/login`.
- Conferir menu completo em `/admin`.

## 3) Identidade visual

- Atualizar logos e favicon em `/admin/configuracoes`.
- Ajustar SEO e metadados das marcas e categorias principais.
- Revisar textos de contato e redes sociais.

## 4) Header e footer

- Editar `/admin/cabecalho` (variantes de layout).
- Editar `/admin/rodape` (variantes de layout).
- Validar links internos e externos.

## 5) Conteudo principal

- Revisar paginas em `/admin/paginas`.
- Usar `/admin/editor/[pageId]` para montar blocos.
- Para bootstrap rapido, usar `/api/seed-home?page=...`.
- Ajustar blocos das paginas dinamicas (`home`, `contato`, `manutencao`, `produtos`, `marcas`, `sobre`).

## 6) Catalogo e blog

- Cadastrar categorias, marcas, produtos e parceiros.
- Configurar posts, categorias e tags do blog.
- Revisar slugs e metadados SEO das paginas/conteudos.

## 7) Integracoes

- Upload: validar Vercel Blob (`/api/upload/client`).
- Scripts: configurar tags em `/admin/scripts`.
- Kommo: configurar credenciais e pipeline em `/admin/kommo`.

## 8) Dominio e indexacao

- Validar regra do `middleware.ts` para dominio alvo.
- Conferir `robots.txt` e `sitemap.xml`.
- Validar comportamento de rotas e redirecionamentos.

## 9) Qualidade

- Rodar `pnpm lint`.
- Rodar `pnpm build`.
- Corrigir warnings/erros pendentes antes de deploy.

## 10) Deploy

- Publicar em ambiente de staging.
- Testar formularios, busca, upload e admin.
- Publicar em producao apos checklist final.
