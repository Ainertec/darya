import React, { useState } from "react";
import { makeStyles, Paper, Tabs, Tab, Box } from "@material-ui/core/";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "90%",
    maxWidth: 700,
    boxShadow: "0 2px 5px 5px rgba(0, 0, 0, .3)",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#fffdeb",
  },
  root2: {
    position: "fixed",
    width: "90%",
    bottom: 0,
    zIndex: 3,
  },
});

function NavInferior({ posicao }) {
  const classes = useStyles();
  const [value, setValue] = useState(posicao);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const history = useHistory();
  function handleNavigateToPedido() {
    history.push("/mcdonuts/pedido");
  }
  function handleNavigateToCarrinho() {
    history.push("/mcdonuts/carrinho");
  }

  return (
    <Box
      justifyContent="center"
      flexWrap="wrap"
      display="flex"
      className={classes.root2}
    >
      <Paper square className={classes.root}>
        <Tabs
          value={!value ? posicao : value}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab
            icon={<ShoppingCartIcon />}
            onClick={() => handleNavigateToCarrinho()}
          />
          <Tab
            icon={<ShoppingBasketIcon />}
            onClick={() => handleNavigateToPedido()}
          />
        </Tabs>
      </Paper>
    </Box>
  );
}

export default NavInferior;
