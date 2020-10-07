import React from "react";
import { BrowserRouter } from "react-router-dom";

import RotaGeral from "./geral.routes";
import RotaMcDonuts from "../mcdonutstere/routes/index";
import { AuthProvider } from "../mcdonutstere/contexts/auth";
import { CartProvider } from "../mcdonutstere/contexts/cart";

function Routes() {
  return (
    <BrowserRouter>
      <RotaGeral />
      <AuthProvider>
        <CartProvider>
          <RotaMcDonuts />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default Routes;
