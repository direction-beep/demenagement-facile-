# 🔍 Analyse des Redirections Non Indexées - Décembre 2025

**Date** : 15 Décembre 2025  
**Problème** : URLs avec redirections non indexées dans Google Search Console  
**Statut** : ⚠️ **À CORRIGER**

---

## 📊 Problèmes Identifiés

### 1. **Canonical URLs Incorrectes**
Les pages utilisent `voc-call.com` au lieu de `voc-call.fr` dans les balises canonical.

**Pages concernées** :
- `index.html` : `https://voc-call.com/` → doit être `https://voc-call.fr/`
- `about.html` : `https://voc-call.com/qui-sommes-nous` → doit être `https://voc-call.fr/about`
- `careers.html` : `https://voc-call.com/devenir-teleconseiller` → doit être `https://voc-call.fr/careers`
- `blog.html` : `https://voc-call.com/blog` → doit être `https://voc-call.fr/blog`
- Toutes les pages de villes : `https://voc-call.com/centre-appel-*` → doit être `https://voc-call.fr/centre-appel-*`

### 2. **Sitemap vs Configuration Vercel**
Le sitemap contient des URLs avec `.html` mais Vercel redirige automatiquement vers sans `.html` grâce à `cleanUrls: true`.

**Problème** : 
- Sitemap : `https://voc-call.fr/services/index.html`
- Vercel redirige : `https://voc-call.fr/services/index.html` → `https://voc-call.fr/services/index`
- Mais la vraie page est : `https://voc-call.fr/services/` (sans index)

**Solution** : Mettre à jour le sitemap pour utiliser les URLs sans `.html` et correspondre à la configuration Vercel.

### 3. **Pages Manquantes dans le Sitemap**
Certaines pages importantes ne sont pas dans le sitemap :
- `/devenir-teleconseiller` (existe : `careers.html`)
- `/qui-sommes-nous` (existe : `about.html`)
- `/services/` (existe : `services/index.html`)

### 4. **Redirections Normales mais Non Indexées**
Ces redirections sont normales mais Google les voit comme "non indexées" :
- `http://voc-call.fr/` → `https://voc-call.fr/` (HTTP vers HTTPS)
- `https://www.voc-call.fr/` → `https://voc-call.fr/` (WWW vers non-WWW)
- URLs avec trailing slash → URLs sans trailing slash

**Action** : C'est normal, ces redirections ne doivent pas être indexées. Google comprend qu'elles pointent vers la version canonique.

### 5. **Redirections Services**
Les URLs courtes redirigent vers les URLs complètes :
- `/back-office` → `/services/back-office.html` → `/services/back-office` (redirection en chaîne)
- `/prospection` → `/services/prospection.html` → `/services/prospection` (redirection en chaîne)
- `/service-client` → `/services/service-client.html` → `/services/service-client` (redirection en chaîne)

**Problème** : Double redirection (301 → 301) peut nuire au SEO.

**Solution** : Rediriger directement vers la version finale sans `.html`.

---

## ✅ Plan d'Action

### Priorité 1 : Corriger les Canonical URLs

Mettre à jour toutes les pages pour utiliser `voc-call.fr` au lieu de `voc-call.com` :

1. **index.html** : `https://voc-call.fr/`
2. **about.html** : `https://voc-call.fr/about`
3. **careers.html** : `https://voc-call.fr/careers`
4. **blog.html** : `https://voc-call.fr/blog`
5. **contact.html** : `https://voc-call.fr/contact`
6. **Toutes les pages de villes** : `https://voc-call.fr/centre-appel-*`
7. **Toutes les pages de services** : `https://voc-call.fr/services/*`
8. **Toutes les pages de blog** : `https://voc-call.fr/blog/*`

### Priorité 2 : Mettre à Jour le Sitemap

Mettre à jour `sitemap.xml` pour :
1. Utiliser les URLs sans `.html` (correspondre à `cleanUrls: true`)
2. Ajouter les pages manquantes :
   - `/about` (au lieu de `/about.html`)
   - `/careers` (au lieu de `/careers.html`)
   - `/services` (au lieu de `/services/index.html`)
   - `/contact` (au lieu de `/contact.html`)
   - `/testimonials` (au lieu de `/testimonials.html`)

