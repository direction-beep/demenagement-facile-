/**
 * ============================================
 * CARTE DE FRANCE INTERACTIVE AVEC D3.JS (REFACTORISÉ)
 * ============================================
 * 
 * Affiche une carte interactive de la France métropolitaine
 * avec les départements cliquables (sans Corse 2A et 2B)
 * 
 * @version 2.0.0
 * @author Déménagement Facile
 * @requires D3.js v7
 * @requires TopoJSON
 */

import { DEPARTMENTS } from './utils/constants.js';

/**
 * Configuration de la carte
 */
const MAP_CONFIG = {
    width: 1200,
    height: 1000,
    scale: 2800,
    center: [2.5, 47],
    departmentToCity: DEPARTMENTS
};

/**
 * Classe pour gérer la carte de France interactive
 */
export class FranceMap {
    /**
     * @param {string|HTMLElement} container - Le conteneur de la carte
     * @param {Object} options - Options de configuration
     */
    constructor(container, options = {}) {
        this.container = typeof container === 'string' 
            ? document.querySelector(container) 
            : container;
        
        if (!this.container) {
            throw new Error('Container element not found');
        }
        
        this.options = {
            ...MAP_CONFIG,
            ...options
        };
        
        this.svg = null;
        this.projection = null;
        this.path = null;
        this.departments = null;
        
        this.init();
    }
    
    /**
     * Initialise la carte
     */
    async init() {
        try {
            await this.loadGeoJSON();
            this.setupProjection();
            this.renderMap();
            this.setupInteractivity();
        } catch (error) {
            console.error('Error initializing map:', error);
            this.showFallback();
        }
    }
    
    /**
     * Charge les données GeoJSON
     * @returns {Promise<Object>} Les données GeoJSON
     */
    async loadGeoJSON() {
        const response = await fetch('/js/france-geojson.json');
        if (!response.ok) {
            throw new Error('Failed to load GeoJSON data');
        }
        this.geoData = await response.json();
        return this.geoData;
    }
    
    /**
     * Configure la projection géographique
     */
    setupProjection() {
        this.projection = d3.geoMercator()
            .scale(this.options.scale)
            .center(this.options.center)
            .translate([this.options.width / 2, this.options.height / 2]);
        
        this.path = d3.geoPath().projection(this.projection);
    }
    
    /**
     * Rend la carte
     */
    renderMap() {
        // Créer le SVG
        this.svg = d3.select(this.container)
            .append('svg')
            .attr('width', this.options.width)
            .attr('height', this.options.height)
            .attr('viewBox', `0 0 ${this.options.width} ${this.options.height}`)
            .attr('class', 'france-map-svg');
        
        // Dessiner les départements
        this.departments = this.svg.selectAll('path')
            .data(this.geoData.features)
            .enter()
            .append('path')
            .attr('d', this.path)
            .attr('class', 'department')
            .attr('data-code', d => d.properties.code)
            .style('fill', this.getDepartmentColor.bind(this))
            .style('stroke', '#fff')
            .style('stroke-width', '0.5')
            .style('cursor', 'pointer')
            .on('mouseenter', this.handleMouseEnter.bind(this))
            .on('mouseleave', this.handleMouseLeave.bind(this))
            .on('click', this.handleClick.bind(this));
    }
    
    /**
     * Configure l'interactivité
     */
    setupInteractivity() {
        // Ajouter les labels des départements si nécessaire
        // ...
    }
    
    /**
     * Retourne la couleur d'un département
     * @param {Object} d - Les données du département
     * @returns {string} La couleur
     */
    getDepartmentColor(d) {
        const code = d.properties.code;
        
        // Exclure la Corse (2A et 2B)
        if (code === '2A' || code === '2B') {
            return '#e5e7eb'; // Gris clair
        }
        
        // Vérifier si le département a une page
        if (this.options.departmentToCity[code]) {
            return '#dbeafe'; // Bleu clair
        }
        
        return '#f3f4f6'; // Gris par défaut
    }
    
    /**
     * Gère le survol d'un département
     * @param {Event} event - L'événement
     * @param {Object} d - Les données du département
     */
    handleMouseEnter(event, d) {
        const code = d.properties.code;
        
        // Exclure la Corse
        if (code === '2A' || code === '2B') {
            return;
        }
        
        d3.select(event.currentTarget)
            .style('fill', '#93c5fd')
            .style('stroke-width', '2');
        
        this.showTooltip(event, d);
    }
    
    /**
     * Gère la fin du survol
     * @param {Event} event - L'événement
     * @param {Object} d - Les données du département
     */
    handleMouseLeave(event, d) {
        d3.select(event.currentTarget)
            .style('fill', this.getDepartmentColor(d))
            .style('stroke-width', '0.5');
        
        this.hideTooltip();
    }
    
    /**
     * Gère le clic sur un département
     * @param {Event} event - L'événement
     * @param {Object} d - Les données du département
     */
    handleClick(event, d) {
        event.stopPropagation();
        event.preventDefault();
        
        const code = d.properties.code;
        
        // Exclure la Corse
        if (code === '2A' || code === '2B') {
            return;
        }
        
        const city = this.options.departmentToCity[code];
        
        if (city) {
            window.location.href = `/demenageur-${city.slug}.html`;
        } else {
            this.showNoPageMessage(d.properties.nom);
        }
    }
    
    /**
     * Affiche un tooltip
     * @param {Event} event - L'événement
     * @param {Object} d - Les données du département
     */
    showTooltip(event, d) {
        // Implémentation du tooltip
        // ...
    }
    
    /**
     * Cache le tooltip
     */
    hideTooltip() {
        // Implémentation du tooltip
        // ...
    }
    
    /**
     * Affiche un message si aucune page n'existe
     * @param {string} departmentName - Le nom du département
     */
    showNoPageMessage(departmentName) {
        console.warn(`Aucune page spécifique pour le département: ${departmentName}`);
        // Optionnel : afficher une notification
    }
    
    /**
     * Affiche une carte de fallback si le chargement échoue
     */
    showFallback() {
        this.container.innerHTML = `
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
}

// Initialisation automatique
document.addEventListener('DOMContentLoaded', function() {
    const mapContainer = document.querySelector('#france-map-container');
    if (mapContainer && typeof d3 !== 'undefined') {
        new FranceMap(mapContainer);
    }
});

// Export pour utilisation dans d'autres modules
export default FranceMap;

