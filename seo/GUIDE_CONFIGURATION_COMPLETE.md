# Guide de Configuration Complète - N8N → VOC-Call

## ✅ Étape 1 : Vercel (DÉJÀ FAIT)

Vous avez configuré :
- **Key** : `WEBHOOK_SECRET`
- **Value** : `voc-call-n8n-XXXXXXXXX` (option 1)

✅ **Action requise** : Redéployez votre site Vercel pour que la variable soit active.

---

## 📋 Étape 2 : Configurer N8N

### 2.1 Ajouter un nœud HTTP Request

Dans votre workflow N8N qui analyse les positions de mots-clés :

1. **Ajoutez un nœud "HTTP Request"** après votre nœud qui génère le markdown
2. **Configurez-le ainsi** :

#### Configuration du nœud HTTP Request :

**Onglet "Parameters" :**
- **Method** : `POST`
- **URL** : `https://voc-call.fr/api/webhook-n8n-keywords`
- **Authentication** : `None` (on utilise le header secret)

**Onglet "Headers" :**
Ajoutez ces deux headers :
- **Name** : `Content-Type` | **Value** : `application/json`
- **Name** : `X-Webhook-Secret` | **Value** : `voc-call-n8n-XXXXXXXXX` *(la même valeur que dans Vercel)*

**Onglet "Body" :**
- **Body Content Type** : `JSON`
- **Specify Body** : `Using JSON`
- **JSON Body** :
```json
{
  "content": "{{ $json.markdown }}",
  "format": "markdown",
  "withDate": false
}
```

*(Remplacez `{{ $json.markdown }}` par la variable qui contient votre markdown dans N8N)*

---

## 🧪 Étape 3 : Tester la Configuration

### Option A : Test depuis N8N

1. **Exécutez votre workflow N8N** (manuellement ou avec un trigger)
2. **Vérifiez la réponse** du nœud HTTP Request :
   - ✅ **Succès** : Vous devriez voir `{"success": true, ...}`
   - ❌ **Erreur 401** : Le secret ne correspond pas
   - ❌ **Erreur 400** : Le format du body est incorrect

### Option B : Test avec PowerShell

Exécutez ce script pour tester l'API :

```powershell
$headers = @{
    "Content-Type" = "application/json"
    "X-Webhook-Secret" = "voc-call-n8n-XXXXXXXXX"
}

$body = @{
    content = "# Test`n`n## Priorite 1`n- Test keyword : Position 15"
    format = "markdown"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://voc-call.fr/api/webhook-n8n-keywords" `
    -Method POST `
    -Headers $headers `
    -Body $body
```

*(Remplacez `voc-call-n8n-XXXXXXXXX` par votre secret)*

---

## ✅ Étape 4 : Vérifier que le Fichier est Créé

Après un envoi réussi, vérifiez que le fichier existe :
- **Chemin** : `seo/positions-keywords-n8n.md`

Le fichier devrait contenir :
- Un en-tête avec la date de mise à jour
- Votre contenu markdown avec les positions

---

## 🔄 Étape 5 : Automatiser avec un Schedule

Pour que N8N envoie automatiquement les données :

1. **Ajoutez un nœud "Schedule Trigger"** au début de votre workflow
2. **Configurez la fréquence** :
   - **Recommandé** : Hebdomadaire (chaque lundi à 9h00)
   - **Ou** : Bi-hebdomadaire (tous les 15 jours)

---

## 📊 Étape 6 : Analyser les Données

Une fois que le fichier est créé, dites à l'IA :

```
"Analyse les positions N8N"
```

L'IA va :
- ✅ Lire le fichier `seo/positions-keywords-n8n.md`
- ✅ Analyser les positions par priorité
- ✅ Identifier les opportunités (positions 11-20, 4-10, régressions)
- ✅ Générer des actions prioritaires
- ✅ Mettre à jour `seo/CHECKLIST_SEO_RAPIDE.md`
- ✅ Adapter la stratégie SEO

---

## 🛠️ Dépannage

### Erreur 401 Unauthorized
- ✅ Vérifiez que le header `X-Webhook-Secret` dans N8N correspond exactement à la valeur dans Vercel
- ✅ Vérifiez que vous avez redéployé Vercel après avoir ajouté la variable

### Erreur 400 Bad Request
- ✅ Vérifiez que le body est bien en JSON
- ✅ Vérifiez que le champ `content` est présent
- ✅ Vérifiez que `{{ $json.markdown }}` contient bien votre markdown

### Erreur 500 Internal Server Error
- ✅ Vérifiez les logs Vercel
- ✅ Vérifiez que le dossier `seo/` existe dans votre projet

### Le fichier n'est pas créé
- ✅ Vérifiez que l'API a bien répondu avec `success: true`
- ✅ Vérifiez les logs Vercel pour voir les erreurs éventuelles

---

## 📝 Exemple de Workflow N8N Complet

```
1. Schedule Trigger (hebdomadaire)
   ↓
2. Google Search Console (récupère positions)
   ↓
3. Function/Code (formate en markdown avec priorités)
   ↓
4. HTTP Request (envoie vers API VOC-Call)
   ↓
5. Notification (optionnel : email/Slack si succès/erreur)
```

---

## 🎯 Prochaines Étapes

1. ✅ **Vercel configuré** (fait)
2. ⏳ **Configurer N8N** (à faire maintenant)
3. ⏳ **Tester la connexion** (à faire)
4. ⏳ **Automatiser avec Schedule** (optionnel)
5. ⏳ **Analyser avec l'IA** (après premier envoi)

---

**Besoin d'aide ?** Dites-moi à quelle étape vous êtes bloqué !








