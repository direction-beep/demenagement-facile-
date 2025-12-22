// Code N8N - Envoi des données vers GitHub via API
// Ce code prépare les données pour l'envoi vers GitHub via HTTP Request

// ========================================
// RÉCUPÉRATION DES DONNÉES
// ========================================

// Les données viennent du nœud Code précédent (évolution ou priorité)
const inputData = $input.first().json;

// Extraire le markdown
const markdown = inputData.markdown || '';
const filename = inputData.filename || 'seo-report.md';

// ========================================
// PRÉPARATION POUR GITHUB API
// ========================================

// Option 1 : Envoyer via le webhook existant (recommandé)
// URL : https://voc-call.fr/api/webhook-n8n-keywords
// Headers : X-Webhook-Secret, Content-Type: application/json
// Body : { "content": markdown, "format": "markdown" }

const webhookPayload = {
  content: markdown,
  format: "markdown",
  filename: filename, // Le filename sera utilisé par le webhook
  metadata: {
    keywordsAnalyzed: inputData.keywordsAnalyzed || 0,
    criticalRegressions: inputData.criticalRegressions || 0,
    moderateRegressions: inputData.moderateRegressions || 0,
    improvements: inputData.improvements || 0,
    dateRange: inputData.dateRange || {}
  }
};

// Préparer le payload JSON stringifié pour l'HTTP Request
// Cela évite les problèmes d'échappement dans N8N
const webhookPayloadString = JSON.stringify(webhookPayload);

// Option 2 : Envoyer directement via GitHub API (si vous avez un token)
// Cette option nécessite un GitHub Personal Access Token avec les permissions repo
const githubApiPayload = {
  message: `Update SEO report: ${filename} - ${new Date().toISOString().split('T')[0]}`,
  content: Buffer.from(markdown).toString('base64'),
  branch: 'main',
  path: `seo/${filename}`
};

// Retourner les deux options
return [{
  json: {
    // Option 1 : Webhook (recommandé - plus simple)
    webhook: {
      url: 'https://voc-call.fr/api/webhook-n8n-keywords',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Secret': '{{ $env.WEBHOOK_SECRET }}' // À configurer dans N8N
      },
      body: webhookPayload,
      bodyString: webhookPayloadString // JSON stringifié pour éviter les problèmes d'échappement
    },
    // Option 2 : GitHub API directe (si vous préférez)
    githubApi: {
      url: `https://api.github.com/repos/direction-beep/voc-call/contents/seo/${filename}`,
      method: 'PUT',
      headers: {
        'Authorization': 'token {{ $env.GITHUB_TOKEN }}', // À configurer dans N8N
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: githubApiPayload
    },
    // Données brutes pour debug
    markdown: markdown,
    filename: filename
  }
}];

