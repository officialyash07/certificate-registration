import classes from "./AuthPage.module.css";

import Login from "../../components/Auth/Login";
import Signup from "../../components/Auth/Signup";

import authImg from "../../assets/auth-image.png";

import { useLocation } from "react-router";

const AuthPage = () => {
    const location = useLocation();
    const querParam = new URLSearchParams(location.search);
    const mode = querParam.get("mode");

    return (
        <main className={classes.authContainer}>
            <div className={classes.background}></div>
            <div className={classes.auth}>
                <div className={classes.authImg}>
                    <img src={authImg} alt="image" />
                </div>
                <div className={classes.form}>
                    {mode === "login" ? <Login /> : <Signup />}
                </div>
            </div>
        </main>
    );
};

export default AuthPage;
