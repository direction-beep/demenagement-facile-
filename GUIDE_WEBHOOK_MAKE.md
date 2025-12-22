# Guide : Intégration Webhook Make.com

## ✅ Configuration

Le webhook Make.com est maintenant intégré dans le workflow de publication automatique des articles.

### URL du Webhook

```
https://hook.eu2.make.com/2orlnnf5v2xj4jbjik44h5cet211ftj2
```

## 📋 Fonctionnement

### Déclenchement

Le webhook est appelé automatiquement **après chaque publication d'article** via :
- Le workflow GitHub Actions (mardi et vendredi à 07:00 UTC)
- La publication manuelle via GitHub Actions

### Exclusion des articles téléopérateurs

Les articles concernant les **téléopérateurs/téléconseillers** sont **automatiquement exclus** des notifications.

Les mots-clés détectés :
- `teleconseiller`
- `teleoperateur`
- `téléconseiller`
- `téléopérateur`
- `devenir-teleconseiller`
- `recrutement-teleconseiller`
- `carriere-teleconseiller`

La vérification se fait sur :
- Le slug de l'article
- Le titre
- La catégorie
- L'extrait

### Format des données envoyées

Le webhook reçoit un JSON avec ces champs :

```json
{
  "title": "Titre de l'article",
  "slug": "slug-de-larticle",
  "excerpt": "Description de l'article",
  "category": "Catégorie",
  "readTime": "5 min",
  "url": "https://voc-call.fr/blog/slug-de-larticle.html",
  "date": "2025-11-08",
  "image": "images/hero/hero-image.jpg",
  "publishedAt": "2025-11-08T07:00:00.000Z"
}
```

## 🔧 Configuration dans Make.com

### Scénario Make.com

1. **Créer un nouveau scénario**
2. **Module de déclenchement** : "Webhooks" → "Custom webhook"
   - URL : `https://hook.eu2.make.com/2orlnnf5v2xj4jbjik44h5cet211ftj2`
   - Méthode : POST
   - Type de données : JSON

3. **Modules suivants** (selon vos besoins) :
   - **Notification** : Email, SMS, Slack, Teams, etc.
   - **Publication LinkedIn** : Utiliser le module LinkedIn
   - **Autres actions** : Selon votre workflow

### Exemple de workflow Make.com

```
[Webhook reçu] 
  → [Filtre : Vérifier que ce n'est pas un article téléopérateur]
    → [Notification Email]
    → [Publication LinkedIn]
    → [Mise à jour CRM]
```

## 📝 Exemple de données reçues

### Article normal (notifié)

```json
{
  "title": "Back‑office digital : réduire les délais de réponse",
  "slug": "backoffice-digital-delais-reponse",
  "excerpt": "Emails, chat, réseaux sociaux : méthodes et outils pour répondre vite.",
  "category": "Technique",
  "readTime": "6 min",
  "url": "https://voc-call.fr/blog/backoffice-digital-delais-reponse.html",
  "date": "2025-11-08",
  "image": "images/hero/hero-back-office.jpg",
  "publishedAt": "2025-11-08T07:00:00.000Z"
}
```

### Article téléopérateur (non notifié)

```json
{
  "title": "Devenir Téléconseiller Indépendant",
  "slug": "devenir-teleconseiller-independant",
  ...
}
```

→ **Cet article ne sera PAS envoyé au webhook** car il contient "teleconseiller" dans le slug.

## 🧪 Test

Pour tester manuellement :

1. **Publier un article** via GitHub Actions → "Publish scheduled blog posts"
2. **Vérifier dans Make.com** que le webhook a été déclenché
3. **Vérifier les logs** du workflow GitHub Actions pour voir :
   - `✓ Make.com webhook notified for [slug]` (succès)
   - `Skipping Make.com notification for [slug] (teleoperator article)` (exclu)

## 🔒 Sécurité

Le webhook Make.com est public (pas d'authentification requise par Make.com). Si vous souhaitez ajouter une sécurité supplémentaire, vous pouvez :

1. **Ajouter un token dans l'URL** du webhook Make.com
2. **Vérifier le token** dans votre scénario Make.com
3. **Configurer le token** dans GitHub Secrets → `MAKE_WEBHOOK_TOKEN`

## 📚 Configuration GitHub Secrets (optionnel)

Si vous changez l'URL du webhook, ajoutez dans GitHub Secrets :

- **Nom** : `MAKE_WEBHOOK_URL`
- **Valeur** : Votre nouvelle URL de webhook Make.com

Par défaut, le script utilise l'URL configurée dans le code.

## 🐛 Dépannage

### Le webhook n'est pas appelé

- Vérifiez que l'article vient d'être publié (pas déjà publié)
- Vérifiez les logs GitHub Actions
- Vérifiez que l'article n'est pas exclu (téléopérateur)

### L'article est exclu par erreur

- Vérifiez les mots-clés dans `TELEOPERATOR_KEYWORDS` dans `scripts/publish.js`
- Modifiez la liste si nécessaire

### Erreur de connexion

- Vérifiez que l'URL du webhook est correcte
- Vérifiez que Make.com est accessible
- Vérifiez les logs GitHub Actions pour les détails

