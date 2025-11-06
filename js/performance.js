// ============================================
// OPTIMISATIONS DE PERFORMANCE
// ============================================

(function() {
    'use strict';
    
    // Lazy loading pour les images (fallback pour les navigateurs qui ne supportent pas loading="lazy")
    function initLazyLoading() {
        if ('loading' in HTMLImageElement.prototype) {
            // Le navigateur supporte le lazy loading natif
            return;
        }
        
        // Fallback avec Intersection Observer
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px'
            });
            
            images.forEach(img => {
                if (img.dataset.src) {
                    imageObserver.observe(img);
                }
            });
        } else {
            // Fallback pour les anciens navigateurs
            images.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
            });
        }
    }
    
    // Preload des ressources critiques
    function preloadCriticalResources() {
        // Preload des fonts
        const fonts = [
            'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2'
        ];
        
        fonts.forEach(font => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'font';
            link.type = 'font/woff2';
            link.crossOrigin = 'anonymous';
            link.href = font;
            document.head.appendChild(link);
        });
    }
    
    // Optimisation du scroll
    function optimizeScroll() {
        let ticking = false;
        
        function updateOnScroll() {
            // Code d'optimisation du scroll si nécessaire
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(updateOnScroll);
                ticking = true;
            }
        }, { passive: true });
    }
    
    // Désactiver les animations pour les utilisateurs qui préfèrent réduire les animations
    function respectPrefersReducedMotion() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            const style = document.createElement('style');
            style.textContent = `
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Initialisation
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initLazyLoading();
            preloadCriticalResources();
            optimizeScroll();
            respectPrefersReducedMotion();
        });
    } else {
        initLazyLoading();
        preloadCriticalResources();
        optimizeScroll();
        respectPrefersReducedMotion();
    }
    
    // Service Worker pour le cache (optionnel)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            // Le service worker peut être ajouté plus tard si nécessaire
        });
    }
})();

