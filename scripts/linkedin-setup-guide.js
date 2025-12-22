#!/usr/bin/env node
/*
  Guide interactif pour configurer les credentials LinkedIn.
  Ce script aide à obtenir les tokens nécessaires.
*/

const readline = require('readline');
const https = require('https');
const { URL } = require('url');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function log(msg) { console.log(`\n📌 ${msg}`); }
function success(msg) { console.log(`\n✅ ${msg}`); }
function error(msg) { console.error(`\n❌ ${msg}`); }
function info(msg) { console.log(`\nℹ️  ${msg}`); }

async function main() {
  console.log('\n═══════════════════════════════════════════════════');
  console.log('   Configuration LinkedIn pour VOC-Call Blog');
  console.log('═══════════════════════════════════════════════════\n');

  info('Ce script va vous guider pour obtenir les credentials LinkedIn nécessaires.');
  info('Vous aurez besoin d\'un compte LinkedIn avec accès développeur.\n');

  const step = await question('Quelle étape voulez-vous configurer ?\n  1) Créer une application LinkedIn (nouveau)\n  2) Obtenir un Access Token\n  3) Tester les credentials existants\n  Choisissez (1/2/3): ');

  if (step === '1') {
    await createAppGuide();
  } else if (step === '2') {
    await getTokenGuide();
  } else if (step === '3') {
    await testCredentials();
  } else {
    error('Choix invalide');
  }

  rl.close();
}

async function createAppGuide() {
  log('ÉTAPE 1 : Créer une application LinkedIn');
  console.log('\n1. Allez sur https://www.linkedin.com/developers/apps');
  console.log('2. Cliquez sur "Create app"');
  console.log('3. Remplissez les informations :');
  console.log('   - App name: VOC-Call Blog Publisher');
  console.log('   - LinkedIn Page: Votre page LinkedIn (si vous en avez une)');
  console.log('   - Privacy policy URL: https://voc-call.vercel.app/legal');
  console.log('   - App logo: Logo de votre choix');
  console.log('4. Acceptez les conditions\n');

  const done = await question('Avez-vous créé l\'application ? (o/n): ');
  if (done.toLowerCase() !== 'o') {
    error('Veuillez créer l\'application avant de continuer.');
    return;
  }

  log('ÉTAPE 2 : Configurer les produits');
  console.log('\n1. Dans votre application, allez dans l\'onglet "Products"');
  console.log('2. Ajoutez le produit "Sign In with LinkedIn using OpenID Connect"');
  console.log('3. Ajoutez le produit "Marketing Developer Platform" (nécessaire pour publier)\n');

  const productsDone = await question('Avez-vous ajouté les produits ? (o/n): ');
  if (productsDone.toLowerCase() !== 'o') {
    error('Veuillez ajouter les produits avant de continuer.');
    return;
  }

  log('ÉTAPE 3 : Obtenir Client ID et Client Secret');
  console.log('\n1. Allez dans l\'onglet "Auth"');
  console.log('2. Notez votre "Client ID"');
  console.log('3. Notez votre "Client Secret" (cliquez sur "Show" pour le voir)\n');

  const clientId = await question('Entrez votre Client ID: ');
  const clientSecret = await question('Entrez votre Client Secret: ');

  success(`Client ID: ${clientId}`);
  success(`Client Secret: ${clientSecret}`);
  console.log('\n📝 IMPORTANT: Ajoutez ces valeurs dans GitHub Secrets:');
  console.log(`   LINKEDIN_CLIENT_ID = ${clientId}`);
  console.log(`   LINKEDIN_CLIENT_SECRET = ${clientSecret}\n`);

  const continueToken = await question('Voulez-vous maintenant obtenir un Access Token ? (o/n): ');
  if (continueToken.toLowerCase() === 'o') {
    await getTokenInteractive(clientId, clientSecret);
  }
}

async function getTokenGuide() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  log('OBTENIR UN ACCESS TOKEN LINKEDIN');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const clientId = await question('Client ID: ');
  const clientSecret = await question('Client Secret: ');
  const redirectUri = await question('Redirect URI (par défaut: http://localhost:3000): ') || 'http://localhost:3000';

  await getTokenInteractive(clientId, clientSecret, redirectUri);
}

