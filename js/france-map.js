// ============================================
// CARTE DE FRANCE INTERACTIVE
// Mapping départements -> villes disponibles
// ============================================

// Mapping des départements vers les villes disponibles (SANS CORSE)
const departmentToCity = {
    // Île-de-France
    '75': { name: 'Paris', slug: 'paris' },
    '77': { name: 'Melun', slug: 'melun' },
    '78': { name: 'Versailles', slug: 'versailles' },
    '91': { name: 'Évry', slug: 'evry' },
    '92': { name: 'Nanterre', slug: 'nanterre' },
    '93': { name: 'Bobigny', slug: 'bobigny' },
    '94': { name: 'Créteil', slug: 'creteil' },
    '95': { name: 'Cergy', slug: 'cergy' },
    
    // Auvergne-Rhône-Alpes
    '01': { name: 'Bourg-en-Bresse', slug: 'bourg-en-bresse' },
    '03': { name: 'Moulins', slug: 'moulins' },
    '07': { name: 'Privas', slug: 'privas' },
    '15': { name: 'Aurillac', slug: 'aurillac' },
    '26': { name: 'Valence', slug: 'valence' },
    '38': { name: 'Grenoble', slug: 'grenoble' },
    '42': { name: 'Saint-Étienne', slug: 'saint-etienne' },
    '43': { name: 'Le Puy-en-Velay', slug: 'le-puy-en-velay' },
    '63': { name: 'Clermont-Ferrand', slug: 'clermont-ferrand' },
    '69': { name: 'Lyon', slug: 'lyon' },
    '73': { name: 'Chambéry', slug: 'chambery' },
    '74': { name: 'Annecy', slug: 'annecy' },
    
    // Bourgogne-Franche-Comté
    '21': { name: 'Dijon', slug: 'dijon' },
    '25': { name: 'Besançon', slug: 'besancon' },
    '39': { name: 'Lons-le-Saunier', slug: 'lons-le-saunier' },
    '58': { name: 'Nevers', slug: 'nevers' },
    '70': { name: 'Vesoul', slug: 'vesoul' },
    '71': { name: 'Mâcon', slug: 'macon' },
    '89': { name: 'Auxerre', slug: 'auxerre' },
    '90': { name: 'Belfort', slug: 'belfort' },
    
    // Bretagne
    '22': { name: 'Saint-Brieuc', slug: 'saint-brieuc' },
    '35': { name: 'Rennes', slug: 'rennes' },
    '56': { name: 'Vannes', slug: 'vannes' },
    
    // Centre-Val de Loire
    '18': { name: 'Bourges', slug: 'bourges' },
    '28': { name: 'Chartres', slug: 'chartres' },
    '36': { name: 'Châteauroux', slug: 'chateauroux' },
    '37': { name: 'Tours', slug: 'tours' },
    '41': { name: 'Blois', slug: 'blois' },
    '45': { name: 'Orléans', slug: 'orleans' },
    
    // Grand Est
    '08': { name: 'Charleville-Mézières', slug: 'charleville-mezieres' },
    '10': { name: 'Troyes', slug: 'troyes' },
    '52': { name: 'Chaumont', slug: 'chaumont' },
    '54': { name: 'Nancy', slug: 'nancy' },
    '55': { name: 'Bar-le-Duc', slug: 'bar-le-duc' },
    '57': { name: 'Metz', slug: 'metz' },
    '67': { name: 'Strasbourg', slug: 'strasbourg' },
    '88': { name: 'Épinal', slug: 'epinal' },
    
    // Hauts-de-France
    '02': { name: 'Laon', slug: 'laon' },
    '59': { name: 'Lille', slug: 'lille' },
    '60': { name: 'Beauvais', slug: 'beauvais' },
    '62': { name: 'Arras', slug: 'arras' },
    '80': { name: 'Amiens', slug: 'amiens' },
    
    // Normandie
    '14': { name: 'Caen', slug: 'caen' },
    '27': { name: 'Évreux', slug: 'evreux' },
    '50': { name: 'Saint-Lô', slug: 'saint-lo' },
    '61': { name: 'Alençon', slug: 'alencon' },
    '76': { name: 'Rouen', slug: 'rouen' },
    
    // Nouvelle-Aquitaine
    '16': { name: 'Angoulême', slug: 'angouleme' },
    '17': { name: 'La Rochelle', slug: 'la-rochelle' },
    '19': { name: 'Tulle', slug: 'tulle' },
    '23': { name: 'Guéret', slug: 'gueret' },
    '24': { name: 'Périgueux', slug: 'perigueux' },
    '33': { name: 'Bordeaux', slug: 'bordeaux' },
    '40': { name: 'Mont-de-Marsan', slug: 'mont-de-marsan' },
    '47': { name: 'Agen', slug: 'agen' },
    '64': { name: 'Pau', slug: 'pau' },
    '79': { name: 'Niort', slug: 'niort' },
    '86': { name: 'Poitiers', slug: 'poitiers' },
    '87': { name: 'Limoges', slug: 'limoges' },
    
    // Occitanie
    '09': { name: 'Foix', slug: 'foix' },
    '11': { name: 'Carcassonne', slug: 'carcassonne' },
    '12': { name: 'Rodez', slug: 'rodez' },
    '30': { name: 'Nîmes', slug: 'nimes' },
    '31': { name: 'Toulouse', slug: 'toulouse' },
    '32': { name: 'Auch', slug: 'auch' },
    '34': { name: 'Montpellier', slug: 'montpellier' },
    '46': { name: 'Cahors', slug: 'cahors' },
    '48': { name: 'Mende', slug: 'mende' },
    '65': { name: 'Tarbes', slug: 'tarbes' },
    '66': { name: 'Perpignan', slug: 'perpignan' },
    '81': { name: 'Albi', slug: 'albi' },
    '82': { name: 'Montauban', slug: 'montauban' },
    
    // Pays de la Loire
    '44': { name: 'Nantes', slug: 'nantes' },
    '49': { name: 'Angers', slug: 'angers' },
    '53': { name: 'Laval', slug: 'laval' },
    '72': { name: 'Le Mans', slug: 'le-mans' },
    '85': { name: 'La Roche-sur-Yon', slug: 'la-roche-sur-yon' },
    
    // Provence-Alpes-Côte d'Azur
    '04': { name: 'Digne-les-Bains', slug: 'digne-les-bains' },
    '05': { name: 'Gap', slug: 'gap' },
    '06': { name: 'Nice', slug: 'nice' },
    '13': { name: 'Marseille', slug: 'marseille' },
    '83': { name: 'Toulon', slug: 'toulon' },
    '84': { name: 'Avignon', slug: 'avignon' }
};

