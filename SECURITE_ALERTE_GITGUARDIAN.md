# 🔒 Alerte Sécurité : Secret LinkedIn exposé

## ⚠️ Problème détecté

GitGuardian a détecté que le fichier `linkedin-credentials.txt` contenant un **Access Token LinkedIn** était exposé sur GitHub.

## ✅ Actions effectuées

1. **Fichier supprimé** du dépôt Git
2. **Ajouté au `.gitignore`** pour éviter les futurs commits
3. **Correction du script** d'extraction de contenu

## 🔐 Actions à faire IMMÉDIATEMENT

### 1. Révoquer le token LinkedIn exposé

**URGENT** : Le token `AQUK40WEXWzJBydknYtKhsaLmOfO1Kd3Ns3XWfmNXMqsiqSKUtPWvm66umsqGObj...` est compromis.

1. **LinkedIn Developers** → votre application → onglet **"Auth"**
2. **Section "OAuth 2.0 token generation"** ou **"Access tokens"**
3. **Révoquez le token actuel**
4. **Générez un nouveau token**

### 2. Mettre à jour GitHub Secrets

1. **GitHub** → Settings → Secrets and variables → Actions
2. Trouvez **`LINKEDIN_ACCESS_TOKEN`**
3. Cliquez sur l'icône crayon (éditer)
4. **Collez le nouveau token**
5. Cliquez sur "Update secret"

### 3. Marquer le secret comme révoqué dans GitGuardian

Dans l'alerte GitGuardian, cliquez sur **"This secret is revoked"** pour indiquer que vous avez révoqué le token.

## 📋 Fichiers à NE JAMAIS committer

Les fichiers suivants sont maintenant dans `.gitignore` :
- `linkedin-credentials.txt`
- `*.credentials.txt`
- `*.secrets.txt`
- `.env`
- `.env.local`

## 🛡️ Bonnes pratiques

### Pour les credentials locaux

Créez un fichier `.gitignore` local (déjà fait) et utilisez-le pour stocker vos credentials localement **SANS** les committer.

### Pour les secrets en production

Utilisez **toujours** :
- **GitHub Secrets** pour les workflows GitHub Actions
- **Vercel Environment Variables** pour les variables d'environnement
- **Jamais** de fichiers texte avec des secrets dans le code

## 📝 Vérification

Pour vérifier que le fichier est bien supprimé :

```bash
git ls-files | grep linkedin-credentials
```

Cette commande ne doit rien retourner.

## ⚠️ Important

Le token exposé doit être considéré comme **compromis**. Même si vous supprimez le fichier, le token a été visible dans l'historique Git. **Révoquez-le immédiatement** et générez-en un nouveau.

