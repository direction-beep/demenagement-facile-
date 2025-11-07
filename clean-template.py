#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Nettoyer le template Agen des chaÃ®nes corrompues"""

import re
from pathlib import Path

template_file = Path('demenageur-agen.html')

with open(template_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Nettoyer les rÃ©pÃ©titions de dÃ©partements
content = re.sub(r'Lot-et-Garonne-[^"\s<>]+', 'Lot-et-Garonne', content)
content = re.sub(r'Haute-SaÃ´ne-[^"\s<>]+', 'Haute-SaÃ´ne', content)
content = re.sub(r'([A-Za-zÃ€-Ã¿\s-]+?)(?:-et-Garonne|-Garonne)(?:-et-Garonne|-Garonne)+', r'\1', content)

# Nettoyer les rÃ©pÃ©titions simples
content = re.sub(r'\b(Lot-et-Garonne)(?:-\1)+\b', r'\1', content)
content = re.sub(r'\b(Haute-SaÃ´ne)(?:-\1)+\b', r'\1', content)

with open(template_file, 'w', encoding='utf-8') as f:
    f.write(content)

print('Template nettoyÃ©')



