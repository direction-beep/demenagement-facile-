# Guide : Ajouter la Redirect URI dans LinkedIn Developers

## Problème

Si vous n'avez pas ajouté `http://localhost:3000` dans les "Authorized redirect URLs" de votre application LinkedIn, le flux OAuth ne fonctionnera pas et vous obtiendrez l'erreur "invalid_client".

## Solution : Ajouter la Redirect URI

### Étapes détaillées

1. **Allez sur LinkedIn Developers** :
   - https://www.linkedin.com/developers/apps
   - Connectez-vous si nécessaire

2. **Sélectionnez votre application** :
   - Cliquez sur votre application dans la liste

3. **Onglet "Auth"** :
   - Cliquez sur l'onglet "Auth" dans le menu de gauche

4. **Section "Authorized redirect URLs for your app"** :
   - Descendez jusqu'à cette section
   - Vous verrez un champ texte ou une liste de URLs

5. **Ajoutez la Redirect URI** :
   - Cliquez sur "Add redirect URL" ou le bouton "+"
   - Entrez exactement : `http://localhost:3000`
   - Cliquez sur "Add" ou "Save"

6. **Sauvegardez** :
   - Assurez-vous que les changements sont sauvegardés
   - LinkedIn peut demander une confirmation

### Important

- ✅ **Exactement** `http://localhost:3000` (pas https, pas de slash à la fin)
- ✅ Doit correspondre **exactement** à la Redirect URI utilisée dans le script
- ✅ Vous pouvez ajouter plusieurs Redirect URIs si nécessaire

### Après avoir ajouté la Redirect URI

1. **Attendez quelques secondes** pour que LinkedIn enregistre le changement
2. **Réessayez** le script PowerShell :
   ```powershell
   .\get-linkedin-token-personal.ps1
   ```
3. **OU** utilisez l'outil intégré de LinkedIn (plus simple) :
   - Onglet "Auth" → "OAuth 2.0 token generation"
   - Sélectionnez les scopes
   - Générez le token

## Alternative : Utiliser l'outil intégré de LinkedIn

Si vous continuez à avoir des problèmes avec le script, utilisez directement l'outil "OAuth 2.0 token generation" dans LinkedIn Developers. Cet outil ne nécessite pas de Redirect URI configurée car il génère le token directement.

