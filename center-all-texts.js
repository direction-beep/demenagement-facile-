// Script pour centrer automatiquement tous les textes descriptifs
// Ce script peut être exécuté dans la console du navigateur

function centerAllTexts() {
    console.log('🎯 Centrage de tous les textes descriptifs...');
    
    // 1. Centrer tous les paragraphes descriptifs
    const descriptiveParagraphs = document.querySelectorAll('p');
    descriptiveParagraphs.forEach(p => {
        // Vérifier si c'est un paragraphe descriptif (pas dans un formulaire ou une liste)
        if (!p.closest('form') && !p.closest('ul') && !p.closest('ol') && !p.closest('li')) {
            if (p.textContent.length > 30 && p.textContent.length < 200) {
                p.style.textAlign = 'center';
                p.style.marginLeft = 'auto';
                p.style.marginRight = 'auto';
            }
        }
    });
    
    // 2. Centrer les descriptions de sections
    const sectionDescriptions = document.querySelectorAll('.section-description, .section-subtitle');
    sectionDescriptions.forEach(desc => {
        desc.style.textAlign = 'center';
        desc.style.marginLeft = 'auto';
        desc.style.marginRight = 'auto';
    });
    
    // 3. Centrer les descriptions hero
    const heroDescriptions = document.querySelectorAll('.hero-description, .hero-subtitle');
    heroDescriptions.forEach(desc => {
        desc.style.textAlign = 'center';
        desc.style.marginLeft = 'auto';
        desc.style.marginRight = 'auto';
    });
    
    // 4. Centrer les descriptions de services
    const serviceDescriptions = document.querySelectorAll('.service-description');
    serviceDescriptions.forEach(desc => {
        desc.style.textAlign = 'center';
        desc.style.marginLeft = 'auto';
        desc.style.marginRight = 'auto';
    });
    
    // 5. Centrer les témoignages
    const testimonialTexts = document.querySelectorAll('.testimonial-quote, .testimonial-text');
    testimonialTexts.forEach(text => {
        text.style.textAlign = 'center';
        text.style.marginLeft = 'auto';
        text.style.marginRight = 'auto';
    });
    
    // 6. Centrer les textes dans les cartes
    const cardTexts = document.querySelectorAll('.card p, .service-card p, .testimonial-card p');
    cardTexts.forEach(text => {
        if (text.textContent.length > 20) {
            text.style.textAlign = 'center';
            text.style.marginLeft = 'auto';
            text.style.marginRight = 'auto';
        }
    });
    
    // 7. Centrer les textes dans les sections about
    const aboutTexts = document.querySelectorAll('.mission-text, .vision-text, .values-description, .team-description');
    aboutTexts.forEach(text => {
        text.style.textAlign = 'center';
        text.style.marginLeft = 'auto';
        text.style.marginRight = 'auto';
    });
    
    // 8. Centrer les textes dans les sections carrières
    const careerTexts = document.querySelectorAll('.career-description, .process-description, .advantage-description');
    careerTexts.forEach(text => {
        text.style.textAlign = 'center';
        text.style.marginLeft = 'auto';
        text.style.marginRight = 'auto';
    });
    
    // 9. Centrer les textes dans les sections contact
    const contactTexts = document.querySelectorAll('.contact-description, .faq-description');
    contactTexts.forEach(text => {
        text.style.textAlign = 'center';
        text.style.marginLeft = 'auto';
        text.style.marginRight = 'auto';
    });
    
    // 10. Centrer les textes dans les sections de services
    const servicePageTexts = document.querySelectorAll('.requirement-description, .criterion-description, .step-description');
    servicePageTexts.forEach(text => {
        text.style.textAlign = 'center';
        text.style.marginLeft = 'auto';
        text.style.marginRight = 'auto';
    });
    
    // 11. Centrer les textes dans les sections de témoignages
    const testimonialSectionTexts = document.querySelectorAll('.testimonial-description, .case-description');
    testimonialSectionTexts.forEach(text => {
        text.style.textAlign = 'center';
        text.style.marginLeft = 'auto';
        text.style.marginRight = 'auto';
    });
    
    // 12. Centrer les textes dans les sections de valeurs
    const valuesTexts = document.querySelectorAll('.value-description, .advantage-description');
    valuesTexts.forEach(text => {
        text.style.textAlign = 'center';
        text.style.marginLeft = 'auto';
        text.style.marginRight = 'auto';
    });
    
    // 13. Centrer les textes dans les sections de processus
    const processTexts = document.querySelectorAll('.process-description, .step-description');
    processTexts.forEach(text => {
        text.style.textAlign = 'center';
        text.style.marginLeft = 'auto';
        text.style.marginRight = 'auto';
    });
    
    // 14. Centrer les textes dans les sections de compétences
    const skillsTexts = document.querySelectorAll('.skill-description, .competence-description');
    skillsTexts.forEach(text => {
        text.style.textAlign = 'center';
        text.style.marginLeft = 'auto';
        text.style.marginRight = 'auto';
    });
    
    // 15. Centrer les textes dans les sections de résultats
    const resultsTexts = document.querySelectorAll('.result-description, .performance-description');
    resultsTexts.forEach(text => {
        text.style.textAlign = 'center';
        text.style.marginLeft = 'auto';
        text.style.marginRight = 'auto';
    });
    
    console.log('✅ Tous les textes descriptifs ont été centrés !');
    
    // Afficher un résumé
    const centeredElements = document.querySelectorAll('[style*="text-align: center"]');
    console.log(`📊 ${centeredElements.length} éléments de texte ont été centrés`);
}

// Exécuter automatiquement
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', centerAllTexts);
}

// Export pour utilisation dans Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { centerAllTexts };
}


