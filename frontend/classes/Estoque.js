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
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
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
                                        <option value="ml">ML (mililitro)</option>
                                        <option value="g">G (gramas)</option>
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
    codigoHTML += `<button onclick="if(validaDadosCampo(['#nomeingrediente','#precocustoingrediente','#quantidadeingrediente','#descricaoingrediente']) && validaValoresCampo(['#precocusto','#precovenda'])){cadastarIngrediente();}else{mensagemDeErroModal('Preencha os campos com valores válidos!'); mostrarCamposIncorreto(['nomeingrediente','precocustoingrediente','quantidadeingrediente','descricaoingrediente']);}" type="button" class="btn btn-primary btn-block"><span class="fas fa-check-double"></span> Adicionar</button>`;
  } else if (tipo == 'atualizar') {
    codigoHTML += `<button id="botaoatualizar" onclick="if(validaDadosCampo(['#nomeingrediente','#precocustoingrediente','#quantidadeingrediente','#descricaoingrediente']) && validaValoresCampo(['#precocusto','#precovenda'])){confirmarAcao('Atualizar este produto!','atualizarIngrediente(this.value)',(this.value).toString()); $('#modalClasseEstoque').modal('hide');}else{mensagemDeErroModal('Preencha os campos com valores válidos!'); mostrarCamposIncorreto(['nomeingrediente','precocustoingrediente','quantidadeingrediente','descricaoingrediente']);}" type="button" class="btn btn-success btn-block"><span class="fas fa-edit"></span> Modificar</button>
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
function carregarDadosIngrediente(id) {
  modalTelaCadastrarAtualizarIngrediente('atualizar')

  let dado = VETORDEITENSESTOQUE.find(element => element._id == id)

  document.getElementById('nomeingrediente').value = dado.name
  document.getElementById('precocustoingrediente').value = dado.cost
  document.getElementById('quantidadeingrediente').value = dado.stock
  //document.getElementById('tipoMedida').value = dado.medida
  document.getElementById('descricaoingrediente').value = dado.description
  document.getElementById('botaoatualizar').value = dado._id
  document.getElementById('botaoexcluir').value = dado._id
}

//funcao para fazer busca via GET de todas as bebidas
async function buscarEstoque(tipoBusca) {
  let codigoHTML = '', json = null;

  try {
    if (tipoBusca == 'nome') {
      json = await requisicaoGET(`products/${$('#nome').val()}`);
    } else if (tipoBusca == 'todos') {
      json = await requisicaoGET('products');
    }

    VETORDEITENSESTOQUE = [];

    codigoHTML += `<div id="grafico" class="col-10 mx-auto" style="margin-top:30px; height: 50vh"></div>
    <h5 class="text-center" style="margin-top:50px">Atualizar estoque</h5>
    <table class="table table-bordered table-sm col-8 mx-auto" style="margin-top:10px">
    <thead class="thead-dark"><tr><th scope="col">Nome</th><th scope="col">Descrição</th><th scope="col">Quantidade</th><th scope="col">Adicionar</th><th scope="col">#</th><th scope="col">#</th></tr></thead>
    <tbody>`
    json.data.forEach(function (item) {
      VETORDEITENSESTOQUE.push(item);
      codigoHTML += `<tr>
      <td class="table-warning text-dark" title="${item.name}"><strong><span class="fas fa-box"></span> ${corrigirTamanhoString(20, item.name)}</strong></td>
      <td class="table-warning text-dark" title="${item.description}">${corrigirTamanhoString(40, item.description)}</td>`
      if (parseInt(item.stock) > 200) {
        codigoHTML += `<td class="table-success text-dark text-center"><strong>${item.stock}</strong></td>`
      } else {
        codigoHTML += `<td class="table-danger text-dark text-center"><strong>${item.stock}</strong></td>`
      }
      codigoHTML += `<td class="table-warning text-dark">
        <div class="input-group input-group-sm">
          <div class="input-group-prepend">
            <span class="input-group-text">(Unid.)</span>
          </div>  
          <input class="form-control form-control-sm mousetrap" type="Number" id="quantidade${item._id}" value=1 />
        </div>
      </td>
      <td class="table-warning text-dark"><button onclick="if(validaDadosCampo(['#quantidade${item._id}']) && validaValoresCampo(['#quantidade${item._id}'])){atualizarEstoque(this.value)}else{mensagemDeErro('Preencha o campo adicionar com valor válido!'); mostrarCamposIncorreto(['quantidade${item._id}']);}" value="${item._id}" class="btn btn-success btn-sm"><span class="fas fa-sync"></span></button></td>
      <td class="table-warning text-dark">
        <button onclick="carregarDadosIngrediente('${item._id}');" class="btn btn-primary btn-sm"><span class="fas fa-edit"></span> Editar</button>
        <button onclick="confirmarAcao('Excluir este produto!','excluirIngrediente(this.value)','${item._id}');" class="btn btn-outline-danger btn-sm"><span class="fas fa-trash"></span> Excluir</button>
      </td>
      </tr>`
    });
    codigoHTML += `</tbody>
    </table>`

    if (json.data[0]) {
      document.getElementById('resposta').innerHTML = codigoHTML;
      setTimeout(function () {
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
    delete produto.__v;
    produto.stock = parseInt(produto.stock) + parseInt($('#quantidade' + id).val());

    await requisicaoPUT(`products/${id}`, produto);
    mensagemDeAviso('Atualizado com sucesso!');
  } catch (error) {
    mensagemDeErro('Não foi possível atualizar a quantidade do produto!');
  }

  if (validaDadosCampo(['#nome'])) {
    buscarEstoque('nome');
  } else {
    buscarEstoque('todos');
  }

}

//function para gerar grafico de estoque
function gerarGraficoEstoque(json) {
  try {
    let vetorNome = [],
      vetorQuantidade = [];

    json.data.forEach(function (item) {
      vetorNome.push(corrigirTamanhoString(10, item.name));
      vetorQuantidade.push(item.stock);
    });

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
function cadastarIngrediente() {
  let json = `{
                "name":"${document.getElementById('nomeingrediente').value}",
                "cust":${document.getElementById('precocustoingrediente').value},
                "stock":${document.getElementById('quantidadeingrediente').value},
                "media":"${document.getElementById('tipoMedida').value}",
                "description":"${document.getElementById('descricaoingrediente').value}"
              }`
  console.log(JSON.parse(json))
}

//funcao responsavel por atualiza um ingrediente
function atualizarIngrediente(id) {
  let dado = VETORDEITENSESTOQUE.find(element => element._id == id)

  dado.name = document.getElementById('nomeingrediente').value
  dado.cost = document.getElementById('precocustoingrediente').value
  dado.stock = document.getElementById('quantidadeingrediente').value
  dado.medida = document.getElementById('tipoMedida').value
  dado.description = document.getElementById('descricaoingrediente').value
  delete dado._id
  delete dado.updatedAt
  delete dado.createdAt
  delete dado.__v

  console.log(dado)
}

//funcao responsavel por excluir um ingrediente
function excluirIngrediente(id) {
  console.log(id)
}