# Script PowerShell pour obtenir un Access Token LinkedIn
# Usage: .\get-linkedin-token.ps1

$CLIENT_ID = "78a639tvdurngb"
$REDIRECT_URI = "http://localhost:3000"
# Scopes pour publier sur une page LinkedIn (Organization)
$SCOPES = "openid%20profile%20email%20w_member_social%20w_organization_social"

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   Obtenir un Access Token LinkedIn - VOC-Call" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Etape 1 : Demander le Client Secret
Write-Host "ETAPE 1 : Entrez vos identifiants" -ForegroundColor Yellow
Write-Host "-----------------------------------------------" -ForegroundColor Yellow
Write-Host "Client ID detecte : $CLIENT_ID" -ForegroundColor Green
$CLIENT_SECRET = Read-Host "Entrez votre Client Secret"

if ([string]::IsNullOrWhiteSpace($CLIENT_SECRET)) {
    Write-Host "ERREUR: Client Secret requis !" -ForegroundColor Red
    exit 1
}

# Etape 2 : Generer l'URL d'autorisation
Write-Host ""
Write-Host "ETAPE 2 : Autoriser l'application LinkedIn" -ForegroundColor Yellow
Write-Host "-----------------------------------------------" -ForegroundColor Yellow

$STATE = "random_" + (Get-Random -Minimum 1000 -Maximum 9999)
$ENCODED_URI = [System.Web.HttpUtility]::UrlEncode($REDIRECT_URI)
$AUTH_URL = "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=$CLIENT_ID&redirect_uri=$ENCODED_URI&scope=$SCOPES&state=$STATE"

Write-Host "1. Ouvrez ce lien dans votre navigateur :" -ForegroundColor White
Write-Host ""
Write-Host $AUTH_URL -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Autorisez l'application LinkedIn" -ForegroundColor White
Write-Host "3. Apres autorisation, vous serez redirige vers une URL avec ?code=XXXXX" -ForegroundColor White
Write-Host "4. ATTENTION: La page peut afficher une erreur - c'est normal !" -ForegroundColor Yellow
Write-Host "5. Regardez la BARRE D'ADRESSE de votre navigateur" -ForegroundColor White
Write-Host "6. Copiez le code apres ?code= (tout le code, c'est long !)" -ForegroundColor White
Write-Host ""

# Etape 3 : Demander le code
$AUTH_CODE = Read-Host "Collez le code d'autorisation ici"

if ([string]::IsNullOrWhiteSpace($AUTH_CODE)) {
    Write-Host "ERREUR: Code requis !" -ForegroundColor Red
    exit 1
}

# Etape 4 : Echanger le code contre un token
Write-Host ""
Write-Host "ETAPE 3 : Echange du code contre un Access Token..." -ForegroundColor Yellow
Write-Host "-----------------------------------------------" -ForegroundColor Yellow
Write-Host ""

try {
    $body = @{
        grant_type = "authorization_code"
        code = $AUTH_CODE
        redirect_uri = $REDIRECT_URI
        client_id = $CLIENT_ID
        client_secret = $CLIENT_SECRET
    }

    $response = Invoke-RestMethod -Uri "https://www.linkedin.com/oauth/v2/accessToken" -Method Post -Body $body -ContentType "application/x-www-form-urlencoded"

    if ($response.access_token) {
        Write-Host ""
        Write-Host "SUCCES ! Access Token obtenu :" -ForegroundColor Green
        Write-Host "================================================" -ForegroundColor Green
        Write-Host $response.access_token -ForegroundColor White
        Write-Host "================================================" -ForegroundColor Green
        Write-Host ""
        $days = [math]::Floor($response.expires_in / 86400)
        Write-Host "Expire dans : $days jours" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "IMPORTANT : Ajoutez cette valeur dans GitHub Secrets :" -ForegroundColor Yellow
        Write-Host "   Nom du secret : LINKEDIN_ACCESS_TOKEN" -ForegroundColor White
        Write-Host "   Valeur : (copiez le token ci-dessus)" -ForegroundColor White
        Write-Host ""

        # Optionnel : Recuperer le Person URN
        Write-Host "Recuperation du Person URN (optionnel)..." -ForegroundColor Cyan
        try {
            $headers = @{
                "Authorization" = "Bearer $($response.access_token)"
                "Content-Type" = "application/json"
            }
            $profile = Invoke-RestMethod -Uri "https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName)" -Method Get -Headers $headers
            
            if ($profile.id) {
                Write-Host ""
                Write-Host "Person URN: $($profile.id)" -ForegroundColor Green
                if ($profile.localizedFirstName) {
                    Write-Host "   Profil: $($profile.localizedFirstName) $($profile.localizedLastName)" -ForegroundColor Cyan
                }
                Write-Host ""
                Write-Host "Optionnel : Ajoutez cette valeur dans GitHub Secrets :" -ForegroundColor Yellow
                Write-Host "   Nom du secret : LINKEDIN_PERSON_URN" -ForegroundColor White
                Write-Host "   Valeur : $($profile.id)" -ForegroundColor White
                Write-Host ""
                Write-Host "(Note: Si non fourni, le script recuperera automatiquement cet URN)" -ForegroundColor Gray
                Write-Host ""
            }
        } catch {
            Write-Host "Impossible de recuperer le Person URN (non critique)" -ForegroundColor Yellow
        }
    } else {
        Write-Host "ERREUR: Pas de token dans la reponse" -ForegroundColor Red
        Write-Host "Reponse : $($response | ConvertTo-Json)" -ForegroundColor Red
    }
} catch {
    Write-Host "ERREUR lors de la recuperation du token :" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    Write-Host "Depannage :" -ForegroundColor Yellow
    Write-Host "- Verifiez que le code n'a pas expire (utilisez-le dans les 5 minutes)" -ForegroundColor White
    Write-Host "- Verifiez que Client ID et Secret sont corrects" -ForegroundColor White
    Write-Host "- Verifiez que la Redirect URI correspond exactement" -ForegroundColor White
}

Write-Host ""
Write-Host "Appuyez sur une touche pour quitter..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
