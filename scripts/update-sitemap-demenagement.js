/**
 * Script pour mettre à jour automatiquement le sitemap.xml
 * avec toutes les pages Déménagement Zen générées
 * 
 * Usage: node scripts/update-sitemap-demenagement.js
 */

const fs = require('fs');
const path = require('path');

const SITEMAP_PATH = path.join(__dirname, '../sitemap.xml');
const CSV_PATH = path.join(__dirname, '../seo/mots-cles-volume-1000-plus.csv');
const BASE_URL = 'https://demenagement-zen.fr';

// Lire le CSV pour obtenir la liste des pages
function readPagesFromCSV() {
    const content = fs.readFileSync(CSV_PATH, 'utf-8');
    const lines = content.split('\n').filter(line => line.trim());
    
    const pages = [];
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        if (values.length < 8) continue;
        
        const url = values[7].trim();
        if (url && url.startsWith('/')) {
            pages.push({
                url: url,
                ville: values[4] || 'Unknown',
                volume: parseInt(values[2]) || 0,
                phase: values[6] || 'Unknown'
            });
        }
    }
    
    return pages;
}

// Déterminer la priorité selon la phase
function getPriority(phase, volume) {
    if (phase.includes('Phase 1')) return '0.9';
    if (phase.includes('Phase 2')) return '0.9';
    if (phase.includes('Phase 3')) return '0.8';
    if (phase.includes('Phase 4')) return '0.7';
    return '0.8';
}

// Générer les entrées XML pour le sitemap
function generateSitemapEntries(pages) {
    const today = new Date().toISOString().split('T')[0];
    
    return pages.map(page => {
        const priority = getPriority(page.phase, page.volume);
        return `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
    }).join('\n');
}

// Mettre à jour le sitemap
function updateSitemap() {
    console.log('🔄 Mise à jour du sitemap.xml...');
    
    // Lire le sitemap actuel
    let sitemapContent = fs.readFileSync(SITEMAP_PATH, 'utf-8');
    
    // Trouver où insérer les nouvelles pages (après les pages légales, avant </urlset>)
    const insertMarker = '  <!-- Pages légales -->';
    const endMarker = '</urlset>';
    
    // Lire les pages depuis le CSV
    const pages = readPagesFromCSV();
    console.log(`📄 ${pages.length} pages trouvées dans le CSV`);
    
    // Générer les entrées XML
    const newEntries = generateSitemapEntries(pages);
    
    // Supprimer l'ancienne section Déménagement Zen si elle existe
    const regex = /<!-- Pages Déménagement Zen[\s\S]*?(?=  <!--|<\/urlset>)/;
    if (sitemapContent.match(regex)) {
        sitemapContent = sitemapContent.replace(regex, '');
    }
    
    // Insérer les nouvelles entrées avant </urlset>
    sitemapContent = sitemapContent.replace(endMarker, `  <!-- Pages Déménagement Zen - Volume > 1000 recherches/mois -->
${newEntries}

${endMarker}`);
    
    // Écrire le nouveau sitemap
    fs.writeFileSync(SITEMAP_PATH, sitemapContent, 'utf-8');
    
    console.log(`✅ Sitemap mis à jour avec ${pages.length} pages Déménagement Zen`);
    console.log(`📁 Fichier: ${SITEMAP_PATH}`);
}

// Exécuter
updateSitemap();

