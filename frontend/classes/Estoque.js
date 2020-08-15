// --------------------------------------------- Classe Estoque -----------------------------------------------------

let VETORDEITENSESTOQUE = [];

//funcao para gerar tela de busca de bebidas
function telaDeBuscarEstoque() {
  VETORDEITENSESTOQUE = []
  let codigoHTML = '';

  codigoHTML += `<h4 class="text-center"><span class="fas fa-boxes"></span> Buscar Ingrediente</h4>
    <div class="card-deck col-4 mx-auto d-block">
      <div class="input-group mb-3">
        <input id="nome" type="text" class="form-control form-control-sm mousetrap" placeholder="Nome do produto">
        <button onclick="if(validaDadosCampo(['#nome'])){buscarEstoque('nome');}else{mensagemDeErro('Preencha o campo nome do produto!'); mostrarCamposIncorreto(['nome']);}" type="button" class="btn btn-outline-info btn-sm">
          <span class="fas fa-search"></span> Buscar
        </button>
        <br/>
        <button onclick="buscarEstoque('todos');" type="button" class="btn btn-outline-info btn-block btn-sm" style="margin-top:10px;">
          <span class="fas fa-search-plus"></span> Exibir todos
        </button>
        <button onclick="modalTelaCadastrarAtualizarIngrediente('cadastrar');" type="button" class="btn btn-warning btn-block" style="margin-top:60px;">
          <span class="fas fa-plus"></span> Adicionar Ingrediente
        </button>
      </div>
    </div>
  <div id="resposta"></div>`

  animacaoJanela2();
  setTimeout(function () { document.getElementById('janela2').innerHTML = codigoHTML; }, 30)
}

//funcao responsavel por gerar o modal de ingredientes
function modalTelaCadastrarAtualizarIngrediente(tipo) {
  let codigoHTML = ``;

  codigoHTML += `<div class="modal fade" id="modalClasseEstoque" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel"><span class="fas fa-box"></span> Dados Ingrediente</h5>
                            <button onclick="reiniciarClasseEstoque();" type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                            <div id="mensagemDeErroModal" class="justify-content-center"></div>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label for="nomeproduto">Nome do ingrediente:</label>
                                    <input type="text" class="form-control" id="nomeingrediente" placeholder="Nome">
                                </div>
                                <div class="form-group">
                                  <label for="precocustoingrediente">Preço de custo:</label>
                                  <div class="input-group">
                                    <div class="input-group-prepend">
                                      <span class="input-group-text">R$</span>
                                    </div>
                                    <input type="Number" class="form-control" id="precocustoingrediente" placeholder="Preço de custo">
                                  </div>
                                </div>
                                <div class="form-group">
                                    <label for="quantidadeingrediente">Quantidade:</label>
                                    <div class="input-group">
                                      <input type="Number" class="form-control" id="quantidadeingrediente" value=0>
                                      <select class="custom-select" id="tipoMedida">
                                        <option value="g">G (gramas)</option>
                                        <option value="ml">ML (mililitro)</option>
                                      </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="descricaoingrediente">Descrição</label>
                                    <textarea class="form-control" id="descricaoingrediente" rows="3">Nenhuma.</textarea>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">`;
  if (tipo == 'cadastrar') {
    codigoHTML += `<button onclick="if(validaDadosCampo(['#nomeingrediente','#precocustoingrediente','#quantidadeingrediente','#descricaoingrediente']) && validaValoresCampo(['#precocustoingrediente','#quantidadeingrediente'])){cadastarIngrediente();}else{mensagemDeErroModal('Preencha os campos com valores válidos!'); mostrarCamposIncorreto(['nomeingrediente','precocustoingrediente','quantidadeingrediente','descricaoingrediente']);}" type="button" class="btn btn-primary btn-block"><span class="fas fa-check-double"></span> Adicionar</button>`;
  } else if (tipo == 'atualizar') {
    codigoHTML += `<button id="botaoatualizar" onclick="if(validaDadosCampo(['#nomeingrediente','#precocustoingrediente','#quantidadeingrediente','#descricaoingrediente']) && validaValoresCampo(['#precocustoingrediente','#quantidadeingrediente'])){confirmarAcao('Atualizar este produto!','atualizarIngrediente(this.value)',(this.value).toString()); $('#modalClasseEstoque').modal('hide');}else{mensagemDeErroModal('Preencha os campos com valores válidos!'); mostrarCamposIncorreto(['nomeingrediente','precocustoingrediente','quantidadeingrediente','descricaoingrediente']);}" type="button" class="btn btn-success btn-block"><span class="fas fa-edit"></span> Modificar</button>
                                 <button id="botaoexcluir" onclick="confirmarAcao('Excluir este produto!','excluirIngrediente(this.value)',(this.value).toString()); $('#modalClasseEstoque').modal('hide');" type="button" class="btn btn-outline-danger btn-block"><span class="fas fa-check-trash"></span> Excluir</button>`;
  }
  codigoHTML += `</div>
                        </div>
                    </div>
                </div>`;

  document.getElementById('modal').innerHTML = codigoHTML;

  $('#modalClasseEstoque').modal('show');
}

