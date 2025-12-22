# Après la demande d'accès à Community Management API

## ✅ Ce que vous venez de faire

Vous avez demandé l'accès à **"Community Management API"** pour pouvoir publier sur la page LinkedIn de VOC-Call.

## ⏳ Prochaines étapes

### 1. Attendre l'approbation LinkedIn

- **Délai** : Généralement 24 à 72 heures
- **Notification** : Vous recevrez un email quand l'accès sera approuvé
- **Vérification** : L'API apparaîtra dans "Added products" une fois approuvée

### 2. Une fois l'approbation reçue

#### Étape A : Générer un nouveau token avec `w_organization_social`

1. **LinkedIn Developers** → votre application → onglet **"Auth"**
2. Section **"OAuth 2.0 token generation"**
3. **Sélectionnez les scopes** :
   - ✅ `w_member_social` (pour profil personnel)
   - ✅ `w_organization_social` (pour publier sur la page) ← **NOUVEAU**
4. **Cliquez sur "Generate token"**
5. **Copiez le token**

#### Étape B : Ajouter le token dans GitHub Secrets

1. **GitHub** → Settings → Secrets and variables → Actions
2. Trouvez **`LINKEDIN_ACCESS_TOKEN`**
3. Cliquez sur l'icône crayon (éditer)
4. Collez le nouveau token
5. Cliquez sur "Update secret"

#### Étape C : Récupérer l'Organization URN

Une fois le token avec `w_organization_social` configuré :

```powershell
.\get-org-urn-auto.ps1
```

Le script devrait maintenant fonctionner et récupérer l'URN de votre page LinkedIn.

#### Étape D : Ajouter l'Organization URN dans GitHub Secrets

1. **GitHub** → Settings → Secrets and variables → Actions
2. Trouvez ou créez **`LINKEDIN_PERSON_URN`**
3. Cliquez sur l'icône crayon (éditer)
4. Collez l'Organization URN (format : `urn:li:organization:xxxxx`)
5. Cliquez sur "Update secret"

**Note** : Le nom `LINKEDIN_PERSON_URN` est trompeur - il accepte aussi les Organization URN.

## 📋 Checklist de vérification

Avant de tester la publication sur la page :

- [ ] Community Management API approuvé (dans "Added products")
- [ ] Nouveau token généré avec `w_organization_social`
- [ ] Token ajouté dans GitHub Secrets → `LINKEDIN_ACCESS_TOKEN`
- [ ] Organization URN récupéré
- [ ] Organization URN ajouté dans GitHub Secrets → `LINKEDIN_PERSON_URN`

## 🧪 Test

Une fois tout configuré :

1. **GitHub** → Actions → "Publish existing articles to LinkedIn"
2. **Run workflow**
3. Vérifiez les logs pour confirmer que la publication se fait sur la page

## 📝 En attendant l'approbation

Vous pouvez :
- ✅ Tester la publication sur votre profil personnel (avec le token actuel)
- ✅ Préparer les articles de blog
- ✅ Vérifier que le workflow GitHub Actions fonctionne

Une fois l'approbation reçue, suivez les étapes ci-dessus et vous pourrez publier sur la page LinkedIn de VOC-Call !

