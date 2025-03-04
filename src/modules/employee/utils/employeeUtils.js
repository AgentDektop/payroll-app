import { isValid, parse } from "date-fns";
import { formatUIDisplayDate, formatDecimalValue } from "../../shared/utils/dateAndNumberUtils";

const formatDateForAPI = (date) => {
    if (!date) return "";
    if (typeof date === "string") return date;
    if (!(date instanceof Date) || isNaN(date)) return "";
  
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  };
  
const prepareEmployeePayload = (formData, isEdit = false) => {
    if (!formData) return {};
  
    const { personalInformation, employmentDetails, compensationDetails } = formData;
  
    const formattedData = {
      personalInformation: {
        employeeName: personalInformation.employeeName,
        gender: personalInformation.gender,
        dateOfBirth: formatDateForAPI(personalInformation.dateOfBirth),
        age: personalInformation.age,
        contactNumber: personalInformation.contactNumber,
        emailAddress: personalInformation.emailAddress,
        address: personalInformation.address,
      },
      employmentDetails: {
        status: employmentDetails.status,
        mol: employmentDetails.mol,
        personCode: employmentDetails.personCode,
        role: employmentDetails.role,
        department: employmentDetails.department,
        branch: employmentDetails.branch,
        jobOfferDate: formatDateForAPI(employmentDetails.jobOfferDate),
        passportNumber: employmentDetails.passportNumber,
        passportValidity: formatDateForAPI(employmentDetails.passportValidity),
        workPermitNumber: employmentDetails.workPermitNumber,
        personalNumber: employmentDetails.personalNumber,
        labourCardValidity: formatDateForAPI(employmentDetails.labourCardValidity),
        visaUidNumber: employmentDetails.visaUidNumber,
        visaFileNumber: employmentDetails.visaFileNumber,
        visaValidity: formatDateForAPI(employmentDetails.visaValidity),
        emiratesIdNumber: employmentDetails.emiratesIdNumber,
        emiratesIdValidity: formatDateForAPI(employmentDetails.emiratesIdValidity),
      },
      compensationDetails: {
        salaryPackage: parseFloat(compensationDetails.salaryPackage) || 0,
        basicSalary: parseFloat(compensationDetails.basicSalary) || 0,
        accommodationAllowance: parseFloat(compensationDetails.accommodationAllowance) || 0,
        transportationAllowance: parseFloat(compensationDetails.transportationAllowance) || 0,
        foodAllowance: parseFloat(compensationDetails.foodAllowance) || 0,
        communicationAllowance: parseFloat(compensationDetails.communicationAllowance) || 0,
        generalAllowance: parseFloat(compensationDetails.generalAllowance) || 0,
        dailyGrossRate: parseFloat(compensationDetails.dailyGrossRate) || 0,
        hourlyGrossRate: parseFloat(compensationDetails.hourlyGrossRate) || 0,
        holidayPayRate: parseFloat(compensationDetails.holidayPayRate) || 0,
        overtimeRate: parseFloat(compensationDetails.overtimeRate) || 0,
        cancelledOffRate: parseFloat(compensationDetails.cancelledOffRate) || 0,
        absencesRate: parseFloat(compensationDetails.absencesRate) || 0,
        vacationLeave: parseInt(compensationDetails.vacationLeave, 10) || 0,
        sickLeave: parseInt(compensationDetails.sickLeave, 10) || 0,
        maternityLeave: parseInt(compensationDetails.maternityLeave, 10) || 0,
        bereavementLeave: parseInt(compensationDetails.bereavementLeave, 10) || 0,
      },
    };
  
    if (isEdit) {
      Object.keys(formattedData).forEach((section) => {
        Object.keys(formattedData[section]).forEach((field) => {
          if (formattedData[section][field] == null) { // Only remove NULL, not empty strings
            delete formattedData[section][field];
          }
        });
      });
    }
     else {
      formattedData.employeeId = formData.employeeId;
    }
  
    return formattedData;
  };

  const calculateAge = (date) => {
    if (!date || !(date instanceof Date) || isNaN(date)) return "";
    const today = new Date();
    const birthDate = new Date(date);
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
  
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return age;
  };
  
  /**
   * Checks if a value is of Date type.
   * If it is a valid Date, returns true; otherwise, returns false.
   */
  const isDate = (value) => {
    if (typeof value === 'string') {
      const parsedDate = parse(value, 'dd-MM-yyyy', new Date());
      console.log("isDate", parsedDate)
      return isValid(parsedDate);
    }
    return false;
  };

  /**
   * Checks if a value is a decimal number.
   * Returns true if the value contains a decimal point and is a valid number.
   */
  const isDecimal = (value) => {
    return !isNaN(value) && value.toString().includes('.');
  };

  /**
   * Formats a value based on its type.
   * - If the value is a Date, formats it to "MMMM dd, yyyy".
   * - If the value is a Decimal, formats it using formatDecimalValue() and appends "AED".
   * - Otherwise, returns the value as is.
   * 
   * @param {any} value - The value to format.
   * @returns {string} - The formatted value.
   */
  const formatHistoryValue = (value) => {
    console.log(typeof (value))
    if (isDate(value)) return formatUIDisplayDate(value);
    if (isDecimal(value)) return `${formatDecimalValue(value)} AED`; // Calls your existing formatter
    return value; // Keep as text if neither date nor decimal
  };

  export { prepareEmployeePayload, formatDateForAPI, calculateAge, isDecimal, isDate, formatHistoryValue }