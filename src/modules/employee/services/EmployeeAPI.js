const EMPLOYEE_API_URL = "http://localhost:5050/employee";

const fetchEmployees = async () => {
  const response = await fetch(`${EMPLOYEE_API_URL}/all`);
  if (!response.ok) {
    throw new Error('Failed to fetch employees');
  }
  return await response.json();
};

const fetchEmployeeById = async (id) => {
  const response = await fetch(`http://localhost:5050/employee/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch employee details");
  }
  return await response.json();
};


export { fetchEmployees, fetchEmployeeById };