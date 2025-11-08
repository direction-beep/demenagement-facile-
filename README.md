# Déménagement Zen - Site Web

Site web professionnel de mise en relation avec des déménageurs.

## ðŸš€ Technologies

- HTML5
- CSS3 (Flexbox, Grid)
- JavaScript (Vanilla)
- Vercel (Hébergement)

## ðŸ“ Structure du projet

```
demenagement-facile-site/
â”œâ”€â”€ index.html                 # Page d'accueil
â”œâ”€â”€ demenageur-paris.html      # Page ville - Paris
â”œâ”€â”€ demenageur-lyon.html       # Page ville - Lyon
â”œâ”€â”€ demenageur-marseille.html  # Page ville - Marseille
â”œâ”€â”€ demenageur-toulouse.html   # Page ville - Toulouse
â”œâ”€â”€ css/
â”‚   â””â”€â”€ styles.css            # Styles principaux
â”œâ”€â”€ js/
â”‚   â””â”€â”€ main.js               # Scripts JavaScript
â”œâ”€â”€ vercel.json               # Configuration Vercel
â”œâ”€â”€ robots.txt                # Configuration SEO
â””â”€â”€ README.md                 # Documentation
```

## ðŸŒ Pages de villes

Le site comprend des pages SEO-optimisées pour chaque ville de France. Chaque page inclut :
- Titre et description optimisés localement
- Formulaire de devis pré-rempli
- Informations locales spécifiques
- FAQ adaptée à la région
- Schema.org LocalBusiness markup

### Pages actuellement disponibles

- âœ… Paris (75)
- âœ… Lyon (69)
- âœ… Marseille (13)
- âœ… Toulouse (31)

### Pages à créer (environ 100)

Utiliser le template des pages existantes pour générer les pages pour :
- Nice, Bordeaux, Nantes, Strasbourg, Montpellier, Lille, Rennes, Reims, Le Havre, Saint-Ã‰tienne...
- Toutes les préfectures de départements français

## ðŸ› ï¸ Installation et déploiement

### Prérequis

- Git
- Compte GitHub
- Compte Vercel

### Déploiement local

1. Cloner le projet :
```bash
git clone https://github.com/votre-username/demenagement-zen.git
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
   - Ajouter `demenagement-zen.fr`
   - Suivre les instructions DNS

## âš™ï¸ Configuration

### Vercel (`vercel.json`)

- `cleanUrls`: URLs sans `.html`
- `trailingSlash`: Pas de slash final
- Headers de sécurité configurés
- Cache optimisé pour assets statiques

### SEO (`robots.txt`)

- Sitemap configuré
- Crawl-delay respectueux
- Exclusions de dossiers privés

## ðŸŽ¨ Personnalisation

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
- Email : `contact@demenagement-zen.fr`
- Téléphone : `01 23 45 67 89`
- Adresse : `10 Rue de la Liberté, 75001 Paris`

## ðŸ“Š SEO

### Optimisations appliquées

- âœ… Meta tags optimisés (title, description, keywords)
- âœ… Canonical URLs
- âœ… Schema.org markup (LocalBusiness)
- âœ… Sitemap.xml
- âœ… Robots.txt configuré
- âœ… URLs propres (cleanUrls)
- âœ… Structure sémantique HTML5

### Analytics à ajouter

- Google Analytics 4
- Google Search Console
- Facebook Pixel (optionnel)

## ðŸ”§ Scripts de génération

Pour générer automatiquement les 100+ pages de villes restantes :

### Option 1 : Script Python
```python
# Ã€ créer : generate_cities.py
# Génère les pages HTML basées sur un template
```

### Option 2 : Script PowerShell
```powershell
# Voir generate-cities.ps1
./generate-cities.ps1
```

## ðŸ“ TODO

- [ ] Créer les 100+ pages de villes restantes
- [ ] Ajouter Google Analytics
- [ ] Configurer Google Search Console
- [ ] Intégrer un système de devis en ligne
- [ ] Ajouter un backend pour les demandes de devis
- [ ] Créer une page "Ã€ propos"
- [ ] Créer une page "FAQ globale"
- [ ] Ajouter des avis clients
- [ ] Créer un blog
- [ ] Ajouter un formulaire de contact fonctionnel

## ðŸ“§ Contact

- Email : contact@demenagement-zen.fr
- Site : https://demenagement-zen.fr

## ðŸ“„ Licence

© 2025 Déménagement Zen. Tous droits réservés.










