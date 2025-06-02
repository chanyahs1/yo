import React from 'react';
import { Outlet } from 'react-router-dom';
import Logo from './ui/Logo';

export default function EmployeeLayout() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-white border-b border-neutral-200 py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <Logo />
        </div>
      </header>
      <main className="max-w-7xl mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}