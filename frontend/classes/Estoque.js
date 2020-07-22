// --------------------------------------------- Classe Estoque -----------------------------------------------------

let VETORDEITENSESTOQUE = [];

//funcao para gerar tela de busca de bebidas
function telaDeBuscarEstoque() {
  VETORDEITENSESTOQUE = []
  let codigoHTML = '';

  codigoHTML += `<h4 class="text-center"><span class="fas fa-boxes"></span> Buscar Produto</h4>
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
      </div>
    </div>
  <div id="resposta"></div>`

  animacaoJanela2();
  setTimeout(function () { document.getElementById('janela2').innerHTML = codigoHTML; }, 30)
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
    <thead class="thead-dark"><tr><th scope="col">Nome</th><th scope="col">Descrição</th><th scope="col">Quantidade</th><th scope="col">Adicionar</th><th scope="col">#</th></tr></thead>
    <tbody>`
    json.data.forEach(function (item) {
      VETORDEITENSESTOQUE.push(item);
      codigoHTML += `<tr>
      <td class="table-secondary text-dark" title="${item.name}"><strong><span class="fas fa-hamburger"></span> ${corrigirTamanhoString(20, item.name)}</strong></td>
      <td class="table-secondary text-dark" title="${item.description}">${corrigirTamanhoString(40, item.description)}</td>`
      if (parseInt(item.stock) > 5) {
        codigoHTML += `<td class="table-success text-dark text-center"><strong>${item.stock}</strong></td>`
      } else {
        codigoHTML += `<td class="table-danger text-dark text-center"><strong>${item.stock}</strong></td>`
      }
      codigoHTML += `<td class="table-warning text-dark"><input class="form-control form-control-sm mousetrap" type="Number" id="quantidade${item._id}" value=1 /></td>
      <td class="table-secondary text-dark"><button onclick="if(validaDadosCampo(['#quantidade${item._id}']) && validaValoresCampo(['#quantidade${item._id}'])){atualizarEstoque(this.value)}else{mensagemDeErro('Preencha o campo adicionar com valor válido!'); mostrarCamposIncorreto(['quantidade${item._id}']);}" value="${item._id}" class="btn btn-success"><span class="fas fa-sync"></span></button></td>
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

    console.log(produto)

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
