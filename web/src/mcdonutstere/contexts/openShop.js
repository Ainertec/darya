import React, { createContext, useContext, useState } from "react";

const lojaOpenContext = createContext({});

export const LojaOpenProvider = ({ children }) => {
    const [lojaOpen, setLojaOpen] = useState(false);

    return (
        <lojaOpenContext.Provider
            value={{
                lojaOpen,
                setLojaOpen,
            }}
        >
            {children}
        </lojaOpenContext.Provider>
    );
};
export function useLojaOpen() {
    const context = useContext(lojaOpenContext);
    return context;
}