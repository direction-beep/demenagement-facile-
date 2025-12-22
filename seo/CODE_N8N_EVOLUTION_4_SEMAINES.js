// Code N8N - Analyse Évolution des Positions sur 4 Semaines
// Ce code lit l'onglet "évolution" du Google Sheet et calcule les tendances

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
  { keyword: "appels entrants", priority: 2, volume: 1600 },
  { keyword: "hotline/helpdesk", priority: 1, volume: 10 },
  { keyword: "tarif call center", priority: 1, volume: 10 },
  { keyword: "gestion incidents", priority: 1, volume: 10 },
  { keyword: "gestion de chat", priority: 1, volume: 10 },
  { keyword: "synonymes utiles", priority: 1, volume: 10 },
  { keyword: "cabinet médical/paramédical", priority: 1, volume: 20 },
  { keyword: "hébergement eu", priority: 1, volume: 30 },
  { keyword: "éducation/formation", priority: 1, volume: 40 },
  { keyword: "dépannage à distance", priority: 1, volume: 40 },
  { keyword: "offre personnalisée", priority: 1, volume: 50 },
  { keyword: "heures non ouvrées", priority: 1, volume: 50 },
  { keyword: "agent service client", priority: 1, volume: 50 },
  { keyword: "qualité perçue", priority: 1, volume: 50 },
  { keyword: "qualification de leads", priority: 1, volume: 70 },
  { keyword: "devenir téléconseiller", priority: 1, volume: 90 },
  { keyword: "taux de décroché", priority: 1, volume: 90 },
  { keyword: "information clients", priority: 1, volume: 110 },
  { keyword: "accueil professionnel", priority: 1, volume: 110 },
  { keyword: "assistance client", priority: 1, volume: 140 },
  { keyword: "service d'assistance", priority: 1, volume: 140 },
  { keyword: "téléconseiller à domicile", priority: 1, volume: 210 },
  { keyword: "homeshoring", priority: 1, volume: 210 },
  { keyword: "téléopérateur", priority: 1, volume: 480 },
  { keyword: "multicanal", priority: 1, volume: 1000 },
  { keyword: "travail à distance", priority: 1, volume: 1600 },
  { keyword: "fidélisation", priority: 1, volume: 1600 },
  { keyword: "ticketing", priority: 1, volume: 1900 },
  { keyword: "expérience client", priority: 1, volume: 1900 },
  { keyword: "externalisation", priority: 1, volume: 1900 },
  { keyword: "csat", priority: 1, volume: 2900 },
  { keyword: "indicateurs de performance", priority: 1, volume: 2900 },
  { keyword: "conseiller clientèle", priority: 1, volume: 2900 },
  { keyword: "téléconseiller", priority: 1, volume: 4400 },
  { keyword: "itsm", priority: 1, volume: 4400 },
  { keyword: "retail", priority: 1, volume: 12100 },
  { keyword: "scripts", priority: 1, volume: 12100 },
  { keyword: "nps", priority: 1, volume: 14800 },
  { keyword: "onboarding", priority: 1, volume: 14800 },
  { keyword: "télétravail", priority: 1, volume: 27100 },
  { keyword: "fcr", priority: 1, volume: 27100 },
  { keyword: "sla", priority: 1, volume: 33100 },
  { keyword: "kpi", priority: 1, volume: 40500 },
  { keyword: "freelance", priority: 1, volume: 49500 },
  { keyword: "crm", priority: 1, volume: 49500 },
  { keyword: "hubspot", priority: 1, volume: 74000 },
  { keyword: "indépendant", priority: 1, volume: 110000 },
  { keyword: "contacter voc‑call", priority: 0, volume: 0 },
  { keyword: "service client externalisé en marque blanche", priority: 0, volume: 0 },
  { keyword: "centre d'appel nantes", priority: 0, volume: 0 },
  { keyword: "back‑office / canaux digitaux", priority: 0, volume: 0 },
  { keyword: "scripts personnalisés", priority: 0, volume: 0 },
  { keyword: "mots‑clés transactionnels", priority: 0, volume: 0 },
  { keyword: "externalisation service client e‑commerce france", priority: 0, volume: 0 },
  { keyword: "zoho", priority: 0, volume: 0 },
  { keyword: "prise de rendez‑vous b2b", priority: 0, volume: 0 },
  { keyword: "e‑commerce", priority: 0, volume: 0 },
  { keyword: "gestion des messages et agenda cabinet d'avocats", priority: 0, volume: 0 },
  { keyword: "assistance technique", priority: 0, volume: 0 },
  { keyword: "freshdesk", priority: 0, volume: 0 },
  { keyword: "télésecrétariat bordeaux devis", priority: 0, volume: 0 },
  { keyword: "centre d'appel à nantes pour pme", priority: 0, volume: 0 },
  { keyword: "long‑tail par service (exemples)", priority: 0, volume: 0 },
  { keyword: "pic d'activité", priority: 0, volume: 0 },
  { keyword: "routage d'appels", priority: 0, volume: 0 },
  { keyword: "intentions locales (exemples)", priority: 0, volume: 0 },
  { keyword: "prix externalisation", priority: 0, volume: 0 },
  { keyword: "recrutement (candidats)", priority: 0, volume: 0 },
  { keyword: "service client externalisé lyon", priority: 0, volume: 0 },
  { keyword: "experts‑comptables", priority: 0, volume: 0 },
  { keyword: "filtrage d'appels", priority: 0, volume: 0 },
  { keyword: "service client/relation client", priority: 0, volume: 0 },
  { keyword: "call center/centre d'appels", priority: 0, volume: 0 },
  { keyword: "débordement d'appels", priority: 0, volume: 0 },
  { keyword: "secteurs couverts", priority: 0, volume: 0 },
  { keyword: "techniques / outils", priority: 0, volume: 0 },
  { keyword: "décroché rapide", priority: 0, volume: 0 },
  { keyword: "prise de rendez‑vous", priority: 0, volume: 0 },
  { keyword: "permanence téléphonique cabinet médical 24/7", priority: 0, volume: 0 },
  { keyword: "performance et conformité", priority: 0, volume: 0 },
  { keyword: "temps d'attente", priority: 0, volume: 0 },
  { keyword: "permanence téléphonique paris 24/7", priority: 0, volume: 0 },
  { keyword: "expertise française", priority: 0, volume: 0 },
  { keyword: "cybersécurité (sensibilisation)", priority: 0, volume: 0 },
  { keyword: "sous‑traitance", priority: 0, volume: 0 },
  { keyword: "gestion d'agenda", priority: 0, volume: 0 },
  { keyword: "résolution au premier appel", priority: 0, volume: 0 },
  { keyword: "centre d'appel", priority: 0, volume: 0 },
  { keyword: "prise de rendez‑vous b2b téléprospection qualifiée", priority: 0, volume: 0 },
  { keyword: "service client (inbound)", priority: 0, volume: 0 },
  { keyword: "ticketing (zendesk", priority: 0, volume: 0 },
  { keyword: "crm (salesforce", priority: 0, volume: 0 },
  { keyword: "coût permanence téléphonique", priority: 0, volume: 0 },
  { keyword: "communication orale/écrite", priority: 0, volume: 0 },
  { keyword: "traitement emails", priority: 0, volume: 0 },
  { keyword: "missions call center", priority: 0, volume: 0 },
  { keyword: "offres & bénéfices", priority: 0, volume: 0 },
  { keyword: "externalisation/sous‑traitance/bpo", priority: 0, volume: 0 },
  { keyword: "back‑office", priority: 0, volume: 0 },
  { keyword: "helpdesk externalisé pour pme en france", priority: 0, volume: 0 },
  { keyword: "script d'appel", priority: 0, volume: 0 },
  { keyword: "prise de messages", priority: 0, volume: 0 },
  { keyword: "télésecrétariat pour artisans et tpe", priority: 0, volume: 0 },
  { keyword: "réception d'appels", priority: 0, volume: 0 },
  { keyword: "cross‑sell", priority: 0, volume: 0 },
  { keyword: "qualité / méthode", priority: 0, volume: 0 },
  { keyword: "téléconseiller/conseiller clientèle", priority: 0, volume: 0 },
  { keyword: "it/logiciels", priority: 0, volume: 0 },
  { keyword: "cabinets (avocats", priority: 0, volume: 0 },
  { keyword: "campagnes outbound", priority: 0, volume: 0 },
  { keyword: "services b2b", priority: 0, volume: 0 },
  { keyword: "gains de productivité", priority: 0, volume: 0 },
  { keyword: "réduction des coûts", priority: 0, volume: 0 },
  { keyword: "7j/7", priority: 0, volume: 0 },
  { keyword: "continuité de service", priority: 0, volume: 0 },
  { keyword: "saisie de données", priority: 0, volume: 0 },
  { keyword: "aht", priority: 0, volume: 0 },
  { keyword: "knowledge base", priority: 0, volume: 0 },
  { keyword: "téléphonie voip", priority: 0, volume: 0 },
  { keyword: "ciblage", priority: 0, volume: 0 },
  { keyword: "contrôle qualité", priority: 0, volume: 0 },
  { keyword: "enregistrements", priority: 0, volume: 0 },
  { keyword: "modération", priority: 0, volume: 0 },
  { keyword: "demande de devis", priority: 0, volume: 0 },
  { keyword: "qualité de service", priority: 0, volume: 0 },
  { keyword: "sécurité des données", priority: 0, volume: 0 },
  { keyword: "24h/24", priority: 0, volume: 0 },
  { keyword: "casque usb", priority: 0, volume: 0 },
  { keyword: "ivr", priority: 0, volume: 0 },
  { keyword: "mttr", priority: 0, volume: 0 },
  { keyword: "équipe française", priority: 0, volume: 0 },
  { keyword: "chiffrement", priority: 0, volume: 0 },
  { keyword: "prise de contact", priority: 0, volume: 0 },
  { keyword: "flexibilité", priority: 0, volume: 0 },
  { keyword: "continuité", priority: 0, volume: 0 },
  { keyword: "marque blanche", priority: 0, volume: 0 },
  { keyword: "tpe/pme", priority: 0, volume: 0 },
  { keyword: "traçabilité", priority: 0, volume: 0 },
  { keyword: "parcours client", priority: 0, volume: 0 },
  { keyword: "paramédical", priority: 0, volume: 0 },
  { keyword: "satisfaction client", priority: 0, volume: 0 },
  { keyword: "amélioration continue", priority: 0, volume: 0 },
  { keyword: "upsell", priority: 0, volume: 0 },
  { keyword: "assurance/banque", priority: 0, volume: 0 },
  { keyword: "devis gratuit", priority: 0, volume: 0 },
  { keyword: "suivi commande", priority: 0, volume: 0 },
  { keyword: "scalabilité", priority: 0, volume: 0 },
  { keyword: "acd", priority: 0, volume: 0 },
  { keyword: "médical", priority: 0, volume: 0 },
  { keyword: "conformité", priority: 0, volume: 0 },
  { keyword: "connexion internet", priority: 0, volume: 0 },
  { keyword: "transport/logistique", priority: 0, volume: 0 },
  { keyword: "sop", priority: 0, volume: 0 },
  { keyword: "cti", priority: 0, volume: 0 },
  { keyword: "écoute active", priority: 0, volume: 0 },
  { keyword: "confidentialité", priority: 0, volume: 0 },
  { keyword: "qa", priority: 0, volume: 0 },
  { keyword: "professionnalisme", priority: 0, volume: 0 },
  { keyword: "disponibilité", priority: 0, volume: 0 },
  { keyword: "formation continue", priority: 0, volume: 0 },
  { keyword: "ponctualité", priority: 0, volume: 0 },
  { keyword: "audit", priority: 0, volume: 0 },
  { keyword: "analytics", priority: 0, volume: 0 },
  { keyword: "tableau de bord", priority: 0, volume: 0 },
  { keyword: "reporting", priority: 0, volume: 0 },
  { keyword: "artisans", priority: 0, volume: 0 },
  { keyword: "tourisme", priority: 0, volume: 0 },
  { keyword: "sécurité", priority: 0, volume: 0 },
  { keyword: "réseaux sociaux", priority: 0, volume: 0 },
  { keyword: "btp", priority: 0, volume: 0 },
  { keyword: "industrie", priority: 0, volume: 0 },
  { keyword: "essai", priority: 0, volume: 0 },
  { keyword: "erp", priority: 0, volume: 0 },
  { keyword: "santé", priority: 0, volume: 0 },
  { keyword: "empathie", priority: 0, volume: 0 },
  { keyword: "rgpd", priority: 0, volume: 0 },
  { keyword: "immobilier", priority: 0, volume: 0 },
  { keyword: "orléans", priority: 0, volume: 0 },
  { keyword: "rouen", priority: 0, volume: 0 },
  { keyword: "tours", priority: 0, volume: 0 },
  { keyword: "lille", priority: 0, volume: 0 },
  { keyword: "nice", priority: 0, volume: 0 },
  { keyword: "montpellier", priority: 0, volume: 0 },
  { keyword: "bordeaux", priority: 0, volume: 0 },
  { keyword: "grenoble", priority: 0, volume: 0 },
  { keyword: "lyon", priority: 0, volume: 0 },
  { keyword: "rennes", priority: 0, volume: 0 },
  { keyword: "toulouse", priority: 0, volume: 0 },
  { keyword: "strasbourg", priority: 0, volume: 0 },
  { keyword: "marseille", priority: 0, volume: 0 },
  { keyword: "paris", priority: 0, volume: 0 }
];

