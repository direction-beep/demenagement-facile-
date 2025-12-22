# Webhook LinkedIn - Guide rapide

## Déploiement

Le webhook est automatiquement déployé sur Vercel avec votre site.

## Configuration Vercel

Ajoutez ces variables d'environnement dans Vercel :

1. `WEBHOOK_SECRET` - Secret pour sécuriser le webhook
2. `LINKEDIN_ACCESS_TOKEN` - Token LinkedIn
3. `LINKEDIN_PERSON_URN` - URN LinkedIn (optionnel)
4. `SITE_URL` - URL du site (optionnel, défaut: https://voc-call.fr)

## URL du Webhook

```
https://voc-call.fr/api/webhook-linkedin
```

## Utilisation

```bash
curl -X POST https://voc-call.fr/api/webhook-linkedin \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Secret: votre-secret" \
  -d '{
    "title": "Titre",
    "slug": "slug-article",
    "excerpt": "Description",
    "category": "Catégorie",
    "readTime": "5 min"
  }'
```

Voir `GUIDE_WEBHOOK_LINKEDIN.md` pour les détails complets.

