# Script simple pour ajouter Google Analytics
Write-Host "Ajout de Google Analytics aux pages HTML..." -ForegroundColor Green

# Obtenir tous les fichiers HTML
$htmlFiles = Get-ChildItem -Path "." -Filter "*.html" -Recurse | Where-Object { $_.Name -notlike "*analytics*" -and $_.Name -notlike "*backlinks*" }

Write-Host "Fichiers trouves: $($htmlFiles.Count)" -ForegroundColor Yellow

foreach ($file in $htmlFiles) {
    Write-Host "Traitement de: $($file.Name)" -ForegroundColor Cyan
    
    # Lire le contenu
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Vérifier si GA4 est déjà présent
    if ($content -match "googletagmanager") {
        Write-Host "  Google Analytics déjà présent" -ForegroundColor Yellow
        continue
    }
    
    # Code GA4 simple
    $gaCode = @"

<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
"@
    
    # Trouver </head> et insérer le code
    $headEndIndex = $content.IndexOf("</head>")
    if ($headEndIndex -gt 0) {
        $newContent = $content.Substring(0, $headEndIndex) + $gaCode + "`n" + $content.Substring($headEndIndex)
        Set-Content $file.FullName $newContent -Encoding UTF8
        Write-Host "  Google Analytics ajouté" -ForegroundColor Green
    } else {
        Write-Host "  Balise </head> non trouvée" -ForegroundColor Red
    }
}

Write-Host "Terminé!" -ForegroundColor Green


