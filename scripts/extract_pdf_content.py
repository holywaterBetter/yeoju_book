from pathlib import Path
from io import BytesIO

from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
PDF_PATH = ROOT / "yeoju_book_v1-수정요청.pdf"
OUT_DIR = ROOT / "content-source"
TEXT_OUT = OUT_DIR / "pdf-extract.md"
ANNOTATION_OUT = OUT_DIR / "pdf-annotations.md"
IMAGE_OUT_DIR = ROOT / "public" / "assets" / "pdf"
OG_IMAGE_OUT = ROOT / "public" / "og-image.png"

SELECTED_IMAGES = [
    {"page": 1, "image": 1, "filename": "hero-riverside-bike-path.webp", "label": "Riverside bike path"},
    {"page": 4, "image": 1, "filename": "riverside-bridge-ride.webp", "label": "Riverside bridge ride"},
    {"page": 7, "image": 1, "filename": "participants-river-bridge.webp", "label": "Participants at river bridge"},
    {"page": 9, "image": 1, "filename": "guide-orientation.webp", "label": "Guide orientation"},
    {"page": 12, "image": 1, "filename": "electric-bike.webp", "label": "Electric bicycle"},
    {"page": 12, "image": 2, "filename": "pas-controller.webp", "label": "PAS controller"},
    {"page": 13, "image": 1, "filename": "intercom-device.webp", "label": "Intercom device"},
    {"page": 14, "image": 1, "filename": "road-formation.webp", "label": "Road formation"},
    {"page": 14, "image": 2, "filename": "hand-signal.webp", "label": "Hand signal"},
    {"page": 16, "image": 1, "filename": "group-orientation.webp", "label": "Group orientation"},
    {"page": 18, "image": 1, "filename": "yeoju-rice-fields.webp", "label": "Yeoju rice fields"},
    {"page": 19, "image": 1, "filename": "sejong-course-map.webp", "label": "Sejong course map"},
    {"page": 23, "image": 2, "filename": "hwangpo-sailboat.webp", "label": "Hwangpo sailboat"},
    {"page": 27, "image": 1, "filename": "group-bikes-riverside.webp", "label": "Group bikes by riverside"},
    {"page": 29, "image": 1, "filename": "ohak-course-map.webp", "label": "Ohak course map"},
    {"page": 32, "image": 1, "filename": "green-rice-fields.webp", "label": "Green rice fields"},
    {"page": 32, "image": 2, "filename": "hwangpo-sailboat-sunset.webp", "label": "Hwangpo sailboat at sunset"},
    {"page": 35, "image": 1, "filename": "autumn-riders.webp", "label": "Autumn riders"},
]


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


def load_pdf_image(reader: PdfReader, page_number: int, image_number: int):
    try:
        from PIL import Image
    except ImportError as exc:
        raise RuntimeError("Pillow is required to extract PDF images.") from exc

    page = reader.pages[page_number - 1]
    images = list(getattr(page, "images", []))
    if image_number > len(images):
        raise IndexError(f"Page {page_number} has {len(images)} images, requested image {image_number}.")

    image = Image.open(BytesIO(images[image_number - 1].data))
    image.load()
    if image.mode not in ("RGB", "RGBA"):
        image = image.convert("RGB")
    return image


def resize_to_max_dimension(image, max_dimension: int = 1800):
    width, height = image.size
    largest = max(width, height)
    if largest <= max_dimension:
        return image

    scale = max_dimension / largest
    return image.resize((round(width * scale), round(height * scale)))


def cover_crop(image, size: tuple[int, int]):
    width, height = image.size
    target_width, target_height = size
    source_ratio = width / height
    target_ratio = target_width / target_height

    if source_ratio > target_ratio:
        new_width = round(height * target_ratio)
        left = (width - new_width) // 2
        image = image.crop((left, 0, left + new_width, height))
    else:
        new_height = round(width / target_ratio)
        top = (height - new_height) // 2
        image = image.crop((0, top, width, top + new_height))

    return image.resize(size)


def extract_selected_images(reader: PdfReader) -> None:
    IMAGE_OUT_DIR.mkdir(parents=True, exist_ok=True)

    for selected in SELECTED_IMAGES:
        image = load_pdf_image(reader, selected["page"], selected["image"])
        image = resize_to_max_dimension(image)
        output_path = IMAGE_OUT_DIR / selected["filename"]
        image.save(output_path, "WEBP", quality=86, method=6)
        print(f"Wrote {output_path.relative_to(ROOT)} ({selected['label']})")


def create_og_image(reader: PdfReader) -> None:
    try:
        from PIL import Image, ImageDraw, ImageFont
    except ImportError as exc:
        raise RuntimeError("Pillow is required to create the OG image.") from exc

    hero = load_pdf_image(reader, 1, 1).convert("RGB")
    canvas = cover_crop(hero, (1200, 630))
    overlay = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    draw.rectangle((0, 0, 1200, 630), fill=(8, 20, 18, 118))
    draw.rectangle((0, 0, 680, 630), fill=(8, 20, 18, 174))
    canvas = Image.alpha_composite(canvas.convert("RGBA"), overlay)
    draw = ImageDraw.Draw(canvas)

    font_paths = [
        Path("C:/Windows/Fonts/malgunbd.ttf"),
        Path("C:/Windows/Fonts/malgun.ttf"),
    ]
    title_font = ImageFont.truetype(str(font_paths[0]), 66) if font_paths[0].exists() else ImageFont.load_default()
    body_font = ImageFont.truetype(str(font_paths[1]), 34) if font_paths[1].exists() else ImageFont.load_default()
    label_font = ImageFont.truetype(str(font_paths[0]), 26) if font_paths[0].exists() else ImageFont.load_default()

    draw.text((86, 106), "따르릉 여주 한글길", fill=(255, 255, 255), font=title_font)
    draw.text((90, 206), "여주 자전거 시티투어", fill=(226, 242, 236), font=body_font)
    draw.rounded_rectangle((90, 430, 388, 502), radius=8, fill=(242, 107, 58))
    draw.text((124, 449), "Yeoju Bike Tour", fill=(255, 255, 255), font=label_font)

    OG_IMAGE_OUT.parent.mkdir(parents=True, exist_ok=True)
    canvas.convert("RGB").save(OG_IMAGE_OUT, "PNG", optimize=True)
    print(f"Wrote {OG_IMAGE_OUT.relative_to(ROOT)}")


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
    extract_selected_images(reader)
    create_og_image(reader)


if __name__ == "__main__":
    main()
