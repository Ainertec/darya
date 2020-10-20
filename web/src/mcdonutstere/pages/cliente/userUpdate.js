import React, { useEffect } from "react";
import {
  makeStyles,
  Container,
  Grid,
} from "@material-ui/core/";

import TelaCliente from './tela';
import Navbar from "../../components/navbar/navbar";
import BotaoVoltar from '../../components/form/botaoVoltar';
import Botao from "../../components/form/botao";
import Api from "../../services/api";
import { useAuth } from '../../contexts/auth';
import { useUser } from "../../contexts/user";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 30,
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

export default function TelaDeAtualizarCliente() {
  const classes = useStyles();
  const { user } = useAuth();
  const {
    name,
    setName,
    username,
    setUsername,
    password,
    setPassword,
    question,
    setQuestion,
    response,
    setResponse,
    phone,
    setPhone,
    userDistrict,
    setUserDistrict,
    street,
    setStreet,
    addressNumber,
    setAddressNumber,
    reference,
    setReference,
  } = useUser();

  function atualizarCliente() {
    const userUpdate = {
      _id: user._id,
      name,
      username,
      password,
      response,
      question,
      phone,
      address: user.address ? [{
        disctrict: userDistrict,
        street,
        number: addressNumber,
        reference,
      }] : undefined,
    };

    console.log(userUpdate);
  }

  useEffect(() => {
    setName(user.name);
    setUsername(user.username);
    setPhone(user.phone);
    setUserDistrict()
  }, []);

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
        <div className={classes.campoBotaoStyle}>
          <Grid item xs={12}>
            <Botao variant="contained" name="Cadastrar" color="secondary" onClick={atualizarCliente} />
          </Grid>
        </div>
      </Container>
    </div>
  );
}
