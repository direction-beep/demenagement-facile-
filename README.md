## Publication automatique du blog

Les brouillons programmés sont placés dans `blog/_drafts/<slug>/` avec :

```
blog/_drafts/my-article/
  meta.json   # métadonnées (slug, titre, date, image, extrait, etc.)
  index.html  # contenu HTML final
```

Exemple `meta.json` :

```json
{
  "slug": "backoffice-digital-delais-reponse",
  "title": "Back‑office digital : réduire les délais de réponse",
  "date": "2025-11-08",
  "category": "Technique",
  "image": "images/hero/hero-back-office.jpg",
  "excerpt": "Emails, chat, réseaux sociaux : méthodes et outils pour répondre vite.",
  "readTime": "6 min"
}
```

Un workflow GitHub Actions (`.github/workflows/publish.yml`) s’exécute le mardi et vendredi à 07:00 UTC et publie tout brouillon dont `date` ≤ aujourd’hui :

- copie `index.html` vers `blog/<slug>.html`
- insère la carte de l’article en tête de la grille dans `blog.html`
- commit/push automatiques

Déclenchement manuel possible via l'onglet Actions → "Publish scheduled blog posts" → Run workflow.

### Publication automatique sur LinkedIn

Quand un article est publié, il est automatiquement partagé sur LinkedIn via l'API LinkedIn. Voir [README_LINKEDIN.md](README_LINKEDIN.md) pour la configuration des credentials LinkedIn (secrets GitHub).

**Note importante :** Si un article a été publié avant la configuration LinkedIn, il n'aura pas été partagé sur LinkedIn. Utilisez le workflow "Publish existing articles to LinkedIn" dans l'onglet Actions pour publier rétroactivement les articles existants.

# VOC-Call - Site Web

Site web officiel de VOC-Call, spécialisé dans les services de relation client et prospection commerciale.

## 🚀 Déploiement

Ce site est déployé automatiquement sur Vercel à partir de ce repository GitHub.

## 📁 Structure du projet

```
VOC-Call/
├── index.html              # Page d'accueil
├── about.html              # À propos
├── contact.html            # Contact
├── careers.html            # Carrières
├── testimonials.html       # Témoignages
├── services/               # Pages de services
│   ├── service-client.html
│   ├── prospection.html
│   ├── telesecretariat.html
│   ├── permanence.html
│   ├── helpdesk.html
│   └── back-office.html
├── legal/                  # Pages légales
│   ├── mentions-legales.html
│   ├── politique-confidentialite.html
│   └── cookies.html
├── css/
│   └── styles.css          # Styles principaux
├── js/
│   ├── main.js            # Scripts principaux
│   └── header-cleanup.js  # Nettoyage header
├── images/                # Images et logos
└── blog/                  # Articles de blog
```

## 🛠️ Technologies utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Styles et responsive design
- **JavaScript** - Interactivité
- **Font Awesome** - Icônes
- **Vercel** - Hébergement et déploiement

## 📱 Fonctionnalités

- ✅ Design responsive (mobile, tablette, desktop)
- ✅ Navigation intuitive
- ✅ Système de cookies RGPD
- ✅ Optimisation SEO
- ✅ Chargement rapide
- ✅ Accessibilité

## 🔧 Développement local

Pour tester le site en local :

```bash
# Démarrer un serveur local
python -m http.server 3002

# Ou avec Node.js
npx serve .
```

Puis ouvrir http://localhost:3002

## 📞 Contact

- **Site web** : https://voc-call.fr
- **Email** : contact@voc-call.fr
- **Adresse** : 2 place Jean V, 44000 Nantes, France

---

© 2024 VOC-Call. Tous droits réservés.
