import React, { useEffect, useState } from "react";
import useGetAllPayRun from "../hooks/useGetAllPayRun";
import { Table, TableHead, TableRow, TableCell, TableBody, Typography, Button, Box, Select, MenuItem, TableContainer, Paper, Snackbar, Alert } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import payperiodFilterIcon from "../../shared/assets/icon/payrun-per-period-filter-icon.png";
import processPayrunIcon from "../../shared/assets/icon/process-payrun-icon.png";
import payRunActionIcon from "../../shared/assets/icon/payrun-action-icon.png";
import payRunViewIcon from "../../shared/assets/icon/payrun-view-icon.png";
import payRunIdIcon from "../../shared/assets/icon/payrun-id-icon.png";
import payRunDateIcon from "../../shared/assets/icon/payrun-date-icon.png";
import payRunTotalCostIcon from "../../shared/assets/icon/total-payroll-cost-icon.png";
import payRunTotalDeductionIcon from "../../shared/assets/icon/total-deduction-icon.png";
import payRunApproveIcon from "../../shared/assets/icon/payrun-approve-icon.png";
import payRunRejectIcon from "../../shared/assets/icon/payrun-reject-icon.png";
import { formatDecimalValue } from "../../shared/utils/dateAndNumberUtils";
import { Link } from "react-router-dom";
import { approvePayrun } from "../services/PayRunAPI";
import { useAuth } from "../../shared/components/AuthContext";
import ProcessPayRunModal from "./ProcessPayRunModal";
import LoadingOverlay from "../../shared/components/LoadingOverlay";

