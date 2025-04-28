import React, { forwardRef, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Tabs,
  Tab,
  Chip,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  MenuItem,
  FormControl,
  Select,
  TextField,
  InputAdornment,
  IconButton
} from "@mui/material";
import { calculatePersonalProfileAge, formatUIDisplayDate, formatDecimalValue } from "../../shared/utils/dateAndNumberUtils";
import { ArrowBack, Circle, Clear } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useEmployeeEdit from "../hooks/useEditEmployee";
import separatorIcon from "../../shared/assets/icon/vertical-line-separator.png";
import personalInfoSelectedIcon from "../../shared/assets/icon/personal-info-selected-icon.png";
import personalInfoIcon from "../../shared/assets/icon/personal-info-icon.png";
import compensationIcon from "../../shared/assets/icon/compensation-details-icon.png";
import compensationSelectedIcon from "../../shared/assets/icon/compensation-details-selected-icon.png";
import employmentDetailsIcon from "../../shared/assets/icon/employee-details-icon.png";
import employmentDetailsSelectedIcon from "../../shared/assets/icon/employee-details-selected-icon.png";
import historyIcon from "../../shared/assets/icon/history-icon.png";
import historySelectedIcon from "../../shared/assets/icon/history-selected-icon.png";
import dateIcon from "../../shared/assets/icon/date-icon.png";
import typeIcon from "../../shared/assets/icon/type-icon.png";
import fieldNameIcon from "../../shared/assets/icon/field-name-icon.png";
import prevValueIcon from "../../shared/assets/icon/prev-value-icon.png";
import updatedValueIcon from "../../shared/assets/icon/updated-value-icon.png";
import editIcon from "../../shared/assets/icon/edit-icon.png";
import cancelIcon from "../../shared/assets/icon/cancel-icon.png";
import saveIcon from "../../shared/assets/icon/save-icon.png";
import calendarIcon from "../../shared/assets/icon/calendar-icon.png"
import { formatHistoryValue } from "../utils/employeeUtils";
import useAllEmployeeData from "../hooks/useAllEmployeeData";
import SearchableDropdown from "./SearchableDropdown";
import LoadingOverlay from "../../shared/components/LoadingOverlay";


