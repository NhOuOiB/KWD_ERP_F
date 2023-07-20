import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_URL } from '../../../utils/config';

const Salary = () => {
  const [salary, setSalary] = useState([]);
  useEffect(() => {
    (async () => {
      let res = await axios.get(`${API_URL}/getSalary`);
      setSalary(res.data);
      console.log(salary);
    })();
  }, []);
  return (
    <>
      <div className="w-fit h-full flex flex-col justify-center items-center m-auto">
        <div className="w-full flex justify-between items-end px-5">
          <p>公司名:岳林工業有限公司</p>
          <div>
            <p>人員數: {salary.length}</p>
            <p>支付日期:</p>
          </div>
        </div>
        <table className="table-auto shadow shadow-gray-600">
          <thead>
            <tr>
              <th className="w-40 h-14 border" rowSpan={2}>
                職員代碼
              </th>
              <th className="w-40 h-14 border" rowSpan={2}>
                職員姓名
              </th>
              <th className="w-40 h-14 border">月薪</th>
              <th className="w-40 h-14 border">獎金</th>
              <th className="w-40 h-14 border">病假</th>
              <th className="w-40 h-14 border">事假</th>
              <th className="w-40 h-14 border">個人負擔勞保</th>
              <th className="w-40 h-14 border">個人負擔健保</th>
              <th className="w-40 h-14 border">眷屬加保</th>
              <th className="w-40 h-14 border" rowSpan={3}>
                實支付額
              </th>
            </tr>
            <tr>
              <th className="w-40 h-14 border">誤餐補助</th>
              <th className="w-40 h-14 border">加班補助</th>
              <th className="w-40 h-14 border"></th>
              <th className="w-40 h-14 border"></th>
              <th className="w-40 h-14 border">個人提繳6%</th>
              <th className="w-40 h-14 border">代訂便當</th>
              <th className="w-40 h-14 border">代扣稅額</th>
            </tr>
            <tr>
              <th className="w-40 h-14 border">報到日期</th>
              <th className="w-40 h-14 border">部門名稱</th>
              <th className="w-40 h-14 border">支付總額</th>
              <th className="w-40 h-14 border"></th>
              <th className="w-40 h-14 border"></th>
              <th className="w-40 h-14 border"></th>
              <th className="w-40 h-14 border">扣除總額</th>
              <th className="w-40 h-14 border"></th>
              <th className="w-40 h-14 border"></th>
            </tr>
          </thead>
          <tbody className="bg-white text-black">
            {salary.map((v, i) => {
              let payForSick = -(Math.round(v.salary / 30 / 8) * v.sick) / 2;
              let payForPersonal = -(Math.round(v.salary / 30 / 8) * v.personal);
              let payForLabor = -(Math.round(v.salary * 0.12 * 0.2))
              let payForHealth = -(Math.round(v.salary * 0.0517 * 0.3))
              let payTotal = v.salary + v.overtime_meal + v.overtime + v.bonus;
              let payDeduction = payForSick + payForPersonal + payForLabor + payForHealth - v.family_dependants - v.six_percent - v.bento - v.tax;
              let payActually = payTotal + payDeduction;
              function thousands(value) {
                if (value) {
                  value += '';
                  var arr = value.split('.');
                  var re = /(\d{1,3})(?=(\d{3})+$)/g;

                  return arr[0].replace(re, '$1,') + (arr.length == 2 ? '.' + arr[1] : '');
                } else {
                  return '';
                }
              }
              return (
                <>
                  <tr>
                    <th className="w-40 h-12 border" rowSpan={2}>
                      {v.employee_id}
                    </th>
                    <th className="w-40 h-12 border" rowSpan={2}>
                      {v.name}
                    </th>
                    <th className="w-40 h-12 border">{thousands(v.salary)}</th>
                    <th className="w-40 h-12 border">{thousands(v.bonus)}</th>
                    <th className="w-40 h-12 border">
                      <div className="h-full flex justify-between items-center">
                        <p className="border-r h-full flex justify-center items-center w-14">{v.sick ? v.sick + 'h' : ''}</p>
                        <p className="pr-2">{v.salary && v.sick ? thousands(payForSick) : ''}</p>
                      </div>
                    </th>
                    <th className="w-40 h-12 border">
                      <div className="h-full flex justify-between items-center">
                        <p className="border-r h-full flex justify-center items-center w-14">{v.personal ? v.personal + 'h' : ''}</p>
                        <p className="pr-2">{v.salary && v.personal ? thousands(payForPersonal) : ''}</p>
                      </div>
                    </th>
                    <th className="w-40 h-12 border">{thousands(payForLabor)}</th>
                    <th className="w-40 h-12 border">{thousands(payForHealth)}</th>
                    <th className="w-40 h-12 border">{thousands(v.family_dependants)}</th>
                    <th className="w-40 h-12 border" rowSpan={3}>
                      {thousands(payActually)}
                    </th>
                  </tr>
                  <tr>
                    <th className="w-40 h-12 border">{thousands(v.overtime_meal)}
                    <input type="text"  className='w-full bg-white text-[#242424] text-center'/></th>
                    <th className="w-40 h-12 border">{thousands(v.overtime)}</th>
                    <th className="w-40 h-12 border"></th>
                    <th className="w-40 h-12 border"></th>
                    <th className="w-40 h-12 border">{thousands(v.six_percent)}</th>
                    <th className="w-40 h-12 border">{thousands(v.bento)}</th>
                    <th className="w-40 h-12 border">{thousands(v.tax)}</th>
                  </tr>
                  <tr>
                    <th className="w-40 h-10 border">{v.registration_date}</th>
                    <th className="w-40 h-10 border">{v.department_name}</th>
                    <th className="w-40 h-10 border">{thousands(payTotal)}</th>
                    <th className="w-40 h-10 border"></th>
                    <th className="w-40 h-10 border"></th>
                    <th className="w-40 h-10 border"></th>
                    <th className="w-40 h-10 border">{thousands(payDeduction)}</th>
                    <th className="w-40 h-10 border"></th>
                    <th className="w-40 h-10 border"></th>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Salary;
