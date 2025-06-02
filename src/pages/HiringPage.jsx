import React from 'react';
import { motion } from 'framer-motion';
import { PlusIcon, FunnelIcon } from '@heroicons/react/24/outline';
import Button from '../components/ui/Button';

export default function HiringPage() {
  const jobOpenings = [
    {
      id: 1,
      position: 'Senior UI/UX Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      experience: '5+ years',
      applicants: 24,
      status: 'Active'
    },
    {
      id: 2,
      position: 'Full Stack Developer',
      department: 'Engineering',
      location: 'Hybrid',
      type: 'Full-time',
      experience: '3+ years',
      applicants: 18,
      status: 'Active'
    },
    {
      id: 3,
      position: 'Product Manager',
      department: 'Product',
      location: 'On-site',
      type: 'Full-time',
      experience: '4+ years',
      applicants: 12,
      status: 'Draft'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-800">Hiring</h1>
          <p className="text-neutral-600 mt-1">Manage job openings and applications</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" icon={<FunnelIcon className="w-5 h-5" />}>
            Filter
          </Button>
          <Button variant="primary" icon={<PlusIcon className="w-5 h-5" />}>
            Post New Job
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-card p-6">
          <h3 className="text-sm font-medium text-neutral-600">Total Openings</h3>
          <p className="text-2xl font-bold text-neutral-900 mt-2">8</p>
        </div>

        <div className="bg-white rounded-lg shadow-card p-6">
          <h3 className="text-sm font-medium text-neutral-600">Total Applicants</h3>
          <p className="text-2xl font-bold text-neutral-900 mt-2">54</p>
        </div>

        <div className="bg-white rounded-lg shadow-card p-6">
          <h3 className="text-sm font-medium text-neutral-600">Time to Hire</h3>
          <p className="text-2xl font-bold text-neutral-900 mt-2">18 days</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Experience
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Applicants
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {jobOpenings.map((job) => (
                <tr key={job.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-neutral-900">{job.position}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-600">{job.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${job.location === 'Remote' ? 'bg-success-100 text-success-800' :
                        job.location === 'Hybrid' ? 'bg-warning-100 text-warning-800' :
                          'bg-primary-100 text-primary-800'
                      }`}>
                      {job.location}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-600">{job.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-600">{job.experience}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-neutral-900">{job.applicants}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${job.status === 'Active' ? 'bg-success-100 text-success-800' : 'bg-neutral-100 text-neutral-800'}`}>
                      {job.status}
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