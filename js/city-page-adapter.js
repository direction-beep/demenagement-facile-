// ============================================
// ADAPTATION DYNAMIQUE DES PAGES VILLES
// Adapte le contenu selon l'URL
// ============================================

// Éviter le chargement multiple du script
if (window.cityPageAdapterLoaded) {
    console.warn('city-page-adapter.js déjà chargé, arrêt du chargement multiple');
} else {
    window.cityPageAdapterLoaded = true;

// Mapping des villes avec leurs informations
const cityData = {
    'paris': { name: 'Paris', dept: '75', deptName: 'Paris', region: 'Île-de-France' },
    'melun': { name: 'Melun', dept: '77', deptName: 'Seine-et-Marne', region: 'Île-de-France' },
    'versailles': { name: 'Versailles', dept: '78', deptName: 'Yvelines', region: 'Île-de-France' },
    'evry': { name: 'Évry', dept: '91', deptName: 'Essonne', region: 'Île-de-France' },
    'nanterre': { name: 'Nanterre', dept: '92', deptName: 'Hauts-de-Seine', region: 'Île-de-France' },
    'bobigny': { name: 'Bobigny', dept: '93', deptName: 'Seine-Saint-Denis', region: 'Île-de-France' },
    'creteil': { name: 'Créteil', dept: '94', deptName: 'Val-de-Marne', region: 'Île-de-France' },
    'cergy': { name: 'Cergy', dept: '95', deptName: 'Val-d\'Oise', region: 'Île-de-France' },
    'bourg-en-bresse': { name: 'Bourg-en-Bresse', dept: '01', deptName: 'Ain', region: 'Auvergne-Rhône-Alpes' },
    'moulins': { name: 'Moulins', dept: '03', deptName: 'Allier', region: 'Auvergne-Rhône-Alpes' },
    'privas': { name: 'Privas', dept: '07', deptName: 'Ardèche', region: 'Auvergne-Rhône-Alpes' },
    'aurillac': { name: 'Aurillac', dept: '15', deptName: 'Cantal', region: 'Auvergne-Rhône-Alpes' },
    'valence': { name: 'Valence', dept: '26', deptName: 'Drôme', region: 'Auvergne-Rhône-Alpes' },
    'grenoble': { name: 'Grenoble', dept: '38', deptName: 'Isère', region: 'Auvergne-Rhône-Alpes' },
    'saint-etienne': { name: 'Saint-Étienne', dept: '42', deptName: 'Loire', region: 'Auvergne-Rhône-Alpes' },
    'le-puy-en-velay': { name: 'Le Puy-en-Velay', dept: '43', deptName: 'Haute-Loire', region: 'Auvergne-Rhône-Alpes' },
    'clermont-ferrand': { name: 'Clermont-Ferrand', dept: '63', deptName: 'Puy-de-Dôme', region: 'Auvergne-Rhône-Alpes' },
    'lyon': { name: 'Lyon', dept: '69', deptName: 'Rhône', region: 'Auvergne-Rhône-Alpes' },
    'chambery': { name: 'Chambéry', dept: '73', deptName: 'Savoie', region: 'Auvergne-Rhône-Alpes' },
    'annecy': { name: 'Annecy', dept: '74', deptName: 'Haute-Savoie', region: 'Auvergne-Rhône-Alpes' },
    'dijon': { name: 'Dijon', dept: '21', deptName: 'Côte-d\'Or', region: 'Bourgogne-Franche-Comté' },
    'besancon': { name: 'Besançon', dept: '25', deptName: 'Doubs', region: 'Bourgogne-Franche-Comté' },
    'lons-le-saunier': { name: 'Lons-le-Saunier', dept: '39', deptName: 'Jura', region: 'Bourgogne-Franche-Comté' },
    'nevers': { name: 'Nevers', dept: '58', deptName: 'Nièvre', region: 'Bourgogne-Franche-Comté' },
    'vesoul': { name: 'Vesoul', dept: '70', deptName: 'Haute-Saône', region: 'Bourgogne-Franche-Comté' },
    'macon': { name: 'Mâcon', dept: '71', deptName: 'Saône-et-Loire', region: 'Bourgogne-Franche-Comté' },
    'auxerre': { name: 'Auxerre', dept: '89', deptName: 'Yonne', region: 'Bourgogne-Franche-Comté' },
    'belfort': { name: 'Belfort', dept: '90', deptName: 'Territoire de Belfort', region: 'Bourgogne-Franche-Comté' },
    'saint-brieuc': { name: 'Saint-Brieuc', dept: '22', deptName: 'Côtes-d\'Armor', region: 'Bretagne' },
    'rennes': { name: 'Rennes', dept: '35', deptName: 'Ille-et-Vilaine', region: 'Bretagne' },
    'vannes': { name: 'Vannes', dept: '56', deptName: 'Morbihan', region: 'Bretagne' },
    'bourges': { name: 'Bourges', dept: '18', deptName: 'Cher', region: 'Centre-Val de Loire' },
    'chartres': { name: 'Chartres', dept: '28', deptName: 'Eure-et-Loir', region: 'Centre-Val de Loire' },
    'chateauroux': { name: 'Châteauroux', dept: '36', deptName: 'Indre', region: 'Centre-Val de Loire' },
    'tours': { name: 'Tours', dept: '37', deptName: 'Indre-et-Loire', region: 'Centre-Val de Loire' },
    'blois': { name: 'Blois', dept: '41', deptName: 'Loir-et-Cher', region: 'Centre-Val de Loire' },
    'orleans': { name: 'Orléans', dept: '45', deptName: 'Loiret', region: 'Centre-Val de Loire' },
    'charleville-mezieres': { name: 'Charleville-Mézières', dept: '08', deptName: 'Ardennes', region: 'Grand Est' },
    'troyes': { name: 'Troyes', dept: '10', deptName: 'Aube', region: 'Grand Est' },
    'chaumont': { name: 'Chaumont', dept: '52', deptName: 'Haute-Marne', region: 'Grand Est' },
    'nancy': { name: 'Nancy', dept: '54', deptName: 'Meurthe-et-Moselle', region: 'Grand Est' },
    'bar-le-duc': { name: 'Bar-le-Duc', dept: '55', deptName: 'Meuse', region: 'Grand Est' },
    'metz': { name: 'Metz', dept: '57', deptName: 'Moselle', region: 'Grand Est' },
    'strasbourg': { name: 'Strasbourg', dept: '67', deptName: 'Bas-Rhin', region: 'Grand Est' },
    'epinal': { name: 'Épinal', dept: '88', deptName: 'Vosges', region: 'Grand Est' },
    'laon': { name: 'Laon', dept: '02', deptName: 'Aisne', region: 'Hauts-de-France' },
    'lille': { name: 'Lille', dept: '59', deptName: 'Nord', region: 'Hauts-de-France' },
    'beauvais': { name: 'Beauvais', dept: '60', deptName: 'Oise', region: 'Hauts-de-France' },
    'arras': { name: 'Arras', dept: '62', deptName: 'Pas-de-Calais', region: 'Hauts-de-France' },
    'amiens': { name: 'Amiens', dept: '80', deptName: 'Somme', region: 'Hauts-de-France' },
    'caen': { name: 'Caen', dept: '14', deptName: 'Calvados', region: 'Normandie' },
    'evreux': { name: 'Évreux', dept: '27', deptName: 'Eure', region: 'Normandie' },
    'saint-lo': { name: 'Saint-Lô', dept: '50', deptName: 'Manche', region: 'Normandie' },
    'alencon': { name: 'Alençon', dept: '61', deptName: 'Orne', region: 'Normandie' },
    'rouen': { name: 'Rouen', dept: '76', deptName: 'Seine-Maritime', region: 'Normandie' },
    'angouleme': { name: 'Angoulême', dept: '16', deptName: 'Charente', region: 'Nouvelle-Aquitaine' },
    'la-rochelle': { name: 'La Rochelle', dept: '17', deptName: 'Charente-Maritime', region: 'Nouvelle-Aquitaine' },
    'tulle': { name: 'Tulle', dept: '19', deptName: 'Corrèze', region: 'Nouvelle-Aquitaine' },
    'gueret': { name: 'Guéret', dept: '23', deptName: 'Creuse', region: 'Nouvelle-Aquitaine' },
    'perigueux': { name: 'Périgueux', dept: '24', deptName: 'Dordogne', region: 'Nouvelle-Aquitaine' },
    'bordeaux': { name: 'Bordeaux', dept: '33', deptName: 'Gironde', region: 'Nouvelle-Aquitaine' },
    'mont-de-marsan': { name: 'Mont-de-Marsan', dept: '40', deptName: 'Landes', region: 'Nouvelle-Aquitaine' },
    'agen': { name: 'Agen', dept: '47', deptName: 'Lot-et-Garonne', region: 'Nouvelle-Aquitaine' },
    'pau': { name: 'Pau', dept: '64', deptName: 'Pyrénées-Atlantiques', region: 'Nouvelle-Aquitaine' },
    'niort': { name: 'Niort', dept: '79', deptName: 'Deux-Sèvres', region: 'Nouvelle-Aquitaine' },
    'poitiers': { name: 'Poitiers', dept: '86', deptName: 'Vienne', region: 'Nouvelle-Aquitaine' },
    'limoges': { name: 'Limoges', dept: '87', deptName: 'Haute-Vienne', region: 'Nouvelle-Aquitaine' },
    'foix': { name: 'Foix', dept: '09', deptName: 'Ariège', region: 'Occitanie' },
    'carcassonne': { name: 'Carcassonne', dept: '11', deptName: 'Aude', region: 'Occitanie' },
    'rodez': { name: 'Rodez', dept: '12', deptName: 'Aveyron', region: 'Occitanie' },
    'nimes': { name: 'Nîmes', dept: '30', deptName: 'Gard', region: 'Occitanie' },
    'toulouse': { name: 'Toulouse', dept: '31', deptName: 'Haute-Garonne', region: 'Occitanie' },
    'auch': { name: 'Auch', dept: '32', deptName: 'Gers', region: 'Occitanie' },
    'montpellier': { name: 'Montpellier', dept: '34', deptName: 'Hérault', region: 'Occitanie' },
    'cahors': { name: 'Cahors', dept: '46', deptName: 'Lot', region: 'Occitanie' },
    'mende': { name: 'Mende', dept: '48', deptName: 'Lozère', region: 'Occitanie' },
    'tarbes': { name: 'Tarbes', dept: '65', deptName: 'Hautes-Pyrénées', region: 'Occitanie' },
    'perpignan': { name: 'Perpignan', dept: '66', deptName: 'Pyrénées-Orientales', region: 'Occitanie' },
    'albi': { name: 'Albi', dept: '81', deptName: 'Tarn', region: 'Occitanie' },
    'montauban': { name: 'Montauban', dept: '82', deptName: 'Tarn-et-Garonne', region: 'Occitanie' },
    'nantes': { name: 'Nantes', dept: '44', deptName: 'Loire-Atlantique', region: 'Pays de la Loire' },
    'angers': { name: 'Angers', dept: '49', deptName: 'Maine-et-Loire', region: 'Pays de la Loire' },
    'laval': { name: 'Laval', dept: '53', deptName: 'Mayenne', region: 'Pays de la Loire' },
    'le-mans': { name: 'Le Mans', dept: '72', deptName: 'Sarthe', region: 'Pays de la Loire' },
    'la-roche-sur-yon': { name: 'La Roche-sur-Yon', dept: '85', deptName: 'Vendée', region: 'Pays de la Loire' },
    'digne-les-bains': { name: 'Digne-les-Bains', dept: '04', deptName: 'Alpes-de-Haute-Provence', region: 'Provence-Alpes-Côte d\'Azur' },
    'gap': { name: 'Gap', dept: '05', deptName: 'Hautes-Alpes', region: 'Provence-Alpes-Côte d\'Azur' },
    'nice': { name: 'Nice', dept: '06', deptName: 'Alpes-Maritimes', region: 'Provence-Alpes-Côte d\'Azur' },
    'marseille': { name: 'Marseille', dept: '13', deptName: 'Bouches-du-Rhône', region: 'Provence-Alpes-Côte d\'Azur' },
    'toulon': { name: 'Toulon', dept: '83', deptName: 'Var', region: 'Provence-Alpes-Côte d\'Azur' },
    'avignon': { name: 'Avignon', dept: '84', deptName: 'Vaucluse', region: 'Provence-Alpes-Côte d\'Azur' }
};

// Extraire le slug de la ville depuis l'URL
function getCitySlugFromURL() {
    // Essayer plusieurs méthodes pour extraire le slug
    const path = window.location.pathname;
    const href = window.location.href;
    
    console.log('Extraction slug - path:', path, 'href:', href);
    
    // Méthode 1: pathname avec .html
    let match = path.match(/demenageur-([^/]+)\.html/);
    if (match && match[1]) {
        console.log('Slug trouvé (méthode 1):', match[1]);
        return match[1];
    }
    
    // Méthode 2: pathname sans .html (pour Vercel)
    match = path.match(/\/demenageur-([^/?#]+)/);
    if (match && match[1]) {
        console.log('Slug trouvé (méthode 2):', match[1]);
        return match[1];
    }
    
    // Méthode 3: pathname simple
    match = path.match(/demenageur-([^/?#]+)/);
    if (match && match[1]) {
        console.log('Slug trouvé (méthode 3):', match[1]);
        return match[1];
    }
    
    // Méthode 4: href complet avec .html
    match = href.match(/demenageur-([^/?#]+)\.html/);
    if (match && match[1]) {
        console.log('Slug trouvé (méthode 4):', match[1]);
        return match[1];
    }
    
    // Méthode 5: href complet sans .html
    match = href.match(/demenageur-([^/?#]+)/);
    if (match && match[1]) {
        console.log('Slug trouvé (méthode 5):', match[1]);
        return match[1];
    }
    
    console.warn('Impossible d\'extraire le slug de l\'URL:', { path, href });
    return null;
}

// Créer une liste de toutes les villes pour les remplacer
function getAllCityNames() {
    return Object.values(cityData).map(c => c.name);
}

// Adapter le contenu de la page
function adaptCityPage() {
    const slug = getCitySlugFromURL();
    console.log('Adaptation de la page - Slug trouvé:', slug);
    
    if (!slug) {
        console.warn('Aucun slug trouvé dans l\'URL');
        return;
    }
    
    if (!cityData[slug]) {
        console.warn('Ville non trouvée dans cityData:', slug);
        return;
    }
    
    const city = cityData[slug];
    console.log('Ville trouvée:', city);
    const allCityNames = getAllCityNames();
    
    // Créer un pattern pour remplacer toutes les villes
    const cityPattern = new RegExp('\\b(' + allCityNames.join('|') + ')\\b', 'gi');
    
    // Fonction pour remplacer le texte dans un élément
    function replaceCityInElement(element) {
        if (!element || !element.textContent) return;
        
        // Remplacer toutes les villes par la bonne ville
        const originalText = element.textContent;
        let newText = originalText;
        
        // Remplacer les noms de villes
        allCityNames.forEach(cityName => {
            if (originalText.includes(cityName) && cityName !== city.name) {
                newText = newText.replace(new RegExp('\\b' + cityName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi'), city.name);
            }
        });
        
        // Remplacer les noms de départements (trouver tous les départements possibles)
        const allDeptNames = Object.values(cityData).map(c => c.deptName);
        allDeptNames.forEach(deptName => {
            if (originalText.includes(deptName) && deptName !== city.deptName) {
                newText = newText.replace(new RegExp('\\b' + deptName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi'), city.deptName);
            }
        });
        
        if (newText !== originalText) {
            element.textContent = newText;
        }
    }
    
    // Remplacer dans le titre de la page
    const pageTitle = document.querySelector('title');
    if (pageTitle) {
        replaceCityInElement(pageTitle);
    }
    
    // Remplacer spécifiquement dans le h1.hero-title (titre principal)
    const heroTitle = document.querySelector('h1.hero-title');
    if (heroTitle) {
        const titleText = heroTitle.textContent || heroTitle.innerText || '';
        let newTitleText = titleText;
        
        // Remplacer toutes les villes par la bonne ville
        allCityNames.forEach(cityName => {
            if (titleText.includes(cityName) && cityName !== city.name) {
                newTitleText = newTitleText.replace(new RegExp('\\b' + cityName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi'), city.name);
            }
        });
        
        // Si le titre contient "Agen" (qui est souvent codé en dur), le remplacer
        if (titleText.includes('Agen') && city.name !== 'Agen') {
            newTitleText = newTitleText.replace(/Agen/gi, city.name);
        }
        
        // Si le texte a changé, mettre à jour
        if (newTitleText !== titleText) {
            heroTitle.textContent = newTitleText;
            console.log('✅ Titre h1 mis à jour:', titleText, '->', newTitleText);
        } else {
            console.log('ℹ️ Titre h1 déjà correct ou pas de changement nécessaire');
        }
    } else {
        console.warn('⚠️ h1.hero-title non trouvé');
    }
    
    // Mettre à jour les meta tags (titre de la page uniquement)
    document.querySelectorAll('meta[property="og:title"], meta[name="twitter:title"]').forEach(meta => {
        if (meta.content) {
            allCityNames.forEach(cityName => {
                if (meta.content.includes(cityName) && cityName !== city.name) {
                    meta.content = meta.content.replace(new RegExp('\\b' + cityName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi'), city.name);
                }
            });
        }
    });
    
    // NE REMPLACER QUE DANS LE TITRE H1, PAS DANS LE RESTE DE LA PAGE
    // (L'utilisateur veut seulement que le nom de la ville change dans le titre)
    
    // Mettre à jour uniquement le champ "ville de départ" dans le formulaire
    const villeDepartInput = document.getElementById('ville-depart');
    if (villeDepartInput) {
        villeDepartInput.value = city.name;
    }
}

// Fonction pour exécuter l'adaptation
function runAdaptation() {
    try {
        adaptCityPage();
    } catch (error) {
        console.error('Erreur lors de l\'adaptation de la page:', error);
    }
}

// Exécuter au chargement de la page
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAdaptation);
} else {
    // Le DOM est déjà chargé
    runAdaptation();
}

// Exécuter aussi après des délais pour s'assurer que tout est chargé
setTimeout(runAdaptation, 100);
setTimeout(runAdaptation, 500);
setTimeout(runAdaptation, 1000);
setTimeout(runAdaptation, 2000);

} // Fin de la protection contre le chargement multiple

