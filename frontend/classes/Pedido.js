// ------------------------------------------- Classe Pedido ------------------------------------------

let VETORDEPEDIDOSCLASSEPEDIDO = [],
  VETORDEPRODUTOSCLASSEPEDIDO = [],
  DADOSPEDIDO = JSON.parse(`{}`);

//funcao responsavel por gerar o modal de retirada local ou envio
function modalRetiradaLocalouEnvio() {
  let codigoHTML = ``;

  codigoHTML += `<div class="modal fade" id="modalRetiradaPedido" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable">
                        <div class="modal-content">
                          <div class="modal-header">
                              <h5 class="modal-title" id="staticBackdropLabel"><span class="fas fa-pallet"></span> Forma de retirada</h5>
                              <button onclick="inicializarVariaveisClassePedido();" type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                              </button>
                          </div>
                          <div class="modal-body">
                            <button onclick="telaModalDeCriacaoDePedido('cadastrar', true);" type="button" class="btn btn-light btn-lg btn-block border-dark" data-dismiss="modal" style="height: 150px;">
                              <span class="fas fa-truck-loading"></span> Enviar pedido
                            </button>
                            <button onclick="telaModalDeCriacaoDePedido('cadastrar', false);" type="button" class="btn btn-light btn-lg btn-block border-dark" data-dismiss="modal" style="height: 150px;">
                              <span class="fas fa-people-carry"></span> Retirar no local
                            </button>  
                          </div>
                        </div>
                    </div>
                </div>`

  document.getElementById('modal').innerHTML = codigoHTML;
  $('#modalRetiradaPedido').modal('show');
}

