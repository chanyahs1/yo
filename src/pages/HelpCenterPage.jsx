import React from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function HelpCenterPage() {
  const helpCategories = [
    {
      title: 'Getting Started',
      description: 'Learn the basics of using the payroll system',
      articles: [
        'System Overview',
        'First Payroll Run',
        'Employee Management'
      ]
    },
    {
      title: 'Payroll Processing',
      description: 'Detailed guides for processing payroll',
      articles: [
        'Processing Timeline',
        'Tax Calculations',
        'Payment Methods'
      ]
    },
    {
      title: 'Reports & Analytics',
      description: 'Understanding payroll reports and data',
      articles: [
        'Standard Reports',
        'Custom Reports',
        'Data Export'
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto"
    >
      <div className="bg-white rounded-lg shadow-card p-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-neutral-800 mb-4">Help Center</h1>
          <p className="text-neutral-600 mb-6">Find answers to your questions and learn how to use the system</p>
          
          <div className="max-w-xl mx-auto relative">
            <MagnifyingGlassIcon className="absolute left-3 top-3 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search for help articles..."
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {helpCategories.map((category, index) => (
            <div key={index} className="border border-neutral-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
              <h2 className="text-lg font-semibold text-neutral-800 mb-2">{category.title}</h2>
              <p className="text-neutral-600 mb-4">{category.description}</p>
              <ul className="space-y-2">
                {category.articles.map((article, articleIndex) => (
                  <li key={articleIndex}>
                    <a href="#" className="text-primary-600 hover:text-primary-700 text-sm">
                      {article}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}