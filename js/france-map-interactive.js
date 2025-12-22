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
    '51': { name: 'Reims', slug: 'reims' },
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
    '68': { name: 'Mulhouse', slug: 'mulhouse' },
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

const GEOJSON_PATHS = [
    'js/france-geojson.json',
    '/js/france-geojson.json',
    './js/france-geojson.json'
];

const D3_FALLBACK_SOURCES = [
    'https://cdnjs.cloudflare.com/ajax/libs/d3/7.9.0/d3.min.js',
    'https://cdn.jsdelivr.net/npm/d3@7.9.0/dist/d3.min.js'
];

const MAP_FALLBACK_DELAY = 1500;
const MAP_IDLE_INIT_DELAY = 2000;
const MAP_FALLBACK_INIT_DELAY = 4000;
const MAP_OBSERVER_ROOT_MARGIN = '200px';
const D3_MAX_ATTEMPTS = 60;
const MAP_TOOLTIP_OFFSET = 18;
const MAP_TOOLTIP_MARGIN = 12;

let d3FallbackIndex = 0;
let d3FallbackLoading = false;
let d3FallbackLoaded = false;
let scriptErrorHandlerRegistered = false;
let mapTooltipElement = null;
let mapTooltipVisible = false;

function isOffline() {
    return typeof navigator !== 'undefined' && navigator && navigator.onLine === false;
}

