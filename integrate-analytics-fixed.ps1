# Script PowerShell pour intégrer Google Analytics 4 dans toutes les pages HTML
# VOC-Call - Intégration automatique du tracking

# Configuration
$GA4_ID = "G-XXXXXXXXXX"  # À remplacer par votre ID de propriété GA4
$SITE_URL = "https://voc-call.com"
$BACKUP_DIR = ".\backup\"
$EXCLUDE_FILES = @("analytics-tracking.html", "backlinks-strategy.html", "backlinks-action-plan.html", "analytics-dashboard.html")

# Code Google Analytics à insérer
$GA4_CODE = @"
<!-- Google Analytics 4 - VOC-Call -->
<script async src="https://www.googletagmanager.com/gtag/js?id=$GA4_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '$GA4_ID', {
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
</script>
"@

# Fonction pour créer une sauvegarde
function Create-Backup {
    param($FilePath)
    
    if (!(Test-Path $BACKUP_DIR)) {
        New-Item -ItemType Directory -Path $BACKUP_DIR -Force | Out-Null
    }
    
    $fileName = Split-Path $FilePath -Leaf
    $backupPath = Join-Path $BACKUP_DIR $fileName
    Copy-Item $FilePath $backupPath
    Write-Host "Sauvegarde créée: $backupPath" -ForegroundColor Green
}

# Fonction pour intégrer Google Analytics
function Integrate-Analytics {
    param($FilePath)
    
    try {
        # Créer une sauvegarde
        Create-Backup $FilePath
        
        # Lire le fichier
        $content = Get-Content $FilePath -Raw -Encoding UTF8
        
        # Vérifier si GA4 est déjà présent
        if ($content -match "googletagmanager\.com/gtag/js") {
            Write-Host "Google Analytics déjà présent dans $FilePath" -ForegroundColor Yellow
            return $false
        }
        
        # Trouver la balise </head>
        $headEndIndex = $content.IndexOf("</head>")
        if ($headEndIndex -eq -1) {
            Write-Host "Balise </head> non trouvée dans $FilePath" -ForegroundColor Red
            return $false
        }
        
        # Insérer le code GA4 avant </head>
        $newContent = $content.Substring(0, $headEndIndex) + 
                     "`n" + $GA4_CODE + "`n" + 
                     $content.Substring($headEndIndex)
        
        # Écrire le fichier modifié
        Set-Content $FilePath $newContent -Encoding UTF8
        Write-Host "Google Analytics intégré dans $FilePath" -ForegroundColor Green
        return $true
        
    } catch {
        Write-Host "Erreur lors de l'intégration dans $FilePath`: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Fonction pour ajouter des attributs de tracking
function Add-TrackingAttributes {
    param($FilePath)
    
    try {
        $content = Get-Content $FilePath -Raw -Encoding UTF8
        $originalContent = $content
        
        # Ajouter data-service aux boutons de service
        $content = $content -replace '(<a[^>]*class="[^"]*btn[^"]*"[^>]*)href="[^"]*services/([^"]*)"([^>]*)>', '<a$1href="/services/$2"$3 data-service="$2">'
        
        # Ajouter data-action="quote" aux boutons de devis
        $content = $content -replace '(<a[^>]*class="[^"]*btn[^"]*"[^>]*)href="[^"]*contact[^"]*"([^>]*)>', '<a$1href="/contact"$2 data-action="quote">'
        
        # Ajouter onclick pour les téléchargements
        $content = $content -replace '(<a[^>]*href="[^"]*\.pdf[^"]*"[^>]*)>', '<a$1 onclick="trackDownload(this.href.split(''/'').pop(), ''pdf'')">'
        
        if ($content -ne $originalContent) {
            Set-Content $FilePath $content -Encoding UTF8
            Write-Host "Attributs de tracking ajoutés à $FilePath" -ForegroundColor Green
            return $true
        }
        
        return $false
        
    } catch {
        Write-Host "Erreur lors de l'ajout des attributs dans $FilePath`: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Fonction principale
function Main {
    Write-Host "🚀 Intégration de Google Analytics 4 dans VOC-Call" -ForegroundColor Cyan
    Write-Host "=================================================" -ForegroundColor Cyan
    
    # Obtenir tous les fichiers HTML
    $htmlFiles = Get-ChildItem -Path "." -Filter "*.html" -Recurse | 
                 Where-Object { $_.Name -notin $EXCLUDE_FILES -and $_.Directory.Name -ne "backup" }
    
    Write-Host "`n📁 $($htmlFiles.Count) fichiers HTML trouvés:" -ForegroundColor White
    $htmlFiles | ForEach-Object { Write-Host "  - $($_.FullName)" -ForegroundColor Gray }
    
    $successCount = 0
    $attributesCount = 0
    
    # Intégrer Google Analytics dans chaque fichier
    Write-Host "`n🔧 Intégration en cours..." -ForegroundColor White
    foreach ($file in $htmlFiles) {
        if (Integrate-Analytics $file.FullName) {
            $successCount++
        }
        
        if (Add-TrackingAttributes $file.FullName) {
            $attributesCount++
        }
    }
    
    # Résumé
    Write-Host "`n✅ Intégration terminée!" -ForegroundColor Green
    Write-Host "📊 $successCount/$($htmlFiles.Count) fichiers mis à jour avec Google Analytics" -ForegroundColor White
    Write-Host "🏷️  $attributesCount fichiers avec attributs de tracking ajoutés" -ForegroundColor White
    Write-Host "💾 Sauvegardes créées dans: $BACKUP_DIR" -ForegroundColor White
    
    # Instructions de configuration
    Write-Host "`n⚙️  Configuration requise:" -ForegroundColor Yellow
    Write-Host "1. Remplacez '$GA4_ID' par votre ID de propriété GA4 réel" -ForegroundColor White
    Write-Host "2. Configurez les objectifs dans Google Analytics 4:" -ForegroundColor White
    Write-Host "   - Demande de devis (quote_request)" -ForegroundColor Gray
    Write-Host "   - Téléchargement (file_download)" -ForegroundColor Gray
    Write-Host "   - Inscription newsletter (newsletter_signup)" -ForegroundColor Gray
    Write-Host "   - Appel téléphonique (phone_call)" -ForegroundColor Gray
    Write-Host "3. Testez le tracking avec Google Tag Assistant" -ForegroundColor White
    Write-Host "4. Configurez les rapports personnalisés" -ForegroundColor White
    
    return @{
        TotalFiles = $htmlFiles.Count
        SuccessCount = $successCount
        AttributesCount = $attributesCount
        Files = $htmlFiles
    }
}

# Exécuter le script
$result = Main

# Afficher le résultat final
Write-Host "`n🎉 Script terminé avec succès!" -ForegroundColor Green
Write-Host "📈 Prochaines étapes:" -ForegroundColor Cyan
Write-Host "1. Ouvrez Google Analytics 4" -ForegroundColor White
Write-Host "2. Configurez votre propriété avec l'ID: $GA4_ID" -ForegroundColor White
Write-Host "3. Testez le tracking sur votre site" -ForegroundColor White
Write-Host "4. Consultez le dashboard: analytics-dashboard.html" -ForegroundColor White


