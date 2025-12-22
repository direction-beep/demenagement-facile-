# 🔧 Guide : Modifier N8N pour Récupérer TOUS les Mots-clés

## 📋 Objectif

Adapter votre workflow N8N pour qu'il récupère **TOUS les mots-clés** depuis Search Console, pas seulement les 27 prioritaires.

## 🔄 Modification à Faire

### Étape 1 : Ouvrir votre Nœud Code dans N8N

1. Dans votre workflow N8N, trouvez le nœud **"Code"** ou **"Function"** qui génère le markdown
2. Cliquez dessus pour l'éditer

### Étape 2 : Remplacer le Code

**Remplacez TOUT le code actuel** par le code du fichier : `seo/CODE_N8N_TOUS_MOTS_CLES.js`

**OU** copiez-collez directement ce code :

```javascript
// Code N8N - Récupère TOUS les mots-clés depuis Search Console
// Récupère TOUTES les données de Search Console
const searchConsoleData = $input.all();

// Fonction pour normaliser les mots-clés (minuscules, sans accents)
function normalize(str) {
  if (!str) return '';
  return str.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

// Fonction pour déterminer la priorité automatiquement
function getPriority(position, volume, clicks) {
  // Position > 100 = Priorité 4 (faible)
  if (position === ">100" || position > 100) return 4;
  
  // Position 21-100 = Priorité 3 (moyenne)
  if (position > 20) return 3;
  
  // Position 11-20 = Priorité 2 (haute) - proche top 10
  if (position > 10) return 2;
  
  // Position 4-10 = Priorité 1 (très haute) - proche top 3
  if (position > 3) return 1;
  
  // Position 1-3 = Priorité 0 (critique) - maintenir
  return 0;
}

// Fonction pour obtenir le statut
function getStatus(position) {
  if (position === ">100" || position > 100) return "❌ Non classé";
  if (position <= 3) return "✅ TOP 3";
  if (position <= 10) return "🟢 Page 1";
  if (position <= 20) return "🟡 Top 20";
  return "🔴 À optimiser";
}

// Traiter TOUTES les données de Search Console
const allKeywords = searchConsoleData.map(item => {
  const keyword = item.json['Mot-clé'] || item.json.keyword || '';
  const position = item.json.Position || item.json.position || ">100";
  const clicks = item.json.Cliques || item.json.clicks || 0;
  const impressions = item.json.Impressions || item.json.impressions || 0;
  const ctr = item.json.CTR || 0;
  const volume = item.json.Volume || item.json.volume || 0;
  
  // Convertir position en nombre si possible
  let positionNum = position;
  if (position === ">100" || position === "> 100" || position > 100) {
    positionNum = 101; // Pour le tri
  } else {
    positionNum = parseInt(position) || 101;
  }
  
  const priority = getPriority(positionNum, volume, clicks);
  
  return {
    keyword: keyword,
    position: position,
    positionNum: positionNum,
    volume: volume,
    clicks: clicks,
    impressions: impressions,
    ctr: (ctr * 100).toFixed(2),
    priority: priority,
    status: getStatus(positionNum)
  };
});

// Trier par priorité (0 = critique, 4 = faible) puis par position
allKeywords.sort((a, b) => {
  if (a.priority !== b.priority) return a.priority - b.priority;
  return a.positionNum - b.positionNum;
});

// Générer le rapport Markdown
let markdown = `# 📊 Rapport SEO VOC-Call - Tous les Mots-clés
**Date:** ${new Date().toLocaleDateString('fr-FR')}
**Période:** 28 derniers jours
**Total mots-clés suivis:** ${allKeywords.length}

---

`;

// Grouper par priorité
const byPriority = {
  0: allKeywords.filter(k => k.priority === 0),
  1: allKeywords.filter(k => k.priority === 1),
  2: allKeywords.filter(k => k.priority === 2),
  3: allKeywords.filter(k => k.priority === 3),
  4: allKeywords.filter(k => k.priority === 4)
};

// Priorité 0 : TOP 3 (maintenir)
if (byPriority[0].length > 0) {
  markdown += `## 🏆 PRIORITÉ 0 - TOP 3 (À Maintenir)

**${byPriority[0].length} mots-clés** en position 1-3 :

