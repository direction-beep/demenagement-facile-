# Script simple pour ouvrir les fichiers HTML dans le navigateur
# Conversion manuelle : Ctrl+P -> Enregistrer en PDF

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Ouverture des guides pour conversion PDF" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$files = @(
    "guide-externalisation-service-client-2025.html",
    "checklist-choisir-call-center-france.html",
    "guide-kpi-service-client.html",
    "guide-rgpd-call-center.html",
    "guide-homeshoring-recrutement.html",
    "template-contrat-externalisation.html"
)

Write-Host "Ouverture de $($files.Count) fichiers..." -ForegroundColor Yellow
Write-Host ""

foreach ($file in $files) {
    $filePath = Join-Path $scriptPath $file
    if (Test-Path $filePath) {
        Write-Host "  Ouverture : $file" -ForegroundColor Green
        Start-Process $filePath
        Start-Sleep -Seconds 2
    } else {
        Write-Host "  ERREUR : $file introuvable" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Instructions de conversion :" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Pour chaque onglet ouvert :" -ForegroundColor White
Write-Host "1. Appuyez sur Ctrl+P (ou Cmd+P sur Mac)" -ForegroundColor White
Write-Host "2. Selectionnez 'Enregistrer au format PDF'" -ForegroundColor White
Write-Host "3. Enregistrez dans le dossier 'pdfs'" -ForegroundColor White
Write-Host ""
Write-Host "Les fichiers seront sauvegardes dans :" -ForegroundColor Cyan
Write-Host "$scriptPath\pdfs\" -ForegroundColor Yellow
Write-Host ""
Write-Host "Appuyez sur une touche pour continuer..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

