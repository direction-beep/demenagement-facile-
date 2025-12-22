// Universal bullets fix for all service pages
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Universal bullets fix script loaded');
    
    setTimeout(function() {
        console.log('🔍 Looking for card sections...');
        
        // Define all possible card selectors across service pages
        const cardSelectors = [
            '.expertise-card',
            '.advantage-card', 
            '.solution-card',
            '.method-card',
            '.result-card',
            '.productivity-card',
            '.chat-card',
            '.social-card',
            '.personalized-card',
            '.feature-card',
            '.service-card',
            '.quality-card',
            '.availability-card',
            '.outsourcing-card',
            '.efficiency-card',
            '.reliability-card'
        ];
        
        let totalCardsProcessed = 0;
        
        // First, clean up any existing old tags
        console.log('🧹 Cleaning up old tags...');
        const oldTags = document.querySelectorAll('.card-features, .feature-tag, .card-tags, .expertise-bullets, .expertise-bullet');
        oldTags.forEach(function(tag) {
            tag.remove();
        });
        console.log(`🧹 Removed ${oldTags.length} old tags`);
        
        cardSelectors.forEach(function(selector) {
            const cards = document.querySelectorAll(selector);
            if (cards.length > 0) {
                console.log(`📊 Found ${cards.length} cards with selector: ${selector}`);
                
                cards.forEach(function(card, index) {
                    console.log(`🔧 Processing ${selector} card ${index}`);
                    
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
                        console.log(`✅ Found paragraph in ${selector} card ${index}`);
                        
                        // Remove any existing bullets first
                        const existingBullets = card.querySelector('.universal-bullets');
                        if (existingBullets) {
                            existingBullets.remove();
                            console.log(`🧹 Removed existing bullets from ${selector} card ${index}`);
                        }
                        
                        // Create bullet list based on card content
                        const bulletList = createBulletList(card, paragraph);
                        if (bulletList) {
                            // Insert the bullet list after the paragraph
                            paragraph.parentNode.insertBefore(bulletList, paragraph.nextSibling);
                            console.log(`✅ Added bullets to ${selector} card ${index}`);
                            totalCardsProcessed++;
                        } else {
                            // Force add generic bullets if none were generated
                            const forcedBulletList = document.createElement('div');
                            forcedBulletList.className = 'universal-bullets';
                            forcedBulletList.style.cssText = `
                                margin-top: 16px;
                                padding: 16px 0 0 0;
                                color: #0e4580;
                                font-size: 0.9rem;
                                line-height: 1.5;
                                border-top: 1px solid #e0e0e0;
                                width: 100%;
                                box-sizing: border-box;
                            `;
                            
                            const genericBullets = ['• Expertise reconnue', '• Qualité garantie', '• Satisfaction client'];
                            genericBullets.forEach(function(bulletText) {
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
                                forcedBulletList.appendChild(bulletDiv);
                            });
                            
                            paragraph.parentNode.insertBefore(forcedBulletList, paragraph.nextSibling);
                            console.log(`✅ Added forced bullets to ${selector} card ${index}`);
                            totalCardsProcessed++;
                        }
                    }
                });
            }
        });
        
        console.log(`🎉 Universal bullets fix completed. Processed ${totalCardsProcessed} cards`);
        
    }, 500);
    
    function createBulletList(card, paragraph) {
        const bulletList = document.createElement('div');
        bulletList.className = 'universal-bullets';
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
        
        // Generate bullets based on card content and context
        const bullets = generateBulletsForCard(card, paragraph);
        
        if (bullets.length === 0) {
            return null; // No bullets to add
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
        
        return bulletList;
    }
    
    function generateBulletsForCard(card, paragraph) {
        const cardText = paragraph.textContent.toLowerCase();
        const cardTitle = card.querySelector('h3, h4, h5')?.textContent.toLowerCase() || '';
        const fullText = (cardTitle + ' ' + cardText).toLowerCase();
        
        // Define bullet patterns based on content
        const bulletPatterns = {
            // Expertise/Professional patterns
            'professionnel': ['• Professionnels expérimentés', '• Formation spécialisée', '• Expertise métier'],
            'expertise': ['• Savoir-faire technique', '• Compétences avancées', '• Maîtrise des outils'],
            'équipe': ['• Équipe qualifiée', '• Formation continue', '• Expérience terrain'],
            
            // Service/Support patterns
            'service': ['• Disponibilité 24/7', '• Réponse rapide', '• Support personnalisé'],
            'support': ['• Assistance technique', '• Résolution rapide', '• Suivi personnalisé'],
            'client': ['• Écoute active', '• Compréhension des besoins', '• Satisfaction garantie'],
            
            // Technical patterns
            'technique': ['• Outils performants', '• Technologies avancées', '• Sécurité renforcée'],
            'informatique': ['• Infrastructure robuste', '• Maintenance préventive', '• Support technique'],
            'système': ['• Intégration facile', '• Compatibilité assurée', '• Évolutivité'],
            
            // Quality/Performance patterns
            'qualité': ['• Contrôle qualité', '• Indicateurs de performance', '• Amélioration continue'],
            'performance': ['• Optimisation continue', '• Métriques précises', '• Reporting détaillé'],
            'suivi': ['• Monitoring en temps réel', '• Alertes automatiques', '• Rapports réguliers'],
            
            // Business patterns
            'commercial': ['• Prospection ciblée', '• Qualification des leads', '• Conversion optimisée'],
            'vente': ['• Techniques de vente', '• Argumentaire adapté', '• Fidélisation client'],
            'marketing': ['• Stratégies personnalisées', '• Campagnes ciblées', '• ROI mesurable'],
            
            // Communication patterns
            'communication': ['• Écoute active', '• Techniques de communication', '• Gestion des conflits'],
            'relation': ['• Relation client', '• Fidélisation', '• Satisfaction'],
            'écoute': ['• Compréhension des besoins', '• Empathie', '• Solutions adaptées'],
            
            // Time/Availability patterns
            'disponibilité': ['• 24h/24 7j/7', '• Réactivité', '• Flexibilité'],
            'rapidité': ['• Traitement immédiat', '• Délais respectés', '• Efficacité'],
            'temps': ['• Optimisation des délais', '• Gestion du temps', '• Productivité'],
            
            // Security/Reliability patterns
            'sécurité': ['• Données protégées', '• Conformité RGPD', '• Confidentialité'],
            'fiabilité': ['• Système robuste', '• Disponibilité garantie', '• Maintenance préventive'],
            'confidentialité': ['• Données sécurisées', '• Accès contrôlé', '• Audit régulier']
        };
        
        // Find matching patterns
        const matchedBullets = [];
        
        for (const [pattern, bullets] of Object.entries(bulletPatterns)) {
            if (fullText.includes(pattern)) {
                matchedBullets.push(...bullets);
            }
        }
        
        // If no specific patterns match, use generic bullets based on context
        if (matchedBullets.length === 0) {
            if (fullText.includes('télésecrétariat') || fullText.includes('secrétariat')) {
                matchedBullets.push('• Gestion administrative', '• Organisation optimisée', '• Efficacité maximale');
            } else if (fullText.includes('permanence') || fullText.includes('24h') || fullText.includes('disponibilité')) {
                matchedBullets.push('• Disponibilité totale', '• Réactivité', '• Service continu');
            } else if (fullText.includes('prospection') || fullText.includes('commercial') || fullText.includes('vente')) {
                matchedBullets.push('• Ciblage précis', '• Conversion optimisée', '• ROI mesurable');
            } else if (fullText.includes('back office') || fullText.includes('administratif') || fullText.includes('traitement')) {
                matchedBullets.push('• Traitement automatisé', '• Précision garantie', '• Productivité');
            } else if (fullText.includes('helpdesk') || fullText.includes('support') || fullText.includes('informatique')) {
                matchedBullets.push('• Résolution rapide', '• Expertise technique', '• Satisfaction client');
            } else if (fullText.includes('qualité') || fullText.includes('excellence') || fullText.includes('irréprochable')) {
                matchedBullets.push('• Standards élevés', '• Contrôle qualité', '• Excellence reconnue');
            } else if (fullText.includes('satisfaction') || fullText.includes('client') || fullText.includes('fidélisation')) {
                matchedBullets.push('• Écoute active', '• Compréhension des besoins', '• Satisfaction garantie');
            } else {
                // Generic fallback - always add bullets
                matchedBullets.push('• Expertise reconnue', '• Qualité garantie', '• Satisfaction client');
            }
        }
        
        // Return unique bullets (max 3)
        return [...new Set(matchedBullets)].slice(0, 3);
    }
});
