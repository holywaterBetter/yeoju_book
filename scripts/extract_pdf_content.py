from pathlib import Path

from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
PDF_PATH = ROOT / "yeoju_book_v1-수정요청.pdf"
OUT_DIR = ROOT / "content-source"
TEXT_OUT = OUT_DIR / "pdf-extract.md"
ANNOTATION_OUT = OUT_DIR / "pdf-annotations.md"


def normalized_lines(text: str) -> list[str]:
    return [" ".join(line.split()) for line in text.splitlines() if line.strip()]


def extract_annotations(page) -> list[str]:
    annotations_ref = page.get("/Annots")
    if not annotations_ref:
        return []

    annotations = annotations_ref.get_object() if hasattr(annotations_ref, "get_object") else annotations_ref
    results: list[str] = []
    for annotation in annotations:
        obj = annotation.get_object()
        if obj.get("/Subtype") == "/FreeText" and obj.get("/Contents"):
            results.append(" ".join(str(obj.get("/Contents")).split()))
    return results


def main() -> None:
    if not PDF_PATH.exists():
        raise FileNotFoundError(f"Missing source PDF: {PDF_PATH}")

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    reader = PdfReader(str(PDF_PATH))

    text_parts = [f"# PDF Text Extract\n\nSource: `{PDF_PATH.name}`\n\nPages: {len(reader.pages)}\n"]
    annotation_parts = [f"# PDF Annotation Extract\n\nSource: `{PDF_PATH.name}`\n\n"]

    for index, page in enumerate(reader.pages, start=1):
        lines = normalized_lines(page.extract_text() or "")
        annotations = extract_annotations(page)

        text_parts.append(f"\n## Page {index}\n\n")
        text_parts.append("\n".join(lines) if lines else "_No extractable text._")
        text_parts.append("\n")

        if annotations:
            annotation_parts.append(f"\n## Page {index}\n\n")
            for item in annotations:
                annotation_parts.append(f"- {item}\n")

    TEXT_OUT.write_text("".join(text_parts), encoding="utf-8")
    ANNOTATION_OUT.write_text("".join(annotation_parts), encoding="utf-8")
    print(f"Wrote {TEXT_OUT.relative_to(ROOT)}")
    print(f"Wrote {ANNOTATION_OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
