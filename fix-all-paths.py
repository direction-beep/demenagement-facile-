#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script pour corriger TOUS les chemins CSS/JS en chemins absolus dans tous les fichiers HTML
"""

import os
import re
import glob

def fix_all_paths(file_path):
    """Corrige tous les chemins dans un fichier HTML"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Remplacer les chemins relatifs par des chemins absolus
        replacements = [
            # CSS
            (r'href="css/', r'href="/css/'),
            (r"href='css/", r"href='/css/"),
            # JS
            (r'src="js/', r'src="/js/'),
            (r"src='js/", r"src='/js/'),
            # Images (dans les attributs HTML)
            (r'src="images/', r'src="/images/'),
            (r"src='images/", r"src='/images/'),
            (r'href="images/', r'href="/images/'),
            (r"href='images/", r"href='/images/'),
        ]
        
        for pattern, replacement in replacements:
            content = re.sub(pattern, replacement, content)
        
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"  [OK] {os.path.basename(file_path)}")
            return True
        else:
            return False
            
    except Exception as e:
        print(f"  [ERROR] {os.path.basename(file_path)} - {str(e)}")
        return False

def main():
    """Fonction principale"""
    print("Correction de TOUS les chemins CSS/JS/Images en chemins absolus...")
    print("-" * 60)
    
    # Trouver tous les fichiers HTML
    html_files = glob.glob('*.html')
    
    if not html_files:
        print("Aucun fichier HTML trouvé")
        return
    
    success_count = 0
    
    for file_path in sorted(html_files):
        if fix_all_paths(file_path):
            success_count += 1
    
    print("-" * 60)
    print(f"Résumé: {success_count} fichier(s) modifié(s)")

if __name__ == '__main__':
    main()




