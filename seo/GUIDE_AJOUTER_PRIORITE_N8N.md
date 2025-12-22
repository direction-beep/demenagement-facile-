# 📋 Guide : Ajouter la Colonne "Priorité" dans N8N

## 🎯 Objectif

Modifier votre nœud Google Sheets dans N8N pour qu'il récupère aussi la colonne **"Priorité"** en plus des autres colonnes.

## 📍 Étape 1 : Identifier le Nœud à Modifier

Dans votre workflow N8N, vous avez probablement un nœud qui lit ou met à jour Google Sheets. Il peut s'appeler :
- **"Update row in sheet"** (mise à jour)
- **"Read from Sheet"** (lecture)
- **"Query search analytics"** (si c'est celui qui lit le Sheet)

## 🔧 Étape 2 : Modifier le Nœud "Update row in sheet"

### Si vous utilisez "Update row in sheet" :

1. **Cliquez sur le nœud "Update row in sheet"** dans votre workflow
2. **Ouvrez l'onglet "Parameters"** ou **"Fields to Update"**
3. **Cherchez la section** qui liste les colonnes à mettre à jour ou à lire
4. **Ajoutez la colonne "Priorité"** :
   - Cliquez sur **"Add Field"** ou **"Add Column"**
   - Dans **"Column"** ou **"Field Name"**, tapez : `Priorité`
   - Dans **"Value"**, vous pouvez laisser vide ou mettre une valeur par défaut
5. **Sauvegardez** le nœud

### Configuration Typique :

```
Fields to Update:
├─ Mot-clé → {{ $json['Mot-clé'] }}
├─ Ranking actuelle → {{ $json.Position }}
├─ CTR → {{ $json.CTR }}
├─ Click → {{ $json.Cliques }}
├─ Impressions → {{ $json.Impressions }}
└─ Priorité → {{ $json.Priorité }}  ← AJOUTEZ CETTE LIGNE
```

## 🔧 Étape 3 : Modifier le Nœud "Read from Sheet" (si vous en avez un)

### Si vous avez un nœud qui LIT le Sheet :

1. **Cliquez sur le nœud "Read from Sheet"** ou équivalent
2. **Ouvrez l'onglet "Parameters"**
3. **Cherchez la section "Columns"** ou **"Fields to Read"**
4. **Ajoutez "Priorité"** à la liste des colonnes :
   - Cliquez sur **"Add Column"**
   - Tapez : `Priorité`
5. **Sauvegardez** le nœud

## 🔧 Étape 4 : Vérifier le Mapping des Colonnes

### Si vous utilisez un nœud "Merge" ou "Join" :

1. **Vérifiez le nœud qui combine les données**
2. **Assurez-vous** que "Priorité" est bien mappée
3. **Vérifiez** que la colonne "Mot-clé" est utilisée comme clé de jointure

## 🧪 Étape 5 : Tester

1. **Exécutez votre workflow** manuellement
2. **Cliquez sur votre nœud Code** (celui qui génère le markdown)
3. **Ouvrez l'onglet "INPUT"** → **"Table"** ou **"JSON"**
4. **Vérifiez** que la colonne **"Priorité"** apparaît maintenant dans les données

### Résultat Attendu :

Vous devriez voir dans l'INPUT :
```
| Mot-clé | Ranking actuelle | CTR | Click | Impressions | Priorité |
|---------|------------------|-----|-------|-------------|----------|
| voc call | 1.04 | 0.74 | 50 | 67 | 2 |
```

## ⚠️ Problèmes Courants

### Problème 1 : La colonne n'apparaît pas dans la liste

**Solution** :
- Vérifiez que la colonne "Priorité" existe bien dans votre Google Sheet
- Vérifiez l'orthographe exacte (avec accent : "Priorité")
- Rafraîchissez la connexion au Sheet dans N8N

### Problème 2 : Les valeurs sont vides

**Solution** :
- Vérifiez que les cellules "Priorité" dans votre Sheet contiennent bien des valeurs (0, 1, ou 2)
- Vérifiez que le mapping est correct dans N8N

### Problème 3 : Le nœud ne permet pas d'ajouter de colonnes

**Solution** :
- Utilisez un nœud "Read from Sheet" séparé pour lire "Priorité"
- Utilisez un nœud "Merge" pour combiner les données

## 🔄 Workflow Recommandé (si nécessaire)

Si vous devez créer un nouveau workflow :

```
1. Schedule Trigger
   ↓
2. Query search analytics (récupère positions)
   ↓
3. Read from Sheet (récupère Mot-clé + Priorité)
   ↓
4. Merge/JOIN (combine par Mot-clé)
   ↓
5. Code (génère le markdown avec priorité)
   ↓
6. HTTP Request (envoie vers API)
```

## 📝 Exemple de Configuration N8N

### Nœud "Read from Sheet" :

**Operation** : Read
**Sheet** : Votre nom de Sheet
**Columns** :
- `Mot-clé`
- `Priorité` ← AJOUTEZ

### Nœud "Merge" :

**Mode** : Merge
**Join** : Par "Mot-clé"
**Output** : Toutes les colonnes des deux sources

---

## ✅ Checklist

- [ ] Nœud Google Sheets modifié pour inclure "Priorité"
- [ ] Colonne "Priorité" visible dans l'INPUT du nœud Code
- [ ] Valeurs de priorité correctes (0, 1, ou 2)
- [ ] Workflow testé et fonctionnel

---

**Une fois que "Priorité" apparaît dans l'INPUT, le code fonctionnera automatiquement !**






