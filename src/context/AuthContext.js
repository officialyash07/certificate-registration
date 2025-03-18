import { createContext } from "react";

export const AuthContext = createContext({
    userData: null,
    setUserData: () => {},
    isAuthenticated: null,
    setIsAuthenticated: () => {},
    logOut: () => {},
});

export default AuthContext;
