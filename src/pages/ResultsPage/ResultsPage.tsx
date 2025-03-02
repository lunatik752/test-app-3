import React from "react";
import Layout from "../../components/Layout";
import styles from "./ResultsPage.module.scss";

const ResultsPage: React.FC = () => {
    return (
        <Layout title="Results" showBackLink>
            <p className={styles.description}>Order basket redesing</p>
        </Layout>
    );
};

export default ResultsPage;