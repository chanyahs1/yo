import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  CalendarIcon, 
  ChatBubbleLeftIcon, 
  ClockIcon, 
  ArrowRightOnRectangleIcon,
  BellIcon
} from '@heroicons/react/24/outline';

export default function EmployeeDashboard() {
  const navigate = useNavigate();
  const currentEmployee = JSON.parse(localStorage.getItem('currentEmployee'));

  if (!currentEmployee) {
    navigate('/employee-login');
    return null;
  }

  const handleLogout = () => {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const updatedEmployees = employees.map(emp => {
      if (emp.id === currentEmployee.id) {
        return {
          ...emp,
          lastLogout: new Date().toISOString(),
          isActive: false
        };
      }
      return emp;
    });
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    localStorage.removeItem('currentEmployee');
    navigate('/employee-login');
  };

  const messages = [
    { from: 'HR', content: 'Your leave request has been approved', time: '2 hours ago' },
    { from: 'Manager', content: 'Team meeting at 3 PM today', time: '4 hours ago' }
  ];

  const tasks = [
    { title: 'Complete project documentation', deadline: '2024-01-20', status: 'Pending' },
    { title: 'Review code changes', deadline: '2024-01-18', status: 'In Progress' }
  ];

  const upcomingTasks = [
    { title: 'Team presentation', deadline: '2024-01-25', priority: 'High' },
    { title: 'Client meeting', deadline: '2024-01-22', priority: 'Medium' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center">
          <img
            src={currentEmployee.avatar || 'https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&w=100'}
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
          />
          <div className="ml-4">
            <h1 className="text-2xl font-semibold text-neutral-800">
              Welcome, {currentEmployee.name}!
            </h1>
            <p className="text-neutral-600">{currentEmployee.role}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Personal Info Card */}
        <div className="bg-white rounded-lg shadow-card p-6">
          <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-neutral-500">Full Name</label>
              <p className="font-medium">{currentEmployee.name} {currentEmployee.surname}</p>
            </div>
            <div>
              <label className="text-sm text-neutral-500">Age</label>
              <p className="font-medium">{currentEmployee.age} years</p>
            </div>
            <div>
              <label className="text-sm text-neutral-500">Email</label>
              <p className="font-medium">{currentEmployee.email}</p>
            </div>
            <div>
              <label className="text-sm text-neutral-500">Role</label>
              <p className="font-medium">{currentEmployee.role}</p>
            </div>
            <div>
              <label className="text-sm text-neutral-500">Salary</label>
              <p className="font-medium">₹{currentEmployee.salary}</p>
            </div>
          </div>
        </div>

        {/* Messages Card */}
        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Messages</h2>
            <span className="flex h-6 w-6 items-center justify-center bg-primary-100 text-primary-600 text-sm font-medium rounded-full">
              {messages.length}
            </span>
          </div>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-neutral-50 rounded-lg">
                <ChatBubbleLeftIcon className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm">{message.from}</span>
                    <span className="text-xs text-neutral-500">{message.time}</span>
                  </div>
                  <p className="text-sm text-neutral-600 mt-1">{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar & Meetings */}
        <div className="bg-white rounded-lg shadow-card p-6">
          <h2 className="text-lg font-semibold mb-4">Upcoming Meetings</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
              <CalendarIcon className="w-5 h-5 text-primary-500" />
              <div>
                <p className="font-medium text-sm">Team Weekly Sync</p>
                <p className="text-xs text-neutral-500">Today, 3:00 PM</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
              <CalendarIcon className="w-5 h-5 text-primary-500" />
              <div>
                <p className="font-medium text-sm">Project Review</p>
                <p className="text-xs text-neutral-500">Tomorrow, 11:00 AM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks */}
        <div className="bg-white rounded-lg shadow-card p-6">
          <h2 className="text-lg font-semibold mb-4">Current Tasks</h2>
          <div className="space-y-4">
            {tasks.map((task, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-neutral-50 rounded-lg">
                <ClockIcon className="w-5 h-5 text-warning-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">{task.title}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-neutral-500">Due: {task.deadline}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      task.status === 'Pending' ? 'bg-warning-100 text-warning-700' : 'bg-primary-100 text-primary-700'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-lg shadow-card p-6">
          <h2 className="text-lg font-semibold mb-4">Upcoming Tasks</h2>
          <div className="space-y-4">
            {upcomingTasks.map((task, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-neutral-50 rounded-lg">
                <BellIcon className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">{task.title}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-neutral-500">Due: {task.deadline}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      task.priority === 'High' ? 'bg-error-100 text-error-700' : 'bg-warning-100 text-warning-700'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance */}
        <div className="bg-white rounded-lg shadow-card p-6">
          <h2 className="text-lg font-semibold mb-4">Attendance Overview</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">Present Days</span>
              <span className="font-medium">22/24</span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div className="bg-success-500 h-2 rounded-full" style={{ width: '92%' }}></div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center p-3 bg-neutral-50 rounded-lg">
                <span className="text-sm text-neutral-600">Late Arrivals</span>
                <p className="font-medium mt-1">2</p>
              </div>
              <div className="text-center p-3 bg-neutral-50 rounded-lg">
                <span className="text-sm text-neutral-600">Early Leaves</span>
                <p className="font-medium mt-1">1</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}