import os
import re
from pathlib import Path

ROOT = Path(__file__).parent
GA_ID = os.environ.get("GA4_MEASUREMENT_ID", "G-XXXXXXX")  # TODO: replace with real ID
GSC_CODE = os.environ.get("GSC_VERIFICATION_CODE", "YOUR-GSC-CODE")

GA_SNIPPET_TMPL = (
    "<!-- Google tag (gtag.js) -->\n"
    "<script async src=\"https://www.googletagmanager.com/gtag/js?id={GA_ID}\"></script>\n"
    "<script>\n"
    "  window.dataLayer = window.dataLayer || [];\n"
    "  function gtag(){dataLayer.push(arguments);} \n"
    "  gtag('js', new Date());\n"
    "  gtag('config', '{GA_ID}');\n"
    "</script>"
)
GA_SNIPPET = GA_SNIPPET_TMPL.replace("{GA_ID}", GA_ID)

GSC_META = f'<meta name="google-site-verification" content="{GSC_CODE}" />'

HEAD_OPEN_PATTERN = re.compile(r"<head[^>]*>", re.IGNORECASE)


def file_needs_injection(html: str) -> bool:
    has_ga = "googletagmanager.com/gtag/js" in html or "gtag('config'" in html
    has_gsc = "google-site-verification" in html
    return not (has_ga and has_gsc)


def inject_into_head(html: str) -> str:
    # If either GA or GSC missing, inject both once after <head>
    if not file_needs_injection(html):
        return html

    match = HEAD_OPEN_PATTERN.search(html)
    if not match:
        return html  # skip files without proper head

    insertion = "\n    " + GSC_META + "\n    " + GA_SNIPPET + "\n"
    start = match.end()
    return html[:start] + insertion + html[start:]


def main():
    html_files = list(ROOT.glob("*.html")) + list((ROOT / "blog").glob("**/*.html"))
    changed = 0

    for path in html_files:
        try:
            original = path.read_text(encoding="utf-8")
        except Exception:
            continue
        updated = inject_into_head(original)
        if updated != original:
            path.write_text(updated, encoding="utf-8")
            changed += 1

    print(f"Updated {changed} HTML files with GA4 and GSC meta.")


if __name__ == "__main__":
    main()
