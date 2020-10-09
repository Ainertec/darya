## features

## Session

primeiro para o cadastro de clientes
o usuário poderá se cadastrar atualizar suas informações e redefinir sua senha

## Criação de Pedidos

Para criação de pedidos será necessário uma listagem com todos os produtos;
Criação de um pré pedido

entidades necessárias

Client
distrito
produto
talvez pedido

## Pré pedido

criar um escopo de pedido com: produtos e dados do cliente logado.
Enviar pedido, o pedido é enviado para o darya desktop da seguinte forma.
(Possível entidade pre-pedido), será necessário um tela de pedidos no desktop,pedido enviado via websocket, o proprietário pode aceitar ou recusar o pedido, aceitando o pedido é criado e é emitido um nota. O cliente recebe um retorno com a confirmação do pedido?
Obs. caso haja a entidade pre pedido, o pre pedido será excluído no momento que for criado o pedido

Sem Entidade pre pedido
é possível criar o pedido sem aprovação e caso o dono exclua notificar o cliente
sendo assim o dono poderia imprimir a nota fiscal quando desejar

método menos custoso e mais ágil

o cliente pode atualizar o pedido caso ele não tenha saído para entrega

Como fazer com que a aplicação tenha um horario de funcionamento?
Isso poderia ser feito pelo backend?
O back poderia ter uma especie de token que faça com que a aplicação funcione.
Ou isso poderia ser feito com react, poderiamos criar um calendario de funcionamento e o react verificava nesse calendario o dia e hora de funcionamento, o problema é que isso teria que ser feito toda hora que alguem acessasse o sistema, por exemplo um useEffect.
Por exemplo, na home page mostrar um aviso falando sobre o horario de funcionamento, e na pagina de fazer o pedido, fazer outra verificação não permitindo a criação caso esteja fora do horario de funcionamento. Contras:
toda hora teria de ser feita um verificação de horário, haverá muitas requisições para o backend,
Mas é uma solução não dificil de se implementar e a mais viável

Documento calendário:

dias da semana: number
inicio: number
fim: number

horario é armazenado no banco em minutos
