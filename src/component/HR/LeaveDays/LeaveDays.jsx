import axios from 'axios';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { API_URL } from '../../../utils/config';

const LeaveDays = () => {
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    (async () => {
      let data = await axios.get(`${API_URL}/getEmployee`);
      setEmployee(data.data);
    })();
  }, []);

  return (
    <div className="h-full flex flex-col justify-center items-center ">
      <div className="">
        <table className="table-auto shadow shadow-gray-600">
          <thead className='border border-[#242424]'>
            <tr>
              <th className="p-2">員工編號</th>
              <th className="p-2">員工姓名</th>
              <th className="p-2">部門名稱</th>
              <th className="p-2">報到日</th>
              <th className="p-2">剩餘休假時數</th>
              <th className="p-2">已使用休假時數</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {employee.map((v, i) => {
              return (
                <tr className=" text-[#444] font-bold" key={i}>
                  <td className="border">
                    <div className="border w-40 py-2">{v.employee_id}</div>
                  </td>
                  <td className="border">
                    <div className="border w-40 py-2">{v.name}</div>
                  </td>
                  <td className="border">
                    <div className="border w-40 py-2">{v.department_name}</div>
                  </td>
                  <td className="border">
                    <div className="border w-40 py-2">{v.registration_date}</div>
                  </td>
                  <td className="border">
                    <div className="border w-40 py-2 flex justify-center">
                      <div>{parseInt(v.specialLeave) * 8 - parseInt(v.total_hour)}小時</div>
                    </div>
                  </td>
                  <td className="border">
                    <div className="border w-40 py-2">{v.total_hour}小時</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveDays;
