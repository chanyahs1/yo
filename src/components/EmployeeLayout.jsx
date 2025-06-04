import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  HomeIcon, 
  CalendarIcon,
  BanknotesIcon,
  ChatBubbleLeftIcon,
  ClipboardDocumentListIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Logo from './ui/Logo';

const sidebarItems = [
  { 
    title: 'MENU', 
    items: [
      { name: 'Dashboard', path: '/employee-dashboard', icon: HomeIcon },
      { name: 'Attendance & Leave', path: '/employee/attendance', icon: CalendarIcon },
      { name: 'Salary Status', path: '/employee/salary', icon: BanknotesIcon },
      { name: 'Messages', path: '/employee/messages', icon: ChatBubbleLeftIcon },
      { name: 'Tasks & Meetings', path: '/employee/tasks', icon: ClipboardDocumentListIcon },
      { name: 'Personal Details', path: '/employee/profile', icon: UserIcon },
    ]
  }
];

export default function EmployeeLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  return (
    <div className="flex h-screen bg-neutral-50">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      
      <aside 
        className={`fixed inset-y-0 z-30 flex flex-col w-64 bg-white border-r border-neutral-200 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
          <Logo />
          <button
            className="p-1 rounded-md lg:hidden hover:bg-neutral-100"
            onClick={toggleSidebar}
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto">
          {sidebarItems.map((group, groupIndex) => (
            <div key={groupIndex} className="py-4">
              <h3 className="px-4 mb-1 text-xs font-semibold tracking-wider text-neutral-500">
                {group.title}
              </h3>
              <nav>
                {group.items.map((item, itemIndex) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={itemIndex}
                      to={item.path}
                      className={`flex items-center px-4 py-3 mx-2 rounded-md transition-colors duration-200 ${
                        isActive 
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-neutral-600 hover:bg-neutral-100'
                      }`}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </aside>
      
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        <header className="z-10 py-3 bg-white border-b border-neutral-200">
          <div className="flex items-center justify-between px-4">
            <button
              className="p-1 mr-4 rounded-md lg:hidden hover:bg-neutral-100"
              onClick={toggleSidebar}
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
            
            <div className="flex items-center ml-auto space-x-4">
              <button className="p-1 text-neutral-500 rounded-md hover:bg-neutral-100">
                <ChatBubbleLeftIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto bg-neutral-50 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}