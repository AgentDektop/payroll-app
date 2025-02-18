import { useState, forwardRef, useEffect } from "react";
import {
  Button, Dialog, DialogTitle, DialogContent, DialogActions, Divider,
  TextField, MenuItem, Table, TableBody, TableRow, TableCell, Select, FormControl, InputAdornment,
  Box, IconButton,
  CircularProgress
} from "@mui/material";
import { Clear, Close } from "@mui/icons-material";
import DatePicker from "react-datepicker";
import { useTheme } from "@mui/material/styles";
import useAddEmployee from "../hooks/useAddEmployee.js";
import useAllEmployeeData from "../hooks/useAllEmployeeData.js";
import SearchableDropdown from "./SearchableDropdown.js";
import { calculateAge } from "../../shared/utils/dateAndNumberUtils";
import { parse, isValid, setHours, setMinutes, setSeconds, format } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";
import calendarIcon from "../../shared/assets/icon/calendar-icon.png";
import saveIcon from "../../shared/assets/icon/add-employee-save-icon.png";

const AddEmployeeModal = ({ open, onClose, onSuccess }) => {
  const theme = useTheme();
  const { handleAddEmployee, loading } = useAddEmployee(onSuccess);
  const { uniqueRole, uniqueBranch, uniqueDepartment } = useAllEmployeeData();
  const [roles, setRoles] = useState(uniqueRole);
  const [branches, setBranches] = useState(uniqueBranch);
  const [departments, setDepartments] = useState(uniqueDepartment);

  // Update state when unique values change
  useEffect(() => {
    setRoles(uniqueRole);
    setBranches(uniqueBranch);
    setDepartments(uniqueDepartment);
  }, [uniqueRole, uniqueBranch, uniqueDepartment]);


  /**
   * Initial form data structure for employee creation.
   */
  const initialFormData = {
    employeeId: "",
    personalInformation: {
      employeeName: "",
      gender: "",
      dateOfBirth: null,
      age: "",
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
      jobOfferDate: null,
      passportNumber: "",
      passportValidity: null,
      workPermitNumber: "",
      personalNumber: "",
      labourCardValidity: null,
      visaUidNumber: "",
      visaFileNumber: "",
      visaValidity: null,
      emiratesIdNumber: "",
      emiratesIdValidity: null
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
      bereavementLeave: ""
    }
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Custom date input component for handling date fields.
   */
  const CustomDateInput = forwardRef(({ value, onClick, placeholder, onChange, onClear = () => { } }, ref) => (
    <TextField
      fullWidth
      value={value || ""} 
      onClick={onClick}
      onChange={onChange}
      ref={ref}
      placeholder={placeholder}
      sx={{
        width: "100%",
        marginRight: 5,
        "& .MuiInputBase-input::placeholder": {
          color: theme.palette.custom.lightGrey,
          opacity: 2,
          fontSize: "0.875rem"
        }
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {value ? (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation(); 
                  onClear();
                }}
                size="small"
              >
                <Clear fontSize="small" />
              </IconButton>
            ) : (
              <img
                src={calendarIcon}
                alt="icon"
                width="24"
                height="24"
                style={{ cursor: "pointer", filter: "invert(0.5)" }}
                onClick={onClick}
              />
            )}
          </InputAdornment>
        ),
        style: { width: "100%" }
      }}
    />
  ));

  /**
   * Handles input changes and updates form data.
   */
  const handleChange = (data, section, field) => {
    console.log(`handleChange called for ${field} with:`, data);

    let value = null;
    let computedAge = null;

    if (data && data.target) {
      value = data.target.value;
    } else if (data instanceof Date && !isNaN(data)) {
      value = data;
      if (section === "personalInformation" && field === "dateOfBirth") {
        computedAge = calculateAge(data);
      }
    } else {
      value = data;
    }

    setFormData((prev) => {
      if (!section) {
        return {
          ...prev,
          [field]: value,
        };
      }

      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
          ...(field === "dateOfBirth" ? { age: computedAge } : {}),
        },
      };
    });
  };

  const apiDate = (date) => (date ? format(date, "dd-MM-yyyy") : null);

  useEffect(() => {
    console.log("Form data updated:", formData);
  }, [formData]);


  /**
   * Handles dropdown selections for role, branch, and department.
   */
  const handleSelect = (field, value) => {
    console.log(` handSelect - Selected ${field}:`, value);

    setFormData((prev) => {
      const updatedData = {
        ...prev,
        employmentDetails: {
          ...prev.employmentDetails,
          [field]: value,
        },
      };
      return updatedData;
    });
  };


  /**
   * Validates the form to ensure all required fields are filled.
   * @returns {boolean} True if valid, false otherwise.
   */
  const validateForm = () => {
    for (const section in formData) {
      if (typeof formData[section] === "object") {
        for (const field in formData[section]) {
          if (formData[section][field] == null || formData[section][field] === "") {
            console.log(`Missing field: ${section} -> ${field}`);
            return false;
          }
        }
      } else {
        if (formData[section] == null || formData[section] === "") {
          console.log(`Missing field: ${section}`);
          return false;
        }
      }
    }
    return true;
  };

  /**
   * Submits the form data after validation.
   */
  const handleSubmit = async () => {
    if (!validateForm()) {
      alert("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formattedData = {
        ...formData,
        personalInformation: {
          ...formData.personalInformation,
          dateOfBirth: apiDate(formData.personalInformation.dateOfBirth)
        },
        employmentDetails: {
          ...formData.employmentDetails,
          jobOfferDate: apiDate(formData.employmentDetails.jobOfferDate),
          passportValidity: apiDate(formData.employmentDetails.passportValidity),
          labourCardValidity: apiDate(formData.employmentDetails.labourCardValidity),
          visaValidity: apiDate(formData.employmentDetails.visaValidity),
          emiratesIdValidity: apiDate(formData.employmentDetails.visaValidity)
        },
        compensationDetails: {
          ...formData.compensationDetails,
          salaryPackage: parseFloat(formData.compensationDetails.salaryPackage) || 0,
          basicSalary: parseFloat(formData.compensationDetails.basicSalary) || 0,
          accommodationAllowance: parseFloat(formData.compensationDetails.accommodationAllowance) || 0,
          transportationAllowance: parseFloat(formData.compensationDetails.transportationAllowance) || 0,
          foodAllowance: parseFloat(formData.compensationDetails.foodAllowance) || 0,
          communicationAllowance: parseFloat(formData.compensationDetails.communicationAllowance) || 0,
          generalAllowance: parseFloat(formData.compensationDetails.generalAllowance) || 0,
          dailyGrossRate: parseFloat(formData.compensationDetails.dailyGrossRate) || 0,
          hourlyGrossRate: parseFloat(formData.compensationDetails.hourlyGrossRate) || 0,
          holidayPayRate: parseFloat(formData.compensationDetails.holidayPayRate) || 0,
          overtimeRate: parseFloat(formData.compensationDetails.overtimeRate) || 0,
          cancelledOffRate: parseFloat(formData.compensationDetails.cancelledOffRate) || 0,
          absencesRate: parseFloat(formData.compensationDetails.absencesRate) || 0,
          vacationLeave: parseInt(formData.compensationDetails.vacationLeave, 10) || 0,
          sickLeave: parseInt(formData.compensationDetails.sickLeave, 10) || 0,
          maternityLeave: parseInt(formData.compensationDetails.maternityLeave, 10) || 0,
          bereavementLeave: parseInt(formData.compensationDetails.bereavementLeave, 10) || 0,
        },
      };

      const response = await handleAddEmployee(formattedData);

      console.log(`handleSubmit value of formData ${formData}`)
      console.log(`handleSubmit response: ${JSON.stringify(response)}`);
      console.log(`handleSubmit status`)


      if (response && response.message === "Employee added successfully.") {
        alert("Employee created successfully!");
        handleClose();
      } else {
        const errorMessage = response?.data?.message || "An error occurred. Please try again.";
        alert(`Failed to create employee: ${errorMessage}`);
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message || "An unexpected error occurred.";
      alert(`Failed to create employee: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Resets form data and closes the modal.
   */
  const handleClose = () => {
    setFormData(initialFormData);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth maxWidth="md"
      sx={{
        backdropFilter: 'blur(5px)',
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(100, 100, 100, 0.40)',
        },
        '& .MuiDialog-paper': {
          backgroundColor: '#FAFBFB !important',
          boxShadow: '1px 1px 4px rgba(204, 204, 204, 0.25), -1px -1px 4px rgba(204, 204, 204, 0.25)',
          maxHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          overflowY: 'auto !important',
          overflowX: "hidden"
        },
        '& .MuiDialogContent-root': {
          overflowX: 'hidden',
        },
      }}>
      <DialogTitle sx={{ fontSize: "30px", fontWeight: "600", top: 20 }}>
        New Employee

        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 28,
            right: 43,
            padding: 0,
            color: theme.palette.text.primary,
          }}
        >
          <Close />
        </IconButton>

      </DialogTitle>
      <Divider sx={{ my: 2 }} />
      <DialogContent>
        <Table>
          <TableBody sx={{ tableLayout: "fixed" }}>
            {/* Personal Information Section */}
            <TableRow sx={{ py: 0, borderBottom: `1px solid ${theme.palette.custom.greyBorder}` }}>
              <TableCell sx={{
                width: "30%",
                fontWeight: "bold",
                verticalAlign: "top",
                paddingTop: 0,
                borderBottom: "none",
                paddingBottom: 2
              }}>
                Personal Information
              </TableCell>
              {/** row for Employee Name and Gender */}
              <TableRow sx={{ py: 0, my: 0 }}>
                <TableCell sx={{ py: 0, px: 1, borderBottom: "none" }}>
                  <TextField
                    fullWidth
                    sx={{
                      py: 0,
                      "& .MuiInputBase-input::placeholder": {
                        color: theme.palette.custom.lightGrey,
                        opacity: 2,
                        fontSize: "0.875rem"
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.custom.lightGrey,
                          opacity: 0.2
                        }
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.custom.lightGrey,
                      },
                    }}
                    placeholder="Full Name"
                    value={formData.personalInformation.employeeName}
                    onChange={(e) => handleChange(e, 'personalInformation', 'employeeName')}
                  />
                </TableCell>
                <TableCell sx={{ py: 0, px: 1, borderBottom: "none" }}>
                  <FormControl fullWidth variant="outlined"
                    sx={{
                      py: 0,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: theme.spacing(1),
                        borderColor: "rgba(122, 122, 122, 0.2)",
                        borderWidth: "0.5px",
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(122, 122, 122, 0.2)",
                          borderWidth: "0.5px",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(122, 122, 122, 0.2)",
                          borderWidth: "0.5px",
                        },
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderWidth: "0.5px",
                        borderColor: "rgba(122, 122, 122, 0.2)",
                      }
                    }}
                  >
                    <Select
                      labelId="gender-label"
                      value={formData.personalInformation.gender || ""}
                      onChange={(e) => handleChange(e, 'personalInformation', 'gender')}
                      displayEmpty
                      sx={{
                        "& .MuiSelect-select": {
                          color: formData.personalInformation.gender ? "rgba(0, 0, 0, 0.87)" : theme.palette.custom.lightGrey,
                          fontSize: "0.875rem"
                        },
                      }}
                    >
                      <MenuItem value="" disabled>
                        Gender {/* Placeholder text */}
                      </MenuItem>
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
              {/** row for Date of Birth and Age */}
              <TableRow sx={{ py: 0, my: 0 }}>
                <TableCell sx={{ paddingTop: 2, paddingBottom: 0, px: 1, borderBottom: "none" }}>
                  <Box sx={{
                    display: "flex",
                    width: "100%",
                    px: 0,
                    "& .MuiOutlinedInput-root": {
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.custom.lightGrey,
                        opacity: 0.2
                      }
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.custom.lightGrey,
                    }
                  }}>
                    <DatePicker
                      selected={formData.personalInformation.dateOfBirth}
                      onChange={(date) => handleChange(date, "personalInformation", "dateOfBirth")}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Select Date of Birth"
                      customInput={
                        <CustomDateInput
                          placeholder="Date of Birth"
                          value={formData.personalInformation.dateOfBirth || ""}
                          onClear={() => {
                            handleChange(null, "personalInformation", "dateOfBirth")
                          }}
                        />}
                      showMonthDropdown
                      showYearDropdown
                      scrollableYearDropdown
                      yearDropdownItemNumber={70}
                    />
                  </Box>
                </TableCell>
                <TableCell sx={{ paddingTop: 2, paddingBottom: 0, px: 1, borderBottom: "none" }}>
                  <TextField
                    fullWidth
                    sx={{
                      py: 0,
                      "& .MuiInputBase-input::placeholder": {
                        color: theme.palette.custom.lightGrey,
                        opacity: 2,
                        fontSize: "0.875rem"
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.custom.lightGrey,
                          opacity: 0.2
                        }
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.custom.lightGrey,
                      },
                    }}
                    placeholder="Age"
                    value={formData.personalInformation.age ?? ""}
                    onChange={(e) => handleChange(e, 'personalInformation', 'age')}
                    readOnly
                  />
                </TableCell>
              </TableRow>
              {/** row for Contact Number and Email Address */}
              <TableRow sx={{ py: 0, my: 0 }}>
                <TableCell sx={{ paddingTop: 2, width: "30%", px: 1, borderBottom: "none" }}>
                  <TextField
                    fullWidth
                    sx={{
                      py: 0,
                      "& .MuiInputBase-input::placeholder": {
                        color: theme.palette.custom.lightGrey,
                        opacity: 2,
                        fontSize: "0.875rem"
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.custom.lightGrey,
                          opacity: 0.2
                        }
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.custom.lightGrey,
                      },
                    }}
                    placeholder="Contact Number"
                    value={formData.personalInformation.contactNumber}
                    onChange={(e) => handleChange(e, 'personalInformation', 'contactNumber')}
                  />
                </TableCell>
                <TableCell sx={{ paddingTop: 2, width: "30%", px: 1, borderBottom: "none" }}>
                  <TextField
                    fullWidth
                    sx={{
                      py: 0,
                      "& .MuiInputBase-input::placeholder": {
                        color: theme.palette.custom.lightGrey,
                        opacity: 2,
                        fontSize: "0.875rem"
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.custom.lightGrey,
                          opacity: 0.2
                        }
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.custom.lightGrey,
                      },
                    }}
                    placeholder="Email Address"
                    value={formData.personalInformation.emailAddress}
                    onChange={(e) => handleChange(e, 'personalInformation', 'emailAddress')}
                  />
                </TableCell>
              </TableRow>
              {/** row for Address */}
              <TableRow sx={{ py: 0, my: 0 }}>
                <TableCell colSpan={2} sx={{ paddingBottom: 2, paddingTop: 0, px: 1, borderBottom: "none" }}>
                  <TextField
                    fullWidth
                    sx={{
                      py: 0,
                      "& .MuiInputBase-input::placeholder": {
                        color: theme.palette.custom.lightGrey,
                        opacity: 2,
                        fontSize: "0.875rem"
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.custom.lightGrey,
                          opacity: 0.2
                        }
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.custom.lightGrey,
                      },
                    }}
                    placeholder="Address"
                    value={formData.personalInformation.address}
                    onChange={(e) => handleChange(e, 'personalInformation', 'address')}
                  />
                </TableCell>
              </TableRow>
            </TableRow>

            {/* Employment Details Setion */}
            <TableRow sx={{ py: 0, borderBottom: `1px solid ${theme.palette.custom.greyBorder}` }}>
              <TableCell
                sx={{
                  width: "30%",
                  fontWeight: "bold",
                  verticalAlign: "top",
                }}>
                Employment Details
              </TableCell>
              {/** row for Employee ID and Role */}
              <TableRow sx={{ py: 0, my: 0 }}>
                <TableCell sx={{ paddingTop: 2, paddingBottom: 0, px: 1, borderBottom: "none" }}>
                  <TextField
                    fullWidth
                    sx={{
                      py: 0,
                      "& .MuiInputBase-input::placeholder": {
                        color: theme.palette.custom.lightGrey,
                        opacity: 2,
                        fontSize: "0.875rem"
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.custom.lightGrey,
                          opacity: 0.2
                        }
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.custom.lightGrey,
                      },
                    }}
                    placeholder="Employee ID"
                    value={formData.employeeId}
                    onChange={(e) => handleChange(e, null, "employeeId")}
                    required
                  />
                </TableCell>
                <TableCell sx={{ paddingTop: 2, paddingBottom: 0, px: 1, borderBottom: "none" }}>
                  <FormControl fullWidth variant="outlined"
                    sx={{
                      py: 0,
                      "& .MuiInputBase-input::placeholder": {
                        color: theme.palette.custom.lightGrey,
                        opacity: 2,
                        fontSize: "0.875rem"
                      },
                      "& .MuiOutlinedInput-root": {
                        borderRadius: theme.spacing(1),
                        borderColor: "rgba(122, 122, 122, 0.2)",
                        borderWidth: "0.5px",
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(122, 122, 122, 0.2)",
                          borderWidth: "0.5px",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(122, 122, 122, 0.2)",
                          borderWidth: "0.5px",
                        },
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderWidth: "0.5px",
                        borderColor: "rgba(122, 122, 122, 0.2)",
                      }
                    }}
                  >
                    <SearchableDropdown
                      placeholder="Role"
                      options={roles}
                      value={formData.employmentDetails.role}
                      onSelect={(value) => handleSelect("role", value)}
                      allowAddNew={true}
                    />
                  </FormControl>
                </TableCell>
              </TableRow>
              {/** row for Job Offer Date and Status */}
              <TableRow sx={{ py: 0, my: 0 }}>
                <TableCell sx={{ paddingTop: 2, paddingBottom: 0, width: "30%", px: 1, borderBottom: "none" }}>
                  <Box sx={{
                    display: "flex",
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.custom.lightGrey,
                        opacity: 0.2,
                      }
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.custom.lightGrey,
                    }
                  }}>
                    <DatePicker
                      selected={formData.employmentDetails.jobOfferDate}
                      onChange={(date) => handleChange(date, "employmentDetails", "jobOfferDate")}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Select Job Offer Date"
                      customInput={
                        <CustomDateInput
                          placeholder="Job Offer Date"
                          value={formData.employmentDetails.jobOfferDate || ""}
                          onClear={() => {
                            handleChange(null, "employmentDetails", "jobOfferDate")
                          }}
                        />}
                      showMonthDropdown
                      showYearDropdown
                      scrollableYearDropdown
                      yearDropdownItemNumber={70}
                    />
                  </Box>
                </TableCell>
                <TableCell sx={{ paddingTop: 2, paddingBottom: 0, width: "30%", px: 1, borderBottom: "none" }}>
                  <FormControl fullWidth variant="outlined"
                    sx={{
                      py: 0,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: theme.spacing(1),
                        borderColor: "rgba(122, 122, 122, 0.2)",
                        borderWidth: "0.5px",
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(122, 122, 122, 0.2)",
                          borderWidth: "0.5px",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(122, 122, 122, 0.2)",
                          borderWidth: "0.5px",
                        },
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderWidth: "0.5px",
                        borderColor: "rgba(122, 122, 122, 0.2)",
                      }
                    }}
                  >
                    <Select
                      labelId="status-label"
                      value={formData.employmentDetails.status || ""}
                      onChange={(e) => handleChange(e, 'employmentDetails', 'status')}
                      displayEmpty
                      sx={{
                        "& .MuiSelect-select": {
                          color: formData.employmentDetails.status ? "rgba(0, 0, 0, 0.87)" : theme.palette.custom.lightGrey,
                          fontSize: "0.875rem"
                        },
                      }}
                    >
                      <MenuItem value="" disabled>
                        Status {/* Placeholder text */}
                      </MenuItem>
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Inactive">Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
              {/** row for Department and Branch */}
              <TableRow sx={{ py: 0, my: 0 }}>
                <TableCell sx={{ paddingTop: 2, paddingBottom: 0, px: 1, borderBottom: "none" }}>
                  <FormControl fullWidth variant="outlined"
                    sx={{
                      py: 0,
                      "& .MuiInputBase-input::placeholder": {
                        color: theme.palette.custom.lightGrey,
                        opacity: 2,
                        fontSize: "0.875rem"
                      },
                      "& .MuiOutlinedInput-root": {
                        borderRadius: theme.spacing(1),
                        borderColor: "rgba(122, 122, 122, 0.2)",
                        borderWidth: "0.5px",
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(122, 122, 122, 0.2)",
                          borderWidth: "0.5px",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(122, 122, 122, 0.2)",
                          borderWidth: "0.5px",
                        },
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderWidth: "0.5px",
                        borderColor: "rgba(122, 122, 122, 0.2)",
                      }
                    }}
                  >
                    <SearchableDropdown
                      placeholder="Department"
                      options={departments}
                      value={formData.employmentDetails.department}
                      onSelect={(value) => {
                        console.log("Selected Department:", value);
                        handleSelect("department", value)
                      }
                      }
                      allowAddNew={true}
                    />
                  </FormControl>
                </TableCell>
                <TableCell sx={{ paddingTop: 2, paddingBottom: 0, px: 1, borderBottom: "none" }}>
                  <FormControl fullWidth variant="outlined"
                    sx={{
                      py: 0,
                      "& .MuiInputBase-input::placeholder": {
                        color: theme.palette.custom.lightGrey,
                        opacity: 2,
                        fontSize: "0.875rem"
                      },
                      "& .MuiOutlinedInput-root": {
                        borderRadius: theme.spacing(1),
                        borderColor: "rgba(122, 122, 122, 0.2)",
                        borderWidth: "0.5px",
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(122, 122, 122, 0.2)",
                          borderWidth: "0.5px",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(122, 122, 122, 0.2)",
                          borderWidth: "0.5px",
                        },
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderWidth: "0.5px",
                        borderColor: "rgba(122, 122, 122, 0.2)",
                      }
                    }}
                  >
                    <SearchableDropdown
                      placeholder="Branch"
                      value={formData.employmentDetails.branch}
                      options={branches}
                      onSelect={(value) => handleSelect("branch", value)}
                      allowAddNew={true}
                    />
                  </FormControl>
                </TableCell>
              </TableRow>
              {/** row for Emirates ID and Emirates ID Validity */}
              <TableRow sx={{ py: 0, my: 0 }}>
                <TableCell sx={{ paddingTop: 2, paddingBottom: 0, width: "30%", px: 1, borderBottom: "none" }}>
                  <TextField
                    fullWidth
                    sx={{
                      py: 0,
                      "& .MuiInputBase-input::placeholder": {
                        color: theme.palette.custom.lightGrey,
                        opacity: 2,
                        fontSize: "0.875rem"
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.custom.lightGrey,
                          opacity: 0.2
                        }
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.custom.lightGrey,
                      },
                    }}
                    placeholder="Emirates ID Number"
                    value={formData.employmentDetails.emiratesIdNumber}
                    onChange={(e) => handleChange(e, 'employmentDetails', 'emiratesIdNumber')}
                  />
                </TableCell>
                <TableCell sx={{ paddingTop: 2, paddingBottom: 0, width: "30%", px: 1, borderBottom: "none" }}>
                  <Box sx={{
                    display: "flex",
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.custom.lightGrey,
                        opacity: 0.2
                      }
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.custom.lightGrey,
                    }
                  }}>
                    <DatePicker
                      selected={formData.employmentDetails.emiratesIdValidity}
                      onChange={(date) => handleChange(date, "employmentDetails", "emiratesIdValidity")}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Select Emirates ID Validity Date"
                      customInput={
                        <CustomDateInput
                          placeholder="Emirates ID Validity Date"
                          value={formData.employmentDetails.emiratesIdValidity || ""}
                          onClear={() => {
                            handleChange(null, "employmentDetails", "emiratesIdValidity")
                          }}
                        />}
                      showMonthDropdown
                      showYearDropdown
                      scrollableYearDropdown
                      yearDropdownItemNumber={70}
                      isClearable
                    />
                  </Box>
                </TableCell>
              </TableRow>
              {/** row for Passport Number and Date of Passport Expiry */}
              <TableRow sx={{ py: 0, my: 0 }}>
                <TableCell sx={{ paddingTop: 2, paddingBottom: 0, width: "30%", px: 1, borderBottom: "none" }}>
                  <TextField
                    fullWidth
                    sx={{
                      py: 0,
                      "& .MuiInputBase-input::placeholder": {
                        color: theme.palette.custom.lightGrey,
                        opacity: 2,
                        fontSize: "0.875rem"
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.custom.lightGrey,
                          opacity: 0.2
                        }
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.custom.lightGrey,
                      },
                    }}
                    placeholder="Passport Number"
                    value={formData.employmentDetails.passportNumber}
                    onChange={(e) => handleChange(e, 'employmentDetails', 'passportNumber')}
                  />
                </TableCell>
                <TableCell sx={{ paddingTop: 2, paddingBottom: 0, width: "30%", px: 1, borderBottom: "none" }}>
                  <Box sx={{
                    display: "flex",
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.custom.lightGrey,
                        opacity: 0.2
                      }
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.custom.lightGrey,
                    }
                  }}>
                    <DatePicker
                      selected={formData.employmentDetails.passportValidity}
                      onChange={(date) => handleChange(date, "employmentDetails", "passportValidity")}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Select Passport Validity Date"
                      customInput={
                        <CustomDateInput
                          placeholder="Passport Validity Date"
                          value={formData.employmentDetails.passportValidity || ""}
                          onClear={() => {
                            handleChange(null, "employmentDetails", "passportValidity")
                          }}
                        />}
                      showMonthDropdown
                      showYearDropdown
                      scrollableYearDropdown
                      yearDropdownItemNumber={70}
                    />
                  </Box>
                </TableCell>
              </TableRow>
              {/** row for Visa UID Number and Visa Validity */}
              <TableRow sx={{ py: 0, my: 0 }}>
                <TableCell sx={{ paddingTop: 2, paddingBottom: 0, width: "30%", px: 1, borderBottom: "none" }}>
                  <TextField
                    fullWidth
                    sx={{
                      py: 0,
                      "& .MuiInputBase-input::placeholder": {
                        color: theme.palette.custom.lightGrey,
                        opacity: 2,
                        fontSize: "0.875rem"
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.custom.lightGrey,
                          opacity: 0.2
                        }
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.custom.lightGrey,
                      },
                    }}
                    placeholder="Visa UID Number"
                    value={formData.employmentDetails.visaUidNumber}
                    onChange={(e) => handleChange(e, 'employmentDetails', 'visaUidNumber')}
                  />
                </TableCell>
                <TableCell sx={{ paddingTop: 2, paddingBottom: 0, width: "30%", px: 1, borderBottom: "none" }}>
                  <Box sx={{
                    display: "flex",
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.custom.lightGrey,
                        opacity: 0.2
                      }
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.custom.lightGrey,
                    }
                  }}>
                    <DatePicker
                      selected={formData.employmentDetails.visaValidity}
                      onChange={(date) => handleChange(date, "employmentDetails", "visaValidity")}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Select Visa Validity Date"
                      customInput={
                        <CustomDateInput
                          placeholder="Visa Validity Date"
                          value={formData.employmentDetails.visaValidity || ""}
                          onClear={() => {
                            handleChange(null, "employmentDetails", "visaValidity")
                          }}
                        />}
                      showMonthDropdown
                      showYearDropdown
                      scrollableYearDropdown
                      yearDropdownItemNumber={70}
                    />
                  </Box>
                </TableCell>
              </TableRow>
              {/** row for Visa File Number and Person Code */}
              <TableRow sx={{ py: 0, my: 0 }}>
                <TableCell sx={{ paddingTop: 2, paddingBottom: 0, width: "30%", px: 1, borderBottom: "none" }}>
                  <TextField
                    fullWidth
                    sx={{
                      py: 0,
                      "& .MuiInputBase-input::placeholder": {
                        color: theme.palette.custom.lightGrey,
                        opacity: 2,
                        fontSize: "0.875rem"
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.custom.lightGrey,
                          opacity: 0.2
                        }
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.custom.lightGrey,
                      },
                    }}
                    placeholder="Visa File Number"
                    value={formData.employmentDetails.visaFileNumber}
                    onChange={(e) => handleChange(e, 'employmentDetails', 'visaFileNumber')}
                  />
                </TableCell>
                <TableCell sx={{ paddingTop: 2, paddingBottom: 0, width: "30%", px: 1, borderBottom: "none" }}>
                  <TextField
                    fullWidth
                    sx={{
                      py: 0,
                      "& .MuiInputBase-input::placeholder": {
                        color: theme.palette.custom.lightGrey,
                        opacity: 2,
                        fontSize: "0.875rem"
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.custom.lightGrey,
                          opacity: 0.2
                        }
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.custom.lightGrey,
                      },
                    }}
                    placeholder="Person Code"
                    value={formData.employmentDetails.personCode}
                    onChange={(e) => handleChange(e, 'employmentDetails', 'personCode')}
                  />
                </TableCell>
              </TableRow>
              {/** row for MOL and Labour Card Validity */}
              <TableRow sx={{ py: 0, my: 0 }}>
                <TableCell sx={{ paddingTop: 2, paddingBottom: 0, width: "30%", px: 1, borderBottom: "none" }}>
                  <TextField
                    fullWidth
                    sx={{
                      py: 0,
                      "& .MuiInputBase-input::placeholder": {
                        color: theme.palette.custom.lightGrey,
                        opacity: 2,
                        fontSize: "0.875rem"
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.custom.lightGrey,
                          opacity: 0.2
                        }
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.custom.lightGrey,
                      },
                    }}
                    placeholder="MOL"
                    value={formData.employmentDetails.mol}
                    onChange={(e) => handleChange(e, 'employmentDetails', 'mol')}
                  />
                </TableCell>
                <TableCell sx={{ paddingTop: 2, paddingBottom: 0, width: "30%", px: 1, borderBottom: "none" }}>
                  <Box sx={{
                    display: "flex",
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.custom.lightGrey,
                        opacity: 0.2,
                      }
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.custom.lightGrey,
                    }
                  }}>
                    <DatePicker
                      selected={formData.employmentDetails.labourCardValidity}
                      onChange={(date) => handleChange(date, "employmentDetails", "labourCardValidity")}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Select Labour Card Validity Date"
                      customInput={
                        <CustomDateInput
                          placeholder="Labour Card Validity Date"
                          value={formData.employmentDetails.labourCardValidity || ""}
                          onClear={() => {
                            handleChange(null, "employmentDetails", "labourCardValidity")
                          }}
                        />}
                      showMonthDropdown
                      showYearDropdown
                      scrollableYearDropdown
                      yearDropdownItemNumber={70}
                    />
                  </Box>
                </TableCell>
              </TableRow>
              {/** row for Work Permit No and Personal Number */}
              <TableRow sx={{ py: 0, my: 0 }}>
                <TableCell sx={{ paddingBottom: 2, paddingTop: 2, width: "30%", px: 1, borderBottom: "none" }}>
                  <TextField
                    fullWidth
                    sx={{
                      py: 0,
                      "& .MuiInputBase-input::placeholder": {
                        color: theme.palette.custom.lightGrey,
                        opacity: 2,
                        fontSize: "0.875rem"
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.custom.lightGrey,
                          opacity: 0.2
                        }
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.custom.lightGrey,
                      },
                    }}
                    placeholder="Work Permit Number"
                    value={formData.employmentDetails.workPermitNumber}
                    onChange={(e) => handleChange(e, 'employmentDetails', 'workPermitNumber')}
                  />
                </TableCell>
                <TableCell sx={{ paddingBottom: 2, paddingTop: 2, width: "30%", px: 1, borderBottom: "none" }}>
                  <TextField
                    fullWidth
                    sx={{
                      py: 0,
                      "& .MuiInputBase-input::placeholder": {
                        color: theme.palette.custom.lightGrey,
                        opacity: 2,
                        fontSize: "0.875rem"
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.custom.lightGrey,
                          opacity: 0.2
                        }
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.custom.lightGrey,
                      },
                    }}
                    placeholder="Personal Number"
                    value={formData.employmentDetails.personalNumber}
                    onChange={(e) => handleChange(e, 'employmentDetails', 'personalNumber')}
                  />
                </TableCell>
              </TableRow>
            </TableRow>

            {/* Compensation Details Section */}
            <TableRow sx={{ py: 0 }}>
              <TableCell
                sx={{
                  width: "30%",
                  fontWeight: "bold",
                  verticalAlign: "top",
                  borderBottom: "none"
                }}>
                Compensation Details
              </TableCell>
              {/** row for Salary Package */}
              <TableRow sx={{ py: 0, my: 0 }}>
                <TableCell colSpan={2} sx={{ paddingTop: 2, paddingBottom: 0, px: 1, borderBottom: "none" }}>
                  <TextField
                    fullWidth
                    sx={{
                      py: 0,
                      "& .MuiInputBase-input::placeholder": {
                        color: theme.palette.custom.lightGrey,
                        opacity: 2,
                        fontSize: "0.875rem"
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.custom.lightGrey,
                          opacity: 0.2
                        }
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.custom.lightGrey,
                      },
                    }}
                    placeholder="Salary Package"
                    value={formData.compensationDetails.salaryPackage}
                    onChange={(e) => handleChange(e, 'compensationDetails', 'salaryPackage')}
                  />
                </TableCell>
              </TableRow>
              {/** row for Basic Salary and Accommodation Allowance */}
              <TableRow sx={{ py: 0, my: 0 }}>
                <TableCell sx={{ paddingTop: 2, paddingBottom: 0, px: 1, borderBottom: "none" }}>
                  <TextField
                    fullWidth
                    sx={{
                      py: 0,
                      "& .MuiInputBase-input::placeholder": {
                        color: theme.palette.custom.lightGrey,
                        opacity: 2,
                        fontSize: "0.875rem"
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.custom.lightGrey,
                          opacity: 0.2
                        }
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.custom.lightGrey,
                      },
                    }}
                    placeholder="Basic Salary"
                    value={formData.compensationDetails.basicSalary}
                    onChange={(e) => handleChange(e, 'compensationDetails', 'basicSalary')}
                  />
                </TableCell>
                <TableCell sx={{ paddingTop: 2, paddingBottom: 0, px: 1, borderBottom: "none" }}>
                  <TextField
                    fullWidth
                    sx={{
                      py: 0,
                      "& .MuiInputBase-input::placeholder": {
                        color: theme.palette.custom.lightGrey,
                        opacity: 2,
                        fontSize: "0.875rem"
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.custom.lightGrey,
                          opacity: 0.2
                        }
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.custom.lightGrey,
                      },
                    }}
                    placeholder="Accommodation Allowance"
                    value={formData.compensationDetails.accommodationAllowance}
                    onChange={(e) => handleChange(e, 'compensationDetails', 'accommodationAllowance')}
                  />
                </TableCell>
              </TableRow>
              {/** row for Transportation and Food Allowance*/}
              <TableRow sx={{ py: 0, my: 0 }}>
                <TableCell sx={{ paddingTop: 2, paddingBottom: 0, px: 1, border: "none" }}>
                  <TextField
                    fullWidth
                    sx={{
                      py: 0,
                      "& .MuiInputBase-input::placeholder": {
                        color: theme.palette.custom.lightGrey,
                        opacity: 2,
                        fontSize: "0.875rem"
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.custom.lightGrey,
                          opacity: 0.2
                        }
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.custom.lightGrey,
                      },
                    }}
                    placeholder="Transportation Allowance"
                    value={formData.compensationDetails.transportationAllowance}
                    onChange={(e) => handleChange(e, 'compensationDetails', 'transportationAllowance')}
                  />
                </TableCell>
                <TableCell sx={{ paddingTop: 2, paddingBottom: 0, px: 1, borderBottom: "none" }}>
                  <TextField
                    fullWidth
                    sx={{
                      py: 0,
                      "& .MuiInputBase-input::placeholder": {
                        color: theme.palette.custom.lightGrey,
                        opacity: 2,
                        fontSize: "0.875rem"
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.custom.lightGrey,
                          opacity: 0.2
                        }
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.custom.lightGrey,
                      },
                    }}
                    placeholder="Food Allowance"
                    value={formData.compensationDetails.foodAllowance}
                    onChange={(e) => handleChange(e, 'compensationDetails', 'foodAllowance')}
                  />
                </TableCell>
              </TableRow>
              {/** row for Communication and General Allowance */}
              <TableRow sx={{ py: 0, my: 0 }}>
                <TableCell sx={{ paddingTop: 2, paddingBottom: 0, px: 1, border: "none" }}>
                  <TextField
                    fullWidth
                    sx={{
                      py: 0,
                      "& .MuiInputBase-input::placeholder": {
                        color: theme.palette.custom.lightGrey,
                        opacity: 2,
                        fontSize: "0.875rem"
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.custom.lightGrey,
                          opacity: 0.2
                        }
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.custom.lightGrey,
                      },
                    }}
                    placeholder="Communication Allowance"
                    value={formData.compensationDetails.communicationAllowance}
                    onChange={(e) => handleChange(e, 'compensationDetails', 'communicationAllowance')}
                  />
                </TableCell>
                <TableCell sx={{ paddingTop: 2, paddingBottom: 0, width: "30%", px: 1, borderBottom: "none" }}>
                  <TextField
                    fullWidth
                    sx={{
                      py: 0,
                      "& .MuiInputBase-input::placeholder": {
                        color: theme.palette.custom.lightGrey,
                        opacity: 2,
                        fontSize: "0.875rem"
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.custom.lightGrey,
                          opacity: 0.2
                        }
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.custom.lightGrey,
                      },
                    }}
                    placeholder="General Allowance"
                    value={formData.compensationDetails.generalAllowance}
                    onChange={(e) => handleChange(e, 'compensationDetails', 'generalAllowance')}
                  />
                </TableCell>
              </TableRow>
              {/** row for Daily and Hourly Gross Rate */}
              <TableRow sx={{ py: 0, my: 0 }}>
                <TableCell sx={{ paddingTop: 2, paddingBottom: 0, width: "30%", px: 1, borderBottom: "none" }}>
                  <TextField
                    fullWidth
                    sx={{
                      py: 0,
                      "& .MuiInputBase-input::placeholder": {
                        color: theme.palette.custom.lightGrey,
                        opacity: 2,
                        fontSize: "0.875rem"
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.custom.lightGrey,
                          opacity: 0.2
                        }
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.custom.lightGrey,
                      },
                    }}
                    placeholder="Daily Gross Rate"
                    value={formData.compensationDetails.dailyGrossRate}
                    onChange={(e) => handleChange(e, 'compensationDetails', 'dailyGrossRate')}
                  />
                </TableCell>
                <TableCell sx={{ paddingTop: 2, paddingBottom: 0, width: "30%", px: 1, borderBottom: "none" }}>
                  <TextField
                    fullWidth
                    sx={{
                      py: 0,
                      "& .MuiInputBase-input::placeholder": {
                        color: theme.palette.custom.lightGrey,
                        opacity: 2,
                        fontSize: "0.875rem"
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.custom.lightGrey,
                          opacity: 0.2
                        }
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.custom.lightGrey,
                      },
                    }}
                    placeholder="Hourly Gross Rate"
                    value={formData.compensationDetails.hourlyGrossRate}
                    onChange={(e) => handleChange(e, 'compensationDetails', 'hourlyGrossRate')}
                  />
                </TableCell>
              </TableRow>
              {/** row for Holiday Pay and Overtime Rate */}
              <TableRow sx={{ py: 0, my: 0 }}>
                <TableCell sx={{ paddingTop: 2, paddingBottom: 0, width: "30%", px: 1, borderBottom: "none" }}>
                  <TextField
                    fullWidth
                    sx={{
                      py: 0,
                      "& .MuiInputBase-input::placeholder": {
                        color: theme.palette.custom.lightGrey,
                        opacity: 2,
                        fontSize: "0.875rem"
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.custom.lightGrey,
                          opacity: 0.2
                        }
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.custom.lightGrey,
                      },
                    }}
                    placeholder="Holiday Pay Rate"
                    value={formData.compensationDetails.holidayPayRate}
                    onChange={(e) => handleChange(e, 'compensationDetails', 'holidayPayRate')}
                  />
                </TableCell>
                <TableCell sx={{ paddingTop: 2, paddingBottom: 0, width: "30%", px: 1, borderBottom: "none" }}>
                  <TextField
                    fullWidth
                    sx={{
                      py: 0,
                      "& .MuiInputBase-input::placeholder": {
                        color: theme.palette.custom.lightGrey,
                        opacity: 2,
                        fontSize: "0.875rem"
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.custom.lightGrey,
                          opacity: 0.2
                        }
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.custom.lightGrey,
                      },
                    }}
                    placeholder="Overtime Rate"
                    value={formData.compensationDetails.overtimeRate}
                    onChange={(e) => handleChange(e, 'compensationDetails', 'overtimeRate')}
                  />
                </TableCell>
              </TableRow>
              {/** row for Cancelled Off and Absences Rate*/}
              <TableRow sx={{ py: 0, my: 0 }}>
                <TableCell sx={{ paddingTop: 2, paddingBottom: 0, width: "30%", px: 1, borderBottom: "none" }}>
                  <TextField
                    fullWidth
                    sx={{
                      py: 0,
                      "& .MuiInputBase-input::placeholder": {
                        color: theme.palette.custom.lightGrey,
                        opacity: 2,
                        fontSize: "0.875rem"
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.custom.lightGrey,
                          opacity: 0.2
                        }
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.custom.lightGrey,
                      },
                    }}
                    placeholder="Cancelled Off Rate"
                    value={formData.compensationDetails.cancelledOffRate}
                    onChange={(e) => handleChange(e, 'compensationDetails', 'cancelledOffRate')}
                  />
                </TableCell>
                <TableCell sx={{ paddingTop: 2, paddingBottom: 0, width: "30%", px: 1, borderBottom: "none" }}>
                  <TextField
                    fullWidth
                    sx={{
                      py: 0,
                      "& .MuiInputBase-input::placeholder": {
                        color: theme.palette.custom.lightGrey,
                        opacity: 2,
                        fontSize: "0.875rem"
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.custom.lightGrey,
                          opacity: 0.2
                        }
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.custom.lightGrey,
                      },
                    }}
                    placeholder="Absences Rate"
                    value={formData.compensationDetails.absencesRate}
                    onChange={(e) => handleChange(e, 'compensationDetails', 'absencesRate')}
                  />
                </TableCell>
              </TableRow>
              {/** row for Vacation and Sick Leave*/}
              <TableRow sx={{ py: 0, my: 0 }}>
                <TableCell sx={{ paddingTop: 2, paddingBottom: 0, width: "30%", px: 1, borderBottom: "none" }}>
                  <TextField
                    fullWidth
                    sx={{
                      py: 0,
                      "& .MuiInputBase-input::placeholder": {
                        color: theme.palette.custom.lightGrey,
                        opacity: 2,
                        fontSize: "0.875rem"
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.custom.lightGrey,
                          opacity: 0.2
                        }
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.custom.lightGrey,
                      },
                    }}
                    placeholder="Vacation Leave"
                    value={formData.compensationDetails.vacationLeave}
                    onChange={(e) => handleChange(e, 'compensationDetails', 'vacationLeave')}
                  />
                </TableCell>
                <TableCell sx={{ paddingTop: 2, paddingBottom: 0, width: "30%", px: 1, borderBottom: "none" }}>
                  <TextField
                    fullWidth
                    sx={{
                      py: 0,
                      "& .MuiInputBase-input::placeholder": {
                        color: theme.palette.custom.lightGrey,
                        opacity: 2,
                        fontSize: "0.875rem"
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.custom.lightGrey,
                          opacity: 0.2
                        }
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.custom.lightGrey,
                      },
                    }}
                    placeholder="Sick Leave"
                    value={formData.compensationDetails.sickLeave}
                    onChange={(e) => handleChange(e, 'compensationDetails', 'sickLeave')}
                  />
                </TableCell>
              </TableRow>
              {/** row for Maternity and Bereavement Leave*/}
              <TableRow sx={{ py: 0, my: 0 }}>
                <TableCell sx={{ paddingTop: 2, paddingBottom: 0, width: "30%", px: 1, borderBottom: "none" }}>
                  <TextField
                    fullWidth
                    sx={{
                      py: 0,
                      "& .MuiInputBase-input::placeholder": {
                        color: theme.palette.custom.lightGrey,
                        opacity: 2,
                        fontSize: "0.875rem"
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.custom.lightGrey,
                          opacity: 0.2
                        }
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.custom.lightGrey,
                      },
                    }}
                    placeholder="Bereavement Leave"
                    value={formData.compensationDetails.bereavementLeave}
                    onChange={(e) => handleChange(e, 'compensationDetails', 'bereavementLeave')}
                  />
                </TableCell>
                <TableCell sx={{ paddingTop: 2, paddingBottom: 0, width: "30%", px: 1, borderBottom: "none" }}>
                  <TextField
                    fullWidth
                    sx={{
                      py: 0,
                      "& .MuiInputBase-input::placeholder": {
                        color: theme.palette.custom.lightGrey,
                        opacity: 2,
                        fontSize: "0.875rem"
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.custom.lightGrey,
                          opacity: 0.2
                        }
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.custom.lightGrey,
                      },
                    }}
                    placeholder="Maternity Leave"
                    value={formData.compensationDetails.maternityLeave}
                    onChange={(e) => handleChange(e, 'compensationDetails', 'maternityLeave')}
                  />
                </TableCell>
              </TableRow>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
      <Divider sx={{ my: 2 }} />
      <DialogActions sx={{ paddingBottom: 2, paddingTop: 1 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading || isSubmitting || !validateForm()}
          sx={{ right: 38, }}
        >

          {isSubmitting ? (
            <>
              <CircularProgress size={20} sx={{ marginRight: 1 }} />
              Loading...
            </>
          ) : (
            <>
              <img
                src={saveIcon}
                alt="Save Employee Record"
                style={{ width: 20, height: 20, }}

              />
              Save Employee
            </>
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEmployeeModal;
