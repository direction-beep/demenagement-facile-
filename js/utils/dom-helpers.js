/**
 * ============================================
 * HELPERS DOM
 * ============================================
 * 
 * Fonctions utilitaires pour manipuler le DOM
 * de manière cohérente et réutilisable.
 */

import { CONFIG } from './constants.js';

/**
 * Attend que le DOM soit chargé
 * @param {Function} callback - La fonction à exécuter
 */
export function onDOMReady(callback) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback);
    } else {
        callback();
    }
}

/**
 * Trouve un élément dans le DOM avec gestion d'erreur
 * @param {string} selector - Le sélecteur CSS
 * @param {Element} context - Le contexte de recherche (optionnel)
 * @returns {Element|null} L'élément trouvé ou null
 */
export function $(selector, context = document) {
    try {
        return context.querySelector(selector);
    } catch (error) {
        console.warn(`Sélecteur invalide: ${selector}`, error);
        return null;
    }
}

/**
 * Trouve plusieurs éléments dans le DOM
 * @param {string} selector - Le sélecteur CSS
 * @param {Element} context - Le contexte de recherche (optionnel)
 * @returns {NodeList} La liste des éléments trouvés
 */
export function $$(selector, context = document) {
    try {
        return context.querySelectorAll(selector);
    } catch (error) {
        console.warn(`Sélecteur invalide: ${selector}`, error);
        return [];
    }
}

/**
 * Ajoute une classe à un élément
 * @param {Element} element - L'élément
 * @param {string} className - La classe à ajouter
 */
export function addClass(element, className) {
    if (element && element.classList) {
        element.classList.add(className);
    }
}

/**
 * Supprime une classe d'un élément
 * @param {Element} element - L'élément
 * @param {string} className - La classe à supprimer
 */
export function removeClass(element, className) {
    if (element && element.classList) {
        element.classList.remove(className);
    }
}

/**
 * Toggle une classe sur un élément
 * @param {Element} element - L'élément
 * @param {string} className - La classe à toggle
 */
export function toggleClass(element, className) {
    if (element && element.classList) {
        element.classList.toggle(className);
    }
}

/**
 * Vérifie si un élément a une classe
 * @param {Element} element - L'élément
 * @param {string} className - La classe à vérifier
 * @returns {boolean} True si l'élément a la classe
 */
export function hasClass(element, className) {
    return element && element.classList && element.classList.contains(className);
}

/**
 * Crée un élément avec des attributs
 * @param {string} tagName - Le nom de la balise
 * @param {Object} attributes - Les attributs à ajouter
 * @param {string} textContent - Le contenu texte (optionnel)
 * @returns {Element} L'élément créé
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
 * Supprime un élément du DOM
 * @param {Element} element - L'élément à supprimer
 */
export function removeElement(element) {
    if (element && element.parentNode) {
        element.parentNode.removeChild(element);
    }
}

/**
 * Scroll fluide vers un élément
 * @param {Element|string} target - L'élément ou le sélecteur
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
 * Désactive un élément (bouton, input, etc.)
 * @param {Element} element - L'élément à désactiver
 */
export function disableElement(element) {
    if (element) {
        element.disabled = true;
        addClass(element, CONFIG.CLASSES.LOADING);
    }
}

/**
 * Active un élément
 * @param {Element} element - L'élément à activer
 */
export function enableElement(element) {
    if (element) {
        element.disabled = false;
        removeClass(element, CONFIG.CLASSES.LOADING);
    }
}

/**
 * Affiche un élément
 * @param {Element} element - L'élément à afficher
 * @param {string} display - Le type de display (par défaut: 'block')
 */
export function showElement(element, display = 'block') {
    if (element) {
        element.style.display = display;
    }
}

/**
 * Cache un élément
 * @param {Element} element - L'élément à cacher
 */
export function hideElement(element) {
    if (element) {
        element.style.display = 'none';
    }
}





