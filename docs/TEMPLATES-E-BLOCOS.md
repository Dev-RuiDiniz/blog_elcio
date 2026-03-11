# Templates e Blocos

## Conceito

A base usa blocos de conteudo para montar paginas dinamicas.
Cada bloco tem:
- `type`
- `content` (JSON)
- `order`
- `active`

O editor visual do admin define e persiste esses blocos.

## Blocos por categoria (editor visual)

## Hero

- `hero-slider`
- `hero`

## Conteudo

- `featured-products`
- `why-choose-us`
- `maletti-partnership`
- `maintenance-preview`
- `features`
- `cards`

## Midia

- `gallery`
- `video`

## CTA

- `catalog-cta`
- `cta`

## Basico

- `text`

## Contato

- `contact-hero`
- `contact-options`
- `contact-info`

## Manutencao

- `maintenance-hero`
- `maintenance-services`
- `maintenance-benefits`
- `maintenance-cta`
- `maintenance-faq`

## Produtos

- `products-hero`
- `products-grid`
- `products-cta`

## Marcas

- `brands-hero`
- `brands-section`
- `brands-partnership`
- `brands-cta`

## Sobre

- `about-hero`
- `about-mission`
- `about-values`
- `about-partnership`
- `about-cta`

## Maletti

- `maletti-hero`
- `maletti-essencia`
- `maletti-brasil`
- `maletti-headspa`
- `maletti-design`
- `maletti-catalogo`

## FAQ

- `faq-hero`
- `faq-items`
- `faq-cta`

## Garantia

- `garantia-hero`
- `garantia-info`
- `garantia-cta`

## Blog

- `blog-settings`

## Sistema

- `lp-404-content`

## Observacoes importantes

- Nem todo bloco e renderizado pelo mesmo componente.
- `BlockRenderer` cobre os blocos genericos e varias paginas dinamicas.
- Algumas paginas (ex.: Maletti, FAQ, Garantia, Blog, 404) leem blocos/configs com logica propria.
- A rota `/api/seed-home` popula templates base para slugs principais (`home`, `contato`, `manutencao`, `produtos`, `marcas`, `sobre`, `maletti`).

## Onde editar

- Lista de paginas: `/admin/paginas`
- Editor visual de uma pagina: `/admin/editor/[pageId]`
