import { useState, useEffect } from 'react';
import { API_URL } from '../../../../utils/config';
import axios from 'axios';
const EmployeeData = ({ eid }) => {
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    (async () => {
      let {
        data: [
          {
            employee_id,
            name,
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
            status_name,
          },
        ],
      } = await axios.get(`${API_URL}/getEmployeeById?eid=${eid}`);

      setEmployee({
        employee_id,
        name,
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
        status_name,
      });
    })();
  }, [eid]);
  console.log(employee)
  return (
    <div className="w-[60rem] w-max-[72rem] h-min-[24rem] h-max[48.75rem] bg-white text-blue-950 rounded-[5px] mx-20 p-5">
      <div>
        <label htmlFor="">員工編號 : </label>
        <span>{employee.employee_id}</span>
        <input type="text" value={employee.employee_id} className="bg-white border rounded-md" />
      </div>
      <div>
        <label htmlFor="">姓名 : </label>
        <span>{employee.name}</span>
        <input type="text" value={employee.name} className="bg-white border rounded-md" />
      </div>
      <div>
        <label htmlFor="">部門 : </label>
        <span>{employee.department_name}</span>
        <input type="text" value={employee.department_name} className="bg-white border rounded-md" />
      </div>
      <div>
        <label htmlFor="">到職時間 : </label>
        <span>{employee.registration_date}</span>
        <input type="text" value={employee.registration_date} className="bg-white border rounded-md" />
      </div>
      <div>
        <label htmlFor="">離職時間 : </label>
        <span>{employee.leave_date}</span>
        <input type="text" value={employee.leave_date} className="bg-white border rounded-md" />
      </div>
      <div>
        <label htmlFor="">住家號碼 : </label>
        <span>{employee.tel}</span>
        <input type="text" value={employee.tel} className="bg-white border rounded-md" />
      </div>
      <div>
        <label htmlFor="">手機號碼 : </label>
        <input type="text" value={employee.phone} className="bg-white border rounded-md" />
      </div>
      <div>
        <label htmlFor="">E-mail : </label>
        <input type="text" value={employee.email} className="bg-white border rounded-md" />
      </div>
      <div>
        <label htmlFor="">住址 : </label>
        <input type="text" value={employee.address} className="bg-white border rounded-md" />
      </div>
      <div>
        <label htmlFor="">性別 : </label>
        <input type="text" value={employee.gender} className="bg-white border rounded-md" />
      </div>
      <div>
        <label htmlFor="">分機 : </label>
        <input type="text" value={employee.ext} className="bg-white border rounded-md" />
      </div>
      <div>
        <label htmlFor="">緊急聯絡人 : </label>
        <input type="text" value={employee.emergency_contact} className="bg-white border rounded-md" />
      </div>
      <div>
        <label htmlFor="">緊急聯絡人號碼 : </label>
        <input type="text" value={employee.emergency_contact_phone} className="bg-white border rounded-md" />
      </div>
      <div>
        <label htmlFor="">生日 : </label>
        <input type="text" value={employee.birth} className="bg-white border rounded-md" />
      </div>
      <div>
        <label htmlFor="">星座 : </label>
        <input type="text" value={employee.sign} className="bg-white border rounded-md" />
      </div>
      <div>
        <label htmlFor="">學歷 : </label>
        <input type="text" value={employee.education} className="bg-white border rounded-md" />
      </div>
      <div>
        <label htmlFor="">備註 : </label>
        <input type="text" value={employee.note} className="bg-white border rounded-md" />
      </div>
      <div>
        <label htmlFor="">狀態 : </label>
        <input type="text" value={employee.status_name} className="bg-white border rounded-md" />
      </div>
    </div>
  );
};

export default EmployeeData;
