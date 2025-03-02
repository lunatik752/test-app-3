import { createContext } from "react";
import { TestType } from "../types/test";

interface DashboardContextType {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    filteredTests: TestType[];
    setFilteredTests: (tests: TestType[]) => void;
}

export const DashboardContext = createContext<DashboardContextType | undefined>(undefined);