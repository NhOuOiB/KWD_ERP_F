import axios from 'axios';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import Select from '../../Common/Select';
import { DatePicker, Space } from 'antd';
import { IconContext } from 'react-icons';
import { BsCheck2 } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../utils/config';
import { AiOutlineClear } from 'react-icons/ai';

const AddEmployee = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState('基本資料');
  const [clear, setClear] = useState(false);
  const [input, setInput] = useState([
    { chinese: '員工編號', name: 'employee_id', null: true, value: '', type: 'number' },
    { chinese: '姓名', name: 'name', null: true, value: '', type: 'text', maxLength: 5 },
    { chinese: '部門', name: 'department_id', null: true, value: '', type: 'select', option: [] },
    { chinese: '性別', name: 'gender', null: true, value: '', type: 'radio', option: ['男', '女'] },
    { chinese: '到職日', name: 'registration_date', null: false, value: '', type: 'date' },
    { chinese: '生日', name: 'birth', null: false, value: '', type: 'date' },
    { chinese: '家用號碼', name: 'tel', null: false, value: '', type: 'text', maxLength: 10 },
    { chinese: '手機號碼', name: 'phone', null: false, value: '', type: 'text', maxLength: 10 },
    { chinese: 'E-mail', name: 'email', null: false, value: '', type: 'text', maxLength: 30 },
    { chinese: '地址', name: 'address', null: false, value: '', type: 'text', maxLength: 50 },
    { chinese: '緊急聯絡人', name: 'emergency_contact', null: false, value: '', type: 'text', maxLength: 5 },
    { chinese: '緊急聯絡人電話', name: 'emergency_contact_phone', null: false, value: '', type: 'text', maxLength: 10 },
    { chinese: '星座', name: 'sign', null: false, value: '', type: 'text' },
    { chinese: '最高學歷', name: 'education', null: false, value: '', type: 'text', maxLength: 20 },
    { chinese: '分機', name: 'ext', null: false, value: '', type: 'number', maxLength: 11 },
    { chinese: '備註', name: 'note', null: false, value: '', type: 'text', maxLength: 50 },
    { chinese: '加保眷屬姓名1', name: 'family_dependant_name_1', null: false, value: '', type: 'text', maxLength: 5 },
    { chinese: '加保眷屬關係1', name: 'family_dependant_relationship_1', null: false, value: '', type: 'text', maxLength: 2 },
    { chinese: '加保眷屬姓名2', name: 'family_dependant_name_2', null: false, value: '', type: 'text', maxLength: 5 },
    { chinese: '加保眷屬關係2', name: 'family_dependant_relationship_2', null: false, value: '', type: 'text', maxLength: 2 },
    { chinese: '加保眷屬姓名3', name: 'family_dependant_name_3', null: false, value: '', type: 'text', maxLength: 5 },
    { chinese: '加保眷屬關係3', name: 'family_dependant_relationship_3', null: false, value: '', type: 'text', maxLength: 2 },
    { chinese: '加保眷屬姓名4', name: 'family_dependant_name_4', null: false, value: '', type: 'text', maxLength: 5 },
    { chinese: '加保眷屬關係4', name: 'family_dependant_relationship_4', null: false, value: '', type: 'text', maxLength: 2 },
    { chinese: '加保眷屬姓名5', name: 'family_dependant_name_5', null: false, value: '', type: 'text', maxLength: 5 },
    { chinese: '加保眷屬關係5', name: 'family_dependant_relationship_5', null: false, value: '', type: 'text', maxLength: 2 },
    { chinese: '銀行帳號', name: 'bank', null: false, value: '', type: 'text', maxLength: 20 },
    { chinese: '額外提撥', name: 'six', null: false, value: '', type: 'number', maxLength: 1 },
    { chinese: '薪資', name: 'salary', null: true, value: '', type: 'number', maxLength: 1 },
  ]);

  function handleChange(e, id, name) {
    setInput((prevInput) =>
      prevInput.map((v) => {
        if (name) {
          if (v.name == name) {
            return { ...v, value: e.target.value };
          }
        } else {
          if (v.name == e.target.name) {
            if (v.type == 'checkbox') {
              return { ...v, value: `${e.target.checked}` };
            }
            return { ...v, value: e.target.value };
          }
        }
        return v;
      })
    );
  }

  function handleChangeTime(value, dateString, key) {
    setInput((prevInput) =>
      prevInput.map((v) => {
        if (v.name == key) {
          return { ...v, value: dateString };
        }
        return v;
      })
    );
  }

  function handleClear() {
    setInput((prevInput) =>
      prevInput.map((v) => {
        if (v.type == 'checkbox') {
          return { ...v, value: 'false' };
        } else if (v.type == 'radio') {
          document.querySelectorAll(`input[name="${v.name}"]`).forEach((radio) => {
            radio.checked = false;
          });
        } else if (v.type == 'select') {
          setClear(true);
        }
        return { ...v, value: '' };
      })
    );
  }

  async function handleSubmit() {
    input.map((v) => {
      if (v.null && v.value == '') {
        toast.error(v.chinese + '未填寫', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'dark',
        });
        return false;
      }
    })
    try {
      let res = await axios.post(`${API_URL}/addEmployee`, input, {
        withCredentials: true,
      });

      toast.success(res.data, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      });
    } catch (err) {
      toast.error(err.response.data.message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      });
      if (err.response.status == 401) navigate('/');
    }
    handleClear();
  }

  function handleZodiacSign() {
    const zodiacSigns = [
      { sign: '摩羯座', start: '01-01', end: '01-19' },
      { sign: '水瓶座', start: '01-20', end: '02-18' },
      { sign: '雙魚座', start: '02-19', end: '03-20' },
      { sign: '牡羊座', start: '03-21', end: '04-19' },
      { sign: '金牛座', start: '04-20', end: '05-20' },
      { sign: '雙子座', start: '05-21', end: '06-20' },
      { sign: '巨蟹座', start: '06-21', end: '07-22' },
      { sign: '獅子座', start: '07-23', end: '08-22' },
      { sign: '處女座', start: '08-23', end: '09-22' },
      { sign: '天秤座', start: '09-23', end: '10-22' },
      { sign: '天蠍座', start: '10-23', end: '11-21' },
      { sign: '射手座', start: '11-22', end: '12-21' },
      { sign: '摩羯座', start: '12-22', end: '12-31' },
    ];

    let date = input[5].value.slice(5);

    for (let i = 0; i < zodiacSigns.length; i++) {
      const sign = zodiacSigns[i];
      if (date >= sign.start && date <= sign.end) {
        setInput((prevInput) =>
          prevInput.map((v) => {
            if (v.name == 'sign') {
              return { ...v, value: sign.sign };
            }
            return v;
          })
        );
        return sign.sign;
      }
    }
    return false;
  }

  useEffect(() => {
    (async () => {
      let result = await axios.get(`${API_URL}/getDepartmentName`);
      setInput((prevInput) =>
        prevInput.map((v) => {
          if (v.name === 'department_id') {
            let newOption = result.data.map((v2) => ({
              department_id: v2.department_id,
              department_name: v2.department_name,
            }));
            return { ...v, option: newOption };
          }
          return v;
        })
      );
    })();
  }, []);

  useEffect(() => {
    handleZodiacSign();
  }, [input[5].value]);

  return (
    <>
      <div className="h-full flex flex-col items-center">
        <div className="my-20 flex">
          <div
            className={`px-4 py-2  rounded cursor-pointer ${page === '基本資料' ? 'bg-white text-blue-900' : 'bg-zinc-600'}`}
            onClick={() => {
              setPage('基本資料');
            }}
          >
            基本資料
          </div>
          <div
            className={`px-4 py-2 rounded cursor-pointer ${page === '計算相關' ? 'bg-white text-blue-900' : 'bg-zinc-600'}`}
            onClick={() => {
              setPage('計算相關');
            }}
          >
            計算相關
          </div>
          <div></div>
        </div>
        {page === '計算相關' && (
          <div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-2">
              {input.map((v, i) => {
                return (
                  i >= 16 && (
                    <div key={i}>
                      <label htmlFor={v.name}>
                        <span className={`block text-sm font-medium text-left ${v.null ? 'after:content-["*"] after:ml-0.5 after:text-red-500' : ''} `}>{v.chinese}</span>
                      </label>
                      <input
                        type={v.type}
                        name={v.name}
                        min={0}
                        className={`mt-1 px-3 py-2 border shadow-sm bg-white text-[#444] border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-fit rounded-md sm:text-sm focus:ring-1 ${
                          v.type === 'date' ? 'w-full' : ''
                        }`}
                        placeholder=""
                        id={v.name}
                        value={v.value}
                        onChange={handleChange}
                        maxLength={v.maxLength}
                      />
                    </div>
                  )
                );
              })}
            </div>
          </div>
        )}
        {page === '基本資料' && (
          <div className="grid grid-cols-2 gap-x-2 gap-y-2">
            {input.map((v, i) => {
              return (
                i < 16 && (
                  <div key={i} className="flex flex-col justify-between">
                    <label htmlFor={v.name}>
                      <span className={`block text-sm font-medium text-left ${v.null ? 'after:content-["*"] after:ml-0.5 after:text-red-500' : ''} `}>{v.chinese}</span>
                    </label>
                    <div className="flex items-center text-[#444]">
                      {v.type === 'radio' ? (
                        v.option.map((o, i) => (
                          <label key={i} className="flex items-center me-2 text-white">
                            <div className="m-2">{o}</div>
                            <input type="radio" name={v.name} value={o} onChange={handleChange} className="me-1" id={v.name} checked={v.value == o} />
                            <div className="radio"></div>
                          </label>
                        ))
                      ) : v.type === 'checkbox' ? (
                        v.option.map((o, i) => (
                          <label key={i}>
                            <input type="checkbox" name={v.name} value={o} onChange={handleChange} />
                          </label>
                        ))
                      ) : v.type === 'select' ? (
                        <div className="w-full">
                          <Select
                            data={v.option}
                            data_name={'department_name'}
                            data_id={'department_id'}
                            main_clr={'white'}
                            text_clr={'#444'}
                            selected_clr={'rgb(186 230 253 )'}
                            order={v.department_id}
                            handleChange={handleChange}
                            clear={clear}
                            setClear={setClear}
                            padding={'5px'}
                            radius={'5px'}
                            inside_padding={'5.795px'}
                            hover_clr={'#444'}
                            defaultValue={input[2].value}
                          />
                        </div>
                      ) : v.type === 'date' ? (
                        <Space direction="vertical" className="w-full">
                          <DatePicker
                            value={v.value ? dayjs(v.value, 'YYYY-MM-DD') : ''}
                            placeholder="請選擇時間"
                            onChange={(value, dateString) => handleChangeTime(value, dateString, v.name)}
                            className="w-full"
                          />
                        </Space>
                      ) : (
                        <input
                          type={v.type}
                          name={v.name}
                          min={0}
                          className={`mt-1 px-3 py-2 border shadow-sm bg-white border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-fit rounded-md sm:text-sm focus:ring-1 ${
                            v.type == 'date' ? 'w-full' : ''
                          }`}
                          placeholder=""
                          id={v.name}
                          value={v.value}
                          onChange={handleChange}
                          maxLength={v.maxLength}
                        />
                      )}
                    </div>
                    <div></div>
                  </div>
                )
              );
            })}
          </div>
        )}
        <div className="flex flex-wrap justify-center mt-8 ">
          <button className="mx-[3rem] flex items-center gap-2" onClick={handleSubmit}>
            <p>送出</p>
            <IconContext.Provider value={{ size: '1.4rem' }}>
              <BsCheck2 />
            </IconContext.Provider>
          </button>
          <button className="mx-[3rem] flex items-center gap-2" onClick={handleClear}>
            <p>清空</p>
            <IconContext.Provider value={{ size: '1.4rem' }}>
              <AiOutlineClear />
            </IconContext.Provider>
          </button>
        </div>
      </div>
    </>
  );
};

export default AddEmployee;
