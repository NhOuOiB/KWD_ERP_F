import { Routes, Route } from 'react-router-dom';
import Leave from './Leave/Leave';
import auth from '../../auth/auth';
import Salary from './Salary/Salary';
import AddLeave from './AddLeave/AddLeave';
import Employee from './Employee/Employee';
import LeaveDays from './LeaveDays/LeaveDays';
import AddEmployee from './AddEmployee/AddEmployee';
import AddSalary from './Salary/AddSalary';

const HR = () => {
  auth();
  return (
    <Routes>
      <Route path="/employee" element={<Employee />} />
      <Route path="/addEmployee" element={<AddEmployee />} />
      <Route path="/leave" element={<Leave />} />
      <Route path="/addLeave" element={<AddLeave />} />
      <Route path="/leaveDays" element={<LeaveDays />} />
      <Route path="/salary" element={<Salary />} />
      <Route path="/addSalary" element={<AddSalary />} />
    </Routes>
  );
};

export default HR;
