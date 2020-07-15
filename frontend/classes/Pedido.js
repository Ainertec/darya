// ------------------------------------------- Classe Pedido ------------------------------------------

let vetorDeDadosPedido = [], variavelDePedido;

//funcao responsavel por gerar a tela de criar pedido
function telaModalDeCriacaoDePedido() {
    let codigoHTML = ``

    codigoHTML += `<div class="modal fade" id="modalCriarPedidoClassePedido" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel"><span class="fas fa-shopping-basket"></span> Dados do Pedido</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <div id="pagCliente">
                        <h5 class="text-center" style="margin-bottom: 40px; margin-top: 30px;"><span class="fas fa-user"></span> Dados Cliente</h5>
                        <button onclick="modalBuscarCliente();" type="button" class="btn btn-warning btn-block"><span class="fas fa-check-square"></span> Adicionar Cliente</button>
                        <button onclick="modalTelaCadastrarouAtualizarCliente('cadastrar')" type="button" class="btn btn-outline-primary btn-block"><span class="fas fa-plus"></span> Criar Cliente</button>
                        <form style="margin-top:20px;">
                            <div class="form-group">
                                <label for="nomecliente">Nome:</label>
                                <input type="text" class="form-control" id="nomecliente" placeholder="Nome do cliente" disabled>
                            </div>
                            <div class="form-group">
                                <label for="telefonecliente">Telefone:</label>
                                <select class="form-control form-control-sm" id="telefonecliente">
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="enderecocliente">Endereço:</label>
                                <select class="form-control form-control-sm" id="enderecocliente">
                                </select>
                            </div>
                        </form>
                    </div>
                    
                    <div id="pagProduto">
                        <h5 class="text-center" style="margin-bottom: 40px; margin-top: 30px;"><span class="fas fa-hamburger"></span> Dados Produtos</h5>
                        <button onclick="modalBuscarProduto();" type="button" class="btn btn-warning btn-block"><span class="fas fa-check-square"></span> Adicionar Produto</button>
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

                    <div id="pagMotoboy">
                        <h5 class="text-center" style="margin-bottom: 40px; margin-top: 30px;"><span class="fas fa-motorcycle"></span> Dados Motoboy</h5>
                        <button onclick="modalBuscarMotoboy();" type="button" class="btn btn-warning btn-block"><span class="fas fa-check-square"></span> Adicionar Motoboy</button>
                        <form style="margin-top:20px;">
                            <div class="form-group">
                                <label for="nomemotoboy">Nome:</label>
                                <input type="text" class="form-control" id="nomemotoboy" placeholder="Nome do cliente" disabled>
                            </div>
                            <div class="form-group">
                                <label for="telefonemotoboy">Telefone:</label>
                                <input type="text" class="form-control" id="telefonemotoboy" placeholder="Exemplo: (00)00000-0000" disabled>
                            </div>
                        </form>
                    </div>
                    
                </div>
                <div class="modal-footer" id="botaoNavPedido">
                    <button id="anterior" onclick="if(this.value>1){console.log(this.value=--proximo.value); navegacaoModalDeCriacao(this.value)}" value=1 type="button" class="btn btn-outline-dark"><span class="fas fa-chevron-left"></span> Voltar</button>
                    <button id="proximo" onclick="if(this.value<4){console.log(this.value=++anterior.value); navegacaoModalDeCriacao(this.value)}" value=1 type="button" class="btn btn-success">Próximo <span class="fas fa-chevron-right"></span></button>    
                </div>
            </div>
        </div>`

    document.getElementById('modal').innerHTML = codigoHTML;
    $('#modalCriarPedidoClassePedido').modal('show')

    $("#pagProduto").animate({ height: 'hide' });
    $("#pagMotoboy").animate({ height: 'hide' });
}

//funcao responsavel pela navegacao do modal de criacao de pedido
function navegacaoModalDeCriacao(pag) {
    if (pag == 1) {
        $("#pagCliente").animate({ height: 'show' });
        $("#pagProduto").animate({ height: 'hide' });
        $("#pagMotoboy").animate({ height: 'hide' });
    } else if (pag == 2) {
        $("#pagCliente").animate({ height: 'hide' });
        $("#pagProduto").animate({ height: 'show' });
        $("#pagMotoboy").animate({ height: 'hide' });
    } else if (pag == 3) {
        $("#pagCliente").animate({ height: 'hide' });
        $("#pagProduto").animate({ height: 'hide' });
        $("#pagMotoboy").animate({ height: 'show' });
    } else if (pag == 4) {
        $("#pagCliente").animate({ height: 'show' });
        $("#pagProduto").animate({ height: 'show' });
        $("#pagMotoboy").animate({ height: 'show' });
        document.getElementById('botaoNavPedido').innerHTML = `
            <button type="button" class="btn btn-primary btn-block"><span class="fas fa-check-double"></span> Confirmar e concluir</button>
        `
    }
}

