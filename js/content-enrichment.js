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
            // Ajouter des dÃ©tails supplÃ©mentaires si manquants
            const title = section.querySelector('h3, h2');
            const description = section.querySelector('p');
            
            if (title && description) {
                // Ajouter des mots-clÃ©s pertinents
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
        // VÃ©rifier si on est sur une page de ville
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
            const enrichedText = `Service de dÃ©mÃ©nagement professionnel Ã  ${cityName}. DÃ©mÃ©nageurs agrÃ©Ã©s, emballage soignÃ©, transport sÃ©curisÃ©. Devis gratuit et rÃ©ponse sous 24h.`;
            if (!heroSubtitle.textContent.includes('agrÃ©Ã©s')) {
                heroSubtitle.textContent = enrichedText;
            }
        }
    }

    enrichLocalAdvantages(cityName) {
        const advantagesSection = document.querySelector('.advantages, .advantages-grid');
        if (!advantagesSection) return;

        // Ajouter des avantages spÃ©cifiques Ã  la ville si manquants
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
        // VÃ©rifier si une section de contenu enrichi existe dÃ©jÃ 
        if (document.querySelector('.enriched-content-section')) return;

        const mainContent = document.querySelector('main, .container');
        if (!mainContent) return;

        // CrÃ©er une section de contenu enrichi
        const enrichedSection = document.createElement('section');
        enrichedSection.className = 'enriched-content-section';
        enrichedSection.innerHTML = `
            <div class="container">
                <div class="enriched-content">
                    <h2>Pourquoi choisir DÃ©mÃ©nagement Zen Ã  ${cityName} ?</h2>
                    <div class="enriched-text">
                        <p>
                            <strong>DÃ©mÃ©nagement Zen</strong> est votre partenaire de confiance pour tous vos dÃ©mÃ©nagements Ã  ${cityName} et dans ses environs. 
                            Nous proposons un service complet de dÃ©mÃ©nagement rÃ©sidentiel et professionnel, adaptÃ© Ã  tous vos besoins.
                        </p>
                        <h3>Nos services de dÃ©mÃ©nagement Ã  ${cityName}</h3>
                        <ul>
                            <li><strong>DÃ©mÃ©nagement rÃ©sidentiel</strong> : DÃ©mÃ©nagement complet de votre logement avec emballage professionnel de vos biens</li>
                            <li><strong>DÃ©mÃ©nagement professionnel</strong> : DÃ©mÃ©nagement de bureaux et locaux commerciaux avec gestion des Ã©quipements informatiques</li>
                            <li><strong>Emballage et protection</strong> : Emballage soignÃ© avec matÃ©riaux de qualitÃ© pour protÃ©ger vos objets fragiles</li>
                            <li><strong>Transport sÃ©curisÃ©</strong> : VÃ©hicules adaptÃ©s et Ã©quipÃ©s pour un transport en toute sÃ©curitÃ©</li>
                            <li><strong>Montage et dÃ©montage</strong> : Service de montage/dÃ©montage de meubles et Ã©quipements</li>
                        </ul>
                        <h3>Nos engagements</h3>
                        <p>
                            Chez DÃ©mÃ©nagement Zen, nous nous engageons Ã  vous offrir un service de qualitÃ© avec des dÃ©mÃ©nageurs expÃ©rimentÃ©s et agrÃ©Ã©s. 
                            Nous respectons vos dÃ©lais, protÃ©geons vos biens et vous accompagnons tout au long de votre dÃ©mÃ©nagement Ã  ${cityName}.
                        </p>
                        <p>
                            <strong>Demandez votre devis gratuit</strong> dÃ¨s maintenant et bÃ©nÃ©ficiez d'une rÃ©ponse sous 24h. 
                            Notre Ã©quipe est Ã  votre Ã©coute pour rÃ©pondre Ã  toutes vos questions et vous proposer la solution de dÃ©mÃ©nagement adaptÃ©e Ã  vos besoins.
                        </p>
                    </div>
                </div>
            </div>
        `;

        // InsÃ©rer avant le footer
        const footer = document.querySelector('footer');
        if (footer) {
            footer.insertAdjacentElement('beforebegin', enrichedSection);
        } else {
            mainContent.appendChild(enrichedSection);
        }
    }

    // ============================================
    // AJOUT DE MOTS-CLÃ‰S PERTINENTS
    // ============================================

    addRelatedKeywords() {
        const keywords = [
            'dÃ©mÃ©nagement professionnel',
            'dÃ©mÃ©nageurs agrÃ©Ã©s',
            'service de dÃ©mÃ©nagement',
            'dÃ©mÃ©nagement clÃ© en main',
            'emballage professionnel',
            'transport sÃ©curisÃ©',
            'devis gratuit',
            'dÃ©mÃ©nagement rÃ©sidentiel',
            'dÃ©mÃ©nagement professionnel',
            'dÃ©mÃ©nageur expÃ©rimentÃ©'
        ];

        // Ajouter des mots-clÃ©s dans les meta descriptions si nÃ©cessaire
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            const currentDescription = metaDescription.getAttribute('content');
            if (currentDescription && currentDescription.length < 120) {
                // Enrichir la description avec des mots-clÃ©s pertinents
                const enrichedDescription = this.enhanceMetaDescription(currentDescription, keywords);
                if (enrichedDescription !== currentDescription) {
                    metaDescription.setAttribute('content', enrichedDescription);
                }
            }
        }
    }

    enhanceMetaDescription(description, keywords) {
        // VÃ©rifier quels mots-clÃ©s sont dÃ©jÃ  prÃ©sents
        const presentKeywords = keywords.filter(keyword => 
            description.toLowerCase().includes(keyword.toLowerCase())
        );

        // Ajouter des mots-clÃ©s manquants si la description est trop courte
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
            // GÃ©nÃ©rer un alt text basÃ© sur le contexte
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

        return 'Image DÃ©mÃ©nagement Zen';
    }

    // ============================================
    // UTILITAIRES
    // ============================================

    getServiceKeywords(serviceTitle) {
        const keywordsMap = {
            'dÃ©mÃ©nagement': ['dÃ©mÃ©nagement professionnel', 'dÃ©mÃ©nageurs agrÃ©Ã©s', 'service de dÃ©mÃ©nagement'],
            'emballage': ['emballage professionnel', 'protection des biens', 'matÃ©riaux de qualitÃ©'],
            'transport': ['transport sÃ©curisÃ©', 'vÃ©hicules adaptÃ©s', 'logistique'],
            'montage': ['montage meubles', 'dÃ©montage', 'assemblage']
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

        // VÃ©rifier si les mots-clÃ©s sont dÃ©jÃ  prÃ©sents
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
                title: `DÃ©mÃ©nageurs expÃ©rimentÃ©s Ã  ${cityName}`,
                description: `Notre Ã©quipe de dÃ©mÃ©nageurs professionnels connaÃ®t parfaitement ${cityName} et ses spÃ©cificitÃ©s.`
            },
            {
                title: 'Devis gratuit et transparent',
                description: 'Obtenez un devis dÃ©taillÃ© et gratuit en moins de 24h, sans engagement.'
            },
            {
                title: 'Service clÃ© en main',
                description: 'Nous nous occupons de tout : emballage, transport, dÃ©ballage et installation.'
            },
            {
                title: 'Assurance et garantie',
                description: 'Vos biens sont assurÃ©s pendant tout le transport. Garantie de satisfaction.'
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



