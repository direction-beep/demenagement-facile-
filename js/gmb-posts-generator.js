// Générateur de posts Google My Business optimisés
// Ce script génère des posts GMB avec mots-clés et contenu optimisé

const gmbPosts = {
    // Posts sur les services
    servicePosts: [
        {
            title: "🎯 Homeshoring Recrutement - Solution Complète",
            content: `Découvrez notre expertise en homeshoring recrutement ! 

✅ Téléconseillers indépendants qualifiés
✅ Centre d'appel télétravail performant  
✅ Externaliser service client facilement
✅ Permanence téléphonique 24h/24

Notre équipe de téléconseillers à domicile vous accompagne dans votre projet d'externalisation.

📞 Devis gratuit : contact@voc-call.com
🌐 En savoir plus : voc-call.com

#homeshoring #centreappel #teletravail #serviceclient #externalisation`,
            category: "service",
            priority: "high"
        },
        {
            title: "📞 Permanence Téléphonique à Distance 24h/24",
            content: `Assurez une permanence téléphonique continue avec VOC-Call !

🕐 Service 24h/24 et 7j/7
👥 Téléconseillers indépendants qualifiés
📱 Centre d'appel à distance performant
🎯 Secrétariat téléphonique professionnel

Ne ratez plus aucun appel de vos clients. Notre équipe de téléconseillers à domicile assure une couverture complète.

📞 Contactez-nous : +33 1 XX XX XX XX
💻 Site web : voc-call.com

#permanencetelephonique #centreappel #serviceclient #teletravail`,
            category: "service",
            priority: "high"
        },
        {
            title: "📋 Secrétariat Téléphonique Professionnel",
            content: `Externalisez votre secrétariat téléphonique avec VOC-Call !

✅ Prise de rendez-vous
✅ Filtrage des appels
✅ Prise de messages
✅ Gestion administrative

Nos téléconseillers indépendants gèrent votre secrétariat téléphonique avec professionnalisme depuis leur domicile.

📧 Email : contact@voc-call.com
🌐 Découvrez nos services : voc-call.com/services

#secretariattelephonique #centreappel #teletravail #externalisation`,
            category: "service",
            priority: "medium"
        },
        {
            title: "🚀 Prospection Téléphonique Efficace",
            content: `Développez votre portefeuille client avec notre prospection téléphonique !

📈 Télémarketing professionnel
🎯 Prospection commerciale ciblée
📞 Call center prospection expert
💼 Développement commercial

Nos téléconseillers indépendants maîtrisent les techniques de prospection téléphonique pour développer votre activité.

📞 Devis personnalisé : contact@voc-call.com
📖 Guide complet : voc-call.com/blog

#prospectiontelephonique #telemarketing #callcenter #developpementcommercial`,
            category: "service",
            priority: "high"
        }
    ],

    // Posts d'articles de blog
    blogPosts: [
        {
            title: "📖 Nouveau Guide : Homeshoring Recrutement",
            content: `Découvrez notre guide complet du homeshoring recrutement !

🎯 Comment externaliser service client
👥 Recruter des téléconseillers indépendants
🏠 Organiser un centre d'appel télétravail
📊 Optimiser la permanence téléphonique

Guide pratique avec conseils d'experts et bonnes pratiques.

📖 Lire l'article : voc-call.com/blog/guide-homeshoring-recrutement
📞 Questions ? contact@voc-call.com

#homeshoring #guide #centreappel #teletravail #blog`,
            category: "blog",
            priority: "high"
        },
        {
            title: "💡 7 Avantages de la Permanence Téléphonique à Distance",
            content: `Découvrez pourquoi la permanence téléphonique à distance est l'avenir !

✅ Flexibilité géographique
💰 Réduction des coûts
🌍 Accès à un vivier de talents
⏰ Disponibilité 24h/24
📈 Scalabilité rapide
🎯 Qualité de vie des équipes
🔧 Technologies avancées

Notre article détaille chaque avantage avec exemples concrets.

📖 Lire l'article : voc-call.com/blog/permanence-telephonique-distance
📞 Devis gratuit : contact@voc-call.com

#permanencetelephonique #avantages #centreappel #teletravail`,
            category: "blog",
            priority: "medium"
        },
        {
            title: "🎯 10 Techniques de Prospection Téléphonique Efficace",
            content: `Améliorez vos résultats de prospection téléphonique !

📞 Techniques de télémarketing
🎯 Prospection commerciale ciblée
💼 Scripts de vente optimisés
📊 Mesure des performances

Guide pratique avec techniques avancées et conseils d'experts.

📖 Lire l'article : voc-call.com/blog/prospection-telephonique-efficace
📞 Formation : contact@voc-call.com

#prospectiontelephonique #techniques #telemarketing #formation`,
            category: "blog",
            priority: "high"
        }
    ],

    // Posts d'offres et promotions
    offerPosts: [
        {
            title: "🎁 Offre Spéciale : Devis Gratuit + Audit",
            content: `Profitez de notre offre spéciale pour votre centre d'appel !

🎁 Devis gratuit personnalisé
🔍 Audit de vos besoins
📊 Analyse de votre service client
💡 Recommandations d'optimisation

Offre valable jusqu'au 31 janvier 2025. Contactez-nous dès maintenant !

📞 Appel gratuit : +33 1 XX XX XX XX
📧 Email : contact@voc-call.com
🌐 Site : voc-call.com

#offrespeciale #devisgratuit #audit #centreappel`,
            category: "offer",
            priority: "high"
        },
        {
            title: "🚀 Nouveau : Formation Téléconseiller Indépendant",
            content: `Devenez téléconseiller indépendant avec VOC-Call !

🎓 Formation complète gratuite
💼 Équipement fourni
🏠 Travail à domicile
💰 Rémunération attractive

Rejoignez notre équipe de téléconseillers à domicile et développez votre activité.

📞 Candidature : careers@voc-call.com
🌐 En savoir plus : voc-call.com/careers

#emploi #teleconseiller #teletravail #formation #carrieres`,
            category: "offer",
            priority: "medium"
        }
    ],

    // Posts de témoignages
    testimonialPosts: [
        {
            title: "⭐ Témoignage Client : PME du Secteur IT",
            content: `"VOC-Call a transformé notre service client ! 

Grâce à leurs téléconseillers indépendants, nous avons pu externaliser service client efficacement. La permanence téléphonique 24h/24 nous a fait gagner de nouveaux clients.

Je recommande vivement !" - Directeur PME IT

🎯 Résultats obtenus :
✅ +40% de satisfaction client
✅ -60% de coûts opérationnels  
✅ Permanence téléphonique 24h/24

📞 Rejoignez nos clients satisfaits : contact@voc-call.com

#temoignage #client #satisfaction #centreappel`,
            category: "testimonial",
            priority: "high"
        },
        {
            title: "💼 Retour d'Expérience : E-commerce",
            content: `"Le homeshoring recrutement de VOC-Call est exceptionnel !

Nos téléconseillers à domicile gèrent parfaitement notre secrétariat téléphonique et notre prospection commerciale. Service professionnel et réactif." - CEO E-commerce

🏆 Bénéfices constatés :
✅ Secrétariat téléphonique optimisé
✅ Prospection commerciale efficace
✅ Équipe de téléconseillers motivés

📞 Découvrez nos solutions : voc-call.com

#temoignage #ecommerce #homeshoring #secretariat`,
            category: "testimonial",
            priority: "medium"
        }
    ],

    // Configuration de publication
    publishingSchedule: {
        frequency: "weekly", // 2 posts par semaine
        days: ["mardi", "vendredi"],
        times: ["09:00", "14:00"],
        timezone: "Europe/Paris"
    },

    // Fonctions utilitaires
    generatePost: function(type, index = 0) {
        const posts = this[type + 'Posts'];
        if (!posts || !posts[index]) return null;
        
        return {
            title: posts[index].title,
            content: posts[index].content,
            category: posts[index].category,
            priority: posts[index].priority,
            hashtags: this.extractHashtags(posts[index].content),
            keywords: this.extractKeywords(posts[index].content)
        };
    },

    extractHashtags: function(content) {
        const hashtagRegex = /#\w+/g;
        return content.match(hashtagRegex) || [];
    },

    extractKeywords: function(content) {
        const keywords = [
            'homeshoring recrutement', 'centre d\'appel télétravail', 'externaliser service client',
            'téléconseiller indépendant', 'permanence téléphonique', 'secrétariat téléphonique',
            'prospection téléphonique', 'télémarketing', 'call center', 'télétravail'
        ];
        
        return keywords.filter(keyword => 
            content.toLowerCase().includes(keyword.toLowerCase())
        );
    },

    generateWeeklySchedule: function() {
        const schedule = [];
        const today = new Date();
        
        for (let week = 0; week < 4; week++) {
            const weekStart = new Date(today.getTime() + (week * 7 * 24 * 60 * 60 * 1000));
            
            // Mardi
            const tuesday = new Date(weekStart);
            tuesday.setDate(weekStart.getDate() + (2 - weekStart.getDay() + 7) % 7);
            
            // Vendredi  
            const friday = new Date(weekStart);
            friday.setDate(weekStart.getDate() + (5 - weekStart.getDay() + 7) % 7);
            
            schedule.push({
                week: week + 1,
                tuesday: {
                    date: tuesday.toLocaleDateString('fr-FR'),
                    posts: [
                        this.generatePost('service', week % this.servicePosts.length),
                        this.generatePost('blog', week % this.blogPosts.length)
                    ]
                },
                friday: {
                    date: friday.toLocaleDateString('fr-FR'),
                    posts: [
                        this.generatePost('offer', week % this.offerPosts.length),
                        this.generatePost('testimonial', week % this.testimonialPosts.length)
                    ]
                }
            });
        }
        
        return schedule;
    },

    // Générer un post optimisé pour une ville spécifique
    generateLocalPost: function(city, service) {
        const templates = {
            'service': `🎯 Centre d'Appel ${city} - ${service}

Découvrez nos services de centre d'appel télétravail à ${city} !

✅ Téléconseillers indépendants ${city}
✅ Permanence téléphonique 24h/24
✅ Secrétariat téléphonique professionnel
✅ Prospection commerciale efficace

Nos téléconseillers à domicile à ${city} vous accompagnent dans votre projet d'externalisation.

📞 Devis gratuit : contact@voc-call.com
🌐 En savoir plus : voc-call.com

#centreappel${city} #homeshoring #teletravail #${city}`,
            
            'blog': `📖 Guide Centre d'Appel ${city}

Découvrez notre guide complet pour le centre d'appel télétravail à ${city} !

🎯 Homeshoring recrutement ${city}
👥 Téléconseillers indépendants ${city}
🏠 Organisation télétravail
📊 Optimisation service client

Guide pratique avec conseils spécifiques à ${city}.

📖 Lire l'article : voc-call.com/centre-appel-${city.toLowerCase()}
📞 Questions ? contact@voc-call.com

#centreappel${city} #guide #teletravail #${city}`,
            
            'testimonial': `⭐ Témoignage Client ${city}

"VOC-Call nous a permis d'externaliser service client efficacement à ${city} !

Grâce à leurs téléconseillers indépendants ${city}, nous avons optimisé notre permanence téléphonique et développé notre activité." - Client ${city}

🎯 Résultats obtenus :
✅ Service client optimisé
✅ Permanence téléphonique 24h/24
✅ Téléconseillers ${city} qualifiés

📞 Rejoignez nos clients ${city} : contact@voc-call.com

#temoignage${city} #client #satisfaction #${city}`
        };
        
        return templates[service] || templates['service'];
    }
};

