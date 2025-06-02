import React from 'react';
import { motion } from 'framer-motion';
import { PlusIcon, FunnelIcon } from '@heroicons/react/24/outline';
import Button from '../components/ui/Button';

export default function TasksPage() {
  const tasks = [
    {
      id: 1,
      title: 'Review Q3 Payroll Reports',
      dueDate: '2024-01-15',
      priority: 'High',
      status: 'In Progress',
      assignee: {
        name: 'Roohi',
        avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=60'
      }
    },
    {
      id: 2,
      title: 'Prepare Monthly Tax Documents',
      dueDate: '2024-01-20',
      priority: 'Medium',
      status: 'Pending',
      assignee: {
        name: 'Shyam',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=60'
      }
    },
    {
      id: 3,
      title: 'Update Employee Benefits',
      dueDate: '2024-01-25',
      priority: 'Low',
      status: 'Completed',
      assignee: {
        name: 'Meena',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=60'
      }
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-neutral-800">Tasks</h1>
        <div className="flex gap-3">
          <Button variant="outline" icon={<FunnelIcon className="w-5 h-5" />}>
            Filter
          </Button>
          <Button variant="primary" icon={<PlusIcon className="w-5 h-5" />}>
            New Task
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-card">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-neutral-50 border-y border-neutral-200">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Task
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Assignee
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-neutral-50">
                  <td className="py-4 px-6">
                    <span className="text-sm font-medium text-neutral-900">{task.title}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-neutral-600">{task.dueDate}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${task.priority === 'High' ? 'bg-error-100 text-error-800' :
                        task.priority === 'Medium' ? 'bg-warning-100 text-warning-800' :
                          'bg-success-100 text-success-800'
                      }`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${task.status === 'Completed' ? 'bg-success-100 text-success-800' :
                        task.status === 'In Progress' ? 'bg-primary-100 text-primary-800' :
                          'bg-neutral-100 text-neutral-800'
                      }`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <img
                        src={task.assignee.avatar}
                        alt={task.assignee.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="ml-2 text-sm text-neutral-600">{task.assignee.name}</span>
                    </div>
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