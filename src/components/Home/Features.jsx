import classes from "./Features.module.css";

import FeatureItem from "./FeatureItem";

import cloudLockImg from "../../assets/icons/cloud-lock.svg";
import accessImg from "../../assets/icons/access.svg";
import recordsImg from "../../assets/icons/records.svg";

import { Link } from "react-router";

import { useContext } from "react";

import AuthContext from "../../context/AuthContext";

const Features = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <section className={classes.features}>
            <FeatureItem
                image={cloudLockImg}
                title="secure storage"
                description="Keep your certifications safe with top-notch security and easy retrieval"
            />
            <FeatureItem
                image={accessImg}
                title="easy access"
                description="Access your records from any device, anytime"
            />
            <FeatureItem
                image={recordsImg}
                title="organized record keeping"
                description="Stay organized with a streamlined dashboard for all your certifications"
            />
            {!isAuthenticated && (
                <div>
                    <h3>Welcome to Certificado Registro</h3>

                    <div className={classes.cta}>
                        <Link to="/auth?mode=signup">get started</Link>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Features;
