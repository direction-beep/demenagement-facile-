# Checklist : Correction du Problème SSL

## ✅ Fichiers Créés/Modifiés

### 1. Fichiers de Configuration Serveur

- [x] **`.htaccess`** - Redirection HTTP → HTTPS pour Apache
- [x] **`_redirects`** - Redirection HTTP → HTTPS pour Netlify
- [x] **`vercel.json`** - Ajout des redirections HTTPS pour Vercel

### 2. Documentation

- [x] **`GUIDE_SSL_HTTPS.md`** - Guide complet de configuration SSL/HTTPS

## 🔧 Actions à Effectuer sur le Serveur

### Si vous utilisez Vercel :

1. **Vérifier le domaine dans Vercel** ⚠️ ACTION REQUISE
   - Connectez-vous à votre dashboard Vercel
   - Allez dans votre projet
   - Cliquez sur "Settings" > "Domains"
   - Vérifiez que `voc-call.fr` est ajouté et vérifié
   - Si le domaine n'est pas présent, ajoutez-le :
     * Cliquez sur "Add Domain"
     * Entrez `voc-call.fr`
     * Suivez les instructions de vérification DNS
   - Vercel provisionne automatiquement le certificat SSL (Let's Encrypt)

2. **Vérifier la configuration DNS**
   - Le domaine doit pointer vers Vercel
   - Vérifiez les enregistrements DNS :
     * Type A : `76.76.21.21` (ou l'IP fournie par Vercel)
     * Type CNAME : `cname.vercel-dns.com` (si configuré)

3. **Attendre le provisionnement SSL**
   - Le certificat SSL est créé automatiquement
   - Cela peut prendre 5-15 minutes après l'ajout du domaine
   - Vérifiez le statut dans "Settings" > "Domains"

4. **Vérifier après déploiement**
   - Testez : `http://voc-call.fr` → doit rediriger vers `https://voc-call.fr`
   - Vérifiez le certificat : https://www.ssllabs.com/ssltest/
   - Le header HSTS est déjà configuré dans `vercel.json`

### Si vous utilisez Apache (hébergement classique) :

1. **Obtenir un certificat SSL**
   - Via cPanel : AutoSSL
   - Via Let's Encrypt : `certbot --apache -d voc-call.fr`

2. **Uploader `.htaccess`**
   - Uploader le fichier `.htaccess` à la racine du site
   - Vérifier les permissions (644)

3. **Tester la redirection**
   - `http://voc-call.fr` → doit rediriger vers `https://voc-call.fr`

### Si vous utilisez Netlify :

1. **Uploader `_redirects`**
   - Le fichier `_redirects` doit être à la racine du site
   - Netlify gère automatiquement SSL

2. **Vérifier dans les paramètres**
   - Domain settings → HTTPS activé

## 📋 Vérifications Post-Configuration

### Tests à Effectuer :

- [ ] **Test 1** : Accès HTTPS direct
  - URL : `https://voc-call.fr`
  - Résultat attendu : Site accessible, cadenas vert

- [ ] **Test 2** : Redirection HTTP → HTTPS
  - URL : `http://voc-call.fr`
  - Résultat attendu : Redirection 301 vers `https://voc-call.fr`

- [ ] **Test 3** : SSL Labs
  - URL : https://www.ssllabs.com/ssltest/analyze.html?d=voc-call.fr
  - Résultat attendu : Note A ou A+

- [ ] **Test 4** : Headers de sécurité
  - URL : https://securityheaders.com/?q=https://voc-call.fr
  - Vérifier : HSTS, X-Frame-Options, etc.

- [ ] **Test 5** : Google Search Console
  - Ajouter la propriété `https://voc-call.fr`
  - Soumettre le sitemap : `https://voc-call.fr/sitemap.xml`

## 🚨 Points d'Attention

1. **Contenu Mixte**
   - Vérifier qu'aucune ressource (images, scripts) ne charge en HTTP
   - Utiliser l'outil : https://www.whynopadlock.com/

2. **Renouvellement du Certificat**
   - Let's Encrypt : Renouvellement automatique (90 jours)
   - Vérifier que le renouvellement automatique est configuré

3. **Cache Navigateur**
   - Vider le cache après la configuration
   - Tester en navigation privée

## 📊 Résultat Attendu

Après configuration :
- ✅ Certificat SSL valide
- ✅ Redirection HTTP → HTTPS (301)
- ✅ Note SSL Labs : A ou A+
- ✅ Headers de sécurité configurés
- ✅ Aucune erreur dans l'audit SEO

---

**Date de création :** 2024-12-19
**Statut :** En attente de déploiement

