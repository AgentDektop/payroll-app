import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  ButtonGroup,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { processPayRun, fetchPayRun } from "../services/PayRunAPI";
import { format } from "date-fns";

const ProcessPayRunModal = ({ open, onClose, refreshPayRunData }) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "warning",
  });

  // Update date range only if dates are valid.
  const handleDateChange = (update) => {
    if (!update || update.length === 0) {
      setDateRange([null, null]);
      return;
    }
    if (!update[0]) {
      setDateRange([null, null]);
      return;
    }
    const selectedStart = update[0];
    if (selectedStart.getDate() !== 26) {
      setSnackbar({
        open: true,
        message: "Start date should be the 26th.",
        severity: "error",
      });
      return;
    }
    if (update.length === 1 || !update[1]) {
      setDateRange([selectedStart, null]);
      return;
    }
    const selectedEnd = update[1];
    if (!selectedEnd || selectedEnd.getDate() !== 25) {
      setSnackbar({
        open: true,
        message: "End date should be the 25th.",
        severity: "error",
      });
      // Set valid date only.
      setDateRange([selectedStart, null]);
      return;
    }
    setDateRange([selectedStart, selectedEnd]);
  };

  const handleProcess = async () => {
    const [startDate, endDate] = dateRange;
    if (!startDate || !endDate) {
      setSnackbar({
        open: true,
        message: "Please select a valid date range.",
        severity: "error",
      });
      return;
    }

    const formattedStartDate = format(startDate, "dd-MM-yyyy");
    const formattedEndDate = format(endDate, "dd-MM-yyyy");
    const periodString = `${formattedStartDate} - ${formattedEndDate}`;

    // Validate time and attendance.
    try {
      const taResponse = await fetch(
        `http://localhost:5050/time-and-attendance/by-period?startDate=${formattedStartDate}&endDate=${formattedEndDate}`
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
    }

    // Validate if a pay run for the same period is already approved using fetchPayRun.
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
    }

    // Process the pay run if validations pass.
    try {
      await processPayRun(startDate, endDate);
      setSnackbar({
        open: true,
        message: `Pay run processed successfully for period: Start Date ${formattedStartDate} to End Date ${formattedEndDate}`,
        severity: "success",
      });

      setTimeout(() => {
        onClose();
      }, 6000);
     
      if (refreshPayRunData) {
        refreshPayRunData();
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to process pay run.",
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
          Process Pay Run
        </Typography>

        {/* Date Range Picker */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <DatePicker
            selected={dateRange[0]}
            onChange={handleDateChange}
            startDate={dateRange[0]}
            endDate={dateRange[1]}
            selectsRange
            dateFormat="dd/MM/yyyy"
            placeholderText="Select pay run period"
            isClearable
            showMonthDropdown
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={10}
            inline
            withPortal
          />
        </Box>

        {/* Buttons */}
        <Box sx={{ mt: 3 }}>
          <ButtonGroup fullWidth>
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleProcess} variant="contained" color="primary">
              Process
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

export default ProcessPayRunModal;
