import React, { useState } from "react";
import {
    Modal,
    Box,
    Button,
    Typography,
    Snackbar,
    Alert,
    TextField,
    ButtonGroup,
    MenuItem,
    useTheme,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { addEmployeeTimeOff } from "../services/TimeAndAttendanceAPI";
import useAddTimeOff from "../hooks/useAddTimeOff";

const timeOffTypes = [
    "Vacation Leave",
    "Sick Leave",
    "Maternity Leave",
    "Emergency Leave",
    "Bereavement Leave",
    "Offset",
];

const AddTimeOffModal = ({ open, onClose, documentId, onTimeOffAdded }) => {
    const theme = useTheme();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [timeOffDuration, setTimeOffDuration] = useState("");
    const [selectedTimeOffType, setSelectedTimeOffType] = useState(""); // Renamed for clarity
    const { submitTimeOff, loading, error } = useAddTimeOff();
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "warning",
    });

    const commonSx = {
        py: 0,
        "& .MuiInputBase-input::placeholder": {
            color: theme.palette.custom.lightGrey,
            opacity: 2,
            fontSize: "0.875rem",
        },
        "& .MuiOutlinedInput-root": {
            "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.custom.lightGrey,
                opacity: 0.2,
            },
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.custom.lightGrey,
        },
    };

    const handleSubmit = async () => {
        if (!startDate || !endDate || !timeOffDuration || !selectedTimeOffType) {
            setSnackbar({
                open: true,
                message: "Please fill in all fields.",
                severity: "error",
            });
            return;
        }

        const formattedStartDate = format(startDate, "dd-MM-yyyy");
        const formattedEndDate = format(endDate, "dd-MM-yyyy");

        const payload = {
            id: documentId,
            timeOffType: selectedTimeOffType,
            timeOffStartDate: formattedStartDate,
            timeOffEndDate: formattedEndDate,
            timeOffDuration: parseInt(timeOffDuration, 10),
        };

        try {
            await addEmployeeTimeOff(payload);
            setSnackbar({
                open: true,
                message: "Time off added successfully.",
                severity: "success",
            });
            setTimeout(() => {
                if (onTimeOffAdded) onTimeOffAdded();
                onClose();
            }, 3000);
        } catch (error) {
            setSnackbar({
                open: true,
                message: "Failed to add time off.",
                severity: "error",
            });
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    width: 400,
                    bgcolor: "white",
                    p: 3,
                    mx: "auto",
                    my: "20vh",
                    borderRadius: 2,
                }}
            >
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Add Time Off
                </Typography>

                {/* Leave Type Dropdown */}
                <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
                    <TextField
                        select
                        fullWidth
                        value={selectedTimeOffType}
                        onChange={(e) => setSelectedTimeOffType(e.target.value)}
                        SelectProps={{ displayEmpty: true }}
                        sx={{
                            ...commonSx,
                            "& .MuiSelect-select": {
                                color: selectedTimeOffType
                                    ? "rgba(0, 0, 0, 0.87)"
                                    : theme.palette.custom.lightGrey,
                                fontSize: "0.875rem",
                            },
                        }}
                    >
                        <MenuItem value="" disabled>
                            Select Leave Type
                        </MenuItem>
                        {timeOffTypes.map((type) => (
                            <MenuItem key={type} value={type}>
                                {type}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>

                {/* Start Date */}
                <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
                    <DatePicker
                        placeholderText="Time Off Start Date"
                        selected={startDate}
                        onChange={(newDate) => setStartDate(newDate)}
                        dateFormat="dd-MM-yyyy"
                        customInput={<TextField fullWidth sx={commonSx} />}
                    />
                </Box>

                {/* End Date */}
                <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
                    <DatePicker
                        placeholderText="Time Off End Date"
                        selected={endDate}
                        onChange={(newDate) => setEndDate(newDate)}
                        dateFormat="dd-MM-yyyy"
                        customInput={<TextField fullWidth sx={commonSx} />}
                    />
                </Box>

                {/* Time Off Duration */}
                <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
                    <TextField
                        placeholder="Time Off Duration"
                        type="number"
                        fullWidth
                        value={timeOffDuration}
                        onChange={(e) => setTimeOffDuration(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        sx={commonSx}
                    />
                </Box>

                {/* Buttons */}
                <Box sx={{ mt: 3 }}>
                    <ButtonGroup fullWidth>
                        <Button
                            onClick={() => {
                                setStartDate(null);
                                setEndDate(null);
                                setTimeOffDuration("");
                                setSelectedTimeOffType("");
                                onClose();
                            }}
                            color="secondary"
                            variant="outlined"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            color="primary"
                            disabled={loading}
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </Button>
                    </ButtonGroup>
                </Box>

                {/* Snackbar for alerts */}
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                >
                    <Alert
                        onClose={() => setSnackbar({ ...snackbar, open: false })}
                        severity={snackbar.severity}
                        sx={{ width: "100%" }}
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Box>
        </Modal>
    );
};

export default AddTimeOffModal;
