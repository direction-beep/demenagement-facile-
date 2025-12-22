/**
 * Script pour mettre à jour les références au logo dans toutes les pages HTML
 * Utilise SVG avec fallback PNG
 * 
 * Usage: node scripts/update-logo-images.js
 */

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..');

// Trouver tous les fichiers HTML
function findHTMLFiles() {
    const files = [];
    const items = fs.readdirSync(OUTPUT_DIR);
    
    for (const item of items) {
        if (item.endsWith('.html') && item.startsWith('demenagement') || item.startsWith('demenageur')) {
            files.push(path.join(OUTPUT_DIR, item));
        }
    }
    
    return files;
}

// Mettre à jour les références au logo
function updateLogoReferences() {
    console.log('🔄 Mise à jour des références au logo...');
    
    const files = findHTMLFiles();
    console.log(`📄 ${files.length} fichiers HTML trouvés`);
    
    let updated = 0;
    
    for (const file of files) {
        let content = fs.readFileSync(file, 'utf-8');
        let modified = false;
        
        // Remplacer dans le header img
        if (content.includes('src="images/logo-demenagement-zen.png"')) {
            content = content.replace(
                /src="images\/logo-demenagement-zen\.png"/g,
                'src="images/logo-demenagement-zen.svg" onerror="this.onerror=null; this.src=\'images/logo-demenagement-zen.png\'"'
            );
            modified = true;
        }
        
        // Remplacer dans Schema.org (garder PNG ici pour compatibilité)
        // On garde PNG dans Schema.org car c'est mieux pour les données structurées
        
        if (modified) {
            fs.writeFileSync(file, content, 'utf-8');
            updated++;
            console.log(`✅ Mis à jour: ${path.basename(file)}`);
        }
    }
    
    console.log(`\n📊 Résumé:`);
    console.log(`   ✅ Fichiers mis à jour: ${updated}/${files.length}`);
}

updateLogoReferences();

