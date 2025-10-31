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

  const DEBUG = false; // passez à true pour voir les logs

  // Chargement des villes (96) depuis JSON généré
  let cities = null; // [{slug, name}]
  function loadCities() {
    return fetch('js/cities-map.json', { cache: 'no-store' })
      .then(r => r.ok ? r.json() : [])
      .catch(() => []);
  }

  // Ne pas afficher trop souvent (24h)
  const THROTTLE_MS = 24 * 60 * 60 * 1000;

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
    text.textContent = `Vous êtes près de ${city.name} ? Accédez à la page locale.`;
    const btnGo = document.createElement('a');
    btnGo.textContent = `Ouvrir ${city.name}`;
    btnGo.href = `demenageur-${city.slug}.html`;
    btnGo.className = 'btn btn-primary';
    btnGo.style.cssText = 'background:#2563eb;color:#fff;padding:8px 12px;border-radius:8px;text-decoration:none;';

    const btnDevis = document.createElement('a');
    btnDevis.textContent = 'Demander un devis';
    btnDevis.href = `devis-${city.slug}.html`;
    btnDevis.className = 'btn';
    btnDevis.style.cssText = 'background:#22c55e;color:#062;padding:8px 12px;border-radius:8px;text-decoration:none;';

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

  function normalizeName(name) {
    return (name || '').toString().toLowerCase()
      .replace(/-/g, ' ')
      .replace(/é|è|ê|ë/g, 'e')
      .replace(/à|â|ä/g, 'a')
      .replace(/î|ï/g, 'i')
      .replace(/ô|ö/g, 'o')
      .replace(/ù|û|ü/g, 'u')
      .replace(/ç/g, 'c')
      .trim();
  }

  function matchCityByName(foundName) {
    if (!cities || !cities.length) return null;
    const n = normalizeName(foundName);
    if (!n || n.length < 3) return null; // éviter correspondances vides/ambiguës
    // Exact
    let best = cities.find(c => normalizeName(c.name) === n);
    if (best) return best;
    // Starts with
    best = cities.find(c => n.startsWith(normalizeName(c.name)) || normalizeName(c.name).startsWith(n));
    if (best) return best;
    // Contains (si n >= 4)
    if (n.length >= 4) {
      return cities.find(c => normalizeName(c.name).includes(n) || n.includes(normalizeName(c.name))) || null;
    }
    return null;
  }

  async function reverseGeocode(coords) {
    // 1) Open-Meteo (CORS OK, sans clé)
    try {
      const url1 = `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${coords.latitude}&longitude=${coords.longitude}&language=fr&count=1`;
      const r1 = await fetch(url1, { headers: { 'Accept': 'application/json' } });
      if (r1.ok) {
        const j1 = await r1.json();
        if (DEBUG) console.log('OM reverse:', j1);
        if (j1 && j1.results && j1.results.length) {
          return j1.results[0].name;
        }
      }
    } catch (e) { if (DEBUG) console.log('OM error', e); }

    // 2) Fallback OSM Nominatim (peut bloquer CORS)
    try {
      const url2 = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.latitude}&lon=${coords.longitude}&accept-language=fr&zoom=10`;
      const r2 = await fetch(url2, { headers: { 'Accept': 'application/json' } });
      if (r2.ok) {
        const j2 = await r2.json();
        if (DEBUG) console.log('OSM reverse:', j2);
        if (j2 && j2.address) {
          return j2.address.city || j2.address.town || j2.address.village || null;
        }
      }
    } catch (e) { if (DEBUG) console.log('OSM error', e); }

    return null;
  }

  function locate() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          cities = cities || await loadCities();
          if (!cities || !cities.length) return;

          const name = await reverseGeocode(pos.coords);
          if (DEBUG) console.log('reverse name:', name);
          const match = name ? matchCityByName(name) : null;
          if (!match) return; // ne rien suggérer si incertain

          if (!shouldSuggest()) return;
          const dismissed = localStorage.getItem(STORAGE_KEYS.dismissedCity);
          if (dismissed && dismissed === match.slug) return;
          createBanner(match);
        } catch (e) { if (DEBUG) console.log('locate error', e); }
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
    setTimeout(askConsent, 1200);
  }
})();
