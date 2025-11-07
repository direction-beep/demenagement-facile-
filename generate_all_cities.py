#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os

# Liste complÃ¨te de toutes les villes (104 villes)
villes = [
    ("Bourg-en-Bresse", "bourg-en-bresse", "Ain", "01"),
    ("Laon", "laon", "Aisne", "02"),
    ("Moulins", "moulins", "Allier", "03"),
    ("Digne-les-Bains", "digne-les-bains", "Alpes-de-Haute-Provence", "04"),
    ("Gap", "gap", "Hautes-Alpes", "05"),
    ("Nice", "nice", "Alpes-Maritimes", "06"),
    ("Privas", "privas", "ArdÃ¨che", "07"),
    ("Charleville-MÃ©ziÃ¨res", "charleville-mezieres", "Ardennes", "08"),
    ("Foix", "foix", "AriÃ¨ge", "09"),
    ("Troyes", "troyes", "Aube", "10"),
    ("Carcassonne", "carcassonne", "Aude", "11"),
    ("Rodez", "rodez", "Aveyron", "12"),
    ("Caen", "caen", "Calvados", "14"),
    ("Aurillac", "aurillac", "Cantal", "15"),
    ("AngoulÃªme", "angouleme", "Charente", "16"),
    ("La Rochelle", "la-rochelle", "Charente-Maritime", "17"),
    ("Bourges", "bourges", "Cher", "18"),
    ("Tulle", "tulle", "CorrÃ¨ze", "19"),
    ("Dijon", "dijon", "CÃ´te-d'Or", "21"),
    ("Saint-Brieuc", "saint-brieuc", "CÃ´tes-d'Armor", "22"),
    ("GuÃ©ret", "gueret", "Creuse", "23"),
    ("PÃ©rigueux", "perigueux", "Dordogne", "24"),
    ("BesanÃ§on", "besancon", "Doubs", "25"),
    ("Valence", "valence", "DrÃ´me", "26"),
    ("Ã‰vreux", "evreux", "Eure", "27"),
    ("Chartres", "chartres", "Eure-et-Loir", "28"),
    ("Brest", "brest", "FinistÃ¨re", "29"),
    ("Ajaccio", "ajaccio", "Corse-du-Sud", "2A"),
    ("Bastia", "bastia", "Haute-Corse", "2B"),
    ("NÃ®mes", "nimes", "Gard", "30"),
    ("Auch", "auch", "Gers", "32"),
    ("Bordeaux", "bordeaux", "Gironde", "33"),
    ("Montpellier", "montpellier", "HÃ©rault", "34"),
    ("Rennes", "rennes", "Ille-et-Vilaine", "35"),
    ("ChÃ¢teauroux", "chateauroux", "Indre", "36"),
    ("Tours", "tours", "Indre-et-Loire", "37"),
    ("Grenoble", "grenoble", "IsÃ¨re", "38"),
    ("Lons-le-Saunier", "lons-le-saunier", "Jura", "39"),
    ("Mont-de-Marsan", "mont-de-marsan", "Landes", "40"),
    ("Blois", "blois", "Loir-et-Cher", "41"),
    ("Saint-Ã‰tienne", "saint-etienne", "Loire", "42"),
    ("Le Puy-en-Velay", "le-puy-en-velay", "Haute-Loire", "43"),
    ("Nantes", "nantes", "Loire-Atlantique", "44"),
    ("OrlÃ©ans", "orleans", "Loiret", "45"),
    ("Cahors", "cahors", "Lot", "46"),
    ("Agen", "agen", "Lot-et-Garonne", "47"),
    ("Mende", "mende", "LozÃ¨re", "48"),
    ("Angers", "angers", "Maine-et-Loire", "49"),
    ("Saint-LÃ´", "saint-lo", "Manche", "50"),
    ("Reims", "reims", "Marne", "51"),
    ("Chaumont", "chaumont", "Haute-Marne", "52"),
    ("Laval", "laval", "Mayenne", "53"),
    ("Nancy", "nancy", "Meurthe-et-Moselle", "54"),
    ("Bar-le-Duc", "bar-le-duc", "Meuse", "55"),
    ("Vannes", "vannes", "Morbihan", "56"),
    ("Metz", "metz", "Moselle", "57"),
    ("Nevers", "nevers", "NiÃ¨vre", "58"),
    ("Lille", "lille", "Nord", "59"),
    ("Beauvais", "beauvais", "Oise", "60"),
    ("AlenÃ§on", "alencon", "Orne", "61"),
    ("Arras", "arras", "Pas-de-Calais", "62"),
    ("Clermont-Ferrand", "clermont-ferrand", "Puy-de-DÃ´me", "63"),
    ("Pau", "pau", "PyrÃ©nÃ©es-Atlantiques", "64"),
    ("Tarbes", "tarbes", "Hautes-PyrÃ©nÃ©es", "65"),
    ("Perpignan", "perpignan", "PyrÃ©nÃ©es-Orientales", "66"),
    ("Strasbourg", "strasbourg", "Bas-Rhin", "67"),
    ("Mulhouse", "mulhouse", "Haut-Rhin", "68"),
    ("Vesoul", "vesoul", "Haute-SaÃ´ne", "70"),
    ("MÃ¢con", "macon", "SaÃ´ne-et-Loire", "71"),
    ("Le Mans", "le-mans", "Sarthe", "72"),
    ("ChambÃ©ry", "chambery", "Savoie", "73"),
    ("Annecy", "annecy", "Haute-Savoie", "74"),
    ("Rouen", "rouen", "Seine-Maritime", "76"),
    ("Melun", "melun", "Seine-et-Marne", "77"),
    ("Versailles", "versailles", "Yvelines", "78"),
    ("Niort", "niort", "Deux-SÃ¨vres", "79"),
    ("Amiens", "amiens", "Somme", "80"),
    ("Albi", "albi", "Tarn", "81"),
    ("Montauban", "montauban", "Tarn-et-Garonne", "82"),
    ("Toulon", "toulon", "Var", "83"),
    ("Avignon", "avignon", "Vaucluse", "84"),
    ("La Roche-sur-Yon", "la-roche-sur-yon", "VendÃ©e", "85"),
    ("Poitiers", "poitiers", "Vienne", "86"),
    ("Limoges", "limoges", "Haute-Vienne", "87"),
    ("Ã‰pinal", "epinal", "Vosges", "88"),
    ("Auxerre", "auxerre", "Yonne", "89"),
    ("Belfort", "belfort", "Territoire de Belfort", "90"),
    ("Ã‰vry", "evry", "Essonne", "91"),
    ("Nanterre", "nanterre", "Hauts-de-Seine", "92"),
    ("Bobigny", "bobigny", "Seine-Saint-Denis", "93"),
    ("CrÃ©teil", "creteil", "Val-de-Marne", "94"),
    ("Cergy", "cergy", "Val-d'Oise", "95")
]

