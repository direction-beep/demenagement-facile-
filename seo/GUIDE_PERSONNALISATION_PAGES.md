# Guide de Personnalisation des Pages Déménagement Zen

## 📋 Vue d'ensemble

Les pages sont configurées avec :
- ✅ **Email** : `contact@demenagement-zen.fr` (déjà configuré)
- ✅ **Téléphone** : Aucun (retiré des pages)
- ⚠️ **Images** : À ajouter (logo et images Open Graph)

---

## ✅ Élément 1 : Numéro de Téléphone

### Statut actuel :
**Aucun numéro de téléphone** - Les pages ont été configurées sans numéro de téléphone comme demandé.

### Si vous souhaitez ajouter un téléphone plus tard :
1. Ajouter un bouton dans la section Hero
2. Ajouter dans la section Contact
3. Ajouter dans le footer
4. Ajouter dans le Schema.org (JSON-LD)

---

## ✅ Élément 2 : Adresse Email

### Statut actuel :
**Email configuré** : `contact@demenagement-zen.fr` ✅

L'email est déjà correctement configuré dans toutes les pages générées. Aucune modification nécessaire.

### 📍 Où apparaît l'email :
- Section Contact
- Footer
- Liens mailto dans les boutons

---

## 🖼️ Élément 3 : Images

### Images à remplacer :

#### A. Logo de l'entreprise

**Emplacement dans le code :**
```html
<img src="images/logo-demenagement-zen.png" alt="Déménagement Zen Logo">
```

**À faire :**
1. Créer votre logo au format PNG
2. Le placer dans le dossier `/images/`
3. Le renommer `logo-demenagement-zen.png`
   OU modifier le code pour utiliser votre nom de fichier :
   ```html
   <img src="images/votre-logo.png" alt="Déménagement Zen Logo">
   ```

**Tailles recommandées :**
- Logo header : 150x40 pixels (ou ratio similaire)
- Format : PNG avec transparence ou JPG

---

#### B. Images pour réseaux sociaux (Open Graph)

**Emplacement dans le code :**
```html
<meta property="og:image" content="https://demenagement-zen.fr/images/demenagement-paris.jpg">
```

**À faire :**
1. Créer des images pour chaque ville (optionnel mais recommandé)
2. Ou utiliser une image générique pour toutes les pages
3. Placer les images dans `/images/`

**Tailles recommandées :**
- 1200x630 pixels (ratio 1.91:1)
- Format : JPG ou PNG
- Poids : < 200KB

**Exemples de noms de fichiers :**
- `demenagement-paris.jpg`
- `demenagement-lyon.jpg`
- `demenagement-marseille.jpg`
- Ou une image générique : `demenagement-generique.jpg`

**Option : Utiliser une image unique**
Si vous utilisez la même image pour toutes les pages, remplacez dans tous les fichiers :
```html
<!-- AVANT (spécifique par ville) -->
<meta property="og:image" content="https://demenagement-zen.fr/images/demenagement-paris.jpg">

<!-- APRÈS (image générique) -->
<meta property="og:image" content="https://demenagement-zen.fr/images/demenagement-zen-og.jpg">
```

---

#### C. Image dans Schema.org

**Emplacement :**
```html
<script type="application/ld+json">
{
  "image": "https://demenagement-zen.fr/images/logo-demenagement-zen.png"
}
</script>
```

**À faire :**
Même chose que pour le logo. Utiliser le chemin complet vers votre logo.

---

## 📝 Résumé des modifications

### ✅ Checklist de personnalisation

Pour chaque page HTML générée :

- [x] **Téléphone** : Aucun (déjà retiré) ✅
- [x] **Email** : `contact@demenagement-zen.fr` (déjà configuré) ✅
- [ ] **Logo** : Ajouter votre logo dans `/images/logo-demenagement-zen.png`
- [ ] **Image OG** : Ajouter images pour Open Graph (une par ville ou une générique)
- [ ] **Schema.org** : Vérifier que l'image dans Schema.org pointe vers le bon logo

---

## 🚀 Méthode rapide : Remplacement global

### Avec VS Code (ou autre éditeur)

1. **Ouvrir le dossier** contenant tous les fichiers HTML
2. **Ouvrir la recherche globale** (Ctrl+Shift+F)
3. **Activer "Remplacer dans les fichiers"**

#### Étape 1 : Domain (si différent de demenagement-zen.fr)
```
Rechercher : demenagement-zen.fr
Remplacer par : votre-domaine.fr
Fichiers : *.html
```

---

## 🎨 Exemple concret : Paris

### Configuration actuelle :
```html
<!-- Pas de téléphone -->
<a href="mailto:contact@demenagement-zen.fr">contact@demenagement-zen.fr</a>
<img src="images/logo-demenagement-zen.png"> <!-- À ajouter -->
```

### Après ajout des images :
```html
<a href="mailto:contact@demenagement-zen.fr">contact@demenagement-zen.fr</a>
<img src="images/logo-demenagement-zen.png"> <!-- Votre logo -->
```

---

## 📂 Structure des images

Après personnalisation, votre dossier `/images/` devrait contenir :

```
images/
├── logo-demenagement-zen.png          (ou votre logo)
├── demenagement-zen-og.jpg            (image pour réseaux sociaux)
├── demenagement-paris.jpg             (optionnel, par ville)
├── demenagement-lyon.jpg              (optionnel, par ville)
└── ... (autres images)
```

---

## ⚠️ Points importants

1. **Format téléphone** :
   - Pour `tel:` : utiliser le format international `+33X XX XX XX XX` (sans espaces)
   - Pour l'affichage : format français `0X XX XX XX XX` (avec espaces)

2. **URLs des images** :
   - Utiliser des URLs absolutes pour les réseaux sociaux : `https://votre-site.fr/images/...`
   - Utiliser des chemins relatifs pour le logo dans la page : `images/logo.png`

3. **Vérification** :
   - Tester que tous les liens fonctionnent après remplacement
   - Vérifier que les images s'affichent correctement
   - Tester le formulaire de contact

---

## 🔧 Script automatique (optionnel)

Si vous avez beaucoup de pages, je peux créer un script qui remplace automatiquement toutes ces valeurs. Dites-moi si vous souhaitez que je le crée !

---

**Dernière mise à jour :** 2025-01-20

