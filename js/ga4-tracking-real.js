// Script de tracking Google Analytics 4 avec ID réel pour VOC-Call
// ID de propriété: G-KMNGSGF5WN

// Configuration Google Analytics 4
const GA4_CONFIG = {
    measurementId: 'G-KMNGSGF5WN',
    siteUrl: 'https://voc-call.com',
    debugMode: false // Mettre à true en développement
};

// Initialisation de Google Analytics
function initGoogleAnalytics() {
    // Chargement du script GA4
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_CONFIG.measurementId}`;
    document.head.appendChild(script);

    // Configuration de gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    
    gtag('config', GA4_CONFIG.measurementId, {
        'custom_map': {
            'custom_parameter_1': 'service_type',
            'custom_parameter_2': 'page_category',
            'custom_parameter_3': 'user_type',
            'custom_parameter_4': 'content_type'
        },
        'send_page_view': true,
        'anonymize_ip': true,
        'allow_google_signals': true,
        'allow_ad_personalization_signals': false
    });

    console.log('Google Analytics 4 initialisé pour VOC-Call - ID: ' + GA4_CONFIG.measurementId);
}

// Événements de tracking personnalisés
const AnalyticsEvents = {
    // Tracking des demandes de devis
    trackQuoteRequest: function(service, source = 'website') {
        gtag('event', 'quote_request', {
            'service_type': service,
            'source': source,
            'page_category': 'conversion',
            'value': 50,
            'currency': 'EUR'
        });
        console.log(`Quote request tracked: ${service} from ${source}`);
    },

    // Tracking des téléchargements
    trackDownload: function(fileName, fileType = 'pdf') {
        gtag('event', 'file_download', {
            'file_name': fileName,
            'file_type': fileType,
            'page_category': 'resources',
            'value': 10,
            'currency': 'EUR'
        });
        console.log(`Download tracked: ${fileName} (${fileType})`);
    },

    // Tracking des clics CTA
    trackCTAClick: function(ctaText, location, destination) {
        gtag('event', 'cta_click', {
            'cta_text': ctaText,
            'cta_location': location,
            'cta_destination': destination,
            'page_category': 'engagement',
            'value': 5,
            'currency': 'EUR'
        });
        console.log(`CTA click tracked: ${ctaText} in ${location}`);
    },

    // Tracking des inscriptions newsletter
    trackNewsletterSignup: function(source = 'footer') {
        gtag('event', 'newsletter_signup', {
            'source': source,
            'page_category': 'lead_generation',
            'value': 5,
            'currency': 'EUR'
        });
        console.log(`Newsletter signup tracked from ${source}`);
    },

    // Tracking des appels téléphoniques
    trackPhoneCall: function(phoneNumber, source = 'website') {
        gtag('event', 'phone_call', {
            'phone_number': phoneNumber,
            'source': source,
            'page_category': 'conversion',
            'value': 100,
            'currency': 'EUR'
        });
        console.log(`Phone call tracked: ${phoneNumber} from ${source}`);
    },

    // Tracking des vues de pages de service
    trackServicePageView: function(serviceName) {
        gtag('event', 'service_page_view', {
            'service_name': serviceName,
            'page_category': 'services',
            'value': 2,
            'currency': 'EUR'
        });
        console.log(`Service page view tracked: ${serviceName}`);
    },

    // Tracking des recherches
    trackSearch: function(searchTerm, resultsCount = 0) {
        gtag('event', 'search', {
            'search_term': searchTerm,
            'results_count': resultsCount,
            'page_category': 'engagement'
        });
        console.log(`Search tracked: "${searchTerm}" (${resultsCount} results)`);
    },

    // Tracking des erreurs
    trackError: function(errorType, errorMessage, pageUrl) {
        gtag('event', 'exception', {
            'description': errorMessage,
            'fatal': false,
            'error_type': errorType,
            'page_url': pageUrl
        });
        console.log(`Error tracked: ${errorType} - ${errorMessage}`);
    },

    // Tracking des interactions avec le formulaire
    trackFormInteraction: function(formName, action, fieldName = null) {
        gtag('event', 'form_interaction', {
            'form_name': formName,
            'form_action': action,
            'field_name': fieldName,
            'page_category': 'engagement'
        });
        console.log(`Form interaction tracked: ${formName} - ${action}`);
    },

    // Tracking des scroll depth
    trackScrollDepth: function(depth) {
        gtag('event', 'scroll', {
            'scroll_depth': depth,
            'page_category': 'engagement'
        });
        console.log(`Scroll depth tracked: ${depth}%`);
    },

    // Tracking du temps sur page
    trackTimeOnPage: function(timeSpent, pageName) {
        gtag('event', 'timing_complete', {
            'name': 'time_on_page',
            'value': timeSpent,
            'page_name': pageName,
            'page_category': 'engagement'
        });
        console.log(`Time on page tracked: ${timeSpent}s on ${pageName}`);
    }
};

// Tracking automatique des interactions
function setupAutomaticTracking() {
    // Tracking des clics sur les boutons CTA
    document.addEventListener('click', function(e) {
        const target = e.target;
        
        // Boutons de demande de devis
        if (target.matches('.btn-primary, .cta-button, [data-action="quote"]')) {
            const service = target.getAttribute('data-service') || 'general';
            const location = target.closest('section')?.className || 'unknown';
            AnalyticsEvents.trackCTAClick(target.textContent.trim(), location, 'quote_form');
        }
        
        // Liens de téléchargement
        if (target.matches('a[href*=".pdf"], a[href*="download"]')) {
            const fileName = target.getAttribute('href').split('/').pop();
            const fileType = fileName.split('.').pop();
            AnalyticsEvents.trackDownload(fileName, fileType);
        }
        
        // Liens téléphoniques
        if (target.matches('a[href^="tel:"]')) {
            const phoneNumber = target.getAttribute('href').replace('tel:', '');
            AnalyticsEvents.trackPhoneCall(phoneNumber, 'website');
        }
        
        // Liens vers les pages de service
        if (target.matches('a[href*="/services/"]')) {
            const serviceName = target.textContent.trim();
            AnalyticsEvents.trackServicePageView(serviceName);
        }
    });

    // Tracking du scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.round((scrollTop / docHeight) * 100);
        
        if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
            maxScroll = scrollPercent;
            AnalyticsEvents.trackScrollDepth(scrollPercent);
        }
    });

    // Tracking du temps sur page
    const startTime = Date.now();
    window.addEventListener('beforeunload', function() {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        const pageName = document.title;
        AnalyticsEvents.trackTimeOnPage(timeSpent, pageName);
    });

    // Tracking des erreurs JavaScript
    window.addEventListener('error', function(e) {
        AnalyticsEvents.trackError('javascript_error', e.message, window.location.href);
    });

    // Tracking des interactions avec les formulaires
    document.addEventListener('focus', function(e) {
        if (e.target.matches('input, textarea, select')) {
            const form = e.target.closest('form');
            if (form) {
                const formName = form.getAttribute('name') || form.className || 'unknown';
                AnalyticsEvents.trackFormInteraction(formName, 'focus', e.target.name);
            }
        }
    });

    document.addEventListener('submit', function(e) {
        const form = e.target;
        const formName = form.getAttribute('name') || form.className || 'unknown';
        AnalyticsEvents.trackFormInteraction(formName, 'submit');
    });
}

// Fonctions utilitaires pour le tracking
const AnalyticsUtils = {
    // Obtenir le type d'utilisateur basé sur le comportement
    getUserType: function() {
        const timeOnSite = this.getTimeOnSite();
        const pagesViewed = this.getPagesViewed();
        
        if (timeOnSite > 300 && pagesViewed > 3) return 'engaged';
        if (timeOnSite > 120 && pagesViewed > 1) return 'interested';
        return 'casual';
    },

    // Obtenir le temps passé sur le site
    getTimeOnSite: function() {
        return Math.round((Date.now() - window.performance.timing.navigationStart) / 1000);
    },

    // Obtenir le nombre de pages vues dans la session
    getPagesViewed: function() {
        return parseInt(sessionStorage.getItem('pagesViewed') || '1');
    },

    // Incrémenter le compteur de pages vues
    incrementPageViews: function() {
        const current = this.getPagesViewed();
        sessionStorage.setItem('pagesViewed', (current + 1).toString());
    },

    // Obtenir la source de trafic
    getTrafficSource: function() {
        const referrer = document.referrer;
        if (!referrer) return 'direct';
        
        if (referrer.includes('google')) return 'google';
        if (referrer.includes('bing')) return 'bing';
        if (referrer.includes('facebook')) return 'facebook';
        if (referrer.includes('linkedin')) return 'linkedin';
        if (referrer.includes('twitter')) return 'twitter';
        
        return 'referral';
    },

    // Obtenir la catégorie de page
    getPageCategory: function() {
        const path = window.location.pathname;
        
        if (path === '/' || path === '/index.html') return 'homepage';
        if (path.includes('/services/')) return 'services';
        if (path.includes('/about')) return 'about';
        if (path.includes('/careers')) return 'careers';
        if (path.includes('/contact')) return 'contact';
        if (path.includes('/blog')) return 'blog';
        if (path.includes('/legal')) return 'legal';
        
        return 'other';
    }
};

// Configuration des objectifs GA4
function setupGA4Goals() {
    // Objectif 1: Demande de devis
    gtag('config', GA4_CONFIG.measurementId, {
        'custom_map': {
            'goal_1': 'quote_request'
        }
    });

    // Objectif 2: Téléchargement de ressources
    gtag('config', GA4_CONFIG.measurementId, {
        'custom_map': {
            'goal_2': 'file_download'
        }
    });

    // Objectif 3: Inscription newsletter
    gtag('config', GA4_CONFIG.measurementId, {
        'custom_map': {
            'goal_3': 'newsletter_signup'
        }
    });

    // Objectif 4: Appel téléphonique
    gtag('config', GA4_CONFIG.measurementId, {
        'custom_map': {
            'goal_4': 'phone_call'
        }
    });
}

// Fonction pour générer un rapport de performance
function generatePerformanceReport() {
    const report = {
        timestamp: new Date().toISOString(),
        ga4Id: GA4_CONFIG.measurementId,
        page: {
            title: document.title,
            url: window.location.href,
            category: AnalyticsUtils.getPageCategory()
        },
        user: {
            type: AnalyticsUtils.getUserType(),
            timeOnSite: AnalyticsUtils.getTimeOnSite(),
            pagesViewed: AnalyticsUtils.getPagesViewed(),
            trafficSource: AnalyticsUtils.getTrafficSource()
        },
        performance: {
            loadTime: Math.round(window.performance.timing.loadEventEnd - window.performance.timing.navigationStart),
            domContentLoaded: Math.round(window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart)
        }
    };

    console.log('Performance Report for VOC-Call:', report);
    return report;
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser Google Analytics
    initGoogleAnalytics();
    
    // Configurer le tracking automatique
    setupAutomaticTracking();
    
    // Configurer les objectifs
    setupGA4Goals();
    
    // Incrémenter le compteur de pages vues
    AnalyticsUtils.incrementPageViews();
    
    // Générer un rapport de performance
    setTimeout(generatePerformanceReport, 2000);
    
    console.log('Analytics tracking initialisé pour VOC-Call avec ID: ' + GA4_CONFIG.measurementId);
});

// Export pour utilisation dans d'autres scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AnalyticsEvents, AnalyticsUtils, generatePerformanceReport };
}

// Fonctions globales pour utilisation dans le HTML
window.VOCAnalytics = {
    trackQuote: AnalyticsEvents.trackQuoteRequest,
    trackDownload: AnalyticsEvents.trackDownload,
    trackCTA: AnalyticsEvents.trackCTAClick,
    trackNewsletter: AnalyticsEvents.trackNewsletterSignup,
    trackPhone: AnalyticsEvents.trackPhoneCall,
    trackService: AnalyticsEvents.trackServicePageView,
    trackSearch: AnalyticsEvents.trackSearch,
    trackError: AnalyticsEvents.trackError,
    generateReport: generatePerformanceReport
};


