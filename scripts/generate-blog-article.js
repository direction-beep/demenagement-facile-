#!/usr/bin/env node
/**
 * Script Node.js pour générer des articles de blog avec encodage UTF-8 garanti
 * Usage: node scripts/generate-blog-article.js <slug> <title> <description>
 */

const fs = require('fs');
const path = require('path');

// Configuration
const BLOG_DIR = path.join(__dirname, '..', 'blog');
const UTF8_ENCODING = 'utf8';

/**
 * Normalise le texte pour garantir l'encodage UTF-8 correct
 */
function normalizeText(text) {
    if (!text) return '';
    // S'assure que le texte est en UTF-8
    return Buffer.from(text, 'utf8').toString('utf8');
}

/**
 * Génère le contenu HTML d'un article de blog
 */
function generateArticleHTML(article) {
    const normalizedTitle = normalizeText(article.title);
    const normalizedDescription = normalizeText(article.description);
    const normalizedContent = normalizeText(article.content || '');
    
    return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${normalizedTitle} | VOC-Call</title>
  <meta name="description" content="${normalizedDescription}">
  <link rel="stylesheet" href="../css/styles.css?v=20251030">
    <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png">
    <link rel="icon" type="image/x-icon" href="/images/favicon.ico">
</head>
<body>
  <main class="article-page">
    <section class="article-hero"><div class="container"><h1>${normalizedTitle}</h1><p class="article-intro">${normalizedDescription}</p></div></section>
    <section class="article-content"><div class="container text-content">
      ${normalizedContent}
    </div></section>
  </main>
</body>
</html>`;
}

/**
 * Écrit un fichier avec encodage UTF-8 garanti
 */
function writeFileUTF8(filePath, content) {
    try {
        // Créer le répertoire si nécessaire
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        
        // Écrire le fichier avec encodage UTF-8 (sans BOM)
        fs.writeFileSync(filePath, content, { encoding: UTF8_ENCODING, flag: 'w' });
        
        // Vérifier que le fichier a été écrit correctement
        const writtenContent = fs.readFileSync(filePath, UTF8_ENCODING);
        if (writtenContent !== content) {
            throw new Error('Le contenu écrit ne correspond pas au contenu attendu');
        }
        
        return true;
    } catch (error) {
        console.error(`Erreur lors de l'écriture du fichier ${filePath}:`, error);
        return false;
    }
}

/**
 * Valide l'encodage d'un fichier
 */
function validateEncoding(filePath) {
    try {
        const content = fs.readFileSync(filePath, UTF8_ENCODING);
        
        // Vérifier la présence de caractères mal encodés
        const badEncodingPatterns = [
            /Ã©/g, /Ã /g, /Ã§/g, /Ã¨/g, /Ãª/g, /Ã«/g,
            /Ã¯/g, /Ã´/g, /Ã¶/g, /Ã¹/g, /Ã»/g, /Ã¼/g,
            /â€™/g, /â€"/g, /â€"/g, /VOCâ€'/g
        ];
        
        let hasBadEncoding = false;
        for (const pattern of badEncodingPatterns) {
            if (pattern.test(content)) {
                hasBadEncoding = true;
                console.warn(`⚠️  Caractères mal encodés détectés dans ${filePath}`);
                break;
            }
        }
        
        return !hasBadEncoding;
    } catch (error) {
        console.error(`Erreur lors de la validation de ${filePath}:`, error);
        return false;
    }
}

/**
 * Fonction principale
 */
function main() {
    const args = process.argv.slice(2);
    
    if (args.length < 3) {
        console.log('Usage: node scripts/generate-blog-article.js <slug> <title> <description> [content]');
        console.log('');
        console.log('Exemple:');
        console.log('  node scripts/generate-blog-article.js "mon-article" "Mon Titre" "Ma description" "<h2>Contenu</h2><p>Texte...</p>"');
        process.exit(1);
    }
    
    const [slug, title, description, ...contentParts] = args;
    const content = contentParts.join(' ') || '';
    
    const article = {
        slug: slug,
        title: title,
        description: description,
        content: content
    };
    
    const htmlContent = generateArticleHTML(article);
    const filePath = path.join(BLOG_DIR, `${slug}.html`);
    
    console.log(`📝 Génération de l'article: ${slug}.html`);
    console.log(`   Titre: ${article.title}`);
    console.log(`   Description: ${article.description}`);
    
    if (writeFileUTF8(filePath, htmlContent)) {
        console.log(`✅ Fichier créé: ${filePath}`);
        
        // Valider l'encodage
        if (validateEncoding(filePath)) {
            console.log(`✅ Encodage UTF-8 validé`);
        } else {
            console.warn(`⚠️  Problème d'encodage détecté dans le fichier généré`);
        }
    } else {
        console.error(`❌ Erreur lors de la création du fichier`);
        process.exit(1);
    }
}

// Exécuter si appelé directement
if (require.main === module) {
    main();
}

module.exports = { generateArticleHTML, writeFileUTF8, validateEncoding, normalizeText };