// Créer un mapping mot-clé -> priorité (normalisé)
const priorityMap = {};
priorityKeywords.forEach(pk => {
  const normalized = pk.keyword.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  priorityMap[normalized] = { priority: pk.priority, volume: pk.volume };
});

// ========================================
// RÉCUPÉRATION DES DONNÉES DE L'ONGLET "ÉVOLUTION"
// ========================================

// Les données viennent du nœud configuré pour l'onglet "évolution"
// N8N peut retourner les données dans différents formats
const allInputs = $input.all();

// Vérifier si on reçoit seulement des métadonnées (problème de configuration)
const hasOnlyMetadata = allInputs.length === 1 && 
  allInputs[0]?.json?.success !== undefined && 
  allInputs[0]?.json?.rowsUpdated !== undefined;

if (hasOnlyMetadata) {
  const metadata = allInputs[0].json;
  return [{
    json: {
      error: "Configuration incorrecte du nœud",
      markdown: `# ❌ Erreur de Configuration\n\nLe nœud retourne des métadonnées au lieu des données.\n\n**Métadonnées reçues:**\n\`\`\`json\n${JSON.stringify(metadata, null, 2)}\n\`\`\`\n\n**Solution:** Voir \`seo/CORRECTION_GET_ROWS_SHEET_N8N.md\``,
      metadata: metadata
    }
  }];
}

