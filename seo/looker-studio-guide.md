# Guide détaillé : Création Dashboard Looker Studio - VOC-Call

## Étape 1 : Accéder à Looker Studio et créer un nouveau rapport

1. **Ouvre Looker Studio** : `https://lookerstudio.google.com/`
2. **Clique sur** `Créer` (bouton bleu en haut à gauche) → `Rapport` (ou `Report`)
3. **Une fenêtre s'ouvre** : "Ajouter des données à votre rapport"
4. **Ne sélectionne rien pour l'instant** → Clique sur `Créer un rapport vide` (ou `Blank report`) en bas à droite

---

## Étape 2 : Connecter la source de données GA4

1. **Dans le rapport vide**, clique sur `Ajouter des données` (ou `Add data`) en haut à droite
2. **Dans la liste des connecteurs**, cherche et clique sur `Google Analytics`
3. **Sélectionne** `Google Analytics 4` (pas Universal Analytics)
4. **Autorise l'accès** si demandé (connexion à ton compte Google)
5. **Sélectionne la propriété** : cherche `VOC-CALL New` (ou le nom de ta propriété GA4)
6. **Clique sur** `Ajouter` (ou `Add`)
7. **Une table de données apparaît** → Clique sur `Ajouter au rapport` (ou `Add to report`)

✅ **Résultat** : Tu as maintenant une source de données GA4 connectée.

---

## Étape 3 : Ajouter la source Search Console

1. **Dans le rapport**, clique sur `Ressources` (ou `Resource`) dans le menu du haut → `Gérer les sources de données ajoutées` (ou `Manage added data sources`)
2. **Clique sur** `Ajouter une source de données` (ou `Add a data source`)
3. **Cherche et clique sur** `Google Search Console`
4. **Sélectionne** :
   - **Type** : `Propriété de domaine` (ou `Domain property`)
   - **Propriété** : `voc-call.com` (ou ton domaine)
   - **Type de données** : `Résultats de recherche` (ou `Search results`)
5. **Clique sur** `Connecter` (ou `Connect`)
6. **Autorise l'accès** si demandé
7. **Clique sur** `Ajouter au rapport` (ou `Add to report`)

✅ **Résultat** : Tu as maintenant 2 sources de données (GA4 + Search Console).

---

## Étape 4 : Page 1 - Vue d'ensemble

### 4.1 Créer les Scorecards (Indicateurs clés)

1. **Dans le menu du haut**, clique sur `Insérer` (ou `Insert`) → `Indicateur clé` (ou `Scorecard`)
2. **Un widget apparaît** → Clique dessus pour le configurer
3. **Dans le panneau de droite "Données"** :
   - **Source de données** : sélectionne `Google Analytics 4`
   - **Métrique** : cherche et sélectionne `Sessions`
   - **Comparaison** : coche `Comparaison avec la période précédente` (optionnel)
4. **Répète pour créer 3 autres scorecards** :
   - **Scorecard 2** : `Utilisateurs` (métrique)
   - **Scorecard 3** : `Conversions` (métrique) - Si disponible, sinon `Nombre d'événements` avec filtre `event_name = tally_form_submit`
   - **Scorecard 4** : `Taux de conversion` (métrique calculée : `Conversions / Sessions * 100`)

### 4.2 Créer le graphique "Sessions organiques" (28 jours)

1. **Clique sur** `Insérer` → `Graphique en courbes` (ou `Time series chart`)
2. **Clique sur le graphique** pour le configurer
3. **Dans le panneau "Données"** :
   - **Source** : `Google Analytics 4`
   - **Dimension** : `Date` (ou `Date`)
   - **Métrique** : `Sessions`
   - **Filtre** : Clique sur `Ajouter un filtre` → `Session source / support` = `google / organic`
4. **Dans le panneau "Style"** :
   - **Période** : `28 derniers jours` (ou `Last 28 days`)
   - **Titre** : `Sessions organiques (28 jours)`

### 4.3 Créer le graphique "Conversions Tally" (28 jours)

1. **Clique sur** `Insérer` → `Graphique en courbes` (ou `Time series chart`)
2. **Configure le graphique** :
   - **Source** : `Google Analytics 4`
   - **Dimension** : `Date`
   - **Métrique** : `Nombre d'événements`
   - **Filtre** : `Nom de l'événement` = `tally_form_submit`
