import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomeMcDonuts from "../pages/home/index";
import CadastroMcDonuts from "../pages/cliente/index";
import LoginMcDonuts from "../pages/login/index";

function rotas() {
    return (
        <Switch>
            <Route path="/mcdonuts" exact component={HomeMcDonuts} />
            <Route path="/mcdonuts/cadastrar" exact component={CadastroMcDonuts} />
            <Route path="/mcdonuts/login" exact component={LoginMcDonuts} />
        </Switch>
    )
}

export default rotas;