/**
 * ============================================
 * HELPERS DOM
 * ============================================
 * 
 * Fonctions utilitaires pour manipuler le DOM
 * de maniÃ¨re cohÃ©rente et rÃ©utilisable.
 */

import { CONFIG } from './constants.js';

/**
 * Attend que le DOM soit chargÃ©
 * @param {Function} callback - La fonction Ã  exÃ©cuter
 */
export function onDOMReady(callback) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback);
    } else {
        callback();
    }
}

/**
 * Trouve un Ã©lÃ©ment dans le DOM avec gestion d'erreur
 * @param {string} selector - Le sÃ©lecteur CSS
 * @param {Element} context - Le contexte de recherche (optionnel)
 * @returns {Element|null} L'Ã©lÃ©ment trouvÃ© ou null
 */
export function $(selector, context = document) {
    try {
        return context.querySelector(selector);
    } catch (error) {
        console.warn(`SÃ©lecteur invalide: ${selector}`, error);
        return null;
    }
}

/**
 * Trouve plusieurs Ã©lÃ©ments dans le DOM
 * @param {string} selector - Le sÃ©lecteur CSS
 * @param {Element} context - Le contexte de recherche (optionnel)
 * @returns {NodeList} La liste des Ã©lÃ©ments trouvÃ©s
 */
export function $$(selector, context = document) {
    try {
        return context.querySelectorAll(selector);
    } catch (error) {
        console.warn(`SÃ©lecteur invalide: ${selector}`, error);
        return [];
    }
}

/**
 * Ajoute une classe Ã  un Ã©lÃ©ment
 * @param {Element} element - L'Ã©lÃ©ment
 * @param {string} className - La classe Ã  ajouter
 */
export function addClass(element, className) {
    if (element && element.classList) {
        element.classList.add(className);
    }
}

/**
 * Supprime une classe d'un Ã©lÃ©ment
 * @param {Element} element - L'Ã©lÃ©ment
 * @param {string} className - La classe Ã  supprimer
 */
export function removeClass(element, className) {
    if (element && element.classList) {
        element.classList.remove(className);
    }
}

/**
 * Toggle une classe sur un Ã©lÃ©ment
 * @param {Element} element - L'Ã©lÃ©ment
 * @param {string} className - La classe Ã  toggle
 */
export function toggleClass(element, className) {
    if (element && element.classList) {
        element.classList.toggle(className);
    }
}

/**
 * VÃ©rifie si un Ã©lÃ©ment a une classe
 * @param {Element} element - L'Ã©lÃ©ment
 * @param {string} className - La classe Ã  vÃ©rifier
 * @returns {boolean} True si l'Ã©lÃ©ment a la classe
 */
export function hasClass(element, className) {
    return element && element.classList && element.classList.contains(className);
}

/**
 * CrÃ©e un Ã©lÃ©ment avec des attributs
 * @param {string} tagName - Le nom de la balise
 * @param {Object} attributes - Les attributs Ã  ajouter
 * @param {string} textContent - Le contenu texte (optionnel)
 * @returns {Element} L'Ã©lÃ©ment crÃ©Ã©
 */
export function createElement(tagName, attributes = {}, textContent = '') {
    const element = document.createElement(tagName);
    
    Object.keys(attributes).forEach(key => {
        if (key === 'className') {
            element.className = attributes[key];
        } else if (key === 'dataset') {
            Object.keys(attributes[key]).forEach(dataKey => {
                element.dataset[dataKey] = attributes[key][dataKey];
            });
        } else {
            element.setAttribute(key, attributes[key]);
        }
    });
    
    if (textContent) {
        element.textContent = textContent;
    }
    
    return element;
}

/**
 * Supprime un Ã©lÃ©ment du DOM
 * @param {Element} element - L'Ã©lÃ©ment Ã  supprimer
 */
export function removeElement(element) {
    if (element && element.parentNode) {
        element.parentNode.removeChild(element);
    }
}

/**
 * Scroll fluide vers un Ã©lÃ©ment
 * @param {Element|string} target - L'Ã©lÃ©ment ou le sÃ©lecteur
 * @param {Object} options - Options de scroll
 */
export function scrollTo(target, options = {}) {
    const defaultOptions = {
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
    };
    
    const finalOptions = { ...defaultOptions, ...options };
    
    let element = target;
    if (typeof target === 'string') {
        element = $(target);
    }
    
    if (element) {
        element.scrollIntoView(finalOptions);
    }
}

/**
 * DÃ©sactive un Ã©lÃ©ment (bouton, input, etc.)
 * @param {Element} element - L'Ã©lÃ©ment Ã  dÃ©sactiver
 */
export function disableElement(element) {
    if (element) {
        element.disabled = true;
        addClass(element, CONFIG.CLASSES.LOADING);
    }
}

/**
 * Active un Ã©lÃ©ment
 * @param {Element} element - L'Ã©lÃ©ment Ã  activer
 */
export function enableElement(element) {
    if (element) {
        element.disabled = false;
        removeClass(element, CONFIG.CLASSES.LOADING);
    }
}

/**
 * Affiche un Ã©lÃ©ment
 * @param {Element} element - L'Ã©lÃ©ment Ã  afficher
 * @param {string} display - Le type de display (par dÃ©faut: 'block')
 */
export function showElement(element, display = 'block') {
    if (element) {
        element.style.display = display;
    }
}

/**
 * Cache un Ã©lÃ©ment
 * @param {Element} element - L'Ã©lÃ©ment Ã  cacher
 */
export function hideElement(element) {
    if (element) {
        element.style.display = 'none';
    }
}




