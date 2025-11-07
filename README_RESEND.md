# Configuration Resend pour l'envoi d'emails

## ðŸš€ Configuration rapide

### 1. CrÃ©er un compte Resend

1. Allez sur [https://resend.com](https://resend.com)
2. CrÃ©ez un compte gratuit (100 emails/jour)
3. VÃ©rifiez votre email

### 2. Obtenir votre clÃ© API

1. Connectez-vous Ã  votre dashboard Resend
2. Allez dans **API Keys**
3. Cliquez sur **Create API Key**
4. Donnez un nom (ex: "DÃ©mÃ©nagement Zen Production")
5. Copiez la clÃ© API (elle commence par `re_`)

### 3. Configurer le domaine d'envoi (Optionnel mais recommandÃ©)

Pour envoyer depuis votre propre domaine (ex: `noreply@demenagement-zen.fr`) :

1. Allez dans **Domains**
2. Cliquez sur **Add Domain**
3. Entrez votre domaine (ex: `demenagement-zen.fr`)
4. Ajoutez les enregistrements DNS fournis par Resend :
   - **SPF** : `v=spf1 include:resend.com ~all`
   - **DKIM** : Les enregistrements fournis par Resend
   - **DMARC** : `v=DMARC1; p=none; rua=mailto:dmarc@demenagement-zen.fr`

5. Attendez la vÃ©rification (peut prendre quelques minutes)

### 4. Configurer les variables d'environnement dans Vercel

1. Allez dans votre projet Vercel
2. Cliquez sur **Settings** â†’ **Environment Variables**
3. Ajoutez les variables suivantes :

```
RESEND_API_KEY=re_xxxxxxxxxxxxx
CONTACT_EMAIL=contact@demenagement-zen.fr
RESEND_FROM_EMAIL=DÃ©mÃ©nagement Zen <noreply@demenagement-zen.fr>
```

**Note** : Si vous n'avez pas configurÃ© de domaine, utilisez l'email fourni par Resend :
```
RESEND_FROM_EMAIL=onboarding@resend.dev
```

### 5. Installer la dÃ©pendance

La dÃ©pendance `resend` est dÃ©jÃ  ajoutÃ©e dans `package.json`. Vercel l'installera automatiquement lors du dÃ©ploiement.

Si vous testez en local :

```bash
npm install
```

## ðŸ“§ Format des emails

Les emails envoyÃ©s contiennent :

- **Sujet** : `Nouvelle demande de devis - [Ville dÃ©part] â†’ [Ville arrivÃ©e]`
- **Format** : HTML et texte brut
- **Reply-To** : Email du client (pour rÃ©pondre directement)
- **Contenu** :
  - Ville de dÃ©part
  - Ville d'arrivÃ©e
  - Date souhaitÃ©e
  - Type de logement
  - Email du client
  - TÃ©lÃ©phone du client
  - Message (si fourni)

## ðŸ§ª Tester l'envoi d'emails

### Test local avec Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# DÃ©marrer le serveur de dÃ©veloppement
vercel dev
```

### Test en production

1. Remplissez un formulaire sur votre site
2. VÃ©rifiez que l'email arrive dans votre boÃ®te de rÃ©ception
3. VÃ©rifiez les logs Vercel pour d'Ã©ventuelles erreurs

## ðŸ” DÃ©pannage

### L'email n'est pas envoyÃ©

1. **VÃ©rifiez les logs Vercel** :
   - Allez dans votre projet Vercel
   - Section **Logs**
   - Filtrez par fonction `submit-form`

2. **VÃ©rifiez les variables d'environnement** :
   - Assurez-vous que `RESEND_API_KEY` est bien configurÃ©e
   - VÃ©rifiez que `CONTACT_EMAIL` est valide

3. **VÃ©rifiez votre quota Resend** :
   - Le plan gratuit permet 100 emails/jour
   - VÃ©rifiez dans votre dashboard Resend

### Erreur "Domain not verified"

Si vous utilisez votre propre domaine :
- VÃ©rifiez que les enregistrements DNS sont correctement configurÃ©s
- Attendez la propagation DNS (peut prendre jusqu'Ã  48h)
- Utilisez temporairement `onboarding@resend.dev` pour tester

### Erreur "Invalid API key"

- VÃ©rifiez que la clÃ© API commence par `re_`
- Assurez-vous qu'elle est correctement copiÃ©e dans Vercel
- RÃ©gÃ©nÃ©rez la clÃ© si nÃ©cessaire

## ðŸ“Š Monitoring

### Dashboard Resend

- Consultez les statistiques d'envoi dans votre dashboard Resend
- VÃ©rifiez le taux de dÃ©livrabilitÃ©
- Consultez les logs d'envoi

### Logs Vercel

- Les erreurs sont loggÃ©es dans Vercel
- Les succÃ¨s sont Ã©galement loggÃ©s avec l'ID de l'email

## ðŸ”’ SÃ©curitÃ©

- **Ne commitez jamais votre clÃ© API** dans Git
- Utilisez toujours les variables d'environnement
- RÃ©gÃ©nÃ©rez votre clÃ© API si elle est compromise
- Limitez les permissions de votre clÃ© API dans Resend

## ðŸ’° Tarification

- **Plan gratuit** : 100 emails/jour, 3 000 emails/mois
- **Plan Pro** : Ã€ partir de $20/mois pour plus d'emails
- Consultez [https://resend.com/pricing](https://resend.com/pricing) pour plus d'infos

## ðŸ“š Documentation

- [Documentation Resend](https://resend.com/docs)
- [API Reference](https://resend.com/docs/api-reference)
- [Best Practices](https://resend.com/docs/best-practices)



