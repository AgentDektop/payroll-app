import React from "react";
import useDashboard from "../hooks/useDashboard";
import Dashboard from "../components/DashboardComponent";
import LoadingOverlay from "../../shared/components/LoadingOverlay";

const DashboardPage = () => {
    const { data, loading, error } = useDashboard();

    return (
        <div style={{ width: "100%", height: "100%" }}>
            {loading && <LoadingOverlay open={loading} />}
            {error && <div style={{ color: "red", padding: "1rem" }}>{error}</div>}
            {!loading && data && <Dashboard data={data} />}
        </div>
    );
};

export default DashboardPage;