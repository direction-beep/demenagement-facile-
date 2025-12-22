// Force bullets for telesecretariat.html page
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Force telesecretariat bullets script loaded');
    
    setTimeout(function() {
        console.log('🔍 Looking for quality cards...');
        
        // Find all quality cards
        const qualityCards = document.querySelectorAll('.quality-card');
        console.log('📊 Found quality cards:', qualityCards.length);
        
        if (qualityCards.length === 0) {
            console.log('❌ No quality cards found');
            return;
        }
        
        // Define specific bullets for each card based on their content
        const cardBullets = [
            // Service irréprochable
            ['• Agents expérimentés', '• Traitement professionnel', '• Satisfaction garantie'],
            // Excellence reconnue  
            ['• Professionnalisme reconnu', '• Efficacité prouvée', '• Notoriété renforcée'],
            // Satisfaction client
            ['• Interactions optimisées', '• Fidélisation maximisée', '• Expérience client']
        ];
        
        qualityCards.forEach(function(card, index) {
            console.log(`🔧 Processing quality card ${index}`);
            
            // Ensure card has proper styling
            card.style.cssText = `
                background: #ffffff;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                padding: 32px;
                text-align: left;
                width: 100%;
                min-height: 300px;
                display: flex;
                flex-direction: column;
                position: relative;
                margin-bottom: 24px;
            `;
            
            // Find the paragraph in each card
            const paragraph = card.querySelector('p');
            if (paragraph) {
                console.log(`✅ Found paragraph in quality card ${index}`);
                
                // Remove any existing bullets first
                const existingBullets = card.querySelector('.universal-bullets, .quality-bullets');
                if (existingBullets) {
                    existingBullets.remove();
                    console.log(`🧹 Removed existing bullets from quality card ${index}`);
                }
                
                // Create bullet list
                const bulletList = document.createElement('div');
                bulletList.className = 'quality-bullets';
                bulletList.style.cssText = `
                    margin-top: 16px;
                    padding: 16px 0 0 0;
                    color: #0e4580;
                    font-size: 0.9rem;
                    line-height: 1.5;
                    border-top: 1px solid #e0e0e0;
                    width: 100%;
                    box-sizing: border-box;
                `;
                
                // Add bullets for this specific card
                const bullets = cardBullets[index] || ['• Expertise reconnue', '• Qualité garantie', '• Satisfaction client'];
                
                bullets.forEach(function(bulletText) {
                    const bulletDiv = document.createElement('div');
                    bulletDiv.textContent = bulletText;
                    bulletDiv.style.cssText = `
                        margin-bottom: 8px;
                        padding: 4px 0;
                        color: #0e4580;
                        font-size: 0.9rem;
                        font-weight: 500;
                        line-height: 1.4;
                        display: flex;
                        align-items: center;
                        width: 100%;
                    `;
                    bulletList.appendChild(bulletDiv);
                });
                
                // Insert the bullet list after the paragraph
                paragraph.parentNode.insertBefore(bulletList, paragraph.nextSibling);
                console.log(`✅ Added bullets to quality card ${index}`);
            }
        });
        
        console.log('🎉 Force telesecretariat bullets completed');
        
    }, 1000);
});
