#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script pour générer toutes les pages de villes avec le contenu statique correct
Remplace tous les "Agen" et "Lot-et-Garonne" par les bonnes valeurs pour chaque ville
"""

import os
import re
from pathlib import Path

# Chemin du dossier
base_dir = Path(__file__).parent

# Mapping complet des villes avec leurs informations
city_data = {
    'paris': {'name': 'Paris', 'dept': '75', 'deptName': 'Paris', 'region': 'Île-de-France', 'postalCode': '75000'},
    'melun': {'name': 'Melun', 'dept': '77', 'deptName': 'Seine-et-Marne', 'region': 'Île-de-France', 'postalCode': '77000'},
    'versailles': {'name': 'Versailles', 'dept': '78', 'deptName': 'Yvelines', 'region': 'Île-de-France', 'postalCode': '78000'},
    'evry': {'name': 'Évry', 'dept': '91', 'deptName': 'Essonne', 'region': 'Île-de-France', 'postalCode': '91000'},
    'nanterre': {'name': 'Nanterre', 'dept': '92', 'deptName': 'Hauts-de-Seine', 'region': 'Île-de-France', 'postalCode': '92000'},
    'bobigny': {'name': 'Bobigny', 'dept': '93', 'deptName': 'Seine-Saint-Denis', 'region': 'Île-de-France', 'postalCode': '93000'},
    'creteil': {'name': 'Créteil', 'dept': '94', 'deptName': 'Val-de-Marne', 'region': 'Île-de-France', 'postalCode': '94000'},
    'cergy': {'name': 'Cergy', 'dept': '95', 'deptName': 'Val-d\'Oise', 'region': 'Île-de-France', 'postalCode': '95000'},
    'bourg-en-bresse': {'name': 'Bourg-en-Bresse', 'dept': '01', 'deptName': 'Ain', 'region': 'Auvergne-Rhône-Alpes', 'postalCode': '01000'},
    'moulins': {'name': 'Moulins', 'dept': '03', 'deptName': 'Allier', 'region': 'Auvergne-Rhône-Alpes', 'postalCode': '03000'},
    'privas': {'name': 'Privas', 'dept': '07', 'deptName': 'Ardèche', 'region': 'Auvergne-Rhône-Alpes', 'postalCode': '07000'},
    'aurillac': {'name': 'Aurillac', 'dept': '15', 'deptName': 'Cantal', 'region': 'Auvergne-Rhône-Alpes', 'postalCode': '15000'},
    'valence': {'name': 'Valence', 'dept': '26', 'deptName': 'Drôme', 'region': 'Auvergne-Rhône-Alpes', 'postalCode': '26000'},
    'grenoble': {'name': 'Grenoble', 'dept': '38', 'deptName': 'Isère', 'region': 'Auvergne-Rhône-Alpes', 'postalCode': '38000'},
    'saint-etienne': {'name': 'Saint-Étienne', 'dept': '42', 'deptName': 'Loire', 'region': 'Auvergne-Rhône-Alpes', 'postalCode': '42000'},
    'le-puy-en-velay': {'name': 'Le Puy-en-Velay', 'dept': '43', 'deptName': 'Haute-Loire', 'region': 'Auvergne-Rhône-Alpes', 'postalCode': '43000'},
    'clermont-ferrand': {'name': 'Clermont-Ferrand', 'dept': '63', 'deptName': 'Puy-de-Dôme', 'region': 'Auvergne-Rhône-Alpes', 'postalCode': '63000'},
    'lyon': {'name': 'Lyon', 'dept': '69', 'deptName': 'Rhône', 'region': 'Auvergne-Rhône-Alpes', 'postalCode': '69000'},
    'chambery': {'name': 'Chambéry', 'dept': '73', 'deptName': 'Savoie', 'region': 'Auvergne-Rhône-Alpes', 'postalCode': '73000'},
    'annecy': {'name': 'Annecy', 'dept': '74', 'deptName': 'Haute-Savoie', 'region': 'Auvergne-Rhône-Alpes', 'postalCode': '74000'},
    'dijon': {'name': 'Dijon', 'dept': '21', 'deptName': 'Côte-d\'Or', 'region': 'Bourgogne-Franche-Comté', 'postalCode': '21000'},
    'besancon': {'name': 'Besançon', 'dept': '25', 'deptName': 'Doubs', 'region': 'Bourgogne-Franche-Comté', 'postalCode': '25000'},
    'lons-le-saunier': {'name': 'Lons-le-Saunier', 'dept': '39', 'deptName': 'Jura', 'region': 'Bourgogne-Franche-Comté', 'postalCode': '39000'},
    'nevers': {'name': 'Nevers', 'dept': '58', 'deptName': 'Nièvre', 'region': 'Bourgogne-Franche-Comté', 'postalCode': '58000'},
    'vesoul': {'name': 'Vesoul', 'dept': '70', 'deptName': 'Haute-Saône', 'region': 'Bourgogne-Franche-Comté', 'postalCode': '70000'},
    'macon': {'name': 'Mâcon', 'dept': '71', 'deptName': 'Saône-et-Loire', 'region': 'Bourgogne-Franche-Comté', 'postalCode': '71000'},
    'auxerre': {'name': 'Auxerre', 'dept': '89', 'deptName': 'Yonne', 'region': 'Bourgogne-Franche-Comté', 'postalCode': '89000'},
    'belfort': {'name': 'Belfort', 'dept': '90', 'deptName': 'Territoire de Belfort', 'region': 'Bourgogne-Franche-Comté', 'postalCode': '90000'},
    'saint-brieuc': {'name': 'Saint-Brieuc', 'dept': '22', 'deptName': 'Côtes-d\'Armor', 'region': 'Bretagne', 'postalCode': '22000'},
    'brest': {'name': 'Brest', 'dept': '29', 'deptName': 'Finistère', 'region': 'Bretagne', 'postalCode': '29000'},
    'rennes': {'name': 'Rennes', 'dept': '35', 'deptName': 'Ille-et-Vilaine', 'region': 'Bretagne', 'postalCode': '35000'},
    'vannes': {'name': 'Vannes', 'dept': '56', 'deptName': 'Morbihan', 'region': 'Bretagne', 'postalCode': '56000'},
    'bourges': {'name': 'Bourges', 'dept': '18', 'deptName': 'Cher', 'region': 'Centre-Val de Loire', 'postalCode': '18000'},
    'chartres': {'name': 'Chartres', 'dept': '28', 'deptName': 'Eure-et-Loir', 'region': 'Centre-Val de Loire', 'postalCode': '28000'},
    'chateauroux': {'name': 'Châteauroux', 'dept': '36', 'deptName': 'Indre', 'region': 'Centre-Val de Loire', 'postalCode': '36000'},
    'tours': {'name': 'Tours', 'dept': '37', 'deptName': 'Indre-et-Loire', 'region': 'Centre-Val de Loire', 'postalCode': '37000'},
    'blois': {'name': 'Blois', 'dept': '41', 'deptName': 'Loir-et-Cher', 'region': 'Centre-Val de Loire', 'postalCode': '41000'},
    'orleans': {'name': 'Orléans', 'dept': '45', 'deptName': 'Loiret', 'region': 'Centre-Val de Loire', 'postalCode': '45000'},
    'charleville-mezieres': {'name': 'Charleville-Mézières', 'dept': '08', 'deptName': 'Ardennes', 'region': 'Grand Est', 'postalCode': '08000'},
    'troyes': {'name': 'Troyes', 'dept': '10', 'deptName': 'Aube', 'region': 'Grand Est', 'postalCode': '10000'},
    'chaumont': {'name': 'Chaumont', 'dept': '52', 'deptName': 'Haute-Marne', 'region': 'Grand Est', 'postalCode': '52000'},
    'nancy': {'name': 'Nancy', 'dept': '54', 'deptName': 'Meurthe-et-Moselle', 'region': 'Grand Est', 'postalCode': '54000'},
    'bar-le-duc': {'name': 'Bar-le-Duc', 'dept': '55', 'deptName': 'Meuse', 'region': 'Grand Est', 'postalCode': '55000'},
    'metz': {'name': 'Metz', 'dept': '57', 'deptName': 'Moselle', 'region': 'Grand Est', 'postalCode': '57000'},
    'strasbourg': {'name': 'Strasbourg', 'dept': '67', 'deptName': 'Bas-Rhin', 'region': 'Grand Est', 'postalCode': '67000'},
    'epinal': {'name': 'Épinal', 'dept': '88', 'deptName': 'Vosges', 'region': 'Grand Est', 'postalCode': '88000'},
    'laon': {'name': 'Laon', 'dept': '02', 'deptName': 'Aisne', 'region': 'Hauts-de-France', 'postalCode': '02000'},
    'lille': {'name': 'Lille', 'dept': '59', 'deptName': 'Nord', 'region': 'Hauts-de-France', 'postalCode': '59000'},
    'beauvais': {'name': 'Beauvais', 'dept': '60', 'deptName': 'Oise', 'region': 'Hauts-de-France', 'postalCode': '60000'},
    'arras': {'name': 'Arras', 'dept': '62', 'deptName': 'Pas-de-Calais', 'region': 'Hauts-de-France', 'postalCode': '62000'},
    'amiens': {'name': 'Amiens', 'dept': '80', 'deptName': 'Somme', 'region': 'Hauts-de-France', 'postalCode': '80000'},
    'caen': {'name': 'Caen', 'dept': '14', 'deptName': 'Calvados', 'region': 'Normandie', 'postalCode': '14000'},
    'evreux': {'name': 'Évreux', 'dept': '27', 'deptName': 'Eure', 'region': 'Normandie', 'postalCode': '27000'},
    'saint-lo': {'name': 'Saint-Lô', 'dept': '50', 'deptName': 'Manche', 'region': 'Normandie', 'postalCode': '50000'},
    'alencon': {'name': 'Alençon', 'dept': '61', 'deptName': 'Orne', 'region': 'Normandie', 'postalCode': '61000'},
    'rouen': {'name': 'Rouen', 'dept': '76', 'deptName': 'Seine-Maritime', 'region': 'Normandie', 'postalCode': '76000'},
    'angouleme': {'name': 'Angoulême', 'dept': '16', 'deptName': 'Charente', 'region': 'Nouvelle-Aquitaine', 'postalCode': '16000'},
    'la-rochelle': {'name': 'La Rochelle', 'dept': '17', 'deptName': 'Charente-Maritime', 'region': 'Nouvelle-Aquitaine', 'postalCode': '17000'},
    'tulle': {'name': 'Tulle', 'dept': '19', 'deptName': 'Corrèze', 'region': 'Nouvelle-Aquitaine', 'postalCode': '19000'},
    'gueret': {'name': 'Guéret', 'dept': '23', 'deptName': 'Creuse', 'region': 'Nouvelle-Aquitaine', 'postalCode': '23000'},
    'perigueux': {'name': 'Périgueux', 'dept': '24', 'deptName': 'Dordogne', 'region': 'Nouvelle-Aquitaine', 'postalCode': '24000'},
    'bordeaux': {'name': 'Bordeaux', 'dept': '33', 'deptName': 'Gironde', 'region': 'Nouvelle-Aquitaine', 'postalCode': '33000'},
    'mont-de-marsan': {'name': 'Mont-de-Marsan', 'dept': '40', 'deptName': 'Landes', 'region': 'Nouvelle-Aquitaine', 'postalCode': '40000'},
    'agen': {'name': 'Agen', 'dept': '47', 'deptName': 'Lot-et-Garonne', 'region': 'Nouvelle-Aquitaine', 'postalCode': '47000'},
    'pau': {'name': 'Pau', 'dept': '64', 'deptName': 'Pyrénées-Atlantiques', 'region': 'Nouvelle-Aquitaine', 'postalCode': '64000'},
    'niort': {'name': 'Niort', 'dept': '79', 'deptName': 'Deux-Sèvres', 'region': 'Nouvelle-Aquitaine', 'postalCode': '79000'},
    'poitiers': {'name': 'Poitiers', 'dept': '86', 'deptName': 'Vienne', 'region': 'Nouvelle-Aquitaine', 'postalCode': '86000'},
    'limoges': {'name': 'Limoges', 'dept': '87', 'deptName': 'Haute-Vienne', 'region': 'Nouvelle-Aquitaine', 'postalCode': '87000'},
    'foix': {'name': 'Foix', 'dept': '09', 'deptName': 'Ariège', 'region': 'Occitanie', 'postalCode': '09000'},
    'carcassonne': {'name': 'Carcassonne', 'dept': '11', 'deptName': 'Aude', 'region': 'Occitanie', 'postalCode': '11000'},
    'rodez': {'name': 'Rodez', 'dept': '12', 'deptName': 'Aveyron', 'region': 'Occitanie', 'postalCode': '12000'},
    'nimes': {'name': 'Nîmes', 'dept': '30', 'deptName': 'Gard', 'region': 'Occitanie', 'postalCode': '30000'},
    'toulouse': {'name': 'Toulouse', 'dept': '31', 'deptName': 'Haute-Garonne', 'region': 'Occitanie', 'postalCode': '31000'},
    'auch': {'name': 'Auch', 'dept': '32', 'deptName': 'Gers', 'region': 'Occitanie', 'postalCode': '32000'},
    'montpellier': {'name': 'Montpellier', 'dept': '34', 'deptName': 'Hérault', 'region': 'Occitanie', 'postalCode': '34000'},
    'cahors': {'name': 'Cahors', 'dept': '46', 'deptName': 'Lot', 'region': 'Occitanie', 'postalCode': '46000'},
    'mende': {'name': 'Mende', 'dept': '48', 'deptName': 'Lozère', 'region': 'Occitanie', 'postalCode': '48000'},
    'tarbes': {'name': 'Tarbes', 'dept': '65', 'deptName': 'Hautes-Pyrénées', 'region': 'Occitanie', 'postalCode': '65000'},
    'perpignan': {'name': 'Perpignan', 'dept': '66', 'deptName': 'Pyrénées-Orientales', 'region': 'Occitanie', 'postalCode': '66000'},
    'albi': {'name': 'Albi', 'dept': '81', 'deptName': 'Tarn', 'region': 'Occitanie', 'postalCode': '81000'},
    'montauban': {'name': 'Montauban', 'dept': '82', 'deptName': 'Tarn-et-Garonne', 'region': 'Occitanie', 'postalCode': '82000'},
    'nantes': {'name': 'Nantes', 'dept': '44', 'deptName': 'Loire-Atlantique', 'region': 'Pays de la Loire', 'postalCode': '44000'},
    'angers': {'name': 'Angers', 'dept': '49', 'deptName': 'Maine-et-Loire', 'region': 'Pays de la Loire', 'postalCode': '49000'},
    'laval': {'name': 'Laval', 'dept': '53', 'deptName': 'Mayenne', 'region': 'Pays de la Loire', 'postalCode': '53000'},
    'le-mans': {'name': 'Le Mans', 'dept': '72', 'deptName': 'Sarthe', 'region': 'Pays de la Loire', 'postalCode': '72000'},
    'la-roche-sur-yon': {'name': 'La Roche-sur-Yon', 'dept': '85', 'deptName': 'Vendée', 'region': 'Pays de la Loire', 'postalCode': '85000'},
    'digne-les-bains': {'name': 'Digne-les-Bains', 'dept': '04', 'deptName': 'Alpes-de-Haute-Provence', 'region': 'Provence-Alpes-Côte d\'Azur', 'postalCode': '04000'},
    'gap': {'name': 'Gap', 'dept': '05', 'deptName': 'Hautes-Alpes', 'region': 'Provence-Alpes-Côte d\'Azur', 'postalCode': '05000'},
    'nice': {'name': 'Nice', 'dept': '06', 'deptName': 'Alpes-Maritimes', 'region': 'Provence-Alpes-Côte d\'Azur', 'postalCode': '06000'},
    'marseille': {'name': 'Marseille', 'dept': '13', 'deptName': 'Bouches-du-Rhône', 'region': 'Provence-Alpes-Côte d\'Azur', 'postalCode': '13000'},
    'toulon': {'name': 'Toulon', 'dept': '83', 'deptName': 'Var', 'region': 'Provence-Alpes-Côte d\'Azur', 'postalCode': '83000'},
    'avignon': {'name': 'Avignon', 'dept': '84', 'deptName': 'Vaucluse', 'region': 'Provence-Alpes-Côte d\'Azur', 'postalCode': '84000'},
}

def escape_regex(text):
    """Échapper les caractères spéciaux pour les regex"""
    return re.escape(text)

def replace_city_content(content, city_slug, city_info):
    """Remplacer tout le contenu de n'importe quelle ville par les informations de la ville cible"""
    city_name = city_info['name']
    dept_name = city_info['deptName']
    dept_code = city_info['dept']
    region = city_info['region']
    postal_code = city_info['postalCode']
    
    # Liste de toutes les villes et départements pour les remplacer
    all_cities = {slug: info['name'] for slug, info in city_data.items()}
    all_depts = {slug: info['deptName'] for slug, info in city_data.items()}
    all_dept_codes = {slug: info['dept'] for slug, info in city_data.items()}
    all_postal_codes = {slug: info['postalCode'] for slug, info in city_data.items()}
    
    # IMPORTANT: Remplacer d'abord "Agen" (la ville du template) par la ville cible
    # pour éviter que d'autres remplacements interfèrent
    if city_slug != 'agen':
        # Remplacer Agen en premier (insensible à la casse)
        content = re.sub(r'\bAgen\b', city_name, content, flags=re.IGNORECASE)
        content = content.replace('value="Agen"', f'value="{city_name}"')
        content = content.replace("value='Agen'", f"value='{city_name}'")
        content = content.replace('>Agen<', f'>{city_name}<')
        content = content.replace('à Agen', f'à {city_name}')
        content = content.replace('de Agen', f'de {city_name}')
        content = content.replace('dans Agen', f'dans {city_name}')
        content = content.replace('vers Agen', f'vers {city_name}')
        content = content.replace('pour Agen', f'pour {city_name}')
        content = content.replace('Agen et', f'{city_name} et')
        content = content.replace('Agen,', f'{city_name},')
        content = content.replace('Agen.', f'{city_name}.')
        content = content.replace('Agen?', f'{city_name}?')
        content = content.replace('Agen!', f'{city_name}!')
        content = content.replace('devis-agen', f'devis-{city_slug}')
        content = content.replace('demenageur-agen', f'demenageur-{city_slug}')
    
    # Remplacer TOUTES les autres villes par la ville cible
    # Faire le remplacement dans l'ordre inverse (du plus long au plus court) pour éviter les remplacements partiels
    sorted_cities = sorted(all_cities.items(), key=lambda x: len(x[1]), reverse=True)
    for other_slug, other_name in sorted_cities:
        if other_slug != city_slug and other_slug != 'agen':  # Agen déjà traité
            # Remplacer le nom de la ville (insensible à la casse, avec limites de mots)
            # Utiliser un remplacement global pour toutes les occurrences
            content = re.sub(r'\b' + re.escape(other_name) + r'\b', city_name, content, flags=re.IGNORECASE)
            # Remplacer dans les valeurs d'attributs HTML
            content = content.replace(f'value="{other_name}"', f'value="{city_name}"')
            content = content.replace(f'value=\'{other_name}\'', f'value=\'{city_name}\'')
            # Remplacer dans les textes de boutons et liens
            content = content.replace(f'>{other_name}<', f'>{city_name}<')
            # Remplacer dans les titres et textes (plus agressif)
            content = content.replace(f'à {other_name}', f'à {city_name}')
            content = content.replace(f'de {other_name}', f'de {city_name}')
            content = content.replace(f'dans {other_name}', f'dans {city_name}')
            content = content.replace(f'vers {other_name}', f'vers {city_name}')
            content = content.replace(f'pour {other_name}', f'pour {city_name}')
            content = content.replace(f'{other_name} et', f'{city_name} et')
            content = content.replace(f'{other_name},', f'{city_name},')
            content = content.replace(f'{other_name}.', f'{city_name}.')
            content = content.replace(f'{other_name}?', f'{city_name}?')
            content = content.replace(f'{other_name}!', f'{city_name}!')
            content = content.replace(f'devis-{other_slug}', f'devis-{city_slug}')
            content = content.replace(f'demenageur-{other_slug}', f'demenageur-{city_slug}')
    
    # Remplacer TOUS les autres départements par le département cible
    # D'abord, nettoyer les chaînes corrompues avec des répétitions et suffixes
    # Remplacer tous les patterns avec "-et-Garonne", "-Garonne", etc.
    content = re.sub(r'\b([A-Za-zÀ-ÿ\s-]+?)(?:-et-Garonne|-Garonne)(?:-et-Garonne|-Garonne)*\b', dept_name, content, flags=re.IGNORECASE)
    
    # Ensuite, remplacer tous les départements individuels (sauf celui de la ville cible)
    for other_slug, other_dept in all_depts.items():
        if other_slug != city_slug and other_dept != dept_name:
            # Remplacer le département complet (avec limites de mots)
            content = re.sub(r'\b' + re.escape(other_dept) + r'\b', dept_name, content, flags=re.IGNORECASE)
    
    # Enfin, nettoyer les répétitions du département cible (ex: "Loire-Atlantique-Atlantique")
    # Remplacer les patterns comme "Dept-Dept" ou "Dept-Dept-Dept" par "Dept"
    dept_parts = dept_name.split('-')
    if len(dept_parts) > 1:
        # Si le département a plusieurs parties, nettoyer les répétitions
        first_part = dept_parts[0]
        content = re.sub(r'\b' + re.escape(first_part) + r'-(?:' + re.escape(first_part) + r'-)+', dept_name + '-', content, flags=re.IGNORECASE)
    # Nettoyer les répétitions complètes
    content = re.sub(r'\b(' + re.escape(dept_name) + r')(?:-\1)+\b', dept_name, content, flags=re.IGNORECASE)
    
    # Remplacer TOUS les autres codes département
    for other_slug, other_code in all_dept_codes.items():
        if other_slug != city_slug and other_code != dept_code:
            # Remplacer le code département (attention aux faux positifs)
            content = re.sub(r'\b' + other_code + r'\b(?!\d)', dept_code, content)
    
    # Remplacer TOUS les autres codes postaux
    for other_slug, other_postal in all_postal_codes.items():
        if other_slug != city_slug:
            content = content.replace(other_postal, postal_code)
    
    # Remplacer dans les URLs et chemins (toutes les villes)
    for other_slug in all_cities.keys():
        if other_slug != city_slug:
            content = content.replace(f'demenageur-{other_slug}', f'demenageur-{city_slug}')
            content = content.replace(f'devis-{other_slug}', f'devis-{city_slug}')
    
    # Corriger le lien "Nos villes" pour pointer vers la carte
    content = re.sub(r'href="demenageur-[^"]+\.html">Nos villes', 'href="carte-france">Nos villes', content)
    
    # Remplacer dans le title
    content = re.sub(r'<title>[^<]*</title>', f'<title>Déménageur {city_name} - Devis Gratuit | Déménagement Professionnel {dept_code}</title>', content, flags=re.IGNORECASE)
    
    # Remplacer dans les meta tags spécifiques (plus précis)
    # og:url
    content = re.sub(r'<meta\s+property="og:url"\s+content="[^"]*"', f'<meta property="og:url" content="https://demenagement-zen.fr/demenageur-{city_slug}"', content, flags=re.IGNORECASE)
    # og:title
    content = re.sub(r'<meta\s+property="og:title"\s+content="[^"]*"', f'<meta property="og:title" content="Déménageur {city_name} - Devis Gratuit | Déménagement Professionnel {dept_code}"', content, flags=re.IGNORECASE)
    # og:description
    content = re.sub(r'<meta\s+property="og:description"\s+content="[^"]*"', f'<meta property="og:description" content="Déménageur professionnel à {city_name}. Service de déménagement clé en main dans le {dept_name}. Devis gratuit et réponse sous 24h."', content, flags=re.IGNORECASE)
    # twitter:title
    content = re.sub(r'<meta\s+name="twitter:title"\s+content="[^"]*"', f'<meta name="twitter:title" content="Déménageur {city_name} - Devis Gratuit | Déménagement Professionnel {dept_code}"', content, flags=re.IGNORECASE)
    # twitter:description
    content = re.sub(r'<meta\s+name="twitter:description"\s+content="[^"]*"', f'<meta name="twitter:description" content="Déménageur professionnel à {city_name}. Service de déménagement clé en main dans le {dept_name}. Devis gratuit et réponse sous 24h."', content, flags=re.IGNORECASE)
    # description
    content = re.sub(r'<meta\s+name="description"\s+content="[^"]*"', f'<meta name="description" content="Déménageur professionnel à {city_name}. Service de déménagement clé en main dans le {dept_name}. Devis gratuit et réponse sous 24h."', content, flags=re.IGNORECASE)
    # keywords
    content = re.sub(r'<meta\s+name="keywords"\s+content="[^"]*"', f'<meta name="keywords" content="déménageur {city_name}, déménagement {city_name}, déménageurs {dept_name}, déménagement professionnel {city_name}"', content, flags=re.IGNORECASE)
    
    # Remplacer dans le Schema.org JSON-LD
    content = re.sub(r'"name":\s*"[^"]*"', f'"name": "Déménagement Zen - {city_name}"', content)
    content = re.sub(r'"addressLocality":\s*"[^"]*"', f'"addressLocality": "{city_name}"', content)
    content = re.sub(r'"addressRegion":\s*"[^"]*"', f'"addressRegion": "{dept_name}"', content)
    content = re.sub(r'"postalCode":\s*"[^"]*"', f'"postalCode": "{postal_code}"', content)
    content = re.sub(r'"areaServed":\s*"[^"]*"', f'"areaServed": "{city_name}"', content)
    # Remplacer l'URL dans le Schema.org (toutes les villes)
    for other_slug in all_cities.keys():
        if other_slug != city_slug:
            content = re.sub(r'"url":\s*"[^"]*demenageur-' + other_slug + r'[^"]*"', f'"url": "https://demenagement-zen.fr/demenageur-{city_slug}"', content, flags=re.IGNORECASE)
    
    # Remplacer dans le canonical (toutes les villes)
    for other_slug in all_cities.keys():
        if other_slug != city_slug:
            content = re.sub(r'href="[^"]*demenageur-' + other_slug + r'[^"]*"', f'href="https://demenagement-zen.fr/demenageur-{city_slug}"', content, flags=re.IGNORECASE)
    
    # Remplacer dans les og:url (toutes les villes)
    for other_slug in all_cities.keys():
        if other_slug != city_slug:
            content = re.sub(r'property="og:url"\s+content="[^"]*demenageur-' + other_slug + r'[^"]*"', f'property="og:url" content="https://demenagement-zen.fr/demenageur-{city_slug}"', content, flags=re.IGNORECASE)
    
    # Supprimer tous les scripts de remplacement JavaScript (city-page-adapter, city-title-hider, etc.)
    # Supprimer le script city-page-adapter.js
    content = re.sub(r'<script[^>]*src="[^"]*city-page-adapter[^"]*"[^>]*></script>', '', content, flags=re.IGNORECASE)
    
    # Supprimer les scripts inline de remplacement (plus agressif)
    content = re.sub(r'<style[^>]*id="city-title-hider"[^>]*>.*?</style>', '', content, flags=re.DOTALL | re.IGNORECASE)
    content = re.sub(r'<style[^>]*>.*?city-title-hider.*?</style>', '', content, flags=re.DOTALL | re.IGNORECASE)
    # Supprimer les scripts qui contiennent des références au remplacement de ville
    content = re.sub(r'<script[^>]*>.*?city-title-hider.*?</script>', '', content, flags=re.DOTALL | re.IGNORECASE)
    content = re.sub(r'<script[^>]*>.*?city-adapter-style.*?</script>', '', content, flags=re.DOTALL | re.IGNORECASE)
    content = re.sub(r'<script[^>]*>.*?Remplacement instantané.*?</script>', '', content, flags=re.DOTALL | re.IGNORECASE)
    content = re.sub(r'<script[^>]*>.*?adaptTitleImmediately.*?</script>', '', content, flags=re.DOTALL | re.IGNORECASE)
    content = re.sub(r'<script[^>]*>.*?cityMap.*?</script>', '', content, flags=re.DOTALL | re.IGNORECASE)
    content = re.sub(r'<script[^>]*>.*?getCitySlugFromURL.*?</script>', '', content, flags=re.DOTALL | re.IGNORECASE)
    # Supprimer les lignes vides multiples créées par les suppressions
    content = re.sub(r'\n\s*\n\s*\n+', '\n\n', content)
    
    return content

