import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Typography,
  Divider,
  Paper,
  Avatar,
  Tabs,
  Tab,
  Chip,
  Grid,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";
import { formatDate, calculateAge } from "../../shared/utils/dateUtils";
import { ArrowBack, Badge, HistoryEdu, MoreVert, Paid, PsychologyAlt, Assignment, CalendarMonth, NoteAlt, Task, GridView, Circle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


const EmployeePersonalInfo = ({ employee }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  const personalInfo = employee.personalInformation;
  const employmentDetails = employee.employmentDetails;
  const compensationDetails = employee.compensationDetails;


/**
 * Check if the value is a decimal and extract string or returns "N/A" as fallback
 */
  const formatDecimalValue = (value) => {

    if (value && value["$numberDecimal"]) {
      return value["$numberDecimal"].toString() || "N/A";
    }

    return value ? value.toString() : "N/A";
  };

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
          <MoreVert sx={{ marginRight: 1, marginLeft: 1, height: 100, color: theme.palette.custom.lightGrey }} />
          <Box>
            <Typography
              variant="sm2"
              sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}>
              Employee ID:
            </Typography>
            <Typography>
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
              color: theme.palette.custom.darkBrown,
              '&:hover': {
                color: theme.palette.custom.darkBrown
              },
              '&.Mui-selected': {
                color: theme.palette.custom.darkBrown,
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: theme.palette.custom.darkBrown,
            },
          }}
        >
          <Tab
            label="Personal Information"
            icon={<PsychologyAlt sx={{ color: theme.palette.custom.darkBrown, display: "flex" }} />}
            iconPosition="start"
            sx={{
              paddingLeft: 1,
              paddingRight: 1,
              width: "25%",
              display: 'flex',
              justifyContent: 'center',
            }}
          />
          <Tab label="Employee Details"
            icon={<Badge sx={{ color: theme.palette.custom.darkBrown, display: "flex" }} />}
            iconPosition="start"
            sx={{
              paddingLeft: 1,
              paddingRight: 1,
              width: "25%",
              display: 'flex',
              justifyContent: 'cneter',
            }}
          />
          <Tab label="Compensation Details"
            icon={<Paid sx={{ color: theme.palette.custom.darkBrown, display: "flex" }} />}
            iconPosition="start"
            sx={{
              paddingLeft: 1,
              paddingRight: 1,
              width: "25%",
              display: 'flex',
              justifyContent: 'center',
            }}
          />
          <Tab label="History"
            icon={<HistoryEdu sx={{ color: theme.palette.custom.darkBrown, display: "flex" }} />}
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
          p: 3,
          bgcolor: "#FAFBFB",
          borderRadius: 2,
          border: "1px solid #BDBDBD",
          boxShadow: "1px 1px 10px rgba(175, 136, 98, 0.25)",
          padding: 0,
          margin: 0
        }}
        elevation={1}
      >
        {activeTab === 0 && (
          <Box>
            {/* Personal Information in Two Columns */}
            <Grid container spacing={3} sx={{ padding: 3}}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}
                >
                  Full Name
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}
                >
                  {personalInfo.employeeName || "N/A"}
                </Typography>
                <Divider sx={{ mt: 1, borderColor: theme.palette.custom.greyBorder }} />
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}
                >
                  Gender
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}
                >
                  {personalInfo.gender || "N/A"}
                </Typography>
                <Divider sx={{ mt: 1, borderColor: theme.palette.custom.greyBorder }} />
              </Grid>

              <Grid item xs={6}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}
                >
                  Date of Birth
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}
                >
                  {formatDate(personalInfo.dateOfBirth, 'dd/MM/yyyy')}
                </Typography>
                <Divider sx={{ mt: 1, borderColor: theme.palette.custom.greyBorder }} />
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}
                >
                  Age
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}
                >
                  {calculateAge(personalInfo.dateOfBirth)}
                </Typography>
                <Divider sx={{ mt: 1, borderColor: theme.palette.custom.greyBorder }} />
              </Grid>

              <Grid item xs={6}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}
                >
                  Contact Number
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}
                >
                  {personalInfo.contactNumber || "N/A"}
                </Typography>
                <Divider sx={{ mt: 1, borderColor: theme.palette.custom.greyBorder }} />
              </Grid>

              <Grid item xs={6}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}
                >
                  Email Address
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}
                >
                  {personalInfo.emailAddress || "N/A"}
                </Typography>
                <Divider sx={{ mt: 1, borderColor: theme.palette.custom.greyBorder }} />
              </Grid>

              {/* Full-width row for Address */}
              <Grid item xs={12}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}
                >
                  Address
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}
                >
                  {personalInfo.address || "N/A"}
                </Typography>
                <Divider sx={{ mt: 1, borderColor: theme.palette.custom.greyBorder }} />
              </Grid>
            </Grid>
          </Box>
        )}
        {activeTab === 1 && (
          <Box>
            {/* Employment Details */}
            <Grid container spacing={3} sx={{ padding: 3}}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}
                >
                  Status
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}
                >
                  {employmentDetails.status || "N/A"}
                </Typography>
                <Divider sx={{ mt: 1, borderColor: theme.palette.custom.greyBorder }} />
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}
                >
                  Job Title
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}
                >
                  {employmentDetails.jobTitle || "N/A"}
                </Typography>
                <Divider sx={{ mt: 1, borderColor: theme.palette.custom.greyBorder }} />
              </Grid>

              <Grid item xs={6}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}
                >
                  Department
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}
                >
                  {employmentDetails.department || "N/A"}
                </Typography>
                <Divider sx={{ mt: 1, borderColor: theme.palette.custom.greyBorder }} />
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}
                >
                  Branch
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}
                >
                  {employmentDetails.branch || "N/A"}
                </Typography>
                <Divider sx={{ mt: 1, borderColor: theme.palette.custom.greyBorder }} />
              </Grid>

              <Grid item xs={6}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}
                >
                  Date of Hire
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}
                >
                  {formatDate(employmentDetails.dateOfHire, 'dd/MM/yyyy')}
                </Typography>
                <Divider sx={{ mt: 1, borderColor: theme.palette.custom.greyBorder }} />
              </Grid>

              <Grid item xs={6}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}
                >
                  Emirates ID Number
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}
                >
                  {employmentDetails.emiratesIdNumber || "N/A"}
                </Typography>
                <Divider sx={{ mt: 1, borderColor: theme.palette.custom.greyBorder }} />
              </Grid>

              <Grid item xs={6}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}
                >
                  Visa Number
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}
                >
                  {employmentDetails.visaNumber || "N/A"}
                </Typography>
                <Divider sx={{ mt: 1, borderColor: theme.palette.custom.greyBorder }} />
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}
                >
                  Date of Visa Renewal
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}
                >
                  {formatDate(employmentDetails.dateOfVisaRenewal, 'dd/MM/yyyy')}
                </Typography>
                <Divider sx={{ mt: 1, borderColor: theme.palette.custom.greyBorder }} />
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}
                >
                  Passport Number
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}
                >
                  {employmentDetails.passportNumber || "N/A"}
                </Typography>
                <Divider sx={{ mt: 1, borderColor: theme.palette.custom.greyBorder }} />
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}
                >
                  Date of Passport Expiry
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}
                >
                  {formatDate(employmentDetails.dateOfPassportExpiry, 'dd/MM/yyyy')}
                </Typography>
                <Divider sx={{ mt: 1, borderColor: theme.palette.custom.greyBorder }} />
              </Grid>
            </Grid>
          </Box>
        )}
        {activeTab === 2 && (
          <Box>
            {/* Compensation Details */}
            <Grid container spacing={3} sx={{ padding: 3}}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}
                >
                  Basic Salary
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}
                >
                  {formatDecimalValue(compensationDetails.basicSalary)}
                </Typography>
                <Divider sx={{ mt: 1, borderColor: theme.palette.custom.greyBorder }} />
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}
                >
                  Accomodation Allowance
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}
                >
                  {formatDecimalValue(compensationDetails.accommodationAllowance)}
                </Typography>
                <Divider sx={{ mt: 1, borderColor: theme.palette.custom.greyBorder }} />
              </Grid>

              <Grid item xs={6}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}
                >
                  Transportation Allowance
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}
                >
                  {formatDecimalValue(compensationDetails.transportationAllowance)}
                </Typography>
                <Divider sx={{ mt: 1, borderColor: theme.palette.custom.greyBorder }} />
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}
                >
                  Food Allowance
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}
                >
                  {formatDecimalValue(compensationDetails.foodAllowance)}
                </Typography>
                <Divider sx={{ mt: 1, borderColor: theme.palette.custom.greyBorder }} />
              </Grid>

              <Grid item xs={6}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}
                >
                  Communication Allowance
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}
                >
                  {formatDecimalValue(compensationDetails.communicationAllowance)}
                </Typography>
                <Divider sx={{ mt: 1, borderColor: theme.palette.custom.greyBorder }} />
              </Grid>

              <Grid item xs={6}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}
                >
                  General Allowance
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}
                >
                  {formatDecimalValue(compensationDetails.generalAllowance)}
                </Typography>
                <Divider sx={{ mt: 1, borderColor: theme.palette.custom.greyBorder }} />
              </Grid>

              <Grid item xs={6}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}
                >
                  Hourly Overtime Rate
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}
                >
                  {formatDecimalValue(compensationDetails.hourlyOvertimeRate)}
                </Typography>
                <Divider sx={{ mt: 1, borderColor: theme.palette.custom.greyBorder }} />
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}
                >
                  Hourly Cancelled Day Off Rate
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}
                >
                  {formatDecimalValue(compensationDetails.hourlyCancelledDayOffRate)}
                </Typography>
                <Divider sx={{ mt: 1, borderColor: theme.palette.custom.greyBorder }} />
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}
                >
                  Hourly Holiday Rate
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}
                >
                  {formatDecimalValue(compensationDetails.hourlyHolidayRate)}
                </Typography>
                <Divider sx={{ mt: 1, borderColor: theme.palette.custom.greyBorder }} />
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: theme.palette.custom.lightGrey, fontWeight: 600 }}
                >
                  Annual Paid Time Off
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.custom.darkGrey, fontWeight: 600 }}
                >
                  {`${compensationDetails.annualPaidTimeOff} days` || "N/A"}
                </Typography>
                <Divider sx={{ mt: 1, borderColor: theme.palette.custom.greyBorder }} />
              </Grid>
            </Grid>
          </Box>
        )}
        {activeTab === 3 && (
          <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            {/* History | Header */}
            <TableContainer sx={{ flexGrow: 1, width: "100%" }}>
              <Table sx={{ width: "100%", tableLayout: "fixed" }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: theme.palette.custom.greyBorder }}>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <CalendarMonth fontSize="small" /> Date
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <GridView fontSize="small" /> Type
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Assignment fontSize="small" /> Field Name
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <NoteAlt fontSize="small" /> Previous Value
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Task fontSize="small" /> Updated Value
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employee.history.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{formatDate(row.date, 'dd/MM/yyyy')}</TableCell>
                      <TableCell>{row.type}</TableCell>
                      <TableCell>{row.fieldName}</TableCell>
                      <TableCell>{row.previousValue}</TableCell>
                      <TableCell>{row.updatedValue}</TableCell>
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
