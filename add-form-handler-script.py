#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script pour ajouter form-handler.js à tous les fichiers HTML
"""

import os
import re
import glob

def add_form_handler_script(file_path):
    """Ajoute le script form-handler.js avant la fermeture de body"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Vérifier si le script existe déjà
        if 'form-handler.js' in content:
            return False
        
        # Vérifier si form-validation.js existe et le remplacer
        if 'form-validation.js' in content:
            content = re.sub(
                r'<script[^>]*src=["\']/js/form-validation\.js["\'][^>]*></script>',
                '<script src="/js/form-handler.js" defer></script>',
                content
            )
        else:
            # Ajouter avant </body>
            if '</body>' in content:
                content = content.replace(
                    '</body>',
                    '    <script src="/js/form-handler.js" defer></script>\n</body>'
                )
            elif '</html>' in content:
                content = content.replace(
                    '</html>',
                    '    <script src="/js/form-handler.js" defer></script>\n</html>'
                )
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"  [OK] {os.path.basename(file_path)}")
        return True
        
    except Exception as e:
        print(f"  [ERROR] {os.path.basename(file_path)} - {str(e)}")
        return False

def main():
    """Fonction principale"""
    print("Ajout de form-handler.js à tous les fichiers HTML...")
    print("-" * 60)
    
    # Trouver tous les fichiers HTML
    html_files = glob.glob('*.html')
    
    if not html_files:
        print("Aucun fichier HTML trouvé")
        return
    
    success_count = 0
    
    for file_path in sorted(html_files):
        if add_form_handler_script(file_path):
            success_count += 1
    
    print("-" * 60)
    print(f"Résumé: {success_count} fichier(s) modifié(s)")

if __name__ == '__main__':
    main()





