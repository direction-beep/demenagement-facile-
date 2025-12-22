// Force visibility of all bullets on service-client.html
console.log('🔧 Force Service Client Bullets - Starting...');

// Wait for DOM to be ready
setTimeout(() => {
    console.log('🔧 DOM ready, processing bullets...');
    
    // Target all expertise bullets
    const expertiseBullets = document.querySelectorAll('.expertise-bullets');
    console.log(`🔧 Found ${expertiseBullets.length} expertise-bullets containers`);
    
    expertiseBullets.forEach((container, index) => {
        console.log(`🔧 Processing container ${index + 1}`);
        
        // Force container visibility
        container.style.cssText = `
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
        `;
        
        // Force all child divs visibility
        const bullets = container.querySelectorAll('div');
        console.log(`🔧 Container ${index + 1} has ${bullets.length} bullet points`);
        
        bullets.forEach((bullet, bulletIndex) => {
            console.log(`🔧 Processing bullet ${bulletIndex + 1}: "${bullet.textContent.trim()}"`);
            
            bullet.style.cssText = `
                color: #0e4580 !important;
                font-size: 0.85rem !important;
                font-weight: 500 !important;
                line-height: 1.4 !important;
                margin-bottom: 4px !important;
                padding: 0 !important;
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
            
            // Force the text content to be visible
            bullet.innerHTML = bullet.textContent;
        });
    });
    
    // Also check for any remaining card-features and convert them
    const cardFeatures = document.querySelectorAll('.card-features');
    console.log(`🔧 Found ${cardFeatures.length} old card-features to convert`);
    
    cardFeatures.forEach((features, index) => {
        console.log(`🔧 Converting card-features ${index + 1}`);
        
        const parent = features.parentElement;
        const tags = features.querySelectorAll('.feature-tag');
        
        if (tags.length > 0) {
            // Create new bullets container
            const newBullets = document.createElement('div');
            newBullets.className = 'expertise-bullets';
            newBullets.style.cssText = `
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
            `;
            
            // Convert each tag to a bullet
            tags.forEach(tag => {
                const bullet = document.createElement('div');
                bullet.textContent = '• ' + tag.textContent;
                bullet.style.cssText = `
                    color: #0e4580 !important;
                    font-size: 0.85rem !important;
                    font-weight: 500 !important;
                    line-height: 1.4 !important;
                    margin-bottom: 4px !important;
                    padding: 0 !important;
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
                newBullets.appendChild(bullet);
            });
            
            // Replace old features with new bullets
            parent.replaceChild(newBullets, features);
        }
    });
    
    console.log('🎉 Force Service Client Bullets completed!');
    
    // Final check
    const finalBullets = document.querySelectorAll('.expertise-bullets div');
    console.log(`🔧 Final count: ${finalBullets.length} bullet points found`);
    finalBullets.forEach((bullet, index) => {
        console.log(`🔧 Bullet ${index + 1}: "${bullet.textContent.trim()}"`);
    });
    
}, 100);

