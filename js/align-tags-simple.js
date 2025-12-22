// Script simple pour aligner les tags des cartes d'avantages
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Script d\'alignement des tags chargé');
    
    // Attendre que le contenu soit chargé
    setTimeout(function() {
        alignTags();
    }, 100);
});

function alignTags() {
    console.log('🎯 Début de l\'alignement des tags');
    
    // Sélectionner toutes les cartes d'avantages
    const advantageCards = document.querySelectorAll('.advantage-card');
    console.log(`📊 ${advantageCards.length} cartes d'avantages trouvées`);
    
    advantageCards.forEach((card, index) => {
        console.log(`🔧 Traitement de la carte ${index + 1}`);
        
        // S'assurer que la carte utilise flexbox
        card.style.display = 'flex';
        card.style.flexDirection = 'column';
        card.style.justifyContent = 'space-between';
        card.style.alignItems = 'center';
        card.style.height = '800px';
        card.style.padding = '4rem';
        
        // Trouver le conteneur de tags
        const cardFeatures = card.querySelector('.card-features');
        if (cardFeatures) {
            console.log(`✅ Conteneur de tags trouvé pour la carte ${index + 1}`);
            
            // Configurer le conteneur de tags
            cardFeatures.style.display = 'flex';
            cardFeatures.style.flexDirection = 'column';
            cardFeatures.style.gap = '16px';
            cardFeatures.style.alignItems = 'center';
            cardFeatures.style.justifyContent = 'center';
            cardFeatures.style.marginTop = 'auto';
            cardFeatures.style.paddingTop = '32px';
            cardFeatures.style.width = '100%';
            cardFeatures.style.opacity = '1';
            cardFeatures.style.visibility = 'visible';
            cardFeatures.style.minHeight = '120px';
            
            // Configurer les tags individuels
            const tags = cardFeatures.querySelectorAll('.feature-tag');
            tags.forEach((tag, tagIndex) => {
                console.log(`🏷️ Configuration du tag ${tagIndex + 1}: "${tag.textContent}"`);
                
                tag.style.display = 'flex';
                tag.style.width = '220px';
                tag.style.maxWidth = '220px';
                tag.style.textAlign = 'center';
                tag.style.whiteSpace = 'nowrap';
                tag.style.overflow = 'hidden';
                tag.style.textOverflow = 'ellipsis';
                tag.style.margin = '0 auto';
                tag.style.opacity = '1';
                tag.style.visibility = 'visible';
                tag.style.background = 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)';
                tag.style.color = '#0e4580';
                tag.style.padding = '20px 28px';
                tag.style.borderRadius = '30px';
                tag.style.fontSize = '1.2rem';
                tag.style.fontWeight = '700';
                tag.style.border = '2px solid rgba(14, 69, 128, 0.3)';
                tag.style.boxShadow = '0 4px 15px rgba(14, 69, 128, 0.2)';
                tag.style.transition = 'all 0.3s ease';
                tag.style.alignItems = 'center';
                tag.style.justifyContent = 'center';
                tag.style.lineHeight = '1';
            });
            
            console.log(`✅ ${tags.length} tags configurés pour la carte ${index + 1}`);
        } else {
            console.log(`❌ Aucun conteneur de tags trouvé pour la carte ${index + 1}`);
        }
    });
    
    console.log('🎉 Alignement des tags terminé');
}

// Réexécuter l'alignement si nécessaire
window.addEventListener('resize', function() {
    setTimeout(alignTags, 100);
});

// Observer les changements dans le DOM
if (window.MutationObserver) {
    const observer = new MutationObserver(function(mutations) {
        let shouldRealign = false;
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                shouldRealign = true;
            }
        });
        if (shouldRealign) {
            setTimeout(alignTags, 100);
        }
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}