// Fonction pour afficher le plan de publication
function displayPublishingPlan() {
    console.log("📅 PLAN DE PUBLICATION GMB VOC-CALL");
    console.log("=====================================");
    
    const schedule = gmbPosts.generateWeeklySchedule();
    
    schedule.forEach(week => {
        console.log(`\n📅 SEMAINE ${week.week}`);
        console.log(`Mardi ${week.tuesday.date}:`);
        week.tuesday.posts.forEach((post, index) => {
            if (post) {
                console.log(`  ${index + 1}. ${post.title}`);
                console.log(`     Priorité: ${post.priority}`);
                console.log(`     Mots-clés: ${post.keywords.join(', ')}`);
            }
        });
        
        console.log(`\nVendredi ${week.friday.date}:`);
        week.friday.posts.forEach((post, index) => {
            if (post) {
                console.log(`  ${index + 1}. ${post.title}`);
                console.log(`     Priorité: ${post.priority}`);
                console.log(`     Mots-clés: ${post.keywords.join(', ')}`);
            }
        });
    });
}

// Fonction pour générer un rapport HTML
function generateGMBReport() {
    const schedule = gmbPosts.generateWeeklySchedule();
    
    return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Plan de Publication GMB - VOC-Call</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
            .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; }
            .header { background: linear-gradient(135deg, #0e4580 0%, #d03840 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
            .week { background: #f8f9fa; padding: 15px; margin: 10px 0; border-radius: 8px; }
            .post { background: white; padding: 10px; margin: 5px 0; border-radius: 6px; border-left: 4px solid #0e4580; }
            .priority-high { border-left-color: #dc3545; }
            .priority-medium { border-left-color: #ffc107; }
            .priority-low { border-left-color: #28a745; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>📅 Plan de Publication Google My Business</h1>
                <p>VOC-Call - Contenu optimisé pour le référencement local</p>
            </div>
            
            ${schedule.map(week => `
                <div class="week">
                    <h3>📅 SEMAINE ${week.week}</h3>
                    <h4>Mardi ${week.tuesday.date}</h4>
                    ${week.tuesday.posts.map(post => post ? `
                        <div class="post priority-${post.priority}">
                            <h5>${post.title}</h5>
                            <p><strong>Priorité:</strong> ${post.priority} | <strong>Mots-clés:</strong> ${post.keywords.join(', ')}</p>
                        </div>
                    ` : '').join('')}
                    
                    <h4>Vendredi ${week.friday.date}</h4>
                    ${week.friday.posts.map(post => post ? `
                        <div class="post priority-${post.priority}">
                            <h5>${post.title}</h5>
                            <p><strong>Priorité:</strong> ${post.priority} | <strong>Mots-clés:</strong> ${post.keywords.join(', ')}</p>
                        </div>
                    ` : '').join('')}
                </div>
            `).join('')}
        </div>
    </body>
    </html>
    `;
}

// Exécuter le plan de publication
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', displayPublishingPlan);
} else {
    displayPublishingPlan();
}

// Export pour utilisation dans Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { gmbPosts, displayPublishingPlan, generateGMBReport };
}


