// Script inline à placer dans le <head> pour un remplacement instantané
(function() {
    'use strict';
    
    // Extraire le slug de l'URL immédiatement
    function getCitySlugFromURL() {
        const path = window.location.pathname;
        const href = window.location.href;
        
        // Méthode 1: pathname avec .html
        let match = path.match(/demenageur-([^/]+)\.html/);
        if (match && match[1]) return match[1];
        
        // Méthode 2: pathname sans .html
        match = path.match(/\/demenageur-([^/?#]+)/);
        if (match && match[1]) return match[1];
        
        // Méthode 3: pathname simple
        match = path.match(/demenageur-([^/?#]+)/);
        if (match && match[1]) return match[1];
        
        // Méthode 4: href complet
        match = href.match(/demenageur-([^/?#]+)/);
        if (match && match[1]) return match[1];
        
        return null;
    }
    
    // Mapping minimal des villes (seulement les plus courantes pour le script inline)
    const cityData = {
        'nantes': { name: 'Nantes', dept: '44', deptName: 'Loire-Atlantique' },
        'paris': { name: 'Paris', dept: '75', deptName: 'Paris' },
        'lyon': { name: 'Lyon', dept: '69', deptName: 'Rhône' },
        'marseille': { name: 'Marseille', dept: '13', deptName: 'Bouches-du-Rhône' },
        'toulouse': { name: 'Toulouse', dept: '31', deptName: 'Haute-Garonne' },
        'bordeaux': { name: 'Bordeaux', dept: '33', deptName: 'Gironde' },
        'lille': { name: 'Lille', dept: '59', deptName: 'Nord' },
        'agen': { name: 'Agen', dept: '47', deptName: 'Lot-et-Garonne' }
    };
    
    // Fonction de remplacement rapide
    function replaceCityNameImmediately() {
        const slug = getCitySlugFromURL();
        if (!slug || !cityData[slug]) return;
        
        const city = cityData[slug];
        
        // Masquer le contenu pour éviter le flash
        document.documentElement.style.visibility = 'hidden';
        
        // Attendre que le DOM soit prêt
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                replaceInTitle(city);
                document.documentElement.style.visibility = 'visible';
            });
        } else {
            // DOM déjà chargé
            replaceInTitle(city);
            document.documentElement.style.visibility = 'visible';
        }
    }
    
    function replaceInTitle(city) {
        // Remplacer dans le h1.hero-title
        const heroTitle = document.querySelector('h1.hero-title');
        if (heroTitle) {
            const titleText = heroTitle.textContent || heroTitle.innerText || '';
            // Remplacer "Agen" ou toute autre ville par la bonne ville
            const newText = titleText.replace(/\b(Agen|Paris|Lyon|Marseille|Toulouse|Bordeaux|Lille|Nantes)\b/gi, city.name);
            if (newText !== titleText) {
                heroTitle.textContent = newText;
            }
        }
    }
    
    // Exécuter immédiatement
    replaceCityNameImmediately();
})();
