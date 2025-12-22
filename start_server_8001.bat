@echo off
echo Demarrage du serveur local pour VOC-Call sur le port 8001...
echo.
echo Le site sera accessible sur: http://localhost:8001
echo.
echo Appuyez sur Ctrl+C pour arreter le serveur
echo.

REM Essayer Python d'abord
python -m http.server 8001 2>nul
if %errorlevel% neq 0 (
    echo Python non trouve, utilisation de PowerShell...
    powershell -Command "& {Add-Type -AssemblyName System.Web; $listener = New-Object System.Net.HttpListener; $listener.Prefixes.Add('http://localhost:8001/'); $listener.Start(); Write-Host 'Serveur demarre sur http://localhost:8001'; while ($listener.IsListening) { $context = $listener.GetContext(); $request = $context.Request; $response = $context.Response; $localPath = $request.Url.LocalPath; if ($localPath -eq '/') { $localPath = '/index.html' }; $filePath = Join-Path (Get-Location) $localPath.TrimStart('/'); if (Test-Path $filePath) { $content = [System.IO.File]::ReadAllBytes($filePath); $response.ContentLength64 = $content.Length; $response.OutputStream.Write($content, 0, $content.Length) } else { $response.StatusCode = 404 }; $response.Close() }}"
)








