// --------------------------------------------------- Classe Produto ---------------------------------------------------

//vetor responsavel por guardar os dados dos produtos em tempo de execucao
let VETORDEPRODUTOSCLASSEPRODUTO = [], VETORDEINGREDIENTESCLASSEPRODUTO = [];

//funcao responsavel por gerar a tela de busca do produto
function telaDeBuscarProduto() {
  VETORDEPRODUTOSCLASSEPRODUTO = []
  let codigoHTML = ``;

  codigoHTML += `<h4 class="text-center"><span class="fas fa-hamburger"></span> Buscar Produto</h4>
                    <div class="card-deck col-4 mx-auto d-block">
                        <div class="input-group mb-3">
                            <input id="nome" type="text" class="form-control form-control-sm mousetrap" placeholder="Nome do produto">
                            <button onclick="if(validaDadosCampo(['#nome'])){buscarDadosProduto('nome');}else{mensagemDeErro('Preencha o campo nome do produto!'); mostrarCamposIncorreto(['nome']);}" type="button" class="btn btn-outline-info btn-sm">
                                <span class="fas fa-search"></span> Buscar
                            </button>
                            <br/>
                            <button onclick="buscarDadosProduto('todos')" type="button" class="btn btn-outline-info btn-block btn-sm" style="margin-top:10px;">
                                <span class="fas fa-search-plus"></span> Exibir todos
                            </button>
                            <button onclick="modalTelaCadastrarouAtualizarProduto('cadastrar');" type="button" class="btn btn-warning btn-block" style="margin-top:60px;">
                                <span class="fas fa-plus"></span> Adicionar produto
                            </button>
                        </div>
                    </div>
                    <div id="resposta"></div>`;

  animacaoJanela2();
  setTimeout(function () { document.getElementById('janela2').innerHTML = codigoHTML }, 30)
}

//funcao responsavel por gerar a lista com os produtos
function gerarListaDeProdutos(json) {
  let codigoHTML = ``;

  codigoHTML += `<tr>
        <td class="table-warning text-dark" title="${json.name}"><strong><span class="fas fa-hamburger"></span> ${
    corrigirTamanhoString(15, json.name)
    }</strong></td>
        <td class="table-warning" title="${json.description}">${corrigirTamanhoString(40, json.description)}</td>
        <td class="table-warning">${parseInt(json.stock)}</td>
        <td class="table-warning"><strong>R$ ${parseFloat(json.cost).toFixed(2)}</strong></td>
        <td class="table-warning text-danger"><strong>R$ ${parseFloat(json.price).toFixed(
      2
    )}</strong></td>
        <td class="table-warning"><button onclick="carregarDadosProduto('${json._id}')" type="button" class="btn btn-primary btn-sm"><span class="fas fa-edit"></span> Editar</button></td>
        <td class="table-warning"><button onclick="confirmarAcao('Excluir este produto!','excluirProduto(this.value)','${json._id}')" type="button" class="btn btn-outline-danger btn-sm"><span class="fas fa-trash"></span> Excluir</button></td>
    </tr>`;

  return codigoHTML;
}