//funcao responsavel por gerar a tela de criar pedido
function telaModalDeCriacaoDePedido(tipo, enviarPedido) {
  let codigoHTML = ``;

  codigoHTML += `<div class="modal fade" id="modalCriarPedidoClassePedido" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel"><span class="fas fa-shopping-basket"></span> Dados do Pedido</h5>
                    <button onclick="inicializarVariaveisClassePedido();" type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                    <div id="mensagemDeErroModal" class="justify-content-center"></div>
                </div>
                <div class="modal-body">

                    <div id="pagCliente">
                        <div id="buscarDadosClientes">
                          <h5 class="text-center" style="margin-top: 30px;"><span class="fas fa-user"></span> Buscar Cliente</h5>
                          <div class="card-deck col-10 mx-auto d-block">
                              <div class="input-group mb-3">
                                  <input id="nometelefonecliente" type="text" class="form-control form-control-sm mousetrap" placeholder="Nome do cliente">
                                  <button onclick="if(validaDadosCampo(['#nometelefonecliente'])){criarListagemDeBuscaDeClientes('nome'); $('#formuDadosClientePedido').fadeOut(); $('#respostaClienteParaPedido').fadeIn();}else{mensagemDeErroModal('Preencha o campo nome do cliente!'); mostrarCamposIncorreto(['nometelefonecliente'])}" type="button" class="btn btn-outline-info btn-sm">
                                      <span class="fas fa-search"></span> Buscar por Telefone
                                  </button>
                                  <button onclick="if(validaDadosCampo(['#nometelefonecliente'])){criarListagemDeBuscaDeClientes('nome'); $('#formuDadosClientePedido').fadeOut(); $('#respostaClienteParaPedido').fadeIn();}else{mensagemDeErroModal('Preencha o campo nome do cliente!'); mostrarCamposIncorreto(['nometelefonecliente'])}" type="button" class="btn btn-outline-info btn-sm">
                                      <span class="fas fa-search"></span> Buscar por Nome
                                  </button>
                                  <br/>
                                  <button onclick="criarListagemDeBuscaDeClientes('todos'); $('#formuDadosClientePedido').fadeOut(); $('#respostaClienteParaPedido').fadeIn();" type="button" class="btn btn-outline-info btn-block btn-sm" style="margin-top:10px;">
                                      <span class="fas fa-search-plus"></span> Exibir todos
                                  </button>
                              </div>
                          </div>
                          <div id="respostaClienteParaPedido"></div>
                        </div>

                        <form id="formuDadosClientePedido" style="margin-top:20px;">
                            <div class="form-group">
                                <label for="nomecliente">Nome:</label>
                                <input type="text" class="form-control" id="nomecliente" placeholder="Nome do cliente" disabled>
                            </div>`
  if (enviarPedido) {
    codigoHTML += `<div class="form-group">
                                <label for="telefonecliente">Telefone:</label>
                                <select class="form-control form-control-sm" id="telefonecliente">
                                </select>
                              </div>
                              <div class="form-group">
                                  <label for="enderecocliente">Endereço:</label>
                                  <select class="form-control form-control-sm" id="enderecocliente">
                                  </select>
                              </div>`
  }
  codigoHTML += `</form>


                    </div>
                    
                    <div id="pagProduto">
                        <h5 class="text-center" style="margin-top: 30px;"><span class="fas fa-hamburger"></span> Buscar Produtos</h5>
                        <div class="card-deck col-10 mx-auto d-block">
                            <div class="input-group mb-3">
                                <input id="nomeproduto" type="text" class="form-control form-control-sm mousetrap" placeholder="Nome do produto">
                                <button onclick="if(validaDadosCampo(['#nomeproduto'])){criarListagemDeBuscaDeProduto('nome');}else{mensagemDeErroModal('Preencha o campo nome do produto!'); mostrarCamposIncorreto(['nomeproduto']);}" type="button" class="btn btn-outline-info btn-sm">
                                    <span class="fas fa-search"></span> Buscar
                                </button>
                                <br/>
                                <button onclick="criarListagemDeBuscaDeProduto('todos');" type="button" class="btn btn-outline-info btn-block btn-sm" style="margin-top:10px;">
                                    <span class="fas fa-search-plus"></span> Exibir todos
                                </button>
                            </div>
                        </div>
                        <div class="card bg-warning">
                          <div class="card-body">
                            <div id="respostaProdutoParaPedido"></div>
                          </div>
                        </div>

                        <div class="card bg-info" style="margin-top:20px">
                          <div class="card-body">
                            <h5 class="text-center" style="margin-bottom: 20px; margin-top: 15px;"><span class="fas fa-hamburger"></span> Produtos Adicionados</h5>
                            <table class="table table-sm col-12 mx-auto" style="margin-top:20px">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col">Nome</th>
                                        <th scope="col">Preço</th>
                                        <th scope="col">Quantidade</th>
                                        <th scope="col">Remover</th>
                                    </tr>
                                </thead>
                                <tbody id="listagemDeProdutoSelecionadoPedido">
                                    
                                </tbody>
                            </table>
                          </div>
                        </div>

                    </div>

                    <div id="pagMotoboy">`
  if (enviarPedido) {
    codigoHTML += `<div id="buscarDadosMotoboy">
                          <h5 class="text-center" style="margin-top: 30px;"><span class="fas fa-motorcycle"></span> Buscar Motoboys</h5>
                          <div class="card-deck col-10 mx-auto d-block">
                              <div class="input-group mb-3">
                                  <input id="nomeMotoboyPedido" type="text" class="form-control form-control-sm mousetrap" placeholder="Nome do motoboy">
                                  <button onclick="if(validaDadosCampo(['#nomeMotoboyPedido'])){criarListagemDeBuscaDeMotoboy('nome'); $('#formuDadoMotoboyPedido').fadeOut(); $('#respostaMotoboyParaPedido').fadeIn();}else{mensagemDeErroModal('Preencha o campo nome do motoboy!'); mostrarCamposIncorreto(['nomeMotoboyPedido']);}" type="button" class="btn btn-outline-info btn-sm">
                                      <span class="fas fa-search"></span> Buscar
                                  </button>
                                  <br/>
                                  <button onclick="criarListagemDeBuscaDeMotoboy('ativos'); $('#formuDadoMotoboyPedido').fadeOut(); $('#respostaMotoboyParaPedido').fadeIn();" type="button" class="btn btn-outline-info btn-block btn-sm" style="margin-top:10px;">
                                      <span class="fas fa-search-plus"></span> Exibir todos
                                  </button>
                              </div>
                          </div>
                          <div id="respostaMotoboyParaPedido"></div>
                        </div>                      
    
                          <form id="formuDadoMotoboyPedido" style="margin-top:20px;">
                            <div class="form-group">
                                <label for="nomemotoboy">Nome:</label>
                                <input type="text" class="form-control" id="nomemotoboy" placeholder="Nome do cliente" disabled>
                            </div>
                            <div class="form-group">
                                <label for="telefonemotoboy">Telefone:</label>
                                <input type="text" class="form-control" id="telefonemotoboy" placeholder="Exemplo: (00)00000-0000" disabled>
                            </div>
                          </form>`
  } else {
    codigoHTML += `<h5 class="text-center" style="margin-bottom: 40px; margin-top: 30px;"><span class="fas fa-motorcycle"></span> Dados Motoboy</h5>
    <h6 class="text-center" style="margin-top:20px;"><span class="fas fa-exclamation-triangle"></span> Opção retirar pedido no local selecionada!</h6>`
  }
  codigoHTML += `</div>
                    <div id="pagExtra">
                        <h5 class="text-center" style="margin-bottom: 40px; margin-top: 30px;"><span class="fas fa-info"></span> Informações extras</h5>
                        <form style="margin-top:20px;">
                            <div class="form-group">
                                <label for="formaPagamento">Forma de pagamento:</label>
                                <select class="form-control form-control-sm" id="formaPagamento">
                                    <option value="Dinheiro sem troco">Dinheiro sem troco</option>
                                    <option value="Dinheiro com troco">Dinheiro com troco</option>
                                    <option value="Cartão crédito">Cartão crédito</option>
                                    <option value="Cartão débito">Cartão débito</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="formaDeRequisicaoPedido">Forma de requerimento:</label>
                                <select class="form-control form-control-sm" id="formaDeRequisicaoPedido">
                                    <option value="Ifood">Ifood</option>
                                    <option value="Whatsapp">Whatsapp</option>
                                    <option value="Instagram">Instagram</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="observacao">Observação:</label>
                                <textArea type="text" class="form-control" id="observacao">Nenhuma.</textArea>
                            </div>
                        </form>
                    </div>
                    
                </div>
                <div class="modal-footer" id="botaoNavPedido">
                    <button id="anterior" onclick="if(this.value>1){this.value=--proximo.value; navegacaoModalDeCriacao(this.value,'${tipo}')}" value=1 type="button" class="btn btn-outline-dark"><span class="fas fa-chevron-left"></span> Voltar</button>
                    <button id="proximo" onclick="if(this.value<5){this.value=++anterior.value; navegacaoModalDeCriacao(this.value,'${tipo}')}" value=1 type="button" class="btn btn-success">Próximo <span class="fas fa-chevron-right"></span></button>    
                </div>
                <div class="modal-footer" id="botaoConfirmacao">`;
  if (tipo == 'cadastrar') {
    if (enviarPedido) {
      codigoHTML += `<button onclick="if(validaDadosCampo(['#nomecliente','#nomemotoboy','#telefonemotoboy','#observacao']) && VETORDEPRODUTOSCLASSEPEDIDO[0]){cadastrarPedido();}else{mensagemDeErroModal('Preencha todos os campos com valores válidos (obrigatório adicionar produto)!'); mostrarCamposIncorreto(['nomecliente','nomemotoboy','telefonemotoboy','observacao']);}" type="button" class="btn btn-primary btn-block"><span class="fas fa-check-double"></span> Confirmar e concluir</button>`;
    } else {
      codigoHTML += `<button onclick="if(validaDadosCampo(['#nomecliente','#observacao']) && VETORDEPRODUTOSCLASSEPEDIDO[0]){cadastrarPedido();}else{mensagemDeErroModal('Preencha todos os campos com valores válidos (obrigatório adicionar produto)!'); mostrarCamposIncorreto(['nomecliente','observacao']);}" type="button" class="btn btn-primary btn-block"><span class="fas fa-check-double"></span> Confirmar e concluir</button>`;
    }
  } else if (tipo == 'atualizar') {
    if (enviarPedido) {
      codigoHTML += `<button onclick="if(validaDadosCampo(['#nomecliente','#nomemotoboy','#telefonemotoboy','#observacao']) && VETORDEPRODUTOSCLASSEPEDIDO[0]){confirmarAcao('Atualizar este pedido!','atualizarPedido(this.value)',(this.value).toString())}else{mensagemDeErroModal('Preencha todos os campos com valores válidos (obrigatório adicionar produto)!'); mostrarCamposIncorreto(['nomecliente','nomemotoboy','telefonemotoboy','observacao']);}" id="botaoAtualizarPedido" type="button" class="btn btn-primary btn-block" data-dismiss="modal"><span class="fas fa-check-double"></span> Modificar e concluir</button>`;
    } else {
      codigoHTML += `<button onclick="if(validaDadosCampo(['#nomecliente','#observacao']) && VETORDEPRODUTOSCLASSEPEDIDO[0]){confirmarAcao('Atualizar este pedido!','atualizarPedido(this.value)',(this.value).toString())}else{mensagemDeErroModal('Preencha todos os campos com valores válidos (obrigatório adicionar produto)!'); mostrarCamposIncorreto(['nomecliente','observacao']);}" id="botaoAtualizarPedido" type="button" class="btn btn-primary btn-block" data-dismiss="modal"><span class="fas fa-check-double"></span> Modificar e concluir</button>`;
    }
  }
  codigoHTML += `</div>
            </div>
        </div>`;

  document.getElementById('modal').innerHTML = codigoHTML;
  $('#modalCriarPedidoClassePedido').modal('show');

  $('#pagProduto').animate({ height: 'hide' });
  $('#formuDadosClientePedido').fadeOut();
  $('#pagMotoboy').animate({ height: 'hide' });
  $('#formuDadoMotoboyPedido').fadeOut(); $('#formuDadosClientePedido').fadeOut();
  $('#pagExtra').animate({ height: 'hide' });
  $('#botaoConfirmacao').animate({ height: 'hide' });
}

