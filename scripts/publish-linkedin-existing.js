/*
  Script pour publier rétroactivement des articles existants sur LinkedIn.
  Usage: node scripts/publish-linkedin-existing.js [slug]
  Si aucun slug n'est fourni, publie tous les articles du dossier blog/
*/

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BLOG_DIR = path.join(ROOT, 'blog');

// LinkedIn integration (optional)
let linkedInModule = null;
try {
  const linkedinPath = path.join(__dirname, 'linkedin.js');
  if (!fs.existsSync(linkedinPath)) {
    throw new Error(`LinkedIn module not found at ${linkedinPath}`);
  }
  linkedInModule = require(linkedinPath);
} catch (e) {
  console.error('[linkedin] Module LinkedIn non disponible:', e.message);
  console.error('[linkedin] Directory:', __dirname);
  console.error('[linkedin] Files in directory:', fs.readdirSync(__dirname).join(', '));
  process.exit(1);
}

// Webhook Make.com configuration
const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL || 'https://hook.eu2.make.com/2orlnnf5v2xj4jbjik44h5cet211ftj2';
const SITE_URL = process.env.SITE_URL || 'https://voc-call.fr';

// Mots-clés pour identifier les articles sur les téléopérateurs
const TELEOPERATOR_KEYWORDS = [
  'teleconseiller',
  'teleoperateur',
  'téléconseiller',
  'téléopérateur',
  'devenir-teleconseiller',
  'recrutement-teleconseiller',
  'carriere-teleconseiller'
];

function log(msg) { console.log(`[publish-linkedin] ${msg}`); }

/**
 * Check if article is about teleoperators (to exclude from notifications)
 */
function isTeleoperatorArticle(meta) {
  const slug = (meta.slug || '').toLowerCase();
  const title = (meta.title || '').toLowerCase();
  const category = (meta.category || '').toLowerCase();
  const excerpt = (meta.excerpt || '').toLowerCase();
  
  const text = `${slug} ${title} ${category} ${excerpt}`;
  
  return TELEOPERATOR_KEYWORDS.some(keyword => text.includes(keyword));
}

/**
 * Send notification to Make.com webhook
 */
async function notifyMakeWebhook(meta) {
  if (!MAKE_WEBHOOK_URL) {
    log('Make.com webhook URL not configured; skip notification');
    return false;
  }
  
  // Skip teleoperator articles
  if (isTeleoperatorArticle(meta)) {
    log(`Skipping Make.com notification for ${meta.slug} (teleoperator article)`);
    return false;
  }
  
  try {
    const https = require('https');
    const { URL } = require('url');
    
    const webhookUrl = new URL(MAKE_WEBHOOK_URL);
    const articleUrl = meta.url || `${SITE_URL}/blog/${meta.slug}.html`;
    
    const payload = {
      title: meta.title,
      slug: meta.slug,
      excerpt: meta.excerpt || '',
      category: meta.category || '',
      readTime: meta.readTime || '5 min',
      url: articleUrl,
      date: meta.date,
      image: meta.image || '',
      publishedAt: new Date().toISOString()
    };
    
    const postData = JSON.stringify(payload);
    
    const options = {
      hostname: webhookUrl.hostname,
      path: webhookUrl.pathname + webhookUrl.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    
    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            log(`✓ Make.com webhook notified for ${meta.slug}`);
            resolve(true);
          } else {
            log(`⚠ Make.com webhook returned ${res.statusCode} for ${meta.slug}`);
            resolve(false);
          }
        });
      });
      
      req.on('error', (err) => {
        log(`✗ Make.com webhook error for ${meta.slug}: ${err.message}`);
        resolve(false);
      });
      
      req.write(postData);
      req.end();
    });
  } catch (err) {
    log(`✗ Make.com webhook failed for ${meta.slug}: ${err.message}`);
    return false;
  }
}

