import React, { useState, useEffect } from 'react';
import {
    Box,
    makeStyles,
    Container,
} from '@material-ui/core/';


import Navbar from "../../components/navbar/navbar";
import NavInferior from "../../components/navbar/navinferior";
import Pedido from "./pedido";
import BotaoVoltar from '../../components/form/botaoVoltar';
import Api from "../../services/api";

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

    useEffect(() => {
        Api.get(`orders/user`).then(response => {
            setPedidos(response.data);
        });
    }, []);

    return (
        <div className={classes.colorPag}>
            <Navbar />
            <Container maxWidth="md" disableGutters>
                <BotaoVoltar dado={`/mcdonuts/carrinho`} />
                <Box justifyContent="center" flexWrap="wrap" display="flex" className={classes.root}>
                    {pedidos.map((item) => (
                        <Pedido key={item._id} data={item} />
                    ))}
                    <NavInferior posicao={1} />
                </Box>
            </Container>
        </div>
    );
}