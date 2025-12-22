# Serveur HTTP simple pour VOC-Call
# Port: 3000

param(
    [int]$Port = 3000
)

Write-Host "=== Serveur VOC-Call ===" -ForegroundColor Green
Write-Host "Port: $Port" -ForegroundColor Cyan
Write-Host "Dossier: $(Get-Location)" -ForegroundColor Gray
Write-Host ""

# Fonction pour obtenir le type MIME
function Get-MimeType {
    param([string]$FilePath)
    
    $extension = [System.IO.Path]::GetExtension($FilePath).ToLower()
    switch ($extension) {
        ".html" { return "text/html; charset=utf-8" }
        ".css"  { return "text/css; charset=utf-8" }
        ".js"   { return "application/javascript; charset=utf-8" }
        ".png"  { return "image/png" }
        ".jpg"  { return "image/jpeg" }
        ".jpeg" { return "image/jpeg" }
        ".gif"  { return "image/gif" }
        ".svg"  { return "image/svg+xml" }
        ".ico"  { return "image/x-icon" }
        default { return "application/octet-stream" }
    }
}

# Fonction pour servir un fichier
function Serve-File {
    param(
        [string]$FilePath,
        [System.Net.HttpListenerResponse]$Response
    )
    
    try {
        if (Test-Path $FilePath -PathType Leaf) {
            $content = [System.IO.File]::ReadAllBytes($FilePath)
            $Response.ContentLength64 = $content.Length
            $Response.ContentType = Get-MimeType $FilePath
            $Response.OutputStream.Write($content, 0, $content.Length)
            $Response.StatusCode = 200
            return $true
        }
        return $false
    } catch {
        Write-Host "Erreur lecture fichier: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Créer le listener
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")

try {
    $listener.Start()
    Write-Host "✅ Serveur démarré !" -ForegroundColor Green
    Write-Host "🌐 http://localhost:$Port" -ForegroundColor Cyan
    Write-Host "Appuyez sur Ctrl+C pour arrêter" -ForegroundColor Yellow
    Write-Host "=================================" -ForegroundColor Green
    
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $localPath = $request.Url.LocalPath
        if ($localPath -eq "/") { $localPath = "/index.html" }
        
        $filePath = Join-Path (Get-Location) $localPath.TrimStart('/')
        
        Write-Host "$(Get-Date -Format 'HH:mm:ss') - $($request.HttpMethod) $localPath" -ForegroundColor White
        
        if (Serve-File $filePath $response) {
            Write-Host "  ✅ 200 OK" -ForegroundColor Green
        } else {
            $response.StatusCode = 404
            $response.ContentType = "text/html; charset=utf-8"
            $notFound = [System.Text.Encoding]::UTF8.GetBytes(@"
<!DOCTYPE html>
<html><head><title>404</title></head>
<body><h1>404 - Fichier non trouvé</h1><p><a href="/">Accueil</a></p></body>
</html>
"@)
            $response.ContentLength64 = $notFound.Length
            $response.OutputStream.Write($notFound, 0, $notFound.Length)
            Write-Host "  ❌ 404 Not Found" -ForegroundColor Red
        }
        
        $response.Close()
    }
} catch {
    Write-Host "❌ Erreur: $($_.Exception.Message)" -ForegroundColor Red
} finally {
    if ($listener.IsListening) {
        $listener.Stop()
    }
    Write-Host "🛑 Serveur arrêté" -ForegroundColor Yellow
}







