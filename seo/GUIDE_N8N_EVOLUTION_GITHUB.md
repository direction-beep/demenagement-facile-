# 📘 Guide : Intégrer l'Onglet "Évolution" et Envoyer vers GitHub

Ce guide explique comment configurer votre workflow N8N pour :
1. ✅ Lire l'onglet "évolution" de votre Google Sheet
2. ✅ Analyser les tendances des positions
3. ✅ Envoyer automatiquement les données vers GitHub

---

## 📋 Structure de Votre Workflow N8N

Votre workflow actuel :
```
Schedule Trigger → Get row(s) in sheet → Code in JavaScript → HTTP Request
```

**Workflow recommandé avec évolution :**
```
Schedule Trigger 
  → Get row(s) in sheet (onglet "évolution") 
  → Code: Analyse Évolution (CODE_N8N_EVOLUTION_POSITIONS.js)
  → Code: Préparation GitHub (CODE_N8N_GITHUB_PUSH.js)
  → HTTP Request (vers GitHub)
```

---

## 🔧 Configuration Étape par Étape

### Étape 1 : Configurer "Get row(s) in sheet" pour l'onglet "évolution"

1. **Dans N8N**, ouvrez votre nœud "Get row(s) in sheet"
2. **Sheet Name** : Sélectionnez votre Google Sheet
3. **Sheet Tab/Name** : `évolution` (le nom exact de votre onglet)
4. **Options** :
   - **Range** : Laissez vide pour lire toutes les lignes
   - Ou spécifiez : `A2:G100` (si vous avez un header en ligne 1)

**Structure attendue de l'onglet "évolution" :**
- **Colonne A** : Priorité (ex: 2, 1, 0)
- **Colonne B** : Mot-clé (ex: "call center france")
- **Colonne E** : Date 1 (ex: 2025-12-08) - Position
- **Colonne F** : Date 2 (ex: 2025-12-12) - Position
- **Colonne G** : Date 3 (ex: 2025-12-15) - Position
- ... (autres colonnes de dates)

---

### Étape 2 : Ajouter le Code d'Analyse Évolution

1. **Ajoutez un nœud "Code"** après "Get row(s) in sheet"
2. **Language** : JavaScript
3. **Copiez-collez** le contenu de `seo/CODE_N8N_EVOLUTION_POSITIONS.js`

**Ce code va :**
- ✅ Lire toutes les lignes de l'onglet "évolution"
- ✅ Identifier automatiquement les colonnes de dates
- ✅ Calculer les tendances (amélioration/régression)
- ✅ Déterminer l'urgence selon la priorité et la tendance
- ✅ Générer un rapport markdown complet

---

### Étape 3 : Ajouter le Code de Préparation GitHub

1. **Ajoutez un autre nœud "Code"** après le code d'analyse
2. **Language** : JavaScript
3. **Copiez-collez** le contenu de `seo/CODE_N8N_GITHUB_PUSH.js`

**Ce code va :**
- ✅ Préparer les données pour l'envoi vers GitHub
- ✅ Formater le payload pour le webhook ou l'API GitHub

---

### Étape 4 : Configurer l'Envoi vers GitHub

Vous avez **2 options** :

#### ✅ Option 1 : Via Webhook (RECOMMANDÉ - Plus Simple)

1. **Ajoutez un nœud "HTTP Request"**
2. **Method** : `POST`
3. **URL** : `https://voc-call.fr/api/webhook-n8n-keywords`
4. **Authentication** : None (le secret est dans les headers)
5. **Headers** :
   ```
   Content-Type: application/json
   X-Webhook-Secret: votre-secret-key
   ```
   *(Configurez `WEBHOOK_SECRET` dans Vercel)*
6. **Body** : 
   ```json
   {
     "content": "{{ $json.webhook.body.content }}",
     "format": "markdown"
   }
   ```

**Avantages :**
- ✅ Simple à configurer
- ✅ Le webhook gère automatiquement le commit GitHub
- ✅ Pas besoin de token GitHub

#### ✅ Option 2 : Via GitHub API Directe

1. **Ajoutez un nœud "HTTP Request"**
2. **Method** : `PUT`
3. **URL** : `https://api.github.com/repos/direction-beep/voc-call/contents/seo/{{ $json.filename }}`
4. **Authentication** : Generic Credential Type
   - **Name** : `github-token`
   - **Value** : Votre GitHub Personal Access Token
5. **Headers** :
   ```
   Authorization: token {{ $credentials.github-token }}
   Accept: application/vnd.github.v3+json
   Content-Type: application/json
   ```
6. **Body** :
   ```json
   {
     "message": "Update SEO evolution report - {{ $now.toISO() }}",
     "content": "{{ $json.githubApi.body.content }}",
     "branch": "main"
   }
   ```

**Avantages :**
- ✅ Contrôle total sur le commit
- ✅ Peut gérer les fichiers existants (SHA requis)

---

## 🔐 Configuration des Secrets

### Pour l'Option 1 (Webhook)

**Dans Vercel :**
1. Allez dans **Settings** → **Environment Variables**
2. Ajoutez :
   - `WEBHOOK_SECRET` : Votre secret (ex: `mon-secret-super-securise-123`)