// ========================================
// DÉTECTION DU FORMAT DES DONNÉES
// ========================================

// Format 1 : Tableau updateData (format actuel)
// Structure : { updateData: [{ row, keyword, position, date }, ...] }
let updateDataArray = [];

// Chercher updateData dans les inputs
allInputs.forEach(item => {
  const json = item.json || {};
  if (json.updateData && Array.isArray(json.updateData)) {
    updateDataArray = updateDataArray.concat(json.updateData);
  } else if (Array.isArray(json)) {
    // Peut-être que les données sont directement dans un tableau
    updateDataArray = updateDataArray.concat(json);
  }
});

// Si on a trouvé updateData, utiliser ce format
if (updateDataArray.length > 0) {
  // Grouper les données par mot-clé et date
  const dataByKeyword = {};
  
  updateDataArray.forEach(item => {
    const keyword = item.keyword || item['Mot-clé'] || item['Mot-cle'] || '';
    const date = item.date || '';
    const position = item.position;
    const priority = item.priority || item['Priorité'] || item.Priorité || 0;
    
    if (!keyword) return;
    
    if (!dataByKeyword[keyword]) {
      dataByKeyword[keyword] = {
        keyword: keyword,
        priority: priority,
        positionsByDate: {}
      };
    }
    
    if (date && position !== undefined && position !== null && position !== 'N/A') {
      dataByKeyword[keyword].positionsByDate[date] = position;
    }
  });
  
  // Convertir en format attendu par le reste du code
  const dateColumns = [];
  const allDates = new Set();
  
  Object.values(dataByKeyword).forEach(kw => {
    Object.keys(kw.positionsByDate).forEach(date => allDates.add(date));
  });
  
  dateColumns.push(...Array.from(allDates).sort());
  
  // Prendre les 4 dernières semaines
  const last4Weeks = dateColumns.slice(-4);
  
  // Convertir en format de lignes (comme si c'était des lignes du sheet)
  const allRows = Object.values(dataByKeyword).map(kw => {
    const row = {
      'Mot-clé': kw.keyword,
      'Priorité': kw.priority
    };
    
    // Ajouter les positions par date
    last4Weeks.forEach(date => {
      row[date] = kw.positionsByDate[date] || null;
    });
    
    return row;
  });
  
  // Continuer avec le traitement normal
  const firstRow = allRows[0] || {};
  
  if (allRows.length === 0) {
    return [{
      json: {
        error: "Aucune donnée trouvée",
        markdown: `# ❌ Erreur\n\nAucune donnée trouvée après traitement du format updateData.\n\n**Debug:** ${updateDataArray.length} items dans updateData`,
        debug: `updateData items: ${updateDataArray.length}`
      }
    }];
  }
  
  // Utiliser allRows et last4Weeks qui ont été créés ci-dessus
  // On va sauter directement au traitement des mots-clés
  
} else {
  // Format 2 : Format standard (lignes avec colonnes de dates)
  // Code existant pour gérer ce format
  let evolutionData = [];
  
  if (allInputs && allInputs.length > 0) {
    evolutionData = allInputs.filter(item => {
      const json = item.json || {};
      if (json.success !== undefined && json.column !== undefined && json.rowsUpdated !== undefined) {
        return false;
      }
      return json['Mot-clé'] !== undefined || 
             json['Mot-cle'] !== undefined || 
             json.keyword !== undefined ||
             json['Priorité'] !== undefined ||
             json.Priorité !== undefined ||
             Object.keys(json).some(key => /^\d{4}-\d{2}-\d{2}$/.test(key));
    });
  }
  
  if (evolutionData.length === 0 && allInputs.length > 0) {
    const firstItem = allInputs.find(item => {
      const json = item.json || {};
      return json['Mot-clé'] || json.keyword || json['Priorité'];
    });
    
    if (firstItem) {
      evolutionData = allInputs;
    } else {
      evolutionData = allInputs.filter(item => {
        const json = item.json || {};
        return !(json.success !== undefined && json.column !== undefined);
      });
    }
  }
  
  // Continuer avec le code existant...
  // (le reste du code reste inchangé pour ce format)
}