// Noms des départements (SANS CORSE)
const departmentNames = {
    '01': 'Ain', '02': 'Aisne', '03': 'Allier', '04': 'Alpes-de-Haute-Provence',
    '05': 'Hautes-Alpes', '06': 'Alpes-Maritimes', '07': 'Ardèche', '08': 'Ardennes',
    '09': 'Ariège', '10': 'Aube', '11': 'Aude', '12': 'Aveyron',
    '13': 'Bouches-du-Rhône', '14': 'Calvados', '15': 'Cantal', '16': 'Charente',
    '17': 'Charente-Maritime', '18': 'Cher', '19': 'Corrèze',
    '21': 'Côte-d\'Or', '22': 'Côtes-d\'Armor', '23': 'Creuse',
    '24': 'Dordogne', '25': 'Doubs', '26': 'Drôme', '27': 'Eure',
    '28': 'Eure-et-Loir', '29': 'Finistère', '30': 'Gard', '31': 'Haute-Garonne',
    '32': 'Gers', '33': 'Gironde', '34': 'Hérault', '35': 'Ille-et-Vilaine',
    '36': 'Indre', '37': 'Indre-et-Loire', '38': 'Isère', '39': 'Jura',
    '40': 'Landes', '41': 'Loir-et-Cher', '42': 'Loire', '43': 'Haute-Loire',
    '44': 'Loire-Atlantique', '45': 'Loiret', '46': 'Lot', '47': 'Lot-et-Garonne',
    '48': 'Lozère', '49': 'Maine-et-Loire', '50': 'Manche', '51': 'Marne',
    '52': 'Haute-Marne', '53': 'Mayenne', '54': 'Meurthe-et-Moselle', '55': 'Meuse',
    '56': 'Morbihan', '57': 'Moselle', '58': 'Nièvre', '59': 'Nord',
    '60': 'Oise', '61': 'Orne', '62': 'Pas-de-Calais', '63': 'Puy-de-Dôme',
    '64': 'Pyrénées-Atlantiques', '65': 'Hautes-Pyrénées', '66': 'Pyrénées-Orientales',
    '67': 'Bas-Rhin', '68': 'Haut-Rhin', '69': 'Rhône', '70': 'Haute-Saône',
    '71': 'Saône-et-Loire', '72': 'Sarthe', '73': 'Savoie', '74': 'Haute-Savoie',
    '75': 'Paris', '76': 'Seine-Maritime', '77': 'Seine-et-Marne', '78': 'Yvelines',
    '79': 'Deux-Sèvres', '80': 'Somme', '81': 'Tarn', '82': 'Tarn-et-Garonne',
    '83': 'Var', '84': 'Vaucluse', '85': 'Vendée', '86': 'Vienne',
    '87': 'Haute-Vienne', '88': 'Vosges', '89': 'Yonne', '90': 'Territoire de Belfort',
    '91': 'Essonne', '92': 'Hauts-de-Seine', '93': 'Seine-Saint-Denis', '94': 'Val-de-Marne',
    '95': 'Val-d\'Oise'
};

