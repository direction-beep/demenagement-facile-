#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Nettoyer le template Agen des chaînes corrompues"""

import re
from pathlib import Path

template_file = Path('demenageur-agen.html')

with open(template_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Nettoyer les répétitions de départements
content = re.sub(r'Lot-et-Garonne-[^"\s<>]+', 'Lot-et-Garonne', content)
content = re.sub(r'Haute-Saône-[^"\s<>]+', 'Haute-Saône', content)
content = re.sub(r'([A-Za-zÀ-ÿ\s-]+?)(?:-et-Garonne|-Garonne)(?:-et-Garonne|-Garonne)+', r'\1', content)

# Nettoyer les répétitions simples
content = re.sub(r'\b(Lot-et-Garonne)(?:-\1)+\b', r'\1', content)
content = re.sub(r'\b(Haute-Saône)(?:-\1)+\b', r'\1', content)

with open(template_file, 'w', encoding='utf-8') as f:
    f.write(content)

print('Template nettoyé')

