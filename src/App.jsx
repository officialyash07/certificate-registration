import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Layout } from "./components/Layout/Layout";
import HomePage from "./pages/Home/HomePage";
import AboutPage from "./pages/About/AboutPage";
import ContactPage from "./pages/Contact/ContactPage";
import AuthPage from "./pages/Auth/AuthPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";

import awsConfig from "./amplify-auth/aws-exports";

import { Amplify } from "aws-amplify";

import AuthProvider from "./context/AuthProvider";

// import { signOut } from "aws-amplify/auth";

// import { useEffect } from "react";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "about", element: <AboutPage /> },
            { path: "contact", element: <ContactPage /> },
            { path: "auth", element: <AuthPage /> },
            { path: "dashboard", element: <DashboardPage /> },
        ],
    },
]);

Amplify.configure(awsConfig);

// const autoLogoutTime = 30 * 60 * 1000;

function App() {
    // Automatically sign out after inactivity using AWS Amplify's signOut method
    // useEffect(() => {
    //     let timeout;

    //     const resetTimer = () => {
    //         clearTimeout(timeout);
    //         timeout = setTimeout(async () => {
    //             try {
    //                 await signOut();
    //                 alert(
    //                     "Session expired due to inactivity. Please login again."
    //                 );
    //                 window.location.href = "/auth?mode=login";
    //             } catch (error) {
    //                 alert("Failed to sign out", error.message);
    //             }
    //         }, autoLogoutTime);
    //     };

    //     window.addEventListener("mousemove", resetTimer);
    //     window.addEventListener("keydown", resetTimer);

    //     resetTimer();

    //     return () => {
    //         window.removeEventListener("mousemove", resetTimer);
    //         window.removeEventListener("keydown", resetTimer);
    //         clearTimeout(timeout);
    //     };
    // }, []);

    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
}

export default App;
