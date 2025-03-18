import { useContext, useState, useEffect, useCallback } from "react";
import AuthContext from "../../context/AuthContext";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import {
    DynamoDBDocumentClient,
    QueryCommand,
    PutCommand,
} from "@aws-sdk/lib-dynamodb";
import { fetchUserAttributes, fetchAuthSession } from "aws-amplify/auth";
import { ClipLoader } from "react-spinners";

const region = import.meta.env.VITE_REGION;
const identityPoolId = import.meta.env.VITE_IDENTITY_POOL_ID;
const userPoolId = import.meta.env.VITE_USER_POOL_ID;
const table = import.meta.env.VITE_DYNAMODB_TABLE;

let client, docClient;

const initializeDynamoDB = async (idToken) => {
    client = new DynamoDBClient({
        region,
        credentials: fromCognitoIdentityPool({
            clientConfig: { region },
            identityPoolId,
            logins: {
                [`cognito-idp.${region}.amazonaws.com/${userPoolId}`]: idToken,
            },
        }),
    });
    docClient = DynamoDBDocumentClient.from(client);
    console.log(docClient);
};

const DashboardPage = () => {
    const { isAuthenticated, userData } = useContext(AuthContext);
    const employeeId = userData?.userId;
    const [isLoading, setIsLoading] = useState(true);
    const [employeeName, setEmployeeName] = useState("");
    const [certifications, setCertifications] = useState([]);
    const [formData, setFormData] = useState({
        certificationId: "",
        csp: "",
        certificationLevel: "",
        certificationName: "",
        dateOfCertification: "",
        expiryOfCertification: "",
        validity: "",
    });

    useEffect(() => {
        const fetchName = async () => {
            try {
                const attributes = await fetchUserAttributes();
                setEmployeeName(attributes["custom:fullName"]);
            } catch (error) {
                console.error("Error fetching user attributes: ", error);
            }
        };

        const fetchSession = async () => {
            try {
                const session = await fetchAuthSession();
                console.log(session);
                const token = session.tokens.idToken.toString();
                if (token) {
                    await initializeDynamoDB(token);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching auth session: ", error);
                setIsLoading(false);
            }
        };

        const fetchCertifications = async () => {
            if (!docClient) {
                console.error("DynamoDB client not initialized");
                return;
            }

            try {
                const command = new QueryCommand({
                    TableName: table,
                    KeyConditionExpression: "employeeId = :employeeId",
                    ExpressionAttributeValues: {
                        ":employeeId": employeeId,
                    },
                });
                const { Items } = await docClient.send(command);
                setCertifications(Items || []);
            } catch (error) {
                console.error("Error fetching certifications: ", error);
            }
        };

        fetchName();
        fetchSession();
        if (docClient && !isLoading) {
            fetchCertifications();
        }
    }, [employeeId, isLoading]);

    return (
        <div>
            {employeeName ? (
                <h1>
                    Welcome, <span>{employeeName}</span>
                </h1>
            ) : (
                <ClipLoader color="#ffffff" size={13} />
            )}
            <h2>Your Certifications</h2>
            {/* display certifications if exists, otherwise display no
            certifications */}
            {/* a button to display certificate form, initially it is hidden */}
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
