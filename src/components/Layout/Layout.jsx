import classes from "./Layout.module.css";

import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

import backgroundImg from "../../assets/background.jpg";

export const Layout = () => {
    return (
        <div className={classes.layout}>
            <div className={classes.background}>
                <img src={backgroundImg} alt="" />
            </div>
            <Header />
            <main className={classes.main}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};
