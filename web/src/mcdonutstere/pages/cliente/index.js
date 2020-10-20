import React from "react";
import {
  makeStyles,
  Container,
  Grid,
} from "@material-ui/core/";

import TelaCliente from './tela';
import Navbar from "../../components/navbar/navbar";
import BotaoVoltar from '../../components/form/botaoVoltar';
import Botao from "../../components/form/botao";
import { useUser } from "../../contexts/user";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 15,
    marginBottom: 60,
  },
  colorPag: {
    backgroundColor: "#fff9c4",
    borderRadius: 30,
  },
  campoBotaoStyle: {
    marginTop: 40,
    marginBottom: 20,
  },
}));

export default function TelaDeCadastroCliente() {
  const classes = useStyles();
  const {
    name,
    username,
    password,
    response,
    question,
    phone,
  } = useUser();

  function cadastrarCliente() {
    const user = {
      name,
      username,
      password,
      response,
      question,
      phone,
    };

    console.log(user);
  }

  return (
    <div className={classes.colorPag}>
      <Navbar hideIcons />
      <Container maxWidth="md" disableGutters>
        <BotaoVoltar dado={`/mcdonuts`} />
        <TelaCliente dado={
          {
            title: "Criar conta",
          }
        }
        />
        <div className={classes.campoBotaoStyle}>
          <Grid item xs={12}>
            <Botao variant="contained" name="Cadastrar" color="secondary" onClick={cadastrarCliente} />
          </Grid>
        </div>
      </Container>
    </div>
  );
}