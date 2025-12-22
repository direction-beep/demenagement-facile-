# 🔑 Guide : Créer un Token GitHub - Emplacement Précis

## 📍 URL Exacte

**Lien direct** : https://github.com/settings/tokens

**OU** via le menu GitHub :
1. Cliquez sur votre **avatar** (en haut à droite)
2. Cliquez sur **"Settings"**
3. Dans le menu de gauche, cliquez sur **"Developer settings"** (tout en bas)
4. Cliquez sur **"Personal access tokens"**
5. Cliquez sur **"Tokens (classic)"**

## 🎯 Étapes Détaillées

### Étape 1 : Accéder à la Page des Tokens

**Option A : Lien Direct**
- Allez sur : **https://github.com/settings/tokens**

**Option B : Navigation Manuelle**
1. **GitHub.com** → Cliquez sur votre **avatar** (coin supérieur droit)
2. **Settings** (dans le menu déroulant)
3. Dans le menu de gauche, scrollez tout en bas
4. **Developer settings**
5. **Personal access tokens** → **Tokens (classic)**

### Étape 2 : Générer un Nouveau Token

1. **Cliquez sur "Generate new token"**
2. **Choisissez "Generate new token (classic)"** (pas "Fine-grained tokens")

### Étape 3 : Configurer le Token

**Note** : `VOC-Call N8N Webhook`

**Expiration** :
- **Recommandé** : `No expiration` (ou choisissez une date lointaine)
- **OU** : `90 days` (si vous préférez renouveler régulièrement)

**Scopes** (Permissions) :
- ✅ **Cochez `repo`** (accès complet aux repositories)
  - Cela donne accès à : `repo:status`, `repo_deployment`, `public_repo`, `repo:invite`, `security_events`
  - C'est suffisant pour commit des fichiers

**Autres scopes** (non nécessaires pour notre cas) :
- ❌ Ne cochez pas les autres (admin:repo_hook, delete_repo, etc.)

### Étape 4 : Générer et Copier

1. **Cliquez sur "Generate token"** (en bas de la page)
2. **⚠️ IMPORTANT** : Copiez le token immédiatement !
   - Il s'affiche une seule fois
   - Format : `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
3. **Collez-le dans un endroit sûr** (temporairement)

### Étape 5 : Ajouter dans Vercel

1. **Allez dans Vercel** : https://vercel.com
2. **Votre projet** → **Settings** → **Environment Variables**
3. **Ajoutez** :
   - **Key** : `GITHUB_TOKEN`
   - **Value** : `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` (votre token)
4. **Sauvegardez**
5. **Redéployez** votre site Vercel

## 📋 Checklist

- [ ] Token créé sur https://github.com/settings/tokens
- [ ] Scope `repo` coché
- [ ] Token copié (commence par `ghp_`)
- [ ] Token ajouté dans Vercel comme `GITHUB_TOKEN`
- [ ] Vercel redéployé

## 🔒 Sécurité

- ⚠️ **Ne partagez jamais** votre token
- ⚠️ **Ne commitez pas** le token dans votre code
- ✅ Le token est stocké de manière sécurisée dans Vercel
- ✅ Vous pouvez révoquer le token à tout moment sur GitHub

## 🧪 Vérification

Après configuration :
1. **Envoyez depuis N8N**
2. **Vérifiez sur GitHub** : https://github.com/direction-beep/voc-call/commits
3. **Vous devriez voir** : "Update SEO keywords positions from N8N - YYYY-MM-DD"

---

**URL Directe** : https://github.com/settings/tokens






