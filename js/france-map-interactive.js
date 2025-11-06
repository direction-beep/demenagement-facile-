// ============================================
// CARTE DE FRANCE INTERACTIVE AVEC SVG RÉEL
// Carte géographique avec départements cliquables
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

// Charger le SVG de France et le rendre interactif
async function loadFranceMapSVG() {
    const container = document.getElementById('france-map');
    if (!container) return;
    
    container.innerHTML = '<div class="map-loading">Chargement de la carte...</div>';
    
    try {
        // Essayer plusieurs sources pour le SVG
        const svgSources = [
            'https://upload.wikimedia.org/wikipedia/commons/6/6d/Departements_et_regions_de_France_metropolitaine_2016.svg',
            'https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements-version-simplifiee.geojson'
        ];
        
        let svgElement = null;
        let loaded = false;
        
        // Essayer de charger depuis la première source (SVG direct)
        try {
            const response = await fetch(svgSources[0], {
                mode: 'cors',
                cache: 'default'
            });
            
            if (response.ok) {
                const svgText = await response.text();
                const parser = new DOMParser();
                const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
                
                // Vérifier les erreurs de parsing
                const parserError = svgDoc.querySelector('parsererror');
                if (!parserError) {
                    svgElement = svgDoc.documentElement;
                    loaded = true;
                }
            }
        } catch (e) {
            console.warn('Impossible de charger le SVG depuis la première source:', e);
        }
        
        // Si le chargement direct a échoué, utiliser un object/embed
        if (!loaded) {
            container.innerHTML = `
                <object data="${svgSources[0]}" 
                        type="image/svg+xml" 
                        class="france-svg-map"
                        style="width: 100%; height: auto; max-height: 800px;">
                    <p>Chargement de la carte...</p>
                </object>
            `;
            
            // Attendre que l'object charge
            const objectEl = container.querySelector('object');
            if (objectEl) {
                objectEl.addEventListener('load', function() {
                    try {
                        const svgDoc = objectEl.contentDocument;
                        if (svgDoc) {
                            svgElement = svgDoc.documentElement;
                            processSVG(svgElement, container);
                        }
                    } catch (e) {
                        console.error('Erreur d\'accès au SVG:', e);
                        createFallbackMap(container);
                    }
                });
                
                // Timeout après 5 secondes
                setTimeout(() => {
                    if (!container.querySelector('[data-department]')) {
                        createFallbackMap(container);
                    }
                }, 5000);
            }
            return;
        }
        
        // Traiter le SVG chargé
        if (svgElement) {
            processSVG(svgElement, container);
        } else {
            throw new Error('Impossible de charger le SVG');
        }
        
    } catch (error) {
        console.error('Erreur lors du chargement de la carte:', error);
        createFallbackMap(container);
    }
}

// Traiter le SVG et le rendre interactif
function processSVG(svgElement, container) {
    // Cloner le SVG pour l'insérer dans notre page
    const svgClone = svgElement.cloneNode(true);
    
    // Configurer le SVG pour qu'il soit responsive
    svgClone.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svgClone.setAttribute('class', 'france-svg-map');
    svgClone.style.width = '100%';
    svgClone.style.height = 'auto';
    svgClone.style.maxHeight = '800px';
    svgClone.style.display = 'block';
    
    // Masquer la Corse (2A et 2B) - plusieurs sélecteurs possibles
    const corseSelectors = [
        '#2A', '#2B',
        '[id="2A"]', '[id="2B"]',
        '[id*="2A"]', '[id*="2B"]',
        'g[id*="2A"]', 'g[id*="2B"]',
        'path[id*="2A"]', 'path[id*="2B"]'
    ];
    corseSelectors.forEach(selector => {
        const elements = svgClone.querySelectorAll(selector);
        elements.forEach(el => el.style.display = 'none');
    });
    
    // Rendre tous les départements interactifs
    makeDepartmentsInteractive(svgClone);
    
    // Insérer le SVG dans le conteneur
    container.innerHTML = '';
    container.appendChild(svgClone);
    
    // Ajuster le viewBox si nécessaire
    if (!svgClone.getAttribute('viewBox')) {
        const width = svgClone.getAttribute('width') || '1000';
        const height = svgClone.getAttribute('height') || '1000';
        svgClone.setAttribute('viewBox', `0 0 ${width} ${height}`);
        svgClone.removeAttribute('width');
        svgClone.removeAttribute('height');
    }
}

