# Guide de Déploiement Vercel - Endpoint N8N

## ❌ Problème Actuel

L'endpoint retourne **404 Not Found** car il n'est pas encore déployé sur Vercel.

## ✅ Solution : Déployer le Fichier API

### Étape 1 : Vérifier que le Fichier est Commité

Le fichier `api/webhook-n8n-keywords.js` doit être dans votre dépôt Git.

**Vérification :**
```powershell
git status
```

Si le fichier apparaît comme "Untracked" ou "Modified", vous devez le commiter.

### Étape 2 : Commiter et Pousser

```powershell
# Ajouter le fichier
git add api/webhook-n8n-keywords.js

# Commiter
git commit -m "Add N8N keywords webhook endpoint"

# Pousser sur votre repo
git push
```

### Étape 3 : Vérifier le Déploiement Vercel

**Option A : Déploiement Automatique (Recommandé)**

Si Vercel est connecté à votre repo Git :
1. ✅ Le push déclenche automatiquement un déploiement
2. ✅ Allez dans Vercel → Votre projet → "Deployments"
3. ✅ Attendez que le déploiement soit terminé (statut "Ready")
4. ✅ Vérifiez les logs pour voir si l'endpoint est bien déployé

**Option B : Déploiement Manuel**

Si vous utilisez Vercel CLI :
```bash
vercel --prod
```

### Étape 4 : Vérifier que l'Endpoint Fonctionne

Après le déploiement, testez :

```powershell
.\scripts\test-endpoint-n8n.ps1
```

**Résultat attendu :**
- ✅ Test 1 : Status 405 (l'endpoint existe)
- ✅ Test 2 : Succès avec réponse JSON

**Si toujours 404 :**
- ⏳ Attendez quelques minutes (cache Vercel)
- 🔄 Vérifiez que le déploiement est bien terminé
- 📋 Vérifiez les logs Vercel pour des erreurs

## 🔍 Vérifications dans Vercel

### 1. Vérifier les Variables d'Environnement

Dans Vercel → Settings → Environment Variables :
- ✅ `WEBHOOK_SECRET` doit être défini
- ✅ Valeur : `voc-call-n8n-a4c4d36e2abe4413a33b24e5e05e3cc9`

### 2. Vérifier les Logs de Déploiement

Dans Vercel → Deployments → Dernier déploiement :
- ✅ Vérifiez qu'il n'y a pas d'erreurs
- ✅ Vérifiez que `api/webhook-n8n-keywords.js` est listé dans les fichiers déployés

### 3. Vérifier les Function Logs

Dans Vercel → Deployments → Dernier déploiement → "Function Logs" :
- ✅ Vérifiez qu'il n'y a pas d'erreurs au démarrage
- ✅ L'endpoint devrait apparaître dans la liste des fonctions

## 🧪 Test Final

Une fois déployé, testez depuis N8N :

1. **Corrigez le header** : `X-Webhook-Secret` (avec "X-")
2. **Exécutez le workflow N8N**
3. **Vérifiez la réponse** :
   - ✅ Succès : `{"success": true, ...}`
   - ❌ 404 : Endpoint pas encore déployé
   - ❌ 401 : Secret incorrect
   - ❌ 400 : Format incorrect

## 📋 Checklist de Déploiement

- [ ] Fichier `api/webhook-n8n-keywords.js` existe localement
- [ ] Fichier commité sur Git
- [ ] Fichier poussé sur le repo distant
- [ ] Vercel a détecté le push (ou déploiement manuel fait)
- [ ] Déploiement Vercel terminé avec succès
- [ ] Variable `WEBHOOK_SECRET` configurée dans Vercel
- [ ] Test de l'endpoint : Status 405 (existe) ou 200 (fonctionne)
- [ ] Header N8N corrigé : `X-Webhook-Secret`
- [ ] Test depuis N8N : Succès

## 🚀 Commandes Rapides

```powershell
# Vérifier le statut Git
git status

# Commiter et pousser
git add api/webhook-n8n-keywords.js
git commit -m "Add N8N keywords webhook endpoint"
git push

# Tester l'endpoint (après déploiement)
.\scripts\test-endpoint-n8n.ps1
```

---

**Une fois déployé, l'endpoint sera accessible à :**
`https://voc-call.fr/api/webhook-n8n-keywords`








