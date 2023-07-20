import { Routes, Route } from 'react-router-dom';
import Leave from './Leave/Leave';
import auth from '../../auth/auth';
import Salary from './Salary/Salary';
import AddLeave from './AddLeave/AddLeave';
import Employee from './Employee/Employee';
import LeaveDays from './LeaveDays/LeaveDays';
import AddEmployee from './AddEmployee/AddEmployee';
import AddAllowance from './AddAllowance/AddAllowance';
import AddDeduction from './AddDeduction/AddDeduction';

const HR = () => {
  // auth();
  return (
    <Routes>
      <Route path="/employee" element={<Employee />} />
      <Route path="/addEmployee" element={<AddEmployee />} />
      <Route path="/leave" element={<Leave />} />
      <Route path="/addLeave" element={<AddLeave />} />
      <Route path="/leaveDays" element={<LeaveDays />} />
      <Route path="/addAllowance" element={<AddAllowance />} />
      <Route path="/addDeduction" element={<AddDeduction />} />
      <Route path="/salary" element={<Salary />} />
    </Routes>
  );
};

export default HR;
