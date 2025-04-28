import React, { useState } from "react";
import {
    Modal,
    Box,
    Button,
    Typography,
    Alert,
    TextField,
    MenuItem,
    useTheme,
    IconButton,
    CircularProgress,
} from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";

import LoadingOverlay from "../../shared/components/LoadingOverlay";
import dateIcon from "../../shared/assets/icon/attendance-tab-date-icon.png";
import timeOffDurationIcon from "../../shared/assets/icon/attendance-timeoff-duration-icon.png";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import DatePicker from "react-datepicker";

import { format } from "date-fns";

import useSubmit from "../hooks/useSubmit";
import { addEmployeeTimeOff } from "../services/TimeAndAttendanceAPI";

const timeOffTypes = [
    { "key": "VACATION_LEAVE", "label": "Vacation Leave" },
    { "key": "SICK_LEAVE", "label": "Sick Leave" },
    { "key": "MATERNITY_LEAVE", "label": "Maternity Leave" },
    { "key": "EMERGENCY_LEAVE", "label": "Emergency Leave" },
    { "key": "BEREAVEMENT_LEAVE", "label": "Bereavement Leave" },
    { "key": "LEAVE_WITHOUT_PAY", "label": "Leave without Pay" },
    { "key": "OFFSET", "label": "Offset" }
];

const AddTimeOffModal = ({ open, onClose, documentId, onTimeOffAdded, showSnackbar }) => {
    const theme = useTheme();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [timeOffDuration, setTimeOffDuration] = useState("");
    const [selectedTimeOffType, setSelectedTimeOffType] = useState("");
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "warning" });

    const { submit, loading, error } = useSubmit(addEmployeeTimeOff);

    const resetForm = () => {
        setStartDate(null);
        setEndDate(null);
        setTimeOffDuration("");
        setSelectedTimeOffType("");
        setSnackbar({ open: false, message: "", severity: "warning" });
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleSubmit = async () => {
        if (!startDate || !endDate || !timeOffDuration || !selectedTimeOffType) {
            return setSnackbar({ open: true, message: "Please fill in all fields.", severity: "error" });
        }

        const payload = {
            id: documentId,
            timeOffType: selectedTimeOffType,
            timeOffStartDate: format(startDate, "dd-MM-yyyy"),
            timeOffEndDate: format(endDate, "dd-MM-yyyy"),
            timeOffDuration: parseFloat(timeOffDuration),
        };

        try {
            const result = await submit(payload);
            showSnackbar("Time off added successfully.", "success");
            onTimeOffAdded?.(result);
            handleClose();
        } catch (error) {
            showSnackbar("Failed to add time off.", "error");
        }
    };

    const textFieldStyles = {
        mb: 2,
        "& .MuiInputBase-input": {
            ...theme.typography.md3
        },
        "& .MuiOutlinedInput-root": { borderRadius: 2 },
        "& label": { color: "#7A7A7A" },
        "& label.Mui-focused": { color: "#AF8862" },
        "& .MuiOutlinedInput-root.Mui-focused fieldset": { borderColor: "#AF886230" },
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    width: 400,
                    bgcolor: "#FAFBFB",
                    p: 4,
                    mx: "auto",
                    my: "15vh",
                    borderRadius: 3,
                    boxShadow: 10,
                    position: "relative",
                }}
            >
                {/* Close Button */}
                <IconButton onClick={handleClose} sx={{ position: "absolute", top: 10, right: 10 }}>
                    <CloseIcon />
                </IconButton>

                <Typography variant="h6" fontWeight={600} mb={3}>
                    Add Time Off
                </Typography>

                {snackbar.open && (
                    <Alert
                        severity={snackbar.severity}
                        onClose={() => setSnackbar({ ...snackbar, open: false })}
                        sx={{
                            mb: 3,
                            fontSize: "0.675rem",
                            py: 0,
                            px: 1.5,
                            borderRadius: 1,
                            alignItems: "center",
                        }}
                    >
                        {snackbar.message}
                    </Alert>
                )}

                <Box sx={{ display: "flex", flexDirection: "column", mb: 1 }}>
                    <TextField
                        label="Leave Type"
                        select
                        fullWidth
                        value={selectedTimeOffType}
                        onChange={(e) => setSelectedTimeOffType(e.target.value)}
                        sx={textFieldStyles}
                    >
                        {timeOffTypes.map((type) => (
                            <MenuItem key={type.key} value={type.key}>
                                {type.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", mb: 1 }}>
                    <DatePicker
                        selected={startDate}
                        onChange={(d) => setStartDate(d)}
                        dateFormat="dd-MM-yyyy"
                        isClearable
                        showMonthDropdown
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={10}
                        customInput={
                            <TextField
                                label="Time Off Start"
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <img src={dateIcon} alt="Time Off Start" style={{ width: 20, height: 20 }} />
                                    ),
                                }}
                                sx={textFieldStyles}
                            />
                        }
                    />
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", mb: 1 }}>
                    <DatePicker
                        selected={endDate}
                        onChange={(d) => setEndDate(d)}
                        dateFormat="dd-MM-yyyy"
                        isClearable
                        showMonthDropdown
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={10}
                        customInput={
                            <TextField
                                label="Time Off End"
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <img src={dateIcon} alt="Time Off End" style={{ width: 20, height: 20 }} />
                                    ),
                                }}
                                sx={textFieldStyles}
                            />
                        }
                    />
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", mb: 1 }}>
                    <TextField
                        label="Time Off Duration"
                        type="number"
                        fullWidth
                        value={timeOffDuration}
                        onChange={(e) => setTimeOffDuration(e.target.value)}
                        sx={{
                            ...textFieldStyles,
                            "& input[type=number]": {
                                MozAppearance: "textfield",
                            },
                            "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button": {
                                WebkitAppearance: "none",
                                margin: 0,
                            },
                        }}
                        InputProps={{
                            endAdornment: (
                                <img src={timeOffDurationIcon} alt="Time Off Duration" style={{ width: 20, height: 20 }} />
                            ),
                        }}
                    />
                </Box>

                {/* Save Button */}
                <Button
                    variant="contained"
                    fullWidth
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                    disabled={loading}
                    onClick={handleSubmit}
                    sx={{
                        bgcolor: "#693714",
                        color: "#ffffff",
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600,
                        "&:hover": { bgcolor: "#4b240c" },
                    }}
                >
                    Save Time Off
                </Button>

                <LoadingOverlay open={loading} />
            </Box>
        </Modal>
    );
};

export default AddTimeOffModal;