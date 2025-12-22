// Fix missing bullet point in service-client.html
console.log('🔧 Fix Missing Bullet - Starting...');

// Wait for DOM to be ready
setTimeout(() => {
    console.log('🔧 DOM ready, fixing missing bullet...');
    
    // Find the first expertise card (Professionnels dédiés)
    const expertiseCards = document.querySelectorAll('.expertise-card');
    console.log(`🔧 Found ${expertiseCards.length} expertise cards`);
    
    if (expertiseCards.length > 0) {
        const firstCard = expertiseCards[0];
        console.log('🔧 Processing first card (Professionnels dédiés)');
        
        // Force card to have enough height
        firstCard.style.cssText = `
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
        
        // Find the bullets container
        const bulletsContainer = firstCard.querySelector('.expertise-bullets');
        if (bulletsContainer) {
            console.log('🔧 Found bullets container, forcing visibility...');
            
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
                background: transparent !important;
                border: none !important;
                outline: none !important;
                min-height: 100px !important;
                height: auto !important;
            `;
            
            // Force all bullet points visibility
            const bullets = bulletsContainer.querySelectorAll('div');
            console.log(`🔧 Found ${bullets.length} bullet points`);
            
            bullets.forEach((bullet, index) => {
                console.log(`🔧 Processing bullet ${index + 1}: "${bullet.textContent.trim()}"`);
                
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
            });
            
            // If we don't have 3 bullets, add the missing one
            if (bullets.length < 3) {
                console.log('🔧 Adding missing bullet point...');
                const missingBullet = document.createElement('div');
                missingBullet.textContent = '• Écoute active';
                missingBullet.style.cssText = `
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
                bulletsContainer.appendChild(missingBullet);
            }
        } else {
            console.log('🔧 No bullets container found, creating one...');
            
            // Create bullets container
            const bulletsContainer = document.createElement('div');
            bulletsContainer.className = 'expertise-bullets';
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
                background: transparent !important;
                border: none !important;
                outline: none !important;
                min-height: 100px !important;
                height: auto !important;
            `;
            
            // Add all three bullet points
            const bulletTexts = ['• Formation spécialisée', '• Gestion des réclamations', '• Écoute active'];
            
            bulletTexts.forEach(text => {
                const bullet = document.createElement('div');
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
            
            // Add to card
            firstCard.appendChild(bulletsContainer);
        }
    }
    
    console.log('🎉 Fix Missing Bullet completed!');
    
    // Final verification
    const finalBullets = document.querySelectorAll('.expertise-card:first-child .expertise-bullets div');
    console.log(`🔧 Final verification: ${finalBullets.length} bullet points found`);
    finalBullets.forEach((bullet, index) => {
        console.log(`🔧 Bullet ${index + 1}: "${bullet.textContent.trim()}"`);
    });
    
}, 200);

