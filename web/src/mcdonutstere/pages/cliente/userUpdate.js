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
import { useAlert } from '../../contexts/alertN';
import { useProgresso } from '../../contexts/prog';
import Carregando from '../../components/progress/carregando';
import Notification from '../../components/notificacao/notification';

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
  const { user, signOut } = useAuth();
  const { setAbrir, setMsg } = useAlert();
  const { setProgresso } = useProgresso();
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
    iniciarVariaveisUser,
  } = useUser();

  function notificacaoUpdateCliente() {
    setMsg('Atualizado com Sucesso!');
    setAbrir(true);
    signOut();
  }

  async function atualizarCliente() {
    user.phone[0] = phone;
    if (userDistrict) {
      user.address[0] = {
        district: userDistrict,
        street,
        number: addressNumber,
        reference,
      }
    }

    const userUpdate = {
      name: (name == user.name ? undefined : name),
      username: (username == user.username ? undefined : username),
      password,
      response,
      question,
      phone: user.phone,
      address: user.address ? user.address : undefined,
    };

    await setProgresso(true);
    await Api.put(`users/${user._id}`, userUpdate).then(response => {
      notificacaoUpdateCliente();
    });
    await setProgresso(false);
  }

  useEffect(() => {
    iniciarVariaveisUser();
    setName(user.name);
    setUsername(user.username);
    setPhone(user.phone[0]);
    if (user.address[0]) {
      setUserDistrict(user.address[0].district._id)
      setStreet(user.address[0].street)
      setAddressNumber(user.address[0].number)
      setReference(user.address[0].reference)
    }
  }, []);

  return (
    <div className={classes.colorPag}>
      <Navbar hideIcons />
      <Container maxWidth="md" disableGutters>
        <Notification />
        <Carregando />
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
            <Botao variant="contained" name="Atualizar" color="secondary" onClick={atualizarCliente} />
          </Grid>
        </div>
      </Container>
    </div>
  );
}
