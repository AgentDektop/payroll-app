import axios from 'axios';

const DASHBOARD_URL = "https://payroll-api-d6uc.onrender.com/dashboard";

const fetchDashboard = async () => {
    try {
        const response = await axios.get(DASHBOARD_URL);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch dashboard data.");
    }
};

export default fetchDashboard;