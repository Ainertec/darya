import React from "react";
import {
  makeStyles,
  Card,
  CardContent,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
  Divider,
} from "@material-ui/core/";
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import DoneAllIcon from '@material-ui/icons/DoneAll';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    marginBottom: 20,
  },
  precoStyle: {
    color: "red",
  },
  statusStyleAguardar: {
    color: "orange"
  },
  statusStyleConfirmar: {
    color: "blue"
  }
}));

function createData(name, quantidade, preco) {
  return { name, quantidade, preco };
}

const rows = [
  createData("Frozen yoghurt", 5, 6.0),
  createData("Ice cream sandwich", 2, 9.0),
  createData("Eclair", 2, 1.0),
];

export default function Pedido() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          <strong>Pedido nº: 1512151</strong>
        </Typography>
        <Typography color="textSecondary">25/06/2020 16:30:45</Typography>
        <h4 className={classes.statusStyleAguardar}>
          <HourglassEmptyIcon /> Em aguardo
        </h4>
        <h4 className={classes.statusStyleConfirmar}>
          <DoneAllIcon /> Confirmado
        </h4>
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
          <Typography
            color="textSecondary"
            variant="body2"
            className={classes.precoStyle}
          >
            Taxa de entrega: R$12.00
          </Typography>
          <Divider variant="middle" className={classes.divisorStyle} />
          <Typography variant="body1" component="h3">
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
                    <TableCell align="right" className={classes.precoStyle}>
                      R$ {row.preco.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography
            variant="h6"
            component="h4"
            className={classes.precoStyle}
          >
            Valor total: R$ 26.00
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
