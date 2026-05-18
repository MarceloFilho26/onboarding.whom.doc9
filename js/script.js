const btnMobile = document.getElementById('btn-mobile');
const btnSearchMobile = document.getElementById('btn-search-mobile');
const searchContainer = document.getElementById('search-container');
const navbar = document.querySelector('.navbar');
const navMenu = document.querySelector('.nav-menu');

function toggleMenu(event) {
    if (event.type === 'touchstart') event.preventDefault();
    if(navMenu) navMenu.classList.toggle('active');
    if(btnMobile) btnMobile.classList.toggle('active'); 
    if(searchContainer) searchContainer.classList.remove('active'); 
}

function toggleSearch(event) {
    if (event.type === 'touchstart') event.preventDefault();
    if(searchContainer) searchContainer.classList.toggle('active');
    if(navMenu) navMenu.classList.remove('active'); 
    if(btnMobile) btnMobile.classList.remove('active'); 
}

if (btnMobile) {
    btnMobile.addEventListener('click', toggleMenu);
    btnMobile.addEventListener('touchstart', toggleMenu);
}
if (btnSearchMobile) {
    btnSearchMobile.addEventListener('click', toggleSearch);
    btnSearchMobile.addEventListener('touchstart', toggleSearch);
}

window.addEventListener('scroll', () => {
    if(navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if(navMenu) navMenu.classList.remove('active');
        if(btnMobile) btnMobile.classList.remove('active');
    });
});

// ===================================================
// --- BANCO DE DADOS E ÍNDICES DE BUSCA ---
// ===================================================

const removerAcentos = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const baseDeBusca = [
    { titulo: "Página inicial", url: "index.html", texto: "... Portal Admin Whom. Baixar extensão Whom. Site oficial doc9. Função do administrador. Configurações do sistema. Cadastro de credenciais ...", data: "3 de out. de 2025" },
    { titulo: "Função do Administrador", url: "artigo.html?id=funcao-admin", texto: "Função do Administrador. Funções do administrador. O administrador é responsável por gerenciar o portal Whom.doc9 ...", data: "27 de fev. de 2026" },
    { titulo: "Área de Administrador no sistema Doc9", url: "artigo.html?id=funcao-admin", texto: "Para consultar ou gerenciar os Administradores cadastrados no sistema Doc9, siga o passo a passo na Área de Administrador...", data: "27 de fev. de 2026" },
    { titulo: "Indicação e inclusão de administradores", url: "artigo.html?id=funcao-admin", texto: "O primeiro administrador é indicado ao nosso representante comercial na assinatura. A indicação e inclusão de novos gestores é ilimitada.", data: "27 de fev. de 2026" },
    { titulo: "Diferença entre administrador x usuário", url: "artigo.html?id=funcao-admin", texto: "Entenda a diferença entre administrador e usuário da extensão. O administrador acessa o portal, o usuário acessa pelo plugin no navegador.", data: "27 de fev. de 2026" },
    { titulo: "Responsabilidades do administrador", url: "artigo.html?id=funcao-admin", texto: "As responsabilidades do administrador incluem implementação, reuniões, materiais de onboarding e contato direto com o gestor.", data: "27 de fev. de 2026" },
    { titulo: "Configurações do sistema", url: "artigo.html?id=config-sistema", texto: "Ajuste configurações globais do sistema, parâmetros de segurança, alertas, padronização de acessos e tempo de timeout.", data: "10 de jan. de 2026" },
    { titulo: "Cadastro de credenciais", url: "artigo.html?id=cadastro-credenciais", texto: "Realize o cadastro de credenciais, senhas, acessos a certificados digitais, adequação LGPD e revogação de perfis.", data: "15 de jan. de 2026" },
    { titulo: "Uso da extensão", url: "artigo.html?id=uso-extensao", texto: "uso extensão plugin navegador chrome web store login automatizado", data: "20 de jan. de 2026" },
    { titulo: "Orientações técnicas", url: "artigo.html?id=orientacoes-tecnicas", texto: "orientações técnicas infraestrutura requisitos conformidade iso 27001 pje cnj", data: "22 de jan. de 2026" },
    { titulo: "Cadastro de Usuários", url: "artigo.html?id=cadastro-usuarios", texto: "cadastro usuários equipe perfis convites onboarding mapeamento hierarquia", data: "25 de jan. de 2026" },
    { titulo: "Canais de Relacionamento", url: "artigo.html?id=canais-relacionamento", texto: "canais relacionamento suporte atendimento chamados help desk telefone whatsapp email tickets", data: "28 de jan. de 2026" },
    { titulo: "Tutoriais rápidos", url: "artigo.html?id=tutoriais-rapidos", texto: "tutoriais rápidos vídeos guias passo a passo ajuda microlearning", data: "30 de jan. de 2026" }
];

