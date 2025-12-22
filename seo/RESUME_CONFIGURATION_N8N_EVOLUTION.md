# ✅ Résumé : Configuration N8N pour Onglet "Évolution" + GitHub

**Date** : Décembre 2025

---

## 📋 Ce qui a été créé

### 1. Code N8N pour l'Analyse Évolution
**Fichier** : `seo/CODE_N8N_EVOLUTION_POSITIONS.js`

**Fonctionnalités** :
- ✅ Lit l'onglet "évolution" de votre Google Sheet
- ✅ Détecte automatiquement les colonnes de dates
- ✅ Calcule les tendances (amélioration/régression)
- ✅ Détermine l'urgence selon la priorité et la tendance
- ✅ Génère un rapport markdown complet

### 2. Code N8N pour l'Envoi GitHub
**Fichier** : `seo/CODE_N8N_GITHUB_PUSH.js`

**Fonctionnalités** :
- ✅ Prépare les données pour l'envoi vers GitHub
- ✅ Supporte 2 méthodes : Webhook (recommandé) ou GitHub API
- ✅ Formate le payload correctement

### 3. Guide Complet
**Fichier** : `seo/GUIDE_N8N_EVOLUTION_GITHUB.md`

**Contenu** :
- ✅ Configuration étape par étape
- ✅ 2 options d'envoi (Webhook ou GitHub API)
- ✅ Configuration des secrets
- ✅ Workflow complet recommandé
- ✅ Checklist de configuration

### 4. Stratégie SEO Basée sur l'Évolution
**Fichier** : `seo/STRATEGIE_SEO_EVOLUTION.md`

**Contenu** :
- ✅ Logique d'analyse des tendances
- ✅ Actions par type de tendance
- ✅ Planning d'action par semaine
- ✅ Intégration dans la stratégie globale
- ✅ Métriques de succès

---

## 🚀 Configuration Rapide

### Étape 1 : Modifier votre Workflow N8N

**Workflow actuel :**
```
Schedule Trigger → Get row(s) in sheet → Code → HTTP Request
```

**Workflow recommandé :**
```
Schedule Trigger 
  → Get row(s) in sheet (onglet: "évolution")
  → Code: Analyse Évolution (CODE_N8N_EVOLUTION_POSITIONS.js)
  → Code: Préparation GitHub (CODE_N8N_GITHUB_PUSH.js)
  → HTTP Request (vers GitHub)
```

### Étape 2 : Configurer "Get row(s) in sheet"

1. **Sheet Tab/Name** : `évolution`
2. **Range** : Laissez vide (ou `A2:G100` si vous avez un header)

### Étape 3 : Ajouter les Codes

1. **Premier Code** : Copiez `seo/CODE_N8N_EVOLUTION_POSITIONS.js`
2. **Deuxième Code** : Copiez `seo/CODE_N8N_GITHUB_PUSH.js`

### Étape 4 : Configurer l'Envoi GitHub

**Option 1 : Via Webhook (RECOMMANDÉ)**

1. **HTTP Request** :
   - **URL** : `https://voc-call.fr/api/webhook-n8n-keywords`
   - **Method** : `POST`
   - **Headers** :
     ```
     Content-Type: application/json
     X-Webhook-Secret: votre-secret
     ```
   - **Body** :
     ```json
     {
       "content": "{{ $json.webhook.body.content }}",
       "format": "markdown"
     }
     ```

**Option 2 : Via GitHub API**

1. **HTTP Request** :
   - **URL** : `https://api.github.com/repos/direction-beep/voc-call/contents/seo/{{ $json.filename }}`
   - **Method** : `PUT`
   - **Headers** :
     ```
     Authorization: token VOTRE_TOKEN_GITHUB
     Accept: application/vnd.github.v3+json
     ```
   - **Body** : Utilisez `{{ $json.githubApi.body }}`

---

## 📊 Résultat Attendu

Après exécution du workflow :

1. ✅ **Fichier créé sur GitHub** : `seo/evolution-positions-seo-YYYY-MM-DD.md`
2. ✅ **Rapport complet** avec :
   - Régressions critiques à corriger
   - Régressions modérées à surveiller
   - Améliorations à maintenir
   - Plan d'action recommandé

---

## 🔐 Secrets à Configurer

### Pour l'Option 1 (Webhook)

**Dans Vercel** :
- Variable d'environnement : `WEBHOOK_SECRET`

**Dans N8N** :
- Header : `X-Webhook-Secret: votre-secret`

### Pour l'Option 2 (GitHub API)

**Dans N8N** :
- Credential : `github-token` (GitHub Personal Access Token avec scope `repo`)

---

## 📝 Checklist

- [ ] Workflow N8N modifié pour lire l'onglet "évolution"
- [ ] Code d'analyse évolution ajouté
- [ ] Code de préparation GitHub ajouté
- [ ] HTTP Request configuré (webhook ou GitHub API)
- [ ] Secrets configurés
- [ ] Workflow testé manuellement
- [ ] Fichier vérifié sur GitHub

---

## 📚 Documentation

- **Guide complet** : `seo/GUIDE_N8N_EVOLUTION_GITHUB.md`
- **Stratégie SEO** : `seo/STRATEGIE_SEO_EVOLUTION.md`
- **Code évolution** : `seo/CODE_N8N_EVOLUTION_POSITIONS.js`
- **Code GitHub** : `seo/CODE_N8N_GITHUB_PUSH.js`

---

**Status** : ✅ **PRÊT À UTILISER**

