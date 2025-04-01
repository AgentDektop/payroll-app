import React, { useState } from "react";
import {
    Box,
    Tabs,
    Tab,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Button,
    useTheme,
    Avatar,
} from "@mui/material";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { formatDecimalValue } from "../../shared/utils/dateAndNumberUtils";
import separatorIcon from "../../shared/assets/icon/vertical-line-separator.png";
import lineIcon from "../../shared/assets/icon/attendance-line-icon.png";
import dateIcon from "../../shared/assets/icon/attendance-tab-date-icon.png";
import shiftIcon from "../../shared/assets/icon/attendance-tab-shift-icon.png";
import clockInIcon from "../../shared/assets/icon/attendance-tab-clock-in-out-icon.png";
import hoursWorkedIcon from "../../shared/assets/icon/attendance-tab-hours-worked-icon.png";
import tardinessIcon from "../../shared/assets/icon/attendance-tab-tardiness-icon.png";
import overtimeHoursIcon from "../../shared/assets/icon/attendance-overtime-hours-icon.png";
import overtimeStartEndIcon from "../../shared/assets/icon/attendance-overtime-start-date-icon.png";
import timeOffTypeDurationIcon from "../../shared/assets/icon/attendance-timeoff-time-type-icon.png";
import timeOffDateIcon from "../../shared/assets/icon/attendance-timeoff-start-date-icon.png";
import actionIcon from "../../shared/assets/icon/attendance-tab-action-icon.png";
import attendanceTabSelectedIcon from "../../shared/assets/icon/attendance-tab-selected-icon.png";
import attendanceTabIcon from "../../shared/assets/icon/attendance-tab-icon.png";
import overtimeTabSelectedIcon from "../../shared/assets/icon/attendance-overtime-tab-selected-icon.png";
import overtimeTabIcon from "../../shared/assets/icon/attendance-overtime-tab-icon.png";
import timeOffTabSelectedIcon from "../../shared/assets/icon/attendance-timeoff-tab-selected-icon.png";
import timeOffTabIcon from "../../shared/assets/icon/attendance-timeoff-tab-icon.png";
import addIcon from "../../shared/assets/icon/attendance-add-icon.png";

