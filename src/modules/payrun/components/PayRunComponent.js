import { useTheme } from "@emotion/react";
import { ArrowBack } from "@mui/icons-material";
import { Avatar, Box, Button, InputAdornment, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import separatorIcon from "../../shared/assets/icon/vertical-line-separator.png";
import summarySelectedIcon from "../../shared/assets/icon/summary-selected-icon.png";
import summaryIcon from "../../shared/assets/icon/summary-icon.png";
import earningsSelectedIcon from "../../shared/assets/icon/earnings-selected-icon.png";
import earningsIcon from "../../shared/assets/icon/earnings-icon.png";
import deductionsSelectedIcon from "../../shared/assets/icon/deductions-selected-icon.png";
import deductionsIcon from "../../shared/assets/icon/deductions-tab-icon.png";
import employeeIcon from "../../shared/assets/icon/payrun-employee-icon.png";
import basicIcon from "../../shared/assets/icon/payrun-earnings-basic-icon.png";
import accommodationIcon from "../../shared/assets/icon/payrun-earnings-accommodation-icon.png";
import transportationIcon from "../../shared/assets/icon/payrun-earnings-transportation-icon.png";
import foodIcon from "../../shared/assets/icon/payrun-earnings-food-icon.png";
import communicationIcon from "../../shared/assets/icon/payrun-earnings-communication-icon.png";
import generalIcon from "../../shared/assets/icon/payrun-earnings-general-icon.png";
import overtimeIcon from "../../shared/assets/icon/payrun-earnings-overtime-icon.png";
import holidayIcon from "../../shared/assets/icon/payrun-earnings-holiday-icon.png";
import cancelledOffIcon from "../../shared/assets/icon/payrun-earnings-cancelled-off-icon.png";
import totalDeductionIcon from "../../shared/assets/icon/payrun-total-deduction-icon.png";
import netPayIcon from "../../shared/assets/icon/payrun-netpay-icon.png";
import cashAdvanceIcon from "../../shared/assets/icon/payrun-deductions-cash-advance-icon.png";
import finesIcon from "../../shared/assets/icon/payrun-deductions-fine-icon.png";
import absencesIcon from "../../shared/assets/icon/payrun-deductions-absence-icon.png";
import tardinessIcon from "../../shared/assets/icon/payrun-deductions-tardiness.png";
import totalEarningsIcon from "../../shared/assets/icon/total-payroll-cost-icon.png";
import employeeSearchIcon from "../../shared/assets/icon/search-employee-icon.png";
import { formatDecimalValue } from "../../shared/utils/dateAndNumberUtils";
import { downloadPayslip } from "../services/PayRunAPI";

const PayRunComponent = ({ payrun }) => {

    const navigate = useNavigate();
    const theme = useTheme();
    const [activeTab, setActiveTab] = useState(0);
    const [searchText, setSearchText] = useState('');

    const handleSearchChange = (event) => {
        setSearchText(event.target.value.toLowerCase());
    };

    const filterEmployees = (employees) => {
        return employees.filter((employee) => {
            const nameMatches = employee.employeeName.toLowerCase().includes(searchText);
            const idMatches = employee.employeeId.toLowerCase().includes(searchText);
            return nameMatches || idMatches;
        });
    };

    /**
     * Handle tab change
     */
    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                overflow: "hidden",
                py: 3,
            }}
        >
            {/* Header Section */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "90%",
                    maxWidth: 1450,
                    mb: 2,
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Button
                        onClick={() => navigate('/payrun')}
                        sx={{
                            backgroundColor: theme.palette.custom.white,
                            borderRadius: "30px",
                            minWidth: 0,
                            width: 40,
                            height: 40,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 0,
                            marginRight: theme.spacing(3),
                            marginLeft: 0
                        }}>
                        <ArrowBack
                            sx={{
                                color: theme.palette.custom.darkBrown,
                                fontSize: theme.icons.icon3,
                                fontWeight: 600,
                                padding: 0,
                                margin: 0
                            }}
                        />
                    </Button>
                    <Box
                        sx={{
                            display: "flex",
                            mx: 2,
                            px: 2,
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                            width: "100%",
                            maxWidth: "1200px",
                            margin: "0 auto"
                        }}>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flexGrow: 1 }}>
                            {/* Payroll Header */}
                            <Typography variant="header2" sx={{ color: theme.palette.custom.darkGrey }}>
                                Pay Run
                            </Typography>
                            <Typography variant="header4" sx={{ color: theme.palette.custom.lightGrey }}>
                                {payrun.payRunId}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
                            <img
                                src={separatorIcon}
                                alt="Separator"
                                style={{ height: 40, width: "auto", paddingRight: 30, paddingLeft: 30 }}
                            />
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flexGrow: 1, paddingRight: 8 }}>
                            <Typography
                                variant="sm2"
                                sx={{ color: theme.palette.custom.lightGrey }}>
                                Employee's Net Pay
                            </Typography>
                            <Typography
                                variant="header3"
                                sx={{ color: theme.palette.custom.darkGrey }}>
                                {`${formatDecimalValue(payrun.totalPayrollCost)} AED` || "N/A"}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flexGrow: 1, paddingRight: 8 }}>
                            <Typography
                                variant="sm2"
                                sx={{ color: theme.palette.custom.lightGrey }}>
                                Employee's Deductions
                            </Typography>
                            <Typography
                                variant="header3"
                                sx={{ color: theme.palette.custom.darkGrey }}>
                                {`${formatDecimalValue(payrun.totalPayrollDeductions)} AED` || "N/A"}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flexGrow: 1, paddingRight: 8 }}>
                            <Typography
                                variant="sm2"
                                sx={{ color: theme.palette.custom.lightGrey }}>
                                Pay Run Date
                            </Typography>
                            <Typography
                                variant="header3"
                                sx={{ color: theme.palette.custom.darkGrey }}>
                                {payrun.payRunDate || "N/A"}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flexGrow: 1, paddingRight: 8 }}>
                            <Typography
                                variant="sm2"
                                sx={{ color: theme.palette.custom.lightGrey }}>
                                No of Employees
                            </Typography>
                            <Typography
                                variant="header3"
                                sx={{ color: theme.palette.custom.darkGrey }}>
                                {payrun.summary.length || "N/A"}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* Tabs Section */}
            <Box sx={{
                width: "90%",
                maxWidth: 1450,
                borderBottom: 1,
                borderColor: theme.palette.custom.darkBrown,
                marginBottom: 0,
                paddingBottom: 0,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                {/* Tabs Section*/}
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        marginBottom: 0,
                        paddingBottom: 0,
                        '& .MuiTab-root': {
                            color: theme.palette.custom.brown,
                            '&:hover': { color: theme.palette.custom.darkBrown },
                            '&.Mui-selected': { color: theme.palette.custom.darkBrown },
                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor: theme.palette.custom.darkBrown,
                        },
                    }}
                >
                    <Tab
                        disableRipple
                        label="Summary"
                        icon={<img src={activeTab === 0 ? summarySelectedIcon : summaryIcon} alt="Summary" style={{ width: 24, height: 24 }} />}
                        iconPosition="start"
                        sx={{ paddingLeft: 1, paddingRight: 1, display: 'flex', justifyContent: 'center', fontSize: 20, mx: 4, textTransform: "capitalize" }}
                    />
                    <Tab
                        disableRipple
                        label="Earnings"
                        icon={<img src={activeTab === 1 ? earningsSelectedIcon : earningsIcon} alt="Earnings" style={{ width: 24, height: 24 }} />}
                        iconPosition="start"
                        sx={{ paddingLeft: 1, paddingRight: 1, display: 'flex', justifyContent: 'center', fontSize: 20, mx: 4, textTransform: "capitalize" }}
                    />
                    <Tab
                        disableRipple
                        label="Deductions"
                        icon={<img src={activeTab === 2 ? deductionsSelectedIcon : deductionsIcon} alt="Deductions" style={{ width: 24, height: 24 }} />}
                        iconPosition="start"
                        sx={{ paddingLeft: 1, paddingRight: 1, display: 'flex', justifyContent: 'center', fontSize: 20, mx: 4, textTransform: "capitalize" }}
                    />
                </Tabs>

                {/* Search Field*/}
                <TextField
                    placeholder="Search Employee"
                    size="small"
                    sx={{
                        backgroundColor: theme.palette.custom.white,
                        boxShadow: theme.shadows.card,
                        borderRadius: theme.spacing(1),
                        width: "25%"
                    }}
                    onChange={handleSearchChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <img src={employeeSearchIcon} alt="Search" style={{ width: 24, height: 24 }} />
                            </InputAdornment>
                        )
                    }}
                />
            </Box>


            {/* Content Section */}
            <Paper
                sx={{
                    width: "90%",
                    maxWidth: 1450,
                    bgcolor: "#FAFBFB",
                    borderRadius: 2,
                    border: "1px solid #BDBDBD",
                    boxShadow: "1px 1px 10px rgba(175, 136, 98, 0.25)",
                    padding: 0,
                    margin: 2,
                    overflow: "hidden"
                }}
                elevation={0}
            >
                {/** Summary Tab */}
                {activeTab === 0 && (
                    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", minHeight: 0, maxHeight: "calc(100vh - 280px)", overflow: "auto" }}>
                        <TableContainer sx={{ flexGrow: 1, width: "100%" }}>
                            <Box sx={{
                                top: 0,
                                backgroundColor: theme.palette.custom.greyBorder,
                                zIndex: 10,
                            }}>
                                <Table stickyHeader sx={{ width: "100%" }}>
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: theme.palette.custom.darkerGrey }}>
                                            <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <img
                                                        src={employeeIcon}
                                                        alt="Employee"
                                                        style={{ width: 20, height: 20 }}
                                                    />
                                                    <Typography variant="md3">
                                                        Employee
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <img
                                                        src={totalEarningsIcon}
                                                        alt="Total Earning"
                                                        style={{ width: 24, height: 24 }}
                                                    />
                                                    <Typography variant="md3">
                                                        Total Earnings
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <img
                                                        src={totalDeductionIcon}
                                                        alt="Total Deductions"
                                                        style={{ width: 15, height: 15 }}
                                                    />
                                                    <Typography variant="md3">
                                                        Total Deductions
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <img
                                                        src={netPayIcon}
                                                        alt="Net Pay"
                                                        style={{ width: 15, height: 15 }}
                                                    />
                                                    <Typography variant="md3">
                                                        Net Pay
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filterEmployees(payrun.summary).map((row, index) => (
                                            <TableRow key={index} sx={{ backgroundColor: theme.palette.custom.white }}>
                                                <TableCell
                                                    sx={{
                                                        fontSize: "12px",
                                                        borderRight: `1px solid ${theme.palette.custom.greyBorder}`,
                                                    }}
                                                >
                                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                                                        <Avatar
                                                            alt="Employee"
                                                            src={row.employeeImage}
                                                            sx={{ width: 40, height: 40, marginRight: 2 }}
                                                        />
                                                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                                                            <Typography variant="md3">{row.employeeName || "N/A"}</Typography>
                                                            <Typography variant="caption" color="text.secondary">
                                                                {row.employeeId || "N/A"}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </TableCell>
                                                <TableCell sx={{ fontSize: "12px", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                    {formatDecimalValue(row.totalEarnings)}
                                                </TableCell>
                                                <TableCell sx={{ fontSize: "12px", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                    {formatDecimalValue(row.totalDeductions)}
                                                </TableCell>
                                                <TableCell sx={{ fontSize: "12px", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                    {formatDecimalValue(row.netPay)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </TableContainer>
                    </Box>
                )}

                {/** Earnings Tab */}
                {activeTab === 1 && (
                    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", minHeight: 0, maxHeight: "calc(100vh - 280px)", overflow: "auto" }}>
                        <TableContainer sx={{ flexGrow: 1, width: "100%" }}>
                            <Box sx={{
                                top: 0,
                                backgroundColor: theme.palette.custom.greyBorder,
                                zIndex: 10,
                            }}>
                                <Table stickyHeader sx={{ width: "100%" }}>
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: theme.palette.custom.darkerGrey }}>
                                            <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}`, px: 1 }}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <img
                                                        src={employeeIcon}
                                                        alt="Employee"
                                                        style={{ width: 15, height: 15 }}
                                                    />
                                                    <Typography variant="sm2">
                                                        Employee
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}`, px: 1 }}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <img
                                                        src={basicIcon}
                                                        alt="Basic"
                                                        style={{ width: 15, height: 15 }}
                                                    />
                                                    <Typography variant="sm2">
                                                        Basic
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}`, px: 1 }}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <img
                                                        src={accommodationIcon}
                                                        alt="Accommodation"
                                                        style={{ width: 15, height: 15 }}
                                                    />
                                                    <Typography variant="sm2">
                                                        Accommodation
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}`, px: 1 }}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <img
                                                        src={transportationIcon}
                                                        alt="Transportation"
                                                        style={{ width: 15, height: 15 }}
                                                    />
                                                    <Typography variant="sm2">
                                                        Transportation
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}`, px: 1 }}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <img
                                                        src={foodIcon}
                                                        alt="Food"
                                                        style={{ width: 15, height: 15 }}
                                                    />
                                                    <Typography variant="sm2">
                                                        Food
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}`, px: 1 }}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <img
                                                        src={communicationIcon}
                                                        alt="Communication"
                                                        style={{ width: 15, height: 15 }}
                                                    />
                                                    <Typography variant="sm2">
                                                        Communication
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}`, px: 1 }}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <img
                                                        src={generalIcon}
                                                        alt="General"
                                                        style={{ width: 15, height: 15 }}
                                                    />
                                                    <Typography variant="sm2">
                                                        General
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}`, px: 1 }}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <img
                                                        src={overtimeIcon}
                                                        alt="Overtime"
                                                        style={{ width: 15, height: 15 }}
                                                    />
                                                    <Typography variant="sm2">
                                                        Overtime
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}`, px: 1 }}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <img
                                                        src={holidayIcon}
                                                        alt="Holiday"
                                                        style={{ width: 15, height: 15 }}
                                                    />
                                                    <Typography variant="sm2">
                                                        Holiday
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}`, px: 1 }}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <img
                                                        src={cancelledOffIcon}
                                                        alt="Cancelled Off"
                                                        style={{ width: 15, height: 15 }}
                                                    />
                                                    <Typography variant="sm2">
                                                        Cancelled Off
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}`, px: 1 }}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <img
                                                        src={totalEarningsIcon}
                                                        alt="Total"
                                                        style={{ width: 15, height: 15 }}
                                                    />
                                                    <Typography variant="sm2">
                                                        Total
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filterEmployees(payrun.earnings).map((row, index) => (
                                            <TableRow key={index} sx={{ backgroundColor: theme.palette.custom.white }}>
                                                <TableCell
                                                    sx={{
                                                        borderRight: `1px solid ${theme.palette.custom.greyBorder}`,
                                                    }}
                                                >
                                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                                                        <Avatar
                                                            alt="Employee"
                                                            src={row.employeeImage}
                                                            sx={{ width: 40, height: 40, marginRight: 1 }}
                                                        />
                                                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                                                            <Typography variant="sm3">{row.employeeName || "N/A"}</Typography>
                                                            <Typography variant="caption" color="text.secondary">
                                                                {row.employeeId || "N/A"}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </TableCell>
                                                <TableCell sx={{ fontSize: "12px", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                    {formatDecimalValue(row.basic)}
                                                </TableCell>
                                                <TableCell sx={{ fontSize: "12px", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                    {formatDecimalValue(row.accommodation)}
                                                </TableCell>
                                                <TableCell sx={{ fontSize: "12px", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                    {formatDecimalValue(row.transportation)}
                                                </TableCell>
                                                <TableCell sx={{ fontSize: "12px", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                    {formatDecimalValue(row.food)}
                                                </TableCell>
                                                <TableCell sx={{ fontSize: "12px", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                    {formatDecimalValue(row.communication)}
                                                </TableCell>
                                                <TableCell sx={{ fontSize: "12px", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                    {formatDecimalValue}
                                                </TableCell>
                                                <TableCell sx={{ fontSize: "12px", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                    {formatDecimalValue(row.overtime)}
                                                </TableCell>
                                                <TableCell sx={{ fontSize: "12px", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                    {formatDecimalValue(row.holiday)}
                                                </TableCell>
                                                <TableCell sx={{ fontSize: "12px", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                    {formatDecimalValue(row.cancelledOff)}
                                                </TableCell>
                                                <TableCell sx={{ fontSize: "12px", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                    {formatDecimalValue(row.total)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </TableContainer>
                    </Box>
                )}
                {/** Deductions Tab */}
                {activeTab === 2 && (
                    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", minHeight: 0, maxHeight: "calc(100vh - 280px)", overflow: "auto" }}>
                        <TableContainer sx={{ flexGrow: 1, width: "100%" }}>
                            <Box sx={{
                                top: 0,
                                backgroundColor: theme.palette.custom.greyBorder,
                                zIndex: 10,
                            }}>
                                <Table stickyHeader sx={{ width: "100%" }}>
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: theme.palette.custom.darkerGrey }}>
                                            <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <img
                                                        src={employeeIcon}
                                                        alt="Employee"
                                                        style={{ width: 20, height: 20 }}
                                                    />
                                                    <Typography variant="md3">
                                                        Employee
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <img
                                                        src={cashAdvanceIcon}
                                                        alt="Cash Advance"
                                                        style={{ width: 15, height: 15 }}
                                                    />
                                                    <Typography variant="md3">
                                                        Cash Advance
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <img
                                                        src={finesIcon}
                                                        alt="Fines"
                                                        style={{ width: 15, height: 15 }}
                                                    />
                                                    <Typography variant="md3">
                                                        Fines
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <img
                                                        src={absencesIcon}
                                                        alt="Absences / Leaves"
                                                        style={{ width: 15, height: 15 }}
                                                    />
                                                    <Typography variant="md3">
                                                        Absence / Leaves
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <img
                                                        src={tardinessIcon}
                                                        alt="Tardiness"
                                                        style={{ width: 15, height: 15 }}
                                                    />
                                                    <Typography variant="md3">
                                                        Tardiness
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <img
                                                        src={tardinessIcon}
                                                        alt="Undertime"
                                                        style={{ width: 15, height: 15 }}
                                                    />
                                                    <Typography variant="md3">
                                                        Undertime
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <img
                                                        src={totalDeductionIcon}
                                                        alt="Total"
                                                        style={{ width: 15, height: 15 }}
                                                    />
                                                    <Typography variant="md3">
                                                        Total
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filterEmployees(payrun.deductions).map((row, index) => (
                                            <TableRow key={index} sx={{ backgroundColor: theme.palette.custom.white }}>
                                                <TableCell
                                                    sx={{
                                                        fontSize: "12px",
                                                        borderRight: `1px solid ${theme.palette.custom.greyBorder}`,
                                                    }}
                                                >
                                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                                                        <Avatar
                                                            alt="Employee"
                                                            src={row.employeeImage}
                                                            sx={{ width: 40, height: 40, marginRight: 2 }}
                                                        />
                                                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                                                            <Typography variant="md3">{row.employeeName || "N/A"}</Typography>
                                                            <Typography variant="caption" color="text.secondary">
                                                                {row.employeeId || "N/A"}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </TableCell>
                                                <TableCell sx={{ fontSize: "12px", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                    {formatDecimalValue(row.cashAdvance)}
                                                </TableCell>
                                                <TableCell sx={{ fontSize: "12px", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                    {formatDecimalValue(row.fines)}
                                                </TableCell>
                                                <TableCell sx={{ fontSize: "12px", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                    {formatDecimalValue(row.absencesOrLeaves)}
                                                </TableCell>
                                                <TableCell sx={{ fontSize: "12px", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                    {formatDecimalValue(row.tardiness)}
                                                </TableCell>
                                                <TableCell sx={{ fontSize: "12px", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                    {formatDecimalValue(row.undertime)}
                                                </TableCell>
                                                <TableCell sx={{ fontSize: "12px", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
                                                    {formatDecimalValue(row.total)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </TableContainer>
                    </Box>
                )}
            </Paper>

            {payrun.approved && (
                <Box sx={{ display: "flex", justifyContent: "flex-end", py: 2, width: "90%" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => downloadPayslip(payrun.payRunId)}
                        sx={{
                            textTransform: "none",
                            borderRadius: 2,
                            fontWeight: 600,
                            px: 3,
                            py: 1,
                        }}
                    >
                        Download Payslip
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default PayRunComponent;