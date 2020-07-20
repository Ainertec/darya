// --------------------------------------------- Classe Estoque -----------------------------------------------------

let VETORDEITENSESTOQUE = [];

//funcao para gerar tela de busca de bebidas
function telaDeBuscarEstoque() {
  let codigoHTML = '';

  codigoHTML += '<h4 class="text-center">Buscar Produto</h4>';
  codigoHTML += '<div class="card-deck col-4 mx-auto d-block">';
  codigoHTML += '<div class="input-group mb-3">';
  codigoHTML +=
    '<input id="nome" type="text" class="form-control form-control-sm mousetrap" placeholder="Nome do produto">';
  codigoHTML += `<button onclick="if(validaDadosCampo(['#nome'])){buscarEstoque('nome');}else{mensagemDeErro('Preencha o campo nome!'); mostrarCamposIncorrreto(['nome']);}" type="button" class="btn btn-outline-info btn-sm">`;
  codigoHTML += '<span class="fas fa-search"></span> Buscar';
  codigoHTML += '</button>';
  codigoHTML += '<br/>';
  codigoHTML += `<button onclick="buscarEstoque('todos');" type="button" class="btn btn-outline-info btn-block btn-sm" style="margin-top:10px;">`;
  codigoHTML += '<span class="fas fa-search-plus"></span> Exibir todos';
  codigoHTML += '</button>';
  codigoHTML += '</div>';
  codigoHTML += '</div>';
  codigoHTML += '<div id="resposta"></div>';

  document.getElementById('janela2').innerHTML = codigoHTML;
}

//funcao para fazer busca via GET de todas as bebidas
async function buscarEstoque(tipoBusca) {
  let codigoHTML = '',
    json = null;

  if (tipoBusca == 'nome') {
    json = await requisicaoGET('items/' + $('#nome').val(), {
      headers: { Authorization: `Bearer ${buscarSessionUser().token}` },
    });
  } else if (tipoBusca == 'todos') {
    json = await requisicaoGET('items', {
      headers: { Authorization: `Bearer ${buscarSessionUser().token}` },
    });
  }

  VETORDEITENSESTOQUE = [];

  codigoHTML +=
    '<div id="grafico" class="col-10 mx-auto" style="margin-top:30px; height: 50vh"></div>';

  codigoHTML += '<h5 class="text-center" style="margin-top:50px">Atualizar estoque</h5>';
  codigoHTML +=
    '<table class="table table-bordered table-sm col-8 mx-auto" style="margin-top:10px">';
  codigoHTML +=
    '<thead class="thead-dark"><tr><th scope="col">Nome</th><th scope="col">Descrição</th><th scope="col">Quantidade</th><th scope="col">Adicionar</th><th scope="col">#</th></tr></thead>';
  codigoHTML += '<tbody>';
  json.data.forEach(function (item) {
    VETORDEITENSESTOQUE.push(item);
    codigoHTML += '<tr>';
    if (item.drink) {
      codigoHTML += `<td class="table-secondary text-dark"><strong><span class="fas fa-wine-glass-alt"></span> ${corrigirTamanhoString(
        20,
        item.name
      )}</strong></td>`;
    } else {
      codigoHTML += `<td class="table-secondary text-dark"><strong><span class="fas fa-utensils"></span> ${corrigirTamanhoString(
        20,
        item.name
      )}</strong></td>`;
    }
    codigoHTML += `<td class="table-secondary text-dark">${corrigirTamanhoString(
      40,
      item.description
    )}</td>`;
    if (parseInt(item.stock) > 5) {
      codigoHTML += `<td class="table-success text-dark text-center"><strong>${item.stock}</strong></td>`;
    } else {
      codigoHTML += `<td class="table-danger text-dark text-center"><strong>${item.stock}</strong></td>`;
    }
    codigoHTML += `<td class="table-warning text-dark"><input class="form-control form-control-sm mousetrap" type="Number" id="quantidade${item._id}" value=1 /></td>`;
    codigoHTML += `<td class="table-secondary text-dark"><button onclick="if(validaDadosCampo(['#quantidade${item._id}']) && validaValoresCampo(['#quantidade${item._id}'])){confirmarAcao('Atualizar quantidade!', 'atualizarEstoque(this.value)', '${item._id}');}else{mensagemDeErro('Preencha o campo quantidade com um valor válido!'); mostrarCamposIncorrreto(['quantidade${item._id}']);}" class="btn btn-success"><span class="fas fa-sync"></span></button></td>`;
    codigoHTML += '</tr>';
  });
  codigoHTML += '</tbody>';
  codigoHTML += '</table>';

  if (json.data[0] == null) {
    document.getElementById('resposta').innerHTML =
      '<h5 class="text-center" style="margin-top:20vh;"><span class="fas fa-exclamation-triangle"></span> Nenhum produto ou bebida encontrado!</h5>';
  } else {
    document.getElementById('resposta').innerHTML = codigoHTML;
    setTimeout(function () {
      gerarGraficoEstoque(json);
    }, 300);
  }
}

//funcao para salvar atualizar quantidade de produtos no estoque
async function atualizarEstoque(id) {
  let json = null;

  try {
    VETORDEITENSESTOQUE.forEach(function (item) {
      if (item._id.toString() == id.toString()) {
        json = item;
      }
    });

    delete json._id;
    delete json.createdAt;
    delete json.updatedAt;
    delete json.__v;
    json.stock = parseInt(json.stock) + parseInt($('#quantidade' + id).val());

    await requisicaoPUT('items/' + id, json, {
      headers: { Authorization: `Bearer ${buscarSessionUser().token}` },
    });
    mensagemDeAviso('Atualizado com sucesso!');
    telaDeBuscarEstoque();
  } catch (error) {
    mensagemDeErro('Não foi possível atualizar a quantidade do produto!');
  }
}

//function para gerar grafico de estoque
function gerarGraficoEstoque(json) {
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
}
