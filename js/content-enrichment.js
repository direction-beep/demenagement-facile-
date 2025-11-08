// ============================================
// ENRICHISSEMENT DU CONTENU POUR LE SEO
// ============================================

class ContentEnrichment {
    constructor() {
        this.init();
    }

    init() {
        // Enrichir les sections de contenu
        this.enrichServiceSections();
        this.enrichCityPages();
        this.addRelatedKeywords();
        this.optimizeImages();
    }

    // ============================================
    // ENRICHISSEMENT DES SECTIONS DE SERVICES
    // ============================================

    enrichServiceSections() {
        const serviceSections = document.querySelectorAll('.service-card, .service-item');
        
        serviceSections.forEach(section => {
            // Ajouter des détails supplémentaires si manquants
            const title = section.querySelector('h3, h2');
            const description = section.querySelector('p');
            
            if (title && description) {
                // Ajouter des mots-clés pertinents
                const keywords = this.getServiceKeywords(title.textContent);
                if (keywords.length > 0 && !description.textContent.includes(keywords[0])) {
                    const enhancedText = this.enhanceDescription(description.textContent, keywords);
                    if (enhancedText !== description.textContent) {
                        description.textContent = enhancedText;
                    }
                }
            }
        });
    }

    // ============================================
    // ENRICHISSEMENT DES PAGES DE VILLES
    // ============================================

    enrichCityPages() {
        // Vérifier si on est sur une page de ville
        const cityMatch = window.location.pathname.match(/(?:demenageur|devis)-([^/]+)\.html/);
        if (!cityMatch) return;

        const citySlug = cityMatch[1];
        const cityName = this.slugToCityName(citySlug);

        // Enrichir la section hero
        this.enrichHeroSection(cityName);

        // Enrichir les avantages locaux
        this.enrichLocalAdvantages(cityName);

        // Ajouter une section de contenu enrichi si elle n'existe pas
        this.addEnrichedContentSection(cityName);
    }