function extractMetaFromHTML(htmlPath) {
  const html = fs.readFileSync(htmlPath, 'utf8');
  
  // Extract title from <title> tag
  const titleMatch = html.match(/<title>(.*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].replace(/\s*\|.*$/, '').trim() : null;
  
  // Extract description from meta description
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
  const description = descMatch ? descMatch[1] : null;
  
  // Extract slug from filename
  const slug = path.basename(htmlPath, '.html');
  
  // Try to extract category from article content or use default
  let category = 'Blog';
  const categoryMatch = html.match(/article-category["'][^>]*>([^<]+)</i) || 
                         html.match(/class=["']article-category["'][^>]*>([^<]+)</i);
  if (categoryMatch) {
    category = categoryMatch[1].trim();
  }
  
  // Try to extract read time
  let readTime = '5 min';
  const readTimeMatch = html.match(/(\d+)\s*min\s*(?:de\s*lecture|de lecture)/i);
  if (readTimeMatch) {
    readTime = `${readTimeMatch[1]} min`;
  }
  
  // Try to extract date from meta or content
  let date = new Date().toISOString().split('T')[0];
  const dateMatch = html.match(/<meta\s+property=["']article:published_time["']\s+content=["']([^"']+)["']/i);
  if (dateMatch) {
    date = new Date(dateMatch[1]).toISOString().split('T')[0];
  }
  
  // Extract image
  let image = 'images/hero/hero-call-center.jpg';
  const imgMatch = html.match(/<img[^>]+src=["']([^"']*hero[^"']*)["']/i);
  if (imgMatch) {
    image = imgMatch[1].replace(/^\.\.\//, '');
  }
  
  return {
    slug,
    title: title || slug,
    date,
    category,
    image,
    excerpt: description || '',
    readTime
  };
}

async function publishArticleToLinkedIn(slug) {
  const htmlPath = path.join(BLOG_DIR, `${slug}.html`);
  
  if (!fs.existsSync(htmlPath)) {
    log(`Article ${slug} non trouvé`);
    return false;
  }
  
  log(`Extraction des métadonnées pour ${slug}...`);
  const meta = extractMetaFromHTML(htmlPath);
  
  log(`Métadonnées extraites:`);
  log(`  - Titre: ${meta.title}`);
  log(`  - Catégorie: ${meta.category}`);
  log(`  - Date: ${meta.date}`);
  log(`  - Temps de lecture: ${meta.readTime}`);
  
  if (!linkedInModule || !linkedInModule.publishToLinkedIn) {
    log('Module LinkedIn non disponible');
    return false;
  }
  
  try {
    log(`Publication sur LinkedIn...`);
    const success = await linkedInModule.publishToLinkedIn(meta);
    
    if (success) {
      log(`✓ Article ${slug} publié avec succès sur LinkedIn`);
      
      // Notify Make.com webhook (excludes teleoperator articles)
      await notifyMakeWebhook(meta);
      
      return true;
    } else {
      log(`⚠ Échec de la publication sur LinkedIn pour ${slug}`);
      return false;
    }
  } catch (err) {
    log(`✗ Erreur lors de la publication sur LinkedIn: ${err.message}`);
    return false;
  }
}

async function main() {
  const slug = process.argv[2];
  
  if (slug) {
    // Publier un article spécifique
    await publishArticleToLinkedIn(slug);
  } else {
    // Publier tous les articles du dossier blog/
    log('Publication de tous les articles existants sur LinkedIn...');
    const files = fs.readdirSync(BLOG_DIR)
      .filter(f => f.endsWith('.html') && !f.startsWith('categorie'));
    
    log(`Trouvé ${files.length} articles`);
    
    for (const file of files) {
      const slug = path.basename(file, '.html');
      log(`\n--- Traitement de ${slug} ---`);
      await publishArticleToLinkedIn(slug);
      // Attendre 2 secondes entre chaque publication pour éviter les rate limits
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    log('\n✓ Traitement terminé');
  }
}

main().catch(err => {
  console.error('[publish-linkedin] Erreur fatale:', err);
  process.exit(1);
});

