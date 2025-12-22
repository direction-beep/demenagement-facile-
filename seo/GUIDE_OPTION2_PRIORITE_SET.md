# 📋 Guide Option 2 : Nœud "Set" avec Toutes les Priorités

## 🎯 Objectif

Créer un nœud "Set" au début du workflow qui contient toutes les priorités de vos mots-clés, puis les utiliser dans le nœud Code principal.

## 📋 Étape 1 : Préparer les Données de Priorité

### Option A : Depuis Google Sheets

1. **Ouvrez votre Google Sheet** "mots clés voc-call" → "Optimisation SEO"
2. **Sélectionnez** les colonnes `Mot-clé` et `Priorité`
3. **Copiez** toutes les données (Ctrl+C)
4. **Collez** dans un fichier texte temporaire pour les formater

### Option B : Export CSV

1. **Exportez** votre Sheet en CSV
2. **Ouvrez** le CSV dans Excel ou un éditeur de texte
3. **Gardez** seulement les colonnes `Mot-clé` et `Priorité`

## 📋 Étape 2 : Créer le Nœud "Set" dans N8N

### 2.1 Ajouter le Nœud

1. **Dans votre workflow N8N**, ajoutez un nœud **"Set"** ou **"Code"**
2. **Placez-le** au début, juste après le trigger (avant "Query search analytics")
3. **Nommez-le** : `Priorités Mots-Clés`

### 2.2 Si vous utilisez un Nœud "Set"

1. **Ouvrez** le nœud "Set"
2. **Mode** : `Manual` ou `Keep Only Set Fields`
3. **Ajoutez un champ** :
   - **Name** : `priorities`
   - **Value** : Collez l'objet JSON (voir Étape 3)

### 2.3 Si vous utilisez un Nœud "Code"

1. **Ouvrez** le nœud "Code"
2. **Collez** le code JavaScript (voir Étape 3)
3. **Sauvegardez**

## 📋 Étape 3 : Créer l'Objet de Priorités

### Format JSON à Créer

Vous devez créer un objet JavaScript comme ceci :

```javascript
{
  "voc call": 2,
  "call center france": 2,
  "centre d'appel france": 2,
  "relance commerciale": 2,
  // ... tous vos mots-clés avec leur priorité
}
```

### Code pour le Nœud "Code"

Si vous utilisez un nœud "Code", voici le code complet :

```javascript
// Objet contenant toutes les priorités
// Format : { "mot-clé": priorité }
const priorities = {
  "voc call": 2,
  "call center france": 2,
  "centre d'appel france": 2,
  "relance commerciale": 2,
  "prospection téléphonique": 2,
  "service après-vente": 2,
  "hotline": 2,
  "support technique": 2,
  "tickets support": 2,
  "france call center": 2,
  "accueil/secrétariat": 2,
  "télévente": 2,
  "télémarketing": 2,
  "support informatique": 2,
  "service desk": 2,
  "support client": 2,
  "accueil téléphonique": 2,
  "génération de leads": 2,
  "télésecrétariat": 2,
  "secrétariat téléphonique": 2,
  "support utilisateurs": 2,
  "call center français": 2,
  "customer service": 2,
  "helpdesk / it support": 2,
  "relation client": 2,
  "omnicanal": 2,
  "centre de contact": 2,
  "centre d'appels france": 2
  // ... ajoutez tous vos 438 mots-clés ici
};

// Retourner l'objet pour qu'il soit disponible dans les nœuds suivants
return [{ json: { priorities: priorities } }];
```

## 📋 Étape 4 : Générer l'Objet Automatiquement (Optionnel)

Si vous avez beaucoup de mots-clés, vous pouvez créer un script pour générer l'objet automatiquement.

### Script PowerShell pour Générer l'Objet

Créez un fichier `generate-priorities.ps1` :

```powershell
# Lire le CSV exporté depuis Google Sheets
$csv = Import-Csv -Path "priorites.csv" -Delimiter ","

# Générer l'objet JavaScript
$output = "const priorities = {`n"
foreach ($row in $csv) {
    $keyword = $row.'Mot-clé' -replace '"', '\"'
    $priority = $row.Priorité
    $output += "  `"$keyword`": $priority,`n"
}
$output = $output.TrimEnd(",`n") + "`n};"
$output += "`n`nreturn [{ json: { priorities: priorities } }];"

# Sauvegarder
$output | Out-File -FilePath "priorities-code.js" -Encoding UTF8
Write-Host "Fichier généré : priorities-code.js"
```

## 📋 Étape 5 : Connecter le Nœud au Workflow

### Ordre des Nœuds

```
1. Schedule Trigger
   ↓
2. Priorités Mots-Clés (nœud Set/Code) ← NOUVEAU
   ↓
3. Query search analytics
   ↓
4. Code (génère markdown) ← Modifier ce nœud
   ↓
5. HTTP Request
```

### Connexions

- **"Priorités Mots-Clés"** → Connecté à **"Code"** (génère markdown)
- **"Query search analytics"** → Connecté à **"Code"** (génère markdown)

## 📋 Étape 6 : Modifier le Nœud Code Principal

Le nœud Code qui génère le markdown doit maintenant :

1. **Récupérer les priorités** depuis le nœud "Priorités Mots-Clés"
2. **Récupérer les données Search Console** depuis "Query search analytics"
3. **Faire le JOIN** entre les deux

### Code Modifié

Utilisez le code dans `seo/CODE_N8N_PRIORITE_AVEC_SET.js` (je vais le créer).

## 📋 Étape 7 : Tester

1. **Exécutez** le workflow
2. **Vérifiez** que le nœud "Priorités Mots-Clés" retourne bien les priorités
3. **Vérifiez** dans le nœud Code que les priorités sont bien récupérées
4. **Vérifiez** le rapport généré sur GitHub

## ⚠️ Points Importants

1. **Normalisation des Mots-Clés** : Les mots-clés doivent être normalisés (minuscules, sans accents) pour le matching
2. **Mise à Jour** : Si vous ajoutez/modifiez des priorités dans le Sheet, vous devez mettre à jour le nœud "Set"
3. **Performance** : Avec 438 mots-clés, l'objet est petit et rapide

## 🔄 Alternative : Génération Automatique

Si vous voulez automatiser la mise à jour des priorités, vous pouvez :

1. **Créer un workflow N8N séparé** qui lit le Sheet et génère le code
2. **Exécuter ce workflow** avant votre workflow principal
3. **Copier-coller** le code généré dans le nœud "Set"

---

**Suivez ces étapes et vous aurez les priorités disponibles dans votre workflow !**