// ========================================
// FONCTIONS UTILITAIRES
// ========================================

// Fonction pour normaliser les mots-clés
function normalize(str) {
  if (!str) return '';
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

// Fonction pour convertir une position en nombre (gère virgule et point)
function parsePosition(pos) {
  if (!pos || pos === 'N/A' || pos === '' || pos === null || pos === undefined) return null;
  
  // Convertir virgule en point
  const normalized = String(pos).replace(',', '.');
  const num = parseFloat(normalized);
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
    trend: change < -1 ? '📈 Amélioration' : change > 1 ? '📉 Régression' : '➡️ Stable',
    firstPosition: first,
    lastPosition: last,
    positionsCount: validPositions.length
  };
}

// Fonction pour déterminer l'urgence selon la tendance et la priorité
function getUrgencyFromTrend(trend, priority, currentPosition) {
  if (!trend) return 'low';
  
  // Régression importante = urgence critique
  if (trend.change > 10 && priority === 2) return 'critical';
  if (trend.change > 5 && priority === 2) return 'high';
  if (trend.change > 2 && priority === 2) return 'medium';
  
  // Amélioration = urgence faible (maintenir)
  if (trend.change < -3) return 'low';
  
  // Régression modérée = urgence moyenne
  if (trend.change > 2) return 'medium';
  
  return 'low';
}

