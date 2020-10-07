import React from 'react';
import {
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Container,
} from '@material-ui/core/';

export default function Endereco() {
    const [endereco, setEndereco] = React.useState('other1');
    const [forPagamento, setForPagamento] = React.useState('other4');

    const selecionarEndereco = (event) => {
        setEndereco(event.target.value);
    };

    const selecionarForPagamento = (event) => {
        setForPagamento(event.target.value);
    };

    return (
        <Container>
            <FormControl component="fieldset">
                <FormLabel component="legend">Endereço de entrega</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" value={endereco} onChange={selecionarEndereco}>
                    <FormControlLabel value="other1" control={<Radio />} label="Rua Boa Esperança - Lumiar - Nova Friburgo" />
                    <FormControlLabel value="other2" control={<Radio />} label="Estrada Mury as Lumiar KM 17 - Lumiar - Nova Friburgo" />
                    <FormControlLabel value="other3" control={<Radio />} label="Retirar no estabelecimento" />
                </RadioGroup>
            </FormControl>
            <FormControl component="fieldset">
                <FormLabel component="legend">Forma de pagamento</FormLabel>
                <RadioGroup aria-label="gender2" name="gender2" value={forPagamento} onChange={selecionarForPagamento}>
                    <FormControlLabel value="other4" control={<Radio />} label="Dinheiro com troco" />
                    <FormControlLabel value="other5" control={<Radio />} label="Dinheiro sem troco" />
                    <FormControlLabel value="other6" control={<Radio />} label="Cartão de crédito" />
                    <FormControlLabel value="other7" control={<Radio />} label="Cartão de débito" />
                    <FormControlLabel value="other8" control={<Radio />} label="Transferencia Bradesco" />
                    <FormControlLabel value="other9" control={<Radio />} label="Transferencia Itau" />
                </RadioGroup>
            </FormControl>
        </Container>
    );
}