const EmployeePersonalInfo = ({ employee, fetchEmployeeData }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const {
    activeTab,
    isEditing,
    formData,
    editedData,
    loading,
    handleTabChange,
    handleSelect,
    handleChange,
    handleEdit,
    handleSave,
    handleCancel,
  } = useEmployeeEdit(employee, fetchEmployeeData);

  const personalInfo = employee.personalInformation;
  const employmentDetails = employee.employmentDetails;
  const compensationDetails = employee.compensationDetails;
  const UI_DATE_FORMAT = 'MMMM dd, yyyy';

  const { uniqueRole, setUniqueRole, uniqueBranch, setUniqueBranch, uniqueDepartment, setUniqueDepartment } = useAllEmployeeData();
  const [roles, setRoles] = useState(uniqueRole);
  const [branches, setBranches] = useState(uniqueBranch);
  const [departments, setDepartments] = useState(uniqueDepartment);

  useEffect(() => {
    setRoles(uniqueRole);
    setBranches(uniqueBranch);
    setDepartments(uniqueDepartment);
  }, [uniqueRole, uniqueBranch, uniqueDepartment]);

  const uniformFieldStyle = {
    width: { xs: "200px", md: "350px", lg: "536px", xl: "608px" },
    minWidth: { xs: "200px", md: "350px", lg: "536px", xl: "608px" },
    maxWidth: { xs: "200px", md: "350px", lg: "536px", xl: "608px" },
  };


  const CustomDateInput = forwardRef(({ value, onClick, placeholder, onClear = () => { } }, ref) => (
    <TextField
      variant="outlined"
      fullWidth
      value={value || ""}
      onClick={onClick}
      ref={ref}
      placeholder={placeholder}
      sx={{
        ...uniformFieldStyle,
        backgroundColor: theme.palette.custom.white,
        borderRadius: theme.spacing(1),
        "& .MuiOutlinedInput-root": {
          boxShadow: "none",
          "&:hover": {
            backgroundColor: theme.palette.custom.white,
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: `1px solid ${theme.palette.custom.greyBorder} !important`,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
            borderWidth: "1px !important",
            boxShadow: "none !important",
          },
        },
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
                alt="calendar icon"
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

  useEffect(() => {
    console.log("formData updated:", formData);
  }, [formData]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "transparent",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 4,
        overflow: "hidden",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "90%",
          maxWidth: 1400,
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            onClick={() => navigate('/employee/all')}
            sx={{
              backgroundColor: theme.palette.custom.white,
              borderRadius: "30px",
              minWidth: 0,
              width: 40,
              height: 40,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 0,
              marginRight: theme.spacing(3),
              marginLeft: 0
            }}>
            <ArrowBack
              sx={{
                color: theme.palette.custom.darkBrown,
                fontSize: theme.icons.icon3,
                fontWeight: 600,
                padding: 0,
                margin: 0
              }}
            />
          </Button>
          <Avatar
            alt={personalInfo.employeeName}
            src={`/assets/avatar/${employee.employeeId}.png`}
            sx={{ width: 64, height: 64, mr: 2 }}
          />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {personalInfo.employeeName || "N/A"}
            </Typography>
            <Chip
              label={employee.employmentDetails.status || "Unknown"}
              icon={<Circle sx={{
                fontSize: theme.icons.icon1,
                color: theme.palette.custom.white
              }} />}
              size="small"
              sx={{
                mt: 1,
                backgroundColor: employee.employmentDetails.status === "Active" ?
                  theme.palette.custom.green : theme.palette.custom.red,
                color: theme.palette.custom.white,
                '& .MuiChip-icon': {
                  color: theme.palette.custom.white,
                  fontSize: theme.icons.icon2
                }
              }}
            />
          </Box>
          <img
            src={separatorIcon}
            alt="Separator"
            style={{ height: 40, width: "auto", paddingRight: 30, paddingLeft: 30 }}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="sm3"
              sx={{ color: theme.palette.custom.lightGrey, marginBottom: 1 }}>
              Employee ID:
            </Typography>
            <Typography
              variant="md1"
              sx={{ color: theme.palette.custom.darkGrey }}>
              {employee.employeeId || "N/A"}
            </Typography>
          </Box>
        </Box>

      </Box>

      {/* Tabs Section */}
      <Box sx={{ width: "90%", maxWidth: 1400, borderBottom: 1, borderColor: theme.palette.custom.darkBrown, marginBottom: 0, paddingBottom: 0 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            marginBottom: 0,
            paddingBottom: 0,
            '& .MuiTab-root': {
              color: theme.palette.custom.brown, // Default color
              '&:hover': {
                color: theme.palette.custom.darkBrown, // Hover color
              },
              '&.Mui-selected': {
                color: theme.palette.custom.darkBrown, // Active tab color
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: theme.palette.custom.darkBrown,
            },
          }}
        >
          <Tab
            disableRipple
            label="Personal Information"
            icon={
              <img
                src={activeTab === 0 ? personalInfoSelectedIcon : personalInfoIcon}
                alt="Personal Information"
                style={{ width: 24, height: 24 }}
              />
            }
            iconPosition="start"
            sx={{
              paddingLeft: 1,
              paddingRight: 1,
              width: "25%",
              display: 'flex',
              justifyContent: 'center',
              fontSize: 20,
              textTransform: "capitalize"
            }}
          />
          <Tab
            disableRipple
            label="Employee Details"
            icon={
              <img
                src={activeTab === 1 ? employmentDetailsSelectedIcon : employmentDetailsIcon}
                alt="Employment Details"
                style={{ width: 24, height: 24 }}
              />
            }
            iconPosition="start"
            sx={{
              paddingLeft: 1,
              paddingRight: 1,
              width: "25%",
              display: 'flex',
              justifyContent: 'center',
              fontSize: 20,
              textTransform: "capitalize"
            }}
          />
          <Tab
            disableRipple
            label="Compensation Details"
            icon={
              <img
                src={activeTab === 2 ? compensationSelectedIcon : compensationIcon}
                alt="Compensation Details"
                style={{ width: 24, height: 24 }}
              />
            }
            iconPosition="start"
            sx={{
              paddingLeft: 1,
              paddingRight: 1,
              width: "25%",
              display: 'flex',
              justifyContent: 'center',
              fontSize: 20,
              textTransform: "capitalize",
            }}
          />
          <Tab
            disableRipple
            label="History"
            icon={
              <img
                src={activeTab === 3 ? historySelectedIcon : historyIcon}
                alt="History"
                style={{ width: 20, height: 20 }}
              />
            }
            iconPosition="start"
            sx={{
              paddingLeft: 1,
              paddingRight: 1,
              width: "25%",
              display: 'flex',
              justifyContent: 'center',
              textTransform: "capitalize",
              fontSize: 20
            }}
          />
        </Tabs>

      </Box>

      {/* Content Section */}
      <Paper
        sx={{
          width: "90%",
          maxWidth: 1400,
          bgcolor: "#FAFBFB",
          borderRadius: 2,
          border: "1px solid #BDBDBD",
          boxShadow: "1px 1px 10px rgba(175, 136, 98, 0.25)",
          padding: 0,
          margin: 2,
          overflow: "hidden",
        }}
        elevation={0}
      >
        {activeTab === 0 && (
          <Box sx={{ px: 3, paddingBottom: 3, paddingTop: 0, height: "calc(100vh - 260px)", overflowY: "auto", overflowX: "hidden" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ padding: 3, position: "sticky", top: 0, zIndex: 1000, backgroundColor: "#FAFBFB" }}>
                  <TableCell colSpan={2} sx={{ borderBottom: "none", paddingBottom: 0, marginBottom: 0, }}>
                    <Box sx={{ display: "flex", gap: 1, justifyContent: "right" }}>
                      {!isEditing && (
                        <Button sx={{ backgroundColor: theme.palette.custom.white, borderRadius: "8px", px: 2 }} onClick={handleEdit}>
                          <img
                            src={editIcon}
                            alt="Edit"
                            style={{ height: 20, width: 20 }}
                          />
                          <Typography variant="sm3" sx={{ color: theme.palette.custom.darkBrown }}>
                            Edit
                          </Typography>
                        </Button>
                      )}
                      {isEditing && (
                        <>
                          <Button sx={{ backgroundColor: theme.palette.custom.white, borderRadius: "8px", px: 3 }}
                            onClick={handleSave}>
                            <img
                              src={saveIcon}
                              alt="Save"
                              style={{ height: 20, width: 20 }}
                            />
                            <Typography variant="sm3" sx={{ color: theme.palette.custom.darkBrown }}>
                              Save
                            </Typography>
                          </Button>
                          <Button sx={{ backgroundColor: theme.palette.custom.white, borderRadius: "8px", px: 2 }} onClick={handleCancel}>
                            <img
                              src={cancelIcon}
                              alt="Cancel"
                              style={{ height: 20, width: 20 }}
                            />
                            <Typography variant="sm3" sx={{ color: theme.palette.custom.darkBrown }}>
                              Cancel
                            </Typography>
                          </Button>
                        </>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Full Name & Gender */}
                <TableRow sx={{ borderBottom: `2px solid ${theme.palette.custom.greyBorder}` }}>
                  <TableCell sx={{ width: "50%", minWidth: "200px", maxWidth: "100%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Full Name
                    </Typography>
                    <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                      {personalInfo.employeeName || "N/A"}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ width: "50%", minWidth: "200px", maxWidth: "100%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Gender
                    </Typography>

                    {!isEditing ? (
                      <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                        {personalInfo.gender || "N/A"}
                      </Typography>
                    ) : (
                      <FormControl
                        fullWidth
                        variant="outlined"
                        sx={{
                          ...uniformFieldStyle,
                          py: 0,
                          backgroundColor: theme.palette.custom.white,
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
                          },
                        }}
                      >
                        <Select
                          labelId="gender-label"
                          value={editedData.personalInformation?.gender || ""}
                          onChange={(e) => handleChange(e.target.value, "personalInformation", "gender")}
                          displayEmpty
                          sx={{
                            "& .MuiSelect-select": {
                              color: editedData.personalInformation?.gender ? "rgba(0, 0, 0, 0.87)" : theme.palette.custom.lightGrey,
                              fontSize: "0.875rem",
                            },
                          }}
                        >
                          <MenuItem value="" disabled>
                            Select Gender
                          </MenuItem>
                          <MenuItem value="Male">Male</MenuItem>
                          <MenuItem value="Female">Female</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  </TableCell>

                </TableRow>

                {/* Date of Birth & Age */}
                <TableRow sx={{ borderBottom: `2px solid ${theme.palette.custom.greyBorder}` }}>
                  <TableCell sx={{ width: "50%", minWidth: "200px", maxWidth: "100%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Date of Birth
                    </Typography>
                    {!isEditing ? (
                      <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                        {formatUIDisplayDate(personalInfo.dateOfBirth, UI_DATE_FORMAT)}
                      </Typography>
                    ) : (
                      <DatePicker
                        selected={
                          formData.personalInformation.dateOfBirth
                            ? new Date(formData.personalInformation.dateOfBirth.split("-").reverse().join("-"))
                            : null
                        }
                        onChange={(date) => handleChange(date, "personalInformation", "dateOfBirth")}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select Date of Birth"
                        customInput={
                          <CustomDateInput
                            value={formData.personalInformation.dateOfBirth || ""}
                            onClear={() => handleChange(null, "personalInformation", "dateOfBirth")}
                          />}
                      />
                    )}
                  </TableCell>
                  <TableCell sx={{ width: "50%", minWidth: "200px", maxWidth: "100%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Age
                    </Typography>
                    <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                      {calculatePersonalProfileAge(personalInfo.dateOfBirth)}
                    </Typography>
                  </TableCell>
                </TableRow>

                {/* Contact Number & Email Address */}
                <TableRow sx={{ borderBottom: `2px solid ${theme.palette.custom.greyBorder}` }}>
                  <TableCell sx={{ width: "50%", minWidth: "200px", maxWidth: "100%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Contact Number
                    </Typography>
                    {!isEditing ? (
                      <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                        {personalInfo.contactNumber || "N/A"}
                      </Typography>
                    ) : (
                      <Box>
                        <TextField
                          fullWidth
                          sx={{
                            ...uniformFieldStyle,
                            py: 0,
                            backgroundColor: theme.palette.custom.white,
                            borderRadius: theme.spacing(1),
                            "& .MuiInputBase-input::placeholder": {
                              color: theme.palette.custom.lighterGrey,
                              opacity: 1,
                              fontSize: "0.875rem",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.greyBorder} !important`,
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                            },
                          }}
                          placeholder="Contact Number"
                          value={formData.personalInformation.contactNumber}
                          onChange={(e) => handleChange(e.target.value, 'personalInformation', 'contactNumber')}
                        />
                      </Box>
                    )}
                  </TableCell>
                  <TableCell sx={{ width: "50%", minWidth: "200px", maxWidth: "100%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Email Address
                    </Typography>
                    {!isEditing ? (
                      <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                        {personalInfo.emailAddress || "N/A"}
                      </Typography>
                    ) : (
                      <Box>
                        <TextField
                          fullWidth
                          sx={{
                            ...uniformFieldStyle,
                            py: 0,
                            backgroundColor: theme.palette.custom.white,
                            borderRadius: theme.spacing(1),
                            "& .MuiInputBase-input::placeholder": {
                              color: theme.palette.custom.lighterGrey,
                              opacity: 1,
                              fontSize: "0.875rem",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.greyBorder} !important`,
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                            },
                          }}
                          placeholder="Email Address"
                          value={formData.personalInformation.emailAddress}
                          onChange={(e) => handleChange(e.target.value, 'personalInformation', 'emailAddress')}
                        />
                      </Box>
                    )}
                  </TableCell>
                </TableRow>

                {/* Full-width row for Address */}
                <TableRow sx={{ borderBottom: `2px solid ${theme.palette.custom.greyBorder}` }}>
                  <TableCell colSpan={2}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Address
                    </Typography>
                    {!isEditing ? (
                      <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                        {personalInfo.address || "N/A"}
                      </Typography>
                    ) : (
                      <Box>
                        <TextField
                          fullWidth
                          sx={{
                            py: 0,
                            backgroundColor: theme.palette.custom.white,
                            borderRadius: theme.spacing(1),
                            "& .MuiInputBase-input::placeholder": {
                              color: theme.palette.custom.lighterGrey,
                              opacity: 1,
                              fontSize: "0.875rem",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.greyBorder} !important`,
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                            },
                          }}
                          placeholder="Address"
                          value={formData.personalInformation.address}
                          onChange={(e) => handleChange(e.target.value, 'personalInformation', 'address')}
                        />
                      </Box>
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        )}

        {activeTab === 1 && (
          <Box sx={{ px: 3, paddingBottom: 3, paddingTop: 0, minHeight: 0, maxHeight: "calc(100vh - 260px)", overflowY: "auto", overflowX: "hidden" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ padding: 3, position: "sticky", top: 0, zIndex: 1000, backgroundColor: "#FAFBFB" }}>
                  <TableCell colSpan={2} sx={{ borderBottom: "none", paddingBottom: 0, marginBottom: 0, }}>
                    <Box sx={{ display: "flex", gap: 1, justifyContent: "right" }}>
                      {!isEditing && (
                        <Button sx={{ backgroundColor: theme.palette.custom.white, borderRadius: "8px", px: 2 }} onClick={handleEdit}>
                          <img
                            src={editIcon}
                            alt="Edit"
                            style={{ height: 20, width: 20 }}
                          />
                          <Typography variant="sm3" sx={{ color: theme.palette.custom.darkBrown }}>
                            Edit
                          </Typography>
                        </Button>
                      )}
                      {isEditing && (
                        <>
                          <Button sx={{ backgroundColor: theme.palette.custom.white, borderRadius: "8px", px: 3 }}
                            onClick={handleSave}>
                            <img
                              src={saveIcon}
                              alt="Save"
                              style={{ height: 20, width: 20 }}
                            />
                            <Typography variant="sm3" sx={{ color: theme.palette.custom.darkBrown }}>
                              Save
                            </Typography>
                          </Button>
                          <Button sx={{ backgroundColor: theme.palette.custom.white, borderRadius: "8px", px: 2 }} onClick={handleCancel}>
                            <img
                              src={cancelIcon}
                              alt="Cancel"
                              style={{ height: 20, width: 20 }}
                            />
                            <Typography variant="sm3" sx={{ color: theme.palette.custom.darkBrown }}>
                              Cancel
                            </Typography>
                          </Button>
                        </>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Job Status & Role */}
                <TableRow sx={{ borderBottom: `2px solid ${theme.palette.custom.greyBorder}` }}>
                  <TableCell sx={{ width: "50%", minWidth: "200px", maxWidth: "100%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Status
                    </Typography>
                    {!isEditing ? (
                      <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                        {employmentDetails.status || "N/A"}
                      </Typography>
                    ) : (
                      <FormControl
                        fullWidth
                        variant="outlined"
                        sx={{
                          ...uniformFieldStyle,
                          py: 0,
                          backgroundColor: theme.palette.custom.white,
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
                          },
                        }}
                      >
                        <Select
                          labelId="status-label"
                          value={editedData.employmentDetails?.status || ""}
                          onChange={(e) => handleChange(e.target.value, "employmentDetails", "status")}
                          displayEmpty
                          sx={{
                            "& .MuiSelect-select": {
                              color: editedData.employmentDetails?.status ? "rgba(0, 0, 0, 0.87)" : theme.palette.custom.lightGrey,
                              fontSize: "0.875rem",
                            },
                          }}
                        >
                          <MenuItem value="" disabled>
                            Select Status
                          </MenuItem>
                          <MenuItem value="Active">Active</MenuItem>
                          <MenuItem value="Inactive">Inactive</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  </TableCell>
                  <TableCell sx={{ width: "50%", minWidth: "200px", maxWidth: "100%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Role
                    </Typography>
                    {!isEditing ? (
                      <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                        {employmentDetails.role || "N/A"}
                      </Typography>
                    ) : (
                      <FormControl
                        fullWidth
                        variant="outlined"
                        sx={{
                          ...uniformFieldStyle,
                          py: 0,
                          backgroundColor: theme.palette.custom.white,
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
                          },
                        }}
                      >
                        <SearchableDropdown
                          placeholder={employmentDetails.role}
                          options={roles}
                          value={editedData.employmentDetails.role}
                          onSelect={(value) => {
                            handleSelect("role", value);
                            if (!roles.includes(value)) {
                              const updatedRoles = [...roles, value];
                              setRoles(updatedRoles);
                              setUniqueRole(updatedRoles);
                            }
                          }}
                          allowAddNew={true}
                        />

                      </FormControl>
                    )}
                  </TableCell>
                </TableRow>

                {/* Department & Branch */}
                <TableRow sx={{ borderBottom: `2px solid ${theme.palette.custom.greyBorder}` }}>
                  <TableCell sx={{ width: "50%", minWidth: "200px", maxWidth: "100%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Department
                    </Typography>
                    {!isEditing ? (
                      <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                        {employmentDetails.department || "N/A"}
                      </Typography>
                    ) : (
                      <FormControl
                        fullWidth
                        variant="outlined"
                        sx={{
                          ...uniformFieldStyle,
                          py: 0,
                          backgroundColor: theme.palette.custom.white,
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
                          },
                        }}
                      >
                        <SearchableDropdown
                          placeholder={employmentDetails.department}
                          options={departments}
                          value={editedData.employmentDetails.department}
                          onSelect={(value) => {
                            handleSelect("department", value);
                            if (!departments.includes(value)) {
                              const updatedDepartment = [...departments, value];
                              setDepartments(updatedDepartment);
                              setUniqueDepartment(updatedDepartment);
                            }
                          }}
                          allowAddNew={true}
                        />

                      </FormControl>
                    )}
                  </TableCell>
                  <TableCell sx={{ width: "50%", minWidth: "200px", maxWidth: "100%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Branch
                    </Typography>
                    {!isEditing ? (
                      <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                        {employmentDetails.branch || "N/A"}
                      </Typography>
                    ) : (
                      <FormControl
                        fullWidth
                        variant="outlined"
                        sx={{
                          ...uniformFieldStyle,
                          py: 0,
                          backgroundColor: theme.palette.custom.white,
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
                          },
                        }}
                      >
                        <SearchableDropdown
                          placeholder={employmentDetails.branch}
                          options={branches}
                          value={editedData.employmentDetails.branch}
                          onSelect={(value) => {
                            handleSelect("branch", value);
                            if (!branches.includes(value)) {
                              const updatedBranch = [...branches, value];
                              setBranches(updatedBranch);
                              setUniqueBranch(updatedBranch);
                            }
                          }}
                          allowAddNew={true}
                        />

                      </FormControl>
                    )}
                  </TableCell>
                </TableRow>

                {/* Job Offer Date & MOL*/}
                <TableRow sx={{ borderBottom: `2px solid ${theme.palette.custom.greyBorder}` }}>
                  <TableCell sx={{ width: "50%", minWidth: "200px", maxWidth: "100%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Job Offer Date
                    </Typography>
                    {!isEditing ? (
                      <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                        {formatUIDisplayDate(employmentDetails.jobOfferDate, UI_DATE_FORMAT) || "NA"}
                      </Typography>
                    ) : (
                      <DatePicker
                        selected={
                          formData.employmentDetails.jobOfferDate
                            ? new Date(formData.employmentDetails.jobOfferDate.split("-").reverse().join("-"))
                            : null
                        }
                        onChange={(date) => handleChange(date, "employmentDetails", "jobOfferDate")}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select Job Offer Date"
                        customInput={
                          <CustomDateInput
                            value={formData.employmentDetails.jobOfferDate || ""}
                            onClear={() => handleChange(null, "employmentDetails", "jobOfferDate")}
                          />}
                      />
                    )}
                  </TableCell>
                  <TableCell sx={{ width: "50%", minWidth: "200px", maxWidth: "100%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      MOL
                    </Typography>
                    {!isEditing ? (
                      <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                        {employmentDetails.mol || "N/A"}
                      </Typography>
                    ) : (
                      <Box>
                        <TextField
                          fullWidth
                          sx={{
                            ...uniformFieldStyle,
                            py: 0,
                            backgroundColor: theme.palette.custom.white,
                            borderRadius: theme.spacing(1),
                            "& .MuiInputBase-input::placeholder": {
                              color: theme.palette.custom.lighterGrey,
                              opacity: 1,
                              fontSize: "0.875rem",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.greyBorder} !important`,
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                            },
                          }}
                          placeholder="MOL"
                          value={formData.employmentDetails.mol}
                          onChange={(e) => handleChange(e.target.value, 'employmentDetails', 'mol')}
                        />
                      </Box>
                    )}
                  </TableCell>
                </TableRow>

                {/* Passport Number & Date of Passport Expiry */}
                <TableRow sx={{ borderBottom: `2px solid ${theme.palette.custom.greyBorder}` }}>
                  <TableCell sx={{ width: "50%", minWidth: "200px", maxWidth: "100%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Passport Number
                    </Typography>
                    {!isEditing ? (
                      <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                        {employmentDetails.passportNumber || "N/A"}
                      </Typography>
                    ) : (
                      <Box>
                        <TextField
                          fullWidth
                          sx={{
                            ...uniformFieldStyle,
                            py: 0,
                            backgroundColor: theme.palette.custom.white,
                            borderRadius: theme.spacing(1),
                            "& .MuiInputBase-input::placeholder": {
                              color: theme.palette.custom.lighterGrey,
                              opacity: 1,
                              fontSize: "0.875rem",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.greyBorder} !important`,
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                            },
                          }}
                          placeholder="Passport Number"
                          value={formData.employmentDetails.passportNumber}
                          onChange={(e) => handleChange(e.target.value, 'employmentDetails', 'passportNumber')}
                        />
                      </Box>
                    )}
                  </TableCell>
                  <TableCell sx={{ width: "50%", minWidth: "200px", maxWidth: "100%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Passport Validity Date
                    </Typography>
                    {!isEditing ? (
                      <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                        {formatUIDisplayDate(employmentDetails.passportValidity, UI_DATE_FORMAT) || "NA"}
                      </Typography>
                    ) : (
                      <DatePicker
                        selected={
                          formData.employmentDetails.passportValidity
                            ? new Date(formData.employmentDetails.passportValidity.split("-").reverse().join("-"))
                            : null
                        }
                        onChange={(date) => handleChange(date, "employmentDetails", "passportValidity")}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select Passport Validity Date"
                        customInput={
                          <CustomDateInput
                            value={formData.employmentDetails.passportValidity || ""}
                            onClear={() => handleChange(null, "employmentDetails", "passportValidity")}
                          />}
                      />
                    )}
                  </TableCell>
                </TableRow>

                {/* Emirates ID Number & Emirates ID Validity */}
                <TableRow sx={{ borderBottom: `2px solid ${theme.palette.custom.greyBorder}` }}>
                  <TableCell sx={{ width: "50%", minWidth: "200px", maxWidth: "100%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Emirates ID Number
                    </Typography>
                    {!isEditing ? (
                      <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                        {employmentDetails.emiratesIdNumber || "N/A"}
                      </Typography>
                    ) : (
                      <Box>
                        <TextField
                          fullWidth
                          sx={{
                            ...uniformFieldStyle,
                            py: 0,
                            backgroundColor: theme.palette.custom.white,
                            borderRadius: theme.spacing(1),
                            "& .MuiInputBase-input::placeholder": {
                              color: theme.palette.custom.lighterGrey,
                              opacity: 1,
                              fontSize: "0.875rem",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.greyBorder} !important`,
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                            },
                          }}
                          placeholder="Emirates ID Number"
                          value={formData.employmentDetails.emiratesIdNumber}
                          onChange={(e) => handleChange(e.target.value, 'employmentDetails', 'emiratesIdNumber')}
                        />
                      </Box>
                    )}
                  </TableCell>
                  <TableCell sx={{ width: "50%", minWidth: "200px", maxWidth: "100%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Emirates ID Validity Date
                    </Typography>
                    {!isEditing ? (
                      <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                        {formatUIDisplayDate(employmentDetails.emiratesIdValidity, UI_DATE_FORMAT) || "NA"}
                      </Typography>
                    ) : (
                      <DatePicker
                        selected={
                          formData.employmentDetails.emiratesIdValidity
                            ? new Date(formData.employmentDetails.emiratesIdValidity.split("-").reverse().join("-"))
                            : null
                        }
                        onChange={(date) => handleChange(date, "employmentDetails", "emiratesIdValidity")}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select Emirates ID Validity Date"
                        customInput={
                          <CustomDateInput
                            value={formData.employmentDetails.emiratesIdValidity || ""}
                            onClear={() => handleChange(null, "employmentDetails", "emiratesIdValidity")}
                          />}
                      />
                    )}
                  </TableCell>
                </TableRow>


                {/* Person Code & Visa File Number */}
                <TableRow sx={{ borderBottom: `2px solid ${theme.palette.custom.greyBorder}` }}>
                  <TableCell sx={{ width: "50%", minWidth: "200px", maxWidth: "100%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Person Code
                    </Typography>
                    {!isEditing ? (
                      <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                        {employmentDetails.personCode || "N/A"}
                      </Typography>
                    ) : (
                      <Box>
                        <TextField
                          fullWidth
                          sx={{
                            ...uniformFieldStyle,
                            py: 0,
                            backgroundColor: theme.palette.custom.white,
                            borderRadius: theme.spacing(1),
                            "& .MuiInputBase-input::placeholder": {
                              color: theme.palette.custom.lighterGrey,
                              opacity: 1,
                              fontSize: "0.875rem",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.greyBorder} !important`,
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                            },
                          }}
                          placeholder="Person Code"
                          value={formData.employmentDetails.personCode}
                          onChange={(e) => handleChange(e.target.value, 'employmentDetails', 'personCode')}
                        />
                      </Box>
                    )}
                  </TableCell>
                  <TableCell sx={{ width: "50%", minWidth: "200px", maxWidth: "100%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Visa File Number
                    </Typography>
                    {!isEditing ? (
                      <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                        {employmentDetails.visaFileNumber || "N/A"}
                      </Typography>
                    ) : (
                      <Box>
                        <TextField
                          fullWidth
                          sx={{
                            ...uniformFieldStyle,
                            py: 0,
                            backgroundColor: theme.palette.custom.white,
                            borderRadius: theme.spacing(1),
                            "& .MuiInputBase-input::placeholder": {
                              color: theme.palette.custom.lighterGrey,
                              opacity: 1,
                              fontSize: "0.875rem",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.greyBorder} !important`,
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                            },
                          }}
                          placeholder="Visa File Number"
                          value={formData.employmentDetails.visaFileNumber}
                          onChange={(e) => handleChange(e.target.value, 'employmentDetails', 'visaFileNumber')}
                        />
                      </Box>
                    )}
                  </TableCell>
                </TableRow>

                {/* Visa UID Number & Date of Visa Validity */}
                <TableRow sx={{ borderBottom: `2px solid ${theme.palette.custom.greyBorder}` }}>
                  <TableCell sx={{ width: "50%", minWidth: "200px", maxWidth: "100%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Visa UID Number
                    </Typography>
                    {!isEditing ? (
                      <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                        {employmentDetails.visaUidNumber || "N/A"}
                      </Typography>
                    ) : (
                      <Box>
                        <TextField
                          fullWidth
                          sx={{
                            ...uniformFieldStyle,
                            py: 0,
                            backgroundColor: theme.palette.custom.white,
                            borderRadius: theme.spacing(1),
                            "& .MuiInputBase-input::placeholder": {
                              color: theme.palette.custom.lighterGrey,
                              opacity: 1,
                              fontSize: "0.875rem",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.greyBorder} !important`,
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                            },
                          }}
                          placeholder="Visa UID Number"
                          value={formData.employmentDetails.visaUidNumber}
                          onChange={(e) => handleChange(e.target.value, 'employmentDetails', 'visaUidNumber')}
                        />
                      </Box>
                    )}
                  </TableCell>
                  <TableCell sx={{ width: "50%", minWidth: "200px", maxWidth: "100%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Visa Renewal Date
                    </Typography>
                    {!isEditing ? (
                      <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                        {formatUIDisplayDate(employmentDetails.visaValidity, UI_DATE_FORMAT) || "NA"}
                      </Typography>
                    ) : (
                      <DatePicker
                        selected={
                          formData.employmentDetails.visaValidity
                            ? new Date(formData.employmentDetails.visaValidity.split("-").reverse().join("-"))
                            : null
                        }
                        onChange={(date) => handleChange(date, "employmentDetails", "visaValidity")}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select Visa Validity Date"
                        customInput={
                          <CustomDateInput
                            value={formData.employmentDetails.visaValidity || ""}
                            onClear={() => handleChange(null, "employmentDetails", "visaValidity")}
                          />}
                      />
                    )}
                  </TableCell>
                </TableRow>

                {/* Work Permit Number and Personal Number */}
                <TableRow sx={{ borderBottom: `2px solid ${theme.palette.custom.greyBorder}` }}>
                  <TableCell sx={{ width: "50%", minWidth: "200px", maxWidth: "100%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Work Permit Number
                    </Typography>
                    {!isEditing ? (
                      <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                        {employmentDetails.workPermitNumber || "N/A"}
                      </Typography>
                    ) : (
                      <Box>
                        <TextField
                          fullWidth
                          sx={{
                            ...uniformFieldStyle,
                            py: 0,
                            backgroundColor: theme.palette.custom.white,
                            borderRadius: theme.spacing(1),
                            "& .MuiInputBase-input::placeholder": {
                              color: theme.palette.custom.lighterGrey,
                              opacity: 1,
                              fontSize: "0.875rem",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.greyBorder} !important`,
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                            },
                          }}
                          placeholder="Work Permit Number"
                          value={formData.employmentDetails.workPermitNumber}
                          onChange={(e) => handleChange(e.target.value, 'employmentDetails', 'workPermitNumber')}
                        />
                      </Box>
                    )}
                  </TableCell>
                  <TableCell sx={{ width: "50%", minWidth: "200px", maxWidth: "100%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Personal Number
                    </Typography>
                    {!isEditing ? (
                      <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                        {employmentDetails.personalNumber || "N/A"}
                      </Typography>
                    ) : (
                      <Box>
                        <TextField
                          fullWidth
                          sx={{
                            ...uniformFieldStyle,
                            py: 0,
                            backgroundColor: theme.palette.custom.white,
                            borderRadius: theme.spacing(1),
                            "& .MuiInputBase-input::placeholder": {
                              color: theme.palette.custom.lighterGrey,
                              opacity: 1,
                              fontSize: "0.875rem",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.greyBorder} !important`,
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                            },
                          }}
                          placeholder="Personal Number"
                          value={formData.employmentDetails.personalNumber}
                          onChange={(e) => handleChange(e.target.value, 'employmentDetails', 'personalNumber')}
                        />
                      </Box>
                    )}
                  </TableCell>
                </TableRow>

                {/* Labour Card Validity */}
                <TableRow sx={{ borderBottom: `2px solid ${theme.palette.custom.greyBorder}` }}>
                  <TableCell sx={{ width: "50%", minWidth: "200px", maxWidth: "100%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Labour Card Validity Date
                    </Typography>
                    {!isEditing ? (
                      <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                        {formatUIDisplayDate(employmentDetails.labourCardValidity, UI_DATE_FORMAT) || "NA"}
                      </Typography>
                    ) : (
                      <DatePicker
                        selected={
                          formData.employmentDetails.labourCardValidity
                            ? new Date(formData.employmentDetails.labourCardValidity.split("-").reverse().join("-"))
                            : null
                        }
                        onChange={(date) => handleChange(date, "employmentDetails", "labourCardValidity")}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select Labour Card Validity Date"
                        customInput={
                          <CustomDateInput
                            value={formData.employmentDetails.labourCardValidity || ""}
                            onClear={() => handleChange(null, "employmentDetails", "labourCardValidity")}
                          />}
                      />
                    )}
                  </TableCell>
                </TableRow>

              </TableBody>
            </Table>
          </Box>
        )}

        {activeTab === 2 && (
          <Box sx={{ px: 3, paddingBottom: 3, paddingTop: 0, minHeight: 0, maxHeight: "calc(100vh - 260px)", overflowY: "auto", overflowX: "hidden" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ padding: 3, position: "sticky", top: 0, zIndex: 1000, backgroundColor: "#FAFBFB" }}>
                  <TableCell colSpan={2} sx={{ borderBottom: "none", paddingBottom: 0, marginBottom: 0, }}>
                    <Box sx={{ display: "flex", gap: 1, justifyContent: "right" }}>
                      {!isEditing && (
                        <Button sx={{ backgroundColor: theme.palette.custom.white, borderRadius: "8px", px: 2 }} onClick={handleEdit}>
                          <img
                            src={editIcon}
                            alt="Edit"
                            style={{ height: 20, width: 20 }}
                          />
                          <Typography variant="sm3" sx={{ color: theme.palette.custom.darkBrown }}>
                            Edit
                          </Typography>
                        </Button>
                      )}
                      {isEditing && (
                        <>
                          <Button sx={{ backgroundColor: theme.palette.custom.white, borderRadius: "8px", px: 3 }}
                            onClick={handleSave}>
                            <img
                              src={saveIcon}
                              alt="Save"
                              style={{ height: 20, width: 20 }}
                            />
                            <Typography variant="sm3" sx={{ color: theme.palette.custom.darkBrown }}>
                              Save
                            </Typography>
                          </Button>
                          <Button sx={{ backgroundColor: theme.palette.custom.white, borderRadius: "8px", px: 2 }} onClick={handleCancel}>
                            <img
                              src={cancelIcon}
                              alt="Cancel"
                              style={{ height: 20, width: 20 }}
                            />
                            <Typography variant="sm3" sx={{ color: theme.palette.custom.darkBrown }}>
                              Cancel
                            </Typography>
                          </Button>
                        </>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Salary Package and Basic Salary */}
                <TableRow sx={{ borderBottom: `2px solid ${theme.palette.custom.greyBorder}` }}>
                  <TableCell sx={{ width: "50%", minWidth: "200px", maxWidth: "100%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Salary Package
                    </Typography>
                    {!isEditing ? (
                      <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                        {`${formatDecimalValue(compensationDetails.salaryPackage)} AED`}
                      </Typography>
                    ) : (
                      <Box>
                        <TextField
                          fullWidth
                          sx={{
                            ...uniformFieldStyle,
                            py: 0,
                            backgroundColor: theme.palette.custom.white,
                            borderRadius: theme.spacing(1),
                            "& .MuiInputBase-input::placeholder": {
                              color: theme.palette.custom.lighterGrey,
                              opacity: 1,
                              fontSize: "0.875rem",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.greyBorder} !important`,
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                            },
                          }}
                          placeholder="Salary Package"
                          value={formData.compensationDetails.salaryPackage}
                          onChange={(e) => handleChange(e.target.value, 'compensationDetails', 'salaryPackage')}
                        />
                      </Box>
                    )}
                  </TableCell>
                  <TableCell sx={{ width: "50%", minWidth: "200px", maxWidth: "100%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Basic Salary
                    </Typography>
                    {!isEditing ? (
                      <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                        {`${formatDecimalValue(compensationDetails.basicSalary)} AED`}
                      </Typography>
                    ) : (
                      <Box>
                        <TextField
                          fullWidth
                          sx={{
                            ...uniformFieldStyle,
                            py: 0,
                            backgroundColor: theme.palette.custom.white,
                            borderRadius: theme.spacing(1),
                            "& .MuiInputBase-input::placeholder": {
                              color: theme.palette.custom.lighterGrey,
                              opacity: 1,
                              fontSize: "0.875rem",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.greyBorder} !important`,
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                            },
                          }}
                          placeholder="Basic Salary"
                          value={formData.compensationDetails.basicSalary}
                          onChange={(e) => handleChange(e.target.value, 'compensationDetails', 'basicSalary')}
                        />
                      </Box>
                    )}
                  </TableCell>
                </TableRow>

                {/* Accommodation and Transportation Allowance */}
                <TableRow sx={{ borderBottom: `2px solid ${theme.palette.custom.greyBorder}` }}>
                  <TableCell sx={{ width: "50%", minWidth: "200px", maxWidth: "100%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Accommodation Allowance
                    </Typography>
                    {!isEditing ? (
                      <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                        {`${formatDecimalValue(compensationDetails.accommodationAllowance)} AED`}
                      </Typography>
                    ) : (
                      <Box>
                        <TextField
                          fullWidth
                          sx={{
                            ...uniformFieldStyle,
                            py: 0,
                            backgroundColor: theme.palette.custom.white,
                            borderRadius: theme.spacing(1),
                            "& .MuiInputBase-input::placeholder": {
                              color: theme.palette.custom.lighterGrey,
                              opacity: 1,
                              fontSize: "0.875rem",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.greyBorder} !important`,
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                            },
                          }}
                          placeholder="Accommodation Allowance"
                          value={formData.compensationDetails.accommodationAllowance}
                          onChange={(e) => handleChange(e.target.value, 'compensationDetails', 'accommodationAllowance')}
                        />
                      </Box>
                    )}
                  </TableCell>
                  <TableCell sx={{ width: "50%", minWidth: "200px", maxWidth: "100%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Transportation Allowance
                    </Typography>
                    {!isEditing ? (
                      <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                        {`${formatDecimalValue(compensationDetails.transportationAllowance)} AED`}
                      </Typography>
                    ) : (
                      <Box>
                        <TextField
                          fullWidth
                          sx={{
                            ...uniformFieldStyle,
                            py: 0,
                            backgroundColor: theme.palette.custom.white,
                            borderRadius: theme.spacing(1),
                            "& .MuiInputBase-input::placeholder": {
                              color: theme.palette.custom.lighterGrey,
                              opacity: 1,
                              fontSize: "0.875rem",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.greyBorder} !important`,
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                            },
                          }}
                          placeholder="Transportation Allowance"
                          value={formData.compensationDetails.transportationAllowance}
                          onChange={(e) => handleChange(e.target.value, 'compensationDetails', 'transportationAllowance')}
                        />
                      </Box>
                    )}
                  </TableCell>
                </TableRow>

                {/* Food & Communication Allowance */}
                <TableRow sx={{ borderBottom: `2px solid ${theme.palette.custom.greyBorder}` }}>
                  <TableCell sx={{ width: "50%", minWidth: "200px", maxWidth: "100%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Food Allowance
                    </Typography>
                    {!isEditing ? (
                      <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                        {`${formatDecimalValue(compensationDetails.foodAllowance)} AED`}
                      </Typography>
                    ) : (
                      <Box>
                        <TextField
                          fullWidth
                          sx={{
                            ...uniformFieldStyle,
                            py: 0,
                            backgroundColor: theme.palette.custom.white,
                            borderRadius: theme.spacing(1),
                            "& .MuiInputBase-input::placeholder": {
                              color: theme.palette.custom.lighterGrey,
                              opacity: 1,
                              fontSize: "0.875rem",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.greyBorder} !important`,
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                            },
                          }}
                          placeholder="Food Allowance"
                          value={formData.compensationDetails.foodAllowance}
                          onChange={(e) => handleChange(e.target.value, 'compensationDetails', 'foodAllowance')}
                        />
                      </Box>
                    )}
                  </TableCell>
                  <TableCell sx={{ width: "50%", minWidth: "200px", maxWidth: "100%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Communication Allowance
                    </Typography>
                    {!isEditing ? (
                      <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                        {`${formatDecimalValue(compensationDetails.communicationAllowance)} AED`}
                      </Typography>
                    ) : (
                      <Box>
                        <TextField
                          fullWidth
                          sx={{
                            ...uniformFieldStyle,
                            py: 0,
                            backgroundColor: theme.palette.custom.white,
                            borderRadius: theme.spacing(1),
                            "& .MuiInputBase-input::placeholder": {
                              color: theme.palette.custom.lighterGrey,
                              opacity: 1,
                              fontSize: "0.875rem",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.greyBorder} !important`,
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                            },
                          }}
                          placeholder="Communication Allowance"
                          value={formData.compensationDetails.communicationAllowance}
                          onChange={(e) => handleChange(e.target.value, 'compensationDetails', 'communicationAllowance')}
                        />
                      </Box>
                    )}
                  </TableCell>
                </TableRow>

                {/* General Allowance $ Daily Gross Rate */}
                <TableRow sx={{ borderBottom: `2px solid ${theme.palette.custom.greyBorder}` }}>
                  <TableCell sx={{ width: "50%", minWidth: "200px", maxWidth: "100%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      General Allowance
                    </Typography>
                    {!isEditing ? (
                      <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                        {`${formatDecimalValue(compensationDetails.generalAllowance)} AED`}
                      </Typography>
                    ) : (
                      <Box>
                        <TextField
                          fullWidth
                          sx={{
                            ...uniformFieldStyle,
                            py: 0,
                            backgroundColor: theme.palette.custom.white,
                            borderRadius: theme.spacing(1),
                            "& .MuiInputBase-input::placeholder": {
                              color: theme.palette.custom.lighterGrey,
                              opacity: 1,
                              fontSize: "0.875rem",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.greyBorder} !important`,
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                            },
                          }}
                          placeholder="General Allowance"
                          value={formData.compensationDetails.generalAllowance}
                          onChange={(e) => handleChange(e.target.value, 'compensationDetails', 'generalAllowance')}
                        />
                      </Box>
                    )}
                  </TableCell>
                  <TableCell sx={{ width: "50%", minWidth: "200px", maxWidth: "100%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Daily Gross Rate
                    </Typography>
                    {!isEditing ? (
                      <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                        {`${formatDecimalValue(compensationDetails.dailyGrossRate)} AED`}
                      </Typography>
                    ) : (
                      <Box>
                        <TextField
                          fullWidth
                          sx={{
                            ...uniformFieldStyle,
                            py: 0,
                            backgroundColor: theme.palette.custom.white,
                            borderRadius: theme.spacing(1),
                            "& .MuiInputBase-input::placeholder": {
                              color: theme.palette.custom.lighterGrey,
                              opacity: 1,
                              fontSize: "0.875rem",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.greyBorder} !important`,
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                            },
                          }}
                          placeholder="Daily Gross Rate"
                          value={formData.compensationDetails.dailyGrossRate}
                          onChange={(e) => handleChange(e.target.value, 'compensationDetails', 'dailyGrossRate')}
                        />
                      </Box>
                    )}
                  </TableCell>
                </TableRow>

                {/* Hourly Gross Rate & Holiday Pay Rate */}
                <TableRow sx={{ borderBottom: `2px solid ${theme.palette.custom.greyBorder}` }}>
                  <TableCell sx={{ width: "50%", minWidth: "200px", maxWidth: "100%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Hourly Gross Rate
                    </Typography>
                    {!isEditing ? (
                      <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                        {`${formatDecimalValue(compensationDetails.hourlyGrossRate)} AED`}
                      </Typography>
                    ) : (
                      <Box>
                        <TextField
                          fullWidth
                          sx={{
                            ...uniformFieldStyle,
                            py: 0,
                            backgroundColor: theme.palette.custom.white,
                            borderRadius: theme.spacing(1),
                            "& .MuiInputBase-input::placeholder": {
                              color: theme.palette.custom.lighterGrey,
                              opacity: 1,
                              fontSize: "0.875rem",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.greyBorder} !important`,
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                            },
                          }}
                          placeholder="Hourly Gross Rate"
                          value={formData.compensationDetails.hourlyGrossRate}
                          onChange={(e) => handleChange(e.target.value, 'compensationDetails', 'hourlyGrossRate')}
                        />
                      </Box>
                    )}
                  </TableCell>
                  <TableCell sx={{ width: "50%", minWidth: "200px", maxWidth: "100%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Holiday Pay Rate
                    </Typography>
                    {!isEditing ? (
                      <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                        {`${formatDecimalValue(compensationDetails.holidayPayRate)} AED`}
                      </Typography>
                    ) : (
                      <Box>
                        <TextField
                          fullWidth
                          sx={{
                            ...uniformFieldStyle,
                            py: 0,
                            backgroundColor: theme.palette.custom.white,
                            borderRadius: theme.spacing(1),
                            "& .MuiInputBase-input::placeholder": {
                              color: theme.palette.custom.lighterGrey,
                              opacity: 1,
                              fontSize: "0.875rem",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.greyBorder} !important`,
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                            },
                          }}
                          placeholder="Holiday Pay Rate"
                          value={formData.compensationDetails.holidayPayRate}
                          onChange={(e) => handleChange(e.target.value, 'compensationDetails', 'holidayPayRate')}
                        />
                      </Box>
                    )}
                  </TableCell>
                </TableRow>
                {/* Overtime Rate & Cancelled Off Rate */}
                <TableRow sx={{ borderBottom: `2px solid ${theme.palette.custom.greyBorder}` }}>
                  <TableCell sx={{ width: "50%", minWidth: "200px", maxWidth: "100%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Overtime Rate
                    </Typography>
                    {!isEditing ? (
                      <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                        {`${formatDecimalValue(compensationDetails.overtimeRate)} AED`}
                      </Typography>
                    ) : (
                      <Box>
                        <TextField
                          fullWidth
                          sx={{
                            ...uniformFieldStyle,
                            py: 0,
                            backgroundColor: theme.palette.custom.white,
                            borderRadius: theme.spacing(1),
                            "& .MuiInputBase-input::placeholder": {
                              color: theme.palette.custom.lighterGrey,
                              opacity: 1,
                              fontSize: "0.875rem",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.greyBorder} !important`,
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                            },
                          }}
                          placeholder="Overtime Rate"
                          value={formData.compensationDetails.overtimeRate}
                          onChange={(e) => handleChange(e.target.value, 'compensationDetails', 'overtimeRate')}
                        />
                      </Box>
                    )}
                  </TableCell>
                  <TableCell sx={{ width: "50%", minWidth: "200px", maxWidth: "100%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Cancelled Off Rate
                    </Typography>
                    {!isEditing ? (
                      <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                        {`${formatDecimalValue(compensationDetails.cancelledOffRate)} AED`}
                      </Typography>
                    ) : (
                      <Box>
                        <TextField
                          fullWidth
                          sx={{
                            ...uniformFieldStyle,
                            py: 0,
                            backgroundColor: theme.palette.custom.white,
                            borderRadius: theme.spacing(1),
                            "& .MuiInputBase-input::placeholder": {
                              color: theme.palette.custom.lighterGrey,
                              opacity: 1,
                              fontSize: "0.875rem",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.greyBorder} !important`,
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                            },
                          }}
                          placeholder="Cancelled Off Rate"
                          value={formData.compensationDetails.cancelledOffRate}
                          onChange={(e) => handleChange(e.target.value, 'compensationDetails', 'cancelledOffRate')}
                        />
                      </Box>
                    )}
                  </TableCell>
                </TableRow>
                {/* Absences Rate & Vacation Leave */}
                <TableRow sx={{ borderBottom: `2px solid ${theme.palette.custom.greyBorder}` }}>
                  <TableCell sx={{ width: "50%", minWidth: "200px", maxWidth: "100%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Absences Rate
                    </Typography>
                    {!isEditing ? (
                      <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                        {`${formatDecimalValue(compensationDetails.absencesRate)} AED`}
                      </Typography>
                    ) : (
                      <Box>
                        <TextField
                          fullWidth
                          sx={{
                            ...uniformFieldStyle,
                            py: 0,
                            backgroundColor: theme.palette.custom.white,
                            borderRadius: theme.spacing(1),
                            "& .MuiInputBase-input::placeholder": {
                              color: theme.palette.custom.lighterGrey,
                              opacity: 1,
                              fontSize: "0.875rem",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.greyBorder} !important`,
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                            },
                          }}
                          placeholder="Absences Rate"
                          value={formData.compensationDetails.absencesRate}
                          onChange={(e) => handleChange(e.target.value, 'compensationDetails', 'absencesRate')}
                        />
                      </Box>
                    )}
                  </TableCell>
                  <TableCell sx={{ width: "50%", minWidth: "200px", maxWidth: "100%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Vacation Leave
                    </Typography>
                    {!isEditing ? (
                      <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                        {`${compensationDetails.vacationLeave} Days` || "N/A"}
                      </Typography>
                    ) : (
                      <Box>
                        <TextField
                          fullWidth
                          sx={{
                            ...uniformFieldStyle,
                            py: 0,
                            backgroundColor: theme.palette.custom.white,
                            borderRadius: theme.spacing(1),
                            "& .MuiInputBase-input::placeholder": {
                              color: theme.palette.custom.lighterGrey,
                              opacity: 1,
                              fontSize: "0.875rem",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.greyBorder} !important`,
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                            },
                          }}
                          placeholder="Vacation Leave"
                          value={formData.compensationDetails.vacationLeave}
                          onChange={(e) => handleChange(e.target.value, 'compensationDetails', 'vacationLeave')}
                        />
                      </Box>
                    )}
                  </TableCell>
                </TableRow>
                {/* Sick Leave & Maternity Leave */}
                <TableRow sx={{ borderBottom: `2px solid ${theme.palette.custom.greyBorder}` }}>
                  <TableCell sx={{ width: "50%", minWidth: "200px", maxWidth: "100%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Sick Leave
                    </Typography>
                    {!isEditing ? (
                      <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                        {`${compensationDetails.sickLeave} Days` || "N/A"}
                      </Typography>
                    ) : (
                      <Box>
                        <TextField
                          fullWidth
                          sx={{
                            ...uniformFieldStyle,
                            py: 0,
                            backgroundColor: theme.palette.custom.white,
                            borderRadius: theme.spacing(1),
                            "& .MuiInputBase-input::placeholder": {
                              color: theme.palette.custom.lighterGrey,
                              opacity: 1,
                              fontSize: "0.875rem",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.greyBorder} !important`,
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                            },
                          }}
                          placeholder="Sick Leave"
                          value={formData.compensationDetails.sickLeave}
                          onChange={(e) => handleChange(e.target.value, 'compensationDetails', 'sickLeave')}
                        />
                      </Box>
                    )}
                  </TableCell>
                  <TableCell sx={{ width: "50%", minWidth: "200px", maxWidth: "100%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Maternity Leave
                    </Typography>
                    {!isEditing ? (
                      <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                        {`${compensationDetails.maternityLeave} Days` || "N/A"}
                      </Typography>
                    ) : (
                      <Box>
                        <TextField
                          fullWidth
                          sx={{
                            ...uniformFieldStyle,
                            py: 0,
                            backgroundColor: theme.palette.custom.white,
                            borderRadius: theme.spacing(1),
                            "& .MuiInputBase-input::placeholder": {
                              color: theme.palette.custom.lighterGrey,
                              opacity: 1,
                              fontSize: "0.875rem",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.greyBorder} !important`,
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                            },
                          }}
                          placeholder="Maternity Leave"
                          value={formData.compensationDetails.maternityLeave}
                          onChange={(e) => handleChange(e.target.value, 'compensationDetails', 'maternityLeave')}
                        />
                      </Box>
                    )}
                  </TableCell>
                </TableRow>
                {/* Bereavement Leave */}
                <TableRow sx={{ borderBottom: `2px solid ${theme.palette.custom.greyBorder}` }}>
                  <TableCell sx={{ width: "50%", minWidth: "200px", maxWidth: "100%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Bereavement Leave
                    </Typography>
                    {!isEditing ? (
                      <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                        {`${compensationDetails.bereavementLeave} Days` || "N/A"}
                      </Typography>
                    ) : (
                      <Box>
                        <TextField
                          fullWidth
                          sx={{
                            ...uniformFieldStyle,
                            py: 0,
                            backgroundColor: theme.palette.custom.white,
                            borderRadius: theme.spacing(1),
                            "& .MuiInputBase-input::placeholder": {
                              color: theme.palette.custom.lighterGrey,
                              opacity: 1,
                              fontSize: "0.875rem",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.greyBorder} !important`,
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                              },
                            },
                          }}
                          placeholder="Bereavement Leave"
                          value={formData.compensationDetails.bereavementLeave}
                          onChange={(e) => handleChange(e.target.value, 'compensationDetails', 'bereavementLeave')}
                        />
                      </Box>
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        )}

        {activeTab === 3 && (
          <Box sx={{ height: "100%", display: "flex", flexDirection: "column", minHeight: 0, maxHeight: "calc(100vh - 317px)", overflow: "auto" }}>
            {/* History | Header */}
            <TableContainer sx={{ flexGrow: 1, width: "100%" }}>
              <Box sx={{
                top: 0,
                backgroundColor: theme.palette.custom.greyBorder,
                zIndex: 10,
              }}>
                <Table stickyHeader sx={{ width: "100%", tableLayout: "fixed" }}>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: theme.palette.custom.darkerGrey }}>
                      <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <img
                            src={dateIcon}
                            alt="Date"
                            style={{ width: 24, height: 24 }}
                          />
                          <Typography variant="md3">
                            Date
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <img
                            src={typeIcon}
                            alt="Type"
                            style={{ width: 24, height: 24 }}
                          />
                          <Typography variant="md3">
                            Type
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <img
                            src={fieldNameIcon}
                            alt="Field Name"
                            style={{ width: 24, height: 24 }}
                          />
                          <Typography variant="md3">
                            Field Name
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <img
                            src={prevValueIcon}
                            alt="Previous Value"
                            style={{ width: 24, height: 24 }}
                          />
                          <Typography variant="md3">
                            Previous Value
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <img
                            src={updatedValueIcon}
                            alt="Updated Value"
                            style={{ width: 24, height: 24 }}
                          />
                          <Typography variant="md3">
                            Updated Value
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {employee.history?.length
                      ?
                      employee.history.map((row, index) => (
                        <TableRow key={index} sx={{ backgroundColor: theme.palette.custom.white }}>
                          <TableCell sx={{ fontSize: "12px", borderRight: `1px solid ${theme.palette.custom.greyBorder}`, }}>
                            {formatUIDisplayDate(row.date, UI_DATE_FORMAT) || "N/A"}
                          </TableCell>
                          <TableCell sx={{ fontSize: "12px", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                            {row.type}
                          </TableCell>
                          <TableCell sx={{ fontSize: "12px", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                            {row.fieldName}
                          </TableCell>
                          <TableCell sx={{ fontSize: "12px", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                            {formatHistoryValue(row.previousValue)}
                          </TableCell>
                          <TableCell sx={{ fontSize: "12px", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                            {formatHistoryValue(row.updatedValue)}
                          </TableCell>
                        </TableRow>
                      ))
                      :
                      <TableRow sx={{ backgroundColor: theme.palette.custom.white }}>
                        <TableCell colSpan={5} sx={{ fontSize: "12px", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                          <Typography>No history data available.</Typography>
                        </TableCell>
                      </TableRow>}
                  </TableBody>
                </Table>
              </Box>
            </TableContainer>
          </Box>
        )}
      </Paper>
      <LoadingOverlay open={loading} />
    </Box>
  );
};

export default EmployeePersonalInfo;
