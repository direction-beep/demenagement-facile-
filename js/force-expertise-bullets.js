// Force expertise bullets visibility
document.addEventListener('DOMContentLoaded', function() {
    // Force expertise card bullets
    const expertiseCards = document.querySelectorAll('.expertise-card .card-tags');
    
    expertiseCards.forEach(function(cardTags) {
        // Force display
        cardTags.style.display = 'flex';
        cardTags.style.flexDirection = 'column';
        cardTags.style.gap = '8px';
        cardTags.style.alignItems = 'flex-start';
        cardTags.style.marginTop = '16px';
        cardTags.style.padding = '0';
        cardTags.style.listStyle = 'none';
        
        // Force list items
        const listItems = cardTags.querySelectorAll('li');
        listItems.forEach(function(li) {
            li.style.position = 'relative';
            li.style.paddingLeft = '24px';
            li.style.color = '#0e4580';
            li.style.fontSize = '0.85rem';
            li.style.fontWeight = '500';
            li.style.lineHeight = '1.4';
            li.style.marginBottom = '4px';
            li.style.listStyle = 'none';
            
            // Force bullet point
            li.style.setProperty('--bullet-content', '"•"');
            li.setAttribute('data-bullet', '•');
        });
        
        // Add bullet points with CSS
        const style = document.createElement('style');
        style.textContent = `
            .expertise-card .card-tags li::before {
                content: "•" !important;
                position: absolute !important;
                left: 0 !important;
                color: #0e4580 !important;
                font-weight: bold !important;
                font-size: 1.1rem !important;
            }
        `;
        document.head.appendChild(style);
    });
    
    console.log('Expertise bullets forced:', expertiseCards.length, 'cards processed');
});
