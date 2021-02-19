/// ---------------------------------------- Classe Loja ------------------------------------

// funcao responsavel por alterar o estado da loja
async function alterarEstadoLoja(status) {
    await aguardeCarregamento(true);
    await requisicaoPOST('shop', { open: status }, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
    await aguardeCarregamento(false);
}

//function de retorno sobre status da loja
function retornoEstadoLoja() {
    const socket = io('https://requestaiappcenter.herokuapp.com/', {});
    socket.on('open', (open) => {
        document.getElementById('botaoSelectLojaAberta').checked = open;
    });
}