def generate_html(nom, slug, departement, code_dept):
    """GÃ©nÃ¨re le HTML pour une ville"""
    postal_code = code_dept + "000" if code_dept not in ["2A", "2B", "75"] else "75000" if code_dept == "75" else "20000"
    
    return f'''<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DÃ©mÃ©nageur {nom} - Devis Gratuit | DÃ©mÃ©nagement Professionnel {code_dept}</title>
    <meta name="description" content="DÃ©mÃ©nageur professionnel Ã  {nom}. Service de dÃ©mÃ©nagement clÃ© en main dans le {departement}. Devis gratuit et rÃ©ponse sous 24h.">
    <meta name="keywords" content="dÃ©mÃ©nageur {nom}, dÃ©mÃ©nagement {nom}, dÃ©mÃ©nageurs {departement}, dÃ©mÃ©nagement professionnel {nom}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://demenagement-zen.fr/demenageur-{slug}">
    <link rel="stylesheet" href="css/styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <script type="application/ld+json">
    {{{{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "DÃ©mÃ©nagement Zen - {nom}",
        "description": "Service de dÃ©mÃ©nagement professionnel Ã  {nom}",
        "address": {{{{
            "@type": "PostalAddress",
            "addressLocality": "{nom}",
            "addressRegion": "{departement}",
            "postalCode": "{postal_code}"
        }}}},
        "areaServed": "{nom}",
        "url": "https://demenagement-zen.fr/demenageur-{slug}",
        "priceRange": "â‚¬â‚¬"
    }}}}
    </script>
</head>
<body>
    <header class="header">
        <nav class="navbar">
            <div class="container">
                <div class="nav-logo">
                    <a href="index.html" class="logo">DÃ©mÃ©nagement Zen</a>
                </div>
                <div class="nav-menu">
                    <ul class="nav-list">
                        <li><a href="index.html">Accueil</a></li>
                        <li><a href="index.html#services">Services</a></li>
                        <li><a href="demenageur-paris.html">Nos villes</a></li>
                        <li><a href="index.html#contact">Contact</a></li>
                    </ul>
                    <a href="#devis" class="btn btn-primary-nav">Devis gratuit</a>
                </div>
                <button class="mobile-menu-toggle" aria-label="Menu mobile">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    </header>

    <main>
        <section class="hero">
            <div class="container">
                <div class="hero-content">
                    <div>
                        <h1 class="hero-title">DÃ©mÃ©nageur professionnel Ã  {nom}</h1>
                        <p class="hero-subtitle">Service de dÃ©mÃ©nagement clÃ© en main dans le {departement} et ses environs</p>
                        <div class="hero-stats">
                            <div class="stat-item">
                                <span class="stat-number">1000+</span>
                                <span class="stat-label">DÃ©mÃ©nagements rÃ©alisÃ©s</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number">98%</span>
                                <span class="stat-label">Clients satisfaits</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number">24h</span>
                                <span class="stat-label">Temps de rÃ©ponse</span>
                            </div>
                        </div>
                    </div>
                    <form class="hero-form" id="devis">
                        <h2 class="form-title">Demandez votre devis {nom}</h2>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="ville-depart">Ville de dÃ©part</label>
                                <input type="text" id="ville-depart" name="ville-depart" value="{nom}" required>
                            </div>
                            <div class="form-group">
                                <label for="ville-arrivee">Ville d'arrivÃ©e</label>
                                <input type="text" id="ville-arrivee" name="ville-arrivee" placeholder="Destination..." required>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="date">Date souhaitÃ©e</label>
                                <input type="date" id="date" name="date" required>
                            </div>
                            <div class="form-group">
                                <label for="type-logement">Type de logement</label>
                                <select id="type-logement" name="type-logement" required>
                                    <option value="">SÃ©lectionnez</option>
                                    <option value="studio">Studio</option>
                                    <option value="t2">T2</option>
                                    <option value="t3">T3</option>
                                    <option value="t4">T4+</option>
                                    <option value="maison">Maison</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" id="email" name="email" placeholder="votre@email.com" required>
                            </div>
                            <div class="form-group">
                                <label for="telephone">TÃ©lÃ©phone</label>
                                <input type="tel" id="telephone" name="telephone" placeholder="06 12 34 56 78" required>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary btn-large">Devis gratuit {nom}</button>
                        <p class="form-disclaimer">âœ“ Devis gratuit â€¢ âœ“ RÃ©ponse sous 24h â€¢ âœ“ Sans engagement</p>
                    </form>
                </div>
            </div>
        </section>

        <section class="local-description">
            <div class="container">
                <h2 class="section-title">DÃ©mÃ©nagement Ã  {nom} avec DÃ©mÃ©nagement Zen</h2>
                <div class="content-column">
                    <p>Vous recherchez un dÃ©mÃ©nageur professionnel Ã  {nom} et dans le {departement} ? DÃ©mÃ©nagement Zen vous propose un service complet de dÃ©mÃ©nagement adaptÃ© Ã  vos besoins spÃ©cifiques. Nos Ã©quipes de dÃ©mÃ©nageurs aguerris maÃ®trisent parfaitement les particularitÃ©s du {departement} pour vous garantir un dÃ©mÃ©nagement sans stress.</p>
                    
                    <p>Que vous dÃ©mÃ©nagiez depuis ou vers {nom}, nous mettons notre expertise Ã  votre service. Notre connaissance locale du terrain et notre expÃ©rience de centaines de dÃ©mÃ©nagements dans la rÃ©gion nous permettent de vous offrir un service de qualitÃ©, optimisÃ© pour votre secteur gÃ©ographique.</p>
                    
                    <h3>Zone d'intervention {nom}</h3>
                    <p>Nous couvrons {nom} et ses environs proches pour vous garantir une intervention rapide et efficace :</p>
                    <ul class="arrondissements-list">
                        <li>âœ“ {nom} centre-ville</li>
                        <li>âœ“ {nom} pÃ©riphÃ©rie</li>
                        <li>âœ“ Communes alentours du {departement}</li>
                        <li>âœ“ DÃ©mÃ©nagements longue distance</li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="advantages">
            <div class="container">
                <h2 class="section-title">Pourquoi faire appel Ã  DÃ©mÃ©nagement Zen Ã  {nom} ?</h2>
                <div class="advantages-grid">
                    <div class="advantage">
                        <div class="advantage-icon">ðŸšš</div>
                        <h3>Connaissance locale</h3>
                        <p>Expertise du {departement} et des itinÃ©raires optimaux</p>
                    </div>
                    <div class="advantage">
                        <div class="advantage-icon">âš¡</div>
                        <h3>RÃ©activitÃ© maximale</h3>
                        <p>Intervention rapide et organisation impeccable</p>
                    </div>
                    <div class="advantage">
                        <div class="advantage-icon">ðŸ’¼</div>
                        <h3>Professionnels certifiÃ©s</h3>
                        <p>DÃ©mÃ©nageurs expÃ©rimentÃ©s et formÃ©s aux standards de qualitÃ©</p>
                    </div>
                    <div class="advantage">
                        <div class="advantage-icon">ðŸ›¡ï¸</div>
                        <h3>Assurance tous risques</h3>
                        <p>Protection complÃ¨te de vos biens pendant le transport</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="faq">
            <div class="container">
                <h2 class="section-title">Questions frÃ©quentes - DÃ©mÃ©nagement {nom}</h2>
                <div class="faq-list">
                    <div class="faq-item">
                        <button class="faq-question">Combien coÃ»te un dÃ©mÃ©nagement Ã  {nom} ?</button>
                        <div class="faq-answer">
                            <p>Le prix d'un dÃ©mÃ©nagement dÃ©pend de plusieurs facteurs : distance, volume de mobilier, services choisis. Obtenez un devis gratuit et personnalisÃ© sous 24h pour {nom} et ses environs.</p>
                        </div>
                    </div>
                    <div class="faq-item">
                        <button class="faq-question">Intervenez-vous dans tout le {departement} ?</button>
                        <div class="faq-answer">
                            <p>Oui, nous desservons {nom} et l'ensemble du {departement}. Nos Ã©quipes peuvent intervenir rapidement dans toute la rÃ©gion.</p>
                        </div>
                    </div>
                    <div class="faq-item">
                        <button class="faq-question">Proposez-vous des crÃ©neaux le weekend Ã  {nom} ?</button>
                        <div class="faq-answer">
                            <p>Oui, nous intervenons 7j/7 selon vos disponibilitÃ©s, y compris les weekends. Les tarifs peuvent varier selon la date choisie.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="cta-final">
            <div class="container">
                <h2>PrÃªt pour votre dÃ©mÃ©nagement Ã  {nom} ?</h2>
                <p>Obtenez votre devis gratuit personnalisÃ© en moins de 24h</p>
                <a href="#devis" class="btn btn-primary btn-large">Demander mon devis {nom}</a>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-column">
                    <h3>DÃ©mÃ©nagement Zen</h3>
                    <p>Votre dÃ©mÃ©nagement simplifiÃ© avec des professionnels Ã  vos cÃ´tÃ©s</p>
                </div>
                <div class="footer-column">
                    <h4>Navigation</h4>
                    <ul>
                        <li><a href="index.html">Accueil</a></li>
                        <li><a href="index.html#services">Services</a></li>
                        <li><a href="demenageur-paris.html">Nos villes</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h4>Contact</h4>
                    <ul>
                        <li><a href="mailto:contact@demenagement-zen.fr">contact@demenagement-zen.fr</a></li>
                        <li><a href="tel:+33123456789">01 23 45 67 89</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h4>LÃ©gal</h4>
                    <ul>
                        <li><a href="#">Mentions lÃ©gales</a></li>
                        <li><a href="#">Politique de confidentialitÃ©</a></li>
                        <li><a href="#">CGU</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 DÃ©mÃ©nagement Zen. Tous droits rÃ©servÃ©s.</p>
            </div>
        </div>
    </footer>

    <script src="js/main.js"></script>
</body>
</html>'''

