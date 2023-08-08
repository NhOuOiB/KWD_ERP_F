import { useEffect, useState } from 'react';
import { DatePicker, Space } from 'antd';
import { IconContext } from 'react-icons';
import { useNavigate } from 'react-router-dom';
import { BsCalendar2Check } from 'react-icons/bs';
import { API_URL } from '../../../utils/config';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Salary = () => {
  const navigate = useNavigate();
  const [salary, setSalary] = useState([]);
  function hanldeChange(v, d) {
    navigate('/HR/addSalary', { state: { date: d } });
  }

  useEffect(() => {
    (async () => {
      let data = await axios.get(`${API_URL}/getSalaryRecord`);
      setSalary(data.data);
    })();
  }, []);

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="w-2/3 mb-4 flex justify-end">
        <div className="bg-white w-12 h-12 overflow-hidden rounded relative flex justify-center items-center mr-4">
          <div className="cursor-pointer">
            <Space direction="vertical" className="absolute top-0 left-0 ">
              <DatePicker picker="month" className="absolute top-0 left-0 w-12 h-12 opacity-0" onChange={(v, d) => hanldeChange(v, d)} />
            </Space>
            <IconContext.Provider value={{ className: ' text-[#444] text-4xl' }}>
              <BsCalendar2Check />
            </IconContext.Provider>
          </div>
        </div>
      </div>
      <div className={`bg-white text-[#444] rounded-xl w-2/3 min-h-32 p-2 flex flex-col justify-center items-center gap-2 ${!salary.length && 'opacity-0'}`}>
        {salary.map((v, i) => {
          return (
            <div className="w-full h-24 border rounded flex justify-around items-center cursor-pointer" key={i} onClick={() => hanldeChange(v, v.month)}>
              <div>{v.month} 薪資紀錄</div>
              <div>查詢</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Salary;
