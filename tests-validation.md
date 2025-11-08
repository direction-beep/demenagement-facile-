## Plan de tests robustesse

### 1. Carte de France interactive
- **Blocage D3** :
  - Ouvrir `carte-france.html` dans Chrome.
  - DevTools â–¸ Network â–¸ onglet *Request blocking* âžœ ajouter `*d3*`.
  - Recharger et vérifier :
    - message dâ€™erreur explicite,
    - bouton « Réessayer » actif,
    - affichage de la grille des départements.
  - Cliquer « Réessayer » : observer le loader, puis le fallback image si lâ€™échec persiste.
  - Retirer le blocage, recharger et confirmer que la carte SVG sâ€™affiche normalement.

- **Tests navigateurs** :
  - Chrome (desktop + mobile emulation), Firefox, Edge, Safari (si possible).
  - Contrôler : rendu de la carte, hover/clic départements, mises à jour du panneau dâ€™info.

- **Mobile / responsive** :
  - Utiliser les device presets (iPhone 14, Pixel 7, iPad).
  - Vérifier : zoom auto, bouton « Réessayer » accessible, défilement fluide, aucun débordement.

### 2. Formulaires de devis
- **Parcours principaux** :
  - `index.html#devis`
  - Formulaire hero sur la home (si différent)
  - Formulaire des pages ville (échantillon : `demenageur-paris.html`, `demenageur-lyon.html`).
  - Tester entrée valide âžœ confirmation + reset + disparition des erreurs.

- **Validation en ligne** :
  - Laisser des champs requis vides âžœ message « â€¦ est obligatoire ».
  - Email invalide âžœ message format.
  - Téléphone invalide âžœ message format FR.
  - Villes < 2 caractères âžœ message adéquat.

- **Notifications** :
  - Succès âžœ notif verte (icône check).
  - Erreur validation âžœ notif rouge « Veuillez corrigerâ€¦ ».
  - Fermeture manuelle (bouton ×) et auto (5s pour info/success).

- **Gestion réseau** :
  - DevTools â–¸ Network â–¸ profil *Offline* âžœ message « Vous semblez hors connexionâ€¦ », aucun appel réseau.
  - Profil *Slow 3G* âžœ timeout â‰ˆ 15s âžœ message délai + suggestion.
  - Simuler HTTP 500/502 (via mock/proxy) âžœ message serveur temporaire + coordonnée support.
  - Simuler HTTP 429 âžœ message limitation.

- **Duplication backend** :
  - Sur environnement de test, envoyer 2 soumissions identiques consécutives.
  - Vérifier logs / base : un seul enregistrement final ou statut idempotent.
  - Confirmer que le système de notification/email nâ€™envoie quâ€™un exemplaire.

### 3. Navigation & UI
- **Navigation mobile** : menu burger, CTA « Devis gratuit », navigation dans la section carte.
- **Notifications** : vérifier accessibilité (focus, rôle `alert`) et absence de chevauchement sur mobiles.
- **Console navigateur** : aucune erreur JS sur les pages testées (carte + formulaires + navigation principale).

### 4. Rapport
- Documenter chaque test (OK / KO, capture si KO) dans `tests-validation.md` en ajoutant un tableau résultat.
- Remonter les anomalies critiques immédiatement.

### 5. Actions post-optimisation
- Installer les dépendances et lancer la compression :
  - `npm install`
  - `npm run compress-images`
  - Vérifier que les templates ou includes consomment bien les variantes WebP/AVIF générées (balises `<picture>`, attributs `srcset`, etc.).
- Mesurer le LCP de `carte-france.html` avant/après la lazy-init (Lighthouse / WebPageTest) et consigner les résultats.
- Déployer la branche sur un environnement de staging et contrôler les entêtes `Cache-Control` côté CDN (`.html`, `api/*`) via `curl -I` ou DevTools.
- Contrôler la carte France sur desktop et mobile :
  - Desktop : tooltips actifs, panneau info animé, fallback D3 fonctionnel (test blocage réseau).
  - Mobile / tactile : absence de tooltip flottant, affichage du panneau, navigation fluide.
- Tester les formulaires durant l'envoi : présence de l'overlay, blocage des interactions, respect des préférences `prefers-reduced-motion`.
- Lancer un audit Lighthouse mobile en mode throttling et noter LCP / CLS après optimisations responsive.


