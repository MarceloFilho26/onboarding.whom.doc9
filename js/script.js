const btnMobile = document.getElementById('btn-mobile');
const btnSearchMobile = document.getElementById('btn-search-mobile');
const searchContainer = document.getElementById('search-container');
const navbar = document.querySelector('.navbar');
const navMenu = document.querySelector('.nav-menu');

// ===================================================
// --- MENUS E NAVBAR ---
// ===================================================

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

// Auto-fecha menu mobile ao clicar em links internos
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

// Função para ignorar acentos na hora da busca (ex: função = funcao)
const removerAcentos = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// Base Detalhada para a Busca (com os textos e datas exatos)
const baseDeBusca = [
    { titulo: "Página inicial", url: "index.html", texto: "... Portal Admin Whom. Baixar extensão Whom. Site oficial doc9. Função do administrador. Configurações do sistema. Cadastro de credenciais ...", data: "3 de out. de 2025" },
    
    /* --- FUNÇÃO DO ADMIN --- */
    { titulo: "Função do Administrador", url: "artigo.html?id=funcao-admin", texto: "Função do Administrador. Funções do administrador. O administrador é responsável por gerenciar o portal Whom.doc9 ...", data: "27 de fev. de 2026" },
    { titulo: "Área de administrador no sistema Doc9", url: "artigo.html?id=funcao-admin", texto: "Para consultar ou gerenciar os Administradores cadastrados no sistema Doc9, siga o passo a passo na Área de administrador...", data: "27 de fev. de 2026" },
    { titulo: "Indicação e inclusão de administradores", url: "artigo.html?id=funcao-admin", texto: "O primeiro administrador é indicado ao nosso representante comercial na assinatura. A indicação e inclusão de novos gestores é ilimitada.", data: "27 de fev. de 2026" },
    { titulo: "Diferença entre administrador x usuário", url: "artigo.html?id=funcao-admin", texto: "Entenda a diferença entre administrador e usuário da extensão. O administrador acessa o portal, o usuário acessa pelo plugin no navegador.", data: "27 de fev. de 2026" },
    { titulo: "Responsabilidades do administrador", url: "artigo.html?id=funcao-admin", texto: "As responsabilidades do administrador incluem implementação, reuniões, materiais de onboarding e contato direto com o gestor.", data: "27 de fev. de 2026" },
    
    /* --- CONFIGURAÇÕES DO SISTEMA --- */
    { titulo: "Configurações do sistema", url: "artigo.html?id=config-sistema", texto: "Ajuste configurações globais do sistema, parâmetros de segurança, alertas, padronização de acessos e tempo de timeout.", data: "18 de mai. de 2026" },
    { titulo: "Módulo 1 - Configurações iniciais", url: "artigo.html?id=config-sistema", texto: "Módulo 1 - Configurações iniciais. Cadastrar Certificado, Cadastro de Credencial, Tipos de 2FA/MFA.", data: "18 de mai. de 2026" },
    { titulo: "Módulo 2 - Configurações de Governança", url: "artigo.html?id=config-sistema", texto: "Módulo 2 - Configurações de Governança. Parâmetros de Configuração, URLs Bloqueadas, Grupos de Usuários, Grupos de Restrições.", data: "18 de mai. de 2026" },
    { titulo: "Módulo 3 - Cadastro de Usuários", url: "artigo.html?id=config-sistema", texto: "Módulo 3 - Cadastro de Usuários. Criar uma concessão de acesso, uso da extensão WHOM por e-mail, Tutorial de acesso inicial.", data: "18 de mai. de 2026" },
    { titulo: "Módulo 4 - Gestão e administração", url: "artigo.html?id=config-sistema", texto: "Módulo 4 - Gestão e administração. Dashboards de acompanhamento, Concessão de Acesso, Histórico de Uso, Solicitação de novos sistemas.", data: "18 de mai. de 2026" },
    { titulo: "Boas Práticas", url: "artigo.html?id=config-sistema", texto: "Boas Práticas. Funcionalidades da extensão, Orientações para protocolos, Compatibilidade da Extensão, Login nos tribunais sem certificado, Autenticação nos PJEs.", data: "18 de mai. de 2026" },
    { titulo: "Canais de Relacionamento (Configurações)", url: "artigo.html?id=config-sistema", texto: "Canais de Relacionamento. Suporte Técnico abertura de tickets extensão gestores de conta treinamentos orientações onboarding.", data: "18 de mai. de 2026" },

    /* --- CANAIS DE RELACIONAMENTO --- */
    { titulo: "Canais de Relacionamento", url: "artigo.html?id=canais-relacionamento", texto: "canais relacionamento suporte atendimento chamados help desk tickets whatsapp 555189402369 email atendimento@doc9.movidesk.com gestor contas onboarding treinamentos", data: "18 de mai. de 2026" },

    /* --- DEMAIS CARDS --- */
    { titulo: "Cadastro de credenciais", url: "artigo.html?id=cadastro-credenciais", texto: "Realize o cadastro de credenciais, senhas, acessos a certificados digitais, adequação LGPD e revogação de perfis.", data: "15 de jan. de 2026" },
    { titulo: "Uso da extensão", url: "artigo.html?id=uso-extensao", texto: "uso extensão plugin navegador chrome web store login automatizado", data: "20 de jan. de 2026" },
    { titulo: "Orientações técnicas", url: "artigo.html?id=orientacoes-tecnicas", texto: "orientações técnicas infraestrutura requisitos conformidade iso 27001 pje cnj", data: "22 de jan. de 2026" },
    { titulo: "Cadastro de Usuários", url: "artigo.html?id=cadastro-usuarios", texto: "cadastro usuários equipe perfis convites onboarding mapeamento hierarquia", data: "25 de jan. de 2026" },
    { titulo: "Tutoriais rápidos", url: "artigo.html?id=tutoriais-rapidos", texto: "tutoriais rápidos vídeos guias passo a passo ajuda microlearning", data: "30 de jan. de 2026" }
];