// Rendre les départements interactifs
function makeDepartmentsInteractive(svg) {
    // D'abord, masquer la Corse
    const corseElements = svg.querySelectorAll('[id*="2A"], [id*="2B"], [id="2A"], [id="2B"]');
    corseElements.forEach(el => {
        el.style.display = 'none';
    });
    
    // Trouver tous les éléments qui pourraient représenter des départements
    // Chercher d'abord les groupes (g), puis les paths directs
    const allElements = svg.querySelectorAll('g[id], path[id], polygon[id], circle[id], rect[id]');
    
    allElements.forEach(element => {
        const id = element.getAttribute('id') || '';
        const deptNum = extractDepartmentNumber(id);
        
        if (!deptNum || deptNum === '2A' || deptNum === '2B') {
            if (deptNum === '2A' || deptNum === '2B') {
                element.style.display = 'none';
            }
            return;
        }
        
        // Si c'est un groupe, appliquer aux paths enfants
        if (element.tagName === 'g') {
            const paths = element.querySelectorAll('path, polygon, circle, rect');
            paths.forEach(path => {
                setupDepartmentElement(path, deptNum);
            });
            // Aussi rendre le groupe cliquable
            setupDepartmentElement(element, deptNum);
        } else {
            setupDepartmentElement(element, deptNum);
        }
    });
    
    // Si aucun département n'a été trouvé avec les IDs, essayer avec les classes ou autres attributs
    if (svg.querySelectorAll('[data-department]').length === 0) {
        // Essayer une approche différente : chercher par texte ou autres attributs
        const textElements = svg.querySelectorAll('text');
        textElements.forEach(textEl => {
            const text = textEl.textContent.trim();
            const deptMatch = text.match(/^(\d{2})$/);
            if (deptMatch) {
                const deptNum = deptMatch[1];
                if (deptNum !== '2A' && deptNum !== '2B') {
                    // Trouver le path parent ou proche
                    let parent = textEl.parentElement;
                    while (parent && parent !== svg) {
                        if (parent.tagName === 'g' || parent.tagName === 'path') {
                            setupDepartmentElement(parent, deptNum);
                            break;
                        }
                        parent = parent.parentElement;
                    }
                }
            }
        });
    }
}

// Configurer un élément de département
function setupDepartmentElement(element, deptNum) {
    if (element.hasAttribute('data-department-setup')) return;
    element.setAttribute('data-department-setup', 'true');
    
    // Ajouter les attributs
    element.classList.add('department-path');
    element.setAttribute('data-department', deptNum);
    
    // Styles de base
    const hasCity = departmentToCity[deptNum];
    element.style.cursor = hasCity ? 'pointer' : 'default';
    
    // Appliquer les styles aux paths enfants si c'est un groupe
    if (element.tagName === 'g') {
        const paths = element.querySelectorAll('path, polygon, circle, rect');
        paths.forEach(path => {
            path.style.fill = hasCity ? '#e3f2fd' : '#f5f5f5';
            path.style.stroke = '#ffffff';
            path.style.strokeWidth = '1.5';
            path.style.transition = 'fill 0.3s ease, stroke 0.3s ease';
        });
    } else {
        element.style.fill = hasCity ? '#e3f2fd' : '#f5f5f5';
        element.style.stroke = '#ffffff';
        element.style.strokeWidth = '1.5';
        element.style.transition = 'fill 0.3s ease, stroke 0.3s ease';
    }
    
    // Événements
    element.addEventListener('mouseenter', function() {
        if (hasCity) {
            const paths = this.tagName === 'g' ? this.querySelectorAll('path, polygon, circle, rect') : [this];
            paths.forEach(path => {
                path.style.fill = '#2196f3';
                path.style.stroke = '#1976d2';
                path.style.strokeWidth = '2.5';
            });
            showDepartmentInfo(deptNum);
        }
    });
    
    element.addEventListener('mouseleave', function() {
        if (hasCity) {
            const paths = this.tagName === 'g' ? this.querySelectorAll('path, polygon, circle, rect') : [this];
            paths.forEach(path => {
                path.style.fill = '#e3f2fd';
                path.style.stroke = '#ffffff';
                path.style.strokeWidth = '1.5';
            });
        }
    });
    
    element.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        handleDepartmentClick(deptNum);
    });
}

// Extraire le numéro de département depuis un ID
function extractDepartmentNumber(id) {
    if (!id) return null;
    
    // Formats possibles: "01", "dep-01", "dept-01", "FR-01", "FR-01-Ain", etc.
    // Essayer d'abord avec le format complet incluant 2A/2B
    let match = id.match(/(?:^|[-_])(\d{2}[AB]?)(?:[-_]|$)/i);
    if (match) {
        const dept = match[1].toUpperCase();
        if (dept === '2A' || dept === '2B') return dept;
        if (parseInt(dept) >= 1 && parseInt(dept) <= 95) {
            return dept.padStart(2, '0');
        }
    }
    
    // Essayer avec juste les 2 premiers chiffres au début
    match = id.match(/^(\d{2})/);
    if (match) {
        const num = parseInt(match[1]);
        if (num >= 1 && num <= 95) {
            return match[1];
        }
    }
    
    // Essayer avec un format comme "FR-01" ou "dep01"
    match = id.match(/(?:FR[-_]?|dep[-_]?|dept[-_]?)(\d{2})/i);
    if (match) {
        const num = parseInt(match[1]);
        if (num >= 1 && num <= 95) {
            return match[1];
        }
    }
    
    return null;
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

// Carte de fallback si le SVG ne charge pas
function createFallbackMap(container) {
    container.innerHTML = `
        <div class="france-map-fallback">
            <p>Chargement de la carte en cours...</p>
            <p>Si la carte ne s'affiche pas, utilisez la recherche ci-dessous.</p>
        </div>
    `;
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

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    loadFranceMapSVG();
    createDepartmentsGrid();
});
