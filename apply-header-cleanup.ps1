# Script pour appliquer les améliorations de propreté du header à toutes les pages
Write-Host "Application des améliorations de propreté du header..." -ForegroundColor Green

# Obtenir tous les fichiers HTML
$htmlFiles = Get-ChildItem -Path "." -Filter "*.html" -Recurse | Where-Object { $_.Name -notlike "*analytics*" -and $_.Name -notlike "*backlinks*" -and $_.Name -notlike "*report*" }

Write-Host "Fichiers trouves: $($htmlFiles.Count)" -ForegroundColor Yellow

$updatedCount = 0

foreach ($file in $htmlFiles) {
    Write-Host "Traitement de: $($file.Name)" -ForegroundColor Cyan
    
    # Lire le contenu
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Vérifier si le script header-cleanup.js est déjà présent
    if ($content -match "header-cleanup.js") {
        Write-Host "  Script déjà présent" -ForegroundColor Yellow
        continue
    }
    
    # Ajouter le script avant la balise de fermeture body
    $scriptTag = '    <script src="js/header-cleanup.js"></script>'
    
    # Trouver la dernière balise script avant </body>
    $lastScriptPattern = '(\s*<script[^>]*></script>\s*)(\s*</body>)'
    if ($content -match $lastScriptPattern) {
        $newContent = $content -replace $lastScriptPattern, "`$1`n$scriptTag`n`$2"
    } else {
        # Si pas de script trouvé, ajouter avant </body>
        $newContent = $content -replace '(\s*</body>)', "`n$scriptTag`n`$1"
    }
    
    # Écrire le fichier modifié
    Set-Content $file.FullName $newContent -Encoding UTF8
    Write-Host "  Script header-cleanup.js ajouté" -ForegroundColor Green
    $updatedCount++
}

Write-Host "`nAméliorations appliquées!" -ForegroundColor Green
Write-Host "Fichiers mis à jour: $updatedCount" -ForegroundColor White
Write-Host "Script header-cleanup.js intégré dans toutes les pages" -ForegroundColor Cyan


