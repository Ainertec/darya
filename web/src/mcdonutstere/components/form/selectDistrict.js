import React from 'react';
import {
    makeStyles,
    TextField,
    MenuItem,
} from '@material-ui/core/';

import { useUser } from '../../contexts/user';


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 15,
        width: '100%',
    },
}));


export default function SelectDistrict({ dado }) {
    const classes = useStyles();
    const { userDistrict, setUserDistrict } = useUser();

    const handleChange = (event) => {
        setUserDistrict(event.target.value);
    };

    return (
        <TextField
            id="standard-select-currency"
            select
            label={dado.name}
            value={userDistrict}
            onChange={handleChange}
            className={classes.root}
        >
            {dado.data.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                    {option.name} - {option.city}
                </MenuItem>
            ))}
        </TextField>
    );
}