#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""GÃ©nÃ¨re les pages institutionnelles manquantes (FAQ, contact, etc.)."""

from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BRAND = "DÃ©mÃ©nagement Zen"
DOMAIN = "https://demenagement-zen.fr"

BASE_TEMPLATE = """<!DOCTYPE html>
<html lang=\"fr\">
<head>
    <meta charset=\"UTF-8\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
    <title>{title}</title>
    <meta name=\"description\" content=\"{description}\">
    <meta name=\"robots\" content=\"index,follow\">
    <link rel=\"canonical\" href=\"{canonical}\">
    <meta property=\"og:type\" content=\"website\">
    <meta property=\"og:locale\" content=\"fr_FR\">
    <meta property=\"og:site_name\" content=\"{brand}\">
    <meta property=\"og:url\" content=\"{canonical}\">
    <meta property=\"og:title\" content=\"{title}\">
    <meta property=\"og:description\" content=\"{description}\">
    <meta property=\"og:image\" content=\"{domain}/images/og-image.jpg\">
    <meta name=\"twitter:card\" content=\"summary_large_image\">
    <meta name=\"twitter:site\" content=\"@demenagementzen\">
    <meta name=\"twitter:title\" content=\"{title}\">
    <meta name=\"twitter:description\" content=\"{description}\">
    <meta name=\"twitter:image\" content=\"{domain}/images/og-image.jpg\">
    <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">
    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>
    <link rel=\"stylesheet\" href=\"/css/styles.css\">
    <link rel=\"stylesheet\" href=\"/css/breadcrumbs.css\">
    <link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap\" rel=\"stylesheet\">
</head>
<body>
    <header class=\"header\">
        <nav class=\"navbar\">
            <div class=\"container\">
                <div class=\"nav-logo\"><a href=\"/index.html\" class=\"logo\">{brand}</a></div>
                <div class=\"nav-menu\">
                    <ul class=\"nav-list\">
                        <li><a href=\"/index.html\">Accueil</a></li>
                        <li><a href=\"/services.html\">Services</a></li>
                        <li><a href=\"/villes.html\">Nos villes</a></li>
                        <li><a href=\"/contact.html\">Contact</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>

    <main>
        <section class=\"page-hero\">
            <div class=\"container\">
                <nav class=\"breadcrumb\" aria-label=\"Fil d'Ariane\">
                    <ol>
                        <li><a href=\"/index.html\">Accueil</a></li>
                        <li aria-current=\"page\">{hero}</li>
                    </ol>
                </nav>
                <h1>{hero}</h1>
                <p class=\"page-subtitle\">{intro}</p>
            </div>
        </section>
        <section class=\"page-content\">
            <div class=\"container\">
{content}
            </div>
        </section>
    </main>

    <footer class=\"footer\">
        <div class=\"container\">
            <div class=\"footer-content\">
                <div class=\"footer-column\">
                    <h3>{brand}</h3>
                    <p>Votre dÃ©mÃ©nagement simplifiÃ© partout en France.</p>
                </div>
                <div class=\"footer-column\">
                    <h4>Nous contacter</h4>
                    <ul>
                        <li><a href=\"mailto:contact@demenagement-zen.fr\">contact@demenagement-zen.fr</a></li>
                        <li><a href=\"tel:+33123456789\">01 23 45 67 89</a></li>
                    </ul>
                </div>
                <div class=\"footer-column\">
                    <h4>Liens utiles</h4>
                    <ul>
                        <li><a href=\"/mentions-legales.html\">Mentions lÃ©gales</a></li>
                        <li><a href=\"/politique-confidentialite.html\">Politique de confidentialitÃ©</a></li>
                        <li><a href=\"/cgu.html\">Conditions d'utilisation</a></li>
                    </ul>
                </div>
            </div>
            <div class=\"footer-bottom\">
                <p>&copy; 2025 {brand}. Tous droits rÃ©servÃ©s.</p>
            </div>
        </div>
    </footer>

    <script src=\"/js/main.js\" defer></script>
    <script src=\"/js/content-enrichment.js\" defer></script>
</body>
</html>
"""