// Fonction pour déterminer l'action SEO en fonction de la priorité, position ET évolution
function getSEOAction(priority, position, trend) {
  let positionNum = parseFloat(position) || 101;
  if (positionNum > 100) positionNum = 101;
  
  // Si régression importante
  if (trend && trend.change > 5 && priority === 2) {
    return {
      action: "🚨 URGENT : Corriger régression",
      urgency: "critical",
      category: "corriger-regression"
    };
  }
  
  // Si régression modérée
  if (trend && trend.change > 2 && priority === 2) {
    return {
      action: "⚠️ Analyser et optimiser",
      urgency: "high",
      category: "analyser-regression"
    };
  }
  
  // Si amélioration
  if (trend && trend.change < -1) {
    return {
      action: "✅ Maintenir (amélioration)",
      urgency: "low",
      category: "maintenir"
    };
  }
  
  // Logique classique selon position
  if (priority === 2 && positionNum <= 3) {
    return {
      action: "✅ Maintenir",
      urgency: "low",
      category: "maintenir"
    };
  }
  
  if (priority === 2 && positionNum > 3) {
    if (positionNum <= 10) {
      return {
        action: "🚀 Pousser vers TOP 3",
        urgency: "high",
        category: "optimiser-top3"
      };
    } else if (positionNum <= 20) {
      return {
        action: "⚡ Optimiser pour Top 10",
        urgency: "high",
        category: "optimiser-top10"
      };
    } else {
      return {
        action: "🔧 Créer/Optimiser contenu",
        urgency: "critical",
        category: "creer-contenu"
      };
    }
  }
  
  if (priority === 1) {
    if (positionNum <= 3) {
      return {
        action: "✅ Maintenir",
        urgency: "low",
        category: "maintenir"
      };
    } else if (positionNum <= 20) {
      return {
        action: "📈 Optimiser si opportunité",
        urgency: "medium",
        category: "optimiser-opportunite"
      };
    } else {
      return {
        action: "💡 Optimiser à moyen terme",
        urgency: "low",
        category: "optimiser-moyen-terme"
      };
    }
  }
  
  return {
    action: "⏸️ Non prioritaire",
    urgency: "none",
    category: "non-prioritaire"
  };
}

// Fonction pour obtenir le statut visuel
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

// Extraire les colonnes de dates dynamiquement
const allRows = evolutionData.map(item => {
  // Gérer différents formats de données
  if (typeof item === 'object' && item.json) {
    return item.json;
  }
  return item;
}).filter(row => {
  // Filtrer les métadonnées et garder uniquement les vraies données
  if (!row || typeof row !== 'object') return false;
  
  // Ignorer les objets qui sont clairement des métadonnées
  if (row.success !== undefined && row.column !== undefined && row.rowsUpdated !== undefined) {
    return false;
  }
  
  // Garder les objets qui ont au moins une des colonnes attendues
  return row['Mot-clé'] !== undefined || 
         row['Mot-cle'] !== undefined || 
         row.keyword !== undefined ||
         row['Priorité'] !== undefined ||
         row.Priorité !== undefined ||
         row.priority !== undefined ||
         Object.keys(row).some(key => /^\d{4}-\d{2}-\d{2}$/.test(key));
});

if (allRows.length === 0) {
  // Debug : afficher ce qui a été reçu
  const sampleItems = allInputs.slice(0, 3).map(item => {
    return item.json || item;
  });
  
  const debugInfo = `Items reçus: ${allInputs.length}\n` +
    `Items filtrés: ${evolutionData.length}\n` +
    `Exemples d'items:\n${JSON.stringify(sampleItems, null, 2)}`;
  
  return [{
    json: {
      error: "Aucune donnée trouvée dans l'onglet 'évolution'",
      markdown: `# ❌ Erreur\n\nAucune donnée trouvée dans l'onglet 'évolution' du Google Sheet.\n\n**Debug Info:**\n\`\`\`json\n${debugInfo}\n\`\`\``,
      debug: debugInfo
    }
  }];
}

const firstRow = allRows[0] || {};

// Debug : Afficher toutes les clés disponibles pour diagnostic
const allKeys = Object.keys(firstRow);
const debugInfo = `Clés disponibles: ${allKeys.join(', ')}`;

// Identifier les colonnes de dates (format YYYY-MM-DD)
// N8N peut utiliser différents formats de noms de colonnes
const dateColumns = [];

