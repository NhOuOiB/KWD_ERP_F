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
      dateList: [],
    },
  ]);
  const [holidayList, setholidayList] = useState([]);
  const [leaves, setLeaves] = useState([]);

  async function dateList(start, end, id) {
    let holiday = await axios.get(`https://data.ntpc.gov.tw/api/datasets/308dcd75-6434-45bc-a95f-584da4fed251/json?size=10000`);
    const _start = new Date(start.slice(0, 10)).getTime();
    const _end = new Date(end.slice(0, 10)).getTime();
    const list = [];
    let result = [];
    let current = _start;
    while (current <= _end) {
      const formated = new Date(current);
      list.push([formated.getFullYear(), formated.getMonth() + 1, formated.getDate()].join('/'));
      current += 24 * 60 * 60 * 1000;
    }
    result = list.filter((date) => {
      return !holiday.data.some((item) => item.date === date && item.holidaycategory !== '補行上班日');
    });

    const groupedByMonth = result.reduce((groups, date) => {
      // 將日期轉換為月份
      const month = dayjs(date).format('YYYY-MM');

      let first;
      let last;
      let total;

      if (parseInt(start.slice(10)) < 9) {
        first = 8;
      } else if (parseInt(start.slice(10)) > 12 && parseInt(start.slice(10)) <= 18) {
        if (start.slice(0, 10) == end.slice(0, 10) && parseInt(end.slice(10)) <= 18) {
          first = parseInt(end.slice(10)) - parseInt(start.slice(10))
        } else {
          first = 18 - parseInt(start.slice(10));
        }
      } else if (parseInt(start.slice(10)) > 18) {
        first = 0;
      } else {
        first = 18 - parseInt(start.slice(10)) - 1;
      }
      if (parseInt(end.slice(10)) > 18) {
        last = 8;
      } else if (parseInt(end.slice(10)) > 12 && parseInt(end.slice(10)) <= 18) {
        if (start.slice(0, 10) == end.slice(0, 10)) {
        last = 0
        } else {
          last = parseInt(end.slice(10)) - 9 - 1;
        }
      } else if (parseInt(end.slice(10)) < 9) {
        last = 0;
      } else {
        last = parseInt(end.slice(10)) - 9;
      }

      if (groups.length > 0) {
        if (groups[groups.length - 1]['month'] === month) {
          groups[groups.length - 1]['dates'].push(date); // 使用 'dates' 屬性
          if (date === dayjs(end).format('YYYY/M/D')) {
            groups[groups.length - 1]['hour'] += last;
          } else {
            groups[groups.length - 1]['hour'] += 8;
          }
        } else {
          if (date === dayjs(end).format('YYYY/M/D')) {
            leave.map((v) => {
              if (v.id == id) {
                groups.push({ id: id, month: month, dates: [date], begin: start, end: end, hour: last, employee_id: v.employee_id, leave_id: v.leave_id, note: v.note }); // 使用 'dates' 屬性
              }
            });
          } else {
            leave.map((v) => {
              if (v.id == id) {
                groups.push({ id: id, month: month, dates: [date], begin: start, end: end, hour: 8, employee_id: v.employee_id, leave_id: v.leave_id, note: v.note }); // 使用 'dates' 屬性
              }
            });
          }
        }
      } else {
        leave.map((v) => {
          if (v.id == id) {
            groups.push({ id: id, month: month, dates: [date], begin: start, end: end, hour: first, employee_id: v.employee_id, leave_id: v.leave_id, note: v.note }); // 初始化 groups 並添加第一個物件
          }
        });
      }
      return groups;
    }, []);

    if (leaves.length < 1) {
      setLeaves(groupedByMonth);
      setLeave((prev) => {
        const updatedLeave = prev.map((v) => {
          let total = 0; // 初始 total 為 0
          groupedByMonth.forEach((hour) => {
            if (v.id === hour.id) {
              total += hour.hour;
            }
          });
          // 返回新的項目，包括計算後的 total
          return { ...v, hour: total };
        });

        return updatedLeave; // 返回新的陣列
      });
    } else {
      setLeaves((prev) => {
        const filteredLeaves = prev.filter((v) => !groupedByMonth.some((v2) => v.id === v2.id));

        // 將新的 groupedByMonth 內容添加進去
        filteredLeaves.push(...groupedByMonth);
        filteredLeaves.sort((a, b) => a.id - b.id);
        return filteredLeaves;
      });
      setLeave((prev) => {
        const updatedLeave = prev.map((v) => {
          let total = 0; // 初始 total 為 0
          groupedByMonth.forEach((hour) => {
            if (v.id === hour.id) {
              total += hour.hour;
            }
          });
          // 返回新的項目，包括計算後的 total
          if (v.id === id) {
            return { ...v, hour: total };
          } else {
            return v
          }
        });

        return updatedLeave; // 返回新的陣列
      });
    }
  }

  // 抓出勤時間
  const onChangeTime = (dateString, id, key) => {
    setLeave((prevLeave) => prevLeave.map((v) => (v.id === id ? { ...v, [key]: dateString } : v)));

    leave.map((v, i) => {
      if (key === 'begin') {
        if (id === v.id) dateList(dateString, v.end, id);
      } else {
        if (id === v.id) dateList(v.begin, dateString, id);
      }
    });
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
    let leaveResult = leave.filter((v) => v.id != id);
    setLeave(leaveResult);
    let leavesResult = leaves.filter((v) => v.id != id);
    setLeave(leavesResult);
  }

  // 變動取值
  function handleChange(e, id, name) {
    if (name) {
      setLeave((prevLeave) => prevLeave.map((v) => (v.id === id ? { ...v, [name]: e.target.value } : v)));
      setLeaves((prev) => prev.map((v) => (v.id === id ? { ...v, [name]: e.target.value } : v)));
    } else {
      setLeave((prevLeave) => prevLeave.map((v) => (v.id === id ? { ...v, [e.target.name]: e.target.value } : v)));
      setLeaves((prev) => prev.map((v) => (v.id === id ? { ...v, [e.target.name]: e.target.value } : v)));
    }
  }

  function handleClear() {
    setLeave((prevLeave) =>
      prevLeave.map((v) => {
        return { ...v, begin: '', end: '', employee_id: '', leave_id: '', hour: '', note: '' };
      })
    );
    setLeaves([]);
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
      let res = await axios.post(`${API_URL}/addLeave`, leaves);
      toast.success(res.data, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      });
      // handleClear();
    }
  }
  // 抓職員、假別選項
  useEffect(() => {
    (async () => {
      let employee = await axios.get(`${API_URL}/getEmployee`);
      let leave = await axios.get(`${API_URL}/getLeave`);
      setEmployeeData(employee.data);
      setLeaveData(leave.data);

      let holiday = await axios.get(`https://data.ntpc.gov.tw/api/datasets/308dcd75-6434-45bc-a95f-584da4fed251/json?size=10000`);

      let arr = [];
      holiday.data.map((v, i) => {
        if (i > holiday.data.length - 240 && v.holidaycategory != '補行上班日') arr.push( v.date);
      });
      setholidayList(arr);
    })();
  }, []);
  const disabledDate = (current) => {
    // 將 current 轉換為與 disabledDates 中日期格式相同的字符串
    const currentDate = dayjs(current).format('YYYY/M/D');
    // 檢查 current 是否在禁用日期的列表中
    return holidayList.includes(currentDate);
  };

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
                        disabledDate={disabledDate}
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
                        disabledDate={disabledDate}
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
