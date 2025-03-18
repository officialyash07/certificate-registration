import { useState, useEffect } from "react";

import { getCurrentUser, signOut } from "aws-amplify/auth";

import { ClipLoader } from "react-spinners";

import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const currentUser = await getCurrentUser();
                setIsAuthenticated(true);
                setUserData(currentUser);

                // eslint-disable-next-line no-unused-vars
            } catch (error) {
                // console.error("Error fetching user:", error);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

    const logOutUser = async () => {
        try {
            await signOut();
            setIsAuthenticated(false);

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
                userData,
                setUserData,
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
