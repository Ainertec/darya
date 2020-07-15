// --------------------------------------------- TELA INICIAL -----------------------------------------------------



//funcao menu de opcaoes para pedido
function TelaConfigurarSerial() {
    var codigoHTML;

    codigoHTML = '<h4 class="text-center">Serial Atual</h4>'
    codigoHTML += '<h5 class="text-center" style="margin-top:50px">Data Atual: <span class="badge badge-success">' + localStorage.getItem("dataAtual") + '</span> - Licença até: <span class="badge badge-danger">' + localStorage.getItem("dataFim") + '</span></h5>'
    codigoHTML += '<hr class="my-6 bg-dark" style="margin-top:50px">'
    codigoHTML += '<h4 class="text-center" style="margin-top:50px">Cadastrar Novo Serial</h4>'
    codigoHTML += '<form style="margin-top:50px">'
    codigoHTML += '<div class="form-row">'
    codigoHTML += '<input id="dataFim" type="date" class="form-control col-md-8" placeholder="Número Pedido">'
    codigoHTML += '<button onclick="cadastrarSerial();" type="button" class="btn btn-light border border-dark col-md-3">'
    codigoHTML += '<span class="fas fa-search"></span> Cadastrar'
    codigoHTML += '</button>'
    codigoHTML += '</div>'
    codigoHTML += '</form>'

    document.getElementById('janela2').innerHTML = codigoHTML;
}











// --------------------------------------------- AUTENTICACAO -----------------------------------------------------



//funcao para autenticar o acesso as configuracao de serial
function autenticacaoSerial() {
    if (document.getElementById('senha').value == "52164521655455362") {
        TelaConfigurarSerial();
    }
}











// --------------------------------------------- CADASTRO -----------------------------------------------------



//funcao para cadastrar serial
function cadastrarSerial() {
    var date = new Date();

    localStorage.removeItem("dataFim");
    localStorage.removeItem("dataAtual");
    localStorage.setItem("dataFim", $("#dataFim").val());
    localStorage.setItem("dataAtual", date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());

}











// --------------------------------------------- VERIFICACAO DE SERIAL -----------------------------------------------------



//function para verificar o serial
function verificarValidadeSerial() {
    var dataFim = new Date(localStorage.getItem("dataFim"));
    var dataEmMemoria = new Date(localStorage.getItem("dataAtual"));
    var date = new Date();
    var dataAtual = new Date(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
    var codicao = false;

    if (localStorage.getItem("dataFim") == "") {
        codicao = true;
    } else {
        if (dataEmMemoria <= dataAtual) {
            localStorage.removeItem("dataAtual");
            localStorage.setItem("dataAtual", date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());

            if (dataFim > dataAtual) {
                codicao = true;
            } else {
                mensagemDeErro("Licença vencida!");
            }

        } else {
            mensagemDeErro("Atenção relógio atrasado!");
        }
    }

    return codicao;
}