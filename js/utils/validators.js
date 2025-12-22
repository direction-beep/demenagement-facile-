/**
 * ============================================
 * VALIDATEURS
 * ============================================
 * 
 * Fonctions de validation réutilisables pour les formulaires
 * et autres entrées utilisateur.
 */

import { REGEX } from './constants.js';

/**
 * Valide une adresse email
 * @param {string} email - L'adresse email à valider
 * @returns {boolean} True si l'email est valide
 */
export function isValidEmail(email) {
    if (!email || typeof email !== 'string') {
        return false;
    }
    return REGEX.EMAIL.test(email.trim());
}

/**
 * Valide un numéro de téléphone français
 * @param {string} phone - Le numéro de téléphone à valider
 * @returns {boolean} True si le numéro est valide
 */
export function isValidPhone(phone) {
    if (!phone || typeof phone !== 'string') {
        return false;
    }
    // Nettoyer le numéro (supprimer les espaces)
    const cleaned = phone.replace(/\s/g, '');
    return REGEX.PHONE.test(cleaned);
}

/**
 * Valide une date (doit être aujourd'hui ou dans le futur)
 * @param {string} dateString - La date au format ISO (YYYY-MM-DD)
 * @returns {boolean} True si la date est valide
 */
export function isValidDate(dateString) {
    if (!dateString) {
        return false;
    }
    
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return date instanceof Date && 
           !isNaN(date) && 
           date >= today;
}

/**
 * Valide un nom de ville
 * @param {string} city - Le nom de la ville à valider
 * @returns {boolean} True si le nom de ville est valide
 */
export function isValidCityName(city) {
    if (!city || typeof city !== 'string') {
        return false;
    }
    
    const trimmed = city.trim();
    if (trimmed.length < 2) {
        return false;
    }
    
    return REGEX.CITY_NAME.test(trimmed);
}

/**
 * Valide un champ requis
 * @param {string} value - La valeur à valider
 * @returns {boolean} True si la valeur n'est pas vide
 */
export function isRequired(value) {
    if (value === null || value === undefined) {
        return false;
    }
    
    if (typeof value === 'string') {
        return value.trim().length > 0;
    }
    
    return Boolean(value);
}

/**
 * Valide un formulaire complet
 * @param {Object} formData - Les données du formulaire
 * @param {Object} rules - Les règles de validation
 * @returns {Object} { isValid: boolean, errors: Object }
 */
export function validateForm(formData, rules) {
    const errors = {};
    let isValid = true;

    Object.keys(rules).forEach(fieldName => {
        const value = formData[fieldName];
        const fieldRules = rules[fieldName];
        
        // Validation des champs requis
        if (fieldRules.required && !isRequired(value)) {
            errors[fieldName] = fieldRules.requiredMessage || 'Ce champ est obligatoire';
            isValid = false;
            return;
        }
        
        // Si le champ est vide et non requis, on passe
        if (!value && !fieldRules.required) {
            return;
        }
        
        // Validation par type
        if (fieldRules.type === 'email' && !isValidEmail(value)) {
            errors[fieldName] = fieldRules.message || 'Veuillez entrer une adresse email valide';
            isValid = false;
        } else if (fieldRules.type === 'tel' && !isValidPhone(value)) {
            errors[fieldName] = fieldRules.message || 'Veuillez entrer un numéro de téléphone valide';
            isValid = false;
        } else if (fieldRules.type === 'date' && !isValidDate(value)) {
            errors[fieldName] = fieldRules.message || 'La date doit être aujourd\'hui ou dans le futur';
            isValid = false;
        } else if (fieldRules.type === 'city' && !isValidCityName(value)) {
            errors[fieldName] = fieldRules.message || 'Veuillez entrer un nom de ville valide';
            isValid = false;
        }
        
        // Validation personnalisée
        if (fieldRules.custom && typeof fieldRules.custom === 'function') {
            const customResult = fieldRules.custom(value, formData);
            if (customResult !== true) {
                errors[fieldName] = customResult || 'Validation échouée';
                isValid = false;
            }
        }
    });

    return { isValid, errors };
}





