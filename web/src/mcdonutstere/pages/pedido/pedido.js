import React from 'react';
import {
    makeStyles,
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Grid,
    Divider,
} from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '80%',
        marginBottom: 20,
    },
}));



function createData(name, quantidade, preco) {
    return { name, quantidade, preco };
}

const rows = [
    createData('Frozen yoghurt', 5, 6.00),
    createData('Ice cream sandwich', 2, 9.00),
    createData('Eclair', 2, 1.00),
];



export default function Pedido() {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    Pedido nº: 1512151
                </Typography>
                <Typography color="textSecondary">
                    25/06/2020 16:30:45
                </Typography>
                <Typography variant="body2" component="p">
                    Aguardo
                </Typography>
                <div>
                    <Grid container alignItems="center">
                        <Typography gutterBottom variant="h5">
                            Aldair Camargo
                        </Typography>
                    </Grid>
                    <Typography color="textSecondary" variant="body2">
                        Endereço de entrega: Rua Nova - Lumiar - Nova Friburgo
                        </Typography>
                    <Divider variant="middle" className={classes.divisorStyle} />
                    <Typography color="textSecondary" variant="body2">
                        Tel.: (22)2542-9670, (22)981533173
                    </Typography>
                    <Divider variant="middle" className={classes.divisorStyle} />
                    <Typography color="textSecondary" variant="body2" className={classes.precoStyle}>
                        Taxa de entrega: R$12.00
                    </Typography>
                    <Divider variant="middle" className={classes.divisorStyle} />
                    <Typography variant="body" component="h3">
                        Itens
                    </Typography>
                    <TableContainer className={classes.divisorStyle}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Qtd.:</TableCell>
                                    <TableCell align="right">Preço unid.</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.quantidade}</TableCell>
                                        <TableCell align="right" className={classes.precoStyle}>R$ {(row.preco).toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Typography variant="h6" component="h4" className={classes.precoStyle}>
                        Valor total: R$ 26.00
                    </Typography>
                </div>
            </CardContent>
            <CardActions>
                <Button size="small" variant="contained" color="secondary">Abrir</Button>
            </CardActions>
        </Card>
    );
}