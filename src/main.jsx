import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);

/*
VITE_REGION=ap-south-1
VITE_USER_POOL_ID=ap-south-1_4CwENZqvq
VITE_WEB_CLIENT_ID=4ul1jpu3q9bg8oqvr6cma312rn
VITE_IDENTITY_POOL_ID=ap-south-1:98650bad-f0b4-4a19-b5f6-96c71fc40a98
VITE_DYNAMODB_TABLE=CertificationTable

const REGION = import.meta.env.VITE_REGION;
const IDENTITY_POOL_ID = import.meta.env.VITE_IDENTITY_POOL_ID;
const USER_POOL_ID = import.meta.env.VITE_USER_POOL_ID;
const TABLE_NAME = import.meta.env.VITE_DYNAMODB_TABLE;
*/
