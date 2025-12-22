// Simple bullets fix - Direct HTML injection
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Simple bullets fix script loaded');
    
    setTimeout(function() {
        console.log('🔍 Looking for expertise section...');
        
        const expertiseSection = document.querySelector('.expertise-section');
        if (expertiseSection) {
            console.log('✅ Found expertise section');
            
            // Find all expertise cards
            const expertiseCards = expertiseSection.querySelectorAll('.expertise-card');
            console.log('📊 Found expertise cards:', expertiseCards.length);
            
            expertiseCards.forEach(function(card, index) {
                console.log('🔧 Processing card', index);
                
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
                `;
                
                // Find the paragraph in each card
                const paragraph = card.querySelector('p');
                if (paragraph) {
                    console.log('✅ Found paragraph in card', index);
                    
                    // Create a simple bullet list after the paragraph
                    const bulletList = document.createElement('div');
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
                    
                    // Add bullets based on card index
                    let bullets = [];
                    if (index === 0) {
                        bullets = [
                            '• Professionnels expérimentés',
                            '• Techniques de communication', 
                            '• Écoute active'
                        ];
                    } else if (index === 1) {
                        bullets = [
                            '• Réponse rapide',
                            '• Efficacité',
                            '• Disponibilité totale'
                        ];
                    } else if (index === 2) {
                        bullets = [
                            '• Indicateurs clés',
                            '• Optimisation qualité',
                            '• Mesure continue'
                        ];
                    }
                    
                    // Add each bullet as a separate div
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
                    
                    console.log('✅ Added bullets to card', index);
                }
            });
            
            console.log('🎉 Simple bullets fix completed');
            
        } else {
            console.log('❌ Expertise section not found');
        }
        
    }, 500);
});
