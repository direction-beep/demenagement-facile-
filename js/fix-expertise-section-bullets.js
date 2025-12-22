// Fix bullets in the "Notre expertise" section
console.log('🔧 Fix Expertise Section Bullets - Starting...');

// Wait for DOM to be ready
setTimeout(() => {
    console.log('🔧 DOM ready, fixing expertise section bullets...');
    
    // Find the expertise section (the second one, not the first)
    const expertiseSections = document.querySelectorAll('.expertise-section');
    console.log(`🔧 Found ${expertiseSections.length} expertise sections`);
    
    if (expertiseSections.length > 1) {
        const targetSection = expertiseSections[1]; // Second section
        console.log('🔧 Processing second expertise section');
        
        // Find all expertise cards in this section
        const expertiseCards = targetSection.querySelectorAll('.expertise-card');
        console.log(`🔧 Found ${expertiseCards.length} expertise cards`);
        
        expertiseCards.forEach((card, cardIndex) => {
            console.log(`🔧 Processing card ${cardIndex + 1}`);
            
            // Force card height
            card.style.cssText = `
                background: var(--color-white) !important;
                padding: var(--spacing-xl) !important;
                border-radius: var(--border-radius) !important;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08) !important;
                transition: all 0.3s ease !important;
                border: 1px solid rgba(14, 69, 128, 0.1) !important;
                position: relative !important;
                overflow: visible !important;
                display: flex !important;
                flex-direction: column !important;
                min-height: 450px !important;
                height: auto !important;
            `;
            
            // Find bullets container
            let bulletsContainer = card.querySelector('.expertise-bullets');
            
            if (!bulletsContainer) {
                console.log(`🔧 No bullets container found in card ${cardIndex + 1}, creating one...`);
                bulletsContainer = document.createElement('div');
                bulletsContainer.className = 'expertise-bullets';
                card.appendChild(bulletsContainer);
            }
            
            // Force container visibility
            bulletsContainer.style.cssText = `
                margin: 16px 0 0 0 !important;
                padding: 0 !important;
                display: flex !important;
                flex-direction: column !important;
                gap: 8px !important;
                align-items: flex-start !important;
                text-align: left !important;
                width: 100% !important;
                visibility: visible !important;
                opacity: 1 !important;
                position: relative !important;
                z-index: 10 !important;
                min-height: 80px !important;
                height: auto !important;
            `;
            
            // Get card title to determine bullet content
            const cardTitle = card.querySelector('h3');
            const titleText = cardTitle ? cardTitle.textContent.trim() : '';
            console.log(`🔧 Card title: "${titleText}"`);
            
            // Define bullet points based on card title
            let bulletTexts = [];
            if (titleText.includes('Professionnels dédiés')) {
                bulletTexts = ['• Professionnels expérimentés', '• Techniques de communication', '• Écoute active'];
            } else if (titleText.includes('Disponibilité')) {
                bulletTexts = ['• Réponse rapide', '• Efficacité', '• Disponibilité totale'];
            } else if (titleText.includes('Suivi qualité')) {
                bulletTexts = ['• Indicateurs clés', '• Optimisation qualité', '• Mesure continue'];
            } else {
                bulletTexts = ['• Point 1', '• Point 2', '• Point 3'];
            }
            
            // Clear existing bullets and add new ones
            bulletsContainer.innerHTML = '';
            
            bulletTexts.forEach((text, bulletIndex) => {
                console.log(`🔧 Adding bullet ${bulletIndex + 1}: "${text}"`);
                const bullet = document.createElement('div');
                bullet.className = 'expertise-bullet';
                bullet.textContent = text;
                bullet.style.cssText = `
                    color: #0e4580 !important;
                    font-size: 0.85rem !important;
                    font-weight: 500 !important;
                    line-height: 1.4 !important;
                    margin-bottom: 8px !important;
                    padding: 4px 0 !important;
                    display: block !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                    width: 100% !important;
                    position: relative !important;
                    z-index: 10 !important;
                    background: transparent !important;
                    border: none !important;
                    outline: none !important;
                    height: auto !important;
                    min-height: 20px !important;
                    overflow: visible !important;
                `;
                bulletsContainer.appendChild(bullet);
            });
        });
    }
    
    console.log('🎉 Fix Expertise Section Bullets completed!');
    
    // Final verification
    const finalBullets = document.querySelectorAll('.expertise-section:nth-child(2) .expertise-bullet');
    console.log(`🔧 Final verification: ${finalBullets.length} bullet points found in expertise section`);
    finalBullets.forEach((bullet, index) => {
        console.log(`🔧 Bullet ${index + 1}: "${bullet.textContent.trim()}"`);
    });
    
}, 300);

