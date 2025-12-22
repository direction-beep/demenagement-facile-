// Fix expertise section visibility
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Fix expertise section script loaded');
    
    setTimeout(function() {
        console.log('🔍 Fixing expertise section visibility...');
        
        // Find the expertise section
        const expertiseSection = document.querySelector('.expertise-section');
        if (expertiseSection) {
            console.log('✅ Found expertise section');
            
            // Force visibility of the section
            expertiseSection.style.display = 'block !important';
            expertiseSection.style.visibility = 'visible !important';
            expertiseSection.style.opacity = '1 !important';
            expertiseSection.style.position = 'relative !important';
            expertiseSection.style.zIndex = '1 !important';
            expertiseSection.style.background = '#ffffff !important';
            expertiseSection.style.padding = '80px 0 !important';
            expertiseSection.style.margin = '0 !important';
            expertiseSection.style.width = '100% !important';
            expertiseSection.style.height = 'auto !important';
            expertiseSection.style.overflow = 'visible !important';
            
            console.log('✅ Applied styles to expertise section');
            
            // Force visibility of the grid
            const expertiseGrid = expertiseSection.querySelector('.expertise-grid');
            if (expertiseGrid) {
                console.log('✅ Found expertise grid');
                
                expertiseGrid.style.display = 'grid !important';
                expertiseGrid.style.visibility = 'visible !important';
                expertiseGrid.style.opacity = '1 !important';
                expertiseGrid.style.gridTemplateColumns = 'repeat(3, 1fr) !important';
                expertiseGrid.style.gap = '32px !important';
                expertiseGrid.style.maxWidth = '1200px !important';
                expertiseGrid.style.margin = '0 auto !important';
                expertiseGrid.style.width = '100% !important';
                expertiseGrid.style.height = 'auto !important';
                expertiseGrid.style.overflow = 'visible !important';
                
                console.log('✅ Applied styles to expertise grid');
            }
            
            // Force visibility of all cards
            const expertiseCards = expertiseSection.querySelectorAll('.expertise-card');
            console.log('📊 Found expertise cards:', expertiseCards.length);
            
            expertiseCards.forEach(function(card, index) {
                console.log('🔧 Processing card', index);
                
                card.style.display = 'block !important';
                card.style.visibility = 'visible !important';
                card.style.opacity = '1 !important';
                card.style.position = 'relative !important';
                card.style.zIndex = '2 !important';
                card.style.background = '#ffffff !important';
                card.style.borderRadius = '8px !important';
                card.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1) !important';
                card.style.padding = '32px !important';
                card.style.textAlign = 'left !important';
                card.style.width = '100% !important';
                card.style.height = 'auto !important';
                card.style.overflow = 'visible !important';
                card.style.margin = '0 !important';
                
                console.log('✅ Applied styles to card', index);
            });
            
            // Force visibility of all bullet containers and bullets
            const expertiseBulletsContainers = expertiseSection.querySelectorAll('.expertise-bullets');
            console.log('📊 Found expertise bullets containers:', expertiseBulletsContainers.length);
            
            expertiseBulletsContainers.forEach(function(container, index) {
                console.log('🔧 Processing bullets container', index);
                
                container.style.display = 'flex !important';
                container.style.visibility = 'visible !important';
                container.style.opacity = '1 !important';
                container.style.flexDirection = 'column !important';
                container.style.gap = '8px !important';
                container.style.alignItems = 'flex-start !important';
                container.style.textAlign = 'left !important';
                container.style.width = '100% !important';
                container.style.height = 'auto !important';
                container.style.overflow = 'visible !important';
                container.style.margin = '16px 0 0 0 !important';
                container.style.padding = '0 !important';
                container.style.position = 'relative !important';
                container.style.zIndex = '3 !important';
                
                console.log('✅ Applied styles to bullets container', index);
            });
            
            const expertiseBullets = expertiseSection.querySelectorAll('.expertise-bullet');
            console.log('📊 Found expertise bullets:', expertiseBullets.length);
            
            expertiseBullets.forEach(function(bullet, index) {
                console.log('🔧 Processing bullet', index, ':', bullet.textContent.trim());
                
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
                bullet.style.height = 'auto !important';
                bullet.style.overflow = 'visible !important';
                bullet.style.position = 'relative !important';
                bullet.style.zIndex = '4 !important';
                bullet.style.background = 'transparent !important';
                bullet.style.border = 'none !important';
                bullet.style.outline = 'none !important';
                
                console.log('✅ Applied styles to bullet', index);
            });
            
            // Scroll to the section to make it visible
            console.log('📍 Scrolling to expertise section...');
            expertiseSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            console.log('🎉 Expertise section fix completed');
            
        } else {
            console.log('❌ Expertise section not found');
        }
        
    }, 1000);
});


