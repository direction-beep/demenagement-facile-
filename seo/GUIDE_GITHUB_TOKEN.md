# 🔑 Configuration GitHub Token pour Commit Automatique

## 📋 Variable d'Environnement Requise

Pour que l'API puisse commit automatiquement sur GitHub, vous devez configurer un **Personal Access Token** GitHub dans Vercel.

### Étape 1 : Créer un Personal Access Token GitHub

1. **Allez sur GitHub** : https://github.com/settings/tokens
2. **Cliquez sur "Generate new token"** → **"Generate new token (classic)"**
3. **Configurez le token** :
   - **Note** : `VOC-Call N8N Webhook`
   - **Expiration** : `No expiration` (ou selon vos préférences)
   - **Scopes** : Cochez **`repo`** (accès complet aux repositories)
4. **Générez le token** et **copiez-le** (vous ne pourrez plus le voir après)

### Étape 2 : Ajouter le Token dans Vercel

1. **Allez dans Vercel** → Votre projet → **Settings** → **Environment Variables**
2. **Ajoutez ces variables** :

| Key | Value |
|-----|-------|
| `GITHUB_TOKEN` | `votre-token-github-ici` |
| `GITHUB_OWNER` | `direction-beep` (optionnel, défaut) |
| `GITHUB_REPO` | `voc-call` (optionnel, défaut) |
| `GITHUB_BRANCH` | `main` (optionnel, défaut) |

3. **Redéployez** votre site Vercel

## ✅ Résultat

Une fois configuré, chaque fois que N8N envoie des données :
1. ✅ L'API reçoit les données
2. ✅ Commit automatiquement le fichier sur GitHub
3. ✅ Le fichier est disponible dans `seo/positions-keywords-n8n.md`
4. ✅ Vous pouvez pull le fichier localement

## 🔒 Sécurité

- ⚠️ **Ne partagez jamais** votre token GitHub
- ⚠️ Le token a accès à votre repo, gardez-le secret
- ✅ Le token est stocké de manière sécurisée dans Vercel

## 🧪 Test

Après configuration, testez depuis N8N. La réponse devrait contenir :
```json
{
  "success": true,
  "github": {
    "commitSha": "...",
    "commitUrl": "https://github.com/..."
  }
}
```

---

**Une fois configuré, le fichier sera automatiquement commité sur GitHub à chaque envoi N8N !**

