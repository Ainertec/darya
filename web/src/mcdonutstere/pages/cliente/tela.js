import React from "react";
import {
    Box,
    makeStyles,
    Grid,
    Typography,
} from "@material-ui/core/";
import AccountCircle from "@material-ui/icons/AccountCircle";

import Input from "../../components/form/input";
import Botao from "../../components/form/botao";
import Select from "../../components/form/select";

const useStyles = makeStyles((theme) => ({
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
        padding: 20,
    },
    divisorStyle: {
        backgroundColor: '#fffdeb',
        borderRadius: 20,
        boxShadow: "0 2px 5px 5px rgba(0, 0, 0, .3)",
        marginBottom: 10,
        padding: 30,
    }
}));

export default function TelaDeDadosCliente({ dado }) {
    const classes = useStyles();

    return (
        <Box
            justifyContent="center"
            flexWrap="wrap"
            display="flex"
            className={classes.root}
        >
            <Grid item xs={9}>
                <Grid item xs={12}>
                    <Typography
                        gutterBottom
                        variant="h6"
                        component="p"
                        className={classes.textStyle}
                    >
                        <AccountCircle /> {dado.title}
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.divisorStyle}>
                    <h3>
                        Dados de cliente
                    </h3>
                    <Input label="Nome completo" type="text" />
                    <Input label="Telefone" type="phone" />
                </Grid>
                <Grid item xs={12} className={classes.divisorStyle}>
                    <h3>
                        Endereço de entrega
                    </h3>
                    <Input label="Endereço" type="text" />
                    <Select dado={
                        {
                            name: "Bairro",
                        }
                    }
                    />
                </Grid>
                <Grid item xs={12} className={classes.divisorStyle}>
                    <h3>
                        Dados de acesso
                    </h3>
                    <Input label="Nome de usuário" type="text" />
                    <Input label="Senha" type="password" />
                </Grid>
                <Grid item xs={12} className={classes.divisorStyle}>
                    <h3>
                        Opção para recuperar senha
                    </h3>
                    <Select dado={
                        {
                            name: "Selecione uma pergunta",
                        }
                    }
                    />
                    <Input label="Resposta da pergunta" type="text" />
                </Grid>
                <div className={classes.campoBotaoStyle}>
                    <Grid item xs={12}>
                        <Botao variant="contained" name={dado.bottonTitle} color="secondary" />
                    </Grid>
                </div>
            </Grid>
        </Box>
    );
}