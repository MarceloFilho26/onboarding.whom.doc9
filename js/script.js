const btnMobile = document.getElementById('btn-mobile');
const btnSearchMobile = document.getElementById('btn-search-mobile');
const searchContainer = document.getElementById('search-container');
const navbar = document.querySelector('.navbar');
const navMenu = document.querySelector('.nav-menu');

// Mantém a consistência de diretório raiz
const caminhoBase = typeof ROOT_PATH !== 'undefined' ? ROOT_PATH : './';

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
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    }
});

// ===================================================
// --- CARROSSEL ---
// ===================================================
const track = document.getElementById('car-track');
const prevBtn = document.getElementById('car-prev');
const nextBtn = document.getElementById('car-next');
let carouselIndex = 0;

function moveCarousel() {
    if (!track) return; 
    const cards = document.querySelectorAll('.card');
    if (cards.length === 0) return;
    const visibleCards = window.innerWidth <= 768 ? 1 : window.innerWidth <= 992 ? 2 : 3;
    const cardWidth = cards[0].getBoundingClientRect().width;
    
    if (carouselIndex < 0) carouselIndex = 0;
    if (carouselIndex > cards.length - visibleCards) carouselIndex = cards.length - visibleCards;

    track.style.transform = `translateX(-${carouselIndex * (cardWidth + 30)}px)`;

    if (carouselIndex === 0) prevBtn.classList.add('disabled');
    else prevBtn.classList.remove('disabled');

    if (carouselIndex >= cards.length - visibleCards) nextBtn.classList.add('disabled');
    else nextBtn.classList.remove('disabled');
}

if (track && nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => { carouselIndex++; moveCarousel(); });
    prevBtn.addEventListener('click', () => { carouselIndex--; moveCarousel(); });
    window.addEventListener('resize', () => { carouselIndex = 0; moveCarousel(); });
    moveCarousel();
}

