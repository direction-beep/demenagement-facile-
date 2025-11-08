/**
 * ============================================
 * CONSTANTES GLOBALES
 * ============================================
 * 
 * Ce fichier contient toutes les constantes utilisÃ©es dans l'application
 * pour centraliser la configuration et faciliter la maintenance.
 */

/**
 * Configuration de l'application
 * @type {Object}
 */
export const CONFIG = {
    // URLs
    BASE_URL: 'https://demenagement-zen.fr',
    API_ENDPOINT: '/api/submit-form',
    
    // SÃ©lecteurs CSS frÃ©quemment utilisÃ©s
    SELECTORS: {
        MOBILE_MENU_TOGGLE: '.mobile-menu-toggle',
        NAV_MENU: '.nav-menu',
        FAQ_ITEMS: '.faq-item',
        FAQ_QUESTION: '.faq-question',
        FORMS: 'form',
        DATE_INPUTS: 'input[type="date"]',
        SECTIONS: 'section',
        ANCHOR_LINKS: 'a[href^="#"]'
    },
    
    // Classes CSS
    CLASSES: {
        ACTIVE: 'active',
        LOADING: 'loading',
        ERROR: 'error',
        VALID: 'valid',
        SHOW: 'show'
    },
    
    // Configuration des animations
    ANIMATION: {
        DURATION: 600,
        EASING: 'ease',
        THRESHOLD: 0.1,
        ROOT_MARGIN: '0px 0px -100px 0px'
    },
    
    // Configuration des formulaires
    FORM: {
        MAX_RETRIES: 3,
        RETRY_DELAY: 2000,
        NOTIFICATION_DURATION: 5000
    },
    
    // Messages
    MESSAGES: {
        FORM_SUCCESS: 'Votre demande a Ã©tÃ© envoyÃ©e avec succÃ¨s. Nous vous contacterons sous 24h.',
        FORM_ERROR: 'Une erreur est survenue. Veuillez rÃ©essayer.',
        VALIDATION_REQUIRED: 'Ce champ est obligatoire',
        VALIDATION_EMAIL: 'Veuillez entrer une adresse email valide',
        VALIDATION_PHONE: 'Veuillez entrer un numÃ©ro de tÃ©lÃ©phone valide',
        VALIDATION_DATE: 'La date doit Ãªtre aujourd\'hui ou dans le futur'
    }
};

/**
 * Expressions rÃ©guliÃ¨res pour la validation
 * @type {Object}
 */
export const REGEX = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE: /^(?:(?:\+|00)33|0)[1-9](?:[\s.-]*\d{2}){4}$/,
    CITY_NAME: /^[a-zA-ZÃ€-Ã¿\s'-]{2,}$/
};

/**
 * Configuration des dÃ©partements franÃ§ais (mÃ©tropole uniquement, sans Corse)
 * @type {Object}
 */
export const DEPARTMENTS = {
    '75': { name: 'Paris', slug: 'paris' },
    '77': { name: 'Melun', slug: 'melun' },
    '78': { name: 'Versailles', slug: 'versailles' },
    '91': { name: 'Ã‰vry', slug: 'evry' },
    '92': { name: 'Nanterre', slug: 'nanterre' },
    '93': { name: 'Bobigny', slug: 'bobigny' },
    '94': { name: 'CrÃ©teil', slug: 'creteil' },
    '95': { name: 'Cergy', slug: 'cergy' },
    '29': { name: 'Brest', slug: 'brest' }
    // ... autres dÃ©partements
};



