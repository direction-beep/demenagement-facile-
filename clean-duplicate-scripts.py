#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script pour nettoyer les scripts dupliqués dans les pages HTML
"""

import os
import re
from pathlib import Path

# Chemin du dossier
base_dir = Path(__file__).parent

# Pattern pour trouver les pages de villes
city_page_pattern = re.compile(r'demenageur-.*\.html$')

# Script à garder (une seule fois)
adapter_script = '<script src="js/city-page-adapter.js" defer></script>'

# Trouver toutes les pages de villes
city_pages = [f for f in os.listdir(base_dir) if city_page_pattern.match(f)]

print(f"Trouve {len(city_pages)} pages de villes")

for page_file in city_pages:
    file_path = base_dir / page_file
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Compter les occurrences
        count = content.count('city-page-adapter.js')
        
        if count <= 1:
            print(f"  [OK] {page_file} - Deja propre ({count} occurrence)")
            continue
        
        print(f"  [CLEAN] {page_file} - {count} occurrences trouvees")
        
        # Remplacer toutes les occurrences par une seule
        # On garde seulement la dernière occurrence (avant </body>)
        lines = content.split('\n')
        new_lines = []
        script_found = False
        script_added = False
        
        for i, line in enumerate(lines):
            if 'city-page-adapter.js' in line:
                if not script_added and '</body>' in '\n'.join(lines[i:]):
                    # C'est la dernière occurrence avant </body>, on la garde
                    new_lines.append(f'    {adapter_script}')
                    script_added = True
                # Sinon on ignore cette ligne (on supprime les doublons)
                script_found = True
            elif '</body>' in line and not script_added and script_found:
                # On ajoute le script avant </body> si on ne l'a pas encore ajouté
                new_lines.append(f'    {adapter_script}')
                new_lines.append(line)
                script_added = True
            else:
                new_lines.append(line)
        
        # Si on n'a pas trouvé de </body>, ajouter le script à la fin
        if script_found and not script_added:
            new_lines.append(f'    {adapter_script}')
        
        new_content = '\n'.join(new_lines)
        
        # Vérifier qu'on a bien une seule occurrence maintenant
        final_count = new_content.count('city-page-adapter.js')
        if final_count == 1:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"    -> Nettoye: {count} -> {final_count} occurrence")
        else:
            print(f"    -> ERREUR: {final_count} occurrences restantes")
    
    except Exception as e:
        print(f"  [ERROR] {page_file} - Erreur: {e}")

print(f"\n[TRAITEMENT TERMINE] {len(city_pages)} pages")

