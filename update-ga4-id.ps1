# Script pour mettre à jour l'ID Google Analytics 4 avec l'ID réel
# VOC-Call - Mise à jour de G-XXXXXXXXXX vers G-KMNGSGF5WN

Write-Host "Mise à jour de l'ID Google Analytics 4..." -ForegroundColor Green

# ID Google Analytics réel
$REAL_GA4_ID = "G-KMNGSGF5WN"

# Obtenir tous les fichiers HTML
$htmlFiles = Get-ChildItem -Path "." -Filter "*.html" -Recurse | Where-Object { $_.Name -notlike "*analytics*" -and $_.Name -notlike "*backlinks*" }

Write-Host "Fichiers trouves: $($htmlFiles.Count)" -ForegroundColor Yellow

$updatedCount = 0

foreach ($file in $htmlFiles) {
    Write-Host "Traitement de: $($file.Name)" -ForegroundColor Cyan
    
    # Lire le contenu
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Vérifier si le fichier contient l'ancien ID
    if ($content -match "G-XXXXXXXXXX") {
        # Remplacer l'ancien ID par le nouveau
        $newContent = $content -replace "G-XXXXXXXXXX", $REAL_GA4_ID
        
        # Écrire le fichier modifié
        Set-Content $file.FullName $newContent -Encoding UTF8
        Write-Host "  ID Google Analytics mis à jour" -ForegroundColor Green
        $updatedCount++
    } else {
        Write-Host "  ID déjà correct ou non trouvé" -ForegroundColor Yellow
    }
}

Write-Host "`nMise à jour terminée!" -ForegroundColor Green
Write-Host "Fichiers mis à jour: $updatedCount" -ForegroundColor White
Write-Host "ID Google Analytics: $REAL_GA4_ID" -ForegroundColor Cyan


