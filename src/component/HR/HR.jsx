import { useState } from 'react';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import AddEmployee from './AddEmployee/AddEmployee';
import Employee from './Employee/Employee';
import Leave from './Leave/Leave';
import AddLeave from './AddLeave/AddLeave';
import auth from '../../auth/auth';

const HR = () => {
  auth();

  return (
    <Routes>
      <Route path="/employee" element={<Employee />} />
      <Route path="/addEmployee" element={<AddEmployee />} />
      <Route path="/leave" element={<Leave />} />
      <Route path="/addLeave" element={<AddLeave />} />
    </Routes>
  );
};

export default HR;  
