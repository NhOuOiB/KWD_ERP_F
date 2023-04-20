import { useState } from 'react';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import AddEmployee from './AddEmployee/AddEmployee';
import Employee from './Employee/Employee';
import auth from '../../auth/auth';

const HR = () => {
  auth();

  return (
    <Routes>
      <Route path='/employee' element={<Employee />} />
      <Route path='/addEmployee' element={<AddEmployee />} />
    </Routes>
  );
};

export default HR;
