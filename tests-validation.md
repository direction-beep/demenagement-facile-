## Plan de tests robustesse

### 1. Carte de France interactive
- **Blocage D3** :
  - Ouvrir `carte-france.html` dans Chrome.
  - DevTools â–¸ Network â–¸ onglet *Request blocking* âžœ ajouter `*d3*`.
  - Recharger et vÃ©rifier :
    - message dâ€™erreur explicite,
    - bouton Â«Â RÃ©essayerÂ Â» actif,
    - affichage de la grille des dÃ©partements.
  - Cliquer Â«Â RÃ©essayerÂ Â» : observer le loader, puis le fallback image si lâ€™Ã©chec persiste.
  - Retirer le blocage, recharger et confirmer que la carte SVG sâ€™affiche normalement.

- **Tests navigateurs** :
  - Chrome (desktop + mobile emulation), Firefox, Edge, Safari (si possible).
  - ContrÃ´ler : rendu de la carte, hover/clic dÃ©partements, mises Ã  jour du panneau dâ€™info.

- **Mobile / responsive** :
  - Utiliser les device presets (iPhone 14, Pixel 7, iPad).
  - VÃ©rifier : zoom auto, bouton Â«Â RÃ©essayerÂ Â» accessible, dÃ©filement fluide, aucun dÃ©bordement.

### 2. Formulaires de devis
- **Parcours principaux** :
  - `index.html#devis`
  - Formulaire hero sur la home (si diffÃ©rent)
  - Formulaire des pages ville (Ã©chantillon : `demenageur-paris.html`, `demenageur-lyon.html`).
  - Tester entrÃ©e valide âžœ confirmation + reset + disparition des erreurs.

- **Validation en ligne** :
  - Laisser des champs requis vides âžœ message Â«Â â€¦ est obligatoireÂ Â».
  - Email invalide âžœ message format.
  - TÃ©lÃ©phone invalide âžœ message format FR.
  - Villes < 2 caractÃ¨res âžœ message adÃ©quat.

- **Notifications** :
  - SuccÃ¨s âžœ notif verte (icÃ´ne check).
  - Erreur validation âžœ notif rouge Â«Â Veuillez corrigerâ€¦Â Â».
  - Fermeture manuelle (bouton Ã—) et auto (5s pour info/success).

- **Gestion rÃ©seau** :
  - DevTools â–¸ Network â–¸ profil *Offline* âžœ message Â«Â Vous semblez hors connexionâ€¦Â Â», aucun appel rÃ©seau.
  - Profil *Slow 3G* âžœ timeout â‰ˆ 15s âžœ message dÃ©lai + suggestion.
  - Simuler HTTP 500/502 (via mock/proxy) âžœ message serveur temporaire + coordonnÃ©e support.
  - Simuler HTTP 429 âžœ message limitation.

- **Duplication backend** :
  - Sur environnement de test, envoyer 2 soumissions identiques consÃ©cutives.
  - VÃ©rifier logs / base : un seul enregistrement final ou statut idempotent.
  - Confirmer que le systÃ¨me de notification/email nâ€™envoie quâ€™un exemplaire.

### 3. Navigation & UI
- **Navigation mobile** : menu burger, CTA Â«Â Devis gratuitÂ Â», navigation dans la section carte.
- **Notifications** : vÃ©rifier accessibilitÃ© (focus, rÃ´le `alert`) et absence de chevauchement sur mobiles.
- **Console navigateur** : aucune erreur JS sur les pages testÃ©es (carte + formulaires + navigation principale).

### 4. Rapport
- Documenter chaque test (OK / KO, capture si KO) dans `tests-validation.md` en ajoutant un tableau rÃ©sultat.
- Remonter les anomalies critiques immÃ©diatement.

### 5. Actions post-optimisation
- Installer les dÃ©pendances et lancer la compression :
  - `npm install`
  - `npm run compress-images`
  - VÃ©rifier que les templates ou includes consomment bien les variantes WebP/AVIF gÃ©nÃ©rÃ©es (balises `<picture>`, attributs `srcset`, etc.).
- Mesurer le LCP de `carte-france.html` avant/aprÃ¨s la lazy-init (Lighthouse / WebPageTest) et consigner les rÃ©sultats.
- DÃ©ployer la branche sur un environnement de staging et contrÃ´ler les entÃªtes `Cache-Control` cÃ´tÃ© CDN (`.html`, `api/*`) via `curl -I` ou DevTools.
- ContrÃ´ler la carte France sur desktop et mobile :
  - Desktop : tooltips actifs, panneau info animÃ©, fallback D3 fonctionnel (test blocage rÃ©seau).
  - Mobile / tactile : absence de tooltip flottant, affichage du panneau, navigation fluide.
- Tester les formulaires durant l'envoi : prÃ©sence de l'overlay, blocage des interactions, respect des prÃ©fÃ©rences `prefers-reduced-motion`.
- Lancer un audit Lighthouse mobile en mode throttling et noter LCP / CLS aprÃ¨s optimisations responsive.


