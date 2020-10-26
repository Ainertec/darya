import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { useProgresso } from "../../contexts/prog";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function Carregando() {
    const classes = useStyles();
    const { progresso } = useProgresso();

    return (
        <div>
            <Backdrop className={classes.backdrop} open={progresso}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}