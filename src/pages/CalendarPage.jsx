import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function CalendarPage() {
  const currentDate = new Date();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const events = [
    {
      date: 15,
      title: 'Payroll Processing',
      time: '10:00 AM',
      type: 'payroll'
    },
    {
      date: 20,
      title: 'Team Meeting',
      time: '2:00 PM',
      type: 'meeting'
    },
    {
      date: 25,
      title: 'Tax Filing Deadline',
      time: '11:30 AM',
      type: 'deadline'
    }
  ];

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto"
    >
      <div className="bg-white rounded-lg shadow-card p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-neutral-800">Calendar</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-neutral-100 rounded-full">
              <ChevronLeftIcon className="w-5 h-5 text-neutral-600" />
            </button>
            <span className="text-lg font-medium text-neutral-800">
              {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
            </span>
            <button className="p-2 hover:bg-neutral-100 rounded-full">
              <ChevronRightIcon className="w-5 h-5 text-neutral-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-px bg-neutral-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="bg-neutral-50 p-4 text-center text-sm font-medium text-neutral-600">
              {day}
            </div>
          ))}
          
          {blanks.map((blank) => (
            <div key={`blank-${blank}`} className="bg-white p-4 min-h-[120px]"></div>
          ))}
          
          {days.map((day) => {
            const dayEvents = events.filter(event => event.date === day);
            const isToday = day === currentDate.getDate();
            
            return (
              <div
                key={day}
                className={`bg-white p-4 min-h-[120px] ${
                  isToday ? 'ring-2 ring-primary-500 ring-inset' : ''
                }`}
              >
                <span className={`inline-block w-8 h-8 rounded-full flex items-center justify-center text-sm
                  ${isToday ? 'bg-primary-500 text-white' : 'text-neutral-900'}`}>
                  {day}
                </span>
                
                {dayEvents.map((event, index) => (
                  <div
                    key={index}
                    className={`mt-2 p-2 rounded-md text-xs
                      ${event.type === 'payroll' ? 'bg-primary-50 text-primary-700' :
                        event.type === 'meeting' ? 'bg-success-50 text-success-700' :
                          'bg-warning-50 text-warning-700'
                      }`}
                  >
                    <div className="font-medium">{event.title}</div>
                    <div className="text-xs opacity-75">{event.time}</div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}