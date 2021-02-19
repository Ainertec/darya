// --------------------------------------------------- Classe Cliente ---------------------------------------------------

//vetor responsavel por guardar os dados dos clientes em tempo e execucao
let VETORDECLIENTESCLASSECLIENTE = [],
  CONTADORDEENDERECO = 0;

//funcao responsavel por gerar a tela de busca do cliente
function telaDeBuscarCliente() {
  VETORDECLIENTESCLASSECLIENTE = []
  CONTADORDEENDERECO = 0

  let codigoHTML = ``;

  codigoHTML += `<div class="shadow-lg p-3 mb-5 bg-white rounded">
                  <h4 class="text-center"><span class="fas fa-user"></span> Buscar Cliente</h4>
                    <div class="card-deck col-4 mx-auto d-block">
                        <div class="input-group mb-3">
                            <input id="nome" type="text" class="form-control form-control-sm mousetrap" placeholder="Nome do cliente ou telefone">
                            <button onclick="if(validaDadosCampo(['#nome'])){buscarDadosCliente('nome');}else{mensagemDeErro('Preencha o campo nome do cliente!'); mostrarCamposIncorreto(['nome']);}" type="button" class="btn btn-outline-info btn-sm">
                                <span class="fas fa-search"></span> Buscar
                            </button>
                            <br/>
                            <button onclick="buscarDadosCliente('todos');" type="button" class="btn btn-outline-info btn-block btn-sm" style="margin-top:10px;">
                                <span class="fas fa-search-plus"></span> Exibir todos
                            </button>
                            <button onclick="modalTelaCadastrarouAtualizarCliente('cadastrar');" type="button" class="btn btn-warning btn-block" style="margin-top:60px;">
                                <span class="fas fa-plus"></span> Adicionar cliente
                            </button>
                        </div>
                    </div>
                  </div>
                  <div id="resposta"></div>`;

  animacaoJanela2();
  setTimeout(function () { document.getElementById('janela2').innerHTML = codigoHTML; }, 30)
}

//funcao responsavel por gerar a lista com os bairros
function gerarListaDeClientes(json) {
  let codigoHTML = ``;

  codigoHTML += `<tr>
        <td class="table-warning" title="${json.name}"><strong><span class="fas fa-user"></span> ${corrigirTamanhoString(15, json.name)}</strong></td>
        <td class="table-warning">`
  if (json.phone[0]) {
    codigoHTML += `<select class="form-control form-control-sm">`
    for (let item of json.phone) {
      codigoHTML += `<option>${item}</option>`;
    };
    codigoHTML += `</select>`
  } else {
    codigoHTML += `Nenhum existente.`
  }
  codigoHTML += `</td>
        <td class="table-warning text-danger">`
  if (json.address[0]) {
    codigoHTML += `<select class="form-control form-control-sm">`
    for (let item of json.address) {
      codigoHTML += `<option title="${item.street}, nº ${item.number} - ${item.district.name} - ${item.district.city}">${corrigirTamanhoString(15, item.street)}, nº ${item.number} - ${corrigirTamanhoString(15, item.district.name)} - ${corrigirTamanhoString(15, item.district.city)}</option>`;
    }
    codigoHTML += `</select>`
  } else {
    codigoHTML += `Nenhum existente.`
  }
  codigoHTML += `</td>
        <td class="table-warning"><button onclick="carregarDadosCliente('${json._id}');" type="button" class="btn btn-primary btn-sm"><span class="fas fa-edit"></span> Editar</button></td>`
  if (json.admin) {
    codigoHTML += `<td class="table-warning"><button onclick="confirmarAcao('Excluir este cliente!','excluirCliente(this.value)','${json._id}')" type="button" class="btn btn-outline-danger btn-sm" disabled><span class="fas fa-trash"></span> Excluir</button></td>`
  } else {
    codigoHTML += `<td class="table-warning"><button onclick="confirmarAcao('Excluir este cliente!','excluirCliente(this.value)','${json._id}')" type="button" class="btn btn-outline-danger btn-sm"><span class="fas fa-trash"></span> Excluir</button></td>`
  }
  codigoHTML += `</tr>`;

  return codigoHTML;
}

