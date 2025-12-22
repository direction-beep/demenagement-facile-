// Script d'intégration automatique de Google Analytics dans toutes les pages HTML
// Ce script ajoute le tracking GA4 à toutes les pages du site VOC-Call

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
    ga4Id: 'G-XXXXXXXXXX', // À remplacer par votre ID de propriété GA4
    siteUrl: 'https://voc-call.com',
    pagesDir: './',
    excludeFiles: ['analytics-tracking.html', 'backlinks-strategy.html', 'backlinks-action-plan.html'],
    backupDir: './backup/'
};

// Code Google Analytics à insérer
const GA4_CODE = `<!-- Google Analytics 4 - VOC-Call -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${CONFIG.ga4Id}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${CONFIG.ga4Id}', {
    'custom_map': {
      'custom_parameter_1': 'service_type',
      'custom_parameter_2': 'page_category',
      'custom_parameter_3': 'user_type',
      'custom_parameter_4': 'content_type'
    },
    'send_page_view': true,
    'anonymize_ip': true,
    'allow_google_signals': true,
    'allow_ad_personalization_signals': false
  });
</script>

<!-- Événements de tracking personnalisés -->
<script>
  // Fonctions de tracking VOC-Call
  function trackQuoteRequest(service, source = 'website') {
    gtag('event', 'quote_request', {
      'service_type': service,
      'source': source,
      'page_category': 'conversion',
      'value': 50,
      'currency': 'EUR'
    });
  }
  
  function trackDownload(fileName, fileType = 'pdf') {
    gtag('event', 'file_download', {
      'file_name': fileName,
      'file_type': fileType,
      'page_category': 'resources',
      'value': 10,
      'currency': 'EUR'
    });
  }
  
  function trackCTAClick(ctaText, location, destination) {
    gtag('event', 'cta_click', {
      'cta_text': ctaText,
      'cta_location': location,
      'cta_destination': destination,
      'page_category': 'engagement',
      'value': 5,
      'currency': 'EUR'
    });
  }
  
  function trackNewsletterSignup(source = 'footer') {
    gtag('event', 'newsletter_signup', {
      'source': source,
      'page_category': 'lead_generation',
      'value': 5,
      'currency': 'EUR'
    });
  }
  
  function trackPhoneCall(phoneNumber, source = 'website') {
    gtag('event', 'phone_call', {
      'phone_number': phoneNumber,
      'source': source,
      'page_category': 'conversion',
      'value': 100,
      'currency': 'EUR'
    });
  }
  
  function trackServicePageView(serviceName) {
    gtag('event', 'service_page_view', {
      'service_name': serviceName,
      'page_category': 'services',
      'value': 2,
      'currency': 'EUR'
    });
  }
  
  // Tracking automatique des interactions
  document.addEventListener('DOMContentLoaded', function() {
    // Tracking des clics CTA
    document.addEventListener('click', function(e) {
      const target = e.target;
      
      if (target.matches('.btn-primary, .cta-button, [data-action="quote"]')) {
        const service = target.getAttribute('data-service') || 'general';
        const location = target.closest('section')?.className || 'unknown';
        trackCTAClick(target.textContent.trim(), location, 'quote_form');
      }
      
      if (target.matches('a[href*=".pdf"], a[href*="download"]')) {
        const fileName = target.getAttribute('href').split('/').pop();
        const fileType = fileName.split('.').pop();
        trackDownload(fileName, fileType);
      }
      
      if (target.matches('a[href^="tel:"]')) {
        const phoneNumber = target.getAttribute('href').replace('tel:', '');
        trackPhoneCall(phoneNumber, 'website');
      }
      
      if (target.matches('a[href*="/services/"]')) {
        const serviceName = target.textContent.trim();
        trackServicePageView(serviceName);
      }
    });
    
    // Tracking du scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
        maxScroll = scrollPercent;
        gtag('event', 'scroll', {
          'scroll_depth': scrollPercent,
          'page_category': 'engagement'
        });
      }
    });
    
    // Tracking des erreurs
    window.addEventListener('error', function(e) {
      gtag('event', 'exception', {
        'description': e.message,
        'fatal': false,
        'error_type': 'javascript_error',
        'page_url': window.location.href
      });
    });
  });
</script>`;

// Fonction pour lister tous les fichiers HTML
function getHtmlFiles(dir) {
    const files = [];
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !item.startsWith('.') && item !== 'backup') {
            files.push(...getHtmlFiles(fullPath));
        } else if (stat.isFile() && item.endsWith('.html') && !CONFIG.excludeFiles.includes(item)) {
            files.push(fullPath);
        }
    }
    
    return files;
}

