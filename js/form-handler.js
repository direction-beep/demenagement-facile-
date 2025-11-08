// ============================================
// GESTIONNAIRE DE FORMULAIRE AVANCÉ
// ============================================

const FORM_NETWORK_CONFIG = {
    timeoutMs: 15000,
    baseRetryDelay: 1500,
    maxRetries: 2
};

const SUPPORT_CONTACT = {
    phone: '01 23 45 67 89',
    email: 'contact@demenagement-zen.fr'
};

function isOffline() {
    return typeof navigator !== 'undefined' && navigator && navigator.onLine === false;
}

function wait(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
}

class FormHandler {
    constructor(form) {
        this.form = form;
        this.submitButton = form.querySelector('button[type="submit"]');
        this.isSubmitting = false;
        this.maxRetries = FORM_NETWORK_CONFIG.maxRetries;
        this.retryDelay = FORM_NETWORK_CONFIG.baseRetryDelay;
        this.requestTimeout = FORM_NETWORK_CONFIG.timeoutMs;
        
        this.init();
    }

    init() {
        // Ajouter un champ honeypot pour la protection anti-spam
        this.addHoneypotField();
        
        // Écouter la soumission du formulaire
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Validation en temps réel améliorée
        this.setupRealTimeValidation();
    }

    addHoneypotField() {
        // Champ honeypot invisible pour la protection anti-spam
        const honeypot = document.createElement('input');
        honeypot.type = 'text';
        honeypot.name = 'website';
        honeypot.style.display = 'none';
        honeypot.setAttribute('tabindex', '-1');
        honeypot.setAttribute('autocomplete', 'off');
        this.form.appendChild(honeypot);
    }

    setupRealTimeValidation() {
        const inputs = this.form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Validation au blur
            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            // Validation en temps réel pour les champs modifiés
            input.addEventListener('input', () => {
                if (input.classList.contains('error') || input.classList.contains('valid')) {
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

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Supprimer les classes précédentes
        field.classList.remove('error', 'valid');
        this.removeErrorMessage(field);

        // Validation des champs requis
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = this.getRequiredErrorMessage(field);
        }

        // Validation spécifique par type
        if (value) {
            switch (field.type) {
                case 'email':
                    if (!this.isValidEmail(value)) {
                        isValid = false;
                        errorMessage = 'Veuillez entrer une adresse email valide (ex: nom@exemple.fr)';
                    }
                    break;

                case 'tel':
                    if (!this.isValidPhone(value)) {
                        isValid = false;
                        errorMessage = 'Veuillez entrer un numéro de téléphone valide (ex: 06 12 34 56 78)';
                    }
                    break;

                case 'date':
                    if (!this.isValidDate(value)) {
                        isValid = false;
                        errorMessage = 'La date doit être aujourd\'hui ou dans le futur';
                    }
                    break;

                case 'text':
                    if (field.name === 'ville-depart' || field.name === 'ville-arrivee') {
                        if (value.length < 2) {
                            isValid = false;
                            errorMessage = 'Veuillez entrer au moins 2 caractères';
                        } else if (!this.isValidCityName(value)) {
                            isValid = false;
                            errorMessage = 'Veuillez entrer un nom de ville valide';
                        }
                    } else if (field.name === 'nom' || field.name === 'prenom') {
                        if (value.length < 2) {
                            isValid = false;
                            errorMessage = 'Veuillez entrer au moins 2 caractères';
                        } else if (!this.isValidName(value)) {
                            isValid = false;
                            errorMessage = 'Veuillez entrer un nom valide';
                        }
                    } else if (field.name === 'adresse-depart' || field.name === 'adresse-arrivee') {
                        if (value.length < 5) {
                            isValid = false;
                            errorMessage = 'Veuillez entrer au moins 5 caractères';
                        } else if (!this.isValidAddress(value)) {
                            isValid = false;
                            errorMessage = 'Veuillez entrer une adresse valide';
                        }
                    }
                    break;
            }
        }

        // Validation des selects
        if (field.tagName === 'SELECT' && field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Veuillez faire une sélection';
        }

        // Afficher le résultat
        if (isValid && value) {
            field.classList.add('valid');
        } else if (!isValid) {
            field.classList.add('error');
            this.showErrorMessage(field, errorMessage);
        }

        return isValid;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        // Format français: accepte +33, 0033, 0, avec ou sans espaces/points/tirets
        const cleaned = phone.replace(/\s/g, '');
        const phoneRegex = /^(?:(?:\+|00)33|0)[1-9](?:[\s.-]*\d{2}){4}$/;
        return phoneRegex.test(cleaned);
    }

    isValidDate(dateString) {
        const date = new Date(dateString);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date instanceof Date && !isNaN(date) && date >= today;
    }

    isValidCityName(city) {
        // Vérifier que c'est un nom de ville valide (lettres, espaces, tirets, apostrophes)
        const cityRegex = /^[a-zA-ZÀ-ÿ\s'-]{2,}$/;
        return cityRegex.test(city);
    }

    isValidName(name) {
        const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]{2,}$/;
        return nameRegex.test(name);
    }

    isValidAddress(address) {
        const addressRegex = /^[0-9a-zA-ZÀ-ÿ\s',.-]{5,}$/;
        return addressRegex.test(address);
    }

    getRequiredErrorMessage(field) {
        const label = field.previousElementSibling?.textContent || 'Ce champ';
        return `${label.replace('*', '').trim()} est obligatoire`;
    }

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
            errorDiv.classList.add('show');
        }, 10);
    }

