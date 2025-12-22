// Calendrier éditorial et suivi des articles
// Ce script gère la planification et le suivi des publications

const blogCalendar = {
    // Articles déjà créés
    publishedArticles: [
        {
            title: "Guide Complet du Homeshoring Recrutement",
            slug: "guide-homeshoring-recrutement",
            publishedDate: "2024-12-19",
            status: "published",
            category: "Guide Complet",
            readTime: "8 min",
            views: 1234
        },
        {
            title: "Permanence Téléphonique à Distance : 7 Avantages",
            slug: "permanence-telephonique-distance",
            publishedDate: "2024-12-18",
            status: "published",
            category: "Conseils",
            readTime: "5 min",
            views: 1892
        },
        {
            title: "Secrétariat Téléphonique : Comment Choisir",
            slug: "secretariat-telephonique-guide",
            publishedDate: "2024-12-17",
            status: "published",
            category: "Expertise",
            readTime: "6 min",
            views: 1456
        }
    ],

    // Articles en attente de publication
    scheduledArticles: [
        {
            title: "Prospection Téléphonique Efficace : 10 Techniques",
            slug: "prospection-telephonique-efficace",
            scheduledDate: "2024-12-24",
            status: "scheduled",
            category: "Stratégie",
            readTime: "7 min",
            priority: "high"
        },
        {
            title: "Devenir Téléconseiller Indépendant : Guide Complet",
            slug: "devenir-teleconseiller-independant",
            scheduledDate: "2024-12-31",
            status: "scheduled",
            category: "Carrières",
            readTime: "9 min",
            priority: "high"
        },
        {
            title: "Gestion d'Appels Téléphoniques : Outils et Pratiques",
            slug: "gestion-appels-telephoniques",
            scheduledDate: "2025-01-07",
            status: "scheduled",
            category: "Technique",
            readTime: "6 min",
            priority: "medium"
        },
        {
            title: "Accueil Téléphonique Professionnel : 5 Règles d'Or",
            slug: "accueil-telephonique-professionnel",
            scheduledDate: "2025-01-14",
            status: "scheduled",
            category: "Service Client",
            readTime: "4 min",
            priority: "medium"
        },
        {
            title: "Externaliser Service Client : Guide Complet pour les PME",
            slug: "externaliser-service-client-guide",
            scheduledDate: "2025-01-21",
            status: "scheduled",
            category: "Guide Complet",
            readTime: "8 min",
            priority: "high"
        },
        {
            title: "Call Center Recrutement : Comment Trouver les Meilleurs Téléconseillers",
            slug: "call-center-recrutement",
            scheduledDate: "2025-01-28",
            status: "scheduled",
            category: "RH",
            readTime: "6 min",
            priority: "medium"
        },
        {
            title: "Trouver des Clients pour Centre d'Appel : 10 Stratégies",
            slug: "trouver-clients-centre-appel",
            scheduledDate: "2025-02-04",
            status: "scheduled",
            category: "Business",
            readTime: "7 min",
            priority: "high"
        },
        {
            title: "Centre d'Appel Télétravail : L'Avenir du Service Client",
            slug: "centre-appel-teletravail-avenir",
            scheduledDate: "2025-02-11",
            status: "scheduled",
            category: "Innovation",
            readTime: "5 min",
            priority: "medium"
        }
    ],

    // Articles à créer (idées futures)
    futureIdeas: [
        {
            title: "Comment Optimiser la Qualité d'Appel en Télétravail",
            category: "Qualité",
            keywords: ["qualité d'appel", "télétravail", "formation téléconseiller"],
            priority: "medium",
            estimatedReadTime: "6 min"
        },
        {
            title: "Les 10 Erreurs à Éviter en Centre d'Appel",
            category: "Conseils",
            keywords: ["erreurs centre d'appel", "bonnes pratiques", "éviter erreurs"],
            priority: "high",
            estimatedReadTime: "5 min"
        },
        {
            title: "Comment Mesurer la Performance d'un Centre d'Appel",
            category: "Analytics",
            keywords: ["KPI centre d'appel", "performance", "métriques", "indicateurs"],
            priority: "high",
            estimatedReadTime: "7 min"
        },
        {
            title: "Télétravail vs Bureau : Avantages et Inconvénients",
            category: "Comparaison",
            keywords: ["télétravail vs bureau", "comparaison", "avantages inconvénients"],
            priority: "medium",
            estimatedReadTime: "6 min"
        },
        {
            title: "Comment Former ses Téléconseillers à Distance",
            category: "Formation",
            keywords: ["formation téléconseiller", "formation à distance", "e-learning"],
            priority: "high",
            estimatedReadTime: "8 min"
        }
    ],

    // Configuration de publication
    publishingConfig: {
        frequency: "weekly", // weekly, bi-weekly, monthly
        dayOfWeek: "tuesday", // monday, tuesday, wednesday, etc.
        time: "09:00",
        timezone: "Europe/Paris"
    },

    // Fonctions utilitaires
    getNextPublishingDate: function() {
        const today = new Date();
        const nextTuesday = new Date(today);
        
        // Trouver le prochain mardi
        const daysUntilTuesday = (2 - today.getDay() + 7) % 7;
        if (daysUntilTuesday === 0 && today.getHours() >= 9) {
            nextTuesday.setDate(today.getDate() + 7);
        } else {
            nextTuesday.setDate(today.getDate() + daysUntilTuesday);
        }
        
        nextTuesday.setHours(9, 0, 0, 0);
        return nextTuesday;
    },

    getArticlesCount: function() {
        return {
            published: this.publishedArticles.length,
            scheduled: this.scheduledArticles.length,
            future: this.futureIdeas.length,
            total: this.publishedArticles.length + this.scheduledArticles.length + this.futureIdeas.length
        };
    },

    getNextArticle: function() {
        return this.scheduledArticles.find(article => article.status === "scheduled") || null;
    },

    getArticlesByCategory: function(category) {
        const allArticles = [...this.publishedArticles, ...this.scheduledArticles];
        return allArticles.filter(article => article.category === category);
    },

    getHighPriorityArticles: function() {
        return this.scheduledArticles.filter(article => article.priority === "high");
    },

    getArticlesNeedingContent: function() {
        return this.scheduledArticles.filter(article => article.status === "scheduled" && !article.content);
    },

    // Calendrier des 3 prochains mois
    getNext3MonthsCalendar: function() {
        const calendar = [];
        const today = new Date();
        
        for (let month = 0; month < 3; month++) {
            const currentMonth = new Date(today.getFullYear(), today.getMonth() + month, 1);
            const monthName = currentMonth.toLocaleString('fr-FR', { month: 'long', year: 'numeric' });
            
            const monthArticles = this.scheduledArticles.filter(article => {
                const articleDate = new Date(article.scheduledDate);
                return articleDate.getMonth() === currentMonth.getMonth() && 
                       articleDate.getFullYear() === currentMonth.getFullYear();
            });
            
            calendar.push({
                month: monthName,
                articles: monthArticles
            });
        }
        
        return calendar;
    },

    // Alertes et notifications
    getAlerts: function() {
        const alerts = [];
        const today = new Date();
        
        // Vérifier les articles en retard
        const overdueArticles = this.scheduledArticles.filter(article => {
            const articleDate = new Date(article.scheduledDate);
            return articleDate < today && article.status === "scheduled";
        });
        
        if (overdueArticles.length > 0) {
            alerts.push({
                type: "warning",
                message: `${overdueArticles.length} article(s) en retard de publication`,
                articles: overdueArticles
            });
        }
        
        // Vérifier les articles à publier cette semaine
        const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
        const thisWeekArticles = this.scheduledArticles.filter(article => {
            const articleDate = new Date(article.scheduledDate);
            return articleDate >= today && articleDate <= nextWeek;
        });
        
        if (thisWeekArticles.length > 0) {
            alerts.push({
                type: "info",
                message: `${thisWeekArticles.length} article(s) à publier cette semaine`,
                articles: thisWeekArticles
            });
        }
        
        // Vérifier le stock d'articles
        const stockArticles = this.scheduledArticles.filter(article => article.status === "scheduled").length;
        if (stockArticles < 4) {
            alerts.push({
                type: "warning",
                message: `Stock d'articles faible (${stockArticles} articles restants)`,
                action: "Créer de nouveaux articles"
            });
        }
        
        return alerts;
    }
};

