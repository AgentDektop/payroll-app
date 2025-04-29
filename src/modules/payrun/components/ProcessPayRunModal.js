import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  ButtonGroup,
  Typography,
  Snackbar,
  useTheme,
  IconButton,
  TextField,
  Alert,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import dateIcon from "../../shared/assets/icon/attendance-tab-date-icon.png";
import CloseIcon from "@mui/icons-material/Close";

import LoadingOverlay from "../../shared/components/LoadingOverlay";

import { processPayRun, fetchPayRun } from "../services/PayRunAPI";
import { format } from "date-fns";

const ProcessPayRunModal = ({ open, onClose, refreshPayRunData, showSnackbar }) => {
  const theme = useTheme();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "warning" });
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setStartDate(null);
    setEndDate(null);
    setSnackbar({ open: false, message: "", severity: "warning" });
    setLoading(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleProcess = async () => {
    if (!startDate || !endDate) {
      setSnackbar({
        open: true,
        message: "Please select a valid date range.",
        severity: "error",
      });
      return;
    }

    if (startDate.getDate() !== 26) {
      setSnackbar({
        open: true,
        message: "Start date should be the 26th.",
        severity: "error",
      });
      return;
    }

    if (endDate.getDate() !== 25) {
      setSnackbar({
        open: true,
        message: "End date should be the 25th.",
        severity: "error",
      });
      return;
    }

    const formattedStartDate = format(startDate, "dd-MM-yyyy");
    const formattedEndDate = format(endDate, "dd-MM-yyyy");
    const periodString = `${formattedStartDate} - ${formattedEndDate}`;

    setLoading(true);
    // Validate time and attendance.
    try {
      const taResponse = await fetch(
        `https://payroll-api-d6uc.onrender.com/time-and-attendance/by-period?startDate=${formattedStartDate}&endDate=${formattedEndDate}`
      );
      const taData = await taResponse.json();
      if (Array.isArray(taData) && taData.length === 0) {
        setSnackbar({
          open: true,
          message:
            "Please update time and attendance before processing payroll",
          severity: "error",
        });
        return;
      }
    } catch (error) {
      console.error("Time and Attendance fetch error:", error);
      setSnackbar({
        open: true,
        message: "Error validating time and attendance",
        severity: "error",
      });
      return;
    } finally {
      setLoading(false);
    }

    // Validate if a pay run for the same period is already approved using fetchPayRun.
    setLoading(true);
    try {
      const prData = await fetchPayRun();
      if (
        prData &&
        prData.some(
          (run) =>
            `${run.period.periodStart} - ${run.period.periodEnd}` === periodString &&
            run.approved === true
        )
      ) {
        setSnackbar({
          open: true,
          message: "A payroll for the same period has already been approved.",
          severity: "error",
        });
        return;
      }
    } catch (error) {
      console.error("Pay run fetch error:", error);
      setSnackbar({
        open: true,
        message: "Error validating existing pay run",
        severity: "error",
      });
      return;
    } finally {
      setLoading(false);
    }

    // Process the pay run if validations pass.
    setLoading(true);
    try {
      await processPayRun(startDate, endDate);
      showSnackbar(
        `Pay run processed successfully for period: Start Date ${formattedStartDate} to End Date ${formattedEndDate}`,
        "success"
      );

      if (refreshPayRunData) {
        refreshPayRunData();
      }
      handleClose();
    } catch (error) {
      showSnackbar("Failed to process pay run.", "error");
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
          Process Pay Run
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

        {/* Buttons */}
        <Box sx={{ display: "flex", flexDirection: "column", mb: 2, alignItems: "center" }}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleProcess}
            sx={{
              bgcolor: "#693714",
              color: "#ffffff",
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              "&:hover": { bgcolor: "#4b240c" },
            }}
          >
            Process
          </Button>
        </Box>

        <LoadingOverlay open={loading} />
      </Box>
    </Modal>
  );
};

export default ProcessPayRunModal;