function escapeHTML(text) {
    if (typeof text !== 'string') {
        return '';
    }
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function formatMapErrorMessage(error) {
    if (isOffline()) {
        return 'Impossible de charger la carte : votre connexion internet semble interrompue.';
    }

    if (!error || !error.message) {
        return 'La carte interactive est temporairement indisponible. Vous pouvez utiliser la liste ci-dessous pour trouver votre département.';
    }

    if (/D3\.js/i.test(error.message)) {
        return 'La bibliothèque d\'affichage de la carte (D3.js) n\'a pas pu être chargée.';
    }

    if (/GeoJSON/i.test(error.message)) {
        return 'Les données géographiques n\'ont pas pu être chargées correctement.';
    }

    if (/HTTP error/i.test(error.message) || /Erreur HTTP/i.test(error.message)) {
        return 'Le serveur n\'a pas renvoyé les données attendues pour la carte.';
    }

    return 'La carte interactive n\'a pas pu être chargée. Vous pouvez utiliser la liste des départements ci-dessous.';
}

function loadScriptOnce(src) {
    if (document.querySelector(`script[data-fallback-src="${src}"]`)) {
        return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.dataset.fallbackSrc = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Échec du chargement du script: ${src}`));
        document.head.appendChild(script);
    });
}

async function tryLoadFallbackD3() {
    if (d3FallbackLoading || d3FallbackLoaded) {
        return d3FallbackLoaded;
    }

    d3FallbackLoading = true;

    while (d3FallbackIndex < D3_FALLBACK_SOURCES.length) {
        const source = D3_FALLBACK_SOURCES[d3FallbackIndex++];
        try {
            console.info('Tentative de chargement de D3.js depuis un fallback:', source);
            await loadScriptOnce(source);
            d3FallbackLoaded = true;
            d3FallbackLoading = false;
            return true;
        } catch (fallbackError) {
            console.warn('Échec du fallback D3.js depuis', source, fallbackError);
        }
    }

    d3FallbackLoading = false;
    return false;
}

// Charger la carte de France avec D3.js et TopoJSON
async function loadFranceMapSVG() {
    const container = document.getElementById('france-map');
    if (!container) {
        console.error('Container #france-map non trouvé');
        return;
    }
    
    container.innerHTML = `
        <div class="map-loading" role="status" aria-live="polite">
            <span class="map-loading-spinner" aria-hidden="true"></span>
            <span class="map-loading-text">Chargement de la carte...</span>
        </div>
    `;
    
    try {
        // Utiliser les données GeoJSON locales (essayer plusieurs chemins possibles)
        let geojson = null;
        let lastError = null;
        
        if (isOffline()) {
            throw new Error('Connexion internet requise pour charger la carte.');
        }

        for (const geojsonUrl of GEOJSON_PATHS) {
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
        const friendlyMessage = formatMapErrorMessage(error);
        const detailMessage = error && error.message ? error.message : '';
        createFallbackMapWithImage(container, {
            reason: friendlyMessage,
            detail: detailMessage,
            showRetry: true
        });
        createDepartmentsGrid();
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
            const tooltipContent = getDepartmentTooltipContent(code);
            showMapTooltip(tooltipContent, event);
            updateMapTooltipPosition(event);
        })
        .on('mousemove', function(event) {
            updateMapTooltipPosition(event);
        })
        .on('mouseleave', function(event, d) {
            event.stopPropagation();
            const code = d.properties.code;
            d3.select(this)
                .attr('fill', departmentToCity[code] ? '#e3f2fd' : '#f5f5f5')
                .attr('stroke', '#ffffff')
                .attr('stroke-width', 1.5);
            hideMapTooltip();
        })
        .on('click', function(event, d) {
            event.stopPropagation();
            event.preventDefault();
            const code = d.properties.code;
            console.log('Clic sur département:', code, d.properties.nom);
            handleDepartmentClick(code);
            hideMapTooltip();
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

    svg.on('mouseleave', () => hideMapTooltip());
}

// Fallback avec image et zones cliquables
function createFallbackMapWithImage(container, options = {}) {
    const {
        reason = '',
        detail = '',
        showRetry = false
    } = options;

    hideMapTooltip(true);

    container.innerHTML = `
        <div class="france-map-fallback" style="text-align: center;">
            ${reason ? `<div class="fallback-message" style="margin-bottom: 1rem; color: #dc2626; font-weight: 600;">${escapeHTML(reason)}</div>` : ''}
            ${detail ? `<p style="color: #6b7280; margin-bottom: 1rem;">${escapeHTML(detail)}</p>` : ''}
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Blank_map_of_France_%28metropolitan%29.svg/1200px-Blank_map_of_France_%28metropolitan%29.svg.png" 
                 alt="Carte de France" 
                 class="france-map-image"
                 loading="lazy"
                 decoding="async"
                 style="width: 100%; max-width: 1200px; height: auto; display: block; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
            <p style="text-align: center; margin-top: 1rem; color: #666;">
                Utilisez la liste des départements ci-dessous ou cliquez sur le bouton « Réessayer » pour relancer la carte interactive.
            </p>
            ${showRetry ? '<button type="button" class="map-retry-button" style="margin-top: 0.75rem; padding: 0.6rem 1.5rem; background-color: #2563eb; color: #fff; border: none; border-radius: 999px; cursor: pointer;">Réessayer</button>' : ''}
        </div>
    `;

    const retryButton = container.querySelector('.map-retry-button');
    if (retryButton) {
        retryButton.addEventListener('click', () => {
            retryButton.disabled = true;
            retryButton.textContent = 'Nouvelle tentative...';
            container.innerHTML = '<div class="map-loading">Nouvelle tentative de chargement...</div>';
            mapInitialized = false;
            setTimeout(() => {
                waitForD3(D3_MAX_ATTEMPTS, 0, { forceRetry: true });
            }, MAP_FALLBACK_DELAY);
        });
    }
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

    animateInfoPanel(infoPanel);
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
            hideMapTooltip();
        });

        card.addEventListener('mouseenter', function(event) {
            const dept = this.dataset.department;
            showDepartmentInfo(dept);
            const tooltipContent = getDepartmentTooltipContent(dept);
            showMapTooltip(tooltipContent, event);
            updateMapTooltipPosition(event);
        });

        card.addEventListener('mousemove', function(event) {
            updateMapTooltipPosition(event);
        });

        card.addEventListener('mouseleave', function() {
            hideMapTooltip();
        });

        card.addEventListener('focus', function() {
            const dept = this.dataset.department;
            const tooltipContent = getDepartmentTooltipContent(dept);
            const rect = this.getBoundingClientRect();
            const coords = {
                x: rect.left + rect.width / 2,
                y: rect.top + 8
            };
            showMapTooltip(tooltipContent, coords, { force: true });
            showDepartmentInfo(dept);
        });

        card.addEventListener('blur', function() {
            hideMapTooltip();
        });
    });
}

// Initialisation (éviter la double exécution)
let mapInitialized = false;
let mapInitializationRequested = false;

function waitForD3(maxAttempts = D3_MAX_ATTEMPTS, attempt = 0, options = {}) {
    if (typeof d3 !== 'undefined') {
        console.log('D3.js détecté, initialisation de la carte...');
        initializeMap();
        return;
    }
    
    if (!d3FallbackLoaded && !d3FallbackLoading) {
        const fallbackTriggerAttempt = Math.floor(maxAttempts / 3);
        if (attempt === fallbackTriggerAttempt || options.forceRetry) {
            tryLoadFallbackD3();
        }
    }

    if (attempt >= maxAttempts) {
        console.error('D3.js n\'a pas pu être chargé après', maxAttempts, 'tentatives - utilisation du fallback');
        const container = document.getElementById('france-map');
        if (container) {
            createFallbackMapWithImage(container, {
                reason: formatMapErrorMessage(new Error('D3.js n\'est pas disponible.')),
                detail: 'La bibliothèque nécessaire à l\'affichage de la carte n\'a pas pu être chargée automatiquement.',
                showRetry: true
            });
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
            createFallbackMapWithImage(container, {
                reason: formatMapErrorMessage(new Error('D3.js est indisponible.')),
                detail: 'Le chargement automatique de la carte n\'a pas abouti.',
                showRetry: true
            });
        }
        createDepartmentsGrid();
        return;
    }
    
    console.log('D3.js chargé, chargement de la carte...');
    loadFranceMapSVG();
    createDepartmentsGrid();
}

// Initialisation - attendre que le DOM et D3.js soient prêts
function requestMapInitialization() {
    if (mapInitializationRequested) {
        return;
    }
    mapInitializationRequested = true;
    waitForD3();
}

function startInitialization() {
    if (typeof window === 'undefined') {
        requestMapInitialization();
        return;
    }

    const onDomReady = () => {
        const container = document.getElementById('france-map');
        if (!container) {
            requestMapInitialization();
            return;
        }

        let observerConnected = false;
        let observerInstance = null;

        if ('IntersectionObserver' in window) {
            observerInstance = new IntersectionObserver((entries, obs) => {
                if (entries.some(entry => entry.isIntersecting)) {
                    obs.disconnect();
                    requestMapInitialization();
                }
            }, {
                rootMargin: MAP_OBSERVER_ROOT_MARGIN,
                threshold: 0.1
            });
            observerInstance.observe(container);
            observerConnected = true;
        }

        const idleCallback = window.requestIdleCallback || function(cb) {
            return setTimeout(cb, MAP_IDLE_INIT_DELAY);
        };

        idleCallback(() => {
            requestMapInitialization();
        });

        setTimeout(() => {
            if (!mapInitializationRequested) {
                if (observerConnected && observerInstance) {
                    observerInstance.disconnect();
                }
                requestMapInitialization();
            }
        }, MAP_FALLBACK_INIT_DELAY);
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', onDomReady, { once: true });
    } else {
        onDomReady();
    }
}

function registerScriptErrorHandlers() {
    if (scriptErrorHandlerRegistered || typeof window === 'undefined') {
        return;
    }

    scriptErrorHandlerRegistered = true;

    window.addEventListener('error', (event) => {
        const target = event?.target;
        if (!target || target.tagName !== 'SCRIPT') {
            return;
        }

        const scriptSrc = target.src || '';
        if (!scriptSrc.includes('d3')) {
            return;
        }

        console.error('Erreur de chargement détectée pour D3.js:', scriptSrc);
        tryLoadFallbackD3().then((success) => {
            if (!success) {
                const container = document.getElementById('france-map');
                if (container) {
                    createFallbackMapWithImage(container, {
                        reason: formatMapErrorMessage(new Error('La carte interactive est indisponible.')),
                        detail: 'Impossible de charger la bibliothèque D3.js à partir des CDN disponibles.',
                        showRetry: true
                    });
                }
                createDepartmentsGrid();
            }
        });
    }, true);
}

// Démarrer l'initialisation
registerScriptErrorHandlers();
startInitialization();

if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => hideMapTooltip(), { passive: true });
    window.addEventListener('resize', () => hideMapTooltip(true));
}

function shouldUseTooltip(options = {}) {
    if (options.force) {
        return true;
    }
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
        return false;
    }
    try {
        return window.matchMedia('(pointer: fine)').matches;
    } catch (error) {
        return false;
    }
}

function ensureMapTooltip() {
    if (mapTooltipElement || typeof document === 'undefined') {
        return;
    }
    mapTooltipElement = document.createElement('div');
    mapTooltipElement.className = 'map-tooltip';
    mapTooltipElement.setAttribute('role', 'tooltip');
    mapTooltipElement.setAttribute('aria-hidden', 'true');
    document.body.appendChild(mapTooltipElement);
}

function showMapTooltip(content, position, options = {}) {
    if (!shouldUseTooltip(options)) {
        return;
    }

    ensureMapTooltip();
    if (!mapTooltipElement) {
        return;
    }

    mapTooltipElement.innerHTML = content;
    mapTooltipElement.setAttribute('aria-hidden', 'false');
    mapTooltipElement.classList.add('is-visible');
    mapTooltipVisible = true;

    requestAnimationFrame(() => {
        positionMapTooltip(position);
    });
}

function updateMapTooltipPosition(position) {
    if (!mapTooltipVisible) {
        return;
    }
    positionMapTooltip(position);
}

function positionMapTooltip(position) {
    if (!mapTooltipElement || typeof window === 'undefined') {
        return;
    }

    let clientX;
    let clientY;

    if (position && typeof position.clientX === 'number' && typeof position.clientY === 'number') {
        clientX = position.clientX;
        clientY = position.clientY;
    } else if (position && typeof position.x === 'number' && typeof position.y === 'number') {
        clientX = position.x;
        clientY = position.y;
    } else {
        return;
    }

    const tooltipRect = mapTooltipElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let left = clientX + MAP_TOOLTIP_OFFSET;
    let top = clientY + MAP_TOOLTIP_OFFSET;

    if (left + tooltipRect.width + MAP_TOOLTIP_MARGIN > viewportWidth) {
        left = viewportWidth - tooltipRect.width - MAP_TOOLTIP_MARGIN;
    }

    if (top + tooltipRect.height + MAP_TOOLTIP_MARGIN > viewportHeight) {
        top = viewportHeight - tooltipRect.height - MAP_TOOLTIP_MARGIN;
    }

    left = Math.max(MAP_TOOLTIP_MARGIN, left);
    top = Math.max(MAP_TOOLTIP_MARGIN, top);

    mapTooltipElement.style.transform = `translate(${Math.round(left)}px, ${Math.round(top)}px)`;
}

function hideMapTooltip(force = false) {
    if (!mapTooltipElement) {
        return;
    }
    if (!mapTooltipVisible && !force) {
        return;
    }

    mapTooltipElement.classList.remove('is-visible');
    mapTooltipElement.setAttribute('aria-hidden', 'true');
    mapTooltipElement.style.transform = 'translate(-9999px, -9999px)';
    mapTooltipVisible = false;
}

function getDepartmentTooltipContent(code) {
    const deptName = departmentNames[code] || code;
    const city = departmentToCity[code];
    const lines = [];

    lines.push(`
        <span class="map-tooltip-title">${escapeHTML(deptName)} (${escapeHTML(code)})</span>
    `);

    if (city) {
        lines.push(`
            <span class="map-tooltip-subtitle">Cliquez pour ouvrir la page ${escapeHTML(city.name)}</span>
        `);
    } else {
        lines.push(`
            <span class="map-tooltip-subtitle map-tooltip-subtitle-muted">Aucune page spécifique pour ce département</span>
        `);
    }

    return lines.join('');
}

function animateInfoPanel(panel) {
    if (!panel) {
        return;
    }
    panel.classList.remove('is-updating');
    void panel.offsetWidth;
    panel.classList.add('is-updating');
    setTimeout(() => {
        panel.classList.remove('is-updating');
    }, 350);
}

