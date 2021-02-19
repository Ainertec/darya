// /---------------------------------------------------- Classe Requisicao --------------------------------------------------------
const axios = require("axios");

// funcao de requisicao get sem paramentro JSON
async function requisicaoGET(url, authorization) {
  let retorno;
  await axios
    .get(`https://requestaiappcenter.herokuapp.com/mcdonuts/${url}`, authorization)
    .then(function (response) {
      if (response.status == 200) {
        retorno = response;
      } else {
        retorno = response.status
      }
    })
    .catch(function (error) {
      retorno = error.response.status
    });

  return retorno;
}

// funcao de requisicao get sem paramentro JSON
async function requisicaoDELETE(url, json, authorization) {
  let retorno = null;

  await axios
    .delete(`https://requestaiappcenter.herokuapp.com/mcdonuts/${url}${json}`, authorization)
    .then(function (response) {
      if (response.status == 200) {
        retorno = response
      } else {
        retorno = response.status
      }
    })
    .catch(function (error) {
      retorno = error.response.status
    });
}

// funcao de requisicao post com paramentro JSON
async function requisicaoPOST(url, json, authorization) {
  let retorno = null;
  await axios
    .post(`https://requestaiappcenter.herokuapp.com/mcdonuts/${url}`, json, authorization)
    .then(function (response) {
      if (response.status == 200) {
        retorno = response
      } else {
        retorno = response.status
      }
    })
    .catch(function (error) {
      retorno = error.response.status
    });

  return retorno;
}

// funcao de requisicao put com paramentro JSON
async function requisicaoPUT(url, json, authorization) {
  let retorno = null;
  await axios
    .put(`https://requestaiappcenter.herokuapp.com/mcdonuts/${url}`, json, authorization)
    .then(function (response) {
      if (response.status == 200) {
        retorno = response
      } else {
        retorno = response.status
      }
    })
    .catch(function (error) {
      retorno = error.response.status
    });

  return retorno;
}


// ---------------------------------------------------- Requisicoes print ----------------------------------------------------------

// funcao de requisicao get sem paramentro JSON
async function requisicaoPrintGET(url, authorization) {
  let retorno;
  await axios
    .get(`http://localhost:3333/${url}`, authorization)
    .then(function (response) {
      if (response.status == 200) {
        retorno = response;
      } else {
        retorno = response.status
      }
    })
    .catch(function (error) {
      retorno = error.response.status
    });

  return retorno;
}

// funcao de requisicao post com paramentro JSON
async function requisicaoPrintPOST(url, json, authorization) {
  let retorno = null;
  await axios
    .post(`http://localhost:3333/${url}`, json, authorization)
    .then(function (response) {
      if (response.status == 200) {
        retorno = response
      } else {
        retorno = response.status
      }
    })
    .catch(function (error) {
      retorno = error.response.status
    });

  return retorno;
}