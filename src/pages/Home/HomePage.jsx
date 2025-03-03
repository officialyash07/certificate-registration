import classes from "./HomePage.module.css";

import Hero from "../../components/Home/Hero";
import Features from "../../components/Home/Features";

const HomePage = () => {
    return (
        <main className={classes.homeContainer}>
            <Hero />
            <Features />
        </main>
    );
};

export default HomePage;
