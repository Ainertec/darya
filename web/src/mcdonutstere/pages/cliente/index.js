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
import { useUser } from "../../contexts/user";
import { useAlert } from '../../contexts/alertN';
import { useHistory } from 'react-router-dom';
import { useProgresso } from '../../contexts/prog';
import Carregando from '../../components/progress/carregando';
import Notification from '../../components/notificacao/notification';
import Api from '../../services/api';

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
    userDistrict,
    street,
    addressNumber,
    reference,
    iniciarVariaveisUser,
  } = useUser();
  const { setAbrir, setMsg } = useAlert();
  const { setProgresso } = useProgresso();
  const history = useHistory();

  function handleNavigateToLogin() {
    history.push('/mcdonuts/login');
  };

  async function notificacaoCadastroCliente() {
    await setMsg('Cadastrado com sucesso!')
    await setAbrir(true);
    handleNavigateToLogin();
  }

  async function cadastrarCliente() {
    const user = {
      name,
      username,
      password,
      response,
      question,
      phone: [phone],
      address: userDistrict ? [{
        district: userDistrict,
        street,
        number: addressNumber,
        reference,
      }] : undefined,
    };

    await setProgresso(true);
    await Api.post(`users`, user).then(response => {
      notificacaoCadastroCliente();
    });
    await setProgresso(false);

  }

  useEffect(() => {
    iniciarVariaveisUser();
  }, []);

  return (
    <div className={classes.colorPag}>
      <Navbar hideIcons />
      <Container maxWidth="md" disableGutters>
        <Notification />
        <Carregando />
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