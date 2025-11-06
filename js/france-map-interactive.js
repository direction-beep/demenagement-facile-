// ============================================
// CARTE DE FRANCE INTERACTIVE AVEC D3.JS
// Solution fiable avec TopoJSON
// ============================================

// Mapping des départements (SANS CORSE 2A et 2B)
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
    '29': { name: 'Brest', slug: 'brest' },
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

// Charger la carte de France avec D3.js et TopoJSON
async function loadFranceMapSVG() {
    const container = document.getElementById('france-map');
    if (!container) {
        console.error('Container #france-map non trouvé');
        return;
    }
    
    container.innerHTML = '<div class="map-loading">Chargement de la carte...</div>';
    
    try {
        // Utiliser les données GeoJSON locales (essayer plusieurs chemins possibles)
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
                    console.log('GeoJSON chargé avec succès depuis:', geojsonUrl);
                    break;
                } else {
                    lastError = new Error(`Erreur HTTP ${response.status} pour ${geojsonUrl}`);
                }
            } catch (err) {
                lastError = err;
                console.warn('Échec du chargement depuis', geojsonUrl, err);
            }
        }
        
        if (!geojson) {
            throw lastError || new Error('Impossible de charger le GeoJSON depuis aucun des chemins testés');
        }
        
        // Valider la structure du GeoJSON
        if (!geojson || typeof geojson !== 'object') {
            throw new Error('Le GeoJSON n\'est pas un objet valide');
        }
        
        if (!geojson.features || !Array.isArray(geojson.features)) {
            throw new Error('Le GeoJSON n\'a pas de propriété "features" ou ce n\'est pas un tableau');
        }
        
        console.log('GeoJSON chargé avec succès:', geojson.features.length, 'départements');
        
        // Vérifier que D3.js est disponible
        if (typeof d3 === 'undefined') {
            throw new Error('D3.js n\'est pas disponible');
        }
        
        // Créer le SVG avec D3.js
        createMapWithD3(container, geojson);
        
    } catch (error) {
        console.error('Erreur lors du chargement de la carte:', error);
        // Afficher un message d'erreur plus informatif
        container.innerHTML = `
            <div class="map-error" style="text-align: center; padding: 2rem; color: #dc2626;">
                <p style="font-size: 1.1rem; margin-bottom: 1rem;">Erreur lors du chargement de la carte</p>
                <p style="color: #6b7280; margin-bottom: 1.5rem;">${error.message}</p>
                <p style="color: #6b7280;">Utilisez la recherche ci-dessous pour trouver votre département</p>
            </div>
        `;
        // Fallback : utiliser une image avec zones cliquables
        setTimeout(() => {
            createFallbackMapWithImage(container);
        }, 2000);
    }
}

