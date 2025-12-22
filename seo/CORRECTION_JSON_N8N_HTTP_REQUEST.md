# 🔧 Correction JSON pour HTTP Request N8N

## ❌ Problème

Le JSON suivant ne fonctionne pas car `{{ $json.markdown }}` n'est pas échappé :

```json
{
  "content": {{ $json.markdown }},
  "format": "markdown",
  "withDate": false
}
```

**Erreur** : "JSON parameter needs to be valid JSON"

## ✅ Solution 1 : Utiliser JSON.stringify() (Recommandé)

Dans N8N, dans le champ **JSON Input Field** du nœud HTTP Request, utilisez :

```json
{
  "content": {{ JSON.stringify($json.markdown) }},
  "format": "markdown",
  "withDate": false
}
```

## ✅ Solution 2 : Utiliser une Expression JavaScript

Si la solution 1 ne fonctionne pas, utilisez une expression complète :

```javascript
{
  "content": {{ JSON.stringify($json.markdown || '') }},
  "format": "markdown",
  "withDate": false
}
```

## ✅ Solution 3 : Construire le JSON dans un Nœud Code (Plus Robuste)

Ajoutez un nœud **Code** entre votre code d'analyse et l'HTTP Request :

**Code à mettre dans le nœud Code :**

```javascript
// Récupérer les données du nœud précédent
const inputData = $input.first().json;

// Construire le payload JSON correctement échappé
const payload = {
  content: inputData.markdown || '',
  format: "markdown",
  withDate: false
};

// Retourner le payload
return [{
  json: {
    payload: payload,
    payloadString: JSON.stringify(payload)
  }
}];
```

Puis dans l'HTTP Request, utilisez :
- **Body Content Type** : `JSON`
- **Specify Body** : `Using JSON`
- **JSON Input Field** : `{{ $json.payloadString }}`

OU directement :
- **Body Content Type** : `JSON`
- **Specify Body** : `Using JSON`
- **JSON Input Field** : 
```json
{{ $json.payload }}
```

## ✅ Solution 4 : Utiliser "Using Expression" (Alternative)

Dans l'HTTP Request :
- **Body Content Type** : `JSON`
- **Specify Body** : `Using Expression`
- **Expression** :
```javascript
{
  content: $json.markdown,
  format: "markdown",
  withDate: false
}
```

## 🎯 Solution Recommandée

**Utilisez la Solution 1** avec `JSON.stringify()` :

```json
{
  "content": {{ JSON.stringify($json.markdown) }},
  "format": "markdown",
  "withDate": false
}
```

Cela échappera correctement tous les caractères spéciaux, retours à la ligne, et guillemets dans le markdown.

