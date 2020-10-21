import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  TextField,
  CardMedia,
} from "@material-ui/core/";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import { useCart } from "../../contexts/cart";
import { useAlert } from '../../contexts/alertN';

const useStyles = makeStyles({
  root: {
    maxWidth: 270,
    margin: 5,
    boxShadow: "0 2px 5px 5px rgba(0, 0, 0, .3)",
  },
  precostyle: {
    color: "red",
    justifyContent: "flex-end",
    marginTop: 30,
  },
});

export default function ItemCarrinho({ data }) {
  const classes = useStyles();
  const { removeItem, cartItems, updateQuantity } = useCart();
  const [quantidade, setQuantidade] = useState(1);
  const { setAbrir, setMsg } = useAlert();

  useEffect(() => {
    updateQuantity(data.product, quantidade);
  }, [cartItems, data.product, data.product._id, quantidade, updateQuantity]);

  useEffect(() => {
    setQuantidade(data.quantity);
  }, [data.quantity]);

  const notificacaoItem = () => {
    setMsg('Item Removido!');
    setAbrir(true);
  }

  const removerItem = (id) => {
    removeItem(id);
    notificacaoItem();
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6" component="h3">
          <strong>
            <FastfoodIcon /> {data.product.name}
          </strong>
        </Typography>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="90"
          image={data.product.image}
          title="Contemplative Reptile"
        />
        <Typography variant="subtitle2" component="p">
          {data.product.description}
        </Typography>
        <Typography variant="h5" component="h2" className={classes.precostyle}>
          <strong>R${data.product.price.toFixed(2)}</strong>
        </Typography>
      </CardContent>
      <CardActions>
        <TextField
          size="small"
          label="Quantidade"
          variant="outlined"
          type="Number"
          InputLabelProps={{
            shrink: true,
          }}
          value={quantidade}
          onChange={(event) => setQuantidade(event.target.value)}
        />
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={() => removerItem(data.product._id)}
        >
          <DeleteForeverIcon />
        </Button>
      </CardActions>
    </Card>
  );
}
