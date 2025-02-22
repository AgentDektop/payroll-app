import React from 'react';
import { ThemeProvider} from '@mui/material';
import theme from './modules/shared/theme';
import { BrowserRouter, Routes, Route } from "react-router-dom";


import EmployeeListPage from "./modules/employee/pages/EmployeeListPage";
import Sidebar from './modules/shared/components/Sidebar';
import EmployeePersonalInfoPage from './modules/employee/pages/EmployeePersonalInfoPage';
import PayrollListPage from './modules/payrun/pages/PayrollListPage';
import PayRun from './modules/payrun/pages/PayrunPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Sidebar />}>
              <Route path="/employee/all" element={<EmployeeListPage />}/>
              <Route path="/employee/:id" element={<EmployeePersonalInfoPage />} />
              <Route path="/time-and-attendance/by-period" />
              <Route path="/payrun" element={<PayrollListPage/>} />
              <Route path="/payrun/:id" element={<PayRun/>} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
