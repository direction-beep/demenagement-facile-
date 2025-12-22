#!/usr/bin/env node
/**
 * Script de minification CSS et JS
 * Utilise des techniques simples pour réduire la taille des fichiers
 */

const fs = require('fs');
const path = require('path');

// Fonction pour minifier le CSS
function minifyCSS(css) {
    return css
        // Supprimer les commentaires
        .replace(/\/\*[\s\S]*?\*\//g, '')
        // Supprimer les espaces inutiles
        .replace(/\s+/g, ' ')
        // Supprimer les espaces autour des caractères spéciaux
        .replace(/\s*([{}:;,])\s*/g, '$1')
        // Supprimer les espaces en début et fin de ligne
        .replace(/^\s+|\s+$/gm, '')
        // Supprimer les points-virgules avant les accolades fermantes
        .replace(/;}/g, '}')
        // Supprimer les espaces dans les sélecteurs
        .replace(/\s*>\s*/g, '>')
        .replace(/\s*\+\s*/g, '+')
        .replace(/\s*~\s*/g, '~')
        .trim();
}

// Fonction pour minifier le JS
function minifyJS(js) {
    return js
        // Supprimer les commentaires sur une ligne
        .replace(/\/\/.*$/gm, '')
        // Supprimer les commentaires multi-lignes
        .replace(/\/\*[\s\S]*?\*\//g, '')
        // Supprimer les espaces inutiles
        .replace(/\s+/g, ' ')
        // Supprimer les espaces autour des opérateurs
        .replace(/\s*([=+\-*\/%<>!&|,;:{}()\[\]])\s*/g, '$1')
        // Supprimer les espaces en début et fin de ligne
        .replace(/^\s+|\s+$/gm, '')
        // Supprimer les points-virgules avant les accolades fermantes
        .replace(/;}/g, '}')
        .trim();
}

// Fonction pour traiter un fichier
function processFile(filePath, outputPath, minifyFn) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const minified = minifyFn(content);
        
        // Créer le dossier de sortie si nécessaire
        const outputDir = path.dirname(outputPath);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        fs.writeFileSync(outputPath, minified, 'utf8');
        const originalSize = Buffer.byteLength(content, 'utf8');
        const minifiedSize = Buffer.byteLength(minified, 'utf8');
        const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(2);
        
        console.log(`✓ ${path.basename(filePath)}: ${(originalSize / 1024).toFixed(2)} KB → ${(minifiedSize / 1024).toFixed(2)} KB (${savings}% réduit)`);
        
        return { originalSize, minifiedSize, savings };
    } catch (error) {
        console.error(`✗ Erreur lors du traitement de ${filePath}:`, error.message);
        return null;
    }
}

// Fonction principale
function main() {
    console.log('Minification des assets...\n');
    
    const cssDir = path.join(__dirname, 'css');
    const jsDir = path.join(__dirname, 'js');
    const distDir = path.join(__dirname, 'dist');
    
    // Créer le dossier dist
    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true });
    }
    
    const cssDistDir = path.join(distDir, 'css');
    const jsDistDir = path.join(distDir, 'js');
    
    if (!fs.existsSync(cssDistDir)) {
        fs.mkdirSync(cssDistDir, { recursive: true });
    }
    if (!fs.existsSync(jsDistDir)) {
        fs.mkdirSync(jsDistDir, { recursive: true });
    }
    
    let totalOriginal = 0;
    let totalMinified = 0;
    
    // Minifier les fichiers CSS
    console.log('CSS:');
    const cssFiles = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));
    cssFiles.forEach(file => {
        const inputPath = path.join(cssDir, file);
        const outputPath = path.join(cssDistDir, file.replace('.css', '.min.css'));
        const result = processFile(inputPath, outputPath, minifyCSS);
        if (result) {
            totalOriginal += result.originalSize;
            totalMinified += result.minifiedSize;
        }
    });
    
    // Minifier les fichiers JS
    console.log('\nJavaScript:');
    const jsFiles = fs.readdirSync(jsDir).filter(f => f.endsWith('.js') && !f.includes('.min.'));
    jsFiles.forEach(file => {
        const inputPath = path.join(jsDir, file);
        const outputPath = path.join(jsDistDir, file.replace('.js', '.min.js'));
        const result = processFile(inputPath, outputPath, minifyJS);
        if (result) {
            totalOriginal += result.originalSize;
            totalMinified += result.minifiedSize;
        }
    });
    
    // Résumé
    console.log('\n' + '='.repeat(50));
    console.log(`Total: ${(totalOriginal / 1024).toFixed(2)} KB → ${(totalMinified / 1024).toFixed(2)} KB`);
    console.log(`Économie: ${((1 - totalMinified / totalOriginal) * 100).toFixed(2)}%`);
    console.log('='.repeat(50));
}

// Exécuter si appelé directement
if (require.main === module) {
    main();
}

module.exports = { minifyCSS, minifyJS };





