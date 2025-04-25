import { useState, useEffect, useCallback } from "react";
import { fetchPayRun } from "../services/PayRunAPI";
import { parse, compareAsc } from "date-fns";

const useGetAllPayRun = () => {
  const [payRun, setPayRun] = useState([]);
  const [uniquePayPeriod, setUniquePayPeriod] = useState([]);
  const [selectedPayPeriod, setSelectedPayPeriod] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPayRunData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchPayRun();

      const sortedData = data.sort((a, b) => {
        const dateA = parse(a.period.periodStart, "dd-MM-yyyy", new Date());
        const dateB = parse(b.period.periodStart, "dd-MM-yyyy", new Date());

        return compareAsc(dateB, dateA);
      });
      
      const periods = [...new Set(data.map((pay) => 
        `${pay.period.periodStart} - ${pay.period.periodEnd}`
      ))];

      setPayRun(sortedData);
      setUniquePayPeriod(periods);

      const mostRecentPeriod = periods[0];
      setSelectedPayPeriod(mostRecentPeriod);
      
    } catch (err) {
      console.error("Error fetching pay runs:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPayRunData();
  }, [fetchPayRunData]);

  return { payRun, uniquePayPeriod, selectedPayPeriod, setSelectedPayPeriod, error, fetchPayRunData, isLoading };
};

export default useGetAllPayRun;
