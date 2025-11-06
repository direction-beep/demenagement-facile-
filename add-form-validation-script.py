#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script pour ajouter le script de validation des formulaires à toutes les pages de villes
"""

import os
import re
import glob

def add_form_validation_script(file_path):
    """Ajoute le script form-validation.js à une page HTML"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Vérifier si le script est déjà présent
        if 'form-validation.js' in content:
            print(f"  [SKIP] {os.path.basename(file_path)} - Script déjà présent")
            return False
        
        # Trouver la balise </body> et ajouter le script avant
        pattern = r'(</body>)'
        replacement = r'    <script src="js/form-validation.js"></script>\n\1'
        
        if re.search(pattern, content):
            new_content = re.sub(pattern, replacement, content)
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            print(f"  [OK] {os.path.basename(file_path)}")
            return True
        else:
            print(f"  [ERROR] {os.path.basename(file_path)} - Balise </body> non trouvée")
            return False
            
    except Exception as e:
        print(f"  [ERROR] {os.path.basename(file_path)} - {str(e)}")
        return False

def main():
    """Fonction principale"""
    print("Ajout du script form-validation.js aux pages de villes...")
    print("-" * 60)
    
    # Trouver tous les fichiers HTML de villes
    city_files = glob.glob('demenageur-*.html')
    
    if not city_files:
        print("Aucun fichier demenageur-*.html trouvé")
        return
    
    success_count = 0
    skip_count = 0
    error_count = 0
    
    for file_path in sorted(city_files):
        result = add_form_validation_script(file_path)
        if result:
            success_count += 1
        elif 'form-validation.js' in open(file_path, 'r', encoding='utf-8').read():
            skip_count += 1
        else:
            error_count += 1
    
    print("-" * 60)
    print(f"Résumé:")
    print(f"  - Ajoutés: {success_count}")
    print(f"  - Déjà présents: {skip_count}")
    print(f"  - Erreurs: {error_count}")
    print(f"  - Total: {len(city_files)}")

if __name__ == '__main__':
    main()

