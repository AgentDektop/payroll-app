import { useState, useEffect, useCallback } from "react";
import { fetchEmployeeById } from "../services/EmployeeAPI";

const useEmployeeDataById = (employeeId, fe) => {
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);


  const fetchEmployeeData = useCallback(async () => {
    try {
      const data = await fetchEmployeeById(employeeId);
      setEmployee(data);
    } catch (err) {
      setError("Failed to fetch employee details");
    }
  }, [employeeId]);

  useEffect(() => {
    fetchEmployeeData();
  }, [fetchEmployeeData]);

  return { employee, error, fetchEmployeeData };
};

export default useEmployeeDataById;
