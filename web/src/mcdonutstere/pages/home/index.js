import React from 'react';
import {
    Box,
    makeStyles,
    Container,
} from '@material-ui/core/';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';



import Navbar from "../../components/navbar/navbar";
import Item from "./item";
import BotaoFlutuante from "./botaoflutuante";
import TabelaDeEndereco from "./tabelaDeEndereco";


const JSONfake = JSON.parse(`[
        {"id":"1","name":"teste","price":2.50,"description":"O melhor da casa!"},
        {"id":"2","name":"teste2","price":2.60,"description":"O melhor da casa2!"},
        {"id":"3","name":"teste3","price":2.70,"description":"O melhor da casa3!"},
        {"id":"4","name":"teste4","price":2.80,"description":"O melhor da casa4!"}
]`)


const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: 30,
        position: "relative",
    },
    root2: {
        position: "relative",
        marginBottom: 60,
    },
    colorPag: {
        backgroundColor: "#fff9c4",
        borderRadius: 30,
    }
}));



function Home() {
    const classes = useStyles();

    const itens = []
    for (let item of JSONfake) {
        itens.push(<Item
            key={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            id={item.id}
        />)
    }

    return (
        <div className={classes.colorPag}>
            <Navbar />
            <Container maxWidth="md" disableGutters>
                <Box justifyContent="center" flexWrap="wrap" display="flex" className={classes.root}>
                    {itens}
                </Box>
                <Box justifyContent="center" flexWrap="wrap" display="flex" className={classes.root2}>
                    <TabelaDeEndereco />
                </Box>
                <BotaoFlutuante icone={<ShoppingCartIcon />} name="Carinho" />
            </Container>
        </div>
    );
}

export default Home;