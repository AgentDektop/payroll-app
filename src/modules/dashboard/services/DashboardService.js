import axios from 'axios';

const DASHBOARD_URL = "http://localhost:5050/dashboard";

const fetchDashboard = async () => {
    try {
        const response = await axios.get(DASHBOARD_URL);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch dashboard data.");
    }
};

export default fetchDashboard;