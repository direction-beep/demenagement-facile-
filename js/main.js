// ============================================
// DÉMÉNAGEMENT FACILE - JAVASCRIPT PRINCIPAL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                // Fermer les autres items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle l'item actuel
                item.classList.toggle('active');
            });
        }
    });

    // Formulaires de devis
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les données du formulaire
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validation basique
            if (!data['ville-depart'] || !data['ville-arrivee'] || !data['date'] || !data['email'] || !data['telephone']) {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }
            
            // Simuler l'envoi
            console.log('Formulaire soumis:', data);
            
            // Afficher un message de succès
            alert('Merci pour votre demande de devis ! Nous vous contacterons sous 24h.');
            
            // Réinitialiser le formulaire
            form.reset();
        });
    });

    // Date minimale pour les champs de date
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    
    dateInputs.forEach(input => {
        input.setAttribute('min', today);
    });

    // Animation au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer les sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Lien de défilement fluide
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#0') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Compensation du header sticky
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Bouton scroll to top
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #2563eb;
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        z-index: 1000;
        font-size: 1.5rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transition: all 0.3s ease;
    `;
    document.body.appendChild(scrollToTopBtn);

    // Afficher/masquer le bouton scroll to top
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    // Scroll to top au clic
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Fonction pour gérer l'autocomplétion des villes
function initCityAutocomplete() {
    const villesFrance = [
        'Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg',
        'Montpellier', 'Bordeaux', 'Lille', 'Rennes', 'Reims', 'Saint-Étienne',
        'Toulon', 'Le Havre', 'Grenoble', 'Dijon', 'Angers', 'Nîmes', 'Villeurbanne',
        // Ajouter plus de villes si nécessaire
    ];

    const cityInputs = document.querySelectorAll('input[id*="ville"]');
    
    cityInputs.forEach(input => {
        input.addEventListener('input', function() {
            const value = this.value.toLowerCase();
            const matchingCities = villesFrance.filter(city => 
                city.toLowerCase().startsWith(value)
            );

            // Créer une liste déroulante
            let datalist = this.getAttribute('list');
            if (!datalist) {
                const listId = 'villes-' + Math.random().toString(36).substr(2, 9);
                this.setAttribute('list', listId);
                
                datalist = document.createElement('datalist');
                datalist.id = listId;
                document.body.appendChild(datalist);
            } else {
                datalist = document.querySelector('#' + datalist);
            }

            // Mettre à jour les options
            datalist.innerHTML = '';
            matchingCities.slice(0, 10).forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                datalist.appendChild(option);
            });
        });
    });
}

// Initialiser l'autocomplétion des villes
initCityAutocomplete();

// ==============================
// Géolocalisation (avec consentement)
// ==============================
(function geoModule() {
  const STORAGE_KEYS = {
    consent: 'df_geo_consent',
    lastSuggestionAt: 'df_geo_suggest_ts',
    dismissedCity: 'df_geo_dismissed_city'
  };

  // Villes (lat, lon, slug)
  const cities = [
    { n: 'Paris', lat: 48.8566, lon: 2.3522, slug: 'paris' },
    { n: 'Lyon', lat: 45.7640, lon: 4.8357, slug: 'lyon' },
    { n: 'Marseille', lat: 43.2965, lon: 5.3698, slug: 'marseille' },
    { n: 'Toulouse', lat: 43.6045, lon: 1.4442, slug: 'toulouse' },
    { n: 'Nice', lat: 43.7102, lon: 7.2620, slug: 'nice' },
    { n: 'Nantes', lat: 47.2184, lon: -1.5536, slug: 'nantes' },
    { n: 'Strasbourg', lat: 48.5734, lon: 7.7521, slug: 'strasbourg' },
    { n: 'Montpellier', lat: 43.6119, lon: 3.8772, slug: 'montpellier' },
    { n: 'Bordeaux', lat: 44.8378, lon: -0.5792, slug: 'bordeaux' },
    { n: 'Lille', lat: 50.6292, lon: 3.0573, slug: 'lille' },
    { n: 'Rennes', lat: 48.1173, lon: -1.6778, slug: 'rennes' },
    { n: 'Reims', lat: 49.2583, lon: 4.0317, slug: 'reims' },
    { n: 'Saint-Étienne', lat: 45.4397, lon: 4.3872, slug: 'saint-etienne' },
    { n: 'Toulon', lat: 43.1242, lon: 5.9280, slug: 'toulon' },
    { n: 'Le Mans', lat: 48.0061, lon: 0.1996, slug: 'le-mans' },
    { n: 'Dijon', lat: 47.3220, lon: 5.0415, slug: 'dijon' },
    { n: 'Angers', lat: 47.4784, lon: -0.5632, slug: 'angers' },
    { n: 'Nîmes', lat: 43.8367, lon: 4.3601, slug: 'nimes' },
    { n: 'Grenoble', lat: 45.1885, lon: 5.7245, slug: 'grenoble' },
    { n: 'Dijon', lat: 47.3220, lon: 5.0415, slug: 'dijon' },
    { n: 'Rouen', lat: 49.4431, lon: 1.0993, slug: 'rouen' },
    { n: 'Orléans', lat: 47.9025, lon: 1.909, slug: 'orleans' },
    { n: 'Clermont-Ferrand', lat: 45.7772, lon: 3.0870, slug: 'clermont-ferrand' },
    { n: 'Nancy', lat: 48.6921, lon: 6.1844, slug: 'nancy' },
    { n: 'Metz', lat: 49.1193, lon: 6.1757, slug: 'metz' },
    { n: 'Caen', lat: 49.1829, lon: -0.3707, slug: 'caen' },
    { n: 'Amiens', lat: 49.8941, lon: 2.2958, slug: 'amiens' },
    { n: 'Besançon', lat: 47.2378, lon: 6.0241, slug: 'besancon' },
    { n: 'Perpignan', lat: 42.6887, lon: 2.8948, slug: 'perpignan' },
    { n: 'Avignon', lat: 43.9493, lon: 4.8055, slug: 'avignon' }
  ];

  // Ne pas afficher trop souvent (24h)
  const THROTTLE_MS = 24 * 60 * 60 * 1000;

  function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371; // km
    const toRad = (d) => d * Math.PI / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat/2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon/2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  function nearestCity(coords) {
    let best = null;
    for (const c of cities) {
      const d = haversine(coords.latitude, coords.longitude, c.lat, c.lon);
      if (!best || d < best.d) best = { ...c, d };
    }
    return best;
  }

  function shouldSuggest() {
    try {
      const ts = parseInt(localStorage.getItem(STORAGE_KEYS.lastSuggestionAt) || '0', 10);
      return Date.now() - ts > THROTTLE_MS;
    } catch (_) { return true; }
  }

  function markSuggested(citySlug) {
    try {
      localStorage.setItem(STORAGE_KEYS.lastSuggestionAt, String(Date.now()));
      if (citySlug) localStorage.setItem(STORAGE_KEYS.dismissedCity, citySlug);
    } catch (_) {}
  }

  function getConsent() {
    try { return localStorage.getItem(STORAGE_KEYS.consent); } catch (_) { return null; }
  }

  function setConsent(val) {
    try { localStorage.setItem(STORAGE_KEYS.consent, val); } catch (_) {}
  }

  function createBanner(city) {
    const bar = document.createElement('div');
    bar.style.cssText = 'position:fixed;left:20px;right:20px;bottom:20px;background:#0f172a;color:#fff;padding:14px 16px;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,.25);z-index:9999;display:flex;gap:12px;align-items:center;flex-wrap:wrap;';
    const text = document.createElement('div');
    text.textContent = `Vous êtes près de ${city.n} ? Accédez à la page locale.`;
    const btnGo = document.createElement('a');
    btnGo.textContent = `Ouvrir ${city.n}`;
    btnGo.href = `demenageur-${city.slug}.html`;
    btnGo.className = 'btn btn-primary';
    btnGo.style.cssText = 'background:#2563eb;color:#fff;padding:8px 12px;border-radius:8px;text-decoration:none;';

    const btnDevis = document.createElement('a');
    btnDevis.textContent = 'Demander un devis';
    btnDevis.href = `devis-${city.slug}.html`;
    btnDevis.className = 'btn';
    btnDevis.style.cssText = 'background:#22c55e;color:#0b1; color:#062; padding:8px 12px;border-radius:8px;text-decoration:none;background:#22c55e;color:#062;';

    const btnClose = document.createElement('button');
    btnClose.textContent = 'Plus tard';
    btnClose.style.cssText = 'margin-left:auto;background:transparent;color:#fff;border:1px solid rgba(255,255,255,.3);padding:8px 12px;border-radius:8px;cursor:pointer;';
    btnClose.onclick = () => { markSuggested(city.slug); bar.remove(); };

    bar.appendChild(text); bar.appendChild(btnGo); bar.appendChild(btnDevis); bar.appendChild(btnClose);
    document.body.appendChild(bar);
  }

  function askConsent() {
    const box = document.createElement('div');
    box.style.cssText = 'position:fixed;left:20px;right:20px;bottom:20px;background:#111827;color:#fff;padding:14px 16px;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,.25);z-index:9999;display:flex;gap:12px;align-items:center;flex-wrap:wrap;';
    const t = document.createElement('div');
    t.textContent = "Autorisez-vous la localisation pour vous proposer la page de votre ville ?";
    const ok = document.createElement('button');
    ok.textContent = 'Autoriser';
    ok.style.cssText = 'background:#22c55e;color:#062;padding:8px 12px;border-radius:8px;border:none;cursor:pointer;';
    const no = document.createElement('button');
    no.textContent = 'Refuser';
    no.style.cssText = 'background:transparent;color:#fff;border:1px solid rgba(255,255,255,.3);padding:8px 12px;border-radius:8px;cursor:pointer;';

    ok.onclick = () => { setConsent('granted'); document.body.removeChild(box); locate(); };
    no.onclick = () => { setConsent('denied'); document.body.removeChild(box); };

    box.appendChild(t); box.appendChild(ok); box.appendChild(no);
    document.body.appendChild(box);
  }

  function locate() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const near = nearestCity(pos.coords);
        if (!near) return;
        if (!shouldSuggest()) return;
        const dismissed = localStorage.getItem(STORAGE_KEYS.dismissedCity);
        if (dismissed && dismissed === near.slug) return;
        createBanner(near);
      },
      () => { /* refus / erreur: ne rien faire */ },
      { enableHighAccuracy: false, maximumAge: 600000, timeout: 8000 }
    );
  }

  // Démarrage
  const consent = getConsent();
  if (consent === 'granted') {
    locate();
  } else if (consent === 'denied') {
    // rien
  } else {
    // Demander une seule fois par session
    setTimeout(askConsent, 1200);
  }
})();