//funcao responsavel por gerar o modal de cadastrar/atualizar/remover produto
function modalTelaCadastrarouAtualizarProduto(tipo) {
  let codigoHTML = ``;

  codigoHTML += `<div class="modal fade" id="modalClasseProduto" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel"><span class="fas fa-hamburger"></span> Dados Produto</h5>
                            <button onclick="reiniciarClasseProduto();" type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                            <div id="mensagemDeErroModal" class="justify-content-center"></div>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label for="nomeproduto">Nome produto:</label>
                                    <input type="text" class="form-control" id="nomeproduto" placeholder="Nome">
                                </div>
                                <div class="form-group">
                                  <label for="precocusto">Preço de custo:</label>
                                  <div class="input-group">
                                    <div class="input-group-prepend">
                                      <span class="input-group-text">R$</span>
                                    </div>
                                    <input type="Number" class="form-control" id="precocusto" placeholder="Preço de custo">
                                  </div>
                                </div>
                                <div class="form-group">
                                    <label for="precovenda">Preço de venda:</label>
                                    <div class="input-group">
                                      <div class="input-group-prepend">
                                        <span class="input-group-text">R$</span>
                                      </div>
                                      <input type="Number" class="form-control" id="precovenda" placeholder="Preço de venda">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="quantidadeproduto">Ingredientes/quantidade:</label>
                                    <div class="col-12" style="position: relative; height: 30vh; z-index: 1; overflow: scroll; margin-right: 0px;">
                                      <table class="table">
                                        <tbody>
                                          <tr class="table-info">
                                            <td style="width:5vw">
                                              <div class="custom-control custom-switch">
                                                <input type="checkbox" onclick="this.checked? console.log('foi'): console.log('nao')" class="custom-control-input custom-switch" id="teste">
                                                <label class="custom-control-label" for="teste">Add</label>
                                              </div>                                   
                                            </td>
                                            <td style="width:15vw"><span class="fas fa-box"></span> Farinha</td>
                                            <td style="width:15vw">
                                              <div class="input-group input-group-sm">
                                                <div class="input-group-prepend">
                                                  <span class="input-group-text input-group-text" id="campoqtd">Qtd.:</span>
                                                </div>
                                                <input type="Number" class="form-control form-control-sm" aria-describedby="campoqtd">
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="descricao">Descrição</label>
                                    <textarea class="form-control" id="descricaoproduto" rows="3">Nenhuma.</textarea>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">`;
  if (tipo == 'cadastrar') {
    codigoHTML += `<button onclick="if(validaDadosCampo(['#nomeproduto','#precocusto','#precovenda','#quantidadeproduto','#descricaoproduto']) && validaValoresCampo(['#precocusto','#precovenda'])){cadastrarProduto();}else{mensagemDeErroModal('Preencha os campos com valores válidos!'); mostrarCamposIncorreto(['nomeproduto','precocusto','precovenda','quantidadeproduto','descricaoproduto']);}" type="button" class="btn btn-primary btn-block"><span class="fas fa-check-double"></span> Adicionar</button>`;
  } else if (tipo == 'atualizar') {
    codigoHTML += `<button id="botaoatualizar" onclick="if(validaDadosCampo(['#nomeproduto','#precocusto','#precovenda','#quantidadeproduto','#descricaoproduto']) && validaValoresCampo(['#precocusto','#precovenda'])){confirmarAcao('Atualizar este produto!','atualizarProduto(this.value)',(this.value).toString()); $('#modalClasseProduto').modal('hide');}else{mensagemDeErroModal('Preencha os campos com valores válidos!'); mostrarCamposIncorreto(['nomeproduto','precocusto','precovenda','quantidadeproduto','descricaoproduto']);}" type="button" class="btn btn-success btn-block"><span class="fas fa-edit"></span> Modificar</button>
                                 <button id="botaoexcluir" onclick="confirmarAcao('Excluir este produto!','excluirProduto(this.value)',(this.value).toString()); $('#modalClasseProduto').modal('hide');" type="button" class="btn btn-outline-danger btn-block"><span class="fas fa-check-trash"></span> Excluir</button>`;
  }
  codigoHTML += `</div>
                        </div>
                    </div>
                </div>`;

  document.getElementById('modal').innerHTML = codigoHTML;

  $('#modalClasseProduto').modal('show');
}

//funcao responsavel por buscar os dados dos produtos
async function buscarDadosProduto(tipo) {
  let codigoHTML = ``,
    json = null;

  VETORDEPRODUTOSCLASSEPRODUTO = [];

  try {
    if (tipo == 'nome') {
      json = await requisicaoGET(`products/${document.getElementById('nome').value}`);
    } else if (tipo == 'todos') {
      json = await requisicaoGET(`products`);
    }

    codigoHTML += `<h5 class="text-center" style="margin-top:80px">Listagem de produtos</h5>
      <table class="table table-sm col-8 mx-auto" style="margin-top:10px">
          <thead class="thead-dark">
              <tr>
                  <th scope="col">Nome</th>
                  <th scope="col">Descrição</th>
                  <th scope="col">Quantidade</th>
                  <th scope="col">Preço custo</th>
                  <th scope="col">Preço venda</th>
                  <th scope="col">Editar</th>
                  <th scope="col">Excluir</th>
              </tr>
          </thead>
          <tbody>`;

    json.data.forEach(function (item) {
      VETORDEPRODUTOSCLASSEPRODUTO.push(item);
      codigoHTML += gerarListaDeProdutos(item);
    });

    codigoHTML += `</tbody>
      </table>`;

    if (json.data[0]) {
      document.getElementById('resposta').innerHTML = codigoHTML;
    } else {
      document.getElementById('resposta').innerHTML = '<h5 class="text-center" style="margin-top:10vh;"><span class="fas fa-exclamation-triangle"></span> Nenhum produto encontrado!</h5>';
    }
  } catch (error) {
    mensagemDeErro('Não foi possível carregar os produtos!')
  }
}

