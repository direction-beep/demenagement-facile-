// ============================================
// VALIDATION ET UX DES FORMULAIRES
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialiser la validation des formulaires
    initFormValidation();
    initFormUX();
});

function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Validation en temps réel
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
        
        // Validation à la soumission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                submitForm(form);
            } else {
                // Focus sur le premier champ en erreur
                const firstError = form.querySelector('.error');
                if (firstError) {
                    firstError.focus();
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Supprimer les classes d'erreur précédentes
    field.classList.remove('error', 'valid');
    
    // Vérifier si le champ est requis
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Ce champ est obligatoire';
    }
    
    // Validation spécifique par type
    if (value && field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Veuillez entrer une adresse email valide';
        }
    }
    
    if (value && field.type === 'tel') {
        const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Veuillez entrer un numéro de téléphone valide';
        }
    }
    
    if (value && field.type === 'date') {
        const selectedDate = new Date(field.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            isValid = false;
            errorMessage = 'La date ne peut pas être dans le passé';
        }
    }
    
    // Ajouter les classes et messages
    if (isValid && value) {
        field.classList.add('valid');
        removeErrorMessage(field);
    } else if (!isValid) {
        field.classList.add('error');
        showErrorMessage(field, errorMessage);
    }
    
    return isValid;
}

function showErrorMessage(field, message) {
    removeErrorMessage(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.setAttribute('role', 'alert');
    
    field.parentElement.appendChild(errorDiv);
}

function removeErrorMessage(field) {
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

function initFormUX() {
    // Améliorer l'UX des champs de formulaire
    const inputs = document.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        // Animation du label
        if (input.value) {
            input.classList.add('has-value');
        }
        
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            if (this.value) {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
        
        // Animation de remplissage
        input.addEventListener('input', function() {
            if (this.value) {
                this.classList.add('has-value');
            }
        });
    });
    
    // Améliorer les selects
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        select.addEventListener('change', function() {
            if (this.value) {
                this.classList.add('has-value');
            }
        });
    });
}

function submitForm(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton ? submitButton.textContent : '';
    
    // Afficher l'état de chargement
    if (submitButton) {
        submitButton.classList.add('loading');
        submitButton.disabled = true;
    }
    
    // Récupérer les données du formulaire
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Simuler l'envoi (remplacer par un vrai appel API)
    setTimeout(() => {
        // Afficher le message de succès
        showSuccessMessage(form);
        
        // Réinitialiser le formulaire
        form.reset();
        form.querySelectorAll('.valid, .error, .has-value').forEach(el => {
            el.classList.remove('valid', 'error', 'has-value');
        });
        form.querySelectorAll('.error-message').forEach(el => el.remove());
        
        // Réinitialiser le bouton
        if (submitButton) {
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    }, 1500);
}

function showSuccessMessage(form) {
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.innerHTML = `
        <div class="success-content">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div>
                <strong>Demande envoyée avec succès !</strong>
                <p>Nous vous contacterons sous 24h.</p>
            </div>
        </div>
    `;
    
    form.parentElement.insertBefore(successDiv, form);
    
    // Animation d'apparition
    setTimeout(() => {
        successDiv.classList.add('show');
    }, 10);
    
    // Supprimer après 5 secondes
    setTimeout(() => {
        successDiv.classList.remove('show');
        setTimeout(() => {
            successDiv.remove();
        }, 300);
    }, 5000);
}

