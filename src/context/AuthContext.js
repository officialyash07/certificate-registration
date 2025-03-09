import { createContext } from "react";

export const AuthContext = createContext({
    isAuthenticated: null,
    setIsAuthenticated: () => {},
    logOut: () => {},
});

export default AuthContext;
