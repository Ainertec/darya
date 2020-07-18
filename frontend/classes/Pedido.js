// ------------------------------------------- Classe Pedido ------------------------------------------

let VETORDEPEDIDOSCLASSEPEDIDO = [], VETORDEPRODUTOSCLASSEPEDIDO = [], DADOSPEDIDO = JSON.parse(`{}`);

//funcao responsavel por gerar a tela de criar pedido
function telaModalDeCriacaoDePedido(tipo) {
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
                    <div id="pagExtra">
                        <h5 class="text-center" style="margin-bottom: 40px; margin-top: 30px;"><span class="fas fa-motorcycle"></span> Informações extras</h5>
                        <form style="margin-top:20px;">
                            <div class="form-group">
                                <label for="formaPagamento">Forma de pagamento:</label>
                                <select class="form-control form-control-sm" id="formaPagamento">
                                    <option value="Dinheiro sem troco">Dinheiro sem troco</option>
                                    <option value="Dinheiro com troco">Dinheiro com troco</option>
                                    <option value="Cartão crédito">Cartão crédito</option>
                                    <option value="Cartão débito">Cartão débito</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="formaDeRequisicaoPedido">Forma de pagamento:</label>
                                <select class="form-control form-control-sm" id="formaDeRequisicaoPedido">
                                    <option value="Ifood">Ifood</option>
                                    <option value="Whatsapp">Whatsapp</option>
                                    <option value="Instagram">Instagram</option>
                                    <option value="Pronta entrega">Pronta entrega</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="observacao">Observação:</label>
                                <textArea type="text" class="form-control" id="observacao">Nenhuma.</textArea>
                            </div>
                        </form>
                    </div>
                    
                </div>
                <div class="modal-footer" id="botaoNavPedido">
                    <button id="anterior" onclick="if(this.value>1){console.log(this.value=--proximo.value); navegacaoModalDeCriacao(this.value,'${tipo}')}" value=1 type="button" class="btn btn-outline-dark"><span class="fas fa-chevron-left"></span> Voltar</button>
                    <button id="proximo" onclick="if(this.value<5){console.log(this.value=++anterior.value); navegacaoModalDeCriacao(this.value,'${tipo}')}" value=1 type="button" class="btn btn-success">Próximo <span class="fas fa-chevron-right"></span></button>    
                </div>
                <div class="modal-footer" id="botaoConfirmacao">`
    if (tipo == 'cadastrar') {
        codigoHTML += `<button onclick="cadastrarPedido();" type="button" class="btn btn-primary btn-block"><span class="fas fa-check-double"></span> Confirmar e concluir</button>`
    } else if (tipo == 'atualizar') {
        codigoHTML += `<button onclick="atualizarPedido(this.value);" id="botaoAtualizarPedido" type="button" class="btn btn-primary btn-block"><span class="fas fa-check-double"></span> Modificar e concluir</button>`
    }
    codigoHTML += `</div>
            </div>
        </div>`

    document.getElementById('modal').innerHTML = codigoHTML;
    $('#modalCriarPedidoClassePedido').modal('show')

    $("#pagProduto").animate({ height: 'hide' });
    $("#pagMotoboy").animate({ height: 'hide' });
    $("#pagExtra").animate({ height: 'hide' });
    $("#botaoConfirmacao").animate({ height: 'hide' });
}

//funcao responsavel pela navegacao do modal de criacao de pedido
function navegacaoModalDeCriacao(pag) {
    if (pag == 1) {
        $("#pagCliente").animate({ height: 'show' });
        $("#pagProduto").animate({ height: 'hide' });
        $("#pagMotoboy").animate({ height: 'hide' });
        $("#pagExtra").animate({ height: 'hide' });
        $("#botaoConfirmacao").animate({ height: 'hide' });
    } else if (pag == 2) {
        $("#pagCliente").animate({ height: 'hide' });
        $("#pagProduto").animate({ height: 'show' });
        $("#pagMotoboy").animate({ height: 'hide' });
        $("#botaoConfirmacao").animate({ height: 'hide' });
    } else if (pag == 3) {
        $("#pagCliente").animate({ height: 'hide' });
        $("#pagProduto").animate({ height: 'hide' });
        $("#pagMotoboy").animate({ height: 'show' });
        $("#pagExtra").animate({ height: 'hide' });
        $("#botaoConfirmacao").animate({ height: 'hide' });
    } else if (pag == 4) {
        $("#pagCliente").animate({ height: 'hide' });
        $("#pagProduto").animate({ height: 'hide' });
        $("#pagMotoboy").animate({ height: 'hide' });
        $("#pagExtra").animate({ height: 'show' });
        $("#botaoConfirmacao").animate({ height: 'hide' });
    } else if (pag == 5) {
        $("#pagCliente").animate({ height: 'show' });
        $("#pagProduto").animate({ height: 'show' });
        $("#pagMotoboy").animate({ height: 'show' });
        $("#pagExtra").animate({ height: 'show' });
        $("#botaoConfirmacao").animate({ height: 'show' });
        $("#botaoNavPedido").animate({ height: 'hide' });
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
                        <button onclick="criarListagemDeBuscaDeClientes('nome');" type="button" class="btn btn-outline-info btn-sm">
                            <span class="fas fa-search"></span> Buscar
                        </button>
                        <br/>
                        <button onclick="criarListagemDeBuscaDeClientes('todos');" type="button" class="btn btn-outline-info btn-block btn-sm" style="margin-top:10px;">
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
async function criarListagemDeBuscaDeClientes(tipo) {
    let codigoHTML = ``, json = null;

    if (tipo == 'nome') {
        json = await requisicaoGET(`clients/${document.getElementById('nome').value}`)
    } else if (tipo == 'todos') {
        json = await requisicaoGET(`clients`)
    }

    console.log(json)

    codigoHTML += `<table class="table table-sm col-12 mx-auto" style="margin-top:10px">
        <thead class="thead-dark">
            <tr>
                <th scope="col">Nome</th>
                <th scope="col">Telefone</th>
                <th scope="col">Selecionar</th>
            </tr>
        </thead>
        <tbody>`
    json.data.forEach(function (item) {
        codigoHTML += `<tr>
                <td class="table-light text-dark"><strong><span class="fas fa-hamburger"></span> ${item.name}</strong></td>
                <td class="table-light"><strong>${item.phone[0]}</strong></td>
                <td class="table-light text-center"><button onclick="preencherDadosPedidoIncluirDadosEmPedido('cliente','${item._id}');" type="button" class="btn btn-primary btn-sm"><span class="fas fa-check"></span></button></td>
            </tr>`
    });
    codigoHTML += `</tbody>
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
                        <button onclick=""criarListagemDeBuscaDeProduto('nome');" type="button" class="btn btn-outline-info btn-sm">
                            <span class="fas fa-search"></span> Buscar
                        </button>
                        <br/>
                        <button onclick="criarListagemDeBuscaDeProduto('todos');" type="button" class="btn btn-outline-info btn-block btn-sm" style="margin-top:10px;">
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
async function criarListagemDeBuscaDeProduto(tipo) {
    let codigoHTML = ``, json = null;

    if (tipo == 'nome') {
        json = await requisicaoGET(`products/${document.getElementById('nome').value}`)
    } else if (tipo == 'todos') {
        json = await requisicaoGET(`products`)
    }

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
        <tbody>`
    json.data.forEach(function (item) {
        codigoHTML += `<tr>
                <td class="table-light col-2"><strong><span class="fas fa-hamburger"></span> ${item.name}</strong></td>
                <td class="table-light text-danger"><strong>R$${item.price}</strong></td>
                <td class="table-success text-center"><strong>${item.stock}</strong></td>
                <td class="table-light"><input id="quantidadeProduto${item._id}" type="Number" class="form-control form-control-sm" value=1></td>
                <td class="table-light text-center"><button onclick="preencherDadosPedidoIncluirDadosEmPedido('produto','${item._id}', quantidadeProduto${item._id}.value );" type="button" class="btn btn-primary btn-sm"><span class="fas fa-check"></span> </button></td>
            </tr>`
    });
    codigoHTML += `</tbody>
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
                        <button onclick="criarListagemDeBuscaDeMotoboy('nome');" type="button" class="btn btn-outline-info btn-sm">
                            <span class="fas fa-search"></span> Buscar
                        </button>
                        <br/>
                        <button onclick="criarListagemDeBuscaDeMotoboy('ativos');" type="button" class="btn btn-outline-info btn-block btn-sm" style="margin-top:10px;">
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
async function criarListagemDeBuscaDeMotoboy(tipo) {
    let codigoHTML = ``, json = null;

    if (tipo == 'nome') {
        json = await requisicaoGET(`deliverymans/${document.getElementById('nome').value}`)
    } else if (tipo == 'ativos') {
        json = await requisicaoGET('deliverymans/working_days')
    }

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
        <tbody>`
    json.data.forEach(function (item) {
        codigoHTML += `<tr>
                <td class="table-light text-dark"><strong><span class="fas fa-hamburger"></span> ${item.name}</strong></td>
                <td class="table-light">${item.phone}</td>
                <td class="table-light">`
        if (item.hasDelivery) {
            // fanta fazer a busca dos bairros que ele tem q ir pelos pedidos já existentes
            codigoHTML += `<select class="form-control form-control-sm">
                        <option value="1">Lumiar - Nova Friburgo</option>
                    </select>`
        } else {
            codigoHTML += `Nenhuma`
        }
        codigoHTML += `</td>`
        if (item.available == false) {
            if (item.hasDelivery) {
                codigoHTML += `<td class="table-light"><strong><span class="badge badge-warning">Aguardo</span></strong></td>`
            } else {
                codigoHTML += `<td class="table-light"><strong><span class="badge badge-success">Disponivel</span></strong></td>`
            }
            codigoHTML += `<td class="table-light text-center"><button onclick="preencherDadosPedidoIncluirDadosEmPedido('motoboy','${item._id}');" type="button" class="btn btn-primary btn-sm"><span class="fas fa-check"></span> </button></td>`
        } else {
            codigoHTML += `<td class="table-light"><strong><span class="badge badge-danger">Ocupado</span></strong></td>`
            codigoHTML += `<td class="table-light text-center"><button onclick="preencherDadosPedidoIncluirDadosEmPedido('motoboy','${item._id}');" type="button" class="btn btn-primary btn-sm" disabled><span class="fas fa-check"></span> </button></td>`
        }
        codigoHTML += `</tr>`
    });
    codigoHTML += `</tbody>
    </table>`

    document.getElementById('respostaMotoboyParaPedido').innerHTML = codigoHTML;
}

//funcao responsavel por preencher os campos e incluir os dados na variavel de pedido
async function preencherDadosPedidoIncluirDadosEmPedido(tipo, id, quantidade) {
    if (tipo == 'cliente') {
        let json = await requisicaoGET(`clients`)
        let dado = json.data.find(element => element._id == id)

        DADOSPEDIDO.cliente_id = dado._id;

        document.getElementById('nomecliente').value = dado.name
        dado.phone.forEach(function (item) {
            $('#telefonecliente').append(`<option>${item}</option>`)
        });
        dado.address.forEach(function (item) {
            $('#enderecocliente').append(`<option value="${item._id}">${item.street}, nº ${item.number} - ${item.district.name} - ${item.district.city}</option>`)
        });
    } else if (tipo == 'produto') {
        let json = await requisicaoGET(`products`)
        let dado = json.data.find(element => element._id == id)

        console.log(dado)

        VETORDEPRODUTOSCLASSEPEDIDO.push(JSON.parse(`{"_id":"${dado._id}","ref":"lisProdPed${dado._id}"}`))

        $('#listagemDeProdutoSelecionadoPedido').append(`<tr id="linhaProd${dado._id}">
        <td class="table-warning col-2"><span class="fas fa-map-marker-alt"></span> ${dado.name}</td>
        <td class="table-warning text-danger"><strong>R$${dado.price}</strong></td>
        <td class="table-warning"><input id="lisProdPed${dado._id}" type="Number" class="form-control form-control-sm" value=${quantidade}></td>
        <td class="table-warning text-center"><button onclick="removerProdutoDaTabelaeVetor('${dado._id}');" type="button" class="btn btn-outline-danger btn-sm"><span class="fas fa-trash"></span></button></td>
    </tr>`)
    } else if (tipo == 'motoboy') {
        let json = await requisicaoGET('deliverymans/working_days')
        let dado = json.data.find(element => element._id == id)

        DADOSPEDIDO.motoboy_id = dado._id

        document.getElementById('nomemotoboy').value = dado.name
        document.getElementById('telefonemotoboy').value = dado.phone
    }
}

//funcao responsavel por remover um produto da tabela e do vetor de produtos
function removerProdutoDaTabelaeVetor(id) {
    const produtoPosition = VETORDEPRODUTOSCLASSEPEDIDO.findIndex(element => element._id == id)
    VETORDEPRODUTOSCLASSEPEDIDO.splice(produtoPosition, 1)
    document.getElementById("listagemDeProdutoSelecionadoPedido").removeChild(document.getElementById(`linhaProd${id}`))
}

//funcao responsavel por atualizar os dados do pedido
async function atualizarDadoPedido(id) {
    await telaModalDeCriacaoDePedido('atualizar');
    await navegacaoModalDeCriacao(5);

    let dado = VETORDEPEDIDOSCLASSEPEDIDO.find(element => element._id == id)

    await preencherDadosPedidoIncluirDadosEmPedido('cliente', dado.client.client_id, null)
    document.getElementById('enderecocliente').value = (dado.address.client_address_id).toString()
    dado.items.forEach(function (item) {
        preencherDadosPedidoIncluirDadosEmPedido('produto', item.product._id, item.quantity)
    });
    preencherDadosPedidoIncluirDadosEmPedido('motoboy', dado.deliveryman._id, null)

    document.getElementById('formaPagamento').value = dado.payment
    document.getElementById('formaDeRequisicaoPedido').value = dado.source
    document.getElementById('observacao').value = dado.note
    document.getElementById('botaoAtualizarPedido').value = dado._id

}

//funcao responsavel por gerar a lista de pedidos abertos para pagamento
function listaDePedidosAbertosParaPagamento(json) {
    let codigoHTML = ``

    codigoHTML += `<tr>
        <td class="table-warning text-dark"><strong><span class="fas fa-sticky-note"></span> ${json.identification}</strong></td>
        <td class="table-warning"><strong>${json.client.name}</strong></td>
        <td class="table-warning text-danger"><strong>R$ ${json.total}</strong></td>
        <td class="table-warning">${json.deliveryman.name}</td>
        <td class="table-warning">
            <button onclick="atualizarDadoPedido('${json._id}');" type="button" class="btn btn-primary btn-sm"><span class="fas fa-edit"></span> Alterar</button>
            <button type="button" class="btn btn-primary btn-sm" style="margin-left:5px;"><span class="fas fa-print"></span> Reimprimir</button>
        </td>
        <td class="table-warning">
            <button type="button" class="btn btn-success btn-sm"><span class="fas fa-dolly"></span> Entregue</button>
            <button type="button" class="btn btn-outline-danger btn-sm" style="margin-left:5px;"><span class="fas fa-ban"></span> Cancelar</button>
        </td>
    </tr>`

    return codigoHTML;

}

//funcao responsavel por buscar dado do pedido para atualizar
async function buscarDadosAtualizar(tipo) {
    let codigoHTML = ``, json = null;

    if (tipo == 'codigo') {
        json = await requisicaoGET(`orders/${document.getElementById('nomePedidoPagamento').value}`)
    } else if (tipo == 'todos') {
        json = await requisicaoGET('orders')
    }

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
    `

    json.data.forEach(function (item) {
        VETORDEPEDIDOSCLASSEPEDIDO.push(item)
        codigoHTML += listaDePedidosAbertosParaPagamento(item)
    });

    codigoHTML += `</tbody>
    </table>`

    document.getElementById('respostaListaDePedidosAbertosPagamento').innerHTML = codigoHTML;

}

//funcao responsavel por cadastrar um pedido
async function cadastrarPedido() {
    let json = `{
        "client_id":"${DADOSPEDIDO.cliente_id}",
        "deliveryman":"${DADOSPEDIDO.motoboy_id}",
        "client_address_id":"${document.getElementById('enderecocliente').value}",
        "source":"${document.getElementById('formaDeRequisicaoPedido').value}",
        "items":[`
    VETORDEPRODUTOSCLASSEPEDIDO.forEach(function (item) {
        json += `{
                "product":"${item._id}",
                "quantity":${document.getElementById('lisProdPed' + item._id).value}
            }`
    });
    json += `],
        "payment":"${document.getElementById('formaPagamento').value}",
        "note":"${document.getElementById('observacao').value}"
    }`

    await requisicaoPOST('orders', JSON.parse(json))
    console.log(JSON.parse(json))
}

//funcao responsavel por atualizar um pedido
async function atualizarPedido(id) {
    let json = `{
        "client_id":"${DADOSPEDIDO.cliente_id}",
        "deliveryman":"${DADOSPEDIDO.motoboy_id}",
        "client_address_id":"${document.getElementById('enderecocliente').value}",
        "source":"${document.getElementById('formaDeRequisicaoPedido').value}",
        "items":[`
    VETORDEPRODUTOSCLASSEPEDIDO.forEach(function (item) {
        json += `{
                "product":"${item._id}",
                "quantity":${document.getElementById('lisProdPed' + item._id).value}
            }`
    });
    json += `],
        "payment":"${document.getElementById('formaPagamento').value}",
        "note":"${document.getElementById('observacao').value}"
    }`

    await requisicaoPUT(`orders/${id}`, JSON.parse(json))

    console.log(JSON.parse(json))
    console.log(id)
}

//funcao responsavel por excluir um pedido
async function excluirPedido(id) {
    await requisicaoDELETE(`orders/${id}`, '')
}

//funcao responsavel por inicializar variaveis globais do classe pedido
function inicializarVariaveisClassePedido() {
    VETORDEPRODUTOSCLASSEPEDIDO = []
    DADOSPEDIDO = JSON.parse(`{}`)
}