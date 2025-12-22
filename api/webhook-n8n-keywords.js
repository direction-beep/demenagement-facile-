/**
 * Webhook endpoint pour recevoir les positions de mots-clés depuis N8N
 * 
 * Usage: POST /api/webhook-n8n-keywords
 * 
 * Headers requis:
 * - Content-Type: application/json (ou text/markdown)
 * - X-Webhook-Secret: (votre secret pour sécuriser le webhook)
 * 
 * Body attendu (format JSON):
 * {
 *   "content": "# Positions Mots-Clés...\n\n## Priorité 1\n...",
 *   "format": "markdown"
 * }
 * 
 * OU (format markdown direct):
 * Content-Type: text/markdown
 * Body: "# Positions Mots-Clés...\n\n## Priorité 1\n..."
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration depuis les variables d'environnement
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'your-secret-key-change-this';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER || 'direction-beep';
const GITHUB_REPO = process.env.GITHUB_REPO || 'voc-call';
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

// Sur Vercel, on ne peut pas écrire dans le système de fichiers du projet
// On retourne le contenu pour qu'il soit sauvegardé côté client ou via API
// Pour l'instant, on utilise /tmp (temporaire) ou on retourne juste le contenu
const IS_VERCEL = process.env.VERCEL === '1';
const OUTPUT_FILE = IS_VERCEL 
  ? path.join('/tmp', 'positions-keywords-n8n.md')
  : path.join(process.cwd(), 'seo', 'positions-keywords-n8n.md');

/**
 * Faire une requête HTTPS vers l'API GitHub
 */
function githubRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: path,
      method: method,
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'User-Agent': 'VOC-Call-N8N-Webhook',
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => { responseData += chunk; });
      res.on('end', () => {
        try {
          const json = responseData ? JSON.parse(responseData) : {};
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(json);
          } else {
            reject(new Error(`GitHub API error ${res.statusCode}: ${JSON.stringify(json)}`));
          }
        } catch (e) {
          reject(new Error(`Parse error: ${e.message}, response: ${responseData}`));
        }
      });
    });

    req.on('error', reject);
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

/**
 * Commit un fichier sur GitHub via l'API
 */
async function commitFileToGitHub(filePath, content, message) {
  if (!GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN not configured');
  }

  try {
    // 1. Récupérer le SHA de la branche
    const branch = await githubRequest('GET', `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/git/ref/heads/${GITHUB_BRANCH}`);
    const baseSha = branch.object.sha;

    // 2. Récupérer le commit de base
    const baseCommit = await githubRequest('GET', `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/git/commits/${baseSha}`);
    const baseTreeSha = baseCommit.tree.sha;

    // 3. Créer un blob avec le contenu
    const blob = await githubRequest('POST', `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/git/blobs`, {
      content: Buffer.from(content).toString('base64'),
      encoding: 'base64'
    });

    // 4. Créer un tree avec le nouveau fichier
    const tree = await githubRequest('POST', `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/git/trees`, {
      base_tree: baseTreeSha,
      tree: [{
        path: filePath,
        mode: '100644',
        type: 'blob',
        sha: blob.sha
      }]
    });

    // 5. Créer un commit
    const commit = await githubRequest('POST', `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/git/commits`, {
      message: message,
      tree: tree.sha,
      parents: [baseSha]
    });

    // 6. Mettre à jour la référence de la branche
    await githubRequest('PATCH', `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/git/refs/heads/${GITHUB_BRANCH}`, {
      sha: commit.sha
    });

    return {
      success: true,
      commitSha: commit.sha,
      commitUrl: `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/commit/${commit.sha}`
    };
  } catch (error) {
    throw new Error(`Failed to commit to GitHub: ${error.message}`);
  }
}

/**
 * Sauvegarder le contenu markdown dans le fichier
 */
