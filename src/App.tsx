import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

import DashboardPage from "./pages/DashboardPage";
import { DashboardProvider } from "./context/DashboardProvider";

import "./App.scss";

const LazyResultsPage = lazy(() => import("./pages/ResultsPage"));
const LazyFinalizePage = lazy(() => import("./pages/FinalizePage"));
const LazyNotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const App = () => {
    return (
        <DashboardProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/results/:testId" element={<Suspense><LazyResultsPage /></Suspense>} />
                    <Route path="/finalize/:testId" element={<Suspense><LazyFinalizePage /></Suspense>} />
                    <Route path={"*"} element={<Suspense><LazyNotFoundPage /></Suspense>} />
                </Routes>
            </BrowserRouter>
        </DashboardProvider>
    );
};

export default App;