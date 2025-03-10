import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { Snackbar, Button, TextField, Box, Card, Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import panaderoIcon from "../assets/icon/panadero-icon.png";
import theme from '../theme';

const LoginForm = () => {
    const { user, login, error, loading, } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/portal');
        }
    }, [user, navigate]);

    useEffect(() => {
        if (error) {
            setOpen(true);
        }
    }, [error]);

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };

    // Handle Snackbar close
    const handleCloseSnackbar = () => {
        setOpen(false);
    };

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: 'url("/assets/images/panadero-bg-3.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(5px)',
                    zIndex: 1,
                }}
            />

            {/* Login Form) */}
            <Card
                sx={{
                    width: '360px',
                    p: 4,
                    borderRadius: 8,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 2,
                    backgroundColor: theme.palette.custom.white,
                    backdropFilter: `blur(${theme.spacing(2)})`,
                    justifyContent: "row"
                }}
            >
                <Box
                    component="img"
                    src={panaderoIcon}
                    alt="Logo"
                    sx={{
                        width: "118px",
                        height: "97px",
                        display: 'block',
                        margin: '0 auto',
                        mb: 3,
                    }}
                />

                <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="lg1" sx={{ mb: 1, textAlign: "center" }}>
                        Welcome back!
                    </Typography>
                    <Typography variant="sm3" sx={{ mb: 3, color: theme.palette.custom.lightGrey }}>
                        Please enter your details to sign in.
                    </Typography>
                </Box>

                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        placeholder="Email address"
                        variant="outlined"
                        fullWidth
                        sx={{
                            mb: 2,
                            "& .MuiInputBase-input::placeholder": {
                                fontSize: "12px",
                                color: theme.palette.custom.lightGrey,
                                opacity: 1
                            },
                            "& .MuiInputBase-input": {
                                fontSize: "12px",
                                color: theme.palette.custom.lightGrey,
                                opacity: 1
                            },
                            "& .MuiOutlinedInput-root": {
                                boxShadow: "none",
                                "&:hover": {
                                    backgroundColor: theme.palette.custom.white,
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    border: `1px solid ${theme.palette.custom.greyBorder} !important`,
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                                    borderWidth: "1px !important",
                                    boxShadow: "none !important",
                                }
                            }
                        }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        placeholder="Password"
                        variant="outlined"
                        type="password"
                        fullWidth
                        sx={{
                            mb: 2,
                            "& .MuiInputBase-input::placeholder": {
                                fontSize: "12px",
                                color: theme.palette.custom.lightGrey,
                                opacity: 1
                            },
                            "& .MuiInputBase-input": {
                                fontSize: "12px",
                                color: theme.palette.custom.lightGrey,
                                opacity: 1
                            },
                            "& .MuiOutlinedInput-root": {
                                boxShadow: "none",
                                "&:hover": {
                                    backgroundColor: theme.palette.custom.white,
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    border: `1px solid ${theme.palette.custom.greyBorder} !important`,
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    border: `1px solid ${theme.palette.custom.lighterGrey} !important`,
                                    borderWidth: "1px !important",
                                    boxShadow: "none !important",
                                }
                            }
                        }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" variant="contained" fullWidth disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign in'}
                    </Button>
                </Box>

                {/* Snackbar for errors */}
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'start' }}
                >
                    <MuiAlert
                        severity="error"
                        sx={{ width: '100%', fontSize: "12px" }}
                        onClose={handleCloseSnackbar}
                    >
                        {error || 'An error occurred during login.'}
                    </MuiAlert>
                </Snackbar>
            </Card>
        </Box>
    );

};

export default LoginForm;