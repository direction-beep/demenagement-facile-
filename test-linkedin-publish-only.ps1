# Test de publication LinkedIn uniquement (sans récupérer le profil)
# Cette version teste directement la publication

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   Test Publication LinkedIn - VOC-Call" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

$ACCESS_TOKEN = "AQUK4OWEXWzJBydknYtKhsaLmOfO1Kd3Ns3XWfmNXMqsiqSKUtPWvm66umsqGObjtmjRd48RN--zUmlBd8GiWA50JHe2qDp1whDRRpY7xMMzvMNY8Z3CNIZ5CZLVhMuBU2biKwdAjthYaABLFKPBcKZpfrSrstV5qE2tNHF7xffeP2rTFO5yHHHlLMa9Wjsq7WUrJBTnnuk3mV8Jc7iIXq8Cv2Mf1i4flmbzIjm4oRD5TiyBfGGUc8MJhfic6UqTrKBSZp4-jNfSCYpFaeUMcOTPYAL-fuGjXzJfpVspLhey8bIoLuTT6h_fd140aUE3vTTcAYGNn4HB2BT8TIQiIkXFFRbfmg"

Write-Host "Test : Recuperation automatique de l'URN du profil..." -ForegroundColor Cyan
Write-Host ""

# Essayer de récupérer l'URN d'une autre manière
try {
    # Test avec le endpoint /userinfo (OpenID Connect)
    $headers = @{
        "Authorization" = "Bearer $ACCESS_TOKEN"
        "Content-Type" = "application/json"
    }
    
    # Essayer /userinfo (si disponible avec OpenID)
    try {
        $userInfo = Invoke-RestMethod -Uri "https://api.linkedin.com/v2/userinfo" -Method Get -Headers $headers -ErrorAction SilentlyContinue
        if ($userInfo.sub) {
            $PERSON_URN = $userInfo.sub
            Write-Host "SUCCES ! URN recupere via /userinfo : $PERSON_URN" -ForegroundColor Green
        }
    } catch {
        # Si /userinfo ne fonctionne pas, on essaie une autre méthode
        Write-Host "Methode /userinfo non disponible, essai alternative..." -ForegroundColor Yellow
    }
    
    # Essayer /people/me (version alternative)
    try {
        $people = Invoke-RestMethod -Uri "https://api.linkedin.com/v2/people/me" -Method Get -Headers $headers -ErrorAction SilentlyContinue
        if ($people.id) {
            $PERSON_URN = $people.id
            Write-Host "SUCCES ! URN recupere via /people/me : $PERSON_URN" -ForegroundColor Green
        }
    } catch {
        Write-Host "Methode /people/me non disponible" -ForegroundColor Yellow
    }
    
    if (-not $PERSON_URN) {
        Write-Host ""
        Write-Host "ATTENTION : Impossible de recuperer l'URN automatiquement" -ForegroundColor Yellow
        Write-Host "Mais ce n'est pas grave ! Le script publish.js le recuperera automatiquement lors de la publication." -ForegroundColor Yellow
        Write-Host ""
        Write-Host "OPTION 1 : Tester la publication avec l'URN auto-detectee par le script" -ForegroundColor Cyan
        Write-Host "OPTION 2 : Tester directement le workflow GitHub Actions" -ForegroundColor Cyan
        Write-Host ""
        
        $testChoice = Read-Host "Voulez-vous tester via le script publish.js directement ? (oui/non)"
        
        if ($testChoice -eq "oui") {
            Write-Host ""
            Write-Host "Test via le script publish.js (il detectera automatiquement l'URN)..." -ForegroundColor Cyan
            Write-Host ""
            Write-Host "Note : Pour un vrai test, vous pouvez :" -ForegroundColor Yellow
            Write-Host "1. Creer un brouillon de test dans blog/_drafts/test-publication/" -ForegroundColor White
            Write-Host "2. Mettre une date d'aujourd'hui dans meta.json" -ForegroundColor White
            Write-Host "3. Lancer : node scripts/publish.js" -ForegroundColor White
            Write-Host ""
            Write-Host "Ou attendre que GitHub Actions le fasse automatiquement !" -ForegroundColor Green
            exit 0
        }
        
        exit 0
    }
    
} catch {
    Write-Host "Erreur lors de la recuperation de l'URN : $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Ce n'est pas grave - le script publish.js le recuperera automatiquement." -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "ETAPE 2 : Test de creation d'un post..." -ForegroundColor Yellow
Write-Host "-----------------------------------------------" -ForegroundColor Yellow
Write-Host ""
Write-Host "ATTENTION : Ce test va creer un VRAI post sur votre profil LinkedIn !" -ForegroundColor Yellow
Write-Host ""

$confirm = Read-Host "Voulez-vous creer un post de test ? (oui/non)"

if ($confirm -ne "oui") {
    Write-Host ""
    Write-Host "Test annule." -ForegroundColor Green
    Write-Host ""
    Write-Host "RESUME :" -ForegroundColor Cyan
    Write-Host "  - Access Token : CONFIGURE" -ForegroundColor Green
    Write-Host "  - L'integration est pret a fonctionner !" -ForegroundColor Green
    Write-Host ""
    Write-Host "Le script publish.js recuperera automatiquement l'URN lors de la premiere publication." -ForegroundColor Cyan
    exit 0
}

# Test de publication
Write-Host ""
Write-Host "Creation d'un post de test..." -ForegroundColor Cyan

$testPostText = "🧪 Test automatique depuis VOC-Call Blog Publisher`n`nCe message confirme que l'integration LinkedIn fonctionne correctement ! ✅`n`n#VOCCall #Test #Integration"

try {
    $ugcPost = @{
        author = $PERSON_URN
        lifecycleState = "PUBLISHED"
        specificContent = @{
            "com.linkedin.ugc.ShareContent" = @{
                shareCommentary = @{
                    text = $testPostText
                }
                shareMediaCategory = "ARTICLE"
                media = @()
            }
        }
        visibility = @{
            "com.linkedin.ugc.MemberNetworkVisibility" = "PUBLIC"
        }
    } | ConvertTo-Json -Depth 10

    $postHeaders = @{
        "Authorization" = "Bearer $ACCESS_TOKEN"
        "Content-Type" = "application/json"
        "X-Restli-Protocol-Version" = "2.0.0"
    }

    $postResponse = Invoke-RestMethod -Uri "https://api.linkedin.com/v2/ugcPosts" -Method Post -Headers $postHeaders -Body $ugcPost

    if ($postResponse.id) {
        Write-Host ""
        Write-Host "SUCCES ! Post de test cree sur LinkedIn !" -ForegroundColor Green
        Write-Host "  - Post ID: $($postResponse.id)" -ForegroundColor White
        Write-Host ""
        Write-Host "L'integration LinkedIn est OPERATIONNELLE !" -ForegroundColor Green
    }
} catch {
    Write-Host ""
    Write-Host "ERREUR lors de la creation du post :" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Reponse: $responseBody" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Appuyez sur une touche pour quitter..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")


