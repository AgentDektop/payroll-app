import { useState } from "react";
import { addEmployee } from "../services/EmployeeAPI";

const useAddEmployee = (onSuccess) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddEmployee = async (employeeData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await addEmployee(employeeData); // Make sure this returns the response
      if (onSuccess)
        {
          console.log("onSuccess is a function:", onSuccess);
          onSuccess();
        }
        else {
          console.error("onSuccess is not a valid function");
        }
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  

  return { handleAddEmployee, loading, error };
};

export default useAddEmployee;