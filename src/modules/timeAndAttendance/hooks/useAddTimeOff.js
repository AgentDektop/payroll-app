import { useState } from "react";
import { addEmployeeTimeOff } from "../services/TimeAndAttendanceAPI";

const useAddTimeOff = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitTimeOff = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await addEmployeeTimeOff(payload);
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

  return { submitTimeOff, loading, error };
};

export default useAddTimeOff;
