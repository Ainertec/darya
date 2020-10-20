import React, { createContext, useContext, useState } from "react";

const CarrinhoContext = createContext({});

export const CarrinhoProvider = ({ children }) => {
    const [open, setOpen] = useState(false);

    return (
        <CarrinhoContext.Provider
            value={{
                setOpen,
                open,
            }}
        >
            {children}
        </CarrinhoContext.Provider>
    );
};
export function useCarrinho() {
    const context = useContext(CarrinhoContext);
    return context;
}
