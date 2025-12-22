# Guide de Test des Pages Déménagement Zen

## 📋 Vue d'ensemble

Ce guide vous permet de tester que toutes les pages fonctionnent correctement sur desktop et mobile avant la mise en ligne.

---

## ✅ Checklist de Test

### 1. Test de Base

#### A. Vérification des fichiers
- [ ] Tous les fichiers HTML sont présents (31 pages)
- [ ] Aucun fichier corrompu
- [ ] Tous les fichiers sont accessibles

#### B. Vérification des liens
- [ ] Logo dans le header cliquable → vers `index.html`
- [ ] Liens de navigation fonctionnent
- [ ] Liens vers autres villes fonctionnent
- [ ] Liens email (`mailto:`) fonctionnent
- [ ] Boutons "Demander un devis" pointent vers `#devis`

#### C. Vérification du contenu
- [ ] Pas d'erreurs d'encodage (caractères spéciaux corrects)
- [ ] Tous les titres H1 présents
- [ ] Meta descriptions présentes
- [ ] Formulaire de devis présent sur chaque page

---

## 🖥️ Test Desktop

### Navigateurs à tester

Testez sur au moins **2 navigateurs** :
- [ ] **Google Chrome** (recommandé)
- [ ] **Mozilla Firefox**
- [ ] **Microsoft Edge** (si Windows)

### Points à vérifier

#### Affichage général
- [ ] Le header s'affiche correctement
- [ ] Le logo est visible et bien dimensionné
- [ ] La navigation horizontale est lisible
- [ ] Le footer s'affiche en bas de page

#### Responsive desktop
- [ ] Page s'affiche correctement en largeur complète (1920px)
- [ ] Contenu centré et lisible
- [ ] Grilles (services, zones, etc.) s'affichent en colonnes

#### Sections spécifiques
- [ ] **Hero** : Titre et description lisibles
- [ ] **Services** : Cards en grille (3-4 colonnes)
- [ ] **Zones** : Listes organisées
- [ ] **Tarifs** : Cards alignées
- [ ] **FAQ** : Items espacés correctement
- [ ] **Formulaire** : Tous les champs visibles et utilisables

#### Fonctionnalités
- [ ] Formulaire de devis : Tous les champs fonctionnent
- [ ] Liens "mailto" ouvrent le client email
- [ ] Scroll smooth entre les sections (si liens ancres)
- [ ] Pas d'erreurs JavaScript dans la console (F12)

---

## 📱 Test Mobile

### Tailles d'écran à tester

Testez sur différentes tailles :
- [ ] **Mobile petit** (375px) - iPhone SE
- [ ] **Mobile moyen** (414px) - iPhone 12/13
- [ ] **Mobile grand** (428px) - iPhone 14 Pro Max
- [ ] **Tablette** (768px) - iPad

### Outils de test

#### Option 1 : DevTools du navigateur (Recommandé)
1. Ouvrir une page dans Chrome
2. Appuyer sur **F12** (ou Cmd+Option+I sur Mac)
3. Cliquer sur l'icône **📱 Toggle device toolbar** (ou Ctrl+Shift+M)
4. Sélectionner un appareil dans la liste

#### Option 2 : Test sur vrai appareil
- [ ] Tester sur votre téléphone Android
- [ ] Tester sur votre iPhone/iPad (si disponible)

### Points à vérifier sur mobile

#### Header & Navigation
- [ ] Logo visible et bien dimensionné
- [ ] Menu hamburger (☰) visible sur petit écran
- [ ] Menu s'ouvre au clic
- [ ] Navigation verticale dans le menu mobile

#### Affichage
- [ ] Texte lisible (pas trop petit, minimum 16px)
- [ ] Pas de texte qui dépasse
- [ ] Images adaptées à la largeur de l'écran
- [ ] Boutons assez grands pour être cliqués (minimum 44x44px)

#### Layout mobile
- [ ] Grilles en **1 colonne** sur mobile
- [ ] Cards empilées verticalement
- [ ] Sections bien espacées
- [ ] Footer en colonne unique

#### Formulaire mobile
- [ ] Formulaire adapté à l'écran
- [ ] Champs assez grands pour la saisie
- [ ] Clavier numérique s'affiche pour les dates
- [ ] Validation fonctionne

