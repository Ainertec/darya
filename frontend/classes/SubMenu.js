// ----------------------------------------- Classe SubMenu --------------------------------------------

//funcao responsavel por gerar o sub menu de pedido
function subMenuPedido() {
    let codigoHTML = ``

    codigoHTML += `<h4 class="text-center"><span class="fas fa-shopping-basket"></span> Opções de Pedido</h4>
    <div class="card-deck mx-auto col-6" style="margin-top:5vh;">
        <button onclick="telaModalDeCriacaoDePedido();" type="button" class="btn btn-light border border-dark btn-lg col-5 mx-auto" style="margin: 5px; width: 50px; height: 150px;">
            <span class="fas fa-plus"></span> Criar Pedido <span class="fas fa-shopping-basket"></span>
        </button>
        <button type="button" class="btn btn-light border border-dark btn-lg col-5 mx-auto" style="margin: 5px; width: 50px; height: 150px;">
            <span class="fas fa-globe-americas"></span> Pedidos-Online <span class="fas fa-shopping-basket"></span>
        </button>
    </div>

    <h4 class="text-center" style="margin-top:80px"><span class="fas fa-list"></span> Listagem de Pedidos</h4>
    <div class="card-deck col-4 mx-auto d-block">
        <div class="input-group mb-3">
            <input id="nome" type="text" class="form-control form-control-sm mousetrap" placeholder="Código do pedido">
            <button type="button" class="btn btn-outline-info btn-sm">
                <span class="fas fa-search"></span> Buscar
            </button>
            <br/>
            <button onclick="listaDePedidosAbertosParaPagamento();" type="button" class="btn btn-outline-info btn-block btn-sm" style="margin-top:10px;">
                <span class="fas fa-search-plus"></span> Exibir todos
            </button>
        </div>
    </div>
    <div id="respostaListaDePedidosAbertosPagamento"></div>`



    document.getElementById('janela2').innerHTML = codigoHTML;
}