**Dans N8N :**
1. Utilisez ce secret dans le header `X-Webhook-Secret`

### Pour l'Option 2 (GitHub API)

**Créer un GitHub Personal Access Token :**
1. Allez sur GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. Cliquez **Generate new token (classic)**
3. **Scopes** : Cochez `repo` (accès complet aux repositories)
4. **Copiez le token** (il ne sera affiché qu'une fois)

**Dans N8N :**
1. Allez dans **Credentials** → **Add Credential**
2. **Type** : Generic Credential Type
3. **Name** : `github-token`
4. **Value** : Votre token GitHub

---

## 📊 Format des Données Générées

Le workflow génère un fichier markdown avec :

### Structure du Rapport

```markdown
# 📈 Rapport Évolution Positions SEO - VOC-Call
**Date d'analyse** : 2025-12-15
**Source** : Google Sheet - Onglet "évolution"
**Période analysée** : 2025-12-08 → 2025-12-15

## 🚨 ACTIONS URGENTES - Régressions Critiques
| Mot-clé | Position Actuelle | Variation | Tendance | 💡 Action SEO |
|---------|-------------------|-----------|----------|---------------|
| call center france | 22.67 | +5.2 (23%) | 📉 Régression | 🚨 URGENT : Corriger régression |

## 📈 Améliorations - À Maintenir
| Mot-clé | Priorité | Position Actuelle | Variation | Tendance | 💡 Action SEO |
|---------|----------|-------------------|-----------|----------|---------------|
| permanence telephonique | Prioritaire | 1.48 | -0.5 (34%) | 📈 Amélioration | ✅ Maintenir (amélioration) |

## 📊 Détails par Mot-Clé
...
```

---

## 🎯 Résultat Attendu

Après exécution du workflow :

1. ✅ **Fichier créé sur GitHub** : `seo/evolution-positions-seo-YYYY-MM-DD.md`
2. ✅ **Commit automatique** avec message descriptif
3. ✅ **Rapport complet** avec :
   - Régressions critiques à corriger
   - Régressions modérées à surveiller
   - Améliorations à maintenir
   - Plan d'action recommandé

---

## 🔄 Workflow Complet Recommandé

```
┌─────────────────┐
│ Schedule Trigger│ (Quotidien ou Hebdomadaire)
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│ Get row(s) in sheet     │ (Onglet: "évolution")
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Code: Analyse Évolution │ (CODE_N8N_EVOLUTION_POSITIONS.js)
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Code: Préparation GitHub│ (CODE_N8N_GITHUB_PUSH.js)
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ HTTP Request             │ (Vers webhook ou GitHub API)
│ → GitHub                 │
└─────────────────────────┘
```

---

## 🧪 Test du Workflow

### Test Manuel

1. **Exécutez le workflow manuellement** dans N8N
2. **Vérifiez les données** à chaque étape :
   - Les données du sheet sont bien récupérées
   - Le code d'analyse génère bien le markdown
   - Le code GitHub prépare bien le payload
   - L'HTTP Request envoie bien les données

### Vérification sur GitHub

1. Allez sur votre repository : `https://github.com/direction-beep/voc-call`
2. Vérifiez le fichier : `seo/evolution-positions-seo-YYYY-MM-DD.md`
3. Vérifiez les commits récents

---

## ❓ Questions Fréquentes

**Q : Puis-je combiner l'analyse "évolution" avec l'analyse "priorité" ?**  
R : Oui ! Vous pouvez créer deux branches dans votre workflow :
- Une branche pour l'analyse des priorités (onglet principal)
- Une branche pour l'analyse de l'évolution (onglet "évolution")
- Puis fusionner les résultats dans un rapport final

**Q : Que faire si les colonnes de dates changent ?**  
R : Le code détecte automatiquement les colonnes avec format `YYYY-MM-DD`. Si vous changez le format, modifiez la regex dans `CODE_N8N_EVOLUTION_POSITIONS.js` :
```javascript
if (/^\d{4}-\d{2}-\d{2}$/.test(key)) {
```

**Q : Comment gérer les valeurs "N/A" ?**  
R : Le code ignore automatiquement les valeurs "N/A" et calcule les tendances uniquement avec les positions valides.

**Q : Puis-je envoyer vers plusieurs destinations ?**  
R : Oui ! Ajoutez plusieurs nœuds "HTTP Request" après le code de préparation GitHub.

---

## 📝 Checklist de Configuration

- [ ] Google Sheet configuré avec onglet "évolution"
- [ ] Nœud "Get row(s) in sheet" configuré pour l'onglet "évolution"
- [ ] Code d'analyse évolution ajouté et testé
- [ ] Code de préparation GitHub ajouté
- [ ] HTTP Request configuré (webhook ou GitHub API)
- [ ] Secrets configurés (WEBHOOK_SECRET ou GITHUB_TOKEN)
- [ ] Workflow testé manuellement
- [ ] Fichier vérifié sur GitHub

---

**Dernière mise à jour** : Décembre 2025




