#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script pour migrer vers les fichiers JavaScript refactorisés
Remplace les anciens scripts par les versions refactorisées avec type="module"
"""

import os
import re
import glob
from pathlib import Path

# Mapping des anciens fichiers vers les nouveaux
MIGRATION_MAP = {
    'main.js': {
        'patterns': [
            r'<script\s+src=["\']/js/main\.js["\']\s+defer></script>',
            r'<script\s+src=["\']js/main\.js["\']\s+defer></script>',
            r'<script\s+src=["\']/js/main\.js["\'][^>]*></script>',
            r'<script\s+src=["\']js/main\.js["\'][^>]*></script>'
        ],
        'new': '<script type="module" src="/js/main.refactored.js" defer></script>'
    },
    'form-handler.js': {
        'patterns': [
            r'<script\s+src=["\']/js/form-handler\.js["\']\s+defer></script>',
            r'<script\s+src=["\']js/form-handler\.js["\']\s+defer></script>',
            r'<script\s+src=["\']/js/form-handler\.js["\'][^>]*></script>',
            r'<script\s+src=["\']js/form-handler\.js["\'][^>]*></script>'
        ],
        'new': '<script type="module" src="/js/form-handler.refactored.js" defer></script>'
    },
    'seo-enhancements.js': {
        'patterns': [
            r'<script\s+src=["\']/js/seo-enhancements\.js["\']\s+defer></script>',
            r'<script\s+src=["\']js/seo-enhancements\.js["\']\s+defer></script>',
            r'<script\s+src=["\']/js/seo-enhancements\.js["\'][^>]*></script>',
            r'<script\s+src=["\']js/seo-enhancements\.js["\'][^>]*></script>'
        ],
        'new': '<script type="module" src="/js/seo-enhancements.refactored.js" defer></script>'
    },
    'france-map-interactive.js': {
        'patterns': [
            r'<script\s+src=["\']/js/france-map-interactive\.js["\']\s+defer></script>',
            r'<script\s+src=["\']js/france-map-interactive\.js["\']\s+defer></script>',
            r'<script\s+src=["\']/js/france-map-interactive\.js["\'][^>]*></script>',
            r'<script\s+src=["\']js/france-map-interactive\.js["\'][^>]*></script>'
        ],
        'new': '<script type="module" src="/js/france-map-interactive.refactored.js" defer></script>'
    }
}

# Fichiers à exclure
EXCLUDE_FILES = [
    'test-css.html',
    '404.html',
    'analytics-tracking.html',
    'backlinks-strategy.html',
    'backlinks-action-plan.html'
]

def migrate_file(file_path):
    """Migre un fichier HTML vers les scripts refactorisés"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        modified = False
        
        # Appliquer toutes les migrations
        for script_name, migration in MIGRATION_MAP.items():
            # Vérifier si déjà migré
            if 'refactored.js' in content and script_name.replace('.js', '') in content:
                continue
            
            # Essayer tous les patterns
            for pattern in migration['patterns']:
                if re.search(pattern, content, re.IGNORECASE):
                    # Remplacer
                    content = re.sub(
                        pattern,
                        migration['new'],
                        content,
                        flags=re.IGNORECASE
                    )
                    modified = True
                    print(f"  [OK] Migre: {script_name}")
                    break
        
        if modified:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        
        return False
        
    except Exception as e:
        print(f"  [ERROR] Erreur: {str(e)}")
        return False

def main():
    """Fonction principale"""
    print("Migration vers les fichiers JavaScript refactorises")
    print("=" * 60)
    
    # Trouver tous les fichiers HTML
    html_files = glob.glob('*.html')
    
    # Filtrer les fichiers exclus
    html_files = [f for f in html_files if os.path.basename(f) not in EXCLUDE_FILES]
    
    if not html_files:
        print("Aucun fichier HTML trouvé")
        return
    
    print(f"\n{len(html_files)} fichier(s) HTML trouve(s)\n")
    
    success_count = 0
    skipped_count = 0
    
    for file_path in sorted(html_files):
        file_name = os.path.basename(file_path)
        print(f"Traitement: {file_name}")
        
        if migrate_file(file_path):
            success_count += 1
        else:
            skipped_count += 1
            print(f"  -> Aucune migration necessaire")
    
    print("\n" + "=" * 60)
    print(f"Migration terminee!")
    print(f"Resume:")
    print(f"   - Fichiers modifies: {success_count}")
    print(f"   - Fichiers non modifies: {skipped_count}")
    print(f"   - Total: {len(html_files)}")
    print("\nImportant:")
    print("   1. Testez les pages migrées dans un navigateur")
    print("   2. Vérifiez la console pour les erreurs")
    print("   3. Testez toutes les fonctionnalités (navigation, formulaires, etc.)")
    print("   4. Les fichiers refactorisés utilisent des modules ES6 (import/export)")

if __name__ == '__main__':
    main()


