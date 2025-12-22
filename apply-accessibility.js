// Script pour appliquer les améliorations d'accessibilité
// Ce script peut être exécuté dans la console du navigateur

function applyAccessibilityImprovements() {
    console.log('🔧 Application des améliorations d\'accessibilité...');
    
    // 1. Améliorer le bouton hamburger
    const navToggles = document.querySelectorAll('.nav-toggle');
    navToggles.forEach(toggle => {
        if (toggle.tagName !== 'BUTTON') {
            const button = document.createElement('button');
            button.className = toggle.className;
            button.id = toggle.id;
            button.setAttribute('aria-label', 'Ouvrir le menu de navigation');
            button.setAttribute('aria-expanded', 'false');
            button.setAttribute('aria-controls', 'nav-menu');
            
            // Copier le contenu
            button.innerHTML = toggle.innerHTML;
            
            // Remplacer l'élément
            toggle.parentNode.replaceChild(button, toggle);
        }
    });
    
    // 2. Améliorer la navigation
    const navMenus = document.querySelectorAll('.nav-menu');
    navMenus.forEach(menu => {
        if (!menu.hasAttribute('role')) {
            menu.setAttribute('role', 'navigation');
            menu.setAttribute('aria-label', 'Menu principal');
        }
    });
    
    const navLists = document.querySelectorAll('.nav-list');
    navLists.forEach(list => {
        if (!list.hasAttribute('role')) {
            list.setAttribute('role', 'menubar');
        }
    });
    
    // 3. Améliorer les éléments de menu
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        if (!item.hasAttribute('role')) {
            item.setAttribute('role', 'none');
        }
        
        const link = item.querySelector('.nav-link');
        if (link && !link.hasAttribute('role')) {
            link.setAttribute('role', 'menuitem');
            
            // Ajouter aria-current pour la page active
            if (link.classList.contains('active')) {
                link.setAttribute('aria-current', 'page');
            }
        }
    });
    
    // 4. Améliorer le dropdown
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (link && !link.hasAttribute('aria-haspopup')) {
            link.setAttribute('aria-haspopup', 'true');
            link.setAttribute('aria-expanded', 'false');
            link.setAttribute('aria-label', 'Services - Menu déroulant');
        }
        
        if (menu && !menu.hasAttribute('role')) {
            menu.setAttribute('role', 'menu');
            menu.setAttribute('aria-label', 'Sous-menu Services');
        }
        
        // Améliorer les éléments du dropdown
        const dropdownItems = menu.querySelectorAll('li');
        dropdownItems.forEach(item => {
            if (!item.hasAttribute('role')) {
                item.setAttribute('role', 'none');
            }
            
            const itemLink = item.querySelector('a');
            if (itemLink && !itemLink.hasAttribute('role')) {
                itemLink.setAttribute('role', 'menuitem');
            }
        });
    });
    
    // 5. Améliorer les icônes
    const icons = document.querySelectorAll('.fas, .fa');
    icons.forEach(icon => {
        if (!icon.hasAttribute('aria-hidden') && !icon.hasAttribute('aria-label')) {
            icon.setAttribute('aria-hidden', 'true');
        }
    });
    
    // 6. Améliorer les boutons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        if (!button.hasAttribute('role') && button.tagName === 'A') {
            button.setAttribute('role', 'button');
        }
    });
    
    // 7. Améliorer les sections principales
    const heroSections = document.querySelectorAll('.hero');
    heroSections.forEach(section => {
        if (!section.hasAttribute('role')) {
            section.setAttribute('role', 'banner');
        }
        
        const title = section.querySelector('.hero-title');
        if (title && !title.hasAttribute('id')) {
            title.setAttribute('id', 'hero-title');
            section.setAttribute('aria-labelledby', 'hero-title');
        }
    });
    
    // 8. Améliorer les groupes de boutons
    const buttonGroups = document.querySelectorAll('.hero-buttons');
    buttonGroups.forEach(group => {
        if (!group.hasAttribute('role')) {
            group.setAttribute('role', 'group');
            group.setAttribute('aria-label', 'Actions principales');
        }
    });
    
    console.log('✅ Améliorations d\'accessibilité appliquées avec succès !');
    
    // Mise à jour du JavaScript pour gérer les ARIA
    updateJavaScriptForAria();
}

function updateJavaScriptForAria() {
    // Mise à jour du gestionnaire du menu mobile
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navMenu.classList.contains('active');
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Mise à jour des attributs ARIA
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navToggle.setAttribute('aria-label', !isExpanded ? 'Fermer le menu de navigation' : 'Ouvrir le menu de navigation');
        });
    }
    
    // Mise à jour du gestionnaire du dropdown
    const dropdown = document.querySelector('.dropdown');
    if (dropdown) {
        const dropdownLink = dropdown.querySelector('.nav-link');
        
        dropdownLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const isExpanded = dropdown.classList.contains('active');
            dropdown.classList.toggle('active');
            
            // Mise à jour des attributs ARIA
            dropdownLink.setAttribute('aria-expanded', !isExpanded);
        });
    }
}

// Exécuter automatiquement
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', applyAccessibilityImprovements);
}

// Export pour utilisation dans Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { applyAccessibilityImprovements, updateJavaScriptForAria };
}


