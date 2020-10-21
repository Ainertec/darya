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
import { format, parseISO } from 'date-fns';

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

export default function Pedido({ data }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          <strong>Pedido nº: {data.identification}</strong>
        </Typography>
        <Typography color="textSecondary">{format(parseISO(data.createdAt), 'dd/MM/yyyy HH:mm:ss')}</Typography>
        {data.viewed ?
          <h4 className={classes.statusStyleConfirmar}>
            <DoneAllIcon /> Confirmado
          </h4>
          :
          <h4 className={classes.statusStyleAguardar}>
            <HourglassEmptyIcon /> Em aguardo
          </h4>
        }
        <div>
          <Grid container alignItems="center">
            <Typography gutterBottom variant="h5">
              {data.user.name}
            </Typography>
          </Grid>
          <Typography color="textSecondary" variant="body2">
            Endereço de entrega: {data.address ? `${data.address.street}, nº${data.address.number} - ${data.address.district_name}` : `Retirada no local`}
          </Typography>
          <Divider variant="middle" className={classes.divisorStyle} />
          <Typography color="textSecondary" variant="body2">
            Tel.: {data.user.phone}
          </Typography>
          <Divider variant="middle" className={classes.divisorStyle} />
          <Typography
            color="textSecondary"
            variant="body2"
            className={classes.precoStyle}
          >
            Taxa de entrega: R${data.address ? (data.address.district_rate).toFixed(2) : (0.00).toFixed(2)}
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
                {data.items.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell component="th" scope="row">
                      {row.product.name}
                    </TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right" className={classes.precoStyle}>
                      R$ {(row.product.price).toFixed(2)}
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
            Valor total: R$ {(data.total).toFixed(2)}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
