# 🔧 Correction : Get row(s) in sheet retourne des métadonnées au lieu des données

## ❌ Problème

Le nœud "Get row(s) in sheet" retourne seulement 1 item avec des métadonnées :
```json
{
  "success": true,
  "column": 8,
  "rowsUpdated": 230
}
```

Au lieu de retourner les 230 lignes de données.

## ✅ Solution : Configuration du Nœud "Get row(s) in sheet"

### Option 1 : Utiliser "Read Rows" au lieu de "Get row(s)"

1. **Supprimez** le nœud "Get row(s) in sheet"
2. **Ajoutez** un nœud "Google Sheets" → **"Read Rows"**
3. **Configurez** :
   - **Sheet Name** : Votre Google Sheet
   - **Sheet Tab/Name** : `évolution`
   - **Options** → **Use First Row as Headers** : ✅ Activé
   - **Range** : Laissez vide (pour lire toutes les lignes) OU `A2:Z230` (si header en ligne 1)

### Option 2 : Corriger "Get row(s) in sheet"

Si vous gardez "Get row(s) in sheet", vérifiez :

1. **Operation** : Doit être `Get` ou `Read`
2. **Sheet Tab/Name** : `évolution` (exact)
3. **Options** → **Use First Row as Headers** : ✅ Activé
4. **Options** → **Return All** : ✅ Activé (si disponible)
5. **Range** : Laissez vide OU spécifiez `A2:Z230`

### Option 3 : Utiliser "Execute Query"

Si les options ci-dessus ne fonctionnent pas :

1. **Nœud** : "Google Sheets" → **"Execute Query"**
2. **Query** : `SELECT * FROM 'évolution'`
3. **Use First Row as Headers** : ✅ Activé

## 🔍 Vérification

Après configuration, le nœud devrait retourner **230 items** (un par ligne), pas 1 item avec des métadonnées.

Chaque item devrait avoir la structure :
```json
{
  "Priorité": 2,
  "Mot-clé": "call center france",
  "2025-12-08": 76.44,
  "2025-12-12": 74.4,
  "2025-12-15": 12.3
}
```

## 📝 Code JavaScript Adapté

Le code `CODE_N8N_EVOLUTION_4_SEMAINES.js` a été mis à jour pour :
- ✅ Filtrer les métadonnées
- ✅ Afficher un message d'erreur avec debug si aucune donnée n'est trouvée
- ✅ Gérer différents formats de données

Mais **il faut d'abord corriger la configuration du nœud** pour qu'il retourne les vraies données.

