/**
 * ============================================
 * GESTIONNAIRE FAQ (ACCORDÉON)
 * ============================================
 * 
 * Gère l'affichage/fermeture des questions FAQ
 */

import { onDOMReady, $$, toggleClass, removeClass } from '../utils/dom-helpers.js';
import { CONFIG } from '../utils/constants.js';

/**
 * Classe pour gérer les FAQ en accordéon
 */
export class FAQ {
    /**
     * @param {Object} options - Options de configuration
     */
    constructor(options = {}) {
        this.options = {
            faqItems: CONFIG.SELECTORS.FAQ_ITEMS,
            faqQuestion: CONFIG.SELECTORS.FAQ_QUESTION,
            allowMultiple: false, // Si true, plusieurs items peuvent être ouverts en même temps
            ...options
        };
        
        this.faqItems = [];
        
        this.init();
    }
    
    /**
     * Initialise les FAQ
     */
    init() {
        onDOMReady(() => {
            this.faqItems = Array.from($$(this.options.faqItems));
            
            if (this.faqItems.length === 0) {
                return;
            }
            
            this.setupFAQItems();
        });
    }
    
    /**
     * Configure les items FAQ
     */
    setupFAQItems() {
        this.faqItems.forEach(item => {
            const question = item.querySelector(this.options.faqQuestion) || 
                           item.querySelector('h3, h4, .question');
            
            if (!question) {
                return;
            }
            
            // Rendre la question cliquable
            question.style.cursor = 'pointer';
            question.setAttribute('role', 'button');
            question.setAttribute('aria-expanded', 'false');
            question.setAttribute('tabindex', '0');
            
            // Gestion du clic
            question.addEventListener('click', () => {
                this.toggleItem(item);
            });
            
            // Gestion du clavier (accessibilité)
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleItem(item);
                }
            });
        });
    }
    
    /**
     * Ouvre/ferme un item FAQ
     * @param {Element} item - L'item FAQ à toggle
     */
    toggleItem(item) {
        const isActive = item.classList.contains(CONFIG.CLASSES.ACTIVE);
        const question = item.querySelector(this.options.faqQuestion) || 
                       item.querySelector('h3, h4, .question');
        
        if (this.options.allowMultiple) {
            // Mode accordéon simple : toggle l'item
            toggleClass(item, CONFIG.CLASSES.ACTIVE);
            if (question) {
                question.setAttribute('aria-expanded', !isActive);
            }
        } else {
            // Mode accordéon exclusif : fermer les autres
            if (isActive) {
                // Fermer l'item actuel
                removeClass(item, CONFIG.CLASSES.ACTIVE);
                if (question) {
                    question.setAttribute('aria-expanded', 'false');
                }
            } else {
                // Fermer tous les autres items
                this.faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        removeClass(otherItem, CONFIG.CLASSES.ACTIVE);
                        const otherQuestion = otherItem.querySelector(this.options.faqQuestion) || 
                                            otherItem.querySelector('h3, h4, .question');
                        if (otherQuestion) {
                            otherQuestion.setAttribute('aria-expanded', 'false');
                        }
                    }
                });
                
                // Ouvrir l'item actuel
                toggleClass(item, CONFIG.CLASSES.ACTIVE);
                if (question) {
                    question.setAttribute('aria-expanded', 'true');
                }
            }
        }
    }
    
    /**
     * Ouvre un item FAQ
     * @param {number} index - L'index de l'item (0-based)
     */
    openItem(index) {
        if (index >= 0 && index < this.faqItems.length) {
            this.toggleItem(this.faqItems[index]);
        }
    }
    
    /**
     * Ferme tous les items FAQ
     */
    closeAll() {
        this.faqItems.forEach(item => {
            removeClass(item, CONFIG.CLASSES.ACTIVE);
            const question = item.querySelector(this.options.faqQuestion) || 
                           item.querySelector('h3, h4, .question');
            if (question) {
                question.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// Export une instance par défaut
export default new FAQ();





