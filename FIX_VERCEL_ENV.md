# Correction des Variables d'Environnement Vercel

## ❌ Problème

L'erreur "The name contains invalid characters" peut survenir si :
1. Le nom de la variable contient des caractères invalides
2. La valeur contient des caractères qui causent des problèmes

## ✅ Solution

### Format correct pour `RESEND_FROM_EMAIL`

**Option 1 : Email simple (recommandé pour commencer)**
```
RESEND_FROM_EMAIL=noreply@demenagement-facile.fr
```

**Option 2 : Avec nom d'affichage (utilisez des guillemets si nécessaire)**
```
RESEND_FROM_EMAIL="Déménagement Facile <noreply@demenagement-facile.fr>"
```

**Option 3 : Sans espaces dans le nom (si Option 2 ne fonctionne pas)**
```
RESEND_FROM_EMAIL=DemenagementFacile<noreply@demenagement-facile.fr>
```

### Variables d'environnement à configurer dans Vercel

1. **RESEND_API_KEY**
   - Valeur : `re_7qek5vdY_JorztE3Wq7hAiMa8Uf45PSGg`
   - ✅ Format correct

2. **CONTACT_EMAIL**
   - Valeur : `contact@demenagement-facile.fr`
   - ✅ Format correct

3. **RESEND_FROM_EMAIL**
   - **Valeur recommandée** : `noreply@demenagement-facile.fr`
   - Ou si vous avez configuré un domaine dans Resend : `DemenagementFacile<noreply@demenagement-facile.fr>`
   - ⚠️ Évitez les espaces et caractères spéciaux dans le nom d'affichage

## 🔧 Étapes de correction

1. **Supprimez la variable `RESEND_FROM_EMAIL` existante** (bouton Delete)

2. **Ajoutez-la à nouveau** avec une de ces valeurs :
   - `noreply@demenagement-facile.fr` (le plus simple)
   - `DemenagementFacile<noreply@demenagement-facile.fr>` (avec nom, sans espaces)

3. **Cliquez sur "Save"**

4. **Si vous utilisez le domaine par défaut de Resend** (pour tester) :
   ```
   RESEND_FROM_EMAIL=onboarding@resend.dev
   ```

## 📝 Note importante

Si vous n'avez pas encore configuré votre domaine dans Resend, utilisez :
```
RESEND_FROM_EMAIL=onboarding@resend.dev
```

Une fois votre domaine vérifié dans Resend, vous pourrez utiliser votre propre email.

## ✅ Vérification

Après avoir sauvegardé, vérifiez que :
- Aucune erreur n'apparaît
- Les 3 variables sont bien listées
- Le bouton "Save" est cliquable sans erreur

