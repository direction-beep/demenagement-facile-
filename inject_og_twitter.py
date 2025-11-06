import re
from pathlib import Path

ROOT = Path(__file__).parent
DEFAULT_IMAGE = "/images/og-image.jpg"

TITLE_RE = re.compile(r"<title>(.*?)</title>", re.IGNORECASE | re.DOTALL)
DESC_RE = re.compile(r"<meta[^>]*name=\"description\"[^>]*content=\"([^\"]*)\"[^>]*/?>", re.IGNORECASE)
CANON_RE = re.compile(r"<link[^>]*rel=\"canonical\"[^>]*href=\"([^\"]*)\"[^>]*/?>", re.IGNORECASE)
HEAD_OPEN = re.compile(r"<head[^>]*>", re.IGNORECASE)

# Patterns for existing OG/Twitter
OG_TITLE = re.compile(r"<meta[^>]*property=\"og:title\"[^>]*>", re.IGNORECASE)
OG_DESC = re.compile(r"<meta[^>]*property=\"og:description\"[^>]*>", re.IGNORECASE)
OG_URL = re.compile(r"<meta[^>]*property=\"og:url\"[^>]*>", re.IGNORECASE)
OG_TYPE = re.compile(r"<meta[^>]*property=\"og:type\"[^>]*>", re.IGNORECASE)
OG_IMAGE = re.compile(r"<meta[^>]*property=\"og:image\"[^>]*>", re.IGNORECASE)
TW_CARD = re.compile(r"<meta[^>]*name=\"twitter:card\"[^>]*>", re.IGNORECASE)
TW_TITLE = re.compile(r"<meta[^>]*name=\"twitter:title\"[^>]*>", re.IGNORECASE)
TW_DESC = re.compile(r"<meta[^>]*name=\"twitter:description\"[^>]*>", re.IGNORECASE)
TW_IMAGE = re.compile(r"<meta[^>]*name=\"twitter:image\"[^>]*>", re.IGNORECASE)


def build_tags(title: str, desc: str, url: str | None) -> str:
    parts = []
    parts.append(f'<meta property="og:type" content="website">')
    if url:
        parts.append(f'<meta property="og:url" content="{url}">')
    parts.append(f'<meta property="og:title" content="{escape_attr(title)}">')
    if desc:
        parts.append(f'<meta property="og:description" content="{escape_attr(desc)}">')
    parts.append(f'<meta property="og:image" content="{DEFAULT_IMAGE}">')

    parts.append('<meta name="twitter:card" content="summary_large_image">')
    parts.append(f'<meta name="twitter:title" content="{escape_attr(title)}">')
    if desc:
        parts.append(f'<meta name="twitter:description" content="{escape_attr(desc)}">')
    parts.append(f'<meta name="twitter:image" content="{DEFAULT_IMAGE}">')

    return "\n    " + "\n    ".join(parts) + "\n"


def escape_attr(text: str) -> str:
    return text.replace("\"", "&quot;")


def inject(html: str) -> str:
    title_match = TITLE_RE.search(html)
    desc_match = DESC_RE.search(html)
    canon_match = CANON_RE.search(html)

    title = title_match.group(1).strip() if title_match else "Déménagement Facile"
    desc = desc_match.group(1).strip() if desc_match else "Déménagement clé en main avec déménageurs professionnels. Devis gratuit."
    url = canon_match.group(1).strip() if canon_match else None

    # Remove existing OG/Twitter to avoid duplicates
    html = OG_TITLE.sub("", html)
    html = OG_DESC.sub("", html)
    html = OG_URL.sub("", html)
    html = OG_TYPE.sub("", html)
    html = OG_IMAGE.sub("", html)
    html = TW_CARD.sub("", html)
    html = TW_TITLE.sub("", html)
    html = TW_DESC.sub("", html)
    html = TW_IMAGE.sub("", html)

    head_open = HEAD_OPEN.search(html)
    if not head_open:
        return html

    tags = build_tags(title, desc, url)
    insertion_point = head_open.end()
    return html[:insertion_point] + "\n    " + tags + html[insertion_point:]


def main():
    files = list(ROOT.glob("*.html")) + list((ROOT / "blog").glob("**/*.html"))
    changed = 0
    for p in files:
        try:
            original = p.read_text(encoding="utf-8")
        except Exception:
            continue
        updated = inject(original)
        if updated != original:
            p.write_text(updated, encoding="utf-8")
            changed += 1
    print(f"OG/Twitter updated on {changed} files.")


if __name__ == "__main__":
    main()





