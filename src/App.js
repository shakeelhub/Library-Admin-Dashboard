import React from 'react';
import Dashboard from './pages/Dashboard';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  return (
    <div>
      <h1 className='mt-3'>Library Management System Admin Dashboard</h1>
      <Dashboard />
    </div>
  );
};

export default App;

