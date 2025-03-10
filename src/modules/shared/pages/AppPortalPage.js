import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Grid,
    Card,
    CardActionArea,
    CardContent,
    TextField,
    AppBar,
    Toolbar,
    IconButton,
    Container,
    useTheme,
    InputAdornment,
} from "@mui/material";
import { useAuth } from "../components/AuthContext";
import payroll from "../assets/icon/payroll-icon.png";
import biometrics from "../assets/icon/biometrics-icon.png";
import pos from "../assets/icon/pos-icon.png";
import Website from "../assets/icon/website-icon.png";
import panaderoLogo from "../assets/icon/brand-icon.png";
import portalProfile from "../assets/icon/portal-page-profile-icon.png";
import search from "../assets/icon/search-portal-icon.png";
import { Logout } from "@mui/icons-material";

const AppPortalPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    console.log('AppPortalPage user:', user);

    const menuItems = [
        { title: "Payroll", icon: payroll, path: "/" },
        { title: "Biometrics", icon: biometrics, path: "https://www.timeinlive.com/" },
        { title: "POS", icon: pos, path: "/pos" },
        { title: "Website", icon: Website, path: "/website" },
    ];

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <Box sx={{ minHeight: "100vh", position: "relative" }}>
            <AppBar
                position="sticky"
                sx={{
                    backgroundColor: "transparent",
                    color: "black",
                    boxShadow: "none",
                    px: 2,
                }}
            >
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <img src={panaderoLogo} alt="Panadero" style={{ height: 120, marginRight: 8, marginTop: 20 }} />

                    {/* User info + Logout */}
                    {user && (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <img src={portalProfile} alt="UserProfile" style={{ height: 30, width: 30 }} />

                            {/* Name and role */}
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                <Typography variant="sm4" sx={{ color: theme.palette.custom.darkBrown }}>
                                    {user.emailAddress}
                                </Typography>
                                <Typography variant="sm3" sx={{ lineHeight: 1.2, color: theme.palette.custom.darkBrown }}>
                                    {user.role}
                                </Typography>
                            </Box>

                            {/* Logout button */}
                            <IconButton onClick={handleLogout} color="inherit" size="large">
                                <Logout sx={{ color: theme.palette.custom.darkBrown}} />
                            </IconButton>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>

            {/* Main content */}
            <Container maxWidth="md" sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="header2" sx={{ fontWeight: "bold", color: theme.palette.custom.darkBrown, marginBottom: 3 }}>
                    Welcome! How can we help you?
                </Typography>

                {/* Search bar */}
                <TextField
                    fullWidth
                    placeholder="How to run payroll?"
                    sx={{
                        my: 4,
                        backgroundColor: theme.palette.custom.darkBrown,
                        borderRadius: 8,
                        "& .MuiInputBase-input::placeholder": {
                            fontSize: "16px",
                            color: theme.palette.custom.white,
                            opacity: 1
                        },
                        "& .MuiInputBase-input": {
                            fontSize: "16px",
                            color: theme.palette.custom.white,
                            opacity: 1
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                        },
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <img
                                    src={search}
                                    alt="calendar icon"
                                    width="24"
                                    height="24"
                                />
                            </InputAdornment>
                        ),
                        style: { width: "100%" }
                    }}
                />

                {/* Icons grid */}
                <Grid container spacing={3} justifyContent="center">
                    {menuItems.map((item) => (
                        <Grid item xs={12} sm={6} md={3} key={item.title}>
                            <Card sx={{ textAlign: "center", p: 2 }}>
                                <CardActionArea
                                    onClick={() => {
                                        if (item.path.startsWith("http")) {
                                            window.open(item.path, "_blank", "noopener,noreferrer");
                                        } else {
                                            navigate(item.path);
                                        }
                                    }}
                                >
                                    <CardContent>
                                        <img
                                            src={item.icon}
                                            alt={item.title}
                                            style={{ width: 110, height: 100, mb: 3 }}
                                        />
                                        <Typography variant="lg1" sx={{ mt: 1 }}>
                                            {item.title}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default AppPortalPage;
