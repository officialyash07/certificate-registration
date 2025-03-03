import classes from "./Header.module.css";

import logoImg from "../../assets/logo.png";

import { Link, NavLink } from "react-router";

const Header = () => {
    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                <Link to="/">
                    <img src={logoImg} alt="Logo of Certificado." />
                </Link>
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about">about</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact">contact</NavLink>
                    </li>
                </ul>
            </nav>
            <div className={classes.cta}>
                <Link to="/login">LogIn</Link>
            </div>
        </header>
    );
};

export default Header;
