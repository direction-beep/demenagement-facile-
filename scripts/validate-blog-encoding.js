#!/usr/bin/env node
/**
 * Script pour valider l'encodage UTF-8 de tous les fichiers HTML du blog
 * Usage: node scripts/validate-blog-encoding.js
 */

const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(__dirname, '..', 'blog');
const UTF8_ENCODING = 'utf8';

// Patterns de caractères mal encodés
const BAD_ENCODING_PATTERNS = [
    { pattern: /Ã©/g, description: 'é mal encodé' },
    { pattern: /Ã /g, description: 'à mal encodé' },
    { pattern: /Ã§/g, description: 'ç mal encodé' },
    { pattern: /Ã¨/g, description: 'è mal encodé' },
    { pattern: /Ãª/g, description: 'ê mal encodé' },
    { pattern: /Ã«/g, description: 'ë mal encodé' },
    { pattern: /Ã¯/g, description: 'ï mal encodé' },
    { pattern: /Ã´/g, description: 'ô mal encodé' },
    { pattern: /Ã¶/g, description: 'ö mal encodé' },
    { pattern: /Ã¹/g, description: 'ù mal encodé' },
    { pattern: /Ã»/g, description: 'û mal encodé' },
    { pattern: /Ã¼/g, description: 'ü mal encodé' },
    { pattern: /â€™/g, description: 'apostrophe mal encodée' },
    { pattern: /â€"/g, description: 'guillemets mal encodés' },
    { pattern: /VOCâ€'/g, description: 'VOC- mal encodé' },
    { pattern: /E-''commerce/g, description: 'E-commerce mal encodé' },
    { pattern: /post-''achat/g, description: 'post-achat mal encodé' },
];

/**
 * Valide l'encodage d'un fichier
 */
function validateFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, UTF8_ENCODING);
        const issues = [];
        
        for (const { pattern, description } of BAD_ENCODING_PATTERNS) {
            const matches = content.match(pattern);
            if (matches) {
                issues.push({
                    description,
                    count: matches.length,
                    pattern: pattern.toString()
                });
            }
        }
        
        return {
            valid: issues.length === 0,
            issues
        };
    } catch (error) {
        return {
            valid: false,
            error: error.message
        };
    }
}

/**
 * Fonction principale
 */
function main() {
    console.log('🔍 Validation de l\'encodage UTF-8 des fichiers du blog...\n');
    
    if (!fs.existsSync(BLOG_DIR)) {
        console.error(`❌ Le répertoire ${BLOG_DIR} n'existe pas`);
        process.exit(1);
    }
    
    // Récupérer tous les fichiers HTML
    const htmlFiles = [];
    
    function findHTMLFiles(dir) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            
            if (stat.isDirectory()) {
                findHTMLFiles(filePath);
            } else if (file.endsWith('.html')) {
                htmlFiles.push(filePath);
            }
        }
    }
    
    findHTMLFiles(BLOG_DIR);
    
    console.log(`📁 ${htmlFiles.length} fichier(s) HTML trouvé(s)\n`);
    
    let validFiles = 0;
    let invalidFiles = 0;
    const invalidFilesList = [];
    
    for (const filePath of htmlFiles) {
        const relativePath = path.relative(BLOG_DIR, filePath);
        const result = validateFile(filePath);
        
        if (result.valid) {
            validFiles++;
            console.log(`✅ ${relativePath}`);
        } else {
            invalidFiles++;
            invalidFilesList.push({
                path: relativePath,
                issues: result.issues || [],
                error: result.error
            });
            
            console.log(`❌ ${relativePath}`);
            if (result.issues) {
                result.issues.forEach(issue => {
                    console.log(`   - ${issue.description}: ${issue.count} occurrence(s)`);
                });
            }
            if (result.error) {
                console.log(`   - Erreur: ${result.error}`);
            }
        }
    }
    
    console.log('\n' + '='.repeat(60));
    console.log(`📊 Résumé:`);
    console.log(`   ✅ Fichiers valides: ${validFiles}`);
    console.log(`   ❌ Fichiers avec problèmes: ${invalidFiles}`);
    
    if (invalidFiles > 0) {
        console.log('\n⚠️  Fichiers nécessitant une correction:');
        invalidFilesList.forEach(file => {
            console.log(`   - ${file.path}`);
        });
        console.log('\n💡 Pour corriger, exécutez: python fix-encoding-blog.py');
        process.exit(1);
    } else {
        console.log('\n🎉 Tous les fichiers sont correctement encodés en UTF-8 !');
        process.exit(0);
    }
}

// Exécuter si appelé directement
if (require.main === module) {
    main();
}

module.exports = { validateFile, BAD_ENCODING_PATTERNS };


