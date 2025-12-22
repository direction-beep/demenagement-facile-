# 🔑 Guide Complet : Obtenir les Identifiants LinkedIn

Ce guide vous accompagne **étape par étape** pour obtenir tous les identifiants nécessaires à la publication automatique sur LinkedIn.

---

## 📦 Ce dont vous avez besoin

Au final, vous aurez **4 identifiants** à ajouter dans GitHub :

1. ✅ **LINKEDIN_CLIENT_ID** 
2. ✅ **LINKEDIN_CLIENT_SECRET**
3. ✅ **LINKEDIN_ACCESS_TOKEN**
4. ✅ **LINKEDIN_PERSON_URN** (optionnel)

---

## 🎯 ÉTAPE 1 : Créer une Application LinkedIn

### 1.1 Accéder au portail développeur

1. Allez sur : **https://www.linkedin.com/developers/apps**
2. Connectez-vous avec votre compte LinkedIn
3. Si c'est votre première fois, LinkedIn vous demandera de rejoindre le programme développeur → Acceptez les conditions

### 1.2 Créer une nouvelle application

1. Cliquez sur le bouton **"Create app"** (en haut à droite)
2. Remplissez le formulaire :

   | Champ | Valeur à mettre |
   |-------|----------------|
   | **App name** | `VOC-Call Blog Publisher` |
   | **LinkedIn Page** | Sélectionnez votre page LinkedIn (si vous en avez une, sinon laissez vide) |
   | **Privacy policy URL** | `https://voc-call.vercel.app/legal` |
   | **App logo** | Uploadez un logo (optionnel, format carré recommandé) |

3. Cochez la case **"I agree to LinkedIn's API Terms of Use"**
4. Cliquez sur **"Create app"**

✅ **Résultat** : Vous êtes maintenant sur la page de votre application.

---

## 🎯 ÉTAPE 2 : Activer les Produits Nécessaires

### 2.1 Activer "Sign In with LinkedIn using OpenID Connect"

1. Dans le menu de gauche, cliquez sur **"Products"**
2. Cherchez **"Sign In with LinkedIn using OpenID Connect"**
3. Cliquez sur **"Get started"** ou **"Select"**
4. Acceptez les termes (si demandé)

### 2.2 Activer "Marketing Developer Platform" ⭐ IMPORTANT

1. Toujours dans **"Products"**
2. Cherchez **"Marketing Developer Platform"**
3. Cliquez sur **"Get started"** ou **"Select"**
4. Acceptez les termes

⚠️ **Attention** : Ce produit est **obligatoire** pour publier du contenu sur LinkedIn.

✅ **Résultat** : Les deux produits sont activés (status "Active" ou "Enabled").

---

## 🎯 ÉTAPE 3 : Obtenir Client ID et Client Secret

### 3.1 Récupérer le Client ID

1. Dans le menu de gauche, cliquez sur **"Auth"**
2. Vous verrez **"Client ID"** directement affiché
3. **Copiez cette valeur** → C'est votre `LINKEDIN_CLIENT_ID`

### 3.2 Récupérer le Client Secret

1. Toujours dans **"Auth"**, cherchez la section **"Client Secret"**
2. Le secret est masqué par défaut (affichage : `••••••••`)
3. Cliquez sur le bouton **"Show"** ou l'icône 👁️ pour révéler
4. **Copiez cette valeur** → C'est votre `LINKEDIN_CLIENT_SECRET`

⚠️ **Important** : Ne partagez jamais ces valeurs publiquement !

### 3.3 Configurer une Redirect URI ⚙️

**🔍 Pourquoi cette étape est nécessaire ?**

