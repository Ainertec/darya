import React, { useState } from 'react';
import {
    Box,
    makeStyles,
    Container,
    ButtonGroup,
    Grid,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@material-ui/core/';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SecurityIcon from '@material-ui/icons/Security';

import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';
import { useAlert } from '../../contexts/alertN';
import { useProgresso } from '../../contexts/prog';
import Carregando from '../../components/progress/carregando';

import Navbar from "../../components/navbar/navbar";
import Input from "../../components/form/input";
import Botao from "../../components/form/botao";
import BotaoVoltar from '../../components/form/botaoVoltar';
import Notification from '../../components/notificacao/notification';
import Api from '../../services/api';


const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: 0,
        marginBottom: 0,
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
        padding: 20,
    },
    divisorStyle: {
        backgroundColor: "#fffdeb",
        borderRadius: 20,
        boxShadow: '0 2px 5px 5px rgba(0, 0, 0, .3)',
        padding: 30,
    }
}));


function TelaLogin() {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const { signIn } = useAuth();
    const { setAbrir, setMsg } = useAlert();
    const { setProgresso } = useProgresso();

    const classes = useStyles();

    const history = useHistory();
    function handleNavigateToCreate() {
        history.push("/mcdonuts/cadastrar");
    }

    const notificacaodeLogin = (mensagem) => {
        setAbrir(true);
        setMsg(mensagem);
    }

    async function hanldleLogin() {
        await setProgresso(true)
        const result = await signIn({ name, password });
        await setProgresso(false)
        if (result == 200) {
            notificacaodeLogin('Login efetuado com sucesso!');
        } else {
            notificacaodeLogin('Usuário ou senha incorretos!');
        }
    }


    const [question, setQuestion] = useState('Nenhuma.');
    const [response, setResponse] = useState();
    const [newPassword, setNewPassword] = useState();
    const [recuperarSenha, setRecuperarSenha] = useState(false);

    async function handleAbrirRecuperarSenha() {
        setRecuperarSenha(true);
        await setProgresso(true)
        await Api.get(`forgot/${name}`).then(result => {
            setQuestion(result.data.question);
        });
        await setProgresso(false)
    };

    const handleFecharRecuperarSenha = () => {
        setRecuperarSenha(false);
    };

    async function recuperarSenhaConta() {
        const resetSenha = {
            username: name,
            response,
            password: newPassword,
        }
        await setProgresso(true)
        await Api.post(`forgot`, resetSenha).then(result => {
            setAbrir(true);
            setMsg('Senha atualizada com sucesso!');
            handleFecharRecuperarSenha();
        });
        await setProgresso(false)
    }

    return (
        <div className={classes.colorPag}>
            <Navbar hideIcons={true} />
            <Container maxWidth="md" disableGutters>
                <Notification />
                <Carregando />
                <Box justifyContent="center" flexWrap="wrap" display="flex" className={classes.root}>
                    <Grid item xs={9}>
                        <BotaoVoltar dado={`/mcdonuts`} />
                        <Grid item xs={12}>
                            <Typography gutterBottom variant="h6" component="p" className={classes.textStyle}>
                                <AccountCircle /> Acessar conta
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.divisorStyle}>
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
                                <Botao variant="text" name="Esqueceu a senha?" color="primary" onClick={handleAbrirRecuperarSenha} />
                            </Grid>
                        </div>
                        <p style={{ color: "red" }}>Caso precise de ajuda para acessar seu login, entre em contato pelo whatsapp número: (22) 22222-2222.</p>
                    </Grid>
                </Box>
                <div>
                    <Dialog open={recuperarSenha} onClose={handleFecharRecuperarSenha} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title"><SecurityIcon />Recuperar senha</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Para criar uma nova senha responda a pergunta:
                                <br />
                                <strong>{question}</strong>
                            </DialogContentText>
                            <Input label="Resposta da pergunta" type="text" onChange={event => setResponse(event.target.value)} value={response} />
                            <Input label="Nova Senha" type="password" onChange={event => setNewPassword(event.target.value)} value={newPassword} />
                        </DialogContent>
                        <DialogActions>
                            <Botao variant="text" name="Cancelar" color="primary" onClick={handleFecharRecuperarSenha} />
                            <Botao variant="contained" name="Alterar" color="secondary" onClick={recuperarSenhaConta} />
                        </DialogActions>
                    </Dialog>
                </div>
            </Container>
        </div>
    );
}

export default TelaLogin;