const bancoDeDados = {
    "funcao-admin": {
        titulo: "Função do administrador",
        subtitulo: "Entenda as responsabilidades, permissões e níveis de acesso dentro da plataforma.",
        html: `
            <div class="artigo-layout">
                <div class="artigo-sidebar">
                    <img src="img/img_1.png" alt="Função do Administrador" style="max-width: 100%; height: auto; object-fit: contain;">
                    <h3 style="color: #00338d; margin-top: 20px; font-size: 1.2rem; font-weight: 700;">Central de Ajuda Admin</h3>
                    <p style="color: #64748b; font-size: 0.95rem; margin-top: 10px; line-height: 1.6;">Nesta seção você encontra tudo relacionado ao papel de gestão e governança corporativa no Whom.</p>
                </div>
                <div class="artigo-main">
                    <div class="accordion">
                        <div class="accordion-item">
                            <button class="accordion-header">
                                Funções do administrador
                                <svg class="accordion-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </button>
                            <div class="accordion-content">
                                <div class="accordion-content-inner">
                                    <p>O administrador é responsável por gerenciar o portal Whom.doc9. Sua conta possui acesso a múltiplas funcionalidades, sendo as principais:</p>
                                    <ul style="margin: 12px 0 20px 20px; list-style-type: disc;">
                                        <li>Cadastrar usuários</li>
                                        <li>Configurar questões de segurança</li>
                                        <li>Conferir histórico de uso</li>
                                        <li>Administrar credenciais</li>
                                    </ul>
                                    <h4 style="color: #00338d; margin-bottom: 10px; font-weight: 700;">Acesso ao Portal</h4>
                                    <p>O acesso do administrador ocorre pelo link:<br> 👉 <a href="https://sistema.doc9.com.br/" target="_blank" rel="noopener noreferrer" style="color: #1e73ed; font-weight: 600; text-decoration: underline;">https://sistema.doc9.com.br/</a></p>
                                    <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 12px; border-radius: 4px; margin-top: 15px; color: #92400e;"><strong>⚠️ Atenção:</strong> Faça a atualização de senha no primeiro acesso.</div>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <button class="accordion-header">
                                Área de Administrador no sistema Doc9
                                <svg class="accordion-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </button>
                            <div class="accordion-content">
                                <div class="accordion-content-inner">
                                    <p>Para consultar ou gerenciar os Administradores cadastrados no sistema Doc9, siga o passo a passo abaixo:</p>
                                    <ol style="margin: 12px 0 20px 20px; line-height: 2;">
                                        <li>Acesse o portal do administrador WHOM.</li>
                                        <li>No menu esquerdo, clique em <strong>WHOM</strong>.</li>
                                        <li>Em seguida, selecione a opção <strong>Configurações</strong>.</li>
                                        <li>Clique em <strong>Administradores</strong>.</li>
                                    </ol>
                                    <p>Nesta área, você encontrará a lista. Para um novo administrador, clique em <strong>Novo</strong>.</p>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <button class="accordion-header">
                                Indicação e inclusão de administradores
                                <svg class="accordion-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </button>
                            <div class="accordion-content">
                                <div class="accordion-content-inner">
                                    <p>O primeiro administrador é indicado ao nosso representante comercial no momento da assinatura do contrato.</p>
                                    <p style="margin-top: 10px;">É possível incluir novos administradores posteriormente, mediante solicitação ao gestor de contas ou diretamente pelo portal.</p>
                                    <p style="margin-top: 10px; font-weight: 700; color: #16a34a;">✔ Não há custo adicional e a quantidade de administradores é ilimitada.</p>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <button class="accordion-header">
                                Diferença entre administrador x usuário da extensão
                                <svg class="accordion-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </button>
                            <div class="accordion-content">
                                <div class="accordion-content-inner">
                                    <p style="margin-bottom: 10px;"><strong>Administrador:</strong> acessa o portal e possui as funcionalidades de gestão.</p>
                                    <p style="margin-bottom: 15px;"><strong>Usuário da extensão:</strong> acessa pelo plugin instalado no navegador, utilizando os certificados e sistemas atribuídos ao seu cadastro.</p>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <button class="accordion-header">
                                Responsabilidades do administrador
                                <svg class="accordion-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </button>
                            <div class="accordion-content">
                                <div class="accordion-content-inner">
                                    <p>Além da gestão, o administrador é responsável pela implementação da ferramenta, participando de reuniões e recebimento de materiais.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    "config-sistema": {
        titulo: "Configurações do sistema",
        subtitulo: "Ajuste as preferências e regras de segurança.",
        html: `
            <div class="artigo-layout">
                <div class="artigo-sidebar">
                    <img src="img/img_2.png" alt="Configurações do Sistema" style="max-width: 100%; height: auto; object-fit: contain;">
                    <h3 style="color: #00338d; margin-top: 20px; font-size: 1.2rem; font-weight: 700;">Parâmetros Globais</h3>
                </div>
                <div class="artigo-main">
                    <h2 style="color: #00338d; margin-bottom: 20px;">Área em Desenvolvimento</h2>
                    <p style="color: #64748b; font-size: 1.05rem;">Espaço reservado para documentar os parâmetros globais.</p>
                </div>
            </div>
        `
    },
    "cadastro-credenciais": { titulo: "Cadastro de credenciais", subtitulo: "Gerencie logins e permissões de forma centralizada.", html: `<div style="text-align: center; padding: 50px;"><img src="img/img_3.png" style="max-width: 200px;"><h2 style="color: #00338d; margin-top: 20px;">Área em Desenvolvimento</h2></div>` },
    "uso-extensao": { titulo: "Uso da extensão", subtitulo: "Dicas práticas para instalar e otimizar o uso diário no seu navegador.", html: `<div style="text-align: center; padding: 50px;"><img src="img/img_4.png" style="max-width: 200px;"><h2 style="color: #00338d; margin-top: 20px;">Área em Desenvolvimento</h2></div>` },
    "orientacoes-tecnicas": { titulo: "Orientações técnicas", subtitulo: "Configurações avançadas, requisitos de infraestrutura e parâmetros do sistema.", html: `<div style="text-align: center; padding: 50px;"><img src="img/img_5.png" style="max-width: 200px;"><h2 style="color: #00338d; margin-top: 20px;">Área em Desenvolvimento</h2></div>` },
    "cadastro-usuarios": { titulo: "Cadastro de Usuários", subtitulo: "Adicione, gerencie e configure novos perfis para a sua equipe.", html: `<div style="text-align: center; padding: 50px;"><img src="img/img_6.png" style="max-width: 200px;"><h2 style="color: #00338d; margin-top: 20px;">Área em Desenvolvimento</h2></div>` },
    "canais-relacionamento": { titulo: "Canais de Relacionamento", subtitulo: "Fale com nossa central de suporte, tire dúvidas e acompanhe chamados.", html: `<div style="text-align: center; padding: 50px;"><img src="img/img_7.png" style="max-width: 200px;"><h2 style="color: #00338d; margin-top: 20px;">Área em Desenvolvimento</h2></div>` },
    "tutoriais-rapidos": { titulo: "Tutoriais rápidos", subtitulo: "Vídeos e guias práticos direto ao ponto para otimizar o seu dia a dia.", html: `<div style="text-align: center; padding: 50px;"><img src="img/img_8.png" style="max-width: 200px;"><h2 style="color: #00338d; margin-top: 20px;">Área em Desenvolvimento</h2></div>` }
};

// ===================================================
// --- ENGENHARIA DO CARROSSEL ---
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
    if (!track) return; 
    const cards = document.querySelectorAll('.card');
    if (cards.length === 0) return;
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = 30; 
    const totalCards = cards.length;
    const visibleCards = getVisibleCardsCount();

    if (carouselIndex < 0) carouselIndex = 0;
    if (carouselIndex > totalCards - visibleCards) carouselIndex = totalCards - visibleCards;

    track.style.transform = `translateX(-${carouselIndex * (cardWidth + gap)}px)`;

    if (carouselIndex === 0) prevBtn.classList.add('disabled');
    else prevBtn.classList.remove('disabled');

    if (carouselIndex >= totalCards - visibleCards) nextBtn.classList.add('disabled');
    else nextBtn.classList.remove('disabled');
}

if (track && nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => { carouselIndex++; moveCarousel(); });
    prevBtn.addEventListener('click', () => { carouselIndex--; moveCarousel(); });
    window.addEventListener('resize', () => { carouselIndex = 0; moveCarousel(); });
    moveCarousel();
}

// ===================================================
// --- ENGENHARIA DA SINGLE PAGE E RESULTADOS ---
// ===================================================

function ativarAcordeoes() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    if (accordionHeaders.length > 0) {
        accordionHeaders.forEach(header => {
            const novoHeader = header.cloneNode(true);
            header.parentNode.replaceChild(novoHeader, header);
            
            novoHeader.addEventListener('click', () => {
                const currentItem = novoHeader.parentElement;
                const currentContent = currentItem.querySelector('.accordion-content');
                
                const activeItem = document.querySelector('.accordion-item.active');
                if (activeItem && activeItem !== currentItem) {
                    activeItem.classList.remove('active');
                    activeItem.querySelector('.accordion-header').classList.remove('active');
                    activeItem.querySelector('.accordion-content').style.maxHeight = null;
                }

                novoHeader.classList.toggle('active');
                currentItem.classList.toggle('active');

                if (currentItem.classList.contains('active')) {
                    currentContent.style.maxHeight = currentContent.scrollHeight + "px";
                } else {
                    currentContent.style.maxHeight = null;
                }
            });
        });
    }
}

function destacarTexto(texto, busca) {
    if (!busca) return texto;
    const buscaLimpa = removerAcentos(busca);
    const regex = new RegExp(`(${buscaLimpa})`, 'gi');
    return texto.replace(new RegExp(busca, 'gi'), '<strong>$&</strong>');
}

function carregarArtigo() {
    const params = new URLSearchParams(window.location.search);
    const artigoId = params.get('id');
    const buscaQuery = params.get('busca');

    const tituloArtigo = document.getElementById('titulo-artigo');
    const subtituloArtigo = document.getElementById('subtitulo-artigo');
    const conteudoArtigo = document.getElementById('conteudo-artigo');

    if (tituloArtigo && conteudoArtigo) {
        if (artigoId && bancoDeDados[artigoId]) {
            const dados = bancoDeDados[artigoId];
            tituloArtigo.innerHTML = dados.titulo;
            subtituloArtigo.innerHTML = dados.subtitulo;
            conteudoArtigo.innerHTML = dados.html;
            document.title = dados.titulo + " - Whom.doc9";
            ativarAcordeoes();
        
        } else if (buscaQuery) {
            const queryLimpa = removerAcentos(buscaQuery.trim().toLowerCase());
            let contagem = 0;
            let htmlResultados = '<div class="resultados-busca-container">';

            baseDeBusca.forEach(item => {
                const tituloLimpo = removerAcentos(item.titulo.toLowerCase());
                const textoLimpo = removerAcentos(item.texto.toLowerCase());

                if (tituloLimpo.includes(queryLimpa) || textoLimpo.includes(queryLimpa)) {
                    const tituloDestacado = destacarTexto(item.titulo, buscaQuery);
                    const textoDestacado = destacarTexto(item.texto, buscaQuery);

                    htmlResultados += `
                        <div class="resultado-item">
                            <a href="${item.url}" class="resultado-titulo">${tituloDestacado}</a>
                            <p class="resultado-snippet">${textoDestacado}</p>
                            <p class="resultado-data">Última modificação em ${item.data}</p>
                        </div>
                    `;
                    contagem++;
                }
            });

            if (contagem === 0) {
                htmlResultados += `<div style="text-align:center; padding: 50px; color:#64748b;">Nenhum resultado encontrado para "<strong>${buscaQuery}</strong>".</div>`;
            }
            
            htmlResultados += '</div>';
            tituloArtigo.innerHTML = `Resultados da busca`;
            subtituloArtigo.innerHTML = contagem === 1 ? `Encontramos 1 resultado relacionado a "<strong>${buscaQuery}</strong>"` : `Encontramos ${contagem} resultados relacionados a "<strong>${buscaQuery}</strong>"`;
            conteudoArtigo.innerHTML = htmlResultados;
            document.title = `Busca por ${buscaQuery} - Whom.doc9`;

        } else {
            tituloArtigo.innerHTML = "Página não encontrada";
            subtituloArtigo.innerHTML = "O link está incorreto ou o artigo não existe.";
            conteudoArtigo.innerHTML = "<p style='text-align:center;'>Volte para a página inicial.</p>";
        }
    } else {
        ativarAcordeoes();
    }
}

carregarArtigo();

// ===================================================
// --- ENGENHARIA DA PESQUISA (CAIXINHA FLUTUANTE) ---
// ===================================================
const searchInputGlobal = document.querySelector('.search-input');
const searchContainerGlobal = document.getElementById('search-container');

let resultsContainer = document.getElementById('search-results');
if (!resultsContainer && searchContainerGlobal) {
    resultsContainer = document.createElement('div');
    resultsContainer.className = 'search-results';
    resultsContainer.id = 'search-results';
    searchContainerGlobal.appendChild(resultsContainer);
}

if(searchInputGlobal) {
    searchInputGlobal.addEventListener('input', (e) => {
        const queryOriginal = e.target.value.trim();
        const queryLimpa = removerAcentos(queryOriginal.toLowerCase());
        resultsContainer.innerHTML = ''; 

        if (queryLimpa.length < 2) {
            resultsContainer.classList.remove('active');
            return;
        }

        let achouAlgo = false;

        baseDeBusca.forEach(item => {
            const tituloLimpo = removerAcentos(item.titulo.toLowerCase());
            const textoLimpo = removerAcentos(item.texto.toLowerCase());

            if (tituloLimpo.includes(queryLimpa) || textoLimpo.includes(queryLimpa)) {
                const link = document.createElement('a');
                link.href = item.url;
                link.className = 'search-item';
                link.innerHTML = `<i class="fa-solid fa-arrow-right"></i> ${destacarTexto(item.titulo, queryOriginal)}`;
                resultsContainer.appendChild(link);
                achouAlgo = true;
            }
        });

        if (!achouAlgo) {
            resultsContainer.innerHTML = `<div class="search-no-results">Nenhum resultado encontrado.</div>`;
        }
        resultsContainer.classList.add('active');
    });

    searchInputGlobal.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = e.target.value.trim();
            if (query.length >= 2) {
                window.location.href = `artigo.html?busca=${encodeURIComponent(query)}`;
            }
        }
    });
}

document.addEventListener('click', (e) => {
    if (searchContainerGlobal && !searchContainerGlobal.contains(e.target) && resultsContainer) {
        resultsContainer.classList.remove('active');
    }
});