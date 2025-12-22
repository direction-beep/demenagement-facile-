# Génération Automatique des Pages Déménagement Zen

## 📋 Vue d'ensemble

Ce script permet de générer automatiquement toutes les pages HTML pour les mots-clés avec volume > 1000 recherches/mois.

## 🚀 Utilisation

### Générer toutes les pages
```bash
node scripts/generate-demenagement-pages.js all
```

### Générer uniquement une phase spécifique
```bash
# Phase 1 (Paris - Priorité 1)
node scripts/generate-demenagement-pages.js 1

# Phase 2 (Top 5 villes)
node scripts/generate-demenagement-pages.js 2

# Phase 3 (Villes volume 1500-1999)
node scripts/generate-demenagement-pages.js 3

# Phase 4 (Villes volume 1000-1499)
node scripts/generate-demenagement-pages.js 4
```

## 📂 Fichiers générés

Les pages sont générées à la racine du projet avec le format :
- `demenagement-{ville}.html`
- `demenageur-{ville}.html`

Exemples :
- `demenagement-paris.html`
- `demenageur-paris.html`
- `demenagement-toulouse.html`
- `demenageur-toulouse.html`

## ⚙️ Configuration

Le script lit le fichier `seo/mots-cles-volume-1000-plus.csv` pour :
- Extraire les mots-clés par phase
- Générer les URLs appropriées
- Créer le contenu SEO optimisé

### Coordonnées GPS des villes

Les coordonnées GPS sont stockées dans le script pour le Schema.org. Les villes supportées :
- Paris, Toulouse, Lyon, Marseille, Grenoble, Bordeaux
- Nice, Strasbourg, Montpellier, Nantes
- Versailles, Rennes, Rouen, Annecy, Angers, Dijon

Pour ajouter une nouvelle ville, modifier `CITY_COORDS` dans `scripts/generate-demenagement-pages.js`.

## 📝 Caractéristiques des pages générées

Chaque page inclut :
- ✅ Meta tags optimisés (Title, Description, Open Graph)
- ✅ Schema.org LocalBusiness (JSON-LD)
- ✅ Structure HTML5 sémantique
- ✅ Contenu unique adapté à la ville
- ✅ Formulaire de devis
- ✅ Sections : Services, Tarifs, Contact, FAQ
- ✅ Liens internes vers autres pages
- ✅ Responsive mobile

## 🎨 Styles CSS

Les pages utilisent le fichier `css/demenagement-zen.css` qui inclut :
- Design moderne et responsive
- Animations et transitions
- Palette de couleurs cohérente
- Optimisé pour mobile-first

## 📊 Résumé des phases

| Phase | Nombre pages | Volume total/mois | Exécution |
|-------|--------------|-------------------|-----------|
| Phase 1 | 2 | 10 800 | `node scripts/generate-demenagement-pages.js 1` |
| Phase 2 | 10 | 32 400 | `node scripts/generate-demenagement-pages.js 2` |
| Phase 3 | 6 | 12 800 | `node scripts/generate-demenagement-pages.js 3` |
| Phase 4 | 14 | 12 000 | `node scripts/generate-demenagement-pages.js 4` |
| **Total** | **32** | **48 900** | `node scripts/generate-demenagement-pages.js all` |

## 🔧 Personnalisation après génération

Après génération, personnalisez :
1. **Numéro de téléphone** : Remplacez `01 XX XX XX XX` dans tous les fichiers
2. **Email** : Remplacez `contact@demenagement-zen.fr`
3. **Images** : Ajoutez les vraies images dans `/images/`
4. **Contenu** : Ajustez les textes selon votre identité

## 📈 Mise à jour du sitemap

Après génération, ajoutez les nouvelles pages au `sitemap.xml` :

```xml
<url>
  <loc>https://demenagement-zen.fr/demenagement-{ville}</loc>
  <lastmod>2025-01-20</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.9</priority>
</url>
```

## ✅ Checklist post-génération

- [ ] Vérifier que tous les fichiers sont générés
- [ ] Remplacer les placeholders (téléphone, email)
- [ ] Ajouter les vraies images
- [ ] Mettre à jour le sitemap.xml
- [ ] Tester les pages sur mobile
- [ ] Soumettre à Google Search Console
- [ ] Créer Google My Business pour chaque ville

## 🐛 Dépannage

### Erreur "Module not found"
Assurez-vous d'être dans le répertoire racine du projet :
```bash
cd /chemin/vers/VOC-Call
node scripts/generate-demenagement-pages.js
```

### Ville non trouvée
Si une ville n'est pas dans `CITY_COORDS`, le script l'affichera dans les warnings. Ajoutez-la au script.

### Fichiers non générés
Vérifiez que :
- Le fichier CSV existe : `seo/mots-cles-volume-1000-plus.csv`
- Vous avez les permissions d'écriture
- Le dossier de sortie existe

---

**Dernière mise à jour :** 2025-01-20

