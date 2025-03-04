import React from "react";
import { useParams } from "react-router-dom";
import EmployeePersonalInfo from "../components/EmployeePersonalInfoComponent";
import useEmployeeDataById from "../hooks/useEmployeeDataById";

const EmployeePersonalInfoPage = () => {

  const { id  } = useParams();
  const { employee, error, fetchEmployeeData } = useEmployeeDataById(id);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!employee) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      <EmployeePersonalInfo employee={employee} fetchEmployeeData={fetchEmployeeData} />
    </div>
  );
};

export default EmployeePersonalInfoPage;
