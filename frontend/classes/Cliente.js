// --------------------------------------------------- Classe Cliente ---------------------------------------------------

//vetor responsavel por guardar os dados dos clientes em tempo e execucao
let VETORDECLIENTESCLASSECLIENTE = [],
  CONTADORDEENDERECO = 0;

//funcao responsavel por gerar a tela de busca do cliente
function telaDeBuscarCliente() {
  let codigoHTML = ``;

  codigoHTML += `<h4 class="text-center"><span class="fas fa-user"></span> Buscar Cliente</h4>
                    <div class="card-deck col-4 mx-auto d-block">
                        <div class="input-group mb-3">
                            <input id="nome" type="text" class="form-control form-control-sm mousetrap" placeholder="Nome do cliente">
                            <button onclick="buscarDadosCliente('nome');" type="button" class="btn btn-outline-info btn-sm">
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
                    <div id="resposta"></div>`;

  document.getElementById('janela2').innerHTML = codigoHTML;
}

//funcao responsavel por gerar a lista com os bairros
function gerarListaDeClientes(json) {
  let codigoHTML = ``;

  codigoHTML += `<tr>
        <td class="table-warning"><strong><span class="fas fa-user"></span> ${json.name}</strong></td>
        <td class="table-warning">
            <select class="form-control form-control-sm">`;
  json.phone.forEach(function (item) {
    codigoHTML += `<option>${item}</option>`;
  });
  codigoHTML += `</select>
        </td>
        <td class="table-warning text-danger">
            <select class="form-control form-control-sm">`;
  json.address.forEach(function (item) {
    codigoHTML += `<option>${item.street}, nº ${item.number} - ${item.district.name} - ${item.district.city}</option>`;
  });
  codigoHTML += `</select>
        </td>
        <td class="table-warning"><button onclick="carregarDadosCliente('${json._id}');" type="button" class="btn btn-primary btn-sm"><span class="fas fa-edit"></span> Editar</button></td>
        <td class="table-warning"><button onclick="excluirCliente('${json._id}');" type="button" class="btn btn-outline-danger btn-sm"><span class="fas fa-trash"></span> Excluir</button></td>
    </tr>`;

  return codigoHTML;
}

//funcao responsavel por gerar o modal de cadastrar/atualizar/remover bairro
async function modalTelaCadastrarouAtualizarCliente(tipo) {
  let codigoHTML = ``,
    json = await requisicaoGET(`districts`);

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
    codigoHTML += `<button onclick="adicionarDadosNaTabelaTelefoneeEndereco('telefone', '-1')" id="botaoadicionartelefone" class="btn btn-success" type="button"><span class="fas fa-plus"></span> Adicionar</button>`;
  } else if (tipo == 'atualizar') {
    codigoHTML += `<button onclick="adicionarDadosNaTabelaTelefoneeEndereco('telefone', this.value)" id="botaoadicionartelefone" class="btn btn-success" type="button"><span class="fas fa-plus"></span> Adicionar</button>`;
  }
  codigoHTML += `</div>
                                    </div>
                                </div>

                                <table class="table table-sm col-12 mx-auto" style="margin-top:80px">
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
  json.data.forEach(function (item) {
    codigoHTML += `<option value="${item._id}">${item.name} - ${item.city}</option>`;
  });
  codigoHTML += `</select>
                                </div>
                                <div class="form-group">
                                    <label for="complementocliente">Complemento:</label>
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control" id="complementocliente">
                                        <div class="input-group-append">`;
  if (tipo == 'cadastrar') {
    codigoHTML += `<button onclick="adicionarDadosNaTabelaTelefoneeEndereco('endereco','-1')" id="botaoadicionarendereco" class="btn btn-success" type="button"><span class="fas fa-plus"></span> Adicionar</button>`;
  } else if (tipo == 'atualizar') {
    codigoHTML += `<button onclick="adicionarDadosNaTabelaTelefoneeEndereco('endereco',this.value)" id="botaoadicionarendereco" class="btn btn-success" type="button"><span class="fas fa-plus"></span> Adicionar</button>`;
  }
  codigoHTML += `</div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">`;
  if (tipo == 'cadastrar') {
    VETORDECLIENTESCLASSECLIENTE.push(
      JSON.parse(`{"_id":"-1","name":"", "phone":[], "address":[]}`)
    );
    codigoHTML += `<button type="button" onclick="cadastrarCliente();" class="btn btn-primary btn-block"><span class="fas fa-check-double"></span> Salvar</button>`;
  } else if (tipo == 'atualizar') {
    codigoHTML += `<button onclick="atualizarCliente(this.value)" id="botaoatualizarcliente" type="button" class="btn btn-primary btn-block"><span class="fas fa-edit"></span> Modificar</button>
                        <button onclick="excluirCliente(this.value)" id="botaoexcluircliente" type="button" class="btn btn-outline-danger btn-block"><span class="fas fa-trash"></span> Excluir</button>`;
  }
  codigoHTML += `</div>
                        </div>
                    </div>
                </div>`;

  document.getElementById('modal2').innerHTML = codigoHTML;

  $('#modalClasseBairro').modal('show');
}

