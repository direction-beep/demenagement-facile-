# Guide : Résoudre l'erreur "l'exécution de scripts est désactivée"

## Problème

Quand vous exécutez un script PowerShell, vous voyez :
```
Impossible de charger le fichier ... car l'exécution de scripts est désactivée sur ce système.
```

## Solution rapide (pour cette session uniquement)

Dans PowerShell, exécutez :
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
```

Cette commande autorise l'exécution de scripts **uniquement pour cette session PowerShell**. Quand vous fermerez PowerShell, ça reviendra à la normale.

## Solution permanente (recommandée)

Pour autoriser définitivement l'exécution de scripts :

1. **Ouvrez PowerShell en tant qu'Administrateur** :
   - Clic droit sur PowerShell → "Exécuter en tant qu'administrateur"

2. **Exécutez** :
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

3. **Confirmez** avec `Y` quand demandé

Cette commande autorise l'exécution de scripts que vous avez créés localement, mais nécessite toujours une signature pour les scripts téléchargés.

## Vérifier la politique actuelle

Pour voir quelle politique est active :
```powershell
Get-ExecutionPolicy
```

## Exécuter le script maintenant

Une fois la politique changée, exécutez :
```powershell
.\get-linkedin-token.ps1
```

