import React, { useMemo, useState } from "react";
import {
    Box,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Snackbar,
    Alert,
    TextField,
    InputAdornment,
    Avatar,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse } from "date-fns";
import periodFilterIcon from "../../shared/assets/icon/payrun-per-period-filter-icon.png";
import useGetTimeAndAttendance from "../hooks/useGetTimeAndAttendance"
import employeeSearchIcon from "../../shared/assets/icon/search-employee-icon.png";
import employeeIcon from "../../shared/assets/icon/payrun-employee-icon.png";
import hoursWorkedIcon from "../../shared/assets/icon/attendance-hours-worked-icon.png";
import tardinessIcon from "../../shared/assets/icon/attendance-tardiness-icon.png";
import overtimeIcon from "../../shared/assets/icon/attendance-overtime-icon.png";
import timeOffIcon from "../../shared/assets/icon/attendance-time-off-icon.png";
import conflictIcon from "../../shared/assets/icon/attendance-conflict-icon.png";
import uploadTimeRecordIcon from "../../shared/assets/icon/attendance-upload-time-record-icon-white.png";
import { formatDuration } from "../../shared/utils/dateAndNumberUtils";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoadingOverlay from "../../shared/components/LoadingOverlay";
import UploadTimeRecordModal from "./UploadTimeRecordModal";

