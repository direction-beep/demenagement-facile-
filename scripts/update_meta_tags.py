#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Utilitaire pour harmoniser les balises meta des pages ville et devis."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CITY_MAP_SOURCE = ROOT / "js" / "france-map-interactive.js"

BRAND = "Déménagement Zen"
DOMAIN = "https://demenagement-zen.fr"
TWITTER_HANDLE = "@demenagementzen"
OG_IMAGE = f"{DOMAIN}/images/og-image.jpg"


def load_city_mapping():
    """Retourne deux dictionnaires: slug->(nom, code) et code->(nom, slug)."""
    if not CITY_MAP_SOURCE.exists():
        raise FileNotFoundError(f"Fichier introuvable: {CITY_MAP_SOURCE}")

    content = CITY_MAP_SOURCE.read_text(encoding="utf-8")
    pattern = re.compile(
        r"'(?P<code>\d{2})':\s*\{\s*name:\s*'(?P<name>[^']+)'\s*,\s*slug:\s*'(?P<slug>[^']+)'",
        re.MULTILINE,
    )

    slug_to_info = {}
    for match in pattern.finditer(content):
        code = match.group("code")
        name = match.group("name")
        slug = match.group("slug")
        slug_to_info[slug] = (name, code)

    return slug_to_info


def humanize_slug(slug: str) -> str:
    """Convertit un slug en nom lisible (fallback lorsque la map est incomplète)."""
    words = slug.replace('-', ' ').split()
    keep_lower = {"de", "du", "des", "le", "la", "les", "et", "sur", "sous", "l"}
    formatted = []
    for idx, word in enumerate(words):
        clean = word.replace("'", "")
        if idx != 0 and clean.lower() in keep_lower:
            formatted.append(clean.lower())
        else:
            formatted.append(word.capitalize())
    title = " ".join(formatted)
    # Restaurer les apostrophes éventuelles
    title = title.replace(" L ", " l'")
    return title.replace("  ", " ")


def build_city_meta(slug: str, name: str, code: str | None) -> dict[str, str]:
    city_display = name or humanize_slug(slug)
    dept = f" ({code})" if code else ""
    title = f"Déménageur {city_display}{dept} - Service clé en main | {BRAND}"
    description = (
        f"Déménageur professionnel à {city_display}. Service de déménagement clé en main, "
        "équipe locale expérimentée et devis gratuit sous 24h."
    )
    return {
        "title": title,
        "description": description,
        "og_title": title,
        "og_description": description,
        "twitter_title": title,
        "twitter_description": description,
    }


def build_quote_meta(slug: str, name: str, code: str | None) -> dict[str, str]:
    city_display = name or humanize_slug(slug)
    dept = f" ({code})" if code else ""
    title = f"Devis déménagement {city_display}{dept} | {BRAND}"
    description = (
        f"Demandez votre devis de déménagement à {city_display}. Réponse sous 24h, "
        "déménageurs certifiés et assurance incluse."
    )
    return {
        "title": title,
        "description": description,
    }


def render_head_city(slug: str, meta: dict[str, str]) -> str:
    canonical = f"{DOMAIN}/demenageur-{slug}.html"
    return f"""    <meta charset=\"UTF-8\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
    <title>{meta['title']}</title>
    <meta name=\"description\" content=\"{meta['description']}\">
    <meta name=\"robots\" content=\"index, follow\">
    <link rel=\"canonical\" href=\"{canonical}\">
    <meta property=\"og:type\" content=\"website\">
    <meta property=\"og:locale\" content=\"fr_FR\">
    <meta property=\"og:site_name\" content=\"{BRAND}\">
    <meta property=\"og:url\" content=\"{canonical}\">
    <meta property=\"og:title\" content=\"{meta['og_title']}\">
    <meta property=\"og:description\" content=\"{meta['og_description']}\">
    <meta property=\"og:image\" content=\"{OG_IMAGE}\">
    <meta name=\"twitter:card\" content=\"summary_large_image\">
    <meta name=\"twitter:site\" content=\"{TWITTER_HANDLE}\">
    <meta name=\"twitter:url\" content=\"{canonical}\">
    <meta name=\"twitter:title\" content=\"{meta['twitter_title']}\">
    <meta name=\"twitter:description\" content=\"{meta['twitter_description']}\">
    <meta name=\"twitter:image\" content=\"{OG_IMAGE}\">
    <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">
    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>
    <link rel=\"stylesheet\" href=\"/css/styles.css\">
    <link rel=\"stylesheet\" href=\"/css/breadcrumbs.css\">
    <link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap\" rel=\"stylesheet\">"""


def render_head_quote(slug: str, meta: dict[str, str]) -> str:
    canonical = f"{DOMAIN}/devis-{slug}.html"
    return f"""    <meta charset=\"UTF-8\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
    <title>{meta['title']}</title>
    <meta name=\"description\" content=\"{meta['description']}\">
    <meta name=\"robots\" content=\"index,follow\">
    <link rel=\"canonical\" href=\"{canonical}\">
    <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">
    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>
    <link rel=\"stylesheet\" href=\"/css/styles.css\">
    <link rel=\"stylesheet\" href=\"/css/breadcrumbs.css\">
    <link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap\" rel=\"stylesheet\">"""


def replace_head(content: str, new_head: str) -> str:
    start_tag = "<head>"
    end_tag = "</head>"
    start_idx = content.find(start_tag)
    end_idx = content.find(end_tag)
    if start_idx == -1 or end_idx == -1:
        raise ValueError("Balises <head> ou </head> introuvables")

    start_idx += len(start_tag)
    return content[:start_idx] + "\n" + new_head + "\n" + content[end_idx:]


def process_file(path: Path, slug_to_info: dict[str, tuple[str, str]]):
    filename = path.name
    slug = filename.split("-", 1)[1].rsplit(".", 1)[0]
    city_info = slug_to_info.get(slug)
    city_name = city_info[0] if city_info else humanize_slug(slug)
    city_code = city_info[1] if city_info else None

    content = path.read_text(encoding="utf-8")

    if filename.startswith("demenageur-"):
        meta = build_city_meta(slug, city_name, city_code)
        new_head = render_head_city(slug, meta)
    elif filename.startswith("devis-"):
        meta = build_quote_meta(slug, city_name, city_code)
        new_head = render_head_quote(slug, meta)
    else:
        return

    updated = replace_head(content, new_head)
    path.write_text(updated, encoding="utf-8")
    print(f"Mis à jour: {path.relative_to(ROOT)}")


def main():
    slug_to_info = load_city_mapping()
    targets = list(ROOT.glob("demenageur-*.html")) + list(ROOT.glob("devis-*.html"))
    for file_path in sorted(targets):
        process_file(file_path, slug_to_info)


if __name__ == "__main__":
    main()



