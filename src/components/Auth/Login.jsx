import classes from "./Login.module.css";

import { useState } from "react";

import { Link } from "react-router";

import userIcon from "../../assets/icons/user.svg";
import passwordIcon from "../../assets/icons/password.svg";
import openEyeIcon from "../../assets/icons/eye-open.svg";
import closeEyeIcon from "../../assets/icons/eye-close.svg";

import Button from "../../ui/Button";

const Login = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleTogglePassword = () => {
        setIsPasswordVisible((prevState) => !prevState);
    };

    return (
        <form className={classes.loginForm}>
            <h1>Log in</h1>
            <div>
                <img src={userIcon} alt="User Icon" />
                <input
                    type="email"
                    name=""
                    id="name"
                    placeholder="Email *"
                    required
                />
            </div>
            <div>
                <img src={passwordIcon} alt="Password Icon" />
                <input
                    type={isPasswordVisible ? "text" : "password"}
                    name=""
                    id="password"
                    placeholder="Password *"
                    required
                />
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
            <Button type="submit" className={classes.loginBtn}>
                Log in
            </Button>
            <p className={classes.noAccount}>
                Don't have an account?{" "}
                <Link to="/auth?mode=signup">Sign up</Link>
            </p>
        </form>
    );
};

export default Login;
