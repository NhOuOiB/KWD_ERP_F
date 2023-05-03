import { useEffect, useState } from 'react';
import axios from 'axios';
import Select from '../../Common/Select';
import { API_URL } from '../../../utils/config';
import { DatePicker, Space, Input } from 'antd';
import { toast } from 'react-toastify';
import { IconContext } from 'react-icons';
import { AiOutlineClear } from 'react-icons/ai';
import { MdOutlineCancel } from 'react-icons/md';
import { BsPlusCircleFill, BsClipboard2Check } from 'react-icons/bs';
import moment from 'moment/moment';

const AddLeave = () => {
  const { TextArea } = Input;
  const { RangePicker } = DatePicker;
  const [leaveData, setLeaveData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [clear, setClear] = useState(false);
  const [leave, setLeave] = useState([
    {
      id: 1,
      begin: '',
      end: '',
      employee_id: '',
      leave_id: '',
      hour: '',
      note: '',
    },
  ]);

  // 抓出勤時間
  const onChangeTime = (value, dateString, id) => {
    setLeave((prevLeave) => prevLeave.map((v) => (v.id === id ? { ...v, begin: dateString[0], end: dateString[1] } : v)));
  };

  // 新增請假物件
  function handleCount() {
    if (leave.length <= 5) {
      setLeave([
        ...leave,
        {
          id: leave[leave.length - 1].id + 1,
          begin: '',
          end: '',
          employee_id: '',
          leave_id: '',
          hour: '',
          note: '',
        },
      ]);
    }
  }

  // 刪除請假物件
  function handleDelete(e, id) {
    let result = leave.filter((v) => v.id != id);
    setLeave(result);
  }

  // 變動取值
  function handleChange(e, id, name) {
    if (name) {
      setLeave((prevLeave) => prevLeave.map((v) => (v.id === id ? { ...v, [name]: e.target.value } : v)));
    } else {
      setLeave((prevLeave) => prevLeave.map((v) => (v.id === id ? { ...v, [e.target.name]: e.target.value } : v)));
    }
  }

  function handleClear() {
    setLeave((prevLeave) =>
      prevLeave.map((v) => {
        return { ...v, begin: '', end: '', employee_id: '', leave_id: '', hour: '', note: '' };
      })
    );
    setClear(true);
  }

  // 送出
  async function handleSubmit() {
    let reject;
    leave.map((v, i) => {
      if (v.begin == '' || v.end == '' || v.employee_id == '' || v.leave_id == '' || v.hour == '') {
        toast.error('有內容未填', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'dark',
        });
        reject = true;
      } else {
        reject = false;
      }
    });
    if (reject) {
      return false;
    }
    await axios.post(`${API_URL}/addLeave`, leave);
    handleClear();
  }

  // 抓職員、假別選項
  useEffect(() => {
    (async () => {
      let employee = await axios.get(`${API_URL}/getEmployee`);
      let leave = await axios.get(`${API_URL}/getLeave`);
      setEmployeeData(employee.data);
      setLeaveData(leave.data);
    })();
  }, []);
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="">
        <div className="w-full h-fit flex justify-end">
          <div className="p-2 m-2 bg-[white] rounded-md cursor-pointer" onClick={handleClear}>
            <IconContext.Provider value={{ size: '1.6rem', color: '#444' }}>
              <AiOutlineClear />
            </IconContext.Provider>
          </div>
          <div className="p-2 m-2 bg-[white] rounded-md cursor-pointer" onClick={handleSubmit}>
            <IconContext.Provider value={{ size: '1.6rem', color: 'green' }}>
              <BsClipboard2Check />
            </IconContext.Provider>
          </div>
        </div>
        <table className="table-auto shadow shadow-gray-600">
          <thead>
            <tr>
              <th></th>
              <th className="p-2">休假日期</th>
              <th>職員</th>
              <th>休假項目</th>
              <th>休假時數</th>
              <th>內容</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {leave.map((v, i) => {
              return (
                <tr className="border border-white-600 " key={i}>
                  <td className="">
                    {leave.length >= 2 ? (
                      <div className="cursor-pointer" onClick={(e) => handleDelete(e, v.id)}>
                        <IconContext.Provider value={{ size: '1.2rem', color: 'red' }}>
                          <MdOutlineCancel />
                        </IconContext.Provider>
                      </div>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="border-0 border-white-600 ">
                    <Space direction="vertical" className={'border border-transparent  '}>
                      <RangePicker
                        showTime={{
                          format: 'HH',
                        }}
                        format="YYYY-MM-DD HH"
                        id="leave_date"
                        onChange={(value, dateString) => onChangeTime(value, dateString, v.id)}
                        className={'py-3 h-14 hover:bg-gray-300'}
                        bordered={false}
                      />
                    </Space>
                  </td>
                  <td className="border border-white-600 ">
                    <Select
                      data={employeeData}
                      data_name={'name'}
                      data_id={'employee_id'}
                      main_clr={'white'}
                      text_clr={'#444'}
                      selected_clr={'rgb(186 230 253 )'}
                      order={v.id}
                      handleChange={handleChange}
                      clear={clear}
                      setClear={setClear}
                      width={'12rem'}
                      radius={'5px'}
                    />
                  </td>
                  <td className="border border-white-600">
                    <Select
                      data={leaveData}
                      data_name={'leave_name'}
                      data_id={'leave_id'}
                      main_clr={'white'}
                      text_clr={'#444'}
                      selected_clr={'rgb(186 230 253 )'}
                      order={v.id}
                      handleChange={handleChange}
                      clear={clear}
                      setClear={setClear}
                      width={'12rem'}
                      radius={'5px'}
                    />
                  </td>
                  <td className="border border-white-600">
                    <input
                      type="text"
                      className="bg-[white] text-center w-full h-14 text-[#444] hover:bg-gray-300"
                      maxLength={10}
                      value={v.hour}
                      name="hour"
                      onChange={(e) => handleChange(e, v.id)}
                    />
                  </td>
                  <td className="border border-white-600">
                    <TextArea
                      // showCount
                      maxLength={100}
                      style={{ height: 51, resize: 'none', border: '1px solid white', borderRadius: '0' }}
                      className="hover:bg-gray-300"
                      name="note"
                      value={v.note}
                      onChange={(e) => handleChange(e, v.id)}
                      placeholder=""
                      bordered={false}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-center">
          {leave.length < 5 ? (
            <div className="mt-4 cursor-pointer" onClick={handleCount}>
              <IconContext.Provider value={{ size: '2rem' }}>
                <BsPlusCircleFill />
              </IconContext.Provider>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

export default AddLeave;
