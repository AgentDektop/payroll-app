import { useState } from "react";
import { addEmployee } from "../services/EmployeeAPI";
import { prepareEmployeePayload } from "../utils/employeeUtils";

const useAddEmployee = (onSuccess) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddEmployee = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const formattedData = prepareEmployeePayload(formData, false); // false = create mode
      const response = await addEmployee(formattedData);

      if (onSuccess) {
        console.log("onSuccess is a function:", onSuccess);
        onSuccess();
      } else {
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