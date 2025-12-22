/**
 * ============================================
 * GESTIONNAIRE D'ANIMATIONS
 * ============================================
 * 
 * Gère les animations au scroll et autres effets visuels
 */

import { onDOMReady, $$ } from '../utils/dom-helpers.js';
import { CONFIG } from '../utils/constants.js';

/**
 * Classe pour gérer les animations
 */
export class Animations {
    /**
     * @param {Object} options - Options de configuration
     */
    constructor(options = {}) {
        this.options = {
            sections: CONFIG.SELECTORS.SECTIONS,
            threshold: CONFIG.ANIMATION.THRESHOLD,
            rootMargin: CONFIG.ANIMATION.ROOT_MARGIN,
            ...options
        };
        
        this.observer = null;
        this.animatedElements = [];
        
        this.init();
    }
    
    /**
     * Initialise les animations
     */
    init() {
        onDOMReady(() => {
            this.setupIntersectionObserver();
            this.observeSections();
        });
    }
    
    /**
     * Configure l'Intersection Observer pour les animations
     */
    setupIntersectionObserver() {
        // Vérifier le support de IntersectionObserver
        if (!('IntersectionObserver' in window)) {
            console.warn('IntersectionObserver not supported, animations disabled');
            return;
        }
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateIn(entry.target);
                } else {
                    // Optionnel : réinitialiser l'animation quand l'élément sort de la vue
                    // this.animateOut(entry.target);
                }
            });
        }, {
            threshold: this.options.threshold,
            rootMargin: this.options.rootMargin
        });
    }
    
    /**
     * Observe les sections pour les animations
     */
    observeSections() {
        const sections = $$(this.options.sections);
        
        sections.forEach(section => {
            // Initialiser l'état de l'animation
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = `opacity ${CONFIG.ANIMATION.DURATION}ms ${CONFIG.ANIMATION.EASING}, transform ${CONFIG.ANIMATION.DURATION}ms ${CONFIG.ANIMATION.EASING}`;
            
            // Observer la section
            if (this.observer) {
                this.observer.observe(section);
                this.animatedElements.push(section);
            }
        });
    }
    
    /**
     * Anime un élément lors de son entrée dans la vue
     * @param {Element} element - L'élément à animer
     */
    animateIn(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        
        // Arrêter d'observer cet élément une fois animé
        if (this.observer) {
            this.observer.unobserve(element);
        }
    }
    
    /**
     * Anime un élément lors de sa sortie de la vue
     * @param {Element} element - L'élément à animer
     */
    animateOut(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
    }
    
    /**
     * Ajoute un élément à observer
     * @param {Element} element - L'élément à observer
     */
    observeElement(element) {
        if (this.observer && element) {
            this.observer.observe(element);
            this.animatedElements.push(element);
        }
    }
    
    /**
     * Nettoie les observers
     */
    destroy() {
        if (this.observer) {
            this.animatedElements.forEach(element => {
                this.observer.unobserve(element);
            });
            this.observer.disconnect();
            this.observer = null;
        }
        this.animatedElements = [];
    }
}

// Export une instance par défaut
export default new Animations();





