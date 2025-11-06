#!/usr/bin/env python3
"""
Script pour mettre à jour toutes les pages villes :
- Remplacer la section "Nos autres implantations" par un lien vers la carte de France
- Mettre à jour le lien de navigation "Nos villes"
"""

import re
from pathlib import Path

ROOT = Path(__file__).parent
CITY_FILES = sorted(ROOT.glob('demenageur-*.html'))

# Ancienne section à remplacer
OLD_SECTION_PATTERN = re.compile(
    r'<!-- Autres villes -->.*?<!-- CTA Final -->',
    re.DOTALL
)

# Nouvelle section
NEW_SECTION = '''        <!-- Carte de France -->
        <section class="map-cta-section">
            <div class="container">
                <div class="map-cta-content">
                    <h2 class="section-title">Trouvez votre déménageur partout en France</h2>
                    <p class="map-cta-text">Nous intervenons dans plus de 90 villes en France. Utilisez notre carte interactive pour trouver le déménageur le plus proche de chez vous.</p>
                    <a href="carte-france.html" class="btn btn-primary btn-large">Voir la carte de France</a>
                </div>
            </div>
        </section>

        <!-- CTA Final -->'''

# Patterns pour les liens de navigation
NAV_LINK_PATTERNS = [
    re.compile(r'(<li><a href=")demenageur-paris\.html(">Nos villes</a></li>)', re.IGNORECASE),
    re.compile(r'(<li><a href=")villes\.html(">Nos villes</a></li>)', re.IGNORECASE),
]

def update_city_page(file_path):
    """Met à jour une page ville"""
    try:
        content = file_path.read_text(encoding='utf-8')
        original_content = content
        
        # Remplacer la section "Nos autres implantations"
        if OLD_SECTION_PATTERN.search(content):
            content = OLD_SECTION_PATTERN.sub(NEW_SECTION, content)
            print(f"✓ Section remplacée dans {file_path.name}")
        else:
            print(f"⚠ Section non trouvée dans {file_path.name}")
        
        # Mettre à jour les liens de navigation
        for pattern in NAV_LINK_PATTERNS:
            content = pattern.sub(r'\1carte-france.html\2', content)
        
        # Sauvegarder seulement si modifié
        if content != original_content:
            file_path.write_text(content, encoding='utf-8')
            return True
        return False
    except Exception as e:
        print(f"✗ Erreur avec {file_path.name}: {e}")
        return False

def main():
    print(f"Mise à jour de {len(CITY_FILES)} pages villes...\n")
    
    updated = 0
    for city_file in CITY_FILES:
        if update_city_page(city_file):
            updated += 1
    
    print(f"\n✓ {updated} pages mises à jour sur {len(CITY_FILES)}")

if __name__ == '__main__':
    main()