//funcao responsavel pela navegacao do modal de criacao de pedido
function navegacaoModalDeCriacao(pag) {
  if (pag == 1) {
    $('#pagCliente').animate({ height: 'show' });
    $('#pagProduto').animate({ height: 'hide' });
    $('#pagMotoboy').animate({ height: 'hide' });
    $('#pagExtra').animate({ height: 'hide' });
    $('#botaoConfirmacao').animate({ height: 'hide' });
  } else if (pag == 2) {
    $('#pagCliente').animate({ height: 'hide' });
    $('#pagProduto').animate({ height: 'show' });
    $('#pagMotoboy').animate({ height: 'hide' });
    $('#botaoConfirmacao').animate({ height: 'hide' });
  } else if (pag == 3) {
    $('#pagCliente').animate({ height: 'hide' });
    $('#pagProduto').animate({ height: 'hide' });
    $('#pagMotoboy').animate({ height: 'show' });
    $('#pagExtra').animate({ height: 'hide' });
    $('#botaoConfirmacao').animate({ height: 'hide' });
  } else if (pag == 4) {
    $('#pagCliente').animate({ height: 'hide' });
    $('#pagProduto').animate({ height: 'hide' });
    $('#pagMotoboy').animate({ height: 'hide' });
    $('#pagExtra').animate({ height: 'show' });
    $('#botaoConfirmacao').animate({ height: 'hide' });
  } else if (pag == 5) {
    $('#pagCliente').animate({ height: 'show' });
    $('#pagProduto').animate({ height: 'show' });
    $('#pagMotoboy').animate({ height: 'show' });
    $('#pagExtra').animate({ height: 'show' });
    $('#botaoConfirmacao').animate({ height: 'show' });
    $('#botaoNavPedido').animate({ height: 'hide' });
  }
}

//funcao responsavel por criar a listagem do cliente na classe periodo
async function criarListagemDeBuscaDeClientes(tipo) {
  let codigoHTML = ``,
    json = null;

  try {
    if (tipo == 'nome') {
      await aguardeCarregamento(true);
      json = await requisicaoGET(`clients/${document.getElementById('nometelefonecliente').value}`);
      await aguardeCarregamento(false);
    } else if (tipo == 'todos') {
      await aguardeCarregamento(true);
      json = await requisicaoGET(`clients`);
      await aguardeCarregamento(false);
    }

    codigoHTML += `<table class="table table-sm col-12 mx-auto" style="margin-top:10px">
          <thead class="thead-dark">
              <tr>
                  <th scope="col">Nome</th>
                  <th scope="col">Telefone</th>
                  <th scope="col">Selecionar</th>
              </tr>
          </thead>
          <tbody>`;
    json.data.forEach(function (item) {
      if ((!item.phone[0] && document.getElementById('telefonecliente'))) {
        codigoHTML += `<tr>
                  <td class="table-light text-dark" title="${item.name}"><strong><span class="fas fa-user"></span> ${corrigirTamanhoString(15, item.name)}</strong></td>`
        if (item.phone[0]) {
          codigoHTML += `<td class="table-light"><strong><span class="fas fa-phone"></span> ${item.phone[0]}</strong></td>`
        } else {
          codigoHTML += `<td class="table-light"><strong><span class="fas fa-phone"></span> Nenhum.</strong></td>`
        }
        codigoHTML += `<td class="table-light text-center" title="Não é possível enviar pedidos para clientes sem endereço!"><button  type="button" class="btn btn-danger btn-sm" disabled><span class="fas fa-ban"></span></button></td>
                </tr>`;
      } else {
        codigoHTML += `<tr>
                  <td class="table-light text-dark" title="${item.name}"><strong><span class="fas fa-user"></span> ${corrigirTamanhoString(15, item.name)}</strong></td>`
        if (item.phone[0]) {
          codigoHTML += `<td class="table-light"><strong><span class="fas fa-phone"></span> ${item.phone[0]}</strong></td>`
        } else {
          codigoHTML += `<td class="table-light"><strong><span class="fas fa-phone"></span> Nenhum.</strong></td>`
        }
        codigoHTML += `<td class="table-light text-center" title="Selecionar cliente!"><button onclick="preencherDadosPedidoIncluirDadosEmPedido('cliente','${item._id}'); $('#formuDadosClientePedido').fadeIn(); $('#respostaClienteParaPedido').fadeOut();" type="button" class="btn btn-primary btn-sm"><span class="fas fa-check"></span></button></td>
                </tr>`;
      }
    });
    codigoHTML += `</tbody>
      </table>`;

    if (json.data[0]) {
      document.getElementById('respostaClienteParaPedido').innerHTML = codigoHTML;
    } else {
      document.getElementById('respostaClienteParaPedido').innerHTML = '<h5 class="text-center" style="margin-top:20px;"><span class="fas fa-exclamation-triangle"></span> Nenhum cliente encontrado!</h5>';
    }
  } catch (error) {
    mensagemDeErroModal('Não foi possível carregar os clientes!')
  }
}

