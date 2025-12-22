@echo off
title Serveur VOC-Call
color 0A
echo.
echo ========================================
echo    SERVEUR VOC-CALL
echo ========================================
echo.
echo Demarrage du serveur sur le port 3001...
echo.
echo Site accessible sur: http://localhost:3001
echo.
echo Appuyez sur Ctrl+C pour arreter le serveur
echo ========================================
echo.

powershell -ExecutionPolicy Bypass -File "simple_http_server.ps1" -Port 3001

echo.
echo Serveur arrete.
pause

