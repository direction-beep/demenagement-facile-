/*
  Publish scheduled blog drafts.
  Draft structure:
  blog/_drafts/<slug>/meta.json
  blog/_drafts/<slug>/index.html

  meta.json example:
  {
    "slug": "backoffice-digital-delais-reponse",
    "title": "Back‑office digital : réduire les délais de réponse",
    "date": "2025-11-08",
    "category": "Technique",
    "image": "images/hero/hero-back-office.jpg",
    "excerpt": "Emails, chat, réseaux sociaux : méthodes et outils pour accuser réception et répondre vite.",
    "readTime": "6 min"
  }
*/

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DRAFTS_DIR = path.join(ROOT, 'blog', '_drafts');
const BLOG_DIR = path.join(ROOT, 'blog');
const BLOG_LIST = path.join(ROOT, 'blog.html');

// LinkedIn integration (optional)
let linkedInModule = null;
try {
  linkedInModule = require('./linkedin');
} catch (e) {
  // LinkedIn module not required
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

function log(msg) { console.log(`[publish] ${msg}`); }

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

function loadJSON(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function formatDateLabel(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
}

function insertCardIntoBlogList(meta) {
  if (!fs.existsSync(BLOG_LIST)) {
    log('blog.html not found; skip card insertion');
    return;
  }
  const html = fs.readFileSync(BLOG_LIST, 'utf8');
  const marker = '<div class="articles-grid">';
  const idx = html.indexOf(marker);
  if (idx === -1) {
    log('articles-grid marker not found; skip');
    return;
  }

  const card = `\n                        <article class="blog-article">\n                            <div class="article-image">\n                                <img src="${meta.image}" alt="${meta.title}" loading="lazy">\n                                <div class="article-category">${meta.category || 'Blog'}</div>\n                            </div>\n                            <div class="article-content">\n                                <h3 class="article-title">\n                                    <a href="blog/${meta.slug}.html">${meta.title}</a>\n                                </h3>\n                                <p class="article-excerpt">${meta.excerpt || ''}</p>\n                                <div class="article-meta">\n                                    <span class="article-date"><i class="fas fa-calendar"></i> ${formatDateLabel(meta.date)}</span>\n                                    <span class="article-read-time"><i class="fas fa-clock"></i> ${meta.readTime || ''}</span>\n                                </div>\n                            </div>\n                        </article>`;

  const updated = html.slice(0, idx + marker.length) + card + html.slice(idx + marker.length);
  fs.writeFileSync(BLOG_LIST, updated, 'utf8');
  log(`Inserted card for ${meta.slug} in blog.html`);
}

async function publishDraft(draftDir) {
  const metaPath = path.join(draftDir, 'meta.json');
  const htmlPath = path.join(draftDir, 'index.html');
  if (!fs.existsSync(metaPath) || !fs.existsSync(htmlPath)) {
    log(`skip ${draftDir} (missing meta/index)`);
    return false;
  }
  const meta = loadJSON(metaPath);
  const today = new Date();
  const due = new Date(meta.date);
  if (isNaN(due)) { log(`invalid date in ${metaPath}`); return false; }
  if (due > today) { return false; }

  const target = path.join(BLOG_DIR, `${meta.slug}.html`);
  if (fs.existsSync(target)) { log(`already published: ${meta.slug}`); return false; }

  fs.copyFileSync(htmlPath, target);
  insertCardIntoBlogList(meta);
  log(`published ${meta.slug}`);
  
  // Publish to LinkedIn if module is available
  if (linkedInModule && linkedInModule.publishToLinkedIn) {
    try {
      const success = await linkedInModule.publishToLinkedIn(meta);
      if (success) {
        log(`✓ LinkedIn post created for ${meta.slug}`);
      } else {
        log(`⚠ LinkedIn post skipped for ${meta.slug}`);
      }
    } catch (err) {
      log(`✗ LinkedIn post failed for ${meta.slug}: ${err.message}`);
    }
  } else {
    log(`LinkedIn module not available, skipping LinkedIn publication`);
  }
  
  // Notify Make.com webhook (excludes teleoperator articles)
  await notifyMakeWebhook(meta);
  
  return true;
}

async function main() {
  if (!fs.existsSync(DRAFTS_DIR)) {
    log('no drafts dir; nothing to do');
    return;
  }
  const entries = fs.readdirSync(DRAFTS_DIR, { withFileTypes: true }).filter(e => e.isDirectory());
  let publishedAny = false;
  for (const e of entries) {
    const ok = await publishDraft(path.join(DRAFTS_DIR, e.name));
    if (ok) publishedAny = true;
  }
  log(publishedAny ? 'done with publications' : 'no draft due today');
}

main().catch(err => {
  console.error('[publish] Fatal error:', err);
  process.exit(1);
});


