## Requisitos Sistema integrado com Ifood

### Requisitos funcionais

* Crud de cliente
* Crud de motoboy
* Informar motoboys disponíveis
* Crud de produtos
* Efetuar venda - contém o cliente e os produtos
* Emitir relatório diário - lucro total, detalhes das vendas
* Emitir comanda 

### Requisitos não-funcionais

* Node js
* Electron
* MongoDB ou MySQL/Postgre
* Sistema mais rápido possível
* Offline/online

### Regras de negócio

* Ao realizar uma venda deve-se trocar o status do motoboy para "ocupado" e informar o endereço de entrega.

* O estado do motoboy é "livre" quando não está em nenhuma entrega e está no seu horário de trabalho

* Ao concluir a venda o motoboy vai para o estado "Livre"

### Venda Ifood

* Quando é recebido o status `CONFIRMED` a venda é criada sem o motoboy e com o id da venda do ifood guardado.
* Campo ifood , boolean
* pagar todos o itens da venda do ifood, nome e quantidade
* salva como uma nova venda
* exibir todas as vendas com ifood = true
* selecionando um motoboy para a venda ifood ela vai para o status delivery
* quando o motoboy voltar, colocar como "closed"
* quando o ifood retorna `CANCELLED` a venda é excluida pelo ifood_id

Campos

id:
ifood_id:
closed:
ifood:
delivery:


### Conexão com a api do Ifood

[link da documentação](https://developer.ifood.com.br/reference)

*   Primeiro será necessário autenticar na api
obs: o token dura 1h
*   Requisição `/oauth/token` pagar pegar o token

#### A cada 30 segundos reenviar as seguintes requisições

*  Requisição `/events:polling` para pegar todos os eventos
*  Filtrar os eventos `CONFIRMED` e `CONCLUDED`
*  Os eventos `CONFIRMED` serão usados para pegar os detalhes do pedido e imprimir
*  Os eventos `CONCLUDED` serão usados para pegar os detalhes do pedido e salvar
*  Requisição `/events/acknowledgment` para fazer reconhecimeto dos eventos já recebidos
* Requisição `/orders/{reference}` para pegar detalhes do pedido



