/**
 * ============================================
 * CARTE DE FRANCE INTERACTIVE AVEC D3.JS (REFACTORISÃ‰)
 * ============================================
 * 
 * Affiche une carte interactive de la France mÃ©tropolitaine
 * avec les dÃ©partements cliquables (sans Corse 2A et 2B)
 * 
 * @version 2.0.0
 * @author DÃ©mÃ©nagement Zen
 * @requires D3.js v7
 * @requires TopoJSON
 * 
 * NOTE: Ce fichier n'utilise PAS d'imports ES6 pour rester compatible
 * avec le chargement direct dans les pages HTML
 */

// Mapping des dÃ©partements (SANS CORSE 2A et 2B)
const departmentToCity = {
    '75': { name: 'Paris', slug: 'paris' },
    '77': { name: 'Melun', slug: 'melun' },
    '78': { name: 'Versailles', slug: 'versailles' },
    '91': { name: 'Ã‰vry', slug: 'evry' },
    '92': { name: 'Nanterre', slug: 'nanterre' },
    '93': { name: 'Bobigny', slug: 'bobigny' },
    '94': { name: 'CrÃ©teil', slug: 'creteil' },
    '95': { name: 'Cergy', slug: 'cergy' },
    '01': { name: 'Bourg-en-Bresse', slug: 'bourg-en-bresse' },
    '03': { name: 'Moulins', slug: 'moulins' },
    '07': { name: 'Privas', slug: 'privas' },
    '15': { name: 'Aurillac', slug: 'aurillac' },
    '26': { name: 'Valence', slug: 'valence' },
    '38': { name: 'Grenoble', slug: 'grenoble' },
    '42': { name: 'Saint-Ã‰tienne', slug: 'saint-etienne' },
    '43': { name: 'Le Puy-en-Velay', slug: 'le-puy-en-velay' },
    '63': { name: 'Clermont-Ferrand', slug: 'clermont-ferrand' },
    '69': { name: 'Lyon', slug: 'lyon' },
    '73': { name: 'ChambÃ©ry', slug: 'chambery' },
    '74': { name: 'Annecy', slug: 'annecy' },
    '21': { name: 'Dijon', slug: 'dijon' },
    '25': { name: 'BesanÃ§on', slug: 'besancon' },
    '39': { name: 'Lons-le-Saunier', slug: 'lons-le-saunier' },
    '58': { name: 'Nevers', slug: 'nevers' },
    '70': { name: 'Vesoul', slug: 'vesoul' },
    '71': { name: 'MÃ¢con', slug: 'macon' },
    '89': { name: 'Auxerre', slug: 'auxerre' },
    '90': { name: 'Belfort', slug: 'belfort' },
    '22': { name: 'Saint-Brieuc', slug: 'saint-brieuc' },
    '29': { name: 'Brest', slug: 'brest' },
    '35': { name: 'Rennes', slug: 'rennes' },
    '56': { name: 'Vannes', slug: 'vannes' },
    '18': { name: 'Bourges', slug: 'bourges' },
    '28': { name: 'Chartres', slug: 'chartres' },
    '36': { name: 'ChÃ¢teauroux', slug: 'chateauroux' },
    '37': { name: 'Tours', slug: 'tours' },
    '41': { name: 'Blois', slug: 'blois' },
    '45': { name: 'OrlÃ©ans', slug: 'orleans' },
    '08': { name: 'Charleville-MÃ©ziÃ¨res', slug: 'charleville-mezieres' },
    '10': { name: 'Troyes', slug: 'troyes' },
    '52': { name: 'Chaumont', slug: 'chaumont' },
    '54': { name: 'Nancy', slug: 'nancy' },
    '55': { name: 'Bar-le-Duc', slug: 'bar-le-duc' },
    '57': { name: 'Metz', slug: 'metz' },
    '67': { name: 'Strasbourg', slug: 'strasbourg' },
    '88': { name: 'Ã‰pinal', slug: 'epinal' },
    '02': { name: 'Laon', slug: 'laon' },
    '59': { name: 'Lille', slug: 'lille' },
    '60': { name: 'Beauvais', slug: 'beauvais' },
    '62': { name: 'Arras', slug: 'arras' },
    '80': { name: 'Amiens', slug: 'amiens' },
    '14': { name: 'Caen', slug: 'caen' },
    '27': { name: 'Ã‰vreux', slug: 'evreux' },
    '50': { name: 'Saint-LÃ´', slug: 'saint-lo' },
    '61': { name: 'AlenÃ§on', slug: 'alencon' },
    '76': { name: 'Rouen', slug: 'rouen' },
    '16': { name: 'AngoulÃªme', slug: 'angouleme' },
    '17': { name: 'La Rochelle', slug: 'la-rochelle' },
    '19': { name: 'Tulle', slug: 'tulle' },
    '23': { name: 'GuÃ©ret', slug: 'gueret' },
    '24': { name: 'PÃ©rigueux', slug: 'perigueux' },
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
    '30': { name: 'NÃ®mes', slug: 'nimes' },
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
    '05': 'Hautes-Alpes', '06': 'Alpes-Maritimes', '07': 'ArdÃ¨che', '08': 'Ardennes',
    '09': 'AriÃ¨ge', '10': 'Aube', '11': 'Aude', '12': 'Aveyron',
    '13': 'Bouches-du-RhÃ´ne', '14': 'Calvados', '15': 'Cantal', '16': 'Charente',
    '17': 'Charente-Maritime', '18': 'Cher', '19': 'CorrÃ¨ze',
    '21': 'CÃ´te-d\'Or', '22': 'CÃ´tes-d\'Armor', '23': 'Creuse',
    '24': 'Dordogne', '25': 'Doubs', '26': 'DrÃ´me', '27': 'Eure',
    '28': 'Eure-et-Loir', '29': 'FinistÃ¨re', '30': 'Gard', '31': 'Haute-Garonne',
    '32': 'Gers', '33': 'Gironde', '34': 'HÃ©rault', '35': 'Ille-et-Vilaine',
    '36': 'Indre', '37': 'Indre-et-Loire', '38': 'IsÃ¨re', '39': 'Jura',
    '40': 'Landes', '41': 'Loir-et-Cher', '42': 'Loire', '43': 'Haute-Loire',
    '44': 'Loire-Atlantique', '45': 'Loiret', '46': 'Lot', '47': 'Lot-et-Garonne',
    '48': 'LozÃ¨re', '49': 'Maine-et-Loire', '50': 'Manche', '51': 'Marne',
    '52': 'Haute-Marne', '53': 'Mayenne', '54': 'Meurthe-et-Moselle', '55': 'Meuse',
    '56': 'Morbihan', '57': 'Moselle', '58': 'NiÃ¨vre', '59': 'Nord',
    '60': 'Oise', '61': 'Orne', '62': 'Pas-de-Calais', '63': 'Puy-de-DÃ´me',
    '64': 'PyrÃ©nÃ©es-Atlantiques', '65': 'Hautes-PyrÃ©nÃ©es', '66': 'PyrÃ©nÃ©es-Orientales',
    '67': 'Bas-Rhin', '68': 'Haut-Rhin', '69': 'RhÃ´ne', '70': 'Haute-SaÃ´ne',
    '71': 'SaÃ´ne-et-Loire', '72': 'Sarthe', '73': 'Savoie', '74': 'Haute-Savoie',
    '75': 'Paris', '76': 'Seine-Maritime', '77': 'Seine-et-Marne', '78': 'Yvelines',
    '79': 'Deux-SÃ¨vres', '80': 'Somme', '81': 'Tarn', '82': 'Tarn-et-Garonne',
    '83': 'Var', '84': 'Vaucluse', '85': 'VendÃ©e', '86': 'Vienne',
    '87': 'Haute-Vienne', '88': 'Vosges', '89': 'Yonne', '90': 'Territoire de Belfort',
    '91': 'Essonne', '92': 'Hauts-de-Seine', '93': 'Seine-Saint-Denis', '94': 'Val-de-Marne',
    '95': 'Val-d\'Oise'
};

