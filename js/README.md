# Structure du Code JavaScript

## 📁 Organisation

Le code JavaScript est organisé en modules pour une meilleure maintenabilité :

```
js/
├── core/                    # Modules principaux de l'application
│   ├── Navigation.js        # Gestion de la navigation et menu mobile
│   ├── FAQ.js               # Gestion des FAQ en accordéon
│   └── Animations.js        # Animations au scroll
│
├── utils/                   # Utilitaires réutilisables
│   ├── constants.js         # Constantes globales
│   ├── validators.js        # Fonctions de validation
│   ├── dom-helpers.js       # Helpers pour manipuler le DOM
│   └── api-client.js        # Client API avec retry logic
│
├── main.js                  # Point d'entrée principal (ancien)
├── main.refactored.js       # Point d'entrée refactorisé (nouveau)
│
└── [autres fichiers]        # Fichiers spécifiques (form-handler, seo-enhancements, etc.)
```

## 🔧 Modules

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

## 📝 Commentaires JSDoc

Tous les modules utilisent JSDoc pour la documentation :

```javascript
/**
 * Description de la fonction
 * @param {Type} paramName - Description du paramètre
 * @returns {Type} Description de la valeur de retour
 */
```

## 🚀 Migration

Pour migrer vers le code refactorisé :

1. Remplacez `main.js` par `main.refactored.js`
2. Mettez à jour les imports dans les autres fichiers
3. Testez toutes les fonctionnalités

## 🔄 Améliorations apportées

- ✅ Séparation des responsabilités (SRP)
- ✅ Code réutilisable (DRY)
- ✅ Commentaires JSDoc complets
- ✅ Gestion d'erreurs améliorée
- ✅ Support de l'accessibilité
- ✅ Code modulaire et testable

