import classes from "./Signup.module.css";

import openEyeIcon from "../../assets/icons/eye-open.svg";
import closeEyeIcon from "../../assets/icons/eye-close.svg";

import Button from "../../ui/Button";

import { Link } from "react-router";

import { useState, useRef } from "react";

import { inputIsInvalid } from "../../utils/input-validator";

const Signup = () => {
    const [isVisible, setIsVisible] = useState({
        password: false,
        confirmPassword: false,
    });
    const [step, setStep] = useState("signup");
    const [errors, setErrors] = useState({});

    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const codeRef = useRef();

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

        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        console.log(email, password, confirmPassword);

        // Validation Logic
        const validateForm = () => {
            const newErrors = {};

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
    };

    return (
        <div className={classes.formContainer}>
            <form className={classes.signupForm} onSubmit={handleSignUp}>
                <h1>Sign up</h1>
                <div>
                    <label htmlFor="email">
                        Email Address <span>*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="abc@example.com"
                        ref={emailRef}
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
                        ref={passwordRef}
                        required
                    />
                    <button
                        type="button"
                        className={classes.eye}
                        onClick={handleTogglePassword}
                    >
                        <img
                            src={
                                isVisible.password ? openEyeIcon : closeEyeIcon
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
                        type={isVisible.confirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        placeholder="********"
                        ref={confirmPasswordRef}
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
                <Button type="submit" className={classes.signupBtn}>
                    Create Account
                </Button>
                <p className={classes.existAccount}>
                    Already have an account?{" "}
                    <Link to="/auth?mode=login">Log in</Link>
                </p>
            </form>

            {/* <form className={classes.verificationForm}>
                <h1>Email Verification</h1>
                <p>
                    We've sent a verification code to your mail
                    (example@gmail.com). Please check your inbox (and spam
                    folder) and enter the code to proceed.
                </p>
                <div>
                    <input
                        type="number"
                        id="confirmationCode"
                        placeholder="e.g. 123456"
                        required
                    />
                </div>
                <Button className={classes.resendBtn} type="button">
                    resend
                </Button>
                <Button className={classes.confirmBtn} type="submit">
                    confirm
                </Button>
            </form> */}
        </div>
    );
};

export default Signup;
