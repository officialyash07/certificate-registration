import React, { useState } from "react";
import logoImg from "../../assets/logo.png";
import classes from "./Header.module.css";

import { Link, NavLink } from "react-router";

import menuIcon from "../../assets/icons/menu.svg";
import closeIcon from "../../assets/icons/close.svg";

const Header = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);

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
                            onClick={handleToggleMenu}
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
                            onClick={handleToggleMenu}
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
                            onClick={handleToggleMenu}
                        >
                            contact
                        </NavLink>
                    </li>
                    <li className={classes.conditionLink}>
                        <div className={classes.navcta}>
                            <Link to="/login" onClick={handleToggleMenu}>
                                LogIn
                            </Link>
                        </div>
                    </li>
                </ul>
            </nav>
            <div className={classes.cta}>
                <Link to="/login">LogIn</Link>
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
