#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Nettoyer complètement le template Agen de toutes les chaînes corrompues"""

import re
from pathlib import Path

template_file = Path('demenageur-agen.html')

with open(template_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Liste de tous les départements français pour nettoyer les répétitions
all_depts = [
    'Ain', 'Aisne', 'Allier', 'Alpes-de-Haute-Provence', 'Hautes-Alpes', 'Alpes-Maritimes',
    'Ardèche', 'Ardennes', 'Ariège', 'Aube', 'Aude', 'Aveyron', 'Bouches-du-Rhône',
    'Calvados', 'Cantal', 'Charente', 'Charente-Maritime', 'Cher', 'Corrèze',
    'Côte-d\'Or', 'Côtes-d\'Armor', 'Creuse', 'Dordogne', 'Doubs', 'Drôme',
    'Eure', 'Eure-et-Loir', 'Finistère', 'Gard', 'Haute-Garonne', 'Gers',
    'Gironde', 'Hérault', 'Ille-et-Vilaine', 'Indre', 'Indre-et-Loire', 'Isère',
    'Jura', 'Landes', 'Loir-et-Cher', 'Loire', 'Haute-Loire', 'Loire-Atlantique',
    'Loiret', 'Lot', 'Lot-et-Garonne', 'Lozère', 'Maine-et-Loire', 'Manche',
    'Marne', 'Haute-Marne', 'Mayenne', 'Meurthe-et-Moselle', 'Meuse', 'Morbihan',
    'Moselle', 'Nièvre', 'Nord', 'Oise', 'Orne', 'Pas-de-Calais', 'Puy-de-Dôme',
    'Pyrénées-Atlantiques', 'Hautes-Pyrénées', 'Pyrénées-Orientales', 'Bas-Rhin',
    'Haut-Rhin', 'Rhône', 'Haute-Saône', 'Saône-et-Loire', 'Sarthe', 'Savoie',
    'Haute-Savoie', 'Paris', 'Seine-Maritime', 'Seine-et-Marne', 'Yvelines',
    'Deux-Sèvres', 'Somme', 'Tarn', 'Tarn-et-Garonne', 'Var', 'Vaucluse',
    'Vendée', 'Vienne', 'Haute-Vienne', 'Vosges', 'Yonne', 'Territoire de Belfort',
    'Essonne', 'Hauts-de-Seine', 'Seine-Saint-Denis', 'Val-de-Marne', 'Val-d\'Oise'
]

# Nettoyer les répétitions de départements avec suffixes
for dept in all_depts:
    # Nettoyer les patterns comme "Dept-et-Garonne", "Dept-Garonne", etc.
    content = re.sub(r'\b' + re.escape(dept) + r'-[^"\s<>]+', dept, content, flags=re.IGNORECASE)
    # Nettoyer les répétitions comme "Dept-Dept"
    content = re.sub(r'\b(' + re.escape(dept) + r')(?:-\1)+\b', dept, content, flags=re.IGNORECASE)
    # Nettoyer les répétitions avec "et-Garonne"
    content = re.sub(r'\b' + re.escape(dept) + r'-et-Garonne(?:-et-Garonne)+', dept, content, flags=re.IGNORECASE)

# Nettoyer les patterns génériques
content = re.sub(r'([A-Za-zÀ-ÿ\s-]+?)(?:-et-Garonne|-Garonne)(?:-et-Garonne|-Garonne)+', r'\1', content, flags=re.IGNORECASE)

# Remplacer les textes corrompus spécifiques
content = content.replace('Lot-et-Garonne-et-Garonne', 'Lot-et-Garonne')
content = content.replace('Haute-Saône-et-Garonne', 'Haute-Saône')
content = content.replace('Loire-Atlantique-Atlantique', 'Loire-Atlantique')

# Nettoyer les répétitions dans les phrases
content = re.sub(r'\b([A-Za-zÀ-ÿ]+)(?:-\1)+\b', r'\1', content)

with open(template_file, 'w', encoding='utf-8') as f:
    f.write(content)

print('Template nettoyé complètement')




