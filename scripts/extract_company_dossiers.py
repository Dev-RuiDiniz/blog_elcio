#!/usr/bin/env python3
"""
Gera dossies markdown por empresa a partir dos PDFs da raiz do projeto.

Pipeline:
1) extração nativa de texto (pypdf)
2) OCR automático em páginas com baixa extração (tesseract + pypdfium2)
"""

from __future__ import annotations

import argparse
import re
import subprocess
import tempfile
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable, List

from pypdf import PdfReader

try:
    import pypdfium2 as pdfium  # type: ignore
except Exception:  # pragma: no cover - optional dependency
    pdfium = None


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_OUTPUT = ROOT / "docs" / "empresas"


@dataclass(frozen=True)
class CompanySource:
    slug: str
    name: str
    pdf_name: str
    teaser: str


COMPANIES: List[CompanySource] = [
    CompanySource(
        slug="dormer-pramet",
        name="Dormer Pramet",
        pdf_name="Dormer_Pramet.pdf",
        teaser="Soluções industriais com foco em performance, precisão e produtividade.",
    ),
    CompanySource(
        slug="fecial",
        name="Fecial",
        pdf_name="Fecial.pdf",
        teaser="Ferramentas e insertos especiais com desenvolvimento técnico consolidado.",
    ),
    CompanySource(
        slug="solofil",
        name="Solofil",
        pdf_name="Solofil.pdf",
        teaser="Catálogo de produtos para aplicações de filtragem e processos industriais.",
    ),
    CompanySource(
        slug="deltajet",
        name="Deltajet",
        pdf_name="Deltajet.pdf",
        teaser="Tecnologia aplicada para eficiência operacional em ambientes industriais.",
    ),
    CompanySource(
        slug="nord-drivesystems",
        name="NORD DRIVESYSTEMS",
        pdf_name="Nord_drivesystems.pdf",
        teaser="Acionamentos completos com foco em robustez e confiabilidade técnica.",
    ),
    CompanySource(
        slug="mercosul-motores",
        name="Mercosul Motores",
        pdf_name="Mercosul_motores.pdf",
        teaser="Soluções em motores com foco em eficiência energética e aplicação industrial.",
    ),
]


PRODUCT_KEYWORDS = [
    "brocas",
    "fresas",
    "machos",
    "insertos",
    "ferramentas",
    "filtros",
    "filtragem",
    "jatos",
    "bicos",
    "motorredutores",
    "redutores",
    "inversores",
    "acionamentos",
    "automação",
]

SEGMENT_KEYWORDS = [
    "industrial",
    "usinagem",
    "torneamento",
    "fresamento",
    "rosqueamento",
    "manutenção",
    "produção",
    "indústria",
    "energia",
    "processos",
]

VALUE_KEYWORDS = [
    "qualidade",
    "produtividade",
    "eficiência",
    "precisão",
    "robustez",
    "confiabilidade",
    "suporte",
    "tecnologia",
    "desempenho",
]


def normalize_text(value: str) -> str:
    value = value.replace("\x00", " ")
    value = re.sub(r"\s+", " ", value)
    return value.strip()


def run_tesseract(image_path: Path) -> str:
    # Português + inglês para melhorar cobertura de catálogos mistos.
    cmd = ["tesseract", str(image_path), "stdout", "-l", "por+eng", "--psm", "6"]
    result = subprocess.run(cmd, capture_output=True, check=False)
    stdout = (result.stdout or b"").decode("utf-8", errors="ignore")
    if result.returncode != 0:
        fallback = subprocess.run(
            ["tesseract", str(image_path), "stdout", "-l", "eng", "--psm", "6"],
            capture_output=True,
            check=False,
        )
        fallback_stdout = (fallback.stdout or b"").decode("utf-8", errors="ignore")
        return normalize_text(fallback_stdout)
    return normalize_text(stdout)


def ocr_page(pdf_path: Path, page_index: int, dpi: int = 220) -> str:
    if pdfium is None:
        return ""

    doc = pdfium.PdfDocument(str(pdf_path))
    try:
        page = doc[page_index]
        scale = dpi / 72
        bitmap = page.render(scale=scale)
        image = bitmap.to_pil()
    finally:
        if "page" in locals():
            page.close()
        doc.close()

    with tempfile.NamedTemporaryFile(suffix=".png", delete=False) as tmp:
        tmp_path = Path(tmp.name)
    try:
        image.save(tmp_path)
        return run_tesseract(tmp_path)
    finally:
        tmp_path.unlink(missing_ok=True)


def pick_keywords(text: str, words: Iterable[str], limit: int = 8) -> List[str]:
    lower = text.lower()
    found = [w for w in words if w in lower]
    return found[:limit]


def to_sentences(text: str, limit: int = 8) -> List[str]:
    chunks = re.split(r"(?<=[.!?])\s+|\s+\|\s+", text)
    cleaned = []
    for chunk in chunks:
        sentence = normalize_text(chunk)
        if len(sentence) < 40:
            continue
        if sentence in cleaned:
            continue
        cleaned.append(sentence)
        if len(cleaned) >= limit:
            break
    return cleaned