//funcao responsavel por criar a listagem do produtos na classe periodo
async function criarListagemDeBuscaDeProduto(tipo) {
  let codigoHTML = ``,
    json = null;

  try {
    if (tipo == 'nome') {
      await aguardeCarregamento(true);
      json = await requisicaoGET(`products/${document.getElementById('nomeproduto').value}`);
      await aguardeCarregamento(false);
    } else if (tipo == 'todos') {
      await aguardeCarregamento(true);
      json = await requisicaoGET(`products`);
      await aguardeCarregamento(false);
    }

    codigoHTML += `<table class="table table-sm col-12 mx-auto" style="margin-top:10px">
          <thead class="thead-dark">
              <tr>
                  <th scope="col">Nome</th>
                  <th scope="col">Preço</th>
                  <th scope="col">Descrição</th>
                  <th scope="col">Quantidade</th>
                  <th scope="col">Selecionar</th>
              </tr>
          </thead>
          <tbody>`;
    json.data.forEach(function (item) {
      codigoHTML += `<tr>
                  <td class="table-light col-2" title="${item.name}"><strong><span class="fas fa-hamburger"></span> ${corrigirTamanhoString(15, item.name)}</strong></td>
                  <td class="table-light text-danger"><strong>R$${(parseFloat(item.price)).toFixed(2)}</strong></td>
                  <td class="table-light text-center" title="${item.description}"><strong>${corrigirTamanhoString(20, item.description)}</strong></td>
                  <td class="table-light"><input id="quantidadeProduto${item._id}" type="Number" class="form-control form-control-sm" value=1></td>
                  <td class="table-light text-center"><button onclick="if(validaDadosCampo(['#quantidadeProduto${item._id}']) && validaValoresCampo(['#quantidadeProduto${item._id}'])){preencherDadosPedidoIncluirDadosEmPedido('produto','${item._id}', quantidadeProduto${item._id}.value );}else{mensagemDeErroModal('Preencha o campo quantidade com um valor válido!'); mostrarCamposIncorreto(['quantidadeProduto${item._id}']);}" type="button" class="btn btn-primary btn-sm"><span class="fas fa-check"></span> </button></td>
              </tr>`;
    });
    codigoHTML += `</tbody>
      </table>`;

    if (json.data[0]) {
      document.getElementById('respostaProdutoParaPedido').innerHTML = codigoHTML;
    } else {
      document.getElementById('respostaProdutoParaPedido').innerHTML = '<h5 class="text-center" style="margin-top:20px;"><span class="fas fa-exclamation-triangle"></span> Nenhum produto encontrado!</h5>';
    }
  } catch (error) {
    mensagemDeErroModal('Não foi possível carregar os produtos!')
  }
}

//funcao responsavel por criar a listagem do produtos na classe periodo
async function criarListagemDeBuscaDeMotoboy(tipo) {
  let codigoHTML = ``,
    json = null;

  try {
    if (tipo == 'nome') {
      await aguardeCarregamento(true);
      json = await requisicaoGET(`deliverymans/${document.getElementById('nomeMotoboyPedido').value}`);
      await aguardeCarregamento(false);
      json.data.forEach(function (item, indice) {
        if (item.working_day == false) {
          delete json.data[indice]
        }
        json.data[indice]
      })
    } else if (tipo == 'ativos') {
      await aguardeCarregamento(true);
      json = await requisicaoGET('deliverymans/working_days');
      await aguardeCarregamento(false);
    }

    codigoHTML += `<table class="table table-sm col-12 mx-auto" style="margin-top:10px">
          <thead class="thead-dark">
              <tr>
                  <th scope="col">Nome</th>
                  <th scope="col">Telefone</th>
                  <th scope="col">Entregas</th>
                  <th scope="col">Status</th>
                  <th scope="col">Selecionar</th>
              </tr>
          </thead>
          <tbody>`;
    json.data.forEach(async function (item) {
      codigoHTML += `<tr>
                  <td class="table-light text-dark" title="${item.name}"><strong><span class="fas fa-biking"></span> ${corrigirTamanhoString(15, item.name)}</strong></td>
                  <td class="table-light"><span class="fas fa-phone"></span> ${item.phone}</td>
                  <td class="table-light">`;
      if (item.hasDelivery) {
        codigoHTML += `<select class="form-control form-control-sm" style="width:150px" id="localDeEntragaMotoboy${item._id}">`
        codigoHTML += `</select>`
        mostrarLocaisDeEntregaMotoboy(item._id)
      } else {
        codigoHTML += `Nenhuma`;
      }
      codigoHTML += `</td>`;
      if (item.available == false) {
        if (item.hasDelivery) {
          codigoHTML += `<td class="table-light"><strong><span class="badge badge-warning">Aguardo</span></strong></td>`;
        } else {
          codigoHTML += `<td class="table-light"><strong><span class="badge badge-success">Disponível</span></strong></td>`;
        }
        codigoHTML += `<td class="table-light text-center"><button onclick="preencherDadosPedidoIncluirDadosEmPedido('motoboy','${item._id}'); $('#formuDadoMotoboyPedido').fadeIn(); $('#respostaMotoboyParaPedido').fadeOut();" type="button" class="btn btn-primary btn-sm"><span class="fas fa-check"></span> </button></td>`;
      } else {
        codigoHTML += `<td class="table-light"><strong><span class="badge badge-danger">Ocupado</span></strong></td>`;
        codigoHTML += `<td class="table-light text-center"><button onclick="preencherDadosPedidoIncluirDadosEmPedido('motoboy','${item._id}'); $('#formuDadoMotoboyPedido').fadeIn(); $('#respostaMotoboyParaPedido').fadeOut();" type="button" class="btn btn-danger btn-sm"><span class="fas fa-check"></span> </button></td>`;
      }
      codigoHTML += `</tr>`;
    });
    codigoHTML += `</tbody>
      </table>`;

    if (json.data[0]) {
      document.getElementById('respostaMotoboyParaPedido').innerHTML = codigoHTML;
    } else {
      document.getElementById('respostaMotoboyParaPedido').innerHTML = '<h5 class="text-center" style="margin-top:20px;"><span class="fas fa-exclamation-triangle"></span> Nenhum motoboy encontrado!</h5>';
    }
  } catch (error) {
    mensagemDeErroModal('Não foi possível carregar os motoboys!')
  }
}

