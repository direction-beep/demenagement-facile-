/**
 * ============================================
 * DÉMÉNAGEMENT ZEN - JAVASCRIPT PRINCIPAL
 * ============================================
 * 
 * Point d'entrée principal de l'application
 * Initialise tous les modules et composants
 * 
 * @version 2.0.0
 * @author Déménagement Zen
 */

// Import des modules
import Navigation from './core/Navigation.js';
import FAQ from './core/FAQ.js';
import Animations from './core/Animations.js';
import { onDOMReady, $$ } from './utils/dom-helpers.js';
import { CONFIG } from './utils/constants.js';

/**
 * Classe principale de l'application
 */
class App {
    /**
     * @param {Object} options - Options de configuration
     */
    constructor(options = {}) {
        this.options = options;
        this.modules = {
            navigation: null,
            faq: null,
            animations: null
        };
        
        this.init();
    }
    
    /**
     * Initialise l'application
     */
    init() {
        onDOMReady(() => {
            this.initializeModules();
            this.setupDateInputs();
            this.setupGlobalEventListeners();
            
            console.log('✅ Application initialisée');
        });
    }
    
    /**
     * Initialise tous les modules
     */
    initializeModules() {
        // Navigation
        this.modules.navigation = new Navigation();
        
        // FAQ
        this.modules.faq = new FAQ();
        
        // Animations
        this.modules.animations = new Animations();
    }
    
    /**
     * Configure les champs de date (date minimale = aujourd'hui)
     */
    setupDateInputs() {
        const today = new Date().toISOString().split('T')[0];
        const dateInputs = $$(CONFIG.SELECTORS.DATE_INPUTS);
        
        dateInputs.forEach(input => {
            input.setAttribute('min', today);
            input.setAttribute('max', '2099-12-31'); // Date maximale raisonnable
        });
    }
    
    /**
     * Configure les écouteurs d'événements globaux
     */
    setupGlobalEventListeners() {
        // Gestion des erreurs JavaScript
        window.addEventListener('error', (e) => {
            console.error('JavaScript error:', e.error);
            // Optionnel : envoyer l'erreur à un service de logging
        });
        
        // Gestion des promesses rejetées non gérées
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
        });
    }
    
    /**
     * Nettoie l'application (pour les tests ou le débogage)
     */
    destroy() {
        if (this.modules.animations) {
            this.modules.animations.destroy();
        }
        
        this.modules = {
            navigation: null,
            faq: null,
            animations: null
        };
    }
}

// Initialiser l'application
const app = new App();

// Export pour utilisation dans d'autres modules si nécessaire
export default app;

// Export des modules individuels pour utilisation directe
export { Navigation, FAQ, Animations };



