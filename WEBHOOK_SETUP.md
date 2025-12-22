# 🎯 Configuration du Webhook LinkedIn

## ✅ Ce qui a été créé

1. **`api/webhook-linkedin.js`** - Endpoint webhook pour publier sur LinkedIn
2. **`GUIDE_WEBHOOK_LINKEDIN.md`** - Guide complet d'utilisation
3. **`README_WEBHOOK.md`** - Guide rapide
4. **`vercel.json`** - Configuration Vercel

## 🚀 Prochaines étapes

### 1. Autoriser les secrets dans GitHub (si nécessaire)

Le push est bloqué à cause des secrets dans l'historique Git. Vous pouvez :
- Autoriser via les liens GitHub fournis dans l'erreur
- OU continuer sans push (le code est déjà local)

### 2. Déployer sur Vercel

Une fois le push réussi, Vercel déploiera automatiquement le webhook.

### 3. Configurer les variables d'environnement Vercel

Dans Vercel → Settings → Environment Variables, ajoutez :

```
WEBHOOK_SECRET = votre-secret-fort-32-caracteres-minimum
LINKEDIN_ACCESS_TOKEN = votre-token-linkedin
LINKEDIN_PERSON_URN = urn:li:person:xxxxx (optionnel)
SITE_URL = https://voc-call.fr (optionnel)
```

### 4. URL du Webhook

Une fois déployé :
```
https://voc-call.fr/api/webhook-linkedin
```

### 5. Tester le webhook

```bash
curl -X POST https://voc-call.fr/api/webhook-linkedin \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Secret: votre-secret-webhook" \
  -d '{
    "title": "Test Article",
    "slug": "test-article",
    "excerpt": "Description du test",
    "category": "Test",
    "readTime": "2 min"
  }'
```

## 📚 Documentation complète

Voir `GUIDE_WEBHOOK_LINKEDIN.md` pour :
- Intégration avec Zapier, Make.com, n8n
- Format de la requête
- Gestion des erreurs
- Sécurité

