import api from './api'

export async function signIn(username, password) {
    // const apiConnection = await api();
    console.log('Testando', username, password)
    const response = await api
        .post('sessions', {
            username,
            password,
        })
        .catch((error) => {
            console.log(error.request);
            return error.request;
        });
    console.log(response);

    return response;
}