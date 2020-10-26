import React, { useState, useEffect } from 'react';
import {
    Box,
    makeStyles,
    Container,
} from '@material-ui/core/';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';


import { useProgresso } from '../../contexts/prog';
import Carregando from '../../components/progress/carregando';
import Navbar from "../../components/navbar/navbar";
import NavInferior from "../../components/navbar/navinferior";
import Pedido from "./pedido";
import BotaoVoltar from '../../components/form/botaoVoltar';
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
        boxShadow: '0 2px 5px 5px rgba(0, 0, 0, .3)',
        borderRadius: 20,
        marginTop: 20,
        marginBottom: 30,
        backgroundColor: "#fff",
    },
}));



export default function TelaPedido() {
    const [pedidos, setPedidos] = useState([]);
    const classes = useStyles();
    const { setProgresso } = useProgresso();

    useEffect(() => {
        async function buscarPedidos() {
            await setProgresso(true)
            await Api.get(`orders/user`).then(response => {
                setPedidos(response.data);
            });
            await setProgresso(false)
        }
        buscarPedidos();
    }, []);

    return (
        <div className={classes.colorPag}>
            <Navbar />
            <Container maxWidth="md" disableGutters>
                <Notification />
                <Carregando />
                <BotaoVoltar dado={`/mcdonuts/carrinho`} />
                <Box justifyContent="center" flexWrap="wrap" display="flex" className={classes.root}>
                    {pedidos.length > 0 ?
                        pedidos.map((item) => (
                            <Pedido key={item._id} data={item} />
                        ))
                        :
                        <>
                            <h3 style={{ textAlign: 'center' }}>
                                <RemoveCircleOutlineIcon />
                                Nenhum pedido encontrado!
                                <MoodBadIcon />
                            </h3>
                        </>
                    }
                    <h4 style={{ textAlign: 'center', color: 'red' }}>
                        Atenção se seu pedido não estiver aparecendo pode ser que ele tenha sido cancelado pelo vendedor,
                        para mais informações entre em contato pelo Whatsapp número: (22)22222222.
                        <br />
                        Obrigado pela compreensão!
                    </h4>
                    <NavInferior posicao={1} />
                </Box>
            </Container>
        </div>
    );
}