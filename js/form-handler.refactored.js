/**
 * ============================================
 * GESTIONNAIRE DE FORMULAIRE AVANCÉ (REFACTORISÉ)
 * ============================================
 * 
 * Gère la validation, la soumission et les notifications
 * pour tous les formulaires du site.
 * 
 * @version 2.0.0
 * @author Déménagement Zen
 */

import { CONFIG } from './utils/constants.js';
import { validateForm } from './utils/validators.js';
import { submitForm, retryRequest } from './utils/api-client.js';
import { $, addClass, removeClass, disableElement, enableElement, hasClass } from './utils/dom-helpers.js';
import { NotificationManager } from './utils/NotificationManager.js';

/**
 * Classe pour gérer les formulaires
 */
export class FormHandler {
    /**
     * @param {HTMLFormElement} form - L'élément formulaire
     * @param {Object} options - Options de configuration
     */
    constructor(form, options = {}) {
        if (!form || !(form instanceof HTMLFormElement)) {
            throw new Error('FormHandler requires a valid form element');
        }
        
        this.form = form;
        this.options = {
            validationRules: this.getDefaultValidationRules(),
            showNotifications: true,
            autoReset: true,
            ...options
        };
        
        this.submitButton = form.querySelector('button[type="submit"]');
        this.isSubmitting = false;
        this.retryCount = 0;
        this.notificationManager = new NotificationManager();
        
        this.init();
    }
    
    /**
     * Initialise le gestionnaire de formulaire
     */
    init() {
        this.addHoneypotField();
        this.setupEventListeners();
        this.setupRealTimeValidation();
    }
    
    /**
     * Retourne les règles de validation par défaut
     * @returns {Object} Les règles de validation
     */
    getDefaultValidationRules() {
        return {
            'ville-depart': {
                required: true,
                type: 'city',
                message: 'Veuillez entrer une ville de départ valide'
            },
            'ville-arrivee': {
                required: true,
                type: 'city',
                message: 'Veuillez entrer une ville d\'arrivée valide'
            },
            'date': {
                required: true,
                type: 'date',
                message: CONFIG.MESSAGES.VALIDATION_DATE
            },
            'email': {
                required: true,
                type: 'email',
                message: CONFIG.MESSAGES.VALIDATION_EMAIL
            },
            'telephone': {
                required: true,
                type: 'tel',
                message: CONFIG.MESSAGES.VALIDATION_PHONE
            },
            'type-logement': {
                required: true,
                message: 'Veuillez sélectionner un type de logement'
            }
        };
    }
    
    /**
     * Ajoute un champ honeypot pour la protection anti-spam
     */
    addHoneypotField() {
        const existingHoneypot = this.form.querySelector('input[name="website"]');
        if (existingHoneypot) {
            return;
        }
        
        const honeypot = document.createElement('input');
        honeypot.type = 'text';
        honeypot.name = 'website';
        honeypot.style.cssText = 'position:absolute;left:-9999px;opacity:0;pointer-events:none;';
        honeypot.setAttribute('tabindex', '-1');
        honeypot.setAttribute('autocomplete', 'off');
        honeypot.setAttribute('aria-hidden', 'true');
        this.form.appendChild(honeypot);
    }
    
