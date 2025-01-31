import React, { useState } from "react";
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
  TableBody
} from "@mui/material";
import { formatDate, calculateAge, formatDecimalValue } from "../../shared/utils/dateAndNumberUtils";
import { ArrowBack, Circle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
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


const EmployeePersonalInfo = ({ employee }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  const personalInfo = employee.personalInformation;
  const employmentDetails = employee.employmentDetails;
  const compensationDetails = employee.compensationDetails;

/**
 * Handle tab change
 */
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

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
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "90%",
          maxWidth: 1260,
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
            src={require(`../assets/avatar/${employee.employeeId}.jpg`)}
            sx={{ width: 64, height: 64, mr: 2 }}
          />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {personalInfo.employeeName || "N/A"}
            </Typography>
            <Chip
              label={employee.employmentDetails.status || "Unknown"}
              icon={<Circle sx={{ fontSize: theme.icons.icon1, 
                color: theme.palette.custom.white }} />}
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
          <Box sx={{ display: "flex", flexDirection: "column"}}>
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
      <Box sx={{ width: "90%", maxWidth: 1260, borderBottom: 1, borderColor: theme.palette.custom.darkBrown, marginBottom: 0, paddingBottom: 0 }}>
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
              fontSize: 15,
            }}
          />
          <Tab
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
              fontSize: 15,
            }}
          />
          <Tab
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
              fontSize: 15,
            }}
          />
          <Tab
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
            }}
          />
        </Tabs>

      </Box>

      {/* Content Section */}
      <Paper
        sx={{
          width: "90%",
          maxWidth: 1260,
          bgcolor: "#FAFBFB",
          borderRadius: 2,
          border: "1px solid #BDBDBD",
          boxShadow: "1px 1px 10px rgba(175, 136, 98, 0.25)",
          padding: 0,
          margin: 2,
        }}
        elevation={0}
      >
        {activeTab === 0 && (
          <Box sx={{ padding: 3 }}>
            <Table>
              <TableBody>
              {/* Edit Button */}
              <TableRow>
              <TableCell colSpan={2} sx={{ borderBottom: "none", paddingBottom: 0, marginBottom:0}}>
                    <Box sx={{display: "flex", gap:1, justifyContent: "right"}}>
                      <Button sx={{ backgroundColor: theme.palette.custom.white, borderRadius: "8px", px:2 }}>
                        <img
                            src={editIcon}
                            alt="Edit"
                            style={{height: 20, width: 20}}
                          />
                          <Typography variant="sm3" sx={{color: theme.palette.custom.darkBrown}}>
                            Edit
                          </Typography>
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>              
                {/* Full Name & Gender */}
                <TableRow sx={{ borderBottom: `2px solid ${theme.palette.custom.greyBorder}` }}>
                  <TableCell sx={{ width: "50%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Full Name
                    </Typography>
                    <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                      {personalInfo.employeeName || "N/A"}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ width: "50%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Gender
                    </Typography>
                    <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                      {personalInfo.gender || "N/A"}
                    </Typography>
                  </TableCell>
                </TableRow>

                {/* Date of Birth & Age */}
                <TableRow sx={{ borderBottom: `2px solid ${theme.palette.custom.greyBorder}` }}>
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Date of Birth
                    </Typography>
                    <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                      {formatDate(personalInfo.dateOfBirth, 'MMMM dd, yyyy')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Age
                    </Typography>
                    <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                      {calculateAge(personalInfo.dateOfBirth)}
                    </Typography>
                  </TableCell>
                </TableRow>

                {/* Contact Number & Email Address */}
                <TableRow sx={{ borderBottom: `2px solid ${theme.palette.custom.greyBorder}` }}>
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Contact Number
                    </Typography>
                    <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                      {personalInfo.contactNumber || "N/A"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Email Address
                    </Typography>
                    <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                      {personalInfo.emailAddress || "N/A"}
                    </Typography>
                  </TableCell>
                </TableRow>

                {/* Full-width row for Address */}
                <TableRow sx={{ borderBottom: `2px solid ${theme.palette.custom.greyBorder}` }}>
                  <TableCell colSpan={2}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Address
                    </Typography>
                    <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                      {personalInfo.address || "N/A"}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        )}

        {activeTab === 1 && (
          <Box sx={{ padding: 3 }}>
            <Table>
              <TableBody>
              {/* Edit Button */}
              <TableRow>
              <TableCell colSpan={2} sx={{ borderBottom: "none", paddingBottom: 0, marginBottom:0}}>
                    <Box sx={{display: "flex", gap:1, justifyContent: "right"}}>
                      <Button sx={{ backgroundColor: theme.palette.custom.white, borderRadius: "8px", px:2 }}>
                        <img
                            src={editIcon}
                            alt="Edit"
                            style={{height: 20, width: 20}}
                          />
                          <Typography variant="sm3" sx={{color: theme.palette.custom.darkBrown}}>
                            Edit
                          </Typography>
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>              
                {/* Job Status & Job Title */}
                <TableRow sx={{ borderBottom: `2px solid ${theme.palette.custom.greyBorder}`}}>
                  <TableCell sx={{ width: "50%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Status
                    </Typography>
                    <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                      {employmentDetails.status || "N/A"}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ width: "50%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Job Title
                    </Typography>
                    <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                      {employmentDetails.jobTitle || "N/A"}
                    </Typography>
                  </TableCell>
                </TableRow>

                {/* Department & Branch */}
                <TableRow sx={{ borderBottom: `2px solid ${theme.palette.custom.greyBorder}` }}>
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Department
                    </Typography>
                    <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                      {employmentDetails.department || "N/A"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Branch
                    </Typography>
                    <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                      {employmentDetails.branch || "N/A"}
                    </Typography>
                  </TableCell>
                </TableRow>

                {/* Date of Hire & Emirates ID */}
                <TableRow sx={{ borderBottom: `2px solid ${theme.palette.custom.greyBorder}` }}>
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Date of Hire
                    </Typography>
                    <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                      {formatDate(employmentDetails.dateOfHire, "MMMM dd, yyyy") || "N/A"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Emirates ID Number
                    </Typography>
                    <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                      {employmentDetails.emiratesIdNumber || "N/A"}
                    </Typography>
                  </TableCell>
                </TableRow>

                {/* Visa Number & Date of Visa Renewal */}
                <TableRow sx={{ borderBottom: `2px solid ${theme.palette.custom.greyBorder}` }}>
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Visa Number
                    </Typography>
                    <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                      {employmentDetails.visaNumber || "N/A"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Date of Visa Renewal
                    </Typography>
                    <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                      {formatDate(employmentDetails.dateOfVisaRenewal, 'MMMM dd, yyyy') || "N/A"}
                    </Typography>
                  </TableCell>
                </TableRow>

                {/* Passport Number & Date of Passport Expiry */}
                <TableRow sx={{ borderBottom: `2px solid ${theme.palette.custom.greyBorder}` }}>
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Passport Number
                    </Typography>
                    <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                      {employmentDetails.passportNumber || "N/A"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Date of Passport Expiry
                    </Typography>
                    <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                      {formatDate(employmentDetails.dateOfPassportExpiry, 'MMMM dd, yyyy') || "N/A"}
                    </Typography>
                  </TableCell>
                </TableRow>                
              </TableBody>
            </Table>            
          </Box>
        )}
        {activeTab === 2 && (
          <Box sx={{ padding: 3 }}>
            <Table>
              <TableBody>
              {/* Edit Button */}
              <TableRow>
              <TableCell colSpan={2} sx={{ borderBottom: "none", paddingBottom: 0, marginBottom:0}}>
                    <Box sx={{display: "flex", gap:1, justifyContent: "right"}}>
                      <Button sx={{ backgroundColor: theme.palette.custom.white, borderRadius: "8px", px:2 }}>
                        <img
                            src={editIcon}
                            alt="Edit"
                            style={{height: 20, width: 20}}
                          />
                          <Typography variant="sm3" sx={{color: theme.palette.custom.darkBrown}}>
                            Edit
                          </Typography>
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>              
                {/* Basic Salary & Accommodation Allowance */}
                <TableRow sx={{ borderBottom: `2px solid ${theme.palette.custom.greyBorder}`}}>
                  <TableCell sx={{ width: "50%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Basic Salary
                    </Typography>
                    <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                      {`${formatDecimalValue(compensationDetails.basicSalary)} AED`}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ width: "50%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Accomodation Allowance
                    </Typography>
                    <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                      {`${formatDecimalValue(compensationDetails.accommodationAllowance)} AED`}
                    </Typography>
                  </TableCell>
                </TableRow>

                {/* Transportation Allowance & Food Allowance */}
                <TableRow sx={{ borderBottom: `2px solid ${theme.palette.custom.greyBorder}`}}>
                  <TableCell sx={{ width: "50%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Transportation Allowance
                    </Typography>
                    <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                      {`${formatDecimalValue(compensationDetails.transportationAllowance)} AED`}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ width: "50%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Food Allowance
                    </Typography>
                    <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                      {`${formatDecimalValue(compensationDetails.foodAllowance)} AED`}
                    </Typography>
                  </TableCell>
                </TableRow>

                {/* Communication Allowance & General Allowance */}
                <TableRow sx={{ borderBottom: `2px solid ${theme.palette.custom.greyBorder}`}}>
                  <TableCell sx={{ width: "50%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Communication Allowance
                    </Typography>
                    <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                      {`${formatDecimalValue(compensationDetails.communicationAllowance)} AED`}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ width: "50%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      General Allowance
                    </Typography>
                    <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                      {`${formatDecimalValue(compensationDetails.generalAllowance)} AED`}
                    </Typography>
                  </TableCell>
                </TableRow>

                {/* Hourly Overtime Rate & Hourly Cancelled Day Off Rate */}
                <TableRow sx={{ borderBottom: `2px solid ${theme.palette.custom.greyBorder}`}}>
                  <TableCell sx={{ width: "50%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Hourly Overtime Rate
                    </Typography>
                    <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                      {`${formatDecimalValue(compensationDetails.hourlyOvertimeRate)} AED`}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ width: "50%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Hourly Cancelled Day Off Rate
                    </Typography>
                    <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                      {`${formatDecimalValue(compensationDetails.hourlyCancelledDayOffRate)} AED`}
                    </Typography>
                  </TableCell>
                </TableRow>

                {/* Hourly Holiday Rate & Annual Paid Time Off */}
                <TableRow sx={{ borderBottom: `2px solid ${theme.palette.custom.greyBorder}`}}>
                  <TableCell sx={{ width: "50%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Hourly Holiday Rate
                    </Typography>
                    <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                      {`${formatDecimalValue(compensationDetails.hourlyHolidayRate)} AED`}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ width: "50%" }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
                      Annual Paid Time Off
                    </Typography>
                    <Typography variant="h6" sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}>
                      {`${compensationDetails.annualPaidTimeOff} Days` || "N/A"}
                    </Typography>
                  </TableCell>
                </TableRow>                
              </TableBody>
            </Table>            
          </Box>
        )}
        {activeTab === 3 && (
          <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            {/* History | Header */}
            <TableContainer sx={{ flexGrow: 1, width: "100%" }}>
              <Table sx={{ width: "100%", tableLayout: "fixed" }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: theme.palette.custom.greyBorder }}>
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
                  {employee.history.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>{formatDate(row.date, 'dd/MM/yyyy')}</TableCell>
                      <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>{row.type}</TableCell>
                      <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>{row.fieldName}</TableCell>
                      <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>{row.previousValue}</TableCell>
                      <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>{row.updatedValue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default EmployeePersonalInfo;
