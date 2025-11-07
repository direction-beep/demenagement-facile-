# Guide de Style de Code

## ðŸ“‹ Principes gÃ©nÃ©raux

### 1. Organisation modulaire
- **SÃ©paration des responsabilitÃ©s** : Chaque module a une responsabilitÃ© unique
- **Code rÃ©utilisable** : Ã‰viter la duplication (DRY - Don't Repeat Yourself)
- **DÃ©pendances claires** : Utiliser des imports/exports explicites

### 2. Commentaires JSDoc

Tous les fichiers, fonctions et classes doivent avoir des commentaires JSDoc :

```javascript
/**
 * Description de la fonction/classe
 * 
 * @param {Type} paramName - Description du paramÃ¨tre
 * @param {Object} options - Options de configuration
 * @param {string} options.key - Description de l'option
 * @returns {Type} Description de la valeur de retour
 * @throws {Error} Description de l'erreur possible
 * 
 * @example
 * const result = myFunction('value', { key: 'option' });
 */
```

### 3. Nommage

- **Variables et fonctions** : `camelCase`
- **Classes** : `PascalCase`
- **Constantes** : `UPPER_SNAKE_CASE`
- **Fichiers** : `kebab-case.js` ou `PascalCase.js` pour les classes

### 4. Structure des fichiers

```javascript
/**
 * En-tÃªte avec description
 */

// Imports
import { ... } from './module.js';

// Constantes locales
const LOCAL_CONSTANT = 'value';

// Classes/Fonctions principales
export class MyClass {
    // ...
}

// Fonctions utilitaires privÃ©es
function privateFunction() {
    // ...
}

// Initialisation
// ...
```

## ðŸŽ¯ Bonnes pratiques

### 1. Gestion des erreurs

```javascript
try {
    // Code qui peut Ã©chouer
} catch (error) {
    console.error('Descriptive error message:', error);
    // GÃ©rer l'erreur de maniÃ¨re appropriÃ©e
    return { success: false, error: error.message };
}
```

### 2. Validation des paramÃ¨tres

```javascript
function myFunction(param) {
    if (!param || typeof param !== 'string') {
        throw new Error('param must be a non-empty string');
    }
    // ...
}
```

### 3. Utilisation des constantes

```javascript
// âŒ Mauvais
if (status === 'success') { ... }

// âœ… Bon
import { STATUS } from './constants.js';
if (status === STATUS.SUCCESS) { ... }
```

### 4. Fonctions pures

PrÃ©fÃ©rer les fonctions pures quand possible :

```javascript
// âœ… Fonction pure
function add(a, b) {
    return a + b;
}

// âŒ Fonction avec effet de bord
let counter = 0;
function increment() {
    counter++;
}
```

## ðŸ“ Organisation des fichiers

```
js/
â”œâ”€â”€ core/              # Modules principaux de l'application
â”œâ”€â”€ utils/             # Utilitaires rÃ©utilisables
â”œâ”€â”€ components/        # Composants rÃ©utilisables (si nÃ©cessaire)
â””â”€â”€ [feature].js       # Fichiers spÃ©cifiques Ã  une fonctionnalitÃ©
```

## ðŸ” Exemples

### Exemple de classe bien documentÃ©e

```javascript
/**
 * Gestionnaire de formulaire
 * 
 * @class FormHandler
 * @example
 * const handler = new FormHandler(formElement, {
 *     validationRules: customRules,
 *     showNotifications: true
 * });
 */
export class FormHandler {
    /**
     * @param {HTMLFormElement} form - L'Ã©lÃ©ment formulaire
     * @param {Object} options - Options de configuration
     * @throws {Error} Si le formulaire n'est pas valide
     */
    constructor(form, options = {}) {
        // ...
    }
}
```

### Exemple de fonction utilitaire

```javascript
/**
 * Valide une adresse email
 * 
 * @param {string} email - L'adresse email Ã  valider
 * @returns {boolean} True si l'email est valide
 * 
 * @example
 * isValidEmail('test@example.com'); // true
 * isValidEmail('invalid'); // false
 */
export function isValidEmail(email) {
    // ...
}
```

## âœ… Checklist de code review

- [ ] Commentaires JSDoc prÃ©sents
- [ ] Pas de code dupliquÃ©
- [ ] Gestion d'erreurs appropriÃ©e
- [ ] Validation des paramÃ¨tres
- [ ] Utilisation des constantes
- [ ] Nommage cohÃ©rent
- [ ] Code testable
- [ ] AccessibilitÃ© prise en compte



