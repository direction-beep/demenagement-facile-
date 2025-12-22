# Guide d'Ajout des Images - Déménagement Zen

## 📋 Vue d'ensemble

Vous devez ajouter **2 types d'images** pour finaliser les pages :
1. **Logo de l'entreprise** (obligatoire)
2. **Images Open Graph** pour les réseaux sociaux (recommandé)

---

## 🖼️ 1. Logo de l'Entreprise

### Spécifications techniques

**Chemin :** `/images/logo-demenagement-zen.png`

**Dimensions recommandées :**
- Largeur : 150-300 pixels
- Hauteur : 40-80 pixels (ratio environ 4:1)
- Format : PNG avec transparence (fond transparent) OU JPG
- Poids : < 50KB

### Comment créer/préparer le logo

#### Option A : Vous avez déjà un logo
1. Ouvrez votre logo existant dans un éditeur d'images
2. Redimensionnez-le aux dimensions recommandées
3. Exportez en PNG (avec transparence si possible)
4. Nommez-le `logo-demenagement-zen.png`
5. Placez-le dans le dossier `/images/`

#### Option B : Créer un logo simple
Outils gratuits :
- **Canva** : https://www.canva.com (gratuit)
- **Figma** : https://www.figma.com (gratuit)
- **GIMP** : https://www.gimp.org (gratuit, open source)

