/**
 * ============================================
 * AMÉLIORATIONS SEO - BREADCRUMBS ET RICH SNIPPETS (REFACTORISÉ)
 * ============================================
 * 
 * Gère les breadcrumbs et les rich snippets Schema.org
 * pour améliorer le SEO du site
 * 
 * @version 2.0.0
 * @author Déménagement Facile
 */

import { CONFIG } from './utils/constants.js';
import { onDOMReady, $ } from './utils/dom-helpers.js';

/**
 * Configuration SEO
 */
const SEO_CONFIG = {
    BASE_URL: 'https://demenagement-facile.fr',
    ORGANIZATION_NAME: 'Déménagement Facile',
    CONTACT_EMAIL: 'contact@demenagement-facile.fr',
    CONTACT_PHONE: '+33-1-23-45-67-89'
};

/**
 * Classe pour gérer les améliorations SEO
 */
export class SEOEnhancements {
    /**
     * @param {Object} options - Options de configuration
     */
    constructor(options = {}) {
        this.options = {
            ...SEO_CONFIG,
            ...options
        };
        
        this.init();
    }
    
    /**
     * Initialise les améliorations SEO
     */
    init() {
        onDOMReady(() => {
            this.addBreadcrumbs();
            this.addRichSnippets();
        });
    }
    
    /**
     * Ajoute les breadcrumbs
     */
    addBreadcrumbs() {
        const breadcrumbs = this.generateBreadcrumbs();
        if (!breadcrumbs || breadcrumbs.length === 0) {
            return;
        }
        
        const breadcrumbContainer = this.createBreadcrumbContainer(breadcrumbs);
        this.insertBreadcrumbs(breadcrumbContainer);
        this.addBreadcrumbSchema(breadcrumbs);
    }
    