#### Performance mobile
- [ ] Pages chargent rapidement (< 3 secondes)
- [ ] Images optimisées (pas de chargement lent)
- [ ] Scroll fluide (pas de lag)

---

## 🔍 Test SEO Technique

### Outils de vérification

#### 1. Validateur HTML W3C
1. Aller sur : https://validator.w3.org/
2. Entrer l'URL d'une page (ou uploader le fichier)
3. Vérifier qu'il n'y a pas d'erreurs critiques

**Objectif :** 0 erreur, warnings mineurs acceptables

#### 2. Google Rich Results Test
1. Aller sur : https://search.google.com/test/rich-results
2. Entrer l'URL d'une page
3. Vérifier que Schema.org est détecté

**Objectif :** Schema.org LocalBusiness détecté ✅

#### 3. Test de vitesse (PageSpeed Insights)
1. Aller sur : https://pagespeed.web.dev/
2. Entrer l'URL d'une page
3. Vérifier les scores

**Objectif :**
- Performance : > 70 (mobile)
- Performance : > 80 (desktop)

---

## 🧪 Test Fonctionnel

### Formulaire de devis

**Testez sur 2-3 pages différentes :**

- [ ] Champs obligatoires (*) fonctionnent
- [ ] Validation email fonctionne
- [ ] Sélection de date fonctionne
- [ ] Cases à cocher fonctionnent
- [ ] Soumission du formulaire (vérifier côté serveur)

**Note :** Le formulaire nécessite un backend. Pour l'instant, testez juste que les champs fonctionnent visuellement.

### Liens et navigation

- [ ] Logo → Accueil
- [ ] Liens dans le footer fonctionnent
- [ ] Liens vers autres villes fonctionnent
- [ ] Ancre `#devis` scroll jusqu'au formulaire
- [ ] Ancre `#services` scroll jusqu'aux services
- [ ] Ancre `#contact` scroll jusqu'à la section contact

---

## 📊 Test par Ville

### Pages prioritaires à tester en détail

Testez particulièrement ces pages (priorité 1) :

- [ ] `demenagement-paris.html`
- [ ] `demenageur-paris.html`
- [ ] `demenagement-toulouse.html`
- [ ] `demenageur-toulouse.html`

### Points à vérifier par page

- [ ] Titre unique (pas de duplication)
- [ ] Meta description unique
- [ ] H1 avec le nom de la ville
- [ ] Contenu adapté à la ville
- [ ] Coordonnées GPS correctes dans Schema.org
- [ ] URLs canoniques correctes

---

## 🐛 Erreurs courantes à vérifier

### Images
- [ ] Pas d'images manquantes (404)
- [ ] Logo présent
- [ ] Alt text présent sur les images

### Liens
- [ ] Pas de liens cassés (404)
- [ ] Liens internes fonctionnent
- [ ] Liens externes ouvrent dans nouvel onglet (si nécessaire)

### Contenu
- [ ] Pas de texte "Lorem ipsum"
- [ ] Pas de placeholders visibles (`XX XX XX XX`)
- [ ] Email correct partout (`contact@demenagement-zen.fr`)

### Code
- [ ] Pas d'erreurs dans la console (F12)
- [ ] CSS chargé correctement
- [ ] Pas de warnings dans les DevTools

---

## ✅ Liste de contrôle finale

Avant la mise en ligne :

### Contenu
- [x] 31 pages générées
- [ ] Logo ajouté
- [ ] Images OG ajoutées
- [ ] Tous les textes vérifiés
- [ ] Email configuré partout

### Technique
- [ ] Sitemap mis à jour
- [ ] Pas d'erreurs HTML
- [ ] Schema.org valide
- [ ] Mobile responsive
- [ ] Performance OK

### SEO
- [ ] Meta tags présents
- [ ] URLs canoniques
- [ ] Liens internes
- [ ] Images avec alt text

---

## 🚀 Après les tests

Une fois tous les tests passés :

1. ✅ **Mettre en ligne** les pages
2. ✅ **Soumettre le sitemap** à Google Search Console
3. ✅ **Vérifier l'indexation** dans Google Search Console
4. ✅ **Monitorer** les performances

---

**Dernière mise à jour :** 2025-01-20

