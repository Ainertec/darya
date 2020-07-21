// ---------------------------------------------- Classe Relatorio ------------------------------------------

//funcao para gerar tela de busca de relatorio
function telaDeRelatorio() {
  let codigoHTML = '';

  codigoHTML += '<h4 class="text-center"><span class="fas fa-chart-pie"></span> Relatórios</h4>';
  codigoHTML += '<div class="card-deck col-4 mx-auto d-block" style="margin-top:30px;">';
  codigoHTML += '<div class="row">';
  codigoHTML += '<div class="col">';
  codigoHTML += '<h5 class="text-center">Data inicial</h5>';
  codigoHTML += '<div class="input-group mb-2">';
  codigoHTML +=
    '<input id="dataInicio" type="date" class="form-control mousetrap" aria-label="Recipients username" aria-describedby="botaoBuscar">';
  codigoHTML += '</div>';
  codigoHTML += '</div>';
  codigoHTML += '<div class="col">';
  codigoHTML += '<h5 class="text-center">Data final</h5>';
  codigoHTML += '<div class="input-group mb-2">';
  codigoHTML +=
    '<input id="dataFim" type="date" class="form-control mousetrap" aria-label="Recipients username" aria-describedby="botaoBuscar">';
  codigoHTML += '</div>';
  codigoHTML += '</div>';
  codigoHTML += '</div>';
  codigoHTML += '<div class="btn-group btn-lg btn-block" role="group" aria-label="Basic example">';
  codigoHTML += `<button type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Relatórios periódicos</button>`;
  codigoHTML +=
    '<button onclick="gerarGraficoLucroTotalPeriodico(); gerarGraficoGastoseGanhosSobreproduto(); gerarGraficoProdutosMaiseMenosVendidos();" type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Relatórios completos</button>';
  codigoHTML += '</div>';
  codigoHTML += '</div>';

  codigoHTML +=
    '<div id="grafico0" style="margin-top:40px;" class="col-12 rounded mx-auto d-block"></div>';
  codigoHTML +=
    '<div id="grafico1" style="margin-top:20px;" class="col-12 rounded mx-auto d-block"></div>';
  codigoHTML +=
    '<div id="grafico2" style="margin-top:20px;" class="col-12 rounded mx-auto d-block"></div>';
  codigoHTML +=
    '<div id="grafico3" style="margin-top:20px;" class="col-12 rounded mx-auto d-block"></div>';
  codigoHTML +=
    '<div id="listaItens" style="margin-top:20px" class="col-12 rounded mx-auto d-block"></div>';

  document.getElementById('janela2').innerHTML = codigoHTML;
}

//funcao responsavel por gerar o relatorio de lucro total periodico(bruto/liquido)
async function gerarGraficoLucroTotalPeriodico() {
  let json = await requisicaoGET('reports/orders/profit')

  Highcharts.chart('grafico0', {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Demonstrativo de Lucro Periódico (Bruto e Líquido)',
    },
    subtitle: {
      text:
        'Gráfico responsavel por demonstrar o lucro líquido e bruto arrecadados dentro de um determinado período.',
    },
    xAxis: {
      categories: ['Lucro total'],
    },
    yAxis: [
      {
        min: 0,
        title: {
          text: 'Employees',
        },
      },
      {
        title: {
          text: 'Valor (R$x.xx)',
        },
        opposite: true,
      },
    ],
    legend: {
      shadow: false,
    },
    tooltip: {
      shared: true,
    },
    plotOptions: {
      column: {
        grouping: false,
        shadow: false,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: 'Valor Bruto',
        color: 'rgba(248,161,63,1)',
        data: [json.data.total],
        tooltip: {
          valuePrefix: 'R$',
          valueSuffix: ' (reais)',
        },
        pointPadding: 0.3,
        pointPlacement: 0.2,
        yAxis: 1,
      },
      {
        name: 'Valor Líquido',
        color: 'rgba(186,60,61,.9)',
        data: [json.data.netValue],
        tooltip: {
          valuePrefix: 'R$',
          valueSuffix: ' (reais)',
        },
        pointPadding: 0.4,
        pointPlacement: 0.2,
        yAxis: 1,
      },
    ],
  });

  gerarListaDePedidosFechados(json.data.orders);
}

