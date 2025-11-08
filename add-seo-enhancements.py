#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script pour ajouter les améliorations SEO à tous les fichiers HTML
"""

import os
import re
import glob

def add_seo_enhancements(file_path):
    """Ajoute les scripts et styles SEO aux fichiers HTML"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        modified = False

        # Ajouter le CSS breadcrumbs si pas présent
        if 'breadcrumbs.css' not in content:
            # Chercher le lien vers styles.css
            pattern = r'(<link[^>]*href=["\']/css/styles\.css["\'][^>]*>)'
            replacement = r'\1\n    <link rel="stylesheet" href="/css/breadcrumbs.css">'
            content = re.sub(pattern, replacement, content, count=1)
            modified = True

        # Ajouter le script seo-enhancements.js si pas présent
        if 'seo-enhancements.js' not in content:
            # Chercher la fermeture de body ou le dernier script
            if '</body>' in content:
                # Ajouter avant </body>
                content = content.replace(
                    '</body>',
                    '    <script src="/js/seo-enhancements.js" defer></script>\n</body>'
                )
                modified = True
            elif '</html>' in content:
                # Ajouter avant </html>
                content = content.replace(
                    '</html>',
                    '    <script src="/js/seo-enhancements.js" defer></script>\n</html>'
                )
                modified = True

        if modified:
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
    print("Ajout des améliorations SEO à tous les fichiers HTML...")
    print("-" * 60)
    
    # Trouver tous les fichiers HTML
    html_files = glob.glob('*.html')
    
    if not html_files:
        print("Aucun fichier HTML trouvé")
        return
    
    success_count = 0
    
    for file_path in sorted(html_files):
        if add_seo_enhancements(file_path):
            success_count += 1
    
    print("-" * 60)
    print(f"Résumé: {success_count} fichier(s) modifié(s)")

if __name__ == '__main__':
    main()





