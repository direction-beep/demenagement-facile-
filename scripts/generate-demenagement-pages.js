/**
 * Script de génération automatique des pages Déménagement Zen
 * Basé sur le fichier mots-cles-volume-1000-plus.csv
 * 
 * Usage: node scripts/generate-demenagement-pages.js [phase]
 * Phase: 1, 2, 3, 4 ou "all" (par défaut: all)
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CSV_PATH = path.join(__dirname, '../seo/mots-cles-volume-1000-plus.csv');
const OUTPUT_DIR = path.join(__dirname, '..');
const BASE_URL = 'https://demenagement-zen.fr';
const DOMAIN = 'demenagement-zen.fr';

// Coordonnées GPS des villes principales (pour Schema.org)
const CITY_COORDS = {
    'Paris': { lat: '48.8566', lon: '2.3522', code: '75001', region: 'Île-de-France' },
    'Toulouse': { lat: '43.6047', lon: '1.4442', code: '31000', region: 'Occitanie' },
    'Lyon': { lat: '45.7640', lon: '4.8357', code: '69000', region: 'Auvergne-Rhône-Alpes' },
    'Marseille': { lat: '43.2965', lon: '5.3698', code: '13000', region: 'Provence-Alpes-Côte d\'Azur' },
    'Grenoble': { lat: '45.1885', lon: '5.7245', code: '38000', region: 'Auvergne-Rhône-Alpes' },
    'Bordeaux': { lat: '44.8378', lon: '-0.5792', code: '33000', region: 'Nouvelle-Aquitaine' },
    'Nice': { lat: '43.7102', lon: '7.2620', code: '06000', region: 'Provence-Alpes-Côte d\'Azur' },
    'Strasbourg': { lat: '48.5734', lon: '7.7521', code: '67000', region: 'Grand Est' },
    'Montpellier': { lat: '43.6108', lon: '3.8767', code: '34000', region: 'Occitanie' },
    'Nantes': { lat: '47.2184', lon: '-1.5536', code: '44000', region: 'Pays de la Loire' },
    'Versailles': { lat: '48.8014', lon: '2.1301', code: '78000', region: 'Île-de-France' },
    'Rennes': { lat: '48.1173', lon: '-1.6778', code: '35000', region: 'Bretagne' },
    'Rouen': { lat: '49.4431', lon: '1.0993', code: '76000', region: 'Normandie' },
    'Annecy': { lat: '45.8992', lon: '6.1294', code: '74000', region: 'Auvergne-Rhône-Alpes' },
    'Angers': { lat: '47.4739', lon: '-0.5518', code: '49000', region: 'Pays de la Loire' },
    'Dijon': { lat: '47.3220', lon: '5.0415', code: '21000', region: 'Bourgogne-Franche-Comté' }
};

// Lire et parser le CSV
function readCSV() {
    const content = fs.readFileSync(CSV_PATH, 'utf-8');
    const lines = content.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',');
    
    const keywords = [];
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        if (values.length < 8) continue;
        
        const keyword = {
            priorite: values[0],
            motCle: values[1],
            volume: parseInt(values[2]) || 0,
            difficulte: parseInt(values[3]) || 0,
            ville: values[4],
            categorie: values[5],
            phase: values[6],
            url: values[7],
            action: values[8]
        };
        
        keywords.push(keyword);
    }
    
    return keywords;
}

// Générer le Schema.org JSON-LD
function generateSchema(keyword, ville) {
    const coords = CITY_COORDS[ville] || { lat: '48.8566', lon: '2.3522', code: '75001', region: 'Île-de-France' };
    const isDemenageur = keyword.motCle.includes('déménageur');
    const name = isDemenageur ? `Déménageur Zen ${ville}` : `Déménagement Zen ${ville}`;
    
    return {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": name,
        "image": `${BASE_URL}/images/logo-demenagement-zen.png`,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": ville,
            "postalCode": coords.code,
            "addressRegion": coords.region,
            "addressCountry": "FR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": coords.lat,
            "longitude": coords.lon
        },
        "url": `${BASE_URL}${keyword.url}`,
        "priceRange": "€€",
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "07:00",
            "closes": "20:00"
        },
        "areaServed": {
            "@type": "City",
            "name": ville
        },
        "serviceType": isDemenageur ? "Services de déménageur professionnel" : "Déménagement résidentiel et professionnel",
        "description": `${isDemenageur ? 'Équipe de déménageurs professionnels' : 'Service de déménagement professionnel'} à ${ville}.`
    };
}

// Générer le contenu de la page
function generatePageHTML(keyword, ville) {
    const isDemenageur = keyword.motCle.includes('déménageur');
    const schema = generateSchema(keyword, ville);
    const coords = CITY_COORDS[ville] || CITY_COORDS['Paris'];
    
    // Title et Meta
    const title = isDemenageur 
        ? `Déménageur ${ville} | Équipe Professionnelle - Déménagement Zen`
        : `Déménagement ${ville} | Déménagement Zen - Devis Gratuit`;
    
    const description = isDemenageur
        ? `Déménageur professionnel à ${ville}. Équipe expérimentée, soigneuse et réactive. Déménagement résidentiel et professionnel. Devis gratuit.`
        : `Déménagement professionnel à ${ville}. Déménageur Zen expérimenté. Emballage soigné, transport sécurisé. Devis gratuit 7j/7.`;
    
    // H1
    const h1 = isDemenageur
        ? `Déménageur ${ville} : Équipe Professionnelle Déménagement Zen`
        : `Déménagement ${ville} : Services Professionnels Déménagement Zen`;
    
    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="${description}">
    <meta name="keywords" content="${keyword.motCle}, déménagement ${ville}, déménageur ${ville}, déménagement professionnel ${ville}">
    <meta name="robots" content="index, follow">
    <meta name="author" content="Déménagement Zen">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${BASE_URL}${keyword.url}">
    <meta property="og:image" content="${BASE_URL}/images/demenagement-zen-og.jpg">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <link rel="canonical" href="${BASE_URL}${keyword.url}">
    
    <!-- Schema.org LocalBusiness -->
    <script type="application/ld+json">
    ${JSON.stringify(schema, null, 2)}
    </script>
    
    <link rel="stylesheet" href="css/demenagement-zen.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png">
    <link rel="icon" type="image/x-icon" href="/images/favicon.ico">
</head>
<body>
    <!-- Header -->
    <header class="header">
        <nav class="navbar">
            <div class="nav-container">
                <div class="nav-logo">
                    <a href="index.html" class="logo">
                        <img src="images/logo-demenagement-zen.svg" alt="Déménagement Zen Logo" width="150" height="40" onerror="this.onerror=null; this.src='images/logo-demenagement-zen.png'">
                        <span>Déménagement Zen</span>
                    </a>
                </div>
                <div class="nav-menu" id="nav-menu">
                    <ul class="nav-list">
                        <li class="nav-item"><a href="index.html" class="nav-link">Accueil</a></li>
                        <li class="nav-item"><a href="#services" class="nav-link">Services</a></li>
                        <li class="nav-item"><a href="#zones" class="nav-link">Zones</a></li>
                        <li class="nav-item"><a href="#tarifs" class="nav-link">Tarifs</a></li>
                        <li class="nav-item"><a href="#contact" class="nav-link">Contact</a></li>
                    </ul>
                </div>
                <button class="nav-toggle" id="nav-toggle" aria-label="Menu">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </button>
            </div>
        </nav>
    </header>

    <!-- Hero Section -->
    <section class="hero" role="banner">
        <div class="hero-container">
            <div class="hero-content">
                <h1 class="hero-title">${h1}</h1>
                <p class="hero-description">
                    ${isDemenageur 
                        ? `Déménageur professionnel à ${ville} avec Déménagement Zen. Notre équipe de déménageurs expérimentés intervient dans ${ville} et sa région pour vos déménagements résidentiels et professionnels. Compétences, soin et réactivité garantis.`
                        : `Déménagement professionnel à ${ville} avec Déménagement Zen. Nous intervenons dans ${ville} et sa région pour vos déménagements résidentiels et professionnels. Équipe expérimentée, emballage soigné, transport sécurisé.`
                    }
                </p>
                <div class="hero-buttons">
                    <a href="#devis" class="btn btn-primary">Demander un devis gratuit</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Introduction Section -->
    <section class="intro-section">
        <div class="container">
            <div class="intro-content">
                <h2>${isDemenageur ? `Une équipe de déménageurs professionnels à ${ville}` : `Pourquoi choisir Déménagement Zen pour votre déménagement à ${ville} ?`}</h2>
                <p>
                    <strong>Déménagement Zen</strong> ${isDemenageur 
                        ? `rassemble une équipe de déménageurs professionnels spécialisés dans les déménagements à ${ville}. Chaque déménageur de notre équipe possède une solide expérience et une formation continue pour garantir la meilleure qualité de service.`
                        : `est votre partenaire de confiance pour tous vos déménagements à ${ville}. Avec plus de 10 ans d'expérience dans le déménagement professionnel, nous maîtrisons parfaitement les spécificités de la région ${coords.region}.`
                    }
                </p>
                <p>
                    ${isDemenageur
                        ? `Nos déménageurs ${ville.toLowerCase()}s connaissent parfaitement les spécificités de la région : gestion des contraintes locales, optimisation des itinéraires, maîtrise des techniques de manutention. Ils sont votre garantie d'un déménagement réussi à ${ville}.`
                        : `Notre équipe de déménageurs professionnels à ${ville} intervient dans toute la ville et ses environs. Nous proposons des services complets de déménagement résidentiel et professionnel, avec un emballage soigné, un transport sécurisé et une installation complète dans votre nouveau logement ou bureau.`
                    }
                </p>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="services-section">
        <div class="container">
            <h2>${isDemenageur ? `Services de notre équipe de déménageurs ${ville.toLowerCase()}s` : `Nos services de déménagement à ${ville}`}</h2>
            <p class="section-intro">
                ${isDemenageur
                    ? `Que vous déménagiez un petit studio ou un grand appartement à ${ville}, nos déménageurs professionnels adaptent leurs services à vos besoins.`
                    : `Déménagement Zen vous propose une gamme complète de services pour votre déménagement à ${ville}.`
                }
            </p>
            
            <div class="services-grid">
                <div class="service-card">
                    <div class="service-icon"><i class="fas fa-box"></i></div>
                    <h3>Emballage et protection</h3>
                    <p>
                        Emballage professionnel de tous vos biens avec des matériaux de qualité. Protection renforcée pour vos meubles, électroménager, objets fragiles et œuvres d'art.
                    </p>
                </div>
                
                <div class="service-card">
                    <div class="service-icon"><i class="fas fa-truck"></i></div>
                    <h3>Transport sécurisé</h3>
                    <p>
                        Transport de vos biens avec des camions adaptés. Nos véhicules sont équipés pour assurer la sécurité de vos biens pendant le transport vers ${ville}.
                    </p>
                </div>
                
                <div class="service-card">
                    <div class="service-icon"><i class="fas fa-tools"></i></div>
                    <h3>Montage et démontage</h3>
                    <p>
                        Démontage de vos meubles avant le déménagement et remontage dans votre nouveau logement à ${ville}. Installation de vos appareils électroménagers.
                    </p>
                </div>
                
                <div class="service-card">
                    <div class="service-icon"><i class="fas fa-building"></i></div>
                    <h3>${isDemenageur ? 'Déménagement professionnel' : `Déménagement professionnel`}</h3>
                    <p>
                        Déménagement de bureaux et locaux professionnels à ${ville}. Nous gérons le déménagement de votre entreprise avec une planification minutieuse.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Tarifs Section -->
    <section id="tarifs" class="tarifs-section">
        <div class="container">
            <h2>Tarifs ${isDemenageur ? 'déménageur' : 'déménagement'} ${ville}</h2>
            <p class="section-intro">
                Nos tarifs ${isDemenageur ? 'de déménageur' : 'de déménagement'} à ${ville} sont transparents et adaptés à chaque situation. Le prix dépend de plusieurs facteurs que nous analysons ensemble lors de votre demande de devis gratuit.
            </p>
            
            <div class="tarifs-factors">
                <h3>Facteurs influençant le prix</h3>
                <ul>
                    <li><strong>Volume à déménager :</strong> nombre de pièces, surface du logement ou du bureau</li>
                    <li><strong>Distance :</strong> distance entre l'adresse de départ et d'arrivée</li>
                    <li><strong>Étage :</strong> présence d'ascenseur ou nécessité de monter les escaliers</li>
                    <li><strong>Services complémentaires :</strong> emballage, démontage/remontage, garde-meubles</li>
                </ul>
            </div>
            
            <p class="tarifs-note">
                <strong>Important :</strong> Ces tarifs sont donnés à titre indicatif. Chaque déménagement à ${ville} est unique et nécessite un devis personnalisé gratuit. Contactez-nous pour obtenir un devis précis adapté à votre situation.
            </p>
        </div>
    </section>

    <!-- Devis Section -->
    <section id="devis" class="devis-section">
        <div class="container">
            <h2>Demandez votre devis gratuit ${isDemenageur ? 'avec nos déménageurs' : ''} ${ville}</h2>
            <p class="section-intro">
                Obtenez un devis gratuit et personnalisé pour votre déménagement à ${ville}. Remplissez le formulaire ci-dessous et notre équipe vous recontactera sous 24h.
            </p>
            
            <form class="devis-form" method="POST" action="/contact-handler.php">
                <div class="form-group">
                    <label for="nom">Nom complet *</label>
                    <input type="text" id="nom" name="nom" required>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="email">Email *</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="telephone">Téléphone *</label>
                        <input type="tel" id="telephone" name="telephone" required>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="adresse-depart">Adresse de départ *</label>
                        <input type="text" id="adresse-depart" name="adresse-depart" placeholder="Ville, Code postal" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="adresse-arrivee">Adresse d'arrivée *</label>
                        <input type="text" id="adresse-arrivee" name="adresse-arrivee" placeholder="${ville}, Code postal" required>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="type-bien">Type de bien *</label>
                        <select id="type-bien" name="type-bien" required>
                            <option value="">Sélectionnez...</option>
                            <option value="studio">Studio</option>
                            <option value="2-pieces">2 pièces</option>
                            <option value="3-pieces">3 pièces</option>
                            <option value="4-pieces">4 pièces</option>
                            <option value="5-pieces">5 pièces ou plus</option>
                            <option value="maison">Maison</option>
                            <option value="bureau">Bureau / Locaux professionnels</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="date-demenagement">Date souhaitée *</label>
                        <input type="date" id="date-demenagement" name="date-demenagement" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="message">Message (facultatif)</label>
                    <textarea id="message" name="message" rows="4" placeholder="Informations complémentaires sur votre déménagement à ${ville}..."></textarea>
                </div>
                
                <button type="submit" class="btn btn-primary btn-large">Demander mon devis gratuit</button>
                <p class="form-note">* Champs obligatoires</p>
            </form>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact-section">
        <div class="container">
            <h2>Contactez-nous</h2>
            <div class="contact-grid">
                <div class="contact-info">
                    <h3>Déménagement Zen ${ville}</h3>
                    <p><i class="fas fa-envelope"></i> <a href="mailto:contact@${DOMAIN}">contact@${DOMAIN}</a></p>
                    <p><i class="fas fa-map-marker-alt"></i> ${ville}, ${coords.region}</p>
                    <p><i class="fas fa-clock"></i> Disponible 7j/7 de 7h à 20h</p>
                </div>
                <div class="contact-cta">
                    <p>Besoin d'un conseil ou d'un devis express ?</p>
                    <a href="mailto:contact@${DOMAIN}" class="btn btn-primary">Contactez-nous par email</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <h4>Déménagement Zen</h4>
                    <p>Votre spécialiste du déménagement professionnel à ${ville} et en ${coords.region}.</p>
                </div>
                <div class="footer-col">
                    <h4>Liens utiles</h4>
                    <ul>
                        <li><a href="index.html">Accueil</a></li>
                        <li><a href="${isDemenageur ? keyword.url.replace('demenageur', 'demenagement') : keyword.url.replace('demenagement', 'demenageur')}">${isDemenageur ? 'Déménagement' : 'Déménageur'} ${ville}</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#tarifs">Tarifs</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Autres villes</h4>
                    <ul>
                        <li><a href="/demenagement-paris.html">Déménagement Paris</a></li>
                        <li><a href="/demenagement-lyon.html">Déménagement Lyon</a></li>
                        <li><a href="/demenagement-marseille.html">Déménagement Marseille</a></li>
                        <li><a href="/demenagement-toulouse.html">Déménagement Toulouse</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Contact</h4>
                    <p>contact@${DOMAIN}</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 Déménagement Zen. Tous droits réservés.</p>
            </div>
        </div>
    </footer>

    <script src="js/main.js"></script>
</body>
</html>`;
}

// Fonction principale
function generatePages(phase = 'all') {
    console.log(`🚀 Génération des pages Déménagement Zen...`);
    console.log(`📋 Phase: ${phase === 'all' ? 'Toutes les phases' : `Phase ${phase}`}`);
    
    const keywords = readCSV();
    let generated = 0;
    let skipped = 0;
    
    keywords.forEach(keyword => {
        // Filtrer par phase
        if (phase !== 'all' && !keyword.phase.includes(phase)) {
            skipped++;
            return;
        }
        
        // Vérifier que la ville existe
        if (!keyword.ville || !CITY_COORDS[keyword.ville]) {
            console.warn(`⚠️  Ville non trouvée: ${keyword.ville} pour ${keyword.motCle}`);
            skipped++;
            return;
        }
        
        // Générer le nom du fichier
        const filename = keyword.url.replace('/', '').replace('/', '-') + '.html';
        const filepath = path.join(OUTPUT_DIR, filename);
        
        // Générer le HTML
        const html = generatePageHTML(keyword, keyword.ville);
        
        // Écrire le fichier
        try {
            fs.writeFileSync(filepath, html, 'utf-8');
            console.log(`✅ Généré: ${filename} (${keyword.ville} - ${keyword.volume} recherches/mois)`);
            generated++;
        } catch (error) {
            console.error(`❌ Erreur lors de la génération de ${filename}:`, error.message);
        }
    });
    
    console.log(`\n📊 Résumé:`);
    console.log(`   ✅ Pages générées: ${generated}`);
    console.log(`   ⏭️  Pages ignorées: ${skipped}`);
    console.log(`   📁 Dossier: ${OUTPUT_DIR}`);
}

// Exécution
const phase = process.argv[2] || 'all';
generatePages(phase);

