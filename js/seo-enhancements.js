// ============================================
// AMÉLIORATIONS SEO - BREADCRUMBS ET RICH SNIPPETS
// ============================================

class SEOEnhancements {
    constructor() {
        this.baseUrl = 'https://demenagement-zen.fr';
        this.init();
    }

    init() {
        // Ajouter les breadcrumbs
        this.addBreadcrumbs();
        
        // Ajouter les rich snippets Schema.org
        this.addRichSnippets();
    }

    // ============================================
    // BREADCRUMBS
    // ============================================

    addBreadcrumbs() {
        const breadcrumbs = this.generateBreadcrumbs();
        if (!breadcrumbs || breadcrumbs.length === 0) return;

        // Créer l'élément breadcrumb
        const breadcrumbContainer = document.createElement('nav');
        breadcrumbContainer.className = 'breadcrumbs';
        breadcrumbContainer.setAttribute('aria-label', 'Fil d\'Ariane');

        const breadcrumbList = document.createElement('ol');
        breadcrumbList.className = 'breadcrumb-list';
        breadcrumbList.setAttribute('itemscope', '');
        breadcrumbList.setAttribute('itemtype', 'https://schema.org/BreadcrumbList');

        breadcrumbs.forEach((crumb, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'breadcrumb-item';
            listItem.setAttribute('itemprop', 'itemListElement');
            listItem.setAttribute('itemscope', '');
            listItem.setAttribute('itemtype', 'https://schema.org/ListItem');

            if (index === breadcrumbs.length - 1) {
                // Dernier élément (page actuelle)
                listItem.innerHTML = `
                    <span itemprop="name">${crumb.name}</span>
                    <meta itemprop="position" content="${index + 1}">
                `;
                listItem.classList.add('active');
            } else {
                // Élément avec lien
                listItem.innerHTML = `
                    <a href="${crumb.url}" itemprop="item">
                        <span itemprop="name">${crumb.name}</span>
                    </a>
                    <meta itemprop="position" content="${index + 1}">
                    <svg class="breadcrumb-separator" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5L1 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                `;
            }

            breadcrumbList.appendChild(listItem);
        });

        breadcrumbContainer.appendChild(breadcrumbList);

        // Insérer les breadcrumbs après le header
        const header = document.querySelector('header');
        if (header) {
            header.insertAdjacentElement('afterend', breadcrumbContainer);
        } else {
            // Si pas de header, insérer au début du body
            document.body.insertBefore(breadcrumbContainer, document.body.firstChild);
        }

        // Ajouter le Schema.org JSON-LD pour les breadcrumbs
        this.addBreadcrumbSchema(breadcrumbs);
    }

    generateBreadcrumbs() {
        const path = window.location.pathname;
        const breadcrumbs = [
            { name: 'Accueil', url: '/' }
        ];

        // Page d'accueil => pas de fil d'Ariane affiché
        if (path === '/' || path === '/index.html') {
            return [];
        }

        // Page carte de France
        if (path.includes('carte-france')) {
            breadcrumbs.push({ name: 'Nos villes', url: '/carte-france.html' });
            return breadcrumbs;
        }

        // Pages de villes (demenageur-xxx.html)
        const cityMatch = path.match(/demenageur-([^/\.]+)(?:\.html)?/);
        if (cityMatch) {
            const citySlug = cityMatch[1];
            const cityName = this.slugToCityName(citySlug);
            breadcrumbs.push({ name: 'Nos villes', url: '/carte-france.html' });
            breadcrumbs.push({ name: `Déménageur ${cityName}`, url: path });
            return breadcrumbs;
        }

        // Pages de devis (devis-xxx.html)
        const devisMatch = path.match(/devis-([^/\.]+)(?:\.html)?/);
        if (devisMatch) {
            const citySlug = devisMatch[1];
            const cityName = this.slugToCityName(citySlug);
            breadcrumbs.push({ name: 'Nos villes', url: '/carte-france.html' });
            breadcrumbs.push({ name: `Devis ${cityName}`, url: path });
            return breadcrumbs;
        }

        return breadcrumbs;
    }

    slugToCityName(slug) {
        // Convertir le slug en nom de ville (ex: "nantes" -> "Nantes")
        return slug
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    addBreadcrumbSchema(breadcrumbs) {
        const schema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs.map((crumb, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": crumb.name,
                "item": this.baseUrl + crumb.url
            }))
        };