def section_from_paragraphs(paragraphs: list[str]) -> str:
    return "\n".join(f"                <p>{para}</p>" for para in paragraphs)


def section_from_list(title: str, items: list[str]) -> str:
    body = "\n".join(f"                    <li>{item}</li>" for item in items)
    return (
        f"                <h2>{title}</h2>\n"
        "                <ul class=\"page-list\">\n"
        f"{body}\n"
        "                </ul>"
    )


PAGES = [
    {
        "slug": "faq",
        "title": "FAQ DÃ©mÃ©nagement | DÃ©mÃ©nagement Zen",
        "description": "Toutes les rÃ©ponses aux questions frÃ©quentes sur l'organisation d'un dÃ©mÃ©nagement avec DÃ©mÃ©nagement Zen.",
        "hero": "Questions frÃ©quentes",
        "intro": "Les rÃ©ponses aux questions que nos clients nous posent le plus souvent.",
        "content": "\n".join(
            [
                section_from_paragraphs([
                    "Vous prÃ©parez votre dÃ©mÃ©nagement ? Retrouvez ici les informations essentielles pour bien planifier chaque Ã©tape.",
                ]),
                section_from_list(
                    "Questions principales",
                    [
                        "Quel est le dÃ©lai pour obtenir un devis ? &mdash; Nous rÃ©pondons sous 24 heures ouvrÃ©es.",
                        "Votre service inclut-il l'emballage ? &mdash; Oui, nous proposons des formules avec emballage complet ou partiel.",
                        "Puis-je dÃ©mÃ©nager le week-end ? &mdash; Nos Ã©quipes interviennent 7j/7 selon vos disponibilitÃ©s.",
                        "Comment sont assurÃ©s mes biens ? &mdash; Une assurance dommages est incluse dans chacune de nos prestations.",
                    ],
                ),
                section_from_paragraphs([
                    "Vous avez une autre question ? Contactez-nous au 01&nbsp;23&nbsp;45&nbsp;67&nbsp;89 ou par email Ã  contact@demenagement-zen.fr.",
                ]),
            ]
        ),
    },
    {
        "slug": "mentions-legales",
        "title": "Mentions lÃ©gales | DÃ©mÃ©nagement Zen",
        "description": "Informations lÃ©gales de DÃ©mÃ©nagement Zen : Ã©diteur du site, hÃ©bergement et contact.",
        "hero": "Mentions lÃ©gales",
        "intro": "Transparence sur l'Ã©diteur du site et les coordonnÃ©es de contact.",
        "content": "\n".join(
            [
                section_from_paragraphs([
                    "Le site demenagement-zen.fr est Ã©ditÃ© par {brand}, 10 Rue de la LibertÃ©, 75001 Paris.".format(brand=BRAND),
                    "HÃ©bergement : Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, Ã‰tats-Unis.",
                    "Pour toute question, contactez contact@demenagement-zen.fr ou appelez le 01&nbsp;23&nbsp;45&nbsp;67&nbsp;89.",
                ]),
            ]
        ),
    },
    {
        "slug": "politique-confidentialite",
        "title": "Politique de confidentialitÃ© | DÃ©mÃ©nagement Zen",
        "description": "DÃ©couvrez notre politique de confidentialitÃ© et la gestion de vos donnÃ©es personnelles.",
        "hero": "Politique de confidentialitÃ©",
        "intro": "Nous protÃ©geons les donnÃ©es personnelles que vous nous confiez.",
        "content": "\n".join(
            [
                section_from_paragraphs([
                    "Les donnÃ©es collectÃ©es via nos formulaires sont utilisÃ©es pour rÃ©pondre Ã  vos demandes de devis et assurer le suivi commercial.",
                    "Vous pouvez demander la consultation, la modification ou la suppression de vos informations Ã  tout moment en Ã©crivant Ã  privacy@demenagement-zen.fr.",
                    "Vos donnÃ©es sont hÃ©bergÃ©es dans l'Union europÃ©enne et conservÃ©es pendant 3 ans maximum aprÃ¨s le dernier Ã©change.",
                ]),
            ]
        ),
    },
    {
        "slug": "services",
        "title": "Nos services de dÃ©mÃ©nagement | DÃ©mÃ©nagement Zen",
        "description": "DÃ©couvrez les services de dÃ©mÃ©nagement rÃ©sidentiel, professionnel et sur mesure proposÃ©s par DÃ©mÃ©nagement Zen.",
        "hero": "Nos services",
        "intro": "Des solutions clÃ©s en main pour entreprises et particuliers.",
        "content": "\n".join(
            [
                section_from_list(
                    "Prestations principales",
                    [
                        "DÃ©mÃ©nagement rÃ©sidentiel : prÃ©paration, emballage, transport et installation.",
                        "DÃ©mÃ©nagement d'entreprise : transfert de bureaux, Ã©quipements IT et archivage sÃ©curisÃ©.",
                        "Services premium : garde-meubles, emballage fragile, montage de mobilier.",
                        "Accompagnement administratif : autorisations de stationnement et formalitÃ©s sur mesure.",
                    ],
                ),
                section_from_paragraphs([
                    "Nos Ã©quipes Ã©valuent chaque projet pour proposer la formule la plus adaptÃ©e." ,
                    "Demandez un devis gratuit pour connaÃ®tre le dÃ©tail de nos prestations et disponibilitÃ©s.",
                ]),
            ]
        ),
    },
    {
        "slug": "villes",
        "title": "Nos villes de dÃ©mÃ©nagement | DÃ©mÃ©nagement Zen",
        "description": "Consultez la liste des villes couvertes par DÃ©mÃ©nagement Zen partout en France.",
        "hero": "Nos implantations",
        "intro": "Un rÃ©seau national de dÃ©mÃ©nageurs certifiÃ©s.",
        "content": "\n".join(
            [
                section_from_paragraphs([
                    "Nous intervenons dans plus de 100 villes franÃ§aises. Retrouvez ci-dessous une sÃ©lection des destinations les plus demandÃ©es.",
                ]),
                section_from_list(
                    "Villes populaires",
                    [
                        "<a href=\"/demenageur-paris.html\">Paris</a>",
                        "<a href=\"/demenageur-lyon.html\">Lyon</a>",
                        "<a href=\"/demenageur-marseille.html\">Marseille</a>",
                        "<a href=\"/demenageur-bordeaux.html\">Bordeaux</a>",
                        "<a href=\"/demenageur-lille.html\">Lille</a>",
                        "<a href=\"/demenageur-nantes.html\">Nantes</a>",
                        "<a href=\"/demenageur-toulouse.html\">Toulouse</a>",
                        "<a href=\"/demenageur-rennes.html\">Rennes</a>",
                    ],
                ),
                section_from_paragraphs([
                    "Consultez notre carte interactive ou contactez-nous pour vÃ©rifier la disponibilitÃ© dans votre ville.",
                ]),
            ]
        ),
    },
    {
        "slug": "a-propos",
        "title": "Ã€ propos de DÃ©mÃ©nagement Zen",
        "description": "En savoir plus sur DÃ©mÃ©nagement Zen, notre Ã©quipe et nos engagements qualitÃ©.",
        "hero": "Ã€ propos",
        "intro": "Une Ã©quipe d'experts dÃ©diÃ©e Ã  la rÃ©ussite de votre dÃ©mÃ©nagement.",
        "content": section_from_paragraphs([
            "Depuis plus de 15 ans, DÃ©mÃ©nagement Zen accompagne particuliers et entreprises avec des solutions personnalisÃ©es.",
            "Nos Ã©quipes basÃ©es en France sont formÃ©es aux meilleures pratiques logistiques et relation client.",
            "Nous plaÃ§ons la qualitÃ© de service et la transparence au cÅ“ur de chaque mission.",
        ]),
    },
    {
        "slug": "cgu",
        "title": "Conditions gÃ©nÃ©rales d'utilisation | DÃ©mÃ©nagement Zen",
        "description": "Lisez les conditions gÃ©nÃ©rales d'utilisation du site demenagement-zen.fr.",
        "hero": "Conditions d'utilisation",
        "intro": "Les rÃ¨gles applicables Ã  l'utilisation du site et au traitement de vos demandes.",
        "content": section_from_paragraphs([
            "Tout utilisateur s'engage Ã  fournir des informations exactes lors des demandes de devis.",
            "DÃ©mÃ©nagement Zen se rÃ©serve le droit de refuser une demande qui ne respecterait pas ces conditions ou notre charte de qualitÃ©.",
            "Les prÃ©sentes CGU peuvent Ãªtre mises Ã  jour Ã  tout moment. Version en vigueur : 7 novembre 2025.",
        ]),
    },
    {
        "slug": "comment-ca-marche",
        "title": "Comment fonctionne notre service | DÃ©mÃ©nagement Zen",
        "description": "DÃ©couvrez les 3 Ã©tapes clÃ©s pour organiser votre dÃ©mÃ©nagement avec DÃ©mÃ©nagement Zen.",
        "hero": "Comment Ã§a marche ?",
        "intro": "Un processus simple en trois Ã©tapes pour un dÃ©mÃ©nagement serein.",
        "content": section_from_list(
            "Ã‰tapes",
            [
                "1. Demande de devis : partagez vos informations clÃ©s (volume, adresses, date).",
                "2. Planification : un conseiller dÃ©diÃ© dÃ©finit la prestation adaptÃ©e et le planning.",
                "3. RÃ©alisation : notre Ã©quipe prend en charge l'ensemble des opÃ©rations logistiques.",
            ],
        ),
    },
    {
        "slug": "contact",
        "title": "Contactez DÃ©mÃ©nagement Zen",
        "description": "Contactez DÃ©mÃ©nagement Zen pour obtenir un devis de dÃ©mÃ©nagement ou poser vos questions.",
        "hero": "Contact",
        "intro": "Parlez-nous de votre projet, nous vous rÃ©pondons sous 24 heures.",
        "content": "\n".join(
            [
                section_from_paragraphs([
                    "TÃ©lÃ©phone : <a href=\"tel:+33123456789\">01 23 45 67 89</a>",
                    "Email : <a href=\"mailto:contact@demenagement-zen.fr\">contact@demenagement-zen.fr</a>",
                    "Adresse : 10 Rue de la LibertÃ©, 75001 Paris.",
                ]),
                "                <div class=\"contact-form\">\n"
                "                    <h2>Formulaire de contact</h2>\n"
                "                    <form method=\"post\" action=\"https://formspree.io/f/xayzkqne\">\n"
                "                        <div class=\"form-row\">\n"
                "                            <label for=\"contact-nom\">Nom</label>\n"
                "                            <input type=\"text\" id=\"contact-nom\" name=\"nom\" required>\n"
                "                        </div>\n"
                "                        <div class=\"form-row\">\n"
                "                            <label for=\"contact-email\">Email</label>\n"
                "                            <input type=\"email\" id=\"contact-email\" name=\"email\" required>\n"
                "                        </div>\n"
                "                        <div class=\"form-row\">\n"
                "                            <label for=\"contact-message\">Message</label>\n"
                "                            <textarea id=\"contact-message\" name=\"message\" rows=\"4\" required></textarea>\n"
                "                        </div>\n"
                "                        <button type=\"submit\" class=\"btn btn-primary\">Envoyer</button>\n"
                "                    </form>\n"
                "                </div>",
            ]
        ),
    },
]


def main() -> None:
    for page in PAGES:
        slug = page["slug"]
        content = BASE_TEMPLATE.format(
            title=page["title"],
            description=page["description"],
            canonical=f"{DOMAIN}/{slug}.html",
            brand=BRAND,
            domain=DOMAIN,
            hero=page["hero"],
            intro=page["intro"],
            content=page["content"],
        )
        target = ROOT / f"{slug}.html"
        target.write_text(content, encoding="utf-8")
        print(f"GÃ©nÃ©rÃ© : {target.relative_to(ROOT)}")


if __name__ == "__main__":
    main()




