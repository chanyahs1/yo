import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

export default function PerformancePage() {
  const performanceData = [
    {
      employee: {
        name: 'Roohi',
        avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=60',
        role: 'UI/UX Designer'
      },
      metrics: {
        productivity: 92,
        quality: 88,
        attendance: 95,
        teamwork: 90
      },
      trend: 'up',
      status: 'Excellent'
    },
    {
      employee: {
        name: 'Shyam',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=60',
        role: 'Senior Developer'
      },
      metrics: {
        productivity: 87,
        quality: 90,
        attendance: 88,
        teamwork: 85
      },
      trend: 'up',
      status: 'Good'
    },
    {
      employee: {
        name: 'Meena',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=60',
        role: 'Graphics Designer'
      },
      metrics: {
        productivity: 78,
        quality: 85,
        attendance: 92,
        teamwork: 88
      },
      trend: 'down',
      status: 'Average'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto"
    >
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-neutral-800">Performance Overview</h1>
        <p className="text-neutral-600 mt-1">Track and manage employee performance metrics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-card p-6">
          <h3 className="text-lg font-medium text-neutral-800 mb-4">Team Performance</h3>
          <div className="text-3xl font-bold text-neutral-900 mb-2">88%</div>
          <div className="flex items-center text-success-600">
            <ArrowUpIcon className="w-4 h-4 mr-1" />
            <span className="text-sm">3.2% vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card p-6">
          <h3 className="text-lg font-medium text-neutral-800 mb-4">Productivity Rate</h3>
          <div className="text-3xl font-bold text-neutral-900 mb-2">92%</div>
          <div className="flex items-center text-success-600">
            <ArrowUpIcon className="w-4 h-4 mr-1" />
            <span className="text-sm">5.1% vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card p-6">
          <h3 className="text-lg font-medium text-neutral-800 mb-4">Quality Score</h3>
          <div className="text-3xl font-bold text-neutral-900 mb-2">85%</div>
          <div className="flex items-center text-error-600">
            <ArrowDownIcon className="w-4 h-4 mr-1" />
            <span className="text-sm">1.2% vs last month</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-card overflow-hidden">
        <div className="p-6 border-b border-neutral-200">
          <h2 className="text-lg font-semibold text-neutral-800">Employee Performance</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Productivity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Quality
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Attendance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Teamwork
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {performanceData.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={item.employee.avatar}
                        alt={item.employee.name}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-neutral-900">
                          {item.employee.name}
                        </div>
                        <div className="text-sm text-neutral-500">
                          {item.employee.role}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm text-neutral-900">{item.metrics.productivity}%</span>
                      <div className="ml-2 w-24 h-2 bg-neutral-200 rounded-full">
                        <div
                          className="h-2 bg-primary-500 rounded-full"
                          style={{ width: `${item.metrics.productivity}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm text-neutral-900">{item.metrics.quality}%</span>
                      <div className="ml-2 w-24 h-2 bg-neutral-200 rounded-full">
                        <div
                          className="h-2 bg-primary-500 rounded-full"
                          style={{ width: `${item.metrics.quality}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm text-neutral-900">{item.metrics.attendance}%</span>
                      <div className="ml-2 w-24 h-2 bg-neutral-200 rounded-full">
                        <div
                          className="h-2 bg-primary-500 rounded-full"
                          style={{ width: `${item.metrics.attendance}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm text-neutral-900">{item.metrics.teamwork}%</span>
                      <div className="ml-2 w-24 h-2 bg-neutral-200 rounded-full">
                        <div
                          className="h-2 bg-primary-500 rounded-full"
                          style={{ width: `${item.metrics.teamwork}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${item.status === 'Excellent' ? 'bg-success-100 text-success-800' :
                        item.status === 'Good' ? 'bg-primary-100 text-primary-800' :
                          'bg-warning-100 text-warning-800'}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}