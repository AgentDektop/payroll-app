import { useEffect, useState } from "react";
import { fetchPayRunById } from "../services/PayRunAPI";

const useGetPayRunById = (payRunId) => {
    const [payrun, setPayRun] = useState(null);
    const [error, setError] = useState(null);
  
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await fetchPayRunById(payRunId);
          setPayRun(data);
        } catch (err) {
          setError("Failed to fetch employee details");
        }
      };
  
      fetchData();
    }, [payRunId]);
  
    return { payrun, error };
  
}

export default useGetPayRunById;