// Créer la carte avec D3.js
function createMapWithD3(container, geojson) {
    // Dimensions
    const width = Math.min(1200, window.innerWidth - 40);
    const height = Math.min(800, width * 0.8);
    
    // Créer le SVG
    const svg = d3.select(container)
        .html('')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', '0 0 ' + width + ' ' + height)
        .attr('preserveAspectRatio', 'xMidYMid meet')
        .attr('class', 'france-svg-map');
    
    // Projection
    const projection = d3.geoMercator()
        .fitSize([width, height], geojson);
    
    const path = d3.geoPath().projection(projection);
    
    // Filtrer pour exclure la Corse (2A et 2B)
    const features = geojson.features.filter(f => {
        const code = f.properties.code;
        return code !== '2A' && code !== '2B';
    });
    
    // Dessiner les départements
    const paths = svg.selectAll('path.department-path')
        .data(features)
        .enter()
        .append('path')
        .attr('class', d => {
            const code = d.properties.code;
            const hasCity = departmentToCity[code];
            return `department-path ${hasCity ? 'has-city' : ''}`;
        })
        .attr('data-department', d => d.properties.code)
        .attr('d', path)
        .attr('fill', d => {
            const code = d.properties.code;
            return departmentToCity[code] ? '#e3f2fd' : '#f5f5f5';
        })
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 1.5)
        .style('cursor', 'pointer')
        .style('pointer-events', 'all')
        .on('mouseenter', function(event, d) {
            event.stopPropagation();
            const code = d.properties.code;
            d3.select(this)
                .attr('fill', departmentToCity[code] ? '#2196f3' : '#90caf9')
                .attr('stroke', '#1976d2')
                .attr('stroke-width', 2.5);
            showDepartmentInfo(code);
        })
        .on('mouseleave', function(event, d) {
            event.stopPropagation();
            const code = d.properties.code;
            d3.select(this)
                .attr('fill', departmentToCity[code] ? '#e3f2fd' : '#f5f5f5')
                .attr('stroke', '#ffffff')
                .attr('stroke-width', 1.5);
        })
        .on('click', function(event, d) {
            event.stopPropagation();
            event.preventDefault();
            const code = d.properties.code;
            console.log('Clic sur département:', code, d.properties.nom);
            handleDepartmentClick(code);
        });
    
    // Debug: vérifier que tous les départements sont bien créés
    console.log('Départements créés:', features.length);
    console.log('Départements avec ville:', features.filter(f => departmentToCity[f.properties.code]).length);
    
    // Ajouter les numéros de départements (après les paths pour qu'ils soient au-dessus)
    // Mais avec pointer-events: none pour ne pas bloquer les clics
    svg.selectAll('text.dept-label')
        .data(features)
        .enter()
        .append('text')
        .attr('class', 'dept-label')
        .attr('x', d => path.centroid(d)[0])
        .attr('y', d => path.centroid(d)[1])
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em')
        .attr('font-family', 'Inter, sans-serif')
        .attr('font-size', '11px')
        .attr('font-weight', '600')
        .attr('fill', d => departmentToCity[d.properties.code] ? '#1976d2' : '#666')
        .style('pointer-events', 'none')
        .style('user-select', 'none')
        .text(d => d.properties.code);
    
    // S'assurer que les paths sont bien cliquables
    svg.selectAll('path.department-path')
        .style('pointer-events', 'all')
        .style('cursor', 'pointer');
}

// Fallback avec image et zones cliquables
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
                Utilisez la recherche ci-dessous pour trouver votre département
            </p>
        </div>
    `;
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

// Gérer le clic sur un département
function handleDepartmentClick(dept) {
    const city = departmentToCity[dept];
    
    if (city) {
        // Redirection directe vers la page déménageur
        window.location.href = `demenageur-${city.slug}.html`;
    } else {
        // Si pas de ville, afficher les infos
        showDepartmentInfo(dept);
    }
}

// Créer la grille de recherche rapide
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
        
        card.addEventListener('mouseenter', function() {
            const dept = this.dataset.department;
            showDepartmentInfo(dept);
        });
    });
}

// Initialisation (éviter la double exécution)
let mapInitialized = false;

function waitForD3(maxAttempts = 50, attempt = 0) {
    if (typeof d3 !== 'undefined') {
        console.log('D3.js détecté, initialisation de la carte...');
        initializeMap();
        return;
    }
    
    if (attempt >= maxAttempts) {
        console.error('D3.js n\'a pas pu être chargé après', maxAttempts, 'tentatives - utilisation du fallback');
        const container = document.getElementById('france-map');
        if (container) {
            createFallbackMapWithImage(container);
        }
        createDepartmentsGrid();
        return;
    }
    
    // Réessayer après 100ms
    setTimeout(() => waitForD3(maxAttempts, attempt + 1), 100);
}

function initializeMap() {
    if (mapInitialized) {
        console.log('Carte déjà initialisée, arrêt');
        return;
    }
    mapInitialized = true;
    
    console.log('Initialisation de la carte de France...');
    
    // Vérifier que D3.js est chargé
    if (typeof d3 === 'undefined') {
        console.error('D3.js n\'est pas chargé - utilisation du fallback');
        const container = document.getElementById('france-map');
        if (container) {
            createFallbackMapWithImage(container);
        }
        createDepartmentsGrid();
        return;
    }
    
    console.log('D3.js chargé, chargement de la carte...');
    loadFranceMapSVG();
    createDepartmentsGrid();
}

// Initialisation - attendre que le DOM et D3.js soient prêts
function startInitialization() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => waitForD3());
    } else {
        // Le DOM est déjà chargé
        waitForD3();
    }
}

// Démarrer l'initialisation
startInitialization();
