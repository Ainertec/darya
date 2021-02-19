import React, { useEffect, useState } from 'react';
import {
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core/';
import Room from '@material-ui/icons/Room';

import Api from '../../services/api';

const useStyles = makeStyles({
    root: {
        marginTop: 40,
        boxShadow: '0 2px 5px 5px rgba(0, 0, 0, .3)',
        padding: 10,
        borderRadius: 20,
        backgroundColor: "#fff",
        marginBottom: 20,
        width: '90%',
    },
    linhaStyle: {
        color: "red",
    },
});

export default function TabelaDeTaxas() {
    const [bairros, setBairros] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        Api.get('districts').then(response => {
            console.log(response.data)
            setBairros(response.data);
        });
    }, []);

    return (
        <div className={classes.root}>
            <Typography variant="h6" gutterBottom>
                Tabela de endereços e taxas
            </Typography>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Endereço</TableCell>
                            <TableCell align="right">Taxa</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bairros.map((dado) => (
                            <TableRow key={dado.name}>
                                <TableCell component="th" scope="row">
                                    <Room /> {dado.name} - {dado.city}
                                </TableCell>
                                <TableCell align="right" className={classes.linhaStyle}>
                                    <strong>
                                        R$ {(dado.rate).toFixed(2)}
                                    </strong>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}