// ===================================================
// --- ACORDEÕES ---
// ===================================================
function ativarAcordeoes() {
    document.querySelectorAll('.accordion-header').forEach(header => {
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
ativarAcordeoes();

// ===================================================
// --- SISTEMA DA LUPA DE BUSCA ---
// ===================================================
const removerAcentos = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

// BANCO DE DADOS ATUALIZADO COM OS NOVOS DIRETÓRIOS DO SISTEMA
const baseDeBusca = [
    { pagina: "Função do administrador", titulo: "Funções do administrador", url: "funcao-admin/", texto: "O administrador é responsible por gerenciar o portal Whom.doc9. Sua conta possui acesso a múltiplas funcionalidades: Cadastrar usuários, Configurar questões de segurança, Conferir histórico de uso, Administrar credenciais. Atualize sua senha no primeiro acesso." },
    { pagina: "Função do administrador", titulo: "Área de administrador no sistema Doc9", url: "funcao-admin/", texto: "Para consultar ou gerenciar os Administradores cadastrados no sistema Doc9, acesse o portal do administrador WHOM, vá em Configurações e depois Administradores. É possível criar novos, editar permissões ou inativar." },
    { pagina: "Função do administrador", titulo: "Indicação e inclusão de administradores", url: "funcao-admin/", texto: "O primeiro administrador é indicado na assinatura do contrato. É possível incluir novos posteriormente com o gestor de contas. Não há custo adicional e a quantidade é ilimitada." },
    { pagina: "Função do administrador", titulo: "Diferença entre administrador x usuário da extensão", url: "funcao-admin/", texto: "Administrador: acessa o portal e possui as funcionalidades de gestão. Usuário da extensão: acessa pelo plugin instalado no navegador com os certificados e sistemas atribuídos." },
    { pagina: "Função do administrador", titulo: "Responsabilidades do administrador", url: "funcao-admin/", texto: "O administrador é responsável pela implementação da ferramenta, participando de reuniões, recebimento de materiais e contato direto com o gestor de Onboarding e gestor de contas." },

    { pagina: "Configurações do sistema", titulo: "Módulo 1 - Configurações iniciais", url: "modulo-1/", texto: "Cadastrar Certificado: permite registrar certificados no portal. Cadastro de Credencial: centraliza o registro de certificados, logins e autenticações (inclusive 2FA)." },
    { pagina: "Configurações do sistema", titulo: "Módulo 2 - Configurações de Governança", url: "modulo-2/", texto: "Parâmetros de Configuração, restrições de IP, domínio, horários, navegador. URLs Bloqueadas. Grupos de Usuários (centros de custo) e Grupos de Restrições." },
    { pagina: "Configurações do sistema", titulo: "Módulo 3 - Cadastro de Usuários", url: "modulo-3/", texto: "Criar concessão de acesso, cadastrar colaboradores, vinculá-los a certificados e sistemas. Uso da extensão WHOM por e-mail." },
    { pagina: "Configurações do sistema", titulo: "Módulo 4 - Gestão e administração", url: "modulo-4/", texto: "Dashboards de acompanhamento, Concessão de Acesso, Histórico de Uso e Solicitação de novos sistemas." },
    { pagina: "Configurações do sistema", titulo: "Boas Práticas", url: "boas-praticas/", texto: "Funcionalidades da extensão. Orientações para protocolos e assinatura automática. Compatibilidade com Chrome e Edge. Login nos tribunais sem certificado (PJe, PJe Office, Shodo)." },

    { pagina: "Canais de Relacionamento", titulo: "Suporte técnico (abertura de tickets)", url: "canais-relacionamento/", texto: "Todos os usuários podem abrir chamados para suporte diretamente pela extensão Whom. Canal oficial para reportar problemas, falhas e help desk." },
    { pagina: "Canais de Relacionamento", titulo: "Atendimento por E-mail e WhatsApp", url: "canais-relacionamento/", texto: "Por e-mail: atendimento@doc9.movidesk.com. Por WhatsApp: +55 (51) 8940-2369, fale com o gestor de contas." },
    { pagina: "Canais de Relacionamento", titulo: "Orientações e treinamentos", url: "canais-relacionamento/", texto: "Dúvidas sobre orientações ou treinamentos devem ser direcionadas ao gestor de onboarding." },

    { pagina: "Cadastro de credenciais", titulo: "Cadastro de certificados", url: "cadastro-credenciais/", texto: "Cadastro de certificados no portal do administrador Whom. Compatível com certificados A1 no formato .pfx. Adicionar em lote ou individual. Localizar e atualizar certificado no computador." },
    { pagina: "Cadastro de credenciais", titulo: "Renovação de certificado", url: "cadastro-credenciais/", texto: "Renovação Automática com antecedência. Parceria com Certisign. Investimento: R$ 140,00 cobrados na fatura. Atualizar arquivo e senha do certificado." },
    { pagina: "Cadastro de credenciais", titulo: "Cadastro de credenciais", url: "cadastro-credenciais/", texto: "Mais de 1.100 sistemas. Sistemas de usuário e senha (adicionar via arquivo csv ou individual). Sistemas com autenticação 2FA: PJe, EPROCS, Projudis, GOV.BR, Esaj, Portal do Advogado, STF." },

    { pagina: "Cadastro de Usuários", titulo: "Concessão de acesso ao usuário", url: "cadastro-usuarios/", texto: "Como criar uma concessão de acesso para liberar o uso da plataforma para colaboradores. Nova solicitação, grupo de restrição, certificados, sistemas e envio de email automático com a extensão." },
    { pagina: "Cadastro de Usuários", titulo: "Acesso inicial pelo Whom", url: "cadastro-usuarios/", texto: "Primeiro acesso do colaborador: baixar extensão, fixar, inserir email e código de verificação para login automático nos sistemas." },
    { pagina: "Cadastro de Usuários", titulo: "Compartilhe o vídeo tutorial com seus usuários", url: "cadastro-usuarios/", texto: "Vídeo tutorial mostrando como instalar a extensão e acessar os sistemas de forma segura, evitando erros de suporte." },
];

const searchInputGlobal = document.querySelector('.search-input');
const searchContainerGlobal = document.getElementById('search-container');
const searchIconGlobal = document.querySelector('.search-icon');
let resultsContainer = document.getElementById('search-results');

if (!resultsContainer && searchContainerGlobal) {
    resultsContainer = document.createElement('div');
    resultsContainer.className = 'search-results';
    resultsContainer.id = 'search-results';
    searchContainerGlobal.appendChild(resultsContainer);
}

function destacarTexto(texto, busca) {
    if (!busca) return texto;
    return texto.replace(new RegExp(removerAcentos(busca), 'gi'), '<strong>$&</strong>');
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
            if (removerAcentos(item.titulo.toLowerCase()).includes(queryLimpa) || removerAcentos(item.texto.toLowerCase()).includes(queryLimpa)) {
                const link = document.createElement('a');
                link.href = `${caminhoBase}${item.url}?topico=${encodeURIComponent(item.titulo)}`;
                link.className = 'search-item';
                
                link.innerHTML = `
                    <div style="font-weight:700; color:#1e73ed;">${destacarTexto(item.titulo, queryOriginal)}</div>
                    <div style="font-size:0.8rem; color:#64748b; margin-top:3px;"><i class="fa-solid fa-folder"></i> Em: ${item.pagina}</div>
                `;
                resultsContainer.appendChild(link);
                achouAlgo = true;
            }
        });

        if (!achouAlgo) resultsContainer.innerHTML = `<div class="search-no-results">Nenhum resultado encontrado.</div>`;
        resultsContainer.classList.add('active');
    });

    searchInputGlobal.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.target.value.trim().length >= 2) {
            window.location.href = `${caminhoBase}busca/?q=${encodeURIComponent(e.target.value.trim())}`;
        }
    });

    if (searchIconGlobal) {
        searchIconGlobal.style.cursor = 'pointer';
        searchIconGlobal.addEventListener('click', () => {
            const query = searchInputGlobal.value.trim();
            if (query.length >= 2) {
                window.location.href = `${caminhoBase}busca/?q=${encodeURIComponent(query)}`;
            }
        });
    }
}

