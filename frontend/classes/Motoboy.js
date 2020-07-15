// --------------------------------------------------- Classe Motoboy ---------------------------------------------------

//funcao responsavel por gerar a tela de busca Motoboy
function telaDeBuscarMotoboyParaTrabalho() {
    let codigoHTML = ``;

    codigoHTML += `<h4 class="text-center"><span class="fas fa-motorcycle"></span> Buscar Motoboy</h4>
                    <div class="card-deck col-4 mx-auto d-block">
                        <div class="input-group mb-3">
                            <input id="nome" type="text" class="form-control form-control-sm mousetrap" placeholder="Nome do motoboy">
                            <button type="button" class="btn btn-outline-info btn-sm">
                                <span class="fas fa-search"></span> Buscar
                            </button>
                            <br/>
                            <button onclick="gerarListaDeMotoboyParaTrabalho();" type="button" class="btn btn-outline-info btn-block btn-sm" style="margin-top:10px;">
                                <span class="fas fa-search-plus"></span> Exibir ativos
                            </button>
                            <button onclick="gerarListaDeMotoboyParaTrabalho();" type="button" class="btn btn-outline-info btn-block btn-sm" style="margin-top:10px;">
                                <span class="fas fa-search-plus"></span> Exibir todos
                            </button>
                            <button onclick="modalTelaCadastrarouAtualizarMotoboy('cadastrar');" type="button" class="btn btn-warning btn-block" style="margin-top:60px;">
                                <span class="fas fa-plus"></span> Adicionar motoboy
                            </button>
                            <button onclick="modalTelaCadastrarouAtualizarMotoboy('atualizar');" type="button" class="btn btn-outline-danger btn-block" style="margin-top:10px;">
                                <span class="fas fa-plus"></span> Modificar ou excluir motoboy
                            </button>
                        </div>
                    </div>
                    <div id="resposta"></div>`

    document.getElementById('janela2').innerHTML = codigoHTML;
}

//funcao responsavel por gerar a lista com os motoboy para trabalho
function gerarListaDeMotoboyParaTrabalho() {
    let codigoHTML = ``

    codigoHTML += `<h5 class="text-center" style="margin-top:80px">Listagem de motoboys para trabalho</h5>
                    <div class="text-center">
                       <button type="button" class="btn btn-success" style="margin-top:10px;"><span class="fas fa-sync"></span> Reiniciar lista de trabalho</button>
                    </div>
                    <table class="table table-sm col-6 mx-auto" style="margin-top:10px">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Telefone</th>
                                <th scope="col">Status</th>
                                <th scope="col">Relatório</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="table-warning text-dark"><strong><span class="fas fa-biking"></span> Aldair Camargo</strong></td>
                                <td class="table-warning text-dark">(00)00000-0000</td>
                                <td class="table-warning text-dark">
                                    <div class="custom-control custom-switch">
                                    <input type="checkbox" onclick="this.checked? console.log('OK'): console.log('NAO')" class="custom-control-input custom-switch" id="customSwitch1">
                                    <label class="custom-control-label" for="customSwitch1">Trabalhando</label>
                                    </div>
                                </td>
                                <td class="table-warning text-dark"><button type="button" class="btn btn-outline-primary btn-sm"><span class="fas fa-chart-bar"></span> Exibir</button></td>
                            </tr>
                        </tbody>
                    </table>`

    document.getElementById('resposta').innerHTML = codigoHTML;
}

//funcao responsavel por gerar o modal da tela de cadastar/atualizar/remover motoboy
function modalTelaCadastrarouAtualizarMotoboy(tipo) {
    let codigoHTML = ``

    codigoHTML += `<div class="modal fade" id="modalClasseMotoboy" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel"><span class="fas fa-motorcycle"></span> Dados Motoboy</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">`

    if (tipo == 'atualizar') {
        codigoHTML += `<h5 class="text-center">Buscar Motoboy</h5>
                            <div class="card-deck col-12 mx-auto d-block">
                                <div class="input-group mb-3">
                                    <input id="nome" type="text" class="form-control form-control-sm mousetrap" placeholder="Nome do motoboy">
                                    <button type="button" class="btn btn-outline-info btn-sm">
                                        <span class="fas fa-search"></span> Buscar
                                    </button>
                                    <br/>
                                    <button onclick="gerarListaDeMotoboyParaAtualizar();" type="button" class="btn btn-outline-info btn-block btn-sm" style="margin-top:10px;">
                                        <span class="fas fa-search-plus"></span> Exibir todos
                                    </button>
                                </div>
                            </div>
                            <div id="resposta2"></div>`
    }

    codigoHTML += `<form>
                                <div class="form-group">
                                    <label for="nomemotoboy">Nome motoboy:</label>
                                    <input type="text" class="form-control" id="nomemotoboy" placeholder="Nome">
                                </div>
                                <div class="form-group">
                                    <label for="telefonemotoboy">Telefone:</label>
                                    <input type="tel" class="form-control" id="telefonemotoboy" placeholder="Exemplo: (00)00000-0000">
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">`
    if (tipo == 'cadastrar') {
        codigoHTML += `<button type="button" class="btn btn-primary btn-block"><span class="fas fa-check-double"></span> Adicionar</button>`
    } else if (tipo == 'atualizar') {
        codigoHTML += `<button type="button" class="btn btn-success btn-block"><span class="fas fa-edit"></span> Modificar</button>
                                 <button type="button" class="btn btn-outline-danger btn-block"><span class="fas fa-trash"></span> Excluir</button>`
    }
    codigoHTML += `</div>
                        </div>
                    </div>
                </div>`

    document.getElementById('modal').innerHTML = codigoHTML;

    $('#modalClasseMotoboy').modal('show')

}

//funcao responsavel por gerar a lista com motoboy para atualizar
function gerarListaDeMotoboyParaAtualizar() {
    let codigoHTML = ``

    codigoHTML += `<h5 class="text-center" style="margin-top:40px;">Listagem de motoboys para trabalho</h5>
                    <table class="table table-sm col-12 mx-auto" style="margin-top:10px; margin-bottom:60px;">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Telefone</th>
                                <th scope="col">Selecionar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="table-warning text-dark"><strong><span class="fas fa-biking"></span> Aldair Camargo</strong></td>
                                <td class="table-warning text-dark">(00)00000-0000</td>
                                <td class="table-warning text-center"><button onclick="carregarDadosMotoboy();" type="button" class="btn btn-primary btn-sm"><span class="fas fa-check"></span></button></td>
                            </tr>
                        </tbody>
                    </table>`

    document.getElementById('resposta2').innerHTML = codigoHTML;
}

//funcao responsavel por carregar os dados do motoboy para atualizar/excluir
function carregarDadosMotoboy() {
    document.getElementById('nomemotoboy').value = 'teste'
    document.getElementById('telefonemotoboy').value = '(22)25426-0215'
}