//funcao responsavel por gerar o relatorio de relacao de gastos e gganhos sobre produto
async function gerarGraficoGastoseGanhosSobreproduto() {
  let categoria = [], vetorLucro = [], vetorDispesa = [], json = await requisicaoGET('reports/products/dispense_gain')

  json.data.forEach(function (item) {
    vetorLucro.push(item.gain)
    vetorDispesa.push(item.dispense)
    categoria.push(item._id.name)
  });


  Highcharts.chart('grafico1', {
    chart: {
      zoomType: 'xy',
    },
    title: {
      text: 'Demonstrativo de Gasto e Ganho sobre Produto',
    },
    subtitle: {
      text: 'Gráfico responsavel por demonstrar o ganho em relação com o gasto de cada produto.',
    },
    xAxis: [
      {
        categories: categoria,
        crosshair: true,
      },
    ],
    yAxis: [
      {
        // Primary yAxis
        labels: {
          format: 'R${value}',
          style: {
            color: Highcharts.getOptions().colors[1],
          },
        },
        title: {
          text: 'Valor Reais',
          style: {
            color: Highcharts.getOptions().colors[1],
          },
        },
      },
      {
        // Secondary yAxis
        title: {
          text: 'Valor Reais',
          style: {
            color: Highcharts.getOptions().colors[0],
          },
        },
        labels: {
          format: 'R${value}',
          style: {
            color: Highcharts.getOptions().colors[0],
          },
        },
        opposite: true,
      },
    ],
    tooltip: {
      shared: true,
    },
    legend: {
      layout: 'vertical',
      align: 'left',
      x: 120,
      verticalAlign: 'top',
      y: 100,
      floating: true,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || 'rgba(255,255,255,0.25)', // theme
    },
    series: [
      {
        name: 'Lucro sobre produto',
        type: 'column',
        yAxis: 1,
        data: vetorLucro,
        tooltip: {
          valuePrefix: 'R$',
          valueSuffix: ' (reais)',
        },
      },
      {
        name: 'Dispesa sobre produto',
        type: 'spline',
        data: vetorDispesa,
        tooltip: {
          valuePrefix: 'R$',
          valueSuffix: ' (reais)',
        },
      },
    ],
  });
}

//funcao responsavel por gerar o relatorio de produtos vendidos
async function gerarGraficoProdutosMaiseMenosVendidos() {
  let categoria = [], vetorDeProduto = [], json = await requisicaoGET('reports/products/amount')

  json.data.forEach(function (item) {
    categoria.push(item._id.name)
    vetorDeProduto.push(item.amount)
  });


  Highcharts.chart('grafico2', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Relatório de Produtos Mais e Menos Vendidos'
    },
    subtitle: {
      text: 'Gráfico responsavel por demonstrar os produto que foram mais e menos vendidos.'
    },
    xAxis: {
      categories: categoria,
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Quantidade (Unidade)'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.0f} (Unid.)</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: 'QuantidadeTotal',
      data: vetorDeProduto

    }]
  });
}

//funcao responsavel por gerar a listagem de pedidos fechados
function gerarListaDePedidosFechados(json) {
  let codigoHTML = ``

  codigoHTML += `<table class="table table-sm table-bordered">
    <thead class="thead-dark">
      <tr>
        <th scope="col">Código</th>
        <th scope="col">Cliente</th>
        <th scope="col">Motoboy</th>
        <th scope="col">Itens/Quant.</th>
        <th scope="col">Forma de pagamento</th>
        <th scope="col">Valor total</th>
        <th scope="col">Forma de requerimento</th>
        <th scope="col">Data/hora</th>
      </tr>
    </thead>
    <tbody class="table-warning">`
  json.forEach(function (item) {
    codigoHTML += `<tr>
      <td>${item.identification}</td>
      <td>${item.client.name}</td>
      <td>${item.deliveryman.name}</td>
      <td>`
    item.items.forEach(function (item2) {
      codigoHTML += `(${item2.product.name}/${item2.quantity}),`
    });
    codigoHTML += `</td>
    <td>${item.payment}</td>
      <td class="text-danger">R$${(parseFloat(item.total)).toFixed(2)}</td>
      <td>${item.source}</td>
      <td>${item.createdAt.split('.')[0]}</td>
    </tr>`
  });
  codigoHTML += `</tbody>
  </table>`

  document.getElementById('listaItens').innerHTML = codigoHTML;
}