// Fonction pour créer une sauvegarde
function createBackup(filePath) {
    const backupDir = CONFIG.backupDir;
    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
    }
    
    const fileName = path.basename(filePath);
    const backupPath = path.join(backupDir, fileName);
    fs.copyFileSync(filePath, backupPath);
    console.log(`Sauvegarde créée: ${backupPath}`);
}

// Fonction pour intégrer Google Analytics dans un fichier HTML
function integrateAnalytics(filePath) {
    try {
        // Créer une sauvegarde
        createBackup(filePath);
        
        // Lire le fichier
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Vérifier si GA4 est déjà présent
        if (content.includes('googletagmanager.com/gtag/js')) {
            console.log(`Google Analytics déjà présent dans ${filePath}`);
            return false;
        }
        
        // Trouver la balise </head>
        const headEndIndex = content.indexOf('</head>');
        if (headEndIndex === -1) {
            console.log(`Balise </head> non trouvée dans ${filePath}`);
            return false;
        }
        
        // Insérer le code GA4 avant </head>
        const newContent = content.slice(0, headEndIndex) + 
                          '\n' + GA4_CODE + '\n' + 
                          content.slice(headEndIndex);
        
        // Écrire le fichier modifié
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Google Analytics intégré dans ${filePath}`);
        return true;
        
    } catch (error) {
        console.error(`Erreur lors de l'intégration dans ${filePath}:`, error.message);
        return false;
    }
}

// Fonction pour ajouter des attributs de tracking aux éléments
function addTrackingAttributes(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        
        // Ajouter data-service aux boutons de service
        content = content.replace(
            /<a([^>]*class="[^"]*btn[^"]*"[^>]*)href="[^"]*services\/([^"]*)"([^>]*)>/g,
            '<a$1href="/services/$2"$3 data-service="$2">'
        );
        
        // Ajouter data-action="quote" aux boutons de devis
        content = content.replace(
            /<a([^>]*class="[^"]*btn[^"]*"[^>]*)href="[^"]*contact[^"]*"([^>]*)>/g,
            '<a$1href="/contact"$2 data-action="quote">'
        );
        
        // Ajouter onclick pour les téléchargements
        content = content.replace(
            /<a([^>]*href="[^"]*\.pdf[^"]*"[^>]*)>/g,
            '<a$1 onclick="trackDownload(this.href.split(\'/\').pop(), \'pdf\')">'
        );
        
        if (content !== fs.readFileSync(filePath, 'utf8')) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Attributs de tracking ajoutés à ${filePath}`);
            modified = true;
        }
        
        return modified;
        
    } catch (error) {
        console.error(`Erreur lors de l'ajout des attributs dans ${filePath}:`, error.message);
        return false;
    }
}

// Fonction principale
function main() {
    console.log('🚀 Intégration de Google Analytics 4 dans VOC-Call');
    console.log('================================================');
    
    // Obtenir tous les fichiers HTML
    const htmlFiles = getHtmlFiles(CONFIG.pagesDir);
    console.log(`\n📁 ${htmlFiles.length} fichiers HTML trouvés:`);
    htmlFiles.forEach(file => console.log(`  - ${file}`));
    
    let successCount = 0;
    let attributesCount = 0;
    
    // Intégrer Google Analytics dans chaque fichier
    console.log('\n🔧 Intégration en cours...');
    for (const file of htmlFiles) {
        if (integrateAnalytics(file)) {
            successCount++;
        }
        
        if (addTrackingAttributes(file)) {
            attributesCount++;
        }
    }
    
    // Résumé
    console.log('\n✅ Intégration terminée!');
    console.log(`📊 ${successCount}/${htmlFiles.length} fichiers mis à jour avec Google Analytics`);
    console.log(`🏷️  ${attributesCount} fichiers avec attributs de tracking ajoutés`);
    console.log(`💾 Sauvegardes créées dans: ${CONFIG.backupDir}`);
    
    // Instructions de configuration
    console.log('\n⚙️  Configuration requise:');
    console.log(`1. Remplacez '${CONFIG.ga4Id}' par votre ID de propriété GA4 réel`);
    console.log('2. Configurez les objectifs dans Google Analytics 4:');
    console.log('   - Demande de devis (quote_request)');
    console.log('   - Téléchargement (file_download)');
    console.log('   - Inscription newsletter (newsletter_signup)');
    console.log('   - Appel téléphonique (phone_call)');
    console.log('3. Testez le tracking avec Google Tag Assistant');
    console.log('4. Configurez les rapports personnalisés');
    
    return {
        totalFiles: htmlFiles.length,
        successCount,
        attributesCount,
        files: htmlFiles
    };
}

// Exécuter si le script est appelé directement
if (require.main === module) {
    main();
}

// Export pour utilisation dans d'autres scripts
module.exports = {
    integrateAnalytics,
    addTrackingAttributes,
    getHtmlFiles,
    main
};


