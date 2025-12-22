#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Remplace Déménagement Facile par Déménagement Zen dans les contenus du site."""

from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ALLOWED_EXTENSIONS = {
    ".html",
    ".htm",
    ".css",
    ".js",
    ".json",
    ".md",
    ".txt",
    ".xml",
    ".py",
    ".ps1",
    ".csv",
    ".yml",
    ".yaml",
}

REPLACEMENTS = [
    ("Déménagement Facile", "Déménagement Zen"),
    ("Déménagement facile", "Déménagement zen"),
    ("déménagement facile", "déménagement zen"),
    ("DEMENAGEMENT FACILE", "DEMENAGEMENT ZEN"),
    ("DÉMÉNAGEMENT FACILE", "DÉMÉNAGEMENT ZEN"),
    ("Demenagement Facile", "Demenagement Zen"),
    ("Demenagement facile", "Demenagement zen"),
    ("demenagement facile", "demenagement zen"),
    ("DEMENAGEMENT-FACILE", "DEMENAGEMENT-ZEN"),
    ("DÉMÉNAGEMENT-FACILE", "DÉMÉNAGEMENT-ZEN"),
    ("demenagement-facile", "demenagement-zen"),
    ("demenagement_facile", "demenagement_zen"),
    ("demenagementfacile", "demenagementzen"),
    ("DemenagementFacile", "DemenagementZen"),
    ("DEMENAGEMENTFACILE", "DEMENAGEMENTZEN"),
    ("@demenagementfacile", "@demenagementzen"),
    ("contact@demenagement-facile.fr", "contact@demenagement-zen.fr"),
    ("https://demenagement-facile.fr", "https://demenagement-zen.fr"),
    ("http://demenagement-facile.fr", "http://demenagement-zen.fr"),
    ("//demenagement-facile.fr", "//demenagement-zen.fr"),
    ("www.demenagement-facile.fr", "www.demenagement-zen.fr"),
]


def should_process(path: Path) -> bool:
    if path.is_dir():
        return False
    if path.name == "rename_brand.py":
        return False
    if path.suffix.lower() not in ALLOWED_EXTENSIONS:
        return False
    return True


def main() -> int:
    files = [p for p in ROOT.rglob("*") if should_process(p)]
    for path in files:
        try:
            text = path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue

        original = text

        placeholder = "__PROJECT_SLUG__"
        text = text.replace("demenagement-facile-site", placeholder)

        for old, new in REPLACEMENTS:
            text = text.replace(old, new)

        text = text.replace(placeholder, "demenagement-facile-site")

        if text != original:
            path.write_text(text, encoding="utf-8")
            print(f"Updated {path.relative_to(ROOT)}")

    return 0


if __name__ == "__main__":
    sys.exit(main())