3. **Titre** : `Conversions Tally (28 jours)`

### 4.4 Créer le tableau "Landing Pages"

1. **Clique sur** `Insérer` → `Tableau` (ou `Table`)
2. **Configure le tableau** :
   - **Source** : `Google Analytics 4`
   - **Dimension** : `Page de destination` (ou `Landing page`)
   - **Métriques** : 
     - `Sessions`
     - `Conversions` (ou `Nombre d'événements` avec filtre `tally_form_submit`)
     - `Taux de rebond` (ou `Bounce rate`)
3. **Titre** : `Performance par Landing Page`
4. **Trie par** : `Sessions` (ordre décroissant)

### 4.5 Organiser la page

- **Dispose les widgets** : Scorecards en haut (4 côte à côte), graphiques en dessous, tableau en bas
- **Redimensionne** en cliquant-glissant les coins des widgets

---

## Étape 5 : Page 2 - Performance SEO

### 5.1 Créer une nouvelle page

1. **En bas du rapport**, clique sur `Ajouter une page` (ou `Add page`) → `Page vierge` (ou `Blank page`)
2. **Renomme la page** : Double-clique sur "Page 2" → Tape `Performance SEO`

### 5.2 Graphique "Requêtes Search Console"

1. **Clique sur** `Insérer` → `Graphique en barres` (ou `Bar chart`)
2. **Configure** :
   - **Source** : `Google Search Console`
   - **Dimension** : `Requête` (ou `Query`)
   - **Métriques** : 
     - `Impressions`
     - `Clics`
     - `CTR` (Click-through rate)
     - `Position moyenne` (ou `Average position`)
3. **Titre** : `Top Requêtes Search Console`
4. **Limite** : Affiche les 10 premières (dans "Style" → `Nombre de lignes` = 10)

### 5.3 Tableau "Pages Search Console"

1. **Clique sur** `Insérer` → `Tableau`
2. **Configure** :
   - **Source** : `Google Search Console`
   - **Dimension** : `Page` (ou `Page`)
   - **Métriques** : `Impressions`, `Clics`, `Position moyenne`
3. **Titre** : `Performance par Page (Search Console)`
4. **Trie par** : `Clics` (ordre décroissant)

---

## Étape 6 : Page 3 - Contenu & Funnel

### 6.1 Créer la page 3

1. **Clique sur** `Ajouter une page` → `Page vierge`
2. **Renomme** : `Contenu & Funnel`

### 6.2 Graphique "Sessions par Source/Support"

1. **Clique sur** `Insérer` → `Graphique en secteurs` (ou `Pie chart`) ou `Graphique en barres`
2. **Configure** :
   - **Source** : `Google Analytics 4`
   - **Dimension** : `Session source / support` (ou `Session source/medium`)
   - **Métrique** : `Sessions`
3. **Titre** : `Sessions par Canal`

### 6.3 Tableau "Événements"

1. **Clique sur** `Insérer` → `Tableau`
2. **Configure** :
   - **Source** : `Google Analytics 4`
   - **Dimension** : `Nom de l'événement` (ou `Event name`)
   - **Métriques** : `Nombre d'événements`, `Nombre total d'utilisateurs`
   - **Filtre** : `Nom de l'événement` contient `tally` OU `form` (pour voir tally_form_submit, form_start, form_submit)
3. **Titre** : `Événements Formulaires`

### 6.4 Section Backlinks (optionnel - nécessite Google Sheets)

**Si tu as déjà uploadé `seo/backlink-tracker.csv` dans Google Sheets :**

1. **Clique sur** `Ressources` → `Gérer les sources de données ajoutées`
2. **Clique sur** `Ajouter une source de données` → `Google Sheets`
3. **Sélectionne le fichier** `backlink-tracker.csv` (ou le nom de ton Google Sheet)
4. **Clique sur** `Connecter` → `Ajouter au rapport`
5. **Retourne sur la page 3**, clique sur `Insérer` → `Tableau`
6. **Configure** :
   - **Source** : `backlink-tracker` (ton Google Sheet)
   - **Dimensions** : `Source`, `Type`, `Anchor`, `URL cible`, `Statut`
7. **Titre** : `Suivi Backlinks`

---

