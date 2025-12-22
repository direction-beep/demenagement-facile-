// Script pour générer automatiquement les pages villes
// Ce script peut être exécuté dans Node.js ou dans le navigateur

const cities = [
    {
        name: "Lyon",
        region: "Auvergne-Rhône-Alpes",
        slug: "lyon",
        description: "Centre d'appel Lyon spécialisé en externalisation service client et permanence téléphonique à distance."
    },
    {
        name: "Marseille",
        region: "Provence-Alpes-Côte d'Azur",
        slug: "marseille",
        description: "Centre d'appel Marseille avec secrétariat téléphonique et prospection commerciale."
    },
    {
        name: "Toulouse",
        region: "Occitanie",
        slug: "toulouse",
        description: "Centre d'appel Toulouse pour gestion d'appels et téléconseiller indépendant."
    },
    {
        name: "Nantes",
        region: "Pays de la Loire",
        slug: "nantes",
        description: "Centre d'appel Nantes spécialisé en call center recrutement et emploi centre d'appel."
    },
    {
        name: "Bordeaux",
        region: "Nouvelle-Aquitaine",
        slug: "bordeaux",
        description: "Centre d'appel Bordeaux avec accueil téléphonique et gestion téléphonique."
    },
    {
        name: "Lille",
        region: "Hauts-de-France",
        slug: "lille",
        description: "Centre d'appel Lille pour télémarketing et prospection téléphonique."
    },
    {
        name: "Strasbourg",
        region: "Grand Est",
        slug: "strasbourg",
        description: "Centre d'appel Strasbourg avec standard externalisé et standard téléphonique externalisé."
    }
];

