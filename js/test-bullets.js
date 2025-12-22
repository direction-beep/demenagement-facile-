// Test bullets visibility
document.addEventListener('DOMContentLoaded', function() {
    console.log('🧪 Test bullets script loaded');
    
    // Wait a bit for other scripts to load
    setTimeout(function() {
        console.log('🔍 Testing bullet points visibility...');
        
        // Test 1: Check if elements exist
        const expertiseBullets = document.querySelectorAll('.expertise-bullet');
        console.log('📊 Found .expertise-bullet elements:', expertiseBullets.length);
        
        expertiseBullets.forEach(function(bullet, index) {
            console.log('🔍 Bullet', index, ':', bullet.textContent.trim());
            console.log('   - Computed display:', window.getComputedStyle(bullet).display);
            console.log('   - Computed visibility:', window.getComputedStyle(bullet).visibility);
            console.log('   - Computed opacity:', window.getComputedStyle(bullet).opacity);
            console.log('   - Computed color:', window.getComputedStyle(bullet).color);
            console.log('   - Offset parent:', bullet.offsetParent);
            console.log('   - Client rect:', bullet.getBoundingClientRect());
        });
        
        // Test 2: Check containers
        const expertiseBulletsContainers = document.querySelectorAll('.expertise-bullets');
        console.log('📊 Found .expertise-bullets containers:', expertiseBulletsContainers.length);
        
        expertiseBulletsContainers.forEach(function(container, index) {
            console.log('🔍 Container', index, ':', container);
            console.log('   - Computed display:', window.getComputedStyle(container).display);
            console.log('   - Computed visibility:', window.getComputedStyle(container).visibility);
            console.log('   - Computed opacity:', window.getComputedStyle(container).opacity);
            console.log('   - Client rect:', container.getBoundingClientRect());
        });
        
        // Test 3: Force visibility with extreme measures
        console.log('🔧 Applying extreme visibility measures...');
        
        expertiseBullets.forEach(function(bullet, index) {
            // Remove any conflicting styles
            bullet.removeAttribute('style');
            
            // Apply new styles directly
            bullet.style.cssText = `
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                color: #0e4580 !important;
                font-size: 0.85rem !important;
                font-weight: 500 !important;
                line-height: 1.4 !important;
                margin-bottom: 4px !important;
                padding: 0 !important;
                width: 100% !important;
                position: relative !important;
                z-index: 9999 !important;
                background: transparent !important;
                border: none !important;
                outline: none !important;
            `;
            
            console.log('✅ Applied extreme styles to bullet', index);
        });
        
        expertiseBulletsContainers.forEach(function(container, index) {
            // Remove any conflicting styles
            container.removeAttribute('style');
            
            // Apply new styles directly
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
                z-index: 9999 !important;
            `;
            
            console.log('✅ Applied extreme styles to container', index);
        });
        
        console.log('🎉 Extreme visibility measures applied');
        
    }, 2000);
});


