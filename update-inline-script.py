#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script pour mettre à jour le script inline dans toutes les pages
"""

import os
import re
from pathlib import Path

# Chemin du dossier
base_dir = Path(__file__).parent

# Pattern pour trouver les pages de villes
city_page_pattern = re.compile(r'demenageur-.*\.html$')

# Nouveau script inline optimisé (minifié)
new_inline_script = '''    <style id="city-title-hider">h1.hero-title{opacity:0!important;visibility:hidden!important}</style>
    <script>
// Remplacement instantané du nom de ville - Exécution immédiate
(function() {
    'use strict';
    const slug = (function() {
        const p = window.location.pathname, h = window.location.href;
        return (p.match(/demenageur-([^/]+)\\.html/) || p.match(/\\/demenageur-([^/?#]+)/) || p.match(/demenageur-([^/?#]+)/) || h.match(/demenageur-([^/?#]+)/))?.[1] || null;
    })();
    const cityMap = {'nantes':'Nantes','paris':'Paris','lyon':'Lyon','marseille':'Marseille','toulouse':'Toulouse','bordeaux':'Bordeaux','lille':'Lille','strasbourg':'Strasbourg','nice':'Nice','rennes':'Rennes','versailles':'Versailles','vannes':'Vannes','agen':'Agen','melun':'Melun','evry':'Évry','nanterre':'Nanterre','bobigny':'Bobigny','creteil':'Créteil','cergy':'Cergy','bourg-en-bresse':'Bourg-en-Bresse','moulins':'Moulins','privas':'Privas','aurillac':'Aurillac','valence':'Valence','grenoble':'Grenoble','saint-etienne':'Saint-Étienne','le-puy-en-velay':'Le Puy-en-Velay','clermont-ferrand':'Clermont-Ferrand','chambery':'Chambéry','annecy':'Annecy','dijon':'Dijon','besancon':'Besançon','lons-le-saunier':'Lons-le-Saunier','nevers':'Nevers','vesoul':'Vesoul','macon':'Mâcon','auxerre':'Auxerre','belfort':'Belfort','saint-brieuc':'Saint-Brieuc','bourges':'Bourges','chartres':'Chartres','chateauroux':'Châteauroux','tours':'Tours','blois':'Blois','orleans':'Orléans','charleville-mezieres':'Charleville-Mézières','troyes':'Troyes','chaumont':'Chaumont','nancy':'Nancy','bar-le-duc':'Bar-le-Duc','metz':'Metz','epinal':'Épinal','laon':'Laon','beauvais':'Beauvais','arras':'Arras','amiens':'Amiens','caen':'Caen','evreux':'Évreux','saint-lo':'Saint-Lô','alencon':'Alençon','rouen':'Rouen','angouleme':'Angoulême','la-rochelle':'La Rochelle','tulle':'Tulle','gueret':'Guéret','perigueux':'Périgueux','mont-de-marsan':'Mont-de-Marsan','pau':'Pau','niort':'Niort','poitiers':'Poitiers','limoges':'Limoges','foix':'Foix','carcassonne':'Carcassonne','rodez':'Rodez','nimes':'Nîmes','auch':'Auch','montpellier':'Montpellier','cahors':'Cahors','mende':'Mende','tarbes':'Tarbes','perpignan':'Perpignan','albi':'Albi','montauban':'Montauban','angers':'Angers','laval':'Laval','le-mans':'Le Mans','la-roche-sur-yon':'La Roche-sur-Yon','digne-les-bains':'Digne-les-Bains','gap':'Gap','toulon':'Toulon','avignon':'Avignon'};
    if (!slug || !cityMap[slug]) return;
    const cityName = cityMap[slug];
    function r(){const t=document.querySelector('h1.hero-title');if(t){const e=t.textContent||t.innerText||'';let n=e;if(e.includes('Agen')&&cityName!=='Agen')n=e.replace(/Agen/gi,cityName);else{const o=Object.values(cityMap);o.forEach(c=>{if(e.includes(c)&&c!==cityName)n=n.replace(new RegExp('\\\\b'+c.replace(/[.*+?^${}()|[\\\\]\\\\]/g,'\\\\$&')+'\\\\b','gi'),cityName)});}if(n!==e)t.textContent=n;const s=document.getElementById('city-title-hider');s&&s.parentNode.removeChild(s);t.style.opacity='1';t.style.visibility='visible';}else setTimeout(r,5);}
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',r);else r();
    setTimeout(r,5);setTimeout(r,20);setTimeout(r,50);
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
        
        # Trouver et remplacer l'ancien script inline
        # Chercher le pattern du script existant
        old_script_pattern = r'<script>// Script inline.*?</script>'
        match = re.search(old_script_pattern, content, re.DOTALL)
        
        if match:
            # Remplacer l'ancien script par le nouveau
            content = content[:match.start()] + new_inline_script + content[match.end():]
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            
            print(f"  [OK] {page_file} - Script inline mis a jour")
        else:
            # Si pas trouvé, ajouter avant </head>
            if '</head>' in content and 'city-title-hider' not in content:
                content = content.replace('</head>', new_inline_script + '\n</head>')
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"  [ADD] {page_file} - Script inline ajoute")
            else:
                print(f"  [SKIP] {page_file} - Deja a jour ou pas de </head>")
    
    except Exception as e:
        print(f"  [ERROR] {page_file} - Erreur: {e}")

print(f"\n[TRAITEMENT TERMINE] {len(city_pages)} pages")