const TimeAttendanceTable = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const startDateParam = searchParams.get("startDate");
    const endDateParam = searchParams.get("endDate");
    const initialStartDate = startDateParam ? parse(startDateParam, "dd-MM-yyyy", new Date()) : null;
    const initialEndDate = endDateParam ? parse(endDateParam, "dd-MM-yyyy", new Date()) : null;
    
    const [searchText, setSearchText] = useState('');
    const [dateRange, setDateRange] = useState([initialStartDate, initialEndDate]);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success"});
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [startDate, endDate] = dateRange;

    const formattedStartDate = startDate ? format(startDate, "dd-MM-yyyy") : "";
    const formattedEndDate = endDate ? format(endDate, "dd-MM-yyyy") : "";

    const handleSearchChange = (event) => {
        setSearchText(event.target.value.toLowerCase());
    };

    const refreshData = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    //Sorting
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection((prevDirection) => (prevDirection === "asc" ? "desc" : "asc"));
        } else {
            setSortColumn(column);
            setSortDirection("asc");
        }
    };

    const { attendance, loading, error } = useGetTimeAndAttendance(formattedStartDate, formattedEndDate, refreshTrigger);

    const filterEmployees = (employees) => {
        if (!searchText?.trim()) {
            return employees;
        }
        const searchLower = searchText.toLowerCase();
        return employees.filter((employee) => {
            const nameMatches = employee.employeeName?.toLowerCase().includes(searchLower) || false;
            const idMatches = employee.employeeId?.toLowerCase().includes(searchLower) || false;
            return nameMatches || idMatches;
        });
    };

    const sortEmployees = (employees) => {
        if (!sortColumn) return employees;
        return [...employees].sort((a, b) => {
            const valA = a[sortColumn] ?? 0;
            const valB = b[sortColumn] ?? 0;
            if (valA < valB) return sortDirection === "asc" ? -1 : 1;
            if (valA > valB) return sortDirection === "asc" ? 1 : -1;
            return 0;
        });
    };

    const displayedEmployees = useMemo(() => {
        const filtered = filterEmployees(attendance);
        return sortEmployees(filtered);
    }, [attendance, searchText, sortColumn, sortDirection]);

    const showSnackbar = (message, severity = "success") => {
        setSnackbar({ open: true, message, severity });
    };

    const [uploadModalOpen, setUploadModalOpen] = useState(false);

    const CustomDateInput = React.forwardRef(({ value, onClick }, ref) => (
        <TextField
            onClick={onClick}
            ref={ref}
            value={value}
            placeholder="Select time period"
            variant="outlined"
            size="small"
            sx={{
                backgroundColor: "transparent",
                borderRadius: theme.spacing(1),
                "& .MuiOutlinedInput-root": {
                    boxShadow: "none",
                    "&:hover": {
                        border: `none !important`,
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                        border: `none !important`,
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        border: `none !important`,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: `none !important`
                    },
                },
            }}
            InputProps={{
                readOnly: true,
            }}
        />
    ));
    CustomDateInput.displayName = "CustomDateInput";

    return (
        <Box sx={{ p: theme.spacing(3), height: "100vh", overflowY: "hidden" }}>
            <Box>
                {/* Time & Attendance Header */}
                <Typography variant="header" sx={{ color: theme.palette.custom.darkGrey, paddingBottom: theme.spacing(2) }}>
                    Time & Attendance
                </Typography>
                {/* Date Range */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="md2" sx={{ color: theme.palette.custom.lightGrey, display: "flex", alignItems: "center", gap: 1 }}>
                            <img
                                src={periodFilterIcon}
                                alt="Pay Period"
                                style={{ width: 24, height: 24 }}
                            />
                            Time period:
                        </Typography>
                        <DatePicker
                            selectsRange
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(update) => {
                                setDateRange(update);
                            }}
                            dateFormat="dd-MM-yyyy"
                            placeholderText="Select time period"
                            customInput={<CustomDateInput value={`${formattedStartDate}${startDate && endDate ? " - " : ""}${formattedEndDate}`} />}
                            withPortal
                        />
                    </Box>
                </Box>
            </Box>
            {/* Search Employee Filter */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3, alignItems: "center" }}>
                <TextField
                    placeholder="Search Employee"
                    size="small"
                    sx={{
                        backgroundColor: theme.palette.custom.white,
                        boxShadow: theme.shadows.card,
                        borderRadius: theme.spacing(1),
                        width: "25%",
                    }}
                    onChange={handleSearchChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <img src={employeeSearchIcon} alt="Search" style={{ width: 24, height: 24 }} />
                            </InputAdornment>
                        )
                    }}
                />
                <Button
                    variant="contained"
                    size="small"
                    onClick={() => setUploadModalOpen(true)}
                    startIcon={
                        <img src={uploadTimeRecordIcon} alt="Upload" style={{ width: 20, height: 20 }} />
                    }
                    sx={{
                        px: 2,
                        bgcolor: "#693714",
                        color: "#ffffff",
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600,
                        "&:hover": { bgcolor: "#4b240c" },
                    }}>
                    Upload Time Record
                </Button>
            </Box>
            <UploadTimeRecordModal
                open={uploadModalOpen}
                onClose={() => setUploadModalOpen(false)}
                showSnackbar={showSnackbar}
                refreshData={refreshData}
            />

            {/* Attendance Data Table */}
            <Paper
                sx={{
                    bgcolor: "#FAFBFB",
                    borderRadius: 2,
                    border: "1px solid #BDBDBD",
                    boxShadow: "1px 1px 10px rgba(175, 136, 98, 0.25)",
                    overflow: "hidden",
                }}
                elevation={0}
            >
                <TableContainer sx={{ maxHeight: "calc(100vh - 250px)", overflow: "auto" }}>
                    <Table stickyHeader sx={{ width: "100%" }}>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: theme.palette.custom.darkerGrey }}>
                                <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <img
                                            src={employeeIcon}
                                            alt="Employee"
                                            style={{ width: 20, height: 20 }}
                                        />
                                        <Typography variant="md3">
                                            Employee
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell onClick={() => handleSort("totalHoursWorked")} sx={{ cursor: "pointer", borderRight: `1px solid ${theme.palette.custom.greyBorder}`, px: 1 }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <img
                                            src={hoursWorkedIcon}
                                            alt="Hours Worked"
                                            style={{ width: 20, height: 20 }}
                                        />
                                        <Typography variant="md3">
                                            Hours Worked
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell onClick={() => handleSort("totalTardiness")} sx={{ cursor: "pointer", borderRight: `1px solid ${theme.palette.custom.greyBorder}`, px: 1 }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <img
                                            src={tardinessIcon}
                                            alt="Tardiness"
                                            style={{ width: 20, height: 20 }}
                                        />
                                        <Typography variant="md3">
                                            Tardiness
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell onClick={() => handleSort("totalUndertime")} sx={{ cursor: "pointer", borderRight: `1px solid ${theme.palette.custom.greyBorder}`, px: 1 }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <img
                                            src={tardinessIcon}
                                            alt="Undertime"
                                            style={{ width: 20, height: 20 }}
                                        />
                                        <Typography variant="md3">
                                            Undertime
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell onClick={() => handleSort("totalOvertime")} sx={{ cursor: "pointer", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <img
                                            src={overtimeIcon}
                                            alt="Overtime"
                                            style={{ width: 20, height: 20 }}
                                        />
                                        <Typography variant="md3">
                                            Overtime
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell onClick={() => handleSort("totalTimeOff")} sx={{ cursor: "pointer", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <img
                                            src={timeOffIcon}
                                            alt="Time Off"
                                            style={{ width: 20, height: 20 }}
                                        />
                                        <Typography variant="md3">
                                            Time Off
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell onClick={() => handleSort("totalConflict")} sx={{ cursor: "pointer", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <img
                                            src={conflictIcon}
                                            alt="Conflict"
                                            style={{ width: 20, height: 20 }}
                                        />
                                        <Typography variant="md3">
                                            Conflict
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {attendance?.length ? (
                                displayedEmployees.map((item, index) => (
                                    <TableRow
                                        key={index}
                                        hover
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            navigate(
                                                `/time-attendance/${item.employeeId}?startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
                                                { state: { employee: item } }
                                            );
                                        }}>
                                        <TableCell sx={{ fontSize: "12px", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                                                <Avatar alt="Employee" src={item.employeeImage} sx={{ width: 40, height: 40, marginRight: 2 }} />
                                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                                    <Typography variant="md3">{item.employeeName || "N/A"}</Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {item.employeeId || "N/A"}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ fontSize: "14px", borderRight: `1px solid ${theme.palette.custom.greyBorder}`, fontWeight: item.totalHoursWorked < 1 ? 700 : "inherit" }}>
                                            {item.totalHoursWorked > 0 ? formatDuration(item.totalHoursWorked) : "-"}
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                fontSize: "14px",
                                                borderRight: `1px solid ${theme.palette.custom.greyBorder}`,
                                                color: item.totalTardiness > 0 ? theme.palette.error.main : "inherit",
                                                fontWeight: item.totalTardiness > 0 ? 700 : "inherit"
                                            }}>
                                            {item.totalTardiness > 0 ? formatDuration(item.totalTardiness) : "-"}
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                fontSize: "14px",
                                                borderRight: `1px solid ${theme.palette.custom.greyBorder}`,
                                                color: item.totalUndertime > 0 ? theme.palette.error.main : "inherit",
                                                fontWeight: item.totalUndertime > 0 ? 700 : "inherit"
                                            }}>
                                            {item.totalUndertime > 0 ? formatDuration(item.totalUndertime) : "-"}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: "14px", borderRight: `1px solid ${theme.palette.custom.greyBorder}`, fontWeight: item.totalOvertime < 1 ? 700 : "inherit" }}>
                                            {item.totalOvertime > 0 ? formatDuration(item.totalOvertime) : "-"}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: "14px", borderRight: `1px solid ${theme.palette.custom.greyBorder}`, fontWeight: item.totalTimeOff < 1 ? 700 : "inherit" }}>
                                            {item.totalTimeOff > 0 ? `${item.totalTimeOff}d` : "-"}
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                fontSize: "14px",
                                                borderRight: `1px solid ${theme.palette.custom.greyBorder}`,
                                                color: item.totalConflict > 0 ? theme.palette.error.main : "inherit",
                                                fontWeight: item.totalConflict > 0 ? 700 : "inherit"
                                            }}>
                                            {item.totalConflict}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6}>
                                        <Typography>No time and attendance records available.</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    severity={snackbar.severity}
                    sx={{ width: "100%", fontSize: "0.875rem" }}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>

            <LoadingOverlay open={loading} />
        </Box>
    );
};

export default TimeAttendanceTable;
