# Cliente
{
  _id,
  nome,
  endereço:[
    {
      bairro_id,
      rua,
      numero,
      referencia
    }
  ],

}

# Bairro 
{
  cidade,
  bairro,
}

# Motoboy
{
  _id,
  nome,
  jornada:[ dd/mm, terça  ],
  taxa:[
   bairro_id,
   taxa
  ],
  disponibilidade,
  <!-- pedido_id:[ objectId, ] -->

}
obter o valor a ser pago ao motoboy taxa de bairro,
buascar geovane dentro de pedido, para cada pedido para o bairro do cliente encontrar o bairro no motoboy e somar a taxa

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
  motoboy_id,

}

# Produtos
{
  _id,
  nome,
  custo,
  preco,
  descrição,

}