/**
 * ============================================
 * GESTIONNAIRE DE NAVIGATION
 * ============================================
 * 
 * GÃ¨re le menu mobile, la navigation et les liens d'ancrage
 */

import { onDOMReady, $, $$, toggleClass, scrollTo } from '../utils/dom-helpers.js';
import { CONFIG } from '../utils/constants.js';

/**
 * Classe pour gÃ©rer la navigation
 */
export class Navigation {
    /**
     * @param {Object} options - Options de configuration
     */
    constructor(options = {}) {
        this.options = {
            mobileMenuToggle: CONFIG.SELECTORS.MOBILE_MENU_TOGGLE,
            navMenu: CONFIG.SELECTORS.NAV_MENU,
            anchorLinks: CONFIG.SELECTORS.ANCHOR_LINKS,
            ...options
        };
        
        this.mobileMenuToggle = null;
        this.navMenu = null;
        
        this.init();
    }
    
    /**
     * Initialise la navigation
     */
    init() {
        onDOMReady(() => {
            this.mobileMenuToggle = $(this.options.mobileMenuToggle);
            this.navMenu = $(this.options.navMenu);
            
            if (this.mobileMenuToggle && this.navMenu) {
                this.setupMobileMenu();
            }
            
            this.setupAnchorLinks();
            this.setupScrollBehavior();
        });
    }
    
    /**
     * Configure le menu mobile
     */
    setupMobileMenu() {
        this.mobileMenuToggle.addEventListener('click', () => {
            this.toggleMobileMenu();
        });
        
        // Fermer le menu en cliquant Ã  l'extÃ©rieur
        document.addEventListener('click', (e) => {
            if (this.isMobileMenuOpen() && 
                !this.navMenu.contains(e.target) && 
                !this.mobileMenuToggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
        
        // Fermer le menu en appuyant sur Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMobileMenuOpen()) {
                this.closeMobileMenu();
            }
        });
    }
    
    /**
     * Ouvre/ferme le menu mobile
     */
    toggleMobileMenu() {
        toggleClass(this.mobileMenuToggle, CONFIG.CLASSES.ACTIVE);
        toggleClass(this.navMenu, CONFIG.CLASSES.ACTIVE);
        
        // EmpÃªcher le scroll du body quand le menu est ouvert
        if (this.isMobileMenuOpen()) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    /**
     * Ouvre le menu mobile
     */
    openMobileMenu() {
        if (!this.isMobileMenuOpen()) {
            this.toggleMobileMenu();
        }
    }
    
    /**
     * Ferme le menu mobile
     */
    closeMobileMenu() {
        if (this.isMobileMenuOpen()) {
            this.toggleMobileMenu();
        }
    }
    
    /**
     * VÃ©rifie si le menu mobile est ouvert
     * @returns {boolean}
     */
    isMobileMenuOpen() {
        return this.navMenu && this.navMenu.classList.contains(CONFIG.CLASSES.ACTIVE);
    }
    
    /**
     * Configure les liens d'ancrage pour le scroll fluide
     */
    setupAnchorLinks() {
        $$(this.options.anchorLinks).forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                
                // Ignorer les liens vides ou vers #
                if (!href || href === '#') {
                    e.preventDefault();
                    return;
                }
                
                // Trouver l'Ã©lÃ©ment cible
                const target = $(href);
                if (target) {
                    e.preventDefault();
                    scrollTo(target, { behavior: 'smooth' });
                    
                    // Fermer le menu mobile si ouvert
                    if (this.isMobileMenuOpen()) {
                        this.closeMobileMenu();
                    }
                }
            });
        });
    }
    
    /**
     * Configure le comportement de scroll
     */
    setupScrollBehavior() {
        // Ajouter un offset pour les liens d'ancrage si nÃ©cessaire
        // (pour compenser un header fixe par exemple)
    }
}

// Export une instance par dÃ©faut
export default new Navigation();



