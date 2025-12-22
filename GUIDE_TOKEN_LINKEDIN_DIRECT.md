# Guide : Obtenir le Token LinkedIn directement depuis l'interface

## Méthode la plus simple (recommandée)

Plutôt que d'utiliser les scripts PowerShell, LinkedIn fournit un outil intégré pour générer des tokens directement.

## Étapes détaillées

### 1. Accéder à l'outil de génération de token

1. **Allez sur LinkedIn Developers** : https://www.linkedin.com/developers/apps
2. **Sélectionnez votre application**
3. **Onglet "Auth"**
4. **Descendez jusqu'à la section "OAuth 2.0 token generation"**

### 2. Générer le token

1. **Sélectionnez les scopes** :
   - ✅ `w_member_social` (pour publier sur votre profil personnel)
   - ❌ Ne sélectionnez PAS `w_organization_social` (pas encore approuvé)

2. **Cliquez sur "Generate token"**

3. **Copiez le token** qui s'affiche (c'est votre Access Token)

### 3. Ajouter dans GitHub Secrets

1. **GitHub** → Votre dépôt → **Settings** → **Secrets and variables** → **Actions**

2. **Trouvez ou créez** `LINKEDIN_ACCESS_TOKEN`
   - Cliquez sur l'icône crayon (éditer)
   - Collez le token
   - Cliquez sur "Update secret"

### 4. Récupérer le Person URN (optionnel)

Une fois le token ajouté, vous pouvez récupérer votre Person URN :

```powershell
.\get-person-urn-simple.ps1
```

Ou utilisez directement le token dans GitHub Secrets et le script le récupérera automatiquement.

## Avantages de cette méthode

- ✅ **Plus simple** : Pas besoin de scripts PowerShell
- ✅ **Plus fiable** : Pas de problèmes d'authentification
- ✅ **Plus rapide** : Quelques clics seulement
- ✅ **Token valide immédiatement** : Pas d'erreurs

## Note importante

Ce token permet de publier sur votre **profil personnel LinkedIn**.

Pour publier sur une **page LinkedIn**, attendez l'approbation de "Community Management API", puis générez un nouveau token avec le scope `w_organization_social`.