//funcao responsavel por gerar o modal de selecao do cliente
function modalBuscarCliente() {
    let codigoHTML = ``

    codigoHTML += `<div class="modal fade" id="modalBuscarClienteClassePedido" data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable float-right">
            <div class="modal-content" style="background-color:#e5e5e5">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel"><span class="fas fa-user"></span> Cliente</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                <h5 class="text-center"><span class="fas fa-user"></span> Buscar Cliente</h5>
                <div class="card-deck col-10 mx-auto d-block">
                    <div class="input-group mb-3">
                        <input id="nome" type="text" class="form-control form-control-sm mousetrap" placeholder="Nome">
                        <button type="button" class="btn btn-outline-info btn-sm">
                            <span class="fas fa-search"></span> Buscar
                        </button>
                        <br/>
                        <button onclick="criarListagemDeBuscaDeClientes();" type="button" class="btn btn-outline-info btn-block btn-sm" style="margin-top:10px;">
                            <span class="fas fa-search-plus"></span> Exibir todos
                        </button>
                    </div>
                </div>
                <div id="respostaClienteParaPedido"></div>
                    
                </div>
            </div>
        </div>`

    document.getElementById('modal2').innerHTML = codigoHTML;
    $('#modalBuscarClienteClassePedido').modal('show')
}

//funcao responsavel por criar a listagem do cliente na classe periodo
function criarListagemDeBuscaDeClientes() {
    let codigoHTML = ``

    codigoHTML += `<table class="table table-sm col-12 mx-auto" style="margin-top:10px">
        <thead class="thead-dark">
            <tr>
                <th scope="col">Nome</th>
                <th scope="col">Telefone</th>
                <th scope="col">Selecionar</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="table-light text-dark"><strong><span class="fas fa-hamburger"></span> Donalds</strong></td>
                <td class="table-light"><strong>(22)0000000000</strong></td>
                <td class="table-light text-center"><button onclick="preencherDadosPedidoIncluirDadosEmPedido('cliente');" type="button" class="btn btn-primary btn-sm"><span class="fas fa-check"></span></button></td>
            </tr>
        </tbody>
    </table>`

    document.getElementById('respostaClienteParaPedido').innerHTML = codigoHTML;
}

//funcao responsavel por gerar o modal de selecao do produto
function modalBuscarProduto() {
    let codigoHTML = ``

    codigoHTML += `<div class="modal fade" id="modalBuscarProdutoClassePedido" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-scrollable float-right">
            <div class="modal-content" style="background-color:#e5e5e5">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel"><span class="fas fa-hamburger"></span> Produtos</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                <h5 class="text-center"><span class="fas fa-user"></span> Buscar Produtos</h5>
                <div class="card-deck col-10 mx-auto d-block">
                    <div class="input-group mb-3">
                        <input id="nome" type="text" class="form-control form-control-sm mousetrap" placeholder="Nome">
                        <button type="button" class="btn btn-outline-info btn-sm">
                            <span class="fas fa-search"></span> Buscar
                        </button>
                        <br/>
                        <button onclick="criarListagemDeBuscaDeProduto();" type="button" class="btn btn-outline-info btn-block btn-sm" style="margin-top:10px;">
                            <span class="fas fa-search-plus"></span> Exibir todos
                        </button>
                    </div>
                </div>
                <div id="respostaProdutoParaPedido"></div>
                    
                </div>
            </div>
        </div>`

    document.getElementById('modal2').innerHTML = codigoHTML;
    $('#modalBuscarProdutoClassePedido').modal('show')
}

//funcao responsavel por criar a listagem do produtos na classe periodo
function criarListagemDeBuscaDeProduto() {
    let codigoHTML = ``

    codigoHTML += `<table class="table table-sm col-12 mx-auto" style="margin-top:10px">
        <thead class="thead-dark">
            <tr>
                <th scope="col">Nome</th>
                <th scope="col">Preço</th>
                <th scope="col">Estoque</th>
                <th scope="col">Quantidade</th>
                <th scope="col">Selecionar</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="table-light col-2"><strong><span class="fas fa-hamburger"></span> Donalds</strong></td>
                <td class="table-light text-danger"><strong>R$2,50</strong></td>
                <td class="table-success text-center"><strong>200</strong></td>
                <td class="table-light"><input type="Number" class="form-control form-control-sm" value=1></td>
                <td class="table-light text-center"><button onclick="preencherDadosPedidoIncluirDadosEmPedido('produto');" type="button" class="btn btn-primary btn-sm"><span class="fas fa-check"></span> </button></td>
            </tr>
        </tbody>
    </table>`

    document.getElementById('respostaProdutoParaPedido').innerHTML = codigoHTML;
}

