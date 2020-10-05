preciso de duas rotas para criação de usuários?

a função verifica se tem usuário logado. Caso tenha e esse usuário é um administrador
a função cria o client com o campo 'admin' enviado pelo frontend.
Caso não tem usuário logado, o campo 'admin' e colocado como false.

para criar um pedido é necessario está logado, independentemente de ser um usuario administrador ou não, porém é necessário inviar o id do usuário.
Para isso, podemos fazer um validação, se o usuário não for um administrador pegamos o id do usuário logado, caso seja, pagamos o id passado como parametro.
