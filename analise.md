preciso de duas rotas para criação de usuários?

a função verifica se tem usuário logado. Caso tenha e esse usuário é um administrador
a função cria o client com o campo 'admin' enviado pelo frontend.
Caso não tem usuário logado, o campo 'admin' e colocado como false.

para criar um pedido é necessario está logado, independentemente de ser um usuario administrador ou não, porém é necessário inviar o id do usuário.
Para isso, podemos fazer um validação, se o usuário não for um administrador pegamos o id do usuário logado, caso seja, pagamos o id passado como parametro.

Para a comunicação em tempo real, precisa-se que ao criar um pedido ele apareça na tela de listagem do desktop.
testando 123

funcionalidade de desativar um produto
se o usuário for um administrador, lista todos incluido os desativados,
caso ele não seja lista so os ativados.
