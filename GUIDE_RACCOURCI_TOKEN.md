# Guide Rapide : Récupérer le Token LinkedIn

## ⚠️ Important : Être dans le bon dossier

Vous devez être dans le dossier `C:\Users\loued\VOC-Call` pour exécuter les scripts.

## 🎯 Méthode 1 : Depuis PowerShell (dans le bon dossier)

1. **Ouvrez PowerShell** (clic droit sur le dossier → "Ouvrir dans PowerShell")
2. **OU** ouvrez PowerShell et tapez :
   ```powershell
   cd C:\Users\loued\VOC-Call
   ```
3. **Vérifiez** que vous êtes au bon endroit :
   ```powershell
   ls get-linkedin-token.ps1
   ```
   (Le fichier doit apparaître)

4. **Exécutez** le script :
   ```powershell
   .\get-linkedin-token.ps1
   ```

## 🎯 Méthode 2 : Depuis l'Explorateur Windows

1. **Ouvrez l'Explorateur Windows**
2. **Naviguez** vers `C:\Users\loued\VOC-Call`
3. **Clic droit** dans le dossier (pas sur un fichier)
4. **Choisissez** "Ouvrir dans PowerShell" ou "Ouvrir dans Terminal"
5. **Exécutez** :
   ```powershell
   .\get-linkedin-token.ps1
   ```

## 🎯 Méthode 3 : Depuis VS Code / Cursor

1. **Ouvrez** le dossier `VOC-Call` dans Cursor
2. **Appuyez** sur `Ctrl + ù` (ou `Ctrl + `) pour ouvrir le terminal intégré
3. Le terminal s'ouvre **déjà dans le bon dossier**
4. **Exécutez** :
   ```powershell
   .\get-linkedin-token.ps1
   ```

## ✅ Vérification

Avant d'exécuter le script, vérifiez que vous voyez :
```
PS C:\Users\loued\VOC-Call>
```

Si vous voyez :
```
PS C:\Users\loued>
```
Alors tapez d'abord : `cd VOC-Call`

