import React from "react";
import { BrowserRouter } from "react-router-dom";

import RotasHome from "./home/routes/routes";
import RotasMcDonuts from "./mcdonutstere/routes/router";

export default function Routes() {
    return (
        <BrowserRouter>

            <RotasHome />
            <RotasMcDonuts />

        </BrowserRouter>
    );
}