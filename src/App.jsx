import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Layout } from "./components/Layout/Layout";
import HomePage from "./pages/Home/HomePage";
import AboutPage from "./pages/About/AboutPage";
import ContactPage from "./pages/Contact/ContactPage";
import AuthPage from "./pages/Auth/AuthPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";

import awsConfig from "./amplify-auth/aws-exports";

import { Amplify } from "aws-amplify";

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

function App() {
    return <RouterProvider router={router} />;
}

export default App;