def main():
    """Fonction principale pour gÃ©nÃ©rer toutes les pages"""
    print("Generation des pages de villes...\n")
    
    # Villes dÃ©jÃ  crÃ©Ã©es Ã  exclure
    villes_existantes = ["paris", "lyon", "marseille", "toulouse"]
    
    created_count = 0
    skipped_count = 0
    
    for nom, slug, departement, code_dept in villes:
        filename = f"demenageur-{slug}.html"
        
        # Skip si la ville existe dÃ©jÃ 
        if slug in villes_existantes:
            skipped_count += 1
            print(f"Skippe : {filename} (deja existant)")
            continue
        
        # GÃ©nÃ©rer le HTML
        html_content = generate_html(nom, slug, departement, code_dept)
        
        # Ã‰crire le fichier
        try:
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(html_content)
            created_count += 1
            print(f"OK {created_count}/{len(villes)-len(villes_existantes)} : {filename}")
        except Exception as e:
            print(f"ERREUR pour {filename}: {e}")
    
    print(f"\nGeneration terminee !")
    print(f"   - {created_count} nouvelles pages creees")
    print(f"   - {skipped_count} pages existantes skippees")
    print(f"   - Total : {created_count + skipped_count} pages disponibles")

if __name__ == "__main__":
    main()


