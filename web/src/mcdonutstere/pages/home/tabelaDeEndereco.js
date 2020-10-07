import React from 'react';
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

function createData(name, taxa) {
    return { name, taxa };
}

const rows = [
    createData('Lumiar', 20.00),
    createData('São Pedro', 15.00),
    createData('Santiago', 30.00),
];

function TabelaDeTaxas() {
    const classes = useStyles();

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
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    <Room /> {row.name}
                                </TableCell>
                                <TableCell align="right" className={classes.linhaStyle}>
                                    <strong>
                                        R$ {(row.taxa).toFixed(2)}
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

export default TabelaDeTaxas;