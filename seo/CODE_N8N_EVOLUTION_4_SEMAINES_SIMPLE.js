// Code N8N - Analyse Évolution des Positions sur 4 Semaines (Version Simplifiée)
// Format des données : { row_number, Priorité, Mot-clé, SD, Volume de Recherche, 2025-12-08, 2025-12-12, 2025-12-15, ... }

// ========================================
// LISTE DES PRIORITÉS (depuis votre Google Sheet)
// ========================================

const priorityKeywords = [
  { keyword: "call center france", priority: 2, volume: 210 },
  { keyword: "centre d'appel france", priority: 2, volume: 110 },
  { keyword: "relance commerciale", priority: 2, volume: 110 },
  { keyword: "prospection téléphonique", priority: 2, volume: 1600 },
  { keyword: "service après‑vente", priority: 2, volume: 0 },
  { keyword: "hotline", priority: 2, volume: 4400 },
  { keyword: "support technique", priority: 2, volume: 1000 },
  { keyword: "tickets support", priority: 2, volume: 320 },
  { keyword: "france call center", priority: 2, volume: 210 },
  { keyword: "accueil/secrétariat", priority: 2, volume: 260 },
  { keyword: "télévente", priority: 2, volume: 210 },
  { keyword: "télémarketing", priority: 2, volume: 260 },
  { keyword: "support informatique", priority: 2, volume: 1300 },
  { keyword: "service desk", priority: 2, volume: 880 },
  { keyword: "support client", priority: 2, volume: 480 },
  { keyword: "accueil téléphonique", priority: 2, volume: 1300 },
  { keyword: "génération de leads", priority: 2, volume: 1300 },
  { keyword: "télésecrétariat", priority: 2, volume: 1300 },
  { keyword: "secrétariat téléphonique", priority: 2, volume: 170 },
  { keyword: "support utilisateurs", priority: 2, volume: 390 },
  { keyword: "call center français", priority: 2, volume: 20 },
  { keyword: "customer service", priority: 2, volume: 3600 },
  { keyword: "helpdesk / it support", priority: 2, volume: 140 },
  { keyword: "relation client", priority: 2, volume: 5400 },
  { keyword: "omnicanal", priority: 2, volume: 6600 },
  { keyword: "centre de contact", priority: 2, volume: 210 },
  { keyword: "centre d'appels france", priority: 2, volume: 110 },
  { keyword: "astreinte", priority: 2, volume: 14800 },
  { keyword: "support/assistance", priority: 2, volume: 590 },
  { keyword: "service client", priority: 2, volume: 18100 },
  { keyword: "sav", priority: 2, volume: 18100 },
  { keyword: "helpdesk", priority: 2, volume: 4400 },
  { keyword: "permanence téléphonique", priority: 2, volume: 720 },
  { keyword: "standard externalisé", priority: 2, volume: 260 },
  { keyword: "call center", priority: 2, volume: 4400 },
  { keyword: "bpo", priority: 2, volume: 60500 },
  { keyword: "externalisation service client", priority: 2, volume: 480 },
  { keyword: "gestion réclamations", priority: 2, volume: 90 },
  { keyword: "appels entrants", priority: 2, volume: 1600 }
];

// Créer un mapping mot-clé -> priorité (normalisé)
const priorityMap = {};
priorityKeywords.forEach(pk => {
  const normalized = pk.keyword.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  priorityMap[normalized] = { priority: pk.priority, volume: pk.volume };
});

// ========================================
// RÉCUPÉRATION DES DONNÉES
// ========================================

const allInputs = $input.all();

// Extraire les données (format standard : { row_number, Priorité, Mot-clé, 2025-12-08, 2025-12-12, ... })
const allRows = allInputs.map(item => item.json || item).filter(row => {
  if (!row || typeof row !== 'object') return false;
  // Filtrer les métadonnées
  if (row.success !== undefined && row.column !== undefined && row.rowsUpdated !== undefined) {
    return false;
  }
  // Garder les lignes qui ont "Mot-clé" ou des colonnes de dates
  return row['Mot-clé'] !== undefined || 
         row['Mot-cle'] !== undefined || 
         row.keyword !== undefined ||
         Object.keys(row).some(key => /^\d{4}-\d{2}-\d{2}$/.test(key));
});

