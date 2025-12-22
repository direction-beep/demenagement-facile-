# Comment convertir le logo SVG en PNG

## 🎨 Logo SVG créé

Un logo SVG professionnel a été créé : `logo-demenagement-zen.svg`

Il est **déjà fonctionnel** dans les navigateurs, mais si vous voulez le convertir en PNG pour une meilleure compatibilité, voici comment faire.

---

## 🔄 Méthodes de conversion SVG → PNG

### Méthode 1 : Outil en ligne (Le plus simple) ✅

#### A. CloudConvert (Recommandé)
1. Allez sur : https://cloudconvert.com/svg-to-png
2. Cliquez sur "Select File"
3. Sélectionnez `images/logo-demenagement-zen.svg`
4. **Réglages recommandés :**
   - Width : **300 pixels**
   - Height : **80 pixels**
   - DPI : **300** (pour qualité)
5. Cliquez sur "Convert"
6. Téléchargez le PNG
7. Renommez-le : `logo-demenagement-zen.png`
8. Placez-le dans `/images/`

#### B. Convertio
1. Allez sur : https://convertio.co/fr/svg-png/
2. Uploadez `logo-demenagement-zen.svg`
3. Réglages :
   - Width : 300px
   - Height : 80px
4. Convertir et télécharger

#### C. Online-Convert
1. Allez sur : https://image.online-convert.com/fr/convertir-en-png
2. Uploadez le SVG
3. Ajustez les dimensions : 300×80px
4. Convertir

---

### Méthode 2 : Inkscape (Logiciel gratuit)

1. **Télécharger Inkscape :** https://inkscape.org/
2. **Ouvrir** `logo-demenagement-zen.svg` dans Inkscape
3. **Fichier** → **Exporter au format PNG**
4. **Dimensions :**
   - Width : 300px
   - Height : 80px
   - DPI : 300
5. **Exporter** → Sauvegarder comme `logo-demenagement-zen.png`

---

### Méthode 3 : Avec Node.js (Si vous avez Node installé)

Créez un fichier `scripts/convert-svg-to-png.js` :

```javascript
const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

async function convertSVGtoPNG() {
    // Nécessite d'installer: npm install canvas
    // Cette méthode nécessite des dépendances supplémentaires
}
```

**Note :** Cette méthode nécessite d'installer des packages npm supplémentaires.

---

## ✅ Après conversion

### Option A : Remplacer complètement le SVG
1. Renommez `logo-demenagement-zen.svg` en `logo-demenagement-zen.svg.backup`
2. Placez votre `logo-demenagement-zen.png` dans `/images/`
3. Les pages utiliseront automatiquement le PNG (fallback configuré)

### Option B : Garder les deux
1. Gardez le SVG (fonctionne très bien)
2. Ajoutez le PNG à côté
3. Les pages essaieront d'abord le SVG, puis le PNG en fallback

---

## 📐 Dimensions recommandées pour le PNG

**Pour le header (actuel) :**
- Largeur : **300 pixels**
- Hauteur : **80 pixels**
- Ratio : 3.75:1

**Variantes utiles :**
- **Petite version** : 150×40px (pour mobile)
- **Grande version** : 450×120px (pour impression)

---

## 🎨 Optimisation du PNG

Après conversion, optimisez l'image :

1. **TinyPNG :** https://tinypng.com/
   - Réduit la taille sans perte de qualité
   - Poids final : < 20KB recommandé

2. **Squoosh :** https://squoosh.app/
   - Outil Google
   - Contrôle avancé de la compression

---

## 💡 Recommandation

Le **SVG actuel fonctionne parfaitement** dans tous les navigateurs modernes. Vous pouvez :
- ✅ **Garder le SVG** (meilleure qualité, plus léger, scalable)
- ✅ **Ajouter un PNG** comme fallback (pour anciens navigateurs)

Le code HTML est déjà configuré pour utiliser les deux automatiquement !

---

**Fichier SVG actuel :** `images/logo-demenagement-zen.svg`  
**À créer (optionnel) :** `images/logo-demenagement-zen.png`

