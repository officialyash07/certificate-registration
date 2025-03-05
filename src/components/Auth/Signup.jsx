import classes from "./Signup.module.css";

import { useState } from "react";

import openEyeIcon from "../../assets/icons/eye-open.svg";
import closeEyeIcon from "../../assets/icons/eye-close.svg";

import Button from "../../ui/Button";

import { Link } from "react-router";

const Signup = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
        useState(false);

    const handleTogglePassword = () => {
        setIsPasswordVisible((prevState) => !prevState);
    };

    const handleToggleConfirmPassword = () => {
        setIsConfirmPasswordVisible((prevState) => !prevState);
    };

    return (
        <form className={classes.signupForm}>
            <h1>Sign up</h1>
            <div>
                <label htmlFor="email">Email Address</label>
                <input
                    type="email"
                    name=""
                    id="email"
                    placeholder="abc@example.com"
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    type={isPasswordVisible ? "text" : "password"}
                    name=""
                    id="password"
                    placeholder="********"
                    required
                />
                <button
                    type="button"
                    className={classes.eye}
                    onClick={handleTogglePassword}
                >
                    <img
                        src={isPasswordVisible ? openEyeIcon : closeEyeIcon}
                        alt="eye icon"
                    />
                </button>
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    name=""
                    id="confirmPassword"
                    placeholder="********"
                    required
                />
                <button
                    type="button"
                    className={classes.eye}
                    onClick={handleToggleConfirmPassword}
                >
                    <img
                        src={
                            isConfirmPasswordVisible
                                ? openEyeIcon
                                : closeEyeIcon
                        }
                        alt="eye icon"
                    />
                </button>
            </div>
            <Button type="submit" className={classes.signupBtn}>
                Create Account
            </Button>
            <p className={classes.existAccount}>
                Already have an account?{" "}
                <Link to="/auth?mode=login">Log in</Link>
            </p>
        </form>
    );
};

export default Signup;