| Mot-clé | Position | Volume | Clics | Impressions | CTR % | 📊 Statut |
|---------|----------|--------|-------|-------------|-------|-----------|
`;

  byPriority[0].forEach(m => {
    markdown += `| ${m.keyword} | ${m.position} | ${m.volume} | ${m.clicks} | ${m.impressions} | ${m.ctr}% | ${m.status} |\n`;
  });
  
  markdown += `\n---\n\n`;
}

// Priorité 1 : Positions 4-10 (proche top 3)
if (byPriority[1].length > 0) {
  markdown += `## 🚀 PRIORITÉ 1 - Proche TOP 3 (Positions 4-10)

**${byPriority[1].length} mots-clés** à pousser vers le top 3 :

| Mot-clé | Position | Volume | Clics | Impressions | CTR % | 📊 Statut |
|---------|----------|--------|-------|-------------|-------|-----------|
`;

  byPriority[1].forEach(m => {
    markdown += `| ${m.keyword} | ${m.position} | ${m.volume} | ${m.clicks} | ${m.impressions} | ${m.ctr}% | ${m.status} |\n`;
  });
  
  markdown += `\n---\n\n`;
}

// Priorité 2 : Positions 11-20 (proche top 10)
if (byPriority[2].length > 0) {
  markdown += `## 🔥 PRIORITÉ 2 - Proche Top 10 (Positions 11-20)

**${byPriority[2].length} mots-clés** à optimiser pour entrer dans le top 10 :

| Mot-clé | Position | Volume | Clics | Impressions | CTR % | 📊 Statut |
|---------|----------|--------|-------|-------------|-------|-----------|
`;

  byPriority[2].forEach(m => {
    markdown += `| ${m.keyword} | ${m.position} | ${m.volume} | ${m.clicks} | ${m.impressions} | ${m.ctr}% | ${m.status} |\n`;
  });
  
  markdown += `\n---\n\n`;
}

// Priorité 3 : Positions 21-100 (moyenne)
if (byPriority[3].length > 0) {
  markdown += `## 🟡 PRIORITÉ 3 - Positions 21-100

**${byPriority[3].length} mots-clés** nécessitant une optimisation à moyen terme :

| Mot-clé | Position | Volume | Clics | Impressions | CTR % | 📊 Statut |
|---------|----------|--------|-------|-------------|-------|-----------|
`;

  byPriority[3].forEach(m => {
    markdown += `| ${m.keyword} | ${m.position} | ${m.volume} | ${m.clicks} | ${m.impressions} | ${m.ctr}% | ${m.status} |\n`;
  });
  
  markdown += `\n---\n\n`;
}

// Priorité 4 : Positions > 100 (non classés)
if (byPriority[4].length > 0) {
  markdown += `## ⚠️ PRIORITÉ 4 - Non Classés (Position > 100)

**${byPriority[4].length} mots-clés** non classés nécessitant une action :

| Mot-clé | Position | Volume | Clics | Impressions | CTR % | 📊 Statut |
|---------|----------|--------|-------|-------------|-------|-----------|
`;

  byPriority[4].forEach(m => {
    markdown += `| ${m.keyword} | ${m.position} | ${m.volume} | ${m.clicks} | ${m.impressions} | ${m.ctr}% | ${m.status} |\n`;
  });
  
  markdown += `\n---\n\n`;
}

// Analyse des opportunités rapides
const opportunities = allKeywords.filter(m => 
  m.positionNum >= 5 && m.positionNum <= 20 && m.volume > 0
);

if (opportunities.length > 0) {
  markdown += `## 🎯 OPPORTUNITÉS RAPIDES (Positions 5-20 avec Volume)

**${opportunities.length} mots-clés** à optimiser en priorité :

| Mot-clé | Position | Volume | Impressions | 💡 Action |
|---------|----------|--------|-------------|-----------|
`;

  opportunities.forEach(m => {
    let action = "";
    if (m.positionNum <= 10) action = "🚀 Pousser vers Top 3";
    else if (m.positionNum <= 15) action = "⚡ Optimiser page existante";
    else action = "🔧 Améliorer contenu";
    
    markdown += `| ${m.keyword} | ${m.position} | ${m.volume} | ${m.impressions} | ${action} |\n`;
  });
  
  markdown += `\n---\n\n`;
}

// Top mots-clés par volume (non classés)
const highVolumeNotRanked = byPriority[4]
  .filter(m => m.volume > 100)
  .sort((a, b) => b.volume - a.volume)
  .slice(0, 20); // Top 20 par volume

if (highVolumeNotRanked.length > 0) {
  markdown += `## 🚨 ALERTES - Mots-clés à Fort Volume Non Classés

