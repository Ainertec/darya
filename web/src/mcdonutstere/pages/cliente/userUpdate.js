import React from "react";
import {
  makeStyles,
  Container,
} from "@material-ui/core/";

import TelaCliente from './tela';
import Navbar from "../../components/navbar/navbar";

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

  return (
    <div className={classes.colorPag}>
      <Navbar hideIcons />
      <Container maxWidth="md" disableGutters>
        <TelaCliente
          dado={
            {
              title: "Atualizar conta",
              bottonTitle: "Atualizar",
            }
          }
        />
      </Container>
    </div>
  );
}
