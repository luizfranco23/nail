// ============================================
// NAIL STUDIO - JavaScript
// ============================================

// ============================================
// DADOS DOS SERVIÇOS - EDITE OS PREÇOS AQUI!
// ============================================
const SERVICOS = {
    unhas_simples: [
        { id: 1, nome: "Mão", preco: 40.00 },
        { id: 2, nome: "Pé", preco: 40.00 },
        { id: 3, nome: "Revitalização no Pé", preco: 80.00 }
    ],
    alongamentos_aplicacao: [
        { id: 4, nome: "Postiças", preco: 130.00 },
        { id: 5, nome: "Unhas de Gel", preco: 190.00 },
        { id: 6, nome: "Unhas de Fibra", preco: 190.00 },
        { id: 7, nome: "Banho de Gel", preco: 150.00 }
    ],
    manutencao: [
        { id: 8, nome: "Manutenção Unhas de Gel", preco: 150.00 },
        { id: 9, nome: "Manutenção Unhas de Fibra", preco: 150.00 }
    ],
    extras: [
        { id: 10, nome: "Reposição de Unha (unidade)", preco: 15.00 },
        { id: 11, nome: "Remoção de Unha", preco: 65.00 },
        { id: 12, nome: "Troca de Formato", preco: 30.00 },
        { id: 13, nome: "Unha Decorada", preco: 30.00 }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    loadServices();
    initMobileMenu();
    initCarousel();
    initScrollEffects();
    initSmoothScroll();
});

// ============================================
// LOAD SERVICES
// ============================================
function loadServices() {
    const container = document.getElementById('services-container');

    if (!container) return;

    renderServices(SERVICOS, container);

    // Reinicializa os efeitos de scroll após carregar os serviços
    setTimeout(() => {
        initServiceAnimations();
    }, 100);
}

function renderServices(servicos, container) {
    // Configuração das categorias com ícones
    const categorias = [
        {
            key: 'unhas_simples',
            titulo: 'Unhas Simples',
            icone: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M7 11v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h3"></path>
                <path d="M21 11v8a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h3z"></path>
                <path d="M12 4c-1.5 0-2.64 1.86-2.95 3H7a2 2 0 0 0-2 2v3h14V9a2 2 0 0 0-2-2h-2.05C14.64 5.86 13.5 4 12 4z"></path>
            </svg>`
        },
        {
            key: 'alongamentos_aplicacao',
            titulo: 'Alongamentos',
            icone: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z"></path>
            </svg>`
        },
        {
            key: 'manutencao',
            titulo: 'Manutenção',
            icone: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
            </svg>`
        },
        {
            key: 'extras',
            titulo: 'Extras',
            icone: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>`
        }
    ];

    let html = '';

    categorias.forEach(categoria => {
        const items = servicos[categoria.key];

        if (!items || items.length === 0) return;

        html += `
            <div class="service-category">
                <div class="category-header">
                    ${categoria.icone}
                    <h3>${categoria.titulo}</h3>
                </div>
                <ul class="service-list">
                    ${items.map(item => `
                        <li class="service-item">
                            <span class="service-name">${item.nome}</span>
                            <span class="service-price">${formatCurrency(item.preco)}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    });

    container.innerHTML = html;
}

function initServiceAnimations() {
    const serviceCategories = document.querySelectorAll('.service-category');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        serviceCategories.forEach(el => {
            el.classList.add('reveal');
            observer.observe(el);
        });
    }
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Fecha o menu ao clicar em um link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Fecha o menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// ============================================
// CAROUSEL - Clean & Responsive
// ============================================
function initCarousel() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const dotsContainer = carousel.querySelector('.carousel-dots');

    let currentIndex = 0;
    let totalSlides = slides.length;

    function getSlidesPerView() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }

    let slidesPerView = getSlidesPerView();
    let maxIndex = Math.max(0, totalSlides - slidesPerView);

    function createDots() {
        dotsContainer.innerHTML = '';
        const numDots = maxIndex + 1;

        for (let i = 0; i < numDots; i++) {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.setAttribute('aria-label', `Slide ${i + 1}`);
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    function updateCarousel() {
        const gap = window.innerWidth >= 768 ? 16 : 12;
        const slideWidth = track.offsetWidth / slidesPerView;
        const offset = currentIndex * (slideWidth + gap / slidesPerView);

        track.style.transform = `translateX(-${offset}px)`;
        updateDots();
    }

    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        if (index < 0) {
            currentIndex = maxIndex;
        } else if (index > maxIndex) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        updateCarousel();
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    // Navigation buttons
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Touch/Swipe
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoplay();
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        startAutoplay();
    }, { passive: true });

    // Resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newSlidesPerView = getSlidesPerView();
            if (newSlidesPerView !== slidesPerView) {
                slidesPerView = newSlidesPerView;
                maxIndex = Math.max(0, totalSlides - slidesPerView);
                currentIndex = Math.min(currentIndex, maxIndex);
                createDots();
            }
            updateCarousel();
        }, 100);
    });

    // Autoplay
    let autoplayInterval;

    function startAutoplay() {
        stopAutoplay();
        autoplayInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    // Init
    createDots();
    updateCarousel();
    startAutoplay();
}

// ============================================
// SCROLL EFFECTS
// ============================================
function initScrollEffects() {
    const header = document.querySelector('.header');

    // Header scroll effect
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });

    // Reveal on scroll
    const revealElements = document.querySelectorAll(
        '.about-content, .service-category, .portfolio-item, .contact-item, .quote'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    };

    // Intersection Observer para melhor performance
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    } else {
        // Fallback para navegadores antigos
        window.addEventListener('scroll', revealOnScroll, { passive: true });
        revealOnScroll();
    }
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// UTILITY: Format Currency (se necessário)
// ============================================
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

// ============================================
// BONUS: Parallax Effect no Hero (sutil)
// ============================================
function initParallax() {
    const heroDecoration = document.querySelector('.hero-decoration');

    if (!heroDecoration) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroDecoration.style.transform = `translateY(calc(-50% + ${scrolled * 0.3}px))`;
    }, { passive: true });
}

// Inicializa parallax após carregar
window.addEventListener('load', initParallax);
