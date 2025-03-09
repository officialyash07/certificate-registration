import { useEffect, useState } from "react";
import { getCurrentUser } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            try {
                const currentUser = await getCurrentUser();
                setUser(currentUser);
            } catch (error) {
                console.log(
                    "No logged-in user, redirecting to login...",
                    error
                );
                navigate("/auth?mode=login");
            } finally {
                setLoading(false);
            }
        };
        checkUser();
    }, [navigate]);

    if (loading) return <p>Loading...</p>;
    if (!user) return null;

    return (
        <div>
            <h1>Welcome to the Dashboard</h1>
            <p>
                <strong>Username:</strong> {user.username}
            </p>
            <p>
                <strong>Email:</strong> {user.signInDetails?.loginId || "N/A"}
            </p>
        </div>
    );
};

export default DashboardPage;