def build_markdown(
    company: CompanySource,
    total_pages: int,
    native_pages: int,
    ocr_pages: int,
    merged_text: str,
    extracted_evidence: List[str],
) -> str:
    product_terms = pick_keywords(merged_text, PRODUCT_KEYWORDS)
    segment_terms = pick_keywords(merged_text, SEGMENT_KEYWORDS)
    value_terms = pick_keywords(merged_text, VALUE_KEYWORDS)

    if not product_terms:
        product_terms = ["não identificado com confiança no material extraído"]
    if not segment_terms:
        segment_terms = ["não identificado com confiança no material extraído"]
    if not value_terms:
        value_terms = ["não identificado com confiança no material extraído"]

    lacunas = []
    if len(merged_text) < 600:
        lacunas.append("Volume textual baixo; recomenda-se validação manual com versão em alta qualidade.")
    if ocr_pages > 0:
        lacunas.append("Parte do conteúdo foi extraída via OCR e pode conter ruído de reconhecimento.")
    if not lacunas:
        lacunas.append("Sem lacunas críticas detectadas na extração atual.")

    evidence_lines = "\n".join(f"- [EXTRAÍDO] {line}" for line in extracted_evidence) or "- [EXTRAÍDO] Sem evidência textual suficiente."
    products_lines = "\n".join(f"- [EXTRAÍDO] {item}" for item in product_terms)
    segments_lines = "\n".join(f"- [EXTRAÍDO] {item}" for item in segment_terms)
    values_lines = "\n".join(f"- [EXTRAÍDO] {item}" for item in value_terms)
    lacunas_lines = "\n".join(f"- {item}" for item in lacunas)

    return f"""# {company.name}

## Visão Geral
- [INFERIDO] {company.teaser}
- [INFERIDO] Empresa tratada como opção de portfólio no atendimento consultivo do Elcio.

## Linhas de Produto/Serviço
{products_lines}

## Aplicações e Segmentos Atendidos
{segments_lines}

## Diferenciais e Argumentos Comerciais
{values_lines}

## Termos Técnicos Relevantes (SEO/Copy)
{products_lines}
{segments_lines}

## Evidências do PDF
{evidence_lines}

## Lacunas e Incertezas
{lacunas_lines}

## Métricas de Extração
- Páginas totais: `{total_pages}`
- Páginas com extração nativa útil: `{native_pages}`
- Páginas processadas por OCR: `{ocr_pages}`
"""


def extract_company(company: CompanySource, output_dir: Path, threshold: int) -> tuple[str, int, int]:
    pdf_path = ROOT / company.pdf_name
    if not pdf_path.exists():
        content = f"""# {company.name}

## Visão Geral
- [INFERIDO] Arquivo `{company.pdf_name}` não encontrado na raiz do projeto.

## Lacunas e Incertezas
- Não foi possível gerar dossiê técnico por ausência do PDF de origem.
"""
        (output_dir / f"{company.slug}.md").write_text(content, encoding="utf-8")
        return company.slug, 0, 0

    reader = PdfReader(str(pdf_path))
    page_texts: List[str] = []
    native_pages = 0
    ocr_pages = 0

    for page_index, page in enumerate(reader.pages):
        native_text = normalize_text(page.extract_text() or "")
        final_text = native_text

        if len(native_text) >= threshold:
            native_pages += 1
        else:
            ocr_text = ocr_page(pdf_path, page_index)
            if len(ocr_text) > len(native_text):
                final_text = ocr_text
                ocr_pages += 1

        if final_text:
            page_texts.append(final_text)

    merged_text = normalize_text(" | ".join(page_texts))
    evidence = to_sentences(merged_text, limit=10)
    markdown = build_markdown(
        company=company,
        total_pages=len(reader.pages),
        native_pages=native_pages,
        ocr_pages=ocr_pages,
        merged_text=merged_text,
        extracted_evidence=evidence,
    )

    (output_dir / f"{company.slug}.md").write_text(markdown, encoding="utf-8")
    return company.slug, native_pages, ocr_pages


def write_index(output_dir: Path, stats: List[tuple[str, int, int]]) -> None:
    lines = [
        "# Dossiê de Empresas - Base para o Novo Site",
        "",
        "Este diretório consolida os materiais extraídos dos PDFs da raiz do projeto.",
        "",
        "## Arquivos",
    ]
    slug_to_company = {company.slug: company for company in COMPANIES}
    for slug, native_pages, ocr_pages in stats:
        company = slug_to_company[slug]
        lines.append(
            f"- [{company.name}](./{slug}.md) - extração nativa: `{native_pages}` páginas, OCR: `{ocr_pages}` páginas"
        )

    lines.extend(
        [
            "",
            "## Regras de Leitura",
            "- Itens marcados com `[EXTRAÍDO]` vieram diretamente do conteúdo textual/ocr dos PDFs.",
            "- Itens marcados com `[INFERIDO]` são interpretações para apoiar copy e estrutura comercial do site.",
            "- Sempre revisar manualmente antes de publicação final de claims técnicos sensíveis.",
            "",
            "## Comando de Regeneração",
            "```bash",
            "python scripts/extract_company_dossiers.py --output-dir docs/empresas",
            "```",
        ]
    )

    (output_dir / "README.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser(description="Extrai dossiês das empresas representadas a partir dos PDFs.")
    parser.add_argument("--output-dir", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--ocr-threshold", type=int, default=80, help="Mínimo de caracteres para aceitar extração nativa da página.")
    args = parser.parse_args()

    output_dir = args.output_dir
    output_dir.mkdir(parents=True, exist_ok=True)

    stats: List[tuple[str, int, int]] = []
    for company in COMPANIES:
        stats.append(extract_company(company, output_dir=output_dir, threshold=args.ocr_threshold))

    write_index(output_dir, stats)

    print(f"Dossiês gerados em: {output_dir}")
    for slug, native_pages, ocr_pages in stats:
        print(f"- {slug}: native={native_pages}, ocr={ocr_pages}")


if __name__ == "__main__":
    main()
