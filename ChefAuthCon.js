import React, { createContext, useState } from 'react';

export const ChefAuthCon = createContext();

export const ChefAuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (username, password) => {
        if (username === 'Christoffel@2004' && password === 'Chris1FabFood#') {
            setIsAuthenticated(true);
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    return (
        <ChefAuthCon.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </ChefAuthCon.Provider>
    );
};
