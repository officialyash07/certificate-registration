import classes from "./DashboardPage.module.css";

import { useContext, useState, useEffect, useCallback, useRef } from "react";
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
import Button from "../../ui/Button";
import Certificate from "../../components/Dashboard/Certificate";

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
};

const DashboardPage = () => {
    const { userData } = useContext(AuthContext);
    const employeeId = userData?.userId;
    const [isLoading, setIsLoading] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [employeeName, setEmployeeName] = useState("");
    const [certifications, setCertifications] = useState([]);
    const [error, setError] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const certIdRef = useRef();
    const cspRef = useRef();
    const certLevelRef = useRef();
    const certNameRef = useRef();
    const certDateRef = useRef();
    const certExpRef = useRef();
    const validityRef = useRef();

    useEffect(() => {
        const initialize = async () => {
            await fetchName();
            await fetchSession();
        };
        initialize();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
            const idToken = session.tokens.idToken.toString();
            await initializeDynamoDB(idToken);
            // setIsLoading(false);
            fetchCertification();
        } catch (error) {
            console.error("Error fetching auth session: ", error);
        }
    };

    const fetchCertification = useCallback(async () => {
        if (!docClient || !employeeId) {
            console.log("doc client not initialised.");
            return;
        }

        try {
            const command = new QueryCommand({
                TableName: table,
                KeyConditionExpression: "employeeId=:employeeId",
                ExpressionAttributeValues: {
                    ":employeeId": employeeId,
                },
            });

            const { Items } = await docClient.send(command);
            setCertifications(Items);
        } catch (error) {
            console.error("Error fetching certifications: ", error);
        }
    }, [employeeId]);

    const handleAddCertificate = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        if (
            certIdRef.current.value.trim() === "" ||
            certNameRef.current.value.trim() === "" ||
            certDateRef.current.value.trim() === "" ||
            certExpRef.current.value.trim() === "" ||
            validityRef.current.value.trim() === ""
        ) {
            setIsLoading(false);
            setError("All Fields are required.");
            return;
        }
        if (validityRef.current.value < 0) {
            setIsLoading(false);
            setError("Validity must be a positive number.");
            return;
        }
        if (cspRef.current.value === "default") {
            setIsLoading(false);
            setError("CSP must be selected.");
            return;
        }

        const newCertificate = {
            employeeName,
            employeeId,
            certificateId: certIdRef.current.value,
            csp: cspRef.current.value,
            certificateLevel: certLevelRef.current.value,
            certificateName: certNameRef.current.value,
            dateOfCertificate: certDateRef.current.value,
            dateOfExpiry: certExpRef.current.value,
            validity: parseInt(validityRef.current.value),
        };

        try {
            const command = new PutCommand({
                TableName: table,
                Item: newCertificate,
            });
            await docClient.send(command);
            console.log("certificate addedd successfully");
            setCertifications((prevCerts) => [...prevCerts, newCertificate]);
            setIsLoading(false);
            setIsSuccess(true);
            handleCancelForm();
        } catch (error) {
            console.log("Error adding certificates.", error);
            setError("Failed to add certificate. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelForm = () => {
        setIsFormVisible(false);
        setError("");
        certIdRef.current.value = "";
        certNameRef.current.value = "";
        certDateRef.current.value = "";
        certExpRef.current.value = "";
        validityRef.current.value = "";
        cspRef.current.value = "default";
        validityRef.current.value = "";
    };

    return (
        <main className={classes.dashboardContainer}>
            <div className={classes.background}></div>
            {employeeName ? (
                <h1>
                    Welcome, <span>{employeeName}</span>
                </h1>
            ) : (
                <ClipLoader color="#ffffff" size={13} />
            )}
            <h2>Your Certifications</h2>
            {certifications.length === 0 && (
                <p>No certifications yet. Please register certificate.</p>
            )}
            {certifications.length > 0 && (
                <div className={classes.certificate}>
                    <table>
                        <thead>
                            <tr>
                                <th>Certificate ID</th>
                                <th>CSP</th>
                                <th>Certificate Level</th>
                                <th>Certificate Name</th>
                                <th>Date of Certificate</th>
                                <th>Date of Expiry</th>
                                <th>Validity (in years)</th>
                            </tr>
                        </thead>
                        {certifications.map((certificate) => (
                            <Certificate
                                key={certificate.certificateId}
                                {...certificate}
                            />
                        ))}
                    </table>
                </div>
            )}
            <button
                className={classes.addCertBtn}
                type="button"
                onClick={() => {
                    setIsFormVisible((prevState) => !prevState);
                }}
            >
                +
            </button>
            {!isSuccess ? (
                isFormVisible && (
                    <form
                        className={classes.form}
                        onSubmit={handleAddCertificate}
                    >
                        <p className={classes.inputGroup}>
                            <label htmlFor="certId">
                                certificate id <span>*</span>
                            </label>
                            <input
                                id="certId"
                                type="text"
                                placeholder="abcdefg1234567"
                                ref={certIdRef}
                                required
                            />
                        </p>
                        <p className={classes.inputGroup}>
                            <label htmlFor="csp">
                                cloud service provider <span>*</span>
                            </label>
                            <select ref={cspRef} id="csp" required>
                                <option value="default">Pick a provider</option>
                                <option value="AWS">AWS</option>
                                <option value="Azure">Azure</option>
                                <option value="GCP">GCP</option>
                            </select>
                        </p>
                        <p className={classes.inputGroup}>
                            <label htmlFor="certLevel">
                                certificate level <span>*</span>
                            </label>
                            <input
                                id="certLevel"
                                type="text"
                                placeholder="Beginner / Associate / Professional / Expert"
                                ref={certLevelRef}
                                required
                            />
                        </p>
                        <p className={classes.inputGroup}>
                            <label htmlFor="certName">
                                certificate name <span>*</span>
                            </label>
                            <input
                                id="certName"
                                type="text"
                                placeholder="eg . AWS Developers Associate"
                                ref={certNameRef}
                                required
                            />
                        </p>
                        <p className={classes.inputGroup}>
                            <label htmlFor="dateOfCertificate">
                                date of certificate <span>*</span>
                            </label>
                            <input
                                id="dateOfCertificate"
                                type="date"
                                ref={certDateRef}
                                required
                            />
                        </p>
                        <p className={classes.inputGroup}>
                            <label htmlFor="dateOfExpiry">
                                date of expiry <span>*</span>
                            </label>
                            <input
                                id="dateOfExpiry"
                                type="date"
                                ref={certExpRef}
                                required
                            />
                        </p>
                        <p className={classes.inputGroup}>
                            <label htmlFor="validity">
                                validity <span>*</span>
                            </label>
                            <input
                                id="validity"
                                type="number"
                                ref={validityRef}
                                placeholder="Validity (in years)"
                                required
                            />
                        </p>
                        <p className={classes.cta}>
                            <button
                                type="button"
                                className={classes.cancelBtn}
                                onClick={handleCancelForm}
                            >
                                cancel
                            </button>
                            <Button type="submit" className={classes.submitBtn}>
                                {isLoading ? (
                                    <ClipLoader color="#ffffff" size={13} />
                                ) : (
                                    "submit"
                                )}
                            </Button>
                        </p>
                        {error && <p className={classes.error}>{error}</p>}
                    </form>
                )
            ) : (
                <div className={classes.success}>
                    <h2>Certificate added successfully.</h2>
                    <Button
                        onClick={() => {
                            setIsSuccess(false);
                        }}
                    >
                        Okay
                    </Button>
                </div>
            )}
        </main>
    );
};

export default DashboardPage;
