import React from "react";
import {
  makeStyles,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Container,
  TextField,
} from "@material-ui/core/";
import { useCart } from "../../contexts/cart";
import { useAuth } from "../../contexts/auth";


const useStyles = makeStyles((theme) => ({
  root: {
    margin: 10,
    padding: 10,
  },
  styleObservacao: {
    marginTop: 15,
  },
  labelStyle: {
    marginTop: 10,
  },
}));


export default function Endereco() {
  const classes = useStyles();
  const { payment, setAddressId, setPayment, addressId, setNote, note } = useCart();
  const { user } = useAuth();

  const selecionarEndereco = (event) => {
    setAddressId(event.target.value);
    console.log(event.target.value);
  };

  const selecionarForPagamento = (event) => {
    setPayment(event.target.value);
  };

  return (
    <Container>
      <FormControl component="fieldset" className={classes.root}>
        <FormLabel component="legend" className={classes.labelStyle}>Endereço de entrega</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={addressId}
          onChange={selecionarEndereco}
        >
          {user.address.map((address) => (
            <FormControlLabel
              value={address._id}
              control={<Radio />}
              label={`Endereço: ${address.district.name}, Bairro ${address.street} - Taxa: ${(address.district.rate).toFixed(2)}`}
            />
          ))}
          <FormControlLabel
            value="0"
            control={<Radio />}
            label="Retirada no local"
          />
        </RadioGroup>
      </FormControl>
      <FormControl component="fieldset" className={classes.root}>
        <FormLabel component="legend">Forma de pagamento</FormLabel>
        <RadioGroup
          aria-label="gender2"
          name="gender2"
          value={payment}
          onChange={selecionarForPagamento}
        >
          <FormControlLabel
            value="Dinheiro com troco"
            control={<Radio />}
            label="Dinheiro com troco"
          />
          <FormControlLabel
            value="Dinheiro sem troco"
            control={<Radio />}
            label="Dinheiro sem troco"
          />
          <FormControlLabel
            value="Cartão de crédito"
            control={<Radio />}
            label="Cartão de crédito"
          />
          <FormControlLabel
            value="Cartão de débito"
            control={<Radio />}
            label="Cartão de débito"
          />
          <FormControlLabel
            value="Transferência Bradesco"
            control={<Radio />}
            label="Transferência Bradesco"
          />
          <FormControlLabel
            value="Transferência Itaú"
            control={<Radio />}
            label="Transferência Itaú"
          />
        </RadioGroup>
      </FormControl>
      <FormControl component="fieldset" className={classes.root}>
        <FormLabel component="legend">Observação</FormLabel>
        <TextField
          label="Observação"
          multiline
          rows={6}
          variant="outlined"
          onChange={event => setNote(event.target.value)} value={note}
          className={classes.styleObservacao}
        />
      </FormControl>
    </Container>
  );
}
