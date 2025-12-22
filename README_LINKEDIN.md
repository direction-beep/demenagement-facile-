# Configuration LinkedIn pour la publication automatique des articles de blog

Ce document explique comment configurer l'intégration LinkedIn pour publier automatiquement les articles de blog sur LinkedIn.

## 📋 Prérequis

1. Un compte LinkedIn avec accès développeur
2. Une application LinkedIn créée sur [LinkedIn Developers](https://www.linkedin.com/developers/)
3. Les permissions nécessaires pour publier du contenu

## 🔧 Configuration étape par étape

### 1. Créer une application LinkedIn

1. Allez sur [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Cliquez sur "Create app"
3. Remplissez les informations :
   - **App name** : `VOC-Call Blog Publisher` (ou autre nom)
   - **LinkedIn Page** : Sélectionnez votre page LinkedIn (si vous publiez en tant que page)
   - **Privacy policy URL** : `https://voc-call.vercel.app/legal` (ou votre URL de politique de confidentialité)
   - **App logo** : Logo de votre choix
4. Acceptez les conditions d'utilisation

### 2. Configurer les produits LinkedIn

1. Dans votre application, allez dans l'onglet **"Products"**
2. Ajoutez le produit **"Sign In with LinkedIn using OpenID Connect"**
3. Ajoutez le produit **"Marketing Developer Platform"** (nécessaire pour publier du contenu)

### 3. Configurer les OAuth 2.0 redirect URLs

1. Dans l'onglet **"Auth"**
2. Ajoutez une redirect URL : `https://localhost` (pour les tests locaux, optionnel)
3. Notez vos **Client ID** et **Client Secret**

### 4. Obtenir un Access Token

#### Option A : Token pour un compte personnel (person)

1. Allez dans l'onglet **"Auth"**
2. Utilisez la section **"OAuth 2.0 scopes"**
3. Sélectionnez les scopes nécessaires :
   - `openid`
   - `profile`
   - `email`
   - `w_member_social` (pour publier du contenu)
4. Copiez l'URL de génération d'authorization code
5. Collez l'URL dans votre navigateur et autorisez l'application
6. Récupérez le code depuis l'URL de redirection
7. Utilisez ce code pour obtenir un access token avec une requête POST :

```bash
curl -X POST https://www.linkedin.com/oauth/v2/accessToken \
  -d "grant_type=authorization_code" \
  -d "code=YOUR_AUTHORIZATION_CODE" \
  -d "redirect_uri=YOUR_REDIRECT_URI" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET"
```

8. Notez le `access_token` retourné

#### Option B : Token pour une page LinkedIn (organization)

Si vous souhaitez publier en tant que page LinkedIn :

1. Suivez les mêmes étapes qu'Option A
2. Ajoutez le scope `w_organization_social`
3. Récupérez l'URN de votre page avec :
   ```bash
   curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
     "https://api.linkedin.com/v2/organizationalEntityAcls?q=roleAssignee"
   ```
4. Notez l'URN (format : `urn:li:organization:xxxxx`)

### 5. Configurer les secrets GitHub

1. Allez dans votre repository GitHub
2. Naviguez vers **Settings** → **Secrets and variables** → **Actions**
3. Cliquez sur **"New repository secret"**
4. Ajoutez les secrets suivants :

| Secret | Valeur | Description |
|--------|--------|-------------|
| `LINKEDIN_CLIENT_ID` | Votre Client ID | ID de l'application LinkedIn |
| `LINKEDIN_CLIENT_SECRET` | Votre Client Secret | Secret de l'application LinkedIn |
| `LINKEDIN_ACCESS_TOKEN` | Votre Access Token | Token d'accès OAuth 2.0 |
| `LINKEDIN_PERSON_URN` | `urn:li:person:xxxxx` ou `urn:li:organization:xxxxx` | (Optionnel) URN du compte/page |

⚠️ **Note** : L'access token expire après 60 jours. Vous devrez le renouveler périodiquement ou utiliser un refresh token (voir section ci-dessous).

## 🔄 Renouvellement automatique du token (optionnel)

Pour éviter de renouveler manuellement le token tous les 60 jours, vous pouvez :

1. Implémenter un système de refresh token (LinkedIn ne supporte pas toujours le refresh token, vérifiez la documentation)
2. Utiliser un service externe pour gérer les tokens
3. Créer un script cron pour renouveler automatiquement le token

## 📝 Format des posts LinkedIn

Les posts publiés automatiquement suivent ce format :

```
📢 Nouvel article sur notre blog : "[Titre de l'article]"

[Extrait de l'article]

🎯 Points clés :
• [Catégorie]
• Temps de lecture : [X min]

📖 Lire l'article complet : [URL]

#CentreAppel #ServiceClient #Externalisation #[Catégorie]

#VOCCall #BPO #CallCenter
```

## 🧪 Test local

Pour tester l'intégration localement :

1. Créez un fichier `.env` (ou exportez les variables d'environnement) :
```bash
export LINKEDIN_CLIENT_ID="votre_client_id"
export LINKEDIN_CLIENT_SECRET="votre_client_secret"
export LINKEDIN_ACCESS_TOKEN="votre_access_token"
export LINKEDIN_PERSON_URN="urn:li:person:xxxxx"  # optionnel
export SITE_URL="https://voc-call.vercel.app"
```

2. Testez avec un article de test :
```bash
node scripts/linkedin.js blog/_drafts/[slug]/meta.json
```

## 🐛 Dépannage

### Erreur : "Invalid access token"
- Vérifiez que votre token n'a pas expiré (durée de vie : 60 jours)
- Vérifiez que vous avez les bons scopes (`w_member_social` ou `w_organization_social`)

### Erreur : "Insufficient permissions"
- Vérifiez que l'application a bien le produit "Marketing Developer Platform"
- Vérifiez que les scopes OAuth incluent `w_member_social`

### Erreur : "Invalid URN"
- Vérifiez le format de l'URN : `urn:li:person:xxxxx` ou `urn:li:organization:xxxxx`
- Si vous ne fournissez pas `LINKEDIN_PERSON_URN`, le script tentera de le récupérer automatiquement

### Le post n'apparaît pas sur LinkedIn
- Vérifiez les logs GitHub Actions pour voir les erreurs détaillées
- Vérifiez que le token a bien les permissions de publication
- Attendez quelques minutes (la publication peut prendre un peu de temps)

## 📚 Ressources

- [LinkedIn API Documentation](https://learn.microsoft.com/en-us/linkedin/)
- [UGC Posts API](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/community-management/shares/ugc-post-api)
- [OAuth 2.0 Authentication](https://learn.microsoft.com/en-us/linkedin/shared/authentication/authentication)

## 🔒 Sécurité

- ⚠️ **Ne jamais commiter les secrets dans le code**
- ⚠️ **Utilisez toujours les GitHub Secrets pour stocker les credentials**
- ⚠️ **Renouvelez régulièrement vos tokens d'accès**
- ⚠️ **Limitez les permissions aux scopes strictement nécessaires**


