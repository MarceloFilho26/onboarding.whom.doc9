// Verifica se a página definiu o ROOT_PATH (para voltar uma pasta atrás, se necessário)
const baseP = typeof ROOT_PATH !== 'undefined' ? ROOT_PATH : '';

class MenuNavegacao extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header class="navbar">
            <div class="logo"><a href="${baseP}"><img src="${baseP}img/img_logo.png" alt="Whom.doc9 Logo"></a></div>
            
            <button class="mobile-menu-icon" id="btn-mobile" aria-label="Abrir menu"><span></span><span></span><span></span></button>
            <div class="search-wrapper" id="search-container">
                <div class="search-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div>
                <input type="text" class="search-input" id="global-search-input" placeholder="O que procura hoje?">
            </div>
            <button class="mobile-search-toggle" id="btn-search-mobile" aria-label="Abrir pesquisa"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></button>
            
            <nav class="nav-menu">
                <ul id="menu">
                    <li><a href="${baseP}">Página inicial</a></li>
                    <li><a href="${baseP}trilha/">Trilha de conhecimento</a></li>
                    <li><a href="https://whom.onboarding.doc9.com.br/faq-perguntas-frequentes" target="_blank">(FAQ)</a></li>
                    <li><a href="https://whom.onboarding.doc9.com.br/documentos-e-guias" target="_blank">Documentos</a></li>
                </ul>
            </nav>
        </header>
        `;

        // 1. Ativa o fundo preto no scroll de forma automatizada para qualquer index
        const navbar = this.querySelector('.navbar');
        if (navbar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 20) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        }

        // 2. CORREÇÃO DA BUSCA: Força ir para a pasta /busca/ com a query string correta
        const searchInput = this.querySelector('#global-search-input');
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && searchInput.value.trim() !== '') {
                    const termo = encodeURIComponent(searchInput.value.trim());
                    // Redireciona para a pasta /busca/ e remove o .html antigo
                    window.location.href = `${baseP}busca/?q=${termo}`;
                }
            });
        }
    }
}
customElements.define('menu-navegacao', MenuNavegacao);

class RodapePadrao extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer class="footer">
            <div class="footer-content">
                <img src="${baseP}img/img_logo.png" alt="Whom.doc9" class="footer-logo">
                <p>&copy; 2026 Doc9 - Todos os direitos reservados.</p>
            </div>
        </footer>
        `;
    }
}
customElements.define('rodape-padrao', RodapePadrao);