// Charger le SVG de la carte de France
async function loadFranceMapSVG() {
    try {
        const response = await fetch('images/france-map.svg');
        if (response.ok) {
            const svgText = await response.text();
            return svgText;
        }
    } catch (e) {
        console.log('SVG non trouvé, utilisation de la carte générée');
    }
    return null;
}

// Créer la carte SVG de France avec départements
function createFranceMapSVG() {
    const container = document.getElementById('france-map');
    if (!container) return;
    
    // SVG simplifié de la France (version basique mais fonctionnelle)
    // Pour une vraie carte détaillée, il faudrait un fichier SVG complet
    const svg = `
        <svg viewBox="0 0 800 1000" xmlns="http://www.w3.org/2000/svg" class="france-svg-map">
            <defs>
                <style>
                    .dept-path { fill: #e0e7ff; stroke: #ffffff; stroke-width: 1; cursor: pointer; transition: all 0.3s ease; }
                    .dept-path:hover { fill: #2563eb; stroke: #1e40af; stroke-width: 2; }
                    .dept-path.has-city { fill: #c7d2fe; }
                    .dept-path.has-city:hover { fill: #2563eb; }
                    .dept-path.selected { fill: #2563eb; stroke: #1e40af; stroke-width: 3; filter: drop-shadow(0 4px 8px rgba(37, 99, 235, 0.3)); }
                    .dept-text { font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 600; fill: #1f2937; pointer-events: none; }
                </style>
            </defs>
            <!-- Note: Ceci est un SVG simplifié. Pour une vraie carte, utilisez un SVG complet de la France -->
            <text x="400" y="500" text-anchor="middle" class="dept-text" font-size="24">Carte de France</text>
            <text x="400" y="530" text-anchor="middle" class="dept-text" font-size="16" fill="#6b7280">Chargement de la carte détaillée...</text>
        </svg>
    `;
    
    container.innerHTML = svg;
    
    // Essayer de charger le SVG depuis un fichier
    loadFranceMapSVG().then(svgContent => {
        if (svgContent) {
            container.innerHTML = svgContent;
            initMapInteractions();
        } else {
            // Si pas de SVG, créer une grille interactive
            createInteractiveGrid();
        }
    });
}

