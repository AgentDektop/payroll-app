import { useState, useEffect } from "react";
import {fetchEmployees} from "../services/EmployeeAPI.js";

const useAllEmployeeData = () => {
  const [employees, setEmployees] = useState([]);
  const [uniqueStatus, setUniqueStatus] = useState([]);
  const [uniqueRole, setUniqueRole] = useState([]);
  const [uniqueBranch, setUniqueBranch] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchEmployees();
        setEmployees(data);

        const status = [...new Set(data.map((emp) => emp.employmentDetails.status))];
        setUniqueStatus(status);

        const roles = [...new Set(data.map((emp) => emp.employmentDetails.jobTitle))]
        setUniqueRole(roles);

        const branch = [...new Set(data.map((emp) => emp.employmentDetails.branch))]
        setUniqueBranch(branch);

      } catch (err) {
        setError(err.message);
      }
    };
    getData();
  }, []);

  return { employees, uniqueStatus, uniqueRole, uniqueBranch, error };
};

export default useAllEmployeeData;
