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
                <input type="text" class="search-input" placeholder="O que você procura hoje?">
            </div>
            <button class="mobile-search-toggle" id="btn-search-mobile" aria-label="Abrir pesquisa"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></button>
            
            <nav class="nav-menu">
                <ul id="menu">
                    <li><a href="${baseP}">Página inicial</a></li>
                    
                    <li class="dropdown-item">
                        <a href="#" class="dropdown-trigger">Trilha de conhecimento <span class="arrow">▼</span></a>
                        <ul class="dropdown-menu">
                            <li><a href="${baseP}funcao-admin/">Função do administrador</a></li>
                            <li><a href="${baseP}modulo-1">Módulo 1 - Configurações iniciais</a></li>
                            <li><a href="${baseP}modulo-2">Módulo 2 - Configurações de governança</a></li>
                            <li><a href="${baseP}cadastro-usuarios/">Módulo 3 - Cadastro de usuários</a></li>
                            <li><a href="${baseP}modulo-4">Módulo 4 - Gestão e administração</a></li>
                            <li><a href="${baseP}tipos-2fa">Tipos de dois fatores (2FA)</a></li>
                            <li><a href="${baseP}boas-praticas">Boas práticas</a></li>
                            <li><a href="${baseP}canais-relacionamento/">Canais de relacionamento</a></li>
                            <li><a href="${baseP}mep">MEP</a></li>
                        </ul>
                    </li>
                    
                    <li><a href="https://whom.onboarding.doc9.com.br/faq-perguntas-frequentes" target="_blank">(FAQ)</a></li>
                    <li><a href="https://whom.onboarding.doc9.com.br/documentos-e-guias" target="_blank">Documentos</a></li>
                </ul>
            </nav>
        </header>
        `;
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