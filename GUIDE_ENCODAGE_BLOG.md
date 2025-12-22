# Guide : Encodage UTF-8 pour les Articles du Blog

## 🎯 Objectif

Ce guide explique comment éviter les problèmes d'encodage lors de la création de nouveaux articles de blog.

## ⚠️ Problème Identifié

Les fichiers HTML du blog peuvent présenter des caractères mal encodés comme :
- `SantÃ©` au lieu de `Santé`
- `tÃ©lÃ©secrÃ©tariat` au lieu de `télésecrétariat`
- `VOCâ€'Call` au lieu de `VOC-Call`

## ✅ Solution : Utiliser les Scripts Fournis

### 1. Générer un Nouvel Article

Utilisez le script Node.js pour créer un nouvel article avec encodage UTF-8 garanti :

```bash
node scripts/generate-blog-article.js <slug> "<titre>" "<description>" "<contenu HTML>"
```

**Exemple :**
```bash
node scripts/generate-blog-article.js "nouvel-article" "Mon Titre avec Accents" "Ma description avec des caractères spéciaux" "<h2>Section 1</h2><p>Contenu avec é, è, à, ç...</p>"
```

### 2. Valider l'Encodage des Fichiers Existants

Avant de publier, validez l'encodage de tous les fichiers :

```bash
node scripts/validate-blog-encoding.js
```

Ce script :
- ✅ Vérifie tous les fichiers HTML du blog
- ✅ Détecte les caractères mal encodés
- ✅ Liste les fichiers problématiques

## 📝 Bonnes Pratiques

### Lors de la Création Manuelle

1. **Utilisez un éditeur avec encodage UTF-8**
   - VS Code : Vérifiez l'encodage en bas à droite (doit afficher "UTF-8")
   - Notepad++ : Format → Encoder en UTF-8
   - Sublime Text : File → Save with Encoding → UTF-8

2. **Vérifiez la balise meta charset**
   ```html
   <meta charset="UTF-8">
   ```

3. **Sauvegardez toujours en UTF-8**
   - Ne pas utiliser UTF-8 avec BOM
   - Utiliser UTF-8 sans BOM

### Lors de l'Édition de Fichiers Existants

1. **Ouvrez le fichier avec l'encodage UTF-8**
2. **Éditez normalement** (les accents doivent s'afficher correctement)
3. **Sauvegardez en UTF-8**

### Lors de la Copie de Contenu

Si vous copiez du contenu depuis :
- **Word/Google Docs** : Coller dans un éditeur de texte simple d'abord, puis copier dans votre éditeur
- **Email** : Vérifiez que l'encodage est correct
- **Autre site web** : Utilisez "Copier comme texte brut" si disponible

## 🔧 Scripts Disponibles

### `scripts/generate-blog-article.js`
Génère un nouvel article avec encodage UTF-8 garanti.

**Fonctionnalités :**
- Normalise automatiquement le texte
- Écrit le fichier en UTF-8
- Valide l'encodage après écriture

### `scripts/validate-blog-encoding.js`
Valide l'encodage de tous les fichiers HTML du blog.

**Fonctionnalités :**
- Scanne récursivement le dossier `blog/`
- Détecte les patterns de mauvais encodage
- Génère un rapport détaillé

## 🚨 Détection Automatique

Le script de validation détecte automatiquement :
- Caractères accentués mal encodés (é, è, à, ç, etc.)
- Apostrophes et guillemets mal encodés
- Tirets et caractères spéciaux mal encodés

## 📋 Checklist Avant Publication

- [ ] Article créé avec `generate-blog-article.js` OU édité avec encodage UTF-8
- [ ] Validation exécutée : `node scripts/validate-blog-encoding.js`
- [ ] Aucune erreur d'encodage détectée
- [ ] Test visuel : les accents s'affichent correctement dans le navigateur
- [ ] Balise `<meta charset="UTF-8">` présente dans le `<head>`

## 🐛 Correction des Fichiers Existants

Si vous trouvez des fichiers avec des problèmes d'encodage :

1. **Utilisez le script de correction Python** (si disponible) :
   ```bash
   python fix-encoding-blog.py
   ```

2. **Ou corrigez manuellement** :
   - Ouvrez le fichier dans un éditeur UTF-8
   - Remplacez les caractères mal encodés
   - Sauvegardez en UTF-8

## 💡 Astuces

- **VS Code** : L'encodage est affiché en bas à droite. Cliquez pour changer si nécessaire.
- **Git** : Configurez Git pour utiliser UTF-8 :
  ```bash
  git config --global core.quotepath false
  git config --global i18n.commitencoding utf-8
  git config --global i18n.logoutputencoding utf-8
  ```

## 📚 Ressources

- [UTF-8 sur Wikipedia](https://fr.wikipedia.org/wiki/UTF-8)
- [Guide Unicode](https://unicode.org/standard/standard.html)

---

**Dernière mise à jour :** 2024-12-19
**Auteur :** VOC-Call Team


