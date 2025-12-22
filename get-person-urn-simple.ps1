# Script simple pour obtenir le Person URN

$content = Get-Content linkedin-credentials.txt
$token = $null

foreach ($line in $content) {
    if ($line -match 'LINKEDIN_ACCESS_TOKEN=(.+)') {
        $token = $matches[1].Trim()
        break
    }
}

if (-not $token) {
    Write-Host "Token non trouve" -ForegroundColor Red
    exit 1
}

$headers = @{
    Authorization = "Bearer $token"
    'Content-Type' = 'application/json'
}

try {
    $response = Invoke-RestMethod -Uri 'https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName)' -Method Get -Headers $headers
    
    Write-Host ""
    Write-Host "SUCCES ! Person URN trouve !" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "URN: $($response.id)" -ForegroundColor White
    if ($response.localizedFirstName) {
        Write-Host "Profil: $($response.localizedFirstName) $($response.localizedLastName)" -ForegroundColor Cyan
    }
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "A ajouter dans GitHub Secrets :" -ForegroundColor Yellow
    Write-Host "   Nom: LINKEDIN_PERSON_URN" -ForegroundColor White
    Write-Host "   Valeur: $($response.id)" -ForegroundColor White
    Write-Host ""
    
    # Mettre a jour le fichier
    $updated = $content | ForEach-Object {
        if ($_ -match 'LINKEDIN_PERSON_URN=') {
            "LINKEDIN_PERSON_URN=$($response.id)"
        } else {
            $_
        }
    }
    Set-Content -Path linkedin-credentials.txt -Value $updated
    Write-Host "Fichier linkedin-credentials.txt mis a jour" -ForegroundColor Green
    Write-Host ""
    
} catch {
    Write-Host ""
    Write-Host "ERREUR: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $body = $reader.ReadToEnd()
        Write-Host "Reponse API: $body" -ForegroundColor Yellow
    }
    Write-Host ""
    Write-Host "Pour publier sur une PAGE LinkedIn, vous devez :" -ForegroundColor Yellow
    Write-Host "   1. Generer un nouveau token avec le scope w_organization_social" -ForegroundColor White
    Write-Host "   2. Executer: .\get-linkedin-token.ps1" -ForegroundColor White
    Write-Host ""
}
