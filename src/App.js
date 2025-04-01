import React from 'react';
import { ThemeProvider} from '@mui/material';
import theme from './modules/shared/theme';
import { BrowserRouter, Routes, Route } from "react-router-dom";


import EmployeeListPage from "./modules/employee/pages/EmployeeListPage";
import Sidebar from './modules/shared/components/Sidebar';
import EmployeePersonalInfoPage from './modules/employee/pages/EmployeePersonalInfoPage';
import PayrollListPage from './modules/payrun/pages/PayrollListPage';
import PayRun from './modules/payrun/pages/PayrunPage';
import PrivateRoute from './modules/shared/components/PrivateRoute';
import LoginPage from './modules/shared/pages/LoginPage';
import AppPortalPage from './modules/shared/pages/AppPortalPage';
import { AuthProvider } from './modules/shared/components/AuthContext';
import TimeAttendancePage from './modules/timeAndAttendance/pages/TimeAndAttendancePage';
import EmployeeAttendanceDetail from './modules/timeAndAttendance/components/EmployeeAttendanceDetailComponent';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path="/" element={<PrivateRoute element={<Sidebar />} />}>
              <Route path="/employee/all" element={<PrivateRoute element={<EmployeeListPage />} />}/>
              <Route path="/employee/:id" element={<PrivateRoute element={<EmployeePersonalInfoPage/>} />} />
              <Route path="/time-and-attendance/by-period" element={<PrivateRoute element={<TimeAttendancePage/>}/>} />
              <Route path="/time-attendance/:employeeId" element={<PrivateRoute element={<EmployeeAttendanceDetail/>}/>} />
              <Route path="/payrun" element={<PrivateRoute element={<PayrollListPage/>}/>} />
              <Route path="/payrun/:id" element={<PrivateRoute element={<PayRun/>} />} />
            </Route>
            <Route path="/portal" element={<PrivateRoute element={<AppPortalPage />} />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
