# Structure du Code JavaScript

## ðŸ“ Organisation

Le code JavaScript est organisÃ© en modules pour une meilleure maintenabilitÃ© :

```
js/
â”œâ”€â”€ core/                    # Modules principaux de l'application
â”‚   â”œâ”€â”€ Navigation.js        # Gestion de la navigation et menu mobile
â”‚   â”œâ”€â”€ FAQ.js               # Gestion des FAQ en accordÃ©on
â”‚   â””â”€â”€ Animations.js        # Animations au scroll
â”‚
â”œâ”€â”€ utils/                   # Utilitaires rÃ©utilisables
â”‚   â”œâ”€â”€ constants.js         # Constantes globales
â”‚   â”œâ”€â”€ validators.js        # Fonctions de validation
â”‚   â”œâ”€â”€ dom-helpers.js       # Helpers pour manipuler le DOM
â”‚   â””â”€â”€ api-client.js        # Client API avec retry logic
â”‚
â”œâ”€â”€ main.js                  # Point d'entrÃ©e principal (ancien)
â”œâ”€â”€ main.refactored.js       # Point d'entrÃ©e refactorisÃ© (nouveau)
â”‚
â””â”€â”€ [autres fichiers]        # Fichiers spÃ©cifiques (form-handler, seo-enhancements, etc.)
```

## ðŸ”§ Modules

### Core Modules

#### Navigation
GÃ¨re le menu mobile, la navigation et les liens d'ancrage.

```javascript
import Navigation from './core/Navigation.js';

// Utilisation
const nav = new Navigation();
nav.openMobileMenu();
nav.closeMobileMenu();
```

#### FAQ
GÃ¨re les FAQ en accordÃ©on avec support de l'accessibilitÃ©.

```javascript
import FAQ from './core/FAQ.js';

// Utilisation
const faq = new FAQ({ allowMultiple: false });
faq.openItem(0);
faq.closeAll();
```

#### Animations
GÃ¨re les animations au scroll avec Intersection Observer.

```javascript
import Animations from './core/Animations.js';

// Utilisation
const animations = new Animations();
animations.observeElement(element);
```

### Utils

#### Constants
Toutes les constantes centralisÃ©es.

```javascript
import { CONFIG, REGEX, DEPARTMENTS } from './utils/constants.js';
```

#### Validators
Fonctions de validation rÃ©utilisables.

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
 * @param {Type} paramName - Description du paramÃ¨tre
 * @returns {Type} Description de la valeur de retour
 */
```

## ðŸš€ Migration

Pour migrer vers le code refactorisÃ© :

1. Remplacez `main.js` par `main.refactored.js`
2. Mettez Ã  jour les imports dans les autres fichiers
3. Testez toutes les fonctionnalitÃ©s

## ðŸ”„ AmÃ©liorations apportÃ©es

- âœ… SÃ©paration des responsabilitÃ©s (SRP)
- âœ… Code rÃ©utilisable (DRY)
- âœ… Commentaires JSDoc complets
- âœ… Gestion d'erreurs amÃ©liorÃ©e
- âœ… Support de l'accessibilitÃ©
- âœ… Code modulaire et testable



