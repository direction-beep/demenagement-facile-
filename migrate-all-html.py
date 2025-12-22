#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script pour migrer TOUS les fichiers HTML vers les scripts refactorisés
Version améliorée qui remplace directement les occurrences
"""

import os
import re
import glob

# Patterns de remplacement
REPLACEMENTS = [
    # main.js
    (r'<script\s+src=["\']/js/main\.js["\'][^>]*></script>', 
     '<script type="module" src="/js/main.refactored.js" defer></script>'),
    (r'<script\s+src=["\']js/main\.js["\'][^>]*></script>', 
     '<script type="module" src="/js/main.refactored.js" defer></script>'),
    
    # form-handler.js
    (r'<script\s+src=["\']/js/form-handler\.js["\'][^>]*></script>', 
     '<script type="module" src="/js/form-handler.refactored.js" defer></script>'),
    (r'<script\s+src=["\']js/form-handler\.js["\'][^>]*></script>', 
     '<script type="module" src="/js/form-handler.refactored.js" defer></script>'),
    
    # seo-enhancements.js
    (r'<script\s+src=["\']/js/seo-enhancements\.js["\'][^>]*></script>', 
     '<script type="module" src="/js/seo-enhancements.refactored.js" defer></script>'),
    (r'<script\s+src=["\']js/seo-enhancements\.js["\'][^>]*></script>', 
     '<script type="module" src="/js/seo-enhancements.refactored.js" defer></script>'),
    
    # france-map-interactive.js
    (r'<script\s+src=["\']/js/france-map-interactive\.js["\'][^>]*></script>', 
     '<script type="module" src="/js/france-map-interactive.refactored.js" defer></script>'),
    (r'<script\s+src=["\']js/france-map-interactive\.js["\'][^>]*></script>', 
     '<script type="module" src="/js/france-map-interactive.refactored.js" defer></script>'),
]

EXCLUDE_FILES = ['test-css.html', '404.html']

def migrate_file(file_path):
    """Migre un fichier HTML"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        modified = False
        
        # Appliquer tous les remplacements
        for pattern, replacement in REPLACEMENTS:
            # Vérifier si le pattern existe et n'est pas déjà remplacé
            if re.search(pattern, content, re.IGNORECASE):
                # Vérifier qu'on n'a pas déjà la version refactorisée
                if 'refactored.js' not in content or pattern.replace('.js', '') not in content:
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
    print("Migration vers les fichiers JavaScript refactorises")
    print("=" * 60)
    
    html_files = [f for f in glob.glob('*.html') if os.path.basename(f) not in EXCLUDE_FILES]
    
    print(f"\n{len(html_files)} fichier(s) HTML trouve(s)\n")
    
    success_count = 0
    
    for file_path in sorted(html_files):
        file_name = os.path.basename(file_path)
        if migrate_file(file_path):
            print(f"  [OK] {file_name}")
            success_count += 1
    
    print("\n" + "=" * 60)
    print(f"Migration terminee!")
    print(f"Fichiers modifies: {success_count}/{len(html_files)}")

if __name__ == '__main__':
    main()




