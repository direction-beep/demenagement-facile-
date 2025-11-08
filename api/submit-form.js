// ============================================
// API ROUTE VERCEL - SOUMISSION DE FORMULAIRE
// ============================================

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    // Vérifier que c'est une requête POST
    if (req.method !== 'POST') {
        return res.status(405).json({ 
            success: false, 
            error: 'Method not allowed' 
        });
    }

    try {
        const data = req.body;

        // Validation des données côté serveur
        const validation = validateFormData(data);
        if (!validation.isValid) {
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                errors: validation.errors
            });
        }

        // Protection contre le spam (rate limiting basique)
        // Note: Pour une protection plus robuste, utilisez un service comme Upstash Redis
        
        // Préparer les données pour l'email
        const emailData = formatEmailData(data);
        
        // Envoyer l'email (utiliser un service comme Resend, SendGrid, ou Nodemailer)
        // Pour l'instant, on simule l'envoi
        const emailSent = await sendEmail(emailData);
        
        // Optionnel: Sauvegarder dans une base de données
        // await saveToDatabase(data);

        // Réponse de succès
        return res.status(200).json({
            success: true,
            message: 'Votre demande a été envoyée avec succès. Nous vous contacterons sous 24h.',
            data: {
                id: generateId(),
                timestamp: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('Error processing form submission:', error);
        return res.status(500).json({
            success: false,
            error: 'Une erreur est survenue lors de l\'envoi de votre demande. Veuillez réessayer.',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// ============================================
// VALIDATION DES DONNÉES
// ============================================

function validateFormData(data) {
    const errors = {};
    let isValid = true;

    // Validation nom
    if (!data.nom || !isValidName(data.nom)) {
        errors.nom = 'Veuillez entrer un nom valide';
        isValid = false;
    }

    // Validation prénom
    if (!data.prenom || !isValidName(data.prenom)) {
        errors.prenom = 'Veuillez entrer un prénom valide';
        isValid = false;
    }

    // Validation email
    if (!data.email || !isValidEmail(data.email)) {
        errors.email = 'Veuillez entrer une adresse email valide';
        isValid = false;
    }

    // Validation téléphone
    if (!data.telephone || !isValidPhone(data.telephone)) {
        errors.telephone = 'Veuillez entrer un numéro de téléphone valide';
        isValid = false;
    }

    // Validation adresse de départ
    if (!data['adresse-depart'] || !isValidAddress(data['adresse-depart'])) {
        errors['adresse-depart'] = 'Veuillez entrer une adresse de départ valide';
        isValid = false;
    }

    // Validation adresse d'arrivée
    if (!data['adresse-arrivee'] || !isValidAddress(data['adresse-arrivee'])) {
        errors['adresse-arrivee'] = 'Veuillez entrer une adresse d\'arrivée valide';
        isValid = false;
    }

    // Validation ville de départ
    if (!data['ville-depart'] || data['ville-depart'].trim().length < 2) {
        errors['ville-depart'] = 'Veuillez entrer une ville de départ valide';
        isValid = false;
    }

    // Validation ville d'arrivée
    if (!data['ville-arrivee'] || data['ville-arrivee'].trim().length < 2) {
        errors['ville-arrivee'] = 'Veuillez entrer une ville d\'arrivée valide';
        isValid = false;
    }

    // Validation date
    if (!data.date || !isValidDate(data.date)) {
        errors.date = 'Veuillez entrer une date valide';
        isValid = false;
    }

    // Validation type de logement
    if (!data['type-logement']) {
        errors['type-logement'] = 'Veuillez sélectionner un type de logement';
        isValid = false;
    }

    // Protection contre le spam (vérifier les champs honeypot)
    if (data.website || data.url) {
        errors.spam = 'Spam détecté';
        isValid = false;
    }

    return { isValid, errors };
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidName(name) {
    const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]{2,}$/;
    return nameRegex.test((name || '').trim());
}

function isValidAddress(address) {
    const addressRegex = /^[0-9a-zA-ZÀ-ÿ\s',.-]{5,}$/;
    return addressRegex.test((address || '').trim());
}

function isValidPhone(phone) {
    // Format français: accepte +33, 0033, 0, avec ou sans espaces/points/tirets
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function isValidDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date instanceof Date && !isNaN(date) && date >= today;
}

// ============================================
// FORMATAGE DES DONNÉES POUR L'EMAIL
// ============================================

function formatEmailData(data) {
    // Extraire l'email du client pour le reply-to
    const clientEmail = data.email || '';
    
    return {
        to: process.env.CONTACT_EMAIL || 'contact@demenagement-zen.fr',
        replyTo: clientEmail,
        subject: `Nouvelle demande de devis - ${data['ville-depart']} → ${data['ville-arrivee']}`,
        html: `
            <h2>Nouvelle demande de devis</h2>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Nom</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.nom)}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Prénom</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.prenom)}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Adresse de départ</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data['adresse-depart'])}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Adresse d'arrivée</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data['adresse-arrivee'])}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Ville de départ</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data['ville-depart'])}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Ville d'arrivée</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data['ville-arrivee'])}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Date souhaitée</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${formatDate(data.date)}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Type de logement</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data['type-logement'])}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.email)}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Téléphone</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.telephone)}</td>
                </tr>
                ${data.message ? `
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Message</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.message)}</td>
                </tr>
                ` : ''}
            </table>
            <p style="margin-top: 20px; color: #666; font-size: 12px;">
                Date de réception: ${new Date().toLocaleString('fr-FR')}
            </p>
        `,
        text: `
Nouvelle demande de devis

Nom: ${data.nom}
Prénom: ${data.prenom}
Adresse de départ: ${data['adresse-depart']}
Adresse d'arrivée: ${data['adresse-arrivee']}
Ville de départ: ${data['ville-depart']}
Ville d'arrivée: ${data['ville-arrivee']}
Date souhaitée: ${formatDate(data.date)}
Type de logement: ${data['type-logement']}
Email: ${data.email}
Téléphone: ${data.telephone}
${data.message ? `Message: ${data.message}` : ''}

Date de réception: ${new Date().toLocaleString('fr-FR')}
        `
    };
}

function escapeHtml(text) {
    if (!text) return '';
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// ============================================
// ENVOI D'EMAIL
// ============================================

async function sendEmail(emailData) {
    try {
        // Vérifier que la clé API Resend est configurée
        if (!process.env.RESEND_API_KEY) {
            console.error('RESEND_API_KEY is not configured');
            throw new Error('Service email non configuré');
        }

        // Vérifier que l'email de destination est configuré
        const toEmail = process.env.CONTACT_EMAIL || 'contact@demenagement-zen.fr';
        
        // Envoyer l'email via Resend
        // Format from: peut être "email@domain.com" ou "Name <email@domain.com>"
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
        
        const emailPayload = {
            from: fromEmail,
            to: toEmail,
            subject: emailData.subject,
            html: emailData.html,
            text: emailData.text
        };

        // Ajouter replyTo si disponible
        if (emailData.replyTo) {
            emailPayload.replyTo = emailData.replyTo;
        }

        const result = await resend.emails.send(emailPayload);

        console.log('Email sent successfully:', result);
        return { success: true, id: result.id };
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

// ============================================
// UTILITAIRES
// ============================================

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

