// importação
const $ = require('jquery');
require('bootstrap');
const Highcharts = require('highcharts');
const { format, parseISO } = require('date-fns');
const io = require('socket.io-client');

//funcao de inicializacao o realtime de pedido na inicializacao do sistema
$(document).ready(function () {
  socketPedidioRealTime();
  retornoEstadoLoja();
});

// funcao para gerar mensagem de erro
function mensagemDeErro(mensagem) {
  document.getElementById('mensagemDeErro').innerHTML = `<div class="toast shadow-lg mb-5 bg-white rounded" role="alert" data-delay="5000" aria-atomic="true" style="opacity:0.9;">
        <div class="toast-header bg-dangertext-light">
            <span class="fas fa-exclamation-triangle" style="margin-right:5px;"></span>
            <strong class="mr-auto">Atenção</strong>
            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="toast-body">
            <strong>${mensagem}</strong>
        </div>
    </div>`;
  $('.toast').toast('show');
}

//funcao para gerar mensagem de erro no modal
function mensagemDeErroModal(mensagem) {
  document.getElementById('mensagemDeErroModal').innerHTML = `<span class="badge badge-danger h5">${mensagem}</span>`;
  $('#mensagemDeErroModal').animate({ width: 'show' });
  limparTelaMensagemModal();
}

// funcao para gerar mensagem de aviso
function mensagemDeAviso(mensagem) {
  document.getElementById('mensagemDeErro').innerHTML = `<div class="toast shadow-lg mb-5 bg-white rounded" role="alert" data-delay="5000" aria-atomic="true" style="opacity:0.9;">
        <div class="toast-header bg-success text-light">
            <span class="fas fa-check-double" style="margin-right:5px;"></span>
            <strong class="mr-auto">Informação</strong>
            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="toast-body">
            <strong>${mensagem}</strong>
        </div>
    </div>`;
  $('.toast').toast('show');
}

//funcao para limpar a tela de mensagens do modal
function limparTelaMensagemModal() {
  setTimeout(function () {
    $('#mensagemDeErroModal').animate({ width: 'hide' });
  }, 3000);
}

// funcao resopnsavel por validar os dados preenchidos nos campos
function validaDadosCampo(campo) {
  let validacao = true;
  for (let item of campo) {
    if ($(item).val() == '' || $(item).val() == null) validacao = false;
  }

  return validacao;
}

// funcao responsavel por validar valores invalidos nos campos(valores negativos e zerados)
function validaValoresCampo(campo) {
  let validacao = true;
  for (let item of campo) {
    if (parseFloat($(item).val()) < 0.0) validacao = false;
  }

  return validacao;
}

// funcao de animacao da janela2
function animacaoJanela2() {
  $('#janela2').fadeOut(10);
  $('#janela2').fadeIn(500);
}

// funcao responsavel por alertar ao cliente se ele realmente deseja efetuar umas determinada acao
function confirmarAcao(mensagem, funcao, value) {
  let codigoHTML = ``;

  codigoHTML += `<div class="modal" id="alertaConfirmacao" data-backdrop="static" data-keyboard="false" role="dialog" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel"><span class="fas fa-exclamation-triangle"></span> Atenção</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p class="text-danger"><strong>${mensagem} Deseja continuar?</strong></p>
          </div>
          <div class="modal-footer">
          <button onclick="document.getElementById(\'modal\').innerHTML=\'\';" type="button" class="btn btn-outline-dark" data-dismiss="modal"><span class="fas fa-times iconsTam"></span> Não</button>`;
  if (value == null) {
    codigoHTML += `<button onclick="${funcao}; document.getElementById('modal').innerHTML='';" type="button" class="btn btn-danger" data-dismiss="modal"><span class="fas fa-check iconsTam"></span> Sim</button>`;
  } else {
    codigoHTML += `<button onclick="${funcao}; document.getElementById('modal').innerHTML='';" value="${value}" type="button" class="btn btn-danger" data-dismiss="modal"><span class="fas fa-check iconsTam"></span> Sim</button>`;
  }
  codigoHTML += `</div>
        </div>
      </div>
    </div>`;
  document.getElementById('alert2').innerHTML = codigoHTML;
  $('#alertaConfirmacao').modal('show');
}

// funcao responsavel por manipular o tamanho da string de exibição(caso seja muito grande)
function corrigirTamanhoString(tamMax, texto) {
  if (texto.toString().length > tamMax) {
    texto = texto.substr(0, tamMax);
    texto += '...';
  }
  return texto;
}

//funcao responsavel por exbir cor diferente no campor incorreto
function mostrarCamposIncorreto(campo) {
  for (let item of campo) {
    document.getElementById(item).classList.add('border');
    document.getElementById(item).classList.add('border-danger');
    setTimeout(function () {
      document.getElementById(item).classList.remove('border');
      document.getElementById(item).classList.remove('border-danger');
    }, 2000);
  }
}

// funcao responsavel por buscar a sessao do usuario
function buscarSessionUser() {
  return JSON.parse(sessionStorage.getItem('loginDarya'));
}

//funcao responsavel por gerar a tela de aguarde o carregamento
let timerCarregador;
function aguardeCarregamento(tipo) {
  let contCarregador = 0,
    codigoHTML = `<div style="background-color: rgba(0, 0, 0, 0.8); position: absolute; height: 99.2vh; width: 100vw; z-index:1055; border-radius:10px;">
      <h5 class="text-center text-light">
        <img src="./img/loading.gif" class="rounded mx-auto d-block" style="height: 40px; width: 40px; margin-top: 48vh;">
        Aguarde...
      </h5>
    <div>`;
  if (tipo) {
    document.getElementById('carregamento').innerHTML = codigoHTML;
    clearInterval(timerCarregador);
    timerCarregador = setInterval(function () {
      contCarregador++;

      if (contCarregador > 20) {
        codigoHTML = `<div style="background-color: rgba(0, 0, 0, 0.8); position: absolute; height: 99.2vh; width: 100vw; z-index:1055; border-radius:10px;">
            <h5 class="text-center text-light" style="margin-top: 48vh;">
              Ops... Ouve algum problema! Tente novamente.
            </h5>
            <h6 class="text-center text-light">
              Aguarde 10 segundos para tentar novemante.
            </h6>
          <div>`;
        document.getElementById('carregamento').innerHTML = codigoHTML;
        clearInterval(timerCarregador);

        setTimeout(function () {
          document.getElementById('carregamento').innerHTML = '';
        }, 10000);
      } else {
        clearInterval(timerCarregador);
        setTimeout(function () {
          document.getElementById('carregamento').innerHTML = '';
        }, 300);
      }
    });
  }
}