//funcao responsavel por carregar os dados do ingrediente
async function carregarDadosIngrediente(id) {
  await modalTelaCadastrarAtualizarIngrediente('atualizar')

  let dado = VETORDEITENSESTOQUE.find(element => element._id == id)

  document.getElementById('nomeingrediente').value = dado.name
  document.getElementById('precocustoingrediente').value = (parseFloat(dado.price)).toFixed(2)
  document.getElementById('quantidadeingrediente').value = parseInt(dado.stock)
  document.getElementById('tipoMedida').value = dado.unit
  document.getElementById('descricaoingrediente').value = dado.description
  document.getElementById('botaoatualizar').value = dado._id
  document.getElementById('botaoexcluir').value = dado._id
}

//funcao para fazer busca via GET de todas as bebidas
async function buscarEstoque(tipoBusca) {
  let codigoHTML = '', json = null;

  try {
    if (tipoBusca == 'nome') {
      await aguardeCarregamento(true);
      json = await requisicaoGET(`ingredients/${$('#nome').val()}`);
      await aguardeCarregamento(false);
    } else if (tipoBusca == 'todos') {
      await aguardeCarregamento(true);
      json = await requisicaoGET('ingredients');
      await aguardeCarregamento(false);
    }

    VETORDEITENSESTOQUE = [];

    codigoHTML += `<div id="grafico" class="col-10 mx-auto" style="margin-top:30px; height: 50vh"></div>
    <h5 class="text-center" style="margin-top:50px">Atualizar estoque</h5>
    <table class="table table-bordered table-sm col-10 mx-auto" style="margin-top:10px">
    <thead class="thead-dark">
      <tr>
        <th scope="col">Nome</th>
        <th scope="col">Preço</th>
        <th scope="col">Descrição</th>
        <th scope="col">Quantidade</th>
        <th scope="col">Adicionar quantidade</th>
        <th scope="col">Alterar Preço</th>
        <th scope="col">#</th>
        <th scope="col">#</th>
      </tr>
    </thead>
    <tbody>`
    for (let item of json.data) {
      VETORDEITENSESTOQUE.push(item);
      codigoHTML += `<tr>
      <td class="table-warning text-dark" title="${item.name}"><strong><span class="fas fa-box"></span> ${corrigirTamanhoString(20, item.name)}</strong></td>
      <td class="table-warning text-danger"><strong>R$${(parseFloat(item.price)).toFixed(2)}</strong></td>
      <td class="table-warning text-dark" title="${item.description}">${corrigirTamanhoString(30, item.description)}</td>`
      if (parseInt(item.stock) > 2000) {
        codigoHTML += `<td class="table-success text-dark text-center"><strong>${parseInt(item.stock)} ${item.unit == 'g' ? 'g' : 'ml'}</strong></td>`
      } else {
        codigoHTML += `<td class="table-danger text-dark text-center"><strong>${parseInt(item.stock)} ${item.unit == 'g' ? 'g' : 'ml'}</strong></td>`
      }
      codigoHTML += `<td class="table-warning text-dark">
        <div class="input-group input-group-sm">  
          <input class="form-control form-control-sm mousetrap" type="Number" id="quantidade${item._id}" value=100 />
          <div class="input-group-prepend">
            <span class="input-group-text">${item.unit == 'g' ? '(g)' : '(ml)'}</span>
          </div>
        </div>
      </td>
      <td class="table-warning text-dark">
        <div class="input-group input-group-sm">
        <div class="input-group-prepend">
          <span class="input-group-text">R$</span>
        </div>
          <input class="form-control form-control-sm mousetrap" type="Number" id="preco${item._id}" value=${(parseFloat(item.price)).toFixed(2)} />
        </div>
      </td>
      <td class="table-warning text-dark" title="Atualizar a quantidade!"><button onclick="if(validaDadosCampo(['#quantidade${item._id}','#preco${item._id}']) && validaValoresCampo(['#quantidade${item._id}','#preco${item._id}']) && parseInt($('#quantidade${item._id}').val())>0){atualizarEstoque(this.value)}else{mensagemDeErro('Preencha os campos com valor válido!'); mostrarCamposIncorreto(['quantidade${item._id}','preco${item._id}']);}" value="${item._id}" class="btn btn-success btn-sm"><span class="fas fa-sync"></span></button></td>
      <td class="table-warning text-dark">
        <button onclick="carregarDadosIngrediente('${item._id}');" class="btn btn-primary btn-sm"><span class="fas fa-edit"></span> Editar</button>
        <button onclick="confirmarAcao('Excluir este produto!','excluirIngrediente(this.value)','${item._id}');" class="btn btn-outline-danger btn-sm"><span class="fas fa-trash"></span> Excluir</button>
      </td>
      </tr>`
    }
    codigoHTML += `</tbody>
    </table>`

    if (json.data[0]) {
      document.getElementById('resposta').innerHTML = codigoHTML;
      await setTimeout(function () {
        gerarGraficoEstoque(json);
      }, 300);
    } else {
      document.getElementById('resposta').innerHTML = '<h5 class="text-center" style="margin-top:20vh;"><span class="fas fa-exclamation-triangle"></span> Nenhum produto encontrado!</h5>'
    }
  } catch (error) {
    mensagemDeErro('Não foi possível carregar os produtos!')
  }


}

