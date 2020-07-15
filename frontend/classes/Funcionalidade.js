//funcao de inicializacao basica funcionalidade
$(document).ready(function () {
  limparTelaDeMensagem();
})

// funcao para gerar mensagem de erro
function mensagemDeErro(mensagem) {
  document.getElementById(
    'mensagemDeErro'
  ).innerHTML = `<span class="badge badge-danger h5">${mensagem}</span>`
  $('#mensagemDeErro').animate({ width: 'show' })
  limparTelaDeMensagem()
}

// funcao para gerar mensagem de aviso
function mensagemDeAviso(mensagem) {
  document.getElementById(
    'mensagemDeErro'
  ).innerHTML = `<span class="badge badge-success h5">${mensagem}</span>`
  $('#mensagemDeErro').animate({ width: 'show' })
  limparTelaDeMensagem()
}

// funcao para limpar tela de mensagens
function limparTelaDeMensagem() {
  setTimeout(function () {
    $('#mensagemDeErro').animate({ width: 'hide' })
  }, 3000)
}

// funcao resopnsavel por validar os dados preenchidos nos campos
function validaDadosCampo(campo) {
  let validacao = true
  campo.forEach(function (item) {
    if ($(item).val() == '' || $(item).val() == null) validacao = false
  })

  return validacao
}

// funcao responsavel por validar valores invalidos nos campos(valores negativos e zerados)
function validaValoresCampo(campo) {
  let validacao = true
  campo.forEach(function (item) {
    if (parseFloat($(item).val()) < 0.0 || parseFloat($(item).val()) == 0.0)
      validacao = false
  })

  return validacao
}

// funcao de animacao da janela2
function animacaoJanela2() {
  $('#janela2').fadeOut(100)
  $('#janela2').fadeIn(100)
}

// funcao responsavel por alertar ao cliente se ele realmente deseja efetuar umas determinada acao
function confirmarAcao(mensagem, funcao) {
  let codigoHTML = ``

  codigoHTML += `<div class="modal" id="alertaConfirmacao" data-backdrop="static" data-keyboard="false" role="dialog" aria-hidden="true">
      <div class="modal-dialog float-left">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p class="text-danger"><strong>${mensagem} Deseja continuar?</strong></p>
          </div>
          <div class="modal-footer">
          <button onclick="document.getElementById(\'modal\').innerHTML=\'\';" type="button" class="btn btn-outline-dark" data-dismiss="modal"><span class="fas fa-times iconsTam"></span> Não</button>
            <button onclick="${funcao}; document.getElementById('modal').innerHTML='';" type="button" class="btn btn-danger" data-dismiss="modal"><span class="fas fa-check iconsTam"></span> Sim</button>
          </div>
        </div>
      </div>
    </div>`


  document.getElementById('alert2').innerHTML = codigoHTML;
  $('#alertaConfirmacao').modal('show')
}

// funcao responsavel por manipular o tamanho da string de exibição(caso seja muito grande)
function corrigirTamanhoString(tamMax, texto) {
  if (texto.toString().length > tamMax) {
    texto = texto.substr(0, tamMax)
    texto += '...'
  }
  return texto
}

//funcao responsavel por exbir cor diferente no campor incorreto
function mostrarCamposIncorreto(campo) {
  campo.forEach(function (item) {
    document.getElementById(item).classList.add('border');
    document.getElementById(item).classList.add('border-danger');
    setTimeout(function () {
      document.getElementById(item).classList.remove('border');
      document.getElementById(item).classList.remove('border-danger')
    }, 2000)
  });
}