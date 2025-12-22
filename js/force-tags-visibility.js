document.addEventListener('DOMContentLoaded', function() {
    // Forcer la visibilité des tags
    const featureTags = document.querySelectorAll('.feature-tag');
    featureTags.forEach(tag => {
        tag.style.display = 'inline-block';
        tag.style.opacity = '1';
        tag.style.visibility = 'visible';
        tag.style.background = 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)';
        tag.style.color = '#0e4580';
        tag.style.padding = '8px 16px';
        tag.style.borderRadius = '25px';
        tag.style.fontSize = '0.85rem';
        tag.style.fontWeight = '600';
        tag.style.border = '2px solid rgba(14, 69, 128, 0.3)';
        tag.style.textAlign = 'center';
        tag.style.width = 'fit-content';
        tag.style.maxWidth = '100%';
        tag.style.whiteSpace = 'nowrap';
        tag.style.overflow = 'visible';
        tag.style.textOverflow = 'unset';
        tag.style.boxShadow = '0 2px 8px rgba(14, 69, 128, 0.1)';
        tag.style.margin = '0 auto';
        console.log('Tag forcé visible:', tag.textContent);
    });

    // Forcer la visibilité et l'alignement des conteneurs de tags
    const cardFeatures = document.querySelectorAll('.card-features');
    cardFeatures.forEach(container => {
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.gap = '12px';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'center';
        container.style.marginTop = 'auto';
        container.style.paddingTop = '24px';
        container.style.width = '100%';
        container.style.opacity = '1';
        container.style.visibility = 'visible';
        console.log('Conteneur de tags aligné avec flexbox');
    });

    // Forcer l'alignement des tags
    const featureTags = document.querySelectorAll('.feature-tag');
    featureTags.forEach(tag => {
        tag.style.width = '180px';
        tag.style.maxWidth = '180px';
        tag.style.display = 'flex';
        tag.style.alignItems = 'center';
        tag.style.justifyContent = 'center';
        tag.style.margin = '0 auto';
        console.log('Tag aligné:', tag.textContent);
    });

    // Vérifier que les cartes de secteurs ont la bonne structure
    const sectorCards = document.querySelectorAll('.sector-card');
    sectorCards.forEach(card => {
        card.style.display = 'flex';
        card.style.flexDirection = 'column';
        card.style.justifyContent = 'flex-start';
        card.style.minHeight = '350px';
        card.style.height = 'auto';
        card.style.overflow = 'visible';
        console.log('Carte de secteur adaptée au contenu');
    });

    // Vérifier que les cartes d'avantages ont la bonne structure
    const advantageCards = document.querySelectorAll('.advantage-card');
    advantageCards.forEach(card => {
        card.style.display = 'flex';
        card.style.flexDirection = 'column';
        card.style.justifyContent = 'space-between';
        card.style.height = '600px';
        card.style.padding = '3rem';
        card.style.overflow = 'visible';
        card.style.alignItems = 'stretch';
        console.log('Carte d\'avantage ultra-agrandie et alignée');
    });

    // Améliorer la visibilité des icônes
    const cardIcons = document.querySelectorAll('.advantage-card .card-icon');
    cardIcons.forEach(icon => {
        icon.style.fontSize = '4rem';
        icon.style.color = '#ffffff';
        icon.style.background = 'linear-gradient(135deg, #0e4580 0%, #d03840 100%)';
        icon.style.width = '100px';
        icon.style.height = '100px';
        icon.style.borderRadius = '50%';
        icon.style.display = 'flex';
        icon.style.alignItems = 'center';
        icon.style.justifyContent = 'center';
        icon.style.margin = '0 auto 2rem';
        icon.style.boxShadow = '0 8px 25px rgba(14, 69, 128, 0.3)';
        icon.style.transition = 'all 0.3s ease';
        console.log('Icône ultra-visible et stylée');
    });

    // Vérifier que les cartes de fonctionnalités ont la bonne structure
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.style.display = 'flex';
        card.style.flexDirection = 'column';
        card.style.alignItems = 'center';
        card.style.justifyContent = 'flex-start';
        card.style.minHeight = '300px';
        card.style.height = 'auto';
        card.style.overflow = 'visible';
        console.log('Carte de fonctionnalité adaptée au contenu');
    });

    console.log('Script de visibilité des tags exécuté');
});