//funcao responsavel por buscar os dados do cliente
async function buscarDadosCliente(tipo) {
  let codigoHTML = ``,
    json = null;

  VETORDECLIENTESCLASSECLIENTE = [];

  if (tipo == 'nome') {
    json = await requisicaoGET(`clients/${document.getElementById('nome').value}`);
  } else if (tipo == 'todos') {
    json = await requisicaoGET(`clients`);
  }

  console.log(json.data);

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
        <tbody>`;

  json.data.forEach(function (item) {
    VETORDECLIENTESCLASSECLIENTE.push(item);
    codigoHTML += gerarListaDeClientes(item);
  });

  codigoHTML += `</tbody>
    </table>`;

  document.getElementById('resposta').innerHTML = codigoHTML;
}

//funcao responsavel por carregar os dados do cliente selecionado
async function carregarDadosCliente(id) {
  await modalTelaCadastrarouAtualizarCliente('atualizar');

  let dado = VETORDECLIENTESCLASSECLIENTE.find((element) => element._id == id);

  document.getElementById('nomecliente').value = dado.name;
  dado.phone.forEach(function (item, indice) {
    $('#tabelatelefone').append(`<tr id="linhatel${indice}">
            <td class="table-warning"><span class="fas fa-phone"></span> ${item}</td>
            <td class="table-warning"><button onclick="removerDadosNaTabelaTelefoneeEndereco('telefone', '${item}' ,'${id}', ${indice});" type="button" class="btn btn-outline-danger btn-sm"><span class="fas fa-trash"></span> Excluir</button></td>
        </tr>`);
  });
  dado.address.forEach(function (item, indice) {
    $('#tabelaendereco').append(`<tr id="linhaend${item._id}">
            <td class="table-warning"><span class="fas fa-map-marker-alt"></span> ${item.street}</td>
            <td class="table-warning">${item.number}</td>
            <td class="table-warning">${item.district.name} - ${item.district.city}</td>
            <td class="table-warning">${item.reference}</td>
            <td class="table-warning"><button onclick="removerDadosNaTabelaTelefoneeEndereco('endereco', '','${id}','${item._id}');" type="button" class="btn btn-outline-danger btn-sm"><span class="fas fa-trash"></span> Excluir</button></td>
        </tr>`);
  });
  document.getElementById('botaoadicionartelefone').value = dado._id.toString();
  document.getElementById('botaoadicionarendereco').value = dado._id.toString();
  document.getElementById('botaoatualizarcliente').value = dado._id.toString();
  document.getElementById('botaoexcluircliente').value = dado._id.toString();
}

//funcao responsavel por adicionar o telefone e o endereco na tabela
async function adicionarDadosNaTabelaTelefoneeEndereco(tipo, id) {
  let cliente = VETORDECLIENTESCLASSECLIENTE.find((element) => element._id == id);

  if (tipo == 'telefone') {
    cliente.phone.push(`${document.getElementById('telefonecliente').value}`);
    let tamanhoListaTel = cliente.phone.length;
    $('#tabelatelefone').append(`<tr id="linhatel${tamanhoListaTel - 1}">
            <td class="table-warning"><span class="fas fa-phone"></span> ${
              document.getElementById('telefonecliente').value
            }</td>
            <td class="table-warning"><button onclick="removerDadosNaTabelaTelefoneeEndereco('telefone','${
              document.getElementById('telefonecliente').value
            }', '${id}', ${
      tamanhoListaTel - 1
    });" type="button" class="btn btn-outline-danger btn-sm"><span class="fas fa-trash"></span> Excluir</button></td>
        </tr>`);
  } else if (tipo == 'endereco') {
    cliente.address.push(
      JSON.parse(`{     "_id":"${CONTADORDEENDERECO}",
                                                "district":"${
                                                  document.getElementById('bairrocidadecliente')
                                                    .value
                                                }",
                                                "street":"${
                                                  document.getElementById('ruacliente').value
                                                }",
                                                "number":"${
                                                  document.getElementById('numerocasacliente').value
                                                }",
                                                "reference":"${
                                                  document.getElementById('complementocliente')
                                                    .value
                                                }"}`)
    );
    let BAIRROCLIENTE = await requisicaoGET(`districts`);
    let bairro = BAIRROCLIENTE.data.find(
      (element) => element._id == document.getElementById('bairrocidadecliente').value
    );
    $('#tabelaendereco').append(`<tr id="linhaend${CONTADORDEENDERECO}">
            <td class="table-warning"><span class="fas fa-map-marker-alt"></span> ${
              document.getElementById('ruacliente').value
            }</td>
            <td class="table-warning">${document.getElementById('numerocasacliente').value}</td>
            <td class="table-warning">${bairro.name} - ${bairro.city}</td>
            <td class="table-warning">${document.getElementById('complementocliente').value}</td>
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
  let cliente = VETORDECLIENTESCLASSECLIENTE.find((element) => element._id == '-1');
  cliente.name = document.getElementById('nomecliente').value;

  const addressSerialiazaded = cliente.address.map((addressElement) => {
    return {
      ...addressElement,
      _id: undefined,
    };
  });

  await requisicaoPOST(`clients`, {
    address: addressSerialiazaded,
    phone: cliente.phone,
    name: cliente.name,
  });

  // console.log('cliente cadastrado', cliente)
  CONTADORDEENDERECO = 0;
}

//funcao responsavel por atualizar um cliente
async function atualizarCliente(id) {
  const cliente = VETORDECLIENTESCLASSECLIENTE.find((element) => element._id == id);
  const serializadedAddress = cliente.address.map((addressElement) => {
    return {
      ...addressElement,
      _id: undefined,
    };
  });
  await requisicaoPUT(`clients/${id}`, {
    address: serializadedAddress,
    phone: cliente.phone,
    name: cliente.name,
  });

  console.log(cliente);
}

//funcao responsavel por excluir um cliente
function excluirCliente(id) {
  console.log(id);
}

//funcao de teste para cliente
function testeCliente(tipo) {
  if (tipo == 'camargo') {
    return JSON.parse(`[{"_id":"jdh64",
        "nome":"Camargo",
        "telefone":[
            {
                "phone":"(22) 2542-3521"
            },
            {
                "phone":"(22) 98153-3155"
            }
        ],
        "endereco":[
            {
                "address_id":"jhgd34",
                "bairro_id":"odg64",
                "rua":"Sete",
                "numero":"00",
                "referencia":"partão azul"
            },
            {
                "address_id":"jdnk523",
                "bairro_id":"gfd52",
                "rua":"Nove",
                "numero":"03",
                "referencia":"partão amarelo"
            }
            ]
        }]`);
  } else {
    return JSON.parse(`[{"_id":"lsdh523",
        "nome":"Cleiton",
        "telefone":[
            {
                "phone":"(21) 2522-4221"
            },
            {
                "phone":"(21) 96345-6555"
            }
        ],
        "endereco":[
            {
                "address_id":"pdh354",
                "bairro_id":"odg64",
                "rua":"Cinco",
                "numero":"04",
                "referencia":"partão laranja"
            },
            {
                "address_id":"odgf593",
                "bairro_id":"gfd52",
                "rua":"Seis",
                "numero":"07",
                "referencia":"partão vermelho"
            }
            ]
        },{"_id":"jdh64",
        "nome":"Camargo",
        "telefone":[
            {
                "phone":"(22) 2542-3521"
            },
            {
                "phone":"(22) 98153-3155"
            }
        ],
        "endereco":[
            {
                "address_id":"jhgd34",
                "bairro_id":"odg64",
                "rua":"Sete",
                "numero":"00",
                "referencia":"partão azul"
            },
            {
                "address_id":"jdnk523",
                "bairro_id":"gfd52",
                "rua":"Nove",
                "numero":"03",
                "referencia":"partão amarelo"
            }
            ]
        }]`);
  }
}
