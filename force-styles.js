// Script pour forcer l'application des styles
document.addEventListener('DOMContentLoaded', function() {
    // Forcer le style gras et visible pour "15 ans d'expérience"
    const badgeText = document.querySelector('.badge-text strong');
    const heroBadge = document.querySelector('.hero-badge');
    
    if (badgeText) {
        badgeText.style.fontWeight = '700';
        badgeText.style.color = '#ffffff';
        badgeText.style.fontSize = '1rem';
        badgeText.style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.2)';
        console.log('Style gras et visible appliqué au badge');
    }
    
        if (heroBadge) {
            heroBadge.style.background = 'linear-gradient(135deg, #0e4580 0%, #d03840 100%)';
            heroBadge.style.color = '#ffffff';
            heroBadge.style.padding = '0.4rem 1rem';
            heroBadge.style.borderRadius = '18px';
            heroBadge.style.fontSize = '0.85rem';
            heroBadge.style.fontWeight = '600';
            heroBadge.style.boxShadow = '0 2px 10px rgba(14, 69, 128, 0.3)';
            heroBadge.style.display = 'block';
            heroBadge.style.textAlign = 'center';
            heroBadge.style.marginLeft = 'auto';
            heroBadge.style.marginRight = 'auto';
            heroBadge.style.width = 'fit-content';
            heroBadge.style.position = 'relative';
            heroBadge.style.top = '0';
            heroBadge.style.marginBottom = '0.5rem';
            console.log('Style du badge ultra-compact centré au-dessus du titre');
        }
    
    // Vérifier et forcer le titre sur deux lignes
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titleText = heroTitle.innerHTML;
        if (titleText.includes('<br>')) {
            console.log('Titre correctement divisé en deux lignes');
            // Forcer les styles pour un bon affichage sur deux lignes
            heroTitle.style.whiteSpace = 'normal';
            heroTitle.style.maxWidth = '100%';
            heroTitle.style.lineHeight = '1.05';
            heroTitle.style.fontSize = 'clamp(1.8rem, 3.5vw, 2.8rem)';
            heroTitle.style.textAlign = 'left';
        } else {
            console.log('Problème: le titre n\'est pas sur deux lignes');
        }
    }
    
        // Vérifier le bouton dans les témoignages
        const testimonialsCta = document.querySelector('.testimonials-cta');
        if (testimonialsCta) {
            console.log('Bouton déplacé dans la section témoignages');
        }

        // Centrer les icônes des services
        const serviceIcons = document.querySelectorAll('.service-icon i');
        serviceIcons.forEach(icon => {
            icon.style.position = 'absolute';
            icon.style.top = '50%';
            icon.style.left = '50%';
            icon.style.transform = 'translate(-50%, -50%)';
            icon.style.fontSize = '2rem';
            icon.style.color = '#ffffff';
            console.log('Icône centrée:', icon.className);
        });

        // Centrer et aligner les icônes des fonctionnalités (forme ronde)
        const featureIcons = document.querySelectorAll('.feature-icon');
        featureIcons.forEach(icon => {
            icon.style.width = '80px';
            icon.style.height = '80px';
            icon.style.background = 'linear-gradient(135deg, #0e4580 0%, #d03840 100%)';
            icon.style.borderRadius = '50%';
            icon.style.display = 'flex';
            icon.style.justifyContent = 'center';
            icon.style.alignItems = 'center';
            icon.style.margin = '0 auto 1rem';
            icon.style.fontSize = '2.5rem';
            icon.style.color = '#ffffff';
            icon.style.boxShadow = '0 4px 15px rgba(14, 69, 128, 0.3)';
            console.log('Icône de fonctionnalité ronde centrée:', icon.className);
        });

        // Centrer les cartes de fonctionnalités
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach(card => {
            card.style.display = 'flex';
            card.style.flexDirection = 'column';
            card.style.alignItems = 'center';
            card.style.justifyContent = 'center';
            card.style.textAlign = 'center';
            console.log('Carte de fonctionnalité centrée');
        });

        // Améliorer la lisibilité du texte "Nos bureaux en France"
        const whyPlaceholderText = document.querySelector('.why-placeholder p');
        const whyPlaceholderIcon = document.querySelector('.why-placeholder .about-icon');
        
        if (whyPlaceholderText) {
            whyPlaceholderText.style.color = '#ffffff';
            whyPlaceholderText.style.textShadow = '0 2px 4px rgba(0, 0, 0, 0.3)';
            whyPlaceholderText.style.fontWeight = '500';
            console.log('Texte "Nos bureaux en France" rendu lisible');
        }
        
        if (whyPlaceholderIcon) {
            whyPlaceholderIcon.style.color = '#ffffff';
            whyPlaceholderIcon.style.textShadow = '0 2px 4px rgba(0, 0, 0, 0.3)';
            console.log('Icône "Nos bureaux en France" rendue visible');
        }

        // Aligner à gauche le sous-titre et la description
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) {
            heroSubtitle.style.textAlign = 'left';
            console.log('Sous-titre hero aligné à gauche');
        }

        const heroDescription = document.querySelector('.hero-description');
        if (heroDescription) {
            heroDescription.style.textAlign = 'left';
            heroDescription.style.marginLeft = '0';
            heroDescription.style.marginRight = 'auto';
            console.log('Description hero alignée à gauche');
        }
});
