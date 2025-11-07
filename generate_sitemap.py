#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
from pathlib import Path
from urllib.parse import urljoin

ROOT = Path(__file__).parent
BASE_URL = os.environ.get("BASE_URL", "https://demenagement-zen.fr/")

EXCLUDE_DIRS = {".github"}
EXCLUDE_FILES = {"README.html", "404.html"}


def iter_html_files(root: Path):
    for path in root.rglob("*.html"):
        if any(part in EXCLUDE_DIRS for part in path.parts):
            continue
        yield path


def to_url(path: Path) -> str:
    rel = path.relative_to(ROOT).as_posix()
    if rel == "index.html":
        return BASE_URL
    if rel.endswith("/index.html"):
        rel = rel[: -len("index.html")]
    return urljoin(BASE_URL, rel)


def main():
    urls = []
    for f in iter_html_files(ROOT):
        if f.name in EXCLUDE_FILES:
            continue
        urls.append(to_url(f))
    urls = sorted(set(urls))

    xml_parts = [
        "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
        "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">",
    ]
    for u in urls:
        xml_parts.append("  <url>")
        xml_parts.append(f"    <loc>{u}</loc>")
        xml_parts.append("  </url>")
    xml_parts.append("</urlset>")

    (ROOT / "sitemap.xml").write_text("\n".join(xml_parts), encoding="utf-8")
    print(f"Sitemap updated with {len(urls)} URLs")


if __name__ == "__main__":
    main()



