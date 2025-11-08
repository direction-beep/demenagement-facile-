#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os

# Liste complète de toutes les villes (104 villes)
villes = [
    ("Bourg-en-Bresse", "bourg-en-bresse", "Ain", "01"),
    ("Laon", "laon", "Aisne", "02"),
    ("Moulins", "moulins", "Allier", "03"),
    ("Digne-les-Bains", "digne-les-bains", "Alpes-de-Haute-Provence", "04"),
    ("Gap", "gap", "Hautes-Alpes", "05"),
    ("Nice", "nice", "Alpes-Maritimes", "06"),
    ("Privas", "privas", "Ardèche", "07"),
    ("Charleville-Mézières", "charleville-mezieres", "Ardennes", "08"),
    ("Foix", "foix", "Ariège", "09"),
    ("Troyes", "troyes", "Aube", "10"),
    ("Carcassonne", "carcassonne", "Aude", "11"),
    ("Rodez", "rodez", "Aveyron", "12"),
    ("Caen", "caen", "Calvados", "14"),
    ("Aurillac", "aurillac", "Cantal", "15"),
    ("Angoulême", "angouleme", "Charente", "16"),
    ("La Rochelle", "la-rochelle", "Charente-Maritime", "17"),
    ("Bourges", "bourges", "Cher", "18"),
    ("Tulle", "tulle", "Corrèze", "19"),
    ("Dijon", "dijon", "Côte-d'Or", "21"),
    ("Saint-Brieuc", "saint-brieuc", "Côtes-d'Armor", "22"),
    ("Guéret", "gueret", "Creuse", "23"),
    ("Périgueux", "perigueux", "Dordogne", "24"),
    ("Besançon", "besancon", "Doubs", "25"),
    ("Valence", "valence", "Drôme", "26"),
    ("Évreux", "evreux", "Eure", "27"),
    ("Chartres", "chartres", "Eure-et-Loir", "28"),
    ("Brest", "brest", "Finistère", "29"),
    ("Ajaccio", "ajaccio", "Corse-du-Sud", "2A"),
    ("Bastia", "bastia", "Haute-Corse", "2B"),
    ("Nîmes", "nimes", "Gard", "30"),
    ("Auch", "auch", "Gers", "32"),
    ("Bordeaux", "bordeaux", "Gironde", "33"),
    ("Montpellier", "montpellier", "Hérault", "34"),
    ("Rennes", "rennes", "Ille-et-Vilaine", "35"),
    ("Châteauroux", "chateauroux", "Indre", "36"),
    ("Tours", "tours", "Indre-et-Loire", "37"),
    ("Grenoble", "grenoble", "Isère", "38"),
    ("Lons-le-Saunier", "lons-le-saunier", "Jura", "39"),
    ("Mont-de-Marsan", "mont-de-marsan", "Landes", "40"),
    ("Blois", "blois", "Loir-et-Cher", "41"),
    ("Saint-Étienne", "saint-etienne", "Loire", "42"),
    ("Le Puy-en-Velay", "le-puy-en-velay", "Haute-Loire", "43"),
    ("Nantes", "nantes", "Loire-Atlantique", "44"),
    ("Orléans", "orleans", "Loiret", "45"),
    ("Cahors", "cahors", "Lot", "46"),
    ("Agen", "agen", "Lot-et-Garonne", "47"),
    ("Mende", "mende", "Lozère", "48"),
    ("Angers", "angers", "Maine-et-Loire", "49"),
    ("Saint-Lô", "saint-lo", "Manche", "50"),
    ("Reims", "reims", "Marne", "51"),
    ("Chaumont", "chaumont", "Haute-Marne", "52"),
    ("Laval", "laval", "Mayenne", "53"),
    ("Nancy", "nancy", "Meurthe-et-Moselle", "54"),
    ("Bar-le-Duc", "bar-le-duc", "Meuse", "55"),
    ("Vannes", "vannes", "Morbihan", "56"),
    ("Metz", "metz", "Moselle", "57"),
    ("Nevers", "nevers", "Nièvre", "58"),
    ("Lille", "lille", "Nord", "59"),
    ("Beauvais", "beauvais", "Oise", "60"),
    ("Alençon", "alencon", "Orne", "61"),
    ("Arras", "arras", "Pas-de-Calais", "62"),
    ("Clermont-Ferrand", "clermont-ferrand", "Puy-de-Dôme", "63"),
    ("Pau", "pau", "Pyrénées-Atlantiques", "64"),
    ("Tarbes", "tarbes", "Hautes-Pyrénées", "65"),
    ("Perpignan", "perpignan", "Pyrénées-Orientales", "66"),
    ("Strasbourg", "strasbourg", "Bas-Rhin", "67"),
    ("Mulhouse", "mulhouse", "Haut-Rhin", "68"),
    ("Vesoul", "vesoul", "Haute-Saône", "70"),
    ("Mâcon", "macon", "Saône-et-Loire", "71"),
    ("Le Mans", "le-mans", "Sarthe", "72"),
    ("Chambéry", "chambery", "Savoie", "73"),
    ("Annecy", "annecy", "Haute-Savoie", "74"),
    ("Rouen", "rouen", "Seine-Maritime", "76"),
    ("Melun", "melun", "Seine-et-Marne", "77"),
    ("Versailles", "versailles", "Yvelines", "78"),
    ("Niort", "niort", "Deux-Sèvres", "79"),
    ("Amiens", "amiens", "Somme", "80"),
    ("Albi", "albi", "Tarn", "81"),
    ("Montauban", "montauban", "Tarn-et-Garonne", "82"),
    ("Toulon", "toulon", "Var", "83"),
    ("Avignon", "avignon", "Vaucluse", "84"),
    ("La Roche-sur-Yon", "la-roche-sur-yon", "Vendée", "85"),
    ("Poitiers", "poitiers", "Vienne", "86"),
    ("Limoges", "limoges", "Haute-Vienne", "87"),
    ("Épinal", "epinal", "Vosges", "88"),
    ("Auxerre", "auxerre", "Yonne", "89"),
    ("Belfort", "belfort", "Territoire de Belfort", "90"),
    ("Évry", "evry", "Essonne", "91"),
    ("Nanterre", "nanterre", "Hauts-de-Seine", "92"),
    ("Bobigny", "bobigny", "Seine-Saint-Denis", "93"),
    ("Créteil", "creteil", "Val-de-Marne", "94"),
    ("Cergy", "cergy", "Val-d'Oise", "95")
]

