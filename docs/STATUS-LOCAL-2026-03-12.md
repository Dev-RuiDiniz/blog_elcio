# Status Local - 2026-03-12

## Ambiente
- Servidor local derrubado com sucesso.
- Porta validada sem escuta: `3003`.

## Estado funcional publicado
- Último commit de mídia no `main`: `e92f5f0`.
- O front público está configurado para usar imagens oficiais das 6 empresas em `public/images/empresas`.
- Fontes das imagens documentadas em `docs/empresas/IMAGENS-OFICIAIS.md`.

## Como subir novamente para testes
```bash
pnpm exec next dev -p 3003 --webpack
```
