import React, { useState } from "react";
import { DashboardContext } from "./DashboardContext";
import { TestType } from "../types/test";

interface DashboardProviderProps {
    children: React.ReactNode;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filteredTests, setFilteredTests] = useState<TestType[]>([]);

    return (
        <DashboardContext.Provider value={{ searchTerm, setSearchTerm, filteredTests, setFilteredTests }}>
            {children}
        </DashboardContext.Provider>
    );
};