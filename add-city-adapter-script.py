#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script pour ajouter le script d'adaptation des pages villes
"""

import os
import re
from pathlib import Path

# Chemin du dossier
base_dir = Path(__file__).parent

# Pattern pour trouver les pages de villes
city_page_pattern = re.compile(r'demenageur-.*\.html$')

# Script à ajouter
adapter_script = '<script src="js/city-page-adapter.js" defer></script>'

# Trouver toutes les pages de villes
city_pages = [f for f in os.listdir(base_dir) if city_page_pattern.match(f)]

print(f"Trouvé {len(city_pages)} pages de villes")

for page_file in city_pages:
    file_path = base_dir / page_file
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Vérifier si le script est déjà présent
        if 'city-page-adapter.js' in content:
            print(f"  [SKIP] {page_file} - Script deja present")
            continue
        
        # Chercher la balise </body> ou la dernière balise <script>
        # Ajouter le script avant </body>
        if '</body>' in content:
            # Remplacer </body> par le script + </body>
            content = content.replace('</body>', f'    {adapter_script}\n</body>')
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            
            print(f"  [OK] {page_file} - Script ajoute")
        else:
            print(f"  [WARN] {page_file} - Pas de balise </body> trouvee")
    
    except Exception as e:
        print(f"  [ERROR] {page_file} - Erreur: {e}")

print(f"\n[TRAITEMENT TERMINE] {len(city_pages)} pages")


