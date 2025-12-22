// Code N8N - Analyse Évolution des Positions depuis l'onglet "évolution"
// Ce code lit l'onglet "évolution" du Google Sheet et calcule les tendances

// ========================================
// RÉCUPÉRATION DES DONNÉES DE L'ONGLET "ÉVOLUTION"
// ========================================

// Les données viennent du nœud "Get row(s) in sheet" configuré pour l'onglet "évolution"
const evolutionData = $input.all();

// Structure attendue de l'onglet "évolution" :
// - Colonne A : Priorité
// - Colonne B : Mot-clé
// - Colonne E : Date 1 (ex: 2025-12-08)
// - Colonne F : Date 2 (ex: 2025-12-12)
// - Colonne G : Date 3 (ex: 2025-12-15)
// ... (autres colonnes de dates)

// ========================================
// FONCTIONS UTILITAIRES
// ========================================

// Fonction pour normaliser les mots-clés
function normalize(str) {
  if (!str) return '';
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

// Fonction pour convertir une position en nombre
function parsePosition(pos) {
  if (!pos || pos === 'N/A' || pos === '' || pos === null) return null;
  const num = parseFloat(pos);
  return isNaN(num) ? null : num;
}

// Fonction pour calculer la variation de position
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
    trend: change < 0 ? '📈 Amélioration' : change > 0 ? '📉 Régression' : '➡️ Stable',
    firstPosition: first,
    lastPosition: last
  };
}

// Fonction pour déterminer l'urgence selon la tendance
function getUrgencyFromTrend(trend, priority, currentPosition) {
  if (!trend) return 'low';
  
  // Régression importante = urgence critique
  if (trend.change > 5 && priority === 2) return 'critical';
  if (trend.change > 10 && priority === 2) return 'critical';
  
  // Amélioration = urgence faible (maintenir)
  if (trend.change < -3) return 'low';
  
  // Régression modérée = urgence moyenne
  if (trend.change > 2) return 'medium';
  
  return 'low';
}

// ========================================
// TRAITEMENT DES DONNÉES
// ========================================

// Extraire les colonnes de dates dynamiquement
const allRows = evolutionData.map(item => item.json);
const firstRow = allRows[0] || {};

// Identifier les colonnes de dates (colonnes avec format date YYYY-MM-DD)
const dateColumns = [];
Object.keys(firstRow).forEach(key => {
  // Vérifier si la clé ressemble à une date (YYYY-MM-DD)
  if (/^\d{4}-\d{2}-\d{2}$/.test(key)) {
    dateColumns.push(key);
  }
});

// Trier les dates chronologiquement
dateColumns.sort();

// Traiter chaque mot-clé
const keywordsWithEvolution = allRows.map(row => {
  const keyword = row['Mot-clé'] || row['Mot-clé'] || row.keyword || '';
  const priority = parseInt(row['Priorité'] || row.Priorité || row.priority || 0);
  
  // Extraire les positions pour chaque date
  const positions = dateColumns.map(date => parsePosition(row[date]));
  
  // Calculer la tendance
  const trend = calculateTrend(positions);
  
  // Position actuelle (dernière position valide)
  const currentPosition = positions.filter(p => p !== null).pop() || null;
  
  // Déterminer l'urgence
  const urgency = getUrgencyFromTrend(trend, priority, currentPosition);
  
  // Déterminer l'action SEO
  let seoAction = '⏸️ Aucune action';
  if (trend) {
    if (trend.change > 5 && priority === 2) {
      seoAction = '🚨 URGENT : Corriger régression';
    } else if (trend.change > 2 && priority === 2) {
      seoAction = '⚠️ Analyser et optimiser';
    } else if (trend.change < -3) {
      seoAction = '✅ Maintenir (amélioration)';
    } else if (trend.change < 0) {
      seoAction = '📈 Poursuivre optimisation';
    } else {
      seoAction = '🔍 Surveiller';
    }
  }
  
  return {
    keyword: keyword,
    priority: priority,
    priorityLabel: priority === 2 ? 'Prioritaire' : priority === 1 ? 'Moyennement' : 'Non prioritaire',
    positions: positions,
    dateColumns: dateColumns,
    trend: trend,
    currentPosition: currentPosition,
    urgency: urgency,
    seoAction: seoAction
  };
});

// Filtrer les mots-clés avec des données valides
const validKeywords = keywordsWithEvolution.filter(k => k.currentPosition !== null);

// Trier par urgence puis par priorité
const urgencyOrder = { "critical": 0, "medium": 1, "low": 2 };
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

let markdown = `# 📈 Rapport Évolution Positions SEO - VOC-Call
**Date d'analyse** : ${today}
**Source** : Google Sheet - Onglet "évolution"
**Période analysée** : ${dateColumns[0] || 'N/A'} → ${dateColumns[dateColumns.length - 1] || 'N/A'}
**Total mots-clés analysés** : ${validKeywords.length}

---

## 🎯 Vue d'Ensemble

### Statistiques Globales
- **Mots-clés en amélioration** : ${validKeywords.filter(k => k.trend && k.trend.change < 0).length}
- **Mots-clés stables** : ${validKeywords.filter(k => k.trend && k.trend.change === 0).length}
- **Mots-clés en régression** : ${validKeywords.filter(k => k.trend && k.trend.change > 0).length}

---

## 🚨 ACTIONS URGENTES - Régressions Critiques

`;

// Régressions critiques (Priorité 2 + régression > 5 positions)
const criticalRegressions = validKeywords.filter(k => 
  k.priority === 2 && k.trend && k.trend.change > 5
);

