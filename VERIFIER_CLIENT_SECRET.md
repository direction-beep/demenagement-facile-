# Vérification du Client Secret

## Problème
L'erreur "Client authentication failed" indique que le Client Secret n'est pas reconnu.

## Solutions

### 1. Vérifier le Client Secret
- Allez sur LinkedIn Developers → votre application → onglet "Auth"
- Section "Authentication keys"
- Vérifiez le "Primary Client Secret"

### 2. Si le secret a changé
LinkedIn peut avoir généré un nouveau secret. Si vous voyez "Generate a new Client Secret", cela signifie que le secret actuel peut être différent.

### 3. Copier le secret correctement
- Cliquez sur l'icône **œil** pour révéler le secret
- OU cliquez sur l'icône **copier** pour copier
- Assurez-vous de copier TOUT le secret, y compris les caractères spéciaux

### 4. Format du secret
Le secret commence par `WPL_AP1.` - c'est normal, c'est le nouveau format de LinkedIn.

## Alternative : Générer un nouveau token directement

Si vous avez des difficultés, vous pouvez aussi :
1. Utiliser l'outil de génération de token directement dans LinkedIn Developers
2. Onglet "Auth" → Section "OAuth 2.0 token generation"
3. Sélectionnez les scopes : `w_member_social`
4. Générez le token
5. Copiez-le directement dans GitHub Secrets

## Note importante
Les codes d'autorisation expirent rapidement (généralement 5-10 minutes). Si le code que vous avez utilisé est trop vieux, vous devrez refaire l'autorisation.

