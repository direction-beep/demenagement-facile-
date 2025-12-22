# Script simple pour démarrer un serveur HTTP local
# Port: 3000 (évite les conflits avec les ports système)

Write-Host "=== Serveur VOC-Call ===" -ForegroundColor Green
Write-Host "Démarrage du serveur local..." -ForegroundColor Yellow

# Vérifier si le port 3000 est libre
$port = 3000
$listener = $null

try {
    # Créer le listener HTTP
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://localhost:$port/")
    
    # Démarrer le serveur
    $listener.Start()
    
    Write-Host "✅ Serveur démarré avec succès !" -ForegroundColor Green
    Write-Host "🌐 Site accessible sur: http://localhost:$port" -ForegroundColor Cyan
    Write-Host "📁 Dossier: $(Get-Location)" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Appuyez sur Ctrl+C pour arrêter le serveur" -ForegroundColor Yellow
    Write-Host "===============================================" -ForegroundColor Green
    
    # Boucle principale du serveur
    while ($listener.IsListening) {
        try {
            # Attendre une requête
            $context = $listener.GetContext()
            $request = $context.Request
            $response = $context.Response
            
            # Obtenir le chemin demandé
            $localPath = $request.Url.LocalPath
            
            # Rediriger la racine vers index.html
            if ($localPath -eq "/") {
                $localPath = "/index.html"
            }
            
            # Construire le chemin du fichier
            $filePath = Join-Path (Get-Location) $localPath.TrimStart('/')
            
            # Vérifier si le fichier existe
            if (Test-Path $filePath -PathType Leaf) {
                # Lire le contenu du fichier
                $content = [System.IO.File]::ReadAllBytes($filePath)
                $response.ContentLength64 = $content.Length
                
                # Définir le type MIME
                $extension = [System.IO.Path]::GetExtension($filePath).ToLower()
                switch ($extension) {
                    ".html" { $response.ContentType = "text/html; charset=utf-8" }
                    ".css"  { $response.ContentType = "text/css; charset=utf-8" }
                    ".js"   { $response.ContentType = "application/javascript; charset=utf-8" }
                    ".png"  { $response.ContentType = "image/png" }
                    ".jpg"  { $response.ContentType = "image/jpeg" }
                    ".jpeg" { $response.ContentType = "image/jpeg" }
                    ".gif"  { $response.ContentType = "image/gif" }
                    ".svg"  { $response.ContentType = "image/svg+xml" }
                    ".ico"  { $response.ContentType = "image/x-icon" }
                    default { $response.ContentType = "application/octet-stream" }
                }
                
                # Envoyer le contenu
                $response.OutputStream.Write($content, 0, $content.Length)
                $response.StatusCode = 200
                
                Write-Host "✅ $(Get-Date -Format 'HH:mm:ss') - $($request.HttpMethod) $localPath - 200 OK" -ForegroundColor Green
            } else {
                # Fichier non trouvé
                $response.StatusCode = 404
                $notFoundHtml = @"
<!DOCTYPE html>
<html>
<head>
    <title>404 - Page non trouvée</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
        h1 { color: #e74c3c; }
    </style>
</head>
<body>
    <h1>404 - Page non trouvée</h1>
    <p>Le fichier demandé n'existe pas.</p>
    <p><a href="/">Retour à l'accueil</a></p>
</body>
</html>
"@
                $notFoundBytes = [System.Text.Encoding]::UTF8.GetBytes($notFoundHtml)
                $response.ContentLength64 = $notFoundBytes.Length
                $response.ContentType = "text/html; charset=utf-8"
                $response.OutputStream.Write($notFoundBytes, 0, $notFoundBytes.Length)
                
                Write-Host "❌ $(Get-Date -Format 'HH:mm:ss') - $($request.HttpMethod) $localPath - 404 Not Found" -ForegroundColor Red
            }
            
        } catch {
            Write-Host "⚠️  Erreur lors du traitement de la requête: $($_.Exception.Message)" -ForegroundColor Yellow
            if ($response) {
                $response.StatusCode = 500
            }
        } finally {
            if ($response) {
                $response.Close()
            }
        }
    }
    
} catch {
    Write-Host "❌ Erreur lors du démarrage du serveur: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "💡 Essayez de changer le port ou vérifiez les permissions" -ForegroundColor Yellow
} finally {
    # Nettoyer les ressources
    if ($listener -and $listener.IsListening) {
        $listener.Stop()
        Write-Host "🛑 Serveur arrêté" -ForegroundColor Yellow
    }
}








