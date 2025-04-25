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
import earningsIcon from "../../shared/assets/icon/total-payroll-cost-icon.png";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import DatePicker from "react-datepicker";

import { format } from "date-fns";

import useSubmit from "../hooks/useSubmit";
import { addEmployeeEarnings } from "../services/TimeAndAttendanceAPI";

const earningTypes = [
    { "key": "HOLIDAY", "label": "Holiday" },
    { "key": "CANCELLED_OFF", "label": "Cancelled Off" }
];

const AddEarningsModal = ({ open, onClose, documentId, onEarningsAdded, showSnackbar }) => {
    const theme = useTheme();
    const [date, setDate] = useState(null);
    const [selectedEarningType, setSelectedEarningType] = useState("");
    const [totalEarnings, setTotalEarnings] = useState("");
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "warning" });

    const { submit, loading, error } = useSubmit(addEmployeeEarnings);

    const resetForm = () => {
        setDate(null);
        setSelectedEarningType("");
        setTotalEarnings("");
        setSnackbar({ open: false, message: "", severity: "warning" });
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleSubmit = async () => {
        if (!date || !selectedEarningType || !totalEarnings) {
            return setSnackbar({ open: true, message: "Please fill in all fields.", severity: "error" });
        }

        const payload = {
            id: documentId,
            date: format(date, "dd-MM-yyyy"),
            earningsType: selectedEarningType,
            earningsTotal: parseFloat(totalEarnings)
        };

        try {
            const result = await submit(payload);
            showSnackbar("Earnings added successfully.", "success");
            onEarningsAdded?.(result);
            handleClose();
        } catch (error) {
            showSnackbar("Failed to add earnings.", "error");
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
                    Add Earnings
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
                    <DatePicker
                        selected={date}
                        onChange={(d) => setDate(d)}
                        dateFormat="dd-MM-yyyy"
                        customInput={
                            <TextField
                                label="Date"
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <img src={dateIcon} alt="Date" style={{ width: 20, height: 20 }} />
                                    ),
                                }}
                                sx={textFieldStyles}
                            />
                        }
                    />
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", mb: 1 }}>
                    <TextField
                        label="Type"
                        select
                        fullWidth
                        value={selectedEarningType}
                        onChange={(e) => setSelectedEarningType(e.target.value)}
                        sx={textFieldStyles}
                    >
                        {earningTypes.map((type) => (
                            <MenuItem key={type.key} value={type.key}>
                                {type.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", mb: 1 }}>
                    <TextField
                        label="Earnings (Hours)"
                        type="number"
                        fullWidth
                        value={totalEarnings}
                        onChange={(e) => setTotalEarnings(e.target.value)}
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
                                <img src={earningsIcon} alt="Earnings" style={{ width: 20, height: 20 }} />
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
                    Save Earnings
                </Button>

                <LoadingOverlay open={loading} />
            </Box>
        </Modal>
    );
};

export default AddEarningsModal;