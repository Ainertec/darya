import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import RotaGeral from "./geral.routes"
import RotaMcDonuts from "../mcdonutstere/routes/index"
import { AuthProvider } from '../mcdonutstere/contexts/auth'

function Routes() {
    return (
        <BrowserRouter>
            <RotaGeral />
            <AuthProvider>
                <RotaMcDonuts />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default Routes;