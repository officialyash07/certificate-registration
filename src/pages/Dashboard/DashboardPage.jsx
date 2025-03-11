import { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import {
    DynamoDBClient,
    PutItemCommand,
    QueryCommand,
} from "@aws-sdk/client-dynamodb";

const REGION = import.meta.env.VITE_REGION;
const IDENTITY_POOL_ID = import.meta.env.VITE_IDENTITY_POOL_ID;
const USER_POOL_ID = import.meta.env.VITE_USER_POOL_ID;
const TABLE_NAME = import.meta.env.VITE_DYNAMODB_TABLE;

// Identity Pool Initialization
const identityClient = new CognitoIdentityClient({ region: REGION });

const DashboardPage = () => {
    const { isAuthenticated } = useContext(AuthContext);

    // If not authenticated, dashboard page is not accessible
    useEffect(() => {
        if (!isAuthenticated) {
            window.location.href = "/auth?mode=login";
        }
    }, [isAuthenticated]);

    return (
        <div>
            <h1>Welcome, </h1>
            <h2>Your Certifications</h2>

            <h2>Add Certification</h2>
            <form>
                <input type="text" placeholder="Certification ID" required />
                <select>
                    <option value="AWS">AWS</option>
                    <option value="Azure">Azure</option>
                    <option value="GCP">GCP</option>
                </select>
                <input type="text" placeholder="Certification Level" />
                <input type="text" placeholder="Certification Name" required />
                <input type="date" required />
                <input type="date" />
                <input type="number" placeholder="Validity (Years)" />
                <button type="submit">Add Certification</button>
            </form>
        </div>
    );
};

export default DashboardPage;
