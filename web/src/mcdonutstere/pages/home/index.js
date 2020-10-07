import React from "react";
import { Box, makeStyles, Container } from "@material-ui/core/";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import Navbar from "../../components/navbar/navbar";
import Item from "./item";
import BotaoFlutuante from "./botaoflutuante";
import TabelaDeEndereco from "./tabelaDeEndereco";

const JSONfake = [
  { _id: "1", name: "teste", price: 2.5, description: "O melhor da casa!" },
  { _id: "2", name: "teste22", price: 2.6, description: "O melhor da casa2!" },
  { _id: "3", name: "teste3", price: 2.7, description: "O melhor da casa3!" },
  { _id: "4", name: "teste4", price: 2.8, description: "O melhor da casa4!" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 30,
    position: "relative",
  },
  root2: {
    position: "relative",
    marginBottom: 60,
  },
  colorPag: {
    backgroundColor: "#fff9c4",
    borderRadius: 30,
  },
}));

function Home() {
  const classes = useStyles();

  //   const itens = [];
  //   for (let item of JSONfake) {
  //     itens.push();
  //   }

  return (
    <div className={classes.colorPag}>
      <Navbar />
      <Container maxWidth="md" disableGutters>
        <Box
          justifyContent="center"
          flexWrap="wrap"
          display="flex"
          className={classes.root}
        >
          {JSONfake.map((item) => (
            <Item key={item._id} data={item} />
          ))}
        </Box>
        <Box
          justifyContent="center"
          flexWrap="wrap"
          display="flex"
          className={classes.root2}
        >
          <TabelaDeEndereco />
        </Box>
        <BotaoFlutuante icone={<ShoppingCartIcon />} name="Carinho" />
      </Container>
    </div>
  );
}

export default Home;
