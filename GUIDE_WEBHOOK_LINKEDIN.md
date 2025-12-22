# Guide : Webhook pour automatiser la publication LinkedIn

## 🎯 Vue d'ensemble

Ce webhook permet de publier automatiquement des articles de blog sur LinkedIn via une solution d'automatisation externe (Zapier, Make.com, n8n, etc.).

## 📋 Configuration

### 1. Variables d'environnement (Vercel)

Dans votre projet Vercel, ajoutez ces variables d'environnement :

1. **`WEBHOOK_SECRET`** : Secret pour sécuriser le webhook (changez-le !)
   - Exemple : `my-super-secret-webhook-key-2024`

2. **`LINKEDIN_ACCESS_TOKEN`** : Token d'accès LinkedIn
   - Obtenu via LinkedIn Developers → OAuth 2.0 token generation

3. **`LINKEDIN_PERSON_URN`** (optionnel) : URN de votre profil ou page LinkedIn
   - Format : `urn:li:person:xxxxx` ou `urn:li:organization:xxxxx`
   - Si non fourni, le script récupérera automatiquement votre Person URN

4. **`SITE_URL`** (optionnel) : URL de votre site
   - Défaut : `https://voc-call.fr`

### 2. URL du Webhook

Une fois déployé sur Vercel, votre webhook sera disponible à :
```
https://voc-call.vercel.app/api/webhook-linkedin
```

Ou sur votre domaine personnalisé :
```
https://voc-call.fr/api/webhook-linkedin
```

## 🔧 Configuration dans votre outil d'automatisation

### Exemple avec Zapier

1. **Créer un nouveau Zap**
2. **Trigger** : Déclencheur de votre choix (nouvel article de blog, webhook, etc.)
3. **Action** : "Webhooks by Zapier" → "POST"
4. **Configuration** :
   - **URL** : `https://voc-call.fr/api/webhook-linkedin`
   - **Method** : POST
   - **Headers** :
     ```
     Content-Type: application/json
     X-Webhook-Secret: votre-secret-webhook
     ```
   - **Data** (JSON) :
     ```json
     {
       "title": "Titre de l'article",
       "slug": "slug-de-larticle",
       "excerpt": "Description de l'article",
       "category": "Catégorie",
       "readTime": "5 min",
       "url": "https://voc-call.fr/blog/slug-de-larticle.html"
     }
     ```

### Exemple avec Make.com (Integromat)

1. **Créer un nouveau scénario**
2. **Module** : "HTTP" → "Make a request"
3. **Configuration** :
   - **URL** : `https://voc-call.fr/api/webhook-linkedin`
   - **Method** : POST
   - **Headers** :
     ```
     Content-Type: application/json
     X-Webhook-Secret: votre-secret-webhook
     ```
   - **Body type** : JSON
   - **Body** :
     ```json
     {
       "title": "{{1.title}}",
       "slug": "{{1.slug}}",
       "excerpt": "{{1.excerpt}}",
       "category": "{{1.category}}",
       "readTime": "{{1.readTime}}",
       "url": "{{1.url}}"
     }
     ```

### Exemple avec n8n

1. **Créer un nouveau workflow**
2. **Node** : "HTTP Request"
3. **Configuration** :
   - **Method** : POST
   - **URL** : `https://voc-call.fr/api/webhook-linkedin`
   - **Headers** :
     ```json
     {
       "Content-Type": "application/json",
       "X-Webhook-Secret": "votre-secret-webhook"
     }
     ```
   - **Body** :
     ```json
     {
       "title": "{{$json.title}}",
       "slug": "{{$json.slug}}",
       "excerpt": "{{$json.excerpt}}",
       "category": "{{$json.category}}",
       "readTime": "{{$json.readTime}}",
       "url": "{{$json.url}}"
     }
     ```

## 📨 Format de la requête

### Headers requis

```
Content-Type: application/json
X-Webhook-Secret: votre-secret-webhook
```

### Body (JSON)

```json
{
  "title": "Titre de l'article",           // REQUIS
  "slug": "slug-de-larticle",             // REQUIS
  "excerpt": "Description de l'article",  // Optionnel
  "category": "Catégorie",                 // Optionnel
  "readTime": "5 min",                     // Optionnel
  "url": "https://voc-call.fr/blog/..."   // Optionnel (généré automatiquement si non fourni)
}
```

### Champs requis

- **`title`** : Titre de l'article
- **`slug`** : Slug de l'article (utilisé pour générer l'URL si `url` n'est pas fourni)

### Champs optionnels

- **`excerpt`** : Description/extraît de l'article
- **`category`** : Catégorie de l'article
- **`readTime`** : Temps de lecture (ex: "5 min")
- **`url`** : URL complète de l'article (sinon généré automatiquement)

## ✅ Réponse du webhook

### Succès (200)

```json
{
  "success": true,
  "message": "Article published to LinkedIn successfully",
  "data": {
    "success": true,
    "postId": "urn:li:ugcPost:xxxxx",
    "message": "Post published successfully on LinkedIn"
  }
}
```

### Erreur (400/401/500)

```json
{
  "error": "Error type",
  "message": "Description de l'erreur"
}
```

## 🔒 Sécurité

Le webhook est protégé par un secret (`X-Webhook-Secret`). Assurez-vous de :

1. **Utiliser un secret fort** (au moins 32 caractères aléatoires)
2. **Ne jamais partager le secret publiquement**
3. **Configurer le secret dans votre outil d'automatisation**
4. **Changer le secret régulièrement**

## 🧪 Test du webhook

Vous pouvez tester le webhook avec curl :

```bash
curl -X POST https://voc-call.fr/api/webhook-linkedin \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Secret: votre-secret-webhook" \
  -d '{
    "title": "Test Article",
    "slug": "test-article",
    "excerpt": "Description du test",
    "category": "Test",
    "readTime": "2 min",
    "url": "https://voc-call.fr/blog/test-article.html"
  }'
```

## 📝 Exemple d'intégration complète

### Déclencheur : Nouvel article publié sur le blog

1. **Votre CMS/blog** publie un nouvel article
2. **Votre outil d'automatisation** détecte le nouvel article
3. **Le webhook est appelé** avec les données de l'article
4. **L'article est publié** automatiquement sur LinkedIn

### Workflow recommandé

```
[Nouvel article] → [Outil d'automatisation] → [Webhook LinkedIn] → [Publication LinkedIn]
```

## 🐛 Dépannage

### Erreur 401 : Unauthorized
- Vérifiez que le header `X-Webhook-Secret` est correct
- Vérifiez que le secret correspond à celui configuré dans Vercel

### Erreur 400 : Bad request
- Vérifiez que les champs `title` et `slug` sont présents
- Vérifiez que le Content-Type est `application/json`

### Erreur 500 : Internal server error
- Vérifiez que `LINKEDIN_ACCESS_TOKEN` est configuré dans Vercel
- Vérifiez les logs Vercel pour plus de détails
- Vérifiez que le token LinkedIn n'a pas expiré

## 📚 Ressources

- [Documentation Vercel Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions)
- [Documentation LinkedIn API](https://docs.microsoft.com/en-us/linkedin/)

