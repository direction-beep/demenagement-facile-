// Force bullets final solution
console.log('🔧 Force bullets script STARTING');

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Force bullets script loaded - DOM ready');
    
    // Find all expertise cards
    const expertiseCards = document.querySelectorAll('.expertise-card');
    console.log('📋 Found expertise cards:', expertiseCards.length);
    
    expertiseCards.forEach(function(card, index) {
        console.log('🔧 Processing expertise card', index);
        
        // Find the bullet container - try multiple selectors
        let bulletContainer = card.querySelector('div[style*="margin: 16px 0 0 0"]');
        if (!bulletContainer) {
            bulletContainer = card.querySelector('div[style*="display: flex"]');
        }
        if (!bulletContainer) {
            bulletContainer = card.querySelector('div[style*="flex-direction: column"]');
        }
        
        if (bulletContainer) {
            console.log('✅ Found bullet container in card', index);
            
            // Force visibility
            bulletContainer.style.display = 'flex !important';
            bulletContainer.style.visibility = 'visible !important';
            bulletContainer.style.opacity = '1 !important';
            bulletContainer.style.margin = '16px 0 0 0 !important';
            bulletContainer.style.padding = '0 !important';
            bulletContainer.style.flexDirection = 'column !important';
            bulletContainer.style.gap = '8px !important';
            bulletContainer.style.alignItems = 'flex-start !important';
            bulletContainer.style.textAlign = 'left !important';
            bulletContainer.style.width = '100% !important';
            
            // Force visibility of each bullet item
            const bulletItems = bulletContainer.querySelectorAll('div[style*="color: #0e4580"]');
            console.log('🏷️ Found bullet items:', bulletItems.length);
            
            bulletItems.forEach(function(item, itemIndex) {
                console.log('🔧 Processing bullet item', itemIndex, 'in card', index);
                
                item.style.display = 'block !important';
                item.style.visibility = 'visible !important';
                item.style.opacity = '1 !important';
                item.style.color = '#0e4580 !important';
                item.style.fontSize = '0.85rem !important';
                item.style.fontWeight = '500 !important';
                item.style.lineHeight = '1.4 !important';
                item.style.marginBottom = '4px !important';
                item.style.padding = '0 !important';
                item.style.width = '100% !important';
                
                // Make sure the text content is visible
                if (item.textContent && item.textContent.trim()) {
                    console.log('✅ Bullet item text:', item.textContent.trim());
                } else {
                    console.log('❌ Bullet item has no text content');
                }
            });
        } else {
            console.log('❌ No bullet container found in card', index);
            
            // Try to find any div with bullet points
            const allDivs = card.querySelectorAll('div');
            console.log('🔍 All divs in card', index, ':', allDivs.length);
            allDivs.forEach(function(div, divIndex) {
                if (div.textContent && div.textContent.includes('•')) {
                    console.log('🎯 Found div with bullet:', div.textContent.trim());
                }
            });
        }
    });
    
    // Additional check after a short delay
    setTimeout(function() {
        console.log('🔍 Final check for bullets');
        const allBullets = document.querySelectorAll('div[style*="color: #0e4580"]');
        console.log('📊 Total bullet elements found:', allBullets.length);
        
        allBullets.forEach(function(bullet, index) {
            console.log('🏷️ Bullet', index, ':', bullet.textContent, 'Visible:', bullet.offsetParent !== null);
        });
        
        // Also check for any text containing bullet points
        const allText = document.querySelectorAll('*');
        let bulletCount = 0;
        allText.forEach(function(element) {
            if (element.textContent && element.textContent.includes('•')) {
                bulletCount++;
                console.log('🎯 Found element with bullet:', element.textContent.trim().substring(0, 50));
            }
        });
        console.log('📊 Total elements with bullets:', bulletCount);
        
        // Force visibility of expertise bullets specifically
        const expertiseBullets = document.querySelectorAll('.expertise-bullet');
        console.log('🔧 Found expertise bullets:', expertiseBullets.length);
        
        expertiseBullets.forEach(function(bullet, index) {
            console.log('🔧 Processing expertise bullet', index, ':', bullet.textContent.trim());
            
            // Force all visibility properties
            bullet.style.display = 'block !important';
            bullet.style.visibility = 'visible !important';
            bullet.style.opacity = '1 !important';
            bullet.style.color = '#0e4580 !important';
            bullet.style.fontSize = '0.85rem !important';
            bullet.style.fontWeight = '500 !important';
            bullet.style.lineHeight = '1.4 !important';
            bullet.style.marginBottom = '4px !important';
            bullet.style.padding = '0 !important';
            bullet.style.width = '100% !important';
            bullet.style.position = 'relative !important';
            bullet.style.zIndex = '10 !important';
            
            console.log('✅ Expertise bullet', index, 'processed');
        });
        
        // Also force the container
        const expertiseBulletsContainers = document.querySelectorAll('.expertise-bullets');
        console.log('🔧 Found expertise bullets containers:', expertiseBulletsContainers.length);
        
        expertiseBulletsContainers.forEach(function(container, index) {
            console.log('🔧 Processing container', index);
            
            container.style.display = 'flex !important';
            container.style.visibility = 'visible !important';
            container.style.opacity = '1 !important';
            container.style.margin = '16px 0 0 0 !important';
            container.style.padding = '0 !important';
            container.style.flexDirection = 'column !important';
            container.style.gap = '8px !important';
            container.style.alignItems = 'flex-start !important';
            container.style.textAlign = 'left !important';
            container.style.width = '100% !important';
            container.style.position = 'relative !important';
            container.style.zIndex = '10 !important';
            
            console.log('✅ Container', index, 'processed');
        });
    }, 1000);
});
