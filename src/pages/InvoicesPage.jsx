import React from 'react';
import { motion } from 'framer-motion';
import { PlusIcon, FunnelIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import Button from '../components/ui/Button';

export default function InvoicesPage() {
  const invoices = [
    {
      id: 'INV-2024-001',
      date: '2025-01-10',
      dueDate: '2025-01-24',
      client: 'Aman',
      amount: 12500.00,
      status: 'Paid'
    },
    {
      id: 'INV-2024-002',
      date: '2025-01-12',
      dueDate: '2025-01-26',
      client: 'Vishal',
      amount: 8750.00,
      status: 'Pending'
    },
    {
      id: 'INV-2024-003',
      date: '2025-01-15',
      dueDate: '2025-01-29',
      client: 'Divya',
      amount: 15000.00,
      status: 'Overdue'
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-800">Invoices</h1>
          <p className="text-neutral-600 mt-1">Manage and track your invoices</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" icon={<FunnelIcon className="w-5 h-5" />}>
            Filter
          </Button>
          <Button variant="primary" icon={<PlusIcon className="w-5 h-5" />}>
            New Invoice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-card p-6">
          <h3 className="text-sm font-medium text-neutral-600">Total Outstanding</h3>
          <p className="text-2xl font-bold text-neutral-900 mt-2">{formatCurrency(23750.00)}</p>
          <div className="mt-2 text-sm text-neutral-500">From 2 invoices</div>
        </div>

        <div className="bg-white rounded-lg shadow-card p-6">
          <h3 className="text-sm font-medium text-neutral-600">Paid Last 30 Days</h3>
          <p className="text-2xl font-bold text-neutral-900 mt-2">{formatCurrency(12500.00)}</p>
          <div className="mt-2 text-sm text-neutral-500">From 1 invoice</div>
        </div>

        <div className="bg-white rounded-lg shadow-card p-6">
          <h3 className="text-sm font-medium text-neutral-600">Average Time to Pay</h3>
          <p className="text-2xl font-bold text-neutral-900 mt-2">12 days</p>
          <div className="mt-2 text-sm text-neutral-500">Last 30 days</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Invoice ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                    {invoice.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                    {invoice.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                    {invoice.dueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                    {invoice.client}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${invoice.status === 'Paid' ? 'bg-success-100 text-success-800' :
                        invoice.status === 'Pending' ? 'bg-warning-100 text-warning-800' :
                          'bg-error-100 text-error-800'
                      }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                    <button className="text-primary-600 hover:text-primary-900">
                      <ArrowDownTrayIcon className="w-5 h-5" />
                    </button>
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