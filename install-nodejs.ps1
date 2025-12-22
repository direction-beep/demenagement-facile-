# Script PowerShell pour vérifier et guider l'installation de Node.js
# Usage: .\install-nodejs.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Verification de Node.js" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Vérifier si Node.js est installé
$nodeInstalled = $false
$nodeVersion = $null
$npmVersion = $null

try {
    $nodeVersion = node --version 2>$null
    if ($nodeVersion) {
        $nodeInstalled = $true
        Write-Host "✅ Node.js est installé : $nodeVersion" -ForegroundColor Green
    }
} catch {
    # Node.js n'est pas installé
}

try {
    $npmVersion = npm --version 2>$null
    if ($npmVersion) {
        Write-Host "✅ npm est installé : $npmVersion" -ForegroundColor Green
    }
} catch {
    # npm n'est pas installé
}

Write-Host ""

if ($nodeInstalled) {
    Write-Host "Node.js est deja installe !" -ForegroundColor Green
    Write-Host ""
    Write-Host "Vous pouvez maintenant utiliser les scripts :" -ForegroundColor Yellow
    Write-Host "  - node scripts/generate-blog-article.js" -ForegroundColor White
    Write-Host "  - node scripts/validate-blog-encoding.js" -ForegroundColor White
    Write-Host ""
    exit 0
}

# Node.js n'est pas installe
Write-Host "Node.js n'est pas installe" -ForegroundColor Red
Write-Host ""
Write-Host "Pour installer Node.js :" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Methode recommandee (Site officiel) :" -ForegroundColor Cyan
Write-Host "   - Allez sur : https://nodejs.org/" -ForegroundColor White
Write-Host "   - Telechargez la version LTS (Long Term Support)" -ForegroundColor White
Write-Host "   - Executez l'installateur .msi" -ForegroundColor White
Write-Host "   - Suivez l'assistant d'installation" -ForegroundColor White
Write-Host ""
Write-Host "2. Methode via Winget (Windows 10/11) :" -ForegroundColor Cyan
Write-Host "   winget install OpenJS.NodeJS.LTS" -ForegroundColor White
Write-Host ""
Write-Host "3. Methode via Chocolatey (si installe) :" -ForegroundColor Cyan
Write-Host "   choco install nodejs-lts" -ForegroundColor White
Write-Host ""

# Demander si l'utilisateur veut ouvrir le site de telechargement
$response = Read-Host "Voulez-vous ouvrir le site de telechargement Node.js maintenant ? (O/N)"

if ($response -eq "O" -or $response -eq "o" -or $response -eq "Y" -or $response -eq "y") {
    Write-Host ""
    Write-Host "Ouverture du site Node.js..." -ForegroundColor Yellow
    Start-Process "https://nodejs.org/"
    Write-Host ""
    Write-Host "Apres l'installation :" -ForegroundColor Yellow
    Write-Host "   1. Fermez et rouvrez ce terminal PowerShell" -ForegroundColor White
    Write-Host "   2. Executez a nouveau ce script pour verifier" -ForegroundColor White
    Write-Host "   3. Ou testez avec : node --version" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "Consultez le guide : INSTALLATION_NODEJS.md" -ForegroundColor Yellow
}

Write-Host ""

