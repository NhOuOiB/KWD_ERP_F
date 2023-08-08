import { useEffect, useState } from 'react';
import axios from 'axios';
import Select from '../../Common/Select';
import { API_URL } from '../../../utils/config';
import { DatePicker, Space, Input } from 'antd';
import { toast } from 'react-toastify';
import { IconContext } from 'react-icons';
import { AiOutlineClear } from 'react-icons/ai';
import { MdOutlineClose } from 'react-icons/md';
import { BsPlusCircleFill, BsClipboard2Check } from 'react-icons/bs';
import dayjs from 'dayjs';

const AddLeave = () => {
  const { TextArea } = Input;
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
  const onChangeTime = (dateString, id, key) => {
    setLeave((prevLeave) => prevLeave.map((v) => (v.id === id ? { ...v, [key]: dateString } : v)));
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
        reject = '有內容未填';
      } else if (v.hour == 0) {
        reject = '時數不可為0';
      } else if (v.leave_id == 3) {
        employeeData.map((v2) => {
          if (v.employee_id == v2.employee_id) {
            if (v2.specialLeave * 8 - v2.total_hour - v.hour < 0) {
              reject = `${v2.name}沒辦法請這麼多特休唷`;
            }
          }
        });
      }
    });

    if (reject) {
      toast.error(reject, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      });
      return false;
    } else {
      let res = await axios.post(`${API_URL}/addLeave`, leave);
      toast.success(res.data, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      });
      handleClear();
    }
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
              {leave.length >= 2 && <th></th>}
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
                  {leave.length >= 2 ? (
                    <td className="bg-red-500 cursor-pointer" onClick={(e) => handleDelete(e, v.id)}>
                      <div>
                        <IconContext.Provider value={{ size: '1.2rem', color: '' }}>
                          <MdOutlineClose />
                        </IconContext.Provider>
                      </div>
                    </td>
                  ) : (
                    ''
                  )}
                  <td className="border-0 border-white-600 text-[#444]">
                    <Space direction="vertical" className={'border border-transparent'}>
                      <DatePicker
                        showTime={{
                          format: 'HH',
                        }}
                        format="YYYY-MM-DD HH"
                        id="begin"
                        onChange={(value, dateString) => onChangeTime(dateString, v.id, 'begin')}
                        className={'py-3 h-14 text-[#444] hover:bg-gray-300'}
                        placeholder="請選擇開始時間"
                        value={v.begin ? dayjs(v.begin, 'YYYY-MM-DD HH') : ''}
                        bordered={false}
                      />
                    </Space>
                    -
                    <Space direction="vertical" className={'border border-transparent'}>
                      <DatePicker
                        showTime={{
                          format: 'HH',
                        }}
                        format="YYYY-MM-DD HH"
                        id="end"
                        onChange={(value, dateString) => onChangeTime(dateString, v.id, 'end')}
                        className={'py-3 h-14 hover:bg-gray-300'}
                        placeholder="請選擇結束時間"
                        value={v.end ? dayjs(v.end, 'YYYY-MM-DD HH') : ''}
                        bordered={false}
                      />
                    </Space>
                  </td>
                  <td className="border border-white-600 w-[12rem]">
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
                      radius={'5px'}
                    />
                  </td>
                  <td className="border border-white-600 w-[12rem]">
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
