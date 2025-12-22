/*
  LinkedIn API integration for automatic blog post publishing.
  
  Requires environment variables:
  - LINKEDIN_CLIENT_ID
  - LINKEDIN_CLIENT_SECRET
  - LINKEDIN_ACCESS_TOKEN
  - LINKEDIN_PERSON_URN (optional, if posting as a page)
  - SITE_URL (e.g., https://voc-call.fr)
*/

const https = require('https');
const { URL } = require('url');

const SITE_URL = process.env.SITE_URL || 'https://voc-call.fr';
const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
const LINKEDIN_ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
const LINKEDIN_PERSON_URN = process.env.LINKEDIN_PERSON_URN;

function log(msg) {
  console.log(`[linkedin] ${msg}`);
}

function error(msg) {
  console.error(`[linkedin] ERROR: ${msg}`);
}

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
    // Extract URN from response (format: urn:li:person:xxxxx)
    if (response.id) {
      return response.id;
    }
    throw new Error('Could not extract user URN from profile');
  } catch (err) {
    error(`Failed to get author URN: ${err.message}`);
    throw err;
  }
}

/**
 * Format LinkedIn post content from blog article metadata
 */
function formatLinkedInPost(meta) {
  const articleUrl = `${SITE_URL}/blog/${meta.slug}.html`;
  
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
 * Create Share Post on LinkedIn (using Share on LinkedIn API)
 * This uses the legacy Share API which works with "Share on LinkedIn" product
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
    log('UGC Posts API failed, trying legacy Share API...');
    
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
      error(`Both UGC Posts and Share API failed. UGC: ${err.message}, Share: ${shareErr.message}`);
      throw shareErr;
    }
  }
}

/**
 * Publish blog article to LinkedIn
 */
async function publishToLinkedIn(meta) {
  if (!LINKEDIN_ACCESS_TOKEN) {
    log('LinkedIn credentials not configured; skip publishing');
    return false;
  }
  
  if (!meta || !meta.slug || !meta.title) {
    error('Invalid metadata provided');
    return false;
  }
  
  try {
    log(`Publishing "${meta.title}" to LinkedIn...`);
    
    // Get author URN - use provided URN or fetch it
    let authorURN;
    if (LINKEDIN_PERSON_URN) {
      authorURN = LINKEDIN_PERSON_URN;
      log(`Using provided author URN: ${authorURN}`);
    } else {
      log(`No LINKEDIN_PERSON_URN provided, attempting to fetch from /v2/me...`);
      authorURN = await getAuthorURN();
      log(`Using fetched author URN: ${authorURN}`);
    }
    
    // Format post content
    const postText = formatLinkedInPost(meta);
    log(`Post text length: ${postText.length} characters`);
    
    // Create and publish post (tries UGC Posts first, then Share API)
    const result = await createSharePost(postText, authorURN);
    
    if (result.id) {
      log(`Successfully published to LinkedIn! Post ID: ${result.id}`);
      return true;
    } else {
      error('LinkedIn post created but no ID returned');
      return false;
    }
  } catch (err) {
    error(`Failed to publish to LinkedIn: ${err.message}`);
    // Don't throw - allow blog publication to continue even if LinkedIn fails
    return false;
  }
}

// Export for use in publish.js
if (require.main === module) {
  // Direct execution with metadata as argument
  const metaJson = process.argv[2];
  if (!metaJson) {
    console.error('Usage: node linkedin.js <meta.json path>');
    process.exit(1);
  }
  
  const fs = require('fs');
  const path = require('path');
  const meta = JSON.parse(fs.readFileSync(metaJson, 'utf8'));
  
  publishToLinkedIn(meta)
    .then(success => process.exit(success ? 0 : 1))
    .catch(err => {
      error(err.message);
      process.exit(1);
    });
} else {
  module.exports = { publishToLinkedIn, formatLinkedInPost };
}

