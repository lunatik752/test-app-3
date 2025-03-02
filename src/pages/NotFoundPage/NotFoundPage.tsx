import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";

import styles from "./NotFoundPage.module.scss";

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate("/");
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>404</h1>
            <p className={styles.message}>Page Not Found</p>
            <Button buttonText={"Back to Home Page"} onClick={handleBackToHome}/>
        </div>
    );
};

export default NotFoundPage;