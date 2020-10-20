import React, { createContext, useContext, useState } from "react";

const AlertContext = createContext({});

export const AlertProvider = ({ children }) => {
    const [abrir, setAbrir] = useState(false);
    const [msg, setMsg] = useState("Testando");

    return (
        <AlertContext.Provider
            value={{
                abrir,
                setAbrir,
                msg,
                setMsg,
            }}
        >
            {children}
        </AlertContext.Provider>
    );
};
export function useAlert() {
    const context = useContext(AlertContext);
    return context;
}
