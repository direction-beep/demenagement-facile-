// Script pour améliorer la propreté et l'organisation du header
// VOC-Call - Optimisation de la navigation

document.addEventListener('DOMContentLoaded', function() {
    // Améliorer la navigation
    improveNavigation();
    
    // Optimiser les dropdowns
    optimizeDropdowns();
    
    // Améliorer la responsivité
    improveResponsiveness();
    
    // Ajouter des animations fluides
    addSmoothAnimations();
});

function improveNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname;
    
    // Nettoyer les classes actives existantes
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Marquer la page active
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && currentPage.includes(href.replace('.html', ''))) {
            link.classList.add('active');
        }
    });
    
    // Améliorer l'accessibilité
    navLinks.forEach(link => {
        link.setAttribute('tabindex', '0');
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

function optimizeDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (!link || !menu) return;
        
        // Améliorer l'ouverture/fermeture
        let timeout;
        
        dropdown.addEventListener('mouseenter', function() {
            clearTimeout(timeout);
            this.classList.add('active');
            menu.style.opacity = '1';
            menu.style.visibility = 'visible';
            menu.style.transform = 'translateX(-50%) translateY(0)';
        });
        
        dropdown.addEventListener('mouseleave', function() {
            timeout = setTimeout(() => {
                this.classList.remove('active');
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.transform = 'translateX(-50%) translateY(-10px)';
            }, 150);
        });
        
        // Améliorer l'accessibilité
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });
}

function improveResponsiveness() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!navToggle || !navMenu) return;
    
    // Améliorer le menu mobile
    navToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    });
    
    // Fermer le menu en cliquant à l'extérieur
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    });
    
    // Fermer le menu en appuyant sur Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    });
}

function addSmoothAnimations() {
    // Animation d'apparition des éléments
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Animation du logo
    const logo = document.querySelector('.logo img');
    if (logo) {
        logo.style.opacity = '0';
        logo.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            logo.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            logo.style.opacity = '1';
            logo.style.transform = 'scale(1)';
        }, 200);
    }
}

// Fonction pour nettoyer et optimiser le header
function cleanupHeader() {
    // Supprimer les classes inutiles
    const header = document.querySelector('.header');
    if (header) {
        header.classList.remove('scrolled', 'transparent');
    }
    
    // Optimiser les performances
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        // Précharger les pages importantes
        if (link.href && (link.href.includes('services') || link.href.includes('about'))) {
            link.addEventListener('mouseenter', function() {
                const linkElement = document.createElement('link');
                linkElement.rel = 'prefetch';
                linkElement.href = this.href;
                document.head.appendChild(linkElement);
            });
        }
    });
}

// Fonction pour améliorer l'UX
function improveUX() {
    // Ajouter un indicateur de chargement pour les liens
    const navLinks = document.querySelectorAll('.nav-link:not([href^="#"])');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Ajouter une classe de chargement
            this.classList.add('loading');
            
            // Créer un indicateur visuel
            const indicator = document.createElement('div');
            indicator.className = 'nav-loading-indicator';
            indicator.innerHTML = '<div class="spinner"></div>';
            this.appendChild(indicator);
            
            // Nettoyer après un délai
            setTimeout(() => {
                this.classList.remove('loading');
                const existingIndicator = this.querySelector('.nav-loading-indicator');
                if (existingIndicator) {
                    existingIndicator.remove();
                }
            }, 1000);
        });
    });
}

// Initialiser les améliorations
cleanupHeader();
improveUX();

// Exporter les fonctions pour utilisation externe
window.HeaderCleanup = {
    improveNavigation,
    optimizeDropdowns,
    improveResponsiveness,
    addSmoothAnimations,
    cleanupHeader,
    improveUX
};