if (allRows.length === 0) {
  return [{
    json: {
      error: "Aucune donnée trouvée",
      markdown: `# ❌ Erreur\n\nAucune donnée trouvée dans l'onglet 'évolution'.\n\n**Items reçus:** ${allInputs.length}`
    }
  }];
}

// Identifier les colonnes de dates
const firstRow = allRows[0] || {};
const dateColumns = [];
Object.keys(firstRow).forEach(key => {
  if (/^\d{4}-\d{2}-\d{2}$/.test(key)) {
    dateColumns.push(key);
  }
});

dateColumns.sort();
const last4Weeks = dateColumns.slice(-4);

if (last4Weeks.length === 0) {
  return [{
    json: {
      error: "Aucune colonne de date trouvée",
      markdown: `# ❌ Erreur\n\nAucune colonne de date (format YYYY-MM-DD) trouvée.\n\n**Clés disponibles:** ${Object.keys(firstRow).join(', ')}`
    }
  }];
}

// ========================================
// FONCTIONS UTILITAIRES
// ========================================

function normalize(str) {
  if (!str) return '';
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

function parsePosition(pos) {
  if (!pos || pos === 'N/A' || pos === '' || pos === null || pos === undefined) return null;
  const normalized = String(pos).replace(',', '.');
  const num = parseFloat(normalized);
  return isNaN(num) ? null : num;
}

function calculateTrend(positions) {
  const validPositions = positions.filter(p => p !== null);
  if (validPositions.length < 2) return null;
  
  const first = validPositions[0];
  const last = validPositions[validPositions.length - 1];
  
  if (first === null || last === null) return null;
  
  const change = last - first;
  const percentChange = first > 0 ? ((change / first) * 100).toFixed(1) : 0;
  
  return {
    change: change,
    percentChange: percentChange,
    trend: change < -1 ? '📈 Amélioration' : change > 1 ? '📉 Régression' : '➡️ Stable',
    firstPosition: first,
    lastPosition: last
  };
}

function getUrgencyFromTrend(trend, priority, currentPosition) {
  if (!trend) return 'low';
  if (trend.change > 10 && priority === 2) return 'critical';
  if (trend.change > 5 && priority === 2) return 'high';
  if (trend.change > 2 && priority === 2) return 'medium';
  if (trend.change < -3) return 'low';
  if (trend.change > 2) return 'medium';
  return 'low';
}

function getSEOAction(priority, position, trend) {
  let positionNum = parseFloat(position) || 101;
  if (positionNum > 100) positionNum = 101;
  
  if (trend && trend.change > 5 && priority === 2) {
    return { action: "🚨 URGENT : Corriger régression", urgency: "critical", category: "corriger-regression" };
  }
  if (trend && trend.change > 2 && priority === 2) {
    return { action: "⚠️ Analyser et optimiser", urgency: "high", category: "analyser-regression" };
  }
  if (trend && trend.change < -1) {
    return { action: "✅ Maintenir (amélioration)", urgency: "low", category: "maintenir" };
  }
  
  if (priority === 2 && positionNum <= 3) {
    return { action: "✅ Maintenir", urgency: "low", category: "maintenir" };
  }
  if (priority === 2 && positionNum > 3) {
    if (positionNum <= 10) {
      return { action: "🚀 Pousser vers TOP 3", urgency: "high", category: "optimiser-top3" };
    } else if (positionNum <= 20) {
      return { action: "⚡ Optimiser pour Top 10", urgency: "high", category: "optimiser-top10" };
    } else {
      return { action: "🔧 Créer/Optimiser contenu", urgency: "critical", category: "creer-contenu" };
    }
  }
  if (priority === 1) {
    if (positionNum <= 20) {
      return { action: "📈 Optimiser si opportunité", urgency: "medium", category: "optimiser-opportunite" };
    }
  }
  return { action: "⏸️ Non prioritaire", urgency: "none", category: "non-prioritaire" };
}

function getStatus(position) {
  let positionNum = parseFloat(position) || 101;
  if (positionNum > 100) positionNum = 101;
  if (positionNum <= 3) return "✅ TOP 3";
  if (positionNum <= 10) return "🟢 Page 1";
  if (positionNum <= 20) return "🟡 Top 20";
  if (positionNum <= 100) return "🟠 Top 100";
  return "❌ Non classé";
}

// ========================================
// TRAITEMENT DES DONNÉES
// ========================================

const keywordsWithEvolution = allRows.map(row => {
  const keyword = row['Mot-clé'] || row['Mot-cle'] || row.keyword || '';
  const priorityFromSheet = parseInt(row['Priorité'] || row.Priorité || row.priority || 0);
  
  const normalizedKeyword = normalize(keyword);
  const priorityData = priorityMap[normalizedKeyword] || { priority: priorityFromSheet, volume: 0 };
  const priority = priorityData.priority || priorityFromSheet;
  const volume = priorityData.volume || 0;
  
  const positions = last4Weeks.map(date => parsePosition(row[date]));
  const trend = calculateTrend(positions);
  const currentPosition = positions.filter(p => p !== null).pop() || null;
  const urgency = getUrgencyFromTrend(trend, priority, currentPosition);
  const seoAction = getSEOAction(priority, currentPosition, trend);
  
  return {
    keyword: keyword,
    priority: priority,
    priorityLabel: priority === 2 ? 'Prioritaire' : priority === 1 ? 'Moyennement' : 'Non prioritaire',
    volume: volume,
    positions: positions,
    dateColumns: last4Weeks,
    trend: trend,
    currentPosition: currentPosition,
    urgency: urgency,
    seoAction: seoAction.action,
    category: seoAction.category,
    status: getStatus(currentPosition)
  };
});

const validKeywords = keywordsWithEvolution.filter(k => k.currentPosition !== null && k.keyword);

const urgencyOrder = { "critical": 0, "high": 1, "medium": 2, "low": 3, "none": 4 };
validKeywords.sort((a, b) => {
  if (urgencyOrder[a.urgency] !== urgencyOrder[b.urgency]) {
    return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
  }
  if (b.priority !== a.priority) return b.priority - a.priority;
  return (a.currentPosition || 101) - (b.currentPosition || 101);
});

// ========================================
// GÉNÉRATION DU RAPPORT MARKDOWN
// ========================================

const today = new Date().toISOString().split('T')[0];

const priority2 = validKeywords.filter(k => k.priority === 2);
const priority1 = validKeywords.filter(k => k.priority === 1);
const priority0 = validKeywords.filter(k => k.priority === 0);

const improvements = validKeywords.filter(k => k.trend && k.trend.change < -1);
const regressions = validKeywords.filter(k => k.trend && k.trend.change > 1);
const stable = validKeywords.filter(k => k.trend && k.trend.change >= -1 && k.trend.change <= 1);
const criticalRegressions = validKeywords.filter(k => k.priority === 2 && k.trend && k.trend.change > 5);

const priority2Stats = {
  total: priority2.length,
  top3: priority2.filter(k => k.currentPosition <= 3).length,
  top10: priority2.filter(k => k.currentPosition <= 10).length,
  top20: priority2.filter(k => k.currentPosition <= 20).length,
  notRanked: priority2.filter(k => k.currentPosition > 100).length,
  toOptimize: priority2.filter(k => k.currentPosition > 3).length
};

let markdown = `# 📈 Rapport Évolution Positions SEO - VOC-Call (4 Semaines)
**Date d'analyse** : ${today}
**Source** : Google Sheet - Onglet "évolution"
**Période analysée** : ${last4Weeks[0] || 'N/A'} → ${last4Weeks[last4Weeks.length - 1] || 'N/A'}
**Total mots-clés analysés** : ${validKeywords.length}

---

## 🎯 Vue d'Ensemble

### Statistiques Globales
- **Mots-clés en amélioration** : ${improvements.length} 📈
- **Mots-clés stables** : ${stable.length} ➡️
- **Mots-clés en régression** : ${regressions.length} 📉
- **Régressions critiques (Priorité 2)** : ${criticalRegressions.length} 🚨

---

## 🚨 ACTIONS URGENTES - Régressions Critiques

`;

if (criticalRegressions.length > 0) {
  markdown += `**${criticalRegressions.length} mots-clés prioritaires en régression critique** :\n\n`;
  markdown += `| Mot-clé | Priorité | Position Actuelle | Variation | Tendance | 💡 Action SEO |\n`;
  markdown += `|---------|----------|-------------------|-----------|----------|---------------|\n`;
  
  criticalRegressions.forEach(k => {
    markdown += `| ${k.keyword} | ${k.priorityLabel} | ${k.currentPosition.toFixed(1)} | ${k.trend.change > 0 ? '+' : ''}${k.trend.change.toFixed(1)} (${k.trend.percentChange}%) | ${k.trend.trend} | ${k.seoAction} |\n`;
  });
  
  markdown += `\n---\n\n`;
} else {
  markdown += `✅ Aucune régression critique détectée.\n\n---\n\n`;
}

const moderateRegressions = validKeywords.filter(k => 
  k.priority === 2 && k.trend && k.trend.change > 1 && k.trend.change <= 5
);

if (moderateRegressions.length > 0) {
  markdown += `## ⚠️ Régressions Modérées - Priorité 2\n\n`;
  markdown += `**${moderateRegressions.length} mots-clés prioritaires en régression modérée** :\n\n`;
  markdown += `| Mot-clé | Position Actuelle | Variation | Tendance | 💡 Action SEO |\n`;
  markdown += `|---------|-------------------|-----------|----------|---------------|\n`;
  
  moderateRegressions.forEach(k => {
    markdown += `| ${k.keyword} | ${k.currentPosition.toFixed(1)} | ${k.trend.change > 0 ? '+' : ''}${k.trend.change.toFixed(1)} (${k.trend.percentChange}%) | ${k.trend.trend} | ${k.seoAction} |\n`;
  });
  
  markdown += `\n---\n\n`;
}

if (improvements.length > 0) {
  markdown += `## 📈 Améliorations - À Maintenir\n\n`;
  markdown += `**${improvements.length} mots-clés en amélioration** :\n\n`;
  markdown += `| Mot-clé | Priorité | Position Actuelle | Variation | Tendance | 💡 Action SEO |\n`;
  markdown += `|---------|----------|-------------------|-----------|----------|---------------|\n`;
  
  improvements.forEach(k => {
    markdown += `| ${k.keyword} | ${k.priorityLabel} | ${k.currentPosition.toFixed(1)} | ${k.trend.change.toFixed(1)} (${k.trend.percentChange}%) | ${k.trend.trend} | ${k.seoAction} |\n`;
  });
  
  markdown += `\n---\n\n`;
}

const priority2NotTop3 = priority2.filter(k => k.currentPosition > 3);
if (priority2NotTop3.length > 0) {
  markdown += `## 🚨 ACTIONS PRIORITAIRES - Priorité 2 à Optimiser\n\n`;
  markdown += `**${priority2NotTop3.length} mots-clés prioritaires** qui ne sont pas dans le TOP 3 :\n\n`;
  markdown += `| Mot-clé | Position | Volume | Évolution | 📊 Statut | 💡 Action SEO |\n`;
  markdown += `|---------|----------|--------|-----------|-----------|---------------|\n`;
  
  priority2NotTop3.forEach(m => {
    const evolutionStr = m.trend 
      ? `${m.trend.change > 0 ? '+' : ''}${m.trend.change.toFixed(1)} (${m.trend.percentChange}%)`
      : 'N/A';
    markdown += `| ${m.keyword} | ${m.currentPosition.toFixed(1)} | ${m.volume} | ${evolutionStr} | ${m.status} | ${m.seoAction} |\n`;
  });
  
  markdown += `\n---\n\n`;
}

markdown += `## 📊 Détails par Mot-Clé (4 Dernières Semaines)\n\n`;
markdown += `| Mot-clé | Priorité | Positions (${last4Weeks.join(' → ')}) | Variation | Tendance | Action SEO |\n`;
markdown += `|---------|----------|${'---|'.repeat(last4Weeks.length)}-----------|----------|------------|\n`;

validKeywords.forEach(k => {
  const positionsStr = k.positions.map((p, i) => 
    p !== null ? `${p.toFixed(1)}` : 'N/A'
  ).join(' → ');
  
  const trendStr = k.trend 
    ? `${k.trend.change > 0 ? '+' : ''}${k.trend.change.toFixed(1)} (${k.trend.percentChange}%)`
    : 'N/A';
  
  markdown += `| ${k.keyword} | ${k.priorityLabel} | ${positionsStr} | ${trendStr} | ${k.trend ? k.trend.trend : 'N/A'} | ${k.seoAction} |\n`;
});

markdown += `\n---\n\n## 📊 Statistiques par Priorité\n\n`;
markdown += `### 🔴 Priorité 2 (Prioritaire)\n`;
markdown += `- **Total** : ${priority2Stats.total} mots-clés\n`;
markdown += `- **TOP 3** : ${priority2Stats.top3} (${priority2Stats.total > 0 ? ((priority2Stats.top3/priority2Stats.total)*100).toFixed(1) : 0}%) ✅\n`;
markdown += `- **TOP 10** : ${priority2Stats.top10} (${priority2Stats.total > 0 ? ((priority2Stats.top10/priority2Stats.total)*100).toFixed(1) : 0}%)\n`;
markdown += `- **TOP 20** : ${priority2Stats.top20} (${priority2Stats.total > 0 ? ((priority2Stats.top20/priority2Stats.total)*100).toFixed(1) : 0}%)\n`;
markdown += `- **🚨 À optimiser** : ${priority2Stats.toOptimize} (${priority2Stats.total > 0 ? ((priority2Stats.toOptimize/priority2Stats.total)*100).toFixed(1) : 0}%)\n\n`;

if (criticalRegressions.length > 0) {
  markdown += `## 🎯 Plan d'Action Recommandé\n\n`;
  markdown += `### 🚨 Actions Immédiates (Semaine 1)\n`;
  markdown += `- **Analyser et corriger** les ${criticalRegressions.length} régressions critiques\n`;
  markdown += `- **Identifier les causes** : changements algorithmiques, concurrence, problèmes techniques\n`;
  markdown += `- **Optimiser en urgence** : contenu, liens internes, meta tags\n\n`;
}

markdown += `---\n\n## 📝 Notes\n\n`;
markdown += `- Les positions sont calculées à partir des données de l'onglet "évolution"\n`;
markdown += `- La variation est calculée entre la première et la dernière des 4 dernières semaines\n`;
markdown += `- Priorité 2 = Prioritaire, Priorité 1 = Moyennement prioritaire\n`;
markdown += `- 📈 Amélioration = Position diminue (mieux classé)\n`;
markdown += `- 📉 Régression = Position augmente (moins bien classé)\n`;

return [{
  json: {
    markdown: markdown,
    filename: `evolution-positions-seo-4-semaines-${today}.md`,
    keywordsAnalyzed: validKeywords.length,
    criticalRegressions: criticalRegressions.length,
    moderateRegressions: moderateRegressions.length,
    improvements: improvements.length,
    dateRange: {
      start: last4Weeks[0] || null,
      end: last4Weeks[last4Weeks.length - 1] || null,
      weeks: last4Weeks.length
    }
  }
}];

