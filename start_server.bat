@echo off
echo ========================================
echo    Serveur VOC-Call - Demarrage
echo ========================================
echo.

REM Vérifier si PowerShell est disponible
powershell -Command "Get-Host" >nul 2>&1
if %errorlevel% neq 0 (
    echo Erreur: PowerShell n'est pas disponible
    pause
    exit /b 1
)

echo Demarrage du serveur sur le port 3000...
echo Site accessible sur: http://localhost:3000
echo Appuyez sur Ctrl+C pour arreter
echo.

REM Exécuter le script PowerShell
powershell -ExecutionPolicy Bypass -File "start_server_simple.ps1"

echo.
echo Serveur arrete.
pause