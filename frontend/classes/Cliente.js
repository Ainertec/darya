// --------------------------------------------------- Classe Cliente ---------------------------------------------------

//funcao responsavel por gerar a tela de busca do cliente
function telaDeBuscarCliente() {
    let codigoHTML = ``;

    codigoHTML += `<h4 class="text-center"><span class="fas fa-user"></span> Buscar Cliente</h4>
                    <div class="card-deck col-4 mx-auto d-block">
                        <div class="input-group mb-3">
                            <input id="nome" type="text" class="form-control form-control-sm mousetrap" placeholder="Nome do cliente">
                            <button type="button" class="btn btn-outline-info btn-sm">
                                <span class="fas fa-search"></span> Buscar
                            </button>
                            <br/>
                            <button onclick="gerarListaDeClientes();" type="button" class="btn btn-outline-info btn-block btn-sm" style="margin-top:10px;">
                                <span class="fas fa-search-plus"></span> Exibir todos
                            </button>
                            <button onclick="modalTelaCadastrarouAtualizarCliente('cadastrar');" type="button" class="btn btn-warning btn-block" style="margin-top:60px;">
                                <span class="fas fa-plus"></span> Adicionar cliente
                            </button>
                        </div>
                    </div>
                    <div id="resposta"></div>`

    document.getElementById('janela2').innerHTML = codigoHTML;
}

//funcao responsavel por gerar a lista com os bairros
function gerarListaDeClientes() {
    let codigoHTML = ``

    codigoHTML += `<h5 class="text-center" style="margin-top:80px">Listagem de bairros</h5>
                    <table class="table table-sm col-8 mx-auto" style="margin-top:10px">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Telefone</th>
                                <th scope="col">Endereço</th>
                                <th scope="col">Editar</th>
                                <th scope="col">Excluir</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="table-warning"><strong><span class="fas fa-user"></span> Aldair Camargo</strong></td>
                                <td class="table-warning">
                                    <select class="form-control form-control-sm">
                                        <option value="1">(22) 98153-3173</option>
                                        <option value="2">(22) 2542-9670</option>
                                    </select>
                                </td>
                                <td class="table-warning text-danger">
                                    <select class="form-control form-control-sm">
                                        <option value="1">Estrada Mury a Lumiar KM18</option>
                                        <option value="2">São Pedro</option>
                                    </select>
                                </td>
                                <td class="table-warning"><button onclick="modalTelaCadastrarouAtualizarCliente('atualizar');" type="button" class="btn btn-primary btn-sm"><span class="fas fa-edit"></span> Editar</button></td>
                                <td class="table-warning"><button type="button" class="btn btn-outline-danger btn-sm"><span class="fas fa-trash"></span> Excluir</button></td>
                            </tr>
                        </tbody>
                    </table>`

    document.getElementById('resposta').innerHTML = codigoHTML;
}

//funcao responsavel por gerar o modal de cadastrar/atualizar/remover bairro
function modalTelaCadastrarouAtualizarCliente(tipo) {
    let codigoHTML = ``

    codigoHTML += `<div class="modal fade" id="modalClasseBairro" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable modal-lg">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel"><span class="fas fa-user"></span> Dados Cliente</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label for="nomecliente">Nome:</label>
                                    <input type="text" class="form-control" id="nomecliente" placeholder="Nome do cliente">
                                </div>

                                <table class="table table-sm col-12 mx-auto" style="margin-top:80px">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th scope="col">Telefone</th>
                                            <th scope="col">Editar</th>
                                            <th scope="col">Excluir</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="table-warning"><span class="fas fa-phone"></span> (22) 2542-9670</td>
                                            <td class="table-warning"><button type="button" class="btn btn-primary btn-sm"><span class="fas fa-edit"></span> Editar</button></td>
                                            <td class="table-warning"><button type="button" class="btn btn-outline-danger btn-sm"><span class="fas fa-trash"></span> Excluir</button></td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div class="form-group">
                                    <label for="telefonecliente">Telefone:</label>
                                    <div class="input-group mb-3">
                                        <input type="tel" class="form-control" id="telefonecliente" placeholder="Exemplo:(00) 00000-0000" aria-describedby="botaoadicionartelefone">
                                        <div class="input-group-append">
                                            <button class="btn btn-success" type="button" id="botaoadicionartelefone"><span class="fas fa-plus"></span> Adicionar</button>
                                        </div>
                                    </div>
                                </div>

                                <table class="table table-sm col-12 mx-auto" style="margin-top:80px">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th scope="col">Rua</th>
                                            <th scope="col">Número</th>
                                            <th scope="col">Bairro - Cidade</th>
                                            <th scope="col">Complemento</th>
                                            <th scope="col">Editar</th>
                                            <th scope="col">Excluir</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="table-warning"><span class="fas fa-map-marker-alt"></span> Estrada Mury a Lumiar KM18</td>
                                            <td class="table-warning">00</td>
                                            <td class="table-warning">São Pedro - Nova Friburgo</td>
                                            <td class="table-warning">Ultimo sitio pra cima da pousada jardim real</td>
                                            <td class="table-warning"><button type="button" class="btn btn-primary btn-sm"><span class="fas fa-edit"></span> Editar</button></td>
                                            <td class="table-warning"><button type="button" class="btn btn-outline-danger btn-sm"><span class="fas fa-trash"></span> Excluir</button></td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div class="form-group">
                                    <label for="ruacliente">Rua:</label>
                                    <input type="text" class="form-control" id="ruacliente" placeholder="Exemplo: Rua Sete de Setembro">
                                </div>
                                <div class="form-group">
                                    <label for="numerocasacliente">Número da casa:</label>
                                    <input type="Number" class="form-control" id="numerocasacliente">
                                </div>
                                <div class="form-group">
                                    <label for="bairrocidadecliente">Bairro - Cidade:</label>
                                    <select class="form-control form-control-sm" id="bairrocidadecliente">
                                        <option value="1">Estrada Mury a Lumiar KM18 - Nova Friburgo</option>
                                        <option value="2">São Pedro - Nova Friburgo</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="complementocliente">Complemento:</label>
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control" id="complementocliente">
                                        <div class="input-group-append">
                                            <button class="btn btn-success" type="button" id="botaoadicionartelefone"><span class="fas fa-plus"></span> Adicionar</button>
                                        </div>
                                    </div>
                                </div>

                            </form>
                        </div>
                        <div class="modal-footer">`
    if (tipo == 'cadastrar') {
        codigoHTML += `<button type="button" class="btn btn-primary btn-block"><span class="fas fa-check-double"></span> Salvar</button>`
    } else if (tipo == 'atualizar') {
        codigoHTML += `<button type="button" class="btn btn-primary btn-block"><span class="fas fa-edit"></span> Modificar</button>
                        <button type="button" class="btn btn-outline-danger btn-block"><span class="fas fa-trash"></span> Excluir</button>`
    }
    codigoHTML += `</div>
                        </div>
                    </div>
                </div>`

    document.getElementById('modal2').innerHTML = codigoHTML;

    $('#modalClasseBairro').modal('show')
    alertaConfirmacao()
}