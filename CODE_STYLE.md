# Guide de Style de Code

## ðŸ“‹ Principes généraux

### 1. Organisation modulaire
- **Séparation des responsabilités** : Chaque module a une responsabilité unique
- **Code réutilisable** : Ã‰viter la duplication (DRY - Don't Repeat Yourself)
- **Dépendances claires** : Utiliser des imports/exports explicites

### 2. Commentaires JSDoc

Tous les fichiers, fonctions et classes doivent avoir des commentaires JSDoc :

```javascript
/**
 * Description de la fonction/classe
 * 
 * @param {Type} paramName - Description du paramètre
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
 * En-tête avec description
 */

// Imports
import { ... } from './module.js';

// Constantes locales
const LOCAL_CONSTANT = 'value';

// Classes/Fonctions principales
export class MyClass {
    // ...
}

// Fonctions utilitaires privées
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
    // Code qui peut échouer
} catch (error) {
    console.error('Descriptive error message:', error);
    // Gérer l'erreur de manière appropriée
    return { success: false, error: error.message };
}
```

### 2. Validation des paramètres

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

Préférer les fonctions pures quand possible :

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
â”œâ”€â”€ utils/             # Utilitaires réutilisables
â”œâ”€â”€ components/        # Composants réutilisables (si nécessaire)
â””â”€â”€ [feature].js       # Fichiers spécifiques à une fonctionnalité
```

## ðŸ” Exemples

### Exemple de classe bien documentée

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
     * @param {HTMLFormElement} form - L'élément formulaire
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
 * @param {string} email - L'adresse email à valider
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

- [ ] Commentaires JSDoc présents
- [ ] Pas de code dupliqué
- [ ] Gestion d'erreurs appropriée
- [ ] Validation des paramètres
- [ ] Utilisation des constantes
- [ ] Nommage cohérent
- [ ] Code testable
- [ ] Accessibilité prise en compte




