import React from "react";
import {
  makeStyles,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@material-ui/core/";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { useCart } from "../../contexts/cart";

const useStyles = makeStyles({
  root: {
    maxWidth: 160,
    margin: 5,
    boxShadow: "0 2px 5px 5px rgba(0, 0, 0, .3)",
    borderRadius: 20,
  },
  precoestilo: {
    backgroundColor: "#880016",
    color: "#fff",
  },
  botaoestilo: {
    borderRadius: 30,
  },
});

function Item({ data }) {
  const classes = useStyles();
  const { addItem } = useCart();

  function handleAddItem() {
    console.log(data);
    addItem(data);
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="90"
          image={data.image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="p">
            {data.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {data.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.precoestilo}>
        <Typography gutterBottom variant="h6" component="h6">
          R${data.price.toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          className={classes.botaoestilo}
          onClick={() => handleAddItem()}
        >
          <AddShoppingCartIcon />
        </Button>
      </CardActions>
    </Card>
  );
}

export default Item;
