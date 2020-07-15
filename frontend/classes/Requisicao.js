// /---------------------------------------------------- Classe Requisicao --------------------------------------------------------

// funcao de requisicao get sem paramentro JSON
async function requisicaoGET(url, authorization) {
    let retorno

    await axios
        .get(`http://localhost:3333/${url}`, authorization)
        .then(function (response) {
            if (response.status == 200) {
                retorno = response
            } else {
                setTimeout(function () {
                    mensagemDeErro(`Erro: ${response}`)
                }, 4000)
            }
        })
        .catch(function (error) {
            if (error.response) {
                setTimeout(function () {
                    mensagemDeErro(`Erro: ${error.response.data.message}`)
                }, 4000)
            } else {
                setTimeout(function () {
                    mensagemDeErro(`Erro: ${error}`)
                }, 4000)
            }
        })

    return retorno
}

// funcao de requisicao get sem paramentro JSON
async function requisicaoDELETE(url, json, authorization) {
    await axios
        .delete(`http://localhost:3333/${url}${json}`, authorization)
        .then(function (response) {
            if (response.status != 200) {
                setTimeout(function () {
                    mensagemDeErro(`Erro: ${response}`)
                }, 4000)
            }
        })
        .catch(function (error) {
            if (error.response) {
                setTimeout(function () {
                    mensagemDeErro(`Erro: ${error.response.data.message}`)
                }, 4000)
            } else {
                setTimeout(function () {
                    mensagemDeErro(`Erro: ${error}`)
                }, 4000)
            }
        })
}

// funcao de requisicao post com paramentro JSON
async function requisicaoPOST(url, json, authorization) {
    let retorno

    await axios
        .post(`http://localhost:3333/${url}`, json, authorization)
        .then(function (response) {
            if (response.status != 200) {
                setTimeout(function () {
                    mensagemDeErro(`Erro: ${response}`)
                }, 4000)
            } else {
                retorno = response
            }
        })
        .catch(function (error) {
            if (error.response) {
                setTimeout(function () {
                    mensagemDeErro(`Erro: ${error.response.data.message}`)
                }, 4000)
            } else {
                setTimeout(function () {
                    mensagemDeErro(`Erro: ${error}`)
                }, 4000)
            }
        })

    return retorno
}

// funcao de requisicao put com paramentro JSON
async function requisicaoPUT(url, json, authorization) {
    await axios
        .put(`http://localhost:3333/${url}`, json, authorization)
        .then(function (response) {
            if (response.status != 200) {
                setTimeout(function () {
                    mensagemDeErro(`Erro: ${response}`)
                }, 7000)
            }
        })
        .catch(function (error) {
            if (error.response) {
                setTimeout(function () {
                    mensagemDeErro(`Erro: ${error.response.data.message}`)
                }, 4000)
            } else {
                setTimeout(function () {
                    mensagemDeErro(`Erro: ${error}`)
                }, 4000)
            }
        })
}