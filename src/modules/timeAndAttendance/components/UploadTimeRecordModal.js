import React, { useState } from "react";
import {
    Modal,
    Box,
    Button,
    Typography,
    Alert,
    TextField,
    useTheme,
    IconButton,
} from "@mui/material";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import dateIcon from "../../shared/assets/icon/attendance-tab-date-icon.png";
import CloseIcon from "@mui/icons-material/Close";

import LoadingOverlay from "../../shared/components/LoadingOverlay";

import { format } from "date-fns";
import { uploadTimeRecord } from "../services/TimeAndAttendanceAPI";

const UploadTimeRecordModal = ({ open, onClose, refreshData, showSnackbar }) => {
    const theme = useTheme();

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [file, setFile] = useState(null);
    const [alert, setAlert] = useState({ open: false, message: "", severity: "warning" });
    const [loading, setLoading] = useState(false);

    const resetForm = () => {
        setStartDate(null);
        setEndDate(null);
        setFile(null);
        setAlert({ open: false, message: "", severity: "warning" });
        setLoading(false);
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (loading) return;

        if (!startDate || !endDate) {
            setAlert({
                open: true,
                message: "Please select a valid start and end date.",
                severity: "error",
            });
            return;
        }

        if (!file) {
            setAlert({
                open: true,
                message: "Please choose a file.",
                severity: "error",
            });
            return;
        }

        if (file && file.type !== "text/csv") {
            setAlert({
                open: true,
                message: "Only CSV files are allowed.",
                severity: "error",
            });
            return;
        }

        const formattedStartDate = format(new Date(startDate), "dd-MM-yyyy");
        const formattedEndDate = format(new Date(endDate), "dd-MM-yyyy");

        setLoading(true);

        try {
            await uploadTimeRecord({ startDate: formattedStartDate, endDate: formattedEndDate, file });
            showSnackbar?.(
                `File uploaded successfully for period: ${formattedStartDate} - ${formattedEndDate}`,
                "success"
            );

            refreshData?.();
            handleClose();
        } catch (error) {
            showSnackbar?.("Failed to upload file.", "error");
        } finally {
            setLoading(false);
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
                    Upload Time Record
                </Typography>

                {alert.open && (
                    <Alert
                        severity={alert.severity}
                        onClose={() => setAlert({ ...alert, open: false })}
                        sx={{
                            mb: 3,
                            fontSize: "0.675rem",
                            py: 0,
                            px: 1.5,
                            borderRadius: 1,
                            alignItems: "center",
                        }}
                    >
                        {alert.message}
                    </Alert>
                )}

                {/* Start Date Field */}
                <Box sx={{ display: "flex", flexDirection: "column", mb: 1 }}>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="dd-MM-yyyy"
                        isClearable
                        showMonthDropdown
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={10}
                        customInput={
                            <TextField
                                label="Period Start Date"
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <img src={dateIcon} alt="Period Start Date" style={{ width: 20, height: 20 }} />
                                    ),
                                }}
                                sx={textFieldStyles}
                            />
                        }
                    />
                </Box>

                {/* End Date Field */}
                <Box sx={{ display: "flex", flexDirection: "column", mb: 1 }}>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        dateFormat="dd-MM-yyyy"
                        isClearable
                        showMonthDropdown
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={10}
                        customInput={
                            <TextField
                                label="Period End Date"
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <img src={dateIcon} alt="Period End Date" style={{ width: 20, height: 20 }} />
                                    ),
                                }}
                                sx={textFieldStyles}
                            />
                        }
                    />
                </Box>

                {/* File Upload */}
                <Box sx={{ display: "flex", flexDirection: "column", mb: 2, alignItems: "center" }}>
                    <Button
                        fullWidth
                        variant="outlined"
                        component="label"
                        sx={{
                            borderColor: theme.palette.custom.darkBrown,
                            backgroundColor: theme.palette.custom.white,
                            color: theme.palette.custom.darkBrown,
                        }}>
                        Choose a .csv file
                        <input type="file" hidden onChange={handleFileChange} />
                    </Button>
                    {file && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            Selected: {file.name}
                        </Typography>
                    )}
                </Box>

                {/* Upload Button */}
                <Box sx={{ display: "flex", flexDirection: "column", mb: 2, alignItems: "center" }}>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleUpload}
                        sx={{
                            bgcolor: "#693714",
                            color: "#ffffff",
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: 600,
                            "&:hover": { bgcolor: "#4b240c" },
                        }}
                    >
                        Upload
                    </Button>
                </Box>

                <LoadingOverlay open={loading} />
            </Box>
        </Modal>
    );
};

export default UploadTimeRecordModal;
