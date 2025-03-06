import classes from "./Signup.module.css";

// import openEyeIcon from "../../assets/icons/eye-open.svg";
import closeEyeIcon from "../../assets/icons/eye-close.svg";

import Button from "../../ui/Button";

import { Link } from "react-router";

const Signup = () => {
    const handleSignUp = async (event) => {
        event.preventDefault();
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
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">
                        Password <span>*</span>
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="********"
                        required
                    />
                    <button type="button" className={classes.eye}>
                        <img src={closeEyeIcon} alt="eye icon" />
                    </button>
                </div>
                <div>
                    <label htmlFor="confirmPassword">
                        Confirm Password <span>*</span>
                    </label>
                    <input
                        type={"password"}
                        id="confirmPassword"
                        placeholder="********"
                        required
                    />
                    <button type="button" className={classes.eye}>
                        <img src={closeEyeIcon} alt="eye icon" />
                    </button>
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

            <form className={classes.verificationForm}>
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
            </form>
        </div>
    );
};

export default Signup;
