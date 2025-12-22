@echo off
echo ========================================
echo Conversion des guides HTML en PDF
echo ========================================
echo.
echo Ce script va ouvrir chaque fichier HTML dans votre navigateur.
echo Vous devrez convertir manuellement en PDF (Ctrl+P -^> Enregistrer en PDF)
echo.
pause

echo.
echo Ouverture des fichiers...
echo.

start "" "guide-externalisation-service-client-2025.html"
timeout /t 3 /nobreak >nul

start "" "checklist-choisir-call-center-france.html"
timeout /t 3 /nobreak >nul

start "" "guide-kpi-service-client.html"
timeout /t 3 /nobreak >nul

start "" "guide-rgpd-call-center.html"
timeout /t 3 /nobreak >nul

start "" "guide-homeshoring-recrutement.html"
timeout /t 3 /nobreak >nul

start "" "template-contrat-externalisation.html"

echo.
echo ========================================
echo Tous les fichiers ont ete ouverts.
echo.
echo Instructions:
echo 1. Pour chaque onglet ouvert, appuyez sur Ctrl+P
echo 2. Selectionnez "Enregistrer au format PDF"
echo 3. Enregistrez dans le dossier "pdfs"
echo ========================================
echo.
pause

