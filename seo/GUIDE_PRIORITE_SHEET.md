# 🎯 Guide : Priorité depuis Google Sheets + Ranking

## 📋 Logique de Priorisation

Votre système combine **priorité depuis Google Sheets** + **ranking actuel** pour déterminer les actions SEO :

### Priorité depuis Google Sheets
- **Priorité 2** = Prioritaire
- **Priorité 1** = Moyennement prioritaire  
- **Priorité 0** = Non prioritaire

### Stratégie SEO Combinée

| Priorité Sheet | Position | Action SEO | Urgence |
|----------------|----------|------------|---------|
| **2 (Prioritaire)** | 1-3 | ✅ Maintenir | Faible |
| **2 (Prioritaire)** | 4-10 | 🚀 Pousser vers TOP 3 | Haute |
| **2 (Prioritaire)** | 11-20 | ⚡ Optimiser pour Top 10 | Haute |
| **2 (Prioritaire)** | > 20 | 🔧 Créer/Optimiser contenu | Critique |
| **1 (Moyennement)** | 1-3 | ✅ Maintenir | Faible |
| **1 (Moyennement)** | 4-20 | 📈 Optimiser si opportunité | Moyenne |
| **1 (Moyennement)** | > 20 | 💡 Optimiser à moyen terme | Faible |
| **0 (Non prioritaire)** | Toutes | ⏸️ Non prioritaire | Aucune |

## 🔧 Configuration dans N8N

### Étape 1 : Vérifier le Nom de la Colonne Priorité

Dans votre Google Sheet, vérifiez le nom exact de la colonne "Priorité" :
- `Priorité` (avec accent)
- `Priorite` (sans accent)
- `Priority` (en anglais)

### Étape 2 : Utiliser le Code Adapté

Le code dans `seo/CODE_N8N_PRIORITE_SHEET.js` cherche automatiquement la priorité dans plusieurs champs possibles :

```javascript
const priority = item.json.Priorité || item.json.Priorite || item.json.Priority || 
                 item.json.priorité || item.json.priorite || item.json.priority || 0;
```

### Étape 3 : Tester

1. **Exécutez votre workflow N8N**
2. **Vérifiez** que la priorité est bien récupérée depuis le Sheet
3. **Vérifiez** que les mots-clés sont bien classés selon la logique combinée

## 📊 Résultat Attendu

Le rapport généré contiendra :

1. **🚨 ACTIONS PRIORITAIRES** : Priorité 2 + Position > 3
2. **🚀 Pousser vers TOP 3** : Priorité 2 + Position 4-10
3. **⚡ Optimiser pour Top 10** : Priorité 2 + Position 11-20
4. **🔧 Créer/Optimiser contenu** : Priorité 2 + Position > 20
5. **✅ À Maintenir** : Priorité 2 + Position 1-3
6. **📈 Opportunités** : Priorité 1
7. **📊 Statistiques** par priorité

## ✅ Avantages

- ✅ **Priorisation intelligente** : Combine votre priorité métier + ranking actuel
- ✅ **Actions ciblées** : Identifie les vrais besoins d'optimisation
- ✅ **Pas d'action inutile** : Les mots-clés prioritaires déjà en TOP 3 sont maintenus, pas optimisés
- ✅ **Focus sur l'essentiel** : Les mots-clés prioritaires mal positionnés sont en haut du rapport

---

**Le code est prêt dans `seo/CODE_N8N_PRIORITE_SHEET.js` !**






