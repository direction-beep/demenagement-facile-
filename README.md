# Déménagement Facile - Site Web

Site web professionnel de mise en relation avec des déménageurs.

## 🚀 Technologies

- HTML5
- CSS3 (Flexbox, Grid)
- JavaScript (Vanilla)
- Vercel (Hébergement)

## 📁 Structure du projet

```
demenagement-facile-site/
├── index.html                 # Page d'accueil
├── demenageur-paris.html      # Page ville - Paris
├── demenageur-lyon.html       # Page ville - Lyon
├── demenageur-marseille.html  # Page ville - Marseille
├── demenageur-toulouse.html   # Page ville - Toulouse
├── css/
│   └── styles.css            # Styles principaux
├── js/
│   └── main.js               # Scripts JavaScript
├── vercel.json               # Configuration Vercel
├── robots.txt                # Configuration SEO
└── README.md                 # Documentation
```

## 🌐 Pages de villes

Le site comprend des pages SEO-optimisées pour chaque ville de France. Chaque page inclut :
- Titre et description optimisés localement
- Formulaire de devis pré-rempli
- Informations locales spécifiques
- FAQ adaptée à la région
- Schema.org LocalBusiness markup

### Pages actuellement disponibles

- ✅ Paris (75)
- ✅ Lyon (69)
- ✅ Marseille (13)
- ✅ Toulouse (31)

### Pages à créer (environ 100)

Utiliser le template des pages existantes pour générer les pages pour :
- Nice, Bordeaux, Nantes, Strasbourg, Montpellier, Lille, Rennes, Reims, Le Havre, Saint-Étienne...
- Toutes les préfectures de départements français

## 🛠️ Installation et déploiement

### Prérequis

- Git
- Compte GitHub
- Compte Vercel

### Déploiement local

1. Cloner le projet :
```bash
git clone https://github.com/votre-username/demenagement-facile.git
cd demenagement-facile-site
```

2. Ouvrir `index.html` dans un navigateur ou utiliser un serveur local :
```bash
# Python
python -m http.server 8000

# Node.js
npx serve .
```

### Déploiement sur Vercel

1. **Méthode 1 : Via GitHub (Recommandé)**
   - Pousser le code sur GitHub
   - Connecter le repo à Vercel
   - Vercel déploiera automatiquement

2. **Méthode 2 : Via CLI Vercel**
```bash
npm i -g vercel
vercel login
vercel
```

3. **Configuration du domaine**
   - Aller dans Settings > Domains
   - Ajouter `demenagement-facile.fr`
   - Suivre les instructions DNS

## ⚙️ Configuration

### Vercel (`vercel.json`)

- `cleanUrls`: URLs sans `.html`
- `trailingSlash`: Pas de slash final
- Headers de sécurité configurés
- Cache optimisé pour assets statiques

### SEO (`robots.txt`)

- Sitemap configuré
- Crawl-delay respectueux
- Exclusions de dossiers privés

## 🎨 Personnalisation

### Couleurs principales

Modifiez les variables CSS dans `css/styles.css` :
```css
:root {
    --color-primary: #007bff;
    --color-secondary: #28a745;
    --color-text: #333;
    /* ... */
}
```

### Contact

Modifiez les informations de contact dans toutes les pages HTML :
- Email : `contact@demenagement-facile.fr`
- Téléphone : `01 23 45 67 89`
- Adresse : `10 Rue de la Liberté, 75001 Paris`

## 📊 SEO

### Optimisations appliquées

- ✅ Meta tags optimisés (title, description, keywords)
- ✅ Canonical URLs
- ✅ Schema.org markup (LocalBusiness)
- ✅ Sitemap.xml
- ✅ Robots.txt configuré
- ✅ URLs propres (cleanUrls)
- ✅ Structure sémantique HTML5

### Analytics à ajouter

- Google Analytics 4
- Google Search Console
- Facebook Pixel (optionnel)

## 🔧 Scripts de génération

Pour générer automatiquement les 100+ pages de villes restantes :

### Option 1 : Script Python
```python
# À créer : generate_cities.py
# Génère les pages HTML basées sur un template
```

### Option 2 : Script PowerShell
```powershell
# Voir generate-cities.ps1
./generate-cities.ps1
```

## 📝 TODO

- [ ] Créer les 100+ pages de villes restantes
- [ ] Ajouter Google Analytics
- [ ] Configurer Google Search Console
- [ ] Intégrer un système de devis en ligne
- [ ] Ajouter un backend pour les demandes de devis
- [ ] Créer une page "À propos"
- [ ] Créer une page "FAQ globale"
- [ ] Ajouter des avis clients
- [ ] Créer un blog
- [ ] Ajouter un formulaire de contact fonctionnel

## 📧 Contact

- Email : contact@demenagement-facile.fr
- Site : https://demenagement-facile.fr

## 📄 Licence

© 2025 Déménagement Facile. Tous droits réservés.


