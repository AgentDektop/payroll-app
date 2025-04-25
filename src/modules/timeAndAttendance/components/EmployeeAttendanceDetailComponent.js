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
    IconButton,
    Tooltip,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Alert,
    Snackbar
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { format } from "date-fns";
import { formatDuration, parseDateString } from "../../shared/utils/dateAndNumberUtils";
import separatorIcon from "../../shared/assets/icon/vertical-line-separator.png";
import lineIcon from "../../shared/assets/icon/attendance-line-icon.png";
import dateIcon from "../../shared/assets/icon/attendance-tab-date-icon.png";
import shiftIcon from "../../shared/assets/icon/attendance-tab-shift-icon.png";
import clockInIcon from "../../shared/assets/icon/attendance-tab-clock-in-out-icon.png";
import hoursWorkedIcon from "../../shared/assets/icon/attendance-tab-hours-worked-icon.png";
import tardinessIcon from "../../shared/assets/icon/attendance-tab-tardiness-icon.png";
import overtimeHoursIcon from "../../shared/assets/icon/attendance-overtime-hours-icon.png";
import overtimeStartEndIcon from "../../shared/assets/icon/attendance-overtime-start-date-icon.png";
import typeIcon from "../../shared/assets/icon/type-column-icon.png";
import startDateIcon from "../../shared/assets/icon/start-date-column-icon.png";
import endDateIcon from "../../shared/assets/icon/end-date-column-icon.png";
import timeOffDurationIcon from "../../shared/assets/icon/attendance-timeoff-duration-icon.png";
import actionIcon from "../../shared/assets/icon/attendance-tab-action-icon.png";
import attendanceTabSelectedIcon from "../../shared/assets/icon/attendance-tab-selected-icon.png";
import attendanceTabIcon from "../../shared/assets/icon/attendance-tab-icon.png";
import overtimeTabSelectedIcon from "../../shared/assets/icon/attendance-overtime-tab-selected-icon.png";
import overtimeTabIcon from "../../shared/assets/icon/attendance-overtime-tab-icon.png";
import timeOffTabSelectedIcon from "../../shared/assets/icon/attendance-timeoff-tab-selected-icon.png";
import timeOffTabIcon from "../../shared/assets/icon/attendance-timeoff-tab-icon.png";
import additionalEarningsTabSelectedIcon from "../../shared/assets/icon/attendance-additional-earnings-tab-selected-icon.png";
import additionalEarningsTabIcon from "../../shared/assets/icon/attendance-additional-earnings-tab-icon.png";
import deductionsTabSelectedIcon from "../../shared/assets/icon/attendance-deductions-tab-selected-icon.png";
import deductionsTabIcon from "../../shared/assets/icon/attendance-deductions-tab-icon.png";
import descriptionIcon from "../../shared/assets/icon/description-column-icon.png";
import deductionAmountIcon from "../../shared/assets/icon/deduction-amount-column-icon.png";
import addIcon from "../../shared/assets/icon/attendance-add-icon.png";
import totalEarningsIcon from "../../shared/assets/icon/total-payroll-cost-icon.png";
import breakIcon from "../../shared/assets/icon/attendance-break-icon.png";
import breakTimeIcon from "../../shared/assets/icon/attendance-break-time-icon.png";
import editIcon from "../../shared/assets/icon/attendance-edit-icon.png";
import deleteIcon from "../../shared/assets/icon/attendance-delete-icon.png";
import saveIcon from "../../shared/assets/icon/attendance-save-icon.png";
import cancelIcon from "../../shared/assets/icon/attendance-cancel-icon.png";
import AddOvertimeModal from "./AddOvertimeModal";
import AddTimeOffModal from "./AddTimeOffModal";
import AddEarningsModal from "./AddEarningsModal";
import AddDeductionModal from "./AddDeductionModal";
import useSubmit from "../hooks/useSubmit";
import LoadingOverlay from "../../shared/components/LoadingOverlay";
import { updateEmployeeAttendance, deleteEmployeeAttendance, updateEmployeeOvertime, deleteEmployeeOvertime, updateEmployeeTimeOff, deleteEmployeeTimeOff, updateEmployeeEarnings, deleteEmployeeEarnings, updateEmployeeDeduction, deleteEmployeeDeduction } from "../services/TimeAndAttendanceAPI";

const earningTypes = [
    { "key": "HOLIDAY", "label": "Holiday" },
    { "key": "CANCELLED_OFF", "label": "Cancelled Off" }
];

