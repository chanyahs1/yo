import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import EmployeeLayout from './components/EmployeeLayout';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import HRLoginPage from './pages/HRLoginPage';
import Dashboard from './pages/Dashboard';
import PayrollPage from './pages/PayrollPage';
import EmployeesPage from './pages/EmployeesPage';
import AddNewEmployeePage from './pages/AddNewEmployeePage';
import EmployeeLoginPage from './pages/EmployeeLoginPage';
import EmployeeDashboard from './pages/EmployeeDashboard';
import SettingsPage from './pages/SettingsPage';
import TasksPage from './pages/TasksPage';
import CalendarPage from './pages/CalendarPage';
import HelpCenterPage from './pages/HelpCenterPage';
import PerformancePage from './pages/PerformancePage';
import InvoicesPage from './pages/InvoicesPage';
import HiringPage from './pages/HiringPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/hr-login" element={<HRLoginPage />} />
      
      {/* HR Routes with Sidebar */}
      <Route element={
        <ProtectedRoute requiredRole="hr">
          <Layout />
        </ProtectedRoute>
      }>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/help" element={<HelpCenterPage />} />
        <Route path="/performance" element={<PerformancePage />} />
        <Route path="/payrolls" element={<PayrollPage />} />
        <Route path="/invoices" element={<InvoicesPage />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/add-employee" element={<AddNewEmployeePage />} />
        <Route path="/hiring" element={<HiringPage />} />
      </Route>

      {/* Employee Routes without Sidebar */}
      <Route element={<EmployeeLayout />}>
        <Route path="/employee-login" element={<EmployeeLoginPage />} />
        <Route path="/employee-dashboard" element={
          <ProtectedRoute requiredRole="employee">
            <EmployeeDashboard />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
  );
}

export default App;