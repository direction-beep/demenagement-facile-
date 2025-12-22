# Guide de Création des Images - Déménagement Zen

## 🎨 Vous devez créer 2 images

### 1. Logo : `logo-demenagement-zen.png`

**Spécifications :**
- Format : PNG (avec transparence si possible)
- Dimensions : 150-300px de large × 40-80px de haut
- Poids : < 50KB

**Éléments à inclure :**
- Nom : "Déménagement Zen"
- Icône : Camion de déménagement (optionnel)
- Couleurs : Bleu (#0e4580) et Rouge (#d03840)

**Outils recommandés :**
- Canva : https://www.canva.com (gratuit, templates disponibles)
- Figma : https://www.figma.com (gratuit, professionnel)
- GIMP : https://www.gimp.org (gratuit, open source)

**Une fois créé :**
1. Nommez le fichier : `logo-demenagement-zen.png`
2. Placez-le dans : `/images/logo-demenagement-zen.png`
3. Remplacez le SVG temporaire dans les pages HTML si nécessaire

---

### 2. Image Open Graph : `demenagement-zen-og.jpg`

**Spécifications :**
- Format : JPG
- Dimensions : 1200 × 630 pixels (exactement)
- Poids : < 200KB (idéalement < 100KB)

**Éléments à inclure :**
- Logo Déménagement Zen
- Texte principal : "Déménagement Zen"
- Sous-texte : "Votre déménageur professionnel"
- Image de fond : Camion de déménagement, équipe, ou décor professionnel
- Couleurs : Utilisez les couleurs de la marque (Bleu #0e4580 et Rouge #d03840)

**Création avec Canva (Recommandé) :**

1. Allez sur https://www.canva.com
2. Créez un design personnalisé : **1200 × 630 pixels**
3. Ajoutez votre logo en haut à gauche
4. Ajoutez le texte "Déménagement Zen" (grand, lisible)
5. Ajoutez "Votre déménageur professionnel" (sous-texte)
6. Ajoutez une image de fond (recherchez "moving truck" ou "déménagement")
7. Ajustez les couleurs pour correspondre à votre marque
8. Exportez en JPG

**Une fois créé :**
1. Nommez le fichier : `demenagement-zen-og.jpg`
2. Placez-le dans : `/images/demenagement-zen-og.jpg`

**Optimisation :**
- Compressez l'image avec TinyPNG : https://tinypng.com/
- Vérifiez que le poids est < 200KB

---

## ✅ Checklist

- [ ] Logo créé : `logo-demenagement-zen.png`
- [ ] Logo placé dans `/images/`
- [ ] Image OG créée : `demenagement-zen-og.jpg` (1200×630px)
- [ ] Image OG placée dans `/images/`
- [ ] Images optimisées (poids réduit)
- [ ] Test : Logo visible sur les pages
- [ ] Test : Image OG visible avec https://www.opengraph.xyz/

---

## 🔄 Remplacement du SVG temporaire

Un fichier SVG temporaire a été créé : `images/logo-demenagement-zen.svg`

**Une fois votre PNG créé :**
1. Remplacez le SVG par votre PNG
2. Ou modifiez les pages HTML pour utiliser le PNG au lieu du SVG

**Dans les pages HTML, changez :**
```html
<!-- AVANT (SVG temporaire) -->
<img src="images/logo-demenagement-zen.svg">

<!-- APRÈS (votre PNG) -->
<img src="images/logo-demenagement-zen.png">
```

---

## 💡 Exemples de couleurs à utiliser

- **Bleu principal :** `#0e4580`
- **Rouge secondaire :** `#d03840`
- **Blanc :** `#ffffff`
- **Gris clair :** `#f8f9fa`

---

**Besoin d'aide ?** Consultez `seo/GUIDE_IMAGES.md` pour plus de détails.

