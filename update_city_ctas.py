from pathlib import Path
import re

ROOT = Path(__file__).parent
CITY_PAGES = list(ROOT.glob('demenageur-*.html'))

# Replace CTA buttons linking to #devis or index#devis by a city-specific devis page
CTA_PATTERN = re.compile(r'href=\"(?:#devis|index\.html#devis)\"', re.IGNORECASE)


def main():
    changed = 0
    for p in CITY_PAGES:
        slug = p.stem.replace('demenageur-', '')
        target = f'devis-{slug}.html'
        html = p.read_text(encoding='utf-8')
        updated = CTA_PATTERN.sub(f'href=\"{target}\"', html)
        if updated != html:
            p.write_text(updated, encoding='utf-8')
            changed += 1
    print(f"Updated CTAs on {changed} city pages.")


if __name__ == '__main__':
    main()








