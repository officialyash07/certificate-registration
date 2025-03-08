import classes from "./Button.module.css";

const Button = ({ className, children, type, onClick, ...props }) => {
    return (
        <button
            className={`${classes.button} ${className}`}
            type={type}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
