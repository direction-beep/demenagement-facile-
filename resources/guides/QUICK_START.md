# 🚀 Démarrage Rapide - Conversion des Guides en PDF

## Option 1 : Conversion Automatique (Recommandée)

1. **Ouvrez PowerShell** dans le dossier `resources/guides/`

2. **Exécutez le script** :
   ```powershell
   .\convert-all-to-pdf.ps1
   ```

3. **Attendez la conversion** (quelques secondes par fichier)

4. **Les PDFs seront dans** : `resources/guides/pdfs/`

## Option 2 : Conversion Manuelle (Si l'automatique ne fonctionne pas)

1. **Ouvrez chaque fichier HTML** dans Chrome ou Edge :
   - Double-cliquez sur le fichier HTML
   - Ou faites clic droit → Ouvrir avec → Chrome/Edge

2. **Convertissez en PDF** :
   - Appuyez sur `Ctrl+P` (Windows) ou `Cmd+P` (Mac)
   - Sélectionnez "Enregistrer au format PDF"
   - Enregistrez dans le dossier `pdfs/`

3. **Répétez pour chaque guide**

## Option 3 : Script Simplifié

Si le script automatique ne fonctionne pas :

```powershell
.\convert-all-to-pdf-simple.ps1
```

Ce script ouvre tous les fichiers dans votre navigateur pour conversion manuelle.

## 📋 Liste des Fichiers à Convertir

1. ✅ `guide-externalisation-service-client-2025.html` → Guide complet (40 pages)
2. ✅ `checklist-choisir-call-center-france.html` → Checklist (8 pages)
3. ✅ `guide-kpi-service-client.html` → Guide KPI (15 pages)
4. ✅ `guide-rgpd-call-center.html` → Guide RGPD (20 pages)
5. ✅ `guide-homeshoring-recrutement.html` → Guide Homeshoring (18 pages)
6. ✅ `template-contrat-externalisation.html` → Template contrat (10-12 pages)

## ⚠️ Note sur le Calculateur ROI

Le fichier `calculateur-roi-service-client.csv` est un tableur Excel.
Pour le convertir en PDF :
1. Ouvrez-le dans Excel
2. Mettez en forme (couleurs, bordures)
3. Fichier → Exporter → Créer un document PDF/XPS

## ✅ Vérification

Après conversion, vous devriez avoir 6 PDFs dans le dossier `pdfs/` :
- Guide-Externalisation-Service-Client-2025.pdf
- Checklist-Choisir-Call-Center-France.pdf
- Guide-KPI-Service-Client.pdf
- Guide-RGPD-Call-Center.pdf
- Guide-Homeshoring-Recrutement.pdf
- Template-Contrat-Externalisation.pdf

## 🎯 Prochaines Étapes

Une fois les PDFs créés :
1. Ajouter le logo VOC-Call sur chaque page (optionnel)
2. Uploader les PDFs sur le serveur web
3. Créer les liens de téléchargement sur `resources/index.html`
4. Mettre en place un formulaire de capture d'email

---

**Besoin d'aide ?** Consultez `README.md` pour plus de détails.

