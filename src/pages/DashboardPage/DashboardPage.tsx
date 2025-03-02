import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import styles from "./DashboardPage.module.scss";
import search from "../../assets/icons/search.png";
import useFetchTests from "../../hooks/useFetchTests";
import Table from "../../components/Table/Table";
import Button from "../../components/Button/Button";
import { useDashboardContext } from "../../hooks/useDashboardContext";

const DashboardPage: React.FC = () => {
    const { tests, loading, error } = useFetchTests();
    const { searchTerm, setSearchTerm, filteredTests, setFilteredTests } = useDashboardContext();

    useEffect(() => {
        const filtered = tests.filter((test) =>
            test.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredTests(filtered);
    }, [searchTerm, tests, setFilteredTests]);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Layout title="Dashboard">
            <div className={styles.contentWrapper}>
                <div className={styles.searchInput}>
                    <img className={styles.searchIcon} src={search} alt="search" />
                    <input
                        type="text"
                        placeholder="What test are you looking for?"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Обновляем состояние в контексте
                    />
                    <span className={styles.inputAddedText}>
                        {filteredTests.length} tests
                    </span>
                </div>
                {!filteredTests.length ? (
                    <div className={styles.noResultsContainer}>
                        <p className={styles.noResultsText}>
                            Your search did not match any results.
                        </p>
                        <Button
                            buttonText={"Reset"}
                            onClick={() => setSearchTerm("")} // Сбрасываем состояние в контексте
                        />
                    </div>
                ) : (
                    <Table tests={filteredTests} />
                )}
            </div>
        </Layout>
    );
};

export default DashboardPage;