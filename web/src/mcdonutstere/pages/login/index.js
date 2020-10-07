import React, { useState } from 'react';
import {
    Box,
    makeStyles,
    Container,
    ButtonGroup,
    Grid,
    Typography,
} from '@material-ui/core/';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';

import Navbar from "../../components/navbar/navbar";
import Input from "../../components/form/input";
import Botao from "../../components/form/botao";


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
        boxShadow: '0 2px 5px 5px rgba(0, 0, 0, .3)',
        borderRadius: 20,
        marginTop: 20,
        marginBottom: 30,
        backgroundColor: "#fff",
    },
}));


function TelaLogin() {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const { signIn } = useAuth();

    const classes = useStyles();

    const history = useHistory();
    function handleNavigateToCreate() {
        history.push("/mcdonuts/cadastrar");
    }

    async function hanldleLogin() {
        console.log(name, password)
        const response = await signIn({ name, password });
        console.log(response);
    }

    return (
        <div className={classes.colorPag}>
            <Navbar hideIcons={true} />
            <Container maxWidth="md" disableGutters>
                <Box justifyContent="center" flexWrap="wrap" display="flex" className={classes.root}>
                    <Grid item xs={7}>
                        <Grid item xs={12}>
                            <Typography gutterBottom variant="h6" component="p" className={classes.textStyle}>
                                <AccountCircle /> Acessar conta
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Input label="Usuário" type="text" onChange={event => setName(event.target.value)} value={name} />
                            <Input label="Senha" type="password" onChange={event => setPassword(event.target.value)} value={password} />
                        </Grid>
                        <div className={classes.campoBotaoStyle}>
                            <Grid item xs={12}>
                                <ButtonGroup aria-label="text primary button group">
                                    <Botao variant="contained" name="Cadastrar" color="primary" onClick={() => handleNavigateToCreate()} />
                                    <Botao variant="contained" name="Entrar" color="secondary" onClick={hanldleLogin} />
                                </ButtonGroup>
                            </Grid>
                            <Grid item xs={12} style={{ marginTop: 20 }}>
                                <Botao variant="text" name="Esqueceu a senha?" color="primary" />
                            </Grid>
                        </div>
                    </Grid>
                </Box>
            </Container>
        </div>
    );
}

export default TelaLogin;