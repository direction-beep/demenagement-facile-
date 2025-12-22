#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import re

with open('api/submit-form.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Remplacer la fonction formatEmailData
pattern = r'function formatEmailData\(data\) \{\s+return \{'
replacement = '''function formatEmailData(data) {
    // Extraire l'email du client pour le reply-to
    const clientEmail = data.email || '';
    
    return {
        replyTo: clientEmail,'''

content = re.sub(pattern, replacement, content, count=1)

with open('api/submit-form.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('OK - formatEmailData corrigé')




