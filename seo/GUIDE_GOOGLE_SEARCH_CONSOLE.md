# Guide Google Search Console - Déménagement Zen

## 📋 Vue d'ensemble

Google Search Console est un outil gratuit de Google qui permet de :
- ✅ Soumettre votre sitemap
- ✅ Surveiller l'indexation de vos pages
- ✅ Voir les performances SEO
- ✅ Détecter les erreurs

---

## 🚀 Étape 1 : Accéder à Google Search Console

### URL
**https://search.google.com/search-console**

### Connexion
1. Connectez-vous avec votre compte Google
2. Si c'est votre première fois, acceptez les conditions

---

## 📝 Étape 2 : Ajouter votre propriété (site web)

### Méthode recommandée : Domaine

#### A. Cliquer sur "Ajouter une propriété"

#### B. Choisir "Domaine" (recommandé)
```
demenagement-zen.fr
```
*(Sans https:// ni www)*

#### C. Vérifier la propriété

Google vous demandera de **vérifier que vous êtes propriétaire** du domaine.

**Option 1 : Vérification par DNS (Recommandée)**
1. Google vous donne un enregistrement TXT à ajouter
2. Connectez-vous à votre hébergeur/registrar
3. Ajoutez l'enregistrement TXT dans les DNS
4. Attendez la propagation (5 minutes à 48h)
5. Cliquez sur "Vérifier" dans Google Search Console

**Option 2 : Vérification par fichier HTML**
1. Téléchargez le fichier HTML fourni par Google
2. Uploadez-le à la racine de votre site
3. Cliquez sur "Vérifier"

**Option 3 : Vérification par balise HTML**
1. Copiez la balise `<meta>` fournie par Google
2. Ajoutez-la dans le `<head>` de votre `index.html`
3. Cliquez sur "Vérifier"

---

## 🗺️ Étape 3 : Soumettre le Sitemap

### URL du sitemap
```
https://demenagement-zen.fr/sitemap.xml
```

### Étapes

1. **Dans Google Search Console**, cliquez sur **"Sitemaps"** dans le menu de gauche

2. **Dans "Ajouter un nouveau sitemap"**, entrez :
   ```
   sitemap.xml
   ```
   *(Juste le nom du fichier, pas l'URL complète)*

3. **Cliquez sur "Envoyer"**

4. **Attendez** quelques minutes/hours

5. **Vérifiez le statut** :
   - ✅ **Réussi** : Google a trouvé vos pages
   - ⚠️ **Avertissements** : Vérifiez mais généralement OK
   - ❌ **Erreur** : Corrigez les erreurs

### Vérifier que le sitemap est valide

Avant de soumettre, testez-le :
- **Outil :** https://www.xml-sitemaps.com/validate-xml-sitemap.html
- Entrez : `https://demenagement-zen.fr/sitemap.xml`
- Vérifiez qu'il n'y a pas d'erreurs

---

## 📊 Étape 4 : Vérifier l'indexation

### Combien de pages sont indexées ?

1. **Dans Google Search Console**, cliquez sur **"Couverture"** dans le menu de gauche

2. **Vérifiez** :
   - ✅ Pages valides (indexées)
   - ⚠️ Pages avec avertissements
   - ❌ Pages avec erreurs

### Rechercher une page spécifique

1. **Dans la barre de recherche Google**, tapez :
   ```
   site:demenagement-zen.fr
   ```
   
2. **Vérifiez** que vos pages apparaissent

3. **Pour une page spécifique**, tapez :
   ```
   site:demenagement-zen.fr/demenagement-paris
   ```

### Demander l'indexation d'une page

Si une page n'est pas indexée :

1. **Dans Google Search Console**, cliquez sur **"Inspection d'URL"** (en haut)
2. **Entrez l'URL** de la page
3. **Cliquez sur "Demander l'indexation"**
4. **Attendez** quelques heures/jours

---

## 📈 Étape 5 : Surveiller les performances

### Section "Performances"

1. **Cliquez sur "Performances"** dans le menu

2. **Vous verrez** :
   - Nombre de clics
   - Nombre d'impressions
   - Taux de clics (CTR)
   - Position moyenne

3. **Filtrez par** :
   - Pages spécifiques
   - Requêtes (mots-clés)
   - Pays
   - Période

### Objectifs à suivre

**Premier mois :**
- ✅ 50-100 impressions/jour
- ✅ 5-10 clics/jour
- ✅ Position moyenne : Top 50

**Après 3 mois :**
- ✅ 500+ impressions/jour
- ✅ 50+ clics/jour
- ✅ Position moyenne : Top 30

---

## 🔍 Étape 6 : Optimiser avec les données

### Pages performantes

1. **Identifiez** les pages qui génèrent le plus de clics
2. **Analysez** pourquoi elles fonctionnent bien
3. **Appliquez** les mêmes techniques aux autres pages

### Mots-clés performants

1. **Identifiez** les requêtes qui génèrent des clics
2. **Optimisez** vos pages pour ces mots-clés
3. **Créez du contenu** autour de ces sujets

### Pages à améliorer

1. **Identifiez** les pages avec peu d'impressions
2. **Vérifiez** :
   - Meta description optimisée ?
   - Contenu de qualité ?
   - Liens internes vers cette page ?
3. **Améliorez** ces pages

---

## ⚠️ Gérer les erreurs

### Erreurs courantes

#### 1. "Page non indexée"
**Solution :**
- Vérifiez que la page est accessible
- Demandez l'indexation manuellement
- Vérifiez qu'il n'y a pas de `noindex` dans les meta tags

#### 2. "Erreur 404"
**Solution :**
- Vérifiez que l'URL est correcte
- Corrigez les liens cassés
- Redirigez les anciennes URLs vers les nouvelles

#### 3. "Erreur 500"
**Solution :**
- Vérifiez les erreurs serveur
- Contactez votre hébergeur
- Vérifiez les fichiers PHP/backend

#### 4. "Page mobile non compatible"
**Solution :**
- Testez sur mobile
- Vérifiez le responsive design
- Utilisez Google Mobile-Friendly Test

---

## 🎯 Actions recommandées après soumission

### Semaine 1
- [ ] Sitemap soumis
- [ ] 10-20 pages demandées en indexation manuelle
- [ ] Vérification des erreurs

### Semaine 2-4
- [ ] Surveiller l'indexation (devrait être > 50%)
- [ ] Corriger les erreurs détectées
- [ ] Analyser les premières impressions

### Mois 2-3
- [ ] Analyser les performances
- [ ] Optimiser les pages performantes
- [ ] Corriger les problèmes identifiés

---

## 🔗 Outils complémentaires

### Google Mobile-Friendly Test
**URL :** https://search.google.com/test/mobile-friendly

Testez si vos pages sont optimisées pour mobile.

### PageSpeed Insights
**URL :** https://pagespeed.web.dev/

Testez la vitesse de chargement de vos pages.

### Rich Results Test
**URL :** https://search.google.com/test/rich-results

Vérifiez que votre Schema.org fonctionne.

---

## 📊 Checklist finale

Avant de considérer que tout est configuré :

- [ ] Propriété ajoutée dans Google Search Console
- [ ] Domaine vérifié
- [ ] Sitemap soumis
- [ ] Sitemap accepté (statut "Réussi")
- [ ] Au moins 50% des pages indexées (après 1-2 semaines)
- [ ] Aucune erreur critique
- [ ] Performances suivies

---

## 💡 Conseils

1. **Soyez patient** : L'indexation prend du temps (1-4 semaines)
2. **Vérifiez régulièrement** : Connectez-vous 1-2 fois par semaine
3. **Corrigez rapidement** : Les erreurs peuvent impacter le SEO
4. **Analysez les données** : Utilisez les insights pour améliorer

---

## 🆘 Support

### Documentation officielle
- **Google Search Console Help** : https://support.google.com/webmasters

### Communauté
- **Forum Google Search Central** : https://support.google.com/webmasters/community

---

**Dernière mise à jour :** 2025-01-20
