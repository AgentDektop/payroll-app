import { useState, useEffect } from "react";
import { fetchEmployeeById } from "../services/EmployeeAPI";

const useEmployeeDataById = (employeeId) => {
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const data = await fetchEmployeeById(employeeId);
        setEmployee(data);
      } catch (err) {
        setError("Failed to fetch employee details");
      }
    };

    fetchEmployeeData();
  }, [employeeId]);

  return { employee, error };
};

export default useEmployeeDataById;
