#!/usr/bin/env node
/*
  Script simplifié pour obtenir un Access Token LinkedIn
  Usage: node scripts/get-linkedin-token-simple.js
*/

const https = require('https');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

console.log('\n═══════════════════════════════════════════════════');
console.log('   Obtenir un Access Token LinkedIn - Guide Rapide');
console.log('═══════════════════════════════════════════════════\n');

async function main() {
  // Vos identifiants (déjà récupérés)
  const CLIENT_ID = '78a639tvdurngb';
  console.log('✅ Client ID détecté: ' + CLIENT_ID + '\n');

  // Demander le Client Secret
  const CLIENT_SECRET = await question('Entrez votre Client Secret: ');
  const REDIRECT_URI = 'http://localhost:3000';

  // Étape 1 : Générer l'URL d'autorisation
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('ÉTAPE 1 : Autoriser l\'application LinkedIn');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const scopes = 'openid%20profile%20email%20w_member_social';
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${scopes}&state=random123`;

  console.log('1. Ouvrez ce lien dans votre navigateur :\n');
  console.log(authUrl);
  console.log('\n2. Autorisez l\'application LinkedIn');
  console.log('3. Après autorisation, vous serez redirigé vers une URL qui contient ?code=XXXXX');
  console.log('4. ⚠️ Ne vous inquiétez pas si la page affiche une erreur - c\'est normal !');
  console.log('5. Regardez la barre d\'adresse : copiez le code après ?code=\n');

  // Étape 2 : Demander le code
  const code = await question('Collez le code d\'autorisation ici: ');

  if (!code) {
    console.error('\n❌ Code requis !');
    rl.close();
    return;
  }

  // Étape 3 : Échanger le code contre un token
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('ÉTAPE 2 : Échange du code contre un Access Token...');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const postData = [
    'grant_type=authorization_code',
    `code=${code}`,
    `redirect_uri=${encodeURIComponent(REDIRECT_URI)}`,
    `client_id=${CLIENT_ID}`,
    `client_secret=${CLIENT_SECRET}`
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
          console.log('✅ SUCCÈS ! Access Token obtenu :\n');
          console.log('═══════════════════════════════════════════════════');
          console.log(json.access_token);
          console.log('═══════════════════════════════════════════════════');
          console.log(`\n📅 Expire dans : ${Math.floor(json.expires_in / 86400)} jours`);
          console.log('\n📝 IMPORTANT : Ajoutez cette valeur dans GitHub Secrets :');
          console.log('   Nom du secret : LINKEDIN_ACCESS_TOKEN');
          console.log('   Valeur : (copiez le token ci-dessus)\n');
          
          // Optionnel : obtenir Person URN
          if (json.access_token) {
            getPersonURN(json.access_token);
          }
        } else {
          console.error(`\n❌ Erreur ${res.statusCode}:`, json);
          console.log('\n💡 Dépannage :');
          console.log('- Vérifiez que le code n\'a pas expiré (utilisez-le dans les 5 minutes)');
          console.log('- Vérifiez que Client ID et Secret sont corrects');
          console.log('- Vérifiez que la Redirect URI correspond exactement à celle configurée\n');
        }
      } catch (e) {
        console.error('\n❌ Erreur de parsing:', e.message);
        console.log('Réponse brute:', data);
      }
      rl.close();
    });
  });

  req.on('error', (e) => {
    console.error(`\n❌ Erreur de connexion: ${e.message}`);
    rl.close();
  });

  req.write(postData);
  req.end();
}

async function getPersonURN(accessToken) {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Récupération du Person URN (optionnel)...');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

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

  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        if (res.statusCode === 200 && json.id) {
          console.log(`✅ Person URN: ${json.id}`);
          if (json.localizedFirstName) {
            console.log(`   Profil: ${json.localizedFirstName} ${json.localizedLastName || ''}`);
          }
          console.log('\n📝 Optionnel : Ajoutez cette valeur dans GitHub Secrets :');
          console.log('   Nom du secret : LINKEDIN_PERSON_URN');
          console.log(`   Valeur : ${json.id}`);
          console.log('\n(Note: Si non fourni, le script récupérera automatiquement cet URN)\n');
        }
      } catch (e) {
        // Ignore les erreurs pour cette partie optionnelle
      }
    });
  });

  req.on('error', () => {
    // Ignore les erreurs pour cette partie optionnelle
  });

  req.end();
}

main().catch(err => {
  console.error('\n❌ Erreur:', err.message);
  rl.close();
  process.exit(1);
});

