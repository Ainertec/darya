import React from 'react';
import {
    Button,
    makeStyles,
} from '@material-ui/core/';


const useStyles = makeStyles((theme) => ({
    root: {
        margin: 5,
    },
}));

function Botao({ name, ...rest }) {
    const classes = useStyles();

    return (
        <Button
            {...rest}
            className={classes.root}
        >
            {name}
        </Button>
    );
}

export default Botao;