// ----------------------------------------- Classe SubMenu --------------------------------------------

//funcao responsavel por gerar o sub menu de pedido
function subMenuPedido() {
    VETORDEPEDIDOSCLASSEPEDIDO = [],
        VETORDEPRODUTOSCLASSEPEDIDO = [],
        DADOSPEDIDO = JSON.parse(`{}`)
    let codigoHTML = ``;

    codigoHTML += `<div class="shadow-lg p-3 mb-5 bg-white rounded">
        <h4 class="text-center"><span class="fas fa-shopping-basket"></span> Opções de Pedido</h4>
        <div class="card-deck mx-auto col-6" style="margin-top:5vh;">
            <button onclick="modalRetiradaLocalouEnvio();" type="button" class="btn btn-light border border-dark btn-lg col-5 mx-auto" style="margin: 5px; width: 50px; height: 150px;">
                <span class="fas fa-plus"></span> Criar Pedido <span class="fas fa-shopping-basket"></span>
            </button>
            <button id="botaoPedidoOnline" onclick="modalPedidosOnline();" type="button" class="btn btn-light border border-dark btn-lg col-5 mx-auto" style="margin: 5px; width: 50px; height: 150px;">
                <span class="fas fa-globe"></span> Pedidos Online <span class="fas fa-mouse-pointer"></span>
                ${QTDPEDIDOSONLINE > 0 ? '<span class="badge badge-warning badge-pill">' + QTDPEDIDOSONLINE + '</span>' : ''}
            </button>
            <!--<button onclick="modalBuscaEnviaMotoboyEntrega();" type="button" class="btn btn-light border border-dark btn-lg col-5 mx-auto" style="margin: 5px; width: 50px; height: 150px;">
                <span class="fas fa-map-marked-alt"></span> Enviar Motoboy <span class="fas fa-motorcycle"></span>
            </button>-->
        </div>

    </div>
    <div class="shadow-lg p-3 mb-5 bg-white rounded">
        <h4 class="text-center" style="margin-top:40px"><span class="fas fa-list"></span> Listagem de Pedidos</h4>
        <div class="card-deck col-4 mx-auto d-block">
            <div class="input-group mb-3">
                <input id="nomePedidoPagamento" type="text" class="form-control form-control-sm mousetrap" placeholder="Código do pedido">
                <button onclick="if(validaDadosCampo(['#nomePedidoPagamento'])){buscarDadosAtualizar('codigo');}else{mensagemDeErro('Preencha o campo código do produto!'); mostrarCamposIncorreto(['nomePedidoPagamento']);}" type="button" class="btn btn-outline-info btn-sm">
                    <span class="fas fa-search"></span> Buscar
                </button>
                <br/>
                <button onclick="buscarDadosAtualizar('todos');" type="button" class="btn btn-outline-info btn-block btn-sm" style="margin-top:10px;">
                    <span class="fas fa-search-plus"></span> Exibir todos
                </button>
            </div>
        </div>
        <div id="respostaListaDePedidosAbertosPagamento"></div>
    </div>`;

    animacaoJanela2();
    setTimeout(function () { document.getElementById('janela2').innerHTML = codigoHTML }, 30)
}

//funcao responsavel por manipular o numero de pedidos exibidos nos pedidos online
let QTDPEDIDOSONLINE = 0;
function manipulacaoQtdPedidosOnline(notificacao) {
    if (notificacao) {
        QTDPEDIDOSONLINE += 1;
        if (document.getElementById('botaoPedidoOnline')) {
            document.getElementById('botaoPedidoOnline').innerHTML = `<span class="fas fa-globe"></span> Pedidos Online <span class="fas fa-mouse-pointer"></span>
            <span class="badge badge-warning badge-pill">${QTDPEDIDOSONLINE}</span>`
        }
    } else {
        QTDPEDIDOSONLINE = 0;
        if (document.getElementById('botaoPedidoOnline')) {
            document.getElementById('botaoPedidoOnline').innerHTML = `<span class="fas fa-globe"></span> Pedidos Online <span class="fas fa-mouse-pointer"></span>`
        }
    }
}

// funcao responsavel por receber o pedido em real time
function socketPedidioRealTime() {
    const socket = io('https://requestaiappcenter.herokuapp.com/', {});
    socket.on('newOrder', (newOrder) => {
        if (newOrder.source == 'site') {
            manipulacaoQtdPedidosOnline(true);
            addPedidoOnlineListeRealTime(newOrder);
        }
    });
}