import React, { useState } from 'react';
import {
    makeStyles,
    TextField,
    MenuItem,
} from '@material-ui/core/';
import { useUser } from '../../contexts/user';


const currencies = [
    {
        value: 'Qual o modelo do seu primeiro carro?',
        label: 'Qual o modelo do seu primeiro carro?',
    },
    {
        value: 'Qual o nome do seu melhor amigo de infância?',
        label: 'Qual o nome do seu melhor amigo de infância?',
    },
    {
        value: 'Qual o nome do seu primeiro animal de estimação?',
        label: 'Qual o nome do seu primeiro animal de estimação?',
    },
    {
        value: 'Qual o nome da sua mãe?',
        label: 'Qual o nome da sua mãe?',
    },
    {
        value: 'Qual sua cor preferida?',
        label: 'Qual sua cor preferida?',
    },
];


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 15,
        width: '100%',
    },
}));


export default function SelectQuestion({ dado }) {
    const classes = useStyles();
    const { question, setQuestion } = useUser();

    const handleChange = (event) => {
        setQuestion(event.target.value);
    };

    return (
        <TextField
            id="standard-select-currency"
            select
            label={dado.name}
            value={question}
            onChange={handleChange}
            className={classes.root}
        >
            {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    );
}