if (criticalRegressions.length > 0) {
  markdown += `**${criticalRegressions.length} mots-clés prioritaires en régression critique** :\n\n`;
  markdown += `| Mot-clé | Position Actuelle | Variation | Tendance | 💡 Action SEO |\n`;
  markdown += `|---------|-------------------|-----------|----------|---------------|\n`;
  
  criticalRegressions.forEach(k => {
    const positionsStr = k.positions.map((p, i) => 
      p !== null ? `${k.dateColumns[i]}: ${p}` : `${k.dateColumns[i]}: N/A`
    ).join(' → ');
    
    markdown += `| ${k.keyword} | ${k.currentPosition} | ${k.trend.change > 0 ? '+' : ''}${k.trend.change} (${k.trend.percentChange}%) | ${k.trend.trend} | ${k.seoAction} |\n`;
  });
  
  markdown += `\n---\n\n`;
} else {
  markdown += `✅ Aucune régression critique détectée.\n\n---\n\n`;
}

// Régressions modérées
const moderateRegressions = validKeywords.filter(k => 
  k.priority === 2 && k.trend && k.trend.change > 0 && k.trend.change <= 5
);

if (moderateRegressions.length > 0) {
  markdown += `## ⚠️ Régressions Modérées - Priorité 2\n\n`;
  markdown += `**${moderateRegressions.length} mots-clés prioritaires en régression modérée** :\n\n`;
  markdown += `| Mot-clé | Position Actuelle | Variation | Tendance | 💡 Action SEO |\n`;
  markdown += `|---------|-------------------|-----------|----------|---------------|\n`;
  
  moderateRegressions.forEach(k => {
    markdown += `| ${k.keyword} | ${k.currentPosition} | ${k.trend.change > 0 ? '+' : ''}${k.trend.change} (${k.trend.percentChange}%) | ${k.trend.trend} | ${k.seoAction} |\n`;
  });
  
  markdown += `\n---\n\n`;
}

// Améliorations
const improvements = validKeywords.filter(k => 
  k.trend && k.trend.change < 0
);

if (improvements.length > 0) {
  markdown += `## 📈 Améliorations - À Maintenir\n\n`;
  markdown += `**${improvements.length} mots-clés en amélioration** :\n\n`;
  markdown += `| Mot-clé | Priorité | Position Actuelle | Variation | Tendance | 💡 Action SEO |\n`;
  markdown += `|---------|----------|-------------------|-----------|----------|---------------|\n`;
  
  improvements.forEach(k => {
    markdown += `| ${k.keyword} | ${k.priorityLabel} | ${k.currentPosition} | ${k.trend.change} (${k.trend.percentChange}%) | ${k.trend.trend} | ${k.seoAction} |\n`;
  });
  
  markdown += `\n---\n\n`;
}

// Détails par mot-clé (tous)
markdown += `## 📊 Détails par Mot-Clé\n\n`;
markdown += `| Mot-clé | Priorité | Positions (Évolution) | Variation | Tendance | Action SEO |\n`;
markdown += `|---------|----------|----------------------|-----------|----------|------------|\n`;

validKeywords.forEach(k => {
  const positionsStr = k.positions.map((p, i) => 
    p !== null ? `${p}` : 'N/A'
  ).join(' → ');
  
  const trendStr = k.trend 
    ? `${k.trend.change > 0 ? '+' : ''}${k.trend.change} (${k.trend.percentChange}%)`
    : 'N/A';
  
  markdown += `| ${k.keyword} | ${k.priorityLabel} | ${positionsStr} | ${trendStr} | ${k.trend ? k.trend.trend : 'N/A'} | ${k.seoAction} |\n`;
});

markdown += `\n---\n\n`;

// Plan d'action
markdown += `## 🎯 Plan d'Action Recommandé\n\n`;

if (criticalRegressions.length > 0) {
  markdown += `### 🚨 Actions Immédiates (Semaine 1)\n`;
  markdown += `- **Analyser et corriger** les ${criticalRegressions.length} régressions critiques\n`;
  markdown += `- **Identifier les causes** : changements algorithmiques, concurrence, problèmes techniques\n`;
  markdown += `- **Optimiser en urgence** : contenu, liens internes, meta tags\n\n`;
}

if (moderateRegressions.length > 0) {
  markdown += `### ⚠️ Actions Court Terme (Semaine 2)\n`;
  markdown += `- **Surveiller** les ${moderateRegressions.length} régressions modérées\n`;
  markdown += `- **Optimiser** les pages concernées\n`;
  markdown += `- **Renforcer** le maillage interne\n\n`;
}

if (improvements.length > 0) {
  markdown += `### ✅ Actions de Maintien (Semaine 3-4)\n`;
  markdown += `- **Maintenir** les ${improvements.length} mots-clés en amélioration\n`;
  markdown += `- **Continuer** les optimisations qui fonctionnent\n`;
  markdown += `- **Documenter** les actions qui ont généré des améliorations\n\n`;
}

markdown += `---\n\n`;
markdown += `## 📝 Notes\n\n`;
markdown += `- Les positions sont calculées à partir des données de l'onglet "évolution"\n`;
markdown += `- La variation est calculée entre la première et la dernière date disponible\n`;
markdown += `- Les mots-clés avec "N/A" n'ont pas de données pour certaines dates\n`;
markdown += `- Priorité 2 = Prioritaire, Priorité 1 = Moyennement prioritaire\n`;

// Retourner le résultat
return [{
  json: {
    markdown: markdown,
    filename: `evolution-positions-seo-${today}.md`,
    keywordsAnalyzed: validKeywords.length,
    criticalRegressions: criticalRegressions.length,
    moderateRegressions: moderateRegressions.length,
    improvements: improvements.length,
    dateRange: {
      start: dateColumns[0] || null,
      end: dateColumns[dateColumns.length - 1] || null
    }
  }
}];

