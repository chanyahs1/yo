import React from 'react';
import { Navigate } from 'react-router-dom';

export default function Dashboard() {
  return <Navigate to="/payrolls" replace />;
}