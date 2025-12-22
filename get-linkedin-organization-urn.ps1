# Script PowerShell pour obtenir l'Organization URN de votre page LinkedIn
# Usage: .\get-linkedin-organization-urn.ps1

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   Obtenir LinkedIn Organization URN" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Demander l'Access Token
Write-Host "ETAPE 1 : Entrez votre Access Token LinkedIn" -ForegroundColor Yellow
Write-Host "-----------------------------------------------" -ForegroundColor Yellow
Write-Host "Vous pouvez trouver votre Access Token dans GitHub Secrets (LINKEDIN_ACCESS_TOKEN)" -ForegroundColor Gray
Write-Host "ou l'obtenir via get-linkedin-token.ps1" -ForegroundColor Gray
Write-Host ""
$ACCESS_TOKEN = Read-Host "Collez votre Access Token ici"

if ([string]::IsNullOrWhiteSpace($ACCESS_TOKEN)) {
    Write-Host "ERREUR: Access Token requis !" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "ETAPE 2 : Récupération de l'Organization URN..." -ForegroundColor Yellow
Write-Host "-----------------------------------------------" -ForegroundColor Yellow
Write-Host ""

try {
    # Appel API pour récupérer les pages/organizations
    $headers = @{
        "Authorization" = "Bearer $ACCESS_TOKEN"
        "Content-Type" = "application/json"
    }
    
    # Méthode 1 : Récupérer les organizations via organizationalEntityAcls
    Write-Host "Tentative 1 : Via organizationalEntityAcls..." -ForegroundColor Cyan
    try {
        $url = "https://api.linkedin.com/v2/organizationalEntityAcls?q=roleAssignee&role=ADMINISTRATOR&projection=(elements*(organizationalTarget~))"
        $response = Invoke-RestMethod -Uri $url -Method Get -Headers $headers
        
        if ($response.elements -and $response.elements.Count -gt 0) {
            foreach ($element in $response.elements) {
                if ($element.organizationalTarget) {
                    $orgId = $element.organizationalTarget
                    Write-Host ""
                    Write-Host "✅ Organization URN trouvé !" -ForegroundColor Green
                    Write-Host "================================================" -ForegroundColor Green
                    Write-Host $orgId -ForegroundColor White
                    Write-Host "================================================" -ForegroundColor Green
                    Write-Host ""
                    Write-Host "📋 À ajouter dans GitHub Secrets :" -ForegroundColor Yellow
                    Write-Host "   Nom du secret : LINKEDIN_PERSON_URN" -ForegroundColor White
                    Write-Host "   Valeur : $orgId" -ForegroundColor White
                    Write-Host ""
                    exit 0
                }
            }
        }
        Write-Host "Aucune organization trouvée avec cette méthode" -ForegroundColor Yellow
    } catch {
        Write-Host "Erreur avec cette méthode : $($_.Exception.Message)" -ForegroundColor Yellow
    }
    
    # Méthode 2 : Récupérer les pages via userAdministratedOrganizations
    Write-Host ""
    Write-Host "Tentative 2 : Via userAdministratedOrganizations..." -ForegroundColor Cyan
    try {
        $url = "https://api.linkedin.com/v2/userAdministratedOrganizations?q=administrators&projection=(elements*(organization~(id,name)))"
        $response = Invoke-RestMethod -Uri $url -Method Get -Headers $headers
        
        if ($response.elements -and $response.elements.Count -gt 0) {
            Write-Host ""
            Write-Host "✅ Organizations trouvées :" -ForegroundColor Green
            Write-Host ""
            
            foreach ($element in $response.elements) {
                if ($element.organization) {
                    $orgId = $element.organization.id
                    $orgName = $element.organization.name
                    Write-Host "   Nom : $orgName" -ForegroundColor Cyan
                    Write-Host "   URN : $orgId" -ForegroundColor White
                    Write-Host ""
                }
            }
            
            if ($response.elements[0].organization.id) {
                $firstOrgId = $response.elements[0].organization.id
                Write-Host "📋 Organisation sélectionnée (première de la liste) :" -ForegroundColor Yellow
                Write-Host "   Nom du secret : LINKEDIN_PERSON_URN" -ForegroundColor White
                Write-Host "   Valeur : $firstOrgId" -ForegroundColor White
                Write-Host ""
                Write-Host "💡 Si vous avez plusieurs pages, choisissez celle que vous voulez utiliser" -ForegroundColor Gray
                Write-Host ""
            }
            exit 0
        }
        Write-Host "Aucune organization trouvée avec cette méthode" -ForegroundColor Yellow
    } catch {
        Write-Host "Erreur avec cette méthode : $($_.Exception.Message)" -ForegroundColor Yellow
    }
    
    # Méthode 3 : Essayer de récupérer via /v2/me pour voir les permissions
    Write-Host ""
    Write-Host "Tentative 3 : Vérification des permissions..." -ForegroundColor Cyan
    try {
        $url = "https://api.linkedin.com/v2/me?projection=(id)"
        $response = Invoke-RestMethod -Uri $url -Method Get -Headers $headers
        
        if ($response.id) {
            Write-Host ""
            Write-Host "⚠️  Token valide mais pour un profil personnel (Person URN)" -ForegroundColor Yellow
            Write-Host "   Person URN : $($response.id)" -ForegroundColor White
            Write-Host ""
            Write-Host "💡 Pour publier sur une page LinkedIn, vous devez :" -ForegroundColor Cyan
            Write-Host "   1. Ajouter le scope 'w_organization_social' lors de la génération du token" -ForegroundColor White
            Write-Host "   2. Utiliser un token généré avec les permissions de page" -ForegroundColor White
            Write-Host ""
        }
    } catch {
        Write-Host "Impossible de vérifier les permissions : $($_.Exception.Message)" -ForegroundColor Yellow
    }
    
    Write-Host ""
    Write-Host "❌ Aucune Organization URN trouvée" -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Solutions possibles :" -ForegroundColor Yellow
    Write-Host "   1. Vérifiez que votre Access Token a le scope 'w_organization_social'" -ForegroundColor White
    Write-Host "   2. Vérifiez que vous êtes administrateur d'une page LinkedIn" -ForegroundColor White
    Write-Host "   3. Générez un nouveau token avec les permissions de page" -ForegroundColor White
    Write-Host ""
    
} catch {
    Write-Host ""
    Write-Host "❌ ERREUR lors de la récupération de l'URN :" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Dépannage :" -ForegroundColor Yellow
    Write-Host "- Vérifiez que votre Access Token est valide (pas expiré)" -ForegroundColor White
    Write-Host "- Vérifiez que le token a les permissions 'w_organization_social'" -ForegroundColor White
    Write-Host "- Vérifiez que vous êtes bien administrateur d'une page LinkedIn" -ForegroundColor White
    Write-Host ""
}

Write-Host ""
Write-Host "Appuyez sur une touche pour quitter..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