**${highVolumeNotRanked.length} mots-clés** avec volume élevé mais non classés :

| Mot-clé | Position | Volume | 🚨 Action requise |
|---------|----------|--------|-------------------|
`;

  highVolumeNotRanked.forEach(m => {
    markdown += `| ${m.keyword} | ${m.position} | ${m.volume} | Créer/optimiser contenu dédié |\n`;
  });
  
  markdown += `\n---\n\n`;
}

// Statistiques globales
const stats = {
  total: allKeywords.length,
  top3: byPriority[0].length,
  page1: byPriority[0].length + byPriority[1].length,
  top20: byPriority[0].length + byPriority[1].length + byPriority[2].length,
  notRanked: byPriority[4].length,
  totalClicks: allKeywords.reduce((sum, k) => sum + (k.clicks || 0), 0),
  totalImpressions: allKeywords.reduce((sum, k) => sum + (k.impressions || 0), 0)
};

markdown += `## 📊 Statistiques Globales

- **Total mots-clés** : ${stats.total}
- **TOP 3** : ${stats.top3} (${((stats.top3/stats.total)*100).toFixed(1)}%)
- **Page 1 (TOP 10)** : ${stats.page1} (${((stats.page1/stats.total)*100).toFixed(1)}%)
- **TOP 20** : ${stats.top20} (${((stats.top20/stats.total)*100).toFixed(1)}%)
- **Non classés (>100)** : ${stats.notRanked} (${((stats.notRanked/stats.total)*100).toFixed(1)}%)
- **Total clics** : ${stats.totalClicks}
- **Total impressions** : ${stats.totalImpressions}
- **CTR moyen** : ${stats.totalImpressions > 0 ? ((stats.totalClicks/stats.totalImpressions)*100).toFixed(2) : 0}%

---

## 💡 Questions pour Claude/Cursor:

1. Pour les opportunités positions 5-20 : quelle stratégie d'optimisation on-page recommandes-tu ?
2. Pour les alertes (>100 ou non classés) : faut-il créer des pages dédiées ou abandonner certains mots-clés ?
3. Quel devrait être mon planning d'optimisation sur les 4 prochaines semaines (priorisation) ?
4. Stratégie de création de contenu : quels articles de blog créer pour capturer ces mots-clés ?
5. Analyse des mots-clés TOP 3 : comment maintenir ces positions et éviter la régression ?

`;

return [{ json: { markdown, filename: `rapport-seo-complet-voc-call-${new Date().toISOString().split('T')[0]}.md` } }];
```

### Étape 3 : Tester

1. **Exécutez votre workflow N8N**
2. **Vérifiez** que le nœud Code génère bien le markdown avec tous les mots-clés
3. **Vérifiez** que le nœud HTTP Request envoie bien les données

## ✅ Résultat Attendu

Après modification, le fichier devrait contenir :
- **Tous les mots-clés** (438 au lieu de 27)
- **Classement automatique** par priorité selon la position
- **Statistiques globales** complètes
- **Organisation** par niveau de priorité (0 à 4)

## 🔍 Différences avec l'Ancien Code

| Ancien Code | Nouveau Code |
|-------------|--------------|
| Liste fixe de 27 mots-clés | Tous les mots-clés de Search Console |
| Priorité manuelle (tous en priorité 2) | Priorité automatique (0-4 selon position) |
| Seulement les mots-clés de la liste | Tous les mots-clés détectés |

## 📊 Classification Automatique

Le nouveau code classe automatiquement les mots-clés :

- **Priorité 0** : Positions 1-3 (TOP 3) → À maintenir
- **Priorité 1** : Positions 4-10 (Page 1) → Pousser vers TOP 3
- **Priorité 2** : Positions 11-20 → Proche top 10
- **Priorité 3** : Positions 21-100 → Optimisation moyen terme
- **Priorité 4** : Positions > 100 → Non classés

---

**Une fois modifié, relancez votre workflow N8N et vous devriez recevoir tous les 438 mots-clés !**