// Méthode 1 : Chercher directement les dates en format YYYY-MM-DD
Object.keys(firstRow).forEach(key => {
  // Vérifier si la clé ressemble à une date (YYYY-MM-DD)
  if (/^\d{4}-\d{2}-\d{2}$/.test(key)) {
    dateColumns.push(key);
  }
});

// Méthode 2 : Si aucune date trouvée, chercher dans les valeurs (cas où N8N utilise des noms de colonnes comme "E", "F", "G")
if (dateColumns.length === 0) {
  // Chercher toutes les colonnes qui contiennent des dates en format YYYY-MM-DD dans leurs valeurs
  Object.keys(firstRow).forEach(key => {
    // Ignorer les colonnes connues (Priorité, Mot-clé)
    if (key.toLowerCase() === 'priorité' || key.toLowerCase() === 'priorite' || 
        key.toLowerCase() === 'mot-clé' || key.toLowerCase() === 'mot-cle' || 
        key.toLowerCase() === 'keyword' || key.toLowerCase() === 'priority') {
      return;
    }
    
    // Vérifier si la valeur de cette colonne ressemble à une date
    const value = String(firstRow[key] || '');
    if (/^\d{4}-\d{2}-\d{2}$/.test(value.trim())) {
      dateColumns.push(key);
    }
  });
}

// Méthode 3 : Si toujours rien, chercher par pattern dans les noms de colonnes
if (dateColumns.length === 0) {
  // Chercher des colonnes qui pourraient être des dates (format varié)
  Object.keys(firstRow).forEach(key => {
    // Ignorer les colonnes connues
    if (key.toLowerCase() === 'priorité' || key.toLowerCase() === 'priorite' || 
        key.toLowerCase() === 'mot-clé' || key.toLowerCase() === 'mot-cle' || 
        key.toLowerCase() === 'keyword' || key.toLowerCase() === 'priority') {
      return;
    }
    
    // Chercher des patterns de date dans le nom de la colonne
    if (/\d{4}[\s\-_]\d{2}[\s\-_]\d{2}/.test(key) || 
        /\d{4}\/\d{2}\/\d{2}/.test(key) ||
        /^\d{4}-\d{2}-\d{2}/.test(key)) {
      dateColumns.push(key);
    }
  });
}

// Méthode 4 : Si toujours rien, utiliser toutes les colonnes sauf Priorité et Mot-clé
// et supposer qu'elles sont dans l'ordre chronologique
if (dateColumns.length === 0) {
  Object.keys(firstRow).forEach(key => {
    // Ignorer les colonnes connues
    if (key.toLowerCase() === 'priorité' || key.toLowerCase() === 'priorite' || 
        key.toLowerCase() === 'mot-clé' || key.toLowerCase() === 'mot-cle' || 
        key.toLowerCase() === 'keyword' || key.toLowerCase() === 'priority' ||
        key === 'A' || key === 'B' || key === 'C' || key === 'D') {
      return;
    }
    
    // Ajouter toutes les autres colonnes (probablement les dates)
    dateColumns.push(key);
  });
}

// Trier les dates chronologiquement (si ce sont des dates)
dateColumns.sort((a, b) => {
  // Essayer de parser comme date
  const dateA = a.match(/^\d{4}-\d{2}-\d{2}/);
  const dateB = b.match(/^\d{4}-\d{2}-\d{2}/);
  
  if (dateA && dateB) {
    return dateA[0].localeCompare(dateB[0]);
  }
  
  // Sinon, tri alphabétique
  return a.localeCompare(b);
});

// Prendre les 4 dernières semaines (4 dernières dates)
const last4Weeks = dateColumns.slice(-4);

if (last4Weeks.length === 0) {
  return [{
    json: {
      error: "Aucune colonne de date trouvée",
      markdown: `# ❌ Erreur\n\nAucune colonne de date (format YYYY-MM-DD) trouvée dans l'onglet 'évolution'.\n\n**Debug Info:**\n${debugInfo}\n\n**Première ligne reçue:**\n\`\`\`json\n${JSON.stringify(firstRow, null, 2)}\n\`\`\``
    }
  }];
}

