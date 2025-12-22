# Guide : Produits LinkedIn pour la Publication

## Situation actuelle

Vous avez actuellement ces produits LinkedIn activés :
- ✅ **Share on LinkedIn** (Default Tier)
- ✅ **Events Management API** (Standard Tier)
- ✅ **Sign-in with LinkedIn using OpenID Connect** (Standard Tier)

## Pour publier sur une PAGE LinkedIn (Organization)

Pour publier sur une **page LinkedIn d'entreprise**, vous devez demander l'accès à :

### Option 1 : Community Management API (RECOMMANDÉ)

1. Dans votre application LinkedIn → onglet **"Products"**
2. Section **"Available products"**
3. Trouvez **"Community Management API"**
4. Cliquez sur **"Request access"** (bouton bleu)
5. LinkedIn examinera votre demande (peut prendre jusqu'à 72h)

**Description** : "Enable brands to build a presence and engage with their LinkedIn community."

**Tier** : Development Tier

### Option 2 : Demander Marketing Developer Platform

Si "Marketing Developer Platform" n'apparaît pas dans votre liste, vous pouvez :
1. Contacter le support LinkedIn Developers
2. Ou utiliser Community Management API qui devrait suffire

## Pour publier sur un PROFIL PERSONNEL

Avec **"Share on LinkedIn"**, vous pouvez déjà publier sur votre **profil personnel LinkedIn**.

Le script a été modifié pour :
1. Essayer d'abord l'API UGC Posts (si Marketing Developer Platform est disponible)
2. Si ça échoue, utiliser l'API legacy `/v2/shares` (compatible avec "Share on LinkedIn")

## Configuration requise

### Pour un profil personnel :
- ✅ **Share on LinkedIn** (déjà activé)
- ✅ Scope `w_member_social` dans le token
- ✅ Person URN (obtenu via `/v2/me` ou fourni manuellement)

### Pour une page LinkedIn :
- ⚠️ **Community Management API** (à demander)
- ⚠️ Scope `w_organization_social` dans le token
- ⚠️ Organization URN (obtenu via API organizations)

## Prochaines étapes

1. **Si vous voulez publier sur votre profil personnel** :
   - ✅ Tout est prêt ! Utilisez le script tel quel
   - Le Person URN sera récupéré automatiquement ou vous pouvez le fournir

2. **Si vous voulez publier sur une page LinkedIn** :
   - 📝 Demandez l'accès à "Community Management API"
   - ⏳ Attendez l'approbation (jusqu'à 72h)
   - 🔑 Générez un nouveau token avec le scope `w_organization_social`
   - 📋 Récupérez l'Organization URN
   - ✅ Configurez dans GitHub Secrets

## Test

Une fois l'accès obtenu, testez avec :
```powershell
.\get-org-urn-auto.ps1
```

Ou relancez le workflow GitHub Actions pour publier un article.

