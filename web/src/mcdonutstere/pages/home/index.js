import React, { useEffect, useState } from "react";
import {
  Box,
  makeStyles,
  Container,
} from "@material-ui/core/";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import Navbar from "../../components/navbar/navbar";
import Item from "./item";
import BotaoFlutuante from "./botaoflutuante";
import TabelaDeEndereco from "./tabelaDeEndereco";
import Notification from "../../components/notificacao/notification";
import { useProgresso } from "../../contexts/prog";
import Carregando from "../../components/progress/carregando";
import Api from "../../services/api";


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
  bannerStyle: {
    borderRadius: 30,
    height: '30vh',
    width: '80vw'
  }
}));

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const classes = useStyles();
  const { setProgresso } = useProgresso();

  useEffect(() => {
    async function carregarProdutos() {
      await setProgresso(true);
      await Api.get('products').then(response => {
        setProdutos(response.data);
      });
      await setProgresso(false);
    }
    carregarProdutos();
  }, []);

  return (
    <div className={classes.colorPag}>
      <Navbar />
      <Container maxWidth="md" disableGutters>
        <Notification />
        <Carregando />
        <Box
          justifyContent="center"
          flexWrap="wrap"
          display="flex"
          className={classes.root}
        >
          {produtos.map((item) => (
            item.available && (
              <Item key={item._id} data={item} />
            )
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