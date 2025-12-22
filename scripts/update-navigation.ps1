# Script pour mettre à jour la navigation dans tous les fichiers services
# Ajoute les nouvelles pages dans le menu déroulant

$servicesFiles = Get-ChildItem -Path "services" -Filter "*.html" -Recurse

$newMenuItems = @"
                                <li><a href="centre-appel-france.html">Centre d'appel France</a></li>
                                <li><a href="appels-entrants.html">Appels entrants</a></li>
                                <li><a href="externalisation-service-client.html">Externalisation service client</a></li>
                                <li><a href="secretariat-telephonique.html">Secrétariat téléphonique</a></li>
"@

foreach ($file in $servicesFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    
    # Pattern pour trouver le menu dropdown
    if ($content -match '(?s)(<ul class="dropdown-menu">.*?</ul>)') {
        $menuContent = $matches[1]
        
        # Vérifier si les nouveaux items sont déjà présents
        if ($menuContent -notmatch "centre-appel-france.html" -and $menuContent -match "service-client.html") {
            # Insérer après "Service client"
            $content = $content -replace '(?s)(<li><a href="service-client.html">Service client</a></li>)', "`$1`n$newMenuItems"
            Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
            Write-Host "Mis à jour : $($file.Name)" -ForegroundColor Green
        } else {
            Write-Host "Déjà à jour : $($file.Name)" -ForegroundColor Yellow
        }
    }
}

Write-Host "`nMise à jour de la navigation terminée !" -ForegroundColor Cyan

