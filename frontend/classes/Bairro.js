// --------------------------------------------------- Classe Bairro ---------------------------------------------------

// vetor rsponsavel por guardar os dados dos bairros durante tempo de execucao
let VETORDEBAIRROSCLASSEBAIRRO = [];

//funcao responsavel por gerar a tela de busca do bairro
function telaDeBuscarBairro() {
    let codigoHTML = ``;

    codigoHTML += `<h4 class="text-center"><span class="fas fa-map-marked-alt"></span> Buscar Bairro</h4>
                    <div class="card-deck col-4 mx-auto d-block">
                        <div class="input-group mb-3">
                            <input id="nome" type="text" class="form-control form-control-sm mousetrap" placeholder="Nome do bairro">
                            <button onclick="buscarDadosBairro('nome')" type="button" class="btn btn-outline-info btn-sm">
                                <span class="fas fa-search"></span> Buscar
                            </button>
                            <br/>
                            <button onclick="buscarDadosBairro('todos');" type="button" class="btn btn-outline-info btn-block btn-sm" style="margin-top:10px;">
                                <span class="fas fa-search-plus"></span> Exibir todos
                            </button>
                            <button onclick="modalTelaCadastrarouAtualizarBairro('cadastrar');" type="button" class="btn btn-warning btn-block" style="margin-top:60px;">
                                <span class="fas fa-plus"></span> Adicionar bairro
                            </button>
                        </div>
                    </div>
                    <div id="resposta"></div>`

    document.getElementById('janela2').innerHTML = codigoHTML;
}

//funcao responsavel por gerar a lista com os bairros
function gerarListaDeBairros(json) {
    let codigoHTML = ``

    codigoHTML += `<tr>
        <td class="table-warning"><strong><span class="fas fa-map-marker-alt"></span> ${json.bairro}</strong></td>
        <td class="table-warning"><strong>${json.cidade}</strong></td>
        <td class="table-warning text-danger"><strong>R$${(parseFloat(json.taxa)).toFixed(2)}</strong></td>
        <td class="table-warning"><button onclick="carregarDadosBairro('${json._id}')" type="button" class="btn btn-primary btn-sm"><span class="fas fa-edit"></span> Editar</button></td>
        <td class="table-warning"><button onclick="excluirBairro('${json._id}')" type="button" class="btn btn-outline-danger btn-sm"><span class="fas fa-trash"></span> Excluir</button></td>
    </tr>`

    return codigoHTML;
}

//funcao responsavel por gerar o modal de cadastrar/atualizar/remover bairro
function modalTelaCadastrarouAtualizarBairro(tipo) {
    let codigoHTML = ``

    codigoHTML += `<div class="modal fade" id="modalClasseBairro" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel"><span class="fas fa-map-marked-alt"></span> Dados Bairro</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label for="nomebairro">Nome do bairro:</label>
                                    <input type="text" class="form-control" id="nomebairro" placeholder="Nome do bairro">
                                </div>
                                <div class="form-group">
                                    <label for="nomecidade">Nome da cidade:</label>
                                    <input type="text" class="form-control" id="nomecidade" placeholder="Nome da cidade">
                                </div>
                                <div class="form-group">
                                    <label for="precotaxa">Preço da taxa:</label>
                                    <input type="Number" class="form-control" id="precotaxa" placeholder="Preço da taxa">
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">`
    if (tipo == 'cadastrar') {
        codigoHTML += `<button onclick="cadastrarBairro();" type="button" class="btn btn-primary btn-block"><span class="fas fa-check-double"></span> Adicionar</button>`
    } else if (tipo == 'atualizar') {
        codigoHTML += `<button id="botaoAtualizar" onclick="atualizarBairro(this.value);" type="button" class="btn btn-success btn-block"><span class="fas fa-edit"></span> Modificar</button>
                                 <button id="botaoExcluir" onclick="excluirBairro(this.value)" type="button" class="btn btn-outline-danger btn-block"><span class="fas fa-trash"></span> Excluir</button>`
    }
    codigoHTML += `</div>
                        </div>
                    </div>
                </div>`

    document.getElementById('modal').innerHTML = codigoHTML;
    $('#modalClasseBairro').modal('show')

}

//funcao responsavel por buscar o bairro
function buscarDadosBairro(tipo) {
    let codigoHTML = ``, json = null;

    codigoHTML += `<h5 class="text-center" style="margin-top:80px">Listagem de bairros</h5>
    <table class="table table-sm col-8 mx-auto" style="margin-top:10px">
        <thead class="thead-dark">
            <tr>
                <th scope="col">Nome Bairro</th>
                <th scope="col">Nome Cidade</th>
                <th scope="col">Valor taxa</th>
                <th scope="col">Editar</th>
                <th scope="col">Excluir</th>
            </tr>
        </thead>
        <tbody>`

    if (tipo == 'nome') {
        json = testeBairro(document.getElementById('nome').value)

        VETORDEBAIRROSCLASSEBAIRRO = []
        json.forEach(function (item) {
            VETORDEBAIRROSCLASSEBAIRRO.push(item)
            codigoHTML += gerarListaDeBairros(item)
        });
    } else if (tipo == 'todos') {
        json = testeBairro('')

        VETORDEBAIRROSCLASSEBAIRRO = []
        json.forEach(function (item) {
            VETORDEBAIRROSCLASSEBAIRRO.push(item)
            codigoHTML += gerarListaDeBairros(item)
        });
    }

    codigoHTML += `</tbody>
    </table>`

    document.getElementById('resposta').innerHTML = codigoHTML;
}

//funcao responsavel por carregar os dados do bairro nos campos
function carregarDadosBairro(id) {
    modalTelaCadastrarouAtualizarBairro('atualizar')

    const dado = VETORDEBAIRROSCLASSEBAIRRO.find(element => element._id == id)

    document.getElementById('nomebairro').value = dado.bairro
    document.getElementById('nomecidade').value = dado.cidade
    document.getElementById('precotaxa').value = (parseFloat(dado.taxa)).toFixed(2)
    document.getElementById('botaoAtualizar').value = (dado._id).toString()
}

//funcao responsavel por cadastrar um bairro
function cadastrarBairro() {
    let json = `{"cidade":"${$('#nomebairro').val()}",
    "bairro":"${$('#nomecidade').val()}",
    "taxa":${$('#precotaxa').val()}}`

    console.log(JSON.parse(json))
}

//funcao responsavel por atualizar um bairro
function atualizarBairro(id) {
    let dado = VETORDEBAIRROSCLASSEBAIRRO.find(element => element._id == id)

    dado.bairro = document.getElementById('nomebairro').value
    dado.cidade = document.getElementById('nomecidade').value
    dado.taxa = document.getElementById('precotaxa').value
    dado._id = delete

        console.log(VETORDEBAIRROSCLASSEBAIRRO)

    console.log(dado)

    if (validaDadosCampo(['#nome'])) {
        buscarDadosBairro('nome');
    } else {
        buscarDadosBairro('todos');
    }

}

//funcao responsavel por excluir um bairro
function excluirBairro(id) {
    console.log(id)
}








//funcao de teste
function testeBairro(teste) {
    if (teste == 'lumiar') {
        return JSON.parse(`[{"_id":"gfd52","cidade":"Nova Friburgo" ,"bairro":"Lumiar" ,"taxa":20.00 }]`)
    } else {
        return JSON.parse(`[{"_id":"odg64","cidade":"Nova Friburgo" ,"bairro":"São Pedro" ,"taxa":10.00 },{"_id":"gfd52","cidade":"Nova Friburgo" ,"bairro":"Lumiar" ,"taxa":20.00 }]`)
    }
}