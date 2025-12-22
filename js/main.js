// VOC-Call Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navMenu.classList.contains('active');
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Mise à jour des attributs ARIA
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navToggle.setAttribute('aria-label', !isExpanded ? 'Fermer le menu de navigation' : 'Ouvrir le menu de navigation');
        });

        // Close mobile menu when clicking on a link (except dropdown)
        const navLinks = document.querySelectorAll('.nav-link:not(.dropdown > .nav-link)');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // Dropdown Menu Management
    const dropdown = document.querySelector('.dropdown');
    if (dropdown) {
        const dropdownLink = dropdown.querySelector('.nav-link');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        // Toggle dropdown on click
        dropdownLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const isExpanded = dropdown.classList.contains('active');
            dropdown.classList.toggle('active');
            
            // Mise à jour des attributs ARIA
            dropdownLink.setAttribute('aria-expanded', !isExpanded);
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
                dropdownLink.setAttribute('aria-expanded', 'false');
            }
        });

        // Close dropdown when clicking on a service link
        const serviceLinks = dropdownMenu.querySelectorAll('a');
        serviceLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Don't close the dropdown immediately, let the user navigate
                // The dropdown will close when they click outside or on another menu item
            });
        });

        // Close dropdown on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                dropdown.classList.remove('active');
            }
        });
    }

    // Cookie Banner Management
    const cookieBanner = document.getElementById('cookie-banner');
    const cookieAccept = document.getElementById('cookie-accept');
    const cookieDecline = document.getElementById('cookie-decline');

    // Check if user has already made a choice
    // CRITIQUE: Attendre très longtemps avant d'afficher pour éviter CLS (après que l'utilisateur ait interagi)
    if (!localStorage.getItem('cookieConsent')) {
        // Attendre que l'utilisateur ait interagi avec la page avant d'afficher le cookie banner
        // Cela évite complètement le layout shift pendant le chargement initial
        let userInteracted = false;
        const showBanner = function() {
            if (!userInteracted && cookieBanner) {
                cookieBanner.classList.add('show');
                userInteracted = true;
            }
        };
        
        // Afficher après interaction utilisateur (scroll, click, touch)
        ['scroll', 'click', 'touchstart', 'mousemove'].forEach(function(event) {
            window.addEventListener(event, showBanner, { once: true, passive: true });
        });
        
        // Fallback: afficher après 5 secondes si pas d'interaction
        setTimeout(function() {
            if (!userInteracted && cookieBanner) {
                cookieBanner.classList.add('show');
            }
        }, 5000);
    } else {
        // Si le consentement existe, s'assurer que le banner reste caché
        if (cookieBanner) {
            cookieBanner.classList.remove('show');
        }
    }

    if (cookieAccept) {
        cookieAccept.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Accept button clicked');
            localStorage.setItem('cookieConsent', 'accepted');
            if (cookieBanner) {
                cookieBanner.classList.remove('show');
                // Ne plus modifier les styles inline - tout est géré par CSS
            }
            console.log('Cookies accepted');
        });
    } else {
        console.log('Cookie accept button not found');
    }

    if (cookieDecline) {
        cookieDecline.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Decline button clicked');
            localStorage.setItem('cookieConsent', 'declined');
            if (cookieBanner) {
                cookieBanner.classList.remove('show');
                // Ne plus modifier les styles inline - tout est géré par CSS
            }
            console.log('Cookies declined');
        });
    } else {
        console.log('Cookie decline button not found');
    }

    // Function to reset cookie consent (for testing)
    window.resetCookieConsent = function() {
        localStorage.removeItem('cookieConsent');
        console.log('Cookie consent reset');
        location.reload();
    };

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll to top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--color-red);
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    
    // Scroll to top on click
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add loading animation to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.type === 'submit' || this.classList.contains('btn-primary')) {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Chargement...';
                this.disabled = true;
                
                // Reset after 2 seconds
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 2000);
            }
        });
    });

    // Initial simple animation setup (deduplicated below with extended list)
    // (Block intentionally removed to avoid duplicate observers and fix syntax error)

    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                // Close other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });

    // Form validation and submission
    const contactForm = document.getElementById('contact-form-element');
    const candidateForm = document.getElementById('candidate-form-element');
    
    function validateForm(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        // Clear previous error states
        requiredFields.forEach(field => {
            field.style.borderColor = 'var(--color-light-gray)';
            const errorMsg = field.parentNode.querySelector('.error-message');
            if (errorMsg) errorMsg.remove();
        });
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = 'var(--color-red)';
                showFieldError(field, 'Ce champ est obligatoire');
                isValid = false;
            }
        });
        
        // Email validation
        const emailFields = form.querySelectorAll('input[type="email"]');
        emailFields.forEach(field => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (field.value && !emailRegex.test(field.value)) {
                field.style.borderColor = 'var(--color-red)';
                showFieldError(field, 'Veuillez entrer une adresse email valide');
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    function showFieldError(field, message) {
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.textContent = message;
        errorMsg.style.cssText = 'color: var(--color-red); font-size: 0.875rem; margin-top: 0.25rem;';
        field.parentNode.appendChild(errorMsg);
    }
    
    function handleFormSubmit(form, formType) {
        form.addEventListener('submit', function(e) {
            // Validation côté client puis soumission native (FormSubmit)
            if (!validateForm(form)) {
                e.preventDefault();
                alert('Veuillez remplir tous les champs obligatoires correctement.');
                return;
            }
            // Laisser le navigateur soumettre le formulaire (aucun preventDefault)
        });
    }
    
    if (contactForm) {
        handleFormSubmit(contactForm, 'contact');
    }
    
    if (candidateForm) {
        handleFormSubmit(candidateForm, 'candidate');
    }

    // (duplicate smooth scroll block removed to avoid redeclaration of anchorLinks)

    // Improved loading states for primary buttons
    const primaryButtons = document.querySelectorAll('.btn-primary');
    primaryButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Ne pas interférer avec les vrais boutons de soumission de formulaire
            if (this.tagName === 'A') {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
                this.disabled = true;
                
                // Reset after 2 seconds
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 2000);
            }
        });
    });

    // Cards already have CSS hover effects, no need for JS

    // Simple click feedback for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .feature-item, .testimonial-card, .benefit-card, .job-card, .pricing-card, .value-card, .team-member, .case-study-card, .certification-card, .partner-item, .business-partner-card, .tech-category, .innovation-feature, .environment-feature, .contact-info-card, .faq-item, .sector-card, .process-step');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .fade-in-up {
            animation: fadeInUp 0.6s ease-out;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .scroll-to-top:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.2);
        }
        
        .btn:active {
            transform: scale(0.95);
        }
        
        .card-hover {
            transition: all 0.3s ease;
        }
        
        .card-hover:hover {
            transform: translateY(-5px);
        }
    `;
    document.head.appendChild(style);

    // Progress bar functionality
    const progressBar = document.getElementById('progress-bar');
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // DISABLED: Simple reveal animations for cards - CAUSES CLS
    // Cards are now visible by default to prevent layout shifts
    // Animation removed to improve CLS score
    
    // DISABLED: Simple fade-in for hero title - CAUSES CLS
    // Hero title is now visible by default to prevent layout shifts

    // Simple hover effects for better UX
    const interactiveElements = document.querySelectorAll('.service-card, .btn, .nav-link');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Add focus management for accessibility
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    focusableElements.forEach(el => {
        el.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--color-blue)';
            this.style.outlineOffset = '2px';
        });
        
        el.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    // Lazy loading pour les images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback pour les navigateurs sans IntersectionObserver
        lazyImages.forEach(img => {
            img.classList.add('loaded');
        });
    }

    // Preload des images critiques
    const criticalImages = [
        'images/optimized/hero-call-center.jpg',
        'images/optimized/hero-about.jpg'
    ];

    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });

    // Optimisation des performances
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            // Charger les images non critiques en arrière-plan
            const nonCriticalImages = document.querySelectorAll('img[loading="lazy"]:not(.loaded)');
            nonCriticalImages.forEach(img => {
                if (img.src) {
                    img.classList.add('loaded');
                }
            });
        });
    }

    console.log('VOC-Call website initialized successfully with enhanced UX and performance optimizations');
});
