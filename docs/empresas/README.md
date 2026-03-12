# Dossiê de Empresas - Base para o Novo Site

Este diretório consolida os materiais extraídos dos PDFs da raiz do projeto.

## Arquivos
- [DEST DORMER PRAMET](./dest-dormer-pramet.md) - extração nativa: `30` páginas, OCR: `1` páginas
- [Fecial](./fecial.md) - extração nativa: `7` páginas, OCR: `0` páginas
- [Solufil](./solufil.md) - extração nativa: `0` páginas, OCR: `6` páginas
- [Deltajet](./deltajet.md) - extração nativa: `0` páginas, OCR: `2` páginas
- [F1300](./f1300.md) - extração nativa: `16` páginas, OCR: `0` páginas
- [Apresenta (provisório)](./apresenta.md) - extração nativa: `7` páginas, OCR: `6` páginas

## Regras de Leitura
- Itens marcados com `[EXTRAÍDO]` vieram diretamente do conteúdo textual/ocr dos PDFs.
- Itens marcados com `[INFERIDO]` são interpretações para apoiar copy e estrutura comercial do site.
- Sempre revisar manualmente antes de publicação final de claims técnicos sensíveis.

## Comando de Regeneração
```bash
python scripts/extract_company_dossiers.py --output-dir docs/empresas
```