**Éléments à inclure :**
- Nom : "Déménagement Zen"
- Couleur principale : Bleu (#0e4580) ou Rouge (#d03840)
- Style : Moderne, professionnel

### Où le logo apparaît

- **Header** (en haut de chaque page)
- **Schema.org** (données structurées pour Google)
- **Footer** (optionnel, selon votre design)

---

## 📱 2. Images Open Graph (Réseaux Sociaux)

### À quoi servent-elles ?

Quand quelqu'un partage une page sur Facebook, LinkedIn, Twitter, WhatsApp, etc., ces images s'affichent dans la prévisualisation.

**Exemple :**
```
┌─────────────────────────────────┐
│  [Image Open Graph 1200x630]   │
│                                 │
│  Déménagement Paris |           │
│  Déménagement Zen               │
│  Déménagement professionnel...  │
└─────────────────────────────────┘
```

### Spécifications techniques

**Format :** JPG ou PNG  
**Dimensions :** **1200 x 630 pixels** (ratio 1.91:1)  
**Poids :** < 200KB (idéalement < 100KB)  
**Format recommandé :** JPG (plus léger)

### Options de création

#### Option A : Image unique générique (Recommandé pour commencer)

Créer **une seule image** qui servira pour toutes les pages :

**Chemin :** `/images/demenagement-zen-og.jpg`

**Éléments à inclure :**
- Logo Déménagement Zen
- Texte : "Déménagement Zen"
- Sous-texte : "Votre déménageur professionnel"
- Image de fond : Camion de déménagement, équipe, etc.
- Couleurs : Bleu (#0e4580) et Rouge (#d03840)

**Avantage :** Rapide à créer, une seule image pour toutes les pages.

**Mise à jour du code :**
Après création, remplacer dans tous les fichiers HTML :
```html
<!-- AVANT (spécifique par ville) -->
<meta property="og:image" content="https://demenagement-zen.fr/images/demenagement-paris.jpg">

<!-- APRÈS (image générique) -->
<meta property="og:image" content="https://demenagement-zen.fr/images/demenagement-zen-og.jpg">
```

#### Option B : Image par ville (Plus personnalisé)

Créer une image pour chaque ville majeure :

**Fichiers à créer :**
- `/images/demenagement-paris-og.jpg`
- `/images/demenagement-lyon-og.jpg`
- `/images/demenagement-marseille-og.jpg`
- `/images/demenagement-toulouse-og.jpg`
- etc.

**Éléments à inclure par ville :**
- Logo Déménagement Zen
- Texte : "Déménagement [Ville]"
- Image de la ville (photo de monument, panorama)
- Couleurs de la marque

**Avantage :** Plus personnalisé, meilleure visibilité par ville.

**Inconvénient :** Plus long à créer (31 images si toutes les villes).

### Outils pour créer les images Open Graph

#### Outils gratuits en ligne :
1. **Canva** : https://www.canva.com
   - Template "Facebook Post" (1200x630px)
   - Templates pré-faits pour réseaux sociaux

2. **Figma** : https://www.figma.com
   - Créer un frame 1200x630px
   - Design personnalisé

3. **Remove.bg + Canva** :
   - Retirer le fond d'une photo avec Remove.bg
   - L'intégrer dans Canva

#### Exemple de design (Canva) :

1. Ouvrir Canva
2. Créer un design personnalisé : 1200 x 630 px
3. Ajouter votre logo en haut à gauche
4. Texte principal : "Déménagement Zen"
5. Sous-texte : "Votre déménageur professionnel"
6. Ajouter une image de fond (camion, équipe, etc.)
7. Appliquer un filtre/overlay si nécessaire
8. Exporter en JPG

---

## 📂 Structure finale du dossier /images/

Après ajout des images :

```
images/
├── logo-demenagement-zen.png          ✅ Logo (obligatoire)
├── demenagement-zen-og.jpg            ✅ Image OG générique (recommandé)
│
├── favicon-16.png                     (déjà présent)
├── favicon-32.png                     (déjà présent)
├── apple-touch-icon.png               (déjà présent)
└── favicon.ico                        (déjà présent)
```

**Optionnel (si images par ville) :**
```
images/
├── logo-demenagement-zen.png
├── demenagement-paris-og.jpg          (optionnel)
├── demenagement-lyon-og.jpg           (optionnel)
├── demenagement-marseille-og.jpg      (optionnel)
└── ... (autres villes)
```

---

## ✅ Checklist d'ajout des images

### Logo
- [ ] Logo créé ou préparé
- [ ] Dimensions : 150-300px de large
- [ ] Format : PNG (avec transparence si possible)
- [ ] Nommé : `logo-demenagement-zen.png`
- [ ] Placé dans `/images/`
- [ ] Testé : Logo visible sur les pages

### Image Open Graph
- [ ] Image créée (1200x630px)
- [ ] Format : JPG
- [ ] Poids : < 200KB
- [ ] Nommée : `demenagement-zen-og.jpg` (ou par ville)
- [ ] Placée dans `/images/`
- [ ] Code mis à jour si image générique

### Test
- [ ] Logo s'affiche correctement sur desktop
- [ ] Logo s'affiche correctement sur mobile
- [ ] Image OG testée avec : https://www.opengraph.xyz/ (outil de prévisualisation)

---

## 🧪 Tester les images Open Graph

### Outil 1 : OpenGraph.xyz
1. Aller sur : https://www.opengraph.xyz/
2. Entrer l'URL d'une de vos pages
3. Voir la prévisualisation comme elle apparaîtra sur Facebook/LinkedIn

### Outil 2 : Facebook Sharing Debugger
1. Aller sur : https://developers.facebook.com/tools/debug/
2. Entrer l'URL
3. Cliquer sur "Scrape Again" pour rafraîchir le cache

### Outil 3 : LinkedIn Post Inspector
1. Aller sur : https://www.linkedin.com/post-inspector/
2. Entrer l'URL
3. Voir la prévisualisation LinkedIn

---

## 💡 Conseils

1. **Commencez simple** : Créez d'abord une image OG générique, vous pourrez créer des images spécifiques par ville plus tard.

2. **Optimisation** : Compressez vos images avec :
   - **TinyPNG** : https://tinypng.com/ (gratuit)
   - **Squoosh** : https://squoosh.app/ (gratuit, Google)

3. **Cohérence** : Utilisez les mêmes couleurs (bleu #0e4580 et rouge #d03840) que sur votre site.

4. **Texte lisible** : Assurez-vous que le texte soit lisible même sur mobile (taille minimum 24px).

---

## 🔄 Mise à jour après ajout des images

Une fois les images ajoutées, **vérifiez** :

1. ✅ Le logo s'affiche dans le header
2. ✅ L'image OG s'affiche lors du partage sur réseaux sociaux
3. ✅ Les images se chargent rapidement (< 2 secondes)
4. ✅ Les images sont optimisées (poids réduit)

---

**Dernière mise à jour :** 2025-01-20