## Étape 7 : Configuration globale du rapport

### 7.1 Paramètres par défaut (période et filtres)

1. **Clique sur** `Fichier` (ou `File`) → `Paramètres du rapport` (ou `Report settings`)
2. **Onglet "Données"** :
   - **Période par défaut** : `30 derniers jours` (ou `Last 30 days`)
   - **Fuseau horaire** : `Europe/Paris` (ou ton fuseau)
3. **Onglet "Thème"** :
   - **Couleur principale** : `#002752` (bleu VOC-Call)
   - **Couleur secondaire** : `#FF4D4D` (rouge VOC-Call)
   - **Couleur d'accent** : `#002752`
4. **Clique sur** `Enregistrer`

### 7.2 Ajouter un contrôle de période (optionnel mais recommandé)

1. **Sur la page 1**, clique sur `Insérer` → `Contrôle de date` (ou `Date range control`)
2. **Place-le en haut de la page** (les utilisateurs pourront changer la période)

---

## Étape 8 : Partage et programmation d'envoi

### 8.1 Partager le rapport

1. **Clique sur** `Partager` (bouton bleu en haut à droite)
2. **Dans la fenêtre** :
   - **Ajoute les adresses email** de ton équipe
   - **Droits d'accès** : `Visualiseur` (ou `Viewer`) pour l'équipe
   - **Coche** `Notifier les personnes` si tu veux leur envoyer un email
3. **Clique sur** `Envoyer`

### 8.2 Programmer un envoi automatique (email hebdomadaire)

1. **Clique sur** `Fichier` → `Programmes d'envoi` (ou `Schedule email delivery`)
2. **Clique sur** `Ajouter un programme` (ou `Add schedule`)
3. **Configure** :
   - **Destinataires** : Ajoute les emails de l'équipe
   - **Fréquence** : `Hebdomadaire` (ou `Weekly`)
   - **Jour** : Choisis un jour (ex. Lundi)
   - **Heure** : Choisis une heure (ex. 9h00)
   - **Format** : `PDF` ou `Lien vers le rapport`
   - **Période** : `30 derniers jours` (ou laisse par défaut)
4. **Clique sur** `Enregistrer`

✅ **Résultat** : Le rapport sera envoyé automatiquement chaque semaine par email.

---

## Checklist finale

- [ ] GA4 connecté et visible dans les widgets
- [ ] Search Console connecté et visible
- [ ] Page 1 : 4 scorecards (Sessions, Utilisateurs, Conversions, Taux conversion)
- [ ] Page 1 : Graphique Sessions organiques (28 jours)
- [ ] Page 1 : Graphique Conversions Tally (28 jours)
- [ ] Page 1 : Tableau Landing Pages
- [ ] Page 2 : Graphique Requêtes Search Console
- [ ] Page 2 : Tableau Pages Search Console
- [ ] Page 3 : Graphique Sessions par Source/Support
- [ ] Page 3 : Tableau Événements formulaires
- [ ] Contrôle de date ajouté (optionnel)
- [ ] Thème VOC-Call appliqué (#002752, #FF4D4D)
- [ ] Rapport partagé avec l'équipe
- [ ] Email hebdomadaire programmé

---

## URLs utiles

- **Looker Studio** : `https://lookerstudio.google.com/`
- **Créer un rapport** : `https://lookerstudio.google.com/reporting/create`
- **Mes rapports** : `https://lookerstudio.google.com/u/0/reporting`

---

## Dépannage

### Problème : "Aucune donnée" dans les widgets
- **Solution** : Vérifie que la période sélectionnée contient des données (GA4 peut prendre 24-48h pour afficher les données)

### Problème : "Conversions" n'apparaît pas
- **Solution** : Utilise `Nombre d'événements` avec un filtre `event_name = tally_form_submit`

### Problème : Search Console ne se connecte pas
- **Solution** : Vérifie que tu as accès à la propriété Search Console de `voc-call.com` (ou ton domaine)

### Problème : Google Sheets pour backlinks ne fonctionne pas
- **Solution** : Assure-toi que le fichier est bien dans Google Sheets (pas juste un CSV local), et que tu as partagé l'accès si nécessaire

---

**Besoin d'aide ?** Dis-moi à quelle étape tu es bloqué et je t'aide à résoudre le problème.








