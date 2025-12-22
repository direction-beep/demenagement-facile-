# Guide pour obtenir l'Organization URN LinkedIn

## Situation actuelle

Votre token LinkedIn actuel n'a **pas les permissions** pour accéder aux pages LinkedIn (Organization). Pour publier sur une **page LinkedIn** au lieu de votre profil personnel, vous devez :

## Solution : Générer un nouveau token avec les permissions de page

### Étape 1 : Générer un nouveau token

1. **Exécutez le script** :
   ```powershell
   .\get-linkedin-token.ps1
   ```

2. Le script a été **modifié** pour inclure automatiquement le scope `w_organization_social` qui est nécessaire pour publier sur les pages LinkedIn.

3. **Suivez les instructions** pour obtenir votre nouveau token.

### Étape 2 : Récupérer l'Organization URN

Une fois le nouveau token obtenu :

1. **Mettez à jour** `linkedin-credentials.txt` avec le nouveau token
2. **Exécutez** :
   ```powershell
   .\get-org-urn-auto.ps1
   ```

3. Le script affichera votre Organization URN (format : `urn:li:organization:xxxxx`)

### Étape 3 : Ajouter dans GitHub Secrets

1. Allez sur **GitHub** → **Settings** → **Secrets and variables** → **Actions**
2. Trouvez ou créez le secret **`LINKEDIN_PERSON_URN`**
3. **Valeur** : Collez l'URN complet (ex: `urn:li:organization:123456`)
4. **Mettez aussi à jour** `LINKEDIN_ACCESS_TOKEN` avec votre nouveau token

## Format de l'URN

L'URN aura l'un de ces formats :
- **Person URN** : `urn:li:person:AbCdEfGh123456` (pour profil personnel)
- **Organization URN** : `urn:li:organization:123456` (pour page LinkedIn)

**Important** : Copiez **TOUTE** la chaîne, pas seulement les chiffres à la fin !

## Alternative : Publier en tant que personne

Si vous préférez publier sur votre **profil personnel** LinkedIn plutôt que sur une page :

1. Le script `get-person-urn-simple.ps1` devrait fonctionner avec un token ayant les permissions de base
2. Vous obtiendrez un Person URN : `urn:li:person:xxxxx`
3. Utilisez cet URN dans GitHub Secrets

## Vérification

Après avoir ajouté l'URN dans GitHub Secrets, relancez le workflow :
- **GitHub** → **Actions** → **"Publish existing articles to LinkedIn"** → **Run workflow**

Les logs devraient afficher :
```
Using provided author URN: urn:li:organization:xxxxx
```

