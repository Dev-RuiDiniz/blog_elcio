# Smoke Test - Núcleo Público Elcio

Data: 2026-03-12

## Objetivo
Validar o núcleo público consolidado após a migração para o cliente atual.

## Rotas esperadas (200)
- `/`
- `/marcas`
- `/blog`
- `/contato`
- `/p/dormer-pramet`
- `/p/fecial`
- `/p/solofil`
- `/p/deltajet`
- `/p/nord-drivesystems`
- `/p/mercosul-motores`

Status: **OK**

## Rotas legadas (308 -> `/`)
- `/maletti`
- `/spa`
- `/tricologia`
- `/salao-de-beleza`
- `/produtos`
- `/faq`

Status: **OK**

## Consistência de marca (camada pública ativa)
Varredura por termos legados em arquivos críticos do núcleo público:
- termos testados: `SHR`, `Maletti`, `shrhair`, `Nilo`, `UKI`, `Marco Boni`
- arquivos testados: home, blog, marcas, contato, página dinâmica de empresa, header, footer, whatsapp button, seo, sitemap, robots, middleware, layout raiz.

Status: **OK** (sem ocorrências nos arquivos-alvo)

## CTA e funil
Verificação por inspeção de código:
- Home, Marcas, Blog e Páginas de Empresa usam `buildContactHref(...)` com `assunto=consultoria-catalogo` e `origem` por seção/contexto.
- CTA secundário de WhatsApp ativo com fallback neutro de telefone.

Status: **OK**
