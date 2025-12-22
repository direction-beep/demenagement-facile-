/**
 * ============================================
 * CLIENT API
 * ============================================
 * 
 * Gestion centralisée des appels API
 * avec gestion des erreurs et retry logic.
 */

import { CONFIG } from './constants.js';

/**
 * Effectue une requête API avec gestion des erreurs
 * @param {string} endpoint - L'endpoint de l'API
 * @param {Object} options - Les options de la requête
 * @returns {Promise<Object>} La réponse de l'API
 */
export async function apiRequest(endpoint, options = {}) {
    const defaultOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    const finalOptions = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers
        }
    };
    
    try {
        const response = await fetch(endpoint, finalOptions);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('API request failed:', error);
        return {
            success: false,
            error: error.message || 'Une erreur est survenue',
            retry: true
        };
    }
}

/**
 * Soumet un formulaire via l'API
 * @param {FormData|Object} formData - Les données du formulaire
 * @param {Object} options - Options supplémentaires
 * @returns {Promise<Object>} La réponse de l'API
 */
export async function submitForm(formData, options = {}) {
    // Convertir FormData en objet si nécessaire
    let data = formData;
    if (formData instanceof FormData) {
        data = Object.fromEntries(formData);
    }
    
    return apiRequest(CONFIG.API_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(data),
        ...options
    });
}

/**
 * Effectue une requête avec retry automatique
 * @param {Function} requestFn - La fonction de requête à exécuter
 * @param {number} maxRetries - Nombre maximum de tentatives
 * @param {number} delay - Délai entre les tentatives (ms)
 * @returns {Promise<Object>} La réponse
 */
export async function retryRequest(requestFn, maxRetries = CONFIG.FORM.MAX_RETRIES, delay = CONFIG.FORM.RETRY_DELAY) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const result = await requestFn();
            if (result.success) {
                return result;
            }
            lastError = result;
        } catch (error) {
            lastError = { success: false, error: error.message };
        }
        
        // Attendre avant de réessayer (sauf pour la dernière tentative)
        if (attempt < maxRetries) {
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    
    return lastError;
}





