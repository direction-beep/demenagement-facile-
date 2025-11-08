// ============================================
// API ROUTE VERCEL - SOUMISSION DE FORMULAIRE
// ============================================

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    // VÃ©rifier que c'est une requÃªte POST
    if (req.method !== 'POST') {
        return res.status(405).json({ 
            success: false, 
            error: 'Method not allowed' 
        });
    }

    try {
        const data = req.body;

        // Validation des donnÃ©es cÃ´tÃ© serveur
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
        
        // PrÃ©parer les donnÃ©es pour l'email
        const emailData = formatEmailData(data);
        
        // Envoyer l'email (utiliser un service comme Resend, SendGrid, ou Nodemailer)
        // Pour l'instant, on simule l'envoi
        const emailSent = await sendEmail(emailData);
        
        // Optionnel: Sauvegarder dans une base de donnÃ©es
        // await saveToDatabase(data);

        // RÃ©ponse de succÃ¨s
        return res.status(200).json({
            success: true,
            message: 'Votre demande a Ã©tÃ© envoyÃ©e avec succÃ¨s. Nous vous contacterons sous 24h.',
            data: {
                id: generateId(),
                timestamp: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('Error processing form submission:', error);
        return res.status(500).json({
            success: false,
            error: 'Une erreur est survenue lors de l\'envoi de votre demande. Veuillez rÃ©essayer.',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// ============================================
// VALIDATION DES DONNÃ‰ES
// ============================================

function validateFormData(data) {
    const errors = {};
    let isValid = true;

    // Validation email
    if (!data.email || !isValidEmail(data.email)) {
        errors.email = 'Veuillez entrer une adresse email valide';
        isValid = false;
    }

    // Validation tÃ©lÃ©phone
    if (!data.telephone || !isValidPhone(data.telephone)) {
        errors.telephone = 'Veuillez entrer un numÃ©ro de tÃ©lÃ©phone valide';
        isValid = false;
    }

    // Validation ville de dÃ©part
    if (!data['ville-depart'] || data['ville-depart'].trim().length < 2) {
        errors['ville-depart'] = 'Veuillez entrer une ville de dÃ©part valide';
        isValid = false;
    }

    // Validation ville d'arrivÃ©e
    if (!data['ville-arrivee'] || data['ville-arrivee'].trim().length < 2) {
        errors['ville-arrivee'] = 'Veuillez entrer une ville d\'arrivÃ©e valide';
        isValid = false;
    }

    // Validation date
    if (!data.date || !isValidDate(data.date)) {
        errors.date = 'Veuillez entrer une date valide';
        isValid = false;
    }

    // Validation type de logement
    if (!data['type-logement']) {
        errors['type-logement'] = 'Veuillez sÃ©lectionner un type de logement';
        isValid = false;
    }

    // Protection contre le spam (vÃ©rifier les champs honeypot)
    if (data.website || data.url) {
        errors.spam = 'Spam dÃ©tectÃ©';
        isValid = false;
    }

    return { isValid, errors };
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Format franÃ§ais: accepte +33, 0033, 0, avec ou sans espaces/points/tirets
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
// FORMATAGE DES DONNÃ‰ES POUR L'EMAIL
// ============================================

function formatEmailData(data) {
    // Extraire l'email du client pour le reply-to
    const clientEmail = data.email || '';
    
    return {
        to: process.env.CONTACT_EMAIL || 'contact@demenagement-zen.fr',
        replyTo: clientEmail,
        subject: `Nouvelle demande de devis - ${data['ville-depart']} â†’ ${data['ville-arrivee']}`,
        html: `
            <h2>Nouvelle demande de devis</h2>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Ville de dÃ©part</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data['ville-depart'])}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Ville d'arrivÃ©e</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data['ville-arrivee'])}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Date souhaitÃ©e</td>
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
                    <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">TÃ©lÃ©phone</td>
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
                Date de rÃ©ception: ${new Date().toLocaleString('fr-FR')}
            </p>
        `,
        text: `
Nouvelle demande de devis

Ville de dÃ©part: ${data['ville-depart']}
Ville d'arrivÃ©e: ${data['ville-arrivee']}
Date souhaitÃ©e: ${formatDate(data.date)}
Type de logement: ${data['type-logement']}
Email: ${data.email}
TÃ©lÃ©phone: ${data.telephone}
${data.message ? `Message: ${data.message}` : ''}

Date de rÃ©ception: ${new Date().toLocaleString('fr-FR')}
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
        // VÃ©rifier que la clÃ© API Resend est configurÃ©e
        if (!process.env.RESEND_API_KEY) {
            console.error('RESEND_API_KEY is not configured');
            throw new Error('Service email non configurÃ©');
        }

        // VÃ©rifier que l'email de destination est configurÃ©
        const toEmail = process.env.CONTACT_EMAIL || 'contact@demenagement-zen.fr';
        
        // Envoyer l'email via Resend
        // Format from: peut Ãªtre "email@domain.com" ou "Name <email@domain.com>"
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


