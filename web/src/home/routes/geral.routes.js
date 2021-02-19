import React from 'react';
import { Switch, Route } from 'react-router-dom';

import App from "../App";

function rotas() {
    return (
        <Switch>
            <Route path="/" exact component={App} />
        </Switch>
    )
}

export default rotas;