// Charger la carte de France avec D3.js et TopoJSON
async function loadFranceMapSVG() {
    const container = document.getElementById('france-map');
    if (!container) {
        console.error('Container #france-map non trouvÃ©');
        return;
    }
    
    container.innerHTML = '<div class="map-loading">Chargement de la carte...</div>';
    
    try {
        // Utiliser les donnÃ©es GeoJSON locales (essayer plusieurs chemins possibles)
        const possiblePaths = [
            'js/france-geojson.json',
            '/js/france-geojson.json',
            './js/france-geojson.json'
        ];
        
        let geojson = null;
        let lastError = null;
        
        for (const geojsonUrl of possiblePaths) {
            try {
                console.log('Tentative de chargement du GeoJSON depuis:', geojsonUrl);
                const response = await fetch(geojsonUrl);
                if (response.ok) {
                    geojson = await response.json();
                    console.log('GeoJSON chargÃ© avec succÃ¨s depuis:', geojsonUrl);
                    break;
                } else {
                    lastError = new Error(`Erreur HTTP ${response.status} pour ${geojsonUrl}`);
                }
            } catch (err) {
                lastError = err;
                console.warn('Ã‰chec du chargement depuis', geojsonUrl, err);
            }
        }
        
        if (!geojson) {
            throw lastError || new Error('Impossible de charger le GeoJSON depuis aucun des chemins testÃ©s');
        }
        
        // Valider la structure du GeoJSON
        if (!geojson || typeof geojson !== 'object') {
            throw new Error('Le GeoJSON n\'est pas un objet valide');
        }
        
        if (!geojson.features || !Array.isArray(geojson.features)) {
            throw new Error('Le GeoJSON n\'a pas de propriÃ©tÃ© "features" ou ce n\'est pas un tableau');
        }
        
        console.log(`GeoJSON valide avec ${geojson.features.length} dÃ©partements`);
        
        // VÃ©rifier que D3.js est disponible
        if (typeof d3 === 'undefined') {
            throw new Error('D3.js n\'est pas chargÃ©');
        }
        
        // CrÃ©er le SVG
        const width = 1200;
        const height = 1000;
        const svg = d3.select(container)
            .html('') // Nettoyer le contenu
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('viewBox', `0 0 ${width} ${height}`)
            .attr('class', 'france-map-svg');
        
        // Configuration de la projection
        const projection = d3.geoMercator()
            .scale(2800)
            .center([2.5, 47])
            .translate([width / 2, height / 2]);
        
        const path = d3.geoPath().projection(projection);
        
        // Dessiner les dÃ©partements
        svg.selectAll('path')
            .data(geojson.features)
            .enter()
            .append('path')
            .attr('d', path)
            .attr('class', 'department')
            .attr('data-code', d => d.properties.code)
            .style('fill', d => {
                const code = d.properties.code;
                // Exclure la Corse (2A et 2B)
                if (code === '2A' || code === '2B') {
                    return '#e5e7eb'; // Gris clair
                }
                // VÃ©rifier si le dÃ©partement a une page
                if (departmentToCity[code]) {
                    return '#dbeafe'; // Bleu clair
                }
                return '#f3f4f6'; // Gris par dÃ©faut
            })
            .style('stroke', '#fff')
            .style('stroke-width', '0.5')
            .style('cursor', d => {
                const code = d.properties.code;
                if (code === '2A' || code === '2B') {
                    return 'default';
                }
                return departmentToCity[code] ? 'pointer' : 'default';
            })
            .on('mouseenter', function(event, d) {
                const code = d.properties.code;
                if (code === '2A' || code === '2B') {
                    return;
                }
                d3.select(this)
                    .style('fill', '#93c5fd')
                    .style('stroke-width', '2');
                
                // Afficher l'info du dÃ©partement
                const infoDiv = document.getElementById('selected-department');
                if (infoDiv) {
                    const deptName = departmentNames[code] || code;
                    const city = departmentToCity[code];
                    if (city) {
                        infoDiv.innerHTML = `
                            <h3>${deptName} (${code})</h3>
                            <p>DÃ©mÃ©nageur Ã  ${city.name}</p>
                            <a href="/demenageur-${city.slug}.html" class="btn btn-primary">Voir la page</a>
                        `;
                    } else {
                        infoDiv.innerHTML = `
                            <p class="info-text">${deptName} (${code})</p>
                            <p class="info-warning">Aucune page spÃ©cifique pour ce dÃ©partement</p>
                        `;
                    }
                }
            })
            .on('mouseleave', function(event, d) {
                const code = d.properties.code;
                d3.select(this)
                    .style('fill', d => {
                        if (code === '2A' || code === '2B') {
                            return '#e5e7eb';
                        }
                        return departmentToCity[code] ? '#dbeafe' : '#f3f4f6';
                    })
                    .style('stroke-width', '0.5');
            })
            .on('click', function(event, d) {
                event.stopPropagation();
                event.preventDefault();
                
                const code = d.properties.code;
                
                // Exclure la Corse
                if (code === '2A' || code === '2B') {
                    return;
                }
                
                const city = departmentToCity[code];
                
                if (city) {
                    window.location.href = `/demenageur-${city.slug}.html`;
                } else {
                    const deptName = departmentNames[code] || code;
                    console.warn(`Aucune page spÃ©cifique pour le dÃ©partement: ${deptName} (${code})`);
                    const infoDiv = document.getElementById('selected-department');
                    if (infoDiv) {
                        infoDiv.innerHTML = `
                            <p class="info-text">${deptName} (${code})</p>
                            <p class="info-warning">Aucune page spÃ©cifique pour ce dÃ©partement</p>
                        `;
                    }
                }
            });
        
        console.log('Carte de France chargÃ©e avec succÃ¨s');
        
        // CrÃ©er la grille de dÃ©partements
        createDepartmentsGrid();
        
    } catch (error) {
        console.error('Erreur lors du chargement de la carte:', error);
        createFallbackMapWithImage(container);
        createDepartmentsGrid();
    }
}

