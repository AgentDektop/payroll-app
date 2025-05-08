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
  CircularProgress,
} from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";

import LoadingOverlay from "../../shared/components/LoadingOverlay";
import dateIcon from "../../shared/assets/icon/attendance-tab-date-icon.png";
import overtimeHoursIcon from "../../shared/assets/icon/attendance-overtime-start-date-icon.png";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import DatePicker from "react-datepicker";

import { format } from "date-fns";

import useSubmit from "../hooks/useSubmit";
import { addEmployeeOvertime } from "../services/TimeAndAttendanceAPI";

const AddOvertimeModal = ({ open, onClose, documentId, onOvertimeAdded, showSnackbar }) => {
  const theme = useTheme();
  const [date, setDate] = useState(null);
  const [overtimeHours, setOvertimeHours] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "warning" });

  const { submit, loading, error } = useSubmit(addEmployeeOvertime);

  const resetForm = () => {
    setDate(null);
    setOvertimeHours("");
    setSnackbar({ open: false, message: "", severity: "warning" });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
    if (!date || !overtimeHours) {
      return setSnackbar({ open: true, message: "Please fill in all fields.", severity: "error" });
    }

    const payload = {
      id: documentId,
      date: format(date, "dd-MM-yyyy"),
      overtimeHours
    };

    try {
      const result = await submit(payload);
      showSnackbar("Overtime added successfully.", "success");
      onOvertimeAdded?.(result);
      handleClose();
    } catch (error) {
      showSnackbar("Failed to add overtime.", "error");
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
          Add Overtime
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
        {/* Overtime Date */}
        <Box sx={{ display: "flex", flexDirection: "column", mb: 1 }}>
          <DatePicker
            selected={date}
            onChange={(newDate) => setDate(newDate)}
            dateFormat="dd-MM-yyyy"
            isClearable
            showMonthDropdown
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={10}
            customInput={
              <TextField
                label="Overtime Date"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <img src={dateIcon} alt="Overtime Date" style={{ width: 20, height: 20 }} />
                  ),
                }}
                sx={textFieldStyles}
              />
            }
          />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", mb: 1 }}>
          <TextField
            label="Overtime Hours"
            type="number"
            fullWidth
            value={overtimeHours}
            onChange={(e) => setOvertimeHours(e.target.value)}
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
                <img src={overtimeHoursIcon} alt="Overtime Hours" style={{ width: 20, height: 20 }} />
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
          Save Overtime
        </Button>

        <LoadingOverlay open={loading} />
      </Box>
    </Modal>
  );
};

export default AddOvertimeModal;