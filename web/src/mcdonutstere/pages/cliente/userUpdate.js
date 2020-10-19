import React from "react";
import {
  makeStyles,
  Container,
} from "@material-ui/core/";

import TelaCliente from './tela';
import Navbar from "../../components/navbar/navbar";
import BotaoVoltar from '../../components/form/botaoVoltar';
import Api from "../../services/api";
import { useAuth } from '../../contexts/auth';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 30,
    marginBottom: 60,
  },
  colorPag: {
    backgroundColor: "#fff9c4",
    borderRadius: 30,
  },
}));

export default function TelaDeAtualizarCliente() {
  const classes = useStyles();
  const { user } = useAuth();

  return (
    <div className={classes.colorPag}>
      <Navbar hideIcons />
      <Container maxWidth="md" disableGutters>
        <BotaoVoltar dado={`/mcdonuts`} />
        <TelaCliente
          dado={
            {
              title: "Atualizar conta",
              bottonTitle: "Atualizar",
              user,
            }
          }
        />
      </Container>
    </div>
  );
}
