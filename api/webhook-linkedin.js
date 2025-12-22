/**
 * Webhook endpoint pour publier automatiquement sur LinkedIn
 * 
 * Usage: POST /api/webhook-linkedin
 * 
 * Headers requis:
 * - Content-Type: application/json
 * - X-Webhook-Secret: (votre secret pour sécuriser le webhook)
 * 
 * Body attendu:
 * {
 *   "title": "Titre de l'article",
 *   "slug": "slug-de-larticle",
 *   "excerpt": "Description de l'article",
 *   "category": "Catégorie",
 *   "readTime": "5 min",
 *   "url": "https://voc-call.fr/blog/slug-de-larticle.html"
 * }
 */

const https = require('https');
const { URL } = require('url');

// Configuration depuis les variables d'environnement
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'your-secret-key-change-this';
const LINKEDIN_ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
const LINKEDIN_PERSON_URN = process.env.LINKEDIN_PERSON_URN || null;
const SITE_URL = process.env.SITE_URL || 'https://voc-call.fr';

/**
 * Make HTTPS request to LinkedIn API
 */
function makeRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const json = data ? JSON.parse(data) : {};
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(json);
          } else {
            reject(new Error(`LinkedIn API error ${res.statusCode}: ${JSON.stringify(json)}`));
          }
        } catch (e) {
          reject(new Error(`Parse error: ${e.message}, response: ${data}`));
        }
      });
    });
    req.on('error', reject);
    if (postData) {
      req.write(JSON.stringify(postData));
    }
    req.end();
  });
}

/**
 * Get author URN (Person or Organization)
 */
async function getAuthorURN() {
  if (LINKEDIN_PERSON_URN) {
    return LINKEDIN_PERSON_URN;
  }
  
  // Get current user's profile URN using /v2/me
  const url = new URL('/v2/me', 'https://api.linkedin.com');
  const options = {
    hostname: url.hostname,
    path: url.pathname + '?projection=(id)',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${LINKEDIN_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    }
  };
  
  try {
    const response = await makeRequest(options);
    if (response.id) {
      return response.id;
    }
    throw new Error('Could not extract user URN from profile');
  } catch (err) {
    throw new Error(`Failed to get author URN: ${err.message}`);
  }
}

/**
 * Format LinkedIn post content from article metadata
 */
function formatLinkedInPost(meta) {
  const articleUrl = meta.url || `${SITE_URL}/blog/${meta.slug}.html`;
  
  // Format hashtags from category and keywords
  const hashtags = [
    '#CentreAppel',
    '#ServiceClient',
    '#Externalisation',
    meta.category ? `#${meta.category.replace(/\s+/g, '')}` : null
  ].filter(Boolean).join(' ');
  
  // Create engaging LinkedIn post
  const text = `📢 Nouvel article sur notre blog : "${meta.title}"

${meta.excerpt || ''}

🎯 Points clés :
• ${meta.category || 'Expertise'}
• Temps de lecture : ${meta.readTime || '5 min'}

📖 Lire l'article complet : ${articleUrl}

${hashtags}

#VOCCall #BPO #CallCenter #ServiceClient #Externalisation`;

  return text;
}

/**
 * Create Share Post on LinkedIn
 */
async function createSharePost(text, authorURN) {
  // Try UGC Posts API first (for Marketing Developer Platform)
  try {
    const ugcPost = {
      author: authorURN,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: text
          },
          shareMediaCategory: 'ARTICLE',
          media: []
        }
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
      }
    };
    
    const url = new URL('/v2/ugcPosts', 'https://api.linkedin.com');
    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LINKEDIN_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      }
    };
    
    const response = await makeRequest(options, ugcPost);
    return response;
  } catch (err) {
    // If UGC Posts fails, try legacy Share API (for "Share on LinkedIn" product)
    const sharePost = {
      comment: text,
      visibility: {
        code: 'anyone'
      }
    };
    
    const url = new URL('/v2/shares', 'https://api.linkedin.com');
    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LINKEDIN_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      }
    };
    
    try {
      const response = await makeRequest(options, sharePost);
      return response;
    } catch (shareErr) {
      throw new Error(`Both UGC Posts and Share API failed. UGC: ${err.message}, Share: ${shareErr.message}`);
    }
  }
}

/**
 * Publish blog article to LinkedIn
 */
async function publishToLinkedIn(meta) {
  if (!LINKEDIN_ACCESS_TOKEN) {
    throw new Error('LinkedIn credentials not configured');
  }
  
  if (!meta || !meta.slug || !meta.title) {
    throw new Error('Invalid metadata provided');
  }
  
  // Get author URN
  let authorURN;
  if (LINKEDIN_PERSON_URN) {
    authorURN = LINKEDIN_PERSON_URN;
  } else {
    authorURN = await getAuthorURN();
  }
  
  // Format post content
  const postText = formatLinkedInPost(meta);
  
  // Create and publish post
  const result = await createSharePost(postText, authorURN);
  
  if (!result.id) {
    throw new Error('LinkedIn post created but no ID returned');
  }
  
  return {
    success: true,
    postId: result.id,
    message: 'Post published successfully on LinkedIn'
  };
}

/**
 * Handler principal du webhook (format Vercel)
 */
export default async function handler(req, res) {
  // Seulement POST
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only POST requests are allowed'
    });
  }

  // Vérifier le secret du webhook
  const webhookSecret = req.headers['x-webhook-secret'];
  if (!webhookSecret || webhookSecret !== WEBHOOK_SECRET) {
    return res.status(401).json({ 
      error: 'Unauthorized',
      message: 'Invalid or missing webhook secret'
    });
  }

  // Vérifier le Content-Type
  if (req.headers['content-type'] !== 'application/json') {
    return res.status(400).json({ 
      error: 'Bad request',
      message: 'Content-Type must be application/json'
    });
  }

  try {
    // Valider les données reçues
    const { title, slug, excerpt, category, readTime, url } = req.body;

    if (!title || !slug) {
      return res.status(400).json({ 
        error: 'Bad request',
        message: 'Missing required fields: title and slug are required'
      });
    }

    // Préparer les métadonnées
    const meta = {
      title,
      slug,
      excerpt: excerpt || '',
      category: category || '',
      readTime: readTime || '5 min',
      url: url || `${SITE_URL}/blog/${slug}.html`
    };

    // Publier sur LinkedIn
    const result = await publishToLinkedIn(meta);

    // Retourner le succès
    return res.status(200).json({
      success: true,
      message: 'Article published to LinkedIn successfully',
      data: result
    });

  } catch (error) {
    console.error('Webhook error:', error);
    
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message || 'Failed to publish to LinkedIn'
    });
  }
}