//funcao responsavel por mostrar os locais de entrega do motoboy na lista de motoboys
async function mostrarLocaisDeEntregaMotoboy(id) {
  try {
    await aguardeCarregamento(true);
    let codigoHTML = ``, json = await requisicaoGET(`orders/deliveryman/${id}`);
    await aguardeCarregamento(false);

    json.data.forEach(function (item) {
      codigoHTML += `<option title="${item.address.street}, nº ${item.address.number}, ${item.address.reference} - ${item.address.district_name}">${corrigirTamanhoString(15, item.address.street)}, nº ${item.address.number}, ${corrigirTamanhoString(20, item.address.reference)} - ${corrigirTamanhoString(15, item.address.district_name)}</option>`
    });

    document.getElementById(`localDeEntragaMotoboy${id}`).innerHTML = codigoHTML;
  } catch (error) {
    mensagemDeErroModal('Não foi possível carregar os dados dos bairros de entrega!')
  }
}

//funcao responsavel por preencher os campos e incluir os dados na variavel de pedido
async function preencherDadosPedidoIncluirDadosEmPedido(tipo, id, quantidade) {

  if (tipo == 'cliente') {

    try {
      await aguardeCarregamento(true);
      let json = await requisicaoGET(`clients`);
      await aguardeCarregamento(false);
      let dado = json.data.find((element) => element._id == id);

      DADOSPEDIDO.cliente_id = dado._id;

      document.getElementById('nomecliente').value = corrigirTamanhoString(15, dado.name);
      document.getElementById('nomecliente').title = dado.name
      if (document.getElementById('telefonecliente') && document.getElementById('enderecocliente')) {
        dado.phone.forEach(function (item) {
          $('#telefonecliente').append(`<option>${item}</option>`);
        });
        dado.address.forEach(function (item) {
          $('#enderecocliente').append(
            `<option value="${item._id}" title="${item.street}, nº ${item.number} - ${item.district.name} - ${item.district.city}">${corrigirTamanhoString(15, item.street)}, nº ${item.number} - ${corrigirTamanhoString(15, item.district.name)} - ${corrigirTamanhoString(15, item.district.city)}</option>`
          );
        });
      }
    } catch (error) {
      mensagemDeErroModal('Não foi possível adicionar o cliente!')
    }

  } else if (tipo == 'produto') {

    try {
      await aguardeCarregamento(true);
      let json = await requisicaoGET(`products`);
      await aguardeCarregamento(false);
      let dado = json.data.find((element) => element._id == id);

      VETORDEPRODUTOSCLASSEPEDIDO.push(
        JSON.parse(`{"_id":"${dado._id}","ref":"lisProdPed${dado._id}"}`)
      );

      $('#listagemDeProdutoSelecionadoPedido').append(`<tr id="linhaProd${dado._id}">
          <td class="table-warning col-2" title="${dado.name}"><strong><span class="fas fa-hamburger"></span> ${corrigirTamanhoString(15, dado.name)}</strong></td>
          <td class="table-warning text-danger"><strong>R$${(parseFloat(dado.price)).toFixed(2)}</strong></td>
          <td class="table-warning"><input id="lisProdPed${dado._id}" type="Number" class="form-control form-control-sm" value=${quantidade}></td>
          <td class="table-warning text-center"><button onclick="removerProdutoDaTabelaeVetor('${dado._id}');" type="button" class="btn btn-outline-danger btn-sm"><span class="fas fa-trash"></span></button></td>
      </tr>`);
    } catch (error) {
      mensagemDeErroModal('Não foi possível adicionar o produto!')
    }

  } else if (tipo == 'motoboy') {

    try {
      await aguardeCarregamento(true);
      let json = await requisicaoGET('deliverymans/working_days');
      await aguardeCarregamento(false);
      let dado = json.data.find((element) => element._id == id);

      DADOSPEDIDO.motoboy_id = dado._id;

      document.getElementById('nomemotoboy').value = corrigirTamanhoString(15, dado.name);
      document.getElementById('nomemotoboy').title = dado.name;
      document.getElementById('telefonemotoboy').value = dado.phone;
    } catch (error) {
      mensagemDeErroModal('Não doi possível adicionar o motoboy!')
    }

  }
}