const deductionTypes = [
    { "key": "CASH_ADVANCE", "label": "Cash Advance" },
    { "key": "FINES", "label": "Fines" }
];

const timeOffTypes = [
    { "key": "VACATION_LEAVE", "label": "Vacation Leave" },
    { "key": "SICK_LEAVE", "label": "Sick Leave" },
    { "key": "MATERNITY_LEAVE", "label": "Maternity Leave" },
    { "key": "EMERGENCY_LEAVE", "label": "Emergency Leave" },
    { "key": "BEREAVEMENT_LEAVE", "label": "Bereavement Leave" },
    { "key": "LEAVE_WITHOUT_PAY", "label": "Leave without Pay" },
    { "key": "OFFSET", "label": "Offset" }
];

const EmployeeAttendanceDetail = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [editingRowId, setEditingRowId] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [rowToDelete, setRowToDelete] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [deleteCallback, setDeleteCallback] = useState(() => { });
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success"});

    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();

    const [searchParams] = useSearchParams();
    const formattedStartDate = searchParams.get("startDate");
    const formattedEndDate = searchParams.get("endDate");

    const useSaveAttendance = useSubmit(updateEmployeeAttendance);
    const useDeleteAttendance = useSubmit(deleteEmployeeAttendance);
    const useSaveOvertime = useSubmit(updateEmployeeOvertime);
    const useDeleteOvertime = useSubmit(deleteEmployeeOvertime);
    const useSaveTimeOff = useSubmit(updateEmployeeTimeOff);
    const useDeleteTimeOff = useSubmit(deleteEmployeeTimeOff);
    const useSaveEarnings = useSubmit(updateEmployeeEarnings);
    const useDeleteEarnings = useSubmit(deleteEmployeeEarnings);
    const useSaveDeduction = useSubmit(updateEmployeeDeduction);
    const useDeleteDeduction = useSubmit(deleteEmployeeDeduction);

    const [employee, setEmployee] = useState(location.state?.employee);
    const attendance = employee.attendance || {};
    const overtime = employee.overtime || {};
    const timeOff = employee.timeOff || {};
    const additionalEarnings = employee.additionalEarnings || {};
    const deductions = employee.deductions || {};
    const documentId = employee._id;

    const isEditing = (row) => editingRowId === row._id;

    const handleTabChange = (event, newValue) => setActiveTab(newValue);

    const handleSubmitSuccess = (newRecord) => {
        setEmployee(newRecord);
    };

    const handleEdit = (row) => {
        setEditingRowId(row._id);
        setEditedData({ ...row });
    };

    const handleDelete = (row, deleteCallback) => {
        setDeleteCallback(() => deleteCallback);
        setRowToDelete(row);
        setOpenDialog(true);
    };

    const handleSave = async (saveCallback) => {
        try {
            const result = await saveCallback({ ...editedData, documentId });
            showSnackbar("Changes saved successfully.", "success");
            handleSubmitSuccess(result);
        } catch (error) {
            showSnackbar("Something went wrong while saving.", "error");
        } finally {
            setEditingRowId(null);
            setEditedData({});
        }
    };

    const handleCancel = () => {
        setEditingRowId(null);
        setEditedData({});
    };

    const handleShiftChange = (key, value) => {
        const updatedShift = { ...editedData.shift, [key]: value };
        setEditedData((prev) => ({ ...prev, shift: updatedShift }));
    };

    const handleTimeEntryChange = (entryIndex, key, value) => {
        const updatedEntries = [...editedData.timeEntries];
        updatedEntries[entryIndex][key] = value;
        setEditedData((prev) => ({ ...prev, timeEntries: updatedEntries }));
    };

    const handleValueChange = (key, value, isNumber = false) => {
        setEditedData((prev) => ({ ...prev, [key]: isNumber ? Number(value) : value }));
    };

    const handleDateChange = (key, date) => {
        setEditedData((prev) => ({ ...prev, [key]: format(date, "dd-MM-yyyy") }));
    }

    const handleConfirmDelete = async () => {
        if (!rowToDelete || !deleteCallback) return;

        try {
            const result = await deleteCallback({ ...rowToDelete, documentId });
            showSnackbar("Deleted successfully.", "success");
            handleSubmitSuccess(result);
            setOpenDialog(false);
            setRowToDelete(null);
        } catch (error) {
            showSnackbar("Something went wrong while deleting.", "error");
        }
    };

    const handleCancelDelete = () => {
        setOpenDialog(false);
    };

    const showSnackbar = (message, severity = "success") => {
        setSnackbar({ open: true, message, severity });
    };

    const getLoadingForTab = (tabIndex) => {
        switch (tabIndex) {
            case 0: 
                return useSaveAttendance.loading || useDeleteAttendance.loading;
            case 1: 
                return useSaveOvertime.loading || useDeleteOvertime.loading;
            case 2: 
                return useSaveTimeOff.loading || useDeleteTimeOff.loading;
            case 3: 
                return useSaveEarnings.loading || useDeleteEarnings.loading;
            case 4: 
                return useSaveDeduction.loading || useDeleteDeduction.loading;
            default:
                return false;
        }
    };

    const summaryByTab = {
        0: [
            { label: "Total Hours Worked", value: formatDuration(employee.totalHoursWorked) },
            { label: "Total Tardiness", value: formatDuration(employee.totalTardiness) },
            { label: "Total Undertime", value: formatDuration(employee.totalUndertime) },
            { label: "Conflict", value: employee.totalConflict || "-" },
        ],
        1: [
            { label: "Total Overtime", value: formatDuration(employee.totalOvertime) || "-" },
        ],
        2: [
            { label: "Annual Paid Time Off", value: "-" },
            { label: "Time Off Used", value: "-" },
            { label: "Remaining Time Off", value: "-" },
        ],
        3: [
            { label: "Total Earnings", value: formatDuration(employee.totalAdditionalEarnings) || "-" },
        ],
        4: [
            { label: "Total Deductions", value: `${employee.totalDeduction} AED` || "-" },
        ],
    };

    const tabs = [
        {
            label: "Attendance",
            icon: attendanceTabIcon,
            selectedIcon: attendanceTabSelectedIcon,
        },
        {
            label: "Overtime",
            icon: overtimeTabIcon,
            selectedIcon: overtimeTabSelectedIcon,
        },
        {
            label: "Time Off",
            icon: timeOffTabIcon,
            selectedIcon: timeOffTabSelectedIcon,
        },
        {
            label: "Addt'l Earnings",
            icon: additionalEarningsTabIcon,
            selectedIcon: additionalEarningsTabSelectedIcon,
        },
        {
            label: "Addt'l Deductions",
            icon: deductionsTabIcon,
            selectedIcon: deductionsTabSelectedIcon,
        },
    ];

    const actionLabels = {
        1: "Add Overtime",
        2: "Add Time Off",
        3: "Add Earnings",
        4: "Add Deduction",
    };

    const renderActions = ({ saveCallback = () => { }, deleteCallback = () => { }, } = {}) => (
        (row) => (
            <Box sx={{ display: "flex", gap: 1 }}>
                {isEditing(row) ? (
                    <>
                        <Tooltip title="Save">
                            <IconButton onClick={() => handleSave(saveCallback)} size="small">
                                <img src={saveIcon} alt="Save" width={18} height={18} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Cancel">
                            <IconButton onClick={handleCancel} size="small">
                                <img src={cancelIcon} alt="Cancel" width={18} height={18} />
                            </IconButton>
                        </Tooltip>
                    </>
                ) : (
                    <>
                        <Tooltip title="Edit">
                            <IconButton onClick={() => handleEdit(row)} size="small">
                                <img src={editIcon} alt="Edit" width={18} height={18} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton onClick={() => handleDelete(row, deleteCallback)} size="small">
                                <img src={deleteIcon} alt="Delete" width={18} height={18} />
                            </IconButton>
                        </Tooltip>
                    </>
                )}
            </Box>
        )
    );

    const attendanceColumns = [
        {
            label: "Date",
            icon: dateIcon,
            render: (row) => <Typography variant="sm2">{row.date}</Typography>
        },
        {
            label: "Shift",
            icon: shiftIcon,
            render: (row) =>
                isEditing(row)
                    ?
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <TextField size="small" variant="outlined" sx={{ maxWidth: 100, "& .MuiInputBase-input": { ...theme.typography.sm4 } }} placeholder="Start" defaultValue={editedData.shift?.shiftStart || ""} onBlur={(e) => handleShiftChange("shiftStart", e.target.value)} />
                        <Typography variant="sm2" sx={{ display: 'flex', alignItems: 'center' }}>-</Typography>
                        <TextField size="small" variant="outlined" sx={{ maxWidth: 100, "& .MuiInputBase-input": { ...theme.typography.sm4 } }} placeholder="End" defaultValue={editedData.shift?.shiftEnd || ""} onBlur={(e) => handleShiftChange("shiftEnd", e.target.value)} />
                    </Box>
                    :
                    <Typography variant="sm2">{row.shift.shiftStart} - {row.shift.shiftEnd}</Typography>
        },
        {
            label: "Break Time",
            icon: breakTimeIcon,
            render: row =>
                isEditing(row)
                    ?
                    <TextField
                        type="number"
                        size="small"
                        variant="outlined"
                        sx={{
                            maxWidth: 100,
                            "& .MuiInputBase-input": { ...theme.typography.sm4 },
                            "& input[type=number]": {
                                MozAppearance: "textfield",
                            },
                            "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button": {
                                WebkitAppearance: "none",
                                margin: 0,
                            },
                        }}
                        defaultValue={editedData.breakDuration || ""}
                        onBlur={(e) => handleValueChange("breakDuration", e.target.value, true)}
                    />
                    :
                    <Typography variant="sm2">{formatDuration(row.breakDuration) || "-"}</Typography>
        },
        {
            label: "Clock-in & out",
            icon: clockInIcon,
            render: (row) =>
                isEditing(row)
                    ?
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        {editedData.timeEntries?.map((entry, i) => (
                            <Box key={entry._id} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Typography variant="sm2">{entry.clockIn}</Typography>
                                <img src={lineIcon} alt="-" style={{ width: 100, height: 10 }} />
                                <TextField size="small" variant="outlined" sx={{ maxWidth: 100, "& .MuiInputBase-input": { ...theme.typography.sm4 } }} placeholder="Clock Out" defaultValue={entry.clockOut || ""} onBlur={(e) => handleTimeEntryChange(i, "clockOut", e.target.value)} />
                            </Box>
                        ))}
                    </Box>
                    :
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        {row.timeEntries?.map((entry) => (
                            <Box key={entry._id} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Typography variant="sm2">{entry.clockIn}</Typography>
                                <img src={lineIcon} alt="-" style={{ width: 100, height: 10 }} />
                                <Typography variant="sm2" sx={{ color: entry.clockOut ? "inherit" : theme.palette.error.main }}>
                                    {entry.clockOut || "-"}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
        },
        {
            label: "Hours Worked",
            icon: hoursWorkedIcon,
            render: row => <Typography variant="sm2">{formatDuration(row.hoursWorked)}</Typography>
        },
        {
            label: "Tardiness",
            icon: tardinessIcon,
            render: row => <Typography variant="sm2">{formatDuration(row.tardiness) || "-"}</Typography>
        },
        {
            label: "Undertime",
            icon: tardinessIcon,
            render: row => <Typography variant="sm2">{formatDuration(row.undertime) || "-"}</Typography>
        },
        {
            label: "Hours on Break",
            icon: breakIcon,
            render: row => <Typography variant="sm2">{formatDuration(row.hoursOnBreak) || "-"}</Typography>
        },
        {
            label: "Actions",
            icon: actionIcon,
            render: renderActions({ saveCallback: useSaveAttendance.submit, deleteCallback: useDeleteAttendance.submit })
        }
    ];

    const overtimeColumns = [
        {
            label: "Date",
            icon: dateIcon,
            render: row =>
                isEditing(row)
                    ?
                    <DatePicker
                        selected={
                            typeof editedData.date === "string"
                                ? parseDateString(editedData.date)
                                : editedData.date || new Date()
                        }
                        onChange={(newDate) => handleDateChange("date", newDate)}
                        dateFormat="dd-MM-yyyy"
                        customInput={
                            <TextField
                                size="small"
                                fullWidth
                                sx={{ maxWidth: 140, "& .MuiInputBase-input": { ...theme.typography.sm4 } }}
                                InputProps={{
                                    endAdornment: (
                                        <img src={dateIcon} alt="Date" style={{ width: 18, height: 18 }} />
                                    )
                                }}
                            />
                        }
                    />
                    :
                    <Typography variant="sm2">{row.date}</Typography>
        },
        {
            label: "Overtime start & end",
            icon: overtimeStartEndIcon,
            render: row =>
                isEditing(row)
                    ?
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <TextField
                            size="small"
                            variant="outlined"
                            sx={{ maxWidth: 100, "& .MuiInputBase-input": { ...theme.typography.sm4 } }}
                            placeholder="Overtime Start"
                            defaultValue={editedData.overtimeStart || ""}
                            onBlur={(e) => handleValueChange("overtimeStart", e.target.value)}
                        />
                        <img src={lineIcon} alt="-" style={{ width: 100, height: 10 }} />
                        <TextField
                            size="small"
                            variant="outlined"
                            sx={{ maxWidth: 100, "& .MuiInputBase-input": { ...theme.typography.sm4 } }}
                            placeholder="Overtime End"
                            defaultValue={editedData.overtimeEnd || ""}
                            onBlur={(e) => handleValueChange("overtimeEnd", e.target.value)}
                        />
                    </Box>
                    :
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography variant="sm2">{row.overtimeStart}</Typography>
                        <img src={lineIcon} alt="-" style={{ width: 100, height: 10 }} />
                        <Typography variant="sm2">{row.overtimeEnd || "-"}</Typography>
                    </Box>
        },
        {
            label: "Overtime Hours",
            icon: overtimeHoursIcon,
            render: row => <Typography variant="sm2">{formatDuration(row.overtimeHours)}</Typography>
        },
        {
            label: "Actions",
            icon: actionIcon,
            render: renderActions({ saveCallback: useSaveOvertime.submit, deleteCallback: useDeleteOvertime.submit })
        }
    ];

    const timeOffColumns = [
        {
            label: "Type",
            icon: typeIcon,
            render: row => <Typography variant="sm2">{timeOffTypes.find(t => t.key === row.timeOffType)?.label || row.timeOffType}</Typography>
        },
        {
            label: "Start Date",
            icon: startDateIcon,
            render: row =>
                isEditing(row)
                    ?
                    <DatePicker
                        selected={
                            typeof editedData.timeOffStartDate === "string"
                                ? parseDateString(editedData.timeOffStartDate)
                                : editedData.timeOffStartDate || new Date()
                        }
                        onChange={(newDate) => handleDateChange("timeOffStartDate", newDate)}
                        dateFormat="dd-MM-yyyy"
                        customInput={
                            <TextField
                                size="small"
                                fullWidth
                                sx={{ maxWidth: 140, "& .MuiInputBase-input": { ...theme.typography.sm4 } }}
                                InputProps={{
                                    endAdornment: (
                                        <img src={dateIcon} alt="Start Date" style={{ width: 18, height: 18 }} />
                                    )
                                }}
                            />
                        }
                    />
                    :
                    <Typography variant="sm2">{row.timeOffStartDate}</Typography>
        },
        {
            label: "End Date",
            icon: endDateIcon,
            render: row =>
                isEditing(row)
                    ?
                    <DatePicker
                        selected={
                            typeof editedData.timeOffEndDate === "string"
                                ? parseDateString(editedData.timeOffEndDate)
                                : editedData.timeOffEndDate || new Date()
                        }
                        onChange={(newDate) => handleDateChange("timeOffEndDate", newDate)}
                        dateFormat="dd-MM-yyyy"
                        customInput={
                            <TextField
                                size="small"
                                fullWidth
                                sx={{ maxWidth: 140, "& .MuiInputBase-input": { ...theme.typography.sm4 } }}
                                InputProps={{
                                    endAdornment: (
                                        <img src={dateIcon} alt="End Date" style={{ width: 18, height: 18 }} />
                                    )
                                }}
                            />
                        }
                    />
                    :
                    <Typography variant="sm2">{row.timeOffEndDate}</Typography>
        },
        {
            label: "Duration (Days)",
            icon: timeOffDurationIcon,
            render: row =>
                isEditing(row)
                    ?
                    <TextField
                        type="number"
                        size="small"
                        variant="outlined"
                        sx={{
                            maxWidth: 100,
                            "& .MuiInputBase-input": { ...theme.typography.sm4 },
                            "& input[type=number]": {
                                MozAppearance: "textfield",
                            },
                            "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button": {
                                WebkitAppearance: "none",
                                margin: 0,
                            },
                        }}
                        defaultValue={editedData.timeOffDuration || ""}
                        onBlur={(e) => handleValueChange("timeOffDuration", e.target.value, true)}
                    />
                    :
                    <Typography variant="sm2">{`${row.timeOffDuration}d`}</Typography>
        },
        {
            label: "Actions",
            icon: actionIcon,
            render: renderActions({ saveCallback: useSaveTimeOff.submit, deleteCallback: useDeleteTimeOff.submit })
        },
    ];

    const additionalEarningsColumns = [
        {
            label: "Date",
            icon: dateIcon,
            render: row =>
                isEditing(row)
                    ?
                    <DatePicker
                        selected={
                            typeof editedData.date === "string"
                                ? parseDateString(editedData.date)
                                : editedData.date || new Date()
                        }
                        onChange={(newDate) => handleDateChange("date", newDate)}
                        dateFormat="dd-MM-yyyy"
                        customInput={
                            <TextField
                                size="small"
                                fullWidth
                                sx={{ maxWidth: 140, "& .MuiInputBase-input": { ...theme.typography.sm4 } }}
                                InputProps={{
                                    endAdornment: (
                                        <img src={dateIcon} alt="Date" style={{ width: 18, height: 18 }} />
                                    )
                                }}
                            />
                        }
                    />
                    :
                    <Typography variant="sm2">{row.date}</Typography>
        },
        {
            label: "Type",
            icon: typeIcon,
            render: row =>
                isEditing(row)
                    ?
                    <TextField
                        select
                        size="small"
                        variant="outlined"
                        fullWidth
                        value={editedData.earningsType || ""}
                        onChange={(e) => handleValueChange("earningsType", e.target.value)}
                        sx={{ maxWidth: 140, "& .MuiInputBase-input": { ...theme.typography.sm4 } }}
                    >
                        {earningTypes.map((type) => (
                            <MenuItem key={type.key} value={type.key}>
                                {type.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    :
                    <Typography variant="sm2">{earningTypes.find(t => t.key === row.earningsType)?.label || row.earningsType}</Typography>
        },
        {
            label: "Earnings (Hours)",
            icon: totalEarningsIcon,
            render: row =>
                isEditing(row)
                    ?
                    <TextField
                        type="number"
                        size="small"
                        variant="outlined"
                        sx={{
                            maxWidth: 100,
                            "& .MuiInputBase-input": { ...theme.typography.sm4 },
                            "& input[type=number]": {
                                MozAppearance: "textfield",
                            },
                            "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button": {
                                WebkitAppearance: "none",
                                margin: 0,
                            },
                        }}
                        defaultValue={editedData.earningsTotal || ""}
                        onBlur={(e) => handleValueChange("earningsTotal", e.target.value, true)}
                    />
                    :
                    <Typography variant="sm2">{formatDuration(row.earningsTotal)}</Typography>
        },
        {
            label: "Actions",
            icon: actionIcon,
            render: renderActions({ saveCallback: useSaveEarnings.submit, deleteCallback: useDeleteEarnings.submit })
        },
    ];

    const deductionsColumns = [
        {
            label: "Date",
            icon: dateIcon,
            render: row =>
                isEditing(row)
                    ?
                    <DatePicker
                        selected={
                            typeof editedData.date === "string"
                                ? parseDateString(editedData.date)
                                : editedData.date || new Date()
                        }
                        onChange={(newDate) => handleDateChange("date", newDate)}
                        dateFormat="dd-MM-yyyy"
                        customInput={
                            <TextField
                                size="small"
                                fullWidth
                                sx={{ maxWidth: 140, "& .MuiInputBase-input": { ...theme.typography.sm4 } }}
                                InputProps={{
                                    endAdornment: (
                                        <img src={dateIcon} alt="Date" style={{ width: 18, height: 18 }} />
                                    )
                                }}
                            />
                        }
                    />
                    :
                    <Typography variant="sm2">{row.date}</Typography>
        },
        {
            label: "Type",
            icon: typeIcon,
            render: row =>
                isEditing(row)
                    ?
                    <TextField
                        select
                        size="small"
                        variant="outlined"
                        fullWidth
                        value={editedData.deductionType || ""}
                        onChange={(e) => handleValueChange("deductionType", e.target.value)}
                        sx={{ maxWidth: 140, "& .MuiInputBase-input": { ...theme.typography.sm4 } }}
                    >
                        {deductionTypes.map((type) => (
                            <MenuItem key={type.key} value={type.key}>
                                {type.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    :
                    <Typography variant="sm2">{deductionTypes.find(t => t.key === row.deductionType)?.label || row.deductionType} </Typography>
        },
        {
            label: "Description",
            icon: descriptionIcon,
            render: row =>
                isEditing(row)
                    ?
                    <TextField
                        type="text"
                        size="small"
                        variant="outlined"
                        sx={{
                            maxWidth: 140,
                            "& .MuiInputBase-input": { ...theme.typography.sm4 },
                        }}
                        defaultValue={editedData.deductionDescription || ""}
                        onBlur={(e) => handleValueChange("deductionDescription", e.target.value)}
                    />
                    :
                    <Typography variant="sm2">{row.deductionDescription}</Typography>
        },
        {
            label: "Amount (AED)",
            icon: deductionAmountIcon,
            render: row =>
                isEditing(row)
                    ?
                    <TextField
                        type="number"
                        size="small"
                        variant="outlined"
                        sx={{
                            maxWidth: 100,
                            "& .MuiInputBase-input": { ...theme.typography.sm4 },
                            "& input[type=number]": {
                                MozAppearance: "textfield",
                            },
                            "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button": {
                                WebkitAppearance: "none",
                                margin: 0,
                            },
                        }}
                        defaultValue={editedData.deductionAmount || ""}
                        onBlur={(e) => handleValueChange("deductionAmount", e.target.value, true)}
                    />
                    :
                    <Typography variant="sm2">{`${row.deductionAmount} AED`}</Typography>
        },
        {
            label: "Actions",
            icon: actionIcon,
            render: renderActions({ saveCallback: useSaveDeduction.submit, deleteCallback: useDeleteDeduction.submit })
        }
    ];

    const HeaderCell = ({ icon, label }) => (
        <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <img src={icon} alt={label} style={{ width: 24, height: 24 }} />
                <Typography variant="md3">{label}</Typography>
            </Box>
        </TableCell>
    );

    const DataCell = ({ children }) => (
        <TableCell sx={{ fontSize: "12px", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
            {children}
        </TableCell>
    );

    const DataTable = ({ columns, data, noDataMessage }) => (
        <TableContainer sx={{ flexGrow: 1 }}>
            <Table stickyHeader sx={{ width: "100%" }}>
                <TableHead>
                    <TableRow sx={{ backgroundColor: theme.palette.custom.darkerGrey }}>
                        {columns.map((col, index) => (
                            <HeaderCell key={index} icon={col.icon} label={col.label} />
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data?.length
                            ?
                            data.map((row, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {columns.map((col, colIndex) => (
                                        <DataCell key={colIndex}>
                                            {col.render(row)}
                                        </DataCell>
                                    ))}
                                </TableRow>
                            ))
                            :
                            <TableRow>
                                <TableCell colSpan={columns.length}>
                                    <Typography>{noDataMessage}</Typography>
                                </TableCell>
                            </TableRow>
                    }
                </TableBody>
            </Table>
            {ConfirmDialog}
        </TableContainer>
    );

    const ConfirmDialog = (
        <Dialog open={openDialog} onClose={handleCancelDelete}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
                <Typography variant="sm3">Are you sure you want to delete this record?</Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleCancelDelete}
                    variant="outlined"
                    sx={{
                        borderColor: theme.palette.custom.darkBrown,
                        backgroundColor: theme.palette.custom.white,
                        color: theme.palette.custom.darkBrown,
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleConfirmDelete}
                    variant="contained"
                    sx={{
                        borderColor: theme.palette.custom.darkBrown,
                        backgroundColor: theme.palette.custom.darkBrown,
                        color: theme.palette.custom.white,
                    }}
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );

    if (!employee) {
        return (
            <Box sx={{ p: 2 }}>
                <Typography variant="h6">No employee data available.</Typography>
            </Box>
        );
    }

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
                    justifyContent: "flex-start",
                    width: "90%",
                    maxWidth: 1400,
                    mb: 2,
                    gap: 2,
                }}
            >
                {/* Back button */}
                <Button
                    onClick={() =>
                        navigate(`/time-and-attendance/by-period?startDate=${formattedStartDate}&endDate=${formattedEndDate}`)
                    }
                    sx={{
                        backgroundColor: theme.palette.common.white,
                        borderRadius: "30px",
                        width: 40,
                        height: 40,
                        minWidth: 0,
                        padding: 0,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <ArrowBack sx={{ color: theme.palette.text.primary, fontSize: 24, fontWeight: 600 }} />
                </Button>

                {/* Avatar */}
                <Avatar
                    alt={employee.employeeName}
                    src={`/assets/avatar/${employee.employeeId}.png`}
                    sx={{ width: 64, height: 64 }}
                />

                {/* Name + ID */}
                <Box sx={{ display: "flex", flexDirection: "column", ml: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        {employee.employeeName || "N/A"}
                    </Typography>
                    <Typography variant="md3" sx={{ color: theme.palette.custom.lightGrey }}>
                        {employee.employeeId || "N/A"}
                    </Typography>
                </Box>

                {/* Separator Icon */}
                <Box
                    component="img"
                    src={separatorIcon}
                    alt="Separator"
                    sx={{ height: 40, width: "auto", mx: 4 }}
                />

                {/* Summary Fields */}
                <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap", alignItems: "flex-start" }}>
                    {(summaryByTab[activeTab] || []).map((item, idx) => (
                        <Box key={idx} sx={{ display: "flex", flexDirection: "column" }}>
                            <Typography variant="sm2" sx={{ color: theme.palette.custom.lightGrey }}>
                                {item.label}
                            </Typography>
                            <Typography variant="header3" sx={{ color: theme.palette.custom.darkGrey }}>
                                {item.value}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

            <Box
                sx={{
                    width: "90%",
                    maxWidth: 1450,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: 1,
                    borderColor: theme.palette.custom.darkBrown,
                    gap: 2,
                }}
            >
                {/* Tabs container */}
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{
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
                        {tabs.map((tab, index) => (
                            <Tab
                                key={index}
                                disableRipple
                                label={tab.label}
                                icon={
                                    <img
                                        src={activeTab === index ? tab.selectedIcon : tab.icon}
                                        alt={tab.label}
                                        style={{ width: 24, height: 24 }}
                                    />
                                }
                                iconPosition="start"
                                sx={{
                                    px: 1,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    fontSize: 20,
                                    mx: 4,
                                    textTransform: "capitalize",
                                }}
                            />
                        ))}
                    </Tabs>
                </Box>

                {/* Action button */}
                <Box sx={{ flexShrink: 0 }}>
                    {actionLabels[activeTab] && (
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => setOpenModal(true)}
                            startIcon={
                                <img
                                    src={   addIcon}
                                    alt={`Add ${actionLabels[activeTab]}`}
                                    style={{ width: 20, height: 20 }}
                                />
                            }
                            sx={{
                                "&:hover": { bgcolor: "#4b240c" },
                            }}
                        >
                            {actionLabels[activeTab]}
                        </Button>
                    )}
                </Box>
            </Box>

            <Paper
                elevation={0}
                sx={{
                    width: "90%",
                    maxWidth: 1450,
                    bgcolor: "#FAFBFB",
                    borderRadius: 2,
                    border: "1px solid #BDBDBD",
                    boxShadow: "1px 1px 10px rgba(175, 136, 98, 0.25)",
                    my: 2,
                    overflow: "hidden",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        maxHeight: "calc(100vh - 280px)",
                        overflow: "auto",
                    }}
                >
                    {activeTab === 0 && (
                        <DataTable columns={attendanceColumns} data={attendance} noDataMessage="No attendance records available." />
                    )}
                    {activeTab === 1 && (
                        <DataTable columns={overtimeColumns} data={overtime} noDataMessage="No overtime records." />
                    )}
                    {activeTab === 2 && (
                        <DataTable columns={timeOffColumns} data={timeOff} noDataMessage="No time off records." />
                    )}
                    {activeTab === 3 && (
                        <DataTable columns={additionalEarningsColumns} data={additionalEarnings} noDataMessage="No additional earnings records." />
                    )}
                    {activeTab === 4 && (
                        <DataTable columns={deductionsColumns} data={deductions} noDataMessage="No additional deduction records." />
                    )}
                </Box>
            </Paper>

            <AddOvertimeModal
                open={openModal && activeTab === 1}
                onClose={() => setOpenModal(false)}
                documentId={documentId}
                onOvertimeAdded={handleSubmitSuccess}
                showSnackbar={showSnackbar}
            />

            <AddTimeOffModal
                open={openModal && activeTab === 2}
                onClose={() => setOpenModal(false)}
                documentId={documentId}
                onTimeOffAdded={handleSubmitSuccess}
                showSnackbar={showSnackbar}
            />

            <AddEarningsModal
                open={openModal && activeTab === 3}
                onClose={() => setOpenModal(false)}
                onEarningsAdded={handleSubmitSuccess}
                documentId={documentId}
                showSnackbar={showSnackbar}
            />

            <AddDeductionModal
                open={openModal && activeTab === 4}
                onClose={() => setOpenModal(false)}
                onDeductionAdded={handleSubmitSuccess}
                documentId={documentId}
                showSnackbar={showSnackbar}
            />

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

            <LoadingOverlay open={getLoadingForTab(activeTab)} />
        </Box>
    );
};

export default EmployeeAttendanceDetail;