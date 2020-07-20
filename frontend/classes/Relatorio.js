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
    '<button onclick="gerarGraficoLucroTotalPeriodico(); gerarGraficoGastoseGanhosSobreproduto();" type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Relatórios completos</button>';
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
function gerarGraficoLucroTotalPeriodico() {
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
        data: [203.6],
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
        data: [183.6],
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
}

//funcao responsavel por gerar o relatorio de relacao de gastos e gganhos sobre produto
function gerarGraficoGastoseGanhosSobreproduto() {
  Highcharts.chart('grafico1', {
    chart: {
      zoomType: 'xy',
    },
    title: {
      text: 'Demonstrativo de Gasto e Ganho sobre Produto',
    },
    subtitle: {
      text: 'Gráifco responsavel por demonstrar o ganho em relação com o gasto de cada produto.',
    },
    xAxis: [
      {
        categories: ['Produto1', 'Produto2', 'Produto3', 'Produto4'],
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
        name: 'Ganho sobre produto',
        type: 'column',
        yAxis: 1,
        data: [49.9, 71.5, 106.4, 129.2],
        tooltip: {
          valuePrefix: 'R$',
          valueSuffix: ' (reais)',
        },
      },
      {
        name: 'Gasto sobre produto',
        type: 'spline',
        data: [7.0, 106.9, 9.5, 60.5],
        tooltip: {
          valuePrefix: 'R$',
          valueSuffix: ' (reais)',
        },
      },
    ],
  });
}