La Redirect URI est l'URL vers laquelle LinkedIn vous redirigera **après** que vous ayez autorisé l'application dans votre navigateur. C'est à cette URL que LinkedIn enverra un **code d'autorisation temporaire** (dans l'URL) que vous utiliserez ensuite pour obtenir l'Access Token.

**💡 Important à comprendre** :
- ✅ Cette URL **n'a pas besoin d'être un vrai serveur qui fonctionne**
- ✅ Elle sert **uniquement à récupérer le code pendant la configuration** (une seule fois)
- ✅ Une fois l'Access Token obtenu, vous n'aurez plus besoin que cette URL existe réellement
- ✅ C'est juste une "boîte aux lettres" temporaire pour recevoir le code dans l'URL

**📝 Comment ça fonctionne concrètement** :
1. Vous cliquez sur un lien d'autorisation LinkedIn (étape 4.2)
2. LinkedIn vous demande d'autoriser l'app → Vous autorisez
3. LinkedIn vous redirige vers `http://localhost:3000?code=XXXXX` 
4. ⚠️ **La page peut afficher "Connection refused" ou une erreur - C'EST NORMAL !**
5. **L'important** : Regardez la **barre d'adresse** de votre navigateur
6. Vous copiez le code depuis l'URL (le `XXXXX` après `?code=`)
7. Vous utilisez ce code pour obtenir l'Access Token (étape 4.4)

**⚙️ Configuration** :

1. Toujours dans **"Auth"**, section **"OAuth 2.0 redirect URLs"**
2. Cliquez sur **"Add redirect URL"**
3. Ajoutez : `http://localhost:3000` 
   - ⚠️ Utilisez **exactement** cette valeur (pas de slash final `/`, pas de port différent)
4. Cliquez sur **"Update"**

**🔄 Alternative** : Vous pouvez utiliser une autre URL que vous contrôlez, par exemple :
- `https://voc-call.vercel.app/linkedin-callback`
- `http://localhost:8080`

⚠️ **Important** : Quelle que soit l'URL que vous choisissez, vous devrez utiliser **la même URL exacte** lors de l'étape 4 (obtenir l'Access Token).

✅ **Résultat** : Vous avez maintenant `LINKEDIN_CLIENT_ID` et `LINKEDIN_CLIENT_SECRET`.

---

## 🎯 ÉTAPE 4 : Obtenir un Access Token

L'Access Token est le plus complexe à obtenir. Je vous propose **2 méthodes** :

### 📱 MÉTHODE A : Script Automatisé (RECOMMANDÉ)

1. Ouvrez un terminal dans le dossier du projet
2. Lancez le script interactif :

```bash
node scripts/linkedin-setup-guide.js
```

3. Choisissez l'option **2) Obtenir un Access Token**
4. Suivez les instructions à l'écran

Le script vous donnera directement l'URL à ouvrir et vous guidera pour récupérer le token.

---

### 🌐 MÉTHODE B : Manuel (Via Navigateur)

#### 4.1 Construire l'URL d'autorisation

Remplacez les valeurs dans cette URL (gardez les `%20` qui représentent des espaces) :

```
https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=VOTRE_CLIENT_ID&redirect_uri=http://localhost:3000&scope=openid%20profile%20email%20w_member_social&state=random123
```

**Exemple concret** :
Si votre Client ID est `78abc123def456`, l'URL devient :
```
https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78abc123def456&redirect_uri=http://localhost:3000&scope=openid%20profile%20email%20w_member_social&state=random123
```

#### 4.2 Autoriser l'application

1. **Copiez l'URL complète** (avec votre Client ID)
2. **Collez-la dans votre navigateur** et appuyez sur Entrée
3. LinkedIn vous demandera de vous connecter (si pas déjà connecté)
4. LinkedIn vous demandera d'**autoriser l'application** → Cliquez sur **"Allow"** ou **"Autoriser"**

#### 4.3 Récupérer le code d'autorisation

Après autorisation, LinkedIn vous redirigera vers l'URL que vous avez configurée (par exemple `http://localhost:3000`).

**Ce qui se passe** :
- Vous serez redirigé vers une URL comme :
```
http://localhost:3000?code=AQTxyz123abc...&state=random123
```
- ⚠️ **Ne vous inquiétez pas si la page affiche "This site can't be reached" ou "Connection refused"** - c'est normal ! La page `localhost:3000` n'existe probablement pas, mais ce n'est pas grave.

**Ce qui compte** : Le code est dans l'URL dans la barre d'adresse du navigateur !

**Le code est dans l'URL après `?code=`**

1. **Regardez la barre d'adresse de votre navigateur**
2. **Copiez tout le code** qui suit `?code=` jusqu'au `&` (c'est une longue chaîne de caractères)
   - Exemple : Si l'URL est `http://localhost:3000?code=AQTxyz789&state=random123`, copiez `AQTxyz789`
3. Gardez-le précieusement, vous en aurez besoin dans la prochaine étape
4. ⚠️ **Important** : Le code expire rapidement (5-10 minutes) → Utilisez-le immédiatement !

#### 4.4 Échanger le code contre un Access Token

Vous avez 3 options :

**Option 1 : Script Node.js (Facile)**

Créez un fichier `get-token.js` :

```javascript
const https = require('https');

const CLIENT_ID = 'VOTRE_CLIENT_ID';
const CLIENT_SECRET = 'VOTRE_CLIENT_SECRET';
const CODE = 'LE_CODE_QUE_VOUS_AVEZ_COPIE';
const REDIRECT_URI = 'http://localhost:3000';

const postData = [
  'grant_type=authorization_code',
  `code=${CODE}`,
  `redirect_uri=${encodeURIComponent(REDIRECT_URI)}`,
  `client_id=${CLIENT_ID}`,
  `client_secret=${CLIENT_SECRET}`
].join('&');

const options = {
  hostname: 'www.linkedin.com',
  path: '/oauth/v2/accessToken',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const json = JSON.parse(data);
    console.log('\n✅ ACCESS TOKEN OBTENU :\n');
    console.log(json.access_token);
    console.log('\n📝 Expire dans :', Math.floor(json.expires_in / 86400), 'jours');
    console.log('\n⚠️  Copiez ce token et ajoutez-le dans GitHub Secrets comme LINKEDIN_ACCESS_TOKEN\n');
  });
});

req.on('error', (e) => console.error('Erreur:', e));
req.write(postData);
req.end();
```

Puis exécutez :
```bash
# Remplacez les valeurs dans le fichier, puis :
node get-token.js
```

**Option 2 : Curl (Terminal)**

```bash
curl -X POST https://www.linkedin.com/oauth/v2/accessToken \
  -d "grant_type=authorization_code" \
  -d "code=VOTRE_CODE_ICI" \
  -d "redirect_uri=http://localhost:3000" \
  -d "client_id=VOTRE_CLIENT_ID" \
  -d "client_secret=VOTRE_CLIENT_SECRET"
```

**Option 3 : Postman / Insomnia**

1. Méthode : **POST**
2. URL : `https://www.linkedin.com/oauth/v2/accessToken`
3. Body (form-urlencoded) :
   - `grant_type` = `authorization_code`
   - `code` = Votre code
   - `redirect_uri` = `http://localhost:3000`
   - `client_id` = Votre Client ID
   - `client_secret` = Votre Client Secret

#### 4.5 Récupérer le token de la réponse

La réponse sera un JSON comme :

```json
{
  "access_token": "AQTxyz789...",
  "expires_in": 5184000,
  "refresh_token": "AQTabc456...",
  "refresh_token_expires_in": 5184000
}
```

**Copiez la valeur de `access_token`** → C'est votre `LINKEDIN_ACCESS_TOKEN`

⚠️ **Important** : Ce token expire après **60 jours**. Vous devrez le renouveler.

✅ **Résultat** : Vous avez maintenant `LINKEDIN_ACCESS_TOKEN`.

---

## 🎯 ÉTAPE 5 : Obtenir le Person URN (OPTIONNEL)

Le Person URN identifie votre profil LinkedIn. Le script peut le récupérer automatiquement, mais vous pouvez aussi l'obtenir manuellement :

### Méthode Rapide

```bash
curl -H "Authorization: Bearer VOTRE_ACCESS_TOKEN" \
  "https://api.linkedin.com/v2/me?projection=(id)"
```

Réponse :
```json
{
  "id": "urn:li:person:123456789"
}
```

**Copiez la valeur de `id`** → C'est votre `LINKEDIN_PERSON_URN` (optionnel)

✅ **Note** : Si vous ne fournissez pas cette valeur, le script la récupérera automatiquement lors de la publication.

---

## 🎯 ÉTAPE 6 : Ajouter les Secrets dans GitHub

### 6.1 Accéder aux Secrets GitHub

1. Allez sur votre repository GitHub : **https://github.com/direction-beep/voc-call**
2. Cliquez sur **"Settings"** (en haut du repository)
3. Dans le menu de gauche, cliquez sur **"Secrets and variables"** → **"Actions"**

### 6.2 Ajouter chaque secret

Pour chaque identifiant, cliquez sur **"New repository secret"** et ajoutez :

| Name | Secret Value |
|------|--------------|
| `LINKEDIN_CLIENT_ID` | Votre Client ID (Étape 3.1) |
| `LINKEDIN_CLIENT_SECRET` | Votre Client Secret (Étape 3.2) |
| `LINKEDIN_ACCESS_TOKEN` | Votre Access Token (Étape 4) |
| `LINKEDIN_PERSON_URN` | Votre Person URN (Étape 5, optionnel) |

4. Cliquez sur **"Add secret"** pour chaque valeur

✅ **Résultat** : Tous les secrets sont configurés dans GitHub.

---

## ✅ Vérification Finale

### Testez la configuration

1. Lancez le script de test :

```bash
node scripts/linkedin-setup-guide.js
# Choisissez l'option 3) Tester les credentials existants
```

2. Entrez vos identifiants quand demandé
3. Le script vous dira si tout fonctionne ✅

---

## 🎉 C'est Terminé !

Votre intégration LinkedIn est maintenant configurée. 

**Prochaines étapes** :
- Le workflow GitHub Actions publiera automatiquement les articles sur LinkedIn
- Consultez les logs dans **Actions** pour voir les publications
- Les posts apparaîtront sur votre profil LinkedIn (ou page, si configuré)

---

## 🆘 Besoin d'aide ?

### Problèmes courants

**❌ "Invalid access token"**
- Le token a peut-être expiré (60 jours) → Régénérez un token (Étape 4)
- Vérifiez que vous avez bien copié tout le token (c'est long !)

**❌ "Insufficient permissions"**
- Vérifiez que **"Marketing Developer Platform"** est bien activé (Étape 2.2)
- Vérifiez que les scopes incluent `w_member_social`

**❌ "Invalid redirect URI"**
- La redirect URI doit être **exactement** celle configurée dans l'app
- Pas d'espaces, pas de slash final

**❌ Le code d'autorisation ne fonctionne pas**
- Le code expire rapidement (quelques minutes) → Utilisez-le immédiatement
- Utilisez le code dans les 5 minutes suivant sa génération

---

## 📞 Support

Si vous rencontrez des difficultés :
1. Consultez les logs GitHub Actions pour les erreurs détaillées
2. Vérifiez que tous les secrets sont bien configurés
3. Testez avec le script de test : `node scripts/linkedin-setup-guide.js`

---

**Bon courage ! 🚀**

