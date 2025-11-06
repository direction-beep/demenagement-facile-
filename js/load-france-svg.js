// Script pour charger un SVG de France réel avec départements cliquables
// Ce script charge un SVG de France depuis Wikimedia Commons et ajoute l'interactivité

async function loadFranceSVGWithDepartments() {
    const container = document.getElementById('france-map');
    if (!container) return;
    
    try {
        // URL du SVG de France avec départements depuis Wikimedia Commons
        // Note: Il faudrait un SVG avec les IDs des départements
        const svgUrl = 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Blank_map_of_France_%28metropolitan%29.svg';
        
        const response = await fetch(svgUrl);
        if (response.ok) {
            const svgText = await response.text();
            
            // Parser le SVG
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
            const svgElement = svgDoc.documentElement;
            
            // Ajouter les styles et l'interactivité
            addInteractivityToSVG(svgElement);
            
            // Insérer dans le container
            container.innerHTML = '';
            container.appendChild(svgElement);
            
            // Initialiser les interactions
            initSVGInteractions();
        } else {
            throw new Error('Impossible de charger le SVG');
        }
    } catch (e) {
        console.error('Erreur chargement SVG:', e);
        // Fallback: utiliser l'image avec départements organisés
        createMapWithDepartments();
    }
}

function addInteractivityToSVG(svgElement) {
    // Ajouter les styles CSS
    const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
    style.textContent = `
        .dept-path { 
            fill: #e0e7ff; 
            stroke: #ffffff; 
            stroke-width: 1.5; 
            cursor: pointer; 
            transition: all 0.3s ease; 
        }
        .dept-path:hover { 
            fill: #2563eb; 
            stroke: #1e40af; 
            stroke-width: 2.5; 
        }
        .dept-path.has-city { 
            fill: #c7d2fe; 
        }
        .dept-path.has-city:hover { 
            fill: #2563eb; 
        }
        .dept-path.selected { 
            fill: #2563eb; 
            stroke: #1e40af; 
            stroke-width: 3; 
            filter: drop-shadow(0 4px 8px rgba(37, 99, 235, 0.4)); 
        }
    `;
    
    // Insérer le style au début du SVG
    if (svgElement.firstChild) {
        svgElement.insertBefore(style, svgElement.firstChild);
    } else {
        svgElement.appendChild(style);
    }
    
    // Ajouter les classes aux paths selon les départements
    const paths = svgElement.querySelectorAll('path, polygon, circle');
    paths.forEach((path, index) => {
        path.classList.add('dept-path');
        // Identifier le département par son ID ou titre
        const pathId = path.getAttribute('id') || path.getAttribute('data-code');
        if (pathId && departmentToCity[pathId]) {
            path.classList.add('has-city');
            path.setAttribute('data-department', pathId);
        }
    });
}

function initSVGInteractions() {
    const paths = document.querySelectorAll('.dept-path');
    paths.forEach(path => {
        const dept = path.getAttribute('data-department') || path.getAttribute('id');
        if (!dept) return;
        
        path.addEventListener('mouseenter', function() {
            showDepartmentInfo(dept);
            highlightDepartment(dept);
        });
        
        path.addEventListener('click', function(e) {
            e.preventDefault();
            handleDepartmentClick(dept);
        });
    });
}

