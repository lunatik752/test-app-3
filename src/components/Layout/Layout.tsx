import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Layout.module.scss";

type LayoutProps = {
    title: string;
    showBackLink?: boolean;
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, showBackLink = false, children }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(-1);
    };
    return (
        <div className={styles.pageContainer}>
            <h1>{title}</h1>
            {children}
            {
                showBackLink &&
                <button className={styles.backButton} onClick={handleClick}>
                    <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.10419 16L0.937805 8.83362L0.104186 8L0.937805 7.16638L8.10419 0L8.93781 0.833619L1.77142 8L8.93781 15.1664L8.10419 16Z" fill="#222222" />
                    </svg>
                    Back
                </button>
            }
        </div>
    );
};

export default Layout;