    /**
     * Génère les breadcrumbs selon la page actuelle
     * @returns {Array<Object>} Les breadcrumbs
     */
    generateBreadcrumbs() {
        const path = window.location.pathname;
        const breadcrumbs = [
            { name: 'Accueil', url: '/' }
        ];
        
        // Page d'accueil
        if (path === '/' || path === '/index.html') {
            return [];
        }
        
        // Page carte de France
        if (path.includes('carte-france')) {
            breadcrumbs.push({ name: 'Nos villes', url: '/carte-france.html' });
            return breadcrumbs;
        }
        
        // Pages de villes
        const cityMatch = path.match(/demenageur-([^/\.]+)(?:\.html)?/);
        if (cityMatch) {
            const citySlug = cityMatch[1];
            const cityName = this.slugToCityName(citySlug);
            breadcrumbs.push({ name: 'Nos villes', url: '/carte-france.html' });
            breadcrumbs.push({ name: `Déménageur ${cityName}`, url: path });
            return breadcrumbs;
        }
        
        // Pages de devis
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
    
    /**
     * Crée le conteneur des breadcrumbs
     * @param {Array<Object>} breadcrumbs - Les breadcrumbs
     * @returns {HTMLElement} Le conteneur
     */
    createBreadcrumbContainer(breadcrumbs) {
        const container = document.createElement('nav');
        container.className = 'breadcrumbs';
        container.setAttribute('aria-label', 'Fil d\'Ariane');
        
        const list = document.createElement('ol');
        list.className = 'breadcrumb-list';
        list.setAttribute('itemscope', '');
        list.setAttribute('itemtype', 'https://schema.org/BreadcrumbList');
        
        breadcrumbs.forEach((crumb, index) => {
            const item = this.createBreadcrumbItem(crumb, index, breadcrumbs.length);
            list.appendChild(item);
        });
        
        container.appendChild(list);
        return container;
    }
    
    /**
     * Crée un item de breadcrumb
     * @param {Object} crumb - Les données du breadcrumb
     * @param {number} index - L'index
     * @param {number} total - Le nombre total de breadcrumbs
     * @returns {HTMLElement} L'item
     */
    createBreadcrumbItem(crumb, index, total) {
        const item = document.createElement('li');
        item.className = 'breadcrumb-item';
        item.setAttribute('itemprop', 'itemListElement');
        item.setAttribute('itemscope', '');
        item.setAttribute('itemtype', 'https://schema.org/ListItem');
        
        if (index === total - 1) {
            // Dernier élément (page actuelle)
            item.innerHTML = `
                <span itemprop="name">${crumb.name}</span>
                <meta itemprop="position" content="${index + 1}">
            `;
            item.classList.add('active');
        } else {
            // Élément avec lien
            item.innerHTML = `
                <a href="${crumb.url}" itemprop="item">
                    <span itemprop="name">${crumb.name}</span>
                </a>
                <meta itemprop="position" content="${index + 1}">
                <svg class="breadcrumb-separator" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L1 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;
        }
        
        return item;
    }
    
    /**
     * Insère les breadcrumbs dans le DOM
     * @param {HTMLElement} container - Le conteneur
     */
    insertBreadcrumbs(container) {
        const header = document.querySelector('header');
        if (header) {
            header.insertAdjacentElement('afterend', container);
        } else {
            document.body.insertBefore(container, document.body.firstChild);
        }
    }
    
    /**
     * Ajoute le Schema.org pour les breadcrumbs
     * @param {Array<Object>} breadcrumbs - Les breadcrumbs
     */
    addBreadcrumbSchema(breadcrumbs) {
        const schema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs.map((crumb, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": crumb.name,
                "item": this.options.BASE_URL + crumb.url
            }))
        };
        
        this.addSchemaScript(schema);
    }
    
    /**
     * Ajoute les rich snippets Schema.org
     */
    addRichSnippets() {
        this.addOrganizationSchema();
        
        const path = window.location.pathname;
        if (path.includes('demenageur-') || path.includes('devis-')) {
            this.addLocalBusinessSchema();
        }
        
        this.addServiceSchema();
        
        if (document.querySelector('.faq-section, .faq-item')) {
            this.addFAQSchema();
        }
    }
    
    /**
     * Ajoute le Schema Organization
     */
    addOrganizationSchema() {
        const schema = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": this.options.ORGANIZATION_NAME,
            "url": this.options.BASE_URL,
            "logo": `${this.options.BASE_URL}/images/logo.png`,
            "description": "Service professionnel de déménagement clé en main dans toute la France.",
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": this.options.CONTACT_PHONE,
                "contactType": "customer service",
                "email": this.options.CONTACT_EMAIL,
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
    
    /**
     * Ajoute le Schema LocalBusiness pour les pages de villes
     */
    addLocalBusinessSchema() {
        const cityMatch = window.location.pathname.match(/(?:demenageur|devis)-([^/]+)\.html/);
        if (!cityMatch) {
            return;
        }
        
        const citySlug = cityMatch[1];
        const cityName = this.slugToCityName(citySlug);
        const description = document.querySelector('meta[name="description"]')?.content || 
            `Service de déménagement professionnel à ${cityName}. Devis gratuit et réponse sous 24h.`;
        
        const schema = {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": `${this.options.ORGANIZATION_NAME} - ${cityName}`,
            "description": description,
            "url": `${this.options.BASE_URL}${window.location.pathname}`,
            "telephone": this.options.CONTACT_PHONE,
            "email": this.options.CONTACT_EMAIL,
            "address": {
                "@type": "PostalAddress",
                "addressLocality": cityName,
                "addressCountry": "FR"
            },
            "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "08:00",
                "closes": "18:00"
            },
            "priceRange": "€€",
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "127"
            }
        };
        
        this.addSchemaScript(schema);
    }
    
    /**
     * Ajoute le Schema Service
     */
    addServiceSchema() {
        const schema = {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Déménagement",
            "provider": {
                "@type": "Organization",
                "name": this.options.ORGANIZATION_NAME
            },
            "areaServed": {
                "@type": "Country",
                "name": "France"
            }
        };
        
        this.addSchemaScript(schema);
    }
    
    /**
     * Ajoute le Schema FAQPage
     */
    addFAQSchema() {
        const faqItems = document.querySelectorAll('.faq-item, .faq-question, [itemprop="mainEntity"]');
        if (faqItems.length === 0) {
            return;
        }
        
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
    
    /**
     * Ajoute un script Schema.org au DOM
     * @param {Object} schema - Le schema à ajouter
     */
    addSchemaScript(schema) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema, null, 2);
        document.head.appendChild(script);
    }
    
    /**
     * Convertit un slug en nom de ville
     * @param {string} slug - Le slug
     * @returns {string} Le nom de la ville
     */
    slugToCityName(slug) {
        return slug
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
}

// Initialisation automatique
document.addEventListener('DOMContentLoaded', function() {
    new SEOEnhancements();
});

// Export pour utilisation dans d'autres modules
export default SEOEnhancements;