def generate_html(nom, slug, departement, code_dept):
    """Génère le HTML pour une ville"""
    postal_code = code_dept + "000" if code_dept not in ["2A", "2B", "75"] else "75000" if code_dept == "75" else "20000"
    
    return f'''<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Déménageur {nom} - Devis Gratuit | Déménagement Professionnel {code_dept}</title>
    <meta name="description" content="Déménageur professionnel à {nom}. Service de déménagement clé en main dans le {departement}. Devis gratuit et réponse sous 24h.">
    <meta name="keywords" content="déménageur {nom}, déménagement {nom}, déménageurs {departement}, déménagement professionnel {nom}">
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
        "name": "Déménagement Zen - {nom}",
        "description": "Service de déménagement professionnel à {nom}",
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
                    <a href="index.html" class="logo">Déménagement Zen</a>
                </div>
                <div class="nav-menu">
                    <ul class="nav-list">
                        <li><a href="index.html#services">Services</a></li>
                        <li><a href="carte-france">Nos villes</a></li>
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
                        <h1 class="hero-title">Déménageur professionnel à {nom}</h1>
                        <p class="hero-subtitle">Service de déménagement clé en main dans le {departement} et ses environs</p>
                        <div class="hero-stats">
                            <div class="stat-item">
                                <span class="stat-number">1000+</span>
                                <span class="stat-label">Déménagements réalisés</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number">98%</span>
                                <span class="stat-label">Clients satisfaits</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number">24h</span>
                                <span class="stat-label">Temps de réponse</span>
                            </div>
                        </div>
                    </div>
                    <form class="hero-form" id="devis">
                        <h2 class="form-title">Demandez votre devis {nom}</h2>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="ville-depart">Ville de départ</label>
                                <input type="text" id="ville-depart" name="ville-depart" value="{nom}" required>
                            </div>
                            <div class="form-group">
                                <label for="ville-arrivee">Ville d'arrivée</label>
                                <input type="text" id="ville-arrivee" name="ville-arrivee" placeholder="Destination..." required>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="date">Date souhaitée</label>
                                <input type="date" id="date" name="date" required>
                            </div>
                            <div class="form-group">
                                <label for="type-logement">Type de logement</label>
                                <select id="type-logement" name="type-logement" required>
                                    <option value="">Sélectionnez</option>
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
                                <label for="telephone">Téléphone</label>
                                <input type="tel" id="telephone" name="telephone" placeholder="06 12 34 56 78" required>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary btn-large">Devis gratuit {nom}</button>
                        <p class="form-disclaimer">âœ“ Devis gratuit â€¢ âœ“ Réponse sous 24h â€¢ âœ“ Sans engagement</p>
                    </form>
                </div>
            </div>
        </section>

        <section class="local-description">
            <div class="container">
                <h2 class="section-title">Déménagement à {nom} avec Déménagement Zen</h2>
                <div class="content-column">
                    <p>Vous recherchez un déménageur professionnel à {nom} et dans le {departement} ? Déménagement Zen vous propose un service complet de déménagement adapté à vos besoins spécifiques. Nos équipes de déménageurs aguerris maîtrisent parfaitement les particularités du {departement} pour vous garantir un déménagement sans stress.</p>
                    
                    <p>Que vous déménagiez depuis ou vers {nom}, nous mettons notre expertise à votre service. Notre connaissance locale du terrain et notre expérience de centaines de déménagements dans la région nous permettent de vous offrir un service de qualité, optimisé pour votre secteur géographique.</p>
                    
                    <h3>Zone d'intervention {nom}</h3>
                    <p>Nous couvrons {nom} et ses environs proches pour vous garantir une intervention rapide et efficace :</p>
                    <ul class="arrondissements-list">
                        <li>âœ“ {nom} centre-ville</li>
                        <li>âœ“ {nom} périphérie</li>
                        <li>âœ“ Communes alentours du {departement}</li>
                        <li>âœ“ Déménagements longue distance</li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="advantages">
            <div class="container">
                <h2 class="section-title">Pourquoi faire appel à Déménagement Zen à {nom} ?</h2>
                <div class="advantages-grid">
                    <div class="advantage">
                        <div class="advantage-icon">ðŸšš</div>
                        <h3>Connaissance locale</h3>
                        <p>Expertise du {departement} et des itinéraires optimaux</p>
                    </div>
                    <div class="advantage">
                        <div class="advantage-icon">âš¡</div>
                        <h3>Réactivité maximale</h3>
                        <p>Intervention rapide et organisation impeccable</p>
                    </div>
                    <div class="advantage">
                        <div class="advantage-icon">ðŸ’¼</div>
                        <h3>Professionnels certifiés</h3>
                        <p>Déménageurs expérimentés et formés aux standards de qualité</p>
                    </div>
                    <div class="advantage">
                        <div class="advantage-icon">ðŸ›¡ï¸</div>
                        <h3>Assurance tous risques</h3>
                        <p>Protection complète de vos biens pendant le transport</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="faq">
            <div class="container">
                <h2 class="section-title">Questions fréquentes - Déménagement {nom}</h2>
                <div class="faq-list">
                    <div class="faq-item">
                        <button class="faq-question">Combien coûte un déménagement à {nom} ?</button>
                        <div class="faq-answer">
                            <p>Le prix d'un déménagement dépend de plusieurs facteurs : distance, volume de mobilier, services choisis. Obtenez un devis gratuit et personnalisé sous 24h pour {nom} et ses environs.</p>
                        </div>
                    </div>
                    <div class="faq-item">
                        <button class="faq-question">Intervenez-vous dans tout le {departement} ?</button>
                        <div class="faq-answer">
                            <p>Oui, nous desservons {nom} et l'ensemble du {departement}. Nos équipes peuvent intervenir rapidement dans toute la région.</p>
                        </div>
                    </div>
                    <div class="faq-item">
                        <button class="faq-question">Proposez-vous des créneaux le weekend à {nom} ?</button>
                        <div class="faq-answer">
                            <p>Oui, nous intervenons 7j/7 selon vos disponibilités, y compris les weekends. Les tarifs peuvent varier selon la date choisie.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="cta-final">
            <div class="container">
                <h2>Prêt pour votre déménagement à {nom} ?</h2>
                <p>Obtenez votre devis gratuit personnalisé en moins de 24h</p>
                <a href="#devis" class="btn btn-primary btn-large">Demander mon devis {nom}</a>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-column">
                    <h3>Déménagement Zen</h3>
                    <p>Votre déménagement simplifié avec des professionnels à vos côtés</p>
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
                    <h4>Légal</h4>
                    <ul>
                        <li><a href="#">Mentions légales</a></li>
                        <li><a href="#">Politique de confidentialité</a></li>
                        <li><a href="#">CGU</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 Déménagement Zen. Tous droits réservés.</p>
            </div>
        </div>
    </footer>

    <script src="js/main.js"></script>
</body>
</html>'''

def main():
    """Fonction principale pour générer toutes les pages"""
    print("Generation des pages de villes...\n")
    
    # Villes déjà créées à exclure
    villes_existantes = ["paris", "lyon", "marseille", "toulouse"]
    
    created_count = 0
    skipped_count = 0
    
    for nom, slug, departement, code_dept in villes:
        filename = f"demenageur-{slug}.html"
        
        # Skip si la ville existe déjà
        if slug in villes_existantes:
            skipped_count += 1
            print(f"Skippe : {filename} (deja existant)")
            continue
        
        # Générer le HTML
        html_content = generate_html(nom, slug, departement, code_dept)
        
        # Écrire le fichier
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