    removeErrorMessage(field) {
        const existingError = field.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.classList.remove('show');
            setTimeout(() => {
                existingError.remove();
            }, 300);
        }
    }

    async handleSubmit() {
        // Empêcher les soumissions multiples
        if (this.isSubmitting) {
            return;
        }

        // Valider tous les champs
        const inputs = this.form.querySelectorAll('input, select, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            // Focus sur le premier champ en erreur
            const firstError = this.form.querySelector('.error');
            if (firstError) {
                firstError.focus();
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            this.showNotification('Veuillez corriger les erreurs dans le formulaire', 'error');
            return;
        }

        // Vérifier le champ honeypot (protection anti-spam)
        const honeypot = this.form.querySelector('input[name="website"]');
        if (honeypot && honeypot.value) {
            console.warn('Spam detected: honeypot field filled');
            return;
        }

        if (isOffline()) {
            this.showNotification('Vous semblez hors connexion. Vérifiez votre connexion internet avant de soumettre le formulaire.', 'error');
            return;
        }

        // Soumettre le formulaire
        this.isSubmitting = true;
        this.setLoadingState(true);

        try {
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData);

            const { response, result } = await this.submitWithRetry(data);

            if (response && response.ok && result && result.success) {
                this.handleSuccess(result);
            } else {
                this.handleError(result, response);
            }

        } catch (error) {
            console.error('Form submission error:', error);
            this.handleError({
                error: this.getNetworkErrorMessage(error)
            });
        } finally {
            this.isSubmitting = false;
            this.setLoadingState(false);
        }
    }

    handleSuccess(result) {
        // Afficher le message de succès
        this.showNotification(result.message || 'Votre demande a été envoyée avec succès !', 'success');
        
        // Réinitialiser le formulaire
        this.form.reset();
        this.form.querySelectorAll('.valid, .error, .has-value').forEach(el => {
            el.classList.remove('valid', 'error', 'has-value');
        });
        this.form.querySelectorAll('.error-message').forEach(el => el.remove());

        // Optionnel: Rediriger ou tracker l'événement
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                'event_category': 'engagement',
                'event_label': 'Devis request'
            });
        }
    }

    handleError(result = {}, response = null) {
        // Gérer les erreurs de validation
        if (result.errors) {
            Object.keys(result.errors).forEach(fieldName => {
                const field = this.form.querySelector(`[name="${fieldName}"]`);
                if (field) {
                    this.showErrorMessage(field, result.errors[fieldName]);
                }
            });
        }

        // Afficher le message d'erreur
        const errorMessage = this.getUserErrorMessage(result, response);
        this.showNotification(errorMessage, 'error');
    }

    setLoadingState(loading) {
        if (loading) {
            this.form.classList.add('form-submitting');
        } else {
            this.form.classList.remove('form-submitting');
        }

        if (this.submitButton) {
            if (loading) {
                this.submitButton.classList.add('loading');
                this.submitButton.disabled = true;
                this.originalButtonText = this.submitButton.textContent;
                this.submitButton.innerHTML = '<span class="spinner"></span> Envoi en cours...';
            } else {
                this.submitButton.classList.remove('loading');
                this.submitButton.disabled = false;
                if (this.originalButtonText) {
                    this.submitButton.textContent = this.originalButtonText;
                }
            }
        }
    }

    showNotification(message, type = 'info') {
        // Créer l'élément de notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'assertive');

        // Icône selon le type
        let icon = '';
        switch (type) {
            case 'success':
                icon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                break;
            case 'error':
                icon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
                break;
            default:
                icon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
        }

        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${icon}</span>
                <span class="notification-message">${message}</span>
                <button class="notification-close" aria-label="Fermer">×</button>
            </div>
        `;

        // Ajouter au DOM
        document.body.appendChild(notification);

        // Animation d'apparition
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // Bouton de fermeture
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            this.hideNotification(notification);
        });

        // Fermeture automatique après 5 secondes (sauf pour les erreurs)
        if (type !== 'error') {
            setTimeout(() => {
                this.hideNotification(notification);
            }, 5000);
        }
    }

    hideNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }

    async submitWithRetry(payload) {
        const totalAttempts = this.maxRetries + 1;
        let lastOutcome = null;

        for (let attempt = 1; attempt <= totalAttempts; attempt++) {
            if (attempt > 1) {
                const retryIndex = attempt - 2;
                await wait(this.getRetryDelay(retryIndex));
            }

            try {
                const outcome = await this.sendFormRequest(payload);
                lastOutcome = outcome;

                if (this.shouldRetryResponse(outcome.response, outcome.result) && attempt < totalAttempts) {
                    continue;
                }

                return outcome;
            } catch (error) {
                lastOutcome = { error };

                if (!(attempt < totalAttempts && this.shouldRetryError(error))) {
                    throw error;
                }
            }
        }

        if (lastOutcome?.response) {
            return lastOutcome;
        }

        if (lastOutcome?.error) {
            throw lastOutcome.error;
        }

        throw new Error('Soumission du formulaire impossible.');
    }

    async sendFormRequest(payload) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.requestTimeout);
        let response;

        try {
            response = await fetch('/api/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
                signal: controller.signal
            });
        } finally {
            clearTimeout(timeoutId);
        }

        let result = {};
        const contentType = response.headers?.get('Content-Type') || response.headers?.get('content-type') || '';

        if (contentType.includes('application/json')) {
            try {
                result = await response.json();
            } catch (parseError) {
                console.warn('Impossible de parser la réponse JSON du formulaire', parseError);
                result = { success: false, error: 'Réponse inattendue du serveur.' };
            }
        } else if (response.ok) {
            result = { success: true };
        } else {
            result = { success: false, error: 'Réponse inattendue du serveur.' };
        }

        return { response, result };
    }

    shouldRetryResponse(response, result) {
        if (!response) {
            return false;
        }

        if (response.status === 429) {
            return true;
        }

        if (response.status >= 500 && response.status < 600) {
            return true;
        }

        if (!response.ok && result && result.retry === true) {
            return true;
        }

        return false;
    }

    shouldRetryError(error) {
        if (!error) {
            return false;
        }

        if (isOffline()) {
            return false;
        }

        if (error.name === 'AbortError') {
            return true;
        }

        if (/NetworkError|Failed to fetch|TypeError/i.test(error.message)) {
            return true;
        }

        return false;
    }

    getRetryDelay(retryIndex) {
        return this.retryDelay * Math.pow(2, Math.max(0, retryIndex));
    }

    getNetworkErrorMessage(error) {
        if (isOffline()) {
            return 'Nous ne pouvons pas envoyer votre demande car votre appareil est hors connexion. Vérifiez votre connexion internet et réessayez.';
        }

        if (error?.name === 'AbortError') {
            return 'Le serveur met plus de temps que prévu à répondre. Vérifiez votre connexion et réessayez dans un instant.';
        }

        return 'Une erreur réseau est survenue. Vérifiez votre connexion et réessayez dans quelques instants.';
    }

    getUserErrorMessage(result = {}, response = null) {
        if (result.errors && Object.keys(result.errors).length > 0) {
            return 'Certains champs contiennent des erreurs. Merci de les corriger puis de renvoyer votre demande.';
        }

        if (isOffline()) {
            return 'Nous ne pouvons pas envoyer votre demande tant que vous êtes hors connexion. Reconnectez-vous puis réessayez.';
        }

        if (response) {
            if (response.status >= 500) {
                return `Nos serveurs rencontrent un problème temporaire (erreur ${response.status}). Réessayez dans quelques minutes ou contactez-nous au ${SUPPORT_CONTACT.phone}.`;
            }

            if (response.status === 429) {
                return 'Vous venez d\'effectuer plusieurs demandes très rapidement. Patientez quelques instants avant de réessayer.';
            }

            if (response.status >= 400 && response.status < 500 && !result.error) {
                return 'Impossible de valider votre demande pour le moment. Vérifiez les informations fournies ou contactez-nous pour obtenir de l\'aide.';
            }
        }

        if (result && result.error) {
            return `${result.error} Si le problème persiste, contactez-nous au ${SUPPORT_CONTACT.phone} ou à ${SUPPORT_CONTACT.email}.`;
        }

        return `Une erreur est survenue lors de l\'envoi du formulaire. Réessayez ou contactez notre équipe au ${SUPPORT_CONTACT.phone}.`;
    }
}

// ============================================
// INITIALISATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialiser tous les formulaires
    const forms = document.querySelectorAll('form[id="devis"], form.hero-form');
    forms.forEach(form => {
        new FormHandler(form);
    });
});