// Créer une grille interactive si pas de SVG
function createInteractiveGrid() {
    const container = document.getElementById('france-map');
    if (!container) return;
    
    container.innerHTML = `
        <div class="departments-map-grid">
            ${Object.keys(departmentNames).map(dept => {
                const hasCity = departmentToCity[dept];
                const deptName = departmentNames[dept];
                return `
                    <div class="department-map-item ${hasCity ? 'has-city' : ''}" 
                         data-department="${dept}"
                         data-name="${deptName}"
                         title="${deptName}${hasCity ? ' - ' + departmentToCity[dept].name : ''}">
                        <div class="dept-number">${dept}</div>
                        <div class="dept-name-small">${deptName}</div>
                        ${hasCity ? '<div class="dept-badge">✓</div>' : ''}
                    </div>
                `;
            }).join('')}
        </div>
    `;
    
    initMapInteractions();
}

// Initialiser les interactions de la carte
function initMapInteractions() {
    // Pour les éléments SVG
    const svgPaths = document.querySelectorAll('.dept-path, [data-department]');
    
    svgPaths.forEach(element => {
        const dept = element.getAttribute('data-department') || element.getAttribute('id');
        if (!dept) return;
        
        // Hover
        element.addEventListener('mouseenter', function() {
            showDepartmentInfo(dept);
            highlightDepartment(dept);
        });
        
        // Click - Redirection directe
        element.addEventListener('click', function(e) {
            e.preventDefault();
            handleDepartmentClick(dept);
        });
        
        // Style pour départements avec villes
        if (departmentToCity[dept]) {
            element.classList.add('has-city');
        }
    });
}

// Afficher les infos du département
function showDepartmentInfo(dept) {
    const city = departmentToCity[dept];
    const deptName = departmentNames[dept];
    const infoPanel = document.getElementById('selected-department');
    
    if (!infoPanel) return;
    
    if (city) {
        infoPanel.innerHTML = `
            <div class="department-name">${deptName} (${dept})</div>
            <p class="info-text">Déménageur disponible à ${city.name}</p>
            <div class="department-cities">
                <a href="demenageur-${city.slug}.html" class="city-link">
                    Déménageur ${city.name}
                </a>
            </div>
        `;
    } else {
        infoPanel.innerHTML = `
            <div class="department-name">${deptName} (${dept})</div>
            <p class="info-text">Aucune page spécifique pour ce département</p>
            <p class="info-text">Contactez-nous pour un devis personnalisé</p>
            <div class="department-cities">
                <a href="index.html#devis" class="city-link">
                    Demander un devis
                </a>
            </div>
        `;
    }
}

// Mettre en surbrillance un département
function highlightDepartment(dept) {
    document.querySelectorAll('.dept-path, .department-map-item').forEach(item => {
        const itemDept = item.getAttribute('data-department') || item.getAttribute('id');
        item.classList.remove('selected');
        if (itemDept === dept) {
            item.classList.add('selected');
        }
    });
}

// Gérer le clic sur un département - Redirection directe
function handleDepartmentClick(dept) {
    const city = departmentToCity[dept];
    
    if (city) {
        // Redirection directe vers la page déménageur
        window.location.href = `demenageur-${city.slug}.html`;
    } else {
        // Si pas de ville, afficher les infos
        showDepartmentInfo(dept);
        highlightDepartment(dept);
    }
}

// Créer la grille de recherche rapide
function createDepartmentsGrid() {
    const grid = document.getElementById('departments-grid');
    if (!grid) return;
    
    // Trier les départements
    const sortedDepts = Object.keys(departmentNames).sort((a, b) => {
        const numA = parseInt(a);
        const numB = parseInt(b);
        return numA - numB;
    });
    
    grid.innerHTML = sortedDepts.map(dept => {
        const deptName = departmentNames[dept];
        const city = departmentToCity[dept];
        return `
            <div class="department-card ${city ? 'has-city' : ''}" 
                 data-department="${dept}"
                 data-name="${deptName}">
                <div class="department-number">${dept}</div>
                <div class="department-name-card">${deptName}</div>
                ${city ? `<span class="department-badge">Disponible</span>` : ''}
            </div>
        `;
    }).join('');
    
    // Ajouter les event listeners
    grid.querySelectorAll('.department-card').forEach(card => {
        card.addEventListener('click', function() {
            const dept = this.dataset.department;
            handleDepartmentClick(dept);
        });
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    createFranceMapSVG();
    createDepartmentsGrid();
});
