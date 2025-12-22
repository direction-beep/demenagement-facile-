# 🚀 Guide Rapide : Obtenir les Credentials LinkedIn

Ce guide vous accompagne étape par étape pour obtenir les credentials nécessaires à l'intégration LinkedIn.

## 📋 Résumé des credentials nécessaires

Vous aurez besoin de 4 valeurs à ajouter dans **GitHub Secrets** :

| Secret GitHub | Description | Où l'obtenir |
|---------------|-------------|--------------|
| `LINKEDIN_CLIENT_ID` | ID de l'application LinkedIn | Onglet "Auth" de votre app |
| `LINKEDIN_CLIENT_SECRET` | Secret de l'application | Onglet "Auth" de votre app |
| `LINKEDIN_ACCESS_TOKEN` | Token d'accès OAuth 2.0 | Via OAuth flow (voir ci-dessous) |
| `LINKEDIN_PERSON_URN` | URN du profil (optionnel) | Auto-détecté si non fourni |

---

## 🔧 Méthode 1 : Guide Automatisé (Recommandé)

Utilisez le script interactif :

```bash
node scripts/linkedin-setup-guide.js
```

Le script vous guidera pour :
- Créer une application LinkedIn
- Obtenir les Client ID et Secret
- Générer un Access Token
- Tester les credentials

---

## 📝 Méthode 2 : Guide Manuel

### ÉTAPE 1 : Créer une Application LinkedIn

