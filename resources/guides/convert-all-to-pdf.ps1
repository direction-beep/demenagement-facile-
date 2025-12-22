# Script de conversion automatique des guides HTML en PDF
# Utilise Chrome/Edge pour préserver les styles CSS

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Conversion des guides HTML en PDF" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Vérifier si Chrome ou Edge est disponible
$chromePath = ""
$edgePath = ""

# Chercher Chrome
$chromePaths = @(
    "${env:ProgramFiles}\Google\Chrome\Application\chrome.exe",
    "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
    "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe"
)

foreach ($path in $chromePaths) {
    if (Test-Path $path) {
        $chromePath = $path
        Write-Host "✓ Chrome trouvé : $path" -ForegroundColor Green
        break
    }
}

# Chercher Edge si Chrome n'est pas trouvé
if (-not $chromePath) {
    $edgePaths = @(
        "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
        "${env:ProgramFiles}\Microsoft\Edge\Application\msedge.exe"
    )
    
    foreach ($path in $edgePaths) {
        if (Test-Path $path) {
            $edgePath = $path
            Write-Host "✓ Edge trouvé : $path" -ForegroundColor Green
            break
        }
    }
}

# Vérifier qu'un navigateur est disponible
if (-not $chromePath -and -not $edgePath) {
    Write-Host "❌ Erreur : Chrome ou Edge n'est pas installé" -ForegroundColor Red
    Write-Host "Veuillez installer Chrome ou Edge pour utiliser ce script" -ForegroundColor Yellow
    exit 1
}

$browserPath = if ($chromePath) { $chromePath } else { $edgePath }
$browserName = if ($chromePath) { "Chrome" } else { "Edge" }

Write-Host "Navigateur utilisé : $browserName" -ForegroundColor Cyan
Write-Host ""

# Créer le dossier PDFs s'il n'existe pas
$pdfFolder = Join-Path $PSScriptRoot "pdfs"
if (-not (Test-Path $pdfFolder)) {
    New-Item -ItemType Directory -Path $pdfFolder | Out-Null
    Write-Host "✓ Dossier 'pdfs' créé" -ForegroundColor Green
}

# Liste des fichiers HTML à convertir
$htmlFiles = @(
    @{
        Input = "guide-externalisation-service-client-2025.html"
        Output = "Guide-Externalisation-Service-Client-2025.pdf"
        Name = "Guide Complet : Externalisation Service Client 2025"
    },
    @{
        Input = "checklist-choisir-call-center-france.html"
        Output = "Checklist-Choisir-Call-Center-France.pdf"
        Name = "Checklist : Choisir un Call Center en France"
    },
    @{
        Input = "guide-kpi-service-client.html"
        Output = "Guide-KPI-Service-Client.pdf"
        Name = "Guide KPI : Mesurer la Performance Service Client"
    },
    @{
        Input = "guide-rgpd-call-center.html"
        Output = "Guide-RGPD-Call-Center.pdf"
        Name = "Guide RGPD : Conformité Call Center"
    },
    @{
        Input = "guide-homeshoring-recrutement.html"
        Output = "Guide-Homeshoring-Recrutement.pdf"
        Name = "Guide Homeshoring : Recruter des Téléconseillers à Distance"
    },
    @{
        Input = "template-contrat-externalisation.html"
        Output = "Template-Contrat-Externalisation.pdf"
        Name = "Template : Contrat Externalisation Service Client"
    }
)

$successCount = 0
$errorCount = 0

foreach ($file in $htmlFiles) {
    $inputPath = Join-Path $PSScriptRoot $file.Input
    $outputPath = Join-Path $pdfFolder $file.Output
    
    Write-Host "Conversion : $($file.Name)" -ForegroundColor Yellow
    
    if (-not (Test-Path $inputPath)) {
        Write-Host "  ❌ Fichier introuvable : $inputPath" -ForegroundColor Red
        $errorCount++
        continue
    }
    
    try {
        # Convertir en URI file://
        $fileUri = [System.Uri]::new($inputPath).AbsoluteUri
        
        # Commande pour convertir en PDF
        $arguments = @(
            "--headless",
            "--disable-gpu",
            "--print-to-pdf=`"$outputPath`"",
            "--no-pdf-header-footer",
            "--print-to-pdf-no-header",
            $fileUri
        )
        
        # Exécuter la conversion
        $process = Start-Process -FilePath $browserPath -ArgumentList $arguments -Wait -PassThru -WindowStyle Hidden
        
        if ($process.ExitCode -eq 0 -and (Test-Path $outputPath)) {
            $fileSize = (Get-Item $outputPath).Length / 1KB
            Write-Host "  ✓ Converti avec succès ($([math]::Round($fileSize, 2)) KB)" -ForegroundColor Green
            $successCount++
        } else {
            Write-Host "  ❌ Erreur lors de la conversion" -ForegroundColor Red
            $errorCount++
        }
        
        # Petite pause entre les conversions
        Start-Sleep -Seconds 1
        
    } catch {
        Write-Host "  ❌ Erreur : $($_.Exception.Message)" -ForegroundColor Red
        $errorCount++
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Résumé de la conversion" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✓ Succès : $successCount" -ForegroundColor Green
Write-Host "❌ Erreurs : $errorCount" -ForegroundColor $(if ($errorCount -gt 0) { "Red" } else { "Green" })
Write-Host ""
Write-Host "Les PDFs sont disponibles dans : $pdfFolder" -ForegroundColor Cyan
Write-Host ""

# Note sur le calculateur ROI
Write-Host "Note : Le calculateur ROI (calculateur-roi-service-client.csv)" -ForegroundColor Yellow
Write-Host "      doit être ouvert dans Excel et exporté manuellement en PDF." -ForegroundColor Yellow
Write-Host ""

