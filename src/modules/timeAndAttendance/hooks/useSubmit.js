import { useState } from "react";

const useSubmit = (apiFunction) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (payload) => {
    setLoading(true);
    setError(null);

    let response;
    try {
      console.log("API Function Called with Payload:", payload);
      response = await apiFunction(payload);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }

    return response;
  };

  return { submit, loading, error };
};

export default useSubmit;