import React, { useEffect, useState } from 'react';
import { DatePicker, Space, Input } from 'antd';
import { IconContext } from 'react-icons';
import { BsPlusCircleFill } from 'react-icons/bs';
import axios from 'axios';
import { API_URL } from '../../../utils/config';
import Select from '../../Common/Select';

const AddLeave = () => {
  const { RangePicker } = DatePicker;
  const { TextArea } = Input;
  const [leave, setLeave] = useState([{}]);
  const [employeeData, setEmployeeData] = useState([]);
  const [leaveData, setLeaveData] = useState([]);
  const onChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  };
  function handleCount() {
    setCount(count + 1);
  }
  useEffect(() => {
    (async () => {
      let employee = await axios.get(`${API_URL}/getEmployee`);
      let leave = await axios.get(`${API_URL}/getLeave`);
      console.log(employee.data);
      console.log(leave.data);
      setEmployeeData(employee.data);
      setLeaveData(leave.data);
    })();
  }, []);
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <table className="table-auto border border-white-600">
        <thead>
          <tr>
            <th className="p-2">出勤日期</th>
            <th>職員</th>
            <th>休假項目</th>
            <th>休假時數</th>
            <th>內容</th>
          </tr>
        </thead>
        <tbody>
          {leave.map((v, i) => {
            return (
              <tr className="border border-white-600" key={i}>
                <td className="border border-white-600">
                  <Space direction="vertical">
                    <RangePicker
                      showTime={{
                        format: 'HH',
                      }}
                      format="YYYY-MM-DD HH"
                      onChange={onChange}
                      className={'py-3'}
                    />
                  </Space>
                </td>
                <td className="border border-white-600 ">
                  <Select data={employeeData} name={'name'} id={'employee_id'} />
                </td>
                <td className="border border-white-600">
                  <Select data={leaveData} name={'leave_name'} id={'leave_id'} />
                </td>
                <td>
                  <input type="text" className="bg-[#242424] text-center" maxLength={10} />
                </td>
                <td className="border border-white-600">
                  <textarea className="bg-[#242424] text-center" />
                  <TextArea
                    onChange={(e) => setValue(e.target.value)}
                    autoSize={{
                      minRows: 1.5,
                      maxRows: 5,
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-4 pointer-events-['pointer']" onClick={handleCount}>
        <IconContext.Provider value={{ size: '2rem' }}>
          <BsPlusCircleFill />
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default AddLeave;
