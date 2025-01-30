import React, { useState } from 'react';
import { useLocation, Outlet, useNavigate } from 'react-router-dom';
import { Drawer, Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { People, PeopleAltOutlined, Apps, AppsOutageOutlined, ArrowForward, HorizontalRule, Menu } from '@mui/icons-material';
import paaderoIcon from "../assets/icon/panadero-icon.png";
import employeeIcon from "../assets/icon/employee-icon.png";
import employeeSelectedIcon from "../assets/icon/employee-selected-icon.png";
import dashboardSelectedIcon from "../assets/icon/dashboard-selected-icon.png";
import dashboardIcon from "../assets/icon/dashboard-icon.png";
import timeAttendanceIcon from "../assets/icon/time-attendance-icon.png";
import timeAttendanceSelectedIcon from "../assets/icon/time-attendance-selected-icon.png";
import payRunIcon from "../assets/icon/pay-run-icon.png";
import payRunSelectedIcon from "../assets/icon/pay-run-selected-icon.png";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = useState(false); // State for toggling the mobile drawer

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      {/* Hamburger Icon for Mobile */}
      {sm && (
        <IconButton onClick={handleDrawerToggle} sx={{ position: 'absolute', top: 10, left: 10 }}>
          <Menu sx={{ color: '#693714', fontSize: "30px" }} />
        </IconButton>
      )}

      <Drawer
        variant={sm || xs ? 'temporary' : 'permanent'}
        open={open}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: {
            width: 80,
            backgroundColor: 'rgba(249, 228, 200, 0.80)',
            boxShadow: '0px 4px 4px 1px rgba(0, 0, 0, 0.25)',
            borderRight: '1px solid #D7C3B0',
            height: '100%',
            overflow: 'hidden',
          },
        }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexGrow: 1,
          zIndex: '1200',
        }}
      >
<Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexGrow: 1, 
    paddingTop: 0,
    paddingBottom: 0,
  }}
>
  {/* Logo */}
  <Box
    component="img"
    src={paaderoIcon}
    alt="Logo"
    sx={{ width: 45, height: 45, marginBottom: 3, marginTop: 4 }}
    onClick={() => navigate('/')}
  />

  {/* Payroll Nav */}
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: "auto" }}>
    <IconButton sx={{ mb: 2 }} onClick={() => navigate('/')}>
      {location.pathname === '/' ? (
        <img src={dashboardSelectedIcon} alt="Dashboard" style={{ width: 24, height: 24 }} />
      ) : (
        <img src={dashboardIcon} alt="Dashboard" style={{ width: 24, height: 24 }} />
      )}
    </IconButton>
    <IconButton sx={{ mb: 2 }} onClick={() => navigate('/employee/all')}>
      {location.pathname.startsWith('/employee/') ? (
        <img src={employeeSelectedIcon} alt="Employees" style={{ width: 24, height: 24 }} />
      ) : (
        <img src={employeeIcon} alt="Employees" style={{ width: 24, height: 24 }} />
      )}
    </IconButton>
    <IconButton sx={{ mb: 2 }} onClick={() => navigate('/time-and-attendance/by-period')}>
      {location.pathname === '/time-and-attendance/by-period' ? (
        <img src={timeAttendanceSelectedIcon} alt="Time and Attendance" style={{ width: 24, height: 24 }} />
      ) : (
        <img src={timeAttendanceIcon} alt="Time and Attendance" style={{ width: 24, height: 24 }} />
      )}
    </IconButton>
    <IconButton sx={{ mb: 2 }} onClick={() => navigate('/payrun')}>
      {location.pathname === '/payrun' ? (
        <img src={payRunSelectedIcon} alt="Pay Run" style={{ width: 24, height: 24 }} />
      ) : (
        <img src={payRunIcon} alt="Pay Run" style={{ width: 24, height: 24 }} />
      )}
    </IconButton>
  </Box>

  {/* Main Menu Icons */}
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom:2 }}>
    <HorizontalRule sx={{ fontWeight: '400px', color: '#693714', fontSize: "24px" }} />
    <IconButton sx={{ mb: 2 }}>
      {location.pathname === '/Home' ? (
        <AppsOutageOutlined sx={{ color: '#693714', fontSize: "24px" }} />
      ) : (
        <Apps sx={{ color: '#693714', fontSize: "24px" }} />
      )}
    </IconButton>
    <IconButton sx={{ mb: 2 }}>
      {location.pathname === '/Profile' ? (
        <PeopleAltOutlined fontSize="large" sx={{ color: '#693714', fontSize: "24px" }} />
      ) : (
        <People sx={{ color: '#693714', fontSize: "24px" }} />
      )}
    </IconButton>
    <IconButton>
      <ArrowForward sx={{ color: '#693714', fontSize: "24px" }} />
    </IconButton>
  </Box>
</Box>

      </Drawer>

      <main
        style={{
          marginLeft: (xs|| sm)? 0: "80px",
          marginTop: (xs|| sm)? "25px": 0,
          paddingLeft: (xs|| sm)? 0: '16px', 
          paddingRight: (xs|| sm)? 0: '16px', 
          transition: 'margin 0.3s ease', // Smooth transition for opening/closing sidebar
          zIndex: 1, // Ensure content is below the drawer
        }}
      >
        <Outlet />
      </main>
    </>
  );
};

export default Sidebar;
