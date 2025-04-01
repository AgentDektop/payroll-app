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
    useTheme,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { uploadTimeRecord } from "../services/TimeAndAttendanceAPI"; 

const UploadTimeRecordModal = ({ open, onClose, refreshData }) => {
    const theme = useTheme();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [file, setFile] = useState(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "warning",
    });

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!startDate || !endDate) {
            setSnackbar({
                open: true,
                message: "Please select a valid start and end date.",
                severity: "error",
            });
            return;
        }
        if (!file) {
            setSnackbar({
                open: true,
                message: "Please choose a file.",
                severity: "error",
            });
            return;
        }
        const formattedStartDate = format(startDate, "dd-MM-yyyy");
        const formattedEndDate = format(endDate, "dd-MM-yyyy");

        try {
            await uploadTimeRecord({ startDate: formattedStartDate, endDate: formattedEndDate, file });
            setSnackbar({
                open: true,
                message: `File uploaded successfully for period: ${formattedStartDate} - ${formattedEndDate}`,
                severity: "success",
            });
            setTimeout(() => {
                if (refreshData) refreshData();
                onClose();
            }, 6000);
        } catch (error) {
            setSnackbar({
                open: true,
                message: "Failed to upload file.",
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
                    Upload Time Record
                </Typography>

                {/* Start Date Field */}
                <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
                    <DatePicker
                        placeholderText="Select Start Date"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="dd-MM-yyyy"
                        customInput={<TextField fullWidth sx={{
                            py: 0,
                            "& .MuiInputBase-input::placeholder": {
                                color: theme.palette.custom.lightGrey,
                                opacity: 2,
                                fontSize: "0.875rem"
                            },
                            "& .MuiOutlinedInput-root": {
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: theme.palette.custom.lightGrey,
                                    opacity: 0.2
                                }
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: theme.palette.custom.lightGrey,
                            },
                        }} />}
                    />
                </Box>

                {/* End Date Field */}
                <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
                    <DatePicker
                        placeholderText="Select End Date"
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        dateFormat="dd-MM-yyyy"
                        customInput={<TextField fullWidth sx={{
                            py: 0,
                            "& .MuiInputBase-input::placeholder": {
                                color: theme.palette.custom.lightGrey,
                                opacity: 2,
                                fontSize: "0.875rem"
                            },
                            "& .MuiOutlinedInput-root": {
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: theme.palette.custom.lightGrey,
                                    opacity: 0.2
                                }
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: theme.palette.custom.lightGrey,
                            },
                        }} />}
                    />
                </Box>

                {/* File upload */}
                <Box sx={{ display: "flex", flexDirection: "column", mb: 2, alignItems: "center" }}>
                    <Button fullWidth variant="outlined" component="label">
                        Choose a file to upload
                        <input type="file" hidden onChange={handleFileChange} />
                    </Button>
                    {file && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            Selected: {file.name}
                        </Typography>
                    )}
                </Box>

                {/* Buttons */}
                <Box sx={{ mt: 3 }}>
                    <ButtonGroup fullWidth>
                        <Button onClick={onClose} color="secondary" variant="outlined">
                            Cancel
                        </Button>
                        <Button onClick={handleUpload} variant="contained" color="primary">
                            Upload
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

export default UploadTimeRecordModal;
