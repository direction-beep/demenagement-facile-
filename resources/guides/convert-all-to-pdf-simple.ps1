# Script simplifié de conversion HTML en PDF
# Alternative si le script principal ne fonctionne pas

Write-Host "Conversion des guides HTML en PDF" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Créer le dossier PDFs
$pdfFolder = Join-Path $PSScriptRoot "pdfs"
if (-not (Test-Path $pdfFolder)) {
    New-Item -ItemType Directory -Path $pdfFolder | Out-Null
}

# Liste des fichiers
$files = @(
    "guide-externalisation-service-client-2025.html",
    "checklist-choisir-call-center-france.html",
    "guide-kpi-service-client.html",
    "guide-rgpd-call-center.html",
    "guide-homeshoring-recrutement.html",
    "template-contrat-externalisation.html"
)

Write-Host "Instructions manuelles :" -ForegroundColor Yellow
Write-Host ""
Write-Host "Pour chaque fichier HTML :" -ForegroundColor White
Write-Host "1. Ouvrez le fichier dans Chrome ou Edge" -ForegroundColor White
Write-Host "2. Appuyez sur Ctrl+P (ou Cmd+P sur Mac)" -ForegroundColor White
Write-Host "3. Sélectionnez 'Enregistrer au format PDF'" -ForegroundColor White
Write-Host "4. Enregistrez dans le dossier 'pdfs'" -ForegroundColor White
Write-Host ""

Write-Host "Fichiers à convertir :" -ForegroundColor Cyan
foreach ($file in $files) {
    $filePath = Join-Path $PSScriptRoot $file
    if (Test-Path $filePath) {
        Write-Host "  ✓ $file" -ForegroundColor Green
        # Ouvrir le fichier dans le navigateur par défaut
        Start-Process $filePath
        Start-Sleep -Seconds 2
    } else {
        Write-Host "  ❌ $file (introuvable)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Les fichiers ont été ouverts dans votre navigateur." -ForegroundColor Green
Write-Host "Convertissez-les manuellement en PDF (Ctrl+P → Enregistrer en PDF)" -ForegroundColor Yellow
Write-Host ""

