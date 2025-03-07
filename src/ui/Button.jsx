import classes from "./Button.module.css";

const Button = ({ className, children, type, onClick }) => {
    return (
        <button
            className={`${classes.button} ${className}`}
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
