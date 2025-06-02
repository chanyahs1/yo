import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function EmployeeLoginPage() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const employee = employees.find(
      emp => emp.username === credentials.username && emp.password === credentials.password
    );

    if (employee) {
      const updatedEmployees = employees.map(emp => {
        if (emp.id === employee.id) {
          return {
            ...emp,
            lastLogin: new Date().toISOString(),
            isActive: true,
            lastLogout: null
          };
        }
        return emp;
      });
      localStorage.setItem('employees', JSON.stringify(updatedEmployees));
      localStorage.setItem('currentEmployee', JSON.stringify({...employee, isActive: true}));
      navigate('/employee-dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto"
    >
      <div className="bg-white rounded-lg shadow-card p-8">
        <h1 className="text-2xl font-semibold text-neutral-800 mb-6">Employee Login</h1>
        
        {error && (
          <div className="mb-4 p-4 bg-error-50 text-error-700 rounded-md">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Username
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
          </div>
          
          <button
            type="submit"
            className="w-full px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            Login
          </button>
        </form>
      </div>
    </motion.div>
  );
}