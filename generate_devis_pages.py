import re
from pathlib import Path

ROOT = Path(__file__).parent
CITY_PAGES = list(ROOT.glob('demenageur-*.html'))

TITLE_RE = re.compile(r"<title>(.*?)</title>", re.IGNORECASE | re.DOTALL)
H1_RE = re.compile(r"<h1\b[^>]*>(.*?)</h1>", re.IGNORECASE | re.DOTALL)

TEMPLATE = (
    "<!DOCTYPE html>\n"
    "<html lang=\"fr\">\n"
    "<head>\n"
    "    <meta charset=\"UTF-8\">\n"
    "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n"
    "    <title>Devis déménagement {city} | Déménagement Facile</title>\n"
    "    <meta name=\"description\" content=\"Demandez votre devis de déménagement à {city}. Réponse sous 24h, équipe professionnelle, assurance incluse.\">\n"
    "    <meta name=\"robots\" content=\"noindex,follow\">\n"
    "    <link rel=\"canonical\" href=\"{canonical}\">\n"
    "    <link rel=\"stylesheet\" href=\"css/styles.css\">\n"
    "</head>\n"
    "<body>\n"
    "  <header class=\"header\">\n"
    "    <nav class=\"navbar\">\n"
    "      <div class=\"container\">\n"
    "        <div class=\"nav-logo\"><a href=\"index.html\" class=\"logo\">Déménagement Facile</a></div>\n"
    "        <div class=\"nav-menu\">\n"
    "          <ul class=\"nav-list\">\n"
    "            <li><a href=\"index.html\">Accueil</a></li>\n"
    "            <li><a href=\"index.html#services\">Services</a></li>\n"
    "            <li><a href=\"{city_page}\">{city_link_text}</a></li>\n"
    "            <li><a href=\"#contact\">Contact</a></li>\n"
    "          </ul>\n"
    "        </div>\n"
    "      </div>\n"
    "    </nav>\n"
    "  </header>\n"
    "  <main>\n"
    "    <section class=\"hero\">\n"
    "      <div class=\"container\">\n"
    "        <h1 class=\"hero-title\">Devis déménagement {city}</h1>\n"
    "        <p class=\"hero-subtitle\">Obtenez votre devis gratuit et sans engagement. Réponse sous 24h.</p>\n"
    "      </div>\n"
    "    </section>\n"
    "    <section class=\"local-description\">\n"
    "      <div class=\"container\">\n"
    "        <div class=\"content-column\">\n"
    "          <form class=\"hero-form\" id=\"devis\">\n"
    "            <h2 class=\"form-title\">Demandez votre devis à {city}</h2>\n"
    "            <div class=\"form-row\">\n"
    "              <div class=\"form-group\">\n"
    "                <label for=\"ville-depart\">Ville de départ</label>\n"
    "                <input type=\"text\" id=\"ville-depart\" name=\"ville-depart\" value=\"{city}\" required>\n"
    "              </div>\n"
    "              <div class=\"form-group\">\n"
    "                <label for=\"ville-arrivee\">Ville d'arrivée</label>\n"
    "                <input type=\"text\" id=\"ville-arrivee\" name=\"ville-arrivee\" placeholder=\"Lyon\" required>\n"
    "              </div>\n"
    "            </div>\n"
    "            <div class=\"form-row\">\n"
    "              <div class=\"form-group\">\n"
    "                <label for=\"date\">Date souhaitée</label>\n"
    "                <input type=\"date\" id=\"date\" name=\"date\" required>\n"
    "              </div>\n"
    "              <div class=\"form-group\">\n"
    "                <label for=\"type-logement\">Type de logement</label>\n"
    "                <select id=\"type-logement\" name=\"type-logement\" required>\n"
    "                  <option value=\"\">Sélectionnez</option>\n"
    "                  <option value=\"studio\">Studio</option>\n"
    "                  <option value=\"t2\">T2</option>\n"
    "                  <option value=\"t3\">T3</option>\n"
    "                  <option value=\"t4\">T4+</option>\n"
    "                  <option value=\"maison\">Maison</option>\n"
    "                </select>\n"
    "              </div>\n"
    "            </div>\n"
    "            <div class=\"form-row\">\n"
    "              <div class=\"form-group\">\n"
    "                <label for=\"email\">Email</label>\n"
    "                <input type=\"email\" id=\"email\" name=\"email\" required>\n"
    "              </div>\n"
    "              <div class=\"form-group\">\n"
    "                <label for=\"telephone\">Téléphone</label>\n"
    "                <input type=\"tel\" id=\"telephone\" name=\"telephone\" required>\n"
    "              </div>\n"
    "            </div>\n"
    "            <button type=\"submit\" class=\"btn btn-primary btn-large\">Demander mon devis</button>\n"
    "            <p class=\"form-disclaimer\">✓ Devis gratuit • ✓ Réponse sous 24h</p>\n"
    "          </form>\n"
    "          <p style=\"margin-top:1rem;\">Retour à la page ville : <a href=\"{city_page}\">{city_link_text}</a></p>\n"
    "        </div>\n"
    "      </div>\n"
    "    </section>\n"
    "  </main>\n"
    "  <footer class=\"footer\">\n"
    "    <div class=\"container\"><div class=\"footer-bottom\"><p>&copy; 2025 Déménagement Facile</p></div></div>\n"
    "  </footer>\n"
    "  <script src=\"js/main.js\" defer></script>\n"
    "</body>\n"
    "</html>\n"
)


def extract_city_name(html: str) -> str:
    t = TITLE_RE.search(html)
    if t:
        # e.g., "Déménageur Paris - ..." -> take after first space
        title = t.group(1).strip()
        # Try H1 if title not reliable
        h1 = H1_RE.search(html)
        if h1:
            return cleanup(h1.group(1))
        return cleanup(title)
    h1 = H1_RE.search(html)
    if h1:
        return cleanup(h1.group(1))
    return "Votre ville"


def cleanup(text: str) -> str:
    # remove HTML tags and keep first 60 chars
    text = re.sub(r"<[^>]+>", "", text).strip()
    return text[:60]


def main():
    created = 0
    for city_file in CITY_PAGES:
        slug = city_file.stem.replace('demenageur-', '')
        html = city_file.read_text(encoding='utf-8')
        city = extract_city_name(html)
        devis_name = f"devis-{slug}.html"
        content = TEMPLATE.format(
            city=city,
            city_page=city_file.name,
            city_link_text=f"Déménageur {city}",
            canonical=devis_name,
        )
        (ROOT / devis_name).write_text(content, encoding='utf-8')
        created += 1
    print(f"Created {created} devis pages.")


if __name__ == '__main__':
    main()