        this.addSchemaScript(schema);
    }

    // ============================================
    // RICH SNIPPETS SCHEMA.ORG
    // ============================================

    addRichSnippets() {
        const path = window.location.pathname;

        // Schema Organization (sur toutes les pages)
        this.addOrganizationSchema();

        // Schema LocalBusiness (sur les pages de villes)
        if (path.includes('demenageur-') || path.includes('devis-')) {
            this.addLocalBusinessSchema();
        }

        // Schema Service (sur toutes les pages)
        this.addServiceSchema();

        // Schema FAQ (si présent sur la page)
        if (document.querySelector('.faq-section, .faq-item')) {
            this.addFAQSchema();
        }
    }

    addOrganizationSchema() {
        const schema = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Déménagement Facile",
            "alternateName": "Demenagement Facile",
            "url": this.baseUrl,
            "logo": `${this.baseUrl}/images/logo.png`,
            "description": "Service professionnel de déménagement clé en main dans toute la France. Déménageurs agréés, devis gratuit sous 24h.",
            "foundingDate": "2020",
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+33-1-23-45-67-89",
                "contactType": "customer service",
                "email": "contact@demenagement-facile.fr",
                "availableLanguage": ["French"],
                "areaServed": "FR"
            },
            "address": {
                "@type": "PostalAddress",
                "addressCountry": "FR",
                "addressLocality": "Paris",
                "postalCode": "75001"
            },
            "sameAs": [
                "https://www.facebook.com/demenagementfacile",
                "https://twitter.com/demenagementfacile"
            ],
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "127",
                "bestRating": "5",
                "worstRating": "1"
            }
        };

        this.addSchemaScript(schema);
    }

    addLocalBusinessSchema() {
        const cityMatch = window.location.pathname.match(/(?:demenageur|devis)-([^/]+)\.html/);
        if (!cityMatch) return;

        const citySlug = cityMatch[1];
        const cityName = this.slugToCityName(citySlug);
        const pageTitle = document.querySelector('h1, h2')?.textContent || `Déménageur ${cityName}`;
        const description = document.querySelector('meta[name="description"]')?.content || 
            `Service de déménagement professionnel à ${cityName}. Devis gratuit et réponse sous 24h.`;

        const schema = {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": `Déménagement Facile - ${cityName}`,
            "description": description,
            "url": `${this.baseUrl}${window.location.pathname}`,
            "telephone": "+33-1-23-45-67-89",
            "email": "contact@demenagement-facile.fr",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": cityName,
                "addressCountry": "FR"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": this.getCityCoordinates(citySlug)?.lat || "",
                "longitude": this.getCityCoordinates(citySlug)?.lng || ""
            },
            "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday"
                ],
                "opens": "08:00",
                "closes": "18:00"
            },
            "priceRange": "€€",
            "image": `${this.baseUrl}/images/logo.png`,
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "127"
            },
            "areaServed": {
                "@type": "City",
                "name": cityName
            }
        };

        this.addSchemaScript(schema);
    }

    addServiceSchema() {
        const schema = {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Déménagement",
            "provider": {
                "@type": "Organization",
                "name": "Déménagement Facile"
            },
            "areaServed": {
                "@type": "Country",
                "name": "France"
            },
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Services de déménagement",
                "itemListElement": [
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Déménagement résidentiel",
                            "description": "Déménagement complet de votre logement avec emballage et transport"
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Déménagement professionnel",
                            "description": "Déménagement de bureaux et locaux professionnels"
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Emballage et protection",
                            "description": "Emballage professionnel de vos biens avec matériaux de qualité"
                        }
                    }
                ]
            }
        };

        this.addSchemaScript(schema);
    }

    addFAQSchema() {
        const faqItems = document.querySelectorAll('.faq-item, .faq-question, [itemprop="mainEntity"]');
        if (faqItems.length === 0) return;

        const faqSchema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": []
        };

        faqItems.forEach((item, index) => {
            const question = item.querySelector('.faq-question, h3, [itemprop="name"]')?.textContent?.trim() ||
                           item.querySelector('strong')?.textContent?.trim() ||
                           `Question ${index + 1}`;
            
            const answer = item.querySelector('.faq-answer, [itemprop="text"], p')?.textContent?.trim() ||
                          item.textContent?.trim() ||
                          '';

            if (question && answer) {
                faqSchema.mainEntity.push({
                    "@type": "Question",
                    "name": question,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": answer
                    }
                });
            }
        });

        if (faqSchema.mainEntity.length > 0) {
            this.addSchemaScript(faqSchema);
        }
    }

    getCityCoordinates(citySlug) {
        // Coordonnées approximatives de quelques villes principales
        const coordinates = {
            'paris': { lat: '48.8566', lng: '2.3522' },
            'lyon': { lat: '45.7640', lng: '4.8357' },
            'marseille': { lat: '43.2965', lng: '5.3698' },
            'toulouse': { lat: '43.6047', lng: '1.4442' },
            'nantes': { lat: '47.2184', lng: '-1.5536' },
            'bordeaux': { lat: '44.8378', lng: '-0.5792' },
            'lille': { lat: '50.6292', lng: '3.0573' },
            'strasbourg': { lat: '48.5734', lng: '7.7521' },
            'nice': { lat: '43.7102', lng: '7.2620' },
            'rennes': { lat: '48.1173', lng: '-1.6778' }
        };
        return coordinates[citySlug] || null;
    }

    addSchemaScript(schema) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema, null, 2);
        document.head.appendChild(script);
    }
}

// Initialiser au chargement de la page
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new SEOEnhancements();
    });
} else {
    new SEOEnhancements();
}




