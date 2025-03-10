import classes from "./Signup.module.css";

import openEyeIcon from "../../assets/icons/eye-open.svg";
import closeEyeIcon from "../../assets/icons/eye-close.svg";

import Button from "../../ui/Button";

import { Link, useNavigate } from "react-router";

import { useState } from "react";

import { inputIsInvalid } from "../../utils/input-validator";
import { maskEmail } from "../../utils/mask-email";

import {
    signUp as amplifySignUp,
    confirmSignUp as amplifyConfirmSignUp,
    resendSignUpCode,
} from "aws-amplify/auth";

import { ClipLoader } from "react-spinners";

const Signup = () => {
    const [isVisible, setIsVisible] = useState({
        password: false,
        confirmPassword: false,
    });
    const [step, setStep] = useState("signup");
    const [errors, setErrors] = useState({});
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [code, setCode] = useState("");
    const [uiError, setUiError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [maskedEmail, setMaskedEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleTogglePassword = () => {
        setIsVisible((prevState) => ({
            ...prevState,
            password: !prevState.password,
        }));
    };

    const handleToggleConfirmPassword = () => {
        setIsVisible((prevState) => ({
            ...prevState,
            confirmPassword: !prevState.confirmPassword,
        }));
    };

    const handleSignUp = async (event) => {
        event.preventDefault();

        // Validation Logic
        const validateForm = () => {
            const newErrors = {};

            if (inputIsInvalid(fullName)) {
                newErrors.fullName = "Please enter your full name.";
            }

            if (inputIsInvalid(email) || !email.includes("@")) {
                newErrors.email = "Please enter a valid email address.";
            }

            if (inputIsInvalid(password) || password.length < 8) {
                newErrors.password = "Please enter a valid password.";
            }

            if (password !== confirmPassword) {
                newErrors.confirmPassword = "Passwords do not match.";
            }
            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        };

        if (!validateForm()) return;

        setIsLoading(true);

        const emailMask = maskEmail(email);
        setMaskedEmail(emailMask);

        try {
            await amplifySignUp({
                username: email,
                password,
                attributes: {
                    email,
                },
                options: {
                    userAttributes: {
                        "custom:fullName": fullName,
                    },
                },
            });

            setStep("confirm");
        } catch (error) {
            setUiError(true);
            setErrorMessage(error.message);
            console.error("Error signing up user: ", error.message);
        } finally {
            setIsLoading(false);
        }

        // Clear form inputs
        setErrors({});
    };

    const handleConfirmSignUp = async (event) => {
        event.preventDefault();

        // Validation Logic
        const validateForm = () => {
            const newErrors = {};

            if (inputIsInvalid(code) || code.length !== 6) {
                newErrors.code = "Please enter a valid confirmation code.";
            }
            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        };

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            await amplifyConfirmSignUp({
                username: email,
                confirmationCode: code,
            });
            alert("Signup successful! You can now log in.");
            navigate("/auth?mode=login");
        } catch (error) {
            setUiError(true);
            setErrorMessage(error.message);
            console.error("Error signing up user: ", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendCode = async () => {
        setIsLoading(true);
        try {
            await resendSignUpCode({ username: email });
            alert("Verification code has been resent.");
        } catch (error) {
            alert("Error sending verfication code: ", error.message);
            console.error("Error resending verification code: ", error.message);
        }
    };

    return (
        <div className={classes.formContainer}>
            {step === "signup" && (
                <form className={classes.signupForm} onSubmit={handleSignUp}>
                    <h1>Sign up</h1>
                    <div>
                        <label htmlFor="fullName">
                            Full Name <span>*</span>
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            placeholder="John Wick"
                            value={fullName}
                            onChange={(event) =>
                                setFullName(event.target.value)
                            }
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email">
                            Email Address <span>*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="abc@example.com"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                        {errors.email && (
                            <p className={classes.error}>{errors.email}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="password">
                            Password <span>*</span>
                        </label>
                        <input
                            type={isVisible.password ? "text" : "password"}
                            id="password"
                            placeholder="********"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            required
                        />
                        <button
                            type="button"
                            className={classes.eye}
                            onClick={handleTogglePassword}
                        >
                            <img
                                src={
                                    isVisible.password
                                        ? openEyeIcon
                                        : closeEyeIcon
                                }
                                alt="eye icon"
                            />
                        </button>
                        {errors.password && (
                            <p className={classes.error}>{errors.password}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">
                            Confirm Password <span>*</span>
                        </label>
                        <input
                            type={
                                isVisible.confirmPassword ? "text" : "password"
                            }
                            id="confirmPassword"
                            placeholder="********"
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(event.target.value)
                            }
                            required
                        />
                        <button
                            type="button"
                            className={classes.eye}
                            onClick={handleToggleConfirmPassword}
                        >
                            <img
                                src={
                                    isVisible.confirmPassword
                                        ? openEyeIcon
                                        : closeEyeIcon
                                }
                                alt="eye icon"
                            />
                        </button>
                        {errors.confirmPassword && (
                            <p className={classes.error}>
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>
                    <div className={classes.passConstraint}>
                        <h2>Password requirements</h2>
                        <p>Contains at least 1 number</p>
                        <p>Contains at least 1 special character</p>
                        <p>Contains at least 1 uppercase letter</p>
                        <p>Minimum 8 characters</p>
                    </div>
                    <Button
                        type="submit"
                        className={classes.signupBtn}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ClipLoader color="#ffffff" size={13} />
                        ) : (
                            "Create Account"
                        )}
                    </Button>
                    <p className={classes.existAccount}>
                        Already have an account?{" "}
                        <Link to="/auth?mode=login">Log in</Link>
                    </p>
                    {uiError && (
                        <p className={classes.uiError}>{errorMessage}</p>
                    )}
                </form>
            )}
            {step === "confirm" && (
                <form
                    className={classes.verificationForm}
                    onSubmit={handleConfirmSignUp}
                >
                    <h1>Email Verification</h1>
                    <p>
                        We've sent a verification code to your mail{` `}
                        {maskedEmail}. Please check your inbox (and spam folder)
                        and enter the code to proceed.
                    </p>
                    <div>
                        <input
                            type="number"
                            id="confirmationCode"
                            placeholder="e.g. 123456"
                            value={code}
                            onChange={(event) => setCode(event.target.value)}
                            required
                        />
                        {errors.code && (
                            <p className={classes.error}>{errors.code}</p>
                        )}
                    </div>
                    <Button
                        className={classes.resendBtn}
                        type="button"
                        onClick={handleResendCode}
                    >
                        resend
                    </Button>
                    <Button className={classes.confirmBtn} type="submit">
                        {isLoading ? (
                            <ClipLoader color="#ffffff" size={13} />
                        ) : (
                            "confirm"
                        )}
                    </Button>
                </form>
            )}
        </div>
    );
};

export default Signup;
