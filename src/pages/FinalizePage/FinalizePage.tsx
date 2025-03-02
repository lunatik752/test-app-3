import React from "react";
import Layout from "../../components/Layout";
import styles from "./FinalizePage.module.scss";

const FinalizePage: React.FC = () => {
    return (
        <Layout title="Finalize" showBackLink>
            <p className={styles.description}>Spring promotion</p>
        </Layout>
    );
};

export default FinalizePage;