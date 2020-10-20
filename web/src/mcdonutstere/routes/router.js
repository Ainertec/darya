import React from "react";

import RotaMcDonuts from "./index";
import { AuthProvider } from "../contexts/auth";
import { CartProvider } from "../contexts/cart";
import { AlertProvider } from "../contexts/alertN";
import { UserProvider } from "../contexts/user";

export default function RotasMcDonuts() {
    return (
        <AuthProvider>
            <CartProvider>
                <AlertProvider>
                    <UserProvider>
                        <RotaMcDonuts />
                    </UserProvider>
                </AlertProvider>
            </CartProvider>
        </AuthProvider>
    );
}