//funcao responsavel por carregar os dados do produto selecionado
function carregarDadosProduto(id) {
  modalTelaCadastrarouAtualizarProduto('atualizar');

  try {
    let dado = VETORDEPRODUTOSCLASSEPRODUTO.find((element) => element._id == id);

    document.getElementById('nomeproduto').value = dado.name;
    document.getElementById('precocusto').value = parseFloat(dado.cost).toFixed(2);
    document.getElementById('precovenda').value = parseFloat(dado.price).toFixed(2);
    document.getElementById('quantidadeproduto').value = parseInt(dado.stock);
    document.getElementById('descricaoproduto').value = dado.description;
    document.getElementById('botaoatualizar').value = dado._id;
    document.getElementById('botaoexcluir').value = dado._id;
  } catch (error) {
    mensagemDeErroModal('Não foi possível carregar os dados do produto!')
  }
}

//funcao responsavel por adicionar um ingrediente ao produto
function adicionarIngredienteaoProduto(id, tipo, quantidade) {
  if (tipo == 'cadastrar') {
    VETORDEINGREDIENTESCLASSEPRODUTO.push(JSON.parse(`{"id_ingrediente":"${id}", "quantity":${parseInt(document.getElementById('quanti' + id).value)}}`))
  } else if (tipo == 'atualizar') {
    VETORDEINGREDIENTESCLASSEPRODUTO.push(JSON.parse(`{"id_ingrediente":"${id}", "quantity":${parseInt(quantidade)}`))
    document.getElementById(`select${id}`).checked = true
    document.getElementById(`quanti${id}`).value = parseInt(quantidade)
  }
}

//funcao responsavel por remover um ingrediente do produto
function removerIngredientedoProduto(id) {
  let indice = VETORDEINGREDIENTESCLASSEPRODUTO.findIndex((element) => element.id_ingrediente == id)
  VETORDEINGREDIENTESCLASSEPRODUTO.splice(indice, 1);
}

//funcao reposanvel por cadastrar um produto
async function cadastrarProduto() {
  try {
    let json = `{"name":"${$('#nomeproduto').val()}",
    "description":"${$('#descricaoproduto').val()}",
    "price":${$('#precovenda').val()},
    "cost":${$('#precocusto').val()},
    "stock":${parseInt($('#quantidadeproduto').val())}}`;

    await requisicaoPOST('products', JSON.parse(json));
    $('#modalClasseProduto').modal('hide');
    mensagemDeAviso('Produto cadastrado com sucesso!')
  } catch (error) {
    mensagemDeErro('Não foi possível cadastrar o produto!')
  }
}

//funcao responsavel por atualizar um produto
async function atualizarProduto(id) {
  let dado = VETORDEPRODUTOSCLASSEPRODUTO.filter(function (element) {
    return element._id == id;
  });

  try {
    dado[0].name = document.getElementById('nomeproduto').value;
    dado[0].description = document.getElementById('descricaoproduto').value;
    dado[0].cost = document.getElementById('precocusto').value;
    dado[0].price = document.getElementById('precovenda').value;
    dado[0].stock = document.getElementById('quantidadeproduto').value;
    delete dado[0]._id;
    delete dado[0].updatedAt;
    delete dado[0].createdAt;
    delete dado[0].__v;

    await requisicaoPUT(`products/${id}`, dado[0]);
    mensagemDeAviso('Produto atualizado com sucesso!')
  } catch (error) {
    mensagemDeErro('Não foi possível atualizar o produto!')
  }

  if (validaDadosCampo(['#nome'])) {
    buscarDadosProduto('nome');
  } else {
    buscarDadosProduto('todos');
  }
}

//funcao responsavel por excuir um produto
async function excluirProduto(id) {
  try {
    await requisicaoDELETE(`products/${id}`, '');
    mensagemDeAviso('Produto excluído com sucesso!')
  } catch (error) {
    mensagemDeErro('Não foi possível excluir o produto!')
  }

  if (validaDadosCampo(['#nome'])) {
    buscarDadosProduto('nome');
  } else {
    buscarDadosProduto('todos');
  }
}

//funcao responsavel por reiniciar classe produto
function reiniciarClasseProduto() {
  VETORDEPRODUTOSCLASSEPRODUTO = []
  telaDeBuscarProduto();
  document.getElementById('modal').innerHTML = ''
  document.getElementById('modal2').innerHTML = ''
  document.getElementById('alert2').innerHTML = ''
}
