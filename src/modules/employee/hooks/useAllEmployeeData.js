import { useState, useEffect, useCallback } from "react";
import { fetchEmployees } from "../services/EmployeeAPI.js";

const useAllEmployeeData = () => {
  const [employees, setEmployees] = useState([]);
  const [uniqueStatus, setUniqueStatus] = useState([]);
  const [uniqueRole, setUniqueRole] = useState([]);
  const [uniqueBranch, setUniqueBranch] = useState([]);
  const [uniqueDepartment, setUniqueDepartment] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchEmployees();

      const employeesWithAvatar = await Promise.all(
        data.map(async (emp) => {
          const imageUrl = `/assets/avatar/${emp.employeeId}.png`;
          try {
            const res = await fetch(imageUrl);
            return {
              ...emp,
              avatar: res.ok ? imageUrl : "/assets/avatar/default.png",
            };
          } catch {
            return { ...emp, avatar: "/assets/avatar/default.png" };
          }
        })
      );

      setEmployees(employeesWithAvatar);
      setUniqueStatus([...new Set(data.map((emp) => emp.employmentDetails.status))]);
      setUniqueRole([...new Set(data.map((emp) => emp.employmentDetails.role))]);
      setUniqueBranch([...new Set(data.map((emp) => emp.employmentDetails.branch))]);
      setUniqueDepartment([...new Set(data.map((emp) => emp.employmentDetails.department))]);
      setLoading(false);

    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { employees, uniqueStatus, uniqueRole, setUniqueRole, uniqueBranch, setUniqueBranch, uniqueDepartment, setUniqueDepartment, error, loading, fetchData };
};

export default useAllEmployeeData;
