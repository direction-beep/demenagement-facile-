# Guide : Utilisation du Filename Dynamique dans N8N

## ✅ Modification Effectuée

Le webhook GitHub (`api/webhook-n8n-keywords.js`) a été modifié pour **supporter les noms de fichiers dynamiques**. 

Maintenant, chaque workflow N8N peut générer son propre fichier avec un nom unique, au lieu d'écraser le même fichier.

## 📋 Format du Payload JSON

Dans votre nœud **HTTP Request** de N8N, envoyez le payload suivant :

```json
{
  "content": "{{ $json.markdown }}",
  "format": "markdown",
  "filename": "rapport-seo-priorite-ranking-voc-call-2025-12-15.md"
}
```

### ⚠️ Important : Échappement du Markdown

Le champ `content` doit être **stringifié** pour éviter les problèmes d'échappement JSON :

**Dans N8N HTTP Request → Body → JSON Input Field :**

```json
{
  "content": {{ JSON.stringify($json.markdown) }},
  "format": "markdown",
  "filename": "{{ $json.filename }}"
}
```

## 🔄 Workflows Recommandés

### Workflow 1 : Rapport Évolution (4 semaines)
- **Filename** : `evolution-positions-seo-4-semaines-YYYY-MM-DD.md`
- **Code N8N** : `seo/CODE_N8N_EVOLUTION_4_SEMAINES_SIMPLE.js`
- **Génère** : Analyse des tendances de positions sur 4 semaines

### Workflow 2 : Rapport Priorité + Ranking
- **Filename** : `rapport-seo-priorite-ranking-voc-call-YYYY-MM-DD.md`
- **Code N8N** : `seo/CODE_N8N_PRIORITE_ET_RANKING_COMPLET.js`
- **Génère** : Analyse des priorités et positions actuelles

## 📝 Exemple de Configuration N8N

### Étape 1 : Code Node (Génération du Rapport)

```javascript
// Dans votre Code Node
const markdown = `# Rapport SEO...`;
const filename = `rapport-seo-priorite-ranking-voc-call-${new Date().toISOString().split('T')[0]}.md`;

return [{
  json: {
    markdown: markdown,
    filename: filename
  }
}];
```

### Étape 2 : HTTP Request Node

**URL** : `https://voc-call.fr/api/webhook-n8n-keywords`

**Method** : `POST`

**Headers** :
- `Content-Type`: `application/json`
- `X-Webhook-Secret`: `{{ $env.WEBHOOK_SECRET }}`

**Body** (JSON Input Field) :
```json
{
  "content": {{ JSON.stringify($json.markdown) }},
  "format": "markdown",
  "filename": "{{ $json.filename }}"
}
```

## 🎯 Résultat

Chaque exécution du workflow créera un fichier unique sur GitHub :

- ✅ `seo/evolution-positions-seo-4-semaines-2025-12-15.md`
- ✅ `seo/rapport-seo-priorite-ranking-voc-call-2025-12-15.md`
- ✅ `seo/evolution-positions-seo-4-semaines-2025-12-22.md` (semaine suivante)
- ✅ `seo/rapport-seo-priorite-ranking-voc-call-2025-12-22.md` (semaine suivante)

## 🔍 Vérification

Après l'exécution du workflow, vérifiez sur GitHub :

1. Allez sur : `https://github.com/direction-beep/voc-call/tree/main/seo`
2. Recherchez les fichiers avec la date du jour
3. Vérifiez que les deux rapports sont présents et distincts

## ⚠️ Note Importante

Si vous ne fournissez pas de `filename` dans le payload, le webhook utilisera le nom par défaut :
- `positions-keywords-n8n.md` (comportement de fallback)

## 🐛 Dépannage

### Problème : Le fichier n'apparaît pas sur GitHub

1. Vérifiez que le `filename` est bien inclus dans le payload JSON
2. Vérifiez que `JSON.stringify()` est utilisé pour le champ `content`
3. Vérifiez les logs du webhook dans Vercel
4. Vérifiez que le `X-Webhook-Secret` est correct

### Problème : Erreur JSON malformé

Assurez-vous d'utiliser `JSON.stringify($json.markdown)` et non `{{ $json.markdown }}` directement dans le champ `content`.




