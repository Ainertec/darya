// --------------------------------------------------- Classe Bairro ---------------------------------------------------

// vetor rsponsavel por guardar os dados dos bairros durante tempo de execucao
let VETORDEBAIRROSCLASSEBAIRRO = [];

//funcao responsavel por gerar a tela de busca do bairro
function telaDeBuscarBairro() {
  VETORDEBAIRROSCLASSEBAIRRO = []
  let codigoHTML = ``;

  codigoHTML += `<div class="shadow-lg p-3 mb-5 bg-white rounded">
                    <h4 class="text-center"><span class="fas fa-map-marked-alt"></span> Buscar Bairro</h4>
                    <div class="card-deck col-4 mx-auto d-block">
                        <div class="input-group mb-3">
                            <input id="nome" type="text" class="form-control form-control-sm mousetrap" placeholder="Nome do bairro">
                            <button onclick="if(validaDadosCampo(['#nome'])){buscarDadosBairro('nome');}else{mensagemDeErro('Preencha o campo nome do bairro!'); mostrarCamposIncorreto(['nome']);}" type="button" class="btn btn-outline-info btn-sm">
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
                  </div>
                  <div id="resposta"></div>`;

  animacaoJanela2();
  setTimeout(function () { document.getElementById('janela2').innerHTML = codigoHTML; }, 30)
}

//funcao responsavel por gerar a lista com os bairros
function gerarListaDeBairros(json) {
  let codigoHTML = ``;

  codigoHTML += `<tr>
        <td class="table-warning" title="${json.name}"><strong><span class="fas fa-map-marker-alt"></span> ${corrigirTamanhoString(15, json.name)
    }</strong></td>
        <td class="table-warning" title="${json.city}"><strong>${corrigirTamanhoString(15, json.city)}</strong></td>
        <td class="table-warning text-danger"><strong>R$${parseFloat(json.rate).toFixed(
      2
    )}</strong></td>
        <td class="table-warning"><button onclick="carregarDadosBairro('${json._id
    }')" type="button" class="btn btn-primary btn-sm"><span class="fas fa-edit"></span> Editar</button></td>
        <td class="table-warning"><button onclick="confirmarAcao('Excluir este bairro!', 'excluirBairro(this.value)', '${json._id}')" type="button" class="btn btn-outline-danger btn-sm"><span class="fas fa-trash"></span> Excluir</button></td>
    </tr>`;

  return codigoHTML;
}

//funcao responsavel por gerar o modal de cadastrar/atualizar/remover bairro
function modalTelaCadastrarouAtualizarBairro(tipo) {
  let codigoHTML = ``;

  codigoHTML += `<div class="modal fade" id="modalClasseBairro" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel"><span class="fas fa-map-marked-alt"></span> Dados Bairro</h5>
                            <button onclick="reiniciarClasseBairro();" type="button" class="close btn-danger" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                            <div id="mensagemDeErroModal" class="justify-content-center"></div>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="shadow-lg p-3 mb-5 bg-white rounded">
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
                                      <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                          <span class="input-group-text">R$</span>
                                        </div>
                                        <input type="Number" class="form-control" id="precotaxa" placeholder="Preço da taxa">
                                      </div>
                                  </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">`;
  if (tipo == 'cadastrar') {
    codigoHTML += `<button onclick="if(validaDadosCampo(['#nomebairro','#nomecidade','#precotaxa']) && validaValoresCampo(['#precotaxa'])){cadastrarBairro(); $('#modalClasseBairro').modal('hide');}else{mensagemDeErroModal('Preencha os campos com valores válidos!'); mostrarCamposIncorreto(['nomebairro','nomecidade','precotaxa']);}" type="button" class="btn btn-primary btn-block"><span class="fas fa-check-double"></span> Adicionar</button>`;
  } else if (tipo == 'atualizar') {
    codigoHTML += `<button id="botaoAtualizar" onclick="if(validaDadosCampo(['#nomebairro','#nomecidade','#precotaxa']) && validaValoresCampo(['#precotaxa'])){confirmarAcao('Atualizar este produto! ','atualizarBairro(this.value)',(this.value).toString()); $('#modalClasseBairro').modal('hide');}else{mensagemDeErroModal('Preencha os campos com valores válidos!'); mostrarCamposIncorreto(['nomebairro','nomecidade','precotaxa']);}" type="button" class="btn btn-success btn-block"><span class="fas fa-edit"></span> Modificar</button>
                                 <button id="botaoExcluir" onclick="confirmarAcao('Excluir este bairro! ','excluirBairro(this.value)',(this.value).toString()); $('#modalClasseBairro').modal('hide');" type="button" class="btn btn-outline-danger btn-block"><span class="fas fa-trash"></span> Excluir</button>`;
  }
  codigoHTML += `</div>
                        </div>
                    </div>
                </div>`;

  document.getElementById('modal').innerHTML = codigoHTML;
  $('#modalClasseBairro').modal('show');
}

