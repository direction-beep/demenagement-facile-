# Correction : Ajouter le filename dans le workflow Évolution

## ❌ JSON Actuel (Incorrect)

```json
{
  "content": {{ JSON.stringify($json.markdown) }},
  "format": "markdown",
  "withDate": false
}
```

**Problème** : Le champ `filename` est manquant, donc le webhook utilise le nom par défaut `positions-keywords-n8n.md`.

## ✅ JSON Corrigé

```json
{
  "content": {{ JSON.stringify($json.markdown) }},
  "format": "markdown",
  "filename": "{{ $json.filename }}",
  "withDate": false
}
```

## 📝 Instructions

1. Ouvrez votre workflow N8N "Évolution"
2. Sélectionnez le nœud **HTTP Request**
3. Allez dans **Body** → **JSON Input Field**
4. Remplacez le JSON par la version corrigée ci-dessus
5. Sauvegardez et exécutez le workflow

## 🎯 Résultat Attendu

Après correction, le fichier sera créé avec le bon nom :
- ✅ `seo/evolution-positions-seo-4-semaines-2025-12-15.md`

Au lieu de :
- ❌ `seo/positions-keywords-n8n.md` (nom par défaut)

## ⚠️ Important

Le champ `filename` doit être récupéré depuis le nœud Code précédent qui génère le rapport. Assurez-vous que votre Code Node retourne bien :

```javascript
return [{
  json: {
    markdown: markdown,
    filename: `evolution-positions-seo-4-semaines-${today}.md`
  }
}];
```

## 🔍 Vérification

Après l'exécution, vérifiez sur GitHub :
- Le fichier `seo/evolution-positions-seo-4-semaines-2025-12-15.md` doit apparaître
- Le fichier `seo/positions-keywords-n8n.md` ne doit plus être écrasé par le workflow d'évolution

