# Correction des Variables d'Environnement Vercel

## âŒ ProblÃ¨me

L'erreur "The name contains invalid characters" peut survenir si :
1. Le nom de la variable contient des caractÃ¨res invalides
2. La valeur contient des caractÃ¨res qui causent des problÃ¨mes

## âœ… Solution

### Format correct pour `RESEND_FROM_EMAIL`

**Option 1 : Email simple (recommandÃ© pour commencer)**
```
RESEND_FROM_EMAIL=noreply@demenagement-zen.fr
```

**Option 2 : Avec nom d'affichage (utilisez des guillemets si nÃ©cessaire)**
```
RESEND_FROM_EMAIL="DÃ©mÃ©nagement Zen <noreply@demenagement-zen.fr>"
```

**Option 3 : Sans espaces dans le nom (si Option 2 ne fonctionne pas)**
```
RESEND_FROM_EMAIL=DemenagementZen<noreply@demenagement-zen.fr>
```

### Variables d'environnement Ã  configurer dans Vercel

1. **RESEND_API_KEY**
   - Valeur : `re_7qek5vdY_JorztE3Wq7hAiMa8Uf45PSGg`
   - âœ… Format correct

2. **CONTACT_EMAIL**
   - Valeur : `contact@demenagement-zen.fr`
   - âœ… Format correct

3. **RESEND_FROM_EMAIL**
   - **Valeur recommandÃ©e** : `noreply@demenagement-zen.fr`
   - Ou si vous avez configurÃ© un domaine dans Resend : `DemenagementZen<noreply@demenagement-zen.fr>`
   - âš ï¸ Ã‰vitez les espaces et caractÃ¨res spÃ©ciaux dans le nom d'affichage

## ðŸ”§ Ã‰tapes de correction

1. **Supprimez la variable `RESEND_FROM_EMAIL` existante** (bouton Delete)

2. **Ajoutez-la Ã  nouveau** avec une de ces valeurs :
   - `noreply@demenagement-zen.fr` (le plus simple)
   - `DemenagementZen<noreply@demenagement-zen.fr>` (avec nom, sans espaces)

3. **Cliquez sur "Save"**

4. **Si vous utilisez le domaine par dÃ©faut de Resend** (pour tester) :
   ```
   RESEND_FROM_EMAIL=onboarding@resend.dev
   ```

## ðŸ“ Note importante

Si vous n'avez pas encore configurÃ© votre domaine dans Resend, utilisez :
```
RESEND_FROM_EMAIL=onboarding@resend.dev
```

Une fois votre domaine vÃ©rifiÃ© dans Resend, vous pourrez utiliser votre propre email.

## âœ… VÃ©rification

AprÃ¨s avoir sauvegardÃ©, vÃ©rifiez que :
- Aucune erreur n'apparaÃ®t
- Les 3 variables sont bien listÃ©es
- Le bouton "Save" est cliquable sans erreur



