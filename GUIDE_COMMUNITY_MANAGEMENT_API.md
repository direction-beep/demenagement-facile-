# Guide : Demander l'accès à Community Management API

## Étape 1 : Demander l'accès

1. **Dans l'onglet "Products"** de votre application LinkedIn
2. **Section "Available products"**
3. **Trouvez "Community Management API"**
4. **Cliquez sur "Request access"** (bouton bleu)

## Étape 2 : Compléter le formulaire de demande

LinkedIn vous demandera probablement :
- **Description de votre cas d'usage** : Exemple : "Automatiser la publication d'articles de blog sur notre page LinkedIn d'entreprise pour partager nos contenus avec notre communauté."
- **Volume attendu** : Exemple : "2-3 publications par semaine"
- **Type de contenu** : "Articles de blog avec liens vers notre site web"

## Étape 3 : Attendre l'approbation

- **Délai** : Généralement 24-72 heures
- **Notification** : Vous recevrez un email quand l'accès sera approuvé
- **Vérification** : L'API apparaîtra dans "Added products" une fois approuvée

## Étape 4 : Après l'approbation

Une fois l'accès approuvé :

1. **Générer un nouveau token** avec le scope `w_organization_social` :
   ```powershell
   .\get-linkedin-token.ps1
   ```
   Le script inclut déjà ce scope automatiquement.

2. **Récupérer l'Organization URN** :
   ```powershell
   .\get-org-urn-auto.ps1
   ```

3. **Mettre à jour GitHub Secrets** :
   - `LINKEDIN_ACCESS_TOKEN` : Nouveau token avec scope `w_organization_social`
   - `LINKEDIN_PERSON_URN` : Organization URN (ex: `urn:li:organization:xxxxx`)

4. **Tester le workflow** :
   - GitHub → Actions → "Publish existing articles to LinkedIn" → Run workflow

## En attendant l'approbation

Vous pouvez déjà tester avec votre profil personnel :
- Le script fonctionne avec "Share on LinkedIn"
- Il publiera sur votre profil LinkedIn personnel
- Pas besoin d'attendre l'approbation pour tester

## Différence entre Profil et Page

- **Profil personnel** : Utilise "Share on LinkedIn" → Publie sur votre profil
- **Page LinkedIn** : Utilise "Community Management API" → Publie sur la page d'entreprise

Les deux fonctionnent, c'est juste une question de où le contenu apparaît !

