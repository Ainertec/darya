// --------------------------------------------------- Classe Produto ---------------------------------------------------

//vetor responsavel por guardar os dados dos produtos em tempo de execucao
let VETORDEPRODUTOSCLASSEPRODUTO = [];

//funcao responsavel por gerar a tela de busca do produto
function telaDeBuscarProduto() {
    let codigoHTML = ``;

    codigoHTML += `<h4 class="text-center"><span class="fas fa-hamburger"></span> Buscar Produto</h4>
                    <div class="card-deck col-4 mx-auto d-block">
                        <div class="input-group mb-3">
                            <input id="nome" type="text" class="form-control form-control-sm mousetrap" placeholder="Nome do produto">
                            <button onclick="buscarDadosProduto('nome');" type="button" class="btn btn-outline-info btn-sm">
                                <span class="fas fa-search"></span> Buscar
                            </button>
                            <br/>
                            <button onclick="buscarDadosProduto('todos')" type="button" class="btn btn-outline-info btn-block btn-sm" style="margin-top:10px;">
                                <span class="fas fa-search-plus"></span> Exibir todos
                            </button>
                            <button onclick="modalTelaCadastrarouAtualizarProduto('cadastrar');" type="button" class="btn btn-warning btn-block" style="margin-top:60px;">
                                <span class="fas fa-plus"></span> Adicionar produto
                            </button>
                        </div>
                    </div>
                    <div id="resposta"></div>`

    document.getElementById('janela2').innerHTML = codigoHTML;
}

//funcao responsavel por gerar a lista com os produtos
function gerarListaDeProdutos(json) {
    let codigoHTML = ``

    codigoHTML += `<tr>
        <td class="table-warning text-dark"><strong><span class="fas fa-hamburger"></span> ${json.name}</strong></td>
        <td class="table-warning">${json.description}</td>
        <td class="table-warning">${parseInt(json.stock)}</td>
        <td class="table-warning"><strong>R$ ${(parseFloat(json.cost)).toFixed(2)}</strong></td>
        <td class="table-warning text-danger"><strong>R$ ${(parseFloat(json.price)).toFixed(2)}</strong></td>
        <td class="table-warning"><button onclick="carregarDadosProduto('${json._id}')" type="button" class="btn btn-primary btn-sm"><span class="fas fa-edit"></span> Editar</button></td>
        <td class="table-warning"><button onclick="excluirProduto('${json._id}')" type="button" class="btn btn-outline-danger btn-sm"><span class="fas fa-trash"></span> Excluir</button></td>
    </tr>`

    return codigoHTML;
}

//funcao responsavel por gerar o modal de cadastrar/atualizar/remover produto
function modalTelaCadastrarouAtualizarProduto(tipo) {
    let codigoHTML = ``

    codigoHTML += `<div class="modal fade" id="modalClasseProduto" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel"><span class="fas fa-hamburger"></span> Dados Produto</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label for="nomeproduto">Nome produto:</label>
                                    <input type="text" class="form-control" id="nomeproduto" placeholder="Nome">
                                </div>
                                <div class="form-group">
                                    <label for="precocusto">Preço de custo:</label>
                                    <input type="Number" class="form-control" id="precocusto" placeholder="Preço de custo">
                                </div>
                                <div class="form-group">
                                    <label for="precovenda">Preço de venda:</label>
                                    <input type="Number" class="form-control" id="precovenda" placeholder="Preço de venda">
                                </div>
                                <div class="form-group">
                                    <label for="quantidadeproduto">Quantidade:</label>
                                    <input type="Number" class="form-control" id="quantidadeproduto" placeholder="Quantidade Estoque(Não Obrigatório)">
                                </div>
                                <div class="form-group">
                                    <label for="descricao">Example textarea</label>
                                    <textarea class="form-control" id="descricaoproduto" rows="3">Nenhuma.</textarea>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">`
    if (tipo == 'cadastrar') {
        codigoHTML += `<button onclick="cadastrarProduto();" type="button" class="btn btn-primary btn-block"><span class="fas fa-check-double"></span> Adicionar</button>`
    } else if (tipo == 'atualizar') {
        codigoHTML += `<button id="botaoatualizar" onclick="atualizarProduto(this.value)" type="button" class="btn btn-success btn-block"><span class="fas fa-edit"></span> Modificar</button>
                                 <button id="botaoexcluir" onclick="excluirProduto(this.value)" type="button" class="btn btn-outline-danger btn-block"><span class="fas fa-check-trash"></span> Excluir</button>`
    }
    codigoHTML += `</div>
                        </div>
                    </div>
                </div>`

    document.getElementById('modal').innerHTML = codigoHTML;

    $('#modalClasseProduto').modal('show')
}