//funcao responsavel por remover um produto da tabela e do vetor de produtos
function removerProdutoDaTabelaeVetor(id) {
  try {
    const produtoPosition = VETORDEPRODUTOSCLASSEPEDIDO.findIndex((element) => element._id == id);
    VETORDEPRODUTOSCLASSEPEDIDO.splice(produtoPosition, 1);
    document
      .getElementById('listagemDeProdutoSelecionadoPedido')
      .removeChild(document.getElementById(`linhaProd${id}`));
  } catch (error) {
    mensagemDeErroModal('Não foi possível remover o produto!')
  }
}

//funcao responsavel por atualizar os dados do pedido
async function atualizarDadoPedido(id) {
  try {

    let dado = VETORDEPEDIDOSCLASSEPEDIDO.find((element) => element._id == id);

    if (dado.deliveryman && dado.address) {
      await telaModalDeCriacaoDePedido('atualizar', true);
    } else {
      await telaModalDeCriacaoDePedido('atualizar', false);
    }
    await navegacaoModalDeCriacao(5);

    await preencherDadosPedidoIncluirDadosEmPedido('cliente', dado.client.client_id, null);
    if (dado.address) {
      document.getElementById('enderecocliente').value = await dado.address.client_address_id.toString();
    }

    await dado.items.forEach(function (item, indice) {
      (function (indice) {
        setTimeout(function () {
          preencherDadosPedidoIncluirDadosEmPedido('produto', item.product._id, item.quantity);
        }, 300 * indice + 1);
      })(indice);
    });

    if (dado.deliveryman) {
      await preencherDadosPedidoIncluirDadosEmPedido('motoboy', dado.deliveryman._id, null);
    }

    document.getElementById('formaPagamento').value = dado.payment;
    document.getElementById('formaDeRequisicaoPedido').value = dado.source;
    document.getElementById('observacao').value = dado.note;
    document.getElementById('botaoAtualizarPedido').value = dado._id;

    $('#respostaClienteParaPedido').fadeOut();
    $('#respostaMotoboyParaPedido').fadeOut();
    $('#formuDadosClientePedido').fadeIn();
    $('#formuDadoMotoboyPedido').fadeIn();


  } catch (error) {
    mensagemDeErroModal('Não foi possível carregar os dados do pedido!')
  }
}

//funcao responsavel por gerar a lista de pedidos abertos para pagamento
function listaDePedidosAbertosParaPagamento(json) {
  let codigoHTML = ``;

  codigoHTML += `<tr>
        <td class="table-warning text-dark"><strong><span class="fas fa-sticky-note"></span> ${json.identification}</strong></td>
        <td class="table-warning" title="${json.client.name}"><strong>${corrigirTamanhoString(15, json.client.name)}</strong></td>
        <td class="table-warning text-danger"><strong>R$${(parseFloat(json.total)).toFixed(2)}</strong></td>`
  if (json.deliveryman) {
    codigoHTML += `<td class="table-warning" title="${json.deliveryman.name}">${corrigirTamanhoString(15, json.deliveryman.name)}</td>`
  } else {
    codigoHTML += `<td class="table-warning">Retirada local</td>`
  }
  codigoHTML += `<td class="table-warning">
            <button onclick="atualizarDadoPedido('${json._id}');" type="button" class="btn btn-primary btn-sm"><span class="fas fa-edit"></span> Alterar</button>
            <button onclick="confirmarAcao('Reimprimir este pedido!','reImprimirPedido(this.value)','${json._id}');" type="button" class="btn btn-primary btn-sm" style="margin-left:5px;"><span class="fas fa-print"></span> Reimprimir</button>
        </td>
        <td class="table-warning">
            <button onclick="confirmarAcao('Colocar este pedido como entregue!','finalizarPedido(this.value)','${json._id}');" type="button" class="btn btn-success btn-sm"><span class="fas fa-dolly"></span> Entregue</button>
            <button onclick="confirmarAcao('Cancelar este pedido!','excluirPedido(this.value)','${json._id}');" type="button" class="btn btn-outline-danger btn-sm" style="margin-left:5px;"><span class="fas fa-ban"></span> Cancelar</button>
        </td>
    </tr>`;

  return codigoHTML;
}

//funcao responsavel por buscar dado do pedido para atualizar
async function buscarDadosAtualizar(tipo) {
  let codigoHTML = ``,
    json = null;

  VETORDEPEDIDOSCLASSEPEDIDO = [];

  try {
    if (tipo == 'codigo') {
      await aguardeCarregamento(true);
      json = await requisicaoGET(`orders/${document.getElementById('nomePedidoPagamento').value}`);
      await aguardeCarregamento(false);
      json.data = [json.data]
    } else if (tipo == 'todos') {
      await aguardeCarregamento(true);
      json = await requisicaoGET('orders');
      await aguardeCarregamento(false);
    }

    if (json.data[0]) {

      codigoHTML += `<table class="table table-sm col-10 mx-auto" style="margin-top:20px">
      <thead class="thead-dark">
          <tr>
              <th scope="col">Código</th>
              <th scope="col">Cliente</th>
              <th scope="col">Preço Total</th>
              <th scope="col">Motoboy</th>
              <th scope="col">#</th>
              <th scope="col">#</th>
          </tr>
      </thead>
      <tbody>
      `;

      json.data.forEach(function (item) {
        VETORDEPEDIDOSCLASSEPEDIDO.push(item);
        codigoHTML += listaDePedidosAbertosParaPagamento(item);
      });

      codigoHTML += `</tbody>
      </table>`;


      document.getElementById('respostaListaDePedidosAbertosPagamento').innerHTML = codigoHTML;
    } else {
      document.getElementById('respostaListaDePedidosAbertosPagamento').innerHTML = '<h5 class="text-center" style="margin-top:20px;"><span class="fas fa-exclamation-triangle"></span> Nenhum pedido em aberto encontrado!</h5>';
    }
  } catch (error) {
    mensagemDeErro('Não foi possível carregar os pedidos em aberto!')
  }
}

