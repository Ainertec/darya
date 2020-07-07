# Cliente
{
  _id,
  nome,
  endereço:[
    {
      cidade,
      bairro,
      rua,
      numero,
      referencia
    }
  ],

}

# Motoboy
{
  _id,
  nome,
  jornada:[ dd/mm, terça  ],
  taxa:[
    {
      bairro,
      cidade,
      taxa,
    }
  ],
  disponibilidade,
  pedido_id:[ objectId, ]

}

# Pedido/Venda
{
  _id,
  client_id,
  produtos:[
    {
      product_id,
      quantidade,
    }
  ],
  total,
  finalizada,
  origem: enum ifood, whatsapp, instagram, pronta entrega,
  <!-- motoboy_id, -->

}

# Produtos
{
  _id,
  nome,
  custo,
  preco,
  descrição,

}