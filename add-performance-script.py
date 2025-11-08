#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script pour ajouter le script performance.js à toutes les pages
"""

import os
import re
import glob

def add_performance_script(file_path):
    """Ajoute le script performance.js à une page HTML"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Vérifier si le script est déjà présent
        if 'performance.js' in content:
            return False
        
        # Trouver la balise </body> et ajouter le script avant
        pattern = r'(</body>)'
        replacement = r'    <script src="js/performance.js" defer></script>\n\1'
        
        if re.search(pattern, content):
            new_content = re.sub(pattern, replacement, content)
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            print(f"  [OK] {os.path.basename(file_path)}")
            return True
        else:
            return False
            
    except Exception as e:
        print(f"  [ERROR] {os.path.basename(file_path)} - {str(e)}")
        return False

def main():
    """Fonction principale"""
    print("Ajout du script performance.js aux pages...")
    print("-" * 60)
    
    # Trouver tous les fichiers HTML
    html_files = glob.glob('*.html')
    
    if not html_files:
        print("Aucun fichier HTML trouvé")
        return
    
    success_count = 0
    
    for file_path in sorted(html_files):
        if add_performance_script(file_path):
            success_count += 1
    
    print("-" * 60)
    print(f"Résumé: {success_count} fichier(s) modifié(s)")

if __name__ == '__main__':
    main()





