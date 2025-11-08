# Backend pour les Formulaires - Configuration

## ðŸ“‹ Vue d'ensemble

Ce projet utilise une API serverless Vercel pour traiter les soumissions de formulaires. Le backend valide les données, envoie des emails de notification et gère les erreurs.

## ðŸš€ Configuration

### 1. Variables d'environnement

Créez un fichier `.env.local` à la racine du projet (ou configurez les variables dans Vercel) :

```env
# Email de réception des formulaires
CONTACT_EMAIL=contact@demenagement-zen.fr

# Option 1: Resend (Recommandé)
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Option 2: SendGrid
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx

# Option 3: SMTP (Nodemailer)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-password

# Environnement
NODE_ENV=production
```

### 2. Configuration de l'envoi d'email

#### Option 1: Resend (Recommandé)

1. Créez un compte sur [Resend](https://resend.com)
2. Obtenez votre clé API
3. Installez le package :
```bash
npm install resend
```

4. Décommentez et configurez dans `api/submit-form.js` :
```javascript
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);
return await resend.emails.send(emailData);
```

#### Option 2: SendGrid

1. Créez un compte sur [SendGrid](https://sendgrid.com)
2. Obtenez votre clé API
3. Installez le package :
```bash
npm install @sendgrid/mail
```

4. Décommentez et configurez dans `api/submit-form.js` :
```javascript
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
return await sgMail.send(emailData);
```

#### Option 3: SMTP (Nodemailer)

1. Installez le package :
```bash
npm install nodemailer
```

2. Décommentez et configurez dans `api/submit-form.js` :
```javascript
import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});
return await transporter.sendMail(emailData);
```

## ðŸ“ Structure des fichiers

```
api/
  â””â”€â”€ submit-form.js      # API route Vercel pour traiter les formulaires

js/
  â””â”€â”€ form-handler.js     # Gestionnaire de formulaire côté client

css/
  â””â”€â”€ styles.css          # Styles pour les notifications et validation
```

## ðŸ”’ Sécurité

### Protection anti-spam

- **Honeypot field** : Champ invisible détectant les bots
- **Validation côté serveur** : Double validation des données
- **Rate limiting** : Limitation du nombre de soumissions (à implémenter avec Upstash Redis)

### Validation

- Validation côté client en temps réel
- Validation côté serveur avant traitement
- Sanitization des données d'entrée
- Protection XSS avec `escapeHtml()`

## ðŸ§ª Test local

Pour tester l'API localement avec Vercel CLI :

```bash
# Installer Vercel CLI
npm i -g vercel

# Démarrer le serveur de développement
vercel dev
```

L'API sera accessible sur `http://localhost:3000/api/submit-form`

## ðŸ“Š Monitoring

### Logs Vercel

Les logs sont disponibles dans le dashboard Vercel :
- Allez dans votre projet
- Section "Logs"
- Filtrez par fonction `submit-form`

### Erreurs

Les erreurs sont loggées dans la console Vercel et retournées au client avec un message générique (détails uniquement en développement).

## ðŸ”„ Améliorations futures

- [ ] Intégration avec une base de données (Supabase, MongoDB)
- [ ] Rate limiting avec Upstash Redis
- [ ] Webhook pour notifications Slack/Discord
- [ ] Sauvegarde des soumissions dans un CRM
- [ ] Double opt-in pour les emails
- [ ] Analytics des soumissions

## ðŸ“ Notes

- L'API route est automatiquement déployée sur Vercel
- Les variables d'environnement doivent être configurées dans Vercel Dashboard
- Le service d'email doit être configuré avant la mise en production



