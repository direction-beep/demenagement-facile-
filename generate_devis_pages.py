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
    "    <title>Devis déménagement {city} | Déménagement Zen</title>\n"
    "    <meta name=\"description\" content=\"Demandez votre devis de déménagement à {city}. Réponse sous 24h, équipe professionnelle, assurance incluse.\">\n"
    "    <meta name=\"robots\" content=\"noindex,follow\">\n"
    "    <link rel=\"canonical\" href=\"{canonical}\">\n"
    "    <link rel=\"stylesheet\" href=\"css/styles.css\">\n"
    "</head>\n"
    "<body>\n"
    "  <header class=\"header\">\n"
    "    <nav class=\"navbar\">\n"
    "      <div class=\"container\">\n"
    "        <div class=\"nav-logo\"><a href=\"index.html\" class=\"logo\">Déménagement Zen</a></div>\n"
    "        <div class=\"nav-menu\">\n"
    "          <ul class=\"nav-list\">\n"
    "            <li><a href="index.html#services">Services</a></li>
    "            <li><a href="carte-france">Nos villes</a></li>
    "            <li><a href="index.html#contact">Contact</a></li>
    "          </ul>
    "        </div>
    "      </div>
    "    </nav>
    "  </header>
    "  <main>
    "    <section class=\"hero\">
    "      <div class=\"container\">
    "        <h1 class=\"hero-title\">Devis déménagement {city}</h1>
    "        <p class=\"hero-subtitle\">Obtenez votre devis gratuit et sans engagement. Réponse sous 24h.</p>
    "      </div>
    "    </section>
    "    <section class=\"local-description\">
    "      <div class=\"container\">
    "        <div class=\"content-column\">
    "          <form class=\"hero-form\" id=\"devis\">
    "            <h2 class=\"form-title\">Demandez votre devis à {city}</h2>
    "            <div class=\"form-row\">
    "              <div class=\"form-group\">
    "                <label for=\"ville-depart\">Ville de départ</label>
    "                <input type=\"text\" id=\"ville-depart\" name=\"ville-depart\" value=\"{city}\" required>
    "              </div>
    "              <div class=\"form-group\">
    "                <label for=\"ville-arrivee\">Ville d'arrivée</label>
    "                <input type=\"text\" id=\"ville-arrivee\" name=\"ville-arrivee\" placeholder=\"Lyon\" required>
    "              </div>
    "            </div>
    "            <div class=\"form-row\">
    "              <div class=\"form-group\">
    "                <label for=\"date\">Date souhaitée</label>
    "                <input type=\"date\" id=\"date\" name=\"date\" required>
    "              </div>
    "              <div class=\"form-group\">
    "                <label for=\"type-logement\">Type de logement</label>
    "                <select id=\"type-logement\" name=\"type-logement\" required>
    "                  <option value=\"\">Sélectionnez</option>
    "                  <option value=\"studio\">Studio</option>
    "                  <option value=\"t2\">T2</option>
    "                  <option value=\"t3\">T3</option>
    "                  <option value=\"t4\">T4+</option>
    "                  <option value=\"maison\">Maison</option>
    "                </select>
    "              </div>
    "            </div>
    "            <div class=\"form-row\">
    "              <div class=\"form-group\">
    "                <label for=\"email\">Email</label>
    "                <input type=\"email\" id=\"email\" name=\"email\" required>
    "              </div>
    "              <div class=\"form-group\">
    "                <label for=\"telephone\">Téléphone</label>
    "                <input type=\"tel\" id=\"telephone\" name=\"telephone\" required>
    "              </div>
    "            </div>
    "            <button type=\"submit\" class=\"btn btn-primary btn-large\">Demander mon devis</button>
    "            <p class=\"form-disclaimer\">âœ“ Devis gratuit â€¢ âœ“ Réponse sous 24h</p>
    "          </form>
    "          <p style=\"margin-top:1rem;\">Retour à la page ville : <a href=\"{city_page}\">{city_link_text}</a></p>
    "        </div>
    "      </div>
    "    </section>
    "  </main>
    "  <footer class=\"footer\">
    "    <div class=\"container\"><div class=\"footer-bottom\"><p>&copy; 2025 Déménagement Zen</p></div></div>
    "  </footer>
    "  <script src=\"js/main.js\" defer></script>
    "</body>
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








