// ============================================
// CARTE DE FRANCE INTERACTIVE AVEC SVG RÉEL
// Carte géographique de la France métropolitaine
// ============================================

// Mapping des départements (SANS CORSE)
const departmentToCity = {
    '75': { name: 'Paris', slug: 'paris' },
    '77': { name: 'Melun', slug: 'melun' },
    '78': { name: 'Versailles', slug: 'versailles' },
    '91': { name: 'Évry', slug: 'evry' },
    '92': { name: 'Nanterre', slug: 'nanterre' },
    '93': { name: 'Bobigny', slug: 'bobigny' },
    '94': { name: 'Créteil', slug: 'creteil' },
    '95': { name: 'Cergy', slug: 'cergy' },
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
    '21': { name: 'Dijon', slug: 'dijon' },
    '25': { name: 'Besançon', slug: 'besancon' },
    '39': { name: 'Lons-le-Saunier', slug: 'lons-le-saunier' },
    '58': { name: 'Nevers', slug: 'nevers' },
    '70': { name: 'Vesoul', slug: 'vesoul' },
    '71': { name: 'Mâcon', slug: 'macon' },
    '89': { name: 'Auxerre', slug: 'auxerre' },
    '90': { name: 'Belfort', slug: 'belfort' },
    '22': { name: 'Saint-Brieuc', slug: 'saint-brieuc' },
    '35': { name: 'Rennes', slug: 'rennes' },
    '56': { name: 'Vannes', slug: 'vannes' },
    '18': { name: 'Bourges', slug: 'bourges' },
    '28': { name: 'Chartres', slug: 'chartres' },
    '36': { name: 'Châteauroux', slug: 'chateauroux' },
    '37': { name: 'Tours', slug: 'tours' },
    '41': { name: 'Blois', slug: 'blois' },
    '45': { name: 'Orléans', slug: 'orleans' },
    '08': { name: 'Charleville-Mézières', slug: 'charleville-mezieres' },
    '10': { name: 'Troyes', slug: 'troyes' },
    '52': { name: 'Chaumont', slug: 'chaumont' },
    '54': { name: 'Nancy', slug: 'nancy' },
    '55': { name: 'Bar-le-Duc', slug: 'bar-le-duc' },
    '57': { name: 'Metz', slug: 'metz' },
    '67': { name: 'Strasbourg', slug: 'strasbourg' },
    '88': { name: 'Épinal', slug: 'epinal' },
    '02': { name: 'Laon', slug: 'laon' },
    '59': { name: 'Lille', slug: 'lille' },
    '60': { name: 'Beauvais', slug: 'beauvais' },
    '62': { name: 'Arras', slug: 'arras' },
    '80': { name: 'Amiens', slug: 'amiens' },
    '14': { name: 'Caen', slug: 'caen' },
    '27': { name: 'Évreux', slug: 'evreux' },
    '50': { name: 'Saint-Lô', slug: 'saint-lo' },
    '61': { name: 'Alençon', slug: 'alencon' },
    '76': { name: 'Rouen', slug: 'rouen' },
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
    '44': { name: 'Nantes', slug: 'nantes' },
    '49': { name: 'Angers', slug: 'angers' },
    '53': { name: 'Laval', slug: 'laval' },
    '72': { name: 'Le Mans', slug: 'le-mans' },
    '85': { name: 'La Roche-sur-Yon', slug: 'la-roche-sur-yon' },
    '04': { name: 'Digne-les-Bains', slug: 'digne-les-bains' },
    '05': { name: 'Gap', slug: 'gap' },
    '06': { name: 'Nice', slug: 'nice' },
    '13': { name: 'Marseille', slug: 'marseille' },
    '83': { name: 'Toulon', slug: 'toulon' },
    '84': { name: 'Avignon', slug: 'avignon' }
};

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

// Créer la carte SVG de France métropolitaine
function createFranceMapSVG() {
    const container = document.getElementById('france-map');
    if (!container) return;
    
    // Charger un SVG de France réel avec départements depuis une source
    loadFranceSVGInteractive();
}