// O TEXTO COMPLETO DAS PÁGINAS (Para injetar quando clicar no artigo)
const bancoDeDados = {
    "funcao-admin": {
        titulo: "Função do administrador",
        subtitulo: "Entenda as responsabilidades, permissões e níveis de acesso dentro da plataforma.",
        html: `
            <div class="artigo-layout">
                <div class="artigo-sidebar">
                    <img src="img/img_1.png" alt="Função do Administrador" style="max-width: 100%; height: auto; object-fit: contain;">
                    <h3 style="color: #00338d; margin-top: 20px; font-size: 1.2rem; font-weight: 700;">Central de ajuda ao administrador</h3>
                    <p style="color: #64748b; font-size: 0.95rem; margin-top: 10px; line-height: 1.6;">Nesta seção você encontra tudo relacionado ao papel de gestão e governança do Whom.</p>
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
                                Área de administrador no sistema Doc9
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
                                    <div style="background: #e0f2fe; border-left: 4px solid #0284c7; padding: 12px; border-radius: 4px; margin-top: 15px; color: #0369a1;"><strong>💡 Dica:</strong> É possível criar novos administradores, editar permissões ou inativar acessos.</div>
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
                                    <p style="border-top: 1px dashed #e2e8f0; padding-top: 10px; font-style: italic; color: #475569;">Nota: Um administrador também pode ser usuário da extensão, desde que esteja cadastrado para isso.</p>
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
                                    <p>Além da gestão, o administrador é responsável pela implementação da ferramenta, participando de:</p>
                                    <ul style="margin: 12px 0 0 20px; list-style-type: square; line-height: 1.8;">
                                        <li>Reuniões de implementação</li>
                                        <li>Recebimento de materiais de administração</li>
                                        <li>Contato direto com o gestor de Onboarding e, posteriormente, com o gestor de contas</li>
                                    </ul>
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
        subtitulo: "Ajuste as preferências, regras de segurança e governança.",
        html: `
            <div class="artigo-layout">
                <div class="artigo-sidebar">
                    <img src="img/img_2.png" alt="Configurações do Sistema" style="max-width: 100%; height: auto; object-fit: contain;">
                    <h3 style="color: #00338d; margin-top: 20px; font-size: 1.2rem; font-weight: 700;">Configurações do sistema</h3>
                    <p style="color: #64748b; font-size: 0.95rem; margin-top: 10px; line-height: 1.6;">Nesta seção você encontra os módulos de configuração essenciais para o funcionamento do Whom.</p>
                </div>
                <div class="artigo-main">
                    <div class="accordion">
                        
                        <div class="accordion-item">
                            <button class="accordion-header">
                                Módulo 1 - Configurações iniciais
                                <svg class="accordion-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </button>
                            <div class="accordion-content">
                                <div class="accordion-content-inner">
                                    <p>Você encontrará orientações sobre:</p>
                                    <ul style="margin: 12px 0 20px 20px; list-style-type: disc; line-height: 1.6;">
                                        <li><strong>Cadastrar Certificado:</strong> permite registrar certificados no portal, garantindo que os usuários tenham acesso autorizado aos sistemas.</li>
                                        <li><strong>Cadastro de Credencial:</strong> centraliza o registro de certificados, logins e autenticações (inclusive 2FA), garantindo o acesso correto e seguro aos sistemas integrados.</li>
                                    </ul>
                                    <p style="margin-top: 10px;">➡️ <a href="#" style="color: #1e73ed; font-weight: 600; text-decoration: none;">Acessar Módulo 1.</a></p>
                                    <p style="margin-top: 5px;">➡️ <a href="#" style="color: #1e73ed; font-weight: 600; text-decoration: none;">Acessar Tipos de 2FA/MFA.</a></p>
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item">
                            <button class="accordion-header">
                                Módulo 2 - Configurações de governança
                                <svg class="accordion-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </button>
                            <div class="accordion-content">
                                <div class="accordion-content-inner">
                                    <p>Aqui você encontrará informações sobre:</p>
                                    <ul style="margin: 12px 0 20px 20px; list-style-type: disc; line-height: 1.6;">
                                        <li><strong>Parâmetros de Configuração:</strong> o administrador aplica camadas extras de segurança, como restrições de IP, domínio, horários, navegador e notificações automáticas.</li>
                                        <li><strong>URLs Bloqueadas:</strong> a possibilidade de restringir áreas específicas de sistemas, mediante bloqueio de URLs fixas.</li>
                                        <li><strong>Grupos de Usuários:</strong> vinculam colaboradores a centros de custo.</li>
                                        <li><strong>Grupos de Restrições:</strong> definem regras personalizadas de uso e acesso para as equipes.</li>
                                    </ul>
                                    <p style="margin-top: 10px;">➡️ <a href="#" style="color: #1e73ed; font-weight: 600; text-decoration: none;">Acessar Módulo 2.</a></p>
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item">
                            <button class="accordion-header">
                                Módulo 3 - Cadastro de usuários
                                <svg class="accordion-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </button>
                            <div class="accordion-content">
                                <div class="accordion-content-inner">
                                    <p>Você encontrará orientações de como:</p>
                                    <ul style="margin: 12px 0 20px 20px; list-style-type: disc; line-height: 1.6;">
                                        <li>Criar uma concessão de acesso, permitindo cadastrar colaboradores (usuários), vinculá-los a certificados e sistemas.</li>
                                        <li>As instruções de uso da extensão WHOM por e-mail.</li>
                                        <li>Tutorial de acesso e acesso inicial.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item">
                            <button class="accordion-header">
                                Módulo 4 - Gestão e administração
                                <svg class="accordion-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </button>
                            <div class="accordion-content">
                                <div class="accordion-content-inner">
                                    <p>Aqui você encontra as principais ferramentas de controle:</p>
                                    <ul style="margin: 12px 0 20px 20px; list-style-type: disc; line-height: 1.6;">
                                        <li><strong>Dashboards de acompanhamento:</strong> Centralizam indicadores de certificados, usuários e acessos em gráficos atualizados automaticamente.</li>
                                        <li><strong>Concessão de Acesso:</strong> Permite gerenciar usuários com opções de edição, filtros, exportação e ações em lote.</li>
                                        <li><strong>Histórico de Uso:</strong> Registra acessos detalhados, com filtros de auditoria e envio de relatórios por e-mail.</li>
                                        <li><strong>Solicitação de novos sistemas:</strong> Disponibiliza formulário para pedir novos acessos, avaliados e desenvolvidos pela equipe.</li>
                                    </ul>
                                    <p style="margin-top: 10px;">➡️ <a href="#" style="color: #1e73ed; font-weight: 600; text-decoration: none;">Acessar Módulo 4.</a></p>
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item">
                            <button class="accordion-header">
                                Boas práticas
                                <svg class="accordion-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </button>
                            <div class="accordion-content">
                                <div class="accordion-content-inner">
                                    <p>Aqui estão reunidas as orientações para que você tenha a melhor experiência com o WHOM:</p>
                                    <ul style="margin: 12px 0 20px 20px; list-style-type: disc; line-height: 1.6;">
                                        <li><strong>Funcionalidades da extensão:</strong> Permite favoritar sistemas, acessar novidades, abrir chamados de suporte e sair da conta.</li>
                                        <li><strong>Orientações para protocolos:</strong> O WHOM realiza automaticamente a assinatura das peças, sem necessidade de assinadores externos.</li>
                                        <li><strong>Compatibilidade da Extensão:</strong> Funciona apenas no Google Chrome e Microsoft Edge, não sendo suportada em outros navegadores.</li>
                                        <li><strong>Login nos tribunais sem certificado:</strong> O acesso é feito pela extensão do WHOM, que garante permissões e rastreabilidade.</li>
                                        <li><strong>Autenticação nos PJEs sem PJe Office e Shodo:</strong> O WHOM já atende todos os requisitos técnicos para autenticação.</li>
                                        <li><strong>Protocolos sem assinadores externos:</strong> O WHOM realiza a assinatura automática no formato exigido pelo tribunal.</li>
                                        <li><strong>Orientações técnicas:</strong> Todos os ajustes técnicos necessários que incluem: liberar domínios no firewall/antivírus, garantir e-mails corretos e fora do spam, evitar conflitos com extensões, e cadastrar whitelist para pleno funcionamento do WHOM.</li>
                                    </ul>
                                    <p style="margin-top: 10px;">➡️ <a href="#" style="color: #1e73ed; font-weight: 600; text-decoration: none;">Acessar Boas Práticas.</a></p>
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item">
                            <button class="accordion-header">
                                Canais de relacionamento
                                <svg class="accordion-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </button>
                            <div class="accordion-content">
                                <div class="accordion-content-inner">
                                    <ul style="margin: 12px 0 20px 20px; list-style-type: disc; line-height: 1.6;">
                                        <li><strong>Suporte técnico:</strong> abertura de tickets diretamente pela extensão, no botão Suporte > Novo chamado.</li>
                                        <li><strong>Gestores de conta:</strong> disponíveis para apoio estratégico e administrativo.</li>
                                        <li><strong>Treinamentos e orientações:</strong> direcionados ao gestor de Onboarding responsável pela implementação.</li>
                                    </ul>
                                    <p style="margin-top: 10px;">➡️ <a href="#" style="color: #1e73ed; font-weight: 600; text-decoration: none;">Acessar Canais de Relacionamento.</a></p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        `
    },
    "canais-relacionamento": {
        titulo: "Canais de Relacionamento",
        subtitulo: "Fale com nossa central de suporte, tire dúvidas e acompanhe chamados.",
        html: `
            <div class="artigo-layout">
                <div class="artigo-sidebar">
                    <img src="img/img_7.png" alt="Canais de Relacionamento" style="max-width: 100%; height: auto; object-fit: contain;">
                    <h3 style="color: #00338d; margin-top: 20px; font-size: 1.2rem; font-weight: 700;">Atendimento e suporte</h3>
                    <p style="color: #64748b; font-size: 0.95rem; margin-top: 10px; line-height: 1.6;">Encontre os canais oficiais para suporte técnico, contato com gestores e treinamentos.</p>
                </div>
                <div class="artigo-main">
                    <div class="accordion">
                        
                        <div class="accordion-item">
                            <button class="accordion-header">
                                Suporte técnico (abertura de tickets)
                                <svg class="accordion-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </button>
                            <div class="accordion-content">
                                <div class="accordion-content-inner">
                                    <p>Todos os usuários podem abrir chamados para suporte diretamente pela extensão Whom. Esse é o canal oficial para reportar problemas, falhas ou dificuldades de uso.</p>
                                    <h4 style="color: #00338d; margin-top: 15px; margin-bottom: 10px; font-weight: 700;">Passo a passo:</h4>
                                    <ol style="margin: 12px 0 20px 20px; line-height: 2;">
                                        <li>Clique no botão <strong>“Suporte”</strong> na parte inferior da extensão.</li>
                                        <li>Selecione a opção <strong>“Novo chamado”</strong>.</li>
                                        <li>Preencha todos os campos obrigatórios.</li>
                                        <li>Clique em <strong>Enviar</strong>.</li>
                                    </ol>
                                    <div style="background: #f8fafc; border-left: 4px solid #1e73ed; padding: 12px; border-radius: 4px; margin-top: 15px; color: #334155;">➡️ Após o envio, nossa equipe de atendimento analisará sua solicitação e dará o retorno pelo canal cadastrado.</div>
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item">
                            <button class="accordion-header">
                                Atendimento por E-mail e WhatsApp
                                <svg class="accordion-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </button>
                            <div class="accordion-content">
                                <div class="accordion-content-inner">
                                    <p style="margin-bottom: 10px;"><strong>Por e-mail:</strong><br>Envie sua solicitação diretamente para: <a href="mailto:atendimento@doc9.movidesk.com" style="color: #1e73ed; font-weight: 600; text-decoration: none;">atendimento@doc9.movidesk.com</a></p>
                                    <p style="margin-bottom: 10px;"><strong>Por WhatsApp:</strong><br>Para um atendimento ágil e direto, envie uma mensagem para o nosso WhatsApp no número <strong>+55 (51) 8940-2369</strong> e fale com o seu gestor de contas para obter ajuda.</p>
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item">
                            <button class="accordion-header">
                                Orientações e treinamentos
                                <svg class="accordion-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </button>
                            <div class="accordion-content">
                                <div class="accordion-content-inner">
                                    <p>As dúvidas relacionadas a orientações gerais ou treinamentos devem ser direcionadas ao <strong>gestor de onboarding</strong>, responsável pela implementação da ferramenta na sua empresa.</p>
                                    <p style="margin-top: 10px;">➡️ O contato desse gestor é apresentado ao administrador logo no início do uso da plataforma.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        `
    },
    "cadastro-credenciais": {
        titulo: "Cadastro de credenciais",
        subtitulo: "Gerencie logins e permissões de forma centralizada.",
        html: `<div style="text-align: center; padding: 50px;"><img src="img/img_3.png" style="max-width: 200px;"><h2 style="color: #00338d; margin-top: 20px;">Área em Desenvolvimento</h2></div>`
    },
    "uso-extensao": {
        titulo: "Uso da extensão",
        subtitulo: "Dicas práticas para instalar e otimizar o uso diário no seu navegador.",
        html: `<div style="text-align: center; padding: 50px;"><img src="img/img_4.png" style="max-width: 200px;"><h2 style="color: #00338d; margin-top: 20px;">Área em Desenvolvimento</h2></div>`
    },
    "orientacoes-tecnicas": {
        titulo: "Orientações técnicas",
        subtitulo: "Configurações avançadas, requisitos de infraestrutura e parâmetros do sistema.",
        html: `<div style="text-align: center; padding: 50px;"><img src="img/img_5.png" style="max-width: 200px;"><h2 style="color: #00338d; margin-top: 20px;">Área em Desenvolvimento</h2></div>`
    },
    "cadastro-usuarios": {
        titulo: "Cadastro de Usuários",
        subtitulo: "Adicione, gerencie e configure novos perfis para a sua equipe.",
        html: `<div style="text-align: center; padding: 50px;"><img src="img/img_6.png" style="max-width: 200px;"><h2 style="color: #00338d; margin-top: 20px;">Área em Desenvolvimento</h2></div>`
    },
    "tutoriais-rapidos": {
        titulo: "Tutoriais rápidos",
        subtitulo: "Vídeos e guias práticos direto ao ponto para otimizar o seu dia a dia.",
        html: `<div style="text-align: center; padding: 50px;"><img src="img/img_8.png" style="max-width: 200px;"><h2 style="color: #00338d; margin-top: 20px;">Área em Desenvolvimento</h2></div>`
    }
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

// Função para deixar o texto buscado em negrito
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
        
        // CENA 1: CLICOU EM UM CARD
        if (artigoId && bancoDeDados[artigoId]) {
            const dados = bancoDeDados[artigoId];
            tituloArtigo.innerHTML = dados.titulo;
            subtituloArtigo.innerHTML = dados.subtitulo;
            conteudoArtigo.innerHTML = dados.html;
            document.title = dados.titulo + " - Whom.doc9";
            ativarAcordeoes();
        
        // CENA 2: APERTOU ENTER NA LUPA
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