### Priorité 3 : Optimiser les Redirections

Modifier `vercel.json` pour éviter les redirections en chaîne :
- `/back-office` → `/services/back-office` (au lieu de `/services/back-office.html`)
- `/prospection` → `/services/prospection` (au lieu de `/services/prospection.html`)
- `/service-client` → `/services/service-client` (au lieu de `/services/service-client.html`)
- etc.

### Priorité 4 : Ajouter des Redirections Manquantes

Ajouter des redirections pour les URLs avec trailing slash vers les versions sans trailing slash :
- `/devenir-teleconseiller/` → `/careers`
- `/qui-sommes-nous/` → `/about`
- `/services/` → `/services` (déjà géré par `/:path+/` mais peut être explicite)

---

## 📋 Liste des URLs à Corriger

### URLs avec Redirections (Normales - Pas d'Action Requise)
- ✅ `http://voc-call.fr/` → `https://voc-call.fr/` (normal)
- ✅ `https://www.voc-call.fr/` → `https://voc-call.fr/` (normal)
- ✅ URLs avec trailing slash → URLs sans trailing slash (normal)

### URLs à Corriger dans le Sitemap
- ❌ `https://voc-call.fr/about.html` → `https://voc-call.fr/about`
- ❌ `https://voc-call.fr/careers.html` → `https://voc-call.fr/careers`
- ❌ `https://voc-call.fr/contact.html` → `https://voc-call.fr/contact`
- ❌ `https://voc-call.fr/testimonials.html` → `https://voc-call.fr/testimonials`
- ❌ `https://voc-call.fr/services/index.html` → `https://voc-call.fr/services`
- ❌ Toutes les URLs avec `.html` → URLs sans `.html`

### URLs à Ajouter au Sitemap
- ❌ `/devenir-teleconseiller` → `/careers` (redirection)
- ❌ `/qui-sommes-nous` → `/about` (redirection)

### Redirections à Optimiser
- ❌ `/back-office` → `/services/back-office` (au lieu de `/services/back-office.html`)
- ❌ `/prospection` → `/services/prospection` (au lieu de `/services/prospection.html`)
- ❌ `/service-client` → `/services/service-client` (au lieu de `/services/service-client.html`)
- ❌ `/permanence` → `/services/permanence` (au lieu de `/services/permanence.html`)
- ❌ `/relance-commerciale` → `/services/relance-commerciale` (au lieu de `/services/relance-commerciale.html`)
- ❌ `/standard-externalise` → `/services/standard-externalise` (au lieu de `/services/standard-externalise.html`)

---

## 🔧 Fichiers à Modifier

1. ✅ **sitemap.xml** - Mettre à jour toutes les URLs pour enlever `.html`
2. ✅ **vercel.json** - Optimiser les redirections pour éviter les chaînes
3. ✅ **Toutes les pages HTML** - Corriger les canonical URLs (`voc-call.com` → `voc-call.fr`)
4. ✅ **Ajouter redirections** - `/devenir-teleconseiller/` → `/careers`, `/qui-sommes-nous/` → `/about`

---

## 📝 Notes Techniques

### Configuration Vercel

Avec `cleanUrls: true` et `trailingSlash: false`, Vercel :
- Redirige automatiquement `/page.html` → `/page`
- Redirige automatiquement `/page/` → `/page`
- Sert les pages sans `.html` dans l'URL

### Canonical URLs

Les canonical URLs doivent :
- Utiliser le domaine correct (`voc-call.fr`)
- Correspondre à l'URL finale (sans `.html`, sans trailing slash)
- Être en HTTPS

### Sitemap

Le sitemap doit :
- Contenir uniquement les URLs canoniques (sans `.html`, sans trailing slash)
- Utiliser le domaine correct (`voc-call.fr`)
- Être en HTTPS

---

**Dernière mise à jour** : 15 Décembre 2025  
**Statut** : ⏳ **EN ATTENTE DE CORRECTION**

