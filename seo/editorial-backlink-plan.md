# Plan éditorial & backlinks VOC-Call

_Mis à jour : 11/11/2025_

## 1. Calendrier éditorial (12 semaines)

| Semaine | Type | Sujet / mot-clé cible | Format & CTA | Statut |
| --- | --- | --- | --- | --- |
| S47 (18 nov) | Guide pilier | « Comment choisir un call center en France » (call center france) | Article 2000 mots + checklist PDF, CTA vers `service-client.html` | À rédiger |
| S48 (25 nov) | Article BOFU | « Standard téléphonique externalisé : tarifs et ROI » (standard externalisé prix) | Article 1200 mots + tableau comparatif, CTA vers `standard-externalise.html` | À rédiger |
| S49 (2 déc) | Guide technique | « Helpdesk externalisé : SLA, outils et procédures » (helpdesk externalisé) | Guide 1800 mots + template SLA, CTA vers `helpdesk.html` | À rédiger |
| S50 (9 déc) | Article middle | « Relance commerciale : 6 séquences multicanales qui fonctionnent » (relance commerciale) | Article 1500 mots + template séquence, CTA vers `relance-commerciale.html` | À rédiger |
| S51 (16 déc) | Étude de cas | Success story client (service client externalisé) | PDF + résumé blog, CTA vers `contact.html` | À planifier |
| S1 (6 jan) | Article TOFU | « Gestion des réclamations : 7 étapes pour satisfaire vos clients » (gestion réclamations) | Article 1500 mots, CTA vers `gestion-reclamations.html` | À rédiger |
| S2 (13 jan) | Article BOFU | « Permanence téléphonique 24/7 : combien ça coûte ? » (permanence téléphonique 24h/24) | Article 1200 mots + simulateur tableur, CTA vers `permanence.html` | À rédiger |
| S3 (20 jan) | Guide pilier | « Externalisation service client : stratégie & KPI 2025 » (externalisation service client) | Article 2200 mots + modèle KPI, CTA vers `service-client.html` | À rédiger |
| S4 (27 jan) | Article middle | « Télésecrétariat : organisation d’un agenda médical externalisé » (télésecrétariat médical) | Article 1300 mots + fiche pratique, CTA vers `telesecretariat.html` | À rédiger |
| S5 (3 fév) | Article TOFU | « Comment structurer votre centre de contact en France » (centre de contact france) | Article 1600 mots, CTA vers `contact.html` | À rédiger |
| S6 (10 fév) | Ebook / aimant | « Guide complet de la relation client externalisée » | Ebook PDF (5 chapitres) + landing `services/index.html` | À planifier |
| S7 (17 fév) | Article middle | « Back-office externalisé : réduire vos délais de traitement » | Article 1400 mots, CTA vers `back-office.html` | À rédiger |

**Workflow**
- Rédaction interne (VOC-Call) + relecture SEO.
- Publication blog + promotion LinkedIn / newsletter.
- Mise à jour CTA : boutons vers landing correspondante dans 1ère section + conclusion.

## 2. Stratégie backlinks

**Objectifs** :
- 6 liens de qualité / trimestre (DA > 30, thématique BPO, relation client, SaaS).
- Diversifier : annuaires pro, articles invités, partenariats SaaS, études de cas croisées.

### Cibles prioritaires
- Médias & blogs : RelationClientMag.fr, BDM, Frenchweb, Maddyness (tribune).
- SaaS partenaires : Sellsy, Crisp, Zendesk France (guest post / case study commun).
- Associations / annuaires : AFRC, France Num, annuaire BPI.
- Répertoires B2B : Clutch, Sortlist (mettre à jour profils + obtenir avis clients).

### Roadmap
| Mois | Actions | Résultat attendu |
| --- | --- | --- |
| Nov | Publier tribune « Externalisation service client France » (RelationClientMag) | 1 lien vers `service-client.html` |
| Déc | Étude de cas conjointe avec un client SaaS -> article invité sur son blog | 1 lien vers `helpdesk.html` |
| Jan | Lister VOC-Call sur Clutch & Sortlist + récolter 3 avis clients | 2 backlinks + preuve sociale |
| Fév | Partenariat webinar avec éditeur CRM (Sellsy) + transcription blog | 1 lien + leads |

**Suivi** :
- Documenter chaque backlink (source, URL, anchor, landing ciblée) dans `seo/backlink-tracker.xlsx` (à créer).
- Vérification mensuelle via Ahrefs / Search Console (rapport liens).

## 3. Monitoring & reporting

### Tableaux à mettre en place
- **Looker Studio** : dashboard « SEO VOC-Call » consolidant GA4 + Search Console (sessions organiques, conversions, positions top 10).
- **GA4** : conversions personnalisées (formulaire contact, clic CTA devis, clic vers Tally) + segments organiques.
- **Search Console** : filtres par URL service (`/services/...`) pour suivre impressions & CTR.

### Cadence
- Hebdomadaire :
  - Extraire top requêtes Search Console (tableau `seo/ranking-tracker.csv`).
  - Vérifier crawl/erreurs dans Search Console.
- Mensuelle :
  - Revue KPI (sessions, leads, taux conversion) dans Looker.
  - Rapport backlinks (nouveaux liens, ancres, DR).
  - Mise à jour calendrier éditorial (colonne Statut).
- Trimestrielle :
  - Audit technique rapide (Core Web Vitals, temps de chargement, pages orphelines).
  - Analyse concurrence (SEMrush/Ahrefs) sur mots-clés prioritaires.

### Alertes & check-lists
- Configurer alertes GA4 (baisse >30% trafic organique semaine/semaine).
- Suivi Uptime + temps réponse sur pages landing (utiliser PageSpeed monitor).
- Après chaque publication :
  1. Soumettre URL dans Search Console.
  2. Partager sur LinkedIn + newsletter.
  3. Ajouter lien interne depuis au moins 2 pages existantes.

## 4. Maillage à prévoir
- Menu/footers : ajouter les nouvelles landing `standard-externalise.html`, `relance-commerciale.html`, `gestion-reclamations.html` dans le dropdown Services et footer.
- CTA blog : boutons vers landing correspondantes dans les articles existants (« télésecrétariat », « permanence », « prospection » etc.).
- Pages services : croiser les liens (ex. `service-client.html` -> `gestion-reclamations.html`).

## 5. Tâches suivantes
1. Créer `seo/backlink-tracker.xlsx` et `seo/editorial-calendar.xlsx` (ou Google Sheets partagé).
2. Mettre à jour le menu global (header/footer) pour inclure les nouvelles landing.
3. Lancer la rédaction du premier guide (call center France) + préparer template Looker.