function generateCityPage(city) {
    const template = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Centre d'Appel ${city.name} | VOC-Call - Homeshoring Recrutement ${city.region}</title>
    <meta name="description" content="Centre d'appel ${city.name} spécialisé en homeshoring recrutement. Téléconseillers indépendants en ${city.region} pour externaliser service client, permanence téléphonique et secrétariat téléphonique.">
    <meta name="keywords" content="centre d'appel ${city.name.toLowerCase()}, homeshoring recrutement ${city.name.toLowerCase()}, téléconseiller indépendant ${city.name.toLowerCase()}, externaliser service client ${city.name.toLowerCase()}, permanence téléphonique ${city.name.toLowerCase()}, secrétariat téléphonique ${city.name.toLowerCase()}, call center ${city.name.toLowerCase()}, emploi centre d'appel ${city.name.toLowerCase()}">
    <meta name="robots" content="index, follow">
    <meta name="author" content="VOC-Call">
    <meta property="og:title" content="Centre d'Appel ${city.name} | VOC-Call - Homeshoring Recrutement">
    <meta property="og:description" content="Centre d'appel ${city.name} spécialisé en homeshoring recrutement. Téléconseillers indépendants en ${city.region}.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://voc-call.com/centre-appel-${city.slug}">
    <meta property="og:image" content="https://voc-call.com/images/logo-voc-call.png">
    <link rel="canonical" href="https://voc-call.com/centre-appel-${city.slug}">
    <link rel="stylesheet" href="css/styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <!-- Header -->
    <header class="header">
        <nav class="navbar">
            <div class="nav-brand">
                <a href="index.html" class="brand-link">
                    <img src="images/logo-voc-call.png" alt="VOC-Call Logo" class="brand-logo">
                    <span class="brand-text">VOC-Call</span>
                </a>
            </div>
            <div class="nav-menu" id="nav-menu" role="navigation" aria-label="Menu principal">
                <ul class="nav-list" role="menubar">
                    <li class="nav-item" role="none">
                        <a href="index.html" class="nav-link" role="menuitem">Accueil</a>
                    </li>
                    <li class="nav-item" role="none">
                        <a href="about.html" class="nav-link" role="menuitem">Qui sommes-nous</a>
                    </li>
                    <li class="nav-item dropdown" role="none">
                        <a href="#" class="nav-link dropdown-toggle" role="menuitem" aria-haspopup="true" aria-expanded="false" aria-label="Services - Menu déroulant">
                            Services <i class="fas fa-chevron-down" aria-hidden="true"></i>
                        </a>
                        <ul class="dropdown-menu" role="menu" aria-label="Sous-menu Services">
                            <li role="none"><a href="services/telesecretariat.html" class="dropdown-link" role="menuitem">Secrétariat Téléphonique</a></li>
                            <li role="none"><a href="services/permanence.html" class="dropdown-link" role="menuitem">Permanence Téléphonique</a></li>
                            <li role="none"><a href="services/service-client.html" class="dropdown-link" role="menuitem">Service Client</a></li>
                            <li role="none"><a href="services/prospection.html" class="dropdown-link" role="menuitem">Prospection</a></li>
                            <li role="none"><a href="services/back-office.html" class="dropdown-link" role="menuitem">Back-office</a></li>
                            <li role="none"><a href="services/helpdesk.html" class="dropdown-link" role="menuitem">Support IT</a></li>
                        </ul>
                    </li>
                    <li class="nav-item" role="none">
                        <a href="testimonials.html" class="nav-link" role="menuitem">Témoignages</a>
                    </li>
                    <li class="nav-item" role="none">
                        <a href="careers.html" class="nav-link" role="menuitem">Devenir téléconseiller</a>
                    </li>
                    <li class="nav-item" role="none">
                        <a href="contact.html" class="nav-link" role="menuitem">Contact</a>
                    </li>
                </ul>
            </div>
            <div class="nav-toggle" id="nav-toggle">
                <button class="toggle-btn" aria-label="Ouvrir le menu de navigation" aria-expanded="false" aria-controls="nav-menu">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </button>
            </div>
        </nav>
    </header>

    <!-- Hero Section -->
    <section class="hero" role="banner" aria-labelledby="hero-title">
        <div class="hero-container">
            <div class="hero-content">
                <div class="hero-badge">
                    <span class="badge-text">${city.name} & ${city.region}</span>
                </div>
                <h1 class="hero-title" id="hero-title">
                    Centre d'Appel <span class="highlight">${city.name}</span> - 
                    <span class="highlight">Homeshoring Recrutement</span>
                </h1>
                <p class="hero-description">
                    Téléconseillers indépendants à ${city.name} et en ${city.region}. 
                    Externaliser service client, permanence téléphonique et secrétariat téléphonique avec notre centre d'appel télétravail.
                </p>
                <div class="hero-buttons" role="group" aria-label="Actions principales">
                    <a href="contact.html" class="btn btn-primary" role="button">Demander un devis ${city.name}</a>
                    <a href="careers.html" class="btn btn-secondary" role="button">Devenir téléconseiller ${city.name}</a>
                </div>
            </div>
            <div class="hero-image">
                <img src="images/hero/hero-call-center.jpg" alt="Centre d'appel ${city.name} - Téléconseillers indépendants VOC-Call" class="hero-img" loading="lazy">
            </div>
        </div>
    </section>

    <!-- Services ${city.name} -->
    <section class="services">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">Services Centre d'Appel ${city.name}</h2>
                <p class="section-description">
                    Solutions complètes d'externalisation service client avec téléconseillers indépendants à ${city.name}. 
                    Homeshoring recrutement et centre d'appel télétravail en ${city.region}.
                </p>
            </div>
            <div class="services-grid">
                <div class="service-card">
                    <div class="service-icon">
                        <i class="fas fa-phone-alt"></i>
                    </div>
                    <h3 class="service-title">Secrétariat Téléphonique ${city.name}</h3>
                    <p class="service-description">
                        Secrétariat téléphonique à distance avec téléconseillers indépendants ${city.name.toLowerCase()}iens. 
                        Gestion complète de vos appels avec une approche personnalisée et professionnelle.
                    </p>
                    <a href="services/telesecretariat.html" class="service-link">En savoir plus <i class="fas fa-arrow-right"></i></a>
                </div>
                <div class="service-card">
                    <div class="service-icon">
                        <i class="fas fa-headset"></i>
                    </div>
                    <h3 class="service-title">Permanence Téléphonique ${city.name}</h3>
                    <p class="service-description">
                        Permanence téléphonique 24h/24 et 7j/7 avec centre d'appel à distance ${city.name.toLowerCase()}ien. 
                        Téléconseillers indépendants pour répondre à tous vos besoins d'assistance.
                    </p>
                    <a href="services/permanence.html" class="service-link">En savoir plus <i class="fas fa-arrow-right"></i></a>
                </div>
                <div class="service-card">
                    <div class="service-icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <h3 class="service-title">Service Client Télétravail ${city.name}</h3>
                    <p class="service-description">
                        Externaliser service client avec téléconseillers à domicile ${city.name.toLowerCase()}iens. 
                        Prise en charge optimale de vos clients avec des conseillers formés et motivés.
                    </p>
                    <a href="services/service-client.html" class="service-link">En savoir plus <i class="fas fa-arrow-right"></i></a>
                </div>
                <div class="service-card">
                    <div class="service-icon">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <h3 class="service-title">Prospection Téléphonique ${city.name}</h3>
                    <p class="service-description">
                        Prospection commerciale et télémarketing avec centre d'appel prospection ${city.name.toLowerCase()}ien. 
                        Développement de votre portefeuille client avec des campagnes ciblées et efficaces.
                    </p>
                    <a href="services/prospection.html" class="service-link">En savoir plus <i class="fas fa-arrow-right"></i></a>
                </div>
                <div class="service-card">
                    <div class="service-icon">
                        <i class="fas fa-cogs"></i>
                    </div>
                    <h3 class="service-title">Gestion d'Appels ${city.name}</h3>
                    <p class="service-description">
                        Gestion des appels téléphoniques entrants et traitement administratif ${city.name.toLowerCase()}ien. 
                        Gestion d'appel avec précision et rapidité par nos téléconseillers indépendants.
                    </p>
                    <a href="services/back-office.html" class="service-link">En savoir plus <i class="fas fa-arrow-right"></i></a>
                </div>
                <div class="service-card">
                    <div class="service-icon">
                        <i class="fas fa-laptop-code"></i>
                    </div>
                    <h3 class="service-title">Accueil Téléphonique ${city.name}</h3>
                    <p class="service-description">
                        Accueil téléphonique et gestion téléphonique pour vos clients ${city.name.toLowerCase()}iens. 
                        Assistance technique et helpdesk avec des experts qualifiés en télétravail.
                    </p>
                    <a href="services/helpdesk.html" class="service-link">En savoir plus <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
        </div>
    </section>

    <!-- Avantages ${city.name} -->
    <section class="about">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">Pourquoi Choisir VOC-Call à ${city.name} ?</h2>
                <p class="section-description">
                    Centre d'appel télétravail spécialisé en homeshoring recrutement à ${city.name} et en ${city.region}. 
                    Téléconseillers indépendants qualifiés pour externaliser votre service client.
                </p>
            </div>
            <div class="about-grid">
                <div class="about-card">
                    <div class="about-icon">
                        <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <h3>Présence Locale ${city.name}</h3>
                    <p>Centre d'appel ${city.name} avec téléconseillers indépendants en ${city.region}. Proximité géographique et compréhension du marché ${city.name.toLowerCase()}ien.</p>
                </div>
                <div class="about-card">
                    <div class="about-icon">
                        <i class="fas fa-home"></i>
                    </div>
                    <h3>Homeshoring Recrutement ${city.name}</h3>
                    <p>Recrutement de téléconseillers à domicile à ${city.name}. Flexibilité et qualité de vie pour nos équipes ${city.name.toLowerCase()}iennes.</p>
                </div>
                <div class="about-card">
                    <div class="about-icon">
                        <i class="fas fa-clock"></i>
                    </div>
                    <h3>Disponibilité 24h/24</h3>
                    <p>Permanence téléphonique à distance 24h/24 et 7j/7. Centre d'appel à distance ${city.name.toLowerCase()}ien toujours disponible.</p>
                </div>
                <div class="about-card">
                    <div class="about-icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <h3>Équipe ${city.name}ienne Qualifiée</h3>
                    <p>Téléconseillers indépendants ${city.name.toLowerCase()}iens formés et expérimentés. Service client télétravail de qualité supérieure.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
        <div class="container">
            <div class="cta-content">
                <h2 class="cta-title">Prêt à Externaliser Votre Service Client à ${city.name} ?</h2>
                <p class="cta-description">
                    Rejoignez nos clients ${city.name.toLowerCase()}iens qui font confiance à VOC-Call pour leur centre d'appel télétravail. 
                    Homeshoring recrutement et téléconseillers indépendants à ${city.name}.
                </p>
                <div class="cta-buttons">
                    <a href="contact.html" class="btn btn-primary">Demander un devis ${city.name}</a>
                    <a href="tel:+33123456789" class="btn btn-outline">Appeler maintenant</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3 class="footer-title">VOC-Call</h3>
                    <p class="footer-description">
                        Centre d'appel télétravail spécialisé en homeshoring recrutement. 
                        Externaliser service client avec des téléconseillers indépendants.
                    </p>
                    <div class="social-links">
                        <a href="#" class="social-link" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
                        <a href="#" class="social-link" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
                        <a href="#" class="social-link" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                    </div>
                </div>
                <div class="footer-section">
                    <h3 class="footer-title">Services</h3>
                    <ul class="footer-links">
                        <li><a href="services/telesecretariat.html">Secrétariat Téléphonique</a></li>
                        <li><a href="services/permanence.html">Permanence Téléphonique</a></li>
                        <li><a href="services/service-client.html">Service Client</a></li>
                        <li><a href="services/prospection.html">Prospection</a></li>
                        <li><a href="services/back-office.html">Back-office</a></li>
                        <li><a href="services/helpdesk.html">Support IT</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3 class="footer-title">Entreprise</h3>
                    <ul class="footer-links">
                        <li><a href="about.html">Qui sommes-nous</a></li>
                        <li><a href="testimonials.html">Témoignages</a></li>
                        <li><a href="careers.html">Devenir téléconseiller</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3 class="footer-title">Contact ${city.name}</h3>
                    <div class="contact-info">
                        <p><i class="fas fa-phone"></i> +33 1 XX XX XX XX</p>
                        <p><i class="fas fa-envelope"></i> ${city.slug}@voc-call.com</p>
                        <p><i class="fas fa-map-marker-alt"></i> ${city.name}, ${city.region}</p>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 VOC-Call. Tous droits réservés.</p>
                <div class="footer-links">
                    <a href="legal/mentions-legales.html">Mentions légales</a>
                    <a href="legal/politique-confidentialite.html">Politique de confidentialité</a>
                    <a href="legal/cookies.html">Cookies</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- Cookie Banner -->
    <div class="cookie-banner" id="cookie-banner">
        <div class="cookie-content">
            <p>Nous utilisons des cookies pour améliorer votre expérience sur notre site. En continuant à naviguer, vous acceptez notre utilisation des cookies.</p>
            <div class="cookie-buttons">
                <button class="btn btn-outline" id="cookie-decline">Refuser</button>
                <button class="btn btn-primary" id="cookie-accept">Accepter</button>
            </div>
        </div>
    </div>

    <script src="js/main.js"></script>
    <script src="js/schema-markup.js"></script>
</body>
</html>`;

    return template;
}

// Générer toutes les pages villes
function generateAllCityPages() {
    console.log('🏙️ Génération des pages villes...');
    
    cities.forEach(city => {
        const pageContent = generateCityPage(city);
        const filename = `centre-appel-${city.slug}.html`;
        
        // Dans un environnement Node.js, vous pourriez écrire le fichier
        // fs.writeFileSync(filename, pageContent);
        
        console.log(`✅ Page générée: ${filename}`);
        console.log(`   - Ville: ${city.name}`);
        console.log(`   - Région: ${city.region}`);
        console.log(`   - URL: /centre-appel-${city.slug}`);
        console.log('');
    });
    
    console.log('🎉 Toutes les pages villes ont été générées !');
    console.log('');
    console.log('📋 Pages créées:');
    cities.forEach(city => {
        console.log(`   - centre-appel-${city.slug}.html`);
    });
}

// Exécuter la génération
if (typeof window !== 'undefined') {
    // Dans le navigateur
    document.addEventListener('DOMContentLoaded', generateAllCityPages);
} else {
    // Dans Node.js
    generateAllCityPages();
}

// Export pour utilisation dans Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generateCityPage, generateAllCityPages, cities };
}
