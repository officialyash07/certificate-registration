import classes from "./Footer.module.css";

import logoImg from "../../assets/logo.png";

import { Link } from "react-router";

const Footer = () => {
    return (
        <footer className={classes.footer}>
            <div className={classes.copyright}>
                &copy; Certificado Registro. All Rights Reserved.
            </div>
            <div className={classes.socialLinks}>
                <Link to="/">
                    <svg
                        fill="#000000"
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="-271 283.9 256 235.1"
                        xmlSpace="preserve"
                    >
                        <g>
                            <rect
                                x="-264.4"
                                y="359.3"
                                width="49.9"
                                height="159.7"
                            />
                            <path
                                d="M-240.5,283.9c-18.4,0-30.5,11.9-30.5,27.7c0,15.5,11.7,27.7,29.8,27.7h0.4c18.8,0,30.5-12.3,30.4-27.7
		C-210.8,295.8-222.1,283.9-240.5,283.9z"
                            />
                            <path
                                d="M-78.2,357.8c-28.6,0-46.5,15.6-49.8,26.6v-25.1h-56.1c0.7,13.3,0,159.7,0,159.7h56.1v-86.3c0-4.9-0.2-9.7,1.2-13.1
		c3.8-9.6,12.1-19.6,27-19.6c19.5,0,28.3,14.8,28.3,36.4V519h56.6v-88.8C-14.9,380.8-42.7,357.8-78.2,357.8z"
                            />
                        </g>
                    </svg>
                </Link>
                <Link to="/">
                    <svg
                        fill="#000000"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="800px"
                        height="800px"
                        viewBox="0 0 512 512"
                        xmlSpace="preserve"
                    >
                        <g id="7935ec95c421cee6d86eb22ecd12f847">
                            <path
                                d="M459.186,151.787c0.203,4.501,0.305,9.023,0.305,13.565
		c0,138.542-105.461,298.285-298.274,298.285c-59.209,0-114.322-17.357-160.716-47.104c8.212,0.973,16.546,1.47,25.012,1.47
		c49.121,0,94.318-16.759,130.209-44.884c-45.887-0.841-84.596-31.154-97.938-72.804c6.408,1.227,12.968,1.886,19.73,1.886
		c9.55,0,18.816-1.287,27.617-3.68c-47.955-9.633-84.1-52.001-84.1-102.795c0-0.446,0-0.882,0.011-1.318
		c14.133,7.847,30.294,12.562,47.488,13.109c-28.134-18.796-46.637-50.885-46.637-87.262c0-19.212,5.16-37.218,14.193-52.7
		c51.707,63.426,128.941,105.156,216.072,109.536c-1.784-7.675-2.718-15.674-2.718-23.896c0-57.891,46.941-104.832,104.832-104.832
		c30.173,0,57.404,12.734,76.525,33.102c23.887-4.694,46.313-13.423,66.569-25.438c-7.827,24.485-24.434,45.025-46.089,58.002
		c21.209-2.535,41.426-8.171,60.222-16.505C497.448,118.542,479.666,137.004,459.186,151.787z"
                            ></path>
                        </g>
                    </svg>
                </Link>
                <Link to="/">
                    <svg
                        fill="#000000"
                        height="800px"
                        width="800px"
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="-337 273 123.5 256"
                        xmlSpace="preserve"
                    >
                        <path
                            d="M-260.9,327.8c0-10.3,9.2-14,19.5-14c10.3,0,21.3,3.2,21.3,3.2l6.6-39.2c0,0-14-4.8-47.4-4.8c-20.5,0-32.4,7.8-41.1,19.3
	c-8.2,10.9-8.5,28.4-8.5,39.7v25.7H-337V396h26.5v133h49.6V396h39.3l2.9-38.3h-42.2V327.8z"
                        />
                    </svg>
                </Link>
                <div className={classes.logo}>
                    <Link to="/">
                        <img src={logoImg} alt="Logo of Certificado." />
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