//funcao responsavel por gerar o modal de cadastrar/atualizar/remover bairro
async function modalTelaCadastrarouAtualizarCliente(tipo) {
  let codigoHTML = ``

  codigoHTML += `<div class="modal fade" id="modalClasseCliente" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable modal-lg">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel"><span class="fas fa-user"></span> Dados Cliente</h5>
                            <button onclick="reiniciarClasseCliente();" type="button" class="close btn-danger" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                            <div id="mensagemDeErroModal" class="justify-content-center"></div>
                        </div>
                        <div class="modal-body">
                            <form>
                              <div class="shadow-lg p-3 mb-5 bg-white rounded">
                                <div class="form-group">
                                    <label for="nomecliente">Nome do cliente:</label>
                                    <input type="text" class="form-control" id="nomecliente" placeholder="Nome do cliente">
                                </div>
                                <div class="form-group form-row">
                                  <div class="col">
                                    <label for="nomecliente">Usuário:</label>
                                    <input type="text" class="form-control" id="usuario" placeholder="Usuário" value="${Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10)}">
                                  </div>
                                  <div class="col">
                                    <label for="nomecliente">Senha:</label>
                                    <input type="text" class="form-control" id="senha" placeholder="Senha" value="${Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10) + Math.floor(Math.random() * 1000)}">
                                  </div>
                                </div>
                              </div>
                              <div class="shadow-lg p-3 mb-5 bg-white rounded">
                                <table class="table table-sm col-12 mx-auto" style="margin-top:40px">
                                  <thead class="thead-dark">
                                      <tr>
                                          <th scope="col">Telefone</th>
                                          <th scope="col">Excluir</th>
                                      </tr>
                                  </thead>
                                  <tbody id="tabelatelefone">
                                      
                                  </tbody>
                                </table>

                                <div class="form-group">
                                  <label for="telefonecliente">Telefone:</label>
                                  <div class="input-group mb-3">
                                      <input type="tel" class="form-control" id="telefonecliente" placeholder="Exemplo:(00) 00000-0000" aria-describedby="botaoadicionartelefone">
                                      <div class="input-group-append">`;
  if (tipo == 'cadastrar') {
    codigoHTML += `<button onclick="if(validaDadosCampo(['#telefonecliente'])){adicionarDadosNaTabelaTelefoneeEndereco('telefone', '-1')}else{mensagemDeErroModal('Preencha o campo telefone!'); mostrarCamposIncorreto(['telefonecliente']);}" id="botaoadicionartelefone" class="btn btn-success" type="button"><span class="fas fa-plus"></span> Adicionar</button>`;
  } else if (tipo == 'atualizar') {
    codigoHTML += `<button onclick="if(validaDadosCampo(['#telefonecliente'])){adicionarDadosNaTabelaTelefoneeEndereco('telefone', this.value)}else{mensagemDeErroModal('Preencha o campo telefone!'); mostrarCamposIncorreto(['telefonecliente']);}" id="botaoadicionartelefone" class="btn btn-success" type="button"><span class="fas fa-plus"></span> Adicionar</button>`;
  }
  codigoHTML += `</div>
                                  </div>
                                </div>
                              </div>
                              <div class="shadow-lg p-3 mb-5 bg-white rounded">
                                <div id="botaoadicionartelefoneendereco">
                                  <div class="custom-control custom-switch">
                                    <input type="checkbox" onclick="this.checked? $('#areaendereco').fadeIn(10) : $('#areaendereco').fadeOut(10) " class="custom-control-input custom-switch" id="botaoSelectClientephoneaddress">
                                    <label class="custom-control-label" for="botaoSelectClientephoneaddress">Adicionar Endereço</label>
                                  </div>
                                </div>
                              </div>
                              <div id="areaendereco"></div>
                            </form>
                        </div>
                        <div class="modal-footer">`;
  if (tipo == 'cadastrar') {
    VETORDECLIENTESCLASSECLIENTE.push(
      JSON.parse(`{
                    "_id":"-1",
                    "name":"",
                    "username":"",
                    "password":"",
                    "question":"Qual o nome da sua mãe?",
                    "response":"${Math.random()}",
                    "phone":[],
                    "address":[]
                  }`)
    );
    codigoHTML += `<button type="button" onclick="if(validaDadosCampo(['#nomecliente','#usuario','#senha'])){cadastrarCliente();}else{mensagemDeErroModal('Preencha os campos com valores válidos!'); mostrarCamposIncorreto(['nomecliente','usuario','senha']);}" class="btn btn-primary btn-block"><span class="fas fa-check-double"></span> Salvar</button>`;
  } else if (tipo == 'atualizar') {
    codigoHTML += `<button onclick="if(validaDadosCampo(['#nomecliente','#usuario','#senha'])){confirmarAcao('Atualizar este cliente!','atualizarCliente(this.value)',(this.value).toString()); $('#modalClasseCliente').modal('hide');}else{mensagemDeErroModal('Preencha os campos com valores válidos!'); mostrarCamposIncorreto(['nomecliente','usuario','senha']);}" id="botaoatualizarcliente" type="button" class="btn btn-primary btn-block"><span class="fas fa-edit"></span> Modificar</button>
                        <button onclick="confirmarAcao('Excluir este cliente!','excluirCliente(this.value)', (this.value).toString()); $('#modalClasseCliente').modal('hide');" id="botaoexcluircliente" type="button" class="btn btn-outline-danger btn-block"><span class="fas fa-trash"></span> Excluir</button>`;
  }
  codigoHTML += `</div>
                        </div>
                    </div>
                </div>`;

  document.getElementById('modal2').innerHTML = codigoHTML;
  await aguardeCarregamento(true);
  await gerarTelaParteEnderecoCliente(tipo);
  await aguardeCarregamento(false);

  $('#modalClasseCliente').modal('show');
  $('#areaendereco').fadeOut(10);
}

