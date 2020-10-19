import React from "react";
import {
  makeStyles,
  Container,
} from "@material-ui/core/";

import TelaCliente from './tela';
import Navbar from "../../components/navbar/navbar";
import BotaoVoltar from '../../components/form/botaoVoltar';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 15,
    marginBottom: 60,
  },
  colorPag: {
    backgroundColor: "#fff9c4",
    borderRadius: 30,
  },
}));

export default function TelaDeCadastroCliente() {
  const classes = useStyles();

  return (
    <div className={classes.colorPag}>
      <Navbar hideIcons />
      <Container maxWidth="md" disableGutters>
        <BotaoVoltar dado={`/mcdonuts`} />
        <TelaCliente dado={
          {
            title: "Criar conta",
            bottonTitle: "Cadastrar",
          }
        }
        />
      </Container>
    </div>
  );
}