//funcao responsavel por buscar os dados dos produtos
async function buscarDadosProduto(tipo) {
    let codigoHTML = ``, json = null;

    VETORDEPRODUTOSCLASSEPRODUTO = []

    if (tipo == 'nome') {
        json = await requisicaoGET(`products/${document.getElementById('nome').value}`)
    } else if (tipo == 'todos') {
        json = await requisicaoGET(`products`)
    }

    codigoHTML += `<h5 class="text-center" style="margin-top:80px">Listagem de produtos</h5>
    <table class="table table-sm col-8 mx-auto" style="margin-top:10px">
        <thead class="thead-dark">
            <tr>
                <th scope="col">Nome</th>
                <th scope="col">Descrição</th>
                <th scope="col">Quantidade</th>
                <th scope="col">Preço custo</th>
                <th scope="col">Preço venda</th>
                <th scope="col">Editar</th>
                <th scope="col">Excluir</th>
            </tr>
        </thead>
        <tbody>`

    console.log(json)

    json.data.forEach(function (item) {
        VETORDEPRODUTOSCLASSEPRODUTO.push(item)
        codigoHTML += gerarListaDeProdutos(item)
    });

    codigoHTML += `</tbody>
    </table>`

    document.getElementById('resposta').innerHTML = codigoHTML;
}

//funcao responsavel por carregar os dados do produto selecionado
function carregarDadosProduto(id) {

    modalTelaCadastrarouAtualizarProduto('atualizar')

    let dado = VETORDEPRODUTOSCLASSEPRODUTO.find(element => element._id == id)

    document.getElementById('nomeproduto').value = dado.name
    document.getElementById('precocusto').value = (parseFloat(dado.cost)).toFixed(2)
    document.getElementById('precovenda').value = (parseFloat(dado.price)).toFixed(2)
    document.getElementById('quantidadeproduto').value = parseInt(dado.stock)
    document.getElementById('descricaoproduto').value = dado.description
    document.getElementById('botaoatualizar').value = dado._id
    document.getElementById('botaoexcluir').value = dado._id
}

//funcao reposanvel por cadastrar um produto
async function cadastrarProduto() {
    let json = `{"name":"${$('#nomeproduto').val()}",
    "description":"${$('#descricaoproduto').val()}",
    "price":${$('#precovenda').val()},
    "cost":${$('#precocusto').val()},
    "stock":${parseInt($('#quantidadeproduto').val())}}`

    await requisicaoPOST('products', JSON.parse(json))

    console.log(JSON.parse(json))
}

//funcao responsavel por atualizar um produto
async function atualizarProduto(id) {
    let dado = VETORDEPRODUTOSCLASSEPRODUTO.filter(function (element) { return element._id == id });

    dado[0].name = document.getElementById('nomeproduto').value
    dado[0].description = document.getElementById('descricaoproduto').value
    dado[0].cost = document.getElementById('precocusto').value
    dado[0].price = document.getElementById('precovenda').value
    dado[0].stock = document.getElementById('quantidadeproduto').value
    delete dado[0]._id
    delete dado[0].updatedAt
    delete dado[0].createdAt
    delete dado[0].__v

    console.log(dado[0])

    await requisicaoPUT(`products/${id}`, dado[0])

    if (validaDadosCampo(['#nome'])) {
        buscarDadosProduto('nome')
    } else {
        buscarDadosProduto('todos')
    }
}

//funcao responsavel por excuir um produto
async function excluirProduto(id) {
    console.log(id)
    await requisicaoDELETE(`products/${id}`, '')
}








//funcao de teste para produto
function testeProduto(tipo) {
    if (tipo == 'donalds') {
        return JSON.parse(`[{"_id":"idj52","nome":"Donalds Chocolate","descricao":"Sabor chocolate","precovenda":2.50,"precocusto":0.50,"quantidade":100}]`)
    } else {
        return JSON.parse(`[{"_id":"rdg63","nome":"Donalds Baunilha","descricao":"Sabor Baunilha","precovenda":2.50,"precocusto":0.50,"quantidade":100},{"_id":"idj52","nome":"Donalds Chocolate","descricao":"Sabor chocolate","precovenda":2.50,"precocusto":0.50,"quantidade":100}]`)
    }
}