// Traiter chaque mot-clé
const keywordsWithEvolution = allRows.map(row => {
  // Gérer différents formats de noms de colonnes pour "Mot-clé"
  const keyword = row['Mot-clé'] || row['Mot-cle'] || row['Mot-clé'] || 
                  row.keyword || row['Keyword'] || row['B'] || '';
  
  // Gérer différents formats de noms de colonnes pour "Priorité"
  const priorityFromSheet = parseInt(
    row['Priorité'] || row['Priorite'] || row.Priorité || 
    row.priority || row['Priority'] || row['A'] || 0
  );
  
  // Récupérer la priorité depuis le map (si disponible)
  const normalizedKeyword = normalize(keyword);
  const priorityData = priorityMap[normalizedKeyword] || { priority: priorityFromSheet, volume: 0 };
  const priority = priorityData.priority || priorityFromSheet;
  const volume = priorityData.volume || 0;
  
  // Extraire les positions pour les 4 dernières semaines
  const positions = last4Weeks.map(date => {
    // Essayer plusieurs formats de clés
    return parsePosition(row[date] || row[date.toLowerCase()] || row[date.toUpperCase()]);
  });
  
  // Calculer la tendance
  const trend = calculateTrend(positions);
  
  // Position actuelle (dernière position valide)
  const currentPosition = positions.filter(p => p !== null).pop() || null;
  
  // Déterminer l'urgence
  const urgency = getUrgencyFromTrend(trend, priority, currentPosition);
  
  // Déterminer l'action SEO
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

// Filtrer les mots-clés avec des données valides
const validKeywords = keywordsWithEvolution.filter(k => k.currentPosition !== null && k.keyword);

// Trier par urgence puis par priorité
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

// Séparer par priorité
const priority2 = validKeywords.filter(k => k.priority === 2);
const priority1 = validKeywords.filter(k => k.priority === 1);
const priority0 = validKeywords.filter(k => k.priority === 0);

// Grouper par catégorie
const byCategory = {
  "corriger-regression": validKeywords.filter(k => k.category === "corriger-regression"),
  "analyser-regression": validKeywords.filter(k => k.category === "analyser-regression"),
  "optimiser-top3": validKeywords.filter(k => k.category === "optimiser-top3"),
  "optimiser-top10": validKeywords.filter(k => k.category === "optimiser-top10"),
  "creer-contenu": validKeywords.filter(k => k.category === "creer-contenu"),
  "optimiser-opportunite": validKeywords.filter(k => k.category === "optimiser-opportunite"),
  "optimiser-moyen-terme": validKeywords.filter(k => k.category === "optimiser-moyen-terme"),
  "maintenir": validKeywords.filter(k => k.category === "maintenir"),
  "non-prioritaire": validKeywords.filter(k => k.category === "non-prioritaire")
};

// Statistiques
const improvements = validKeywords.filter(k => k.trend && k.trend.change < -1);
const regressions = validKeywords.filter(k => k.trend && k.trend.change > 1);
const stable = validKeywords.filter(k => k.trend && k.trend.change >= -1 && k.trend.change <= 1);

const criticalRegressions = validKeywords.filter(k => 
  k.priority === 2 && k.trend && k.trend.change > 5
);

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
    const positionsStr = k.positions.map((p, i) => 
      p !== null ? `${p.toFixed(1)}` : 'N/A'
    ).join(' → ');
    
    markdown += `| ${k.keyword} | ${k.priorityLabel} | ${k.currentPosition.toFixed(1)} | ${k.trend.change > 0 ? '+' : ''}${k.trend.change.toFixed(1)} (${k.trend.percentChange}%) | ${k.trend.trend} | ${k.seoAction} |\n`;
  });
  
  markdown += `\n---\n\n`;
} else {
  markdown += `✅ Aucune régression critique détectée.\n\n---\n\n`;
}

// Régressions modérées
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

// Améliorations
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

// Priorité 2 mal positionnés (pas en TOP 3)
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

// Positions 4-10 (Priorité 2) - Pousser vers TOP 3
if (byCategory["optimiser-top3"].length > 0) {
  markdown += `## 🚀 Priorité 2 - Pousser vers TOP 3 (Positions 4-10)\n\n`;
  markdown += `**${byCategory["optimiser-top3"].length} mots-clés prioritaires** proches du TOP 3 :\n\n`;
  markdown += `| Mot-clé | Position | Volume | Évolution | 📊 Statut |\n`;
  markdown += `|---------|----------|--------|-----------|-----------|\n`;
  
  byCategory["optimiser-top3"].forEach(m => {
    const evolutionStr = m.trend 
      ? `${m.trend.change > 0 ? '+' : ''}${m.trend.change.toFixed(1)} (${m.trend.percentChange}%)`
      : 'N/A';
    markdown += `| ${m.keyword} | ${m.currentPosition.toFixed(1)} | ${m.volume} | ${evolutionStr} | ${m.status} |\n`;
  });
  
  markdown += `\n---\n\n`;
}

// Positions 11-20 (Priorité 2) - Optimiser pour Top 10
if (byCategory["optimiser-top10"].length > 0) {
  markdown += `## ⚡ Priorité 2 - Optimiser pour Top 10 (Positions 11-20)\n\n`;
  markdown += `**${byCategory["optimiser-top10"].length} mots-clés prioritaires** proches du Top 10 :\n\n`;
  markdown += `| Mot-clé | Position | Volume | Évolution | 📊 Statut |\n`;
  markdown += `|---------|----------|--------|-----------|-----------|\n`;
  
  byCategory["optimiser-top10"].forEach(m => {
    const evolutionStr = m.trend 
      ? `${m.trend.change > 0 ? '+' : ''}${m.trend.change.toFixed(1)} (${m.trend.percentChange}%)`
      : 'N/A';
    markdown += `| ${m.keyword} | ${m.currentPosition.toFixed(1)} | ${m.volume} | ${evolutionStr} | ${m.status} |\n`;
  });
  
  markdown += `\n---\n\n`;
}