// Charger un SVG de France interactif
async function loadFranceSVGInteractive() {
    const container = document.getElementById('france-map');
    if (!container) return;
    
    // Utiliser un SVG de France depuis Wikimedia Commons
    // Le SVG sera chargé et les départements seront rendus cliquables
    try {
        // Charger le SVG depuis une source
        const svgUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Blank_map_of_France_%28metropolitan%29.svg/1200px-Blank_map_of_France_%28metropolitan%29.svg.png';
        
        container.innerHTML = `
            <div class="france-map-real">
                <div class="map-container-real">
                    <div class="france-map-svg-container">
                        <img src="${svgUrl}" 
                             alt="Carte de France Métropolitaine" 
                             class="france-map-bg"
                             id="france-map-img"
                             crossorigin="anonymous">
                        <div id="svg-interactive-wrapper" class="svg-interactive-wrapper"></div>
                    </div>
                </div>
            </div>
        `;
        
        // Créer une carte avec image et départements organisés
        createMapWithDepartments();
        
    } catch (e) {
        console.error('Erreur:', e);
        createMapWithDepartments();
    }
}

// Créer une carte avec départements organisés
function createMapWithDepartments() {
    const container = document.getElementById('france-map');
    if (!container) return;
    
    const wrapper = document.getElementById('svg-interactive-wrapper');
    if (!wrapper) {
        // Si le wrapper n'existe pas, créer la structure complète
        const existingContainer = container.querySelector('.france-map-svg-container');
        if (existingContainer) {
            wrapper = document.createElement('div');
            wrapper.id = 'svg-interactive-wrapper';
            wrapper.className = 'svg-interactive-wrapper';
            existingContainer.appendChild(wrapper);
        } else {
            createEnhancedMapVisualization(container);
            return;
        }
    }
    
    // Créer une visualisation avec l'image de carte en fond
    // et les départements organisés par régions par-dessus
    const regions = {
        'Île-de-France': ['75', '77', '78', '91', '92', '93', '94', '95'],
        'Auvergne-Rhône-Alpes': ['01', '03', '07', '15', '26', '38', '42', '43', '63', '69', '73', '74'],
        'Bourgogne-Franche-Comté': ['21', '25', '39', '58', '70', '71', '89', '90'],
        'Bretagne': ['22', '29', '35', '56'],
        'Centre-Val de Loire': ['18', '28', '36', '37', '41', '45'],
        'Grand Est': ['08', '10', '51', '52', '54', '55', '57', '67', '68', '88'],
        'Hauts-de-France': ['02', '59', '60', '62', '80'],
        'Normandie': ['14', '27', '50', '61', '76'],
        'Nouvelle-Aquitaine': ['16', '17', '19', '23', '24', '33', '40', '47', '64', '79', '86', '87'],
        'Occitanie': ['09', '11', '12', '30', '31', '32', '34', '46', '48', '65', '66', '81', '82'],
        'Pays de la Loire': ['44', '49', '53', '72', '85'],
        'Provence-Alpes-Côte d\'Azur': ['04', '05', '06', '13', '83', '84']
    };
    
    wrapper.innerHTML = `
        <div class="departments-overlay-map">
            <div class="map-regions-overlay">
                ${Object.entries(regions).map(([regionName, depts]) => `
                    <div class="region-group-map">
                        <h3 class="region-title-map">${regionName}</h3>
                        <div class="region-departments-map">
                            ${depts.map(dept => {
                                const hasCity = departmentToCity[dept];
                                const deptName = departmentNames[dept];
                                return `
                                    <div class="dept-zone-map ${hasCity ? 'has-city' : ''}" 
                                         data-department="${dept}"
                                         data-name="${deptName}"
                                         title="${deptName}${hasCity ? ' - ' + departmentToCity[dept].name : ''}">
                                        <span class="dept-num-map">${dept}</span>
                                        <span class="dept-label-map">${deptName}</span>
                                        ${hasCity ? '<span class="dept-check-map">✓</span>' : ''}
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    initMapInteractions();
}

// Créer une visualisation améliorée (fallback)
function createEnhancedMapVisualization(container) {
    if (!container) return;
    
    const regions = {
        'Île-de-France': ['75', '77', '78', '91', '92', '93', '94', '95'],
        'Auvergne-Rhône-Alpes': ['01', '03', '07', '15', '26', '38', '42', '43', '63', '69', '73', '74'],
        'Bourgogne-Franche-Comté': ['21', '25', '39', '58', '70', '71', '89', '90'],
        'Bretagne': ['22', '29', '35', '56'],
        'Centre-Val de Loire': ['18', '28', '36', '37', '41', '45'],
        'Grand Est': ['08', '10', '51', '52', '54', '55', '57', '67', '68', '88'],
        'Hauts-de-France': ['02', '59', '60', '62', '80'],
        'Normandie': ['14', '27', '50', '61', '76'],
        'Nouvelle-Aquitaine': ['16', '17', '19', '23', '24', '33', '40', '47', '64', '79', '86', '87'],
        'Occitanie': ['09', '11', '12', '30', '31', '32', '34', '46', '48', '65', '66', '81', '82'],
        'Pays de la Loire': ['44', '49', '53', '72', '85'],
        'Provence-Alpes-Côte d\'Azur': ['04', '05', '06', '13', '83', '84']
    };
    
    container.innerHTML = `
        <div class="france-map-real">
            <div class="map-container-real">
                <div class="france-map-svg-container" style="position: relative;">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Blank_map_of_France_%28metropolitan%29.svg/1200px-Blank_map_of_France_%28metropolitan%29.svg.png" 
                         alt="Carte de France Métropolitaine" 
                         class="france-map-bg"
                         id="france-map-img">
                    <div class="france-map-visual" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(255,255,255,0.95); padding: 2rem; overflow-y: auto;">
                        <div class="map-regions">
                            ${Object.entries(regions).map(([regionName, depts]) => `
                                <div class="region-group">
                                    <h3 class="region-title">${regionName}</h3>
                                    <div class="region-departments">
                                        ${depts.map(dept => {
                                            const hasCity = departmentToCity[dept];
                                            const deptName = departmentNames[dept];
                                            return `
                                                <div class="dept-zone ${hasCity ? 'has-city' : ''}" 
                                                     data-department="${dept}"
                                                     data-name="${deptName}"
                                                     title="${deptName}${hasCity ? ' - ' + departmentToCity[dept].name : ''}">
                                                    <span class="dept-num">${dept}</span>
                                                    <span class="dept-label">${deptName}</span>
                                                    ${hasCity ? '<span class="dept-check">✓</span>' : ''}
                                                </div>
                                            `;
                                        }).join('')}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    initMapInteractions();
}

// Initialiser les interactions
function initMapInteractions() {
    const deptZones = document.querySelectorAll('.dept-zone, .dept-zone-map, .dept-path, [data-department]');
    
    deptZones.forEach(zone => {
        const dept = zone.getAttribute('data-department') || zone.getAttribute('id');
        if (!dept) return;
        
        // Hover
        zone.addEventListener('mouseenter', function() {
            showDepartmentInfo(dept);
            highlightDepartment(dept);
        });
        
        // Click - Redirection directe
        zone.addEventListener('click', function(e) {
            e.preventDefault();
            handleDepartmentClick(dept);
        });
        
        // Style cursor
        if (departmentToCity[dept]) {
            zone.style.cursor = 'pointer';
            if (zone.classList) {
                zone.classList.add('has-city');
            }
        }
    });
}

// Afficher les infos
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
                    Voir la page ${city.name}
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

// Mettre en surbrillance
function highlightDepartment(dept) {
    document.querySelectorAll('.dept-zone, .dept-zone-map, .dept-path, .department-map-item').forEach(item => {
        const itemDept = item.getAttribute('data-department') || item.getAttribute('id');
        if (item.classList) {
            item.classList.remove('selected');
            if (itemDept === dept) {
                item.classList.add('selected');
            }
        }
    });
}

// Gérer le clic - Redirection directe
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

// Créer la grille de recherche
function createDepartmentsGrid() {
    const grid = document.getElementById('departments-grid');
    if (!grid) return;
    
    const sortedDepts = Object.keys(departmentNames).sort((a, b) => parseInt(a) - parseInt(b));
    
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
    
    grid.querySelectorAll('.department-card').forEach(card => {
        card.addEventListener('click', function() {
            const dept = this.dataset.department;
            handleDepartmentClick(dept);
        });
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('france-map');
    if (container) {
        // Créer la carte SVG
        createFranceMapSVG();
    }
    createDepartmentsGrid();
});