def generate_city_page(city_slug, city_info):
    """Générer une page pour une ville"""
    template_file = base_dir / 'demenageur-agen.html'
    output_file = base_dir / f'demenageur-{city_slug}.html'
    
    if not template_file.exists():
        print(f"  [ERROR] Template {template_file} non trouve")
        return False
    
    try:
        # Lire le template
        with open(template_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Nettoyer d'abord le template des chaînes corrompues
        # Remplacer les patterns corrompus comme "Lot-et-Garonne-et-Garonne" par "Lot-et-Garonne"
        content = re.sub(r'\b([A-Za-zÀ-ÿ\s-]+?)(?:-et-Garonne|-Garonne)(?:-et-Garonne|-Garonne)+', r'\1', content, flags=re.IGNORECASE)
        # Nettoyer les répétitions de départements (tous les départements)
        all_dept_names = [info['deptName'] for info in city_data.values()]
        for dept in all_dept_names:
            # Nettoyer les patterns comme "Dept-et-Garonne", "Dept-Garonne"
            content = re.sub(r'\b' + re.escape(dept) + r'-[^"\s<>]+', dept, content, flags=re.IGNORECASE)
            # Nettoyer les répétitions comme "Dept-Dept"
            content = re.sub(r'\b(' + re.escape(dept) + r')(?:-\1)+\b', dept, content, flags=re.IGNORECASE)
        # Nettoyer les patterns génériques
        content = re.sub(r'([A-Za-zÀ-ÿ\s-]+?)(?:-et-Garonne|-Garonne)(?:-et-Garonne|-Garonne)+', r'\1', content, flags=re.IGNORECASE)
        
        # Remplacer le contenu
        content = replace_city_content(content, city_slug, city_info)
        
        # Écrire la nouvelle page
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(content)
        
        return True
    except Exception as e:
        print(f"  [ERROR] Erreur lors de la generation de {output_file}: {e}")
        return False

def main():
    print("Generation des pages de villes avec contenu statique...")
    print(f"Nombre de villes: {len(city_data)}")
    
    success_count = 0
    error_count = 0
    
    for city_slug, city_info in city_data.items():
        if generate_city_page(city_slug, city_info):
            print(f"  [OK] demenageur-{city_slug}.html")
            success_count += 1
        else:
            print(f"  [ERROR] demenageur-{city_slug}.html")
            error_count += 1
    
    print(f"\n[TRAITEMENT TERMINE]")
    print(f"  Succes: {success_count}")
    print(f"  Erreurs: {error_count}")
    print(f"\nToutes les pages ont ete generees avec le contenu statique correct.")
    print("Les scripts JavaScript de remplacement ont ete supprimes.")

if __name__ == '__main__':
    main()


