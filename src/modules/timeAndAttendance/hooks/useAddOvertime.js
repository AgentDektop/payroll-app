import { useState } from "react";
import { addEmployeeOvertime } from "../services/TimeAndAttendanceAPI";

const useAddOvertime = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitOvertime = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await addEmployeeOvertime(payload);
      setLoading(false);
      return response;
    } catch (err) {
      const errorMessage =
        err.response && err.response.data
          ? err.response.data.message || err.response.data
          : err.message;
      setError(errorMessage);
      setLoading(false);
      throw new Error(errorMessage);
    }
  };

  return { submitOvertime, loading, error };
};

export default useAddOvertime;
