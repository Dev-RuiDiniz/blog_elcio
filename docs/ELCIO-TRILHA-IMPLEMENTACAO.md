# Trilha de Implementação - Site Elcio (Blog + CTA)

## Contexto
Este repositório será adaptado como site de apresentação comercial do Elcio, com foco em geração de leads e conteúdo de autoridade.

## Escopo Fechado
- Estrutura de site em arquitetura CMS dinâmica (Next.js + páginas por blocos).
- Hub de marcas/empresas representadas.
- Publicação de 6 páginas dinâmicas de empresas em `/p/[slug]`.
- CTA principal: formulário de contato com integração Kommo.
- CTA secundário: WhatsApp.
- Blog orientado a conversão no fim da jornada.
- SEO e indexação para páginas comerciais.

## Decisões Confirmadas
- Arquitetura: CMS dinâmico.
- CTA principal: `consultoria-catalogo` via formulário + CRM.
- WhatsApp como canal de apoio.
- 6ª empresa mantida com nome provisório (`Apresenta`) até validação de naming.

## Estratégia de Execução
- Implementação em tarefas pequenas.
- Um commit detalhado por tarefa.
- Push ao GitHub ao final de cada commit.
- Não incluir alterações locais não relacionadas (working tree existente).

## Observações Técnicas
- Há pendência conhecida de `prisma/schema.prisma` ausente no repositório base.
- Caso bloqueie build/deploy, tratar como subtarefa técnica específica ao final da trilha.
