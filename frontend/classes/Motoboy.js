// --------------------------------------------------- Classe Motoboy ---------------------------------------------------

//vetor responsavel por guardar os dados do motoboy durante tempo de execucao
let VETORDEMOTOBOYSCLASSEMOTOBOY = [];

//funcao responsavel por gerar a tela de busca Motoboy
function telaDeBuscarMotoboyParaTrabalho() {
    VETORDEMOTOBOYSCLASSEMOTOBOY = []
    let codigoHTML = ``;

    codigoHTML += `<div class="shadow-lg p-3 mb-5 bg-white rounded">
                    <h4 class="text-center"><span class="fas fa-motorcycle"></span> Buscar Motoboy</h4>
                    <div class="card-deck col-4 mx-auto d-block">
                        <div class="input-group mb-3">
                            <input id="nome" type="text" class="form-control form-control-sm mousetrap" placeholder="Nome do motoboy">
                            <button onclick="if(validaDadosCampo(['#nome'])){buscarDadosMotoboyTrabalhando('nome');}else{mensagemDeErro('Preencha o campo nome do motoboy!'); mostrarCamposIncorreto(['nome']);}" type="button" class="btn btn-outline-info btn-sm">
                                <span class="fas fa-search"></span> Buscar
                            </button>
                            <br/>
                            <button onclick="buscarDadosMotoboyTrabalhando('ativos');" type="button" class="btn btn-outline-info btn-block btn-sm" style="margin-top:10px;">
                                <span class="fas fa-search-plus"></span> Exibir ativos
                            </button>
                            <button onclick="buscarDadosMotoboyTrabalhando('todos');" type="button" class="btn btn-outline-info btn-block btn-sm" style="margin-top:10px;">
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
                </div>
                <div id="resposta"></div>`;

    animacaoJanela2();
    setTimeout(function () { document.getElementById('janela2').innerHTML = codigoHTML }, 30)
}

//funcao responsavel por gerar o modal da tela de cadastar/atualizar/remover motoboy
function modalTelaCadastrarouAtualizarMotoboy(tipo) {
    let codigoHTML = ``;

    codigoHTML += `<div class="modal fade" id="modalClasseMotoboy" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel"><span class="fas fa-motorcycle"></span> Dados Motoboy</h5>
                            <button onclick="reiniciarClasseMotoboy();" type="button" class="close btn-danger" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                            <div id="mensagemDeErroModal" class="justify-content-center"></div>
                        </div>
                        <div class="modal-body">`;

    if (tipo == 'atualizar') {
        codigoHTML += `<div class="shadow-lg p-3 mb-5 bg-white rounded">
                            <h5 class="text-center">Buscar Motoboy</h5>
                            <div class="card-deck col-12 mx-auto d-block">
                                <div class="input-group mb-3">
                                    <input id="nomeemmodal" type="text" class="form-control form-control-sm mousetrap" placeholder="Nome do motoboy">
                                    <button onclick="if(validaDadosCampo(['#nomeemmodal'])){buscarDadosMotoboy('nome');}else{mensagemDeErroModal('Preencha o campo nome do motoboy!'); mostrarCamposIncorreto(['nomeemmodal']);}" type="button" class="btn btn-outline-info btn-sm">
                                        <span class="fas fa-search"></span> Buscar
                                    </button>
                                    <br/>
                                    <button onclick="buscarDadosMotoboy('todos');" type="button" class="btn btn-outline-info btn-block btn-sm" style="margin-top:10px;">
                                        <span class="fas fa-search-plus"></span> Exibir todos
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div id="resposta2"></div>`;
    }

    codigoHTML += `<form>
                                <div class="shadow-lg p-3 mb-5 bg-white rounded">
                                    <div class="form-group">
                                        <label for="nomemotoboy">Nome motoboy:</label>
                                        <input type="text" class="form-control" id="nomemotoboy" placeholder="Nome">
                                    </div>
                                    <div class="form-group">
                                        <label for="telefonemotoboy">Telefone:</label>
                                        <input type="tel" class="form-control" id="telefonemotoboy" placeholder="Exemplo: (00)00000-0000">
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">`;
    if (tipo == 'cadastrar') {
        codigoHTML += `<button onclick="if(validaDadosCampo(['#nomemotoboy','#telefonemotoboy'])){cadastrarMotoboy();}else{mensagemDeErroModal('Preencha todos os campos com valores válidos!'); mostrarCamposIncorreto(['nomemotoboy','telefonemotoboy']);}" type="button" class="btn btn-primary btn-block"><span class="fas fa-check-double"></span> Adicionar</button>`;
    } else if (tipo == 'atualizar') {
        codigoHTML += `<button onclick="if(validaDadosCampo(['#nomemotoboy','#telefonemotoboy'])){confirmarAcao('Atualizar este motoboy!','atualizarMotoboy(this.value)', (this.value).toString()); $('#modalClasseMotoboy').modal('hide');}else{mensagemDeErroModal('Preencha todos os campos com valores válidos!'); mostrarCamposIncorreto(['nomemotoboy','telefonemotoboy']);}" id="botaoatualizarmotoboy" type="button" class="btn btn-success btn-block"><span class="fas fa-edit"></span> Modificar</button>
                                 <button onclick="confirmarAcao('Excluir este motoboy!','exluirMotoboy(this.value)',(this.value).toString()); $('#modalClasseMotoboy').modal('hide');" id="botaoexcluirmotoboy" type="button" class="btn btn-outline-danger btn-block"><span class="fas fa-trash"></span> Excluir</button>`;
    }
    codigoHTML += `</div>
                        </div>
                    </div>
                </div>`;

    document.getElementById('modal').innerHTML = codigoHTML;

    $('#modalClasseMotoboy').modal('show');
}

