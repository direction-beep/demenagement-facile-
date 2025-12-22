// Script pour appliquer les améliorations de lisibilité
// Ce script peut être exécuté dans la console du navigateur

function applyReadabilityImprovements() {
    console.log('📖 Application des améliorations de lisibilité...');
    
    // 1. Appliquer la classe text-content aux sections de texte long
    const textSections = document.querySelectorAll('p, .mission-content, .vision-content, .about-content, .service-description, .testimonial-quote');
    textSections.forEach(section => {
        if (section.textContent.length > 100) { // Seulement pour les textes longs
            section.classList.add('text-content');
        }
    });
    
    // 2. Améliorer les listes
    const lists = document.querySelectorAll('ul, ol');
    lists.forEach(list => {
        list.style.lineHeight = '1.7';
        list.style.fontSize = '1.125rem';
        list.style.color = 'var(--color-gray)';
    });
    
    // 3. Améliorer les éléments de navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.style.fontSize = '1rem';
        link.style.letterSpacing = '0.01em';
        link.style.padding = '0.5rem 1rem';
    });
    
    // 4. Améliorer les boutons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.style.fontSize = '1.125rem';
        button.style.lineHeight = '1.4';
        button.style.letterSpacing = '0.01em';
    });
    
    // 5. Améliorer les titres
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(heading => {
        heading.style.letterSpacing = '-0.02em';
        heading.style.lineHeight = '1.3';
    });
    
    // 6. Améliorer les paragraphes
    const paragraphs = document.querySelectorAll('p');
    paragraphs.forEach(p => {
        if (p.textContent.length > 50) {
            p.style.lineHeight = '1.8';
            p.style.fontSize = '1.125rem';
            p.style.color = 'var(--color-gray)';
        }
    });
    
    // 7. Améliorer les descriptions de services
    const serviceDescriptions = document.querySelectorAll('.service-description');
    serviceDescriptions.forEach(desc => {
        desc.style.lineHeight = '1.7';
        desc.style.fontSize = '1.125rem';
    });
    
    // 8. Améliorer les témoignages
    const testimonialTexts = document.querySelectorAll('.testimonial-quote, .testimonial-text');
    testimonialTexts.forEach(text => {
        text.style.lineHeight = '1.7';
        text.style.fontSize = '1.125rem';
    });
    
    // 9. Améliorer les sections de contenu
    const contentSections = document.querySelectorAll('.mission-content, .vision-content, .about-content, .values-content');
    contentSections.forEach(section => {
        section.style.maxWidth = '75ch';
        section.style.margin = '0 auto';
    });
    
    // 10. Améliorer la lisibilité générale
    document.body.style.fontSmoothing = 'antialiased';
    document.body.style.webkitFontSmoothing = 'antialiased';
    document.body.style.mozOsxFontSmoothing = 'grayscale';
    
    console.log('✅ Améliorations de lisibilité appliquées avec succès !');
}

// Exécuter automatiquement
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', applyReadabilityImprovements);
}

// Export pour utilisation dans Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { applyReadabilityImprovements };
}


