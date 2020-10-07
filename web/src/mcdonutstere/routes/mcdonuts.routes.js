import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Carrinho from "../pages/carrinho/index";
import Pedido from "../pages/pedido/index";
import HomeMcDonuts from "../pages/home/index";

function rotas() {
    return (
        <Switch>
            <Route path="/mcdonuts" exact component={HomeMcDonuts} />
            <Route path="/mcdonuts/carrinho" exact component={Carrinho} />
            <Route path="/mcdonuts/pedido" exact component={Pedido} />
        </Switch>
    )
}

export default rotas;