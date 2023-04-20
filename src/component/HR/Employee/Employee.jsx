import axios from 'axios';
import { useState, useEffect } from 'react';
import EmployeeList from './component/EmployeeList';
import EmployeeData from './component/EmployeeData';

const Employee = () => {
  const [eid, setEid] = useState('');
  console.log(eid);
  return (
    <div className="w-full h-full flex justify-between items-center">
      <EmployeeList setEid={setEid} />
      <EmployeeData eid={eid} />
      <div></div>
    </div>
  );
};

export default Employee;
