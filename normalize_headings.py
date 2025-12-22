import re
from pathlib import Path

ROOT = Path(__file__).parent

TITLE_RE = re.compile(r"<title>(.*?)</title>", re.IGNORECASE | re.DOTALL)
HEAD_OPEN = re.compile(r"<head[^>]*>", re.IGNORECASE)
BODY_OPEN = re.compile(r"<body[^>]*>", re.IGNORECASE)

# Section markers to ensure H2 labels exist before them
SECTION_LABELS = [
    (re.compile(r'<section[^>]*class="services\b[^"]*"', re.IGNORECASE), "Nos services"),
    (re.compile(r'<section[^>]*class="advantages\b[^"]*"', re.IGNORECASE), "Pourquoi nous choisir ?"),
    (re.compile(r'<section[^>]*class="local-description\b[^"]*"', re.IGNORECASE), "Informations locales"),
    (re.compile(r'<section[^>]*class="related-cities\b[^"]*"', re.IGNORECASE), "Nos autres implantations"),
    (re.compile(r'<section[^>]*class="faq\b[^"]*"', re.IGNORECASE), "FAQ déménagement"),
]

H1_RE = re.compile(r"<h1\b[^>]*>(.*?)</h1>", re.IGNORECASE | re.DOTALL)
H2_RE = re.compile(r"<h2\b[^>]*>(.*?)</h2>", re.IGNORECASE | re.DOTALL)


def ensure_single_h1(html: str) -> str:
    # Find all H1s
    h1s = list(H1_RE.finditer(html))
    if not h1s:
        # Create H1 from <title> right after <body>
        title_match = TITLE_RE.search(html)
        title = title_match.group(1).strip() if title_match else "Déménagement Zen"
        body_open = BODY_OPEN.search(html)
        if body_open:
            insertion = f"\n    <h1 class=\"page-title\">{escape_text(title)}</h1>\n"
            pos = body_open.end()
            html = html[:pos] + insertion + html[pos:]
        return html

    # Keep first H1, demote others to H2
    first = True
    def repl(match: re.Match) -> str:
        nonlocal first
        content = match.group(1)
        if first:
            first = False
            return match.group(0)
        return f"<h2>{content}</h2>"

    html = H1_RE.sub(repl, html)
    return html


def ensure_section_h2(html: str) -> str:
    # For each known section, if within last 200 chars before the section start there is no <h2>, insert one
    for pattern, label in SECTION_LABELS:
        for m in pattern.finditer(html):
            start = m.start()
            pre = html[max(0, start-300):start]
            if not H2_RE.search(pre):
                html = html[:start] + f"\n  <h2 class=\"section-title\">{escape_text(label)}</h2>\n" + html[start:]
    return html


def escape_text(text: str) -> str:
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def process(html: str) -> str:
    html2 = ensure_single_h1(html)
    html2 = ensure_section_h2(html2)
    return html2


def main():
    files = list(ROOT.glob("demenageur-*.html"))
    changed = 0
    for p in files:
        try:
            original = p.read_text(encoding="utf-8")
        except Exception:
            continue
        updated = process(original)
        if updated != original:
            p.write_text(updated, encoding="utf-8")
            changed += 1
    print(f"Normalized headings on {changed} city files.")


if __name__ == "__main__":
    main()

