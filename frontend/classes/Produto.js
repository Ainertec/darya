// --------------------------------------------------- Classe Produto ---------------------------------------------------

//funcao responsavel por gerar a tela de busca do produto
function telaDeBuscarProduto() {
    let codigoHTML = ``;

    codigoHTML += `<h4 class="text-center"><span class="fas fa-hamburger"></span> Buscar Produto</h4>
                    <div class="card-deck col-4 mx-auto d-block">
                        <div class="input-group mb-3">
                            <input id="nome" type="text" class="form-control form-control-sm mousetrap" placeholder="Nome do produto">
                            <button type="button" class="btn btn-outline-info btn-sm">
                                <span class="fas fa-search"></span> Buscar
                            </button>
                            <br/>
                            <button onclick="gerarListaDeProdutos();" type="button" class="btn btn-outline-info btn-block btn-sm" style="margin-top:10px;">
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
function gerarListaDeProdutos() {
    let codigoHTML = ``

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
                        <tbody>
                            <tr>
                                <td class="table-warning text-dark"><strong><span class="fas fa-hamburger"></span> Donalds chocolate</strong></td>
                                <td class="table-warning">O melhor da casa</td>
                                <td class="table-warning">20</td>
                                <td class="table-warning"><strong>R$ 0.50</strong></td>
                                <td class="table-warning text-danger"><strong>R$ 2.50</strong></td>
                                <td class="table-warning"><button onclick="modalTelaCadastrarouAtualizarProduto('atualizar')" type="button" class="btn btn-primary btn-sm"><span class="fas fa-edit"></span> Editar</button></td>
                                <td class="table-warning"><button type="button" class="btn btn-outline-danger btn-sm"><span class="fas fa-trash"></span> Excluir</button></td>
                            </tr>
                        </tbody>
                    </table>`

    document.getElementById('resposta').innerHTML = codigoHTML;
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
        codigoHTML += `<button type="button" class="btn btn-primary btn-block"><span class="fas fa-check-double"></span> Adicionar</button>`
    } else if (tipo == 'atualizar') {
        codigoHTML += `<button type="button" class="btn btn-success btn-block"><span class="fas fa-edit"></span> Modificar</button>
                                 <button type="button" class="btn btn-outline-danger btn-block"><span class="fas fa-check-trash"></span> Excluir</button>`
    }
    codigoHTML += `</div>
                        </div>
                    </div>
                </div>`

    document.getElementById('modal').innerHTML = codigoHTML;

    $('#modalClasseProduto').modal('show')
}