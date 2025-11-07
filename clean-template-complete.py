#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Nettoyer complÃ¨tement le template Agen de toutes les chaÃ®nes corrompues"""

import re
from pathlib import Path

template_file = Path('demenageur-agen.html')

with open(template_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Liste de tous les dÃ©partements franÃ§ais pour nettoyer les rÃ©pÃ©titions
all_depts = [
    'Ain', 'Aisne', 'Allier', 'Alpes-de-Haute-Provence', 'Hautes-Alpes', 'Alpes-Maritimes',
    'ArdÃ¨che', 'Ardennes', 'AriÃ¨ge', 'Aube', 'Aude', 'Aveyron', 'Bouches-du-RhÃ´ne',
    'Calvados', 'Cantal', 'Charente', 'Charente-Maritime', 'Cher', 'CorrÃ¨ze',
    'CÃ´te-d\'Or', 'CÃ´tes-d\'Armor', 'Creuse', 'Dordogne', 'Doubs', 'DrÃ´me',
    'Eure', 'Eure-et-Loir', 'FinistÃ¨re', 'Gard', 'Haute-Garonne', 'Gers',
    'Gironde', 'HÃ©rault', 'Ille-et-Vilaine', 'Indre', 'Indre-et-Loire', 'IsÃ¨re',
    'Jura', 'Landes', 'Loir-et-Cher', 'Loire', 'Haute-Loire', 'Loire-Atlantique',
    'Loiret', 'Lot', 'Lot-et-Garonne', 'LozÃ¨re', 'Maine-et-Loire', 'Manche',
    'Marne', 'Haute-Marne', 'Mayenne', 'Meurthe-et-Moselle', 'Meuse', 'Morbihan',
    'Moselle', 'NiÃ¨vre', 'Nord', 'Oise', 'Orne', 'Pas-de-Calais', 'Puy-de-DÃ´me',
    'PyrÃ©nÃ©es-Atlantiques', 'Hautes-PyrÃ©nÃ©es', 'PyrÃ©nÃ©es-Orientales', 'Bas-Rhin',
    'Haut-Rhin', 'RhÃ´ne', 'Haute-SaÃ´ne', 'SaÃ´ne-et-Loire', 'Sarthe', 'Savoie',
    'Haute-Savoie', 'Paris', 'Seine-Maritime', 'Seine-et-Marne', 'Yvelines',
    'Deux-SÃ¨vres', 'Somme', 'Tarn', 'Tarn-et-Garonne', 'Var', 'Vaucluse',
    'VendÃ©e', 'Vienne', 'Haute-Vienne', 'Vosges', 'Yonne', 'Territoire de Belfort',
    'Essonne', 'Hauts-de-Seine', 'Seine-Saint-Denis', 'Val-de-Marne', 'Val-d\'Oise'
]

# Nettoyer les rÃ©pÃ©titions de dÃ©partements avec suffixes
for dept in all_depts:
    # Nettoyer les patterns comme "Dept-et-Garonne", "Dept-Garonne", etc.
    content = re.sub(r'\b' + re.escape(dept) + r'-[^"\s<>]+', dept, content, flags=re.IGNORECASE)
    # Nettoyer les rÃ©pÃ©titions comme "Dept-Dept"
    content = re.sub(r'\b(' + re.escape(dept) + r')(?:-\1)+\b', dept, content, flags=re.IGNORECASE)
    # Nettoyer les rÃ©pÃ©titions avec "et-Garonne"
    content = re.sub(r'\b' + re.escape(dept) + r'-et-Garonne(?:-et-Garonne)+', dept, content, flags=re.IGNORECASE)

# Nettoyer les patterns gÃ©nÃ©riques
content = re.sub(r'([A-Za-zÃ€-Ã¿\s-]+?)(?:-et-Garonne|-Garonne)(?:-et-Garonne|-Garonne)+', r'\1', content, flags=re.IGNORECASE)

# Remplacer les textes corrompus spÃ©cifiques
content = content.replace('Lot-et-Garonne-et-Garonne', 'Lot-et-Garonne')
content = content.replace('Haute-SaÃ´ne-et-Garonne', 'Haute-SaÃ´ne')
content = content.replace('Loire-Atlantique-Atlantique', 'Loire-Atlantique')

# Nettoyer les rÃ©pÃ©titions dans les phrases
content = re.sub(r'\b([A-Za-zÃ€-Ã¿]+)(?:-\1)+\b', r'\1', content)

with open(template_file, 'w', encoding='utf-8') as f:
    f.write(content)

print('Template nettoyÃ© complÃ¨tement')