//funcao responsavel por gerar a parte de telefone e endereco do cliente
async function gerarTelaParteEnderecoCliente(tipo) {
  await aguardeCarregamento(true);
  let codigoHTML = ``, json = await requisicaoGET(`districts`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
  await aguardeCarregamento(false);

  codigoHTML += `<div class="shadow-lg p-3 mb-5 bg-white rounded">
              <table class="table table-sm col-12 mx-auto" style="margin-top:20px">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Rua</th>
                        <th scope="col">Número</th>
                        <th scope="col">Bairro - Cidade</th>
                        <th scope="col">Complemento</th>
                        <th scope="col">Excluir</th>
                    </tr>
                </thead>
                <tbody id="tabelaendereco">

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
                <select class="form-control form-control-sm" id="bairrocidadecliente">`;
  for (let item of json.data) {
    codigoHTML += `<option value="${item._id}">${item.name} - ${item.city}</option>`;
  }

  codigoHTML += `</select>
              </div>
              <div class="form-group">
                <label for="complementocliente">Complemento:</label>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" id="complementocliente" value="Nenhum">
                    <div class="input-group-append">`;
  if (tipo == 'cadastrar') {
    codigoHTML += `<button onclick="if(validaDadosCampo(['#ruacliente','#numerocasacliente','#complementocliente'])){adicionarDadosNaTabelaTelefoneeEndereco('endereco','-1')}else{mensagemDeErroModal('Preencha os campos com valores válidos!'); mostrarCamposIncorreto(['ruacliente','numerocasacliente','complementocliente']);}" id="botaoadicionarendereco" class="btn btn-success" type="button"><span class="fas fa-plus"></span> Adicionar</button>`;
  } else if (tipo == 'atualizar') {
    codigoHTML += `<button onclick="if(validaDadosCampo(['#ruacliente','#numerocasacliente','#complementocliente'])){adicionarDadosNaTabelaTelefoneeEndereco('endereco',this.value)}else{mensagemDeErroModal('Preencha os campos com valores válidos!'); mostrarCamposIncorreto(['ruacliente','numerocasacliente','complementocliente']);}" id="botaoadicionarendereco" class="btn btn-success" type="button"><span class="fas fa-plus"></span> Adicionar</button>`;
  }
  codigoHTML += `</div>
                </div>
              </div>
            </div>`

  document.getElementById('areaendereco').innerHTML = codigoHTML;

}

//funcao responsavel por buscar os dados do cliente
async function buscarDadosCliente(tipo) {
  let codigoHTML = ``,
    json = null;

  VETORDECLIENTESCLASSECLIENTE = [];
  try {
    if (tipo == 'nome') {
      await aguardeCarregamento(true);
      json = await requisicaoGET(`users/${document.getElementById('nome').value}`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
      await aguardeCarregamento(false);
    } else if (tipo == 'todos') {
      await aguardeCarregamento(true);
      json = await requisicaoGET(`users`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
      await aguardeCarregamento(false);
    }

    codigoHTML += `<div class="shadow-lg p-3 mb-5 bg-white rounded">
      <h5 class="text-center" style="margin-top:80px">Listagem de bairros</h5>
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
          <tbody>`;

    for (let item of json.data) {
      VETORDECLIENTESCLASSECLIENTE.push(item);
      codigoHTML += gerarListaDeClientes(item);
    }

    codigoHTML += `</tbody>
      </table>
    </div>`;

    if (json.data[0]) {
      document.getElementById('resposta').innerHTML = codigoHTML;
    } else {
      document.getElementById('resposta').innerHTML = '<h5 class="text-center" style="margin-top:10vh;"><span class="fas fa-exclamation-triangle"></span> Nenhum cliente encontrado!</h5>';
    }
  } catch (error) {
    mensagemDeErro('Não foi possível carregar os clientes!')
  }
}

//funcao responsavel por carregar os dados do cliente selecionado
async function carregarDadosCliente(id) {
  await aguardeCarregamento(true);
  await modalTelaCadastrarouAtualizarCliente('atualizar');
  await aguardeCarregamento(false);

  try {
    let dado = VETORDECLIENTESCLASSECLIENTE.find((element) => element._id == id), indice = 0;

    document.getElementById('nomecliente').value = dado.name;
    document.getElementById('usuario').value = dado.username;

    for (let item of dado.phone) {
      $('#tabelatelefone').append(`<tr id="linhatel${indice}">
              <td class="table-warning"><span class="fas fa-phone"></span> ${item}</td>
              <td class="table-warning"><button onclick="removerDadosNaTabelaTelefoneeEndereco('telefone', '${item}' ,'${id}', ${indice});" type="button" class="btn btn-outline-danger btn-sm"><span class="fas fa-trash"></span> Excluir</button></td>
          </tr>`);
      indice++;
    }

    if (dado.address[0]) {

      $('#areaendereco').fadeIn(10)
      document.getElementById('botaoSelectClientephoneaddress').checked = true;

      for (let item of dado.address) {
        $('#tabelaendereco').append(`<tr id="linhaend${item._id}">
            <td class="table-warning" title="${item.street}"><span class="fas fa-map-marker-alt"></span> ${corrigirTamanhoString(15, item.street)}</td>
            <td class="table-warning">${item.number}</td>
            <td class="table-warning" title="${item.district.name} - ${item.district.city}">${corrigirTamanhoString(15, item.district.name)} - ${corrigirTamanhoString(15, item.district.city)}</td>
            <td class="table-warning" title="${item.reference}">${corrigirTamanhoString(20, item.reference)}</td>
            <td class="table-warning"><button onclick="removerDadosNaTabelaTelefoneeEndereco('endereco', '','${id}','${item._id}');" type="button" class="btn btn-outline-danger btn-sm"><span class="fas fa-trash"></span> Excluir</button></td>
        </tr>`);
      }
    }

    document.getElementById('botaoadicionartelefone').value = dado._id.toString();
    document.getElementById('botaoadicionarendereco').value = dado._id.toString();
    document.getElementById('botaoatualizarcliente').value = dado._id.toString();
    document.getElementById('botaoexcluircliente').value = dado._id.toString();
    if (dado.admin) {
      document.getElementById('botaoexcluircliente').disabled = true;
    }

  } catch (error) {
    mensagemDeErroModal('Não foi possível carregar os dados do cliente!')
  }
}

//funcao responsavel por adicionar o telefone e o endereco na tabela
async function adicionarDadosNaTabelaTelefoneeEndereco(tipo, id) {
  let cliente = VETORDECLIENTESCLASSECLIENTE.find((element) => element._id == id);

  if (tipo == 'telefone') {
    cliente.phone.push(`${document.getElementById('telefonecliente').value}`);
    let tamanhoListaTel = cliente.phone.length;
    $('#tabelatelefone').append(`<tr id="linhatel${tamanhoListaTel - 1}">
            <td class="table-warning"><span class="fas fa-phone"></span> ${document.getElementById('telefonecliente').value
      }</td>
            <td class="table-warning"><button onclick="removerDadosNaTabelaTelefoneeEndereco('telefone','${document.getElementById('telefonecliente').value
      }', '${id}', ${tamanhoListaTel - 1
      });" type="button" class="btn btn-outline-danger btn-sm"><span class="fas fa-trash"></span> Excluir</button></td>
        </tr>`);
  } else if (tipo == 'endereco') {
    cliente.address.push(
      JSON.parse(`{"_id":"${CONTADORDEENDERECO}",
      "district":{"_id":"${document.getElementById('bairrocidadecliente').value}"},
      "street":"${document.getElementById('ruacliente').value}",
      "number":"${document.getElementById('numerocasacliente').value}",
      "reference":"${document.getElementById('complementocliente').value}"}`)
    );
    await aguardeCarregamento(true);
    let BAIRROCLIENTE = await requisicaoGET(`districts`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
    await aguardeCarregamento(false);
    let bairro = BAIRROCLIENTE.data.find(
      (element) => element._id == document.getElementById('bairrocidadecliente').value
    );
    $('#tabelaendereco').append(`<tr id="linhaend${CONTADORDEENDERECO}">
            <td class="table-warning"><span class="fas fa-map-marker-alt"></span> ${document.getElementById('ruacliente').value
      }</td>
            <td class="table-warning">${document.getElementById('numerocasacliente').value}</td>
            <td class="table-warning" title="${bairro.name} - ${bairro.city}">${corrigirTamanhoString(15, bairro.name)} - ${corrigirTamanhoString(15, bairro.city)}</td>
            <td class="table-warning" title="${document.getElementById('complementocliente').value}">${corrigirTamanhoString(20, document.getElementById('complementocliente').value)}</td>
            <td class="table-warning"><button onclick="removerDadosNaTabelaTelefoneeEndereco('endereco', '','${id}','${CONTADORDEENDERECO}');" type="button" class="btn btn-outline-danger btn-sm"><span class="fas fa-trash"></span> Excluir</button></td>
        </tr>`);
    CONTADORDEENDERECO += 1;
  }
}

//funcao responsavel por remover o telefone e o endereco na tabela
function removerDadosNaTabelaTelefoneeEndereco(tipo, telefone, idCliente, posicao) {
  let cliente = VETORDECLIENTESCLASSECLIENTE.find((element) => element._id == idCliente);

  if (tipo == 'telefone') {
    const phonePosition = cliente.phone.findIndex((element) => element == telefone);
    cliente.phone.splice(phonePosition, 1);
    document
      .getElementById('tabelatelefone')
      .removeChild(document.getElementById(`linhatel${posicao}`));
  } else if (tipo == 'endereco') {
    const enderecoPosition = cliente.address.findIndex((element) => element._id == posicao);

    cliente.address.splice(enderecoPosition, 1);
    document
      .getElementById('tabelaendereco')
      .removeChild(document.getElementById(`linhaend${posicao}`));
  }
}

//funcao reponsavel por cadastrar um cliente
async function cadastrarCliente() {
  try {
    let cliente = VETORDECLIENTESCLASSECLIENTE.find((element) => element._id == '-1');

    if (cliente.phone[0]) {
      if (cliente.address[0]) {

        cliente.name = document.getElementById('nomecliente').value;
        cliente.username = document.getElementById('usuario').value;
        cliente.password = document.getElementById('senha').value;
        const addressSerialiazaded = cliente.address.map((addressElement) => {
          return {
            ...addressElement,
            _id: undefined,
            district: addressElement.district._id
          };
        });

        await aguardeCarregamento(true);
        let result = await requisicaoPOST(`users`, {
          address: addressSerialiazaded,
          phone: cliente.phone,
          name: cliente.name,
          username: cliente.username,
          password: cliente.password,
          question: cliente.question,
          response: cliente.response
        });
        await aguardeCarregamento(false);

        $('#modalClasseCliente').modal('hide');

        if (result == 400) {
          await mensagemDeErro('Atenção já existe um cliente com os mesmo dados!')
        } else {
          await mensagemDeAviso('Cliente cadastrado com sucesso!')
          document.getElementById('nome').value = await result.data.name
          await buscarDadosCliente('nome')
        }

      } else {

        cliente.name = document.getElementById('nomecliente').value;
        cliente.username = document.getElementById('usuario').value;
        cliente.password = document.getElementById('senha').value;

        await aguardeCarregamento(true);
        let result = await requisicaoPOST(`users`, {
          name: cliente.name,
          phone: cliente.phone,
          username: cliente.username,
          password: cliente.password,
          question: cliente.question,
          response: cliente.response
        });
        await aguardeCarregamento(false);

        $('#modalClasseCliente').modal('hide');

        if (result == 400) {
          await mensagemDeErro('Atenção já existe um cliente com os mesmo dados!')
          reiniciarClasseCliente();
        } else {
          await mensagemDeAviso('Cliente cadastrado com sucesso!')
          document.getElementById('nome').value = await result.data.name
          await buscarDadosCliente('nome')
        }
      }
    } else {
      mensagemDeErroModal('Adicione ao menos um telefone!')
      mostrarCamposIncorreto(['telefonecliente'])
    }
  } catch (error) {
    mensagemDeErro('Não foi possível cadastrar o cliente!')
    reiniciarClasseCliente();
  }

  CONTADORDEENDERECO = 0;
}

//funcao responsavel por atualizar um cliente
async function atualizarCliente(id) {
  try {
    const cliente = VETORDECLIENTESCLASSECLIENTE.find((element) => element._id == id);

    if (cliente.phone[0]) {
      if (cliente.address[0]) {

        const name = document.getElementById('nomecliente').value
        username = document.getElementById('usuario').value
        cliente.password = document.getElementById('senha').value;
        const serializadedAddress = cliente.address.map((addressElement) => {
          return {
            ...addressElement,
            _id: undefined,
            district: addressElement.district._id
          };
        });

        await aguardeCarregamento(true);
        console.log(cliente)
        await requisicaoPUT(`users/${id}`, {
          address: serializadedAddress,
          username: (username === cliente.username) ? undefined : username,
          password: cliente.password,
          question: cliente.question,
          response: cliente.response,
          phone: cliente.phone,
          name: (name === cliente.name) ? undefined : name,
        }, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
        await aguardeCarregamento(false);

        await mensagemDeAviso('Cliente atualizado com sucesso!')

      } else {

        const name = document.getElementById('nomecliente').value
        username = document.getElementById('usuario').value
        cliente.password = document.getElementById('senha').value;
        await aguardeCarregamento(true);
        console.log(cliente)
        await requisicaoPUT(`users/${id}`, {
          name: (name === cliente.name) ? undefined : name,
          phone: cliente.phone,
          username: (username === cliente.username) ? undefined : username,
          password: cliente.password,
          question: cliente.question,
          response: cliente.response
        }, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
        await aguardeCarregamento(false);

        await mensagemDeAviso('Cliente atualizado com sucesso!')
      }
    } else {
      mensagemDeErro('Adicione ao menos um telefone!')
    }
  } catch (error) {
    mensagemDeErro('Não foi possível atualizar o cliente!')
    reiniciarClasseCliente();
  }

  if (validaDadosCampo(['#nome'])) {
    await buscarDadosCliente('nome');
  } else {
    await buscarDadosCliente('todos');
  }
}

//funcao responsavel por excluir um cliente
async function excluirCliente(id) {
  try {
    await aguardeCarregamento(true);
    await requisicaoDELETE(`users/${id}`, '', { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } })
    await aguardeCarregamento(false);
    await mensagemDeAviso('Cliente excluído com sucesso!')
  } catch (error) {
    mensagemDeErro('Não foi possível excluir o cliente!')
    reiniciarClasseCliente();
  }

  if (validaDadosCampo(['#nome'])) {
    await buscarDadosCliente('nome');
  } else {
    await buscarDadosCliente('todos');
  }
}

//funcao responsavel por reiniciar a classe cliente
function reiniciarClasseCliente() {
  VETORDECLIENTESCLASSECLIENTE = []
  CONTADORDEENDERECO = 0
  telaDeBuscarCliente();
  document.getElementById('modal').innerHTML = ''
  document.getElementById('modal2').innerHTML = ''
  document.getElementById('alert2').innerHTML = ''
}
