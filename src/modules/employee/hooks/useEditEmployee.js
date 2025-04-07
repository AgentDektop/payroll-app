import { useEffect, useState } from "react";
import { formatDateForAPI, prepareEmployeePayload } from "../utils/employeeUtils.js";
import { updateEmployee} from "../services/EmployeeAPI.js";

const useEmployeeEdit = (employee, fetchEmployeeData) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(employee);

  const [formData, setFormData] = useState(
    employee || {
      personalInformation: {
        employeeName: "",
        gender: "",
        dateOfBirth: "",
        contactNumber: "",
        emailAddress: "",
        address: "",
      },
      employmentDetails: {
        status: "",
        mol: "",
        personCode: "",
        role: "",
        department: "",
        branch: "",
        jobOfferDate: "",
        passportNumber: "",
        passportValidity: "",
        workPermitNumber: "",
        personalNumber: "",
        labourCardValidity: "",
        visaUidNumber: "",
        visaFileNumber: "",
        visaValidity: "",
        emiratesIdNumber: "",
        emiratesIdValidity: "",
      },
      compensationDetails: {
        salaryPackage: "",
        basicSalary: "",
        accommodationAllowance: "",
        transportationAllowance: "",
        foodAllowance: "",
        communicationAllowance: "",
        generalAllowance: "",
        dailyGrossRate: "",
        hourlyGrossRate: "",
        holidayPayRate: "",
        overtimeRate: "",
        cancelledOffRate: "",
        absencesRate: "",
        vacationLeave: "",
        sickLeave: "",
        maternityLeave: "",
        bereavementLeave: "",
      },
    }
  );

  const handleTabChange = (_, newValue) => setActiveTab(newValue);

  const handleSelect = (field, value) => {
    console.log(`handleSelect - Selected ${field}:`, value);
  
    setFormData((prev) => {
      const updatedFormData = {
        ...prev,
        employmentDetails: {
          ...prev.employmentDetails,
          [field]: value,
        },
      };
      return updatedFormData;
    });
  
    setEditedData((prev) => ({
      ...prev,
      employmentDetails: {
        ...prev.employmentDetails,
        [field]: value,
      },
    }));
  
    console.log("Updated editedData:", editedData);
  };
  

  const handleChange = (data, section, field) => {
    let value = data instanceof Date ? formatDateForAPI(data) : data;
  
    console.log(`handleChange triggered - section: ${section}, field: ${field}, value: ${value}`);
  
    setFormData((prev) => {
      const updatedFormData = {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      };
  
      console.log("Updated formData:", updatedFormData);
      return updatedFormData;
    });
  
    setEditedData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };  

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    try {
      let formattedData = prepareEmployeePayload(editedData, true);
  
      // Remove fields that should not be updated
      if (formattedData.personalInformation) {
        delete formattedData.personalInformation.employeeName;
        delete formattedData.personalInformation.age;
      }
  
      await updateEmployee(employee.employeeId, formattedData);
      setIsEditing(false);
      fetchEmployeeData();
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };
  
  const handleCancel = () => {
    setEditedData(employee);
    setIsEditing(false);
  };

  useEffect(() => {
    setEditedData(employee);
    setFormData(employee);
  }, [employee]);

  return {
    activeTab,
    isEditing,
    formData, 
    editedData,
    handleTabChange,
    handleSelect,
    handleChange,
    handleEdit,
    handleSave,
    handleCancel,
  };  
};

export default useEmployeeEdit;