//funcao responsavel por cadastrar um pedido
async function cadastrarPedido() {
  try {
    let aux = true, json = `{
      "client_id":"${DADOSPEDIDO.cliente_id}",`
    if (DADOSPEDIDO.motoboy_id) {
      json += `"deliveryman":"${DADOSPEDIDO.motoboy_id}",`
    }
    if (document.getElementById('enderecocliente')) {
      json += `"client_address_id":"${document.getElementById('enderecocliente').value}",`
    }
    json += `"source":"${document.getElementById('formaDeRequisicaoPedido').value}",
      "items":[`;
    VETORDEPRODUTOSCLASSEPEDIDO.forEach(function (item) {
      if (aux) {
        json += `{
          "product":"${item._id}",
          "quantity":${document.getElementById('lisProdPed' + item._id).value}
        }`;
        aux = false;
      } else {
        json += `,{
          "product":"${item._id}",
          "quantity":${document.getElementById('lisProdPed' + item._id).value}
      }`;
      }
    });
    json += `],
          "payment":"${document.getElementById('formaPagamento').value}",
          "note":"${document.getElementById('observacao').value}"
      }`;

    await aguardeCarregamento(true);
    let result = await requisicaoPOST('orders', JSON.parse(json));
    await aguardeCarregamento(false);

    await reImprimirPedido(result.data._id);
    $('#modalCriarPedidoClassePedido').modal('hide');
    if (result.data.deliveryman) {
      await modalEnviaMotoboyEntrega(result.data.deliveryman._id)
    }
    await inicializarVariaveisClassePedido();
    await mensagemDeAviso('Pedido cadastrado com sucesso!')

  } catch (error) {
    mensagemDeErro('Não foi possível cadastrar o pedido!')
  }
}

//funcao responsavel por atualizar um pedido
async function atualizarPedido(id) {
  try {
    let aux = true, json = `{
      "client_id":"${DADOSPEDIDO.cliente_id}",`
    if (DADOSPEDIDO.motoboy_id) {
      json += `"deliveryman":"${DADOSPEDIDO.motoboy_id}",`
    }
    if (document.getElementById('enderecocliente')) {
      json += `"client_address_id":"${document.getElementById('enderecocliente').value}",`
    }
    json += `"source":"${document.getElementById('formaDeRequisicaoPedido').value}",
      "items":[`;
    VETORDEPRODUTOSCLASSEPEDIDO.forEach(function (item) {
      if (aux) {
        json += `{
          "product":"${item._id}",
          "quantity":${document.getElementById('lisProdPed' + item._id).value}
        }`;
        aux = false;
      } else {
        json += `,{
          "product":"${item._id}",
          "quantity":${document.getElementById('lisProdPed' + item._id).value}
        }`;
      }
    });
    json += `],
          "payment":"${document.getElementById('formaPagamento').value}",
          "note":"${document.getElementById('observacao').value}"
      }`;

    await aguardeCarregamento(true);
    let result = await requisicaoPUT(`orders/${id}`, JSON.parse(json))
    await aguardeCarregamento(false);

    await reImprimirPedido(result.data._id);
    await inicializarVariaveisClassePedido();
    await mensagemDeAviso('Pedido atualizado com sucesso!')

  } catch (error) {
    mensagemDeErro('Não foi possível atualizar o pedido!')
  }

  if (validaDadosCampo(['#nomePedidoPagamento'])) {
    await buscarDadosAtualizar('codigo')
  } else {
    await buscarDadosAtualizar('todos')
  }
}

//funcao responsavel por excluir um pedido
async function excluirPedido(id) {
  try {
    await aguardeCarregamento(true);
    let result = await requisicaoGET(`orders`)
    let order = result.data.find(element => element._id == id)
    await requisicaoDELETE(`orders/${id}`, '');
    if (order.deliveryman) {
      let result2 = await requisicaoGET(`orders/deliveryman/${order.deliveryman._id}`)
      if (result2.data.length == 0) {
        await requisicaoPUT(`deliverymans/${order.deliveryman._id}`, { "available": false, "hasDelivery": false, "name": order.deliveryman.name, "phone": order.deliveryman.phone })
      }
    }
    await aguardeCarregamento(false);

    await mensagemDeAviso('Pedido excluído com sucesso!')
  } catch (error) {
    mensagemDeErro('Não foi possível excluir o pedido!')
  }

  if (validaDadosCampo(['#nomePedidoPagamento'])) {
    await buscarDadosAtualizar('codigo')
  } else {
    await buscarDadosAtualizar('todos')
  }
}

//funcao responsavel por finalizar pedido
async function finalizarPedido(id) {
  try {
    await aguardeCarregamento(true);
    await requisicaoPUT(`orders/${id}`, { "finished": true })
    await aguardeCarregamento(false);
    await mensagemDeAviso('Pedido finalizado com sucesso!')
  } catch (error) {
    mensagemDeErro('Não foi possível finalizar o pedido!')
  }

  if (validaDadosCampo(['#nomePedidoPagamento'])) {
    await buscarDadosAtualizar('codigo')
  } else {
    await buscarDadosAtualizar('todos')
  }
}

//funcao responsavel por gerar o modal de envia de motoboy para entrega
function modalEnviaMotoboyEntrega(id) {
  let codigoHTML = ``;

  codigoHTML += `<div class="modal fade" id="modalEnviaMotoboyClassePedido" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel"><span class="fas fa-truck-loading"></span> Confirmação de envio para entrega</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <h5>Deseja enviar o motoboy para as entregas agora, ou aguardar para adicionar mais pedidos a ele?</h5>
                        </div>
                        <div class="modal-footer">
                          <button onclick="enviarMotoboyParaEntrega('${id}');" type="button" data-dismiss="modal" class="btn btn-outline-primary btn-block"><span class="fas fa-check-circle"></span> Enviar</button>
                          <button type="button" data-dismiss="modal" class="btn btn-warning btn-block"><span class="fas fa-hourglass-half"></span> Aguardar</button>
                        </div>
                    </div>
                </div>`

  document.getElementById('modal').innerHTML = codigoHTML;
  $('#modalEnviaMotoboyClassePedido').modal('show');
}

