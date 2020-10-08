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

import Navbar from "../../components/navbar/navbar";
import NavInferior from "../../components/navbar/navinferior";
import ItemCarrinho from "./item";
import Endereco from "./endereco";
import DadosGerais from "./dadogeral";
import { useCart } from "../../contexts/cart";

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
  },
}));

function getTitulos() {
  return ["Items do pedido", "Dados para entrega", "Confirmar pedido"];
}

const JSONfake = JSON.parse(`[
    {"id":"1","name":"teste","price":2.50,"description":"O melhor da casa!"},
    {"id":"2","name":"teste2","price":2.60,"description":"O melhor da casa2!"},
    {"id":"3","name":"teste3","price":2.70,"description":"O melhor da casa3!"},
    {"id":"4","name":"teste4","price":2.80,"description":"O melhor da casa4!"}
]`);

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
            // component="h3"
            style={{ color: "red", textAlign: "center" }}
          >
            Alteração ou cancelamento após a confirmação do pedido
            <br />
            só poderá ser feito pelo Whatsapp número (22)98153-3173.
            <br />
            Obrigado pela compreensão!
          </Typography>
        </>
      );
  }
}

export default function TelaCarrinho() {
  const classes = useStyles();
  const { cartItems } = useCart();
  const [posicaoNavegacao, setProximoAnterior] = useState(0);
  const cabecario = getTitulos();

  const continuar = () => {
    setProximoAnterior((opcaoDeNavegacao) => opcaoDeNavegacao + 1);
  };

  const voltar = () => {
    setProximoAnterior((opcaoDeNavegacao) => opcaoDeNavegacao - 1);
  };

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
                  {getStepContent(posicaoNavegacao, cartItems)}
                </Box>
                <Box justifyContent="center" flexWrap="wrap" display="flex">
                  {posicaoNavegacao < cabecario.length ? (
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
                      onClick={voltar}
                      color="secondary"
                      variant="contained"
                    >
                      <DoneAllIcon />
                      Confirmar Pedido
                    </Button>
                  )}
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
