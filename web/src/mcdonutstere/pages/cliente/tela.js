import React, { useState, useEffect } from "react";
import {
    Box,
    makeStyles,
    Grid,
    Typography,
} from "@material-ui/core/";
import AccountCircle from "@material-ui/icons/AccountCircle";

import Input from "../../components/form/input";
import SelectQuestion from "../../components/form/selectQuestion";
import SelectDistrict from "../../components/form/selectDistrict";
import Api from "../../services/api";
import { useUser } from "../../contexts/user";

const useStyles = makeStyles((theme) => ({
    textStyle: {
        textAlign: "center",
        boxShadow: "0 2px 5px 5px rgba(0, 0, 0, .3)",
        borderRadius: 20,
        marginTop: 20,
        marginBottom: 30,
        backgroundColor: "#fff",
        padding: 20,
    },
    divisorStyle: {
        backgroundColor: '#fffdeb',
        borderRadius: 20,
        boxShadow: "0 2px 5px 5px rgba(0, 0, 0, .3)",
        marginBottom: 10,
        padding: 30,
    }
}));

export default function TelaDeDadosCliente({ dado }) {
    const classes = useStyles();
    const [district, setDistrict] = useState([]);
    const {
        name,
        setName,
        username,
        setUsername,
        password,
        setPassword,
        response,
        setResponse,
        phone,
        setPhone,
        street,
        setStreet,
        addressNumber,
        setAddressNumber,
        reference,
        setReference,
    } = useUser();


    useEffect(() => {
        Api.get('districts').then(response => {
            setDistrict(response.data);
        });
    }, []);

    return (
        <Box
            justifyContent="center"
            flexWrap="wrap"
            display="flex"
            className={classes.root}
        >
            <Grid item xs={9}>
                <Grid item xs={12}>
                    <Typography
                        gutterBottom
                        variant="h6"
                        component="p"
                        className={classes.textStyle}
                    >
                        <AccountCircle /> {dado.title}
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.divisorStyle}>
                    <h3>
                        Dados de cliente
                    </h3>
                    <Input label="Nome completo" type="text" onChange={(event) => setName(event.target.value)} value={name ? name : ''} />
                    <Input label="Telefone" type="phone" onChange={(event) => setPhone(event.target.value)} value={phone ? phone : ''} />
                </Grid>
                <Grid item xs={12} className={classes.divisorStyle}>
                    <h3>
                        Endereço de entrega
                    </h3>
                    <Input label="Rua" type="text" onChange={(event) => setStreet(event.target.value)} value={street ? street : ''} />
                    <Input label="Número da casa" type="text" onChange={(event) => setAddressNumber(event.target.value)} value={addressNumber ? addressNumber : ''} />
                    <SelectDistrict dado={
                        {
                            name: "Bairro",
                            data: district,
                        }
                    }
                    />
                    <Input label="Complemento" type="text" onChange={(event) => setReference(event.target.value)} value={reference ? reference : ''} />
                </Grid>
                <Grid item xs={12} className={classes.divisorStyle}>
                    <h3>
                        Dados de acesso
                    </h3>
                    <Input label="Nome de usuário" type="text" onChange={(event) => setUsername(event.target.value)} value={username ? username : ''} />
                    <Input label="Senha" type="password" onChange={(event) => setPassword(event.target.value)} value={password ? password : ''} />
                </Grid>
                <Grid item xs={12} className={classes.divisorStyle}>
                    <h3>
                        Opção para recuperar senha
                    </h3>
                    <SelectQuestion dado={
                        {
                            name: "Selecione uma pergunta",
                        }
                    }
                    />
                    <Input label="Resposta da pergunta" type="text" onChange={(event) => setResponse(event.target.value)} value={response ? response : ''} />
                </Grid>
            </Grid>
        </Box>
    );
}