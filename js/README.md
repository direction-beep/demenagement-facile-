# Structure du Code JavaScript

## ðŸ“ Organisation

Le code JavaScript est organisé en modules pour une meilleure maintenabilité :

```
js/
â”œâ”€â”€ core/                    # Modules principaux de l'application
â”‚   â”œâ”€â”€ Navigation.js        # Gestion de la navigation et menu mobile
â”‚   â”œâ”€â”€ FAQ.js               # Gestion des FAQ en accordéon
â”‚   â””â”€â”€ Animations.js        # Animations au scroll
â”‚
â”œâ”€â”€ utils/                   # Utilitaires réutilisables
â”‚   â”œâ”€â”€ constants.js         # Constantes globales
â”‚   â”œâ”€â”€ validators.js        # Fonctions de validation
â”‚   â”œâ”€â”€ dom-helpers.js       # Helpers pour manipuler le DOM
â”‚   â””â”€â”€ api-client.js        # Client API avec retry logic
â”‚
â”œâ”€â”€ main.js                  # Point d'entrée principal (ancien)
â”œâ”€â”€ main.refactored.js       # Point d'entrée refactorisé (nouveau)
â”‚
â””â”€â”€ [autres fichiers]        # Fichiers spécifiques (form-handler, seo-enhancements, etc.)
```

## ðŸ”§ Modules

### Core Modules

#### Navigation
Gère le menu mobile, la navigation et les liens d'ancrage.

```javascript
import Navigation from './core/Navigation.js';

// Utilisation
const nav = new Navigation();
nav.openMobileMenu();
nav.closeMobileMenu();
```

#### FAQ
Gère les FAQ en accordéon avec support de l'accessibilité.

```javascript
import FAQ from './core/FAQ.js';

// Utilisation
const faq = new FAQ({ allowMultiple: false });
faq.openItem(0);
faq.closeAll();
```

#### Animations
Gère les animations au scroll avec Intersection Observer.

```javascript
import Animations from './core/Animations.js';

// Utilisation
const animations = new Animations();
animations.observeElement(element);
```

### Utils

#### Constants
Toutes les constantes centralisées.

```javascript
import { CONFIG, REGEX, DEPARTMENTS } from './utils/constants.js';
```

#### Validators
Fonctions de validation réutilisables.

```javascript
import { isValidEmail, isValidPhone, validateForm } from './utils/validators.js';
```

#### DOM Helpers
Fonctions utilitaires pour manipuler le DOM.

```javascript
import { $, $$, addClass, removeClass, scrollTo } from './utils/dom-helpers.js';
```

#### API Client
Client API avec gestion des erreurs et retry.

```javascript
import { apiRequest, submitForm, retryRequest } from './utils/api-client.js';
```

## ðŸ“ Commentaires JSDoc

Tous les modules utilisent JSDoc pour la documentation :

```javascript
/**
 * Description de la fonction
 * @param {Type} paramName - Description du paramètre
 * @returns {Type} Description de la valeur de retour
 */
```

## ðŸš€ Migration

Pour migrer vers le code refactorisé :

1. Remplacez `main.js` par `main.refactored.js`
2. Mettez à jour les imports dans les autres fichiers
3. Testez toutes les fonctionnalités

## ðŸ”„ Améliorations apportées

- âœ… Séparation des responsabilités (SRP)
- âœ… Code réutilisable (DRY)
- âœ… Commentaires JSDoc complets
- âœ… Gestion d'erreurs améliorée
- âœ… Support de l'accessibilité
- âœ… Code modulaire et testable