// Fonction pour afficher le tableau de bord
function displayBlogDashboard() {
    console.log("📊 TABLEAU DE BORD BLOG VOC-CALL");
    console.log("=====================================");
    
    const counts = blogCalendar.getArticlesCount();
    console.log(`📝 Articles publiés: ${counts.published}`);
    console.log(`📅 Articles programmés: ${counts.scheduled}`);
    console.log(`💡 Idées futures: ${counts.future}`);
    console.log(`📈 Total: ${counts.total}`);
    console.log("");
    
    const nextArticle = blogCalendar.getNextArticle();
    if (nextArticle) {
        console.log("🎯 PROCHAIN ARTICLE À PUBLIER:");
        console.log(`   Titre: ${nextArticle.title}`);
        console.log(`   Date: ${nextArticle.scheduledDate}`);
        console.log(`   Catégorie: ${nextArticle.category}`);
        console.log(`   Priorité: ${nextArticle.priority}`);
        console.log("");
    }
    
    const alerts = blogCalendar.getAlerts();
    if (alerts.length > 0) {
        console.log("⚠️  ALERTES:");
        alerts.forEach(alert => {
            console.log(`   ${alert.type.toUpperCase()}: ${alert.message}`);
        });
        console.log("");
    }
    
    console.log("📅 CALENDRIER 3 PROCHAINS MOIS:");
    const calendar = blogCalendar.getNext3MonthsCalendar();
    calendar.forEach(month => {
        console.log(`   ${month.month}: ${month.articles.length} article(s)`);
        month.articles.forEach(article => {
            console.log(`     - ${article.title} (${article.scheduledDate})`);
        });
    });
}

