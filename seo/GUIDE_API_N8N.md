# Guide API N8N - Envoi Direct via HTTPS

Ce guide explique comment configurer N8N pour envoyer directement les positions de mots-clés via une requête HTTPS vers l'API VOC-Call.

## 🚀 Méthode Recommandée : API HTTPS

Au lieu d'écrire un fichier localement, N8N peut envoyer les données directement via HTTPS vers l'API déployée sur Vercel.

## 📍 URL de l'API

### Production (Vercel)
```
https://voc-call.fr/api/webhook-n8n-keywords
```

### Local (pour tests)
```
http://localhost:3000/api/webhook-n8n-keywords
```

## 🔐 Configuration de Sécurité

### Variable d'Environnement Requise

Dans Vercel, ajoutez cette variable d'environnement :
- `WEBHOOK_SECRET` : Un secret de votre choix (ex: `votre-secret-super-securise-2024`)

### Header Requis

N8N doit envoyer ce header dans chaque requête :
```
X-Webhook-Secret: votre-secret-super-securise-2024
```

## 📤 Configuration N8N

### Option 1 : Format JSON (Recommandé)

Dans votre workflow N8N, ajoutez un nœud **HTTP Request** :

**Configuration :**
- **Method** : `POST`
- **URL** : `https://voc-call.fr/api/webhook-n8n-keywords`
- **Authentication** : `None` (on utilise le header secret)
- **Headers** :
  ```
  Content-Type: application/json
  X-Webhook-Secret: votre-secret-super-securise-2024
  ```
- **Body** : `JSON`
- **Body Content** :
  ```json
  {
    "content": "{{ $json.markdown }}",
    "format": "markdown",
    "withDate": false
  }
  ```

**Exemple de workflow N8N :**
1. Nœud **Google Search Console** → Récupère les positions
2. Nœud **Function** → Formate en markdown avec priorités
3. Nœud **HTTP Request** → Envoie vers l'API

### Option 2 : Format Markdown Direct

**Configuration :**
- **Method** : `POST`
- **URL** : `https://voc-call.fr/api/webhook-n8n-keywords`
- **Headers** :
  ```
  Content-Type: text/markdown
  X-Webhook-Secret: votre-secret-super-securise-2024
  ```
- **Body** : `Raw`
- **Body Content** : `{{ $json.markdown }}` (le markdown directement)

## 📋 Exemple de Données à Envoyer

### Format JSON
```json
{
  "content": "# Positions Mots-Clés VOC-Call\n\n**Date** : 2024-12-15\n\n## 🔴 Priorité 1\n\n| Mot-clé | Position | URL |\n|---------|----------|-----|\n| call center france | 12 | index.html |\n\n## 🟡 Priorité 2\n\n| Mot-clé | Position | URL |\n|---------|----------|-----|\n| helpdesk externalisé | 8 | services/helpdesk.html |",
  "format": "markdown",
  "withDate": false
}
```

### Format Markdown Direct
```markdown
# Positions Mots-Clés VOC-Call

**Date** : 2024-12-15

## 🔴 Priorité 1

| Mot-clé | Position | URL |
|---------|----------|-----|
| call center france | 12 | index.html |

## 🟡 Priorité 2

| Mot-clé | Position | URL |
|---------|----------|-----|
| helpdesk externalisé | 8 | services/helpdesk.html |
```

## ✅ Réponse de l'API

### Succès (200 OK)
```json
{
  "success": true,
  "message": "Keywords data received and saved successfully",
  "data": {
    "success": true,
    "filePath": "seo/positions-keywords-n8n.md",
    "size": 1234,
    "message": "Keywords file saved successfully"
  }
}
```

### Erreur (400/401/500)
```json
{
  "error": "Bad request",
  "message": "Missing required field: content"
}
```

## 🔄 Workflow N8N Complet

### Étape 1 : Récupérer les Positions
- Utilisez le nœud **Google Search Console** ou votre source de données
- Récupérez : mot-clé, position, URL, évolution

### Étape 2 : Classer par Priorité
- Utilisez un nœud **Function** ou **Code** pour classer :
  - Priorité 1 : Positions 11-20 (proche top 10)
  - Priorité 2 : Positions 4-10 (proche top 3)
  - Priorité 3 : Positions 21+ (long terme)
  - Priorité 4 : Régressions (positions qui baissent)

### Étape 3 : Formater en Markdown
```javascript
// Exemple de code N8N Function
const keywords = $input.all();

let markdown = `# Positions Mots-Clés VOC-Call\n\n`;
markdown += `**Date d'analyse** : ${new Date().toISOString().split('T')[0]}\n\n`;

// Priorité 1
const priority1 = keywords.filter(k => k.position >= 11 && k.position <= 20);
if (priority1.length > 0) {
  markdown += `## 🔴 Priorité 1 - Proche Top 10\n\n`;
  markdown += `| Mot-clé | Position | Évolution | URL |\n`;
  markdown += `|---------|----------|-----------|-----|\n`;
  priority1.forEach(k => {
    markdown += `| ${k.keyword} | ${k.position} | ${k.evolution || '-'} | ${k.url} |\n`;
  });
  markdown += `\n`;
}

// ... (répéter pour autres priorités)

return { markdown };
```

### Étape 4 : Envoyer vers l'API
- Configurez le nœud **HTTP Request** comme décrit ci-dessus
- Testez avec un nœud **Execute Workflow** ou déclencheur manuel

## 🧪 Test de l'API

### Avec cURL
```bash
curl -X POST https://voc-call.fr/api/webhook-n8n-keywords \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Secret: votre-secret-super-securise-2024" \
  -d '{
    "content": "# Test\n\n## Priorité 1\n- Test keyword : Position 15",
    "format": "markdown"
  }'
```

### Avec PowerShell
```powershell
$headers = @{
    "Content-Type" = "application/json"
    "X-Webhook-Secret" = "votre-secret-super-securise-2024"
}

$body = @{
    content = "# Test`n`n## Priorité 1`n- Test keyword : Position 15"
    format = "markdown"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://voc-call.fr/api/webhook-n8n-keywords" `
    -Method POST `
    -Headers $headers `
    -Body $body
```

## 🔍 Vérification

Après l'envoi, vérifiez que le fichier a été créé :
- `seo/positions-keywords-n8n.md`

Puis dites à l'IA :
```
"Analyse les positions N8N"
```

## 🛠️ Dépannage

### Erreur 401 Unauthorized
- Vérifiez que le header `X-Webhook-Secret` est correct
- Vérifiez que la variable `WEBHOOK_SECRET` est bien configurée dans Vercel

### Erreur 400 Bad Request
- Vérifiez le format du body (JSON valide)
- Vérifiez que le champ `content` est présent

### Erreur 500 Internal Server Error
- Vérifiez les logs Vercel
- Vérifiez que le dossier `seo/` existe dans le projet

## 📊 Planification

Pour automatiser l'envoi, configurez un **Schedule Trigger** dans N8N :
- **Fréquence** : Hebdomadaire (recommandé) ou bi-hebdomadaire
- **Jour** : Lundi matin (pour analyser la semaine précédente)
- **Heure** : 9h00 (avant votre analyse SEO)

## 🔄 Historique avec Dates

Pour garder un historique, utilisez `withDate: true` dans le JSON :
```json
{
  "content": "...",
  "format": "markdown",
  "withDate": true
}
```

Cela créera des fichiers comme :
- `seo/positions-keywords-n8n-2024-12-15.md`
- `seo/positions-keywords-n8n-2024-12-22.md`

---

**Dernière mise à jour** : Décembre 2024








