#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
from datetime import datetime

# Liste des villes
villes = [
    "paris", "bourg-en-bresse", "laon", "moulins", "digne-les-bains", "gap",
    "nice", "privas", "charleville-mezieres", "foix", "troyes", "carcassonne",
    "rodez", "marseille", "caen", "aurillac", "angouleme", "la-rochelle",
    "bourges", "tulle", "dijon", "saint-brieuc", "gueret", "perigueux",
    "besancon", "valence", "evreux", "chartres", "brest", "ajaccio", "bastia",
    "nimes", "toulouse", "auch", "bordeaux", "montpellier", "rennes",
    "chateauroux", "tours", "grenoble", "lons-le-saunier", "mont-de-marsan",
    "blois", "saint-etienne", "le-puy-en-velay", "nantes", "orleans",
    "cahors", "agen", "mende", "angers", "saint-lo", "reims", "chaumont",
    "laval", "nancy", "bar-le-duc", "vannes", "metz", "nevers", "lille",
    "beauvais", "alencon", "arras", "clermont-ferrand", "pau", "tarbes",
    "perpignan", "strasbourg", "mulhouse", "lyon", "vesoul", "macon",
    "le-mans", "chambery", "annecy", "rouen", "melun", "versailles",
    "niort", "amiens", "albi", "montauban", "toulon", "avignon",
    "la-roche-sur-yon", "poitiers", "limoges", "epinal", "auxerre",
    "belfort", "evry", "nanterre", "bobigny", "creteil", "cergy"
]

def generate_sitemap():
    """Génère le sitemap.xml"""
    now = datetime.now().strftime('%Y-%m-%d')
    
    xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    
    # Page d'accueil
    xml += '  <url>\n'
    xml += f'    <loc>https://demenagement-facile.fr/</loc>\n'
    xml += f'    <lastmod>{now}</lastmod>\n'
    xml += '    <changefreq>weekly</changefreq>\n'
    xml += '    <priority>1.0</priority>\n'
    xml += '  </url>\n'
    
    # Pages de villes
    for ville in villes:
        xml += '  <url>\n'
        xml += f'    <loc>https://demenagement-facile.fr/demenageur-{ville}</loc>\n'
        xml += f'    <lastmod>{now}</lastmod>\n'
        xml += '    <changefreq>monthly</changefreq>\n'
        xml += '    <priority>0.8</priority>\n'
        xml += '  </url>\n'
    
    xml += '</urlset>'
    
    return xml

if __name__ == "__main__":
    sitemap = generate_sitemap()
    
    with open('sitemap.xml', 'w', encoding='utf-8') as f:
        f.write(sitemap)
    
    print(f"Sitemap genere avec {len(villes) + 1} URLs")

