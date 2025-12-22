# Instructions pour convertir les guides HTML en PDF

## Méthode 1 : Utiliser un navigateur (Recommandé)

1. Ouvrez le fichier HTML dans Chrome, Edge ou Firefox
2. Appuyez sur `Ctrl+P` (Windows) ou `Cmd+P` (Mac)
3. Sélectionnez "Enregistrer au format PDF" comme destination
4. Cliquez sur "Enregistrer"
5. Les styles CSS seront préservés

## Méthode 2 : Utiliser un outil en ligne

- **HTML to PDF** : https://www.ilovepdf.com/html-to-pdf
- **PDF24** : https://tools.pdf24.org/fr/html-to-pdf
- **SmallPDF** : https://smallpdf.com/html-to-pdf

## Méthode 3 : Utiliser Python (pour automatisation)

```python
# Installer les dépendances
# pip install weasyprint

from weasyprint import HTML

# Convertir un fichier
HTML('guide-externalisation-service-client-2025.html').write_pdf('guide-externalisation-service-client-2025.pdf')
```

## Méthode 4 : Utiliser Node.js (pour automatisation)

```javascript
// Installer: npm install puppeteer
const puppeteer = require('puppeteer');

async function convertToPDF(htmlFile, pdfFile) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`file://${__dirname}/${htmlFile}`, {waitUntil: 'networkidle0'});
  await page.pdf({path: pdfFile, format: 'A4'});
  await browser.close();
}

convertToPDF('guide-externalisation-service-client-2025.html', 'guide-externalisation-service-client-2025.pdf');
```

## Fichiers à convertir

1. `guide-externalisation-service-client-2025.html` → Guide complet (40 pages)
2. `checklist-choisir-call-center-france.html` → Checklist (8 pages)
3. `guide-kpi-service-client.html` → Guide KPI (15 pages)
4. `guide-rgpd-call-center.html` → Guide RGPD (20 pages)
5. `guide-homeshoring-recrutement.html` → Guide Homeshoring (18 pages)

## Note sur le calculateur ROI

Le fichier `calculateur-roi-service-client.csv` est un tableur Excel/CSV. 
Il peut être ouvert directement dans Excel, Google Sheets ou LibreOffice Calc.

Pour créer un PDF :
1. Ouvrez le CSV dans Excel
2. Mettez en forme (couleurs, bordures)
3. Fichier → Exporter → Créer un document PDF/XPS

