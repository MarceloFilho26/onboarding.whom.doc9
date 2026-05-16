const btnMobile = document.getElementById('btn-mobile');
const btnSearchMobile = document.getElementById('btn-search-mobile');
const searchContainer = document.getElementById('search-container');
const navbar = document.querySelector('.navbar');
const navMenu = document.querySelector('.nav-menu');

// Abre e fecha o menu lateral (gaveta) e anima o hambúrguer
function toggleMenu(event) {
    if (event.type === 'touchstart') event.preventDefault();
    navMenu.classList.toggle('active');
    btnMobile.classList.toggle('active'); 
    searchContainer.classList.remove('active'); 
}

// Abre e fecha a barra de pesquisa suspensa
function toggleSearch(event) {
    if (event.type === 'touchstart') event.preventDefault();
    searchContainer.classList.toggle('active');
    navMenu.classList.remove('active'); 
    btnMobile.classList.remove('active'); 
}

btnMobile.addEventListener('click', toggleMenu);
btnMobile.addEventListener('touchstart', toggleMenu);
btnSearchMobile.addEventListener('click', toggleSearch);
btnSearchMobile.addEventListener('touchstart', toggleSearch);

// Altera background da barra ao rolar a página
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Auto-fecha o menu mobile ao clicar em links internos
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        btnMobile.classList.remove('active');
    });
});

// Fecha gavetas e buscas se o usuário clicar em áreas vazias da página
document.addEventListener('click', (event) => {
    const isClickInsideMenu = navMenu.contains(event.target);
    const isClickOnMenuBtn = btnMobile.contains(event.target);
    const isClickInsideSearch = searchContainer.contains(event.target);
    const isClickOnSearchBtn = btnSearchMobile.contains(event.target);
    
    if (!isClickInsideMenu && !isClickOnMenuBtn && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        btnMobile.classList.remove('active');
    }
    if (!isClickInsideSearch && !isClickOnSearchBtn && searchContainer.classList.contains('active')) {
        searchContainer.classList.remove('active');
    }
});

// ===================================================
// --- ENGENHARIA DO CARROSSEL DE CARDS ---
// ===================================================
const track = document.getElementById('car-track');
const prevBtn = document.getElementById('car-prev');
const nextBtn = document.getElementById('car-next');
let carouselIndex = 0;

function getVisibleCardsCount() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 992) return 2;
    return 3;
}

function moveCarousel() {
    const cards = document.querySelectorAll('.card');
    if (cards.length === 0) return;

    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = 30; 
    const totalCards = cards.length;
    const visibleCards = getVisibleCardsCount();

    if (carouselIndex < 0) carouselIndex = 0;
    if (carouselIndex > totalCards - visibleCards) carouselIndex = totalCards - visibleCards;

    const displacement = carouselIndex * (cardWidth + gap);
    track.style.transform = `translateX(-${displacement}px)`;

    if (carouselIndex === 0) {
        prevBtn.classList.add('disabled');
    } else {
        prevBtn.classList.remove('disabled');
    }

    if (carouselIndex >= totalCards - visibleCards) {
        nextBtn.classList.add('disabled');
    } else {
        nextBtn.classList.remove('disabled');
    }
}

nextBtn.addEventListener('click', () => {
    carouselIndex++;
    moveCarousel();
});

prevBtn.addEventListener('click', () => {
    carouselIndex--;
    moveCarousel();
});

window.addEventListener('resize', () => {
    carouselIndex = 0;
    moveCarousel();
});

// Inicialização imediata do carrossel
moveCarousel();