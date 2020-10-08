import React from "react";
import {
  Box,
  makeStyles,
  Container,
  Grid,
  Typography,
} from "@material-ui/core/";
import AccountCircle from "@material-ui/icons/AccountCircle";

import Navbar from "../../components/navbar/navbar";
import Input from "../../components/form/input";
import Botao from "../../components/form/botao";
import Select from "../../components/form/select";

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
}));

function TelaDeCadastroCliente() {
  const classes = useStyles();

  return (
    <div className={classes.colorPag}>
      <Navbar hideIcons />
      <Container maxWidth="md" disableGutters>
        <Box
          justifyContent="center"
          flexWrap="wrap"
          display="flex"
          className={classes.root}
        >
          <Grid item xs={7}>
            <Grid item xs={12}>
              <Typography
                gutterBottom
                variant="h6"
                component="p"
                className={classes.textStyle}
              >
                <AccountCircle /> Criar conta
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Input label="Nome completo" type="text" />
              <Input label="Telefone" type="phone" />
              <Input label="Endereço" type="text" />
              <Select label="Bairro" />
              <Input label="Nome de usuário" type="text" />
              <Input label="Senha" type="password" />
            </Grid>
            <div className={classes.campoBotaoStyle}>
              <Grid item xs={12}>
                <Botao variant="contained" name="Cadastrar" color="secondary" />
              </Grid>
            </div>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default TelaDeCadastroCliente;
