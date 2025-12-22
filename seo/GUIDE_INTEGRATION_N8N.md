# Guide d'Intégration N8N - Positions Mots-Clés

Ce guide explique comment intégrer automatiquement les données de positions de mots-clés générées par votre workflow N8N dans la stratégie SEO de VOC-Call.

## ⚡ Méthode Recommandée : API HTTPS

**La méthode la plus simple** : N8N envoie directement les données via HTTPS vers l'API VOC-Call.

👉 **Voir le guide complet** : [`GUIDE_API_N8N.md`](./GUIDE_API_N8N.md)

**En résumé :**
- URL API : `https://voc-call.fr/api/webhook-n8n-keywords`
- Header requis : `X-Webhook-Secret: votre-secret`
- Body JSON : `{ "content": "...", "format": "markdown" }`
- Le fichier est sauvegardé automatiquement dans `seo/positions-keywords-n8n.md`

## 📋 Méthode Simple (Recommandée)

### Option 1 : Partage Direct du Fichier

1. **Placez le fichier markdown généré par N8N** dans le dossier `seo/` avec le nom :
   ```
   seo/positions-keywords-n8n.md
   ```
   *(Ce fichier existe déjà et est prêt à recevoir vos données)*

2. **Ou utilisez un nom avec date** pour garder l'historique :
   ```
   seo/positions-keywords-n8n-YYYY-MM-DD.md
   ```

3. **Une fois le fichier placé**, dites-moi simplement :
   ```
   "Analyse les positions N8N"
   ```
   ou
   ```
   "Analyse le fichier positions-keywords-n8n.md et adapte la stratégie SEO"
   ```

4. **Je vais automatiquement** :
   - ✅ Lire le fichier `seo/positions-keywords-n8n.md`
   - ✅ Analyser les positions par priorité
   - ✅ Identifier les opportunités (positions 11-20, 4-10, régressions)
   - ✅ Générer des actions prioritaires ciblées
   - ✅ Mettre à jour `seo/CHECKLIST_SEO_RAPIDE.md`
   - ✅ Adapter la stratégie SEO selon les résultats

## 🔄 Méthode Automatisée (N8N → API HTTPS) ⭐ RECOMMANDÉE

### Configuration N8N pour Envoi Direct via HTTPS

**La méthode la plus simple et la plus fiable** : N8N envoie directement les données via HTTPS vers l'API VOC-Call.

Voir le guide complet : **`seo/GUIDE_API_N8N.md`**

**Résumé rapide :**
1. **Dans N8N**, ajoutez un nœud **HTTP Request**
2. **URL** : `https://voc-call.fr/api/webhook-n8n-keywords`
3. **Headers** :
   - `Content-Type: application/json`
   - `X-Webhook-Secret: votre-secret` (à configurer dans Vercel)
4. **Body** :
   ```json
   {
     "content": "{{ $json.markdown }}",
     "format": "markdown"
   }
   ```

L'API sauvegarde automatiquement dans `seo/positions-keywords-n8n.md` !

### Autres Options (Alternative)

1. **Option A : Écrire directement dans le workspace**
   - Utilisez un nœud "Write Binary File" dans N8N
   - Chemin : `C:\Users\loued\VOC-Call\seo\positions-keywords-n8n.md`
   - ⚠️ Nécessite que N8N ait accès au système de fichiers local

2. **Option B : Webhook + Script PowerShell**
   - N8N envoie les données via webhook local
   - Script PowerShell dans le workspace récupère et sauvegarde
   - Voir `scripts/save-n8n-keywords.ps1`

## 📊 Format Recommandé pour le Fichier Markdown

Pour faciliter l'analyse automatique, structurez votre fichier ainsi :

```markdown
# Positions Mots-Clés VOC-Call
**Date d'analyse** : YYYY-MM-DD
**Source** : Google Search Console via N8N

## 🔴 Priorité 1 - Mots-Clés Critiques
| Mot-clé | Position | Évolution | URL | Action Requise |
|---------|----------|-----------|-----|----------------|
| call center france | 12 | +2 | index.html | Optimiser title/meta |
| centre d'appel france | 15 | -1 | index.html | Créer contenu dédié |

## 🟡 Priorité 2 - Mots-Clés Importants
| Mot-clé | Position | Évolution | URL | Action Requise |
|---------|----------|-----------|-----|----------------|
| helpdesk externalisé | 8 | +3 | services/helpdesk.html | Optimiser pour top 3 |

## 🟢 Priorité 3 - Mots-Clés Secondaires
| Mot-clé | Position | Évolution | URL | Action Requise |
|---------|----------|-----------|-----|----------------|
| standard externalisé | 25 | +5 | services/telesecretariat.html | Créer page dédiée |
```

### Format Alternatif (Plus Simple)

Si votre N8N génère un format différent, c'est OK ! Je peux adapter. Voici un format minimal :

```markdown
# Positions Mots-Clés - YYYY-MM-DD

## Priorité 1
- call center france : Position 12 (URL: index.html)
- centre d'appel france : Position 15 (URL: index.html)

## Priorité 2
- helpdesk externalisé : Position 8 (URL: services/helpdesk.html)
```

## 🤖 Analyse Automatique

Une fois le fichier en place, je peux automatiquement :

1. **Identifier les opportunités**
   - Mots-clés en position 11-20 (proche top 10)
   - Mots-clés en position 4-10 (proche top 3)
   - Mots-clés en régression

2. **Générer des actions prioritaires**
   - Optimisations on-page ciblées
   - Création de contenu pour mots-clés spécifiques
   - Amélioration du maillage interne

3. **Mettre à jour la checklist SEO**
   - Ajouter les actions urgentes
   - Prioriser selon les positions actuelles
   - Suivre les évolutions

## 📝 Exemple de Workflow Complet

1. **N8N s'exécute** (quotidien/hebdomadaire)
2. **Récupère les positions** depuis Google Search Console
3. **Génère le fichier markdown** avec priorités
4. **Sauvegarde dans** `seo/positions-keywords-n8n.md`
5. **Vous me dites** : "Analyse les positions N8N"
6. **J'analyse et adapte** la stratégie SEO automatiquement

## 🔧 Script PowerShell d'Exemple

Si vous voulez automatiser la sauvegarde depuis N8N, voici un script de base :

```powershell
# save-n8n-keywords.ps1
# À placer dans scripts/

param(
    [string]$Content,
    [string]$OutputPath = "seo\positions-keywords-n8n.md"
)

$fullPath = Join-Path $PSScriptRoot "..\$OutputPath"
$Content | Out-File -FilePath $fullPath -Encoding UTF8
Write-Host "Fichier sauvegardé : $fullPath"
```

## ❓ Questions Fréquentes

**Q : Dois-je formater le fichier d'une manière spécifique ?**  
R : Non, je peux adapter à votre format. Mais un format structuré (tableaux markdown) facilite l'analyse.

**Q : À quelle fréquence dois-je mettre à jour ?**  
R : Recommandé : hebdomadaire ou bi-hebdomadaire pour suivre les évolutions.

**Q : Puis-je garder un historique ?**  
R : Oui, utilisez des noms avec dates. Je peux analyser plusieurs fichiers et comparer les évolutions.

**Q : Que faire si N8N génère un format différent ?**  
R : Partagez-moi un exemple et j'adapterai l'analyse automatiquement.

---

**Dernière mise à jour** : Décembre 2024

