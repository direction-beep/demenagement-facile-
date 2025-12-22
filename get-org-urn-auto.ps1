# Script automatique pour récupérer l'Organization URN depuis linkedin-credentials.txt

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   Récupération LinkedIn Organization URN" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Lire le token depuis linkedin-credentials.txt
$tokenFile = "linkedin-credentials.txt"
if (-not (Test-Path $tokenFile)) {
    Write-Host "ERREUR: Fichier $tokenFile non trouvé !" -ForegroundColor Red
    exit 1
}

Write-Host "Lecture du fichier $tokenFile..." -ForegroundColor Cyan
$content = Get-Content $tokenFile
$ACCESS_TOKEN = $null

foreach ($line in $content) {
    if ($line -match 'LINKEDIN_ACCESS_TOKEN=(.+)') {
        $ACCESS_TOKEN = $matches[1].Trim()
        break
    }
}

if ([string]::IsNullOrWhiteSpace($ACCESS_TOKEN)) {
    Write-Host "ERREUR: Access Token non trouvé dans $tokenFile !" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Access Token trouvé" -ForegroundColor Green
Write-Host ""

# Préparer les headers
$headers = @{
    "Authorization" = "Bearer $ACCESS_TOKEN"
    "Content-Type" = "application/json"
}

# Méthode 1 : Récupérer les organizations via organizationalEntityAcls
Write-Host "Tentative 1 : Via organizationalEntityAcls..." -ForegroundColor Yellow
try {
    $url1 = 'https://api.linkedin.com/v2/organizationalEntityAcls'
    $params1 = @{
        q = 'roleAssignee'
        role = 'ADMINISTRATOR'
        projection = '(elements*(organizationalTarget~))'
    }
    
    $fullUrl1 = $url1 + '?' + ($params1.GetEnumerator() | ForEach-Object { "$($_.Key)=$($_.Value)" } | Join-String -Separator '&')
    
    $response1 = Invoke-RestMethod -Uri $fullUrl1 -Method Get -Headers $headers
    
    if ($response1.elements -and $response1.elements.Count -gt 0) {
        foreach ($element in $response1.elements) {
            if ($element.organizationalTarget) {
                $orgId = $element.organizationalTarget
                Write-Host ""
                Write-Host "✅ SUCCÈS ! Organization URN trouvé !" -ForegroundColor Green
                Write-Host "================================================" -ForegroundColor Green
                Write-Host $orgId -ForegroundColor White
                Write-Host "================================================" -ForegroundColor Green
                Write-Host ""
                Write-Host "📋 À ajouter dans GitHub Secrets :" -ForegroundColor Yellow
                Write-Host "   Nom du secret : LINKEDIN_PERSON_URN" -ForegroundColor White
                Write-Host "   Valeur : $orgId" -ForegroundColor White
                Write-Host ""
                
                # Mettre à jour le fichier credentials
                $updatedContent = $content | ForEach-Object {
                    if ($_ -match 'LINKEDIN_PERSON_URN=') {
                        "LINKEDIN_PERSON_URN=$orgId"
                    } else {
                        $_
                    }
                }
                Set-Content -Path $tokenFile -Value $updatedContent
                Write-Host "✅ Fichier linkedin-credentials.txt mis à jour" -ForegroundColor Green
                Write-Host ""
                exit 0
            }
        }
    }
    Write-Host "Aucune organization trouvée avec cette méthode" -ForegroundColor Yellow
} catch {
    Write-Host "Erreur: $($_.Exception.Message)" -ForegroundColor Red
}

# Méthode 2 : Via userAdministratedOrganizations
Write-Host ""
Write-Host "Tentative 2 : Via userAdministratedOrganizations..." -ForegroundColor Yellow
try {
    $url2 = 'https://api.linkedin.com/v2/userAdministratedOrganizations'
    $params2 = @{
        q = 'administrators'
        projection = '(elements*(organization~(id,name)))'
    }
    
    $fullUrl2 = $url2 + '?' + ($params2.GetEnumerator() | ForEach-Object { "$($_.Key)=$($_.Value)" } | Join-String -Separator '&')
    
    $response2 = Invoke-RestMethod -Uri $fullUrl2 -Method Get -Headers $headers
    
    if ($response2.elements -and $response2.elements.Count -gt 0) {
        Write-Host ""
        Write-Host "✅ Organizations trouvées :" -ForegroundColor Green
        Write-Host ""
        
        foreach ($element in $response2.elements) {
            if ($element.organization) {
                $orgId = $element.organization.id
                $orgName = $element.organization.name
                Write-Host "   Nom : $orgName" -ForegroundColor Cyan
                Write-Host "   URN : $orgId" -ForegroundColor White
                Write-Host ""
            }
        }
        
        if ($response2.elements[0].organization.id) {
            $firstOrgId = $response2.elements[0].organization.id
            Write-Host "📋 Organisation sélectionnée (première de la liste) :" -ForegroundColor Yellow
            Write-Host "   Nom du secret : LINKEDIN_PERSON_URN" -ForegroundColor White
            Write-Host "   Valeur : $firstOrgId" -ForegroundColor White
            Write-Host ""
            
            # Mettre à jour le fichier credentials
            $updatedContent = $content | ForEach-Object {
                if ($_ -match 'LINKEDIN_PERSON_URN=') {
                    "LINKEDIN_PERSON_URN=$firstOrgId"
                } else {
                    $_
                }
            }
            Set-Content -Path $tokenFile -Value $updatedContent
            Write-Host "✅ Fichier linkedin-credentials.txt mis à jour" -ForegroundColor Green
            Write-Host ""
            exit 0
        }
    }
    Write-Host "Aucune organization trouvée avec cette méthode" -ForegroundColor Yellow
} catch {
    Write-Host "Erreur: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "❌ Aucune Organization URN trouvée" -ForegroundColor Red
Write-Host ""
Write-Host "💡 Solutions possibles :" -ForegroundColor Yellow
Write-Host "   1. Vérifiez que votre Access Token a le scope 'w_organization_social'" -ForegroundColor White
Write-Host "   2. Vérifiez que vous êtes administrateur d'une page LinkedIn" -ForegroundColor White
Write-Host "   3. Générez un nouveau token avec les permissions de page" -ForegroundColor White
Write-Host ""
