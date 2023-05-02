import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../utils/config';
import auth from '../../../auth/auth';

const Leave = () => {
  auth();
  const [leave, setLeave] = useState([]);

  useEffect(() => {
    (async () => {
      let data = await axios.get(`${API_URL}/getLeaveRecord`);
      setLeave(data.data);
      console.log(data.data);
    })();
  }, []);
  return (
    <div className="h-full flex flex-col justify-center items-center ">
      <div className="">
        <table className="table-auto shadow shadow-gray-600">
          <thead>
            <tr>
              <th className="p-2">休假日期</th>
              <th>職員</th>
              <th>休假項目</th>
              <th>休假時數</th>
              <th>內容</th>
              <th>申請時間</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {leave.map((v, i) => {
              return (
                <tr className="border border-white-600 text-[#333] " key={i}>
                  <td className="border-0 border-white-600 p-2">
                    {v.begin} ~ {v.end}
                  </td>
                  <td className="border border-white-600 p-2">{v.name}</td>
                  <td className="border border-white-600 p-2">{v.leave_name}</td>
                  <td className="border border-white-600 p-2 text-right">{v.hour}小時</td>
                  <td className="border border-white-600 p-2 max-w-[16rem] w-16">{v.note}</td>
                  <td className="border border-white-600 p-2">{v.time}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leave;
