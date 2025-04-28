import React from "react";
import {
    Box,
    Typography,
    Paper,
    useTheme,
    Stack,
} from "@mui/material";
import workedHoursIcon from "../../shared/assets/icon/dashboard-work-hours-icon-green.png";
import overtimeIcon from "../../shared/assets/icon/dashboard-overtime-icon-blue.png";
import tardinessIcon from "../../shared/assets/icon/dashboard-late-icon-red.png";
import separatorIcon from "../../shared/assets/icon/vertical-line-separator.png";

import { formatDecimalValue } from "../../shared/utils/dateAndNumberUtils";

const getDiffLabel = (current = 0, previous = 0, unit = 'hrs', label = 'from last month') => {
    const diff = Number(current) - Number(previous);
    const absDiff = Math.abs(diff).toFixed(2);
    const icon = diff > 0 ? '📈' : diff < 0 ? '📉' : '➖';
    const descriptor = diff > 0 ? 'increase' : diff < 0 ? 'decrease' : 'no change';

    return `${icon} ${formatDecimalValue(absDiff)} ${unit} — ${descriptor} ${label}`;
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

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, my: 2 }}>
                <Paper
                    elevation={2}
                    sx={{
                        flex: { xs: "1 1 100%", md: "1 1 calc(33.333% - 16px)" },
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        p: 3,
                        boxShadow: "-1px -1px 10px 0px rgba(175, 136, 98, 0.25)"
                    }}
                >
                    <Stack spacing={1}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Box component="img" src={workedHoursIcon} alt="Worked Hours Icon" sx={{ width: 48, height: 48, mr: 5 }} />
                            <Typography variant="md3" color="#44B678">{getDiffLabel(currTotalWorkedHours, prevTotalWorkedHours)}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Typography variant="header3" color="#303131" sx={{ pt: 1, pb: 0, mt: 0 }}>
                                {!currTotalWorkedHours || currTotalWorkedHours === 0 ? "-" : formatDecimalValue(currTotalWorkedHours)}
                            </Typography>
                            <Typography variant="sm2" color="#7A7A7A" sx={{ py: 0, mt: 0 }}>Total worked hours</Typography>
                        </Box>
                    </Stack>
                </Paper>

                <Paper
                    elevation={2}
                    sx={{
                        flex: { xs: "1 1 100%", md: "1 1 calc(33.333% - 16px)" },
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        p: 3,
                        boxShadow: "-1px -1px 10px 0px rgba(175, 136, 98, 0.25)"
                    }}
                >
                    <Stack spacing={1}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Box component="img" src={overtimeIcon} alt="Overtime Icon" sx={{ width: 48, height: 48, mr: 5 }} />
                            <Typography variant="md3" color="#4CB0E8">{getDiffLabel(currTotalOvertimeHours, prevTotalOvertimeHours)}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Typography variant="header3" color="#303131" sx={{ pt: 1, pb: 0, mt: 0 }}>
                                {!currTotalOvertimeHours || currTotalOvertimeHours === 0 ? "-" : formatDecimalValue(currTotalOvertimeHours)}
                            </Typography>
                            <Typography variant="sm2" color="#7A7A7A" sx={{ py: 0, mt: 0 }}>Total overtime hours</Typography>
                        </Box>
                    </Stack>
                </Paper>

                <Paper
                    elevation={2}
                    sx={{
                        flex: { xs: "1 1 100%", md: "1 1 calc(33.333% - 16px)" },
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        p: 3,
                        boxShadow: "-1px -1px 10px 0px rgba(175, 136, 98, 0.25)"
                    }}
                >
                    <Stack spacing={1}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Box component="img" src={tardinessIcon} alt="Tardiness Icon" sx={{ width: 48, height: 48, mr: 5 }} />
                            <Typography variant="md3" color="#E65C62">{getDiffLabel(currTotalTardiness, prevTotalTardiness)}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Typography variant="header3" color="#303131" sx={{ pt: 1, pb: 0, mt: 0 }}>
                                {!currTotalTardiness || currTotalTardiness === 0 ? "-" : formatDecimalValue(currTotalTardiness)}
                            </Typography>
                            <Typography variant="sm2" color="#7A7A7A" sx={{ py: 0, mt: 0 }}>Total late hours</Typography>
                        </Box>
                    </Stack>
                </Paper>
            </Box>

            <Paper elevation={3} sx={{ p: 4, mb: 4, boxShadow: "-1px -1px 10px 0px rgba(175, 136, 98, 0.25)" }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="header3" gutterBottom>Latest Approved Pay Run</Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                        <Box sx={{ flex: 1 }}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Typography variant="sm2" color="#7a7a7a">Employee's Net Pay</Typography>
                                    <Typography variant="header3" color="#303131">
                                        {!totalNetPay || totalNetPay === 0 ? "-" : `${formatDecimalValue(totalNetPay)} AED`}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>

                        <Box component="img" src={separatorIcon} alt="Separator" sx={{ height: "100%", width: "auto", mx: 4 }} />

                        <Box sx={{ flex: 1 }}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Typography variant="sm2" color="#7a7a7a">Employee's Deductions</Typography>
                                    <Typography variant="header3" color="#303131">
                                        {!totalDeductions || totalDeductions === 0 ? "-" : `${formatDecimalValue(totalDeductions)} AED`}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>

                        <Box component="img" src={separatorIcon} alt="Separator" sx={{ height: "100%", width: "auto", mx: 4 }} />

                        <Box sx={{ flex: 1 }}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Typography variant="sm2" color="#7a7a7a">Payment Date</Typography>
                                    <Typography variant="header3" color="#303131">{paymentDate || "-"}</Typography>
                                </Box>
                            </Stack>
                        </Box>

                        <Box component="img" src={separatorIcon} alt="Separator" sx={{ height: "100%", width: "auto", mx: 4 }} />

                        <Box sx={{ flex: 1 }}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Typography variant="sm2" color="#7a7a7a">No. of Employees</Typography>
                                    <Typography variant="header3" color="#303131">{numberOfEmployees || "-"}</Typography>
                                </Box>
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default Dashboard;