//funcao responsavel por gerar a lista com os motoboy para trabalho
function gerarListaDeMotoboyParaTrabalho(json) {
    let codigoHTML = ``;

    codigoHTML += `<tr>
        <td class="table-warning text-dark" title="${json.name}"><strong><span class="fas fa-biking"></span> ${corrigirTamanhoString(15, json.name)}</strong></td>
        <td class="table-warning text-dark"><span class="fas fa-phone"></span> ${json.phone}</td>
        <td class="table-warning text-dark">
            <div class="custom-control custom-switch">`;
    if (json.working_day) {
        codigoHTML += `<input type="checkbox" onclick="this.checked? alterarEstadoDeTrabalhoMotoboy('ativar','${json._id}'): alterarEstadoDeTrabalhoMotoboy('desativar','${json._id}')" class="custom-control-input custom-switch" id="${json._id}" checked="checked">`;
    } else {
        codigoHTML += `<input type="checkbox" onclick="this.checked? alterarEstadoDeTrabalhoMotoboy('ativar','${json._id}'): alterarEstadoDeTrabalhoMotoboy('desativar','${json._id}')" class="custom-control-input custom-switch" id="${json._id}">`;
    }
    codigoHTML += `<label class="custom-control-label" for="${json._id}">Trabalhando</label>
            </div>
        </td>
        <td class="table-warning text-dark">
            <button onclick="gerarGraficoMotoboy('${json._id}');" type="button" class="btn btn-outline-primary btn-sm"><span class="fas fa-chart-bar"></span> Exibir</button>
            <button onclick="confirmarAcao('Imprimir relatório motoboy!','impressaoRelatorioMotoboy(this.value);','${json._id}')" type="button" class="btn btn-outline-primary btn-sm"><span class="fas fa-print"></span> Imprimir</button>
        </td>
    </tr>`

    return codigoHTML;
}

//funcao responsavel por gerar a lista com motoboy para atualizar
function gerarListaDeMotoboyParaAtualizar(json) {
    let codigoHTML = ``;

    codigoHTML += `<tr>
        <td class="table-warning text-dark" title="${json.name}"><strong><span class="fas fa-biking"></span> ${corrigirTamanhoString(15, json.name)}</strong></td>
        <td class="table-warning text-dark"><span class="fas fa-phone"></span> ${json.phone}</td>
        <td class="table-warning text-center"><button onclick="carregarDadosMotoboy('${json._id}');" type="button" class="btn btn-primary btn-sm"><span class="fas fa-check"></span></button></td>
    </tr>`;

    return codigoHTML;
}

