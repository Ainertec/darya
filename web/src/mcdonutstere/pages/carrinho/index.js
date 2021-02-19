import React, { useState } from "react";
import {
  Box,
  makeStyles,
  Container,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
} from "@material-ui/core/";

import SkipNextIcon from "@material-ui/icons/SkipNext";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import MoodBadIcon from '@material-ui/icons/MoodBad';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';

import { useHistory } from "react-router-dom";

import Navbar from "../../components/navbar/navbar";
import NavInferior from "../../components/navbar/navinferior";
import ItemCarrinho from "./item";
import Endereco from "./endereco";
import DadosGerais from "./dadogeral";
import BotaoVoltar from '../../components/form/botaoVoltar';
import { useCart } from "../../contexts/cart";
import { useAuth } from "../../contexts/auth";
import { useAlert } from '../../contexts/alertN';
import { useProgresso } from '../../contexts/prog';
import { useLojaOpen } from '../../contexts/openShop';
import Carregando from '../../components/progress/carregando';
import Api from "../../services/api";
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
  textStyle: {
    textAlign: "center",
    boxShadow: "0 2px 5px 5px rgba(0, 0, 0, .3)",
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: "#fff",
  },
  cabecaloProgressoStyle: {
    borderRadius: 30,
    boxShadow: "0 2px 5px 5px rgba(0, 0, 0, .3)",
  },
}));

function getTitulos() {
  return ["Items do pedido", "Dados para entrega", "Confirmar pedido"];
}

function getStepContent(step, cartItems) {
  switch (step) {
    case 0:
      return (
        <>
          {cartItems.map((item) => (
            <ItemCarrinho key={item.product._id} data={item} />
          ))}
        </>
      );

    case 1:
      return (
        <>
          <Endereco />
        </>
      );
    case 2:
      return (
        <>
          <DadosGerais />
        </>
      );
    default:
      return (
        <>
          <Typography
            variant="body1"
            style={{ color: "red", textAlign: "center" }}
          >
            Alteração ou cancelamento após a confirmação do pedido
            <br />
            só poderá ser feito pelo Whatsapp número (22) 22222-22222.
            <br />
            Obrigado pela compreensão!
          </Typography>
        </>
      );
  }
}

export default function TelaCarrinho() {
  const classes = useStyles();
  const { cartItems, payment, addressId, note, inicializarVariaveisCard } = useCart();
  const { user } = useAuth();
  const [posicaoNavegacao, setProximoAnterior] = useState(0);
  const cabecario = getTitulos();
  const { setAbrir, setMsg } = useAlert();
  const { setProgresso } = useProgresso();
  const { lojaOpen } = useLojaOpen();

  const history = useHistory();
  function handleNavigateToPedidos() {
    history.push("/mcdonuts/pedido");
  }

  const continuar = () => {
    setProximoAnterior((opcaoDeNavegacao) => opcaoDeNavegacao + 1);
  };

  const voltar = () => {
    setProximoAnterior((opcaoDeNavegacao) => opcaoDeNavegacao - 1);
  };

  async function sendOrder() {
    const items = cartItems.map((item) => {
      return { product: item.product._id, quantity: item.quantity };
    });

    const order = {
      user_id: user._id,
      user_address_id: addressId != 0 ? addressId : undefined,
      items,
      payment,
      source: "site",
      note,
    };

    await setProgresso(true);
    await Api.post('orders', order).then(response => {
      console.log(response)
      setMsg('Pedido criado com sucesso!');
      setAbrir(true);
      inicializarVariaveisCard();
    });
    await setProgresso(false);
    await setTimeout(function () { handleNavigateToPedidos(); }, 500);
  }

  return (
    <div className={classes.colorPag}>
      <Navbar />
      <Container maxWidth="md" disableGutters>
        <BotaoVoltar dado={`/mcdonuts`} />
        <Notification />
        <Carregando />
        <Box
          justifyContent="center"
          flexWrap="wrap"
          display="flex"
          className={classes.root}
        >
          <div>
            <Stepper
              activeStep={posicaoNavegacao}
              alternativeLabel
              className={classes.cabecaloProgressoStyle}
            >
              {cabecario.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div>
              <div>
                <Box
                  justifyContent="center"
                  flexWrap="wrap"
                  display="flex"
                  className={classes.root}
                >
                  {posicaoNavegacao === 0 && (
                    <>
                      {cartItems.map((item) => (
                        <ItemCarrinho key={item.product._id} data={item} />
                      ))}
                    </>
                  )}
                  {posicaoNavegacao === 1 && <Endereco />}

                  {posicaoNavegacao === 2 && <DadosGerais />}

                  {posicaoNavegacao === 3 && (
                    <Typography
                      variant="body1"
                      // component="h3"
                      style={{ color: "red", textAlign: "center" }}
                    >
                      Alteração ou cancelamento após a confirmação do pedido
                      <br />
                      só poderá ser feito pelo Whatsapp número (22)98153-3173.
                      <br />
                      Obrigado pela compreensão!
                    </Typography>
                  )}
                </Box>
                <Box justifyContent="center" flexWrap="wrap" display="flex">
                  {lojaOpen ? (
                    cartItems.length > 0 ? (
                      posicaoNavegacao < cabecario.length ? (
                        <>
                          <Button
                            disabled={posicaoNavegacao === 0}
                            onClick={voltar}
                            variant="contained"
                          >
                            <SkipPreviousIcon />
                          Voltar
                        </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={continuar}
                            style={{ marginLeft: 30 }}
                          >
                            {posicaoNavegacao === cabecario.length - 1 ? (
                              <>
                                <DoneOutlineIcon /> Fazer Pedido
                            </>
                            ) : (
                                <>
                                  Continuar <SkipNextIcon />
                                </>
                              )}
                          </Button>
                        </>
                      ) : (
                          <Button
                            disabled={posicaoNavegacao === 0}
                            onClick={sendOrder}
                            color="secondary"
                            variant="contained"
                          >
                            <DoneAllIcon />
                            Confirmar Pedido
                          </Button>
                        ))
                      :
                      <>
                        <h3 style={{ textAlign: 'center' }}>
                          <RemoveShoppingCartIcon />
                          Nenhum item adicionado ao carrinho
                          <MoodBadIcon />
                        </h3>
                      </>
                  )
                    :
                    <>
                      <h3 style={{ textAlign: 'center' }}>
                        <RemoveShoppingCartIcon />
                          Não é possível efetuar pedidos, Loja fechada!
                          <MoodBadIcon />
                      </h3>
                    </>
                  }
                </Box>
              </div>
            </div>
          </div>
          <NavInferior posicao={0} />
        </Box>
      </Container>
    </div>
  );
}
