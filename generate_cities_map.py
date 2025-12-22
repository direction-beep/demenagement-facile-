import json
import re
from pathlib import Path

ROOT = Path(__file__).parent
CITY_FILES = sorted(ROOT.glob('demenageur-*.html'))
TITLE_RE = re.compile(r"<title>(.*?)</title>", re.IGNORECASE | re.DOTALL)
H1_RE = re.compile(r"<h1\b[^>]*>(.*?)</h1>", re.IGNORECASE | re.DOTALL)
TAG_RE = re.compile(r"<[^>]+>")


def extract_name(html: str) -> str:
    h1 = H1_RE.search(html)
    if h1:
        text = TAG_RE.sub('', h1.group(1)).strip()
        if text:
            return text
    t = TITLE_RE.search(html)
    if t:
        text = TAG_RE.sub('', t.group(1)).strip()
        return text
    return "Déménagement"


def main():
    items = []
    for f in CITY_FILES:
        slug = f.stem.replace('demenageur-', '')
        html = f.read_text(encoding='utf-8')
        name = extract_name(html)
        # Normalize name to a short form "Ville" if H1 contains extra words
        # Keep first part after "Déménageur" if present
        if 'Déménageur' in name:
            try:
                name = name.split('Déménageur', 1)[1].strip(' -:')
            except Exception:
                pass
        items.append({"slug": slug, "name": name})

    out = ROOT / 'js' / 'cities-map.json'
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(items, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f"Wrote {len(items)} cities to {out}")


if __name__ == '__main__':
    main()