//funcao responsavel por gerar o modal de selecao do produto
function modalBuscarMotoboy() {
    let codigoHTML = ``

    codigoHTML += `<div class="modal fade" id="modalBuscarMotoboyClassePedido" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-scrollable float-right">
            <div class="modal-content" style="background-color:#e5e5e5">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel"><span class="fas fa-hamburger"></span> Motoboys</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                <h5 class="text-center"><span class="fas fa-user"></span> Buscar Motoboys</h5>
                <div class="card-deck col-10 mx-auto d-block">
                    <div class="input-group mb-3">
                        <input id="nome" type="text" class="form-control form-control-sm mousetrap" placeholder="Nome">
                        <button type="button" class="btn btn-outline-info btn-sm">
                            <span class="fas fa-search"></span> Buscar
                        </button>
                        <br/>
                        <button onclick="criarListagemDeBuscaDeMotoboy();" type="button" class="btn btn-outline-info btn-block btn-sm" style="margin-top:10px;">
                            <span class="fas fa-search-plus"></span> Exibir todos
                        </button>
                    </div>
                </div>
                <div id="respostaMotoboyParaPedido"></div>
                    
                </div>
            </div>
        </div>`

    document.getElementById('modal2').innerHTML = codigoHTML;
    $('#modalBuscarMotoboyClassePedido').modal('show')
}

//funcao responsavel por criar a listagem do produtos na classe periodo
function criarListagemDeBuscaDeMotoboy() {
    let codigoHTML = ``

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
        <tbody>
            <tr>
                <td class="table-light text-dark"><strong><span class="fas fa-hamburger"></span> Donalds</strong></td>
                <td class="table-light">(22)0000000000</td>
                <td class="table-light">
                    <select class="form-control form-control-sm">
                        <option value="1">Lumiar - Nova Friburgo</option>
                        <option value="2">São Pedro - Nova Friburgo</option>
                    </select>
                </td>
                <td class="table-light"><strong><span class="badge badge-danger">Aguardo</span></strong></td>
                <td class="table-light text-center"><button onclick="preencherDadosPedidoIncluirDadosEmPedido('motoboy');" type="button" class="btn btn-primary btn-sm"><span class="fas fa-check"></span> </button></td>
            </tr>
            <tr>
                <td class="table-light text-dark"><strong><span class="fas fa-hamburger"></span> Donalds</strong></td>
                <td class="table-light">(22)0000000000</td>
                <td class="table-light">
                    <select class="form-control form-control-sm">
                    </select>
                </td>
                <td class="table-light"><strong><span class="badge badge-success">Disponivel</span></strong></td>
                <td class="table-light text-center"><button onclick="preencherDadosPedidoIncluirDadosEmPedido('motoboy');" type="button" class="btn btn-primary btn-sm"><span class="fas fa-check"></span> </button></td>
            </tr>
        </tbody>
    </table>`

    document.getElementById('respostaMotoboyParaPedido').innerHTML = codigoHTML;
}

//funcao reponsavel por preencher os campos e incluir os dados na variavel de pedido
function preencherDadosPedidoIncluirDadosEmPedido(tipo) {
    if (tipo == 'cliente') {
        //let dados = vetorDeDadosPedido.filter(function(dado){return dado==id})
        document.getElementById('nomecliente').value = 'teste'
        document.getElementById('telefonecliente').innerHTML = '<option value="1">(22)25421-3214</option><option value="2">(22)26541-2514</option>'
        document.getElementById('enderecocliente').innerHTML = '<option value="1">Lumiar</option><option value="2">São Pedro</option>'
    } else if (tipo == 'produto') {
        $('#listagemDeProdutoSelecionadoPedido').append(`<tr>
        <td class="table-warning col-2"><span class="fas fa-map-marker-alt"></span> Donalds</td>
        <td class="table-warning text-danger"><strong>R$2,50</strong></td>
        <td class="table-warning"><input type="Number" class="form-control form-control-sm" value=5></td>
        <td class="table-warning text-center"><button type="button" class="btn btn-outline-danger btn-sm"><span class="fas fa-trash"></span></button></td>
    </tr>`)
    } else if (tipo == 'motoboy') {
        document.getElementById('nomemotoboy').value = 'teste'
        document.getElementById('telefonemotoboy').value = '(22)25421-3214'
    }
}

//funcao responsavel por atualizar os dados do pedido
function atualizarDadoPedido() {
    telaModalDeCriacaoDePedido();
    navegacaoModalDeCriacao(4);
}

//funcao responsavel por gerar a lista de pedidos abertos para pagamento
function listaDePedidosAbertosParaPagamento() {
    let codigoHTML = ``

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
            <tr>
                <td class="table-warning text-dark"><strong><span class="fas fa-sticky-note"></span> Donalds chocolate</strong></td>
                <td class="table-warning">O melhor da casa</td>
                <td class="table-warning"><strong>R$ 0.50</strong></td>
                <td class="table-warning text-danger"><strong>Hello</strong></td>
                <td class="table-warning">
                    <button onclick="atualizarDadoPedido();" type="button" class="btn btn-primary btn-sm"><span class="fas fa-edit"></span> Alterar</button>
                    <button type="button" class="btn btn-primary btn-sm" style="margin-left:5px;"><span class="fas fa-print"></span> Reimprimir</button>
                </td>
                <td class="table-warning">
                    <button type="button" class="btn btn-success btn-sm"><span class="fas fa-dolly"></span> Entregue</button>
                    <button type="button" class="btn btn-outline-danger btn-sm" style="margin-left:5px;"><span class="fas fa-ban"></span> Cancelar</button>
                </td>
            </tr>
        </tbody>
    </table>`

    document.getElementById('respostaListaDePedidosAbertosPagamento').innerHTML = codigoHTML;

}