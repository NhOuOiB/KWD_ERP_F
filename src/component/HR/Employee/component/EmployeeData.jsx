import axios from 'axios';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { DatePicker, Space } from 'antd';
import { useState, useEffect } from 'react';
import Select from '../../../Common/Select';
import { API_URL } from '../../../../utils/config';
import '../../../../styles/HR/employee/employeeData.scss';

const EmployeeData = ({ eid }) => {
  const [edit, setEdit] = useState(false);
  const [status, setStatus] = useState([]);
  const [employee, setEmployee] = useState({});
  const [department, setDepartment] = useState([]);

  function handleEdit() {
    setEdit(!edit);
  }

  function handleChangeTime(value, dateString, key) {
    setEmployee({ ...employee, [key]: dateString });
  }

  function handleChange(e, o, name) {
    if (name) {
      setEmployee({ ...employee, [name]: e.target.value });
    } else {
      setEmployee({ ...employee, [e.target.name]: e.target.value });
    }
  }

  async function handleSubmit() {
    try {
      let res = await axios.put(`${API_URL}/updateEmployee`, employee);
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
    }
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

    let date = employee.birth ? employee.birth.slice(5) : '';

    for (let i = 0; i < zodiacSigns.length; i++) {
      const sign = zodiacSigns[i];
      if (date >= sign.start && date <= sign.end) {
        setEmployee({ ...employee, ['sign']: sign.sign });
      }
    }
    return false;
  }

  useEffect(() => {
    handleZodiacSign();
  }, [employee.birth]);

  useEffect(() => {
    setEmployee({
      id: '',
      employee_id: '',
      name: '',
      department_id: '',
      department_name: '',
      registration_date: '',
      leave_date: '',
      tel: '',
      phone: '',
      email: '',
      address: '',
      gender: '',
      ext: '',
      emergency_contact: '',
      emergency_contact_phone: '',
      birth: '',
      sign: '',
      education: '',
      note: '',
      status_id: '',
      status_name: '',
    });
    (async () => {
      const response = await axios.get(`${API_URL}/getEmployeeById?eid=${eid}`);
      const data = response.data[0] || {}; // 預設為空物件
      const {
        id = null,
        employee_id = null,
        name = null,
        department_id = null,
        department_name = null,
        registration_date = null,
        leave_date = null,
        tel = null,
        phone = null,
        email = null,
        address = null,
        gender = null,
        ext = null,
        emergency_contact = null,
        emergency_contact_phone = null,
        birth = null,
        sign = null,
        education = null,
        note = null,
        status = null,
        status_name = null,
      } = data;

      setEmployee({
        id,
        employee_id,
        name,
        department_id,
        department_name,
        registration_date,
        leave_date,
        tel,
        phone,
        email,
        address,
        gender,
        ext,
        emergency_contact,
        emergency_contact_phone,
        birth,
        sign,
        education,
        note,
        status_id: status,
        status_name,
      });

      let department_data = await axios.get(`${API_URL}/getDepartmentName`);
      setDepartment(department_data.data);

      let status_data = await axios.get(`${API_URL}/getStatus`);
      setStatus(status_data.data);
    })();
  }, [eid, edit]);

  return (
    <div className="w-[60rem] w-max-[72rem] h-min-[24rem] h-max[48.75rem] bg-white text-[#444] rounded-[5px] mx-20 text-left text-lg" onDoubleClick={handleEdit}>
      <div className="px-2 pt-2 h-[32.3rem] overflow-auto">
        <div className="flex gap-1">
          <div className="w-1/2">
            <div className="flex items-center mb-2">
              <label htmlFor="" className="w-1/3 font-bold">
                員工編號
              </label>
              {edit === true ? (
                <input onChange={(e) => handleChange(e)} type="text" name="employee_id" value={employee.employee_id} className="bg-white border rounded-none w-2/3 p-1" />
              ) : (
                <span className="w-2/3 h-fit min-h-[2.393rem] p-1 border border-transparent ">{employee.employee_id}</span>
              )}
            </div>
            <div className="flex items-center mb-2">
              <label htmlFor="" className="w-1/3 font-bold">
                部門
              </label>
              {edit === true ? (
                <div className="w-2/3">
                  <Select
                    data={department}
                    data_id={'department_id'}
                    data_name={'department_name'}
                    handleChange={handleChange}
                    main_clr={'white'}
                    width={'19.58rem'}
                    padding={'3.5px'}
                    border={'1.4px solid #eee'}
                    defaultValue={employee.department_id}
                  />
                </div>
              ) : (
                <span className="w-2/3 h-fit min-h-[2.393rem] p-1 border border-transparent ">{employee.department_name}</span>
              )}
            </div>
            <div className="flex items-center mb-2">
              <label htmlFor="" className="w-1/3 font-bold">
                到職時間
              </label>
              {edit === true ? (
                <div className="w-2/3 ">
                  <Space direction="vertical" className="border rounded-none w-full h-[33.5px]">
                    <DatePicker
                      bordered={false}
                      name="registration_date"
                      className="w-full"
                      onChange={(value, dateString) => handleChangeTime(value, dateString, 'registration_date')}
                      value={employee.registration_date ? dayjs(employee.registration_date) : ''}
                    />
                  </Space>
                </div>
              ) : (
                <span className="w-2/3 h-fit min-h-[2.393rem] p-1 border border-transparent ">{employee.registration_date}</span>
              )}
            </div>
            <div className="flex items-center mb-2">
              <label htmlFor="" className="w-1/3 font-bold">
                離職時間
              </label>
              {edit === true ? (
                <div className="w-2/3 ">
                  <Space direction="vertical" className="border rounded-none w-full h-[33.5px]">
                    <DatePicker
                      bordered={false}
                      name="leave_date"
                      className="w-full"
                      onChange={(value, dateString) => handleChangeTime(value, dateString, 'leave_date')}
                      value={employee.leave_date ? dayjs(employee.leave_date) : ''}
                    />
                  </Space>
                </div>
              ) : (
                <span className="w-2/3 h-fit min-h-[2.393rem] p-1 border border-transparent ">{employee.leave_date}</span>
              )}
            </div>
            <div className="flex items-center mb-2">
              <label htmlFor="" className="w-1/3 font-bold">
                手機號碼
              </label>
              {edit === true ? (
                <input onChange={(e) => handleChange(e)} type="text" name="phone" value={employee.phone} className="bg-white border rounded-none w-2/3 p-1" />
              ) : (
                <span className="w-2/3 h-fit min-h-[2.393rem] p-1 border border-transparent ">{employee.phone}</span>
              )}
            </div>
            <div className="flex items-center mb-2">
              <label htmlFor="" className="w-1/3 font-bold">
                住家號碼
              </label>
              {edit === true ? (
                <input onChange={(e) => handleChange(e)} type="text" name="tel" value={employee.tel} className="bg-white border rounded-none w-2/3 p-1" />
              ) : (
                <span className="w-2/3 h-fit min-h-[2.393rem] p-1 border border-transparent ">{employee.tel}</span>
              )}
            </div>
            <div className="flex items-center mb-2">
              <label htmlFor="" className="w-1/3 font-bold">
                緊急聯絡人
              </label>
              {edit === true ? (
                <input
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name="emergency_contact"
                  value={employee.emergency_contact}
                  className="bg-white border rounded-none w-2/3 p-1"
                />
              ) : (
                <span className="w-2/3 h-fit min-h-[2.393rem] p-1 border border-transparent ">{employee.emergency_contact}</span>
              )}
            </div>
          </div>
          <div className="w-1/2">
            <div className="flex items-center mb-2">
              <label htmlFor="" className="w-1/3 font-bold">
                姓名
              </label>
              {edit === true ? (
                <input onChange={(e) => handleChange(e)} type="text" name="name" value={employee.name} className="bg-white border rounded-none w-2/3 p-1" />
              ) : (
                <span className="w-2/3 h-fit min-h-[2.393rem] p-1 border border-transparent ">{employee.name}</span>
              )}
            </div>
            <div className="flex items-center mb-2">
              <label htmlFor="" className="w-1/3 font-bold">
                性別
              </label>
              {edit === true ? (
                <div className="w-2/3 h-[33.5px] flex items-center">
                  <label htmlFor="men" className="me-2 flex items-center">
                    <div className="me-2">男</div>
                    <input type="radio" id="men" name="gender" value={'男'} className="ms-2" checked={employee.gender == '男' ? true : ''} onChange={(e) => handleChange(e)} />
                    <div className="radio"></div>
                  </label>
                  <label htmlFor="women" className="me-2 flex items-center">
                    <div className="me-2">女</div>
                    <input type="radio" id="women" name="gender" value={'女'} className="ms-2" checked={employee.gender == '女' ? true : ''} onChange={(e) => handleChange(e)} />
                    <div className="radio"></div>
                  </label>
                </div>
              ) : (
                <span className="w-2/3 h-fit min-h-[2.393rem] p-1 border border-transparent ">{employee.gender}</span>
              )}
            </div>
            <div className="flex items-center mb-2">
              <label htmlFor="" className="w-1/3 font-bold">
                生日
              </label>
              {edit === true ? (
                <div className="w-2/3">
                  <Space direction="vertical" className="border rounded-none w-full h-[33.5px]">
                    <DatePicker
                      bordered={false}
                      name="birth"
                      className="w-full"
                      onChange={(value, dateString) => handleChangeTime(value, dateString, 'birth')}
                      value={employee.birth ? dayjs(employee.birth) : ''}
                    />
                  </Space>
                </div>
              ) : (
                <span className="w-2/3 h-fit min-h-[2.393rem] p-1 border border-transparent ">{employee.birth}</span>
              )}
            </div>
            <div className="flex items-center mb-2">
              <label htmlFor="" className="w-1/3 font-bold">
                星座
              </label>
              {edit === true ? (
                <input onChange={(e) => handleChange(e)} type="text" name="sign" value={employee.sign} className="bg-white border rounded-none w-2/3 p-1" disabled />
              ) : (
                <span className="w-2/3 h-fit min-h-[2.393rem] p-1 border border-transparent ">{employee.sign}</span>
              )}
            </div>
            <div className="flex items-center mb-2">
              <label htmlFor="" className="w-1/3 font-bold">
                E-mail
              </label>
              {edit === true ? (
                <input onChange={(e) => handleChange(e)} type="text" name="email" value={employee.email} className="bg-white border rounded-none w-2/3 p-1" />
              ) : (
                <span className="w-2/3 h-fit min-h-[2.393rem] p-1 border border-transparent ">{employee.email}</span>
              )}
            </div>
            <div className="flex items-center mb-2">
              <label htmlFor="" className="w-1/3 font-bold">
                分機
              </label>
              {edit === true ? (
                <input onChange={(e) => handleChange(e)} type="text" name="ext" value={employee.ext} className="bg-white border rounded-none w-2/3 p-1" />
              ) : (
                <span className="w-2/3 h-fit min-h-[2.393rem] p-1 border border-transparent ">{employee.ext}</span>
              )}
            </div>
            <div className="flex items-center mb-2">
              <label htmlFor="" className="w-1/3 font-bold">
                緊急聯絡人電話
              </label>
              {edit === true ? (
                <input
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name="emergency_contact_tel"
                  value={employee.emergency_contact_tel}
                  className="bg-white border rounded-none w-2/3 p-1"
                />
              ) : (
                <span className="w-2/3 h-fit min-h-[2.393rem] p-1 border border-transparent ">{employee.emergency_contact_tel}</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center mb-2">
          <label htmlFor="" className="w-1/6 font-bold ">
            住址
          </label>
          {edit === true ? (
            <input onChange={(e) => handleChange(e)} type="text" name="address" value={employee.address} className="bg-white border rounded-none w-5/6 p-1" />
          ) : (
            <span className="w-5/6 h-fit min-h-[2.393rem] p-1 border border-transparent ">{employee.address}</span>
          )}
        </div>
        <div className="flex items-center mb-2">
          <label htmlFor="" className="w-1/6 font-bold ">
            學歷
          </label>
          {edit === true ? (
            <input onChange={(e) => handleChange(e)} type="text" name="education" value={employee.education} className="bg-white border rounded-none w-5/6 p-1" />
          ) : (
            <span className="w-5/6 h-fit min-h-[2.393rem] p-1 border border-transparent ">{employee.education}</span>
          )}
        </div>
        <div className="flex items-center mb-2">
          <label htmlFor="" className="w-1/6 font-bold ">
            備註
          </label>
          {edit === true ? (
            <input onChange={(e) => handleChange(e)} type="text" name="note" value={employee.note} className="bg-white border rounded-none w-5/6 p-1" />
          ) : (
            <span className="w-5/6 h-fit min-h-[2.393rem] p-1 border border-transparent ">{employee.note}</span>
          )}
        </div>
        <div className="flex items-center mb-2">
          <label htmlFor="" className="w-1/6 font-bold ">
            狀態
          </label>
          {edit === true ? (
            <div className="w-5/6">
              <Select
                data={status}
                data_id={'status_id'}
                data_name={'status_name'}
                handleChange={handleChange}
                main_clr={'white'}
                width={'19.58rem'}
                padding={'3.5px'}
                border={'1.4px solid #eee'}
                defaultValue={employee.status_id}
              />
            </div>
          ) : (
            <span className="w-5/6 h-fit min-h-[2.393rem] p-1 border border-transparent ">{employee.status_name}</span>
          )}
        </div>
      </div>
      <div className="w-full h-fit p-2 border-t bg-[#0369a1] rounded-b-[4px]">
        <div className={`font-bold text-xl border w-fit px-2 py-1  bg-white transition ${edit ? 'opacity-1 cursor-pointer' : 'opacity-0'}`} onClick={edit ? handleSubmit : ''}>
          儲存
        </div>
      </div>
    </div>
  );
};

export default EmployeeData;