// CrÃ©er une carte de fallback avec image
function createFallbackMapWithImage(container) {
    container.innerHTML = `
        <div class="france-map-fallback">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Blank_map_of_France_%28metropolitan%29.svg/1200px-Blank_map_of_France_%28metropolitan%29.svg.png" 
                 alt="Carte de France" 
                 class="france-map-image"
                 loading="lazy"
                 decoding="async"
                 style="width: 100%; max-width: 1200px; height: auto; display: block; margin: 0 auto;">
            <p style="text-align: center; margin-top: 1rem; color: #666;">
                Utilisez la recherche ci-dessous pour trouver votre dÃ©partement
            </p>
        </div>
    `;
}

// CrÃ©er la grille de dÃ©partements
function createDepartmentsGrid() {
    const grid = document.getElementById('departments-grid');
    if (!grid) {
        return;
    }
    
    grid.innerHTML = '';
    
    // Trier les dÃ©partements par code
    const sortedDepartments = Object.keys(departmentToCity)
        .sort((a, b) => parseInt(a) - parseInt(b))
        .map(code => ({
            code,
            name: departmentNames[code] || code,
            city: departmentToCity[code]
        }));
    
    sortedDepartments.forEach(dept => {
        const card = document.createElement('div');
        card.className = 'department-card';
        card.innerHTML = `
            <div class="department-code">${dept.code}</div>
            <div class="department-name">${dept.name}</div>
            <div class="department-city">${dept.city.name}</div>
            <a href="/demenageur-${dept.city.slug}.html" class="department-link">Voir la page</a>
        `;
        grid.appendChild(card);
    });
}

// Initialisation (Ã©viter la double exÃ©cution)
let mapInitialized = false;

function waitForD3(maxAttempts = 50, attempt = 0) {
    if (typeof d3 !== 'undefined') {
        console.log('D3.js dÃ©tectÃ©, initialisation de la carte...');
        if (!mapInitialized) {
            mapInitialized = true;
            loadFranceMapSVG();
        }
        return;
    }
    
    if (attempt >= maxAttempts) {
        console.error('D3.js n\'a pas pu Ãªtre chargÃ© aprÃ¨s', maxAttempts, 'tentatives - utilisation du fallback');
        const container = document.getElementById('france-map');
        if (container) {
            createFallbackMapWithImage(container);
        }
        createDepartmentsGrid();
        return;
    }
    
    // RÃ©essayer aprÃ¨s 100ms
    setTimeout(() => waitForD3(maxAttempts, attempt + 1), 100);
}

// Initialisation au chargement de la page
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        const container = document.getElementById('france-map');
        if (container) {
            waitForD3();
        }
    });
} else {
    const container = document.getElementById('france-map');
    if (container) {
        waitForD3();
    }
}

