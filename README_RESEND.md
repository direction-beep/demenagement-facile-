# Configuration Resend pour l'envoi d'emails

## ðŸš€ Configuration rapide

### 1. Créer un compte Resend

1. Allez sur [https://resend.com](https://resend.com)
2. Créez un compte gratuit (100 emails/jour)
3. Vérifiez votre email

### 2. Obtenir votre clé API

1. Connectez-vous à votre dashboard Resend
2. Allez dans **API Keys**
3. Cliquez sur **Create API Key**
4. Donnez un nom (ex: "Déménagement Zen Production")
5. Copiez la clé API (elle commence par `re_`)

### 3. Configurer le domaine d'envoi (Optionnel mais recommandé)

Pour envoyer depuis votre propre domaine (ex: `noreply@demenagement-zen.fr`) :

1. Allez dans **Domains**
2. Cliquez sur **Add Domain**
3. Entrez votre domaine (ex: `demenagement-zen.fr`)
4. Ajoutez les enregistrements DNS fournis par Resend :
   - **SPF** : `v=spf1 include:resend.com ~all`
   - **DKIM** : Les enregistrements fournis par Resend
   - **DMARC** : `v=DMARC1; p=none; rua=mailto:dmarc@demenagement-zen.fr`

5. Attendez la vérification (peut prendre quelques minutes)

### 4. Configurer les variables d'environnement dans Vercel

1. Allez dans votre projet Vercel
2. Cliquez sur **Settings** â†’ **Environment Variables**
3. Ajoutez les variables suivantes :

```
RESEND_API_KEY=re_xxxxxxxxxxxxx
CONTACT_EMAIL=contact@demenagement-zen.fr
RESEND_FROM_EMAIL=Déménagement Zen <noreply@demenagement-zen.fr>
```

**Note** : Si vous n'avez pas configuré de domaine, utilisez l'email fourni par Resend :
```
RESEND_FROM_EMAIL=onboarding@resend.dev
```

### 5. Installer la dépendance

La dépendance `resend` est déjà ajoutée dans `package.json`. Vercel l'installera automatiquement lors du déploiement.

Si vous testez en local :

```bash
npm install
```

## ðŸ“§ Format des emails

Les emails envoyés contiennent :

- **Sujet** : `Nouvelle demande de devis - [Ville départ] â†’ [Ville arrivée]`
- **Format** : HTML et texte brut
- **Reply-To** : Email du client (pour répondre directement)
- **Contenu** :
  - Ville de départ
  - Ville d'arrivée
  - Date souhaitée
  - Type de logement
  - Email du client
  - Téléphone du client
  - Message (si fourni)

## ðŸ§ª Tester l'envoi d'emails

### Test local avec Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Démarrer le serveur de développement
vercel dev
```

### Test en production

1. Remplissez un formulaire sur votre site
2. Vérifiez que l'email arrive dans votre boîte de réception
3. Vérifiez les logs Vercel pour d'éventuelles erreurs

## ðŸ” Dépannage

### L'email n'est pas envoyé

1. **Vérifiez les logs Vercel** :
   - Allez dans votre projet Vercel
   - Section **Logs**
   - Filtrez par fonction `submit-form`

2. **Vérifiez les variables d'environnement** :
   - Assurez-vous que `RESEND_API_KEY` est bien configurée
   - Vérifiez que `CONTACT_EMAIL` est valide

3. **Vérifiez votre quota Resend** :
   - Le plan gratuit permet 100 emails/jour
   - Vérifiez dans votre dashboard Resend

### Erreur "Domain not verified"

Si vous utilisez votre propre domaine :
- Vérifiez que les enregistrements DNS sont correctement configurés
- Attendez la propagation DNS (peut prendre jusqu'à 48h)
- Utilisez temporairement `onboarding@resend.dev` pour tester

### Erreur "Invalid API key"

- Vérifiez que la clé API commence par `re_`
- Assurez-vous qu'elle est correctement copiée dans Vercel
- Régénérez la clé si nécessaire

## ðŸ“Š Monitoring

### Dashboard Resend

- Consultez les statistiques d'envoi dans votre dashboard Resend
- Vérifiez le taux de délivrabilité
- Consultez les logs d'envoi

### Logs Vercel

- Les erreurs sont loggées dans Vercel
- Les succès sont également loggés avec l'ID de l'email

## ðŸ”’ Sécurité

- **Ne commitez jamais votre clé API** dans Git
- Utilisez toujours les variables d'environnement
- Régénérez votre clé API si elle est compromise
- Limitez les permissions de votre clé API dans Resend

## ðŸ’° Tarification

- **Plan gratuit** : 100 emails/jour, 3 000 emails/mois
- **Plan Pro** : Ã€ partir de $20/mois pour plus d'emails
- Consultez [https://resend.com/pricing](https://resend.com/pricing) pour plus d'infos

## ðŸ“š Documentation

- [Documentation Resend](https://resend.com/docs)
- [API Reference](https://resend.com/docs/api-reference)
- [Best Practices](https://resend.com/docs/best-practices)



