#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script pour revenir aux fichiers JavaScript originaux (non-refactorisés)
car les fichiers refactorisés avec modules ES6 ne fonctionnent pas correctement
"""

import os
import re
import glob

REPLACEMENTS = [
    # main.js
    (r'<script\s+type=["\']module["\']\s+src=["\']/js/main\.refactored\.js["\'][^>]*></script>', 
     '<script src="/js/main.js" defer></script>'),
    (r'<script\s+type=["\']module["\']\s+src=["\']js/main\.refactored\.js["\'][^>]*></script>', 
     '<script src="/js/main.js" defer></script>'),
    
    # form-handler.js
    (r'<script\s+type=["\']module["\']\s+src=["\']/js/form-handler\.refactored\.js["\'][^>]*></script>', 
     '<script src="/js/form-handler.js" defer></script>'),
    (r'<script\s+type=["\']module["\']\s+src=["\']js/form-handler\.refactored\.js["\'][^>]*></script>', 
     '<script src="/js/form-handler.js" defer></script>'),
    
    # seo-enhancements.js
    (r'<script\s+type=["\']module["\']\s+src=["\']/js/seo-enhancements\.refactored\.js["\'][^>]*></script>', 
     '<script src="/js/seo-enhancements.js" defer></script>'),
    (r'<script\s+type=["\']module["\']\s+src=["\']js/seo-enhancements\.refactored\.js["\'][^>]*></script>', 
     '<script src="/js/seo-enhancements.js" defer></script>'),
    
    # france-map-interactive.js
    (r'<script\s+type=["\']module["\']\s+src=["\']/js/france-map-interactive\.refactored\.js["\'][^>]*></script>', 
     '<script src="/js/france-map-interactive.js" defer></script>'),
    (r'<script\s+type=["\']module["\']\s+src=["\']js/france-map-interactive\.refactored\.js["\'][^>]*></script>', 
     '<script src="/js/france-map-interactive.js" defer></script>'),
]

EXCLUDE_FILES = ['test-css.html', '404.html']

def revert_file(file_path):
    """Revenir aux fichiers originaux"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        modified = False
        
        # Appliquer tous les remplacements
        for pattern, replacement in REPLACEMENTS:
            if re.search(pattern, content, re.IGNORECASE):
                content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)
                modified = True
        
        if modified and content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        
        return False
        
    except Exception as e:
        print(f"  [ERROR] {str(e)}")
        return False

def main():
    """Fonction principale"""
    print("Retour aux fichiers JavaScript originaux")
    print("=" * 60)
    
    html_files = [f for f in glob.glob('*.html') if os.path.basename(f) not in EXCLUDE_FILES]
    
    print(f"\n{len(html_files)} fichier(s) HTML trouve(s)\n")
    
    success_count = 0
    
    for file_path in sorted(html_files):
        file_name = os.path.basename(file_path)
        if revert_file(file_path):
            print(f"  [OK] {file_name}")
            success_count += 1
    
    print("\n" + "=" * 60)
    print(f"Retour termine!")
    print(f"Fichiers modifies: {success_count}/{len(html_files)}")
    print("\nLes fichiers originaux (non-refactorises) sont maintenant utilises")

if __name__ == '__main__':
    main()