async function getTokenInteractive(clientId, clientSecret, redirectUri = 'http://localhost:3000') {
  log('MÉTHODE 1 : Token pour compte personnel (person)');
  console.log('\nCette méthode permet de publier en tant que personne.\n');

  // Scopes nécessaires
  const scopes = [
    'openid',
    'profile',
    'email',
    'w_member_social'
  ].join('%20');

  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?` +
    `response_type=code` +
    `&client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=${scopes}` +
    `&state=random_state_string`;

  console.log('\n1. Ouvrez ce lien dans votre navigateur :');
  console.log(`\n${authUrl}\n`);
  
  console.log('2. Autorisez l\'application');
  console.log('3. Vous serez redirigé vers une URL qui contient ?code=XXXXX');
  console.log('4. Copiez le code depuis l\'URL de redirection\n');

  const code = await question('Collez le code d\'autorisation ici: ');

  if (!code) {
    error('Code requis');
    return;
  }

  info('Échange du code contre un Access Token...');

  try {
    const token = await exchangeCodeForToken(clientId, clientSecret, code, redirectUri);
    success(`Access Token obtenu avec succès !`);
    console.log(`\n📝 TOKEN: ${token.access_token}`);
    console.log(`📝 Expires in: ${token.expires_in} secondes (${Math.floor(token.expires_in / 86400)} jours)\n`);

    console.log('\n📝 IMPORTANT: Ajoutez cette valeur dans GitHub Secrets:');
    console.log(`   LINKEDIN_ACCESS_TOKEN = ${token.access_token}\n`);

    // Optionnel : obtenir l'URN
    if (token.access_token) {
      const getURN = await question('Voulez-vous obtenir votre Person URN ? (o/n): ');
      if (getURN.toLowerCase() === 'o') {
        await getPersonURN(token.access_token);
      }
    }
  } catch (err) {
    error(`Erreur: ${err.message}`);
    console.log('\nDépannage:');
    console.log('- Vérifiez que le code n\'a pas expiré (utilisez-le rapidement)');
    console.log('- Vérifiez que le Redirect URI correspond exactement');
    console.log('- Vérifiez que les produits sont bien activés dans votre app LinkedIn');
  }
}

async function exchangeCodeForToken(clientId, clientSecret, code, redirectUri) {
  return new Promise((resolve, reject) => {
    const postData = [
      'grant_type=authorization_code',
      `code=${code}`,
      `redirect_uri=${encodeURIComponent(redirectUri)}`,
      `client_id=${clientId}`,
      `client_secret=${clientSecret}`
    ].join('&');

    const options = {
      hostname: 'www.linkedin.com',
      path: '/oauth/v2/accessToken',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (res.statusCode === 200) {
            resolve(json);
          } else {
            reject(new Error(`Erreur ${res.statusCode}: ${JSON.stringify(json)}`));
          }
        } catch (e) {
          reject(new Error(`Parse error: ${e.message}`));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function getPersonURN(accessToken) {
  info('Récupération de votre Person URN...');
  
  try {
    const url = new URL('/v2/me?projection=(id)', 'https://api.linkedin.com');
    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    };

    const result = await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            if (res.statusCode === 200) {
              resolve(json);
            } else {
              reject(new Error(`Erreur ${res.statusCode}: ${JSON.stringify(json)}`));
            }
          } catch (e) {
            reject(new Error(`Parse error: ${e.message}`));
          }
        });
      });
      req.on('error', reject);
      req.end();
    });

    if (result.id) {
      success(`Person URN: ${result.id}`);
      console.log(`\n📝 Optionnel: Ajoutez cette valeur dans GitHub Secrets:`);
      console.log(`   LINKEDIN_PERSON_URN = ${result.id}\n`);
      console.log('(Note: Si non fourni, le script récupérera automatiquement cet URN)\n');
    }
  } catch (err) {
    error(`Erreur lors de la récupération de l'URN: ${err.message}`);
  }
}

async function testCredentials() {
  log('TEST DES CREDENTIALS EXISTANTS');
  
  const clientId = await question('Client ID: ');
  const clientSecret = await question('Client Secret (optionnel): ');
  const accessToken = await question('Access Token: ');
  const personURN = await question('Person URN (optionnel): ');

  if (!accessToken) {
    error('Access Token requis pour le test');
    return;
  }

  info('Test de l\'Access Token...');

  try {
    const url = new URL('/v2/me?projection=(id,localizedFirstName,localizedLastName)', 'https://api.linkedin.com');
    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    };

    const result = await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            if (res.statusCode === 200) {
              resolve(json);
            } else {
              reject(new Error(`Erreur ${res.statusCode}: ${JSON.stringify(json)}`));
            }
          } catch (e) {
            reject(new Error(`Parse error: ${e.message}`));
          }
        });
      });
      req.on('error', reject);
      req.end();
    });

    success('✅ Access Token valide !');
    console.log(`\nProfil connecté:`);
    console.log(`  Nom: ${result.localizedFirstName} ${result.localizedLastName}`);
    console.log(`  URN: ${result.id}\n`);

    // Test de publication (optionnel)
    const testPost = await question('Voulez-vous tester la création d\'un post de test ? (o/n): ');
    if (testPost.toLowerCase() === 'o') {
      await testPostCreation(accessToken, personURN || result.id);
    }
  } catch (err) {
    error(`Token invalide ou expiré: ${err.message}`);
    console.log('\n💡 Le token expire après 60 jours. Vous devrez en générer un nouveau.');
  }
}

async function testPostCreation(accessToken, personURN) {
  info('Création d\'un post de test...');
  console.log('⚠️  Ceci va créer un vrai post sur votre profil LinkedIn !\n');

  const confirm = await question('Confirmez-vous la création d\'un post de test ? (oui/non): ');
  if (confirm.toLowerCase() !== 'oui') {
    info('Test annulé');
    return;
  }

  const testText = '🧪 Post de test automatique depuis VOC-Call Blog Publisher\n\nCe message confirme que l\'intégration LinkedIn fonctionne correctement ! ✅\n\n#VOCCall #Test';

  try {
    const linkedIn = require('./linkedin');
    const testMeta = {
      slug: 'test-post',
      title: 'Test LinkedIn Integration',
      excerpt: 'Post de test automatique',
      category: 'Test',
      readTime: '1 min'
    };

    // Temporairement remplacer la fonction formatLinkedInPost
    const originalFormat = linkedIn.formatLinkedInPost;
    linkedIn.formatLinkedInPost = () => testText;

    process.env.LINKEDIN_ACCESS_TOKEN = accessToken;
    process.env.LINKEDIN_PERSON_URN = personURN;
    process.env.SITE_URL = 'https://voc-call.vercel.app';

    const success = await linkedIn.publishToLinkedIn(testMeta);
    
    linkedIn.formatLinkedInPost = originalFormat;

    if (success) {
      success('✅ Post de test créé avec succès sur LinkedIn !');
    } else {
      error('Échec de la création du post');
    }
  } catch (err) {
    error(`Erreur: ${err.message}`);
  }
}

main().catch(err => {
  error(err.message);
  rl.close();
  process.exit(1);
});