1. Allez sur **[LinkedIn Developers](https://www.linkedin.com/developers/apps)**
2. Cliquez sur **"Create app"**
3. Remplissez le formulaire :
   - **App name** : `VOC-Call Blog Publisher`
   - **LinkedIn Page** : Votre page LinkedIn (si vous publiez en tant que page)
   - **Privacy policy URL** : `https://voc-call.vercel.app/legal`
   - **App logo** : Logo de votre choix
4. Acceptez les conditions et créez l'app

### ÉTAPE 2 : Activer les Produits Nécessaires

1. Dans votre application, allez dans l'onglet **"Products"**
2. Cliquez sur **"Get started"** pour :
   - ✅ **Sign In with LinkedIn using OpenID Connect**
   - ✅ **Marketing Developer Platform** (nécessaire pour publier du contenu)

### ÉTAPE 3 : Récupérer Client ID et Client Secret

1. Allez dans l'onglet **"Auth"**
2. Notez votre **"Client ID"**
3. Cliquez sur **"Show"** pour révéler le **"Client Secret"**
4. **Ajoutez ces valeurs dans GitHub Secrets** :
   - Repository → Settings → Secrets and variables → Actions
   - Ajoutez `LINKEDIN_CLIENT_ID` et `LINKEDIN_CLIENT_SECRET`

### ÉTAPE 4 : Configurer la Redirect URI

1. Toujours dans l'onglet **"Auth"**
2. Dans **"OAuth 2.0 redirect URLs"**, ajoutez :
   - `http://localhost:3000` (pour les tests)
   - `https://voc-call.vercel.app/linkedin-callback` (optionnel, si vous créez une page de callback)

### ÉTAPE 5 : Obtenir un Access Token

#### Option A : Via le Script Automatisé (Plus Simple)

```bash
node scripts/linkedin-setup-guide.js
# Choisissez l'option 2) Obtenir un Access Token
```

#### Option B : Via le Navigateur (Manuel)

1. **Générez l'URL d'autorisation** :

   Remplacez `YOUR_CLIENT_ID` et `YOUR_REDIRECT_URI` dans cette URL :

   ```
   https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=openid%20profile%20email%20w_member_social&state=random_state_string
   ```

   Exemple :
   ```
   https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78abc123&redirect_uri=http://localhost:3000&scope=openid%20profile%20email%20w_member_social&state=random_state_string
   ```

2. **Ouvrez cette URL dans votre navigateur**

3. **Autorisez l'application** LinkedIn

4. **Vous serez redirigé** vers une URL comme :
   ```
   http://localhost:3000?code=AUTH_CODE_HERE&state=random_state_string
   ```

5. **Copiez le code** depuis l'URL (`AUTH_CODE_HERE`)

6. **Échangez le code contre un Access Token** :

   Via curl (ou Postman) :
   ```bash
   curl -X POST https://www.linkedin.com/oauth/v2/accessToken \
     -d "grant_type=authorization_code" \
     -d "code=VOTRE_CODE_ICI" \
     -d "redirect_uri=http://localhost:3000" \
     -d "client_id=VOTRE_CLIENT_ID" \
     -d "client_secret=VOTRE_CLIENT_SECRET"
   ```

   Réponse attendue :
   ```json
   {
     "access_token": "AQXYZ123...",
     "expires_in": 5184000,
     "refresh_token": "...",
     "refresh_token_expires_in": 5184000
   }
   ```

7. **Copiez le `access_token`** et ajoutez-le dans GitHub Secrets comme `LINKEDIN_ACCESS_TOKEN`

### ÉTAPE 6 : Obtenir le Person URN (Optionnel)

Si vous voulez spécifier manuellement l'URN :

```bash
curl -H "Authorization: Bearer VOTRE_ACCESS_TOKEN" \
  "https://api.linkedin.com/v2/me?projection=(id)"
```

Réponse :
```json
{
  "id": "urn:li:person:123456"
}
```

Ajoutez cette valeur dans GitHub Secrets comme `LINKEDIN_PERSON_URN`.

⚠️ **Note** : Si vous ne fournissez pas `LINKEDIN_PERSON_URN`, le script le récupérera automatiquement.

---

## ✅ Vérifier la Configuration

Testez vos credentials :

```bash
node scripts/linkedin-setup-guide.js
# Choisissez l'option 3) Tester les credentials existants
```

---

## 🔄 Renouveler le Token (Tous les 60 jours)

Les Access Tokens LinkedIn expirent après **60 jours**. Pour renouveler :

1. Répétez l'**ÉTAPE 5** pour obtenir un nouveau token
2. Mettez à jour le secret `LINKEDIN_ACCESS_TOKEN` dans GitHub

**Future amélioration** : Implémenter le refresh token automatique (si supporté par LinkedIn).

---

## 🐛 Dépannage

### Erreur : "Invalid access token"
- ✅ Le token a expiré (durée de vie : 60 jours) → Régénérez un token
- ✅ Vérifiez que le token est correctement copié dans GitHub Secrets

### Erreur : "Insufficient permissions"
- ✅ Vérifiez que le produit **"Marketing Developer Platform"** est activé
- ✅ Vérifiez que les scopes incluent `w_member_social`

### Erreur : "Invalid redirect URI"
- ✅ La redirect URI doit correspondre exactement à celle configurée dans l'app
- ✅ Pas d'espaces, pas de trailing slash

### Le post n'apparaît pas
- ✅ Vérifiez les logs GitHub Actions pour les erreurs détaillées
- ✅ Attendez quelques minutes (publication peut prendre du temps)
- ✅ Vérifiez que le token a les permissions de publication

---

## 📚 Ressources

- [LinkedIn Developers Portal](https://www.linkedin.com/developers/)
- [UGC Posts API Documentation](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/community-management/shares/ugc-post-api)
- [OAuth 2.0 Guide](https://learn.microsoft.com/en-us/linkedin/shared/authentication/authentication)

---

## 🔒 Sécurité

- ⚠️ **Ne jamais commiter les secrets dans le code**
- ⚠️ **Utilisez toujours GitHub Secrets**
- ⚠️ **Renouvelez les tokens régulièrement**
- ⚠️ **Limitez les permissions aux scopes nécessaires**

---

**Besoin d'aide ?** Consultez `README_LINKEDIN.md` pour plus de détails techniques.


