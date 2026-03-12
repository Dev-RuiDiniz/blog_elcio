# Smoke Técnico - Funil de Leads (2026-03-12)

## Objetivo
Validar tecnicamente o funil "Consultoria + Catálogo" após as tarefas 1-3:
- contexto de lead (`assunto`, `empresa`, `origem`)
- padronização de CTA
- API de leads com fallback
- SEO básico da rota dinâmica de empresas

## Escopo desta execução
- Home, Blog, Marcas, páginas de empresa (`/p/[slug]`), Contato e API de leads
- Verificações automatizadas de lint/typecheck e inspeção de código por padrões

## Resultados

### 1) Lint geral do projeto
Comando:
```bash
pnpm lint
```
Resultado: **falhou** por erros legados do projeto.
- Total reportado: `20 errors`, `73 warnings`
- Os erros não foram introduzidos nesta tarefa de funil.

### 2) Typecheck geral
Comando:
```bash
pnpm exec tsc --noEmit
```
Resultado: **falhou** por erros legados/infra.
Principais pontos reportados:
- `src/lib/prisma.ts`: `PrismaClient` não exportado
- parâmetros com `implicit any` em rotas administrativas/sitemap

### 3) Verificação de hardcoded `/contato` sem contexto
Comandos:
```bash
rg --line-number --fixed-strings '|| "/contato"' "src/app/(site)" "src/components"
rg --line-number --fixed-strings 'href="/contato"' "src/app/(site)" "src/components"
rg --line-number --fixed-strings 'buttonLink: "/contato"' "src/app/(site)" "src/components" "src/app/admin/(dashboard)/editor/[pageId]/page.tsx" "src/app/api/seed-home/route.ts"
rg --line-number --fixed-strings 'secondaryLink: "/contato"' "src/app/(site)" "src/components" "src/app/admin/(dashboard)/editor/[pageId]/page.tsx" "src/app/api/seed-home/route.ts"
```
Resultado: **sem ocorrências** no escopo crítico.

### 4) Verificação de uso de `buildContactHref` no funil
Comando:
```bash
rg --line-number --fixed-strings "buildContactHref(" src/app src/components src/lib
```
Resultado: **ok**. Há uso consistente em header/footer, páginas-chave, editor default e seeds.

### 5) Verificação de contexto no contato
Comando:
```bash
rg --line-number "assuntoParam|empresaParam|origemParam|companySlug|interestType|originPage" "src/app/(site)/contato/page.tsx"
```
Resultado: **ok**.
- Query params lidos e aplicados (`assunto`, `empresa`, `origem`)
- payload envia `companySlug`, `interestType`, `originPage`

### 6) Verificação de contrato/fallback na API de leads
Comando:
```bash
rg --line-number "companySlug|companyName|interestType|originPage|source =|fallback|SMTP_" "src/app/api/kommo/leads/route.ts"
```
Resultado: **ok**.
- Campos adicionais aceitos
- `source` normalizado
- fallback SMTP previsto (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `LEAD_FALLBACK_TO`)

### 7) SEO básico nas páginas dinâmicas de empresa
Comando:
```bash
rg --line-number --fixed-strings "generateMetadata" "src/app/(site)/p/[slug]/page.tsx"
```
Resultado: **ok** (`generateMetadata` implementado).

## Limitações encontradas nesta execução
- Não foi possível rodar smoke HTTP com servidor local em background neste ambiente (bloqueio de política ao tentar orquestrar processo dev + requests no mesmo passo).
- Também não foi possível validar o handler da API por execução direta via `tsx`, devido ausência de schema Prisma no repositório (`*.prisma` não encontrado), impedindo gerar cliente local.

## Conclusão
- No escopo do funil de leads, os pontos estruturais de contexto/CTA/API/SEO estão **implementados e consistentes por inspeção técnica automatizada**.
- Existem pendências legadas de lint/typecheck no projeto, fora deste recorte, que ainda impedem o "verde" global.