const PayrollTable = () => {
  const theme = useTheme();
  const { payRun, uniquePayPeriod, error, fetchPayRunData, isLoading } = useGetAllPayRun();
  const [selectedPayPeriod, setSelectedPayPeriod] = useState("");
  const { user } = useAuth();
  const userRole = user?.role || "";
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [modalOpen, setModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(false);

  const refreshPayRunData = async () => {
    await fetchPayRunData();
    setRefreshKey((prev) => prev + 1); // Force re-render
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  useEffect(() => {
    if (uniquePayPeriod.length > 0) {
      setSelectedPayPeriod(uniquePayPeriod[0]);
    }
  }, [uniquePayPeriod]);

  const handleChange = (event) => {
    setSelectedPayPeriod(event.target.value);
  };

  const filteredPayRun = selectedPayPeriod
    ? payRun.filter(
      (run) =>
        `${run.period.periodStart} - ${run.period.periodEnd}` === selectedPayPeriod
    )
    : payRun;

  return (
    <Box sx={{ padding: theme.spacing(3), height: '100vh', overflowY: 'hidden' }}>
      <Box>
        {/* Payroll Header */}
        <Typography variant="header" sx={{ color: theme.palette.custom.darkGrey, paddingBottom: theme.spacing(2) }}>
          Payroll
        </Typography>
        {/*Pay Period Filter + Process Button */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 3 }}>
          {/* Left: Pay Period */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="md2" sx={{ color: theme.palette.custom.lightGrey, display: "flex", alignItems: "center", gap: 1 }}>
              <img
                src={payperiodFilterIcon}
                alt="Pay Period"
                style={{ width: 24, height: 24 }}
              />
              Pay period:
            </Typography>
            <Select
              value={selectedPayPeriod || ""}
              onChange={handleChange}
              MenuProps={{ disablePortal: true, disableScrollLock: true }}
              sx={{
                width: "200px",
                fontSize: "14px",
                fontWeight: 400,
                "& fieldset": { border: "none" },
                "& .MuiSelect-icon": {
                  backgroundColor: theme.palette.custom.darkBrown,
                  color: theme.palette.custom.white,
                  padding: "5px",
                  borderRadius: "5px",
                  right: "10px",
                },
              }}
            >
              <MenuItem value="" disabled sx={{ color: theme.palette.custom.lightGrey }}>
                Select pay period
              </MenuItem>
              {uniquePayPeriod.map((period, index) => (
                <MenuItem key={index} value={period} sx={{ width: "170px", fontSize: "12px" }}>
                  {period}
                </MenuItem>
              ))}
            </Select>
          </Box>

          {/* Right: Process Pay Run Button */}
          <Button variant="contained" size="small" onClick={() => setModalOpen(true)}
            sx={{
              display: { xs: 'none', sm: 'inline-flex' },
              "&:hover": {
                bgcolor: "#4b240c",
              },
            }}
          >
            <img
              src={processPayrunIcon}
              alt="Process Pay Run"
              style={{ width: 24, height: 24 }}
            />
            Process Pay Run
          </Button>
          <ProcessPayRunModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            refreshPayRunData={async () => {
              await refreshPayRunData();
            }}
            showSnackbar={showSnackbar}
          />
        </Box>
      </Box>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <Paper
        sx={{
          bgcolor: "#FAFBFB",
          borderRadius: 2,
          border: "1px solid #BDBDBD",
          boxShadow: "1px 1px 10px rgba(175, 136, 98, 0.25)",
          padding: 0,
          margin: 0,
          overflow: "hidden",
        }}
        elevation={0}
      >
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column", minHeight: 0, maxHeight: "calc(100vh - 270px)", overflow: "auto" }}>
          <TableContainer key={refreshKey} sx={{ flexGrow: 1, width: "100%" }}>
            <Box sx={{
              top: 0,
              backgroundColor: theme.palette.custom.greyBorder,
              zIndex: 10,
            }}>
              <Table stickyHeader sx={{ width: "100%", tableLayout: "fixed" }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: theme.palette.custom.darkerGrey }}>
                    <TableCell sx={{ border: `1px solid ${theme.palette.custom.greyBorder}` }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <img
                          src={payRunIdIcon}
                          alt="Pay Run ID"
                          style={{ width: 24, height: 24 }}
                        />
                        <Typography variant="md3">
                          Pay Run ID
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <img
                          src={payRunDateIcon}
                          alt="Pay Run Date"
                          style={{ width: 24, height: 24 }}
                        />
                        <Typography variant="md3">
                          Pay Run Date
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <img
                          src={payRunTotalCostIcon}
                          alt="Total Payroll Cost"
                          style={{ width: 24, height: 24 }}
                        />
                        <Typography variant="md3">
                          Total Payroll Cost
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <img
                          src={payRunTotalDeductionIcon}
                          alt="Total Payroll Deductions"
                          style={{ width: 24, height: 24 }}
                        />
                        <Typography variant="md3">
                          Total Payroll Deductions
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <img
                          src={payRunActionIcon}
                          alt="Action"
                          style={{ width: 24, height: 24 }}
                        />
                        <Typography variant="md3">
                          Actions
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPayRun?.length ? (
                    filteredPayRun.map((run) => (
                      <TableRow
                        key={run.payRunId}
                        sx={{
                          backgroundColor: run.approved
                            ? theme.palette.custom.lightGreen
                            : theme.palette.custom.white
                        }}>
                        <TableCell sx={{ fontSize: "1rem", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                          {run.payRunId}
                        </TableCell>
                        <TableCell sx={{ fontSize: "1rem", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                          {run.payRunDate}
                        </TableCell>
                        <TableCell sx={{ fontSize: "1rem", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                          {formatDecimalValue(run.totalPayrollCost)} AED
                        </TableCell>
                        <TableCell sx={{ fontSize: "1rem", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                          {formatDecimalValue(run.totalPayrollDeductions)} AED
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", flexDirection: "row", padding: 0, margin: 0 }}>
                            <Link to={`/payrun/${run.payRunId}`} style={{ textDecoration: 'none' }}>
                              <Button sx={{ backgroundColor: "transparent", border: "none", boxShadow: "none", px: 1 }}>
                                <img
                                  src={payRunViewIcon}
                                  alt="View Pay Run"
                                  style={{ width: 24, height: 24 }}
                                />
                              </Button>
                            </Link>
                            {run.approved ? (
                              userRole === "Admin" && (
                                <Button
                                  onClick={() => {
                                    setLoading(true);
                                    approvePayrun(run.payRunId, false, true)
                                      .then(() => {
                                        fetchPayRunData();
                                        showSnackbar("Pay run rejected successfully!", "success");
                                      })
                                      .catch((err) => {
                                        console.error(err);
                                        showSnackbar("Failed to reject pay run.", "error");
                                      })
                                      .finally(() => {
                                        setLoading(false);
                                      });
                                  }}
                                  sx={{ backgroundColor: "transparent", border: "none", boxShadow: "none", px: 1 }}
                                >
                                  <img src={payRunRejectIcon} alt="Reject Pay Run" style={{ width: 24, height: 24 }} />
                                </Button>
                              )
                            ) : (
                              ["Admin", "Payroll"].includes(userRole) && (
                                <Button
                                  onClick={() => {
                                    const existingApproved = payRun.some(
                                      (p) =>
                                        p.payRunId !== run.payRunId &&
                                        p.period.periodStart === run.period.periodStart &&
                                        p.period.periodEnd === run.period.periodEnd &&
                                        p.approved
                                    );
                                    if (!existingApproved) {
                                      setLoading(true);
                                      approvePayrun(run.payRunId, true, false)
                                        .then(() => {
                                          fetchPayRunData();
                                          showSnackbar("Pay run approved successfully!", "success");
                                        })
                                        .catch((err) => {
                                          console.error(err);
                                          showSnackbar("Failed to approve pay run.", "error");
                                        }).finally(() => {
                                          setLoading(false);
                                        });
                                    } else {
                                      showSnackbar("A pay run for this period is already approved.", "warning");
                                    }
                                  }}
                                  sx={{ backgroundColor: "transparent", border: "none", boxShadow: "none", px: 1 }}
                                >
                                  <img src={payRunApproveIcon} alt="Approve Pay Run" style={{ width: 24, height: 24 }} />
                                </Button>
                              )
                            )}
                          </Box>
                        </TableCell>
                      </TableRow>
                    )))
                    : (
                      <TableRow sx={{
                        backgroundColor: theme.palette.custom.white
                      }}>
                        <TableCell colSpan={5}>
                          <Typography>No pay run records available.</Typography>
                        </TableCell>
                      </TableRow>
                    )}
                </TableBody>
              </Table>
            </Box>
          </TableContainer>
        </Box>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={(event, reason) => {
            if (reason !== "clickaway") {
              setSnackbarOpen(false);
            }
          }}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: "100%" }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Paper>
      <LoadingOverlay open={loading || isLoading} />
    </Box>
  );
};

export default PayrollTable;