const EmployeeAttendanceDetail = ({ attendanceData, overtimeData, timeOffData }) => {
    // State for the bottom set of tabs (Attendance, Overtime, Time Off)
    const [tabValue, setTabValue] = useState(0);
    const navigate = useNavigate();
    const theme = useTheme();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [open, setOpen] = useState(false);
    // Retrieve the start and end dates from the query parameters
    const formattedStartDate = searchParams.get("startDate");
    const formattedEndDate = searchParams.get("endDate");

    // Assuming employee data is passed via location.state.
    const employee = location.state?.employee;
    const attendance = employee.attendance || {};
    const overtime = employee.overtime || {};
    const timeOff = employee.timeOff || {};

    // Fallback if employee data is not available.
    if (!employee) {
        return (
            <Box sx={{ p: 2 }}>
                <Typography variant="h6">No employee data available.</Typography>
            </Box>
        );
    }

    // Handle changes for the bottom tabs.
    const handleChange = (event, newValue) => {
        setTabValue(newValue);
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
                        onClick={() =>
                            navigate(`/time-and-attendance/by-period?startDate=${formattedStartDate}&endDate=${formattedEndDate}`)
                        }

                        sx={{
                            backgroundColor: theme.palette.common.white,
                            borderRadius: "30px",
                            minWidth: 0,
                            width: 40,
                            height: 40,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 0,
                            marginRight: theme.spacing(3),
                        }}
                    >
                        <ArrowBack
                            sx={{
                                color: theme.palette.text.primary,
                                fontSize: 24,
                                fontWeight: 600,
                            }}
                        />
                    </Button>
                    <Avatar
                        alt={employee.employeeName}
                        src={`/assets/avatar/${employee.employeeId}.png`}
                        sx={{ width: 64, height: 64, mr: 2 }}
                    />
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flexGrow: 1 }}>
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                            {employee.employeeName || "N/A"}
                        </Typography>
                        <Typography variant="md3" sx={{ color: theme.palette.custom.lightGrey }}>
                            {employee.employeeId || "N/A"}
                        </Typography>
                    </Box>
                    <Box
                        component="img"
                        src={separatorIcon}
                        alt="Separator"
                        sx={{ height: 40, width: "auto", px: 3 }}
                    />
                    {tabValue === 0 && (
                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "flex-start", flexGrow: 1, paddingRight: 8 }}>
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flexGrow: 1, paddingRight: 8 }}>
                                <Typography
                                    variant="sm2"
                                    sx={{ color: theme.palette.custom.lightGrey }}>
                                    Total Hours Worked:
                                </Typography>
                                <Typography
                                    variant="header3"
                                    sx={{ color: theme.palette.custom.darkGrey }}>
                                    {formatDecimalValue(employee.totalHoursWorked)}
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flexGrow: 1, paddingRight: 8 }}>
                                <Typography
                                    variant="sm2"
                                    sx={{ color: theme.palette.custom.lightGrey }}>
                                    Tardiness:
                                </Typography>
                                <Typography
                                    variant="header3"
                                    sx={{ color: theme.palette.custom.darkGrey }}>
                                    {formatDecimalValue(employee.totalTardiness) || "-"}
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flexGrow: 1, paddingRight: 8 }}>
                                <Typography
                                    variant="sm2"
                                    sx={{ color: theme.palette.custom.lightGrey }}>
                                    Conflict:
                                </Typography>
                                <Typography
                                    variant="header3"
                                    sx={{ color: theme.palette.custom.darkGrey }}>
                                    {employee.totaConflict || "-"}
                                </Typography>
                            </Box>
                        </Box>
                    )}
                    {tabValue === 1 && (
                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "flex-start", flexGrow: 1, paddingRight: 8 }}>
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flexGrow: 1, paddingRight: 8 }}>
                                <Typography
                                    variant="sm2"
                                    sx={{ color: theme.palette.custom.lightGrey }}>
                                    Total Overtime:
                                </Typography>
                                <Typography
                                    variant="header3"
                                    sx={{ color: theme.palette.custom.darkGrey }}>
                                    {employee.totalOvertime || "-"}
                                </Typography>
                            </Box>
                        </Box>
                    )}
                    {tabValue === 2 && (
                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "flex-start", flexGrow: 1, paddingRight: 8 }}>
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flexGrow: 1, paddingRight: 8 }}>
                                <Typography
                                    variant="sm2"
                                    sx={{ color: theme.palette.custom.lightGrey }}>
                                    Annual Paid Time Off:
                                </Typography>
                                <Typography
                                    variant="header3"
                                    sx={{ color: theme.palette.custom.darkGrey }}>
                                    {"-"}
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flexGrow: 1, paddingRight: 8 }}>
                                <Typography
                                    variant="sm2"
                                    sx={{ color: theme.palette.custom.lightGrey }}>
                                    Time Off Used:
                                </Typography>
                                <Typography
                                    variant="header3"
                                    sx={{ color: theme.palette.custom.darkGrey }}>
                                    {"-"}
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flexGrow: 1, paddingRight: 8 }}>
                                <Typography
                                    variant="sm2"
                                    sx={{ color: theme.palette.custom.lightGrey }}>
                                    Remaining Time Off:
                                </Typography>
                                <Typography
                                    variant="header3"
                                    sx={{ color: theme.palette.custom.darkGrey }}>
                                    {"-"}
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>

            <Box
                sx={{
                    width: "90%",
                    maxWidth: 1450,
                    borderBottom: 1,
                    borderColor: theme.palette.custom.darkBrown,
                    marginBottom: 0,
                    paddingBottom: 0,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <Tabs
                    value={tabValue}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        marginBottom: 0,
                        paddingBottom: 0,
                        '& .MuiTab-root': {
                            color: theme.palette.custom.brown,
                            '&:hover': { color: theme.palette.custom.darkBrown },
                            '&.Mui-selected': { color: theme.palette.custom.darkBrown },
                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor: theme.palette.custom.darkBrown,
                        },
                    }}
                >
                    <Tab
                        disableRipple
                        label="Attendance"
                        icon={<img src={tabValue === 0 ? attendanceTabSelectedIcon : attendanceTabIcon} alt="Attendance" style={{ width: 24, height: 24 }} />}
                        iconPosition="start"
                        sx={{ paddingLeft: 1, paddingRight: 1, display: 'flex', justifyContent: 'center', fontSize: 20, mx: 4, textTransform: "capitalize" }}
                    />
                    <Tab
                        disableRipple
                        label="Overtime"
                        icon={<img src={tabValue === 1 ? overtimeTabSelectedIcon : overtimeTabIcon} alt="Overtime" style={{ width: 24, height: 24 }} />}
                        iconPosition="start"
                        sx={{ paddingLeft: 1, paddingRight: 1, display: 'flex', justifyContent: 'center', fontSize: 20, mx: 4, textTransform: "capitalize" }}
                    />
                    <Tab
                        disableRipple
                        label="Time Off"
                        icon={<img src={tabValue === 2 ? timeOffTabSelectedIcon : timeOffTabIcon} alt="Time Off" style={{ width: 24, height: 24 }} />}
                        iconPosition="start"
                        sx={{ paddingLeft: 1, paddingRight: 1, display: 'flex', justifyContent: 'center', fontSize: 20, mx: 4, textTransform: "capitalize" }}
                    />
                </Tabs>
                {tabValue === 1 &&(
                    <Button variant="contained" size="small"
                        sx={{
                            display: { xs: 'none', sm: 'inline-flex' }
                        }}
                        onClick={() => setOpen(true)}
                    >
                        <img
                            src={addIcon}
                            alt="Add Overtime"
                            style={{ width: 20, height: 20 }}

                        />
                        Add Overtime
                    </Button>
                )}
                {tabValue === 2 &&(
                    <Button variant="contained" size="small"
                        sx={{
                            display: { xs: 'none', sm: 'inline-flex' }
                        }}
                        onClick={() => setOpen(true)}
                    >
                        <img
                            src={addIcon}
                            alt="Add Time Off"
                            style={{ width: 20, height: 20 }}

                        />
                        Add Time Off
                    </Button>
                )}
            </Box>

            {/* Bottom Tabs Section for Attendance Details */}
            <Paper sx={{
                width: "90%",
                maxWidth: 1450,
                bgcolor: "#FAFBFB",
                borderRadius: 2,
                border: "1px solid #BDBDBD",
                boxShadow: "1px 1px 10px rgba(175, 136, 98, 0.25)",
                padding: 0,
                margin: 2,
                overflow: "hidden",
            }}
                elevation={0}>

                <Box sx={{ height: "100%", display: "flex", flexDirection: "column", minHeight: 0, maxHeight: "calc(100vh - 280px)", overflow: "auto" }}>
                    {tabValue === 0 && (
                        <TableContainer sx={{ flexGrow: 1, width: "100%" }}>
                            <Box sx={{
                                top: 0,
                                zIndex: 10,
                            }}>
                                <Table stickyHeader sx={{ width: "100%" }}>
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
                                                        src={shiftIcon}
                                                        alt="Date"
                                                        style={{ width: 24, height: 24 }}
                                                    />
                                                    <Typography variant="md3">
                                                        Shift
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <img
                                                        src={clockInIcon}
                                                        alt="Clock-in & out"
                                                        style={{ width: 24, height: 24 }}
                                                    />
                                                    <Typography variant="md3">
                                                        Clock-in & out
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <img
                                                        src={hoursWorkedIcon}
                                                        alt="Hours Worked"
                                                        style={{ width: 24, height: 24 }}
                                                    />
                                                    <Typography variant="md3">
                                                        Hours Worked
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <img
                                                        src={tardinessIcon}
                                                        alt="Tardiness"
                                                        style={{ width: 24, height: 24 }}
                                                    />
                                                    <Typography variant="md3">
                                                        Tardiness
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <img
                                                        src={actionIcon}
                                                        alt="Actions"
                                                        style={{ width: 24, height: 24 }}
                                                    />
                                                    <Typography variant="md3">
                                                        Actions
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {attendance?.length ? (
                                            attendance.map((record, index) => (
                                                <TableRow key={index}>
                                                    <TableCell sx={{ fontSize: "12px", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                        <Typography variant="sm2">{record.date}</Typography>
                                                    </TableCell>
                                                    <TableCell sx={{ fontSize: "12px", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                        <Typography variant="sm2">{record.shift.shiftStart} - {record.shift.shiftEnd}</Typography>
                                                    </TableCell>
                                                    <TableCell sx={{ fontSize: "12px", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                        {record.timeEntries?.length ? (
                                                            record.timeEntries.map((entry) => (
                                                                <Box key={entry._id} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                                                                    <Typography variant="sm2">{entry.clockIn}</Typography>
                                                                    <img src={lineIcon} alt="-" style={{ width: 100, height: 10 }} />
                                                                    <Typography variant="sm2">{entry.clockOut || "-"}</Typography>
                                                                </Box>
                                                            ))
                                                        ) : (
                                                            <Typography variant="md3">No time entries available</Typography>
                                                        )}
                                                    </TableCell>
                                                    <TableCell sx={{ fontSize: "12px", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                        {record.timeEntries?.length
                                                            ? record.timeEntries
                                                                .reduce((total, entry) => total + entry.hoursWorked, 0)
                                                                .toFixed(2) + " hrs"
                                                            : "0.00 hrs"}
                                                    </TableCell>
                                                    <TableCell sx={{ fontSize: "12px", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                        {formatDecimalValue(record.tardiness) || "-"}
                                                    </TableCell>
                                                    
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={6}>
                                                    <Typography>No attendance records available.</Typography>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>


                                </Table>
                            </Box>
                        </TableContainer>
                    )}

                    {tabValue === 1 && (
                        <TableContainer sx={{ flexGrow: 1, width: "100%" }}>
                            <Box sx={{
                                top: 0,
                                zIndex: 10,
                            }}>
                                <Table stickyHeader sx={{ width: "100%" }}>
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
                                                        src={overtimeStartEndIcon}
                                                        alt="Overtime start & end"
                                                        style={{ width: 24, height: 24 }}
                                                    />
                                                    <Typography variant="md3">
                                                        Overtime start & end
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <img
                                                        src={overtimeHoursIcon}
                                                        alt="Overtime Hours"
                                                        style={{ width: 24, height: 24 }}
                                                    />
                                                    <Typography variant="md3">
                                                        Overtime Hours
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <img
                                                        src={actionIcon}
                                                        alt="Actions"
                                                        style={{ width: 24, height: 24 }}
                                                    />
                                                    <Typography variant="md3">
                                                        Actions
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {overtime?.length ? (
                                            overtime.map((record, index) => (
                                                <TableRow key={index}>
                                                    <TableCell sx={{ fontSize: "12px", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                        <Typography variant="sm2">{record.date}</Typography>
                                                    </TableCell>
                                                    <TableCell sx={{ fontSize: "12px", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                        <Typography variant="sm2">{record.overtimeStart} - {record.overtimeEnd}</Typography>
                                                    </TableCell>
                                                    <TableCell sx={{ fontSize: "12px", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                        <Typography variant="sm2">{record.overtimeHours}</Typography>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={6}>
                                                    <Typography>No overtime records.</Typography>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </Box>
                        </TableContainer>
                    )}

                    {tabValue === 2 && (
                        <TableContainer sx={{ flexGrow: 1, width: "100%" }}>
                            <Box sx={{
                                top: 0,
                                zIndex: 10,
                            }}>
                                <Table stickyHeader sx={{ width: "100%" }}>
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: theme.palette.custom.darkerGrey }}>
                                            <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <img
                                                        src={timeOffTypeDurationIcon}
                                                        alt="Time Off Type"
                                                        style={{ width: 24, height: 24 }}
                                                    />
                                                    <Typography variant="md3">
                                                        Time Off Type
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <img
                                                        src={timeOffDateIcon}
                                                        alt="Time Off Start Date"
                                                        style={{ width: 24, height: 24 }}
                                                    />
                                                    <Typography variant="md3">
                                                        Time Off Start Date
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <img
                                                        src={timeOffDateIcon}
                                                        alt="Time Off End Date"
                                                        style={{ width: 24, height: 24 }}
                                                    />
                                                    <Typography variant="md3">
                                                        Time Off End Date
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <img
                                                        src={timeOffTypeDurationIcon}
                                                        alt="Time Off Duration"
                                                        style={{ width: 24, height: 24 }}
                                                    />
                                                    <Typography variant="md3">
                                                        Time Off Duration
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <img
                                                        src={actionIcon}
                                                        alt="Actions"
                                                        style={{ width: 24, height: 24 }}
                                                    />
                                                    <Typography variant="md3">
                                                        Actions
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {timeOff?.length ? (
                                            timeOff.map((record, index) => (
                                                <TableRow key={index}>
                                                    <TableCell sx={{ fontSize: "12px", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                        <Typography variant="sm2">{record.timeOffType}</Typography>
                                                    </TableCell>
                                                    <TableCell sx={{ fontSize: "12px", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                        <Typography variant="sm2">{record.timeOffStartDate} - {record.overtimeEnd}</Typography>
                                                    </TableCell>
                                                    <TableCell sx={{ fontSize: "12px", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                        <Typography variant="sm2">{record.timeOffEndDate}</Typography>
                                                    </TableCell>
                                                    <TableCell sx={{ fontSize: "12px", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                        <Typography variant="sm2">{record.timeOffDuration}</Typography>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={6}>
                                                    <Typography>No time off records.</Typography>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </Box>
                        </TableContainer>
                    )}
                </Box>
            </Paper>

        </Box>
    );
};

export default EmployeeAttendanceDetail;
