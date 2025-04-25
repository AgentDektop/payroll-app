import React from "react";
import {
    Box,
    Typography,
    Paper,
    Divider,
    useTheme,
    Stack,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PaidIcon from "@mui/icons-material/Paid";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

const getDiffLabel = (current = 0, previous = 0, unit = 'Hrs', label = 'vs last month') => {
    const diff = Number(current) - Number(previous);
    const absDiff = Math.abs(diff).toFixed(2);
    const icon = diff > 0 ? '📈' : diff < 0 ? '📉' : '➖';
    const descriptor = diff > 0 ? 'longer' : diff < 0 ? 'shorter' : 'no change';

    return `${icon} ${absDiff} ${unit} ${descriptor} ${label}`;
};

const Dashboard = ({ data }) => {
    const theme = useTheme();

    const {
        attendanceSummary,
        latestPayRun,
        payrollCostSummary = [],
    } = data || {};

    const { previousPeriod, currentPeriod } = attendanceSummary || {};
    const {
        prevTotalWorkedHours,
        prevTotalTardiness,
        prevTotalOvertimeHours,
    } = previousPeriod || {};

    const {
        currTotalWorkedHours,
        currTotalTardiness,
        currTotalOvertimeHours,
    } = currentPeriod || {};

    const {
        totalNetPay,
        totalDeductions,
        numberOfEmployees,
        paymentDate,
    } = latestPayRun || {};

    return (
        <Box sx={{ padding: theme.spacing(3), minHeight: '100vh', overflow: "hidden" }}>
            <Typography variant="header" sx={{ color: theme.palette.custom.darkGrey, paddingBottom: theme.spacing(2) }}>
                Dashboard
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    mb: 3,
                }}
            >
                <Paper elevation={2} sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(33.333% - 16px)" }, p: 3 }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <AccessTimeIcon color="success" />
                        <Box>
                            <Typography variant="body2" color="success.main">
                                {getDiffLabel(currTotalWorkedHours, prevTotalWorkedHours)}
                            </Typography>
                            <Typography variant="h6" fontWeight={600}>
                                {!currTotalWorkedHours || currTotalWorkedHours === 0 ? "-" : currTotalWorkedHours.toFixed(2)}
                            </Typography>
                            <Typography color="text.secondary" fontSize={14}>
                                Total worked hours
                            </Typography>
                        </Box>
                    </Stack>
                </Paper>

                <Paper elevation={2} sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(33.333% - 16px)" }, p: 3 }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <HourglassBottomIcon color="info" />
                        <Box>
                            <Typography variant="body2" color="info.main">
                                {getDiffLabel(currTotalOvertimeHours, prevTotalOvertimeHours)}
                            </Typography>
                            <Typography variant="h6" fontWeight={600}>
                                {!currTotalOvertimeHours || currTotalOvertimeHours === 0 ? "-" : currTotalOvertimeHours.toFixed(2)}
                            </Typography>
                            <Typography color="text.secondary" fontSize={14}>
                                Total overtime hours
                            </Typography>
                        </Box>
                    </Stack>
                </Paper>

                <Paper elevation={2} sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(33.333% - 16px)" }, p: 3 }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <ErrorOutlineIcon color="error" />
                        <Box>
                            <Typography variant="body2" color="error.main">
                                {getDiffLabel(currTotalTardiness, prevTotalTardiness)}
                            </Typography>
                            <Typography variant="h6" fontWeight={600}>
                                {!currTotalTardiness || currTotalTardiness === 0 ? "-" : currTotalTardiness.toFixed(2)}
                            </Typography>
                            <Typography color="text.secondary" fontSize={14}>
                                Total late hours
                            </Typography>
                        </Box>
                    </Stack>
                </Paper>
            </Box>

            <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                    Latest Pay Run
                </Typography>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                    <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(25% - 16px)" } }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <PaidIcon color="success" />
                            <Box>
                                <Typography fontSize={14} color="text.secondary">
                                    Employee's Net Pay
                                </Typography>
                                <Typography fontWeight={500}>
                                    {!totalNetPay || totalNetPay === 0 ? "-" : `${totalNetPay.toFixed(2)} AED`}
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>

                    <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(25% - 16px)" } }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <PaidIcon color="error" />
                            <Box>
                                <Typography fontSize={14} color="text.secondary">
                                    Employee's Deductions
                                </Typography>
                                <Typography fontWeight={500}>
                                    {!totalDeductions || totalDeductions === 0 ? "-" : `${totalDeductions.toFixed(2)} AED`}
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>

                    <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(25% - 16px)" } }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <CalendarMonthIcon />
                            <Box>
                                <Typography fontSize={14} color="text.secondary">
                                    Payment Date
                                </Typography>
                                <Typography fontWeight={500}>{paymentDate || "-"}</Typography>
                            </Box>
                        </Stack>
                    </Box>

                    <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(25% - 16px)" } }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <PeopleAltOutlinedIcon />
                            <Box>
                                <Typography fontSize={14} color="text.secondary">
                                    No. of Employees
                                </Typography>
                                <Typography fontWeight={500}>{numberOfEmployees || "-"}</Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Box>
            </Paper>


            {/* <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h6" fontWeight={600} mb={2}>
                    Payroll Cost Summary
                </Typography>

                <Box sx={{ width: '100%', minHeight: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {payrollCostSummary && payrollCostSummary.length > 0 ? (
                        <ResponsiveContainer width="100%" aspect={2.5}>
                            <BarChart data={payrollCostSummary}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend verticalAlign="top" />
                                <Bar dataKey="totalCost" stackId="a" fill="#00C49F" name="Total Payroll Cost" />
                                <Bar dataKey="totalDeductions" stackId="a" fill="#FF6B6B" name="Total Payroll Deductions" />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            Data Unavailable
                        </Typography>
                    )}
                </Box>

                <Divider sx={{ my: 1 }} />

                <Box>
                    <Typography>
                        Total Payroll Cost: <strong>-</strong>
                    </Typography>
                    <Typography>
                        Total Payroll Deductions: <strong>-</strong>
                    </Typography>
                </Box>
            </Paper> */}
        </Box>
    );
};

export default Dashboard;