//funcao para salvar atualizar quantidade de produtos no estoque
async function atualizarEstoque(id) {
  try {
    let produto = VETORDEITENSESTOQUE.find(element => element._id == id)

    delete produto._id;
    delete produto.createdAt;
    delete produto.updatedAt;
    delete produto.priceUnit;
    delete produto.__v;
    produto.stock = parseInt(produto.stock) + parseInt($('#quantidade' + id).val());
    produto.price = parseInt($('#preco' + id).val());

    await aguardeCarregamento(true);
    await requisicaoPUT(`ingredients/${id}`, produto);
    await aguardeCarregamento(false);
    await mensagemDeAviso('Atualizado com sucesso!');
  } catch (error) {
    mensagemDeErro('Não foi possível atualizar a quantidade do produto!');
  }

  if (validaDadosCampo(['#nome'])) {
    await buscarEstoque('nome');
  } else {
    await buscarEstoque('todos');
  }

}

//function para gerar grafico de estoque
function gerarGraficoEstoque(json) {
  try {
    let vetorNome = [],
      vetorQuantidade = [];

    for (let item of json.data) {
      vetorNome.push(corrigirTamanhoString(10, item.name));
      vetorQuantidade.push(item.stock);
    }

    Highcharts.chart('grafico', {
      chart: {
        type: 'bar',
      },
      title: {
        text: 'Gráfico Estoque',
      },
      xAxis: {
        categories: vetorNome,
      },
      yAxis: {
        title: 'Quantidade',
      },
      series: [
        {
          name: 'Quantidade',
          data: vetorQuantidade,
        },
      ],
    });
  } catch (error) {
    document.getElementById('grafico').innerHTML = '<h5 class="text-center" style="margin-top:20vh;"><span class="fas fa-exclamation-triangle"></span> Não foi possível gerar o gráfico!</h5>'
  }
}

//funcao responsavel por cadastar o ingrediente
async function cadastarIngrediente() {
  try {
    let json = `{
      "name":"${document.getElementById('nomeingrediente').value}",
      "price":${document.getElementById('precocustoingrediente').value},
      "stock":${document.getElementById('quantidadeingrediente').value},
      "unit":"${document.getElementById('tipoMedida').value}",
      "description":"${document.getElementById('descricaoingrediente').value}"
    }`

    await aguardeCarregamento(true);
    let result = await requisicaoPOST(`ingredients`, JSON.parse(json))
    await aguardeCarregamento(false);
    $('#modalClasseEstoque').modal('hide');
    await reiniciarClasseEstoque();
    await mensagemDeAviso('Ingrediente cadastrado com sucesso!');
  } catch (error) {
    mensagemDeErro('Não foi possível cadastrar o ingrediente!')
  }
}

//funcao responsavel por atualiza um ingrediente
async function atualizarIngrediente(id) {
  try {
    let dado = VETORDEITENSESTOQUE.find(element => element._id == id)

    dado.name = document.getElementById('nomeingrediente').value
    dado.price = parseFloat(document.getElementById('precocustoingrediente').value)
    dado.stock = parseInt(document.getElementById('quantidadeingrediente').value)
    dado.unit = document.getElementById('tipoMedida').value
    dado.description = document.getElementById('descricaoingrediente').value
    delete dado._id
    delete dado.priceUnit
    delete dado.updatedAt
    delete dado.createdAt
    delete dado.__v

    await aguardeCarregamento(true);
    await requisicaoPUT(`ingredients/${id}`, dado)
    await aguardeCarregamento(false);
    await mensagemDeAviso('Ingrediente atualizado com sucesso!')
  } catch (error) {
    mensagemDeErro('Não foi possível atualizar o ingrediente!')
  }

  if (validaDadosCampo(['#nome'])) {
    await buscarEstoque('nome')
  } else {
    await buscarEstoque('todos')
  }
}

//funcao responsavel por excluir um ingrediente
async function excluirIngrediente(id) {
  try {
    await aguardeCarregamento(true);
    await requisicaoDELETE(`ingredients/${id}`, '')
    await aguardeCarregamento(false);
    await mensagemDeAviso('Ingrediente excluído com sucesso!')
  } catch (error) {
    mensagemDeErro('Não foi possível excluir o ingrediente!')
  }

  if (validaDadosCampo(['#nome'])) {
    await buscarEstoque('nome')
  } else {
    await buscarEstoque('todos')
  }
}

//funcao de reinicializar classe estoque
function reiniciarClasseEstoque() {
  VETORDEITENSESTOQUE = [];
  document.getElementById('modal').innerHTML = ''
  document.getElementById('modal2').innerHTML = ''
  document.getElementById('alert2').innerHTML = ''
  telaDeBuscarEstoque();
}