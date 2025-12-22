/**
 * Script pour mettre à jour toutes les images Open Graph
 * Utilise l'image générique demenagement-zen-og.jpg
 * 
 * Usage: node scripts/update-og-images.js
 */

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..');
const OG_IMAGE = 'https://demenagement-zen.fr/images/demenagement-zen-og.jpg';

// Trouver tous les fichiers HTML
function findHTMLFiles() {
    const files = [];
    const items = fs.readdirSync(OUTPUT_DIR);
    
    for (const item of items) {
        if ((item.startsWith('demenagement') || item.startsWith('demenageur')) && item.endsWith('.html')) {
            files.push(path.join(OUTPUT_DIR, item));
        }
    }
    
    return files;
}

// Mettre à jour les images Open Graph
function updateOGImages() {
    console.log('🔄 Mise à jour des images Open Graph...');
    
    const files = findHTMLFiles();
    console.log(`📄 ${files.length} fichiers HTML trouvés`);
    
    let updated = 0;
    
    for (const file of files) {
        let content = fs.readFileSync(file, 'utf-8');
        let modified = false;
        
        // Remplacer toutes les variations d'images OG
        const patterns = [
            /content="https:\/\/demenagement-zen\.fr\/images\/demenagement-[^"]+\.jpg"/g,
            /content="https:\/\/demenagement-zen\.fr\/images\/demenageur-[^"]+\.jpg"/g
        ];
        
        for (const pattern of patterns) {
            if (content.match(pattern)) {
                content = content.replace(pattern, `content="${OG_IMAGE}"`);
                modified = true;
            }
        }
        
        if (modified) {
            fs.writeFileSync(file, content, 'utf-8');
            updated++;
            console.log(`✅ Mis à jour: ${path.basename(file)}`);
        }
    }
    
    console.log(`\n📊 Résumé:`);
    console.log(`   ✅ Fichiers mis à jour: ${updated}/${files.length}`);
    console.log(`   🖼️  Image OG: ${OG_IMAGE}`);
}

updateOGImages();