//funcao responsavel por buscar os dados do motoboy para tabela de trabalho
async function buscarDadosMotoboyTrabalhando(tipo) {
    let codigoHTML = ``, json = null;

    VETORDEMOTOBOYSCLASSEMOTOBOY = [];

    try {
        await aguardeCarregamento(true);
        if (tipo == 'nome') {
            json = await requisicaoGET(`deliverymans/${document.getElementById('nome').value}`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } })
        } else if (tipo == 'todos') {
            json = await requisicaoGET(`deliverymans`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } })
        } else if (tipo == 'ativos') {
            json = await requisicaoGET(`deliverymans/working_days`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } })
        }
        await aguardeCarregamento(false);

        codigoHTML += `<div class="shadow-lg p-3 mb-5 bg-white rounded">
        <h5 class="text-center" style="margin-top:80px">Listagem de motoboys para trabalho</h5>
        <div class="text-center">
           <button onclick="alterarEstadoDeTrabalhoMotoboy('desativarTodos','')" type="button" class="btn btn-success" style="margin-top:10px;"><span class="fas fa-sync"></span> Reiniciar lista de trabalho</button>
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
            <tbody>`;

        for (let item of json.data) {
            VETORDEMOTOBOYSCLASSEMOTOBOY.push(item);
            codigoHTML += gerarListaDeMotoboyParaTrabalho(item);
        }

        codigoHTML += `</tbody>
            </table>
        </div>`;

        if (json.data[0]) {
            document.getElementById('resposta').innerHTML = codigoHTML;
        } else {
            document.getElementById('resposta').innerHTML = '<h5 class="text-center" style="margin-top:20vh;"><span class="fas fa-exclamation-triangle"></span> Nenhum motoboy encontrado!</h5>';
        }
    } catch (error) {
        mensagemDeErro('Não foi possível carregar os motoboys!')
    }
}

//funcao responsavel por buscar os dados do motoboy para tabela de trabalho
async function buscarDadosMotoboy(tipo) {
    let codigoHTML = ``,
        json = null;

    VETORDEMOTOBOYSCLASSEMOTOBOY = [];

    try {
        if (tipo == 'nome') {
            await aguardeCarregamento(true);
            json = await requisicaoGET(`deliverymans/${document.getElementById('nomeemmodal').value}`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } })
            await aguardeCarregamento(false);
        } else if (tipo == 'todos') {
            await aguardeCarregamento(true);
            json = await requisicaoGET('deliverymans', { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } })
            await aguardeCarregamento(false);
        } else if (tipo == 'ativos') {
            await aguardeCarregamento(true);
            json = await requisicaoGET('deliverymans/working_days', { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } })
            await aguardeCarregamento(false);
        }

        codigoHTML += `<div class="shadow-lg p-3 mb-5 bg-white rounded">
        <h5 class="text-center" style="margin-top:40px;">Listagem de motoboys para trabalho</h5>
        <table class="table table-sm col-12 mx-auto" style="margin-top:10px; margin-bottom:60px;">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Telefone</th>
                    <th scope="col">Selecionar</th>
                </tr>
            </thead>
            <tbody>`;

        for (let item of json.data) {
            VETORDEMOTOBOYSCLASSEMOTOBOY.push(item);
            codigoHTML += gerarListaDeMotoboyParaAtualizar(item);
        }

        codigoHTML += `</tbody>
            </table>
        </div>`;

        if (json.data[0]) {
            document.getElementById('resposta2').innerHTML = codigoHTML;
        } else {
            document.getElementById('resposta2').innerHTML = '<h5 class="text-center" style="margin-top:20vh;"><span class="fas fa-exclamation-triangle"></span> Nenhum motoboy encontrado!</h5>';
        }
    } catch (error) {
        mensagemDeErro('Não foi possivel carregar os motoboys!')
    }
}

//funcao responsavel por carregar os dados do motoboy para atualizar/excluir
function carregarDadosMotoboy(id) {
    let dado = VETORDEMOTOBOYSCLASSEMOTOBOY.find((element) => element._id == id);

    try {
        document.getElementById('nomemotoboy').value = dado.name;
        document.getElementById('telefonemotoboy').value = dado.phone;
        document.getElementById('botaoatualizarmotoboy').value = dado._id;
        document.getElementById('botaoexcluirmotoboy').value = dado._id;
    } catch (error) {
        mensagemDeErroModal('Não foi possível carregar os dados do motoboy!')
    }
}

