// Script de balisage structuré Schema.org pour VOC-Call
// Améliore le SEO et l'affichage dans les résultats de recherche

function addSchemaMarkup() {
    // 1. Schema Organization
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "VOC-Call",
        "alternateName": "VOC Call",
        "description": "Centre d'appel télétravail spécialisé en homeshoring recrutement. Externaliser service client, téléconseiller indépendant, permanence téléphonique à distance.",
        "url": "https://voc-call.com",
        "logo": "https://voc-call.com/images/logo-voc-call.png",
        "foundingDate": "2009",
        "founder": {
            "@type": "Person",
            "name": "VOC-Call"
        },
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "FR",
            "addressLocality": "Paris",
            "addressRegion": "Île-de-France"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+33-1-XX-XX-XX-XX",
            "contactType": "customer service",
            "availableLanguage": "French"
        },
        "sameAs": [
            "https://www.linkedin.com/company/voc-call",
            "https://www.facebook.com/voc-call"
        ],
        "serviceArea": {
            "@type": "Country",
            "name": "France"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Services Centre d'Appel",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Secrétariat Téléphonique",
                        "description": "Secrétariat téléphonique à distance avec téléconseillers indépendants"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Permanence Téléphonique à Distance",
                        "description": "Permanence téléphonique 24h/24 et 7j/7 avec centre d'appel à distance"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Service Client Télétravail",
                        "description": "Externaliser service client avec téléconseillers à domicile"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Prospection Téléphonique",
                        "description": "Prospection commerciale et télémarketing avec centre d'appel prospection"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Gestion d'Appels",
                        "description": "Gestion des appels téléphoniques entrants et traitement administratif"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Accueil Téléphonique",
                        "description": "Accueil téléphonique et gestion téléphonique pour vos clients"
                    }
                }
            ]
        }
    };

    // 2. Schema LocalBusiness pour chaque ville
    const cities = [
        { name: "Paris", region: "Île-de-France" },
        { name: "Lyon", region: "Auvergne-Rhône-Alpes" },
        { name: "Marseille", region: "Provence-Alpes-Côte d'Azur" },
        { name: "Toulouse", region: "Occitanie" },
        { name: "Nantes", region: "Pays de la Loire" },
        { name: "Bordeaux", region: "Nouvelle-Aquitaine" },
        { name: "Lille", region: "Hauts-de-France" },
        { name: "Strasbourg", region: "Grand Est" }
    ];

    const localBusinessSchemas = cities.map(city => ({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": `VOC-Call - Centre d'Appel ${city.name}`,
        "description": `Centre d'appel télétravail à ${city.name}. Homeshoring recrutement, externaliser service client, téléconseiller indépendant.`,
        "url": `https://voc-call.com/centre-appel-${city.name.toLowerCase()}`,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": city.name,
            "addressRegion": city.region,
            "addressCountry": "FR"
        },
        "telephone": "+33-1-XX-XX-XX-XX",
        "openingHours": "Mo-Su 00:00-23:59",
        "serviceArea": {
            "@type": "City",
            "name": city.name
        },
        "parentOrganization": {
            "@type": "Organization",
            "name": "VOC-Call"
        }
    }));

    // 3. Schema JobPosting pour les offres d'emploi
    const jobPostingSchema = {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        "title": "Téléconseiller à Domicile",
        "description": "Rejoignez notre équipe de téléconseillers indépendants. Travaillez depuis votre domicile pour notre centre d'appel télétravail.",
        "datePosted": "2024-12-19",
        "validThrough": "2025-12-19",
        "employmentType": "CONTRACTOR",
        "hiringOrganization": {
            "@type": "Organization",
            "name": "VOC-Call",
            "sameAs": "https://voc-call.com"
        },
        "jobLocation": {
            "@type": "Place",
            "address": {
                "@type": "PostalAddress",
                "addressCountry": "FR"
            }
        },
        "workHours": "Flexible",
        "baseSalary": {
            "@type": "MonetaryAmount",
            "currency": "EUR",
            "value": {
                "@type": "QuantitativeValue",
                "minValue": 2000,
                "maxValue": 4000,
                "unitText": "MONTH"
            }
        },
        "skills": [
            "Relation client",
            "Téléconseil",
            "Télétravail",
            "Service client",
            "Communication"
        ]
    };

    // 4. Schema FAQPage
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Qu'est-ce que le homeshoring recrutement ?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Le homeshoring recrutement consiste à recruter des téléconseillers indépendants qui travaillent depuis leur domicile pour un centre d'appel télétravail."
                }
            },
            {
                "@type": "Question",
                "name": "Comment externaliser service client ?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "VOC-Call vous accompagne dans l'externalisation de votre service client avec des téléconseillers à domicile qualifiés et formés."
                }
            },
            {
                "@type": "Question",
                "name": "Qu'est-ce qu'un téléconseiller indépendant ?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Un téléconseiller indépendant travaille depuis son domicile pour des centres d'appel, gérant les appels entrants et sortants pour diverses entreprises."
                }
            },
            {
                "@type": "Question",
                "name": "Quels sont les avantages du centre d'appel à distance ?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Le centre d'appel à distance offre flexibilité, réduction des coûts, accessibilité 24h/24 et accès à un vivier de talents plus large."
                }
            }
        ]
    };

    // 5. Schema BreadcrumbList
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Accueil",
                "item": "https://voc-call.com"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Services",
                "item": "https://voc-call.com/#services"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": "Centre d'Appel Télétravail",
                "item": "https://voc-call.com/#services"
            }
        ]
    };

    // Ajouter tous les schemas au DOM
    const schemas = [
        organizationSchema,
        ...localBusinessSchemas,
        jobPostingSchema,
        faqSchema,
        breadcrumbSchema
    ];

    schemas.forEach(schema => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
    });

    console.log('✅ Balisage structuré Schema.org ajouté avec succès');
}

// Exécuter automatiquement
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', addSchemaMarkup);
}

// Export pour utilisation dans Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { addSchemaMarkup };
}
