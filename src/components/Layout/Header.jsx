import { useState } from "react";
import logoImg from "../../assets/logo.png";
import classes from "./Header.module.css";

import { Link, NavLink } from "react-router";

import menuIcon from "../../assets/icons/menu.svg";
import closeIcon from "../../assets/icons/close.svg";

import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const Header = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const { isAuthenticated, logOut } = useContext(AuthContext);

    const handleToggleMenu = () => {
        setIsNavOpen((prevState) => !prevState);
    };

    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                <Link to="/">
                    <img src={logoImg} alt="Logo of Certificado." />
                </Link>
            </div>
            <nav className={isNavOpen ? classes.show : classes.hide}>
                <ul>
                    <li>
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? classes.active : ""
                            }
                            to="/"
                            end
                        >
                            home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? classes.active : ""
                            }
                            to="/about"
                        >
                            about
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? classes.active : ""
                            }
                            to="/contact"
                        >
                            contact
                        </NavLink>
                    </li>
                    <li className={classes.conditionLink}>
                        <div className={classes.navcta}>
                            {isAuthenticated ? (
                                <button onClick={logOut}>Signout</button>
                            ) : (
                                <Link to="/auth?mode=login">LogIn</Link>
                            )}
                        </div>
                    </li>
                </ul>
            </nav>
            <div className={classes.cta}>
                {isAuthenticated ? (
                    <button onClick={logOut}>Signout</button>
                ) : (
                    <Link to="/auth?mode=login">LogIn</Link>
                )}
            </div>
            {isNavOpen && (
                <div
                    className={classes.overlay}
                    onClick={handleToggleMenu}
                ></div>
            )}

            <div className={classes.hamBtn}>
                <button type="button" onClick={handleToggleMenu}>
                    <img
                        src={isNavOpen ? closeIcon : menuIcon}
                        alt="Ham menu icon"
                    />
                </button>
            </div>
        </header>
    );
};

export default Header;
