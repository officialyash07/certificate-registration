import classes from "./Button.module.css";

const Button = ({ className, children, type }) => {
    return (
        <button className={`${classes.button} ${className}`} type={type}>
            {children}
        </button>
    );
};

export default Button;
