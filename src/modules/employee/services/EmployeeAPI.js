import axios from "axios";
const EMPLOYEE_API_URL = "https://payroll-api-d6uc.onrender.com/employee";

const fetchEmployees = async () => {
  const response = await fetch(`${EMPLOYEE_API_URL}/all`);
  if (!response.ok) {
    throw new Error('Failed to fetch employees');
  }
  return await response.json();
};

const fetchEmployeeById = async (id) => {
  const response = await fetch(`${EMPLOYEE_API_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch employee details");
  }
  return await response.json();
};

const addEmployee = async (employeeData) => {
  try {
    console.log("Sending Full Data to API:", JSON.stringify(employeeData, null, 2));

    const response = await axios.post(EMPLOYEE_API_URL, employeeData, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("API Response:", response.data, response.status);
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};

const updateEmployee = async (employeeId, data) => {
  try {
    console.log("updateEmployee - Sending API request to:", `${EMPLOYEE_API_URL}/${employeeId}`);
    console.log("updateEmployee - Payload:", JSON.stringify(data, null, 2));
    const response = await axios.put(`${EMPLOYEE_API_URL}/${employeeId}`, data, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("updateEmployee - Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating employee:", error.response?.data || error.message);
    throw error;
  }
};

export { fetchEmployees, fetchEmployeeById, addEmployee, updateEmployee };