#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Génère les pages institutionnelles manquantes (FAQ, contact, etc.)."""

from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BRAND = "Déménagement Zen"
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
                        <li><a href="/services.html">Services</a></li>
                        <li><a href="/villes.html">Nos villes</a></li>
                        <li><a href="/contact.html">Contact</a></li>
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
                    <p>Votre déménagement simplifié partout en France.</p>
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
                        <li><a href=\"/mentions-legales.html\">Mentions légales</a></li>
                        <li><a href=\"/politique-confidentialite.html\">Politique de confidentialité</a></li>
                        <li><a href=\"/cgu.html\">Conditions d'utilisation</a></li>
                    </ul>
                </div>
            </div>
            <div class=\"footer-bottom\">
                <p>&copy; 2025 {brand}. Tous droits réservés.</p>
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
        "title": "FAQ Déménagement | Déménagement Zen",
        "description": "Toutes les réponses aux questions fréquentes sur l'organisation d'un déménagement avec Déménagement Zen.",
        "hero": "Questions fréquentes",
        "intro": "Les réponses aux questions que nos clients nous posent le plus souvent.",
        "content": "\n".join(
            [
                section_from_paragraphs([
                    "Vous préparez votre déménagement ? Retrouvez ici les informations essentielles pour bien planifier chaque étape.",
                ]),
                section_from_list(
                    "Questions principales",
                    [
                        "Quel est le délai pour obtenir un devis ? &mdash; Nous répondons sous 24 heures ouvrées.",
                        "Votre service inclut-il l'emballage ? &mdash; Oui, nous proposons des formules avec emballage complet ou partiel.",
                        "Puis-je déménager le week-end ? &mdash; Nos équipes interviennent 7j/7 selon vos disponibilités.",
                        "Comment sont assurés mes biens ? &mdash; Une assurance dommages est incluse dans chacune de nos prestations.",
                    ],
                ),
                section_from_paragraphs([
                    "Vous avez une autre question ? Contactez-nous au 01&nbsp;23&nbsp;45&nbsp;67&nbsp;89 ou par email à contact@demenagement-zen.fr.",
                ]),
            ]
        ),
    },
    {
        "slug": "mentions-legales",
        "title": "Mentions légales | Déménagement Zen",
        "description": "Informations légales de Déménagement Zen : éditeur du site, hébergement et contact.",
        "hero": "Mentions légales",
        "intro": "Transparence sur l'éditeur du site et les coordonnées de contact.",
        "content": "\n".join(
            [
                section_from_paragraphs([
                    "Le site demenagement-zen.fr est édité par {brand}, 10 Rue de la Liberté, 75001 Paris.".format(brand=BRAND),
                    "Hébergement : Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.",
                    "Pour toute question, contactez contact@demenagement-zen.fr ou appelez le 01&nbsp;23&nbsp;45&nbsp;67&nbsp;89.",
                ]),
            ]
        ),
    },
    {
        "slug": "politique-confidentialite",
        "title": "Politique de confidentialité | Déménagement Zen",
        "description": "Découvrez notre politique de confidentialité et la gestion de vos données personnelles.",
        "hero": "Politique de confidentialité",
        "intro": "Nous protégeons les données personnelles que vous nous confiez.",
        "content": "\n".join(
            [
                section_from_paragraphs([
                    "Les données collectées via nos formulaires sont utilisées pour répondre à vos demandes de devis et assurer le suivi commercial.",
                    "Vous pouvez demander la consultation, la modification ou la suppression de vos informations à tout moment en écrivant à privacy@demenagement-zen.fr.",
                    "Vos données sont hébergées dans l'Union européenne et conservées pendant 3 ans maximum après le dernier échange.",
                ]),
            ]
        ),
    },
    {
        "slug": "services",
        "title": "Nos services de déménagement | Déménagement Zen",
        "description": "Découvrez les services de déménagement résidentiel, professionnel et sur mesure proposés par Déménagement Zen.",
        "hero": "Nos services",
        "intro": "Des solutions clés en main pour entreprises et particuliers.",
        "content": "\n".join(
            [
                section_from_list(
                    "Prestations principales",
                    [
                        "Déménagement résidentiel : préparation, emballage, transport et installation.",
                        "Déménagement d'entreprise : transfert de bureaux, équipements IT et archivage sécurisé.",
                        "Services premium : garde-meubles, emballage fragile, montage de mobilier.",
                        "Accompagnement administratif : autorisations de stationnement et formalités sur mesure.",
                    ],
                ),
                section_from_paragraphs([
                    "Nos équipes évaluent chaque projet pour proposer la formule la plus adaptée." ,
                    "Demandez un devis gratuit pour connaître le détail de nos prestations et disponibilités.",
                ]),
            ]
        ),
    },
    {
        "slug": "villes",
        "title": "Nos villes de déménagement | Déménagement Zen",
        "description": "Consultez la liste des villes couvertes par Déménagement Zen partout en France.",
        "hero": "Nos implantations",
        "intro": "Un réseau national de déménageurs certifiés.",
        "content": "\n".join(
            [
                section_from_paragraphs([
                    "Nous intervenons dans plus de 100 villes françaises. Retrouvez ci-dessous une sélection des destinations les plus demandées.",
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
                    "Consultez notre carte interactive ou contactez-nous pour vérifier la disponibilité dans votre ville.",
                ]),
            ]
        ),
    },
    {
        "slug": "a-propos",
        "title": "À propos de Déménagement Zen",
        "description": "En savoir plus sur Déménagement Zen, notre équipe et nos engagements qualité.",
        "hero": "À propos",
        "intro": "Une équipe d'experts dédiée à la réussite de votre déménagement.",
        "content": section_from_paragraphs([
            "Depuis plus de 15 ans, Déménagement Zen accompagne particuliers et entreprises avec des solutions personnalisées.",
            "Nos équipes basées en France sont formées aux meilleures pratiques logistiques et relation client.",
            "Nous plaçons la qualité de service et la transparence au cœur de chaque mission.",
        ]),
    },
    {
        "slug": "cgu",
        "title": "Conditions générales d'utilisation | Déménagement Zen",
        "description": "Lisez les conditions générales d'utilisation du site demenagement-zen.fr.",
        "hero": "Conditions d'utilisation",
        "intro": "Les règles applicables à l'utilisation du site et au traitement de vos demandes.",
        "content": section_from_paragraphs([
            "Tout utilisateur s'engage à fournir des informations exactes lors des demandes de devis.",
            "Déménagement Zen se réserve le droit de refuser une demande qui ne respecterait pas ces conditions ou notre charte de qualité.",
            "Les présentes CGU peuvent être mises à jour à tout moment. Version en vigueur : 7 novembre 2025.",
        ]),
    },
    {
        "slug": "comment-ca-marche",
        "title": "Comment fonctionne notre service | Déménagement Zen",
        "description": "Découvrez les 3 étapes clés pour organiser votre déménagement avec Déménagement Zen.",
        "hero": "Comment ça marche ?",
        "intro": "Un processus simple en trois étapes pour un déménagement serein.",
        "content": section_from_list(
            "Étapes",
            [
                "1. Demande de devis : partagez vos informations clés (volume, adresses, date).",
                "2. Planification : un conseiller dédié définit la prestation adaptée et le planning.",
                "3. Réalisation : notre équipe prend en charge l'ensemble des opérations logistiques.",
            ],
        ),
    },
    {
        "slug": "contact",
        "title": "Contactez Déménagement Zen",
        "description": "Contactez Déménagement Zen pour obtenir un devis de déménagement ou poser vos questions.",
        "hero": "Contact",
        "intro": "Parlez-nous de votre projet, nous vous répondons sous 24 heures.",
        "content": "\n".join(
            [
                section_from_paragraphs([
                    "Téléphone : <a href=\"tel:+33123456789\">01 23 45 67 89</a>",
                    "Email : <a href=\"mailto:contact@demenagement-zen.fr\">contact@demenagement-zen.fr</a>",
                    "Adresse : 10 Rue de la Liberté, 75001 Paris.",
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
        print(f"Généré : {target.relative_to(ROOT)}")


if __name__ == "__main__":
    main()