document.addEventListener('click', (e) => {
    if (searchContainerGlobal && !searchContainerGlobal.contains(e.target) && resultsContainer) {
        resultsContainer.classList.remove('active');
    }
});

// NORMALIZAÇÃO DO DIRETÓRIO DE DESTINO DENTRO DA PÁGINA DE RESULTADOS
if (window.location.pathname.includes('/busca/')) {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q');
    const conteudoArtigo = document.getElementById('conteudo-artigo');
    const subtituloArtigo = document.getElementById('subtitulo-artigo');

    if (query && conteudoArtigo) {
        const queryLimpa = removerAcentos(query.toLowerCase());
        let contagem = 0;
        let htmlResultados = '<div class="resultados-busca-container">';

        baseDeBusca.forEach(item => {
            if (removerAcentos(item.titulo.toLowerCase()).includes(queryLimpa) || removerAcentos(item.texto.toLowerCase()).includes(queryLimpa)) {
                
                const pedacoTexto = item.texto.length > 150 ? item.texto.substring(0, 150) + "..." : item.texto;
                
                // Força o retorno seguro à raiz para evitar acúmulo de subpastas quebradas
                const linkComTopico = `../${item.url}?topico=${encodeURIComponent(item.titulo)}`;

                htmlResultados += `
                    <div class="resultado-item">
                        <a href="${linkComTopico}" class="resultado-titulo" style="font-weight:800; font-size:1.15rem;">${destacarTexto(item.titulo, query)}</a>
                        <p style="font-size:0.85rem; color:#1e73ed; margin-bottom:8px; font-weight:600;">Página: ${item.pagina}</p>
                        <p class="resultado-snippet">${destacarTexto(pedacoTexto, query)}</p>
                    </div>`;
                contagem++;
            }
        });

        htmlResultados += contagem === 0 ? `<div style="text-align:center; padding: 50px; color:#64748b;">Nenhum resultado encontrado para "<strong>${query}</strong>".</div>` : '</div>';
        
        if(subtituloArtigo) subtituloArtigo.innerHTML = `Encontramos ${contagem} resultados para "<strong>${query}</strong>"`;
        conteudoArtigo.innerHTML = htmlResultados;
        document.title = `Busca por ${query} - Whom.doc9`;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const topicoDesejado = params.get('topico');

    if (topicoDesejado) {
        const headers = document.querySelectorAll('.accordion-header');
        headers.forEach(header => {
            const tituloAtual = header.textContent.trim().toLowerCase();
            
            if (tituloAtual === topicoDesejado.trim().toLowerCase()) {
                header.click();
                setTimeout(() => {
                    const offset = 100; 
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = header.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;

                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }, 300);
            }
        });
    }
});