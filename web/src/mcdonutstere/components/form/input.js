import React from 'react';
import { TextField } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 15,
        width: '100%',
    },
}));

function Input({ ...rest }) {
    const classes = useStyles();

    return (
        <form noValidate autoComplete="on">
            <TextField
                {...rest}
                className={classes.root}
            />
        </form>
    );
}

export default Input;