#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script pour ajouter un script inline dans le <head> pour un remplacement instantané
"""

import os
import re
from pathlib import Path

# Chemin du dossier
base_dir = Path(__file__).parent

# Pattern pour trouver les pages de villes
city_page_pattern = re.compile(r'demenageur-.*\.html$')

# Script inline à ajouter dans le <head>
inline_script = '''    <script>
// Remplacement instantané du nom de ville dans le titre
(function() {
    'use strict';
    const slug = (function() {
        const path = window.location.pathname;
        const href = window.location.href;
        let match = path.match(/demenageur-([^/]+)\.html/) || path.match(/\/demenageur-([^/?#]+)/) || path.match(/demenageur-([^/?#]+)/) || href.match(/demenageur-([^/?#]+)/);
        return match ? match[1] : null;
    })();
    
    const cityMap = {
        'nantes': 'Nantes', 'paris': 'Paris', 'lyon': 'Lyon', 'marseille': 'Marseille', 'toulouse': 'Toulouse',
        'bordeaux': 'Bordeaux', 'lille': 'Lille', 'agen': 'Agen', 'vannes': 'Vannes', 'rennes': 'Rennes',
        'strasbourg': 'Strasbourg', 'nice': 'Nice', 'toulon': 'Toulon', 'montpellier': 'Montpellier',
        'nancy': 'Nancy', 'metz': 'Metz', 'caen': 'Caen', 'rouen': 'Rouen', 'amiens': 'Amiens',
        'versailles': 'Versailles', 'melun': 'Melun', 'evry': 'Évry', 'nanterre': 'Nanterre',
        'bobigny': 'Bobigny', 'creteil': 'Créteil', 'cergy': 'Cergy', 'grenoble': 'Grenoble',
        'clermont-ferrand': 'Clermont-Ferrand', 'dijon': 'Dijon', 'besancon': 'Besançon',
        'vesoul': 'Vesoul', 'saint-brieuc': 'Saint-Brieuc', 'bourges': 'Bourges', 'chartres': 'Chartres',
        'tours': 'Tours', 'orleans': 'Orléans', 'troyes': 'Troyes', 'reims': 'Reims', 'mulhouse': 'Mulhouse',
        'angouleme': 'Angoulême', 'la-rochelle': 'La Rochelle', 'pau': 'Pau', 'limoges': 'Limoges',
        'perpignan': 'Perpignan', 'tarbes': 'Tarbes', 'albi': 'Albi', 'montauban': 'Montauban',
        'angers': 'Angers', 'le-mans': 'Le Mans', 'avignon': 'Avignon', 'digne-les-bains': 'Digne-les-Bains',
        'gap': 'Gap', 'annecy': 'Annecy', 'chambery': 'Chambéry', 'valence': 'Valence',
        'saint-etienne': 'Saint-Étienne', 'macon': 'Mâcon', 'auxerre': 'Auxerre', 'belfort': 'Belfort',
        'chateauroux': 'Châteauroux', 'blois': 'Blois', 'charleville-mezieres': 'Charleville-Mézières',
        'chaumont': 'Chaumont', 'bar-le-duc': 'Bar-le-Duc', 'epinal': 'Épinal', 'laon': 'Laon',
        'beauvais': 'Beauvais', 'arras': 'Arras', 'evreux': 'Évreux', 'saint-lo': 'Saint-Lô',
        'alencon': 'Alençon', 'tulle': 'Tulle', 'gueret': 'Guéret', 'perigueux': 'Périgueux',
        'mont-de-marsan': 'Mont-de-Marsan', 'niort': 'Niort', 'poitiers': 'Poitiers', 'foix': 'Foix',
        'carcassonne': 'Carcassonne', 'rodez': 'Rodez', 'nimes': 'Nîmes', 'auch': 'Auch',
        'cahors': 'Cahors', 'mende': 'Mende', 'la-roche-sur-yon': 'La Roche-sur-Yon', 'laval': 'Laval',
        'bourg-en-bresse': 'Bourg-en-Bresse', 'moulins': 'Moulins', 'privas': 'Privas', 'aurillac': 'Aurillac',
        'le-puy-en-velay': 'Le Puy-en-Velay', 'lons-le-saunier': 'Lons-le-Saunier', 'nevers': 'Nevers'
    };
    
    if (slug && cityMap[slug]) {
        const cityName = cityMap[slug];
        // Masquer le titre immédiatement
        const style = document.createElement('style');
        style.id = 'city-adapter-style';
        style.textContent = 'h1.hero-title { visibility: hidden !important; }';
        document.head.appendChild(style);
        
        // Fonction pour remplacer le titre
        function replaceTitle() {
            const heroTitle = document.querySelector('h1.hero-title');
            if (heroTitle) {
                const text = heroTitle.textContent || heroTitle.innerText || '';
                if (text.includes('Agen') || text.match(/\\b(Paris|Lyon|Marseille|Toulouse|Bordeaux|Lille|Nantes|Vannes|Rennes|Strasbourg|Nice|Toulon|Montpellier|Nancy|Metz|Caen|Rouen|Amiens|Versailles|Melun|Évry|Nanterre|Bobigny|Créteil|Cergy|Grenoble|Clermont-Ferrand|Dijon|Besançon|Vesoul|Saint-Brieuc|Bourges|Chartres|Tours|Orléans|Troyes|Reims|Mulhouse|Angoulême|La Rochelle|Pau|Limoges|Perpignan|Tarbes|Albi|Montauban|Angers|Le Mans|Avignon|Digne-les-Bains|Gap|Annecy|Chambéry|Valence|Saint-Étienne|Mâcon|Auxerre|Belfort|Châteauroux|Blois|Charleville-Mézières|Chaumont|Bar-le-Duc|Épinal|Laon|Beauvais|Arras|Évreux|Saint-Lô|Alençon|Tulle|Guéret|Périgueux|Mont-de-Marsan|Niort|Poitiers|Foix|Carcassonne|Rodez|Nîmes|Auch|Cahors|Mende|La Roche-sur-Yon|Laval|Bourg-en-Bresse|Moulins|Privas|Aurillac|Le Puy-en-Velay|Lons-le-Saunier|Nevers)\\b/)) {
                    heroTitle.textContent = text.replace(/\\b(Agen|Paris|Lyon|Marseille|Toulouse|Bordeaux|Lille|Nantes|Vannes|Rennes|Strasbourg|Nice|Toulon|Montpellier|Nancy|Metz|Caen|Rouen|Amiens|Versailles|Melun|Évry|Nanterre|Bobigny|Créteil|Cergy|Grenoble|Clermont-Ferrand|Dijon|Besançon|Vesoul|Saint-Brieuc|Bourges|Chartres|Tours|Orléans|Troyes|Reims|Mulhouse|Angoulême|La Rochelle|Pau|Limoges|Perpignan|Tarbes|Albi|Montauban|Angers|Le Mans|Avignon|Digne-les-Bains|Gap|Annecy|Chambéry|Valence|Saint-Étienne|Mâcon|Auxerre|Belfort|Châteauroux|Blois|Charleville-Mézières|Chaumont|Bar-le-Duc|Épinal|Laon|Beauvais|Arras|Évreux|Saint-Lô|Alençon|Tulle|Guéret|Périgueux|Mont-de-Marsan|Niort|Poitiers|Foix|Carcassonne|Rodez|Nîmes|Auch|Cahors|Mende|La Roche-sur-Yon|Laval|Bourg-en-Bresse|Moulins|Privas|Aurillac|Le Puy-en-Velay|Lons-le-Saunier|Nevers)\\b/gi, cityName);
                }
                // Afficher le titre
                if (style.parentNode) style.parentNode.removeChild(style);
            }
        }
        
        // Essayer immédiatement
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', replaceTitle);
        } else {
            replaceTitle();
        }
        
        // Essayer aussi après un court délai
        setTimeout(replaceTitle, 10);
        setTimeout(replaceTitle, 50);
        setTimeout(replaceTitle, 100);
    }
})();
</script>'''

# Trouver toutes les pages de villes
city_pages = [f for f in os.listdir(base_dir) if city_page_pattern.match(f)]

print(f"Trouve {len(city_pages)} pages de villes")

for page_file in city_pages:
    file_path = base_dir / page_file
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Vérifier si le script inline est déjà présent
        if 'city-adapter-style' in content:
            print(f"  [SKIP] {page_file} - Script inline deja present")
            continue
        
        # Trouver la position après la balise </head> ou avant </head>
        # On va l'ajouter juste avant </head>
        if '</head>' in content:
            # Remplacer </head> par le script + </head>
            content = content.replace('</head>', inline_script + '\n</head>')
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            
            print(f"  [OK] {page_file} - Script inline ajoute")
        else:
            print(f"  [WARN] {page_file} - Pas de balise </head> trouvee")
    
    except Exception as e:
        print(f"  [ERROR] {page_file} - Erreur: {e}")

print(f"\n[TRAITEMENT TERMINE] {len(city_pages)} pages")

