import React from 'react';
import {
    makeStyles,
    Fab
} from '@material-ui/core/';

import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

function BotaoFlutuante(props) {
    const classes = useStyles();

    return (
        <Link to='/mcdonuts/carrinho'>
            <Fab
                className={classes.root}
                color="secondary"
                variant="extended"
            >
                {props.icone}
                {props.name}
            </Fab>
        </Link>
    );
}

export default BotaoFlutuante;