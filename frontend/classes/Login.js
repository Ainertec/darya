//--------------------------------------------------- Classe Login ------------------------------------------------

//funcao de inicializacao o login automatico do sistema
$(document).ready(function () {
    efetuarLogin();
});

//funcao responsavel por efetuar o login
async function efetuarLogin() {
    logout()

    setTimeout(async function () {
        await aguardeCarregamento(true)
        const json = await requisicaoPOST('sessions', JSON.parse(`{"username":"AdminMariana","password":"18082020"}`), null)
        await aguardeCarregamento(false)

        sessionStorage.setItem('loginDarya', JSON.stringify({ _id: json.data.user._id.toString(), token: json.data.token.toString(), }))

    }, 1000)
}

//funcao para fazer logout
function logout() {
    if (sessionStorage.getItem('loginDarya')) {
        sessionStorage.removeItem('loginDarya')
    }
}