    /**
     * Configure les écouteurs d'événements
     */
    setupEventListeners() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }
    
    /**
     * Configure la validation en temps réel
     */
    setupRealTimeValidation() {
        const inputs = this.form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Validation au blur
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            // Validation en temps réel pour les champs modifiés
            input.addEventListener('input', () => {
                if (hasClass(input, 'error') || hasClass(input, 'valid')) {
                    this.validateField(input);
                }
            });
            
            // Validation au changement pour les selects
            if (input.tagName === 'SELECT') {
                input.addEventListener('change', () => {
                    this.validateField(input);
                });
            }
        });
    }
    
    /**
     * Valide un champ individuel
     * @param {HTMLElement} field - Le champ à valider
     * @returns {boolean} True si le champ est valide
     */
    validateField(field) {
        const fieldName = field.name;
        const rules = this.options.validationRules[fieldName];
        
        if (!rules) {
            return true; // Pas de règles = pas de validation
        }
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        const validation = validateForm(data, { [fieldName]: rules });
        
        if (validation.isValid) {
            this.showFieldValid(field);
            return true;
        } else {
            this.showFieldError(field, validation.errors[fieldName]);
            return false;
        }
    }
    
    /**
     * Affiche un champ comme valide
     * @param {HTMLElement} field - Le champ
     */
    showFieldValid(field) {
        removeClass(field, 'error');
        addClass(field, 'valid');
        this.removeErrorMessage(field);
    }
    
    /**
     * Affiche un champ comme invalide
     * @param {HTMLElement} field - Le champ
     * @param {string} message - Le message d'erreur
     */
    showFieldError(field, message) {
        removeClass(field, 'valid');
        addClass(field, 'error');
        this.showErrorMessage(field, message);
    }
    
    /**
     * Affiche un message d'erreur pour un champ
     * @param {HTMLElement} field - Le champ
     * @param {string} message - Le message d'erreur
     */
    showErrorMessage(field, message) {
        this.removeErrorMessage(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.setAttribute('role', 'alert');
        errorDiv.setAttribute('aria-live', 'polite');
        
        field.parentElement.appendChild(errorDiv);
        
        // Animation
        setTimeout(() => {
            addClass(errorDiv, 'show');
        }, 10);
    }
    
    /**
     * Supprime le message d'erreur d'un champ
     * @param {HTMLElement} field - Le champ
     */
    removeErrorMessage(field) {
        const existingError = field.parentElement.querySelector('.error-message');
        if (existingError) {
            removeClass(existingError, 'show');
            setTimeout(() => {
                existingError.remove();
            }, 300);
        }
    }
    
    /**
     * Gère la soumission du formulaire
     */
    async handleSubmit() {
        if (this.isSubmitting) {
            return;
        }
        
        // Vérifier le champ honeypot
        const honeypot = this.form.querySelector('input[name="website"]');
        if (honeypot && honeypot.value) {
            console.warn('Spam detected: honeypot field filled');
            return;
        }
        
        // Valider tous les champs
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        const validation = validateForm(data, this.options.validationRules);
        
        if (!validation.isValid) {
            // Afficher les erreurs
            Object.keys(validation.errors).forEach(fieldName => {
                const field = this.form.querySelector(`[name="${fieldName}"]`);
                if (field) {
                    this.showFieldError(field, validation.errors[fieldName]);
                }
            });
            
            // Focus sur le premier champ en erreur
            const firstError = this.form.querySelector('.error');
            if (firstError) {
                firstError.focus();
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            
            if (this.options.showNotifications) {
                this.notificationManager.show(
                    'Veuillez corriger les erreurs dans le formulaire',
                    'error'
                );
            }
            
            return;
        }
        
        // Soumettre le formulaire
        this.isSubmitting = true;
        this.setLoadingState(true);
        
        try {
            const result = await retryRequest(() => submitForm(data));
            
            if (result.success) {
                this.handleSuccess(result);
            } else {
                this.handleError(result);
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.handleError({
                error: CONFIG.MESSAGES.FORM_ERROR,
                retry: true
            });
        } finally {
            this.isSubmitting = false;
            this.setLoadingState(false);
        }
    }
    
    /**
     * Gère le succès de la soumission
     * @param {Object} result - Le résultat de l'API
     */
    handleSuccess(result) {
        if (this.options.showNotifications) {
            this.notificationManager.show(
                result.message || CONFIG.MESSAGES.FORM_SUCCESS,
                'success'
            );
        }
        
        if (this.options.autoReset) {
            this.resetForm();
        }
        
        this.retryCount = 0;
        
        // Tracker l'événement si Google Analytics est disponible
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                'event_category': 'engagement',
                'event_label': 'Devis request'
            });
        }
    }
    
    /**
     * Gère les erreurs de soumission
     * @param {Object} result - Le résultat de l'API
     */
    handleError(result) {
        // Gérer les erreurs de validation
        if (result.errors) {
            Object.keys(result.errors).forEach(fieldName => {
                const field = this.form.querySelector(`[name="${fieldName}"]`);
                if (field) {
                    this.showFieldError(field, result.errors[fieldName]);
                }
            });
        }
        
        if (this.options.showNotifications) {
            const errorMessage = result.error || CONFIG.MESSAGES.FORM_ERROR;
            this.notificationManager.show(errorMessage, 'error');
        }
        
        // Proposer de réessayer si possible
        if (result.retry && this.retryCount < CONFIG.FORM.MAX_RETRIES) {
            this.retryCount++;
            setTimeout(() => {
                if (this.options.showNotifications) {
                    this.notificationManager.show(
                        `Tentative ${this.retryCount + 1}/${CONFIG.FORM.MAX_RETRIES + 1}...`,
                        'info'
                    );
                }
            }, 2000);
        }
    }
    
    /**
     * Définit l'état de chargement du bouton
     * @param {boolean} loading - True pour activer le chargement
     */
    setLoadingState(loading) {
        if (this.submitButton) {
            if (loading) {
                disableElement(this.submitButton);
                this.originalButtonText = this.submitButton.textContent;
                this.submitButton.innerHTML = '<span class="spinner"></span> Envoi en cours...';
            } else {
                enableElement(this.submitButton);
                if (this.originalButtonText) {
                    this.submitButton.textContent = this.originalButtonText;
                }
            }
        }
    }
    
    /**
     * Réinitialise le formulaire
     */
    resetForm() {
        this.form.reset();
        
        // Supprimer les classes de validation
        this.form.querySelectorAll('.valid, .error, .has-value').forEach(el => {
            removeClass(el, 'valid');
            removeClass(el, 'error');
            removeClass(el, 'has-value');
        });
        
        // Supprimer les messages d'erreur
        this.form.querySelectorAll('.error-message').forEach(el => el.remove());
    }
}