// Positions > 20 (Priorité 2) - Créer/Optimiser contenu
if (byCategory["creer-contenu"].length > 0) {
  markdown += `## 🔧 Priorité 2 - Créer/Optimiser Contenu (Position > 20)\n\n`;
  markdown += `**${byCategory["creer-contenu"].length} mots-clés prioritaires** nécessitant une création/optimisation de contenu :\n\n`;
  markdown += `| Mot-clé | Position | Volume | Évolution | 📊 Statut |\n`;
  markdown += `|---------|----------|--------|-----------|-----------|\n`;
  
  byCategory["creer-contenu"].forEach(m => {
    const evolutionStr = m.trend 
      ? `${m.trend.change > 0 ? '+' : ''}${m.trend.change.toFixed(1)} (${m.trend.percentChange}%)`
      : 'N/A';
    markdown += `| ${m.keyword} | ${m.currentPosition.toFixed(1)} | ${m.volume} | ${evolutionStr} | ${m.status} |\n`;
  });
  
  markdown += `\n---\n\n`;
}

// Priorité 2 en TOP 3 - Maintenir
const priority2Top3 = priority2.filter(k => k.currentPosition <= 3);
if (priority2Top3.length > 0) {
  markdown += `## ✅ Priorité 2 - À Maintenir (TOP 3)\n\n`;
  markdown += `**${priority2Top3.length} mots-clés prioritaires** déjà bien positionnés (TOP 3) :\n\n`;
  markdown += `| Mot-clé | Position | Volume | Évolution | 📊 Statut |\n`;
  markdown += `|---------|----------|--------|-----------|-----------|\n`;
  
  priority2Top3.forEach(m => {
    const evolutionStr = m.trend 
      ? `${m.trend.change > 0 ? '+' : ''}${m.trend.change.toFixed(1)} (${m.trend.percentChange}%)`
      : 'N/A';
    markdown += `| ${m.keyword} | ${m.currentPosition.toFixed(1)} | ${m.volume} | ${evolutionStr} | ${m.status} |\n`;
  });
  
  markdown += `\n---\n\n`;
}

// Détails par mot-clé (tous)
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

markdown += `\n---\n\n`;

// Statistiques
markdown += `## 📊 Statistiques par Priorité\n\n`;
markdown += `### 🔴 Priorité 2 (Prioritaire)\n`;
markdown += `- **Total** : ${priority2Stats.total} mots-clés\n`;
markdown += `- **TOP 3** : ${priority2Stats.top3} (${priority2Stats.total > 0 ? ((priority2Stats.top3/priority2Stats.total)*100).toFixed(1) : 0}%) ✅\n`;
markdown += `- **TOP 10** : ${priority2Stats.top10} (${priority2Stats.total > 0 ? ((priority2Stats.top10/priority2Stats.total)*100).toFixed(1) : 0}%)\n`;
markdown += `- **TOP 20** : ${priority2Stats.top20} (${priority2Stats.total > 0 ? ((priority2Stats.top20/priority2Stats.total)*100).toFixed(1) : 0}%)\n`;
markdown += `- **Non classés** : ${priority2Stats.notRanked} (${priority2Stats.total > 0 ? ((priority2Stats.notRanked/priority2Stats.total)*100).toFixed(1) : 0}%)\n`;
markdown += `- **🚨 À optimiser** : ${priority2Stats.toOptimize} (${priority2Stats.total > 0 ? ((priority2Stats.toOptimize/priority2Stats.total)*100).toFixed(1) : 0}%)\n\n`;
markdown += `### 🟡 Priorité 1 (Moyennement Prioritaire)\n`;
markdown += `- **Total** : ${priority1.length} mots-clés\n\n`;
markdown += `### ⚪ Priorité 0 (Non Prioritaire)\n`;
markdown += `- **Total** : ${priority0.length} mots-clés\n\n`;

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

if (priority2Stats.toOptimize > 0) {
  markdown += `### 🔧 Optimisations Prioritaires\n`;
  markdown += `- Optimiser les **${priority2Stats.toOptimize} mots-clés prioritaires** non dans le TOP 3\n`;
  if (byCategory["creer-contenu"].length > 0) {
    markdown += `- Créer du contenu pour **${byCategory["creer-contenu"].length} mots-clés prioritaires** non classés\n`;
  }
  markdown += `\n`;
}

markdown += `---\n\n`;
markdown += `## 📝 Notes\n\n`;
markdown += `- Les positions sont calculées à partir des données de l'onglet "évolution"\n`;
markdown += `- La variation est calculée entre la première et la dernière des 4 dernières semaines\n`;
markdown += `- Les mots-clés avec "N/A" n'ont pas de données pour certaines dates\n`;
markdown += `- Priorité 2 = Prioritaire, Priorité 1 = Moyennement prioritaire\n`;
markdown += `- 📈 Amélioration = Position diminue (mieux classé)\n`;
markdown += `- 📉 Régression = Position augmente (moins bien classé)\n`;

// Retourner le résultat
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

