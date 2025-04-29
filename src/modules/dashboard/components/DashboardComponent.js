import React, { useMemo, useState } from "react";
import {
    Box,
    Typography,
    useTheme,
    Stack,
    TextField,
    MenuItem
} from "@mui/material";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
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

const months = [
    { name: "January", month: 1 },
    { name: "February", month: 2 },
    { name: "March", month: 3 },
    { name: "April", month: 4 },
    { name: "May", month: 5 },
    { name: "June", month: 6 },
    { name: "July", month: 7 },
    { name: "August", month: 8 },
    { name: "September", month: 9 },
    { name: "October", month: 10 },
    { name: "November", month: 11 },
    { name: "December", month: 12 },
];

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const earnings = payload.find((p) => p.dataKey === "earnings")?.value || 0;
        const deductions = payload.find((p) => p.dataKey === "deductions")?.value || 0;
        const totalCost = earnings - deductions;

        return (
            <Box p={2} sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#FFFFFF",
                border: "1px solid #D9DDDD",
                boxShadow: "-1px -1px 10px 0px rgba(175, 136, 98, 0.25)",
                borderRadius: 1
            }}>
                <Typography variant="sm1" color="#303131" mb={1}>
                    Total Cost: {formatDecimalValue(totalCost)} AED
                </Typography>
                <Typography variant="sm3" color="#44B678">
                    Earnings: {formatDecimalValue(earnings)} AED
                </Typography>
                <Typography variant="sm3" color="#E65C62">
                    Deductions: {formatDecimalValue(deductions)} AED
                </Typography>
            </Box>
        );
    }
    return null;
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

    const years = payrollCostSummary.map(p => p.year);
    const [selectedYear, setSelectedYear] = useState(years[0]);

    const selectedYearData = payrollCostSummary.find((p) => p.year === selectedYear);

    const chartData = useMemo(() => {
        if (!selectedYearData) return [];

        return months.map((m) => {
            const payRun = selectedYearData.payRuns.find((p) => p.month === m.month);
            return {
                month: m.name,
                earnings: payRun ? payRun.totalEarnings : 0,
                deductions: payRun ? payRun.totalDeductions : 0,
            };
        });
    }, [selectedYearData]);

    const { yearlyEarnings, yearlyDeductions, yearlyCost } = useMemo(() => {
        if (!selectedYearData) return { yearlyEarnings: 0, yearlyDeductions: 0, yearlyCost: 0 };

        const totals = selectedYearData.payRuns.reduce(
            (acc, curr) => {
                acc.yearlyEarnings += curr.totalEarnings || 0;
                acc.yearlyDeductions += curr.totalDeductions || 0;
                return acc;
            },
            { yearlyEarnings: 0, yearlyDeductions: 0 }
        );

        return {
            ...totals,
            yearlyCost: totals.yearlyEarnings - totals.yearlyDeductions
        };
    }, [selectedYearData]);

    const commonBoxStyles = {
        p: 3,
        borderRadius: 0,
        boxShadow: "-1px -1px 10px 0px rgba(175, 136, 98, 0.25)",
        backgroundColor: "#fff"
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, overflow: "hidden", padding: theme.spacing(3) }}>
            <Typography variant="header" sx={{ color: theme.palette.custom.darkGrey }}>
                Dashboard
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                {[{
                    icon: workedHoursIcon,
                    color: "#44B678",
                    value: currTotalWorkedHours,
                    prev: prevTotalWorkedHours,
                    label: "Total worked hours"
                }, {
                    icon: overtimeIcon,
                    color: "#4CB0E8",
                    value: currTotalOvertimeHours,
                    prev: prevTotalOvertimeHours,
                    label: "Total overtime hours"
                }, {
                    icon: tardinessIcon,
                    color: "#E65C62",
                    value: currTotalTardiness,
                    prev: prevTotalTardiness,
                    label: "Total late hours"
                }].map(({ icon, color, value, prev, label }) => (
                    <Box key={label} sx={{
                        ...commonBoxStyles,
                        flex: { xs: "1 1 100%", md: "1 1 calc(33.333% - 16px)" }
                    }}>
                        <Stack spacing={1}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Box component="img" src={icon} alt={label} sx={{ width: 48, height: 48, mr: 5 }} />
                                <Typography variant="md3" color={color}>{getDiffLabel(value, prev)}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                <Typography variant="header3" color="#303131">{!value ? "-" : formatDecimalValue(value)}</Typography>
                                <Typography variant="sm2" color="#7A7A7A">{label}</Typography>
                            </Box>
                        </Stack>
                    </Box>
                ))}
            </Box>

            <Box sx={{ ...commonBoxStyles }}>
                <Typography variant="header3">Latest Approved Pay Run</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center', mt: 2 }}>
                    {[
                        { label: "Employee's Net Pay", value: `${formatDecimalValue(totalNetPay)} AED`, color: "#303131" },
                        { separator: true },
                        { label: "Employee's Deductions", value: `${formatDecimalValue(totalDeductions)} AED`, color: "#303131" },
                        { separator: true },
                        { label: "Payment Date", value: paymentDate, color: "#303131" },
                        { separator: true },
                        { label: "No. of Employees", value: numberOfEmployees, color: "#303131" },
                    ].map((item, index) =>
                        item.separator ? (
                            <Box key={`sep-${index}`} component="img" src={separatorIcon} alt="Separator" sx={{ height: "100%", width: "auto", mx: 4 }} />
                        ) : (
                            <Box key={item.label} sx={{ flex: 1 }}>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                        <Typography variant="sm2" color="#7a7a7a">{item.label}</Typography>
                                        <Typography variant="header3" color={item.color}>{item.value || "-"}</Typography>
                                    </Box>
                                </Stack>
                            </Box>
                        )
                    )}
                </Box>
            </Box>

            <Box sx={{ ...commonBoxStyles }}>
                <Typography variant="header3">Payroll Cost Summary</Typography>
                <Box display="flex" flexDirection="row">
                    <Box width="80%" mt={3}>
                        {chartData.length > 0 && chartData.some(d => d.earnings !== 0 || d.deductions !== 0) ? (
                            <ResponsiveContainer width="100%">
                                <BarChart data={chartData} width="100%">
                                    <XAxis dataKey="month" tick={{ ...theme.typography.sm2, fill: "#7A7A7A" }} />
                                    <YAxis tick={{ ...theme.typography.sm2, fill: "#7A7A7A" }} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Bar dataKey="earnings" stackId="a" fill="#44B678" name="Earnings" isAnimationActive={true} animationDuration={800} />
                                    <Bar dataKey="deductions" stackId="a" fill="#E65C62" name="Deductions" isAnimationActive={true} animationDuration={800} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <Box
                                height="100%"
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                sx={{ backgroundColor: "#F9F9F9", borderRadius: 2 }}
                            >
                                <Typography variant="md3" color="#7A7A7A">
                                    There is no payroll data recorded.
                                </Typography>
                                <Typography variant="md3" color="#7A7A7A">
                                    Try selecting a different year or check back later when new pay runs are processed.
                                </Typography>
                            </Box>
                        )}
                    </Box>

                    <Box width="20%" sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
                        <TextField
                            size="small"
                            label="Year"
                            select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(Number(e.target.value))}
                            sx={{
                                "& .MuiInputBase-input": { ...theme.typography.md3 },
                                "& .MuiOutlinedInput-root": { borderRadius: 2 },
                                "& label": { color: "#7A7A7A" },
                                "& label.Mui-focused": { color: "#AF8862" },
                                "& .MuiOutlinedInput-root.Mui-focused fieldset": { borderColor: "#AF886230" },
                            }}>
                            {years.map((year) => (
                                <MenuItem key={year} value={year}>
                                    {year}
                                </MenuItem>
                            ))}
                        </TextField>

                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                            <Typography variant="sm2" color="#7A7A7A">Annual Cost</Typography>
                            <Typography variant="header3" color="#303131">{`${formatDecimalValue(yearlyCost)} AED`}</Typography>
                        </Box>

                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                            <Typography variant="sm2" color="#7A7A7A">Annual Earnings</Typography>
                            <Typography variant="header3" color="#44B678">{`${formatDecimalValue(yearlyEarnings)} AED`}</Typography>
                        </Box>

                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                            <Typography variant="sm2" color="#7A7A7A">Annual Deductions</Typography>
                            <Typography variant="header3" color="#E65C62">{`${formatDecimalValue(yearlyDeductions)} AED`}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;
