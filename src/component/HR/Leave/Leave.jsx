import React from 'react';
import axios from 'axios';
import moment from 'moment/moment';
import { useEffect, useState } from 'react';
import { API_URL } from '../../../utils/config';

const Leave = () => {
  const [leave, setLeave] = useState([]);

  useEffect(() => {
    (async () => {
      let data = await axios.get(`${API_URL}/getLeaveRecord`);
      setLeave(data.data);
    })();
  }, []);
  return (
    <div className="h-full flex flex-col justify-center items-center ">
      <div className="h-[47.3rem] overflow-auto">
        <table className="table-auto shadow shadow-gray-600 h-32 overflow-auto">
          <thead>
            <tr className="border border-[#242424]">
              <th>申請時間</th>
              <th className="p-2">休假日期</th>
              <th className="p-2">職員</th>
              <th className="p-2">休假項目</th>
              <th className="p-2">休假時數</th>
              <th className="p-2">內容</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {leave.map((v, i) => {
              return (
                <React.Fragment key={v.id}>
                  {i === 0 ? (
                    <tr className="text-[#444] font-bold text-xl border">
                      <td colSpan={6} className="py-4">
                        {leave[i + 1].end.slice(0, 4)}
                      </td>
                    </tr>
                  ) : (
                    ''
                  )}
                  <tr className="text-[#444] font-bold">
                    <td className="border">
                      <div className="border w-40 py-2">{moment(v.time).format('YYYY-MM-DD')}</div>
                    </td>
                    <td className="border">
                      <div className="border w-96 py-2">
                        {moment(v.begin).format('MM 月 DD 日 HH 點')} ~ {moment(v.end).format('MM 月 DD 日 HH 點')}
                      </div>
                    </td>
                    <td className="border">
                      <div className="border w-32 py-2">{v.name}</div>
                    </td>
                    <td className="border ">
                      <div className="border w-32 py-2">{v.leave_name}</div>
                    </td>
                    <td className="border ">
                      <div className="border w-32 py-2">{v.total_hour}</div>
                    </td>
                    <td className="border ">
                      <div className="border w-32 h-[37px] py-2">{v.note}</div>
                    </td>
                  </tr>
                  {i < leave.length - 1 && leave[i].end.slice(0, 4) !== leave[i + 1].end.slice(0, 4) ? (
                    <tr className="text-[#444] font-bold text-xl border">
                      <td colSpan={6} className="py-4">
                        {leave[i + 1].end.slice(0, 4)}
                      </td>
                    </tr>
                  ) : (
                    ''
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leave;
