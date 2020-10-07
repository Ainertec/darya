import React from 'react';
import {
    makeStyles,
    TextField,
    MenuItem,
} from '@material-ui/core/';



const currencies = [
    {
        value: 'Nova Friburgo',
        label: 'Nova Friburgo',
    },
    {
        value: 'Lumiar',
        label: 'Lumiar',
    },
    {
        value: 'São Pedro',
        label: 'São Pedro',
    },
    {
        value: 'Boa Esperança',
        label: 'Boa Esperança',
    },
];


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 30,
        width: '100%',
    },
}));


function Select(props) {
    const classes = useStyles();
    const [currency, setCurrency] = React.useState('Nova Friburgo');

    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

    return (
        <TextField
            id="standard-select-currency"
            select
            label={props.name}
            value={currency}
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

export default Select;
