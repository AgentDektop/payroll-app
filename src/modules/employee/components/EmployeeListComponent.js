import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Avatar,
  Typography,
  Chip,
  Card,
  CardContent,
  CardActions,
  ListItemText,
  InputAdornment,
  IconButton
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Circle,
  ArrowForwardIos,
  PersonAddAlt1Rounded,
  FilterList,
} from "@mui/icons-material";

import AddEmployeeModal from "./AddEmployeeModal";
import LoadingOverlay from "../../shared/components/LoadingOverlay";

import employeeSearchIcon from "../../shared/assets/icon/search-employee-icon.png";
import statusIcon from "../../shared/assets/icon/status-icon.png";
import roleIcon from "../../shared/assets/icon/role-icon.png";
import branchIcon from "../../shared/assets/icon/branch-icon.png";
import addEmployeeIcon from "../../shared/assets/icon/add-employee-icon.png";
import empNumIcon from "../../shared/assets/icon/emp-id-icon.png";
import deptIcon from "../../shared/assets/icon/department-icon.png";
import locIcon from "../../shared/assets/icon/location-icon.png";
import emailIcon from "../../shared/assets/icon/email-icon.png";
import phoneIcon from "../../shared/assets/icon/phone-icon.png";

const EmployeeList = ({ employees, uniqueStatus, uniqueRole, uniqueBranch, loading, fetchData }) => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = searchTerm
      ? employee.personalInformation.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const matchesStatus = selectedStatus !== "" ? employee.employmentDetails.status === selectedStatus : true;
    const matchesRole = selectedRole !== "" ? employee.employmentDetails.role === selectedRole : true;
    const matchesBranch = selectedBranch !== "" ? employee.employmentDetails.branch === selectedBranch : true;
    return matchesSearch && matchesStatus && matchesRole && matchesBranch;
  });

  const activeCount = employees.filter(emp => emp.employmentDetails.status === "Active").length;
  const inactiveCount = employees.filter(emp => emp.employmentDetails.status === "Inactive").length;

  const icons = {
    Status: statusIcon,
    Role: roleIcon,
    Branch: branchIcon,
  };

  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: theme.spacing(3) }}>

      {/* Header and Filter Area (non-scrollable) */}
      <Box sx={{ flexShrink: 0, marginBottom: theme.spacing(2) }}>
        {/* Main Panel */}
        <Box sx={{ flexGrow: 1, marginBottom: theme.spacing(2) }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "flex-start", md: "center" },
              flexDirection: { xs: "column", sm: "row", md: "row" },
              position: "relative"
            }}
          >
            <Box>
              {/* Employee header + Active/Inactive count */}
              <Box>
                <Typography variant="header"
                  sx={{ color: theme.palette.custom.darkGrey, paddingBottom: theme.spacing(2) }}
                >
                  Employees
                </Typography>
                {/* Active/Inactive count */}
                <Box
                  sx={{ display: "flex", gap: theme.spacing(2), alignItems: "center", paddingTop: theme.spacing(0.5), paddingBottom: theme.spacing(2) }}
                >
                  <Typography variant="lg1"
                    sx={{ color: theme.palette.custom.lightGrey, display: "flex", alignItems: "center" }}
                  >
                    <Circle
                      sx={{ fontSize: theme.icons.icon1, color: theme.palette.custom.green, marginRight: theme.spacing(0.5) }}
                    />
                    Active {activeCount}
                  </Typography>
                  <Typography variant="lg1"
                    sx={{ color: theme.palette.custom.lightGrey, display: "flex", alignItems: "center" }}
                  >
                    <Circle
                      sx={{ fontSize: theme.icons.icon1, color: theme.palette.custom.red, marginRight: theme.spacing(0.5) }}
                    />
                    Inactive {inactiveCount}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <Button variant="contained" size="small"
                sx={{ display: { xs: 'none', sm: 'inline-flex' }, px: 3 }}
                onClick={() => setOpen(true)}
              >
                <img
                  src={addEmployeeIcon}
                  alt="Add Employee"
                  style={{ width: 20, height: 20 }}
                />
                Add Employee
              </Button>
              <AddEmployeeModal
                open={open}
                onClose={() => setOpen(false)}
                onSuccess={() => {
                  console.log("Employee successfully added!");
                  fetchData();
                }}
              />
              <IconButton
                sx={{
                  display: { xs: 'inline-flex', sm: 'none' },
                  position: { xs: 'absolute', sm: 'initial' },
                  right: { xs: 0, sm: 'initial' },
                  color: theme.palette.custom.darkBrown,
                  top: 10,
                  zIndex: 10,
                }}>
                <PersonAddAlt1Rounded sx={{ fontSize: theme.icons.icon3 }} />
              </IconButton>
            </Box>
          </Box>

          {/* Filter and Search Panel */}
          <Box sx={{ display: "flex", gap: theme.spacing(3), marginBottom: theme.spacing(2) }}>
            <TextField
              placeholder="Search Employee"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                backgroundColor: theme.palette.custom.white,
                boxShadow: theme.shadows.card,
                borderRadius: theme.spacing(1),
                width: { xs: "100%", sm: "100%", md: "40%" }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img
                      src={employeeSearchIcon}
                      alt="Search"
                      style={{ width: 24, height: 24 }}
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end" sx={{ display: { xs: "block", sm: "block", md: "none" } }}>
                    <FilterList sx={{ color: theme.palette.custom.brown }} />
                  </InputAdornment>
                ),
              }}
            />
            {["Status", "Role", "Branch"].map((label, index) => (
              <FormControl
                key={index}
                size="small"
                sx={{
                  width: { sm: "30%", md: "16%" },
                  boxShadow: theme.shadows.card,
                  borderRadius: theme.spacing(1),
                  display: { xs: "none", sm: "none", md: "flex" },
                  backgroundColor: theme.palette.custom.darkerGrey,
                  justifyContent: "space-between",
                  "& .MuiSvgIcon-root.MuiSelect-icon": {
                    backgroundColor: theme.palette.custom.white,
                    borderRadius: theme.spacing(1),
                  },
                }}
              >
                <Select
                  value={label === "Status" ? selectedStatus : label === "Role" ? selectedRole : selectedBranch}
                  onChange={(e) => {
                    if (label === "Status") setSelectedStatus(e.target.value);
                    if (label === "Role") setSelectedRole(e.target.value);
                    if (label === "Branch") setSelectedBranch(e.target.value);
                  }}
                  displayEmpty
                  MenuProps={{ disablePortal: true, disableScrollLock: true }}
                  sx={{
                    backgroundColor: theme.palette.custom.darkerGrey,
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.custom.darkerGrey,
                    },
                    "& .MuiSelect-icon": {
                      backgroundColor: theme.palette.custom.white,
                      borderRadius: theme.spacing(1),
                    },
                  }}
                  renderValue={(selected) => {
                    if (!selected) {
                      return (
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          {icons[label] && (
                            <img src={icons[label]} alt={label} style={{ width: 20, height: 20 }} />
                          )}
                          <span>{label}</span>
                        </div>
                      );
                    }
                    return (
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {icons[selected] && (
                          <img src={icons[selected]} alt={selected} style={{ width: 20, height: 20 }} />
                        )}
                        <span>{selected}</span>
                      </div>
                    );
                  }}
                >
                  <MenuItem value="">
                    <ListItemText primary={label} />
                  </MenuItem>
                  {label === "Status" &&
                    uniqueStatus?.map((item, i) => (
                      <MenuItem key={i} value={item}>{item}</MenuItem>
                    ))}
                  {label === "Role" &&
                    uniqueRole?.map((item, i) => (
                      <MenuItem key={i} value={item}>{item}</MenuItem>
                    ))}
                  {label === "Branch" &&
                    uniqueBranch?.map((item, i) => (
                      <MenuItem key={i} value={item}>{item}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Employee Cards Area (scrollable) */}
      <Box sx={{
        flexGrow: 1,
        overflowY: "auto",
        paddingRight: theme.spacing(1),
      }}>
        <Box sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: theme.spacing(2),
          justifyContent: { xs: "center", sm: "center", md: "flex-start" },
          width: "100%",
          margin: "auto",
          paddingTop: theme.spacing(2)
        }}>
          {filteredEmployees.map((employee) => (
            <Card
              key={employee.employeeId}
              sx={{
                width: "100%",
                maxWidth: 250,
                height: "auto",
                borderRadius: theme.spacing(2),
                position: "relative",
                boxShadow: theme.shadows.card,
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  backgroundColor:
                    employee.employmentDetails.status === "Active"
                      ? theme.palette.custom.green
                      : theme.palette.custom.red,
                },
                [theme.breakpoints.down('sm')]: {
                  maxWidth: "100%",
                },
              }}
            >
              <CardContent>
                <Chip
                  icon={
                    <Circle
                      sx={{
                        fontSize: theme.icons.icon1,
                        color: theme.palette.custom.white,
                      }}
                    />
                  }
                  label={employee.employmentDetails.status}
                  sx={{
                    backgroundColor:
                      employee.employmentDetails.status === "Active"
                        ? theme.palette.custom.green
                        : theme.palette.custom.red,
                    color: theme.palette.custom.white,
                    '& .MuiChip-icon': {
                      color: theme.palette.custom.white,
                    },
                  }}
                />
                <Avatar
                  src={employee.avatar}
                  sx={{ width: 50, height: 50, margin: "auto", marginBottom: theme.spacing(1) }}
                />
                <Typography
                  variant="lg1"
                  textAlign="center"
                  sx={{
                    color: theme.palette.custom.darkGrey,
                    display: "flex",
                    flexDirection: "column",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100%",
                  }}
                >
                  {employee.personalInformation.employeeName}
                </Typography>
                <Typography
                  variant="lg2"
                  textAlign="center"
                  sx={{
                    color: theme.palette.custom.lightGrey,
                    display: "flex",
                    flexDirection: "column",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100%",
                  }}
                >
                  {employee.employmentDetails.role}
                </Typography>
                <Box
                  sx={{
                    backgroundColor: theme.palette.custom.greyBorder,
                    py: theme.spacing(1.3),
                    px: theme.spacing(1.5),
                    borderRadius: theme.spacing(1),
                    marginTop: theme.spacing(1),
                  }}
                >
                  <Typography
                    variant="sm2"
                    sx={{
                      display: "flex",
                      color: theme.palette.custom.darkGrey,
                      paddingBottom: 0.5,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <img
                      src={empNumIcon}
                      alt="Employee ID"
                      style={{ width: 20, height: 20, paddingRight: 2, marginRight: 3 }}
                    />
                    {employee.employeeId}
                  </Typography>
                  <Typography
                    variant="sm2"
                    sx={{
                      display: "flex",
                      color: theme.palette.custom.darkGrey,
                      paddingBottom: 0.5,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <img
                      src={deptIcon}
                      alt="Department"
                      style={{ width: 20, height: 20, paddingRight: 2, marginRight: 3 }}
                    />
                    {employee.employmentDetails.department}
                  </Typography>
                  <Typography
                    variant="sm2"
                    sx={{
                      display: "flex",
                      color: theme.palette.custom.darkGrey,
                      paddingBottom: 0.5,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <img
                      src={locIcon}
                      alt="Branch"
                      style={{ width: 20, height: 20, paddingRight: 2, marginRight: 3 }}
                    />
                    {employee.employmentDetails.branch}
                  </Typography>
                  <Typography
                    variant="sm2"
                    sx={{
                      display: "flex",
                      color: theme.palette.custom.darkGrey,
                      paddingBottom: 0.5,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <img
                      src={emailIcon}
                      alt="Email Address"
                      style={{ width: 20, height: 20, paddingRight: 2, marginRight: 3 }}
                    />
                    {employee.personalInformation.emailAddress}
                  </Typography>
                  <Typography
                    variant="sm2"
                    sx={{
                      display: "flex",
                      color: theme.palette.custom.darkGrey,
                      paddingBottom: 0.5,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <img
                      src={phoneIcon}
                      alt="Contact Number"
                      style={{ width: 20, height: 20, paddingRight: 2, marginRight: 3 }}
                    />
                    {employee.personalInformation.contactNumber}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions
                sx={{
                  flexDirection: "row-reverse",
                  marginRight: theme.spacing(1),
                  paddingBottom: theme.spacing(3),
                }}
              >
                <Link
                  to={`/employee/${employee.employeeId}`}
                  style={{
                    color: theme.palette.custom.darkGrey,
                    fontFamily: "Open Sans",
                    fontSize: "12px",
                  }}
                >
                  View Details
                  <ArrowForwardIos sx={{ fontSize: theme.icons.icon2, marginLeft: theme.spacing(0.1) }} />
                </Link>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>
      <LoadingOverlay open={loading} />
    </Box>
  );
};

export default EmployeeList;