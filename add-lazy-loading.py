#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script pour ajouter le lazy loading aux images
"""

import os
import re
import glob

def add_lazy_loading(file_path):
    """Ajoute le lazy loading aux images d'une page HTML"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Compter les images modifiées
        modified_count = 0
        
        # Pattern pour trouver les balises <img> sans loading="lazy"
        # Exclure les images qui sont déjà dans le viewport initial (hero, logo)
        patterns = [
            # Images normales sans loading
            (r'(<img)([^>]*?)(?<!loading="[^"]*")(?<!loading=\'[^\']*\')([^>]*?)(>)', 
             r'\1\2 loading="lazy"\3\4'),
            # Images avec src mais sans loading
            (r'(<img[^>]*src=["\'][^"\']*["\'][^>]*?)(?<!loading="[^"]*")(?<!loading=\'[^\']*\')([^>]*>)',
             r'\1 loading="lazy"\2'),
        ]
        
        # Ne pas ajouter lazy loading aux images hero ou logo
        def should_skip_lazy(img_tag):
            skip_patterns = [
                'hero', 'logo', 'og-image', 'favicon',
                'class=".*hero', 'id=".*hero', 'class=".*logo', 'id=".*logo'
            ]
            img_lower = img_tag.lower()
            return any(pattern in img_lower for pattern in skip_patterns)
        
        # Remplacer les images une par une
        def replace_img(match):
            img_tag = match.group(0)
            if should_skip_lazy(img_tag):
                return img_tag
            if 'loading=' in img_tag:
                return img_tag
            # Ajouter loading="lazy" avant le >
            return img_tag[:-1] + ' loading="lazy">'
        
        # Remplacer toutes les images
        new_content = re.sub(r'<img[^>]*>', replace_img, content)
        
        # Compter les modifications
        original_imgs = len(re.findall(r'<img[^>]*>', content))
        new_imgs = len(re.findall(r'<img[^>]*>', new_content))
        lazy_imgs = len(re.findall(r'loading="lazy"', new_content))
        
        if new_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"  [OK] {os.path.basename(file_path)} - {lazy_imgs} image(s) avec lazy loading")
            return True
        else:
            print(f"  [SKIP] {os.path.basename(file_path)} - Aucune modification nécessaire")
            return False
            
    except Exception as e:
        print(f"  [ERROR] {os.path.basename(file_path)} - {str(e)}")
        return False

def main():
    """Fonction principale"""
    print("Ajout du lazy loading aux images...")
    print("-" * 60)
    
    # Trouver tous les fichiers HTML
    html_files = glob.glob('*.html') + glob.glob('**/*.html', recursive=True)
    html_files = [f for f in html_files if os.path.isfile(f)]
    
    if not html_files:
        print("Aucun fichier HTML trouvé")
        return
    
    success_count = 0
    skip_count = 0
    error_count = 0
    
    for file_path in sorted(html_files):
        result = add_lazy_loading(file_path)
        if result:
            success_count += 1
        elif 'loading="lazy"' in open(file_path, 'r', encoding='utf-8').read():
            skip_count += 1
        else:
            error_count += 1
    
    print("-" * 60)
    print(f"Résumé:")
    print(f"  - Modifiés: {success_count}")
    print(f"  - Déjà optimisés: {skip_count}")
    print(f"  - Erreurs: {error_count}")
    print(f"  - Total: {len(html_files)}")

if __name__ == '__main__':
    main()

