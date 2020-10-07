import React from 'react'
import LoginRoutes from './mcdonuts.login.routes'
import AppRoutes from './mcdonuts.routes'

import { useAuth } from '../contexts/auth'


const Routes = () => {

    const { loading, signed } = useAuth();

    // if (loading) {
    //   return <AppLoading />;
    // }

    return signed ? <AppRoutes /> : <LoginRoutes />;
};

export default Routes;