# Cliente
{
  _id,
  nome,
  endereço:[
    { 
      address_id,
      bairro_id,
      rua,
      numero,
      referencia
    },
    { 
      address_id,
      bairro_id,
      rua,
      numero,
      referencia
    },
  ],

}

# Bairro 
{
  cidade,
  bairro,
  taxa,
}

motoboy tem uma taxa por bairro, essa taxa precisa ser calculada no final do dia, baseado nos bairros que ele foi

# Motoboy
{
  _id,
  nome,
  working,
  disponibilidade,
  <!-- pedido_id:[ objectId, ] -->

}

obter o valor a ser pago ao motoboy taxa de bairro,
buascar geovane dentro de pedido, para cada pedido para o bairro do cliente encontrar o bairro no motoboy e somar a taxa.

lista venda pelo motoboy, encontra o endereço pelo client_address_id, populando o client_id, e faz um sum

sold.aggregate(
  lookup:{bairro_id} as bairro_taxa
  match:{motoboy_id: id, }
  group:{
    _id:bairro_taxa.name,
    sum: taxa
  }
)
relatório

 populate({
    path: 'fans',
    match: { age: { $gte: 21 } },
    // Explicitly exclude `_id`, see http://bit.ly/2aEfTdB
    select: 'name -_id'
  }).

sold.find({createAt}).populate(motoboy). populate({
    path: 'client',
    match: { address.id: client_address_id  },
    // Explicitly exclude `_id`, see http://bit.ly/2aEfTdB
    <!-- select: 'name -_id' -->
  }).

# Pedido/Venda
{
  _id,
  client_id,
  client_address_id,
  bairro_id/taxa,
  produtos:[
    {
      product_id,
      quantidade,
    }
  ],
  total,
  finalizada,
  pagamento?,
  origem: enum [ifood, whatsapp, instagram, pronta entrega]
  motoboy_id,
  note

}

# Produtos
{
  _id,
  nome,
  custo,
  preco,
  descrição,

}