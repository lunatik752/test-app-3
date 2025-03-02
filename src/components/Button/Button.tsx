import React, { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    buttonText: string;
};

const Button: React.FC<ButtonProps> = ({buttonText, ...props}) => {
    return (
        <button className={styles.button} {...props}>
            { buttonText }
        </button>
    );
};

export default Button;