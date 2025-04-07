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
import { addEmployeeOvertime } from "../services/TimeAndAttendanceAPI"; // Import the API call for adding overtime
import useAddOvertime from "../hooks/useAddOvertime";

const AddOvertimeModal = ({ open, onClose, documentId, onOvertimeAdded }) => {
  const theme = useTheme();
  const [date, setDate] = useState(null);
  const [overtimeStart, setOvertimeStart] = useState("");
  const [overtimeEnd, setOvertimeEnd] = useState("");
  const { submitOvertime, loading, error } = useAddOvertime();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "warning",
  });

  const handleSubmit = async () => {
    if (!date || !overtimeStart || !overtimeEnd) {
      setSnackbar({
        open: true,
        message: "Please fill in all fields.",
        severity: "error",
      });
      return;
    }

    const formattedDate = format(date, "dd-MM-yyyy");
    const payload = {
      id: documentId,          
      date: formattedDate,     
      overtimeStart,           
      overtimeEnd, 
    };

    console.log("AddOvertimeModal",payload);

    try {
      await addEmployeeOvertime(payload);
      setSnackbar({
        open: true,
        message: "Overtime added successfully.",
        severity: "success",
      });
      setTimeout(() => {
        if (onOvertimeAdded) onOvertimeAdded();
        onClose(); 
      }, 3000);
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to add overtime.",
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
          Add Overtime
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
          <DatePicker
            placeholderText="Select Date"
            selected={date}
            onChange={(newDate) => setDate(newDate)}
            dateFormat="dd-MM-yyyy"
            customInput={
              <TextField
                fullWidth
                sx={{
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
                }}
              />
            }
          />
        </Box>

        {/* Overtime Start Time */}
        <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
          <TextField
            label="Overtime Start"
            type="time"
            fullWidth
            value={overtimeStart}
            onChange={(e) => setOvertimeStart(e.target.value)}
            inputProps={{ step: 300 }} 
            InputLabelProps={{ shrink: true }}
          />
        </Box>

        {/* Overtime End Time */}
        <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
          <TextField
            label="Overtime End"
            type="time"
            fullWidth
            value={overtimeEnd}
            onChange={(e) => setOvertimeEnd(e.target.value)}
            inputProps={{ step: 300 }}
            InputLabelProps={{ shrink: true }}
          />
        </Box>

        {/* Buttons */}
        <Box sx={{ mt: 3 }}>
          <ButtonGroup fullWidth>
            <Button onClick={onClose} color="secondary" variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Submit
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

export default AddOvertimeModal;