//funcao responsavel por buscar o bairro
async function buscarDadosBairro(tipo) {
  let codigoHTML = ``,
    json = null;

  VETORDEBAIRROSCLASSEBAIRRO = [];

  try {
    if (tipo == 'nome') {
      await aguardeCarregamento(true);
      json = await requisicaoGET(`districts/${document.getElementById('nome').value}`);
      await aguardeCarregamento(false);
    } else if (tipo == 'todos') {
      await aguardeCarregamento(true);
      json = await requisicaoGET(`districts`);
      await aguardeCarregamento(false);
    }

    codigoHTML += `<div class="shadow-lg p-3 mb-5 bg-white rounded">
      <h5 class="text-center" style="margin-top:80px">Listagem de bairros</h5>
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
          <tbody>`;

    for (let item of json.data) {
      VETORDEBAIRROSCLASSEBAIRRO.push(item);
      codigoHTML += gerarListaDeBairros(item);
    }

    codigoHTML += `</tbody>
      </table>
    </div>`;

    if (json.data[0]) {
      document.getElementById('resposta').innerHTML = codigoHTML;
    } else {
      document.getElementById('resposta').innerHTML = '<h5 class="text-center" style="margin-top:10vh;"><span class="fas fa-exclamation-triangle"></span> Nenhum bairro encontrado!</h5>';
    }
  } catch (error) {
    mensagemDeErro('Não foi possível carregar os bairros!')
  }
}

//funcao responsavel por carregar os dados do bairro nos campos
async function carregarDadosBairro(id) {
  await modalTelaCadastrarouAtualizarBairro('atualizar');

  try {
    const dado = VETORDEBAIRROSCLASSEBAIRRO.find((element) => element._id == id);

    document.getElementById('nomebairro').value = dado.name;
    document.getElementById('nomecidade').value = dado.city;
    document.getElementById('precotaxa').value = parseFloat(dado.rate).toFixed(2);
    document.getElementById('botaoAtualizar').value = dado._id.toString();
    document.getElementById('botaoExcluir').value = dado._id.toString();
  } catch (error) {
    mensagemDeErroModal('Não foi possível carregar os dados!')
  }
}

//funcao responsavel por cadastrar um bairro
async function cadastrarBairro() {
  try {
    let json = `{"name":"${$('#nomebairro').val()}",
    "city":"${$('#nomecidade').val()}",
    "rate":${$('#precotaxa').val()}}`;

    await aguardeCarregamento(true);
    let result = await requisicaoPOST('districts', JSON.parse(json), { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
    await aguardeCarregamento(false);
    await mensagemDeAviso('Bairro cadastrado com sucesso!')
    document.getElementById('nome').value = await result.data.name
    await buscarDadosBairro('nome')
  } catch (error) {
    mensagemDeErro('Não foi possível cadastrar o bairro!')
  }
}

//funcao responsavel por atualizar um bairro
async function atualizarBairro(id) {
  try {
    let dado = VETORDEBAIRROSCLASSEBAIRRO.filter(function (element) {
      return element._id == id;
    });

    dado[0].name = document.getElementById('nomebairro').value;
    dado[0].city = document.getElementById('nomecidade').value;
    dado[0].rate = parseFloat(document.getElementById('precotaxa').value);
    delete dado[0]._id;
    delete dado[0].updatedAt;
    delete dado[0].createdAt;
    delete dado[0].__v;

    await aguardeCarregamento(true);
    await requisicaoPUT(`districts/${id}`, dado[0], { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
    await aguardeCarregamento(false);
    document.getElementById('modal').innerHTML = '';
    await mensagemDeAviso('Bairro atualizado com sucesso!')
  } catch (error) {
    mensagemDeErro('Não foi possível atualizar o bairro!')
  }

  if (validaDadosCampo(['#nome'])) {
    await buscarDadosBairro('nome');
  } else {
    await buscarDadosBairro('todos');
  }

}

//funcao responsavel por excluir um bairro
async function excluirBairro(id) {
  try {
    await aguardeCarregamento(true);
    await requisicaoDELETE(`districts/${id}`, '', { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
    await aguardeCarregamento(false);
    await mensagemDeAviso('Bairro excluído com sucesso!')
  } catch (error) {
    mensagemDeErro('Não foi possível excluir o bairro!')
  }

  if (validaDadosCampo(['#nome'])) {
    await buscarDadosBairro('nome');
  } else {
    await buscarDadosBairro('todos');
  }
}

//funcao responsavel por reiniciar a classe bairro
function reiniciarClasseBairro() {
  VETORDEBAIRROSCLASSEBAIRRO = []
  telaDeBuscarBairro();
  document.getElementById('modal').innerHTML = ''
  document.getElementById('modal2').innerHTML = ''
  document.getElementById('alert2').innerHTML = ''
}