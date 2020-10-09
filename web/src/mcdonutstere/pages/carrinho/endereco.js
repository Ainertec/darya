import React from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Container,
} from "@material-ui/core/";
import { useCart } from "../../contexts/cart";
import { useAuth } from "../../contexts/auth";

export default function Endereco() {
  const { payment, setAddressId, setPayment, addressId } = useCart();
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
      <FormControl component="fieldset">
        <FormLabel component="legend">Endereço de entrega</FormLabel>
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
              label={`${address.district.name} - ${address.street}`}
            />
          ))}
          <FormControlLabel
            value="0"
            control={<Radio />}
            label="Retirada no local"
          />
        </RadioGroup>
      </FormControl>
      <FormControl component="fieldset">
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
            value="other5"
            control={<Radio />}
            label="Dinheiro sem troco"
          />
          <FormControlLabel
            value="other6"
            control={<Radio />}
            label="Cartão de crédito"
          />
          <FormControlLabel
            value="other7"
            control={<Radio />}
            label="Cartão de débito"
          />
          <FormControlLabel
            value="other8"
            control={<Radio />}
            label="Transferência Bradesco"
          />
          <FormControlLabel
            value="other9"
            control={<Radio />}
            label="Transferência Itau"
          />
        </RadioGroup>
      </FormControl>
    </Container>
  );
}
