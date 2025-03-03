import classes from "./FeatureItem.module.css";

const FeatureItem = ({ image, title, description }) => {
    return (
        <div className={classes.featureItem}>
            <div className={classes.icon}>
                <img src={image} alt="A features icon" />
            </div>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
};

export default FeatureItem;
