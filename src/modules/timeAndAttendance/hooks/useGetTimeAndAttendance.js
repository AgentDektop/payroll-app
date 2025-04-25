import { useState, useEffect } from "react";
import { fetchAttendanceByPeriod} from "../services/TimeAndAttendanceAPI";

const useAttendance = (startDate, endDate, refreshTrigger) => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!startDate || !endDate) return;

      setLoading(true);
      setError(null);

      try {
        const data = await fetchAttendanceByPeriod(startDate, endDate);
        setAttendance(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate, refreshTrigger]); 

  return { attendance, loading, error };
};

export default useAttendance;
