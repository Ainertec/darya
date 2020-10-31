import React from "react";

import RotaMcDonuts from "./index";
import { AuthProvider } from "../contexts/auth";
import { CartProvider } from "../contexts/cart";
import { AlertProvider } from "../contexts/alertN";
import { UserProvider } from "../contexts/user";
import { ProgressoProvider } from "../contexts/prog";
import { LojaOpenProvider } from '../contexts/openShop';

export default function RotasMcDonuts() {
    return (
        <AuthProvider>
            <CartProvider>
                <AlertProvider>
                    <UserProvider>
                        <ProgressoProvider>
                            <LojaOpenProvider>
                                <RotaMcDonuts />
                            </LojaOpenProvider>
                        </ProgressoProvider>
                    </UserProvider>
                </AlertProvider>
            </CartProvider>
        </AuthProvider>
    );
}