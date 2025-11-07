import os
import re
from pathlib import Path

ROOT = Path(__file__).parent
GA_ID = os.environ.get("GA4_MEASUREMENT_ID", "G-XXXXXXX")  # TODO: replace with real ID
# Provided GSC verification code (works for HTML meta and DNS TXT). Use env to override.
GSC_CODE = os.environ.get("GSC_VERIFICATION_CODE", "27NgDgPWF7bpaurNPug-tNhouNYiEoht6UCChM1FJGQ")

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
# Matches existing google-site-verification meta and captures content value
GSC_META_PATTERN = re.compile(r"<meta[^>]*name=\"google-site-verification\"[^>]*content=\"([^\"]*)\"[^>]*/?>", re.IGNORECASE)


def ensure_gsc_meta(html: str) -> str:
    """Ensure the google-site-verification meta exists and is set to GSC_CODE.
    Replace existing value if present, otherwise insert after <head>.
    """
    if GSC_META_PATTERN.search(html):
        html = GSC_META_PATTERN.sub(
            f'<meta name="google-site-verification" content="{GSC_CODE}" />', html
        )
        return html
    # No existing meta, try to insert after <head>
    match = HEAD_OPEN_PATTERN.search(html)
    if not match:
        return html
    insertion = "\n    " + GSC_META + "\n"
    start = match.end()
    return html[:start] + insertion + html[start:]


def ensure_ga(html: str) -> str:
    has_ga = "googletagmanager.com/gtag/js" in html or "gtag('config'" in html
    if has_ga:
        return html
    match = HEAD_OPEN_PATTERN.search(html)
    if not match:
        return html
    insertion = "\n    " + GA_SNIPPET + "\n"
    start = match.end()
    return html[:start] + insertion + html[start:]


def process_html(html: str) -> str:
    html = ensure_gsc_meta(html)
    html = ensure_ga(html)
    return html


def main():
    html_files = list(ROOT.glob("*.html")) + list((ROOT / "blog").glob("**/*.html"))
    changed = 0

    for path in html_files:
        try:
            original = path.read_text(encoding="utf-8")
        except Exception:
            continue
        updated = process_html(original)
        if updated != original:
            path.write_text(updated, encoding="utf-8")
            changed += 1

    print(f"Updated {changed} HTML files with GA4 snippet (if missing) and GSC meta set to provided code.")


if __name__ == "__main__":
    main()

