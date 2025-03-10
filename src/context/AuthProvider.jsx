import { useState, useEffect } from "react";

import { getCurrentUser, signOut } from "aws-amplify/auth";

import { ClipLoader } from "react-spinners";

import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const currentUser = await getCurrentUser();

                setIsAuthenticated(currentUser);

                // eslint-disable-next-line no-unused-vars
            } catch (error) {
                // console.error("Error fetching user:", error);
                setIsAuthenticated(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

    const logOutUser = async () => {
        try {
            await signOut();
            setIsAuthenticated(null);

            window.location.href = "/auth?mode=login";
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    if (isLoading) {
        return <ClipLoader size={100} color={"#ffffff"} />;
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                logOut: logOutUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