    enrichHeroSection(cityName) {
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle && heroSubtitle.textContent.length < 100) {
            const enrichedText = `Service de déménagement professionnel à ${cityName}. Déménageurs agréés, emballage soigné, transport sécurisé. Devis gratuit et réponse sous 24h.`;
            if (!heroSubtitle.textContent.includes('agréés')) {
                heroSubtitle.textContent = enrichedText;
            }
        }
    }

    enrichLocalAdvantages(cityName) {
        const advantagesSection = document.querySelector('.advantages, .advantages-grid');
        if (!advantagesSection) return;

        // Ajouter des avantages spécifiques à la ville si manquants
        const advantages = advantagesSection.querySelectorAll('.advantage, .advantage-item');
        if (advantages.length < 4) {
            const localAdvantages = this.getLocalAdvantages(cityName);
            localAdvantages.forEach(advantage => {
                if (!this.advantageExists(advantagesSection, advantage.title)) {
                    this.addAdvantage(advantagesSection, advantage);
                }
            });
        }
    }

    addEnrichedContentSection(cityName) {
        // Vérifier si une section de contenu enrichi existe déjà
        if (document.querySelector('.enriched-content-section')) return;

        const mainContent = document.querySelector('main, .container');
        if (!mainContent) return;

        // Créer une section de contenu enrichi
        const enrichedSection = document.createElement('section');
        enrichedSection.className = 'enriched-content-section';
        enrichedSection.innerHTML = `
            <div class="container">
                <div class="enriched-content">
                    <h2>Pourquoi choisir Déménagement Zen à ${cityName} ?</h2>
                    <div class="enriched-text">
                        <p>
                            <strong>Déménagement Zen</strong> est votre partenaire de confiance pour tous vos déménagements à ${cityName} et dans ses environs. 
                            Nous proposons un service complet de déménagement résidentiel et professionnel, adapté à tous vos besoins.
                        </p>
                        <h3>Nos services de déménagement à ${cityName}</h3>
                        <ul>
                            <li><strong>Déménagement résidentiel</strong> : Déménagement complet de votre logement avec emballage professionnel de vos biens</li>
                            <li><strong>Déménagement professionnel</strong> : Déménagement de bureaux et locaux commerciaux avec gestion des équipements informatiques</li>
                            <li><strong>Emballage et protection</strong> : Emballage soigné avec matériaux de qualité pour protéger vos objets fragiles</li>
                            <li><strong>Transport sécurisé</strong> : Véhicules adaptés et équipés pour un transport en toute sécurité</li>
                            <li><strong>Montage et démontage</strong> : Service de montage/démontage de meubles et équipements</li>
                        </ul>
                        <h3>Nos engagements</h3>
                        <p>
                            Chez Déménagement Zen, nous nous engageons à vous offrir un service de qualité avec des déménageurs expérimentés et agréés. 
                            Nous respectons vos délais, protégeons vos biens et vous accompagnons tout au long de votre déménagement à ${cityName}.
                        </p>
                        <p>
                            <strong>Demandez votre devis gratuit</strong> dès maintenant et bénéficiez d'une réponse sous 24h. 
                            Notre équipe est à votre écoute pour répondre à toutes vos questions et vous proposer la solution de déménagement adaptée à vos besoins.
                        </p>
                    </div>
                </div>
            </div>
        `;

        // Insérer avant le footer
        const footer = document.querySelector('footer');
        if (footer) {
            footer.insertAdjacentElement('beforebegin', enrichedSection);
        } else {
            mainContent.appendChild(enrichedSection);
        }
    }

    // ============================================
    // AJOUT DE MOTS-CLÉS PERTINENTS
    // ============================================

    addRelatedKeywords() {
        const keywords = [
            'déménagement professionnel',
            'déménageurs agréés',
            'service de déménagement',
            'déménagement clé en main',
            'emballage professionnel',
            'transport sécurisé',
            'devis gratuit',
            'déménagement résidentiel',
            'déménagement professionnel',
            'déménageur expérimenté'
        ];

        // Ajouter des mots-clés dans les meta descriptions si nécessaire
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            const currentDescription = metaDescription.getAttribute('content');
            if (currentDescription && currentDescription.length < 120) {
                // Enrichir la description avec des mots-clés pertinents
                const enrichedDescription = this.enhanceMetaDescription(currentDescription, keywords);
                if (enrichedDescription !== currentDescription) {
                    metaDescription.setAttribute('content', enrichedDescription);
                }
            }
        }
    }

    enhanceMetaDescription(description, keywords) {
        // Vérifier quels mots-clés sont déjà présents
        const presentKeywords = keywords.filter(keyword => 
            description.toLowerCase().includes(keyword.toLowerCase())
        );

        // Ajouter des mots-clés manquants si la description est trop courte
        if (description.length < 120 && presentKeywords.length < 3) {
            const missingKeywords = keywords.filter(keyword => 
                !presentKeywords.includes(keyword)
            );

            if (missingKeywords.length > 0) {
                const additionalText = missingKeywords.slice(0, 2).join(', ');
                return `${description} ${additionalText}.`;
            }
        }

        return description;
    }

    // ============================================
    // OPTIMISATION DES IMAGES
    // ============================================

    optimizeImages() {
        const images = document.querySelectorAll('img:not([alt])');
        images.forEach(img => {
            // Générer un alt text basé sur le contexte
            const altText = this.generateAltText(img);
            if (altText) {
                img.setAttribute('alt', altText);
            }
        });
    }

    generateAltText(img) {
        // Essayer de trouver un contexte proche
        const parent = img.closest('article, section, .service-card, .advantage');
        if (parent) {
            const title = parent.querySelector('h1, h2, h3, h4');
            if (title) {
                return `Illustration pour ${title.textContent.trim()}`;
            }
        }

        // Utiliser le src comme base
        const src = img.getAttribute('src') || '';
        const filename = src.split('/').pop().split('.')[0];
        if (filename) {
            return `Image ${filename.replace(/-/g, ' ')}`;
        }

        return 'Image Déménagement Zen';
    }

    // ============================================
    // UTILITAIRES
    // ============================================

    getServiceKeywords(serviceTitle) {
        const keywordsMap = {
            'déménagement': ['déménagement professionnel', 'déménageurs agréés', 'service de déménagement'],
            'emballage': ['emballage professionnel', 'protection des biens', 'matériaux de qualité'],
            'transport': ['transport sécurisé', 'véhicules adaptés', 'logistique'],
            'montage': ['montage meubles', 'démontage', 'assemblage']
        };

        const titleLower = serviceTitle.toLowerCase();
        for (const [key, keywords] of Object.entries(keywordsMap)) {
            if (titleLower.includes(key)) {
                return keywords;
            }
        }

        return [];
    }

    enhanceDescription(description, keywords) {
        if (keywords.length === 0) return description;

        // Vérifier si les mots-clés sont déjà présents
        const hasKeywords = keywords.some(keyword => 
            description.toLowerCase().includes(keyword.toLowerCase())
        );

        if (!hasKeywords && description.length < 200) {
            return `${description} ${keywords[0]}.`;
        }

        return description;
    }

    getLocalAdvantages(cityName) {
        return [
            {
                title: `Déménageurs expérimentés à ${cityName}`,
                description: `Notre équipe de déménageurs professionnels connaît parfaitement ${cityName} et ses spécificités.`
            },
            {
                title: 'Devis gratuit et transparent',
                description: 'Obtenez un devis détaillé et gratuit en moins de 24h, sans engagement.'
            },
            {
                title: 'Service clé en main',
                description: 'Nous nous occupons de tout : emballage, transport, déballage et installation.'
            },
            {
                title: 'Assurance et garantie',
                description: 'Vos biens sont assurés pendant tout le transport. Garantie de satisfaction.'
            }
        ];
    }

    advantageExists(container, title) {
        const advantages = container.querySelectorAll('.advantage, .advantage-item');
        return Array.from(advantages).some(adv => 
            adv.textContent.toLowerCase().includes(title.toLowerCase().split(' ')[0])
        );
    }

    addAdvantage(container, advantage) {
        const advantageElement = document.createElement('div');
        advantageElement.className = 'advantage';
        advantageElement.innerHTML = `
            <h3>${advantage.title}</h3>
            <p>${advantage.description}</p>
        `;
        container.appendChild(advantageElement);
    }

    slugToCityName(slug) {
        return slug
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
}

// Initialiser au chargement de la page
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ContentEnrichment();
    });
} else {
    new ContentEnrichment();
}