function saveKeywordsFile(content, withDate = false) {
  try {
    // Créer le dossier seo s'il n'existe pas
    const seoDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(seoDir)) {
      fs.mkdirSync(seoDir, { recursive: true });
    }

    // Déterminer le nom du fichier
    let filePath = OUTPUT_FILE;
    if (withDate) {
      const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      const dir = path.dirname(OUTPUT_FILE);
      const name = path.basename(OUTPUT_FILE, '.md');
      filePath = path.join(dir, `${name}-${date}.md`);
    }

    // Ajouter un en-tête avec la date de mise à jour
    const header = `# Positions Mots-Clés VOC-Call - N8N

**Dernière mise à jour** : ${new Date().toISOString()}
**Source** : N8N Webhook

---

`;
    
    const fullContent = header + content;

    // Sauvegarder le fichier
    fs.writeFileSync(filePath, fullContent, 'utf8');

    return {
      success: true,
      filePath: filePath,
      size: fullContent.length,
      message: 'Keywords file saved successfully'
    };
  } catch (error) {
    throw new Error(`Failed to save file: ${error.message}`);
  }
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

  try {
    const contentType = req.headers['content-type'] || '';
    let markdownContent = '';

    // Gérer deux formats : JSON ou Markdown direct
    if (contentType.includes('application/json')) {
      // Format JSON : { "content": "...", "format": "markdown", "filename": "...", "withDate": false }
      const { content, format, filename, withDate } = req.body;

      if (!content) {
        return res.status(400).json({ 
          error: 'Bad request',
          message: 'Missing required field: content'
        });
      }

      if (format === 'markdown' || typeof content === 'string') {
        markdownContent = content;
      } else {
        return res.status(400).json({ 
          error: 'Bad request',
          message: 'Content must be a markdown string or format must be "markdown"'
        });
      }

      // Sur Vercel, on ne peut pas écrire dans le système de fichiers
      // On commit directement sur GitHub via l'API
      try {
        // Récupérer le filename depuis le payload (si fourni)
        const filename = req.body.filename || 'positions-keywords-n8n.md';
        const filePath = filename.startsWith('seo/') ? filename : `seo/${filename}`;
        
        // Ajouter un en-tête avec la date de mise à jour
        const header = `# Positions Mots-Clés VOC-Call - N8N

**Dernière mise à jour** : ${new Date().toISOString()}
**Source** : N8N Webhook

---

`;
        const fullContent = header + markdownContent;
        
        // Commit sur GitHub
        const githubResult = await commitFileToGitHub(
          filePath,
          fullContent,
          `Update SEO report: ${filename} - ${new Date().toISOString().split('T')[0]}`
        );

        return res.status(200).json({
          success: true,
          message: 'Keywords data received and committed to GitHub successfully',
          github: githubResult,
          content: markdownContent
        });
      } catch (githubError) {
        // Si le commit GitHub échoue, on retourne quand même le contenu
        console.error('GitHub commit error:', githubError);
        return res.status(200).json({
          success: true,
          message: 'Keywords data received (GitHub commit may have failed)',
          content: markdownContent,
          warning: githubError.message || 'GitHub commit failed. Use the content field to save locally.',
          error: githubError.message
        });
      }

    } else if (contentType.includes('text/markdown') || contentType.includes('text/plain')) {
      // Format Markdown direct : le body est directement le markdown
      markdownContent = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
      
      // Essayer de récupérer le filename depuis les query params ou headers
      const filename = req.query.filename || req.headers['x-filename'] || 'positions-keywords-n8n.md';

      // Sur Vercel, on ne peut pas écrire dans le système de fichiers
      // On commit directement sur GitHub via l'API
      try {
        const filePath = filename.startsWith('seo/') ? filename : `seo/${filename}`;
        
        // Ajouter un en-tête avec la date de mise à jour
        const header = `# Positions Mots-Clés VOC-Call - N8N

**Dernière mise à jour** : ${new Date().toISOString()}
**Source** : N8N Webhook

---

`;
        const fullContent = header + markdownContent;
        
        // Commit sur GitHub
        const githubResult = await commitFileToGitHub(
          filePath,
          fullContent,
          `Update SEO report: ${filename} - ${new Date().toISOString().split('T')[0]}`
        );

        return res.status(200).json({
          success: true,
          message: 'Keywords data received and committed to GitHub successfully',
          github: githubResult,
          content: markdownContent
        });
      } catch (githubError) {
        // Si le commit GitHub échoue, on retourne quand même le contenu
        console.error('GitHub commit error:', githubError);
        return res.status(200).json({
          success: true,
          message: 'Keywords data received (GitHub commit may have failed)',
          content: markdownContent,
          warning: githubError.message || 'GitHub commit failed. Use the content field to save locally.',
          error: githubError.message
        });
      }

    } else {
      return res.status(400).json({ 
        error: 'Bad request',
        message: 'Content-Type must be application/json or text/markdown'
      });
    }

  } catch (error) {
    console.error('Webhook error:', error);
    
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message || 'Failed to save keywords data'
    });
  }
}

// Support pour les serveurs Node.js locaux (non-Vercel)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = handler;
}


