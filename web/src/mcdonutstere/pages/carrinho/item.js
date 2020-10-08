import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  TextField,
} from "@material-ui/core/";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import { useCart } from "../../contexts/cart";
const useStyles = makeStyles({
  root: {
    maxWidth: 270,
    margin: 5,
  },
  precostyle: {
    color: "red",
    justifyContent: "flex-end",
    marginTop: 60,
  },
});

export default function ItemCarrinho({ data }) {
  const classes = useStyles();
  const { removeItem, cartItems, updateQuantity } = useCart();
  const [quantidade, setQuantidade] = useState(1);

  useEffect(() => {
    updateQuantity(data.product, quantidade);
  }, [cartItems, data.product, data.product._id, quantidade, updateQuantity]);

  useEffect(() => {
    setQuantidade(data.quantity);
  }, [data.quantity]);

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6" component="h3">
          <strong>
            <FastfoodIcon /> {data.product.name}
          </strong>
        </Typography>
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
          onClick={() => removeItem(data.product._id)}
        >
          <DeleteForeverIcon />
        </Button>
      </CardActions>
    </Card>
  );
}
