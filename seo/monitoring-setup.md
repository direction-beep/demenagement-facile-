# Monitoring SEO VOC-Call

## 1. Pré-requis
- Disposer d’un accès administrateur à `GA4 VOC-CALL New`, Search Console (`https://search.google.com/search-console?resource_id=sc-domain:voc-call.com` ou `sc-site:https://voc-call.com/` selon la propriété), et Looker Studio (`https://lookerstudio.google.com/`).
- Navigateur connecté au même compte Google que celui utilisé lors de l’installation de la balise GA4 `G-KMNGSGF5WN`.
- Créer un dossier partagé (Drive/Workspace) pour stocker tous les rapports : `SEO VOC-CALL > Monitoring`.

## 2. GA4 – Vérification & Conversions
1. **Accéder à GA4** : `https://analytics.google.com/analytics/web/?authuser=0#/p/{PROPERTY_ID}/settings/events`. Remplacer `{PROPERTY_ID}` par l’identifiant GA4 (`VOC-CALL New`).
2. **Événements à surveiller** (menu *Admin > Événements*) :
   - `tally_form_submit` (conversion formulaire contact)
   - `form_submit` (fallback / formulaires legacy)
   - `Tally.FormSubmitted` et `Tally.FormPageView` (debug, optionnel)
3. **Marquer les conversions** :
   - Aller dans *Admin > Conversions*
   - Cliquer sur `Nouvelle conversion`, saisir `tally_form_submit`, activer
   - Vérifier que l’étoile est activée dans *Rapports > Configuration > Événements récents*
4. **Tester** :
   - Ouvrir `https://voc-call.com/contact.html?debug_mode=true`
   - Soumettre un formulaire test → ouvrir *Admin > DebugView* (`https://analytics.google.com/analytics/web/?authuser=0#/p/{PROPERTY_ID}/debugview`) pour vérifier l’événement
5. **Rapport personnalisé conversions** :
   - *Rapports > Bibliothèque > Collection Engagement > Modifier Événements*
   - Ajouter les métriques `Conversions`, `Taux de conversions`, `Utilisateurs`, `Sessions`
   - Publier pour rendre le rapport visible à toute l’équipe

## 3. GA4 – Insights & Alertes
1. Ouvrir `https://analytics.google.com/analytics/web/?authuser=0#/p/{PROPERTY_ID}/insights/recommended`
2. Créer des *Insights personnalisés* :
   - **Baisse trafic organique** : condition *Source/Support = google / organic*, déclencheur `Sessions` ↓ de 30% versus dernière semaine
   - **Baisse conversions** : `tally_form_submit` ↓ de 30% semaine/semaine
   - **Hausse soudaine** (détection spam) : `tally_form_submit` ↑ de 100% vs moyenne 30 jours
3. Définir la fréquence `Daily` et cocher `Envoyer email` vers l’équipe marketing
4. Ajouter le canal Slack/Teams si disponible via `Configure Slack notifications` (beta)

## 4. Search Console – Monitoring
1. Aller sur `https://search.google.com/search-console?resource_id=sc-domain:voc-call.com`
2. **Performance > Résultats de recherche** :
   - Créer un *Rapport enregistré* filtré sur `Requêtes` contenant les mots-clés principaux (call center france, hotline, etc.)
   - Export hebdomadaire en CSV
3. **Couverture** : activer les notifications email (par défaut) ; vérifier absence d’erreurs
4. **Sitemaps** : soumettre `https://voc-call.com/sitemap.xml`, vérifier le statut
5. **Astuces** : utiliser les `Insights` Search Console pour croiser avec GA4

## 5. Looker Studio – Dashboard principal
1. Aller sur `https://lookerstudio.google.com/reporting/create`
2. Choisir la source `Google Analytics > VOC-CALL New`
3. Ajouter une deuxième source `Search Console > Propriété de domaine > Search results`
4. **Page 1 – Vue d’ensemble** :
   - Scorecards : `Sessions`, `Utilisateurs`, `Conversions`, `Taux de conversion`
   - Séries temporelles (28 jours) : `Sessions organiques`, `Conversions (tally_form_submit)`
   - Tableau par `Landing Page` avec métriques `Sessions`, `Conversions`, `Taux de rebond`
5. **Page 2 – SEO performance** :
   - Diagramme `Requête` (Search Console) : `Impressions`, `CTR`, `Position`
   - Carte `Pays` (if localisé)
   - Table `Page` (Search Console) avec `Impressions`, `Clics`, `Position`
6. **Page 3 – Contenu & funnel** :
   - Graphique `Sessions` par `Source/Support`
   - Table `Événement` (GA4) avec `tally_form_submit`, `form_start`
   - Section `Backlinks` (connecter Google Sheets `seo/backlink-tracker.csv` via `Ajouter source > Google Sheets`)
7. Configurer `Paramètres du rapport > Filtres par défaut` : période 30 derniers jours, segment `GA4` > `Session medium = organic` optionnel
8. **Mise en forme** : réutiliser palette VOC-Call (#002752, #FF4D4D)
9. Partager le rapport (bouton `Partager`) avec accès en lecture pour l’équipe, planifier un email hebdo (`Fichier > Programmes d’envoi > Ajouter un programme`)

## 6. Tableaux de suivi Google Sheets
1. Uploader les CSV `seo/editorial-calendar.csv` et `seo/backlink-tracker.csv` dans un Google Sheet partagé
2. Ajouter un onglet `KPIs` :
   - Récupérer via `=GA4DATA()` (si extension) ou coller manuellement les données mensuelles
   - Colonnes : `Mois`, `Sessions organiques`, `Conversions`, `CTR moyen`, `Position moyenne`, `Backlinks actifs`
3. Connecter ce Google Sheet à Looker Studio pour visualiser la progression éditoriale et netlinking

## 7. Rôles & Cadence
- **Hebdomadaire** : vérifier GA4 (Sessions, Conversions), Search Console (CTR, impressions), status alertes
- **Mensuel** : exporter rapport Looker Studio PDF, mettre à jour feuille KPIs, valider backlog backlinks
- **Trimestriel** : audit Core Web Vitals, revue structure menu/footer pour maillage interne

## 8. Checklist de mise en production
- [ ] `tally_form_submit` visible dans `Rapports > Engagement > Événements`
- [ ] Conversion activée et comptabilisée dans les rapports standard
- [ ] Dashboard Looker Studio partagé + email hebdomadaire planifié
- [ ] Insights GA4 actifs et envoient des emails
- [ ] Search Console sans erreur critiques
- [ ] Fichier `seo/backlink-tracker.csv` synchronisé (Google Sheets)
- [ ] Planning éditorial à jour dans le dossier partagé









