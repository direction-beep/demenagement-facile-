#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import re

with open('carte-france.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'src="js/', r'src="/js/', content)

with open('carte-france.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('OK - carte-france.html corrigé')