/**
 * Gestionnaire de notifications
 */
class NotificationManager {
    /**
     * Affiche une notification
     * @param {string} message - Le message à afficher
     * @param {string} type - Le type de notification (success, error, info)
     */
    show(message, type = 'info') {
        const notification = this.createNotification(message, type);
        document.body.appendChild(notification);
        
        // Animation d'apparition
        setTimeout(() => {
            addClass(notification, 'show');
        }, 10);
        
        // Fermeture automatique (sauf pour les erreurs)
        if (type !== 'error') {
            setTimeout(() => {
                this.hide(notification);
            }, CONFIG.FORM.NOTIFICATION_DURATION);
        }
    }
    
    /**
     * Crée un élément de notification
     * @param {string} message - Le message
     * @param {string} type - Le type
     * @returns {HTMLElement} L'élément de notification
     */
    createNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'assertive');
        
        const icon = this.getIcon(type);
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${icon}</span>
                <span class="notification-message">${message}</span>
                <button class="notification-close" aria-label="Fermer">×</button>
            </div>
        `;
        
        // Bouton de fermeture
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            this.hide(notification);
        });
        
        return notification;
    }
    
    /**
     * Retourne l'icône selon le type
     * @param {string} type - Le type de notification
     * @returns {string} Le SVG de l'icône
     */
    getIcon(type) {
        const icons = {
            success: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            error: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
            info: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
        };
        
        return icons[type] || icons.info;
    }
    
    /**
     * Cache une notification
     * @param {HTMLElement} notification - L'élément de notification
     */
    hide(notification) {
        removeClass(notification, 'show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }
}

// Initialisation automatique
document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner tous les formulaires de devis
    const forms = document.querySelectorAll('form[id="devis"], form.hero-form, form[id*="devis"], form[class*="hero-form"]');
    
    if (forms.length === 0) {
        // Essayer une sélection plus large
        const allForms = document.querySelectorAll('form');
        allForms.forEach(form => {
            // Vérifier si le formulaire contient des champs de devis
            const hasDevisFields = form.querySelector('input[name="ville-depart"], input[name="ville-arrivee"], input[name="date"]');
            if (hasDevisFields) {
                try {
                    new FormHandler(form);
                } catch (error) {
                    console.error('Erreur lors de l\'initialisation du formulaire:', error);
                }
            }
        });
    } else {
        forms.forEach(form => {
            try {
                new FormHandler(form);
            } catch (error) {
                console.error('Erreur lors de l\'initialisation du formulaire:', error);
            }
        });
    }
});

// Export pour utilisation dans d'autres modules
export { NotificationManager };