//funcao responsavel por alterar estado de trabalho do motoboy
async function alterarEstadoDeTrabalhoMotoboy(tipo, id) {
    if (tipo == 'desativarTodos') {
        try {
            await aguardeCarregamento(true);
            await requisicaoPUT(`deliverymans`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
            await aguardeCarregamento(false);
            await mensagemDeAviso('Todos os motoboys foram desabilitados!')
        } catch (error) {
            mensagemDeErro('Não foi possível desabilitar os motoboys!')
        }
    } else if (tipo == 'ativar') {
        try {
            let dado = VETORDEMOTOBOYSCLASSEMOTOBOY.filter(function (element) {
                return element._id == id;
            });

            await aguardeCarregamento(true);
            await requisicaoPUT(`deliverymans/${id}`, {
                working_day: true,
                name: dado[0].name,
                phone: dado[0].phone,
            }, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
            await aguardeCarregamento(false);
            await mensagemDeAviso('O motoboy foi habilitado!')
        } catch (error) {
            mensagemDeErro('Não foi possível habilitar o motoboy!')
        }
    } else if (tipo == 'desativar') {
        try {
            let dado = VETORDEMOTOBOYSCLASSEMOTOBOY.filter(function (element) {
                return element._id == id;
            });

            await aguardeCarregamento(true);
            await requisicaoPUT(`deliverymans/${id}`, {
                working_day: false,
                name: dado[0].name,
                phone: dado[0].phone,
            }, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
            await aguardeCarregamento(false);
            await mensagemDeAviso('O motoboy foi desabilitado!')
        } catch (error) {
            mensagemDeErro('Não foi possível desabilitar o motoboy!')
        }
    }

    if (validaDadosCampo(['#nome'])) {
        await buscarDadosMotoboyTrabalhando('nome');
    } else {
        await buscarDadosMotoboyTrabalhando('todos');
    }
}

//funcao responsavel por cadastrar um motoboy
async function cadastrarMotoboy() {
    try {
        let json = `{
            "name":"${document.getElementById('nomemotoboy').value}",
            "phone":"${document.getElementById('telefonemotoboy').value}"}`;

        await aguardeCarregamento(true);
        let result = await requisicaoPOST('deliverymans', JSON.parse(json), { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
        await aguardeCarregamento(false);
        $('#modalClasseMotoboy').modal('hide');
        await mensagemDeAviso('Motoboy cadastrado com sucesso!')
        await reiniciarClasseMotoboy();
    } catch (error) {
        mensagemDeErro('Não foi possível cadastrar o motoboy!')
    }
}

//funcao responsavel por atualizar um motoboy
async function atualizarMotoboy(id) {
    try {
        let dado = VETORDEMOTOBOYSCLASSEMOTOBOY.filter(function (element) {
            return element._id == id;
        });
        dado[0].name = document.getElementById('nomemotoboy').value;
        dado[0].phone = document.getElementById('telefonemotoboy').value;
        delete dado[0]._id;
        delete dado[0].createdAt;
        delete dado[0].updatedAt;
        delete dado[0].__v;

        await aguardeCarregamento(true);
        await requisicaoPUT(`deliverymans/${id}`, dado[0], { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
        await aguardeCarregamento(false);
        await mensagemDeAviso('Motoboy atualizado com sucesso!')
    } catch (error) {
        mensagemDeErro('Não foi possível atualizar o motoboy!')
    }

    if (validaDadosCampo(['nome'])) {
        await buscarDadosMotoboyTrabalhando('nome')
    } else {
        await buscarDadosMotoboyTrabalhando('todos')
    }
}

//funcao responsavel por excluir um motoboy
async function exluirMotoboy(id) {
    try {
        await aguardeCarregamento(true);
        await requisicaoDELETE(`deliverymans/${id}`, '', { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
        await aguardeCarregamento(false);
        await mensagemDeAviso('Motoboy excluído com sucesso!')
    } catch (error) {
        mensagemDeErro('Não foi possível excluir o motoboy!')
    }

    if (validaDadosCampo(['nome'])) {
        await buscarDadosMotoboyTrabalhando('nome')
    } else {
        await buscarDadosMotoboyTrabalhando('todos')
    }
}

//funcao responsavel por gerar o grafico de dados sobre o motoboy
async function gerarGraficoMotoboy(id) {
    try {
        await aguardeCarregamento(true);
        let codigoHTML = ``, json = await requisicaoGET(`reports/deliveryman/rate/${id}`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } }), json2 = await requisicaoGET(`reports/deliveryman/orders/${id}`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } })
        await aguardeCarregamento(false);

        if (json2.data[0]) {

            codigoHTML += `<div class="modal fade" id="modalRelatorioMotoboy" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg modal-dialog-scrollable">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="staticBackdropLabel"><span class="fas fa-motorcycle"></span> Grafico Motoboy</h5>
                                    <button type="button" class="close btn-outline-danger" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <h3 class="text-center" style="margin-top:40px; margin-bottom:40px;"> Valor total das taxas: <span class="badge badge-success">R$${(parseFloat(json.data.deliverymanRate)).toFixed(2)}</span></h3>
                                    <table class="table table-sm table-bordered">
                                        <thead class="thead-dark">
                                        <tr>
                                            <th scope="col">Código</th>
                                            <th scope="col">Cliente</th>
                                            <th scope="col">Motoboy</th>
                                            <th scope="col">Itens/Quant.</th>
                                            <th scope="col">Forma de pagamento</th>
                                            <th scope="col">Valor total</th>
                                            <th scope="col">Valor taxa</th>
                                            <th scope="col">Data/hora</th>
                                        </tr>
                                        </thead>
                                        <tbody class="table-warning">`
            for (let item of json2.data) {
                const date = format(parseISO(item.createdAt), 'dd/MM/yyyy HH:mm:ss')
                codigoHTML += `<tr>
                                        <td>${item.identification}</td>
                                        <td title="${item.user.name}">${corrigirTamanhoString(15, item.user.name)}</td>
                                        <td title="${item.deliveryman.name}"><strong>${corrigirTamanhoString(15, item.deliveryman.name)}</strong></td>
                                        <td>`
                for (let item2 of item.items) {
                    codigoHTML += `(${corrigirTamanhoString(15, item2.product.name)}/${item2.quantity}),`
                }
                codigoHTML += `</td>
                                        <td>${item.payment}</td>
                                        <td class="text-danger"><strong>R$${(parseFloat(item.total)).toFixed(2)}</strong></td>
                                        <td><strong>R$${(parseFloat(item.address.district_rate)).toFixed(2)}</strong></td>
                                        <td>${date}</td>
                                        </tr>`
            }
            codigoHTML += `</tbody>
                                    </table>
                                </div>
                            </div>
                        </div>`

            document.getElementById('modal').innerHTML = codigoHTML;
            $('#modalRelatorioMotoboy').modal('show')
        } else {
            mensagemDeErro('Nenhum pedido entregue pelo motoboy!')
        }

    } catch (error) {
        mensagemDeErro('Não foi possível carregar o demostrativo do motoboy!')
    }
}

//funcao reiniciar classe motoboy
function reiniciarClasseMotoboy() {
    VETORDEMOTOBOYSCLASSEMOTOBOY = []
    telaDeBuscarMotoboyParaTrabalho();
    document.getElementById('modal').innerHTML = ''
    document.getElementById('modal2').innerHTML = ''
    document.getElementById('alert2').innerHTML = ''
}

//funcao responsavel por imprimir o relatorio do motoboy
async function impressaoRelatorioMotoboy(id) {
    try {
        await aguardeCarregamento(true);
        let json2 = await requisicaoPrintGET(`reports/deliveryman/orders/${id}`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } })
        if (json2.data[0]) {
            await requisicaoGET(`printers/deliveryman_report/${id}`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } })
            await mensagemDeAviso('Imprimindo relatório ...')
        } else {
            mensagemDeErro('Nenhum pedido entregue pelo motoboy!')
        }
        await aguardeCarregamento(false);

    } catch (error) {
        mensagemDeErro('Não foi possível imprimir o relatório!')
    }
}