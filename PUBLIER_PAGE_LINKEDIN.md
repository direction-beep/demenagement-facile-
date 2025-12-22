# Publier sur la Page LinkedIn de VOC-Call

## ❌ Situation actuelle

**Non, vous ne publiez PAS encore sur la page LinkedIn de VOC-Call.**

Actuellement, les publications se feront sur votre **PROFIL PERSONNEL LinkedIn**.

## ✅ Pour publier sur la PAGE LinkedIn de VOC-Call

Il faut 3 choses :

### 1. Approbation de "Community Management API"

- ✅ Vous avez déjà fait la demande ("Request access")
- ⏳ En attente de l'approbation LinkedIn (24-72h)

### 2. Générer un nouveau token avec le scope `w_organization_social`

Une fois l'API approuvée :
- LinkedIn Developers → votre application → onglet "Auth"
- Section "OAuth 2.0 token generation"
- Sélectionnez le scope : `w_organization_social` (en plus de `w_member_social`)
- Générez le token
- Ajoutez-le dans GitHub Secrets → `LINKEDIN_ACCESS_TOKEN`

### 3. Récupérer l'Organization URN de la page VOC-Call

Une fois le token avec `w_organization_social` généré :
```powershell
.\get-org-urn-auto.ps1
```

Ou manuellement via l'API LinkedIn.

### 4. Configurer dans GitHub Secrets

- **`LINKEDIN_ACCESS_TOKEN`** : Token avec scope `w_organization_social`
- **`LINKEDIN_PERSON_URN`** : Organization URN de la page (ex: `urn:li:organization:xxxxx`)

**Note** : Le nom `LINKEDIN_PERSON_URN` est trompeur - il accepte aussi les Organization URN.

## 📋 Résumé

| Élément | État actuel | État requis |
|---------|-------------|-------------|
| Scope du token | `w_member_social` | `w_organization_social` |
| Community Management API | ⏳ En attente | ✅ Approuvé |
| Organization URN | ❌ Non configuré | ✅ Configuré |
| Publication | 👤 Profil personnel | 🏢 Page VOC-Call |

## 🎯 Prochaines étapes

1. **Attendre l'approbation** de "Community Management API"
2. **Générer un nouveau token** avec `w_organization_social`
3. **Récupérer l'Organization URN** de la page
4. **Configurer dans GitHub Secrets**
5. **Tester** la publication

En attendant, vous pouvez publier sur votre profil personnel pour tester le système.

