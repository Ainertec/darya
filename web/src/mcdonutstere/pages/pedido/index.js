import React from 'react';
import {
    Box,
    makeStyles,
    Container,
} from '@material-ui/core/';


import Navbar from "../../components/navbar/navbar";
import NavInferior from "../../components/navbar/navinferior";
import Pedido from "./pedido";


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
    const classes = useStyles();

    return (
        <div className={classes.colorPag}>
            <Navbar />
            <Container maxWidth="md" disableGutters>
                <Box justifyContent="center" flexWrap="wrap" display="flex" className={classes.root}>
                    <Pedido />
                    <Pedido />
                    <Pedido />
                    <Pedido />
                    <Pedido />
                    <NavInferior />
                </Box>
            </Container>
        </div>
    );
}