import classes from "./Login.module.css";

import { useState } from "react";

import { Link } from "react-router";

import userIcon from "../../assets/icons/user.svg";
import passwordIcon from "../../assets/icons/password.svg";
import openEyeIcon from "../../assets/icons/eye-open.svg";
import closeEyeIcon from "../../assets/icons/eye-close.svg";

import Button from "../../ui/Button";
import { inputIsInvalid } from "../../utils/input-validator";

import { signIn as amplifySignIn } from "aws-amplify/auth";

import { ClipLoader } from "react-spinners";

import { useNavigate } from "react-router";

const Login = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isUiError, setIsUiError] = useState(false);

    const navigate = useNavigate();

    const handleTogglePassword = () => {
        setIsPasswordVisible((prevState) => !prevState);
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        const validateForm = () => {
            const newErrors = {};

            if (inputIsInvalid(email) || !email.includes("@")) {
                newErrors.email = "Please enter a valid email address.";
            }

            if (inputIsInvalid(password)) {
                newErrors.password = "Please enter a valid password.";
            }
            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        };

        if (!validateForm()) return;
        setIsLoading(true);

        try {
            await amplifySignIn({
                username: email,
                password,
            });
            alert("Login successful!");
            navigate("/dashboard");
        } catch (error) {
            setIsUiError(true);
            setErrorMessage(error.message);
            console.error("Error logging in user: ", error.message);
        } finally {
            setIsLoading(false);
        }

        setErrors({});
    };

    return (
        <form className={classes.loginForm} onSubmit={handleLogin}>
            <h1>Log in</h1>
            <div>
                <img src={userIcon} alt="User Icon" />
                <input
                    type="email"
                    id="name"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Email *"
                    // required
                />
                {errors.email && (
                    <p className={classes.error}>{errors.email}</p>
                )}
            </div>
            <div>
                <img src={passwordIcon} alt="Password Icon" />
                <input
                    type={isPasswordVisible ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Password *"
                    // required
                />
                {errors.password && (
                    <p className={classes.error}>{errors.password}</p>
                )}
                <button
                    type="button"
                    className={classes.eye}
                    onClick={handleTogglePassword}
                >
                    <img
                        src={isPasswordVisible ? openEyeIcon : closeEyeIcon}
                        alt="Eye icon"
                    />
                </button>
            </div>
            <p className={classes.forgotPass}>
                <Link to="/">Forgot Password?</Link>
            </p>
            <Button
                type="submit"
                className={classes.loginBtn}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ClipLoader color="#ffffff" size={13} />
                ) : (
                    "Log In"
                )}
            </Button>
            <p className={classes.noAccount}>
                Don't have an account?{" "}
                <Link to="/auth?mode=signup">Sign up</Link>
            </p>
            {isUiError && <p className={classes.uiError}>{errorMessage}</p>}
        </form>
    );
};

export default Login;