// Fonction pour générer un rapport HTML
function generateBlogReport() {
    const counts = blogCalendar.getArticlesCount();
    const nextArticle = blogCalendar.getNextArticle();
    const alerts = blogCalendar.getAlerts();
    const calendar = blogCalendar.getNext3MonthsCalendar();
    
    return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Tableau de Bord Blog - VOC-Call</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
            .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; }
            .header { background: linear-gradient(135deg, #0e4580 0%, #d03840 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
            .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }
            .stat-card { background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; }
            .stat-number { font-size: 2rem; font-weight: bold; color: #0e4580; }
            .alert { padding: 15px; margin: 10px 0; border-radius: 8px; }
            .alert.warning { background: #fff3cd; border-left: 4px solid #ffc107; }
            .alert.info { background: #d1ecf1; border-left: 4px solid #17a2b8; }
            .calendar { margin: 20px 0; }
            .month { background: #f8f9fa; padding: 15px; margin: 10px 0; border-radius: 8px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>📊 Tableau de Bord Blog VOC-Call</h1>
                <p>Gestion du contenu et planification éditoriale</p>
            </div>
            
            <div class="stats">
                <div class="stat-card">
                    <div class="stat-number">${counts.published}</div>
                    <div>Articles Publiés</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${counts.scheduled}</div>
                    <div>Articles Programmés</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${counts.future}</div>
                    <div>Idées Futures</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${counts.total}</div>
                    <div>Total Articles</div>
                </div>
            </div>
            
            ${alerts.length > 0 ? `
            <h3>⚠️ Alertes</h3>
            ${alerts.map(alert => `
                <div class="alert ${alert.type}">
                    <strong>${alert.type.toUpperCase()}:</strong> ${alert.message}
                </div>
            `).join('')}
            ` : ''}
            
            ${nextArticle ? `
            <h3>🎯 Prochain Article</h3>
            <div class="stat-card">
                <h4>${nextArticle.title}</h4>
                <p><strong>Date:</strong> ${nextArticle.scheduledDate}</p>
                <p><strong>Catégorie:</strong> ${nextArticle.category}</p>
                <p><strong>Priorité:</strong> ${nextArticle.priority}</p>
            </div>
            ` : ''}
            
            <h3>📅 Calendrier 3 Prochains Mois</h3>
            <div class="calendar">
                ${calendar.map(month => `
                    <div class="month">
                        <h4>${month.month}</h4>
                        <p>${month.articles.length} article(s) programmé(s)</p>
                        ${month.articles.map(article => `
                            <div style="margin: 5px 0; padding: 5px; background: white; border-radius: 4px;">
                                <strong>${article.title}</strong> - ${article.scheduledDate}
                            </div>
                        `).join('')}
                    </div>
                `).join('')}
            </div>
        </div>
    </body>
    </html>
    `;
}

// Exécuter le tableau de bord
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', displayBlogDashboard);
} else {
    displayBlogDashboard();
}

// Export pour utilisation dans Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { blogCalendar, displayBlogDashboard, generateBlogReport };
}
