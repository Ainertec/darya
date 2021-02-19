import React, { createContext, useContext, useState } from "react";

const ProgressoContext = createContext({});

export const ProgressoProvider = ({ children }) => {
    const [progresso, setProgresso] = useState(false);

    return (
        <ProgressoContext.Provider
            value={{
                progresso,
                setProgresso,
            }}
        >
            {children}
        </ProgressoContext.Provider>
    );
};
export function useProgresso() {
    const context = useContext(ProgressoContext);
    return context;
}
