import classes from "./Hero.module.css";

import { Link } from "react-router";

import heroImg from "../../assets/hero-image.png";

const Hero = () => {
    return (
        <section className={classes.hero}>
            <div className={classes.heroContent}>
                <h1>Effortlessley Manage Your Certifications</h1>
                <h3>
                    Securely store and organize your certifications for easy
                    access anytime, anywhere
                </h3>
                <div className={classes.cta}>
                    <Link to="/auth?mode=signup">get started</Link>
                </div>
            </div>
            <div className={classes.heroImg}>
                <img src={heroImg} alt="A hero Image of a secure vault." />
            </div>
        </section>
    );
};

export default Hero;
