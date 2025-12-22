# 📘 Guide : Configurer HTTP Request avec JSON dans N8N

## ❌ Problème Courant

Quand vous utilisez `{{ $json.markdown }}` directement dans le JSON, vous obtenez l'erreur :
```
JSON parameter needs to be valid JSON
```

## ✅ Solution : Utiliser JSON.stringify()

### Dans le Nœud HTTP Request

1. **Body Content Type** : `JSON`
2. **Specify Body** : `Using JSON`
3. **JSON Input Field** : Utilisez cette syntaxe :

```json
{
  "content": {{ JSON.stringify($json.markdown) }},
  "format": "markdown",
  "withDate": false
}
```

### Explication

`JSON.stringify()` échappe correctement :
- ✅ Les retours à la ligne (`\n`)
- ✅ Les guillemets (`"`)
- ✅ Les caractères spéciaux
- ✅ Les tabulations

## 🔄 Alternative : Utiliser le Nœud Code

Si `JSON.stringify()` ne fonctionne pas dans l'HTTP Request, ajoutez un nœud **Code** avant :

### Code à mettre dans le Nœud Code :

```javascript
// Récupérer les données
const inputData = $input.first().json;

// Construire le payload
const payload = {
  content: inputData.markdown || '',
  format: "markdown",
  withDate: false
};

// Retourner le payload stringifié
return [{
  json: {
    payloadString: JSON.stringify(payload),
    // Ou directement l'objet si vous utilisez "Using Expression"
    payload: payload
  }
}];
```

### Puis dans l'HTTP Request :

**Option A : Utiliser la chaîne JSON**
- **Body Content Type** : `JSON`
- **Specify Body** : `Using JSON`
- **JSON Input Field** : `{{ $json.payloadString }}`

**Option B : Utiliser l'expression**
- **Body Content Type** : `JSON`
- **Specify Body** : `Using Expression`
- **Expression** : `{{ $json.payload }}`

## 📝 Exemple Complet

### Workflow Recommandé :

```
Code (Analyse) 
  → Code (Préparation JSON) 
  → HTTP Request (Envoi)
```

### Nœud "Préparation JSON" :

```javascript
const inputData = $input.first().json;

return [{
  json: {
    // Pour HTTP Request avec "Using JSON"
    bodyJson: JSON.stringify({
      content: inputData.markdown || '',
      format: "markdown",
      withDate: false
    }),
    // Pour HTTP Request avec "Using Expression"
    bodyObject: {
      content: inputData.markdown || '',
      format: "markdown",
      withDate: false
    }
  }
}];
```

### Nœud HTTP Request :

**Configuration :**
- **Method** : `POST`
- **URL** : `https://voc-call.fr/api/webhook-n8n-keywords`
- **Headers** :
  - `Content-Type`: `application/json`
  - `X-Webhook-Secret`: `votre-secret`
- **Body Content Type** : `JSON`
- **Specify Body** : `Using JSON`
- **JSON Input Field** : `{{ $json.bodyJson }}`

## ✅ Vérification

Après configuration, le **Result** preview dans N8N devrait afficher :

```json
{
  "content": "# Rapport Évolution Positions SEO...\n\n## Vue d'Ensemble...",
  "format": "markdown",
  "withDate": false
}
```

Le contenu markdown doit être entre guillemets et les retours à la ligne échappés avec `\n`.




