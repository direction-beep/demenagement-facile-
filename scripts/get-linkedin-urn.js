/*
  Script simple pour obtenir votre LinkedIn Person URN ou Organization URN
  Usage: node scripts/get-linkedin-urn.js <ACCESS_TOKEN>
  
  Si vous publiez en tant que personne (profil personnel), vous obtiendrez un Person URN.
  Si vous publiez en tant que page/organisation, vous obtiendrez un Organization URN.
*/

const https = require('https');
const { URL } = require('url');

const ACCESS_TOKEN = process.argv[2];

if (!ACCESS_TOKEN) {
  console.error('❌ Erreur: Access Token manquant');
  console.log('\nUsage: node scripts/get-linkedin-urn.js <ACCESS_TOKEN>');
  console.log('\nOu définissez la variable d\'environnement:');
  console.log('  set LINKEDIN_ACCESS_TOKEN=votre_token');
  console.log('  node scripts/get-linkedin-urn.js');
  process.exit(1);
}

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

async function getPersonURN() {
  console.log('📡 Tentative de récupération du Person URN via /v2/me...');
  
  const url = new URL('/v2/me', 'https://api.linkedin.com');
  const options = {
    hostname: url.hostname,
    path: url.pathname + '?projection=(id)',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    }
  };
  
  try {
    const response = await makeRequest(options);
    if (response.id) {
      return response.id;
    }
    throw new Error('Could not extract URN from response');
  } catch (err) {
    console.log(`⚠️  /v2/me non disponible: ${err.message}`);
    return null;
  }
}

async function getOrganizationURN() {
  console.log('📡 Tentative de récupération du Organization URN...');
  
  const url = new URL('/v2/organizationalEntityAcls', 'https://api.linkedin.com');
  const options = {
    hostname: url.hostname,
    path: url.pathname + '?q=roleAssignee&role=ADMINISTRATOR&projection=(elements*(organizationalTarget~))',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    }
  };
  
  try {
    const response = await makeRequest(options);
    if (response.elements && response.elements.length > 0) {
      const org = response.elements[0].organizationalTarget;
      if (org) {
        return org;
      }
    }
    throw new Error('No organization found');
  } catch (err) {
    console.log(`⚠️  Impossible de récupérer Organization URN: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log('🔍 Recherche de votre LinkedIn URN...\n');
  
  // Essayer d'abord Person URN
  const personURN = await getPersonURN();
  if (personURN) {
    console.log('\n✅ Person URN trouvé:');
    console.log(`   ${personURN}`);
    console.log('\n📋 À ajouter dans GitHub Secrets:');
    console.log(`   Nom: LINKEDIN_PERSON_URN`);
    console.log(`   Valeur: ${personURN}`);
    return;
  }
  
  // Sinon essayer Organization URN
  const orgURN = await getOrganizationURN();
  if (orgURN) {
    console.log('\n✅ Organization URN trouvé:');
    console.log(`   ${orgURN}`);
    console.log('\n📋 À ajouter dans GitHub Secrets:');
    console.log(`   Nom: LINKEDIN_PERSON_URN`);
    console.log(`   Valeur: ${orgURN}`);
    return;
  }
  
  // Si rien ne fonctionne, donner des instructions manuelles
  console.log('\n❌ Impossible de récupérer automatiquement l\'URN.');
  console.log('\n📝 Instructions manuelles:');
  console.log('1. Allez sur https://www.linkedin.com/developers/apps');
  console.log('2. Sélectionnez votre application');
  console.log('3. Allez dans l\'onglet "Auth"');
  console.log('4. Utilisez l\'outil "Access Token" pour générer un token');
  console.log('5. Ou utilisez le script get-linkedin-token.ps1 qui extrait aussi l\'URN');
  console.log('\n💡 L\'URN peut être:');
  console.log('   - urn:li:person:xxxxx (pour un profil personnel)');
  console.log('   - urn:li:organization:xxxxx (pour une page LinkedIn)');
}

main().catch(err => {
  console.error('❌ Erreur:', err.message);
  process.exit(1);
});

