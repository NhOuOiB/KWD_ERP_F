import { useState, useEffect } from 'react';
import EmployeeList from './component/EmployeeList';
import EmployeeData from './component/EmployeeData';

const Employee = () => {
  const [eid, setEid] = useState('');
  return (
    <div className="w-full h-full flex justify-between items-center">
      <EmployeeList setEid={setEid} />
      {eid != '' ? (
        <div className="opacity-1 transition ease-in">
          <EmployeeData eid={eid} />
        </div>
      ) : (
        <div className="opacity-0">
          <EmployeeData eid={eid} />
        </div>
      )}
      <div></div>
    </div>
  );
};

export default Employee;