//funcao responsavel por gerar o modal de buscar e enviar motoboy para entrega
function modalBuscaEnviaMotoboyEntrega() {
  let codigoHTML = ``;

  codigoHTML += `<div class="modal fade" id="modalBuscarMotoboyClassePedido" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel"><span class="fas fa-motorcycle"></span> Motoboys</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                    <div id="mensagemDeErroModal" class="justify-content-center"></div>
                </div>
                <div class="modal-body">

                <h5 class="text-center"><span class="fas fa-motorcycle"></span> Buscar Motoboys</h5>
                <div class="card-deck col-10 mx-auto d-block">
                    <div class="input-group mb-3">
                        <input id="nomeMotoboyAguardo" type="text" class="form-control form-control-sm mousetrap" placeholder="Nome do motoboy">
                        <button onclick="if(validaDadosCampo(['#nomeMotoboyAguardo'])){criarListaEnviarMotoboyEntrega('nome')}else{mensagemDeErroModal('Preencha o campo nome do motoboy!'); mostrarCamposIncorreto(['nomeMotoboyAguardo']);}" type="button" class="btn btn-outline-info btn-sm">
                            <span class="fas fa-search"></span> Buscar
                        </button>
                        <br/>
                        <button onclick="criarListaEnviarMotoboyEntrega('ativos');" type="button" class="btn btn-outline-info btn-block btn-sm" style="margin-top:10px;">
                            <span class="fas fa-search-plus"></span> Exibir todos
                        </button>
                    </div>
                </div>
                <div id="respostaMotoboyParaPedidoEnvairEntrega"></div>
                    
                </div>
            </div>
        </div>`;

  document.getElementById('modal').innerHTML = codigoHTML;
  $('#modalBuscarMotoboyClassePedido').modal('show');
}

//funcao responsavel por gerar a lista de motoboy para enviar entrega
async function criarListaEnviarMotoboyEntrega(tipo) {
  let codigoHTML = ``,
    json = null, aux = false;

  try {
    if (tipo == 'nome') {
      await aguardeCarregamento(true);
      json = await requisicaoGET(`deliverymans/${document.getElementById('nomeMotoboyAguardo').value}`);
      await aguardeCarregamento(false);
      json.data.forEach(function (item, indice) {
        if (item.working_day == false && item.hasDelivery == false) {
          delete json.data[indice]
        }
      })
    } else if (tipo == 'ativos') {
      await aguardeCarregamento(true);
      json = await requisicaoGET('deliverymans/working_days');
      await aguardeCarregamento(false);
      json.data.forEach(function (item, indice) {
        if (item.hasDelivery == false) {
          delete json.data[indice]
        }
      })
    }

    codigoHTML += `<table class="table table-sm col-12 mx-auto" style="margin-top:10px">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Telefone</th>
                    <th scope="col">Status</th>
                    <th scope="col">Enviar</th>
                </tr>
            </thead>
            <tbody>`;
    json.data.forEach(function (item) {
      if (item.available == false) {
        codigoHTML += `<tr>
                    <td class="table-light text-dark" title="${item.name}"><strong><span class="fas fa-biking"></span> ${corrigirTamanhoString(15, item.name)}</strong></td>
                    <td class="table-light"><span class="fas fa-phone"></span> ${item.phone}</td>
                    <td class="table-light"><span class="badge badge-warning">Aguardo</span></td>
                    <td class="table-light text-center">
                      <button onclick="confirmarAcao('Enviar motoboy para entrega!','enviarMotoboyParaEntrega(this.value)','${item._id}');" type="button" data-dismiss="modal" class="btn btn-primary btn-sm"><span class="fas fa-check-circle"></span> </button>
                    </td>
                  </tr>`
        aux = true;
      }
    });
    codigoHTML += `</tbody>
        </table>`;

    if (aux) {
      document.getElementById('respostaMotoboyParaPedidoEnvairEntrega').innerHTML = codigoHTML
    } else {
      document.getElementById('respostaMotoboyParaPedidoEnvairEntrega').innerHTML = '<h5 class="text-center" style="margin-top:20px;"><span class="fas fa-exclamation-triangle"></span> Nenhum motoboy em aguardo encontrado!</h5>'
    }
  } catch (error) {
    mensagemDeErroModal('Não foi possível carregar os motoboy em aguardo!')
  }

}

//funcao responsavel por enviar o motoboy para entrega
async function enviarMotoboyParaEntrega(id) {
  try {
    await aguardeCarregamento(true);
    let json = await requisicaoGET(`deliverymans`)
    let motoboy = json.data.find(element => element._id == id)
    await requisicaoPUT(`deliverymans/${id}`, { "available": true, "name": motoboy.name, "phone": motoboy.phone })
    await aguardeCarregamento(false);
    await mensagemDeAviso('Motoboy enviado para entrega com sucesso!')
  } catch (error) {
    mensagemDeErro('Não foi possível enviar o motoboy para entrega!')
  }
}

//funcao responsavel por imprimir/reimprimir comanda
async function reImprimirPedido(id) {
  try {
    await aguardeCarregamento(true);
    await requisicaoPOST(`printers`, {
      id: id
    })
    await aguardeCarregamento(false);
    await mensagemDeAviso('Pedido impressão com sucesso!')
  } catch (error) {
    mensagemDeErro('Não foi possível imprimir o pedido!')
  }
}

//funcao responsavel por inicializar variaveis globais do classe pedido
function inicializarVariaveisClassePedido() {
  VETORDEPRODUTOSCLASSEPEDIDO = [];
  DADOSPEDIDO = JSON.parse(`{}`);
  subMenuPedido();
  document.getElementById('modal').innerHTML = ''
  document.getElementById('modal2').innerHTML = ''
  document.getElementById('alert2').innerHTML = ''
}
