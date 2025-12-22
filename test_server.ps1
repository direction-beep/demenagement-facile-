# Test serveur simple
$port = 8888
Write-Host "Test serveur sur port $port"

try {
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://localhost:$port/")
    $listener.Start()
    
    Write-Host "✅ Serveur démarré sur http://localhost:$port"
    Write-Host "Test en cours..."
    
    # Test simple
    $context = $listener.GetContext()
    $response = $context.Response
    $response.ContentType = "text/html; charset=utf-8"
    
    $html = @"
<!DOCTYPE html>
<html>
<head><title>Test VOC-Call</title></head>
<body>
    <h1>✅ Serveur fonctionne !</h1>
    <p>Port: $port</p>
    <p>Dossier: $(Get-Location)</p>
</body>
</html>
"@
    
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($html)
    $response.ContentLength64 = $bytes.Length
    $response.OutputStream.Write($bytes, 0, $bytes.Length)
    $response.Close()
    
    Write-Host "✅ Test réussi !"
    
} catch {
    Write-Host "❌ Erreur: $($_.Exception.Message)"
} finally {
    if ($listener) { $listener.Stop() }
}







