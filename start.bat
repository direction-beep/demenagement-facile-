@echo off
title Serveur VOC-Call
echo.
echo ========================================
echo    Serveur VOC-Call - Port 3000
echo ========================================
echo.
echo Demarrage du serveur...
echo Site: http://localhost:3000
echo.
echo Appuyez sur Ctrl+C pour arreter
echo ========================================
echo.

powershell -ExecutionPolicy Bypass -File "simple_http_server.ps1"

echo.
echo Serveur arrete.
pause

