import axios from 'axios';
import auth from '../../../auth/auth';
import { useEffect, useState } from 'react';
import { API_URL } from '../../../utils/config';
import moment from 'moment/moment';

const Leave = () => {
  auth();
  const [leave, setLeave] = useState([]);

  useEffect(() => {
    (async () => {
      let data = await axios.get(`${API_URL}/getLeaveRecord`);
      setLeave(data.data);
    })();
  }, []);
  return (
    <div className="h-full flex flex-col justify-center items-center ">
      <div className="">
        <table className="table-auto shadow shadow-gray-600">
          <thead>
            <tr>
              <th className="p-2">休假日期</th>
              <th className="p-2">職員</th>
              <th className="p-2">休假項目</th>
              <th className="p-2">休假時數</th>
              <th className="p-2">內容</th>
              <th>申請時間</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {leave.map((v, i) => {
              return (
                <tr className="text-[#444] font-bold" key={i}>
                  <td className="border">
                    <div className="border w-96 py-2">
                      {v.begin} ~ {v.end}
                    </div>
                  </td>
                  <td className="border">
                    <div className="border w-40 py-2">{v.name}</div>
                  </td>
                  <td className="border ">
                    <div className="border w-40 py-2">{v.leave_name}</div>
                  </td>
                  <td className="border ">
                    <div className="border w-40 py-2">{v.hour}</div>
                  </td>
                  <td className="border ">
                    <div className="border w-40 h-[37px] py-2">{v.note}</div>
                  </td>
                  <td className="border">
                    <div className="border w-40 py-2">{moment(v.time).format('YYYY-MM-DD')}</div>
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

export default Leave;
