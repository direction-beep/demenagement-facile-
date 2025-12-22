# 🔑 Comment obtenir votre LinkedIn URN (Person ou Organization)

## 📋 Qu'est-ce qu'un URN LinkedIn ?

Un URN (Uniform Resource Name) est un identifiant unique pour votre profil LinkedIn ou votre page LinkedIn.

Il existe deux types :
- **Person URN** : `urn:li:person:xxxxx` (pour votre profil personnel)
- **Organization URN** : `urn:li:organization:xxxxx` (pour une page LinkedIn)

---

## 🎯 Méthode 1 : Utiliser le script PowerShell (RECOMMANDÉ)

Si vous avez déjà utilisé `get-linkedin-token.ps1`, il a automatiquement récupéré votre Person URN !

1. **Ouvrez PowerShell** dans le dossier `VOC-Call`
2. **Exécutez** : `.\get-linkedin-token.ps1`
3. **Suivez les instructions** pour obtenir votre Access Token
4. **À la fin**, le script affichera :
   ```
   Person URN: urn:li:person:xxxxx
   ```
5. **Copiez cette valeur** et ajoutez-la dans GitHub Secrets

---

## 🎯 Méthode 2 : Utiliser le script Node.js

Si vous avez déjà votre Access Token :

1. **Ouvrez un terminal** dans le dossier `VOC-Call`
2. **Exécutez** :
   ```bash
   node scripts/get-linkedin-urn.js VOTRE_ACCESS_TOKEN
   ```
3. **Remplacez** `VOTRE_ACCESS_TOKEN` par votre token LinkedIn
4. Le script affichera votre URN

---

## 🎯 Méthode 3 : Via l'API LinkedIn (manuel)

### Pour un profil personnel (Person URN) :

1. **Ouvrez PowerShell** ou un terminal
2. **Exécutez** cette commande (remplacez `VOTRE_ACCESS_TOKEN` par votre token) :
   ```powershell
   curl -H "Authorization: Bearer VOTRE_ACCESS_TOKEN" "https://api.linkedin.com/v2/me?projection=(id)"
   ```
3. **La réponse** ressemblera à :
   ```json
   {
     "id": "urn:li:person:xxxxx"
   }
   ```
4. **Copiez** la valeur de `"id"` → c'est votre Person URN !

### Pour une page LinkedIn (Organization URN) :

1. **Exécutez** cette commande :
   ```powershell
   curl -H "Authorization: Bearer VOTRE_ACCESS_TOKEN" "https://api.linkedin.com/v2/organizationalEntityAcls?q=roleAssignee&role=ADMINISTRATOR&projection=(elements*(organizationalTarget~))"
   ```
2. **Cherchez** dans la réponse un champ `"organizationalTarget"` ou `"id"` qui commence par `urn:li:organization:`
3. **Copiez** cette valeur → c'est votre Organization URN !

---

## 🎯 Méthode 4 : Via le portail développeur LinkedIn

1. Allez sur **https://www.linkedin.com/developers/apps**
2. **Sélectionnez votre application** (VOC-Call Blog Publisher)
3. Allez dans l'onglet **"Auth"**
4. Utilisez l'outil **"Access Token"** pour générer un token
5. **L'URN peut parfois être affiché** dans les informations de l'application

---

## 📝 Exemple concret

**Si vous voyez dans la réponse de l'API :**
```json
{
  "id": "urn:li:person:AbCdEfGh123456"
}
```

**Alors dans GitHub Secrets, vous devez mettre :**
- **Nom du secret** : `LINKEDIN_PERSON_URN`
- **Valeur** : `urn:li:person:AbCdEfGh123456`

**⚠️ IMPORTANT :** Copiez TOUTE la chaîne, y compris `urn:li:person:` ou `urn:li:organization:`

---

## ❓ Questions fréquentes

### Q : Je dois mettre quoi à la place de `xxxxx` ?
**R :** Remplacez `xxxxx` par l'identifiant numérique que LinkedIn vous donne. Par exemple :
- Si LinkedIn vous donne : `urn:li:person:AbCdEfGh123456`
- Alors vous mettez : `urn:li:person:AbCdEfGh123456` (tout le texte)

### Q : Je dois publier en tant que personne ou en tant que page ?
**R :** 
- **Person URN** : Si vous voulez publier sur votre profil LinkedIn personnel
- **Organization URN** : Si vous voulez publier sur une page LinkedIn d'entreprise

### Q : Comment savoir si j'ai une page LinkedIn ?
**R :** Allez sur votre profil LinkedIn → Menu → "Pages" → Si vous avez une page, vous la verrez là

### Q : Le script PowerShell ne trouve pas l'URN, que faire ?
**R :** Utilisez la Méthode 3 (API manuelle) avec votre Access Token. C'est souvent plus fiable.

---

## ✅ Vérification

Une fois que vous avez ajouté le secret dans GitHub :

1. Allez sur **GitHub** → **Settings** → **Secrets and variables** → **Actions**
2. Vérifiez que `LINKEDIN_PERSON_URN` existe et contient bien une valeur qui commence par `urn:li:person:` ou `urn:li:organization:`
3. Relancez le workflow "Publish existing articles to LinkedIn"
4. Les logs devraient maintenant dire : `Using provided author URN: urn:li:person:xxxxx`

---

## 🆘 Besoin d'aide ?

Si vous avez toujours des difficultés, vérifiez que :
- ✅ Votre Access Token est valide (pas expiré)
- ✅ Votre Access Token a les permissions `w_member_social` (pour publier)
- ✅ Vous avez bien copié TOUTE la chaîne URN (pas seulement les chiffres)

