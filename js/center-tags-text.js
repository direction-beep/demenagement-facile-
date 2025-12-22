// Script pour centrer parfaitement le texte dans les tags
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 Script de centrage des tags chargé');
    
    // Attendre que le contenu soit chargé
    setTimeout(function() {
        centerTagsText();
    }, 100);
});

function centerTagsText() {
    console.log('🎯 Début du centrage des tags');
    
    // Sélectionner tous les tags
    const featureTags = document.querySelectorAll('.feature-tag');
    console.log(`🏷️ ${featureTags.length} tags trouvés`);
    
    featureTags.forEach((tag, index) => {
        console.log(`🔧 Centrage du tag ${index + 1}: "${tag.textContent}"`);
        
        // Forcer le centrage parfait
        tag.style.display = 'flex';
        tag.style.alignItems = 'center';
        tag.style.justifyContent = 'center';
        tag.style.textAlign = 'center';
        tag.style.lineHeight = '1';
        tag.style.height = 'auto';
        tag.style.minHeight = '48px';
        
        // S'assurer que le contenu est centré
        const textContent = tag.textContent.trim();
        if (textContent) {
            // Créer un span pour le texte si nécessaire
            if (tag.children.length === 0) {
                const span = document.createElement('span');
                span.textContent = textContent;
                span.style.display = 'block';
                span.style.width = '100%';
                span.style.textAlign = 'center';
                span.style.lineHeight = '1';
                tag.innerHTML = '';
                tag.appendChild(span);
            }
        }
        
        console.log(`✅ Tag ${index + 1} centré: "${tag.textContent}"`);
    });
    
    console.log('🎉 Centrage des tags terminé');
}

// Réexécuter le centrage si nécessaire
window.addEventListener('resize', function() {
    setTimeout(centerTagsText, 100);
});

// Observer les changements dans le DOM
if (window.MutationObserver) {
    const observer = new MutationObserver(function(mutations) {
        let shouldRecenter = false;
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                shouldRecenter = true;
            }
        });
        if (shouldRecenter) {
            setTimeout(centerTagsText, 100);
        }
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}


