import React, { useState } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";

import { TestType } from "../../types/test";

import styles from "./Table.module.scss";


type PropsType = {
    tests: TestType[];
};

type SortDirection = "ASC" | "DESC";

type SortConfig = {
    key: keyof TestType | null;
    direction: SortDirection;
};

const getSiteText = (site: string) => {
    return site.replace(/^(https?:\/\/)?(www\.)?/, "");
};

const Table: React.FC<PropsType> = ({ tests }) => {
    const [sortConfig, setSortConfig] = useState<SortConfig>({
        key: null,
        direction: "ASC",
    });

    const sortedTests = React.useMemo(() => {
        if (!sortConfig.key) return tests;

        return [...tests].sort((a, b) => {
            const aValue = a[sortConfig.key as keyof TestType];
            const bValue = b[sortConfig.key as keyof TestType];

            if (sortConfig.key === "status") {
                const statusOrder = {
                    Online: 1,
                    Paused: 2,
                    Stopped: 3,
                    Draft: 4,
                };

                const aOrder = statusOrder[a.status as keyof typeof statusOrder];
                const bOrder = statusOrder[b.status as keyof typeof statusOrder];

                return sortConfig.direction === "ASC" ? aOrder - bOrder : bOrder - aOrder;
            } else {
                if (aValue < bValue) return sortConfig.direction === "ASC" ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === "ASC" ? 1 : -1;
                return 0;
            }
        });
    }, [tests, sortConfig]);

    const handleSort = (key: keyof TestType) => {
        let direction: SortDirection = "ASC";
        if (sortConfig.key === key && sortConfig.direction === "ASC") {
            direction = "DESC";
        }
        setSortConfig({ key, direction });
    };

    const handleKeyDown = (event: React.KeyboardEvent, key: keyof TestType) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleSort(key);
        }
    };

    const SortIcon = ({ direction }: { direction: SortDirection | null }) => (
        <svg
            width="7"
            height="7"
            viewBox="0 0 7 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
                transform: direction === "DESC" ? "rotate(180deg)" : "none",
                marginLeft: "8px",
            }}
        >
            <path
                d="M0 3.50001L3.13529 0.364716L3.5 7.15256e-06L3.86471 0.364716L7 3.50001L6.63529 3.86472L3.5 0.729424L0.364708 3.86472L0 3.50001Z"
                fill="#999999"
            />
        </svg>
    );

    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th
                        tabIndex={0}
                        onClick={() => handleSort("name")}
                        onKeyDown={(e) => handleKeyDown(e, "name")}
                    >
                        name
                        {sortConfig.key === "name" && <SortIcon direction={sortConfig.direction} />}
                    </th>
                    <th
                        tabIndex={0}
                        onClick={() => handleSort("type")}
                        onKeyDown={(e) => handleKeyDown(e, "type")}
                    >
                        type
                        {sortConfig.key === "type" && <SortIcon direction={sortConfig.direction} />}
                    </th>
                    <th
                        tabIndex={0}
                        onClick={() => handleSort("status")}
                        onKeyDown={(e) => handleKeyDown(e, "status")}
                    >
                        status
                        {sortConfig.key === "status" && <SortIcon direction={sortConfig.direction} />}
                    </th>
                    <th
                        tabIndex={0}
                        onClick={() => handleSort("site")}
                        onKeyDown={(e) => handleKeyDown(e, "site")}
                    >
                        site
                        {sortConfig.key === "site" && <SortIcon direction={sortConfig.direction} />}
                    </th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {sortedTests.map((test) => {
                    const isDraft = test.status === "Draft";
                    return (
                        <tr key={test.id}>
                            <td className={styles.name} style={{ borderColor: test.markerColor }}>
                                {test.name}
                            </td>
                            <td className={styles.type}>{test.type}</td>
                            <td className={classnames(styles.status, styles[test.status.toLowerCase()])}>
                                {test.status}
                            </td>
                            <td className={styles.site}>{getSiteText(test.site)}</td>
                            <td>
                                <Link
                                    className={classnames(styles.button, {[styles.draft]: isDraft})}
                                    to={`/${isDraft ? "finalize" : "results"}/${test.id}`}
                                >
                                    {isDraft ? "Finalize" : "Results"}
                                </Link>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default Table;