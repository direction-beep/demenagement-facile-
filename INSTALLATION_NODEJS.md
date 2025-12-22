# Installation de Node.js pour Windows

## 🎯 Objectif

Installer Node.js pour pouvoir utiliser les scripts de génération et validation des articles de blog.

## 📥 Méthode 1 : Installation via le Site Officiel (Recommandé)

### Étapes :

1. **Télécharger Node.js**
   - Allez sur : https://nodejs.org/
   - Cliquez sur le bouton **"LTS"** (Long Term Support) - version recommandée
   - Le téléchargement commence automatiquement (fichier `.msi`)

2. **Installer Node.js**
   - Double-cliquez sur le fichier téléchargé (`node-vXX.X.X-x64.msi`)
   - Suivez l'assistant d'installation :
     - ✅ Acceptez les termes de licence
     - ✅ Choisissez le répertoire d'installation (par défaut : `C:\Program Files\nodejs\`)
     - ✅ **IMPORTANT** : Cochez "Automatically install the necessary tools" si proposé
     - ✅ Cliquez sur "Install"

3. **Vérifier l'installation**
   - Ouvrez un **nouveau** PowerShell ou CMD (important : fermez et rouvrez)
   - Exécutez :
     ```powershell
     node --version
     npm --version
     ```
   - Vous devriez voir les versions affichées (ex: `v20.10.0` et `10.2.3`)

## 📦 Méthode 2 : Installation via Chocolatey (Si déjà installé)

Si vous avez Chocolatey installé :

```powershell
choco install nodejs-lts
```

## 📦 Méthode 3 : Installation via Winget (Windows 10/11)

```powershell
winget install OpenJS.NodeJS.LTS
```

## ✅ Vérification de l'Installation

Après l'installation, **fermez et rouvrez votre terminal PowerShell**, puis testez :

```powershell
# Vérifier Node.js
node --version

# Vérifier npm (gestionnaire de paquets)
npm --version

# Vérifier le chemin d'installation
where node
```

Vous devriez voir quelque chose comme :
```
v20.10.0
10.2.3
C:\Program Files\nodejs\node.exe
```

## 🚀 Utilisation des Scripts

Une fois Node.js installé, vous pouvez utiliser les scripts :

### 1. Générer un nouvel article
```powershell
node scripts/generate-blog-article.js "mon-article" "Mon Titre" "Ma description" "<h2>Contenu</h2>"
```

### 2. Valider l'encodage de tous les fichiers
```powershell
node scripts/validate-blog-encoding.js
```

## 🔧 Dépannage

### Problème : "node n'est pas reconnu"

**Solution 1 : Redémarrer le terminal**
- Fermez complètement PowerShell/CMD
- Rouvrez-le et réessayez

**Solution 2 : Vérifier le PATH**
- Ouvrez les Variables d'environnement Windows
- Vérifiez que `C:\Program Files\nodejs\` est dans le PATH
- Si absent, ajoutez-le manuellement

**Solution 3 : Réinstaller Node.js**
- Désinstallez Node.js via "Ajouter ou supprimer des programmes"
- Réinstallez en suivant les étapes ci-dessus

### Problème : "npm n'est pas reconnu"

- npm est installé avec Node.js
- Si le problème persiste, réinstallez Node.js

## 📚 Ressources

- **Site officiel Node.js** : https://nodejs.org/
- **Documentation** : https://nodejs.org/docs/
- **Guide d'installation détaillé** : https://nodejs.org/en/download/package-manager/

## 💡 Astuce

Pour vérifier rapidement si Node.js est installé, exécutez dans PowerShell :

```powershell
Get-Command node -ErrorAction SilentlyContinue
```

Si rien ne s'affiche, Node.js n'est pas installé ou pas dans le PATH.

---

**Dernière mise à jour :** 2024-12-19


